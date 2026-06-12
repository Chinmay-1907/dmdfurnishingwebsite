# Skill Audit 02 — seo-audit

**Skill purpose:** Run a full-site SEO audit — crawl, fan out to technical/content/schema/sitemap/performance/AI specialists, score 0-100, output prioritized action plan. (AgriciDaniel seo-audit v2.0.0)
**Target:** DMD Furnishing — B2B hospitality FF&E manufacturer (lead-gen, not ecommerce). Source `C:\Users\chin\dmdfurnishingwebsite-fable` (branch `fable-dmd`), live dev `http://localhost:3006`, prod `https://dmdfurnishing.com`.
**Date:** 2026-06-10
**Status:** Complete (lab/source + live-HTML evidence). Field-data sections marked **partial (API needed)** — GSC, GA4, CrUX, DataForSEO, backlinks not wired in this run.

## Audit routine applied

Ran inline (per snapshot ground rules — no parallel subagent fan-out). Spot-checked 6 pages: `/`, `/products/hotel`, `/blog/what-is-ffe-hospitality`, `/services`, `/contact`, `/guides/hospitality-ffe`. All evidence from live `:3006` SSR HTML + source files.

| Section | Result | Evidence |
|---|---|---|
| Crawl / fetch | ✅ | Homepage 200, 109 KB SSR HTML. All key routes 200 (`/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/feed.xml`, `/author/...`). |
| Indexability — robots | ✅ | `public/robots.txt`: `Allow: /`, `Disallow: /api/`, 9 AI crawlers explicitly allow-listed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, OAI-SearchBot, ChatGPT-User, anthropic-ai, cohere-ai). Sitemap line → `/sitemap.xml`. No stray `noindex` on indexable pages. |
| Indexability — sitemap | ✅ | Dynamic `app/sitemap.js` serves valid `/sitemap.xml` = **231 URLs** with `<image:image>` + `<lastmod>` (2026-06-10). Covers static, guides, blog, inspirations, places, product details, projects. Mid-tier product pages gated to ≥3 products (good — avoids thin URLs). |
| On-page — titles/meta | ✅ | All 6 spot pages have unique title (48-63 chars) + unique meta description + self-referencing canonical to prod domain. e.g. `/contact` canonical `https://dmdfurnishing.com/contact`. |
| On-page — headings | ✅ | Exactly one `<h1>` per page on all 6 checked. |
| On-page — internal links | ✅ | Homepage exposes 34 unique internal links incl. all 7 place hubs (`/products/hotel`, `/office`, `/restaurant`, `/hospital`, `/educational-facilities`, `/lobby-area`, `/residential`), guides, blog. Healthy hub linking. |
| Content quality / E-E-A-T | ✅ | Dedicated author entity (`/author/dmd-furnishing-editorial`, 200), 6 blog posts + 2 pillar guides, FAQ blocks per page. No thin-content red flags on spot-checked pages. |
| Schema / structured data | ✅ | Homepage = **10 ld+json blocks**: Organization, FurnitureStore (LocalBusiness w/ PostalAddress + GeoCoordinates + OpeningHours + ContactPoint), WebSite+SearchAction, WebPage+Speakable, FAQPage (7 Q/A), ImageObject, OfferCatalog. Product page adds BreadcrumbList + ItemList (49 ListItem) + CollectionPage. Blog adds BlogPosting + BreadcrumbList. Well-formed, no parse errors seen. |
| Images | ⚠️ | Homepage 18 `<img>`, all have `alt` attribute; 7 are empty `alt=""` — but all are Next.js `fill`/`object-fit:cover` decorative hero/background layers, so empty alt is correct, not a defect. Content images carry real alt. |
| AI search readiness (GEO) | ✅ | `llms.txt` (7 KB) + `llms-full.txt` (13 KB) both populated, structured, live 200. AI crawlers allow-listed. Speakable + FAQPage schema aid citation. |
| Redirects / URL hygiene | ✅ | `netlify.toml` 301s www→apex + collapses legacy 4-/3-segment product URLs to flat `/products/{slug}`. `public/_redirects` fixes typo slugs (penal→panel, bentch→bench, dup lobby-area). |
| Performance (CWV) | ⚠️ partial (API needed) | Source is Next 15 SSR w/ `next/image` lazy-loading + `decoding=async` — good defaults. No CrUX/Lighthouse field data this run. Lab LCP/INP/CLS not measured (Playwright not run). |
| Index coverage / GSC | ⚠️ partial (API needed) | Real indexation status, impressions, CTR require GSC — not wired. Checkable now: sitemap validity + robots (both pass). |
| Backlinks / authority | ⚠️ partial (API needed) | DA/PA, referring domains, anchors need Moz/DataForSEO/Common Crawl — not wired. |

