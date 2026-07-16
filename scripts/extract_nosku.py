"""Build the audit work-list: every non-FOA (no sku=) product with its image
files, sector, tier, and on-disk status. Output -> .staging-foa/reconcile/
nosku_products.json (reuse the staging dir; gitignored)."""
import re, json, pathlib, os

xml = pathlib.Path("public/DMD_Website.xml").read_text(encoding="utf-8", errors="ignore")

# capture each product block: the single-line <product ...> + its <images>...</images>
block_re = re.compile(r'<product\b([^>]*)>(.*?)</product>', re.S)
attr_re = lambda a, s: (re.search(a + r'="([^"]*)"', s) or [None, None])[1]
img_src_re = re.compile(r'<image\s+src="([^"]*)"')

rows = []
for m in block_re.finditer(xml):
    attrs, body = m.group(1), m.group(2)
    if 'sku=' in attrs:
        continue  # FOA product, skip
    name = attr_re('name', attrs) or attr_re('id', attrs)
    cover = attr_re('image', attrs)
    tier = attr_re('tier', attrs)
    desc = attr_re('description', attrs)
    gallery = img_src_re.findall(body)
    # sector from cover image path: /Images/<Sector>/...
    sector = None
    if cover:
        mm = re.match(r'/Images/([^/]+)/', cover)
        sector = mm.group(1) if mm else None
    # dedupe images, cover first
    imgs = []
    for p in ([cover] if cover else []) + gallery:
        if p and p not in imgs:
            imgs.append(p)
    on_disk = {p: pathlib.Path("public" + p).is_file() for p in imgs}
    rows.append({
        "ref": name, "sector": sector, "tier": tier,
        "description": desc, "cover": cover,
        "images": imgs, "image_count": len(imgs),
        "missing_on_disk": [p for p, ok in on_disk.items() if not ok],
    })

out = pathlib.Path(".staging-foa/reconcile/nosku_products.json")
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(rows, indent=1), encoding="utf-8")

# summary
from collections import Counter
sec = Counter(r["sector"] for r in rows)
tier = Counter(r["tier"] for r in rows)
imgc = Counter(r["image_count"] for r in rows)
print(f"no-sku products: {len(rows)}")
print(f"total images referenced: {sum(r['image_count'] for r in rows)}")
print(f"products with files missing on disk: {sum(1 for r in rows if r['missing_on_disk'])}")
print("by sector:", dict(sec))
print("tiers present:", dict(tier))
print("images-per-product distribution:", dict(sorted(imgc.items())))
print("wrote", out)
