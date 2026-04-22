# DMD Furnishing — Image Prompt Library

**Image model:** Nano Banana (Google Gemini Flash Image)
**Updated:** 2026-04-16
**Companion plan:** `C:\Users\chin\.claude\plans\quizzical-singing-firefly.md`

This folder holds copy-paste-ready image prompts for every product in DMD's catalog, organized by vertical. Each product gets exactly 7 prompts covering two in-setting shots, two plain-background angles, and three close-but-unique variations that telegraph DMD's customization positioning.

---

## The 7-image spec per product

Every product follows the same gallery structure. Slot order matters — the first image is the catalog-card face, the second drives the hover swap, the setting pair anchors the visual story, the plain shots carry the clean hero, and the variations sell "we build it your way."

| Slot | Type | Background | Purpose |
|------|------|------------|---------|
| 0 | `setting-angle-a` | In a setting where the piece belongs | Wide 3/4 contextual view |
| 1 | `setting-angle-b` | Same room, different camera angle | Second contextual view; proportion without a ruler |
| 2 | `plain-hero` | Plain muted background | Clean 3/4 hero — catalog-card face |
| 3 | `plain-angle` | Same plain bg | Front / side / close-up zoom |
| 4 | `variation-1` | Same plain bg | Alternate color or fabric |
| 5 | `variation-2` | Same plain bg | Alternate silhouette / arm / trim |
| 6 | `variation-3` | Same plain bg | Alternate finish / accent / fabric family |

### Split-view trick (slots 0 + 1)
Slots 0 and 1 are produced as a **single horizontal 3:2 composition** with two panels, then cropped into two 4:3 images post-generation. This guarantees the piece, room, lighting, and palette stay continuous across the two setting shots. Every setting prompt in this library follows that pattern.

---

## The 4 hard rules (apply to every image)

1. **NO people.** No figures, no body parts, not even in background blur. Use positive framing — "empty, unoccupied, uninhabited" — because Gemini ignores negative prompts.
2. **NO measurements.** No rulers, dimension overlays, spec callouts, or scale diagrams. DMD customizes sizing; fixed measurements undercut the pitch.
3. **Product identity consistent across slots 0–3.** The piece must read as the same SKU across the setting pair and the two plain-bg shots. Use reference-image mode in Nano Banana where available.
4. **Setting matches the vertical.** A waiting-room chair in a hotel lobby breaks the pitch. Each vertical file carries its own setting vocabulary — follow it per product.

---

## Nano Banana conventions (copy-paste-critical)

Prompts in this library are written for Nano Banana / Gemini Flash Image, not Midjourney. Conventions:

### 5-component formula
Every prompt is written as a natural narrative paragraph (never a keyword list) covering:

1. **SUBJECT** — who or what, with specific physical detail
2. **ACTION** — what the subject is doing or the primary visual state
3. **LOCATION / CONTEXT** — where, when, atmospheric conditions
4. **COMPOSITION** — camera angle, framing, spatial relationship
5. **STYLE** — visual register, lighting, reference cameras / photographers / publications

Target 100–200 words per prompt.

### Banned keywords (quality actively degrades if used)
Never include any of these in a prompt:
- "photorealistic", "4K", "8K", "ultra HD", "high resolution"
- "masterpiece", "best quality", "award winning"
- "highly detailed", "ultra detailed", "hyperrealistic", "ultra realistic"
- "trending on artstation", "unreal engine", "octane render"

### Prestigious context anchors (use these instead)
Landing these in the prompt actively improves composition:
- "Architectural Digest interior feature"
- "Kinfolk editorial"
- "Monocle design issue"
- "Wallpaper* magazine spread"
- "Dwell feature"

### No negative prompts
Gemini has no `--no` or negative prompt parameter. Reframe positively:
- ❌ "no people" → ✅ "empty, unoccupied, uninhabited"
- ❌ "no clutter" → ✅ "clean, uncluttered, spare"
- ❌ "no text" → ✅ "text-free, no signage, no labels"

### No flags
No `--ar`, `--v`, `--stylize`, `--s`. Describe aspect ratio in words ("horizontal 3:2 composition", "square framing") or pass it via API parameter. Never write "4K" in the prompt.

### ALL CAPS for hard constraints
For safety-critical or identity-critical rules, use ALL CAPS emphasis mid-prompt — Gemini weights these higher:
- "ONLY the [product] in frame"
- "NEVER include any human figures"

### Camera / lens language (use when useful)
Naming real equipment anchors realism — "shot on Sony A7R IV", "Hasselblad medium format", "85mm f/1.4", "Leica Q".

### Reference-image workflow (strongly recommended)
Nano Banana is excellent at maintaining product identity when given a reference image. Start each product's 7-slot batch from the existing DMD catalog photo — feed it as reference, then generate the 7 new prompts against that anchor. Slots 0–3 should read as the same piece. Only slots 4–6 deliberately vary one lever (color OR silhouette OR fabric family) from the reference.

---

## Output file naming convention

Every generated image should be saved using this pattern:

```
{product-slug}-slot{N}-{type}.webp
```

