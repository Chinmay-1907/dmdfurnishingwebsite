# DMD Furnishing — Full SEO + GEO Audit (audit-fable)

**Target:** DMD Furnishing website · branch `fable-dmd` · source `C:\Users\chin\dmdfurnishingwebsite-fable` · live dev `http://localhost:3006`
**Production domain:** https://dmdfurnishing.com
**Date:** 2026-06-10
**Auditor:** SEO/GEO team (AgriciDaniel/claude-seo) — every agent + every skill, one file each.

## What this is
54 independent audits of the live site — one per SEO/GEO team member.
- **31 agent audits** → `agents/01..31-*.md` (each = a distinct audit *lens*)
- **23 skill audits** → `skills/01..23-*.md` (each = a distinct audit *checklist/procedure*)
- Shared grounding: `_site-snapshot.md` (every subagent read it first, then checked the real site).

Every file follows the same shape: scope → method (real files/pages checked) → severity-tagged findings table (🔴 critical · 🟠 high · 🟡 medium · 🟢 pass) → score/100 → gaps → top-3 actions.

## Headline verdict
**The site is technically and editorially strong** — full SSR, clean schema graph, AI crawlers allow-listed, dual `llms.txt` + `.well-known` mirror, 231-URL dynamic sitemap, anti-slop human-edited content (92/100), reference-quality on-page. On-page/technical/GEO lenses sit in the **mid-80s to mid-90s.**

**What drags the average:** (1) a handful of real, fixable bugs, and (2) the entire **off-site + measurement half is unwired** (no Google Search Console grant, analytics off, no backlinks/GBP work). Those score low as *readiness*, not as site defects.

- **Agent average:** ~79/100 · **Skill average:** ~75/100 · **Blended:** ~77/100
- Strip the API-gated "readiness" scores and the *built site* is ~86/100.

---

## 🔴🟠 Consolidated findings — fix list (deduped across all 54 audits)

### P0 — real bugs, fix now
| # | Issue | Evidence | Fix | Sources |
|---|---|---|---|---|
| 1 | **~Half of product images invisible to Google Images** | 191/414 `<image:loc>` in live sitemap carry raw un-encoded spaces; `GET /Images/Our Services.jpg` → 000, `%20` → 200 | `encodeURI()` image URLs in `app/sitemap.js`; rename spaced files | agents 11,16 · skills 5 |
| 2 | **Wrong product images + alt on a live page** | `/products/queen-bed-frame` renders **King** Bed Frame images, `alt="King Bed Frame - bedroom"` | fix data mapping for that product slug | skill 11 |
| 3 | **Schema geo-coordinates point to wrong building (~0.9 km off)** | `lib/metadata.js:162-163` `42.0654,-71.2478` → 15 Mechanic St; real 56 Leonard St ≈ `42.0582,-71.2421` | correct the GeoCoordinates | agents 17,18 · skills 14,15 |
| 4 | **Stale sitemap generator can nuke the good sitemap** | `scripts/generate-sitemap.js` (npm `generate:sitemap`) emits old 4-segment 301/404 URLs, zero flat URLs; would overwrite live `app/sitemap.js` output | delete the script or fix it to match the live route | agents 2,8,13 · skill 7 |
| 5 | **Project schema date not machine-readable** | `app/projects/[projectId]/page.js:70` `Article.datePublished` = free text ("June 2022") not ISO 8601 | format as ISO 8601 | agent 6 · skill 23 |

### P1 — high impact
| # | Issue | Evidence | Fix | Sources |
|---|---|---|---|---|
| 6 | **Author has no human identity (E-E-A-T + GEO)** | author node typed `Organization` but `@id` ends `#person`; no named `founder`/`Person` | model a real named author/founder `Person`, fix @id/type | agents 21,25,30 · skills 19,23 |
| 7 | **Flagship "FF&E = 15–25%" stat is uncited** — and sits in FAQPage schema on 3 pages, so AI quotes it verbatim | homepage FAQ + guide + blog, no source | attach a citable source (HVS/ISHC/AHLA) once, unify wording | agents 23,27 · skills 18,20 |
| 8 | **Measurement is completely dark — can't iterate** | Plausible gated on unset `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`; GSC returns 403 (not granted); GA4 empty; `/api/vitals` discards payload | set Plausible env, verify+grant GSC, wire GA4 or keep Plausible, store vitals | agents 2,19 · skills 5,10,12,16 |
| 9 | **Security-header config rot** | `public/_headers` vs `next.config.js` disagree on HSTS / X-Frame / CSP; stray `_headers` has no CSP | delete or reconcile `public/_headers` | agent 4 · skill 3 |
| 10 | **`/products` lost its head keyword** | `app/products/page.js:11` title regressed to "Commercial Furniture Catalog", dropping "Commercial Furniture Manufacturer"; verticals also dropped "manufacturer" | restore keyword in title/desc/H1/schema | agent 20 · skill 17 |
| 11 | **Cluster loop is one-way** | product hubs never link back up to guides/spokes; 4–5 verticals (office, healthcare, education, multi-family/lobby) have hubs but zero spoke content | add "related guides" links in `CategoryContentBlock.js`; build vertical spokes | agents 14 · skill 8 |
| 12 | **Verification tokens unset → weak on Bing/Copilot** | GSC + Bing meta verification env-gated and never set | set tokens; wire IndexNow to deploy | agents 24,26 · skill 16 |

