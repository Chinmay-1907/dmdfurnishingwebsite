# DMD Furnishing - SEO & GEO Strategic Plan

**Date:** 2026-03-25
**Business:** B2B Commercial Furniture Manufacturer (Hospitality FF&E)
**Location:** Foxboro, MA | Nationwide service
**Current Score:** 28/100 | **Target:** 85-95/100

---

## Strategic Overview

### The Problem
DMD Furnishing has solid content, good product data (475+ items), and proper industry terminology — but **zero SEO visibility** because the React CRA architecture serves empty HTML to all crawlers. The site is essentially invisible to Google's first-pass indexing, Bing, and all AI search systems.

### The Solution (4 Phases, 35 Days)
1. **Quick Wins** (Days 1-2): Fix data correctness — broken refs, duplicates, missing tags
2. **Foundation** (Days 3-7): Enable pre-rendering, fix sitemap, enrich schema, add security
3. **Content** (Days 8-21): Build E-E-A-T signals, launch blog, improve AI citability
4. **Migration** (Days 22-35): Complete Next.js migration for permanent architectural fix

---

## KPI Targets

| Metric | Baseline (Now) | Phase 1 (Day 2) | Phase 2 (Day 7) | Phase 3 (Day 21) | Phase 4 (Day 35) |
|--------|---------------|-----------------|-----------------|------------------|------------------|
| SEO Health Score | 28/100 | 50-55 | 65-75 | 78-85 | 85-95 |
| Pages Indexed (GSC) | ~5-10 | ~10-20 | 50-100 | 200+ | 400+ |
| LCP (seconds) | 3-5s | 3-5s | 2.5-3.5s | 2.5-3.5s | <2.5s |
| CLS | 0.15-0.25 | 0.10-0.15 | 0.05-0.10 | 0.05-0.10 | <0.1 |
| Schema Errors | 5+ | 0 | 0 | 0 | 0 |
| AI Citation Score | 29/100 | 35/100 | 55/100 | 70/100 | 80+/100 |
| E-E-A-T Auth. Score | 12/100 | 12/100 | 15/100 | 45+/100 | 50+/100 |
| Security Headers | F | F | A | A | A+ |

---

## Competitive Positioning

### Target Keywords (Primary)

| Keyword | Search Intent | Current Ranking | Target |
|---------|-------------|-----------------|--------|
| hospitality furniture manufacturer | Commercial | Not ranking | Top 20 (6 mo) |
| custom hotel furniture | Commercial | Not ranking | Top 20 (6 mo) |
| FF&E solutions | Commercial | Not ranking | Top 30 (6 mo) |
| commercial furniture manufacturer MA | Local + Commercial | Not ranking | Top 10 (3 mo) |
| hotel guest room furniture | Commercial | Not ranking | Top 30 (6 mo) |
| restaurant furniture manufacturer | Commercial | Not ranking | Top 30 (6 mo) |

### Target Keywords (Long-Tail / AI Citation)

| Keyword | Content Type | Priority |
|---------|-------------|----------|
| what is FF&E in hospitality | Glossary page | High (AI citability) |
| hotel furniture procurement process | Blog / Guide | High |
| custom vs catalog hotel furniture | Comparison content | Medium |
| hospitality furniture specifications | Technical guide | Medium |
| hotel renovation furniture budget | Blog | Medium |

---

## Content Strategy

### Content Pillars

1. **Product Expertise** — Product pages, specification guides, material guides
2. **Project Showcase** — Case studies with measurable outcomes, before/after
3. **Industry Knowledge** — FF&E guides, procurement advice, specification standards
4. **Process Transparency** — Manufacturing process, timeline expectations, value engineering

### Blog Calendar (First 3 Months)

| Week | Article | Target Keyword | Type |
|------|---------|---------------|------|
| 1 | The Complete Guide to Hotel FF&E Procurement | hotel FF&E procurement | Pillar |
| 3 | How to Choose a Commercial Furniture Manufacturer | commercial furniture manufacturer | Comparison |
| 5 | Custom vs. Catalog Furniture: A Cost-Benefit Analysis | custom vs catalog furniture | Comparison |
| 7 | Understanding BIFMA Standards for Hospitality Furniture | BIFMA hospitality furniture | Technical |
| 9 | Franchise Renovation: Balancing Brand Standards with Budget | franchise renovation furniture | Niche |
| 11 | What is FF&E? Complete Glossary for Hotel Owners | what is FF&E | Glossary (AI) |

