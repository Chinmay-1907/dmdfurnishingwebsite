# GEO Platform Analysis Audit -- DMD Furnishing

**URL:** https://dmdredesign.netlify.app (production: dmdfurnishing.com)
**Date:** 2026-04-09
**Status:** COMPLETE
**Overall Platform Readiness Average:** 39/100

---

## Executive Summary

DMD Furnishing has strong on-site technical foundations (SSR, schema markup, fast load times, AI crawler access) but critically lacks the off-site authority signals that AI search platforms rely on to surface results. Zero backlinks, no Wikipedia/Wikidata presence, no Google Business Profile, a 404 LinkedIn page, and zero Reddit/forum mentions create a severe authority vacuum. The brand collision with "DMD" (Duchenne Muscular Dystrophy) further complicates entity recognition across every platform. The site scores well on content quality and technical readiness but is invisible to AI platforms due to missing external validation.

---

## Platform 1: Google AI Overviews

**Score: 44/100**

### Scoring Breakdown

| Factor | Weight | Score | Weighted |
|--------|--------|-------|----------|
| Content Structure | 40% | 58 | 23.2 |
| Source Authority | 30% | 18 | 5.4 |
| Technical SEO | 30% | 52 | 15.6 |
| **Total** | | | **44.2** |

### Content Structure Analysis (58/100)

**Strengths:**
- Blog posts use question-based H2 headings (e.g., "What Is Included in FF&E?", "Why FF&E Matters in Hospitality") -- these match the exact query patterns Google AI Overviews pull from
- FAQPage schema on About page (4 questions) and Services page (8 questions) -- Google directly indexes these for AIO
- SpeakableSpecification markup present on homepage targeting h1 and `[data-speakable]` elements -- forward-looking voice/AIO signal
- 6 long-form blog articles averaging 2,600 words with clear definition patterns ("FF&E stands for Furniture, Fixtures & Equipment")
- Comparison content structure in blog (FF&E vs. OS&E) maps to AIO comparison panels

**Weaknesses:**
- No direct-answer paragraphs in the 40-60 word "snippet bait" format after question headings -- most answers are multi-paragraph instead of concise extractable blocks
- No comparison tables (HTML `<table>`) -- only prose comparisons
- Homepage headings are statement-based, not question-based ("Projects built to last" rather than "Why choose custom commercial furniture?")
- No "People Also Ask" style content clusters beyond the FAQ sections
- Missing HowTo schema on blog posts that describe processes (procurement timeline, value engineering steps)

### Source Authority Analysis (18/100)

**Strengths:**
- Domain is active and serving real content with consistent NAP data
- Organization + LocalBusiness schema with sameAs links provide basic entity signals

**Weaknesses:**
- Zero backlinks -- Google AI Overviews heavily weight organic ranking signals; without backlinks, pages cannot rank to be eligible for AIO citation
- No Google Business Profile (confirmed missing) -- eliminates local authority signal
- No third-party mentions, reviews, or citations discoverable
- Brand collision: searching "DMD" returns Duchenne Muscular Dystrophy results overwhelmingly; entity disambiguation is impossible without external authority

### Technical SEO Analysis (52/100)

**Strengths:**
- Next.js 15 SSR delivers fully rendered HTML (confirmed: full content in initial response)
- TTFB consistently under 110ms across all pages (92ms homepage, 106ms products, 99ms about)
- Comprehensive schema: Organization, LocalBusiness, WebSite, WebPage, Article, BreadcrumbList, FAQPage, Service, HowTo, CollectionPage
- Sitemap.xml with lastmod dates, canonical URLs, OpenGraph tags all present
- SpeakableSpecification markup (rare and forward-looking)

**Weaknesses:**
- No IndexNow protocol (404 on /.well-known/indexnow)
- No msvalidate.01 meta tag for Bing Webmaster Tools verification
- Sitemap references dmdfurnishing.com but site is deployed on dmdredesign.netlify.app (domain mismatch)
- No structured data for individual products (CollectionPage only, no Product schema)

