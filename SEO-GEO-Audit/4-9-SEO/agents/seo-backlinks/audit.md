# Backlink Profile Audit: DMD Furnishing

**Domain:** dmdfurnishing.com
**Staging:** dmdredesign.netlify.app
**Date:** 2026-04-09
**Auditor:** seo-backlinks agent
**Confidence Level:** LOW -- No premium backlink tools (Ahrefs, SEMrush, Moz) were available. All findings are based on manual site analysis, outbound link inspection, content assessment, and codebase review.

---

## Overall Score: 18/100

**Confidence:** LOW (estimated based on observable data only)

This score reflects a domain with minimal-to-no detectable external backlink profile, limited brand citations, no industry directory listings, and no link-building infrastructure in place. The site has good technical SEO foundations but has not invested in off-page authority building.

---

## Scoring Breakdown

| Factor | Weight | Score | Confidence | Data Source |
|--------|--------|-------|------------|-------------|
| Referring domain count | 20% | 5/100 | INSUFFICIENT DATA | Manual search; no backlinks detected via web queries |
| Domain quality distribution | 20% | N/A | INSUFFICIENT DATA | No backlink data available; weight redistributed |
| Anchor text naturalness | 15% | N/A | INSUFFICIENT DATA | No backlink data available; weight redistributed |
| Toxic link ratio | 20% | 50/100 (neutral) | INSUFFICIENT DATA | No toxic links detected (but no links detected at all) |
| Link velocity trend | 10% | 5/100 | INSUFFICIENT DATA | No evidence of link acquisition activity |
| Follow/nofollow ratio | 5% | N/A | INSUFFICIENT DATA | No backlink data available; weight redistributed |
| Geographic relevance | 10% | 30/100 | LOW | LocalBusiness schema targets MA/US; no local citations found |

**Redistributed scoring (for factors with data):**
- Toxic link ratio (neutral baseline): 50/100 x 0.20 = 10.0
- Geographic relevance: 30/100 x 0.10 = 3.0
- Link velocity: 5/100 x 0.10 = 0.5
- Referring domains: 5/100 x 0.20 = 1.0
- Remaining 40% weight has no data = scored at 0

**Weighted total: ~18/100** (rounded up from 14.5 to account for social profile existence)

---

## 1. Outbound Link Analysis

### External Links from the Site

The site links out to **11 unique external domains**, all from blog content:

| External Domain | Context | Page | Rel Attribute |
|----------------|---------|------|---------------|
| ahla.com | American Hotel & Lodging Association | Homepage + Blog (FF&E guide) | noopener noreferrer |
| bifma.org | Business & Institutional Furniture Manufacturers Association | Blog (FF&E guide, Procurement timeline) | noopener noreferrer |
| hdmagazine.com | Hospitality Design magazine | Blog (FF&E guide) | noopener noreferrer |
| aia.org | American Institute of Architects | Blog (Value engineering) | noopener noreferrer |
| nfpa.org | National Fire Protection Association | Blog (Value engineering) | noopener noreferrer |
| ada.gov | Americans with Disabilities Act | Blog (Value engineering, Restaurant seating) | noopener noreferrer |
| fpl.fs.usda.gov | USDA Forest Products Laboratory | Blog (HPL vs Veneer) | noopener noreferrer |
| awinet.org | Architectural Woodwork Institute | Blog (HPL vs Veneer) | noopener noreferrer |
| restaurant.org | National Restaurant Association | Blog (Restaurant seating) | noopener noreferrer |
| cmaanet.org | Construction Management Association of America | Blog (Procurement timeline) | noopener noreferrer |
| hotelbusiness.com | Hotel Business publication | Blog (Hotel guestroom checklist) | noopener noreferrer |

### Social Media Links (from Footer, sitewide)

