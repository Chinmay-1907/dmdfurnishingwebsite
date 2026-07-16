"""Stitch the per-batch prompt fragments into the single handoff file
codex_image_prompts.md (header + all fragments in batch order). Verifies the
total prompt-block count against the expected 930 and reports any gaps."""
import pathlib, re, json

ROOT = pathlib.Path(".")
FRAG = ROOT / ".staging-foa/reconcile/prompt_fragments"
OUT = ROOT / "codex_image_prompts.md"
idx = json.loads((ROOT / ".staging-foa/reconcile/prompt_batches/index.json").read_text(encoding="utf-8"))
expected = sum(b["slots"] for b in idx)

HEADER = """# DMD Furnishing — Codex Image Generation Handoff (Part 2, Step C)

**Role:** You (Codex) are the RENDERER. This file is the source of truth. Author = DMD CMO visual director. Execute top to bottom, one image per `##` block, no further interpretation.

## How to run
1. For each `##` block: render ONE photoreal image from its `PROMPT:` text, honoring its `NEGATIVE:` line.
2. Save to the block's `output_path` (already includes the `public/...` prefix and final filename). Create folders as needed.
3. Append one row to `generation_log.csv` (create with header if missing):
   `image_id,product_ref,shot_type,output_path,status,timestamp`
   status = `OK` or `FAILED`. On failure: log `FAILED`, DO NOT halt, continue to the next block.
4. **Resumable:** before rendering, if `output_path` already exists AND its `image_id` is logged `OK`, skip it.

## Global rules (apply to EVERY image)
- Photoreal commercial product / architectural-interior photography. Operator-on-site realism, not ad-agency gloss.
- ABSOLUTELY NO people, hands, fingers, human silhouettes, or faces in any frame.
- NO text, numbers, letters, watermarks, logos, or brand marks baked into any image.
- Consistent material, color, lighting temperature, and lens character within a single product (see each product's `consistency_profile`).
- `white_seamless_hero` is always that product's grid thumbnail.
- Environment shots use a REAL, sector-appropriate context (hotel suite, patient room, classroom, etc.), never a generic stock living room.

## Variable convention
Each block's `vars:` line records `{product}`, `{material}`, `{color}`, `{ref}` for that piece. The PROMPT prose is already resolved to those values; the vars line makes the prompt reusable for a sibling SKU by swapping values.

## Spec shots are text-free by design
`dimension_diagram`, `footprint_plan`, and `material_swatch_row` render as CLEAN photoreal base shots with NO baked numbers, measurement lines, or swatch labels. The actual measurements / swatch names are added later as a code overlay in the product gallery — do not try to render them.

## Suggested aspect ratios
- white_seamless_hero, three_quarter_angle, texture_macro, hardware_detail, side_profile, top_down, material_swatch_row, dimension_diagram, footprint_plan, functional_transformation, modular_reconfig: square 1:1
- full_room_scene, wide_establishing, second_environment, single_prop_styling, vignette, low_hero_angle: landscape 3:2

---

"""

# authoritative image_id -> public output_path (corrects any agent path drift)
canon = {}
for b in idx:
    f = pathlib.Path(b["path"])
    if f.is_file():
        for p in json.loads(f.read_text(encoding="utf-8")):
            for s in p["slots"]:
                canon[s["image_id"]] = "public" + s["output_path"]

def normalize(text):
    # typographic -> ASCII (Rule 4: no em-dashes; avoid odd tokenization)
    text = text.replace(" — ", ", ").replace("—", "-")  # em-dash
    text = text.replace("–", "-")                              # en-dash
    text = text.replace("×", "x").replace("é", "e")      # x , e-acute
    text = text.replace("‘", "'").replace("’", "'")
    text = text.replace("“", '"').replace("”", '"').replace("…", "...")
    return text

parts = [HEADER]
missing = []
counts = {}
for b in idx:
    nn = f"{b['batch']:02d}"
    f = FRAG / f"batch_{nn}.md"
    if not f.is_file():
        missing.append(nn)
        continue
    txt = f.read_text(encoding="utf-8").strip()
    counts[nn] = len(re.findall(r'(?m)^## ', txt))
    parts.append(f"<!-- ===== batch {nn} ===== -->\n{txt}\n")

full = normalize("\n".join(parts))

# canonicalize every block's output_path from the batch JSON, keyed by image_id
def _fix_block(m):
    iid = m.group(1).strip()
    want = canon.get(iid)
    body = m.group(2)
    if want:
        body = re.sub(r"- output_path:\s*\S.*", "- output_path: " + want, body, count=1)
    return "## " + iid + "\n" + body

full = re.sub(r"(?m)^## (.+)\n((?:(?!^## ).*\n?)*)", _fix_block, full)
OUT.write_text(full, encoding="utf-8")

total = sum(counts.values())
print(f"fragments found: {len(counts)}/{len(idx)}")
if missing:
    print(f"MISSING fragments: {missing}")
print(f"prompt blocks assembled: {total}  (expected {expected})")
mismatches = []
for b in idx:
    nn = f"{b['batch']:02d}"
    if nn in counts and counts[nn] != b["slots"]:
        mismatches.append((nn, counts[nn], b["slots"]))
if mismatches:
    print("count mismatches (batch: got/expected):")
    for nn, g, e in mismatches:
        print(f"  batch_{nn}: {g}/{e}")
else:
    print("all present batches match their expected slot counts")
print(f"wrote {OUT}  ({OUT.stat().st_size//1024} KB)")
