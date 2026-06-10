# Audit 01 — seo-geo-auditor (agent)
**Lens:** master orchestrator, full SEO+GEO health
**Target:** DMD Furnishing (fable-dmd) · source C:\Users\chin\dmdfurnishingwebsite-fable · live http://localhost:3006
**Date:** 2026-06-10
**Status:** partial (API needed — off-page authority + real search/AI-citation data require GSC/GA4/DataForSEO + live LLM probes)

## What this lens audits
Cross-cutting health of the whole site across every SEO + GEO dimension: technical foundation, crawl/index surface (robots, sitemap, canonicals, SSR), on-page metadata, structured data, content/E-E-A-T, and AI-engine readiness (llms.txt, crawler access, citable answer content). Not a deep single-dimension audit — a coverage map of what is strong vs weak and where the other 30 specialist audits should focus.

## Method (real files/pages checked)
- Live homepage HTML (`http://localhost:3006/`) — title, meta, canonical, OG/Twitter, H1, schema, image alts.
- `public/robots.txt`, `public/llms.txt` (read in full), `public/llms-full.txt` (200).
- `app/sitemap.js` (read in full) + live `/sitemap.xml` (231 URLs, HTTP 200).
- Spot-checked 5 representative live pages: `/products/hotel`, `/blog/what-is-ffe-hospitality`, `/guides/hospitality-ffe`, `/projects`, `/contact` — all HTTP 200, SSR, single H1, 1 consolidated `ld+json` graph each.
- Verified 404 behavior (`/products/nonexistent-xyz` → 404) and section distribution of sitemap URLs.

## Findings
| Severity | File / Page | Issue | Fix |
|---|---|---|---|
| 🟢 | `public/robots.txt` | Allows all, disallows `/api/`, allow-lists 9 AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, OAI-SearchBot, ChatGPT-User, anthropic-ai, cohere-ai). Sitemap declared. | None. Best-in-class AI access. |
| 🟢 | `app/sitemap.js` → `/sitemap.xml` | 231 URLs, dynamic, image entries, correct flat-catalog routing (202 products, 7 blog, 6 projects, 7 inspirations, 3 guides, core pages). 200 OK. | None. |
| 🟢 | All pages | Full SSR (Next 15 App Router), single H1 per page, self-referencing canonical matching prod domain, unique descriptive `<title>` per page. | None. |
| 🟢 | All pages | One consolidated `application/ld+json` graph: FurnitureStore + Organization + FAQPage + WebSite sitewide; CollectionPage/ItemList/BreadcrumbList on products; BlogPosting + author + datePublished/dateModified on blog. | None. Schema is a genuine strength. |
| 🟢 | `public/llms.txt` + `llms-full.txt` | Both 200. llms.txt is structured + has industry glossary, FAQs, process, materials — highly citable for AI engines. | None. |
| 🟠 | Homepage `<title>` | `"Hospitality Furniture Manufacturer \| Custom FF&E"` omits the "DMD Furnishing" brand suffix that `og:title` and all interior pages carry. Weakens brand SERP + entity signal on the most important page. | Append `\| DMD Furnishing` in the homepage `metadata.title`. |
| 🟠 | `app/sitemap.js` line 21 | Nearly all `lastModified` = hardcoded `LAST_BUILD = '2026-06-10'`. Only blog posts use real `post.isoDate`. 224 of 231 URLs share one fake date — dilutes freshness signal and will re-fire on every deploy. | Wire real source dates for products/projects/guides; keep `LAST_BUILD` only as a true fallback. |
| 🟡 | `public/DMD_Website.xml` (246 KB) | This is a **product data file** (`<places>`/`<furnitureType>`), NOT a sitemap (0 `<loc>` entries). Snapshot/robots naming risks confusion with `/sitemap.xml`. | Confirm nothing references it as a sitemap; consider renaming to `catalog.xml` to remove ambiguity. |
| 🟡 | Homepage images | A few decorative imgs carry empty `alt=""` (intentional/decorative is fine) but mixed with strong descriptive alts elsewhere. | Audit per `seo-images`; ensure only truly decorative images use empty alt. |
| 🟡 | Whole site | No `hreflang` tags. Correct today (single-language US site), but `og:locale=en_US` only. | No action unless international expansion; skip hreflang audit. |

## Coverage matrix (dimension → strong/weak)
| Dimension | Status | Evidence |
|---|---|---|
| Crawlability / robots | 🟢 Strong | AI-crawler allow-list, `/api/` blocked, sitemap declared |
| Indexability / canonicals | 🟢 Strong | Self-referencing canonicals to prod domain on every page |
| Sitemap | 🟢 Strong (1 fix) | 231 URLs, dynamic, image entries — but fake `lastmod` |
| SSR / rendering | 🟢 Strong | Full server HTML, no CSR-only content |
| Structured data (SEO + GEO) | 🟢 Strong | Consolidated graph, FurnitureStore/FAQ/Breadcrumb/BlogPosting |
| On-page meta | 🟢 Strong (1 fix) | Unique titles/descriptions; homepage title missing brand |
| Open Graph / Twitter | 🟢 Strong | Full OG + summary_large_image card set |
| GEO / AI readiness (llms.txt) | 🟢 Strong | llms.txt + llms-full.txt populated, glossary + FAQ |
| Content depth / E-E-A-T | 🟢 Likely strong | Author entity, dated posts, pillar guides — defer to seo-content |
| Internal linking | 🟡 Unknown | Not measured here — defer to internal-linking-optimizer |
| Off-page authority / backlinks | 🔴 Unknown | Needs API (no GSC/Moz/Ahrefs data) |
| Real AI citation visibility | 🔴 Unknown | Needs live LLM probes (geo-ai-visibility) |
| Performance (LCP/INP/CLS) | 🟡 Unknown | Image preloads present; needs seo-performance run |

## Score / verdict (88/100)
Technically excellent, AI-ready B2B lead-gen site — crawl, render, schema, and llms.txt are all best-practice; only off-page authority and two small on-page fixes hold it back.

## Gaps (needs API / human)
- **Backlinks / domain authority** — no Ahrefs/Moz/GSC link data wired. Method known; needs API.
- **Real keyword rankings / impressions** — GSC + GA4 not connected.
- **Actual AI-engine citation** (does ChatGPT/Perplexity/Claude cite DMD?) — needs live LLM probes, not source inspection.
- **Core Web Vitals field data** — needs Lighthouse/CrUX run (seo-performance lens).

## Top 3 actions
1. **Add `| DMD Furnishing` to the homepage `<title>`** (1 line, `app/page` metadata) — fixes the only weak brand/entity signal on the top page.
2. **Replace hardcoded `LAST_BUILD` `lastmod` with real content dates** in `app/sitemap.js` for products/projects/guides — restores trustworthy freshness signals across 224 URLs.
3. **Run the off-page + AI-visibility specialist audits** (backlinks, domain-authority, geo-ai-visibility) — the only real blind spots; on-page/technical/schema are already strong.