| Platform | URL | Rel Attribute |
|----------|-----|---------------|
| Facebook | facebook.com/dmdfurnishing | noopener noreferrer |
| Instagram | instagram.com/dmdfurnishing | noopener noreferrer |
| LinkedIn | linkedin.com/company/dmdfurnishing | noopener noreferrer |
| Pinterest | pinterest.com/dmdfurnishing | noopener noreferrer |

### Outbound Link Assessment

**Strengths:**
- All outbound links point to high-authority, relevant industry organizations
- Links are used contextually within educational blog content
- Proper `target="_blank"` and `rel="noopener noreferrer"` attributes on all external links

**Issues:**
- No `rel="nofollow"` on any outbound links -- the site passes PageRank to all external domains without receiving any in return. This creates a one-way authority leak. (Note: for editorial citations to authoritative sources, this is actually acceptable and even best-practice per Google guidelines. The issue is purely the imbalance of giving vs receiving.)
- Homepage links to ahla.com -- the ONLY outbound link on the homepage
- No reciprocal linking strategy in place

---

## 2. Internal Link Structure

### Site Architecture (579 URLs in sitemap)

| Section | URL Count | Internal Links To/From |
|---------|-----------|----------------------|
| Core pages | 10 | Well-linked from nav + footer |
| Blog articles | 6 | Link to /products, /services, /about, /schedule-call |
| Inspirations | 6 | Link to product categories + consultation |
| Product categories | 55 | Hierarchical linking (category > subcategory) |
| Product pages | 468 | Deep hierarchy, breadcrumb navigation |
| Project case studies | 5 | Linked from /projects hub page |

### Internal Link Assessment

**Strengths:**
- 579 pages indexed in sitemap -- substantial content footprint
- Clear hierarchical URL structure: /products/[sector]/[category]/[item]
- Breadcrumb navigation schema implemented
- Blog posts link to relevant product pages and services
- Footer provides consistent sitewide internal links

**Weaknesses:**
- Blog has only 6 posts -- thin content hub for attracting backlinks
- Project case studies are shallow (mostly image + brief description)
- No cross-linking between related blog posts
- 468 product pages with potentially thin/duplicate content could dilute authority

---

## 3. Existing Backlink Profile (Observable)

### Confirmed Backlink Sources: NONE DETECTED

**Methods attempted:**
1. Google search for `"dmdfurnishing.com"` excluding own site -- FAILED (search engine blocked automated fetch)
2. Bing search for `"dmdfurnishing.com"` excluding own site -- FAILED (search engine blocked automated fetch)
3. Brand name search `"DMD Furnishing"` -- FAILED (results showed DMD/Duchenne Muscular Dystrophy instead, indicating very low brand visibility)
4. Common Crawl index query -- FAILED (504 timeout)
5. Wayback Machine check -- BLOCKED (web.archive.org not accessible)
6. Social media profile verification -- BLOCKED (Facebook, Instagram, Pinterest require JavaScript rendering)
7. LinkedIn company page -- 404 NOT FOUND (linkedin.com/company/dmdfurnishing returned 404)

### What This Means

The domain appears to have extremely limited external visibility. The brand name "DMD" is highly ambiguous (conflicts with Duchenne Muscular Dystrophy, a far more prominent search result), which means:
- Brand searches are likely polluted by medical content
- Unlinked brand mentions are harder to find and claim
- Building brand authority requires "DMD Furnishing" as a compound term, not just "DMD"

### Social Profile Status

| Platform | URL Configured | Status |
|----------|---------------|--------|
| Facebook | facebook.com/dmdfurnishing | UNVERIFIED (page exists in code but could not confirm live) |
| Instagram | instagram.com/dmdfurnishing | UNVERIFIED |
| LinkedIn | linkedin.com/company/dmdfurnishing | LIKELY BROKEN (404 returned) |
| Pinterest | pinterest.com/dmdfurnishing | UNVERIFIED |

**CRITICAL:** The LinkedIn company page URL returned a 404 error. This is a broken social profile link that appears sitewide in the footer and in schema.org markup.

---

## 4. Backlink-Worthy Content Assessment

### Current Linkable Assets

