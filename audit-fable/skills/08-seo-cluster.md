# Skill Audit 08 — seo-cluster

**Skill purpose:** Map topic clusters (pillar guides → spoke blog posts → product hubs), verify hub/spoke interlinking is bidirectional, and surface topical-coverage and link gaps. The published skill is SERP-overlap keyword clustering for *planning new* content; here it is applied as a cluster-mapping + interlink checklist against the *existing* site (Agent-14 covered the lens itself).

**Target:** DMD Furnishing — B2B commercial/hospitality FF&E manufacturer (lead-gen). Source: `C:\Users\chin\dmdfurnishingwebsite-fable`. Live: http://localhost:3006.

**Date:** 2026-06-10

**Status:** complete (source + live HTML verified; no SERP/volume API — clustering done by site IA + body-link graph, not SERP overlap, so volume/cannibalization-by-SERP marked partial)

---

## Cluster map (pillar → spokes → hubs, with link status)

Two pillar guides, six spoke posts, seven product hubs. Links below are **body-content** links (footer/header nav links to `/blog` and `/guides` indexes are global boilerplate and excluded). `↑` = spoke→pillar, `↓` = pillar→spoke, `→hub` = links to a product category page.

### Pillar A — `/guides/hospitality-ffe` ("Hospitality FF&E: A Complete Procurement Guide")
Pillar links down to 5 of 6 spokes + Pillar B + `/contact`. Cited spokes (`app/guides/hospitality-ffe/page.js`):

| Spoke | ↓ pillar→spoke | ↑ spoke→pillar | Spoke→hub | Spoke→spoke |
|---|---|---|---|---|
| `/blog/what-is-ffe-hospitality` | yes (L180) | yes → hospitality-ffe (L197) | `/products` (L444) | → ffe-procurement-timeline (L361), → hotel-guestroom-checklist (L451) |
| `/blog/hotel-guestroom-furniture-checklist` | yes (L228) | yes → hospitality-ffe (L222) | `/products/hotel` (L397) | → hpl-veneer (L270) |
| `/blog/ffe-procurement-timeline` | yes (L351) | yes → hospitality-ffe (L182) | none | → what-is-ffe (L218), → hotel-guestroom (L219) |
| `/blog/restaurant-seating-guide` | yes (L48 guides-index) | yes → hospitality-ffe (L180) | `/products/restaurant` (L251,481) | → value-engineering (L414), → ffe-timeline (L472) |
| `/blog/value-engineering-commercial-furniture` | yes (pillar cost-drivers L387) | yes → **commercial-furniture-mfg** (L211) | `/products` (L423) | → ffe-timeline (L208), → hpl-veneer (L223) |

### Pillar B — `/guides/commercial-furniture-manufacturing` ("Commercial Furniture Manufacturing: A Buyer Guide")
Pillar links down to its 2 spokes + 7 product hubs + Pillar A. Cited (`app/guides/commercial-furniture-manufacturing/page.js`):

| Spoke | ↓ pillar→spoke | ↑ spoke→pillar | Spoke→hub | Spoke→spoke |
|---|---|---|---|---|
| `/blog/hpl-veneer-solid-wood-hotel-casegoods` | yes (L259) | yes → commercial-furniture-mfg (L208) | `/products/hotel` (L492,502) | → hotel-guestroom (L262), → value-engineering (L449) |
| `/blog/value-engineering-commercial-furniture` | yes (L399) | yes → commercial-furniture-mfg (L211) | `/products` (L423) | → ffe-timeline, → hpl-veneer |

Pillar B is the **only** page that deep-links to the 7 product hubs in body content (L415–445): `/products/hotel`, `/restaurant`, `/office`, `/hospital`, `/educational-facilities`, `/residential`, `/lobby-area`.

### Product hubs (7) — `/products/[placeSlug]`
hotel · restaurant · office · hospital · educational-facilities · residential · lobby-area. Long-form buyer copy in `lib/place-content.js` (324 lines). Live check of `/products/restaurant` and `/products/hotel`: outbound links to guides/blog = `/blog` and `/guides` **index only** (header + footer, 2× each). **Zero contextual hub→pillar or hub→spoke body links.**

### Guides index — `/guides` (`app/guides/page.js`)
Strong cluster hub: explicitly renders both pillars as cards with their supporting spokes listed beneath (Pillar A: 4 spokes; Pillar B: 2 spokes). `ItemList` schema. This is the canonical cluster map UI and it is correct.

---

## Cluster checklist (table)

