# Skill Audit 12 — seo-flow

> Framework and prompts © Daniel Agrici, CC BY 4.0 — github.com/AgriciDaniel/flow

**Skill purpose:** FLOW framework — evidence-led SEO operating loop for the AI-search era. Five stages: **F**ind demand → **L**everage off-site evidence → **O**ptimize owned assets for extraction/trust → **W**in (connect discovery to revenue) → **Local** (GBP / local pack). 41 stage-specific AI prompts. Treats organic rankings, AI citations, local pack, and sales evidence as one connected surface, not separate channels.

**Target:** DMD Furnishing — B2B hospitality/commercial FF&E manufacturer (lead-gen, not ecommerce; conversion = consultation request). Source: `C:\Users\chin\dmdfurnishingwebsite-fable` (branch `fable-dmd`). Live dev: http://localhost:3006. Prod: https://dmdfurnishing.com.

**Date:** 2026-06-10

**Status:** PARTIAL — Optimize stage is the most-mature on the whole site (8 build iterations, all SEO/A11y/BP at 100). Find and Win are done as plans/infrastructure but not measured. Leverage and the measurement loop are the real gaps: off-site authority is near-zero and no live data (GSC/GA4/analytics) closes the loop.

---

## Workflow stage board

The skill's stages map cleanly onto the brief's research→plan→build→optimize→measure→iterate loop:
Find ≈ research+plan · Leverage ≈ off-site build · Optimize ≈ on-site build · Win ≈ conversion · plus the cross-cutting Measure/iterate spine.

