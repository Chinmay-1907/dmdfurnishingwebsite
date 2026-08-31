#!/usr/bin/env python3
"""Reorder each product's <image> elements so slot 1 = env shot, slot 2 = white shot.

Reads env/white classification from .staging-foa/reorder_shards/ALL.json and
rewrites public/DMD_Website.xml in place (after taking a .bak-reorder backup).
"""
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
XML_PATH = ROOT / "public" / "DMD_Website.xml"
BACKUP_PATH = ROOT / "public" / "DMD_Website.xml.bak-reorder"
ALL_JSON_PATH = ROOT / ".staging-foa" / "reorder_shards" / "ALL.json"
REPORT_PATH = ROOT / ".staging-foa" / "reorder_report.json"

PRODUCT_RE = re.compile(r'<product\b([^>]*)>(.*?)</product>', re.S)
COMMENT_RE = re.compile(r'<!--.*?-->', re.S)
ATTR_RE = re.compile(r'(\w+)="([^"]*)"')
IMAGES_BLOCK_RE = re.compile(r'<images>(.*?)</images>', re.S)
IMAGE_TAG_RE = re.compile(r'<image\b[^>]*/>')
SRC_RE = re.compile(r'src="([^"]*)"')


def decode_entities(s):
    return (
        s.replace("&quot;", '"')
        .replace("&apos;", "'")
        .replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
    )


def to_slug(s):
    s = s.strip().lower()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[^a-z0-9-]", "", s)
    return s


def build_comment_spans(xml):
    return [(m.start(), m.end()) for m in COMMENT_RE.finditer(xml)]


def in_comment(pos, spans):
    return any(a <= pos < b for a, b in spans)


def new_order(n, env_idx, white_idx):
    """Return new index order: env slot, white slot, then rest (original order)."""
    order = []
    if env_idx is not None:
        order.append(env_idx)
    if white_idx is not None and white_idx not in order:
        order.append(white_idx)
    rest = [i for i in range(n) if i not in order]
    return order + rest


def reorder_images_block(block_text, env_idx, white_idx):
    """Return (new_block_text, new_first_src) or (None, None) if no change needed."""
    matches = list(IMAGE_TAG_RE.finditer(block_text))
    texts = [m.group(0) for m in matches]
    n = len(texts)
    if n == 0:
        return None, None

    order = new_order(n, env_idx, white_idx)
    if order == list(range(n)):
        return None, None  # already in desired order

    new_texts = [texts[i] for i in order]

    pieces = []
    last_end = 0
    for m, new_text in zip(matches, new_texts):
        pieces.append(block_text[last_end : m.start()])
        pieces.append(new_text)
        last_end = m.end()
    pieces.append(block_text[last_end:])
    new_block_text = "".join(pieces)

    first_src_match = SRC_RE.search(new_texts[0])
    new_first_src = first_src_match.group(1) if first_src_match else None
    return new_block_text, new_first_src


def main():
    if BACKUP_PATH.exists():
        print(f"ERROR: backup already exists at {BACKUP_PATH}", file=sys.stderr)
        sys.exit(1)

    xml = XML_PATH.read_text(encoding="utf-8")
    shutil.copy2(XML_PATH, BACKUP_PATH)

    with open(ALL_JSON_PATH, encoding="utf-8-sig") as f:
        classification = json.load(f)

    comment_spans = build_comment_spans(xml)

    changed = 0
    unchanged = 0
    cover_changed = 0
    skipped_no_classification = []
    missing_env = []
    missing_white = []

    out_pieces = []
    last_end = 0

    for m in PRODUCT_RE.finditer(xml):
        if in_comment(m.start(), comment_spans):
            continue

        attrs_str, body = m.group(1), m.group(2)
        attrs = dict(ATTR_RE.findall(attrs_str))
        name = decode_entities(attrs.get("name", ""))
        idv = decode_entities(attrs.get("id", ""))
        slug = to_slug(name or idv)

        entry = classification.get(slug)
        if entry is None:
            skipped_no_classification.append(slug)
            continue

        env_idx = entry.get("env_idx")
        white_idx = entry.get("white_idx")
        if env_idx is None:
            missing_env.append(slug)
        if white_idx is None:
            missing_white.append(slug)

        if env_idx is None and white_idx is None:
            skipped_no_classification.append(slug)
            continue

        images_match = IMAGES_BLOCK_RE.search(body)
        if not images_match:
            skipped_no_classification.append(slug)
            continue

        new_block_inner, new_first_src = reorder_images_block(
            images_match.group(1), env_idx, white_idx
        )

        if new_block_inner is None:
            unchanged += 1
            continue

        changed += 1

        # Attrs (incl. cover image="...") come BEFORE the images block in the
        # document, so splice them first, then the images block.
        tag_start = m.start()
        attrs_start = tag_start + len("<product")
        attrs_end = attrs_start + len(attrs_str)

        old_image_attr = attrs.get("image")
        new_attrs_str = attrs_str
        if new_first_src is not None and new_first_src != old_image_attr:
            new_attrs_str, count = re.subn(
                r'image="[^"]*"', f'image="{new_first_src}"', attrs_str, count=1
            )
            if count == 1:
                cover_changed += 1
            else:
                new_attrs_str = attrs_str

        body_start_in_xml = m.start(2)
        img_inner_start = body_start_in_xml + images_match.start(1)
        img_inner_end = body_start_in_xml + images_match.end(1)

        out_pieces.append(xml[last_end:attrs_start])
        out_pieces.append(new_attrs_str)
        out_pieces.append(xml[attrs_end:img_inner_start])
        out_pieces.append(new_block_inner)
        last_end = img_inner_end

    out_pieces.append(xml[last_end:])
    new_xml = "".join(out_pieces)

    with open(XML_PATH, "w", encoding="utf-8", newline="") as f:
        f.write(new_xml)

    report = {
        "changed": changed,
        "unchanged": unchanged,
        "skipped_no_classification": skipped_no_classification,
        "cover_changed": cover_changed,
        "missing_env": missing_env,
        "missing_white": missing_white,
    }
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
