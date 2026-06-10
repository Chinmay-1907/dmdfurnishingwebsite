# Skill Audit 07 — seo-programmatic

**Skill purpose:** Audit pages generated at scale from a structured data source. Enforce quality gates that prevent thin-content penalties and index bloat (template uniqueness, dataset quality, indexation control, internal linking, scale safety, value-per-page).

**Target:** DMD Furnishing programmatic product surface — `app/products/[placeSlug]/page.js` (dispatcher: place listing OR flat product detail), `app/products/[placeSlug]/[typeSlug]/page.js` (mid-tier type pages), data from `public/DMD_Website.xml` parsed by `lib/catalog.js`, narrative from `lib/place-content.js` + `lib/product-copy.js`.

**Date:** 2026-06-10

**Status:** Complete. Live :3006 + source verified. No external API needed (full programmatic surface is source-derived and SSR-inspectable).

**Programmatic surface (actual, counted):** 208 generated URLs = **181 flat product pages** (`/products/{slug}`) + **7 place pages** (`/products/{place}`) + **20 type pages** (`/products/{place}/{type}`). Dataset = 174 `<product>`, 8 `<place>`, 4 `<memberships>` / 3 `<member>` cross-listings in the XML. (Flat-page count 181 > 174 product tags because the route also builds residential products injected via separate generators.)

## Programmatic checklist applied

| Criterion | Result | Evidence |
|---|---|---|
| Data source quality (unique attributes per record) | ✅ | `lib/catalog.js` parses per-product `description`, `images[]`, `specifications[]` (name/value), `tags`, plus place/type/subcategory membership. Spec arrays drive `additionalProperty` Product schema + visible spec grid. Records carry enough distinct fields to differentiate. |
| Dataset freshness / staleness | ⚠️ | No `<lastmod>`-per-record in the XML. `app/sitemap.js` stamps every URL with a hardcoded `LAST_BUILD = '2026-06-10'` (line 21) — not the real data-change date. Skill wants `<lastmod>` = actual data update timestamp. |
| Template uniqueness — flat product page | ✅ | `ProductDetailPage.js` is NOT mad-libs. Two expert copy blocks come from `lib/product-copy.js`, which maps each product's subcategory to one of 15 furniture-type copy groups (bedFrames, headboards, casegoods, healthcare, diningSeating, taskSeating, tables, etc.) — each ~120-word distinct construction + specification paragraph. Live `/products/queen-bed-frame` = 437 visible words. |
| Template uniqueness — place page | ✅ | `lib/place-content.js` gives each of 7 places a fully hand-written `intro` + 5-item `buyingGuide` + `materials` paragraph + 3 `faqs`. Hotel vs restaurant vs hospital copy share zero sentences. Rendered via `CategoryContentBlock`. Far above the 40% uniqueness floor. |
| Template uniqueness — type page | ⚠️ | `[typeSlug]/page.js` hero/CTA copy IS templated string-substitution (`{count} contract-grade pieces for {place} projects across {subcategories}…`). Unique tokens = count + place + subcategory list + product grid; surrounding prose is shared boilerplate. Live `/products/hotel/guest-room` = 410 words but most is the product grid + 1 templated paragraph. Borderline mad-libs at the prose level; saved by a real differentiated product list. |
| URL structure (lowercase, hyphenated, no params, unique, <100 char) | ✅ | `toSlug()` lowercases + hyphenates + strips non-alphanumerics. Flat `/products/{slug}`, hierarchical place/type. `dynamicParams = false` (line 45 / 87) → only generated slugs resolve, everything else 404s. No query params in primary URLs. |
| Internal linking (hub/spoke, related, breadcrumbs, cross-link) | ✅ | Place page renders a server-side crawlable A–Z index linking every product (`page.js` lines 364-386) + a "browse by type" hub. Type page links siblings + parent place + CTA. Product page links 6 related (`getRelatedProducts`, same subcategory → type → place fallback) + "also built for" cross-membership chips. BreadcrumbList schema on all three. Strong hub/spoke. |
| Thin-content gate at generation time | ✅ | Type route hard-gates at `MIN_PRODUCTS = 3` (`[typeSlug]/page.js` line 20, 72, 160) — `(place,type)` pairs with <3 products are never generated AND `notFound()` at runtime. Only 20 of all possible pairs qualify. This is the skill's recommended scale safeguard. |
| Word count ≥300 per page | ✅ | Flat product 437w, type page 410w, place pages well above (intro+guide+materials+FAQ). All clear the 300-word review flag. |
| Canonical strategy (self-referencing) | ✅ | `lib/metadata.js generatePageMetadata()` sets `alternates.canonical = siteUrl+path` for every page. Verified live: `/products/queen-bed-frame` → canonical `…/products/queen-bed-frame`; `/products/hotel/guest-room` → self. No cross-domain canonicals. |
| Indexation control / noindex low-value | ✅ | No thin pages exist to noindex — the ≥3 gate prevents them upstream rather than noindexing after the fact. API routes disallowed in robots.txt. All 208 product pages are intentionally indexable (verified: no robots meta on live pages). |
| Sitemap correctness | ⚠️ | Live `/sitemap.xml` is served by `app/sitemap.js` (231 URLs, CORRECT flat + place + ≥3-type URLs matching live routes). BUT the legacy `scripts/generate-sitemap.js` (npm `generate:sitemap`) still emits OLD 4-segment `/products/{place}/{type}/{sub}/{product}` URLs and ZERO flat URLs — every one would 404/301. It writes to `public/sitemap.xml` (currently absent). Latent footgun: running that script overwrites the good route with broken URLs. |
| Scale safety / Scaled Content Abuse (2025-26) | ✅ | 208 pages total — well under the 500-page HARD STOP. Each page passes the standalone-value test (real specs, real differentiated copy, real product photos). Not AI-mad-libs city-swap. No site-reputation-abuse risk (own domain). |
| Sitemap split (50k limit) / index bloat monitoring | ✅ | 231 URLs ≪ 50k single-file limit; no split needed. Page count is bounded and intentional, no faceted/pagination explosion. |

