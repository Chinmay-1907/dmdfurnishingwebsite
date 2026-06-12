# Audit 14 — seo-cluster (agent)

**Lens:** topic clusters + pillar mapping (hub-and-spoke content architecture, topical authority, internal-link reciprocity)
**Target:** DMD Furnishing — B2B commercial/hospitality FF&E manufacturer (lead-gen, not ecommerce)
**Source:** `C:\Users\chin\dmdfurnishingwebsite-fable` (branch `fable-dmd`) · **Live:** http://localhost:3006
**Date:** 2026-06-10
**Status:** complete (source + live HTML verified; no paid keyword API — volume/difficulty are qualitative, see `SEO-GEO-Audit/keyword-map.md`)

---

## What this lens audits

Whether existing content is organized into **pillar → cluster (spoke) → product hub** groups with reciprocal internal linking and full topical coverage. Three questions:
1. Is there a clear pillar for each major topic, and do spokes map to exactly one pillar (no cannibalization)?
2. Does the link graph flow **both ways** — pillar↔spoke, spoke↔spoke, and editorial↔product?
3. Where are the **topical gaps** (clusters with too few spokes, or product verticals with no editorial support)?

This is a structural/architecture audit, not a SERP-overlap keyword study. No GSC/DataForSEO wired, so cluster *grouping* is judged from on-page intent + the existing keyword map, not live SERP co-occurrence.

## Method

- Read both pillar guides in full: `app/guides/hospitality-ffe/page.js`, `app/guides/commercial-furniture-manufacturing/page.js`.
- Read `app/guides/page.js` (the explicit pillar→spoke map) and `app/blog/page.js`.
- Grepped every `app/blog/*/page.js` for `/guides`, `/blog`, `/products` links to build the directed link graph.
- Read `app/products/[placeSlug]/page.js` + `components/products/CategoryContentBlock.js` to inspect the product-hub layer.
- Live-checked `/products/hotel` and `/products/restaurant` HTML for outbound editorial links.
- Cross-referenced `SEO-GEO-Audit/keyword-map.md` (12 clusters already mapped).

## Current cluster map (pillar → spokes → product hubs)

Two pillars, six spokes, intentional and well-formed. Source of truth: `app/guides/page.js`.

**Pillar A — Hospitality FF&E** (`/guides/hospitality-ffe`)
- spoke → `/blog/what-is-ffe-hospitality`
- spoke → `/blog/hotel-guestroom-furniture-checklist`
- spoke → `/blog/ffe-procurement-timeline`
- spoke → `/blog/restaurant-seating-guide`
- product hubs referenced: `/products/hotel`, `/products/restaurant`

**Pillar B — Commercial Furniture Manufacturing** (`/guides/commercial-furniture-manufacturing`)
- spoke → `/blog/hpl-veneer-solid-wood-hotel-casegoods`
- spoke → `/blog/value-engineering-commercial-furniture`
- product hubs referenced: all 7 verticals (manufacturing guide §industries links hotel, restaurant, office, hospital, educational-facilities, residential, lobby-area)

**Product hub layer** (7 verticals): `/products/{hotel,restaurant,office,hospital,educational-facilities,residential,lobby-area}` — each is a real CollectionPage hub with buying-guide + materials + FAQ content blocks and a crawlable A–Z product index.

**Link-graph reciprocity (the core finding):**

| Direction | Status | Evidence |
|---|---|---|
| Pillar → spoke | strong | Both guides deep-link every spoke contextually (e.g. hospitality-ffe lines 180, 228, 351, 387; manufacturing lines 259, 348, 449) |
| Spoke → pillar | strong | Every blog post links up to its pillar (what-is-ffe:197, checklist:222, timeline:182, restaurant:180, hpl:208, value-eng:211) |
| Spoke → spoke | strong | Cross-links within cluster exist (hpl↔checklist↔value-eng; timeline↔what-is↔checklist) |
| Pillar → product | strong | Manufacturing §industries links all 7 hubs; hospitality links hotel/restaurant via spokes |
| Spoke → product | strong | Each spoke CTAs to its matching hub (checklist→/products/hotel:397, restaurant→/products/restaurant:251, value-eng→/products:423) |
| **Product hub → spoke/pillar** | **MISSING** | `/products/[placeSlug]/page.js` + `CategoryContentBlock.js` render zero contextual editorial links. Live `/products/hotel` only shows `/guides` + `/blog` from global nav, not deep links |

So the cluster is a **one-way funnel**: editorial pushes authority/clicks down into products, but products never pass authority back up. Product hubs are link sinks.

## Findings (table)