| Criterion | Result | Evidence |
|---|---|---|
| Pillar pages exist | 🟢 pass | 2 pillars: `/guides/hospitality-ffe`, `/guides/commercial-furniture-manufacturing` |
| Each spoke links to a pillar (mandatory ↑) | 🟢 pass | All 6 spokes link up in body content (e.g. what-is-ffe L197, hpl-veneer L208) |
| Each pillar links to its spokes (mandatory ↓) | 🟢 pass | Pillar A → 5 spokes; Pillar B → 2 spokes; guides index lists all 6 |
| Spoke↔spoke interlinking (2–3/post) | 🟢 pass | Every spoke has 2 in-body cross-links (e.g. ffe-timeline L218/L219) |
| No orphan spoke (reachable from pillar in 2 clicks) | 🟢 pass | All 6 spokes reachable from `/guides` index and a pillar |
| Pillar links to product hubs (commercial intent) | 🟡 partial | Only Pillar B links the 7 hubs (L415–445); Pillar A links none |
| Product hub links UP to guide/spoke (bidirectional) | 🔴 fail | `/products/[placeSlug]` body has no contextual link to any guide/spoke; only global `/blog` + `/guides` nav |
| Spoke assigned to the topically-correct pillar | 🟠 high | `restaurant-seating-guide` sits under Pillar A (hospitality) but its topic = product selection, closer to a restaurant hub than either manufacturing/procurement pillar; `value-engineering` is double-claimed (links up to Pillar B, but Pillar A also cites it L387) |
| Balanced spokes per pillar (2–4) | 🟡 medium | Pillar A = 4–5 spokes, Pillar B = 2 spokes; lopsided |
| Anchor text uses target keyword (no "click here") | 🟢 pass | Anchors are descriptive (e.g. "hospitality FF&E procurement guide", "HPL vs veneer vs solid wood") |
| Cannibalization (no two posts same primary KW) | 🟡 partial (no SERP API) | Titles distinct by intent; `what-is-ffe` (guide) vs `hospitality-ffe` pillar overlap on "what is FF&E" — possible pillar/spoke overlap, needs SERP/GSC to confirm |
| Cluster schema present (BreadcrumbList/Article/ItemList) | 🟢 pass | Both pillars carry BreadcrumbList + Article + FAQPage; `/guides` carries CollectionPage + ItemList |
| Topical coverage of core verticals | 🟠 high | 6 spokes cover hotel/FF&E/materials/restaurant; **office, healthcare, education, multi-family, lobby hubs have zero spoke content** despite being product hubs |

---

## Findings (table)

| Severity | Area | Issue | Fix |
|---|---|---|---|
| 🔴 critical | Hub→cluster link | The 7 product hubs (`/products/[placeSlug]`) never link contextually back up to their matching guide or spoke — cluster flow is one-directional (guides/blog → hubs only). Hubs are commercial money pages getting no internal-link equity from the cluster. | In `lib/place-content.js` add a "Related guides" block per place: hotel→hotel-guestroom-checklist + hospitality-ffe; restaurant→restaurant-seating-guide; office/hospital/education→commercial-furniture-manufacturing. Render it in `app/products/[placeSlug]/page.js`. |
| 🟠 high | Topical coverage | 4 of 7 verticals (office, healthcare, education, multi-family/residential, lobby) have product hubs but **no spoke content** — thin topical authority for those segments. | Add 1 spoke per uncovered vertical (e.g. "Healthcare furniture cleanability standards", "Office task seating buyer guide"), each linking up to commercial-furniture-mfg pillar + down to its hub. |
| 🟠 high | Pillar assignment | `restaurant-seating-guide` is filed under the hospitality-FF&E (procurement) pillar but is a product-selection topic; `value-engineering` is claimed by both pillars (split equity). | Consider a 3rd "product selection" mini-pillar, or re-home restaurant-seating under a restaurant hub; pick one canonical pillar for value-engineering. |
| 🟡 medium | Cluster balance | Pillar B (commercial-furniture-mfg) has only 2 spokes vs Pillar A's 4–5; under-built. | Route 2 of the new vertical spokes (office/healthcare) under Pillar B to balance. |
| 🟡 medium | Pillar A → hub | Pillar A (hospitality-ffe) doesn't link to any product hub in body, missing commercial hand-off; only Pillar B does. | Add hotel/restaurant hub links in Pillar A's "what's included" / cost sections. |
| 🟡 medium | Pillar/spoke overlap | `/blog/what-is-ffe-hospitality` and pillar `/guides/hospitality-ffe` both target "what is FF&E" — potential pillar-eats-spoke cannibalization (unconfirmed without SERP/GSC). | Tighten spoke to "FF&E vs OS&E for buyers" angle; keep the broad "what is FF&E" definition on the pillar. |

---

## Score (74/100)

Interlinking discipline among guides + blog is genuinely strong (mandatory ↑/↓ all present, descriptive anchors, schema, no orphans, working cluster index at `/guides`) — that earns the bulk of the score. Three real deductions: product hubs are link-dead-ends back into the cluster (−14), half the product verticals have no spoke content (−8), and one mis-clustered/double-claimed spoke plus a lopsided 4-vs-2 split (−4).

## Top 3 actions

1. **Make hubs bidirectional.** Add a "Related buyer guides" block per place in `lib/place-content.js` so every `/products/[placeSlug]` links up to its matching guide + spoke. Closes the one 🔴.
2. **Cover the empty verticals.** Write 1 spoke each for office, healthcare, education (and route 2 under the under-built commercial-furniture-mfg pillar) so all 7 product hubs have topical support.
3. **Fix pillar assignment.** Give `value-engineering` one canonical pillar and re-home or re-pillar `restaurant-seating-guide`; verify the `what-is-ffe` spoke vs pillar overlap once GSC data is available.
