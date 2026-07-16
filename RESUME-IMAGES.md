# RESUME — DMD Custom Product Images (Part 2)

**Trigger:** when CEO says "let's make the images" (or similar), this is **Step C: render** — the render gate is being cleared. Bring up this whole file + the session recap below, then proceed.

**Role split (CEO-locked):** I am director / prompt-author. **Codex is the renderer.** I do NOT render; I hand Codex the prompt file.

---

## WHERE WE STOPPED
- **Render gate is OPEN.** All 930 prompts authored + verified. Waiting on CEO "go" before any image is rendered.
- Two open items to settle the moment we resume:
  1. **6-slot top-up offer** — 6 gallery positions across 5 products have no prompt yet (Curved Desk, Vanity 7, Kids Twin Bunk Bed, Queen Bed Frame, Twin XL Bunk Bed). Offered to author them. If CEO says yes → run `make_prompt_batches.py` logic for just those, or hand-author 6.
  2. **Test-batch-first suggestion** — render ~10 images, eyeball the look + pipeline, THEN run the full 930.

## THE DELIVERABLE (ready for review/render)
- **`codex_image_prompts.md`** (repo root, 1.98 MB, **930 prompt blocks**) — one self-contained photoreal prompt per image: id, product_ref, shot_type, gallery_position, full PROMPT, NEGATIVE bans, exact `output_path` (under `public/Images/...`), `{product}/{material}/{color}/{ref}` vars, per-product consistency_profile. Header tells Codex exactly how to run it.
- **`generated_image_audit.csv`** (repo root, 1,232 rows) — KEEP 302 / REDO 233 / MISSING 697 verdicts.

## NEXT TASK = STEP C (run Codex)
Codex executes `codex_image_prompts.md` top to bottom:
1. One image per `##` block, from its PROMPT (honor NEGATIVE).
2. Save to the block's `output_path` (already includes `public/...`).
3. Append a row to **`generation_log.csv`**: `image_id,product_ref,shot_type,output_path,status,timestamp` (status OK/FAILED).
4. **Resumable:** skip any block whose `output_path` exists AND is logged OK. Failures = log + continue, never halt.

## THEN STEP 7 (after images exist)
- Assemble each product's gallery in `target_set` order (KEEP images + newly rendered) from `.staging-foa/reconcile/target_sets.json`.
- White (`white_seamless_hero`) is always the grid thumbnail.
- Add the text overlays for the 3 text-free spec shot types (see director calls below).
- Build out the full products page across all 174 items, then restart dev (`npm run dev` :3000) — XML is cached, restart to see changes.

## 3 DIRECTOR CALLS BAKED INTO THE PROMPTS (already CEO-shown)
1. **Spec shots are text-free.** `dimension_diagram`, `footprint_plan`, `material_swatch_row` render as clean photo bases; numbers/labels added later as a **code overlay** on the gallery (AI garbles text + DMD bans baked text).
2. **Environments are sector-appropriate** (hospital room, classroom, office, etc.), not just hotel.
3. **White seamless hero = grid thumbnail, always.**

## VERIFICATION ALREADY DONE (don't redo)
930/930 blocks · 0 dup paths/ids · 0 people/hands/faces leaked · all paths under `public/Images/` w/ existing dirs (fixed 2 mistyped) · 0 em-dashes/non-ascii · 38/38 Rule-1 metadata footers. QA of the *rendered images* (image-qc 6/6) happens in Step C, not before.

## FILES / SCRIPTS (all in `scripts/`)
- `extract_nosku.py` → `.staging-foa/reconcile/nosku_products.json` (174 custom products)
- `make_audit_batches.py` → 34 audit batches | audit Workflow → `audit_result.json`
- `write_audit_csv.py` → `generated_image_audit.csv` + `target_sets.json`
- `make_prompt_batches.py` → 38 prompt batches (`.staging-foa/reconcile/prompt_batches/`)
- `wf_prompt_authoring.js` → the 38-agent Sonnet cmo-visual authoring Workflow (writes `.staging-foa/reconcile/prompt_fragments/batch_NN.md`)
- `assemble_codex_prompts.py` → stitches fragments → `codex_image_prompts.md` (also canonicalizes paths + normalizes typography). Re-run anytime to rebuild the file from fragments.
- `fix_output_paths.py` → standalone path-canonicalizer (folded into assembler; kept as backup)

## SESSION RECAP (what we did)
**Part 1 (FOA images) — shipped earlier:** verified residential catalog clean (0 foreign), WebP -71% (554M→165M), pulled 5 discontinued products, npm 0 vulns, pushed DMD_SEO/master/DB_DMD_WebChanges to commit 781a9a8.
**Part 2 (custom images) — this session:** Step A audit (34-agent vision Workflow, 174 products) → KEEP/REDO/MISSING; CEO chose "Full sets (930)". Step B authoring (38-agent Sonnet Workflow, 2.37M tokens) → all 930 prompts → `codex_image_prompts.md`, verified clean. **Stopped at render gate.**

## NOTES / GOTCHAS
- `codex_image_prompts.md` + `generated_image_audit.csv` are at repo root, **NOT committed**.
- `.staging-foa/` is gitignored (FOA scratch + all reconcile work-files).
- Marketing hard gate: image work routes through cmo-visual (gpt-image-2 = "Codex/OpenAI image" primary). Faceless: no people/hands/faces in any frame.
- DMD product URL slug = `toSlug(name || id)` (`lib/catalog.js:208`) — name, not id.
