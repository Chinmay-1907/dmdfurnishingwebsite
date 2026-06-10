# Skill Audit 10 — seo-drift

**Skill purpose:** "Git for SEO." Capture baselines of SEO-critical on-page elements, detect changes against a known-good snapshot, and classify regressions by severity (17 rules / 3 levels) so a deploy that silently breaks a title, canonical, schema, or status code is caught before traffic drops.

**Target:** DMD Furnishing — https://dmdfurnishing.com (source `C:\Users\chin\dmdfurnishingwebsite-fable`, branch `fable-dmd`, live dev :3006). B2B lead-gen, 23 page files.

**Date:** 2026-06-10

**Status:** partial (API needed) — drift *capture* of on-page elements is **not** wired; CWV/Lighthouse baselining and a manual change-ledger **are** in place. Ranking-history side (the "did traffic move" half) needs GSC, which is unwired this session.

---

## Drift-readiness checklist

| Item | Ready? | Evidence |
|---|---|---|
| On-page baseline (title/meta/canonical/robots/H1-H3/OG/schema) | 🔴 No | Skill captures these via `parse_html.py` into SQLite `~/.cache/claude-seo/drift/baselines.db`. No such DB, no `parse_html.py`, no `drift_baseline.py` in repo. The skill lives globally at `~/.claude/teams/seo/skills/seo-drift/`; its scripts were never run against this site. |
| Content + schema hashes (html_hash, schema_hash SHA-256) | 🔴 No | Rules 14 & 17 depend on stored hashes. None captured — no baseline rows exist. |
| CWV / Lighthouse baseline | 🟢 Yes | `seo-audits/fable-baseline/` + `fable-iter1..7,9` hold full Lighthouse JSON for 13 pages each (perf/a11y/bp/seo categories, CWV audits). Captured by `scripts/run-lighthouse-iter.ps1` (mobile, prod :3006). This satisfies the skill's CWV fields (Rules 11–12), but as Lighthouse dumps, not the skill's normalized schema. |
| Change-tracking ledger / iteration history | 🟢 Yes | `SEO-SCOREBOARD.md` is a hand-kept per-iteration ledger (I0–I8): score table + commit hashes (8346de3, 3c3610b, d96dac7, e733981, a83064c, 5e2b4d0…) + prose changelog. This IS drift history, just human-authored not auto-diffed. |
| Canonical / redirect stability | 🟢 Yes | `public/_redirects` = 8 stable 301s (typo + dup-segment fixes), versioned in source. Homepage canonical `https://dmdfurnishing.com` confirmed in live HTML (snapshot). Redirects are declarative + committed, so drift = a git diff. |
| Robots / headers stability | 🟢 Yes | `public/robots.txt` (allow-all, disallow /api/, 9 AI crawlers allow-listed) and `public/_headers` (HSTS, nosniff, frame DENY) are static committed files — any change shows in version control. |
| Baseline artifacts present & dated | 🟡 Partial | Lighthouse baselines + scoreboard all dated 2026-06-10 (single day, I0→I8). Good seed, but no cadence yet — all iterations are same-day churn-loop runs, not a deploy-over-time series. |
| GSC verification / ranking history | 🔴 No (API) | gsc MCP tools exist (`mcp__gsc__*`) but SEO-SCOREBOARD note: "GSC/GA4 MCP data unavailable this session… Google-side access still propagating." No verified property, no impressions/clicks/position baseline. This is the ranking-drift half the skill's setup needs. |
| Sitemap submitted to GSC | 🔴 No (API) | `public/DMD_Website.xml` (246KB) + `projects.xml` exist and `app/sitemap.js` generates `/sitemap.xml`; robots points to it. Submission/coverage state needs `mcp__gsc__submit_sitemap` / `get_sitemaps` against a verified property — not done. |
| Automated compare on deploy | 🔴 No | No `drift_compare.py` wired into CI/Netlify. `netlify.toml` present but no post-deploy drift hook. |

---

## Monitoring setup prescribed (snapshots / cadence / thresholds)

What the skill prescribes vs. what DMD has:

**Snapshots** — Run `drift_baseline.py <url>` per key URL to store title, meta, canonical, meta_robots, H1/H2/H3 arrays, JSON-LD schema, OG dict, CWV, status_code, plus html_hash + schema_hash in SQLite. DMD has only the CWV slice (Lighthouse JSON), so 11 of 13 tracked fields are uncaptured.

**Cadence** — Skill's two workflows: (1) **pre/post-deploy** — baseline before deploy, compare after; (2) **ongoing** — baseline once, compare every few weeks, `history` to review. DMD's de-facto cadence is per-churn-iteration (Lighthouse re-run each loop, scoreboard appended). Recommended going-forward: baseline the ~10 money pages (home, /products, /products/hotel, a type page, a PDP, /services, /contact, /about, 1 blog, 1 guide) **now** as known-good, then `compare` on every Netlify production deploy.