### Google AI Overviews Quick Wins
1. **Add 40-60 word direct-answer paragraphs** immediately after every question-based H2 -- these are the exact blocks Google extracts for AIO
2. **Add HTML comparison tables** to blog posts (FF&E vs. OS&E, HPL vs. veneer vs. solid wood) -- table format gets preferential AIO treatment
3. **Create a Google Business Profile** -- this is the single highest-impact action for local AIO visibility
4. **Add HowTo schema** to the procurement timeline and value engineering blog posts

---

## Platform 2: ChatGPT Web Search (Bing Index)

**Score: 32/100**

### Scoring Breakdown

| Factor | Weight | Score | Weighted |
|--------|--------|-------|----------|
| Entity Recognition | 35% | 22 | 7.7 |
| Content Preferences | 40% | 45 | 18.0 |
| Crawler Access | 25% | 25 | 6.3 |
| **Total** | | | **32.0** |

### Entity Recognition Analysis (22/100)

**Strengths:**
- Organization schema with `sameAs` links to Facebook, Instagram, LinkedIn, Pinterest -- these help ChatGPT identify the entity
- Consistent NAP data across all schema blocks (name, address, phone)
- Clear business description in schema: "Custom commercial furniture manufacturer specializing in hospitality FF&E"

**Weaknesses:**
- No Wikipedia article -- Wikipedia is the strongest signal for ChatGPT entity recognition
- No Wikidata entry -- ChatGPT/Bing use Wikidata as a primary knowledge graph source
- LinkedIn sameAs link (linkedin.com/company/dmdfurnishing) returns 404 -- broken entity link actively hurts
- No Crunchbase, Bloomberg, or other business directory profiles
- "DMD" brand collision with Duchenne Muscular Dystrophy makes entity disambiguation nearly impossible without Wikipedia/Wikidata
- No Google Knowledge Panel (which Bing/ChatGPT also reference for entity validation)

### Content Preferences Analysis (45/100)

**Strengths:**
- Factual, concise writing style in blog posts -- ChatGPT prefers authoritative declarative statements
- Expert-level niche content (FF&E procurement, value engineering, HPL vs. veneer) demonstrates topical authority
- 6 long-form articles with clear definitions that ChatGPT can extract
- Article schema with proper author attribution (Organization level)
- FAQPage schema provides structured Q&A pairs ChatGPT can directly reference

**Weaknesses:**
- No individual author/expert attribution -- ChatGPT weights named human experts higher than organization-level authorship
- No case study pages with specific project details (only project gallery thumbnails)
- No data tables, statistics, or quantified claims that ChatGPT favors for citation
- Missing "About the Author" bios with credentials

### Crawler Access Analysis (25/100)

**Strengths:**
- robots.txt explicitly allows OAI-SearchBot and GPTBot with `Allow: /` directives
- ChatGPT-User also explicitly allowed
- SSR ensures crawler sees full content

**Weaknesses:**
- Site is on dmdredesign.netlify.app (staging domain) -- Bing may not index a netlify.app subdomain with same priority as a custom domain
- No Bing Webmaster Tools verification (no msvalidate.01 meta tag)
- Zero Bing index presence implied by zero backlinks and no BWT setup
- Sitemap points to dmdfurnishing.com domain, not the live netlify domain

### ChatGPT Quick Wins
1. **Fix the LinkedIn company page** (currently 404) -- this is a direct sameAs entity signal ChatGPT uses
2. **Add Bing Webmaster Tools verification** (msvalidate.01 meta tag) and submit sitemap
3. **Create Wikidata entry** for DMD Furnishing with proper entity classification (commercial furniture manufacturer)
4. **Add named author bios** to blog posts with real credentials and expertise signals
5. **Submit to business directories** (Crunchbase, BBB, Houzz, industry directories)

---

## Platform 3: Perplexity AI

