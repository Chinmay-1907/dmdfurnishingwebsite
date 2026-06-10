# Skill Audit 21 — geo-report (consolidated GEO report)

**Date:** 2026-06-10
**Target:** DMD Furnishing — B2B commercial/hospitality FF&E (Furniture, Fixtures & Equipment) manufacturer
**Domain:** https://dmdfurnishing.com · audited live at http://localhost:3006 · source `C:\Users\chin\dmdfurnishingwebsite-fable` (branch `fable-dmd`)
**Deliverable:** This is a report-generation synthesis — it aggregates six already-completed GEO audits (agents 21–26) into one client-facing GEO Readiness report. No new crawl was performed.

---

## Executive summary

We analyzed DMD Furnishing's site (23 routes — homepage, products, 6 blog posts, 2 guides, author page — verified live on a server-side-rendered Next.js build) against how AI answer engines find, trust, extract, and cite content. DMD scores **78/100, placing it in the "Good" tier** — a genuinely strong on-page GEO foundation that beats almost every B2B manufacturer site we see. The single most important finding is positive: every page is fully server-rendered with rich structured data, dual `llms.txt` files, and all major AI crawlers explicitly allowed — so the plumbing AI engines read is already in place. The score is held back almost entirely by *unfinished connections*, not content gaps: search-engine verification tokens are unset, IndexNow is built but never triggered, the author and founder are not modeled as named people, the site's most-quoted statistics carry no sources, and there is no outside-the-site authority anchor (Wikidata, Reddit, YouTube). The top three priorities are: (1) set the Google and Bing verification tokens and wire IndexNow to deploy; (2) source the flagship "FF&E = 15–25% of build cost" statistic and add named author/founder Person entities; (3) create a Wikidata entry and one "how to choose an FF&E manufacturer" comparison page. Addressing the quick wins alone could lift the GEO score an estimated 6–10 points and unlock citation across Google AI Overviews, ChatGPT, Gemini, and Bing Copilot — the discovery channel projected to drive 25–40% of organic research in DMD's buyer category by end of 2026.

---

## Overall GEO Readiness Score: 78/100 — Good

| Component | Score | Weight | Weighted | Source audit |
|---|---|---|---|---|
| AI Platform Readiness | 68/100 | 25% | 17.0 | 24-geo-platform-analysis |
| Content Quality & E-E-A-T | 84/100 | 25% | 21.0 | 23-geo-content |
| Technical Foundation | 94/100 | 20% | 18.8 | 26-geo-technical |
| Schema & Structured Data | 66/100 | 15% | 9.9 | 25-geo-schema |
| Brand Authority & Entity Presence | 73/100 | 15% | 11.0 | 22-geo-ai-visibility + 21-seo-geo |
| **Overall** | | | **78/100** | |

**Reading the score:** "Good" means a solid foundation with clear, high-ROI opportunities. The technical and content layers are near best-in-class; the points lost are concentrated in two fixable buckets — *connection plumbing* (verification tokens, IndexNow, entity anchors) and *attribution* (sourced stats, named experts).

---

## AI Visibility Dashboard (per-platform readiness)

| AI Platform | Readiness | Key Gap | Priority Action |
|---|---|---|---|
| Google AI Overviews | 82/100 | GSC verification token unset | Create GSC property, set token, submit sitemap |
| Google Gemini | 72/100 | No YouTube / Wikidata in `sameAs` | Add Wikidata entry + brand video channel |
| Perplexity | 70/100 | Site is sole corroborating source | Seed off-site mentions (Reddit, industry forums) |
| ChatGPT / OAI-SearchBot | 62/100 | No Wikidata; rides unverified Bing index | Create Wikidata entry; verify Bing Webmaster |
| Bing Copilot | 52/100 | Bing token unset; IndexNow built but unwired | Verify Bing Webmaster; wire IndexNow to deploy |

These scores reflect how likely DMD's content is to be cited by each engine. The on-page foundation is excellent everywhere; every losing point is an unfinished connection (an env token unset, IndexNow not triggered, or a missing knowledge-base entity), not a content weakness. Bing Copilot is weakest — and because ChatGPT also reads the Bing index, that one gap drags two engines.

