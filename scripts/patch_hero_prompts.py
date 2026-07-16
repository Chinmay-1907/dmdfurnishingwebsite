#!/usr/bin/env python3
"""
Patch every white_seamless_hero block in codex_image_prompts.md so it reads
as real studio product photography instead of a CGI/3D render.

CEO verdict (2026-07-16): the white-seamless hero shots read as CGI --
too-perfect lighting, flawless styling, no photographic character. The
environmental room scenes pass and are untouched. This script only touches
`## ..._white_seamless_hero` blocks.

v2 (2026-07-16, post CodeRabbit review of the v1 blanket-append commit):
v1 appended one fixed paragraph to all 143 heroes, which produced real
contradictions across a heterogeneous 930-block catalog:
  - duplicate camera specs (existing "50mm" / "f5.6" clause left in place,
    plus a new "80mm" / "f/8" clause appended alongside it)
  - floor-cyclorama + floor-shadow language appended to wall-mounted
    products (headboards, wall desks) that have no floor contact at all
  - fabric-drape language appended to products with no fabric (steel/
    laminate hospital furniture)
  - specular-reflection / vignette language appended to blocks whose own
    NEGATIVE (or inline "no reflections" / "no vignette" prose) explicitly
    bans exactly that

v2 fixes all four by making the patch block-aware:
  1. CAMERA: detect an existing "50mm" (+ optional "f5.6"/"f/5.6") clause
     in the PROMPT text and replace those tokens in place (50mm ->
     "medium-format 80mm", f5.6/f/5.6 -> f/8). Only append a standalone
     camera sentence for the handful of hero blocks that have no lens
     clause to replace. Never both.
  2. WALL vs FLOOR: a block is treated as wall-mounted only when its own
     `product_ref` or `consistency_profile` line contains "wall-mounted",
     "wall bracket mount", or "concealed cleat" -- NOT just any occurrence
     of "wall-mount" (that also matches "wall-mount faucet" on a
     floor-standing vanity, which is a fixture, not the product). Wall
     blocks get a wall-backdrop + contact-shadow sentence instead of the
     cyclorama-sweep + floor-shadow sentence.
  3. MATERIAL IMPERFECTION: fabric / wood-grain / metal-specular clauses
     are only added when the block's own text actually mentions that
     material family (fabric|upholstery|vinyl|leather|textile|woven|COM|
     cushion for fabric; wood|veneer|laminate|HPL|oak|walnut|maple|birch|
     grain|teak|sheesham for wood; steel|metal|chrome|aluminum|brass|
     nickel|powder-coat|stainless for metal). A block with none of these
     gets a neutral fallback sentence instead of inventing a material.
  4. NEGATIVE-WINS: if the block's own PROMPT or NEGATIVE text already
     bans reflections ("no reflections", "no mirror reflections", "no
     reflection halos") the specular-reflection clause is dropped for
     that block. If it already mentions "vignette" (in this file every
     such mention is a ban -- "no vignette", "no vignette darkening",
     etc.) the vignette clause is dropped too.

Any hero block whose PROMPT:/NEGATIVE: structure doesn't match the
expected shape is warned to stderr (with its block heading) and left
completely untouched -- no silent skip.

Usage: python scripts/patch_hero_prompts.py
"""
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
TARGET_FILE = REPO_ROOT / "codex_image_prompts.md"

# Marker substring used to detect "already patched" (idempotency check on
# re-run). Confirmed absent from the pristine source file.
IDEMPOTENCY_MARKER = "Backdrop is a genuine"

NEW_NEGATIVE_TERMS = [
    "3D render look",
    "CGI",
    "videogame lighting",
    "plastic sheen",
    "overly perfect symmetry",
]

# --- detection patterns -----------------------------------------------

CAMERA_MM_RE = re.compile(r"\b50mm\b")
CAMERA_F_RE = re.compile(r"(?i)f/?\s?5\.6")

# Wall-mounted: only trust the per-block spec fields, not any stray
# "wall-mount" adjective on a fixture (e.g. "wall-mount faucet" on a
# floor-standing vanity with its own metal frame base).
WALL_MOUNT_RE = re.compile(r"(?i)wall-mounted|wall bracket mount|concealed cleat")

