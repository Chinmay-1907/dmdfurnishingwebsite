# IMAGE BACKLOG — Standing Order for Codex (2026-07-16)

**Status:** OPEN, long-running. No deadline pressure — this grinds over weeks.
**Owner:** Codex (renderer). Claude orchestrates, never renders.
**CEO decisions locked 2026-07-16:** render ALL 930 straight through (no priority cut) · ship as **WebP q80** · no images rendered inside agent sessions.

---

## TOP PRIORITY — RE-RENDER: closet heroes first (2026-07-16, v2 2026-07-16)

**CEO verdict on the 30 rendered walk-in-closet images:** the white-seamless-background
hero shots read as CGI / 3D renders — too-perfect lighting, flawless styling, no
photographic character. **Each of the 5 closet products has TWO `full_room_scene`
blocks (10 environmental room scenes total across the 30) and those PASS and stay as
they are — do not touch them.** Only the 5 `white_seamless_hero` blocks (one per
product) needed the fix.

**Fix applied (v2, block-aware — not a single fixed paragraph):** the hero prompt style
was rewritten in `closet_image_prompts.md` (5 blocks, by hand) and, for consistency, in
every `white_seamless_hero` block across `codex_image_prompts.md` (143 blocks, via
`scripts/patch_hero_prompts.py`) to read as real studio product photography. v1
(2026-07-16 first pass) appended one fixed paragraph to every hero block and CodeRabbit
caught real contradictions that produced (duplicate camera specs, floor-shadow language
on wall-mounted products, fabric-drape language on all-metal/laminate products,
specular-reflection language on blocks that explicitly ban reflections). v2 fixes all
four by making the patch conditional per block:

- **Camera:** detects an existing `50mm`/`f5.6` clause and replaces it in place with
  `medium-format 80mm`/`f/8` — never appends a second camera spec alongside the old one.
- **Wall vs floor:** products whose own `consistency_profile` says `wall-mounted`, `wall
  bracket mount`, or `concealed cleat` (headboards, the wall-mounted study desk) get a
  wall-backdrop + contact-shadow sentence with no floor sweep / floor shadow. Everything
  else (including vanities that merely have a `wall-mount faucet` fixture but stand on
  their own frame/legs) gets the floor-cyclorama variant.
- **Material imperfection:** fabric-drape language only appears when the block actually
  mentions fabric/upholstery/vinyl/leather/COM/cushion; wood-grain language only when
  wood/veneer/laminate/HPL/oak/walnut/etc. is present; metal-specular language only when
  metal is present.
- **NEGATIVE wins:** if a block's own PROMPT or NEGATIVE text already bans reflections
  ("no reflections", "no mirror reflections") the specular-reflection sentence is
  dropped for that block; if it already mentions "vignette" (always a ban in this file)
  the vignette clause is dropped too.

`NEGATIVE:` also gains: 3D render look, CGI, videogame lighting, overly perfect symmetry
(plastic sheen was already banned everywhere, so the script never double-adds it).
Product specifics (materials, dimensions, consistency_profile, output_path) are
untouched. Two authoring bugs in the closet hero prompts were also fixed in the same
pass (verified against the product's own consistency_profile, not guessed): the boutique
island's solid-surface top was wrongly called a "folding surface" (fixed to "counter
surface"), and the floor-to-ceiling double-sided closet had a light-from-directly-above
clause that contradicted the new camera-left key light (removed).

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
`codex_image_prompts.md`, and any new prompt file — now uses the block-aware photographic
template above (see `scripts/patch_hero_prompts.py` for the exact logic). No hero prompt
should go back to the old flawless-CGI style language, and no future patch pass should go
back to a single fixed paragraph appended blindly across a heterogeneous catalog.

---

## PROMPT QC BACKLOG — pre-existing authoring bugs (found 2026-07-16, not fixed yet)

CodeRabbit's review of the hero-prompt patch also surfaced pre-existing bugs in
`codex_image_prompts.md` that are unrelated to the photographic-style fix above. Do NOT
fix these inline as part of the hero-style work — sweep them individually before the
specific product renders:

- **`4-seater-table_white_seamless_hero`** — base described as "T-leg or sled
  construction," an or-alternative a renderer can't resolve to one geometry. Pick one.
- **`residential-sliding-door-wardrobe_white_seamless_hero`** — says "Both sliding doors
  are closed," then later "The left door is pulled slightly open, about 30
  centimeters." Self-contradicting; pick one door state.
- **`double-desk_white_seamless_hero`** — "If under-desk book storage or shelf is part
  of the design, it is visible and in focus" — conditional geometry a renderer can't
  evaluate. State definitively whether the shelf exists.
- **`wooden-teacher-desk_white_seamless_hero`** — "Crisp focus edge-to-edge from back
  rail to front apron to floor stretcher," but the piece is only described with "Four
  solid turned legs," no stretcher. Either add a stretcher to the spec or drop the
  reference.
- **Leather products get generic "natural fabric drape" wording** (e.g.
  `executive-office-chair_white_seamless_hero`) — the material clause treats leather as
  fabric. Refinement: add a leather branch to `scripts/patch_hero_prompts.py` ("supple
  leather grain, subtle creasing, controlled leather specular response") and re-run.
  Cosmetic, not blocking any render.

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
