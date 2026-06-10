# Audit 21 — seo-geo (agent)

**Lens:** Generative Engine Optimization (AI answer visibility — Google AI Overviews, ChatGPT, Perplexity, Bing Copilot)
**Target:** DMD Furnishing — B2B hospitality FF&E manufacturer · source `C:\Users\chin\dmdfurnishingwebsite-fable` · live `http://localhost:3006`
**Date:** 2026-06-10
**Status:** Complete (live HTML + source verified; live LLM-citation tracking needs DataForSEO/manual prompt-testing — see gap note)

## What this lens audits

Whether AI answer engines can **find, trust, extract, and cite** DMD when a user asks things like "best hospitality FF&E manufacturer," "what is FF&E," or "how long does FF&E procurement take." Five signals: AI-crawler access, `llms.txt` quality, passage-level citability (direct extractable answers), entity clarity (who/what/where is DMD), and authority/E-E-A-T (named authorship, dates, sourced stats, sameAs).

## Method

Read `public/llms.txt`, `public/llms-full.txt`, `public/robots.txt` at source. Verified live serving of all three plus `/.well-known/llms.txt` (curl). Parsed live JSON-LD `@type` counts on homepage, blog post, and author page. Pulled the H2 heading structure and the first extractable paragraph after a definition heading on `/blog/what-is-ffe-hospitality`. Checked entity enrichment (`sameAs`, `knowsAbout`, `foundingDate`, author `@id` resolution) and date freshness. Spot-checked `/products/hotel`. Did not crawl all 23 routes.

## Findings

| Severity | Asset / Page | Issue | Fix |
|---|---|---|---|
| 🟢 | `robots.txt` (live 200) | All 4 priority AI crawlers explicitly allow-listed (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) + Google-Extended, ChatGPT-User, CCBot, anthropic-ai, cohere-ai. `/api/` disallowed. | Keep. Best-in-class. |
| 🟢 | `llms.txt` + `llms-full.txt` | Both live 200 as `text/plain`, AND `/.well-known/llms.txt` resolves 200. Structured: About, Contact, Services, Markets, glossary with definitions, FAQs, per-category product copy with real specs. | Keep. Genuinely citable, not boilerplate. |
| 🟢 | Homepage JSON-LD | Rich entity graph: `Organization` + `FurnitureStore` w/ `GeoCoordinates`, `PostalAddress`, `OpeningHoursSpecification`, `foundingDate:2021`, `numberOfEmployees`, 8-item `knowsAbout`, `sameAs` (LinkedIn + Facebook + Instagram), `FAQPage` (7 Q&A), `SpeakableSpecification`, `OfferCatalog`. | Keep. Entity clarity (who/what/where) is fully machine-readable. |
| 🟢 | `/blog/what-is-ffe-hospitality` | Question-format H2s with anchor IDs (`#full-definition`, `#ffe-vs-ose`); first sentence after the definition H2 is a clean self-contained answer ("FF&E stands for Furniture, Fixtures & Equipment: the movable, non-structural items..."). `BlogPosting` + `BreadcrumbList` + `FAQPage` schema, `datePublished` + `dateModified`. | Keep — textbook extractable-answer format. |
| 🟠 | Author entity (`/author/dmd-furnishing-editorial`) | Author resolves to an **Organization** ("DMD Furnishing Editorial Team"), not a named `Person` — there is **zero `"@type":"Person"`** anywhere on author or blog pages. AI engines weight named, credentialed individual authors higher for E-E-A-T trust. Collective-team authorship is defensible but caps the authority signal. | Add 1–2 named experts (e.g. a head of manufacturing / procurement lead) as `Person` nodes with `jobTitle`, `knowsAbout`, and `sameAs` LinkedIn, even if content stays team-reviewed. |
| 🟠 | Sourced statistics | Strong stats exist (FF&E = 15–25% of hotel build cost; 16–24wk procurement; 7–10yr renovation cycle) but most carry **no inline citation**. Only `what-is-ffe` links AHLA; `hpl-veneer` cites NEMA LD 3. AI engines preferentially cite passages with attributed sources. | Add a source citation (AHLA, ISHC, brand standard docs, NEMA) next to each headline statistic across blog + guides. |
| 🟡 | Comparison / listicle content | Has true comparison assets (`restaurant-seating-guide` booth vs chair vs stool; `hpl-veneer-solid-wood` 3-way) — the format AI engines cite for "best X" / "X vs Y." But **no head-to-head "best hospitality FF&E manufacturer" or "DMD vs [competitor]" listicle** and no comparison **table** markup. | Add one comparison-table page (e.g. "How to choose an FF&E manufacturer" with criteria rows) — directly targets the "best FF&E manufacturer" query class. |
| 🟡 | `/products/hotel` | Product pages are catalog/filter UIs ("Filters," "Product results") with thin prose ("What We Build It From," "Need help selecting..."). Live HTML is SSR (good — crawlable), but per-page extractable Q&A density is low vs blog/guides. | Add a short FAQ block + a 40–60-word definitional intro per category page so product URLs become independently citable. |
| 🟡 | `dateModified` freshness | Author profile `dateModified:2026-06-10` (today) but blog `dateModified` is `2026-04-01` — flagship "what is FF&E" answer is 2+ months stale relative to today. Freshness is a soft AI-citation signal. | Refresh `dateModified` on core answer pages when content is verified current; avoid faking it. |
| 🟡 | Off-site brand mentions (gap — needs external data) | Lens correlation data: YouTube mentions (~0.74) and Reddit/Wikipedia presence are the **strongest** AI-citation predictors. `sameAs` covers LinkedIn/FB/IG only — **no YouTube, no Wikipedia/Wikidata entity, no Reddit footprint** detectable from source. Not fixable on-site. | Off-page play: seed a Wikidata entity, get listed in trade directories (ISHC, BDNY exhibitor lists), pursue YouTube/podcast mentions. Track via DataForSEO `ai_opt_llm_ment_search`. |

