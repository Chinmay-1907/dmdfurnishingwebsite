# Skill Audit 05 — seo-plan

**Skill purpose:** Strategic SEO planning — assess whether a site has a coherent, prioritized, measurable SEO/GEO plan, then produce a gap-based roadmap. (AgriciDaniel `seo-plan` v2.0.0: discovery → competitive analysis → architecture → content strategy → technical foundation → 4-phase roadmap + KPI targets.)

**Target:** DMD Furnishing — B2B commercial/hospitality FF&E manufacturer, lead-gen (not ecommerce). https://dmdfurnishing.com · Next.js 15 SSR · 23 routes · Foxboro, MA.

**Date:** 2026-06-10

**Status:** Partial (live GSC/GA4/DataForSEO not granted — plan-maturity judged from source artifacts + live HTML + iteration scoreboard; ranking/traffic baselines need the APIs).

---

## Planning checklist

| Element | Exists? | Evidence |
|---|---|---|
| Target-keyword plan | 🟢 Yes (strong) | `SEO-GEO-Audit/keyword-map.md` — 12 clusters, pillar+supporting pages, primary/secondary/semantic terms, current→target title/desc per cluster. Volume/difficulty are qualitative only (no paid API). |
| Keyword→URL mapping | 🟢 Yes | Same file maps each cluster to a real route (`/products`, `/products/hotel`, the 6 blog posts, the 2 guides). |
| Content roadmap / calendar | 🟡 Partial | `seo-audits/10-SEO-STRATEGY.md` has a 6-article 3-month blog calendar + 4 content pillars. But 5 of 6 planned posts already shipped — calendar is stale, no live forward cadence (e.g. month 2-3 topics, publish frequency). |
| Priority order | 🟢 Yes (strong) | `SEO-GEO-Audit/4-9-SEO/skills/seo-plan/audit.md` = P0/P1/P2/P3, 63 actions, 3-layer model (deploy → off-site authority → on-site), impact/effort/agent-source per row. `seo-audits/02-ACTION-PLAN.md` = 29 items, CRITICAL/HIGH/MED/LOW + impact-matrix. |
| Measurable goals / KPIs | 🟡 Partial | `10-SEO-STRATEGY.md` has 3/6/12-mo goals + a KPI table (indexed pages, LCP, CLS, AI-citation score). Baselines are from March (28/100 era), now stale; no live GSC numbers to re-baseline. |
| Score trajectory / targets | 🟢 Yes | `SEO-SCOREBOARD.md` tracks 13 pages × Lighthouse × 8 iterations; `PROGRESS.md` tracks 18 audit categories audit→after-fix→target. |
| Competitive analysis | 🔴 No | Skill step 2 (top-5 competitors, their schema/E-E-A-T/DA, keyword gaps) is absent. `keyword-map.md` explicitly excludes it ("would require manual SERP inspection"). |
| Technical foundation plan | 🟢 Yes (largely executed) | Schema, sitemap, CWV, AI-readiness all planned and shipped per `PROGRESS.md` + scoreboard (SEO/A11y/BP 100 ×13). |
| Off-site / authority plan | 🟡 Planned, not executed | P1/P2/P3 list GBP, citations, AHLA/BIFMA directories, Reddit, guest posts, Wikidata. All still external/manual TODO. |
| Measurement wiring (analytics) | 🔴 Gap | Plausible is wired but dormant — `app/layout.js:84` only fires if `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env set. GSC + Bing verification token-gated (`app/layout.js:69-72`, `BING_VERIFICATION_TOKEN`), not granted. No live measurement loop. |
| Owner / resourcing per action | 🟡 Partial | Effort tags exist; no named owner or human-task budget (most P1/P2 need the client, not code). |

---

## Current-state gaps

The strategy *thinking* is excellent — among the best-documented plan sets I've audited. The gap is not "no plan"; it's that the plan is **frozen at the March/April pre-deploy snapshot** and the **measurement + off-site layers were never closed**. Specific, verified gaps:

1. **No live measurement loop (blocker for everything).** Plausible dormant (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` unset, `app/layout.js:84`). GSC + Bing verification token-gated and not granted. Without GSC, every KPI baseline in `10-SEO-STRATEGY.md` is a March estimate, and no plan can be re-prioritized on real query/impression data.

2. **Stale content calendar.** The 6-post calendar in `10-SEO-STRATEGY.md` is 5/6 shipped. No forward roadmap for the bonus clusters that have **no pillar content yet** — healthcare, education, multi-family, lobby/reception (clusters 9-12 in `keyword-map.md` point at product pages with thin copy, not real guides).

3. **Author E-E-A-T is a generic team, not a person.** `app/author/dmd-furnishing-editorial/page.js:45` = "DMD Furnishing Editorial Team" Person schema with no named individual, jobTitle, or credentials. Google/AI strongly prefer a named author with experience signals. The 4-9 plan flagged "Organization→Person" but it landed on a faceless team entity.

