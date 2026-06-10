# Audit 02 — seo-flow (agent)
**Lens:** end-to-end SEO workflow coverage
**Target:** DMD Furnishing (fable-dmd) · source C:\Users\chin\dmdfurnishingwebsite-fable · live http://localhost:3006
**Date:** 2026-06-10
**Status:** partial (API needed — GSC/GA4/keyword-tool data not wired)

## What this lens audits
Not "is one page good" but "is the whole SEO machine wired end to end." The FLOW framework breaks the pipeline into five stages — **F**ind (keyword/intent research) → **L**everage (architecture, internal links, sitemap, crawl) → **O**ptimize (on-page, schema, content, perf) → **W**in (measure, submit, track, iterate) → **Local** (NAP, GBP, maps). For each stage: is it built, is the data flowing, what's missing.

## Method (real files/pages checked)
- Pipeline scripts: `package.json` (8 npm scripts), `scripts/` (8 files incl. `generate-sitemap.js`, `submit-indexnow.js`, `run-lighthouse-iter.ps1`, `check-image-refs.js`).
- Two sitemap sources: `app/sitemap.js` (App Router, flat URLs + image entries) vs `scripts/generate-sitemap.js` + `public/sitemap.xml` (legacy 4-segment URLs).
- Live endpoints on :3006 — `/sitemap.xml` (200, 56 KB, App Router output), `/robots.txt` (200), `/llms.txt` (200).
- Measure loop: `SEO-SCOREBOARD.md` (baseline + iterations 0–8), `seo-audits/fable-baseline..iter6/` Lighthouse JSON (13 pages × 7 iterations).
- Analytics path: `components/WebVitals.js` → `app/api/vitals/route.js` (sink discards payload).
- FIND stage: `SEO-GEO-Audit/keyword-map.md` (manual clusters, no paid-API volume).
- On-page/schema: `lib/metadata.js` (shared metadata + OG helper), `public/robots.txt`.

## Findings
| Severity | File / Page | Issue | Fix |
|---|---|---|---|
| 🔴 | `scripts/generate-sitemap.js` + `public/sitemap.xml` | Dead parallel sitemap path. Script emits legacy 4-segment `/products/{place}/{ft}/{sub}/{slug}` URLs that 301 now; live `/sitemap.xml` is served by `app/sitemap.js` (flat URLs). `npm run generate:sitemap` would write a stale, redirect-heavy file. | Delete the script + static `public/sitemap.xml`, drop the `generate:sitemap` npm script. App Router sitemap is the single source. |
| 🟠 | `components/WebVitals.js` → `app/api/vitals/route.js` | Measure loop has no sink. Vitals beacon fires in prod but route discards body ("No storage yet"). No analytics product wired (`grep` for plausible/gtag/umami → 0 hits). WIN-stage field data never lands anywhere. | Wire Plausible/Umami (per user analytics pref) + persist `/api/vitals` to it. Until then, real-user CWV is invisible. |
| 🟠 | `scripts/submit-indexnow.js` | IndexNow submitter exists and is correct, but is manual-only. Header comment says "wire into Netlify deploy-succeeded webhook" — never done. GSC sitemap submission also manual (no script). | Add a Netlify build/deploy hook calling `submit-indexnow.js`; add GSC sitemap ping. Closes the "tell engines" sub-stage of WIN. |
| 🟡 | `SEO-GEO-Audit/keyword-map.md` | FIND stage is manual estimates only ("No paid API data… volume and difficulty are qualitative"). No DataForSEO/Ahrefs/GSC query data feeding target selection. | Wire one keyword/SERP API or GSC `searchanalytics` to ground volume + find query gaps. |
| 🟡 | `SEO-SCOREBOARD.md` notes; `local-seo 45→70` | LOCAL stage half-done. NAP consistent + honest hours in code, but Google Business Profile and Maps work "out of code scope" — not started, no owner. | Stand up/claim GBP, align NAP, add review flow. Code can't do this; needs a human task. |
| 🟢 | `app/sitemap.js` | Strong LEVERAGE: 1-per-place + ≥3-product type pages + flat product URLs + projects/blog/guides, with `<image:image>` entries and lastmod. Live 200, 56 KB. | Keep. |
| 🟢 | `run-lighthouse-iter.ps1` + scoreboard | Real OPTIMIZE→re-measure loop: 13 pages, 8 iterations, per-category scores, stall logged with root-causes. Mature. | Keep. |
| 🟢 | `public/robots.txt` + `/llms.txt` (200) | Crawl-control + AI-discovery surface complete (9 AI bots allow-listed, sitemap line, llms.txt/llms-full.txt populated). | Keep. |

## Workflow-stage coverage (stage → done/gap)
| FLOW stage | Status | Evidence |
|---|---|---|
| **FIND** (keyword/intent) | 🟡 partial | `keyword-map.md` clusters exist but manual; no API volume, no GSC query mining. |
| **LEVERAGE** (architecture, internal links, sitemap, crawl) | 🟢 done | `app/sitemap.js` flat+type+image; A–Z indexes, tier links, 301s (scoreboard I3–I4); robots.txt clean. |
| **OPTIMIZE** (on-page, schema, content, perf) | 🟢 done | `lib/metadata.js` shared meta+OG; 10 schema blocks on home; Lighthouse SEO/A11y/BP 100 ×13; blog images added I8. |
| **WIN** (measure, submit, track, iterate) | 🟠 gap | Iterate loop = strong; but vitals discarded, IndexNow/GSC submit manual, no analytics store. Field-data half missing. |
| **LOCAL** (NAP, GBP, maps) | 🟡 gap | NAP/hours honest in code; GBP + Maps never started (out of code scope, no human task logged). |

## Score / verdict (62/100)
The build-side of the SEO pipeline (Leverage + Optimize) is genuinely mature — single-source dynamic sitemap, 8-iteration Lighthouse loop, full schema/metadata layer. The **measurement and distribution side (WIN) leaks**: web-vitals beacons hit a route that throws the data away, IndexNow/GSC submission is manual, and no analytics product is wired. FIND and LOCAL are partial because they need data/work that lives outside the code. The one true bug is a dead second sitemap generator pointing at redirected URLs.

## Gaps (needs API / human)
- **GSC** — sitemap-submit status, indexed-vs-submitted, query data for FIND. Not wired.
- **GA4 / Plausible / Umami** — no analytics product chosen or installed; `/api/vitals` has nowhere to write. (scoreboard `analytics-wiring 25/100`, "blocked").
- **Keyword/SERP API** (DataForSEO/Ahrefs) — FIND stage is estimates only.
- **Google Business Profile + Maps** — human/ops task, no code path.

## Top 3 actions
1. **Kill the dead sitemap path** — delete `scripts/generate-sitemap.js`, `public/sitemap.xml`, and the `generate:sitemap` npm script so `app/sitemap.js` is the only source (removes risk of shipping stale 301-target URLs).
2. **Close the WIN loop** — install Plausible/Umami, persist `/api/vitals` into it, and auto-run `submit-indexnow.js` (plus a GSC sitemap ping) from a Netlify deploy hook so measure + submit stop being manual.
3. **Ground FIND + start LOCAL** — feed GSC/keyword-API data into `keyword-map.md` target selection, and log a human task to claim/align the Google Business Profile (LOCAL is stuck at 45–70 with no owner).
