# Audit 20 — seo-dataforseo (agent)

**Lens:** live SERP + keyword metrics (DataForSEO)
**Target:** DMD Furnishing — B2B hospitality/commercial FF&E manufacturer (dmdfurnishing.com), Foxboro MA
**Date:** 2026-06-10
**Status:** partial (API needed)

---

## What this lens audits

DataForSEO is a paid API that returns *live* search data Google won't give you for free:
- **Keyword volume** — how many people search a phrase per month
- **Keyword difficulty** — how hard the first page is to crack (0-100)
- **Live SERP** — who actually ranks today for each target phrase
- **Competitor SERP overlap** — which rivals own the keywords we want

Everything else on this site (titles, meta, schema) is static and checkable from source. This lens is the one that tells us whether the keywords we're targeting are *worth* targeting and *winnable*. Without the API, we audit **keyword-targeting readiness**: are the right phrases mapped to the right pages, and is on-page targeting coherent enough that the API call would be worth running.

---

## API availability check

**Result: NOT wired. Cannot run live DataForSEO calls this session.**

Evidence:
- `.env` (project) keys: `SMTP_*`, `MAIL_*`, `RECAPTCHA_*`, `CORS_ORIGIN`, `REACT_APP_*`, `PORT` — **no `DATAFORSEO_*`, no login/password.**
- `.env.example` keys: `SMTP_*`, `MAIL_*`, `REPLICATE_*`, `DRY_RUN` — no DataForSEO placeholder either.
- No `.mcp.json` in project root.
- No `dataforseo` reference anywhere under `C:\Users\chin\.claude\` (settings.json, settings.local.json, .claude.json, config dir) — searched, zero hits.
- No `mcp__dataforseo__*` tool available in this session's tool surface.

DataForSEO auth = base64 `login:password` (or MCP server env `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD`). None present. To enable: create a DataForSEO account, then either install the claude-seo DataForSEO MCP module or set the two env vars.

---

## On-page keyword targeting (from content + keyword-map.md)

The site has a real, well-built keyword map: `SEO-GEO-Audit/keyword-map.md` (dated 2026-04-10), 12 clusters, each with pillar page + primary/secondary/semantic terms. It openly states no paid API was used — volumes are qualitative guesses. That is exactly the gap DataForSEO fills.

**Target keyword set (the phrases a DataForSEO run should price):**

| Cluster | Primary keyword | Pillar page | Map's volume guess |
|---|---|---|---|
| 1 | commercial furniture manufacturer | `/products` | moderate / mod-high comp |
| 2 | what is FF&E in hospitality | `/blog/what-is-ffe-hospitality` | low vol / high intent |
| 3 | hotel guestroom furniture · hotel casegoods supplier | `/products/hotel` | moderate |
| 4 | commercial restaurant seating | `/products/restaurant` | moderate |
| 5 | value engineering commercial furniture | `/blog/value-engineering-...` | very low / high intent |
| 6 | FF&E procurement timeline | `/blog/ffe-procurement-timeline` | low / high intent |
| 7 | HPL vs veneer hotel casegoods | `/blog/hpl-veneer-solid-wood-...` | very low / high intent |
| 8 | commercial office furniture manufacturer | `/products/office` | moderate / mod-high comp |
| 9-12 | healthcare / classroom / multi-family / reception desk manufacturer | `/products/*` | bonus, lower priority |

**Coherence check (live source spot-checks, 4 pages):**
- 🟢 Homepage `app/page.js` — title `Hospitality Furniture Manufacturer | Custom FF&E`. Matches map's cluster-5 recommendation exactly. Has the money word "Manufacturer."
- 🟢 `/products/[placeSlug]/page.js` — per-vertical titles now hardcoded and keyword-targeted: `Hotel Furniture & Casegoods`, `Restaurant Furniture & Seating`, `Office Furniture & Workstations`, etc. This *resolves* the map's complaint #2 ("per-category titles are template-generated, not keyword-targeted"). Real improvement since 2026-04-10.
- 🟠 `/products/page.js` — title is now `Commercial Furniture Catalog`. The map's #1 action wanted the pillar to **lead with `Commercial Furniture Manufacturer`** (the cluster-1 primary keyword). "Catalog" is weaker intent and drops the keyword. Drifted from plan.
- 🟢 `/blog/what-is-ffe-hospitality` — map already graded title+desc "well-targeted, keep." No change needed.

So: targeting map is strong, most pages execute it, one pillar (`/products`) regressed off the highest-volume keyword. The set is coherent enough that a DataForSEO run is worth the spend.

---

## Findings

| Severity | Keyword / Page | Issue | Fix |
|---|---|---|---|
| 🔴 | All 12 clusters | Zero real volume/difficulty data — every "moderate/low/high" in keyword-map.md is a guess. Can't prioritize effort or spot a dead keyword. | Run DataForSEO Keyword Overview on the 8 primary + ~30 secondary terms. Replace qualitative buckets with real numbers. |
| 🔴 | All pillars | No live SERP captured — we don't know who ranks page-1 today or if intent matches (e.g. "commercial furniture manufacturer" may surface big OEMs / directories we can't beat). | Run DataForSEO SERP (organic) for each primary keyword, location 2840 (US). |
| 🟠 | `/products` (cluster 1) | Title regressed to `Commercial Furniture Catalog`; dropped the primary keyword "Commercial Furniture Manufacturer" the map's action #1 specified. | Rewrite to lead with `Commercial Furniture Manufacturer` + brand (keep ≤60 chars). |
| 🟠 | Competitor set | Unknown — no competitor SERP overlap data. Don't know which rivals own our target clusters. | Run DataForSEO Competitors / Ranked Keywords on 2-3 named rivals once SERP reveals them. |
| 🟡 | Long-tail blog clusters 5/6/7 | Map calls these "very low volume." If true, fine for high-intent — but unverified. Could be near-zero (wasted content) or a sleeper. | DataForSEO volume + "keywords for keywords" to confirm there's *any* demand before doubling down. |
| 🟢 | `/products/[placeSlug]` | Per-vertical titles now keyword-targeted; map complaint resolved. | None — verify with SERP once API live. |

---

## DataForSEO query plan + gap checklist (API)

Defaults: `location_code=2840` (US), `language_code=en`. Prefer bulk endpoints to save credits.

**1. Keyword volume + difficulty (bulk, one call)**
- Endpoint: `keywords_data/google_ads/search_volume` (volume, CPC) + `dataforseo_labs/google/bulk_keyword_difficulty`
- Input: the 8 primary keywords + ~30 secondaries from the table above (single batched list).
- Output: monthly volume, difficulty 0-100, CPC. Replaces every guess in keyword-map.md.

**2. Live SERP per pillar (8 calls, or task-post batch)**
- Endpoint: `serp/google/organic/live/advanced`
- One per primary keyword. Capture top-10 URLs + titles → who we're fighting, and whether intent is informational vs. transactional vs. directory-dominated.

**3. Keyword expansion (find missed demand)**
- Endpoint: `dataforseo_labs/google/keyword_suggestions` (seed = "commercial furniture manufacturer", "hotel casegoods", "FF&E procurement")
- Surfaces long-tail we don't have pages for yet.

**4. Competitor SERP overlap (after step 2 names rivals)**
- Endpoint: `dataforseo_labs/google/competitors_domain` + `ranked_keywords` for 2-3 rivals.
- Output: which clusters competitors already own, their keyword gap vs. us.

**5. (optional) Local pack** — `serp/google/maps/live` for "commercial furniture Foxboro" / "hospitality furniture manufacturer near me" to size the local-intent slice.

**Gap checklist (what's blocked until API is live):**
- [ ] Real monthly volume for all 8 primaries — blocked
- [ ] Difficulty score per primary — blocked
- [ ] Live top-10 SERP + intent read per pillar — blocked
- [ ] Named competitor set + their ranked keywords — blocked
- [ ] Long-tail expansion list (new page ideas) — blocked
- [x] Keyword→page map exists and is coherent — DONE (keyword-map.md)
- [x] On-page titles execute the map — mostly DONE (1 regression: `/products`)
- [x] Pillar pages exist for all 8 primary clusters — DONE

---

## Score (keyword-readiness: 72/100)

| Component | Score | Why |
|---|---|---|
| Keyword map quality | 22/25 | 12 clusters, primary/secondary/semantic split, explicit "no API data" honesty. Strong. |
| On-page targeting execution | 20/25 | Per-vertical titles fixed; homepage on-target. −5: `/products` pillar dropped its primary keyword. |
| Real metric data present | 5/30 | None. All volume/difficulty is qualitative guess — the core thing this lens needs. |
| SERP / competitor intel | 5/20 | Zero live SERP, zero competitor data. Map even flags this as missing. |
| **Total** | **72/100** | High *readiness*, near-zero *validated data*. Site is primed for a DataForSEO run; the run hasn't happened. |

Read this as: the homework that makes a DataForSEO call worth paying for is mostly done. The call itself is the missing 30%.

---

## Top 3 actions

1. **Wire DataForSEO** (account + `DATAFORSEO_LOGIN`/`DATAFORSEO_PASSWORD` env or claude-seo MCP module), then run query plan steps 1-2 on the 8 primary keywords. Replace every guessed volume/difficulty in `keyword-map.md` with real numbers — that unblocks all prioritization.
2. **Fix the `/products` title regression** in `app/products/page.js` — lead with `Commercial Furniture Manufacturer` (the cluster-1 primary keyword the map's action #1 specified), not `Commercial Furniture Catalog`. One-line change, recovers the highest-volume term on the pillar page.
3. **Run live SERP for the 3 "moderate-comp" primaries** first (commercial furniture manufacturer, hotel guestroom furniture, commercial office furniture manufacturer) — these are where the map's competition guess is riskiest. If page-1 is OEM/directory-dominated, pivot budget to the high-intent long-tail clusters (5/6/7) instead.
