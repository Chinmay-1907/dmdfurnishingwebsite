# Audit 13 — seo-programmatic (agent)

**Lens:** programmatic page template + dataset quality
**Target:** DMD Furnishing — `/products/[placeSlug]` (place pages) + `/products/[placeSlug]/[typeSlug]` (furniture-type pages) + the flat `/products/[slug]` detail pages that share the same dynamic route, all driven by one XML dataset.
**Date:** 2026-06-10
**Status:** Complete (source + live `:3006` HTML verified). No external API needed for this lens.

## What this lens audits

Template-and-dataset page generation at scale: one template × many data rows = many URLs. The questions are (1) how big is the surface, (2) is each generated page meaningfully unique or thin/duplicated, (3) is the dataset clean with a thin-content gate, (4) are the pages cross-linked into hubs and reachable, (5) is indexation controlled (canonical, sitemap, noindex of junk). I am NOT auditing single hand-written pages — that's the article lens.

## Method

- Read the three template files: `app/products/page.js`, `app/products/[placeSlug]/page.js` (dispatcher: place listing OR flat product detail), `app/products/[placeSlug]/[typeSlug]/page.js` (furniture-type pages).
- Read the data layer `lib/catalog.js` (XML parser) + content layers `lib/place-content.js` and `lib/product-copy.js`.
- Ran the catalog against Node to get exact counts (not estimates).
- Curled live pages: `/products/hotel`, `/products/hotel/guest-room`, `/products/2-seater-sofa` — checked title/H1/description/canonical/schema/internal links.
- Measured copy duplication: hashed the detail-page copy blocks across all 174 product pages.

## Programmatic surface (templates + dataset size + URL count)

**Dataset:** one file, `public/DMD_Website.xml` (246 KB). Parsed live: 8 raw places (school+university merge → 1, so **7 places**), **21 furniture types**, **74 subcategories**, **174 unique products**. Only 3 `<member>` cross-membership tags — products are mostly single-context.

**Three templates, one route tree:**

| Template | URL pattern | Count (verified) | Content source |
|---|---|---|---|
| Place listing | `/products/{place}` | **7** | XML + hand-written `place-content.js` (intro, 5-item buying guide, materials, 3 FAQs) per place |
| Furniture-type | `/products/{place}/{type}` | **20** | XML; gated to pairs with ≥3 products (21 pairs exist, 1 dropped) |
| Flat product detail | `/products/{slug}` | **174** | XML (name, desc, specs, images) + `product-copy.js` (1 of 14 type-keyed copy groups) |
| Catalog root | `/products` | 1 | XML A–Z index + 3 hand-written FAQs |

**Total programmatic URLs = ~202** (7 + 20 + 174 + 1). The snapshot's "~231" overcounts; real generated count is ~201. `dynamicParams = false` on both dynamic routes — only allow-listed slugs build, everything else 404s (good indexation hygiene).