## Findings

| Severity | Template/Page | Issue | Fix |
|---|---|---|---|
| 🟠 high | `scripts/generate-sitemap.js` + npm `generate:sitemap` | Stale generator emits OLD 4-segment product URLs (`/products/hotel/seating/sofa/3-seater-sofa`) and no flat URLs. If run, overwrites `public/sitemap.xml` with ~180 broken (404/301) URLs that conflict with the correct live `app/sitemap.js` route. | Delete the script + npm entry, or rewrite it to emit flat `/products/{slug}` only. `app/sitemap.js` already does the job correctly — remove the duplicate. |
| 🟡 medium | `app/sitemap.js` line 21 | `lastModified` hardcoded to `'2026-06-10'` for all URLs. Skill requires `<lastmod>` = real data-update time; a frozen date gives crawlers no change signal and goes stale. | Stamp blog posts with `post.isoDate` (already done); derive product/place lastmod from XML mtime or a per-record date field. |
| 🟡 medium | `[typeSlug]/page.js` hero + CTA | Type-page prose is single-paragraph token substitution (place + count + subcategory list). At the text level it edges toward mad-libs; value comes only from the product grid. 20 such pages. | Add 2-3 sentences of type-specific guidance (pull from `place-content` buyingGuide or a new per-type snippet) so each type page has standalone written value, not just a filtered grid. |
| 🟡 medium | `app/sitemap.js` type-page gate vs route gate | Sitemap counts `ft.subcategories…products` sum ≥3 (declared-tree count); route counts membership-based `productsFor(place,type) >= 3`. Cross-listed (`<member>`) products can make these diverge → a sitemap URL with <3 live products, or a live page missing from sitemap. | Use the identical membership-based count (`productsFor`) in `app/sitemap.js` so sitemap and `generateStaticParams` agree exactly. |
| 🟢 pass | `lib/place-content.js` / `lib/product-copy.js` | Genuinely differentiated, hand-written, no fabricated stats. Strongest part of the system. | Keep. Extend `product-copy` groups as new subcategories are added to XML (keyword fallback already handles gaps). |

## Score: 84/100

| Category | Status | Score |
|---|---|---|
| Data Quality | ✅ | 82/100 |
| Template Uniqueness | ✅ | 88/100 |
| URL Structure | ✅ | 95/100 |
| Internal Linking | ✅ | 92/100 |
| Thin Content Risk | ✅ | 90/100 |
| Index Management | ⚠️ | 72/100 |

Strong programmatic build: hard thin-content gate (≥3 products), differentiated per-subcategory and per-place copy, self-referencing canonicals, deep crawlable internal linking, and a correct live sitemap route — all under the 500-page abuse threshold. Points lost almost entirely to the stale duplicate sitemap script and frozen lastmod, not to thin content.

## Top 3 actions
1. **Kill the stale sitemap generator (🟠).** Remove `scripts/generate-sitemap.js` + the `generate:sitemap` npm script (or rewrite to flat URLs). `app/sitemap.js` is the correct source of truth — the duplicate can overwrite `public/sitemap.xml` with ~180 broken legacy URLs.
2. **Fix lastmod + align type-page gate (🟡).** Replace the hardcoded `'2026-06-10'` lastmod with real per-record dates, and use the membership-based `productsFor()` count in `app/sitemap.js` so it matches `generateStaticParams` exactly.
3. **Thicken the 20 type pages (🟡).** Add 2-3 sentences of type-specific written guidance to each `[typeSlug]` page so its value isn't only the filtered product grid — moves them from borderline mad-libs to standalone-valuable.
