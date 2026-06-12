# Skill Audit 17 — seo-dataforseo

**Skill purpose:** Live SEO data via DataForSEO MCP server — SERP positions, keyword volume/difficulty/intent, backlinks, on-page Lighthouse, competitor analysis, and AI-visibility (ChatGPT scraper, LLM mentions) across 79+ MCP tools.

**Target:** DMD Furnishing — B2B commercial/hospitality FF&E manufacturer · source `C:\Users\chin\dmdfurnishingwebsite-fable` (branch `fable-dmd`) · live dev http://localhost:3006 · prod https://dmdfurnishing.com

**Date:** 2026-06-10

**Status:** partial (API) — DataForSEO MCP server not installed and no `DATAFORSEO` login/password wired. No live volume, difficulty, SERP, backlink, or AI-mention data available. Did what is possible from source: on-page keyword-targeting coherence check against `SEO-GEO-Audit/keyword-map.md`, plus a ready-to-run query plan + gap checklist.

---

## API availability

- **MCP server:** not connected. No `serp_organic_live_advanced`, `kw_data_google_ads_search_volume`, `dataforseo_labs_*`, `backlinks_*`, or `ai_optimization_*` tools resolvable in this environment.
- **Credentials:** no DataForSEO API login/password found in env or MCP config.
- **Install path (per SKILL.md):** `./extensions/dataforseo/install.sh`, then set API login/password in MCP config, then run the query plan below.
- **Checkable now (no API):** on-page targeting of titles/descriptions/H1s vs. the keyword map (titles render with `template: '%s | DMD Furnishing'` from `app/layout.js`).
- **Needs API (cannot verify here):** real monthly volume, keyword difficulty, current SERP rank/competitors, backlink profile, and AI-citation share for every keyword in the map.

---

## On-page keyword targeting (vs. keyword-map.md clusters)