**Verdict on volume:** this is a small, curated programmatic surface, not a 1,000–10,000-page spam farm. That matches the lens research note (DMD's ICP is too narrow for true scale programmatic). The right bar here is "every page earns its index slot," and the build is mostly hitting it.

## Findings (table: Severity | Template/Page | Issue | Fix)

| Severity | Template/Page | Issue | Fix |
|---|---|---|---|
| 🟢 | All three templates | Per-page unique title, H1, meta description, canonical (self-referential to prod domain), JSON-LD all confirmed in live HTML. `/products/hotel` → 8 LD blocks incl. FAQPage; type page → CollectionPage+ItemList+BreadcrumbList; product → Product+Breadcrumb. Indexation control is solid. | None — keep. |
| 🟢 | Thin-content gate | `[typeSlug]` route hard-gates at `MIN_PRODUCTS = 3` (`eligiblePairs()`). 1 of 21 pairs correctly excluded. This is exactly the dataset-junk gate the lens wants. | None. |
| 🟢 | Place pages | All 7 places have full hand-written `place-content.js` (intro + 5 buying-guide cards + materials para + 3 FAQs). No place renders bare. `PLACES_WITHOUT_CONTENT = none`. | None. |
| 🟠 | Flat product detail (174 pages) | The two "expert" copy blocks (materials + specification) come from only **14 distinct groups** → **~12.4 product pages share the exact same two paragraphs**. Each page is still differentiated by unique name/desc/specs/gallery/title, but the largest visible body text is duplicated 24× (casegoods group), 20× (lounge), 18× (classroom). At 174 pages this is a moderate near-duplicate signal. | Inject ≥1 truly per-product sentence into the detail body (e.g. weave `product.specifications` — material, dimensions — into prose, or a one-line per-product use note in the XML). Cheap: the specs data already exists per row. |
| 🟠 | `[typeSlug]` template | Hero description is a single formula: `"{n} contract-grade pieces for {place} projects across {subcats}. Every unit is built to commercial duty cycles…"`. All 20 type pages share the same closing sentence verbatim. Body is otherwise just a product grid — no buying-guide / FAQ block like place pages get. | Add a short type-level content block (2–3 sentences + maybe FAQ) keyed by furniture type, mirroring `place-content.js`. These 20 pages target the best mid-tail queries ("hotel guest room furniture") and are the thinnest of the three templates. |
| 🟡 | Type pages | No FAQPage schema on `[typeSlug]` (confirmed `FAQ: False` live) while place + catalog pages have it. Missed rich-result + GEO surface on the mid-tail pages. | Add 2–3 type-specific FAQs + FAQPage JSON-LD when the content block above is added. |
| 🟡 | Place page meta | Only 7 of the place slugs have `placeMetaOverrides`; the override map and `place-content.js` are two parallel hand-maintained sources keyed by the same slugs. Drift risk if a new place is added (gets generic `"{Place} Furniture"` title + no body content silently). | Single source of truth: fold overrides into `place-content.js`, or add a build-time assert that every place has both. |
| 🟡 | Dataset hygiene | Raw XML place descriptions are boilerplate (`"Hotel furniture collection"`, `"Lobby Area furniture collection"`) — fine because templates override them, but `getPlaceBySlug().description` is still the fallback hero text if `place-content` is missing. Latent thin-content fallback. | Either enrich XML descriptions or make missing `place-content` a build failure (ties to the 🟡 above). |
| 🟢 | Internal linking | Strong. Place page renders: type-page hub links (≥3 gate), a full server-rendered A–Z `<details>` index of every product (80 product links in `/products/hotel` HTML), breadcrumbs. Type page links back to place + sibling types. Every product reachable in static HTML within 2–3 clicks of `/products`. This is the lens's section-5 requirement, done well. | None. |
| 🟢 | Canonical / dedup | Flat product URL is canonical even though a product can belong to multiple places (`memberships[]`). No duplicate product URLs per place — the old 4-segment URLs redirect via `netlify.toml`. Avoids the classic programmatic duplicate-path trap. | None. |

## Thin-content / duplication risk

**Bounded, not severe.** Three layers protect against the usual programmatic deindex risk:
1. **Hand-written place content** — 7 places, all fully populated, no templated filler.
2. **≥3-product gate** on type pages kills the thinnest combinations (the section-7 quality safeguard).
3. **Unique-stat layer per product** — every one of the 174 has a unique hand-written `description`, unique specs, unique gallery, unique title (0 products with missing/thin descriptions).

**The one real risk:** the 174 detail pages reuse the same ~14 expert copy blocks, so the *largest block of prose* on each product page is shared with ~12 siblings. Google tolerates this when surrounded by unique data (and it is), but it caps these pages' standalone ranking ceiling and is the first thing a manual-action reviewer would flag. The fix is cheap because per-product data (specs) already exists to differentiate. The 20 type pages are the second risk — thin (grid + one shared sentence) and no FAQ — yet they sit on the highest-value mid-tail queries.

No AI-spam smell, no fabricated stats (place-content explicitly avoids them), no orphan pages, no runaway scale.

## Score (78/100)

- Indexation control, canonical, sitemap, `dynamicParams=false`, schema coverage: excellent (lens sections 5 + 6).
- Dataset + thin-content gate + hand-written hubs: strong (sections 2, 3, 7).
- Lost points: detail-page copy duplicated ~12× (174 pages, 14 blocks); type pages thin + no FAQ schema; two parallel hand-keyed content maps with silent-drift risk.

## Top 3 actions

1. **De-duplicate the 174 detail pages** — weave each product's own `specifications` (material, dimensions, finish) into the detail-page prose so the biggest text block stops being shared 12×. Data already exists per row; this is a template edit in `ProductDetailPage.js` + `product-copy.js`, not new content work.
2. **Thicken the 20 type pages** — add a per-type content block (2–3 sentences + 2–3 FAQs + FAQPage JSON-LD) keyed like `place-content.js`. These pages own the best mid-tail intent ("hotel guest room furniture") and are currently the thinnest template.
3. **Collapse the two place-keyed maps** (`placeMetaOverrides` + `place-content.js`) into one source with a build-time assert that every place slug has title + body, so adding a place can never silently ship a generic, content-less listing.