Examples:
- `3-seater-sofa-slot0-setting-a.webp`
- `3-seater-sofa-slot1-setting-b.webp`
- `3-seater-sofa-slot2-plain-hero.webp`
- `3-seater-sofa-slot3-plain-angle.webp`
- `3-seater-sofa-slot4-var1.webp`
- `3-seater-sofa-slot5-var2.webp`
- `3-seater-sofa-slot6-var3.webp`

Target format: **WebP, under 300 KB per image.**

Suggested folder within `public/Images/`: mirror the existing vertical structure — `public/Images/Hotel/{product-slug}/`, `public/Images/Hospital/{product-slug}/`, etc.

---

## Vertical files

| File | Products | 7-slot prompts | Notes |
|------|----------|----------------|-------|
| [hotel.md](./hotel.md) | 43 | 301 | Guestrooms, breakfast area, lobby seating — biggest vertical |
| [educational-facilities.md](./educational-facilities.md) | 35 | 245 | Merges school (K-12, 18) + university (17) — mirrors live site routing |
| [hospital.md](./hospital.md) | 18 | 126 | Patient room + waiting area |
| [office.md](./office.md) | 18 | 126 | Ergonomic + executive + visitor chairs, desks, storage |
| [restaurant.md](./restaurant.md) | 16 | 112 | Dining + outdoor seating |
| [lobby-area.md](./lobby-area.md) | 9 | 63 | Accent chairs, coffee tables, sofas, reception desk |
| [residential.md](./residential.md) | 0 (backlog) | 0 | No XML products today; 43-item "types to add" backlog across 7 rooms |

**Totals:** 139 products covered · 973 copy-paste-ready prompts.

Each file also includes a **"Furniture types to add"** section listing commercial furniture that's missing from DMD's current catalog. Those lists feed the Phase 4 net-new product backlog in the parent plan.

---

## How to use this library (content producer workflow)

1. **Pick a product** from a vertical file.
2. **Open the existing DMD catalog photo** for that product (path shown in the product header as `Current image`). Upload it to Nano Banana as the reference image.
3. **Paste the slot 0+1 split-view prompt** exactly as written. Generate.
4. **Crop the output** into two 4:3 images using the naming convention shown below each prompt.
5. **Paste slot 2**, generate, save with the shown filename.
6. **Repeat for slots 3, 4, 5, 6.**
7. **Quality-check** every output against the 4 hard rules: no people, no measurements, identity consistent in slots 0–3, setting matches vertical.
8. **Convert to WebP under 300 KB** before committing to `public/Images/`.
9. **Update `public/DMD_Website.xml`** — replace the product's `<images>` block with seven `<image>` tags carrying `type`, `order`, and `primary` attributes per the plan spec.

---

## Phase recommendations (pilot before batch)

Per the parent plan, don't try to generate all 973 images in one pass. Start with:

**Phase 1 — Pilot (5 products):**
- Conference Room Chairs (Office) — has 11 existing images, use as identity baseline
- 3-Seater Sofa (Lobby Area) — flagship, tests split-view on a large upholstered piece
- Executive Desk (Hotel guestroom) — tests the variation slot on a multi-finish product
- High Bar Stool (Restaurant) — currently 1 image, worst-coverage vertical
- Double Drawer Cabinet (Hospital) — currently 1 image, worst-coverage vertical

Generate 35 images, ship the data-model + code changes against these 5, validate gallery rendering and catalog-card hover, then scale to Phase 2 (Hospital + Restaurant) and onward.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Nano Banana generated a person despite the prompt saying "unoccupied" | Regenerate with ALL CAPS emphasis: "ONLY the [product] in frame, NEVER any human figures, NO PEOPLE of any kind" — upgrade positive framing strength |
| Product identity drifted between slots | Use reference-image mode; feed the existing catalog photo as anchor for every slot 0–3 generation |
| Room style feels generic | The vertical file's top-of-file "Setting vocabulary" section defines the canonical setting — re-read it, then rewrite the prompt with more of its specific vocabulary |
| Output has a visible ruler / dimensions | Regenerate. Add to the prompt: "NO measurements, NO rulers, NO dimension overlays, NO spec sheets visible" |
| Split-view came out as one blended image instead of two panels | Re-prompt explicitly: "Produce a single horizontal 3:2 composition divided into a LEFT panel and a RIGHT panel with a clear vertical seam, showing two distinct camera angles of the SAME product in the SAME room" |
| WebP is over 300 KB | Re-export at quality 80, or downscale long edge to 1600 px |

---

## Rebuilding this library

These files were generated by 7 parallel Sonnet agents reading scoped sections of `public/DMD_Website.xml`. To regenerate after a catalog change:

1. Find the new `<place>` line boundaries in `public/DMD_Website.xml` (use Grep for `^\t<place id=`)
2. Re-run the per-vertical agent dispatch from the parent plan with the updated line ranges
3. Update this README's product counts
4. Spot-check 3 products per vertical for prompt quality before declaring done

The CMO team's `image-prompter` agent (`~/.claude/teams/marketing/agents/content/image-prompter.md`) and banana skill (`~/.claude/teams/marketing/skills/content/banana/`) are the canonical sources for Nano Banana conventions. If those evolve, this library's conventions should update to match.
