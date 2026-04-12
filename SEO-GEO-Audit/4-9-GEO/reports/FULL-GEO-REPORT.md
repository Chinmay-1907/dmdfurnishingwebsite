# Full GEO Audit Report: dmdfurnishing.com

**Date:** 2026-04-09
**Platform:** Next.js 15 on Netlify | **Stack:** App Router, React Server Components, SSG
**Agents:** 5 GEO audits + 1 SEO-GEO bridge audit completed
**Production:** https://dmdfurnishing.com | **Staging:** https://dmdredesign.netlify.app

---

## Executive Summary

DMD Furnishing has one of the strongest technical GEO foundations audited for a B2B manufacturer: full server-side rendering, comprehensive JSON-LD schema (15 types), explicit AI crawler allowances for all major bots, an excellent llms.txt file (82/100), and SpeakableSpecification markup on the homepage. However, this technical excellence exists in a near-total authority vacuum. Zero Wikipedia/Wikidata presence, zero Reddit mentions, no YouTube channel, a broken LinkedIn company page (404), zero backlinks, and the severe "DMD" brand collision with Duchenne Muscular Dystrophy mean that AI platforms have virtually no external signals to validate this entity or cite its content. The gap between technical readiness (88/100) and brand authority (8/100) is the defining challenge.

---

## Overall GEO Score: 52/100

---

## Score Breakdown

| Category | Raw Score | Weight | Weighted | Key Agent(s) |
|----------|-----------|--------|----------|--------------|
| AI Crawler Access | 100 | 20% | 20.0 | geo-technical, geo-ai-visibility |
| Content Citability | 58 | 25% | 14.5 | geo-content, geo-ai-visibility |
| Platform Readiness | 34.6 | 20% | 6.9 | geo-platform-analysis |
| Entity/Schema | 56 | 15% | 8.4 | geo-schema |
| Technical GEO | 88 | 10% | 8.8 | geo-technical |
| Brand Authority | 8 | 10% | 0.8 | geo-ai-visibility |
| **Total** | | **100%** | **59.4** | |
| **Authority Penalty** | No external validation of entity | | **-7.4** | Cross-agent finding |
| **Final Score** | | | **52/100** | |

The authority penalty reflects that strong on-site GEO signals are significantly devalued when AI platforms cannot corroborate the entity through external sources.

---

## Platform Readiness

| Platform | Score | Grade | Primary Blocker |
|----------|-------|-------|-----------------|
| Google AI Overviews | 44 | D+ | Zero backlinks, no GBP, no Knowledge Panel |
| Google Gemini | 35 | D | No GBP, no YouTube, no Knowledge Panel |
| Bing Copilot | 34 | D | No Bing index presence, LinkedIn 404 |
| ChatGPT Web Search | 32 | D | No Wikipedia/Wikidata, LinkedIn 404 |
| Perplexity AI | 28 | F | Zero community mentions (Reddit, forums, Quora) |
| **Overall Average** | **34.6** | **D** | **Zero off-site authority across all platforms** |

### Platform-Specific Insights

**Google AI Overviews (44/100):** Content structure is good -- question-based H2s in blog posts match AIO extraction patterns, and FAQPage schema on about/services pages feeds directly into AIO. However, AIO heavily weights organic ranking signals. Without backlinks and organic rankings, content cannot be eligible for AIO citation. *(geo-platform-analysis)*

**Google Gemini (35/100):** Gemini relies heavily on Google ecosystem signals: GBP for local queries, YouTube for visual products, and Knowledge Graph for entity recognition. DMD has zero presence in any of these. The rich schema markup (30/100 Knowledge Graph score) is the strongest signal but cannot compensate for missing ecosystem footprint. *(geo-platform-analysis)*

**Bing Copilot (34/100):** Bing powers ChatGPT web search. No Bing Webmaster Tools verification, no IndexNow implementation, and the LinkedIn 404 (Bing uses LinkedIn as primary B2B entity source) create compounding gaps. Content quality scores reasonably (50/100) due to professional tone and structured FAQ answers. *(geo-platform-analysis)*