---

## Per-dimension scores + findings

### 1. Crawler access — 100/100 🟢 (best-in-class)

All 12+ priority AI crawlers reach the site. `public/robots.txt` sets `User-agent: *` → `Allow: /` / `Disallow: /api/` (correct — `/api/` holds OTP/consultation endpoints, not content), and explicitly allow-lists 9 AI bots: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, CCBot, anthropic-ai, cohere-ai. No `X-Robots-Tag: noindex` anywhere in `_headers` or `next.config.js`; no project middleware blocking crawlers. Full server-side rendering confirmed by `curl` (no JS execution): homepage 6,982 chars, product page 7,335 chars, blog 14,065 chars all present in raw HTML, `x-nextjs-prerender: 1`. **Keep as-is.** Minor: Applebot-Extended, Amazonbot, Bytespider, FacebookBot are allowed only via `*` — add explicit blocks for intent parity.

### 2. llms.txt — 100/100 🟢

`/llms.txt` (7,031 B), `/.well-known/llms.txt` (byte-identical mirror confirmed live), and `/llms-full.txt` (12,939 B) all return HTTP 200 as `text/plain`. Content is genuinely citable, not boilerplate: opens with a clean "DMD Furnishing is a B2B commercial furniture manufacturer…" definition; includes an industry glossary (FF&E, Casegoods, BOQ, HPL, Value Engineering), FAQs, per-category product specs, and links back to canonical URLs. **Keep.** One drift to fix: `llms.txt` lists only LinkedIn while schema lists LinkedIn + Facebook + Instagram, and omits `foundingDate` — mirror all facts so the two AI-facing sources agree.

### 3. Content / citability — 84/100 🟠

Textbook AI-liftable structure across all 8 articles: each opens with an `AnswerCallout` plus a `data-speakable="lede"` one-paragraph definition, then question-format H2s with anchor IDs (`#full-definition`, `#ffe-vs-ose`). FAQ blocks render as both visible Q&A and `FAQPage` JSON-LD. The author page carries a rare, real **published fact-check / corrections policy** — the strongest single trust asset on the site. Freshness is solid (visible + schema dates, all 2026). **The one real weakness:** the flagship "FF&E = 15–25% of construction cost" stat — the most-quotable number on the site, present in both prose and FAQ schema — carries **no source**, so an AI will lift it and attribute it to DMD with no authority behind it. Restaurant dimensional specs are similarly bare, and three posts have only one outbound citation each.

### 4. Entity schema / structured data — 66/100 🟠 (lowest dimension)

The `@id` entity graph is genuinely connected — `#organization`, `#localbusiness` (FurnitureStore + Manufacturer), and `#website` form one traversable web, fully server-rendered, with an 8-item `knowsAbout` topical fingerprint and 3 live-resolving `sameAs` social links. Above typical SMB sites. **Held back by four issues:** (a) 🔴 the author node is typed `Organization` but referenced everywhere as `#person` / `author` — an AI sees "an article authored by an Organization"; (b) 🔴 no `founder` Person entity despite `foundingDate: 2021` — AI cannot attach a named human to the brand; (c) 🟠 blog `publisher` is an inline duplicate Organization instead of `{@id: …#organization}`, creating phantom duplicate nodes; (d) 🟠 `sameAs` has zero knowledge-graph anchors (no Wikidata, no Google KG, no industry directory) — the single highest-value GEO signal, under-used.

### 5. E-E-A-T (Experience · Expertise · Authoritativeness · Trust) — 84/100 🟠

Scored Experience 20/25 · Expertise 20/25 · Authoritativeness 21/25 · Trust 23/25. Trust is excellent (real author bio + published fact-check policy + consistent NAP). Qualitative claims are well-anchored (AIA, NFPA, ADA, AHLA, USDA Forest Products Lab, AWI all cited). The ceiling on Expertise is the **collective team byline** — author resolves to "DMD Furnishing Editorial Team" with zero `"@type":"Person"` anywhere; AI engines weight named, credentialed individuals higher. Authoritativeness is capped by the bare statistics (dimension 3) and thin outbound sourcing on three posts.