## Findings

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🟡 medium | Static catalog XML mislabeled | `public/DMD_Website.xml` (246 KB) and `public/projects.xml` (26 KB) are **source data files** (`<places>` catalog tree / projects data), NOT sitemaps — both have 0 `<loc>`/`<url>` tags. Snapshot line 34 calls them "sitemaps," which can confuse future auditors. They're served live (200) so a crawler/AI hitting them gets raw internal XML. | Don't serve raw data XML at public URLs; move catalog source out of `public/` (it's only read at build by `scripts/generate-sitemap.js` + `lib/catalog.js`). Or `Disallow` them in robots. Correct the snapshot label. |
| 🟡 medium | CWV not field-verified | Performance category (10% weight) scored on lab/source signals only; no CrUX/Lighthouse. | Wire GSC/CrUX (`scripts/google_auth.py --check`) and run a Lighthouse pass before trusting the perf score. |
| 🟢 minor | `lastModified` mostly static | Most sitemap entries use a single hard-coded `LAST_BUILD = '2026-06-10'`; only blog uses real `isoDate`. | Cosmetic — fine for now. Wire real per-page mtimes when content stabilizes so `lastmod` signals true freshness. |
| 🟢 minor | No GSC/GA4/backlink data | Index coverage, traffic, link profile unverifiable this run. | Connect GSC + GA4 + a backlink source to close the 3 partial rows. |

## Score (84/100)

Lab/source-grounded. Weighted per skill rubric; partial-API categories scored on what is checkable.

| Category | Weight | Score | Note |
|---|---|---|---|
| Technical SEO | 22% | 90 | Robots, dynamic sitemap (231 URLs), canonicals, 301s all clean. −10 for raw data XML served publicly. |
| Content Quality | 23% | 85 | Author entity, guides+blog, FAQ depth. Not field-measured for engagement. |
| On-Page SEO | 20% | 92 | Unique titles/meta/canonical, single H1, strong internal hubs. |
| Schema | 10% | 95 | 10 blocks homepage; Breadcrumb/ItemList/BlogPosting per type. Rich + valid. |
| Performance (CWV) | 10% | 65 | Good Next/image defaults; **no field data** (partial). |
| AI Search Readiness | 10% | 95 | llms.txt + llms-full.txt + AI allow-list + Speakable/FAQ. |
| Images | 5% | 85 | Full alt coverage; empty alts are legit decorative. |

## Top 3 actions

1. **Stop serving raw catalog XML publicly.** `DMD_Website.xml` / `projects.xml` are build-time data, not sitemaps — move them out of `public/` or `Disallow` in robots so crawlers/AI don't ingest internal XML. Fix the snapshot's "sitemap" label.
2. **Wire field data to finish the audit.** Connect GSC + CrUX + GA4 (and one backlink source) to convert the 3 `partial (API needed)` rows into real numbers — Performance (CWV) benefits most.
3. **Run one Lighthouse/Playwright pass** on homepage + a product page to capture lab LCP/INP/CLS, since the perf score is currently the weakest, least-verified category.
