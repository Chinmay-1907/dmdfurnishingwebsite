# Skill Audit 09 — seo-competitor-pages

**Skill purpose:** Mine the page TYPES competitors rank with (comparison/"vs", alternatives, vertical landing, project galleries, RFP/spec-download), compare to what DMD has, and find the page-type gaps DMD should build.

**Target:** DMD Furnishing — B2B commercial/hospitality FF&E manufacturer (lead-gen, not ecommerce). Source: `C:\Users\chin\dmdfurnishingwebsite-fable` (branch `fable-dmd`), live dev http://localhost:3006, prod https://dmdfurnishing.com.

**Date:** 2026-06-10

**Status:** partial (API needed) — on-site page-type inventory + gap analysis done from source. Live competitor SERP/page mining requires DataForSEO or Firecrawl (not wired). Competitor set below is hypothesized from category knowledge, not SERP-confirmed.

---

## Competitor set (hypothesized)

DMD competes for B2B hospitality/commercial FF&E buyers (procurement leads, GCs, owners, designers). The skill is built for SaaS "X vs Y" pages; in this category the realistic competitor types are **contract furniture makers and FF&E procurement firms**, not software. Hypothesized set (NOT SERP-verified — needs API to confirm who actually ranks for DMD's keywords):

| # | Competitor (hypothesized) | Type | Why in the set |
|---|---|---|---|
| 1 | Kimball Hospitality / Kimball International | National contract hospitality manufacturer | Ranks for "hotel casegoods / guestroom furniture manufacturer" |
| 2 | ContractFurniture.com / Contract Furniture Co. | Commercial restaurant/hospitality seating | Ranks for "restaurant furniture / commercial seating" |
| 3 | National Hospitality Supply / Foliot Furniture | Hotel FF&E manufacturer | Vertical guestroom-package competitor |
| 4 | Shelby Williams / Falcon (Commercial Furniture Group) | Restaurant + hotel contract seating | Vertical-page + spec-sheet competitor |
| 5 | Hospitality Furnishings & Design / FF&E procurement firms (e.g. HVS Design, Innvision) | FF&E project / procurement service | Competes on "FF&E procurement" + project-gallery intent |
| 6 | Grand Rapids Chair / OFS / Indiana Furniture | Office + multi-vertical contract | Office vertical + spec/cut-sheet downloads |

Note: this is a **buyer-overlap** set (same keywords / same RFPs), not a "feature parity" set — the SaaS-style "feature matrix vs DMD" framing only partly applies (see matrix note).

## Competitor page-type matrix

Page type | Competitors typically have | DMD has? | Gap
---|---|---|---
Vertical / industry landing page (hotel, restaurant, office, healthcare, education, multi-family, senior living) | Yes — standard | **Yes** — 7 verticals at `/products/[placeSlug]` (hotel, restaurant, office, hospital, educational-facilities, residential, lobby-area), each with override title/H1/description + FAQ + CollectionPage schema | 🟢 Strong. Missing **senior-living / assisted-living** and **multi-tenant (student housing as its own page)** — high-intent verticals competitors split out |
| Furniture-type / category page (seating, casegoods, tables) | Yes | **Partial** — mid-tier type pages at `/products/[placeSlug]/[typeSlug]` (gated to ≥3 products) | 🟡 Type pages are place-scoped, not global. No global "commercial seating" / "hotel casegoods" hub page that aggregates across verticals |
| Project gallery / portfolio | Yes — table stakes | **Yes** — `/projects` (featured + grid + category pills + ItemList schema) and `/projects/[projectId]` detail | 🟢 Strong |
| Case study (named project, scope, room count, before/after) | Yes — high-trust | **Partial** — project detail pages exist; depth/structured "challenge → solution → result → spec" format needs verification | 🟡 Verify detail pages read as case studies, not just photo + spec pills |
| "X vs Y" comparison (material or product) | Some — content marketing | **Partial** — one blog "HPL vs Veneer vs Solid Wood Casegoods" with side-by-side comparison + schema | 🟡 Only material comparison. No **build-decision** comparisons buyers search (domestic vs overseas manufacturing, custom vs ready-made, banquette vs freestanding seating, laminate vs quartz tops) |
| "Alternatives to [competitor]" page | Rare in this category | **No** | 🟢 Low priority — defamation/fairness risk + thin search volume in FF&E. Skip unless SERP shows demand |
| RFP / spec-download / cut-sheet / tear-sheet page | Yes — strong B2B lead-capture pattern | **No** — "spec sheet / cut sheet" appear only as PROSE in services/about/blog copy; zero `.pdf` / downloadable assets in `public/`; no download CTA anywhere | 🔴 **Biggest gap.** No gated spec/RFP-template/line-card download to capture procurement leads |
| Spec / standards / compliance page (fire code, BIFMA, ADA, CAL 117) | Yes — procurement filter | **Partial** — compliance mentioned in FAQ/service copy ("fire safety compliant", "ADA coordinated") but no standalone standards/compliance page | 🟠 No dedicated "commercial furniture standards / fire-code compliance" page competitors use to rank + qualify |
| Materials / finishes library | Some | **Partial** — material info inside blog + product specs | 🟡 No standalone finishes/materials hub |
| Pricing / cost-guide page | Some (gated or content) | **Partial** — value-engineering + FF&E-timeline blogs touch cost | 🟡 No "how much does hotel FF&E cost" pillar (high-intent informational) |
| Services / process page | Yes | **Yes** — `/services` 7-phase process + Service schema + FAQ | 🟢 Strong |

## On-site readiness findings

Severity | Item | Issue | Fix
---|---|---|---
🔴 | RFP / spec-download page type | No downloadable spec sheet, cut sheet, RFP template, or line card; no `.pdf` in `public/`; no download CTA. Competitors rank for "hotel FF&E spec sheet / RFP template" AND capture leads | Build a gated "Spec Sheets & RFP Template" page; offer a downloadable FF&E RFP template + per-category cut sheets behind the existing OTP/consultation form |
🟠 | Decision-comparison content | Only one comparison exists (material blog). Buyer "vs" intent (domestic vs overseas, custom vs ready-made, banquette vs chairs) is uncovered | Add 2–3 decision-comparison pages using the existing blog comparison pattern (table + FAQPage schema already proven on HPL blog) |
🟠 | Standards / compliance page | Compliance is scattered in FAQ copy; no rankable standalone page for "commercial furniture fire code / BIFMA / CAL 117 / ADA" | Build one `/guides/commercial-furniture-standards` page; it doubles as a procurement-qualifier and AI-citation surface |
🟡 | Missing verticals | No senior-living/assisted-living page; student-housing folded into "residential" | Add `senior-living` (and optionally split student-housing) to the `places` catalog — same `[placeSlug]` template, near-zero build cost |
🟡 | Global category hubs | Type pages are place-scoped (`/products/hotel/seating`); no cross-vertical "commercial seating" / "casegoods" hub | Add global furniture-type hubs that aggregate the same products across verticals |
🟡 | Case-study depth | Project detail pages may be photo+spec, not full challenge/solution/result narrative | Audit `/projects/[projectId]`; upgrade to structured case-study format with room counts + outcomes |
🟢 | Vertical landing pages | 7 verticals with override metadata, FAQ, CollectionPage + ItemList + BreadcrumbList schema | Keep — strong foundation; extend pattern to new verticals |
🟢 | Project gallery + schema | `/projects` carousel-pattern ItemList; correct Google pattern (ListItem position+url, entity on detail) | Keep |

## Mining method + gap checklist (API)

What the live competitor mining needs (not wired in this environment):

1. **SERP discovery (DataForSEO `serp/google/organic` or Firecrawl Search).** Pull top 10 for DMD's money keywords: `hotel guestroom furniture manufacturer`, `restaurant furniture commercial`, `hospitality FF&E`, `commercial casegoods manufacturer`, `hotel FF&E procurement`. → Confirms the REAL competitor set (replaces the hypothesized table above).
2. **Sitemap + page-type harvest (Firecrawl Map/Crawl, or DataForSEO sitemap).** For each confirmed competitor, pull every URL, then classify by type (vertical / product / project / spec-download / comparison / standards / cost-guide). → Builds the real page-type matrix.
3. **Content-gap keyword overlap (DataForSEO `keywords_for_site` / Ranked Keywords).** List keywords each competitor ranks for that DMD does NOT. → Finds page types tied to traffic DMD is missing.
4. **Spec-download / lead-magnet detection.** Crawl competitor pages for `.pdf`, "download", "spec sheet", "RFP", "cut sheet", gated forms. → Confirms whether the RFP/spec-download gap is real across the set (DMD has zero — high confidence already).
5. **Schema scrape.** Extract competitor JSON-LD (Product/Service/ItemList/FAQPage) to compare structured-data coverage.

Gap checklist to run once API is wired:
- [ ] Confirm real competitor set (≥6) from SERP for 5 seed keywords
- [ ] Crawl + classify every competitor URL into the 11 page types above
- [ ] Per page type: count competitors that have it vs DMD → confirm/replace the matrix
- [ ] Pull DMD-missing keywords with volume; map each to a page type
- [ ] Detect spec-download / RFP lead magnets across competitors
- [ ] Verify which verticals competitors split out (senior living, student housing, gov/municipal, worship, country club)
- [ ] Capture title-tag + H1 patterns competitors use per page type
- [ ] Lay competitor schema on top of DMD's to find structured-data gaps

## Score (62/100)

On-site page-type foundation is strong (verticals, projects, services, schema all present and well-built), which is why this is not lower. Score is held down by: no RFP/spec-download lead-capture page type (the single biggest B2B-FF&E gap), thin decision-comparison coverage (one material blog only), no standalone standards/compliance page, and that the live competitor SERP/page mining — the core of this skill — could not run without an API, so the competitor set and matrix are hypothesized, not confirmed.

## Top 3 actions

1. **Build the RFP / spec-download page type (🔴).** One page offering a downloadable FF&E RFP template + per-category cut sheets, gated behind the existing OTP/consultation form. Closes the highest-value B2B gap and turns a content page into a lead source.
2. **Wire DataForSEO or Firecrawl and run the 5-keyword SERP + crawl (partial → full).** Replaces the hypothesized competitor set and matrix with confirmed data; produces the real page-type and keyword-gap list. Everything else in this audit is provisional until this runs.
3. **Add 2–3 decision-comparison pages + a standards/compliance page (🟠).** Reuse the proven HPL-blog comparison pattern (table + FAQPage schema) for "domestic vs overseas manufacturing", "custom vs ready-made", etc., plus one `/guides/commercial-furniture-standards` page — both rank AND qualify procurement buyers.
