# IMAGE BACKLOG — Standing Order for Codex (2026-07-16)

**Status:** OPEN, long-running. No deadline pressure — this grinds over weeks.
**Owner:** Codex (renderer). Claude orchestrates, never renders.
**CEO decisions locked 2026-07-16:** render ALL 930 straight through (no priority cut) · ship as **WebP q80** · no images rendered inside agent sessions.

---

## What this is

930 product images for the DMD custom catalog (174 custom products × missing shots).
Prompts are fully authored and committed: **`codex_image_prompts.md`** (repo root, one
`##` block = one image, self-contained prompt + NEGATIVE + exact `output_path`).

Progress: **~24 / 930 rendered** (see `generation_log.csv`). Last render 2026-07-11.
The 30 walk-in-closet images are DONE and committed separately — not part of this backlog.

## How to run (daily until done)

1. **CEO terminal only** — double-click `scripts\render-daily.bat`, or:
   ```
   python scripts/render_images.py --file codex_image_prompts.md
   ```
2. Runner is **resumable**: skips any block whose `output_path` exists or is logged
   `OK` in `generation_log.csv`. Failures log and continue. Quota trip = graceful stop.
3. **Never drive the render from a Claude/agent background process** — confirmed killed
   twice (tool-call timeout reaps the child). Nothing is lost when it dies; just re-run.

## Shipping rule — WebP q80 (do NOT raw-commit PNGs)

- Raw PNGs are ~1.9 MB each; 930 ≈ 1.8 GB — too heavy for a repo Netlify clones every build.
- Before committing rendered images: convert **PNG → WebP q80** (runner has the converter)
  → ~560 MB total, matches the site's existing 80%-WebP catalog.
- Then flip the affected `src` refs in `public/DMD_Website.xml` from `.png` → `.webp`
  (~930 refs). Do PNGs + XML flip in the SAME commit or images break.
- The ~20 already-rendered PNGs on disk are uncommitted, waiting for this same conversion.

## After images exist (Step 7 — separate task)

- Assemble galleries per `target_set` order in `.staging-foa/reconcile/target_sets.json`
  (gitignored scratch — regenerate via `scripts/write_audit_csv.py` if missing).
- White seamless hero = grid thumbnail, always.
- Code-overlay the text on the 3 text-free spec shot types (dimension_diagram,
  footprint_plan, material_swatch_row) — AI-baked text is banned.

## Gotchas (field-proven)

- Codex npm shim can't be subprocess-launched on Windows; runner calls `node codex.js`
  directly (`_resolve_codex_base()`, handles both npm layouts — committed + proven).
- Codex sandbox shell is broken here; runner harvests the PNG from
  `~/.codex/generated_images/<session>/` itself.
- Faceless rule: no people/hands/faces in any frame (prompts already enforce).

## Parked behind this

- **Wave 2:** room-scene gap audit for ~581 real-photo supplier products (CEO call:
  keep real supplier photos, ADD AI room scenes). Not started, own run.