### 6. Platform readiness — 68/100 🟠

Per-platform plumbing each engine reads before citing. Google AI Overviews is strongest (82 — deep schema + SSR + freshness; only GSC verification missing). Weakest is Bing Copilot (52): the `msvalidate.01` Bing token is env-gated and unset (🔴 — blocks the index both Bing *and* ChatGPT read), and the IndexNow script (`scripts/submit-indexnow.js`, key pair present and correct) is **not wired** to any build/deploy hook, so changed URLs are never auto-pushed (🔴). Google `GSC_VERIFICATION_TOKEN` is likewise unset (🟠). Code already conditionally renders both meta tags — they just need real tokens.

### Technical foundation — 94/100 🟢 (reference-grade)

Full SSR on every page type (server components everywhere; only `error.js`/`not-found.js` are client). Best-in-class security headers (HSTS preload, nosniff, SAMEORIGIN, strict CSP, no `unsafe-eval`). Self-referencing absolute canonicals, no accidental `noindex`, `metadataBase` set. Fast responses (0.01–0.57s), gzip on, `s-maxage` caching, `next/image` (AVIF/WebP, dimensioned), `next/font` self-hosted with a documented CLS fix. Only gaps: field Core Web Vitals need CrUX/PageSpeed confirmation post-deploy, and the same GSC/Bing verification tokens are unset.

### Brand authority / off-site presence — partial (needs off-page work) 🟡

On-site entity consistency is strong (name identical across llms.txt, schema, meta). Confirmed presence: LinkedIn `/company/dmd-usaa/`, Facebook, Instagram. **Missing the strongest AI-citation predictors** — no Wikidata/Wikipedia entity, no YouTube channel, no Reddit/community footprint. These are off-page and not buildable in code, but they are the gap that most limits "best hospitality FF&E manufacturer" citation. Not measurable from source — needs Wikipedia API + web checks.

---

## Prioritized action list

### P0 — Quick wins (this week · high impact, < 4 hrs each)

| # | Action | Impact | Effort | Platforms |
|---|---|---|---|---|
| 1 | Set `GSC_VERIFICATION_TOKEN` + `BING_VERIFICATION_TOKEN` env vars and create both webmaster properties (meta tags already wired conditionally) | High | 1–2 hrs | AIO, Gemini, ChatGPT, Copilot |
| 2 | Wire IndexNow to deploy — add `submit-indexnow.js` to a `postbuild` script or Netlify deploy-succeeded hook (script is done, just never called) | High | 1 hr | Bing Copilot, ChatGPT |
| 3 | Source the flagship "FF&E = 15–25% of build cost" + "10–15% contingency" stats inline (HVS/ISHC/AHLA) or reword as stated experience | High | 1–2 hrs | All engines |
| 4 | Fix author entity: change `#person` `@type` to `Person`, add `worksFor → #organization` — repairs author understanding across all 6 blog posts at once | High | 1 hr | ChatGPT, AIO, Perplexity |
| 5 | Add `description` + `alternateName: ["DMD","DMD USA"]` to Organization/FurnitureStore schema (copy llms.txt About verbatim) | Medium | 30 min | All engines |
| 6 | Add explicit robots.txt `Allow: /` for Applebot-Extended, Amazonbot, Bytespider, FacebookBot | Low | 15 min | Apple, Amazon, Meta |

### P1 — Medium-term (this month · 1–5 days)

| # | Action | Impact | Effort | Platforms |
|---|---|---|---|---|
| 1 | Add a named `founder` Person (+ LinkedIn `sameAs`) to Organization schema; add 1–2 named expert reviewers as Person nodes on the author page | High | 1–2 days | ChatGPT, Gemini, AIO |
| 2 | De-duplicate schema: replace inline blog `publisher` with `{@id: …#organization}` in all 6 posts; unify the split logo URL; mirror all `sameAs` + `foundingDate` into llms.txt | Medium | 1 day | All engines |
| 3 | Source the restaurant dimensional specs and raise outbound citations to 2+ on the three thin posts (hotel-guestroom-checklist, restaurant-seating-guide, ffe-procurement-timeline) | Medium | 1–2 days | All engines |
| 4 | Ship one "how to choose an FF&E manufacturer" comparison-table page to win the "best hospitality FF&E manufacturer" answer slot | High | 2 days | ChatGPT, Perplexity, AIO |
| 5 | Add short FAQ block + 40–60-word definitional intro to each `/products/[place]` category page so product URLs become independently citable | Medium | 2–3 days | All engines |
| 6 | Confirm field Core Web Vitals via CrUX/PageSpeed on the live domain post-deploy | Low | 0.5 day | AIO, Gemini |