## AI-citability scorecard (signal → present?)

| Signal | Present? | Evidence |
|---|---|---|
| AI crawlers allow-listed (GPTBot/ClaudeBot/PerplexityBot/OAI-SearchBot) | ✅ Yes | `robots.txt` lines 11–35, live 200 |
| `llms.txt` present, structured, factual | ✅ Yes | 7 KB, glossary + FAQs + specs; live 200 |
| `llms-full.txt` full-content mirror | ✅ Yes | 13 KB; live 200 |
| `/.well-known/llms.txt` | ✅ Yes | live 200 |
| Entity clarity — who/what/where (Org + Local schema) | ✅ Yes | `Organization`+`FurnitureStore`+`GeoCoordinates`+`PostalAddress`, `foundingDate`, `knowsAbout` |
| `sameAs` social/entity links | 🟡 Partial | LinkedIn + FB + IG only; no YouTube/Wikidata |
| Direct extractable answers (first 40–60 words) | ✅ Yes | definition leads with clean self-contained answer |
| Question-format H2/H3 headings | ✅ Yes | `#full-definition`, `#ffe-vs-ose`, etc. |
| FAQ schema | ✅ Yes | `FAQPage` 7 Q&A homepage; on blog too |
| Speakable schema | ✅ Yes | `SpeakableSpecification` present |
| Definitions / glossary (extractable) | ✅ Yes | `llms.txt` glossary + blog definition blocks |
| Statistics **with source attribution** | 🟡 Partial | stats present; most lack inline citation |
| Comparison / "vs" content | 🟡 Partial | 2 comparison posts; no manufacturer-choice listicle/table |
| Named individual author (E-E-A-T) | ❌ No | author is Org-typed team; zero `Person` entity |
| `datePublished` + `dateModified` | ✅ Yes | present; some pages stale (Apr 1) |
| SSR / crawlable without JS | ✅ Yes | Next.js SSR returns full HTML + JSON-LD |
| Off-site brand mentions (YouTube/Reddit/Wikipedia) | ❌ No | none detectable; needs off-page work |

## Score (87/100)

Top-tier on-site GEO foundation — among the most AI-ready B2B manufacturer sites you'll see. Crawler access, dual `llms.txt`, entity schema, extractable answers, and question-headings are all fully present and live-verified. Points off for: no named-person author (−4), unsourced statistics (−4), no manufacturer-comparison/table asset for "best FF&E" queries (−3), and zero off-site authority signals (−2, partly off-page). Citability for "what is FF&E" / "FF&E procurement timeline" is already strong; "best hospitality FF&E manufacturer" is the weakest query class because it needs comparison content + off-site mentions.

## Top 3 actions

1. **Add named expert authors as `Person` schema** (jobTitle + knowsAbout + LinkedIn `sameAs`) on the author page, even with team-reviewed content — biggest single E-E-A-T lift for AI trust.
2. **Cite a source next to every headline statistic** across blog + guides (AHLA, ISHC, NEMA, brand standards) — turns already-good passages into preferentially-cited ones.
3. **Ship one "how to choose an FF&E manufacturer" comparison-table page** to directly win the "best hospitality FF&E manufacturer" answer slot, then chase off-site mentions (Wikidata entity, trade directories, YouTube) tracked via DataForSEO LLM-mention search.