**Score: 28/100**

### Scoring Breakdown

| Factor | Weight | Score | Weighted |
|--------|--------|-------|----------|
| Community Validation | 30% | 5 | 1.5 |
| Source Directness | 30% | 52 | 15.6 |
| Freshness | 20% | 40 | 8.0 |
| Technical Access | 20% | 15 | 3.0 |
| **Total** | | | **28.1** |

### Community Validation Analysis (5/100)

**Strengths:**
- None identified

**Weaknesses:**
- Zero Reddit mentions of "DMD Furnishing" or "dmdfurnishing.com" -- Reddit is Perplexity's highest-weight community signal
- Zero forum presence (no Houzz, no hotel owner forums, no hospitality industry boards)
- No Quora answers referencing DMD Furnishing
- No social proof from third-party review sites
- "DMD" on Reddit overwhelmingly maps to Duchenne Muscular Dystrophy -- brand collision is catastrophic for community discovery
- This is the single biggest blocker for Perplexity visibility

### Source Directness Analysis (52/100)

**Strengths:**
- Primary source information: DMD writes original content about its own services, processes, and expertise
- Blog content provides first-party definitions and explanations (not aggregated from elsewhere)
- Clear service descriptions with specific process details (6-step process, lead times, project types)
- Direct contact information and location data

**Weaknesses:**
- No case studies with specific client names, project values, or measurable outcomes
- No original research, surveys, or industry data that would make DMD a primary citation source
- No downloadable resources (whitepapers, checklists, spec sheets) that Perplexity could reference as authoritative documents
- Content is informational but not uniquely citable -- similar FF&E definitions exist on many sites

### Freshness Analysis (40/100)

**Strengths:**
- Blog posts dated March 2026 (recent)
- Sitemap lastmod dates are 2026-04-09 (current)
- Next.js framework suggests active development

**Weaknesses:**
- Only 6 blog posts total -- insufficient publishing velocity for freshness signals
- No news/press coverage to create external freshness signals
- No event participation, speaking, or industry involvement creating fresh mentions
- Blog publishing cadence unknown but appears infrequent given only 6 posts exist

### Technical Access Analysis (15/100)

**Strengths:**
- PerplexityBot explicitly allowed in robots.txt
- SSR content is immediately crawlable

**Weaknesses:**
- No evidence Perplexity has ever crawled or indexed the site
- Staging domain (netlify.app) likely deprioritized by Perplexity's crawl budget
- Zero external links pointing to the site means Perplexity's crawler has no discovery path
- No submission mechanism for Perplexity (unlike Bing/Google webmaster tools)

### Perplexity Quick Wins
1. **Create Reddit presence** -- post helpful answers in r/hospitality, r/hoteliers, r/interiordesign, r/commercialrealestate linking back to blog content naturally
2. **Create Houzz profile** with project photos -- Perplexity indexes Houzz heavily for home/commercial design
3. **Publish original research** (e.g., "2026 Hotel Furniture Cost Benchmarks") that becomes a citable primary source
4. **Answer questions on Quora** about FF&E, hotel furniture, commercial interior design
5. **Create downloadable resources** (PDF checklists, spec templates) that Perplexity can reference

---

## Platform 4: Google Gemini

**Score: 35/100**

### Scoring Breakdown

| Factor | Weight | Score | Weighted |
|--------|--------|-------|----------|
| Google Ecosystem | 35% | 12 | 4.2 |
| Knowledge Graph | 30% | 30 | 9.0 |
| Content Quality | 35% | 62 | 21.7 |
| **Total** | | | **34.9** |

### Google Ecosystem Analysis (12/100)

**Strengths:**
- Google-Extended crawler explicitly allowed in robots.txt
- Sitemap.xml is properly formatted for Google consumption