**ChatGPT Web Search (32/100):** Entity recognition is the primary bottleneck (22/100). No Wikipedia article, no Wikidata entry, broken LinkedIn sameAs link. ChatGPT cannot confidently identify "DMD Furnishing" as a known entity. Content preferences score better (45/100) due to authoritative declarative writing style and FAQ structures. *(geo-platform-analysis)*

**Perplexity AI (28/100):** Community validation is the weakest link (5/100). Zero Reddit mentions, zero forum presence, zero Quora answers. Perplexity heavily weights community signals and has no discovery path to DMD Furnishing's content (zero external links pointing to the site). Source directness scores moderately (52/100) because DMD writes original first-party content. *(geo-platform-analysis)*

---

## Top 5 Critical GEO Issues

### 1. Zero Brand Authority Across All AI Training Sources (geo-ai-visibility: CRITICAL)
- **Wikipedia:** Not present. Search returns only Duchenne Muscular Dystrophy, dental degrees, and Thai entertainment.
- **Reddit:** Zero mentions of "DMD Furnishing" or "dmdfurnishing.com".
- **YouTube:** No channel, no videos about DMD Furnishing.
- **LinkedIn:** Company page returns 404.
- **Impact:** AI models have no external corroboration that DMD Furnishing exists as a legitimate entity. This is the single biggest blocker for AI search citation.
- **Fix:** Create LinkedIn company page, YouTube channel, Wikidata entry. Begin Reddit participation. Build backlinks from trade publications.

### 2. Broken Entity Graph from Dead sameAs Links (geo-schema: CRITICAL)
- **What:** All 4 sameAs URLs in Organization and LocalBusiness schema are either confirmed broken (LinkedIn 404) or unverifiable (Facebook, Instagram, Pinterest likely do not exist as business pages).
- **Impact:** sameAs is the primary mechanism AI platforms use to build entity confidence. Linking to non-existent profiles signals a fabricated or thin entity. This actively harms citation potential.
- **Fix:** Remove all unverified sameAs URLs immediately. Only re-add after profiles are confirmed live and populated with real content.

### 3. Blog Author Uses Organization Instead of Person (geo-content, geo-schema: HIGH)
- **What:** All 6 blog articles list "DMD Furnishing" (Organization) as author. AI platforms and Google increasingly weight individual expertise (Person with credentials) over corporate authorship.
- **Impact:** Weakened E-E-A-T signals for AI citation. AI systems preferentially cite content by named human experts with verifiable credentials.
- **Fix:** Create an author profile for a company principal or lead designer. Change @type from Organization to Person. Add credentials, job title, and link to About page.

### 4. Product Pages Are Content Voids (geo-content: HIGH)
- **What:** /products/hotel has ~50 words of content. Product category pages are pure catalog listings with zero descriptive text, no material information, no dimensions, no pricing ranges.
- **Impact:** An AI system cannot learn anything about DMD's furniture beyond product names. Product pages are completely invisible to AI extraction and citation.
- **Fix:** Add 300+ words of unique content per category page with buying guides, material info, and FAQ. Add Product schema to individual product pages.

### 5. "DMD" Brand Collision with Duchenne Muscular Dystrophy (cross-agent: HIGH)
- **What:** The abbreviation "DMD" is overwhelmingly associated with Duchenne Muscular Dystrophy across all AI platforms, Google Knowledge Graph, Wikipedia, and Reddit.
- **Impact:** Entity disambiguation is nearly impossible without strong external authority signals. AI systems queried about "DMD" will never surface "DMD Furnishing."
- **Fix:** Always use "DMD Furnishing" as the full brand name in all external references, schema, and anchor text. Never abbreviate to just "DMD." Build sufficient web presence that "DMD Furnishing" becomes a distinct, recognized entity.

---

## Top 5 Quick Wins