### P2 — medium / opportunity
| # | Issue | Sources |
|---|---|---|
| 13 | Hardcoded `lastmod` (2026-06-10) on ~219 non-blog sitemap URLs | agents 1,8 · skill 1 |
| 14 | No Wikidata / Wikipedia / Google KG anchor in `sameAs` | agent 25 · skill 21 |
| 15 | No RFP / spec-download / cut-sheet page type (B2B lead-capture gap) | skill 9 |
| 16 | Heavy PNGs (~180 at 700–990 KB; two 808 KB hero PNGs) → convert to WebP/AVIF | agents 9,11 |
| 17 | 3 longest posts lack jump-link TOC; product detail prose templated across ~14 copy groups | agents 13,29 |
| 18 | Zero review signals / `aggregateRating`; missing `gtin/mpn`, `sku` echoes product name | skills 11,14 |
| 19 | Meta descriptions run short (131–152 chars) on all 6 blog posts | agent 31 |
| 20 | `og:locale` dropped on article pages (`lib/metadata.js:53-61`) | skill 13 |
| 21 | No comparison / "X vs Y" assets (weakest AI-answer query class) | agents 21 · skill 18 |

> **Note (not a bug):** `public/DMD_Website.xml` (246 KB) and `projects.xml` are **catalog/project data files, mislabeled as sitemaps** — including in this audit's own `_site-snapshot.md`. The real sitemap is generated by `app/sitemap.js` and served at `/sitemap.xml` (231 valid URLs), correctly referenced in `robots.txt`.

---

## Agent audits (31) — `agents/`
| # | File | Lens | Score | Status |
|---|---|---|---|---|
| 01 | [01-seo-geo-auditor](agents/01-seo-geo-auditor.md) | master SEO+GEO health | 88 | partial* |
| 02 | [02-seo-flow](agents/02-seo-flow.md) | end-to-end workflow coverage | 62 | partial* |
| 03 | [03-seo-article-loop](agents/03-seo-article-loop.md) | evidence-first article quality | 78 | complete |
| 04 | [04-seo-technical](agents/04-seo-technical.md) | crawl/index/redirects/security | 88 | complete |
| 05 | [05-seo-content](agents/05-seo-content.md) | E-E-A-T, thin content | 88 | complete |
| 06 | [06-seo-schema](agents/06-seo-schema.md) | Schema.org validity | 88 | complete |
| 07 | [07-seo-backlinks](agents/07-seo-backlinks.md) | internal links (off-site = API) | 88¹ | partial* |
| 08 | [08-seo-sitemap](agents/08-seo-sitemap.md) | XML sitemap validity | 88 | complete |
| 09 | [09-seo-performance](agents/09-seo-performance.md) | CWV structural signals | 92 | partial* |
| 10 | [10-seo-visual](agents/10-seo-visual.md) | responsive/render | 88 | partial* |
| 11 | [11-seo-image-gen](agents/11-seo-image-gen.md) | image SEO | 62 | complete |
| 12 | [12-seo-sxo](agents/12-seo-sxo.md) | search experience | 72 | complete |
| 13 | [13-seo-programmatic](agents/13-seo-programmatic.md) | programmatic pages | 78 | complete |
| 14 | [14-seo-cluster](agents/14-seo-cluster.md) | topic clusters | 72 | complete |
| 15 | [15-seo-drift](agents/15-seo-drift.md) | drift readiness | 68 | partial* |
| 16 | [16-seo-ecommerce](agents/16-seo-ecommerce.md) | product/category (B2B) | 82 | complete |
| 17 | [17-seo-local](agents/17-seo-local.md) | local SEO / NAP | 78 | partial* |
| 18 | [18-seo-maps](agents/18-seo-maps.md) | geo-grid / GBP readiness | 78 | partial* |
| 19 | [19-seo-google](agents/19-seo-google.md) | GSC/GA4/CrUX | 45 | partial* |
| 20 | [20-seo-dataforseo](agents/20-seo-dataforseo.md) | SERP/keyword readiness | 72 | partial* |
| 21 | [21-seo-geo](agents/21-seo-geo.md) | AI answer visibility | 87 | complete |
| 22 | [22-geo-ai-visibility](agents/22-geo-ai-visibility.md) | AI crawler access / llms.txt | 88 | complete |
| 23 | [23-geo-content](agents/23-geo-content.md) | E-E-A-T for AI citation | 84 | complete |
| 24 | [24-geo-platform-analysis](agents/24-geo-platform-analysis.md) | per-platform AI readiness | 68 | complete |
| 25 | [25-geo-schema](agents/25-geo-schema.md) | entity graph for AI | 66 | complete |
| 26 | [26-geo-technical](agents/26-geo-technical.md) | SSR / semantic HTML | 94 | complete |
| 27 | [27-seo-source](agents/27-seo-source.md) | claim evidence sort | 68 | complete |
| 28 | [28-seo-brief](agents/28-seo-brief.md) | anti-slop / brief quality | 92 | complete |
| 29 | [29-seo-doc](agents/29-seo-doc.md) | reader-facing doc quality | 90 | complete |
| 30 | [30-seo-knowledge-graph](agents/30-seo-knowledge-graph.md) | entity interlinking | 74 | complete |
| 31 | [31-blog-seo](agents/31-blog-seo.md) | blog on-page (per-post) | 94 | complete |

