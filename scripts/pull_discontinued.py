"""Remove the 5 discontinued products (FOA now 404s them) from DMD_Website.xml.
Each product is a `<!-- BEGIN residential-catalog import<slug> -->` marker
followed by a single-line <product ...> ... </product> block. Remove the
marker through the closing </product> (and an optional END marker if present).
Backup -> .bak5. Reports exact removals; refuses if any slug != 1 match.
"""
import re, shutil, pathlib, sys

XML = pathlib.Path("public/DMD_Website.xml")
slugs = [
    "contemporary-silver-queen-bedroom-set-brachium",     # BRACHIUM-55098
    "contemporary-silver-queen-bedroom-set-brachium-2",   # BRACHIUM-55099
    "transitional-espressogray-accent-chair",             # WORLAND-56284
    "transitional-graphite-loveseat",                     # DELGADA-49989
    "transitional-light-gray-sofa-enea",                  # ENEA-55886
]
text = XML.read_text(encoding="utf-8", errors="ignore")
shutil.copyfile(XML, "public/DMD_Website.xml.bak5")

removed = {}
for slug in slugs:
    marker = "<!-- BEGIN residential-catalog import" + slug + " -->"
    pat = re.compile(re.escape(marker) + r".*?</product>\s*(?:<!--\s*END[^>]*-->\s*)?", re.S)
    new, n = pat.subn("", text)
    removed[slug] = n
    if n != 1:
        print(f"ABORT: slug '{slug}' matched {n} times (expected 1). No write.")
        sys.exit(1)
    text = new

XML.write_text(text, encoding="utf-8")
print("Removed product blocks:")
for s, n in removed.items():
    print(f"  {n}  {s}")
# sanity: no leftover refs to these slugs/skus
for slug in slugs:
    left = text.count("/Images/residential-catalog/" + slug + "/")
    print(f"  leftover refs to {slug}: {left}")
for sku in ["BRACHIUM-55098","BRACHIUM-55099","WORLAND-56284","DELGADA-49989","ENEA-55886"]:
    print(f"  leftover sku {sku}: {text.count(sku)}")
