#!/usr/bin/env python3
"""
Patch every white_seamless_hero block in codex_image_prompts.md so it reads
as real studio product photography instead of a CGI/3D render.

CEO verdict (2026-07-16): the white-seamless hero shots read as CGI --
too-perfect lighting, flawless styling, no photographic character. The
environmental room scenes pass and are untouched. This script only touches
`## ..._white_seamless_hero` blocks. It:

  1. Appends the PHOTO_STYLE paragraph to the end of the PROMPT: text
     (before NEGATIVE:), on every hero block. Product-specific description
     (materials, colors, form, hardware) is left completely untouched --
     this is additive, never a rewrite of the existing sentence.
  2. Appends any of NEW_NEGATIVE_TERMS to the NEGATIVE: line that are not
     already present (case-insensitive substring match), so we never
     duplicate an existing ban.

Idempotent: running twice does not double-append (checked via a marker
substring from PHOTO_STYLE).

Usage: python scripts/patch_hero_prompts.py
"""
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
TARGET_FILE = REPO_ROOT / "codex_image_prompts.md"

# Marker substring used to detect "already patched" -- must appear nowhere
# in the original prose.
IDEMPOTENCY_MARKER = "medium-format digital camera"

PHOTO_STYLE = (
    "Shot on a medium-format digital camera with an 80mm lens at f/8 for "
    "true optical depth and honest micro-detail, not synthetic perfection. "
    "Lit with a large softbox key camera-left and a smaller fill softbox "
    "camera-right at a lower ratio, so the falloff between light and shadow "
    "is visible and gently graduated rather than perfectly even. Backdrop "
    "is a genuine white cyclorama sweep with a soft, naturally curved "
    "sweep-to-floor transition, a faint true floor shadow directly beneath "
    "the product, and a slight optical vignette toward the frame edges from "
    "the physical lens, not a flat digital cutout. Materials show "
    "real-world imperfection: natural fabric drape with visible weight and "
    "slight wrinkle, authentic wood-grain variance from panel to panel, and "
    "believable specular reflections on any metal or laminate surface that "
    "shift with the studio lighting rather than reading as a uniform CGI "
    "sheen. Color response reads like true photographic film stock -- "
    "accurate but not oversaturated, with a faint, even micro-grain across "
    "the frame instead of a flawless digital-render surface."
)

NEW_NEGATIVE_TERMS = [
    "3D render look",
    "CGI",
    "videogame lighting",
    "plastic sheen",
    "overly perfect symmetry",
]

BLOCK_SPLIT_RE = re.compile(r"(?=^## )", re.MULTILINE)
PROMPT_RE = re.compile(r"(PROMPT:\n)(.*?)(\n\nNEGATIVE:\n)(.*?)(\n\n---|\Z)", re.S)


def patch_block(block: str) -> tuple[str, bool]:
    if "shot_type: white_seamless_hero" not in block:
        return block, False

    m = PROMPT_RE.search(block)
    if not m:
        # Shouldn't happen for a well-formed block; leave untouched.
        return block, False

    prefix, prompt_text, mid, negative_text, tail = m.groups()

    changed = False

    if IDEMPOTENCY_MARKER not in prompt_text:
        prompt_text = prompt_text.rstrip() + " " + PHOTO_STYLE
        changed = True

    neg_lower = negative_text.lower()
    to_add = [t for t in NEW_NEGATIVE_TERMS if t.lower() not in neg_lower]
    if to_add:
        negative_text = negative_text.rstrip() + ", " + ", ".join(to_add)
        changed = True

    if not changed:
        return block, False

    new_block = block[: m.start()] + prefix + prompt_text + mid + negative_text + tail + block[m.end():]
    return new_block, True


def main() -> int:
    text = TARGET_FILE.read_text(encoding="utf-8")

    parts = BLOCK_SPLIT_RE.split(text)
    # parts[0] is the file header before the first "## " block.
    patched_count = 0
    out_parts = [parts[0]]
    for part in parts[1:]:
        new_part, changed = patch_block(part)
        out_parts.append(new_part)
        if changed:
            patched_count += 1

    new_text = "".join(out_parts)

    orig_output_paths = re.findall(r"^- output_path: (.+)$", text, re.MULTILINE)
    new_output_paths = re.findall(r"^- output_path: (.+)$", new_text, re.MULTILINE)
    orig_block_count = len(re.findall(r"^## ", text, re.MULTILINE))
    new_block_count = len(re.findall(r"^## ", new_text, re.MULTILINE))

    if orig_output_paths != new_output_paths:
        print("ERROR: output_path list changed -- aborting write.", file=sys.stderr)
        return 1
    if orig_block_count != new_block_count:
        print(
            f"ERROR: block count changed ({orig_block_count} -> {new_block_count}) -- aborting write.",
            file=sys.stderr,
        )
        return 1
    if "—" in PHOTO_STYLE or "—" in ", ".join(NEW_NEGATIVE_TERMS):
        print("ERROR: em-dash detected in injected text -- aborting write.", file=sys.stderr)
        return 1

    TARGET_FILE.write_text(new_text, encoding="utf-8")

    print(f"Blocks total: {new_block_count}")
    print(f"Hero blocks patched: {patched_count}")
    print(f"output_path count unchanged: {len(orig_output_paths)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