### 1. Remove Broken sameAs URLs from Schema (Impact: HIGH, Effort: 10 min)
Remove all 4 unverified sameAs URLs from `lib/metadata.js`. Broken links actively hurt entity trust. Only re-add URLs once real profiles exist and are populated. *(geo-schema)*

### 2. Add FAQPage Schema to Homepage (Impact: HIGH, Effort: 30 min)
The homepage has 7 well-written FAQ items but no corresponding FAQPage structured data. The FAQ answer about FF&E is the most citable passage on the site ("FF&E stands for Furniture, Fixtures & Equipment..."). Adding schema makes this directly extractable by all AI platforms. *(geo-schema, seo-geo bridge)*

### 3. Change Blog Author from Organization to Person (Impact: HIGH, Effort: 20 min)
Change @type from Organization to Person in all 6 blog article schemas. Add a name, jobTitle, and url pointing to the About page. This immediately strengthens E-E-A-T signals for every AI platform. *(geo-schema, geo-content)*

### 4. Add knowsAbout to Organization Schema (Impact: MEDIUM, Effort: 10 min)
Add a `knowsAbout` array to the Organization schema declaring topic expertise: "commercial furniture manufacturing", "hospitality FF&E", "hotel guestroom furniture", "FF&E procurement", etc. This explicitly tells AI platforms what topics DMD is an authority on. *(geo-schema)*

### 5. Change LocalBusiness @type to FurnitureStore (Impact: MEDIUM, Effort: 5 min)
Generic "LocalBusiness" loses semantic precision. "FurnitureStore" is a valid schema.org subtype that helps AI platforms categorize the entity correctly for furniture-related queries. *(geo-schema)*

---

## Detailed Findings by Agent

### geo-technical (Score: 88/100)
**Agent file:** `4-9-GEO/agents/geo-technical/audit.md`

The strongest GEO score across all agents. The technical infrastructure is one of the best audited for a B2B site.

**Key strengths:**
- SSR fully operational: 99,706 bytes of complete HTML on homepage, all content in initial response
- All Tier 1 AI crawlers explicitly allowed (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, ChatGPT-User)
- Zero cloaking or differential serving -- every crawler gets identical 99,706-byte HTML
- 4 JSON-LD schemas server-rendered in `<head>` (not client-side injected)
- SpeakableSpecification with 6 `data-speakable` attributes on homepage
- Comprehensive llms.txt covering services, markets, glossary, FAQ, products, blog
- TTFB consistently under 110ms across all pages
- Perfect security headers (7/7)

**Issues found:**
- Homepage H1 is brand-creative, not keyword-rich for AI extraction
- Trust bar counters render as "0+" in SSR (JavaScript-dependent animation)
- Meta description at 200 chars exceeds 155-char recommendation
- Mobile LCP of 11s (performance issue, not AI-accessibility issue)
- Products page HTML is 762KB (may slow AI crawler parsing)

---

### geo-content (Score: 68/100)
**Agent file:** `4-9-GEO/agents/geo-content/audit.md`

Blog content is the site's strongest GEO asset. Marketing pages need significant work for AI citability.

**E-E-A-T breakdown:**
- Experience: 14/25 -- Project gallery exists but lacks case studies with outcomes
- Expertise: 18/25 -- Blog shows genuine technical depth (BIFMA, CAL 133, ADA)
- Authoritativeness: 12/25 -- No external citations, no third-party reviews, no certifications displayed
- Trustworthiness: 24/25 -- HTTPS, full contact info, physical address, privacy policy

**Top citable passages:**
1. FF&E definition from blog (9/10 citability): "FF&E -- Furniture, Fixtures & Equipment -- refers to every movable, non-structural element..."
2. FF&E vs OS&E rule of thumb (9/10): "if you replace it once per renovation cycle, it's FF&E. If you reorder it every quarter, it's OS&E."
3. Guestroom checklist (8/10): comprehensive list of standard hotel room furniture with specs

