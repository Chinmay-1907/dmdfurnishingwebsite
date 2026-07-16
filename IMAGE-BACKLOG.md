# IMAGE BACKLOG — Standing Order for Codex (2026-07-16)

**Status:** OPEN, long-running. No deadline pressure — this grinds over weeks.
**Owner:** Codex (renderer). Claude orchestrates, never renders.
**CEO decisions locked 2026-07-16:** render ALL 930 straight through (no priority cut) · ship as **WebP q80** · no images rendered inside agent sessions.

---

## TOP PRIORITY — RE-RENDER: closet heroes first (2026-07-16)

**CEO verdict on the 30 rendered walk-in-closet images:** the white-seamless-background
hero shots read as CGI / 3D renders — too-perfect lighting, flawless styling, no
photographic character. **The 5 environmental room scenes per product PASS and stay as
they are — do not touch them.**

**Fix applied:** the hero prompt style was rewritten in `closet_image_prompts.md` (5
blocks) and, for consistency, in every `white_seamless_hero` block across
`codex_image_prompts.md` (143 blocks, via `scripts/patch_hero_prompts.py`) to read as
real studio product photography — named camera/lens/aperture, softbox key + fill with
visible falloff, true white cyclorama with natural floor shadow + slight vignette,
real-world material imperfection, film-like color response and micro-grain. Product
specifics (materials, dimensions, consistency_profile, output_path) are untouched.
`NEGATIVE:` now also bans: 3D render look, CGI, videogame lighting, overly perfect
symmetry (plastic sheen was already banned everywhere).

**The runner skips any `output_path` that already exists on disk — so the 5 old CGI-looking
hero PNGs must be deleted before the next render pass, or they will never get
re-rendered.** Delete (do NOT overwrite in place, so a failed re-render doesn't leave a
stale WebP conversion state — see gotcha below) exactly these 5 files:

```
public/Images/Residential/Closets/Walk-In Closets/Modular Walk-In Closet System L-Shaped/modular walk-in closet system l-shaped 1.png
public/Images/Residential/Closets/Walk-In Closets/Boutique Walk-In Wardrobe with Center Island/boutique walk-in wardrobe with center island 1.png
public/Images/Residential/Closets/Walk-In Closets/Floor-to-Ceiling Walk-In Closet Double-Sided/floor-to-ceiling walk-in closet double-sided 1.png
public/Images/Residential/Closets/Walk-In Closets/Compact Walk-In Closet System for Condos/compact walk-in closet system for condos 1.png
public/Images/Residential/Closets/Walk-In Closets/Luxury Dressing Room Suite with Vanity/luxury dressing room suite with vanity 1.png
```

Also clear their rows (or flip `status` to something other than `OK`) for the matching
`image_id`s in `generation_log.csv`, so the resumable-skip check doesn't treat them as
already done. Then run the renderer against `closet_image_prompts.md` — it will re-render
only these 5 (everything else in that file is untouched and already on disk).

**Going forward:** every future `white_seamless_hero` render — in `closet_image_prompts.md`,
`codex_image_prompts.md`, and any new prompt file — now uses the photographic template
above. No hero prompt should go back to the old flawless-CGI style language.

---

## What this is

930 product images for the DMD custom catalog (174 custom products × missing shots).
Prompts are fully authored and committed: **`codex_image_prompts.md`** (repo root, one
`##` block = one image, self-contained prompt + NEGATIVE + exact `output_path`).

Progress: **~24 / 930 rendered** (see `generation_log.csv`). Last render 2026-07-11.
The 30 walk-in-closet images are otherwise DONE and committed separately, outside this
930 count — EXCEPT the 5 white-seamless heroes, which need a re-render per the top
priority section above.

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