FABRIC_RE = re.compile(r"(?i)\bfabric\b|\bupholster\w*\b|\bvinyl\b|\bleather\b|\btextile\b|\bwoven\b|\bCOM\b|\bcushion\w*\b")
WOOD_RE = re.compile(r"(?i)\bwood\w*\b|\bveneer\b|\blaminate\b|\bHPL\b|\boak\b|\bwalnut\b|\bmaple\b|\bbirch\b|\bgrain\b|\bteak\b|\bsheesham\b")
METAL_RE = re.compile(r"(?i)\bsteel\b|\bmetal\w*\b|\bchrome\b|\baluminu?m\b|\bbrass\b|\bnickel\b|\bpowder-coat\w*\b|\bstainless\b")

NO_REFLECT_RE = re.compile(r"(?i)\bno reflections?\b|\bno mirror reflections?\b|\bno reflection halos?\b")
VIGNETTE_MENTION_RE = re.compile(r"(?i)vignette")

BLOCK_SPLIT_RE = re.compile(r"(?=^## )", re.MULTILINE)
PROMPT_RE = re.compile(r"(PROMPT:\n)(.*?)(\n\nNEGATIVE:\n)(.*?)(\n\n---|\Z)", re.S)
PRODUCT_REF_RE = re.compile(r"^- product_ref: (.*)$", re.MULTILINE)
CONSISTENCY_RE = re.compile(r"^- consistency_profile: (.*)$", re.MULTILINE)


def oxford_join(items):
    if len(items) == 1:
        return items[0]
    if len(items) == 2:
        return f"{items[0]} and {items[1]}"
    return ", ".join(items[:-1]) + f", and {items[-1]}"


def build_material_clause(block_text, reflections_banned):
    parts = []
    if FABRIC_RE.search(block_text):
        parts.append("natural fabric drape with visible weight and slight wrinkle")
    if WOOD_RE.search(block_text):
        parts.append("authentic wood-grain variance from panel to panel")
    if METAL_RE.search(block_text) and not reflections_banned:
        parts.append(
            "believable specular reflections on any metal or laminate surface "
            "that shift with the studio lighting rather than reading as a "
            "uniform CGI sheen"
        )
    if not parts:
        parts.append("true surface texture and honest material response rather than a uniform digital sheen")
    return f"Materials show real-world imperfection: {oxford_join(parts)}."


def build_backdrop_clause(is_wall, vignette_banned):
    if is_wall:
        base = (
            "Backdrop is a genuine seamless white studio wall with a soft, "
            "naturally graduated surface and a faint true contact shadow "
            "where the product meets the wall"
        )
    else:
        base = (
            "Backdrop is a genuine white cyclorama sweep with a soft, "
            "naturally curved sweep-to-floor transition and a faint true "
            "floor shadow directly beneath the product"
        )
    if not vignette_banned:
        base += ", plus a slight optical vignette toward the frame edges from the physical lens"
    return base + ", not a flat digital cutout."


LIGHT_CLAUSE = (
    "Lit with a large softbox key camera-left and a smaller fill softbox "
    "camera-right at a lower ratio, so the falloff between light and shadow "
    "is visible and gently graduated rather than perfectly even."
)

COLOR_CLAUSE = (
    "Color response reads like true photographic film stock -- accurate "
    "but not oversaturated, with a faint, even micro-grain across the "
    "frame instead of a flawless digital-render surface."
)

CAMERA_FALLBACK_CLAUSE = (
    "Shot on a medium-format digital camera with an 80mm lens at f/8 for "
    "true optical depth and honest micro-detail, not synthetic perfection."
)


