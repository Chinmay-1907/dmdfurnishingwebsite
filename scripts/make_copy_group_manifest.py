"""Build copy-groups-manifest.json: a reference for copy writers building the
finer-grained (~60-80 group) replacement for the 15 COPY_GROUPS in
lib/product-copy.js.

For every distinct subcategoryName found in public/DMD_Website.xml, records:
  - product_count: how many live products carry that subcategory
  - current_copy_group: which of the 15 lib/product-copy.js groups it
    resolves to today (exact SUBCATEGORY_GROUP_MAP hit, keyword-regex
    fallback, or 'default')
  - sample_product_names: up to 3 example product names
  - vars_available: for each template var a writer can use
    ({name}/{material}/{color}/{subcategory}/{place}), whether it is usable
    for this group and what fraction of its products actually carry a
    non-empty value

Mirrors lib/catalog.js's own tag-by-tag regex parser rather than a strict
XML library, because DMD_Website.xml is not fully well-formed (see NOTE
below) and the site's real parser tolerates that. SUBCATEGORY_GROUP_MAP and
resolveByKeyword() below are a direct port of lib/product-copy.js -- keep
them in sync if that file's mapping changes.

NOTE (found while building this script): the site's XML tag parser has no
comment-awareness -- it regex-matches any <tag ...> substring in the raw
file, including ones inside <!-- --> blocks. public/DMD_Website.xml has one
commented-out product ("Medical Recliner", public/DMD_Website.xml, Hospital
> Patient Room > Recliner Chair) that is therefore still live on the site
today despite being marked discontinued. This script reproduces the same
behavior on purpose, to keep manifest counts identical to what the live
catalog actually renders. Flagged for the team to fix separately; not
touched here.
"""
import json
import pathlib
import re
from collections import OrderedDict, Counter

XML_PATH = pathlib.Path("public/DMD_Website.xml")
OUT_PATH = pathlib.Path("copy-groups-manifest.json")

# ---------------------------------------------------------------------------
# Port of lib/product-copy.js SUBCATEGORY_GROUP_MAP (keep in sync)
# ---------------------------------------------------------------------------
SUBCATEGORY_GROUP_MAP = {
    "bed frame": "bedFrames",
    "bunk bed": "bedFrames",
    "bunk beds": "bedFrames",
    "head board": "headboards",
    "headboards": "headboards",
    "night stand": "casegoods",
    "nightstand": "casegoods",
    "dresser": "casegoods",
    "wardrobe": "casegoods",
    "wardrobes": "casegoods",
    "amenity tower": "casegoods",
    "tv media panel": "casegoods",
    "tv unit": "casegoods",
    "sideboard": "casegoods",
    "storage cabinets": "casegoods",
    "toy storage": "casegoods",
    "vanities": "casegoods",
    "luggage bench": "casegoods",
    "walk-in closets": "closets",
    "walk-in closet": "closets",
    "closets": "closets",
    "bedside cabinet": "healthcare",
    "overbed table": "healthcare",
    "recliner chair": "healthcare",
    "dining chair": "diningSeating",
    "dining chairs": "diningSeating",
    "bar stool": "diningSeating",
    "bar stools": "diningSeating",
    "booths": "diningSeating",
    "chair": "diningSeating",
    "sofa": "loungeSeating",
    "lobby sofa": "loungeSeating",
    "outdoor sofa": "outdoor",
    "lounge chair": "loungeSeating",
    "arm chair": "loungeSeating",
    "accent chairs": "loungeSeating",
    "reading chairs": "loungeSeating",
    "ergonomic chair": "taskSeating",
    "executive chair": "taskSeating",
    "office chair": "taskSeating",
    "visitor chairs": "publicSeating",
    "waiting chairs": "publicSeating",
    "tiered seating": "publicSeating",
    "desk": "desks",
    "writing desk": "desks",
    "executive desk": "desks",
    "chairs": "education",
    "student desks": "education",
    "teacher desk": "education",
    "lecture desks": "education",
    "study desk": "education",
    "study desks": "education",
    "study tables": "education",
    "podium": "receptionMillwork",
    "dining table": "tables",
    "dining tables": "tables",
    "coffee table": "tables",
    "coffee tables": "tables",
    "magazine table": "tables",
    "reception desk": "receptionMillwork",
    "buffet counter": "receptionMillwork",
    "food service cabinets": "receptionMillwork",
    "bookshelves": "shelving",
    "bookcase": "shelving",
    "outdoor chairs": "outdoor",
    "outdoor lounge chair": "outdoor",
    "outdoor dining set": "outdoor",
    "outdoor side table": "outdoor",
    "patio tables": "outdoor",
}