### E-E-A-T Building Plan

| Signal | Action | Timeline |
|--------|--------|----------|
| Experience | Add detailed case studies with metrics | Phase 3 |
| Experience | Add before/after project comparisons | Phase 3 |
| Expertise | Launch blog with technical content | Phase 3 |
| Expertise | Add specification guides per category | Phase 3 |
| Authority | Create team page with founder bio | Phase 3 |
| Authority | Add industry certifications (BIFMA, etc.) | Phase 3 |
| Authority | Add industry association memberships | Phase 3 |
| Trust | Replace placeholder testimonials with real ones | Phase 3 |
| Trust | Add client logo wall | Phase 3 |
| Trust | Set up Google Business Profile | Phase 3 |

---

## GEO (AI Search) Strategy

### Current State
- AI Citation Readiness: 29/100
- All content invisible to AI crawlers (JS rendering blocker)
- No `llms.txt`
- ScheduleCall FAQ is highest-value citable asset (but invisible + no schema)

### Target State
- AI Citation Readiness: 80+/100
- All content pre-rendered and visible to GPTBot, ClaudeBot, PerplexityBot
- `llms.txt` live and accurate
- FAQPage schema triggering rich results
- Answer-first content formatting across all pages
- Definition/glossary content for industry terms

### GEO Action Sequence
1. **Phase 1:** Inline static Organization schema in `index.html` (visible without JS)
2. **Phase 2:** Enable pre-rendering (all content visible to AI crawlers)
3. **Phase 2:** Create `llms.txt`, add FAQPage schema
4. **Phase 3:** Create glossary content, rewrite in answer-first format
5. **Phase 4:** Server-rendered everything via Next.js (permanent fix)

---

## Technical Architecture Roadmap

### Current Architecture
```
User Request → Netlify CDN → index.html (empty shell)
                           → JS bundle loads
                           → React renders content
                           → SEO.js injects meta tags via useEffect
                           → seo.js injects schema via DOM manipulation
```

### Phase 2 Architecture (Bridge)
```
User Request → Netlify CDN → Pre-rendered HTML (react-snap)
                           → Contains meta tags, schema, content
                           → JS bundle hydrates for interactivity
```

### Phase 4 Architecture (Target)
```
User Request → Netlify/Vercel Edge → Next.js SSG/SSR
                                   → Full HTML with meta, schema, content
                                   → Optimized images (WebP/AVIF)
                                   → Minimal client JS (Server Components)
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| `react-snap` fails on dynamic routes | Test with subset; fallback to Netlify prerendering |
| Next.js migration takes >12 days | Phase 2 pre-rendering provides interim coverage |
| Placeholder testimonials flagged by Google | Prioritize real testimonial collection early in Phase 3 |
| URL typo fixes cause broken links | Set up 301 redirects from old URLs before fixing |
| Blog content cannibalizes existing pages | Map target keywords per page to avoid overlap |

---

## Success Criteria

### 3-Month Goals
- 200+ pages indexed in Google Search Console
- At least 1 FAQ rich result appearing
- Core Web Vitals passing on all page types
- 3+ blog posts published and indexed
- Real testimonials from 3+ clients
- Google Business Profile live

### 6-Month Goals
- Top 20 ranking for "hospitality furniture manufacturer"
- Top 10 for "commercial furniture manufacturer MA"
- 10+ blog posts driving organic traffic
- AI citation appearances for "FF&E" related queries
- Domain authority measurably increasing

### 12-Month Goals
- 50+ keywords ranking in top 30
- Blog driving 30%+ of organic traffic
- Multiple FAQ/Product rich results in search
- Cited by ChatGPT/Perplexity for hospitality furniture queries
- E-E-A-T signals matching or exceeding key competitors

---

*Strategic plan based on 9 comprehensive SEO audits. Implementation plan in `ethereal-pondering-elephant.md`.*