def patch_block(block):
    if "shot_type: white_seamless_hero" not in block:
        return block, False

    m = PROMPT_RE.search(block)
    if not m:
        heading = block.splitlines()[0] if block.splitlines() else "<unknown block>"
        print(f"WARNING: hero block failed PROMPT_RE, left untouched: {heading}", file=sys.stderr)
        return block, False

    header = block[: m.start()]
    prefix, prompt_text, mid, negative_text, tail = m.groups()

    if IDEMPOTENCY_MARKER in prompt_text:
        return block, False

    product_ref_m = PRODUCT_REF_RE.search(block)
    consistency_m = CONSISTENCY_RE.search(block)
    spec_scope = (product_ref_m.group(1) if product_ref_m else "") + " " + (
        consistency_m.group(1) if consistency_m else ""
    )

    is_wall = bool(WALL_MOUNT_RE.search(spec_scope))
    reflections_banned = bool(NO_REFLECT_RE.search(prompt_text) or NO_REFLECT_RE.search(negative_text))
    vignette_banned = bool(VIGNETTE_MENTION_RE.search(prompt_text) or VIGNETTE_MENTION_RE.search(negative_text))

    # 1. Camera clause: detect + replace in place, never append a duplicate.
    # Also reconcile the block's own `- consistency_profile:` metadata line
    # (each block carries its own copy) so the same block never ends up
    # holding both "50mm" (in metadata) and "80mm" (in the rendered PROMPT)
    # -- that would still read as a contradiction to anyone auditing the
    # block, even though only PROMPT:/NEGATIVE: feed the renderer.
    had_camera_clause = bool(CAMERA_MM_RE.search(prompt_text))
    if had_camera_clause:
        prompt_text = CAMERA_MM_RE.sub("medium-format 80mm", prompt_text, count=1)
        prompt_text = CAMERA_F_RE.sub("f/8", prompt_text)
    # Every patched hero ends up specifying 80mm/f8 somewhere in its PROMPT
    # (inline replacement above, or the CAMERA_FALLBACK_CLAUSE appended
    # below) -- so always reconcile this block's own metadata copy too,
    # or the block would carry a stale "50mm"/"f5.6" next to the new spec.
    header = CAMERA_MM_RE.sub("medium-format 80mm", header)
    header = CAMERA_F_RE.sub("f/8", header)

    material_clause = build_material_clause(prompt_text + " " + spec_scope, reflections_banned)
    backdrop_clause = build_backdrop_clause(is_wall, vignette_banned)

    style_sentences = []
    if not had_camera_clause:
        style_sentences.append(CAMERA_FALLBACK_CLAUSE)
    style_sentences.append(LIGHT_CLAUSE)
    style_sentences.append(backdrop_clause)
    style_sentences.append(material_clause)
    style_sentences.append(COLOR_CLAUSE)

    prompt_text = prompt_text.rstrip() + " " + " ".join(style_sentences)

    neg_lower = negative_text.lower()
    to_add = [t for t in NEW_NEGATIVE_TERMS if t.lower() not in neg_lower]
    if to_add:
        negative_text = negative_text.rstrip() + ", " + ", ".join(to_add)

    new_block = (
        header
        + prefix
        + prompt_text
        + mid
        + negative_text
        + tail
        + block[m.end():]
    )
    return new_block, True


def main():
    text = TARGET_FILE.read_text(encoding="utf-8")

    parts = BLOCK_SPLIT_RE.split(text)
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
    injected_text_sample = LIGHT_CLAUSE + COLOR_CLAUSE + CAMERA_FALLBACK_CLAUSE
    if "—" in injected_text_sample:
        print("ERROR: em-dash detected in injected text -- aborting write.", file=sys.stderr)
        return 1

    # Duplicate-camera-clause guard: no hero block should contain both the
    # old "50mm" token and the new "80mm" token.
    dup_camera = 0
    for b in re.split(r"(?=^## )", new_text, flags=re.M):
        if "shot_type: white_seamless_hero" not in b:
            continue
        if "50mm" in b and "80mm" in b:
            dup_camera += 1
            print(f"ERROR: duplicate camera clause in {b.splitlines()[0]}", file=sys.stderr)
    if dup_camera:
        return 1

    TARGET_FILE.write_text(new_text, encoding="utf-8")

    print(f"Blocks total: {new_block_count}")
    print(f"Hero blocks patched: {patched_count}")
    print(f"output_path count unchanged: {len(orig_output_paths)}")
    print(f"Duplicate camera clauses: {dup_camera}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