# Port of lib/product-copy.js resolveByKeyword(), same order/patterns.
KEYWORD_RULES = [
    (re.compile(r"outdoor|patio"), "outdoor"),
    (re.compile(r"closet|wardrobe|dressing room"), "closets"),
    (re.compile(r"bunk|bed frame|\bbed\b"), "bedFrames"),
    (re.compile(r"head ?board"), "headboards"),
    (re.compile(r"recliner|overbed|patient"), "healthcare"),
    (re.compile(r"desk|workstation|podium"), "desks"),
    (re.compile(r"stool|booth"), "diningSeating"),
    (re.compile(r"sofa|lounge|arm ?chair|accent"), "loungeSeating"),
    (re.compile(r"ergonomic|executive chair|office chair|task"), "taskSeating"),
    (re.compile(r"waiting|visitor|tiered"), "publicSeating"),
    (re.compile(r"chair|seating|bench"), "diningSeating"),
    (re.compile(r"reception|buffet|counter|service cabinet"), "receptionMillwork"),
    (re.compile(r"shelf|shelv|bookcase"), "shelving"),
    (re.compile(r"table"), "tables"),
    (re.compile(r"cabinet|wardrobe|dresser|storage|stand|tower|vanit"), "casegoods"),
]


def resolve_copy_group(subcategory_name, furniture_type_name):
    sub = (subcategory_name or "").strip().lower()
    ft = (furniture_type_name or "").strip().lower()
    group = SUBCATEGORY_GROUP_MAP.get(sub)
    if group:
        return group, "exact"
    haystack = f"{sub} {ft}".strip()
    for pattern, group in KEYWORD_RULES:
        if pattern.search(haystack):
            return group, "keyword"
    return "default", "default"


# ---------------------------------------------------------------------------
# Slug (mirrors lib/catalog.js toSlug)
# ---------------------------------------------------------------------------
def to_slug(value):
    if not value:
        return ""
    s = str(value).strip().lower()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[^a-z0-9-]", "", s)
    return s


ATTR_RE = re.compile(r'([a-zA-Z0-9:_-]+)="([^"]*)"')


def parse_attrs(attr_str):
    return dict(ATTR_RE.findall(attr_str))


def decode_entities(s):
    if not s:
        return s
    return (
        s.replace("&quot;", '"')
        .replace("&apos;", "'")
        .replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
    )


TAG_RE = re.compile(r"<(/?)([a-zA-Z0-9:_-]+)([^>]*)>")


def parse_catalog(xml_text):
    """Tag-by-tag walk mirroring lib/catalog.js's parseXml(). Returns a list
    of product records: {name, subcategory_name, furniture_type_name,
    place_name, specifications: [{name, value}, ...]}.
    """
    current_place = current_ft = current_sub = None
    current_product = None
    in_product_specs = False

    records = []

    for m in TAG_RE.finditer(xml_text):
        is_closing = m.group(1) == "/"
        tag = m.group(2)
        attrs_str = m.group(3) or ""
        is_self_closing = attrs_str.rstrip().endswith("/")

        if tag.startswith("!"):
            continue

        if is_closing:
            if tag == "product":
                if current_sub is not None and current_product is not None:
                    records.append(current_product)
                current_product = None
                in_product_specs = False
            elif tag == "subcategory":
                current_sub = None
            elif tag == "furnitureType":
                current_ft = None
            elif tag == "place":
                current_place = None
            elif tag == "specifications":
                in_product_specs = False
            continue

        attrs = parse_attrs(attrs_str)

        if tag == "place":
            current_place = decode_entities(attrs.get("name") or attrs.get("id") or "Unnamed")
        elif tag == "furnitureType":
            if current_place is None:
                continue
            current_ft = decode_entities(attrs.get("name") or attrs.get("id") or "Unnamed")
        elif tag == "subcategory":
            if current_ft is None:
                continue
            current_sub = decode_entities(attrs.get("name") or attrs.get("id") or "Unnamed")
        elif tag == "product":
            if current_sub is None:
                continue
            name = decode_entities(attrs.get("name") or attrs.get("id") or "Unnamed")
            current_product = {
                "name": name,
                "slug": to_slug(name or attrs.get("id")),
                "description": decode_entities(attrs.get("description", "")),
                "tier": decode_entities(attrs.get("tier", "")),
                "sku": decode_entities(attrs.get("sku", "")),
                "subcategory_name": current_sub,
                "furniture_type_name": current_ft,
                "place_name": current_place,
                "specifications": [],
            }
            in_product_specs = False
        elif tag == "specifications":
            if current_product is not None:
                in_product_specs = True
        elif tag == "spec":
            if is_self_closing and in_product_specs and current_product is not None:
                current_product["specifications"].append(
                    {
                        "name": decode_entities(attrs.get("name", "")),
                        "value": decode_entities(attrs.get("value", "")),
                    }
                )

    return records