| Stage | Status | Evidence | Next step |
|---|---|---|---|
| **Find** (demand: keywords, gaps, SERP intent) | 🟠 partial | `SEO-GEO-Audit/keyword-map.md` — 12 clusters, pillar+supporting URLs, primary/secondary/semantic terms, target title+desc per cluster. Buyer language is strong (BIFMA, NFPA 701, FF&E vs OS&E). BUT volume/difficulty are explicitly "qualitative estimates, no paid API"; doc itself flags missing real numbers + competitor SERP analysis. | Run DataForSEO/Ahrefs against the 12 primary keywords to replace coarse 5-bucket guesses with real volume + difficulty; add SERP-intent check per cluster. |
| **Leverage** (off-site authority, backlinks) | 🔴 missing (analysis only) | `SEO-GEO-Audit/4-9-SEO/agents/seo-backlinks/audit.md` — scores backlink profile **18/100**, "minimal-to-no detectable external backlinks, no directory listings, no link-building infrastructure." Confidence LOW (no Ahrefs/SEMrush). This is a diagnosis, not work done. | Build off-site evidence: industry directories (hospitality FF&E, BIFMA, contract furniture), supplier listings, local citations (NAP), digital PR. This is the single weakest stage. |
| **Optimize** (owned assets: extraction + trust) | 🟢 done | Most-mature stage. `SEO-SCOREBOARD.md` — 8 build iterations, **SEO/A11y/Best-Practices = 100 on all 13 page types** (held I5→I8). Schema 72→92 (@id graph, honest hours, carousel ItemList, pruned self-serving Review/HowTo). On-page 72→88 (keyword-form titles per vertical). Topic-clusters 58→86 (guides mainEntity, place↔type↔product tier links). GEO/AI-visibility 80→88 (`public/llms.txt` + `llms-full.txt` populated, SSR'd answer panels, speakable, RSS feed). 10 ld+json blocks on homepage. | Close residual content-quality backlog: per-post OG images, DMD_Website.xml alt-quality rewrites (586-product XML), BlogPosting image arrays. Perf is at simulation floor (observed LCP 0.3–1.5s) — not a real gap. |
| **Win** (BOFU, conversion, revenue link) | 🟠 partial | Conversion path exists: `app/contact/page.js` has consultation/quote CTAs marked up as `ContactPage` + service schema ("Request a Project Consultation", scope/materials/budget). Form-first contact shipped (perf 66→96). BUT no BOFU page brief, no conversion-rate audit, no dual-surface scorecard artifact (the 3 Win prompts' outputs). No proof any traffic → qualified call is tracked. | Build a conversion/BOFU scorecard: define the consultation-request as a tracked event, instrument it (see Measure), then judge BOFU pages on lead quality not impressions. |
| **Local** (GBP, local pack, NAP) | 🟠 partial | On-site local is solid: `LocalBusiness` schema, NAP consistent (56 Leonard St, Foxboro MA / +1 617-223-7781), honest hours (weekend dropped). Scoreboard local-seo 45→70. BUT explicitly "GBP work out of code scope" — no Google Business Profile optimization, categories, services, or local citations done (the 11 local prompts are unapplied). | Apply the GBP prompts: categories, description, services. Build local citations. Needs Google Business Profile access (not checkable from source). |
| **Measure / iterate** (the FLOW spine: connect visibility → business indicators) | 🔴 missing (wired, not live) | This is the loop-breaker. `app/layout.js` — Plausible script is coded but gated behind `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var (not set → analytics never loads). `app/api/vitals/route.js` — accepts Web-Vitals beacons then **discards them** ("No storage yet... wire up real storage/analytics later"). Scoreboard analytics-wiring stuck **25→25, "blocked: needs analytics choice"**. GSC/GA4 MCP servers wired but "data unavailable this session, Google-side access propagating." All 8 iterations ran on code + crawl + Lighthouse only — zero real search/traffic data. | Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to turn on traffic data; wire the vitals sink to storage; grant + connect GSC/GA4. Without this, FLOW can't decide which stage is actually blocking revenue. |

---

## Findings

| Severity | Stage | Issue | Fix |
|---|---|---|---|
| 🔴 | Measure | No live data closes the loop. Plausible gated off (env var unset), vitals endpoint discards payloads, GSC/GA4 not connected. FLOW's "decide which surface changes the next business outcome" is impossible without measurement. | Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`; persist `/api/vitals`; finish GSC/GA4 access. Highest leverage — unblocks Find (real volume), Win (conversion tracking), and iteration. |
| 🔴 | Leverage | Backlink profile self-scored 18/100; no off-site authority, directories, or citations. Whole stage is diagnosis, no execution. AI engines corroborate brands off-site — this caps GEO/AI-citation upside too. | Start directory + citation + digital-PR build for hospitality/contract-furniture niche. |
| 🟠 | Find | Keyword map has no real volume/difficulty (qualitative buckets, no API) and no competitor SERP analysis — by the doc's own admission. | Run DataForSEO/Ahrefs on the 12 primary keywords; add per-cluster SERP-intent check. |
| 🟠 | Win | Conversion infrastructure exists but is unmeasured — no BOFU brief, no conversion-rate audit, no dual-surface scorecard. Can't prove traffic → qualified calls. | After Measure is live, define consultation-request as a tracked goal; build a BOFU/conversion scorecard. |
| 🟠 | Local | GBP entirely out of code scope; 11 local prompts unapplied (categories, description, services, citations). | Apply GBP prompts + build local citations (needs Google Business Profile access). |
| 🟢 | Optimize | Strongest stage — on-page, schema, clusters, GEO surface all built and verified. Only residual is content-quality backlog (OG images, XML alt rewrites). | Clear the named backlog; no structural gap. |

---

## Score

**Workflow-completeness: 58/100**

Reasoning: Optimize is genuinely excellent (~95) and Find/Local/Win are real-but-incomplete (plans and on-site infrastructure without the live data or off-site execution to validate them). Two of six stages — Leverage and Measure — are effectively at zero in practice, and Measure is the spine that lets the other five iterate. A site can't run the FLOW loop (decide the blocking stage from evidence, then rebuild) when it has no live search or traffic data and no off-site authority. Strong owned-asset half, missing connective + off-site half.

- Find 60 · Leverage 15 · Optimize 95 · Win 50 · Local 55 · Measure/iterate 20.

---

## Top 3 actions

1. **Turn the measurement loop on (🔴 Measure).** Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, give `/api/vitals` real storage, and finish GSC/GA4 access. This is the keystone — it unblocks real keyword volume (Find), conversion tracking (Win), and the iterate step the whole FLOW model depends on.
2. **Start off-site authority (🔴 Leverage).** Backlink profile is 18/100 with no link-building infrastructure. Begin with niche directories, supplier/industry listings, and consistent local citations — this also lifts the AI-citation ceiling on the already-good GEO work.
3. **Replace guessed keyword data with real numbers (🟠 Find).** Run DataForSEO/Ahrefs against the 12 primary keywords in `keyword-map.md` and add competitor SERP-intent checks, so on-page targeting is prioritized by demand, not estimates.