**Content gaps:**
- Product pages are content voids (/products/hotel: 28/100 content score, under 100 words)
- Homepage counters render as "0+" for AI crawlers
- All blog posts published on same date (signals batch content, not organic expertise)
- Unsourced statistics ("15-25% of construction costs" -- no citation)
- No individual author expertise signals

---

### geo-schema (Score: 56/100)
**Agent file:** `4-9-GEO/agents/geo-schema/audit.md`

Schema is present in the right format (JSON-LD, SSR) but entity identity signals are thin.

**What works:**
- All schemas delivered server-side via Next.js (not JS-injected) -- correct for GEO
- 15 unique schema types across the site
- Organization, LocalBusiness, WebSite, WebPage with proper @id cross-referencing
- Article schema on all 6 blog posts
- SpeakableSpecification on homepage

**Critical issues:**
- 0 of 4 sameAs URLs confirmed working (LinkedIn 404, others unverifiable)
- No Wikipedia/Wikidata sameAs links (zero knowledge graph anchors)
- Blog author uses @type:Organization instead of Person
- LocalBusiness is generic instead of FurnitureStore
- HowTo schema on /services is misused (business process, not user-performable task)
- Organization and LocalBusiness disconnected (no parentOrganization link)
- Missing foundingDate, numberOfEmployees, knowsAbout, publisher on WebSite

**Ready-to-implement fixes provided:** Enhanced Organization, LocalBusiness, WebSite, and Article author schemas with full JSON-LD templates in the agent report.

---

### geo-ai-visibility (Score: 52/100)
**Agent file:** `4-9-GEO/agents/geo-ai-visibility/audit.md`

Strong technical foundation undermined by near-zero brand presence.

**Component scores:**
- Crawler Access: 100/100 -- All 12 AI crawlers allowed, no blocks
- llms.txt: 82/100 -- Comprehensive business context with glossary and FAQ
- Citability: 48/100 -- Blog excellent (65/100), marketing pages weak (42-48/100)
- Brand Mentions: 8/100 -- Zero Wikipedia, YouTube, Reddit; LinkedIn 404

**Citability analysis:**
- Only 40% of content blocks are citable (8 of 20 analyzed)
- Only 10% hit the optimal 134-167 word passage length
- Blog is 37% more citable than marketing pages
- FAQ blocks are the most citable content on marketing pages

**Brand collision detail:**
- "DMD" on Wikipedia = Duchenne Muscular Dystrophy
- "DMD" on Reddit = 99%+ medical context
- "DMD" on YouTube = zero relevant results
- LinkedIn company page = 404 Not Found

**90-day improvement projection:** +15-24 points achievable (target: 67-76) through LinkedIn creation, YouTube launch, citability optimization, and Reddit participation.

---

### geo-platform-analysis (Score: 34.6/100 average)
**Agent file:** `4-9-GEO/agents/geo-platform-analysis/audit.md`

Comprehensive 5-platform analysis revealing a consistent pattern: strong content quality scores undermined by missing off-site signals.

**Cross-platform insight:** Every platform has a different primary blocker, but they share a common root cause -- zero off-site authority:

| Platform | Content Quality Score | Authority/Entity Score | The Gap |
|----------|----------------------|----------------------|---------|
| Google AIO | 58 (content structure) | 18 (source authority) | 40 pts |
| Gemini | 62 (content quality) | 12 (Google ecosystem) | 50 pts |
| Bing Copilot | 50 (content prefs) | 10 (Microsoft ecosystem) | 40 pts |
| ChatGPT | 45 (content prefs) | 22 (entity recognition) | 23 pts |
| Perplexity | 52 (source directness) | 5 (community validation) | 47 pts |

**Cross-platform synergies identified:**
- Fixing LinkedIn affects all 5 platforms (+26 combined points estimated)
- Creating Wikidata entry affects all 5 platforms (+33 combined)
- Building 10+ quality backlinks affects all 5 (+46 combined)
- Creating GBP affects Google AIO + Gemini + Bing Copilot (+25 combined)

