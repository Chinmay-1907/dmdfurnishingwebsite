"""Chunk the 174 no-sku products into balanced batches (~20 images each, <=8
products) so parallel audit agents each get a manageable vision load.
Writes .staging-foa/reconcile/audit_batches/batch_NN.json + an index."""
import json, pathlib, math

src = json.loads(pathlib.Path(".staging-foa/reconcile/nosku_products.json").read_text(encoding="utf-8"))
# sort by sector then ref for stable, sector-coherent batches
src.sort(key=lambda r: (r.get("sector") or "", r.get("ref") or ""))

TARGET_IMGS = 20
MAX_PROD = 8
batches, cur, cur_imgs = [], [], 0
for r in src:
    n = max(1, r.get("image_count", 1))
    if cur and (cur_imgs + n > TARGET_IMGS or len(cur) >= MAX_PROD):
        batches.append(cur); cur, cur_imgs = [], 0
    cur.append({
        "ref": r["ref"], "sector": r.get("sector"), "tier": r.get("tier"),
        "description": r.get("description"), "images": r["images"],
    })
    cur_imgs += n
if cur:
    batches.append(cur)

outdir = pathlib.Path(".staging-foa/reconcile/audit_batches")
outdir.mkdir(parents=True, exist_ok=True)
# clear stale
for f in outdir.glob("batch_*.json"):
    f.unlink()

index = []
for i, b in enumerate(batches):
    p = outdir / f"batch_{i:02d}.json"
    p.write_text(json.dumps(b, indent=1), encoding="utf-8")
    imgs = sum(len(x["images"]) for x in b)
    index.append({"batch": i, "products": len(b), "images": imgs, "path": str(p).replace("\\", "/")})

(outdir / "index.json").write_text(json.dumps(index, indent=1), encoding="utf-8")
print(f"batches: {len(batches)}")
print(f"total products: {sum(x['products'] for x in index)}  total images: {sum(x['images'] for x in index)}")
for x in index:
    print(f"  batch_{x['batch']:02d}: {x['products']} products, {x['images']} images")