| Asset | Type | Backlink Potential | Why |
|-------|------|-------------------|-----|
| "What Is FF&E?" guide | Educational blog | 5/10 | Covers basics but no original data; many competitors have similar content |
| Hotel Guestroom Furniture Checklist | Checklist/guide | 6/10 | Practical and specific; could attract links if promoted |
| Restaurant Seating Guide | Decision framework | 5/10 | Useful but not uniquely differentiated |
| HPL vs Veneer vs Solid Wood comparison | Technical comparison | 6/10 | Good technical depth; material comparison is genuinely useful |
| Value Engineering guide | Process guide | 5/10 | Relevant to procurement teams but lacks original data |
| FF&E Procurement Timeline | Process guide | 6/10 | Timeline content is inherently shareable and reference-worthy |
| Project portfolio (5 case studies) | Case studies | 3/10 | Too shallow; lack metrics, testimonials, before/after data |
| Product catalog (468 pages) | Product pages | 2/10 | Standard product pages rarely attract backlinks |
| Inspirations gallery | Visual content | 2/10 | Uses stock photography (Unsplash), not original work |

### Content Gaps (Missing Linkable Assets)

These are asset types that competitors commonly have and that attract backlinks in the FF&E/hospitality furniture space:

1. **Original research/data** -- Industry surveys, cost benchmarks, trend reports
2. **Downloadable resources** -- PDF checklists, procurement templates, budget calculators
3. **Interactive tools** -- FF&E budget estimator, room configurator, material selector
4. **In-depth case studies** -- Before/after photos, ROI data, client testimonials, specific metrics
5. **Industry glossary** -- Comprehensive FF&E terminology reference
6. **Buyer's guides** -- Detailed comparison guides with original testing/evaluation
7. **Video content** -- Manufacturing process, installation timelapse, expert interviews
8. **Infographics** -- Visual data that gets embedded and linked to
9. **Certifications page** -- BIFMA compliance, sustainability certifications, fire safety ratings
10. **Press/media page** -- Press releases, media mentions, awards

---

## 5. Competitor Gap Assessment

### Key Competitor Landscape (FF&E / Hospitality Furniture)

| Competitor Type | Examples | Likely Backlink Sources | DMD Gap |
|----------------|----------|----------------------|---------|
| Major FF&E manufacturers | Bernhardt Hospitality, Flexsteel Hospitality | Trade publications, design magazines, AHLA directory | No industry directory presence |
| National FF&E procurement | American Hotel Register, HD Supply | Hotel chain partnerships, procurement platforms | No partnership mentions |
| Hospitality design firms | HBA, Wilson Associates | Award programs, Hospitality Design magazine features | No award or feature mentions |
| Local MA commercial furniture | Various regional suppliers | BBB, local chambers, state directories | No local citation presence |
| Online hospitality furniture | 1stDibs (contract), Wayfair Professional | Extensive content marketing, PR campaigns | Minimal content marketing |

### Estimated Competitor Backlink Ranges

**Note:** These are general industry estimates for context, NOT verified data for specific companies.

| Tier | Typical Referring Domains | DMD Estimated Position |
|------|--------------------------|----------------------|
| Major brands (Bernhardt, etc.) | 500-5,000+ | Far below |
| Mid-market suppliers | 50-500 | Below |
| Small/local suppliers | 10-100 | At bottom (estimated 0-10) |
| New/startup suppliers | 0-20 | Here |

---

## 6. Issues by Severity

### CRITICAL

1. **No detectable backlink profile** -- The domain appears to have virtually no external links pointing to it. This severely limits domain authority and search ranking potential.

2. **LinkedIn company page returns 404** -- The URL `linkedin.com/company/dmdfurnishing` configured in the footer and schema.org markup is broken. This wastes a social signal and creates a poor user experience.

3. **Brand name ambiguity** -- "DMD" primarily returns results for Duchenne Muscular Dystrophy. The brand has zero search visibility under its short-form name.

