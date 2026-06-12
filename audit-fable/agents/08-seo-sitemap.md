# Audit 08 — seo-sitemap (agent)
**Lens:** XML sitemap validity + URL coverage
**Target:** DMD Furnishing (fable-dmd) · source C:\Users\chin\dmdfurnishingwebsite-fable · live http://localhost:3006
**Date:** 2026-06-10
**Status:** complete

## What this lens audits
Is there a valid XML sitemap; does robots.txt point to a real, served file; are URLs absolute/https/canonical; are lastmod/changefreq/priority used correctly; and do the sitemap URLs match the actual app routes (no missing pages, no 404/extra URLs). The brief assumed `public/DMD_Website.xml` IS the sitemap and that the robots `Sitemap:` line was a mismatch. Both assumptions are wrong — see Method. The real sitemap is generated dynamically and is healthy.

## Method (files checked + counts)
- **`public/DMD_Website.xml`** (246 KB) — opened. Root element is `<places>`, NOT `<urlset>`. It is the **product catalog data file** (places → furnitureTypes → subcategories → products → specs), not a sitemap. `grep '<url>'` = 0. Correctly NOT referenced by robots.
- **`public/projects.xml`** (26 KB) — opened. Root `<projects>`. **Project portfolio data file**, not a sitemap. `grep '<url>'` = 0. Correctly not referenced by robots.
- **`public/robots.txt`** — `Sitemap: https://dmdfurnishing.com/sitemap.xml`. Allows all, disallows `/api/`, explicit AI-crawler allow-list. Directive is **correct**.
- **`app/sitemap.js`** — the REAL sitemap. Next.js App Router dynamic route (`export default function sitemap()`). Builds entries from `lib/catalog`, `lib/projects`, `lib/inspirations`, `lib/blog-posts`. This is what serves `/sitemap.xml`.
- **Live `GET /sitemap.xml`** → HTTP 200, `application/xml`, valid `<urlset>` with image namespace. **231 `<url>`, 231 `<loc>`, 231 `<lastmod>`, 207 `<image:image>`, 0 changefreq, 0 priority.** All 231 locs `https://` (0 http). 0 duplicate locs. 7 distinct lastmod values (blog posts carry real isoDates: 03-22 → 04-02; everything else = build date 2026-06-10).
- **`public/sitemap.xml`** — does **not exist** on disk. So the dynamic `app/sitemap.js` route owns `/sitemap.xml` with no static-file conflict.
- **`scripts/generate-sitemap.js`** (`npm run generate:sitemap`) — read in full. **Stale and orphaned**: writes to `public/sitemap.xml` (which doesn't exist → never run in current flow), parses the OLD nested 4-segment product URLs that now 301-redirect, emits numeric `/inspirations/1..6` (now 404 — slugs are used), and OMITS `/guides/*`, `/guides`, and `/author/...`. If anyone runs it, it overwrites the good dynamic sitemap with a broken one.
- **Live URL spot-checks** (one per section): `/products/hotel` 200 · `/products/hotel/guest-room` 200 · `/projects/quality-inn-gainesville` 200 · `/guides/hospitality-ffe` 200 · `/author/dmd-furnishing-editorial` 200 · `/inspirations/classic-luxury` 200 · old-style `/inspirations/1` **404**.

## Findings
| Severity | File | Issue | Fix |
|---|---|---|---|
| 🟠 high | `scripts/generate-sitemap.js` | Orphaned/stale generator. Targets old nested product URLs (now 301), numeric inspiration IDs (now 404), omits guides + author. Writes to `public/sitemap.xml` which would then shadow nothing but is broken. A future run silently breaks the sitemap. | Delete the script + the `generate:sitemap` npm script, OR rewrite it to re-export `app/sitemap.js` output. The dynamic route is the source of truth; kill the duplicate. |
| 🟡 medium | `app/sitemap.js` | `lastModified` = static `LAST_BUILD = '2026-06-10'` for all 219 non-blog URLs. Hardcoded date drifts; every page looks edited "today" forever, which trains crawlers to ignore lastmod. | Pull a real date per content type (catalog file mtime, project completionDate, page git-mtime) or drop lastmod on pages with no true signal. Blog already does this right via `post.isoDate`. |
| 🟡 medium | `app/sitemap.js` | `/feed.xml` (RSS, 200, served by `app/feed.xml/route.js`) is fine to omit, but **`/products/{place}/{typeSlug}` mid-tier pages are gated at `count >= 3`** (line 99-111). 20 are included; any furniture-type with <3 products is a live 200 route excluded from the sitemap. Likely intentional thin-page guard — verify it's not hiding real pages. | Confirm the <3 cutoff is deliberate. If those mid-tier pages render real content, include them; if they're thin, noindex them rather than just omitting. |
| 🟢 pass | `public/robots.txt` | `Sitemap:` points to `/sitemap.xml`, which serves 200 valid XML. No mismatch (brief's assumed bug does not exist). | none |
| 🟢 pass | live `/sitemap.xml` | Valid `<urlset>`, 231 URLs (well under 50k), all absolute https, canonical host, 0 dupes, image extension present, no deprecated `priority`/`changefreq` (Google ignores both — correct to omit). | none |
| 🟢 pass | `public/DMD_Website.xml`, `public/projects.xml` | Data files, not sitemaps. Correctly NOT in robots. Brief's "is DMD_Website.xml the sitemap?" — answer: no, and that's correct. | none |

## Sitemap↔route coverage (missing / extra URLs)
**231 sitemap URLs.** Bucketed: 1 home · 181 `products/{slug}` (place pages + flat product details) · 20 `products/{place}/{type}` mid-tier · 6 blog posts · 6 inspiration slugs · 5 projects · 2 guides + `/guides` · 8 static (`/about /services /contact /projects /inspirations /website-policies /author/... /blog`).

Against the 23 app page routes (dynamic segments expand to many URLs):
- **All 6 blog posts present** (matches snapshot's 6). ✅
- **All 6 inspiration slugs present**, using correct slugs not numeric IDs. ✅
- **Both guides + `/guides` index + `/author/...` present.** ✅ (only the dynamic route covers these — the stale script does not).
- **5 projects present** (all from projects.xml). ✅
- **Missing (intentional/acceptable):** API routes (`/api/*` — noindex, disallowed, correct to omit) · `/feed.xml` (RSS endpoint, not a page — fine) · mid-tier furniture-type pages with <3 products (gated out — verify, see findings).
- **Extra / dead URLs:** none found. Every sampled section returns live 200. No 404s, no redirected URLs in the sitemap.

Net: dynamic sitemap coverage is essentially complete and accurate. The only coverage risk is the deliberate `count >= 3` mid-tier gate, and the only real hazard is the stale generator script that, if run, would reintroduce 404s and 301s.

## Score / verdict (88/100 + one line)
The live dynamic sitemap is valid, complete, https-clean, and correctly wired to robots — strong; the only real risks are a stale generator script that can overwrite it with broken URLs and an all-identical hardcoded lastmod.

## Top 3 actions
1. **Remove (or rewrite) `scripts/generate-sitemap.js` + the `generate:sitemap` npm script.** It targets dead URL shapes and would clobber the good `/sitemap.xml`. `app/sitemap.js` is the single source of truth.
2. **Give non-blog URLs real lastmod** (catalog/project/page dates) or drop lastmod where there's no true edit signal — stop stamping all 219 with one hardcoded build date.
3. **Confirm the `count >= 3` mid-tier gate** in `app/sitemap.js` isn't excluding real, indexable furniture-type pages; include them or noindex the thin ones.