4. **Unverified geo coordinates.** `lib/metadata.js:162` still `42.0654, -71.2478` — the seo-maps audit flagged these as resolving to Mechanic Street, not 56 Leonard St. Never confirmed/fixed. Hurts local + map trust.

5. **Image-sitemap whitespace.** `public/DMD_Website.xml` still has ~1,917 lines with literal spaces / `%20` in image URLs — unencoded paths risk image-indexing loss. Logged as backlog in `SEO-SCOREBOARD.md`, never cleared.

6. **No competitive intelligence at all.** Zero competitor SERP/schema/backlink gap analysis. The plan optimizes in a vacuum — no read on what AHLA-directory peers or contract-furniture competitors already rank for.

7. **Off-site authority planned but 0% executed.** GBP, citations (Yelp/BBB/Bing Places/Houzz/Foxboro Chamber), AHLA/BIFMA directories, LinkedIn activity — all still external TODO. This is the single biggest ranking lever and it's untouched.

---

## Recommended 90-day plan

Phased to DMD's *actual* state (site deployed, on-page ~done, off-site + measurement open). "Owner-need" flags whether code or a human/client action is required.

### Phase 1 — Turn the lights on (Days 1-14)
| Phase | Action | Owner-need | Impact |
|---|---|---|---|
| 1 | Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` + deploy → live traffic data starts | Code (1 line) + deploy | 🔴 Unblocks all measurement |
| 1 | Grant + verify GSC and Bing (populate verification tokens), submit `sitemap.xml` | Client access + code | 🔴 Real baseline for ranks/impressions |
| 1 | Fix or confirm geo coords in `lib/metadata.js:162` against 56 Leonard St | Client confirm + code | 🟠 Local/map trust |
| 1 | Encode/clean ~1,917 space/`%20` image URLs in `DMD_Website.xml` | Code (script) | 🟠 Image indexing |

### Phase 2 — Authority + identity (Days 15-45)
| Phase | Action | Owner-need | Impact |
|---|---|---|---|
| 2 | Create Google Business Profile (FurnitureStore), photos, hours, NAP | Client (2-4 hrs) | 🔴 Highest local lever |
| 2 | Build 8 foundational citations (Yelp, BBB, Bing Places, Houzz, Foxboro Chamber, Manta, Apple Business, Yellow Pages) | Client (4-6 hrs) | 🟠 Entity validation |
| 2 | Replace "Editorial Team" with a named author + real bio/credentials (Person schema) | Client bio + code | 🟠 E-E-A-T + AI authorship |
| 2 | Register AHLA Allied + BIFMA supplier directories (also = backlinks) | Client | 🟠 Niche authority |

### Phase 3 — Re-baseline + content gaps (Days 46-90)
| Phase | Action | Owner-need | Impact |
|---|---|---|---|
| 3 | Re-baseline KPIs in `10-SEO-STRATEGY.md` from live GSC; re-prioritize keyword-map by real impressions | Analyst (Opus/SEO) | 🟠 Plan stops being a guess |
| 3 | Run one competitive pass (5 peers: their ranking keywords, schema, backlinks) — fills skill step-2 gap | Analyst + DataForSEO/manual | 🟠 Find real keyword gaps |
| 3 | Build 2-3 pillar guides for empty clusters 9-12 (healthcare, education, multi-family, lobby) | Content + code | 🟡 Topical breadth |
| 3 | Stand up a rolling content cadence (1-2 posts/mo) tied to live query gaps, replacing the stale 6-post calendar | Process | 🟡 Compounding |

---

## Score (plan-maturity 72/100)

| Dimension | Score | Note |
|---|---|---|
| Keyword strategy | 18/20 | 12-cluster map, keyword→URL, on-page targets. −2: no real volume/difficulty data. |
| Prioritization | 18/20 | P0-P3, impact/effort, 3-layer model — exemplary. |
| Measurable goals | 11/20 | KPIs + 3/6/12-mo goals exist but baselines stale and no live measurement loop. |
| Content roadmap | 10/20 | Pillars + calendar exist but stale (5/6 shipped) and no forward cadence. |
| Competitive + off-site | 7/15 | Off-site fully *planned*, 0% executed; competitive analysis entirely absent. |
| Maintenance / cadence | 8/5 → cap 8 | Iteration scoreboard + progress tracker are unusually disciplined (bonus, capped). |
| **Total** | **72/100** | Strong planning brain; weak on *live measurement* and *off-site execution*. |

A site this small with this much documented strategy is rare. The score is held back almost entirely by two things: nobody turned on measurement, and the off-site half of the plan was written but never worked.

## Top 3 actions

1. **Turn on measurement this week** — set the Plausible env var + get GSC/Bing verified and granted. Until live data flows, every priority call is a March guess.
2. **Create the Google Business Profile + build citations** — the highest-impact ranking lever in the entire plan set is the one with 0% execution.
3. **Re-baseline + add competitive analysis** — once GSC data exists, refresh the stale KPIs and do the missing 5-competitor pass so the keyword map reflects reality, not industry intuition.