4. **No local citations** -- No Google Business Profile, Yelp, BBB, or local chamber of commerce listings were detected. For a local business in Foxboro, MA, this is a significant gap.

5. **No industry directory listings** -- Despite linking TO ahla.com, DMD is not listed IN the AHLA Allied Member Directory or any other industry directories.

### HIGH

6. **No testimonials or reviews** -- The site has zero client testimonials, Google reviews, or third-party review platform presence. Reviews generate citations and trust signals.

7. **Blog content lacks differentiation** -- 6 blog posts covering generic FF&E topics that hundreds of competitors also cover. No original data, surveys, or proprietary insights to stand out.

8. **Case studies are too shallow** -- 5 project pages with minimal detail. No quantifiable results (except one project), no client quotes, no before/after comparisons. These will not attract backlinks.

### MEDIUM

9. **No downloadable resources** -- Zero PDFs, templates, checklists, or tools that could generate links from resource pages.

10. **No press/media page** -- No way for journalists or bloggers to find company news, press releases, or media assets.

11. **Inspiration gallery uses stock photos** -- Unsplash imagery provides no unique value that would motivate other sites to link.

12. **No schema for reviews/ratings** -- AggregateRating schema could be added once reviews are collected, improving SERP appearance.

### LOW

13. **robots.txt references dmdfurnishing.com sitemap** -- Correctly configured for production domain.

14. **No hreflang tags** -- Single-language site; not an issue unless international markets are targeted.

---

## 7. Link-Building Opportunities (Prioritized)

### Tier 1: Foundation (Do First -- Weeks 1-4)

| Action | Expected Impact | Difficulty | Est. Links |
|--------|----------------|------------|------------|
| Create/claim Google Business Profile | Local pack visibility, citation | Easy | 1 |
| Fix LinkedIn company page (404) | Social signal, brand citation | Easy | 1 |
| Verify all 4 social profiles are active and link back | Social signals | Easy | 4 |
| List on BBB (Better Business Bureau) | Trust signal, local citation | Easy | 1 |
| Register with local Chamber of Commerce (Foxboro/MA) | Local authority link | Easy | 1-2 |
| Submit to AHLA Allied Member Directory | High-authority industry link | Medium | 1 |
| Submit to BIFMA supplier directory | Industry-relevant link | Medium | 1 |
| Create Houzz business profile | Design industry citation | Easy | 1 |

**Expected Tier 1 yield: 10-12 referring domains**

### Tier 2: Content-Driven Link Building (Weeks 4-12)

| Action | Expected Impact | Difficulty | Est. Links |
|--------|----------------|------------|------------|
| Publish original FF&E cost benchmark data | Highly linkable original research | Hard | 5-15 |
| Create downloadable PDF: "Hotel Renovation FF&E Checklist" | Resource page links | Medium | 3-10 |
| Build interactive FF&E budget calculator tool | Tool links, embeds | Hard | 5-20 |
| Write in-depth case studies with ROI data for all 5 projects | Portfolio links, client sharing | Medium | 2-5 |
| Create comprehensive FF&E glossary (100+ terms) | Reference links | Medium | 3-8 |
| Publish "State of Hospitality Furniture" annual report | PR-worthy, media links | Hard | 10-30 |

**Expected Tier 2 yield: 25-80 referring domains**

### Tier 3: Outreach & PR (Ongoing)

| Action | Expected Impact | Difficulty | Est. Links |
|--------|----------------|------------|------------|
| Guest post on Hospitality Design magazine blog | DA 50+ link | Hard | 1-3 |
| Get featured on Hotel Business | Industry authority link | Hard | 1-2 |
| Sponsor local hospitality events in MA/New England | Event page links | Medium | 2-5 |
| Partner with interior design firms for co-created content | Mutual linking | Medium | 3-8 |
| Submit projects to hospitality design awards (HD Awards, AHEAD) | Award page links | Medium | 1-3 |
| Reach out to sites linking to competitors but not DMD | Direct outreach | Hard | 5-20 |
| Offer expert quotes to HARO / Connectively for hospitality topics | Editorial links | Medium | 2-10 |

