"""Build the Step-B authoring work-list: per product, every REDO+MISSING slot to
write a prompt for, plus the KEEP images that lock its consistency profile and
the destination folder. Balanced batches (~28 slots each) for parallel cmo-visual
authoring agents. Writes .staging-foa/reconcile/prompt_batches/batch_NN.json + index."""
import json, re, pathlib
from os.path import dirname

audit = json.loads(pathlib.Path(".staging-foa/reconcile/audit_result.json").read_text(encoding="utf-8"))["products"]
nosku = json.loads(pathlib.Path(".staging-foa/reconcile/nosku_products.json").read_text(encoding="utf-8"))

# ref -> full image paths, and ref -> cover dir (destination folder)
by_ref = {r["ref"]: r for r in nosku}

def slugify(s):
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s

def fullpath_for(ref, basename):
    """match an audit basename back to its full /Images path from nosku."""
    rec = by_ref.get(ref, {})
    for p in rec.get("images", []):
        if p.split("/")[-1] == basename or p.endswith("/" + basename):
            return p
    return None

products = []
for p in audit:
    ref = p["ref"]; rec = by_ref.get(ref, {})
    cover = rec.get("cover")
    dest = dirname(cover) if cover else f"/Images/{p.get('sector','Misc')}/{slugify(ref)}"
    slug = slugify(ref)
    keep_paths = []
    slots = []
    for im in p.get("images", []):
        fp = fullpath_for(ref, im["filename"])
        if im["verdict"] == "KEEP":
            if fp: keep_paths.append(fp)
        elif im["verdict"] == "REDO":
            slots.append({
                "kind": "REDO", "position": im["target_set_position"],
                "shot_type": im["shot_type"], "existing": fp or im["filename"],
                "reason": im.get("reason", ""),
            })
    for ms in p.get("missing", []):
        slots.append({
            "kind": "MISSING", "position": ms["target_set_position"],
            "shot_type": ms["shot_type"], "existing": None,
            "reason": ms.get("reason", ""),
        })
    slots.sort(key=lambda s: s["position"])
    # assign image_id + output filename per slot; suffix dups so the same
    # shot_type twice in one product never collides on id/filename
    seen = {}
    for s in slots:
        base = f"{slug}_{s['shot_type']}"
        seen[base] = seen.get(base, 0) + 1
        uid = base if seen[base] == 1 else f"{base}_{seen[base]}"
        s["image_id"] = uid
        s["output_path"] = f"{dest}/{uid}.png"
    if slots:
        products.append({
            "ref": ref, "sector": p.get("sector"), "tier": p.get("assigned_tier"),
            "slug": slug, "description": rec.get("description", ""),
            "dest_folder": dest, "target_set": p.get("target_set", []),
            "keep_images": keep_paths, "slots": slots,
        })

# order products by sector then ref for deterministic final concat
products.sort(key=lambda x: (x["sector"] or "", x["ref"] or ""))

# balanced batches by slot count (~28), never split a product
TARGET = 28
batches, cur, cur_n = [], [], 0
for prod in products:
    n = len(prod["slots"])
    if cur and cur_n + n > TARGET:
        batches.append(cur); cur, cur_n = [], 0
    cur.append(prod); cur_n += n
if cur: batches.append(cur)

outdir = pathlib.Path(".staging-foa/reconcile/prompt_batches")
outdir.mkdir(parents=True, exist_ok=True)
for f in outdir.glob("batch_*.json"): f.unlink()

index = []
for i, b in enumerate(batches):
    pth = outdir / f"batch_{i:02d}.json"
    pth.write_text(json.dumps(b, indent=1), encoding="utf-8")
    nslots = sum(len(x["slots"]) for x in b)
    index.append({"batch": i, "products": len(b), "slots": nslots, "path": str(pth).replace("\\","/")})
(outdir / "index.json").write_text(json.dumps(index, indent=1), encoding="utf-8")

print(f"products with work: {len(products)}")
print(f"total slots (prompts to author): {sum(len(p['slots']) for p in products)}")
print(f"batches: {len(batches)}")
for x in index[:5]: print(f"  batch_{x['batch']:02d}: {x['products']} products, {x['slots']} slots")
print("  ...")
print(f"slots/batch avg: {sum(x['slots'] for x in index)//len(index)}")