### P2 — Strategic (this quarter · off-page, ongoing)

| # | Action | Impact | Platforms |
|---|---|---|---|
| 1 | Create a Wikidata entry for DMD Furnishing and add its URL to `organizationSchema.sameAs` — the single highest-leverage knowledge-base anchor the site lacks | High | ChatGPT, Gemini |
| 2 | Earn off-site corroboration: ISHC/BDNY exhibitor listings, ThomasNet/Houzz/Hospitality Design directory profiles, trade-press mentions | High | Perplexity, ChatGPT |
| 3 | Seed factual mentions on Reddit / industry forums (Perplexity weights community validation most) | Medium | Perplexity |
| 4 | Launch a brand YouTube channel and add it to `sameAs` (Gemini leans on Google-owned video) | Medium | Gemini |
| 5 | Track LLM-mention frequency via DataForSEO `ai_opt_llm_ment_search` to measure citation lift over time | Medium | All engines |

### Estimated impact

Based on industry benchmarks and the specific gaps above:
- **P0 quick wins alone** could lift the GEO score an estimated **6–10 points** (toward the low-80s) — they unlock four engines via verification + IndexNow and remove the highest-risk unsourced-stat attribution.
- **Full implementation** (P0–P2) could move the score to approximately **90/100**, with the schema dimension rising from 66 toward the mid-80s and platform readiness from 68 into the 80s.
- Conservatively, improved AI visibility in a category where buyers increasingly research procurement decisions through AI assistants represents meaningful additional qualified consultation requests — the highest-ROI lever being the Bing/ChatGPT verification + IndexNow pair, since it costs hours and unlocks two engines.

---

## Sources (audit files synthesized)

| File | Lens | Score contributed |
|---|---|---|
| `audit-fable/agents/21-seo-geo.md` | Overall GEO / AI-citability scorecard | 87 (corroborates brand-authority + content) |
| `audit-fable/agents/22-geo-ai-visibility.md` | Crawler access + llms.txt + entity consistency | 88 → brand authority component (73) |
| `audit-fable/agents/23-geo-content.md` | E-E-A-T / content citability | 84 → content component |
| `audit-fable/agents/24-geo-platform-analysis.md` | Per-platform AI readiness | 68 → platform component + dashboard |
| `audit-fable/agents/25-geo-schema.md` | Entity schema graph | 66 → schema component |
| `audit-fable/agents/26-geo-technical.md` | Technical SSR / crawler foundations | 94 → technical component |
| `audit-fable/_site-snapshot.md` | Shared site grounding | identity, routes, surface facts |

> Note: skill-level GEO files (18/19/20) referenced in the brief do not exist — the `audit-fable/skills/` directory ends at `12-seo-flow.md`. The six agent files 21–26 are the complete GEO findings source and were synthesized in full.

---

## Glossary

| Term | Meaning |
|---|---|
| GEO | Generative Engine Optimization — optimizing content to be cited by AI answer engines |
| AIO | AI Overviews — Google's AI-generated answer box at the top of search results |
| E-E-A-T | Experience, Expertise, Authoritativeness, Trustworthiness — Google's content-quality framework |
| SSR | Server-Side Rendering — HTML built on the server so crawlers read content without running JavaScript |
| llms.txt | Proposed file (like robots.txt) telling AI systems what a site is about and which pages matter |
| sameAs | Schema.org property linking an entity to its profiles on other authoritative platforms |
| IndexNow | Protocol that instantly notifies Bing of changed URLs |
| FF&E | Furniture, Fixtures & Equipment — DMD's core product category |
