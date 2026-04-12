# GEO Platform Optimizer -- Optimization Audit

**URL:** https://dmdredesign.netlify.app (production: dmdfurnishing.com)
**Date:** 2026-04-09
**Status:** COMPLETE
**Source:** geo-platform-analysis agent audit findings

---

## Current State: Platform Readiness Scores

| Platform | Score | Grade |
|----------|-------|-------|
| Google AI Overviews | 44/100 | D+ |
| Google Gemini | 35/100 | D |
| Bing Copilot | 34/100 | D |
| ChatGPT Web Search | 32/100 | D |
| Perplexity AI | 28/100 | F |
| **Overall Average** | **34.6/100** | **D** |

---

## Optimization Matrix: What to Fix, Where, and Why

### ON-SITE OPTIMIZATIONS (Directly implementable in codebase)

#### 1. Direct-Answer Paragraph Blocks (Google AIO: +10 points)

**Problem:** Blog posts have question-based H2 headings but answers are multi-paragraph, making them too long for Google AI Overviews to extract cleanly.

**Fix:** After every question-based H2, insert a single paragraph of 40-60 words that directly and concisely answers the question. Follow it with expanded detail.

**Pattern:**
```html
<h2>What Is Included in FF&E?</h2>
<p data-speakable class="direct-answer">
  FF&E includes all movable furniture, permanently attached fixtures, and
  operational equipment in a commercial space. In hospitality, this covers
  beds, dressers, lighting, bathroom fixtures, lobby seating, and dining
  furniture -- everything a guest sees and touches.
</p>
<!-- Expanded detail follows -->
```

**Pages to update:**
- /blog/what-is-ffe-hospitality (5 question H2s)
- /blog/hotel-guestroom-furniture-checklist
- /blog/value-engineering-commercial-furniture
- /blog/restaurant-seating-guide
- /blog/hpl-veneer-solid-wood-hotel-casegoods
- /blog/ffe-procurement-timeline

---

#### 2. HTML Comparison Tables (Google AIO: +8, Bing Copilot: +8)

**Problem:** Content contains prose comparisons but no HTML tables. Both Google AIO and Bing Copilot preferentially extract and display tabular data.

**Fix:** Add `<table>` elements for every comparison discussed in blog posts.

**Tables to create:**

| Blog Post | Table Content |
|-----------|---------------|
| what-is-ffe-hospitality | FF&E vs. OS&E comparison (scope, examples, budget allocation, owner vs. operator responsibility) |
| hpl-veneer-solid-wood-hotel-casegoods | HPL vs. Veneer vs. Solid Wood (durability, cost, appearance, best use case, maintenance) |
| value-engineering-commercial-furniture | Original spec vs. value-engineered spec examples (material, cost, durability trade-offs) |
| restaurant-seating-guide | Seating types comparison (booth vs. banquette vs. chair -- space efficiency, cost, comfort, durability) |

---

#### 3. Named Author Bios (ChatGPT: +8, Gemini: +8, all platforms: +5 each)

**Problem:** Blog articles attribute authorship to "DMD Furnishing" (Organization), not to a named individual. AI platforms weight named human experts with credentials significantly higher.

**Fix:** Add Person schema and visible author bio section to each blog post.

**Schema addition:**
```json
{
  "@type": "Person",
  "name": "[Actual Team Member Name]",
  "jobTitle": "[e.g., Senior FF&E Consultant]",
  "worksFor": {"@id": "https://dmdfurnishing.com/#organization"},
  "description": "[1-2 sentence expertise summary]"
}
```

**Visible bio block:** Add a short author card at the end of each article with name, title, photo, and 2-3 sentence expertise description.

---

#### 4. HowTo Schema on Process Blog Posts (Google AIO: +3, Gemini: +2)

**Problem:** Blog posts describing step-by-step processes (procurement timeline, value engineering) lack HowTo schema. The Services page has HowTo schema, but the blog posts that describe processes in detail do not.

**Fix:** Add HowTo structured data to:
- /blog/ffe-procurement-timeline
- /blog/value-engineering-commercial-furniture

---

#### 5. IndexNow Protocol (Bing Copilot: +8, ChatGPT via Bing: +5)

**Problem:** No IndexNow implementation. Bing created this protocol and prioritizes sites using it.

**Fix:** 
1. Generate an IndexNow API key
2. Host the key file at `/.well-known/{key}.txt` or `/{key}.txt`
3. Implement server-side IndexNow pings on content publish/update
4. Add to Next.js middleware or build hook

---

#### 6. Bing Webmaster Tools Verification (Bing Copilot: +5, ChatGPT: +3)

**Problem:** No msvalidate.01 meta tag. Site is not verified in Bing Webmaster Tools.

**Fix:** Add to the site's `<head>`:
```html
<meta name="msvalidate.01" content="[BWT_VERIFICATION_CODE]" />
```

Then submit sitemap in Bing Webmaster Tools dashboard.

---

#### 7. Product Schema for Individual Items (Google AIO: +3, Gemini: +2, Bing: +2)

**Problem:** Products page uses CollectionPage schema but individual products lack Product schema with attributes (name, description, category, image, offers).

**Fix:** Add Product structured data for each product listing, even if price is "Contact for quote."

---

### OFF-SITE OPTIMIZATIONS (External actions required)

#### 8. Google Business Profile (Gemini: +15, Google AIO: +8, Bing: +3)

**Priority: CRITICAL -- Highest single-action impact**

**Problem:** No GBP exists. Google Gemini uses GBP as a primary data source for local business queries. Without it, DMD is invisible to "furniture manufacturer near me" and similar queries across Google surfaces.