## Skill audits (23) — `skills/`
| # | File | Procedure | Score | Status |
|---|---|---|---|---|
| 01 | [01-seo](skills/01-seo.md) | SEO base checklist | 88 | partial* |
| 02 | [02-seo-audit](skills/02-seo-audit.md) | full audit routine | 84 | partial* |
| 03 | [03-seo-technical](skills/03-seo-technical.md) | technical checklist | 88 | complete |
| 04 | [04-seo-page](skills/04-seo-page.md) | per-page on-page | 84 | complete |
| 05 | [05-seo-plan](skills/05-seo-plan.md) | SEO planning | 72 | complete |
| 06 | [06-seo-sxo](skills/06-seo-sxo.md) | SXO checklist | 82 | complete |
| 07 | [07-seo-programmatic](skills/07-seo-programmatic.md) | programmatic checklist | 84 | complete |
| 08 | [08-seo-cluster](skills/08-seo-cluster.md) | cluster map | 74 | complete |
| 09 | [09-seo-competitor-pages](skills/09-seo-competitor-pages.md) | competitor page mining | 62 | partial* |
| 10 | [10-seo-drift](skills/10-seo-drift.md) | drift detection setup | 45 | partial* |
| 11 | [11-seo-ecommerce](skills/11-seo-ecommerce.md) | product/category checklist | 72 | complete |
| 12 | [12-seo-flow](skills/12-seo-flow.md) | FLOW workflow board | 58 | complete |
| 13 | [13-seo-hreflang](skills/13-seo-hreflang.md) | hreflang (N-A, single-locale) | 96 | complete |
| 14 | [14-seo-local](skills/14-seo-local.md) | local checklist | 72 | partial* |
| 15 | [15-seo-maps](skills/15-seo-maps.md) | maps readiness | 78 | partial* |
| 16 | [16-seo-google](skills/16-seo-google.md) | Google APIs readiness | 55 | partial* |
| 17 | [17-seo-dataforseo](skills/17-seo-dataforseo.md) | keyword targeting + query plan | 62 | partial* |
| 18 | [18-geo](skills/18-geo.md) | GEO base checklist | 82 | complete |
| 19 | [19-geo-audit](skills/19-geo-audit.md) | full GEO routine | 87 | complete |
| 20 | [20-geo-citability](skills/20-geo-citability.md) | citability scoring | 65 | complete |
| 21 | [21-geo-report](skills/21-geo-report.md) | consolidated GEO report (78 agg) | 78 | complete |
| 22 | [22-geo-report-pdf](skills/22-geo-report-pdf.md) | print-ready GEO report (81 agg) | 81 | complete |
| 23 | [23-seo-schema](skills/23-seo-schema.md) | schema validation routine | 82 | complete |

\* **partial** = lens needs a live API/service not wired for this site (Google Search Console grant, GA4, DataForSEO, Moz backlinks, Google Business Profile/Maps). Each such file documents the method + an exact gap checklist to run once access exists.
¹ internal-linking only; off-site backlink profile not scored (no API).

## API access needed to "complete" the partials
| Service | Unlocks | Audits waiting |
|---|---|---|
| Google Search Console (grant property) | rankings, coverage, queries, CTR, drift baseline | 19, 15, skills 10,16 |
| GA4 or Plausible (set env) | traffic, engagement, conversions | 19, skills 5,12,16 |
| DataForSEO | keyword volume/difficulty, live SERP, competitors | 20, skills 9,17 |
| Moz / Common Crawl | backlink profile, domain authority | 7 |
| Google Business Profile / Places | GBP audit, geo-grid rank, reviews | 17,18, skills 14,15 |

---
*Generated by the SEO/GEO team. Read `_site-snapshot.md` for the shared baseline. Start with this index, then the P0/P1 fix list above.*
