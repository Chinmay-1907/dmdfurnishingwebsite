# Audit 15 — seo-drift (agent)

**Lens:** ranking-drift detection + drift readiness
**Target:** DMD Furnishing — https://dmdfurnishing.com (source `C:\Users\chin\dmdfurnishingwebsite-fable`, branch `fable-dmd`)
**Date:** 2026-06-10
**Status:** partial (API needed)

## What this lens audits

Drift = a page that used to rank starts slipping, or an on-page SEO element silently changes and tanks a page. True drift detection needs two time-series feeds the source can't provide:

1. **Ranking drift** — position/clicks/impressions over time, per query, per URL. Source = Google Search Console (GSC) or DataForSEO/SEMrush rank tracking.
2. **On-page element drift** — title / meta / canonical / robots / H1 / schema / status code changing between two crawls of the same URL.

Neither feed is wired here. The agent's own scripts (`scripts/drift_baseline.py`, `drift_compare.py`, `drift_history.py`, `drift_report.py`) **do not exist in this repo** — confirmed by glob (`**/drift_*.py` → no files). So this is a readiness audit: is the site instrumented so drift *could* be caught once a ranking API is connected, and is the build stable enough to avoid self-inflicted drift.

## Method (what's checkable now)

Checkable from source + live `:3006`, no external API:
- **Baseline exists?** — Is there a captured starting state to compare against? (`SEO-SCOREBOARD.md`, `seo-audits/fable-baseline/` + `fable-iter1..9/`.)
- **GSC verified?** — Is the property claimable so ranking history can be pulled? (verification file + meta-tag path.)
- **Push-to-index wired?** — IndexNow present so changes propagate fast (lowers recovery time after drift). 
- **Change tracking?** — Is there any record of what changed when (iteration log, redirects history).
- **Self-inflicted-drift guards** — canonical strategy centralized, redirects stable, `metadataBase` single-sourced. Scattered canonicals = the #1 cause of DIY ranking drift.

NOT checkable without API: actual positions, clicks, impressions, which queries moved, whether a page lost the SERP feature. Marked in the gap checklist.