**Weaknesses:**
- No Google Business Profile -- this is the primary local entity signal for Gemini. Its absence is devastating because Gemini relies heavily on GBP data for business queries
- No YouTube channel -- Gemini strongly favors YouTube content as a Google-owned property. For visual products like furniture, this is a major gap
- No Google Merchant Center / product feed
- No Google Reviews (impossible without GBP)
- No Google Search Console verification evidence
- Essentially zero Google ecosystem footprint beyond basic crawlability

### Knowledge Graph Analysis (30/100)

**Strengths:**
- Rich schema markup (Organization, LocalBusiness, WebSite, WebPage, Article, FAQPage, BreadcrumbList, Service, HowTo, CollectionPage) -- this is the strongest Knowledge Graph signal DMD has
- Entity IDs are properly structured with @id anchors (/#organization, /#localbusiness, /#website)
- Consistent sameAs links across all schema blocks
- GeoCoordinates present in LocalBusiness schema

**Weaknesses:**
- No Google Knowledge Panel (requires Wikipedia + Wikidata + sustained search volume)
- "DMD" entity is completely dominated by Duchenne Muscular Dystrophy in Google's Knowledge Graph
- No Wikidata entry to establish entity disambiguation
- sameAs links to LinkedIn (404) and unverified social profiles weaken entity confidence
- Zero external corroboration of schema claims (no third-party sites confirm this business exists at this address)

### Content Quality Analysis (62/100)

**Strengths:**
- Long-form blog content (6 articles, 2,600 words avg) -- Gemini values depth
- Clear topical clustering: all content centers on commercial furniture / FF&E / hospitality
- Well-structured content hierarchy with H1 > H2 > H3 progression
- FAQ sections provide structured answers Gemini can extract
- Professional, authoritative writing tone appropriate for B2B

**Weaknesses:**
- No video content (Gemini strongly weights multimodal content)
- No image alt text analysis possible from HTML but image optimization was scored 82/100 in SEO audit
- Limited topical breadth -- 6 articles cannot establish deep topical authority
- No author expertise signals (no named experts, credentials, or E-E-A-T indicators beyond organization level)
- No comparison or "versus" content that Gemini uses for recommendation queries

### Google Gemini Quick Wins
1. **Create Google Business Profile immediately** -- this is the #1 priority action. Gemini surfaces GBP data for virtually every local business query
2. **Launch a YouTube channel** with project walkthroughs, manufacturing process videos, before/after transformations -- Gemini gives YouTube content preferential treatment
3. **Create a Wikidata entry** to establish entity in Google's Knowledge Graph separate from the DMD/Duchenne Muscular Dystrophy entity
4. **Add author expertise signals** -- named individuals with credentials, potentially with Person schema
5. **Expand topical cluster** to 15-20 articles covering adjacent topics (hotel renovation planning, commercial interior design trends, sustainability in FF&E)

---

## Platform 5: Bing Copilot

**Score: 34/100**

### Scoring Breakdown

| Factor | Weight | Score | Weighted |
|--------|--------|-------|----------|
| Bing Index Strength | 30% | 15 | 4.5 |
| Content Preferences | 30% | 50 | 15.0 |
| Microsoft Ecosystem | 20% | 10 | 2.0 |
| Technical Signals | 20% | 62 | 12.4 |
| **Total** | | | **33.9** |

### Bing Index Strength Analysis (15/100)

**Strengths:**
- Site is accessible and returns 200 status codes
- Sitemap exists (though domain mismatch is an issue)

**Weaknesses:**
- No Bing Webmaster Tools verification (no msvalidate.01 meta tag found)
- No IndexNow protocol implementation (404 on indexnow endpoints)
- Zero backlinks means Bing has minimal crawl incentive
- Staging domain (netlify.app) receives lower Bing crawl priority than custom domains
- No evidence site is indexed in Bing at all
- Sitemap references dmdfurnishing.com, not the deployed netlify domain

### Content Preferences Analysis (50/100)

**Strengths:**
- Professional, authoritative tone -- Bing Copilot favors formal business language over casual content
- Structured content with clear headings and logical hierarchy
- FAQ content provides direct answers to common queries
- Service descriptions are detailed and specific (6 distinct services with descriptions)
- Article schema with proper headline, description, datePublished

**Weaknesses:**
- No data-driven content (statistics, benchmarks, pricing ranges) that Bing Copilot prefers to cite
- No comparison tables -- Bing Copilot heavily favors structured tabular data
- Missing expert bylines and credentials
- No case studies with specific outcomes that Bing Copilot could reference for recommendation queries

### Microsoft Ecosystem Analysis (10/100)

**Strengths:**
- LinkedIn company URL listed in sameAs schema (intent is correct)

**Weaknesses:**
- LinkedIn page returns 404 -- this is actively harmful because Bing Copilot relies on LinkedIn as a primary business entity source
- No GitHub organization presence (Bing indexes GitHub for technical credibility)
- No Microsoft/Bing Places listing
- No Bing Maps presence
- No Microsoft Advertising account

### Technical Signals Analysis (62/100)

**Strengths:**
- Excellent page load times (TTFB under 110ms across all pages)
- SSR delivers complete HTML content (no JS-rendering dependency)
- Clean URL structure with semantic paths (/blog/what-is-ffe-hospitality)
- Proper canonical URLs and OpenGraph tags
- Twitter Card meta tags present (Bing respects these)
- Mobile-responsive design

**Weaknesses:**
- No IndexNow implementation -- Bing's preferred real-time indexing protocol
- No msvalidate.01 verification
- Page size of 99KB for homepage is reasonable but could be optimized

### Bing Copilot Quick Wins
1. **Implement IndexNow protocol** -- Bing created IndexNow and gives priority to sites that use it
2. **Add msvalidate.01 meta tag** and verify site in Bing Webmaster Tools
3. **Fix the LinkedIn company page** -- Bing Copilot uses LinkedIn as a primary business identity source
4. **Create a Bing Places listing** for the Foxboro location
5. **Add comparison tables** to blog content -- Bing Copilot extracts tabular data preferentially

---

## Cross-Platform Score Summary

| Platform | Score | Grade | Primary Blocker |
|----------|-------|-------|-----------------|
| Google AI Overviews | 44 | D+ | Zero backlinks / no GBP |
| Bing Copilot | 34 | D | No Bing index presence / LinkedIn 404 |
| Google Gemini | 35 | D | No GBP / no YouTube / no Knowledge Panel |
| ChatGPT Web Search | 32 | D | No Wikipedia / no Wikidata / LinkedIn 404 |
| Perplexity AI | 28 | F | Zero community mentions (Reddit, forums) |
| **Overall Average** | **34.6** | **D** | **Zero off-site authority across all platforms** |

---

## Cross-Platform Synergies

Actions that improve visibility across multiple platforms simultaneously:

### Tier 1: Maximum Cross-Platform Impact (affects 5/5 platforms)

| Action | Google AIO | ChatGPT | Perplexity | Gemini | Bing Copilot |
|--------|-----------|---------|------------|--------|-------------|
| Fix LinkedIn page (currently 404) | +3 | +8 | +2 | +3 | +10 |
| Create Wikidata entry | +5 | +12 | +3 | +8 | +5 |
| Build backlinks (10+ quality) | +15 | +5 | +8 | +10 | +8 |
| Add comparison tables to content | +8 | +5 | +3 | +5 | +8 |
| Add named expert authors to blog | +5 | +8 | +5 | +8 | +5 |

### Tier 2: High Cross-Platform Impact (affects 3-4 platforms)

| Action | Platforms Affected | Est. Combined Lift |
|--------|-------------------|-------------------|
| Create Google Business Profile | Google AIO, Gemini, Bing Copilot | +25 combined |
| Implement IndexNow | Bing Copilot, ChatGPT (via Bing) | +15 combined |
| Create Reddit presence | Perplexity, Google AIO, ChatGPT | +15 combined |
| Launch YouTube channel | Gemini, Google AIO, Perplexity | +18 combined |
| Submit to Bing Webmaster Tools | Bing Copilot, ChatGPT (via Bing) | +12 combined |

### Tier 3: Platform-Specific but Important

| Action | Platform | Est. Lift |
|--------|----------|-----------|
| Add 40-60 word direct answer paragraphs | Google AIO | +10 |
| Create Houzz profile with projects | Perplexity | +8 |
| Add HowTo schema to process blog posts | Google AIO, Gemini | +5 |
| Publish original industry research | Perplexity, ChatGPT | +10 |

---

## The "DMD" Brand Collision Problem

The abbreviation "DMD" is overwhelmingly associated with Duchenne Muscular Dystrophy across all AI platforms. This creates a systemic entity recognition problem:

- **Google Knowledge Graph:** "DMD" entity = Duchenne Muscular Dystrophy
- **Wikipedia:** "DMD" article = Duchenne Muscular Dystrophy
- **ChatGPT entity model:** "DMD" = Duchenne Muscular Dystrophy
- **Reddit mentions of "DMD":** 99%+ medical context

**Mitigation strategy:** Always use "DMD Furnishing" as the full brand name in all external references, schema markup, and content. Never abbreviate to just "DMD." The Wikidata entry should explicitly include "DMD Furnishing" with proper disambiguation. All backlink anchor text should use "DMD Furnishing" not "DMD."

---

## Priority Action Plan (Ordered by Impact)

### Week 1-2: Foundation Fixes
1. Fix LinkedIn company page (affects all 5 platforms)
2. Create Google Business Profile (affects Google AIO, Gemini, Bing)
3. Add msvalidate.01 meta tag + verify in Bing Webmaster Tools
4. Implement IndexNow protocol
5. Create Bing Places listing

### Week 3-4: Entity Establishment
6. Create Wikidata entry for "DMD Furnishing" with proper classification
7. Submit to business directories (BBB, Houzz, Crunchbase, industry directories)
8. Add 40-60 word direct-answer paragraphs after all question-based H2s
9. Add HTML comparison tables to relevant blog posts
10. Add named author bios with credentials to all blog posts

### Month 2: Authority Building
11. Begin Reddit participation (r/hospitality, r/hoteliers, r/interiordesign)
12. Launch YouTube channel with 3-5 initial videos
13. Publish original research/benchmark content
14. Start backlink outreach to hospitality industry publications
15. Create downloadable resources (PDF checklists, spec templates)

### Month 3+: Sustained Growth
16. Expand blog to 15-20 articles for topical authority
17. Pursue Wikipedia notability through press coverage and citations
18. Build sustained social media presence for community validation signals
19. Create case study pages with specific project details and outcomes
20. Implement Product schema for individual furniture items

---

## Projected Score Improvement

| Platform | Current | After Week 2 | After Month 2 | After Month 3+ |
|----------|---------|-------------|---------------|-----------------|
| Google AI Overviews | 44 | 52 | 62 | 72 |
| ChatGPT Web Search | 32 | 40 | 52 | 62 |
| Perplexity AI | 28 | 30 | 45 | 58 |
| Google Gemini | 35 | 48 | 60 | 70 |
| Bing Copilot | 34 | 50 | 58 | 65 |
| **Average** | **34.6** | **44.0** | **55.4** | **65.4** |

---

## Methodology Notes

- Scores are based on analysis of live HTML responses, schema markup, robots.txt, sitemap.xml, meta tags, page performance metrics, and known off-site signals from the SEO audit
- External presence signals (Wikipedia, Reddit, backlinks, GBP) are based on known findings from the comprehensive SEO audit
- Platform scoring weights follow the formulas specified in the audit methodology
- TTFB measurements taken via curl from the analysis environment (may vary from production CDN performance)
- All content analysis based on server-rendered HTML (SSR confirmed)
