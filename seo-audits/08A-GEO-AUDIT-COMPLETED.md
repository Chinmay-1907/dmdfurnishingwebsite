# 08A GEO Audit — Completion Report

**Date:** 2026-03-25
**Scope:** Remaining GEO (Generative Engine Optimization) fixes from `08-GEO-AUDIT.md`
**Build Status:** Verified — `npx react-scripts build` passes cleanly

---

## Previously Completed (Not Redone)

| Item | Status | Completed In |
|------|--------|-------------|
| `llms.txt` created | Done | Phase 2 |
| FAQPage schema on ScheduleCall | Done | Phase 2 |
| Service schema (ItemList) on Services | Done | Phase 2 |
| WebSite + SearchAction in index.html | Done | Phase 2 |
| Organization schema with `sameAs` | Done | Phase 1 / Phase 2 |
| LocalBusiness schema | Done | Phase 1 |
| robots.txt AI crawler rules | Done | 03 |
| IndexNow setup | Done | 03 |
| Footer tagline fixed | Done | 04 |
| Product schema with offers | Done | 05 |
| BreadcrumbList on ProductDetail | Done | 05 |
| ProjectDetail H1 duplicate fix | Done | Previously fixed (uses h1 + h2s correctly) |
| About page stats section | Done | 04 |
| Products intro paragraph | Done | 04 |

---

## Fixes Implemented in This Pass

### 1. HowTo Schema on Services Process Steps
**File:** `src/components/Services.js`
- Added `HowToSchema` with `@type: "HowTo"` covering the 6-step process
- Wrapped Service ItemList + HowTo in a `@graph` array for combined schema output
- AI systems can now extract the structured process as a step-by-step guide

### 2. Answer-First Lead Paragraphs
**Files:** `src/components/Home.js`, `src/components/Services.js`, `src/components/AboutUs.js`

**Home.js "Who We Serve" intro:**
- Changed from generic "partners with owners..." to answer-first: "DMD Furnishing is a commercial furniture manufacturer based in Foxboro, Massachusetts, serving hotels, restaurants, corporate offices, educational facilities, and healthcare environments nationwide."

**Services.js hero paragraph:**
- Changed from generic "From early planning..." to answer-first: "DMD Furnishing provides end-to-end commercial furniture services — from design consultation and custom manufacturing to FF&E procurement, delivery, and installation — for hotels, restaurants, and corporate spaces nationwide."

**AboutUs.js hero paragraph:**
- Added entity-defining lead sentence: "DMD Furnishing is a commercial furniture manufacturer based in Foxboro, Massachusetts, providing custom FF&E solutions for hotels, restaurants, offices, and institutional spaces nationwide."

### 3. Noscript Content Enrichment for AI Crawlers
**File:** `public/index.html`
- Replaced empty `<noscript>` tag with full business content visible to non-JS crawlers
- Includes: company description, services list, markets served, 6-step process, industry glossary (FF&E, Casegoods, BOQ, HPL, Value Engineering), contact info, and navigation links
- This is the single highest-impact fix for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot) that cannot render JavaScript

### 4. Industry Glossary / Definition Blocks
**File:** `src/components/Services.js`
- Added "Key Commercial Furniture Terms" section with semantic `<dl>`/`<dt>`/`<dd>` markup
- Definitions for: FF&E, Casegoods, BOQ, HPL, Value Engineering
- Each definition is authoritative, specific, and includes quantifiable context where possible (e.g., "FF&E budgets typically represent 15-25% of total hotel construction costs")
- Structured for direct AI citation

### 5. llms.txt Expanded with Glossary and FAQs
**File:** `public/llms.txt`
- Added "Industry Glossary" section with definitions for FF&E, Casegoods, BOQ, HPL, Value Engineering
- Added "FAQs" section mirroring the top ScheduleCall FAQ content
- Makes the machine-readable guide comprehensive for AI systems that read llms.txt

---

## Projected GEO Score Impact

| Area | Before | After | Notes |
|------|--------|-------|-------|
| AI Crawler Accessibility | ~35 | ~50 | Noscript content gives non-JS crawlers real content |
| Passage-Level Citability | ~50 | ~70 | Answer-first formatting + glossary definitions |
| Entity Clarity | ~65 | ~70 | Answer-first paragraphs reinforce entity identity |
| Structured Data for AI | ~60 | ~72 | HowTo schema added to Services |
| Content Structure for AI | ~45 | ~65 | Semantic dl/dt/dd glossary, answer-first leads |
| Platform-Specific | ~25 | ~40 | Noscript + llms.txt + glossary help all platforms |

**Estimated Overall Score: ~60/100** (up from ~45 before this pass)

---

## Remaining Items (Deferred / Out of Scope)

| Item | Reason for Deferral |
|------|-------------------|
| Pre-rendering (react-snap / Netlify) | Deferred to separate task |
| Next.js migration | Phase 4 |
| Blog / case study content | Phase 3 content work |
| Real client testimonials | Requires client input |
| Press mentions / external authority | Off-site work |
| Google Business Profile link | Requires GBP setup |

---

## Files Modified

1. `src/components/Services.js` — HowTo schema, answer-first hero, glossary definitions
2. `src/components/Home.js` — Answer-first "Who We Serve" intro
3. `src/components/AboutUs.js` — Answer-first hero paragraph
4. `public/index.html` — Noscript content enrichment for AI crawlers
5. `public/llms.txt` — Glossary and FAQ sections added