**Projected improvement:**
| Timeline | Average Platform Score |
|----------|----------------------|
| Current | 34.6 |
| After Week 2 | 44.0 |
| After Month 2 | 55.4 |
| After Month 3+ | 65.4 |

---

## Action Plan

### P0 -- Fix This Week
1. Remove broken sameAs URLs from schema (geo-schema)
2. Fix/create LinkedIn company page (geo-ai-visibility, geo-schema, geo-platform-analysis)
3. Change LocalBusiness @type to FurnitureStore (geo-schema)
4. Remove HowTo schema from /services (geo-schema)
5. Add FAQPage schema to homepage (geo-schema)

### P1 -- Fix This Sprint
6. Change blog author from Organization to Person across all 6 articles (geo-content, geo-schema)
7. Add knowsAbout, areaServed, publisher to Organization/WebSite schemas (geo-schema)
8. Verify Bing Webmaster Tools and implement IndexNow (geo-platform-analysis)
9. Create Google Business Profile (geo-platform-analysis)
10. Create Wikidata entry for DMD Furnishing (geo-ai-visibility, geo-platform-analysis)
11. Add 40-60 word direct-answer paragraphs after question-based H2s (geo-platform-analysis)
12. Optimize blog content passage lengths to 134-167 words (geo-ai-visibility)
13. Add HTML comparison tables to blog content (geo-platform-analysis)

### P2 -- Fix This Quarter
14. Add 300+ words of unique content to product category pages (geo-content)
15. Source all unsourced statistics with credible external links (geo-content)
16. Create YouTube channel with 3-5 project walkthrough videos (geo-ai-visibility, geo-platform-analysis)
17. Begin Reddit participation in r/hospitality, r/interiordesign, r/commercialrealestate (geo-ai-visibility, geo-platform-analysis)
18. Submit to business directories: BBB, Houzz, Crunchbase, industry directories (geo-platform-analysis)
19. Add named author bios with credentials to all content (geo-content)
20. Stagger blog publication dates and add meaningful dateModified (geo-content)
21. Add SpeakableSpecification to blog articles (geo-schema)
22. Publish original research content (FF&E cost benchmarks) (geo-content, geo-platform-analysis)
23. Create downloadable resources (PDF checklists, spec templates) (geo-platform-analysis)
24. Build backlinks from hospitality trade publications (geo-platform-analysis)

### P3 -- Backlog
25. Pursue Wikipedia article once notability criteria met (geo-ai-visibility)
26. Implement Product schema for individual furniture items (geo-content)
27. Create case study pages with specific project details and measurable outcomes (geo-content)
28. Expand blog to 15-20 articles for topical authority (geo-platform-analysis)
29. Build sustained social media presence for community validation (geo-ai-visibility)
30. Add industry codes (NAICS, ISICV4) and hasCredential to Organization schema (geo-schema)

---

## The Technical-Authority Paradox

The defining pattern of this GEO audit is a paradox:

**DMD Furnishing is technically one of the best-prepared sites for AI search** -- SSR, JSON-LD, llms.txt, SpeakableSpecification, AI crawler access. If this site had the authority of a 10-year-old brand with 100+ backlinks and a Wikipedia article, it would score 80+/100 on GEO.

**But without external authority, the technical excellence is invisible.** AI platforms do not cite sites they cannot validate. The schema says "DMD Furnishing is a furniture manufacturer in Foxboro, MA" -- but no external source confirms this. The llms.txt provides a comprehensive business summary -- but no AI model encounters it because no external link or mention leads crawlers to discover the site.

**The path forward is not more on-site work.** The on-site GEO is largely complete. The path is entity establishment: LinkedIn, Wikidata, YouTube, GBP, directory citations, Reddit participation, trade publication mentions, and backlinks. Every external reference that says "DMD Furnishing exists and makes commercial furniture" multiplies the value of all the on-site work already done.

---

*Report synthesized from 5 GEO agent audits + 1 bridge audit conducted 2026-04-09. All scores, findings, and recommendations cite specific agents. No data has been fabricated.*