| Keyword cluster | Target page | Targeted? | Evidence |
|---|---|---|---|
| C1 `commercial furniture manufacturer` | `/products` | 🔴 No — **regressed** | `app/products/page.js:11` title `'Commercial Furniture Catalog'` → renders `Commercial Furniture Catalog \| DMD Furnishing`. Word "Manufacturer" gone from title, description (`:12`), schema `name` (`:68`), and on-page (only `<h2>Browse the full catalog A–Z` at `:101`). Map's #1 punch-list item (target = lead with `Commercial Furniture Manufacturer`) is unmet. |
| C2 `what is FF&E in hospitality` | `/blog/what-is-ffe-hospitality` | 🟢 Yes | Map confirms title/desc well-targeted; primary keyword in both. Not re-edited. |
| C3 `hotel guestroom furniture` / casegoods | `/products/hotel` | 🟡 Partial | `app/products/[placeSlug]/page.js:49-53` title `'Hotel Furniture & Casegoods'`, desc has "contract-grade … casegoods, headboards … Custom manufacturer". Good intent, but primary phrase "guestroom" missing from title; "manufacturer" only in desc body. |
| C4 `commercial restaurant seating` | `/products/restaurant` | 🟡 Partial | `:55-59` title `'Restaurant Furniture & Seating'`, desc covers banquettes/booths/bar stools + "Fire safety compliant" (NFPA/CAL not named). "Commercial" + "manufacturer" absent from title. |
| C8 `commercial office furniture manufacturer` | `/products/office` | 🟡 Partial | `:61-65` title `'Office Furniture & Workstations'`, desc "Commercial-grade task seating … workstations". ANSI/BIFMA X5.1 (map target) not present; "manufacturer" absent. |
| C9 healthcare furniture manufacturer | `/products/hospital` | 🟡 Partial | `:67-71` title `'Healthcare Furniture'`, desc adds bariatric + performance upholstery. No "manufacturer" / "Crypton" in title. |
| C10 educational/dormitory furniture | `/products/educational-facilities` | 🟡 Partial | `:73-75` title `'Educational Facility Furniture'`. K-12 / dormitory framing in body, not title. |
| Services (map punch #3) | `/services` | 🟡 Partial | `app/services/page.js:373` title `'FF&E Services: Design to Install'`, H1 `One Team, Concept to Installation` (`:408`). Strong intent, but no "Commercial Furniture / FF&E Services Manufacturer" lead keyword. |
| About (map punch #4) | `/about` | 🟢 Yes | `app/about/page.js:32` title `'About Us \| Foxboro MA Furniture Manufacturer'` — "Manufacturer" present and local-qualified. Meets map intent. |
| Homepage (map punch #5) | `/` | 🟢 Yes | Snapshot live title `Hospitality Furniture Manufacturer \| Custom FF&E` — matches map target. |

**Pattern:** product-vertical titles are clean and human, but they were rewritten to drop the commercial-intent head term **"manufacturer"** from every category title and from the `/products` pillar. The keyword map's single highest-priority item (lead `/products` with `Commercial Furniture Manufacturer`) regressed to a catalog-style label. About + homepage retain "Manufacturer"; the money pages (pillar + verticals) do not.

---

## DataForSEO query plan + gap checklist

Run after the MCP server is installed and credentials are set. Default params: `location_code=2840` (US), `language_code=en`, desktop. Batch keywords to minimize credit spend.

**DMD keyword set (from map):** `commercial furniture manufacturer`, `custom commercial furniture manufacturer`, `commercial casegoods manufacturer`, `hotel guestroom furniture`, `hotel casegoods supplier`, `commercial restaurant seating`, `restaurant booth manufacturer`, `commercial office furniture manufacturer`, `healthcare furniture manufacturer`, `classroom furniture manufacturer`, `multi-family amenity furniture`, `hospitality FF&E`, `FF&E procurement timeline`, `value engineering commercial furniture`, `HPL vs veneer hotel casegoods`.

| Step | Endpoint (MCP tool) | Input | Resolves gap |
|---|---|---|---|
| 1 | `kw_data_google_ads_search_volume` | full keyword set (one bulk call) | Real monthly volume — replaces map's qualitative buckets |
| 2 | `dataforseo_labs_bulk_keyword_difficulty` | full keyword set | Difficulty 0-100 per keyword — prioritize quick wins |
| 3 | `dataforseo_labs_search_intent` | full keyword set | Confirm commercial/transactional intent before targeting |
| 4 | `serp_organic_live_advanced` | each primary keyword (depth 100) | Current rank for dmdfurnishing.com + who owns page 1 |
| 5 | `dataforseo_labs_google_competitors_domain` | `dmdfurnishing.com` | True organic competitors (vs. map's "would require manual SERP") |
| 6 | `dataforseo_labs_google_ranked_keywords` | `dmdfurnishing.com` | What DMD already ranks for (catch unmapped keywords) |
| 7 | `dataforseo_labs_google_domain_intersection` | DMD vs top 2-3 competitors | Keyword gaps competitors win and DMD misses |
| 8 | `backlinks_summary` + `backlinks_referring_domains` | `dmdfurnishing.com` | Link authority — map explicitly excludes this |
| 9 | `on_page_lighthouse` + `on_page_instant_pages` | `/products`, `/products/hotel`, `/` | Real CWV + on-page SEO checks on live URL |
| 10 (GEO) | `ai_optimization_chat_gpt_scraper` + `ai_opt_llm_ment_top_domains` | `commercial furniture manufacturer`, `hospitality FF&E` | Whether ChatGPT/LLMs cite DMD; who they cite instead |

**Gap checklist (blocked until API live):**
- [ ] Real search volume for all 15 primary keywords (Step 1)
- [ ] Keyword difficulty to confirm which "moderate-comp" terms are realistic (Step 2)
- [ ] DMD's current SERP positions for each pillar keyword (Step 4)
- [ ] Verified organic competitor set + keyword-gap list (Steps 5-7)
- [ ] Backlink count / referring domains / spam score (Step 8)
- [ ] Live Lighthouse + Core Web Vitals on key pages (Step 9)
- [ ] AI-citation share for DMD vs competitors (Step 10)
- [ ] Cost pre-check each call: `python scripts/dataforseo_costs.py check <endpoint>` per SKILL.md guardrail

---

## Findings

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🔴 | `/products` title regression | `app/products/page.js:11` is `'Commercial Furniture Catalog'`; renders `…Catalog \| DMD Furnishing`. Drops the map's #1 head keyword "Commercial Furniture Manufacturer" from title, desc, schema, and H2. | Restore map target: title `Commercial Furniture Manufacturer \| Custom FF&E` (template adds brand). Add "manufacturer" to desc (`:12`), schema name (`:68`), and the on-page H2 (`:101`). |
| 🟠 | Vertical titles drop "manufacturer" | `/products/hotel`,`/restaurant`,`/office`,`/hospital` titles are descriptive labels, no commercial head term (`[placeSlug]/page.js:49-75`). | Lead each with vertical + "Manufacturer" (e.g. `Hotel Guestroom Furniture Manufacturer`), keep current as H1. |
| 🟠 | No live keyword/SERP data | Volume, difficulty, rank, competitors all qualitative estimates in `keyword-map.md` (states so at `:4`, `:262`). | Install DataForSEO MCP, run Steps 1-7 of query plan; rewrite map's buckets with real numbers. |
| 🟡 | Compliance specs missing from meta | Restaurant desc says "Fire safety compliant" not NFPA 701/CAL 117; office omits ANSI/BIFMA X5.1 (map targets name them). | Add named standards to vertical descriptions for high-intent long-tail. |
| 🟡 | GEO/AI-citation unmeasured | No data on whether LLMs cite DMD for its keywords. | Run Step 10 (`ai_optimization_*`) once API is live. |
| 🟢 | Homepage + About targeting | Both lead with "Manufacturer" and match map targets. | Keep. |

---

## Score

**Keyword-readiness: 62/100** (on-page only; live-data dimensions un-scorable without API)

- Homepage + About + top blog clusters well-targeted (+).
- Pillar `/products` regressed off its #1 head keyword and all vertical titles dropped "manufacturer" (−).
- No live volume/difficulty/rank/competitor/backlink/AI signal to validate the map (capped the ceiling).

---

## Top 3 actions

1. **Fix the `/products` regression now** (no API needed): set title back to `Commercial Furniture Manufacturer | Custom FF&E` and re-add "manufacturer" to its description, schema name, and visible heading — this is the keyword map's #1 punch-list item and the broadest commercial term DMD owns.
2. **Re-add "Manufacturer" to the four vertical product titles** (hotel/restaurant/office/healthcare) and inject named standards (NFPA 701, CAL 117, ANSI/BIFMA X5.1) into their descriptions.
3. **Install DataForSEO MCP + credentials, then run query-plan Steps 1-7** to replace the map's qualitative volume/difficulty/competitor estimates with real numbers before any further on-page rewrites.
