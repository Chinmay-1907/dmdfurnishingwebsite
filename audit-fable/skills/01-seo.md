# Skill Audit 01 — seo

**Skill purpose:** Run AgriciDaniel claude-seo v2.0 universal audit (technical, content/E-E-A-T, schema, sitemap, CWV, GEO, images, on-page) and emit a 0-100 SEO Health Score.

**Target:** DMD Furnishing (fable-dmd) · source `C:\Users\chin\dmdfurnishingwebsite-fable` · live http://localhost:3006

**Date:** 2026-06-10

**Status:** partial (field APIs — GSC / PageSpeed / CrUX / GA4 / backlinks — not wired; source + live-HTML checks complete)

Business type detected: **Local Service + B2B manufacturer (lead-gen)**, NOT e-commerce. Confirmed by FurnitureStore + LocalBusiness schema, phone/address/GeoCoordinates, consultation CTA, no cart/price. seo-ecommerce path correctly skipped; seo-local path applies.

## Skill checklist applied

| Checklist item | Result | Evidence |
|---|---|---|
| Crawlability — robots.txt allows + AI crawler allow-list | ✅ | `public/robots.txt`: `Allow: /`, `Disallow: /api/`, explicit GPTBot/ClaudeBot/PerplexityBot/Google-Extended/CCBot/OAI-SearchBot/anthropic-ai/cohere-ai. Sitemap line present. |
| Indexability — no rogue noindex on key pages | ✅ | No `<meta robots>` noindex on `/`, `/products/hotel`, `/blog/what-is-ffe-hospitality`, `/contact` (live HTML, all 200). |
| Canonical tags self-referential + absolute prod domain | ✅ | `/` → `https://dmdfurnishing.com`; `/products/hotel` → `.../products/hotel`. Correct per-page. |
| XML sitemap present + populated + lastmod | ✅ | `/sitemap.xml` (app/sitemap.js) = **231 `<loc>`**, all carry `<lastmod>`. Under 50k-URL limit. |
| Sitemap lastmod realism | ⚠️ | 225 of 231 URLs share `2026-06-10` (today / build date), only 6 product/project URLs have varied real dates. Bulk same-day lastmod is a weak freshness signal. |
| Title tags — unique, 50-60 char, keyworded | ✅ | Home 52, `/products/hotel` 48, `/contact` 63, `/about` 61, `/services` 53, `/products` 45. All keyword-led, brand-suffixed. (`/contact` 63 marginally long.) |
| Meta descriptions — present, 150-160, compelling | ✅ | Home 152, `/contact` 159, `/about` 151, `/services` 150. Within range, benefit-driven. |
| Single H1 + logical heading hierarchy | ✅ | Home: 1× H1 ("Custom Hospitality Furniture…"), clean H2→H3 nesting (7 market H3s, project H3s, 6-reason H3s). No skips. |
| Open Graph + Twitter card complete | ✅ | Blog: full og:title/desc/url/site_name/image(1200×630)/type=article + twitter summary_large_image. Home set confirmed in snapshot. |
| Schema.org — type coverage + validity | ✅ | Home **10 ld+json blocks**: Organization, WebSite+SearchAction, FurnitureStore (LocalBusiness w/ GeoCoordinates+OpeningHours+ContactPoint), FAQPage, OfferCatalog, Speakable. Product adds BreadcrumbList+CollectionPage+ItemList(49 ListItem). Blog adds BlogPosting+Breadcrumb. |
| FAQPage on commercial pages (Aug-2023 rich-result rule) | ⚠️ | FAQPage present on home, /about, all 6 blogs, both guides. Per skill: NOT a Google rich-result win on commercial sites, but valid for AI/LLM citation — keep, treat as Info not error. |
| Breadcrumbs (visible + schema) | ✅ | `/products/hotel` shows visible "Breadcrumb" markup + BreadcrumbList schema. |
| Internal linking depth | ✅ | Homepage = 46 internal links to products, blog, guides, contact, inspirations — strong hub linking, shallow depth. |
| Image alt text coverage | ⚠️ | Homepage: 18 `<img>`, **7 with empty `alt=""`** — the market-category tiles (Hotel/Hospital/Lobby/Office/Restaurant/Residential/University). Content images, not decorative; missing alt loses image-search + a11y. |
| GEO / AI search readiness — llms.txt + speakable + AI allow | ✅ | `public/llms.txt` (7KB) + `llms-full.txt` (13KB) populated/structured; SpeakableSpecification in schema; AI crawlers allow-listed. Strong GEO posture. |
| Core Web Vitals (INP) — field data | ⚠️ partial | Source instrumentation present (`app/api/vitals/route.js` + `components/WebVitals.js`); real INP/LCP/CLS field data needs PageSpeed/CrUX/GSC API — not wired. |
| Security headers | ✅ | `public/_headers`: HSTS preload, X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy. |
| `lang` / i18n | ✅ | `<html lang="en">`. Single-locale site; no hreflang needed. |

## Findings

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🟡 | Homepage image alt | 7 market-tile images ship `alt=""` (Hotel furniture collection, Hospital, Lobby, Office, Restaurant, Residential, University) — these are content images, not decorative | Add descriptive alt (e.g. `alt="Custom hotel guestroom furniture collection"`) in the homepage market-grid component; mirror across other tile grids |
| 🟡 | Sitemap lastmod | 225/231 URLs stamped `2026-06-10` (build date), not true content-modified date | In app/sitemap.js, derive lastmod from real content/frontmatter dates per route so freshness signal is honest |
| 🟢 | FAQPage on commercial pages | Valid but no Google rich-result benefit on commercial sites (Aug-2023); fine for AI/LLM citation | Keep as-is; do not expand FAQPage for Google rich-result purposes |
| 🟢 | `/contact` title 63 chars | Slightly over ~60 ideal; may truncate in SERP | Trim to ~58, e.g. "Contact DMD Furnishing \| Foxboro MA FF&E Manufacturer" |
| 🟢 | CWV field data | Can't confirm real INP/LCP scores from source alone | Wire PageSpeed/CrUX or GSC API, then re-run seo-performance + seo-google |

## Score

**88 / 100** — Technical SEO 21/22 · Content 22/23 · On-Page 19/20 · Schema 10/10 · Performance 8/10 (field data unverified) · AI Readiness 10/10 · Images 4/5 (alt gap). Site is strongly optimized; remaining points are field-verification (CWV/GSC) and the alt-text + lastmod hygiene fixes.

## Top 3 actions

1. **Add alt text to the 7 homepage market-category tile images** (and any sibling tile grids) — only on-page on-site SEO gap found; quick component edit.
2. **Make sitemap lastmod truthful** — stop stamping 225 URLs with the build date; pull real modified dates so freshness isn't diluted.
3. **Wire one field API (GSC or PageSpeed/CrUX)** to convert the 3 "partial" lines (INP/LCP, indexation, traffic) into verified pass/fail and unlock the seo-google + seo-performance subagents.
