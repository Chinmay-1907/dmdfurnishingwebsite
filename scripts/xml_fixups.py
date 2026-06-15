"""One-shot DMD_Website.xml fixups after the WebP conversion:
1. Rewrite every residential-catalog image ref (.jpg/.jpeg/.png -> .webp) in
   both the cover image="..." attr and <image src="..."> gallery entries.
2. Fix the single genuinely-mislabeled product GAETANI-56867: it's FOA's
   "Gaetani Side Chair (2/CTN)" — black game-table side chairs sold as a set
   of 2, not a standalone lounge chair. Keep id (URL slug) stable; correct
   name + description + tags + alt text only.
Backup written to .bak4. Idempotent-ish (safe to read counts before/after).
"""
import re, shutil, sys, pathlib

XML = pathlib.Path("public/DMD_Website.xml")
text = XML.read_text(encoding="utf-8", errors="ignore")
shutil.copyfile(XML, "public/DMD_Website.xml.bak4")

# --- 1. webp rewrite (residential-catalog paths only) ---
webp_re = re.compile(r'(/Images/residential-catalog/[^"\s<>]+)\.(?:jpe?g|png)', re.I)
text, n_webp = webp_re.subn(r'\1.webp', text)

# --- 2. GAETANI-56867 relabel (operate only on its single-line <product> tag) ---
NEW_NAME = "Contemporary Black Side Chair, Set of 2 (Gaetani)"
NEW_DESC = ("Contemporary black side chair, set of 2. Matches the Gaetani round "
            "game table. Back and seat cushion.")
NEW_TAGS = "side chair,set of 2,dining room,dining chair,game table seating"

def fix_product_line(m):
    line = m.group(0)
    line = re.sub(r'name="[^"]*"', f'name="{NEW_NAME}"', line, count=1)
    line = re.sub(r'description="[^"]*"', f'description="{NEW_DESC}"', line, count=1)
    line = re.sub(r'tags="[^"]*"', f'tags="{NEW_TAGS}"', line, count=1)
    return line

# a <product ...> tag is one line; target the one carrying sku="GAETANI-56867"
prod_re = re.compile(r'<product\b[^>\n]*sku="GAETANI-56867"[^>\n]*>')
text, n_prod = prod_re.subn(fix_product_line, text)

# alt text for that product's gallery images (unique string, only this product)
text, n_alt = re.subn(
    r'alt="Contemporary Black Accent Chair \(Gaetani\)"',
    f'alt="{NEW_NAME}"', text)

XML.write_text(text, encoding="utf-8")
print(f"webp refs rewritten: {n_webp}")
print(f"GAETANI-56867 product line fixed: {n_prod}")
print(f"GAETANI-56867 alt texts fixed: {n_alt}")
# sanity: any residential .jpg/.png refs left?
leftover = len(re.findall(r'/Images/residential-catalog/[^"\s<>]+\.(?:jpe?g|png)', text, re.I))
print(f"leftover residential jpg/png refs (should be 0): {leftover}")
