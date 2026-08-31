#!/usr/bin/env python3
"""
scripts/dedupe_products.py

Removes duplicate supplier (FOA) products from public/DMD_Website.xml per the
precomputed plan .staging-foa/dedupe_plan.json. See task doc for full spec.

ponytail: single-pass regex XML surgery, not a full XML parser -- matches
lib/catalog.js's own regex-based approach. Upgrade to lxml if the XML ever
grows real nesting/CDATA that breaks the `[^>]*` opening-tag assumption.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
XML_PATH = ROOT / "public" / "DMD_Website.xml"
BACKUP_PATH = ROOT / "public" / "DMD_Website.xml.bak-dedupe"
PLAN_PATH = ROOT / ".staging-foa" / "dedupe_plan.json"
QUARANTINE_PATH = ROOT / ".staging-foa" / "quarantine_dedupe.xml"
REDIRECTS_PATH = ROOT / ".staging-foa" / "dedupe_redirects.json"
REDIRECTS_ROOT_PATH = ROOT / "redirects-dedupe.json"
NEXT_CONFIG_PATH = ROOT / "next.config.js"

PRODUCT_BLOCK_RE = re.compile(r"<product\b[^>]*>.*?</product>", re.DOTALL)
COMMENT_RE = re.compile(r"<!--.*?-->", re.DOTALL)


def to_slug(s):
    """Mirrors lib/catalog.js toSlug()."""
    s = (s or "").strip().lower()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[^a-z0-9-]", "", s)
    return s


def get_attr(tag_text, name):
    m = re.search(rf'{name}="([^"]*)"', tag_text)
    return m.group(1) if m else None


def xml_escape(s):
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def find_live_products(xml_text):
    """Returns list of dicts {start, end, text, open_end, sku, name} for every
    <product> block NOT inside an XML comment, in file order."""
    comment_spans = [(m.start(), m.end()) for m in COMMENT_RE.finditer(xml_text)]

    def in_comment(pos):
        return any(a <= pos < b for a, b in comment_spans)

    products = []
    for m in PRODUCT_BLOCK_RE.finditer(xml_text):
        if in_comment(m.start()):
            continue
        block = m.group(0)
        open_end = block.index(">") + 1  # end of opening <product ...> tag
        open_tag = block[:open_end]
        products.append(
            {
                "start": m.start(),
                "end": m.end(),
                "text": block,
                "open_end": open_end,
                "sku": get_attr(open_tag, "sku"),
                "name": get_attr(open_tag, "name"),
            }
        )
    return products


def main():
    if BACKUP_PATH.exists():
        print(f"FATAL: backup already exists at {BACKUP_PATH}", file=sys.stderr)
        sys.exit(1)

    plan = json.loads(PLAN_PATH.read_text(encoding="utf-8"))
    xml_text = XML_PATH.read_text(encoding="utf-8")

    BACKUP_PATH.write_bytes(XML_PATH.read_bytes())

    products = find_live_products(xml_text)
    by_sku = {p["sku"]: p for p in products if p["sku"]}

    drop_sku_set = set()
    for group in plan:
        for d in group["drop"]:
            drop_sku_set.add(d["sku"])

    # Initial slug universe: every live product that will remain after drops
    kept_slugs = {to_slug(p["name"]) for p in products if p["sku"] not in drop_sku_set}

    # --- Determine renames (file order, collision-checked) -----------------
    rename_candidates = []
    for group in plan:
        if group["keep"]["name"] == group["base"]:
            continue
        p = by_sku.get(group["keep"]["sku"])
        if p is None:
            print(f"FATAL: keep sku not found in XML: {group['keep']['sku']}", file=sys.stderr)
            sys.exit(1)
        rename_candidates.append((p["start"], group, p))
    rename_candidates.sort(key=lambda t: t[0])

    renames = {}  # sku -> new_name
    slug_map = {}  # group index -> final kept slug
    skipped_renames = []

    for _, group, p in rename_candidates:
        old_slug = to_slug(p["name"])
        new_slug = to_slug(group["base"])
        if new_slug == old_slug:
            continue
        if new_slug in kept_slugs:
            skipped_renames.append({"group": group, "reason": f"collision with '{new_slug}'"})
            continue
        kept_slugs.discard(old_slug)
        kept_slugs.add(new_slug)
        renames[p["sku"]] = group["base"]

    # Final kept slug per group (post-rename decision)
    for group in plan:
        sku = group["keep"]["sku"]
        if sku in renames:
            slug_map[sku] = to_slug(renames[sku])
        else:
            slug_map[sku] = group["keep"]["slug"]

    # --- Build edit list: removals + renames -------------------------------
    removals = []  # (start, end)
    renamed_count = 0
    for group in plan:
        for d in group["drop"]:
            p = by_sku.get(d["sku"])
            if p is None:
                print(f"FATAL: drop sku not found in XML: {d['sku']}", file=sys.stderr)
                sys.exit(1)
            removals.append((p["start"], p["end"], p["text"]))

    edits = []  # (start, end, replacement) sorted, non-overlapping
    for start, end, _text in removals:
        # also swallow a single trailing newline for tidy output
        real_end = end
        if xml_text[end : end + 1] == "\n":
            real_end += 1
        edits.append((start, real_end, ""))

    for sku, new_name in renames.items():
        p = by_sku[sku]
        open_tag = p["text"][: p["open_end"]]
        escaped = xml_escape(new_name)
        new_open_tag = re.sub(r'id="[^"]*"', f'id="{escaped}"', open_tag, count=1)
        new_open_tag = re.sub(r'name="[^"]*"', f'name="{escaped}"', new_open_tag, count=1)
        edits.append((p["start"], p["start"] + p["open_end"], new_open_tag))
        renamed_count += 1

    edits.sort(key=lambda e: e[0])

    # --- Apply edits + collect quarantine text ------------------------------
    out_parts = []
    quarantine_blocks = []
    cursor = 0
    removal_texts_by_start = {r[0]: r[2] for r in removals}

    for start, end, replacement in edits:
        out_parts.append(xml_text[cursor:start])
        if replacement == "" and start in removal_texts_by_start:
            quarantine_blocks.append(removal_texts_by_start[start])
        out_parts.append(replacement)
        cursor = end
    out_parts.append(xml_text[cursor:])
    new_xml = "".join(out_parts)

    # --- Redirects -----------------------------------------------------------
    redirects = []
    seen_sources = set()

    def add_redirect(source, destination):
        if source == destination:
            return
        if source in seen_sources:
            return
        seen_sources.add(source)
        redirects.append({"source": source, "destination": destination})

    for group in plan:
        final_slug = slug_map[group["keep"]["sku"]]
        for d in group["drop"]:
            add_redirect(f"/products/{d['slug']}", f"/products/{final_slug}")
        if group["keep"]["sku"] in renames:
            add_redirect(f"/products/{group['keep']['slug']}", f"/products/{final_slug}")

    # --- Write outputs ---------------------------------------------------------
    with open(XML_PATH, "w", encoding="utf-8", newline="") as f:
        f.write(new_xml)

    quarantine_xml = "<removed>\n" + "\n".join(quarantine_blocks) + "\n</removed>\n"
    with open(QUARANTINE_PATH, "w", encoding="utf-8", newline="") as f:
        f.write(quarantine_xml)

    with open(REDIRECTS_PATH, "w", encoding="utf-8", newline="\n") as f:
        json.dump(redirects, f, indent=2)
        f.write("\n")

    with open(REDIRECTS_ROOT_PATH, "w", encoding="utf-8", newline="\n") as f:
        json.dump(redirects, f, indent=2)
        f.write("\n")

    # --- Wire into next.config.js ------------------------------------------
    config_text = NEXT_CONFIG_PATH.read_text(encoding="utf-8")
    if "dedupeRedirects" not in config_text:
        config_text = config_text.replace(
            "const path = require('path');",
            "const path = require('path');\nconst dedupeRedirects = require('./redirects-dedupe.json');",
            1,
        )
        config_text = config_text.replace(
            """  async redirects() {
    return [
      {
        source: '/schedule-call',
        destination: '/contact#schedule',
        permanent: true,
      },
    ];
  },""",
            """  async redirects() {
    return [
      {
        source: '/schedule-call',
        destination: '/contact#schedule',
        permanent: true,
      },
      ...dedupeRedirects.map((r) => ({
        source: r.source,
        destination: r.destination,
        permanent: true,
      })),
    ];
  },""",
            1,
        )
        NEXT_CONFIG_PATH.write_text(config_text, encoding="utf-8", newline="\n")

    print(f"groups: {len(plan)}")
    print(f"removed: {len(removals)}")
    print(f"renamed: {renamed_count}")
    print(f"skipped renames (collision): {len(skipped_renames)}")
    for s in skipped_renames:
        print(f"  - {s['group']['collection']}: {s['reason']}")
    print(f"redirects: {len(redirects)}")


if __name__ == "__main__":
    main()