**Actions:**
1. Create GBP at business.google.com
2. Verify the Foxboro, MA address (56 Leonard St Unit 5)
3. Select primary category: "Furniture Manufacturer" or "Commercial Furniture Supplier"
4. Add secondary categories: "Interior Designer", "Furniture Store"
5. Upload 20+ photos (facility, products, installations, team)
6. Add all services as structured GBP services
7. Request reviews from past clients

---

#### 9. Fix LinkedIn Company Page (All platforms: +26 combined)

**Priority: CRITICAL -- Currently actively harmful**

**Problem:** linkedin.com/company/dmdfurnishing returns 404. This URL is listed in sameAs schema on every page. Bing Copilot and ChatGPT use LinkedIn as a primary business entity verification source. A 404 sameAs link actively degrades entity confidence.

**Actions:**
1. Create or reclaim the LinkedIn company page at linkedin.com/company/dmdfurnishing
2. Complete all profile sections (about, location, industry, size, specialties)
3. Add logo and banner image
4. Post at least 3-5 initial updates
5. Connect employee profiles

---

#### 10. Wikidata Entity Creation (ChatGPT: +12, Gemini: +8, all platforms: +33 combined)

**Priority: HIGH -- Entity disambiguation is critical**

**Problem:** No Wikidata entry exists. The "DMD" abbreviation is completely dominated by Duchenne Muscular Dystrophy. Without a Wikidata entry, AI platforms cannot distinguish DMD Furnishing from the medical condition.

**Actions:**
1. Create Wikidata item for "DMD Furnishing"
2. Set instance of: "furniture manufacturer" (Q893236)
3. Set headquarters location: Foxboro, Massachusetts
4. Set official website: dmdfurnishing.com
5. Add "different from" relation to DMD (Duchenne Muscular Dystrophy)
6. Add industry: furniture manufacturing, hospitality

---

#### 11. Reddit Community Presence (Perplexity: +12, Google AIO: +3, ChatGPT: +2)

**Priority: HIGH -- Perplexity's primary signal**

**Problem:** Zero Reddit mentions. Perplexity weights Reddit and community forum mentions above almost all other signals.

**Actions:**
1. Create Reddit account with professional username
2. Participate genuinely in: r/hospitality, r/hoteliers, r/interiordesign, r/commercialrealestate, r/smallbusiness
3. Answer FF&E questions with helpful, detailed responses
4. Share blog content only when directly relevant and helpful (not spammy)
5. Goal: 10+ genuine participatory comments before any link sharing

---

#### 12. Backlink Building (Google AIO: +15, all platforms: +46 combined)

**Priority: HIGH -- Affects organic rankings which feed all AI platforms**

**Problem:** Zero backlinks. This is the fundamental authority signal that all platforms use either directly or indirectly.

**Target sources:**
- Hospitality industry publications (Hotel Business, Hospitality Design, HD Magazine)
- Local business directories (Foxboro/MA Chamber of Commerce, MassEcon)
- Design/architecture blogs and publications
- Supplier/partner websites
- Industry association memberships (NEWH, AHLA)

---

#### 13. YouTube Channel (Gemini: +10, Google AIO: +3, Perplexity: +2)

**Problem:** No YouTube presence. Gemini gives YouTube content preferential treatment as a Google property.

**Video content ideas:**
1. "How Hotel Furniture Is Made" -- manufacturing process walkthrough
2. "FF&E Explained in 3 Minutes" -- educational short
3. "Before & After: Hotel Room Renovation" -- project showcase
4. "Choosing the Right Material for Hotel Casegoods" -- expert explainer
5. "Inside Our Foxboro Workshop" -- facility tour

---

#### 14. Business Directory Submissions (ChatGPT: +5, Bing: +3, all: +15 combined)

**Problem:** No presence on business directories that AI platforms reference for entity validation.

**Submit to:**
- BBB (Better Business Bureau)
- Houzz (critical for Perplexity + design queries)
- Crunchbase
- Manta
- ThomasNet (manufacturing directory)
- Kompass (B2B directory)
- Industry-specific: NEWH directory, AHLA supplier directory

---

## Implementation Priority Matrix

| Priority | Action | Effort | Impact | Platforms |
|----------|--------|--------|--------|-----------|
| P0 | Fix LinkedIn page | 1 hour | HIGH | All 5 |
| P0 | Create Google Business Profile | 2 hours | CRITICAL | 3/5 |
| P0 | Add Bing Webmaster Tools verification | 30 min | MEDIUM | 2/5 |
| P1 | Create Wikidata entry | 2 hours | HIGH | All 5 |
| P1 | Add direct-answer paragraphs | 3 hours | HIGH | 2/5 |
| P1 | Add comparison tables | 2 hours | HIGH | 2/5 |
| P1 | Implement IndexNow | 2 hours | MEDIUM | 2/5 |
| P2 | Add named author bios + Person schema | 3 hours | MEDIUM | All 5 |
| P2 | Start Reddit participation | Ongoing | HIGH | 3/5 |
| P2 | Submit to business directories | 4 hours | MEDIUM | 3/5 |
| P3 | Launch YouTube channel | 20+ hours | HIGH | 3/5 |
| P3 | Build backlinks | Ongoing | CRITICAL | All 5 |
| P3 | Add HowTo schema to blog posts | 1 hour | LOW | 2/5 |
| P3 | Add Product schema | 4 hours | MEDIUM | 3/5 |

---

## Expected Score Trajectory

| Milestone | Timeline | Avg Score | Lift |
|-----------|----------|-----------|------|
| Current state | Now | 34.6 | -- |
| After P0 actions | Week 1-2 | 44.0 | +9.4 |
| After P0 + P1 actions | Week 3-4 | 51.0 | +16.4 |
| After P0-P2 actions | Month 2 | 55.4 | +20.8 |
| After all actions sustained | Month 3+ | 65.4 | +30.8 |