## Drift-readiness findings

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🟢 | On-page baseline | `seo-audits/fable-baseline/` + `fable-iter1..9/` each hold 12–13 per-page Lighthouse JSON snapshots; `SEO-SCOREBOARD.md` is a real time-series matrix (I0→I7, Perf/SEO/A11y/BP per page). Strong on-page/perf baseline already captured. | Keep. This is the comparison anchor for performance + Lighthouse-SEO drift. |
| 🟢 | GSC verification ready | `public/c2f5892f84b6428da1e0da44742db082.txt` present (Google file-verification). Plus `app/layout.js` meta-tag path via `GSC_VERIFICATION_TOKEN` env. Two ways to claim the property → ranking history is pullable once access lands. | Confirm property is *verified* in GSC console (file alone isn't proof of claim). Then wire the `gsc` MCP. |
| 🟢 | IndexNow push wired | `public/indexnow-key.txt` + `<key>.txt` + `scripts/submit-indexnow.js` (posts live sitemap URLs to api.indexnow.org). Cuts re-index lag → faster recovery after any drift event. | Wire to Netlify `deploy-succeeded` webhook (script comment already flags this is manual-only today). |
| 🟢 | Canonical strategy centralized | One `metadataBase` in `app/layout.js` (line 41); canonical built once in `lib/metadata.js` (`alternates.canonical`, line 72-73). Not scattered across pages → low risk of self-inflicted canonical drift. | Keep. Add a CI grep that fails if any `page.js` hard-codes its own `alternates.canonical` outside the helper. |
| 🟡 | Redirect stability | `public/_redirects` = 7 clean 301s (typo + duplicate-segment fixes), all permanent. Stable, but **no record of when each was added** or whether old URLs still emit 301 (not 302/200). 302 creep is a classic silent drift source. | Add a date comment per rule; add a smoke test asserting each `from` returns 301 → correct `to`. |
| 🟡 | No on-page drift snapshot tool | The lens's `drift_baseline.py` / `drift_compare.py` aren't in this repo. There's no stored hash of title/meta/canonical/robots/H1/schema per URL, so an *element* change (e.g. a canonical flipped, a noindex slipped in) would go uncaught between crawls. | Stand up element-level snapshots (see Monitoring setup). The Lighthouse JSON baselines cover perf/score, not raw tag values. |
| 🟡 | No ranking time-series | No GSC/DataForSEO export, no rank-history file anywhere in repo. Position/click drift is currently invisible. | Pull GSC `search_analytics` weekly into a dated file (see cadence). This is the core "drift" feed and it's the main gap. |
| 🟢 | Sitemap + AI-crawler access | `DMD_Website.xml` (246 KB) + dynamic `app/sitemap`, `robots.txt` allow-lists AI crawlers, `llms.txt` populated. Healthy surface for both classic and AI-search visibility tracking. | Keep; once GSC is live, also watch AI-referral drift via server logs / analytics. |

## Monitoring setup needed (API + cadence + gap checklist)

**APIs to connect (worst-first):**
1. **GSC** (`gsc` MCP — already wired per SEO-SCOREBOARD note, "tools need session reload; Google access propagating"). Primary ranking-drift feed. Free.
2. **GA4** (`ga4` MCP) — organic-landing-page sessions/conversions drift (consultation requests). Confirms whether a ranking dip actually cost leads.
3. **DataForSEO or SEMrush** (optional, paid) — daily rank tracking on the ~20 money keywords from `SEO-GEO-Audit/keyword-map.md` for tighter granularity than GSC's averaged positions.

**Cadence:**
- **Weekly** — GSC `search_analytics` export → dated file `seo-audits/ranking-history/YYYY-MM-DD.json`. Compare top-50 URL/query positions vs prior week. Flag any URL dropping >3 positions or >20% clicks.
- **Per deploy** — run an element-snapshot of the 13 template-representative URLs (home, products, place-hotel, type-page, product-detail, services, about, contact, blog, blog-post, guide, projects, inspirations). Store title/meta/canonical/robots/H1/schema-count + status. Diff vs last deploy. CRITICAL if canonical changed, noindex added, schema removed, or status went 4xx/5xx.
- **Monthly** — re-run Lighthouse into a new `seo-audits/fable-iter{N}/` and append a SEO-SCOREBOARD row (the loop already does this — keep it going post-launch).

**Gap checklist (what's missing to make drift detection real):**
- [ ] Confirm GSC property is actually *verified* (file present ≠ claimed).
- [ ] Reload/connect `gsc` + `ga4` MCP this session (noted as pending).
- [ ] Create `seo-audits/ranking-history/` and seed week-0 from GSC.
- [ ] Stand up element-level snapshot+compare (the lens's missing `drift_*.py`, or equivalent JS using the live sitemap).
- [ ] Wire `submit-indexnow.js` into the Netlify deploy webhook (faster recovery).
- [ ] Add CI guard: fail build if a page hard-codes a canonical outside `lib/metadata.js`.
- [ ] Add 301 smoke test for `public/_redirects` (catch 302/200 regressions).
- [ ] Define alert thresholds (>3 position drop, >20% click drop, any canonical/robots flip).

## Score (readiness 68/100)

Breakdown: on-page/perf baseline **strong** (Lighthouse iter snapshots + scoreboard), GSC verification + IndexNow **ready**, self-inflicted-drift guards **good** (centralized canonical, stable 301s). Held back by the two feeds that *are* drift detection: **no ranking time-series** and **no element-level snapshot/compare tool** (the lens's own scripts are absent). Site is well-positioned to catch drift the moment the ranking API connects — but today it cannot actually detect drift.

## Top 3 actions

1. **Connect GSC + seed week-0 ranking history.** Verify the property, reload the `gsc` MCP, export `search_analytics` to a dated file. Without this, drift is invisible — it's the whole point of the lens.
2. **Add per-deploy element snapshots** for the 13 template URLs (title/meta/canonical/robots/H1/schema/status), diffing each deploy. Catches the silent on-page drift the Lighthouse baselines miss.
3. **Lock self-inflicted-drift guards into CI** — canonical-outside-helper grep + `_redirects` 301 smoke test, and wire IndexNow to the deploy webhook so any fix re-indexes fast.