**Alert thresholds** (the skill's 17 rules — what should page you):
- 🔴 **CRITICAL (act immediately):** schema fully removed (R1); canonical changed (R2) or removed (R3); noindex added (R4); H1 removed (R5) or >50% text-changed (R6); title removed (R7); status 2xx→4xx/5xx (R8).
- 🟠 **WARNING (within 1 week):** title text changed (R9); meta description changed (R10); any CWV p75 regressed >20% (R11); Lighthouse perf dropped ≥10 pts (R12); OG tags removed (R13); schema_hash changed (R14).
- 🟡 **INFO:** new schema added (R15); H2 structure changed (R16); html_hash changed (R17).

For DMD specifically, R8 (status), R2/R3 (canonical) and R4 (noindex) are the highest-value alerts — an SSR Next.js route flip to dynamic already bit this site once (scoreboard †: contact 92, meta description streamed into `<body>` because `await searchParams` made the route dynamic; fixed I3). That class of regression is exactly what automated drift compare catches; the manual scoreboard caught it only because a human was watching scores.

---

## Findings

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🟠 high | On-page drift uncaptured | The skill's core (title/meta/canonical/robots/H1-3/schema/OG + hashes) has zero baselines stored. A deploy that drops a canonical or injects noindex would go unnoticed until a manual audit. | Run `python scripts/drift_baseline.py <url>` for the ~10 money pages against :3006 (or prod) today; commit the resulting `baselines.db` path note to repo so the known-good is explicit. |
| 🟠 high | Ranking-history half blind | No verified GSC property → no impressions/clicks/position baseline. Can detect *page* changes but not whether they *moved rankings*. | Finish GSC verification for `dmdfurnishing.com`; pull a 28-day `mcp__gsc__get_search_analytics` baseline and submit `/sitemap.xml` via `mcp__gsc__submit_sitemap`. |
| 🟡 medium | No deploy-time automation | Drift compare is manual; Netlify deploys have no post-deploy SEO check. `netlify.toml` present but unhooked. | Add a post-deploy step (or local pre-push) that runs `drift_compare.py` on the money pages and fails loud on any CRITICAL rule. |
| 🟡 medium | Baseline is single-day | All Lighthouse iters + scoreboard are 2026-06-10 churn-loop runs — a seed, not a time series. No drift-over-weeks data exists yet. | After prod deploy, freeze I8 as the canonical baseline and start a real dated cadence (compare weekly). |
| 🟢 pass | Redirects/headers/robots stable & versioned | `_redirects` (8 × 301), `_headers`, `robots.txt` are committed static files; drift = a reviewable git diff, no tooling gap. | Keep in source control (already done); no action. |
| 🟢 pass | CWV baseline + change ledger exist | Lighthouse JSON ×13 pages ×8 iters + `SEO-SCOREBOARD.md` commit-linked changelog cover Rules 11–12 and serve as a human drift log. | Reuse as the CWV side of the skill's baseline; don't rebuild. |

---

## Score

**Readiness: 45 / 100**

Breakdown: CWV/Lighthouse baselining + a disciplined commit-linked change ledger + version-controlled robots/redirects/headers are genuinely strong (the "is it stable and tracked" foundation is real). But the skill's *defining* capability — stored on-page snapshots with hashes and an automated 17-rule compare — is entirely unwired, and the ranking-history half needs a GSC property that isn't verified. Half the engine is missing, so this caps in the mid-40s.

---

## Top 3 actions

1. **Baseline the money pages now.** Run the skill's `drift_baseline.py` on ~10 key URLs (home, /products, /products/hotel, a type page, a PDP, /services, /contact, /about, 1 blog, 1 guide) to capture title/meta/canonical/robots/H1-3/schema/OG + hashes — the 11 fields Lighthouse doesn't cover. One command per URL; gives an instant known-good.
2. **Wire compare into deploy.** Add a post-Netlify-deploy (or pre-push) `drift_compare.py` run that fails loud on any CRITICAL rule (status→error, canonical changed/removed, noindex added, schema/H1/title removed). This is the exact guard that would have flagged the I3 dynamic-route meta-in-body regression automatically.
3. **Verify GSC + pull a ranking baseline.** Finish `dmdfurnishing.com` verification, submit `/sitemap.xml` (`mcp__gsc__submit_sitemap`), and store a 28-day impressions/clicks/position snapshot — turning on the ranking-drift half so on-page changes can be tied to actual search movement.