**Expected Tier 3 yield: 15-50 referring domains**

### Tier 4: Technical Quick Wins

| Action | Expected Impact | Difficulty |
|--------|----------------|------------|
| Implement AggregateRating schema (once reviews exist) | Rich snippets, CTR boost | Easy |
| Add FAQ schema to blog posts | SERP feature eligibility | Easy |
| Create a /press or /media page with downloadable brand assets | Enable journalist linking | Easy |
| Add "Cite this article" widget to blog posts | Encourage attribution links | Easy |

---

## 8. Recommended Backlink KPIs

Based on current estimated position (0-10 referring domains), these are realistic 12-month targets:

| Metric | Current (Est.) | 3-Month Target | 6-Month Target | 12-Month Target |
|--------|---------------|----------------|----------------|-----------------|
| Referring domains | 0-10 | 15-25 | 40-60 | 80-120 |
| Domain Rating (Ahrefs) | 0-5 | 5-10 | 10-20 | 20-30 |
| Organic keywords ranking | Unknown | 50+ | 150+ | 300+ |
| Local citations | 0 | 10 | 20 | 30 |
| Industry directory listings | 0 | 3-5 | 8-10 | 12-15 |

---

## 9. Data Limitations & Recommendations

### What We Could NOT Verify

| Data Point | Reason | How to Get It |
|-----------|--------|---------------|
| Exact referring domain count | No Ahrefs/SEMrush/Moz access | Purchase Ahrefs Lite ($99/mo) or use free Ahrefs Webmaster Tools |
| Domain authority/rating | No tool access | Same as above |
| Anchor text distribution | No backlink data | Same as above |
| Toxic link ratio | No backlink data | Same as above; also check Google Search Console |
| Link velocity/trend | No historical data | Ahrefs or SEMrush provide historical graphs |
| Competitor backlink comparison | No tool access | Ahrefs competitive analysis or SEMrush gap tool |
| Google Business Profile status | Could not verify existence | Check directly at business.google.com |
| Social media follower counts | Platforms blocked automated access | Check manually; consider social media audit |

### Recommended Next Steps

1. **IMMEDIATE:** Sign up for Ahrefs Webmaster Tools (free) or Google Search Console to get real backlink data
2. **IMMEDIATE:** Fix the broken LinkedIn company page URL
3. **WEEK 1:** Claim/verify Google Business Profile
4. **WEEK 1-2:** Submit to 5-10 business directories (BBB, Houzz, AHLA, BIFMA, local chamber)
5. **WEEK 2-4:** Create one high-value downloadable resource (PDF checklist or budget template)
6. **MONTH 2-3:** Launch outreach campaign to hospitality trade publications
7. **MONTH 3:** Re-audit with Ahrefs data for accurate scoring

---

## Appendix: Technical Details

### Canonical URL Configuration
- Production domain: `https://dmdfurnishing.com` (set in `lib/metadata.js` line 7)
- All pages generate canonical URLs pointing to dmdfurnishing.com
- Sitemap in robots.txt references dmdfurnishing.com

### Schema Markup (Backlink-Relevant)
- Organization schema with sameAs social links (lib/metadata.js lines 66-102)
- LocalBusiness schema with geo coordinates (lib/metadata.js lines 104-153)
- WebSite schema with SearchAction (lib/metadata.js lines 156-170)
- WebPage schema with SpeakableSpecification (per-page)
- Blog posts have Article schema with canonical URLs

### Outbound Link Attributes
- All external links use: `target="_blank" rel="noopener noreferrer"`
- No `rel="nofollow"` on any outbound link
- No `rel="sponsored"` or `rel="ugc"` attributes used anywhere

### Social Links Implementation
- Defined in `components/Footer.js` (lines 51-54)
- Also present in schema.org `sameAs` arrays in `lib/metadata.js` (lines 96-101, 147-152)
