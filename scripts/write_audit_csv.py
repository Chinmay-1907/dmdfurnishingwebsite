"""Flatten the audit workflow result -> generated_image_audit.csv (spec columns)
+ target_sets.json (per-product tier + ordered set, for gallery assembly later)
+ printed summary counts. Input: .staging-foa/reconcile/audit_result.json
(the workflow's {products:[...]} payload)."""
import json, csv, pathlib
from collections import Counter

data = json.loads(pathlib.Path(".staging-foa/reconcile/audit_result.json").read_text(encoding="utf-8"))
products = data.get("products", data) if isinstance(data, dict) else data

rows = []          # spec rows
target_sets = []   # per-product set for assembly
for p in products:
    ref = p.get("ref"); sector = p.get("sector"); tier = p.get("assigned_tier")
    target_sets.append({"ref": ref, "sector": sector, "tier": tier,
                        "target_set": p.get("target_set", [])})
    for im in p.get("images", []):
        rows.append({
            "product_ref": ref,
            "filename_or_slot": im.get("filename"),
            "shot_type": im.get("shot_type"),
            "verdict": im.get("verdict"),
            "reason": im.get("reason"),
            "target_set_position": im.get("target_set_position"),
            "sector": sector, "assigned_tier": tier,
        })
    for ms in p.get("missing", []):
        rows.append({
            "product_ref": ref,
            "filename_or_slot": ms.get("slot"),
            "shot_type": ms.get("shot_type"),
            "verdict": "MISSING",
            "reason": ms.get("reason"),
            "target_set_position": ms.get("target_set_position"),
            "sector": sector, "assigned_tier": tier,
        })

# stable order: by sector, product, position
rows.sort(key=lambda r: (r["sector"] or "", r["product_ref"] or "", r["target_set_position"] or 0))

cols = ["product_ref", "filename_or_slot", "shot_type", "verdict", "reason",
        "target_set_position", "sector", "assigned_tier"]
out = pathlib.Path("generated_image_audit.csv")
with out.open("w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=cols)
    w.writeheader()
    w.writerows(rows)

pathlib.Path(".staging-foa/reconcile/target_sets.json").write_text(
    json.dumps(target_sets, indent=1), encoding="utf-8")

# summary
verd = Counter(r["verdict"] for r in rows)
tier = Counter(p.get("assigned_tier") for p in products)
sec = Counter(r["sector"] for r in rows)
redo_by_sec = Counter(r["sector"] for r in rows if r["verdict"] == "REDO")
miss_by_sec = Counter(r["sector"] for r in rows if r["verdict"] == "MISSING")
keep_by_sec = Counter(r["sector"] for r in rows if r["verdict"] == "KEEP")
print(f"products audited: {len(products)}")
print(f"total rows: {len(rows)}")
print(f"verdicts: {dict(verd)}")
print(f"tiers: {dict(tier)}")
print(f"renders needed (REDO+MISSING): {verd.get('REDO',0)+verd.get('MISSING',0)}")
print("by sector  KEEP / REDO / MISSING:")
for s in sorted(sec):
    print(f"  {s:14} {keep_by_sec.get(s,0):4} / {redo_by_sec.get(s,0):4} / {miss_by_sec.get(s,0):4}")
print(f"wrote {out} and target_sets.json")