def find_spec_value(specifications, names):
    lowered = [n.lower() for n in names]
    for spec in specifications:
        if spec["name"] and spec["name"].lower() in lowered and spec["value"]:
            return spec["value"]
    return ""


def main():
    xml_text = XML_PATH.read_text(encoding="utf-8", errors="ignore")
    records = parse_catalog(xml_text)

    # Dedup by slug, first-occurrence-wins (document order) -- mirrors
    # getAllProductsFlat()'s `if (seen.has(product.slug)) continue;`.
    seen_slugs = set()
    products = []
    for r in records:
        if r["slug"] in seen_slugs:
            continue
        seen_slugs.add(r["slug"])
        products.append(r)

    by_subcategory = OrderedDict()
    for p in products:
        by_subcategory.setdefault(p["subcategory_name"], []).append(p)

    subcategory_entries = []
    for sub_name, prods in by_subcategory.items():
        # Use the first product's furnitureTypeName as the keyword-fallback
        # context (matches how getProductCopy resolves per-product; if
        # products in this subcategory span multiple furniture types the
        # group is still identical since the exact map only keys on
        # subcategoryName -- furnitureType only matters for the fallback).
        group, match_kind = resolve_copy_group(sub_name, prods[0]["furniture_type_name"])

        material_hits = sum(1 for p in prods if find_spec_value(p["specifications"], ["Material", "Materials"]))
        color_hits = sum(1 for p in prods if find_spec_value(p["specifications"], ["Color"]))
        description_hits = sum(1 for p in prods if p["description"])

        places_used_in = sorted({p["place_name"] for p in prods if p["place_name"]})
        furniture_types_used_in = sorted({p["furniture_type_name"] for p in prods if p["furniture_type_name"]})

        subcategory_entries.append(
            {
                "subcategoryName": sub_name,
                "productCount": len(prods),
                "currentCopyGroup": group,
                "copyGroupMatchType": match_kind,  # exact | keyword | default
                "placesUsedIn": places_used_in,
                "furnitureTypesUsedIn": furniture_types_used_in,
                "sampleProductNames": [p["name"] for p in prods[:3]],
                "varsAvailable": {
                    "name": True,
                    "subcategory": True,
                    "place": True,
                    "material": {
                        "usable": material_hits > 0,
                        "coverage": f"{material_hits}/{len(prods)}",
                    },
                    "color": {
                        "usable": color_hits > 0,
                        "coverage": f"{color_hits}/{len(prods)}",
                    },
                },
                "descriptionCoverage": f"{description_hits}/{len(prods)}",
            }
        )

    subcategory_entries.sort(key=lambda e: (-e["productCount"], e["subcategoryName"]))

    group_totals = Counter(e["currentCopyGroup"] for e in subcategory_entries)
    group_product_totals = Counter()
    for e in subcategory_entries:
        group_product_totals[e["currentCopyGroup"]] += e["productCount"]

    manifest = {
        "generatedBy": "scripts/make_copy_group_manifest.py",
        "source": XML_PATH.as_posix(),
        "summary": {
            "totalProducts": len(products),
            "totalDistinctSubcategories": len(subcategory_entries),
            "currentCopyGroupCount": 15,
            "subcategoriesByCurrentGroup": dict(group_totals),
            "productsByCurrentGroup": dict(group_product_totals),
            "biggestSubcategories": [
                {"subcategoryName": e["subcategoryName"], "productCount": e["productCount"]}
                for e in subcategory_entries[:10]
            ],
            "note": (
                "One product (Medical Recliner, Hospital > Patient Room > Recliner Chair) "
                "is commented out in the XML with <!-- --> but is still counted here because "
                "lib/catalog.js's parser has no comment-awareness and treats it as live -- "
                "same behavior the real site has today. Not fixed by this script."
            ),
        },
        "subcategories": subcategory_entries,
    }

    OUT_PATH.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    print(f"products parsed (post-dedup): {len(products)}")
    print(f"distinct subcategories: {len(subcategory_entries)}")
    print(f"current 15 groups touched: {len(group_totals)}")
    print("subcategory count by current copy group:")
    for group, count in sorted(group_totals.items(), key=lambda kv: -kv[1]):
        print(f"  {group:20} {count:3} subcategories, {group_product_totals[group]:4} products")
    print("biggest subcategories:")
    for e in subcategory_entries[:10]:
        print(f"  {e['subcategoryName']:30} {e['productCount']:4} products -> {e['currentCopyGroup']}")
    print(f"wrote {OUT_PATH}")


if __name__ == "__main__":
    main()