| Severity | Area | Issue | Fix |
|---|---|---|---|
| 🟠 high | Product hub → editorial reciprocity | All 7 product place-hubs are dead-ends. `CategoryContentBlock.js` has no links; place page body has none. Authority flows editorial→product only. | Add a "Related guides" strip to `CategoryContentBlock` (or place page) keyed by slug: hotel→hospitality-ffe + guestroom-checklist + hpl post; restaurant→hospitality-ffe + restaurant-seating-guide; office/hospital/educational/residential/lobby→commercial-furniture-manufacturing. 1–3 contextual links per hub. |
| 🟠 high | Cluster B imbalance + 5 orphaned verticals | Pillar B (manufacturing) covers 7 verticals but has only 2 spokes, both hotel-centric (HPL casegoods, value engineering). office, hospital, educational, residential, lobby have a product hub and a pillar mention but **zero spoke content**. | Add ≥1 spoke per under-served vertical (see Topical gaps). Each gives the matching product hub real topical support and an inbound contextual link. |
| 🟡 medium | Restaurant spoke mis-clustered | `restaurant-seating-guide` is filed under Pillar A (hospitality-ffe) in `app/guides/page.js`, but its subject (NFPA 701 / CAL 117 seating construction, booth vs chair) is a manufacturing/materials topic closer to Pillar B. It links up to hospitality-ffe (line 180), not to the manufacturing pillar. | Either dual-link it to the manufacturing pillar too (it already links value-eng + timeline), or accept A as the buyer-journey home. Low risk — flag only. |
| 🟡 medium | No vertical sub-pillars | Keyword map (clusters 3,4,8–12) implies hotel/restaurant/office each deserve their own mini-cluster, but only hotel + restaurant have spokes. The product hubs are acting as de-facto pillars with no editorial spoke beneath them. | Treat each high-value product hub (hotel, restaurant, office) as a pillar in its own right; build 1–2 spokes each. Hotel is nearly there; restaurant has 1; office has 0. |
| 🟢 pass | Pillar definition + intent | Two clean pillars, broad informational intent, 2.5–4k-word depth, FAQ + Article + Breadcrumb schema, speakable blocks. No two pages target the same primary keyword (no cannibalization). | Keep. This is the strongest part of the architecture. |
| 🟢 pass | Index pages as hubs | `/guides` index explicitly renders pillar→spoke cards (lines 14–53, 146–167); `/blog` index links both pillars + `/products` (lines 115–123). Hub discovery is solid for crawlers and AI. | Keep. |

## Topical gaps (missing clusters)

Highest-leverage spoke content to add, mapped to an existing un-supported product hub. Each new post should link up to its pillar, sideways to a sibling spoke, and down to its product hub (and the hub should link back — see 🟠 fix).

1. **Office / corporate** (hub `/products/office`, 0 spokes) — e.g. "Commercial Office Chair Standards: BIFMA X5.1 Explained" or "Open-Plan vs Private Office Furniture Spec Guide." Pillar B. Targets keyword-map cluster 8.
2. **Healthcare** (hub `/products/hospital`, 0 spokes) — e.g. "Healthcare Furniture: Bleach-Cleanable Upholstery & Infection-Control Spec." Pillar B. Cluster 9.
3. **Education / dormitory** (hub `/products/educational-facilities`, 0 spokes) — e.g. "Dormitory & Classroom Furniture: Contract-Grade Spec Checklist." Pillar B. Cluster 10.
4. **Multi-family amenity** (hub `/products/residential`, 0 spokes) — e.g. "Multi-Family Amenity Furniture: Clubhouse & Leasing-Office Spec." Reframe away from consumer "residential." Pillar B. Cluster 11.
5. **Lobby / reception** (hub `/products/lobby-area`, 0 spokes) — e.g. "Custom Reception Desk Guide: ADA Heights & Materials." Pillar B. Cluster 12.
6. **FF&E vs OS&E** (definitional gap in Pillar A) — a short comparison spoke; the term appears in keyword map cluster 2 but has no dedicated page. Pillar A.

Priority order by commercial value: office → healthcare → lobby/reception → education → multi-family → FF&E-vs-OS&E.

## Score: 72/100

- Pillar quality + intent + schema: excellent (the foundation is genuinely strong).
- Editorial-side linking (pillar↔spoke↔spoke↔product): excellent, near-textbook hub-and-spoke.
- Loses points for: (a) product hubs are link sinks — no contextual path back to editorial (−12); (b) Pillar B is lopsided — 5 of 7 verticals have a product hub but no spoke, so topical authority is thin outside hotel (−12); (c) restaurant spoke clustering is debatable and no vertical sub-pillars exist (−4).

## Top 3 actions

1. **Close the loop — add "Related guides" to product hubs.** Edit `components/products/CategoryContentBlock.js` (or the place branch of `app/products/[placeSlug]/page.js`) to render 1–3 slug-keyed contextual links per vertical back to the matching pillar/spoke. Turns 7 link sinks into two-way hub nodes. Cheapest, highest-ROI fix. (🟠)
2. **Build 5 vertical spokes under Pillar B** for office, healthcare, education, multi-family, lobby (gaps 1–5 above). Each gives an orphaned product hub real editorial support and balances the lopsided manufacturing cluster. (🟠)
3. **Promote hotel/restaurant/office product hubs to true sub-pillars** with their own 1–2 spokes, so the deepest commercial-intent verticals carry topical authority instead of leaning entirely on the two manufacturing/hospitality pillars. (🟡)
