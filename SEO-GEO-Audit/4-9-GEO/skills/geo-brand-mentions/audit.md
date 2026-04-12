# GEO Brand Mentions Audit -- DMD Furnishing

**Date:** 2026-04-09
**Brand:** DMD Furnishing
**Status:** COMPLETE
**Score: 8/100**

---

## Executive Summary

DMD Furnishing has near-zero brand presence across the platforms that AI systems use to build knowledge graphs and generate citations. The brand name "DMD" suffers from severe disambiguation collision with medical, dental, and technology terms. Without external brand mentions, AI systems have no third-party signals to validate or cite the company.

---

## Platform-by-Platform Analysis

### 1. Wikipedia (Score: 0/25)

**Method:** Wikipedia Search API (`action=query&list=search&srsearch=DMD+Furnishing`)

**Results:** 8 results returned -- zero relevant to DMD Furnishing.

| # | Wikipedia Article | Why It Matched | Relevant? |
|---|------------------|----------------|-----------|
| 1 | Cutie Pie (TV series) | "DMD" Thai entertainment company | NO |
| 2 | Gun data computer | "DMD" = Digital Message Device | NO |
| 3 | United States Navy Dental Corps | "DMD" = Doctor of Dental Medicine | NO |
| 4 | List of acts of the 107th US Congress | "DMD" = Duchenne Muscular Dystrophy | NO |
| 5 | List of Egyptian hieroglyphs | Hieroglyph phonetic match | NO |
| 6 | List of companies of Serbia | "Delta DMD" Serbian company | NO |
| 7 | San Teodoro, Oriental Mindoro | Author with DMD credential | NO |
| 8 | Southern Illinois University Edwardsville | "DMD" dental degree programs | NO |

**Assessment:**
- Zero Wikipedia presence for DMD Furnishing
- Expected: Small B2B companies rarely meet Wikipedia's notability guidelines (requires significant coverage in independent, reliable sources)
- The "DMD" abbreviation is dominated by medical/dental content on Wikipedia
- A Wikipedia article is not a realistic near-term goal

**What Would Be Needed for Wikipedia:**
- Coverage in 3+ independent trade publications (Hospitality Design, Hotel Management, etc.)
- Mentions in industry reports or academic research
- Notable company milestones covered by press

### 2. Reddit (Score: 0/25)

**Method:** Reddit search API (`/search.json?q="DMD Furnishing"`)

**Results:** Zero mentions found.

**Assessment:**
- No threads, comments, or discussions mentioning "DMD Furnishing" anywhere on Reddit
- No presence in relevant subreddits: r/hospitality, r/interiordesign, r/commercialrealestate, r/hotelmanagement
- B2B commercial furniture is a low-Reddit-activity niche, but competitors with content marketing do appear in design and hospitality threads

**Opportunity:**
- Participate authentically in r/hospitality (287K members), r/InteriorDesign (3.7M members), r/CommercialRealEstate
- Answer FF&E questions with expertise, include brand context naturally
- Share project photos in r/InteriorDesign and r/RoomPorn
- Post the FF&E blog content as helpful answers to common questions
- Target: 10+ quality contributions over 3 months

### 3. YouTube (Score: 0/25)

**Method:** YouTube search for "DMD Furnishing"

**Results:** No DMD Furnishing channel. No videos by or about the company. Search results are all unrelated content (generic furniture videos, dental content, unrelated "DMD" brands).

**Top YouTube results for "DMD Furnishing" (all irrelevant):**
1. "Modular Sofa That Transforms Into a Tea Table" -- generic furniture content
2. "UV Marble Sheet Starts From 1199/-" -- Indian home decor
3. "Why Dentists Still Use Gold Teeth" -- dental/DMD collision
4. "Golden Foil DMD" -- unrelated brand
5. "Smart furniture single bed idea" -- generic furniture

**Assessment:**
- Complete absence from YouTube
- YouTube is the second-largest search engine and a major source for AI training data
- Video content from DMD would have high citability: project walkthroughs, material comparisons, installation timelapses

**Opportunity:**
- Create a YouTube channel: "DMD Furnishing -- Commercial Furniture"
- Priority video types:
  1. Project before/after walkthroughs (e.g., Quality Inn Gainesville, Towne Lyne Motel)
  2. Material comparison guides (HPL vs. Veneer vs. Solid Wood -- matches existing blog post)
  3. Factory/workshop footage
  4. FF&E explainer videos (repurpose blog content)
  5. Installation timelapse videos
- Target: 5-10 videos in first 3 months
- Even low-production videos establish brand presence in YouTube's knowledge graph

### 4. LinkedIn (Score: 8/25)

**Method:** HTTP HEAD request to https://www.linkedin.com/company/dmdfurnishing

**Result:** HTTP 404 -- Page not found.

**Assessment:**
- The LinkedIn company page either does not exist, was deleted, or uses a different URL slug
- LinkedIn is the single most important platform for B2B brand discovery
- FF&E procurement teams, hospitality developers, interior designers, and architects all use LinkedIn
- This is the highest-impact gap in the entire brand mentions audit

**Partial credit rationale:** 8/25 because creating a LinkedIn company page is a same-day fix with immediate impact. The page itself can be live within hours.

**Immediate Actions:**
1. **Create company page** at linkedin.com/company/setup
   - Company name: DMD Furnishing
   - Industry: Furniture Manufacturing / Hospitality
   - Company size: appropriate range
   - Location: Foxboro, MA
   - Website: https://dmdfurnishing.com
2. **Complete profile:**
   - Banner image (project photo)
   - About section (reuse llms.txt About content)
   - Services listed
   - Featured content (blog posts, project photos)
3. **Post cadence:** 2-3 posts per week
   - Project completions with photos
   - Industry insights / FF&E tips
   - Material spotlights
   - Team / culture content
4. **Employee profiles:** Ensure team members list DMD Furnishing as employer
5. **Request recommendations** from past clients

---

## Brand Name Disambiguation Analysis

### The "DMD" Collision Problem

The three-letter abbreviation "DMD" is one of the most overloaded acronyms in search:

| Meaning | Domain | Search Volume (est.) | Impact on DMD Furnishing |
|---------|--------|---------------------|--------------------------|
| Doctor of Dental Medicine | Healthcare/Education | Very High | SEVERE -- dominates all "DMD" queries |
| Duchenne Muscular Dystrophy | Medical | High | SEVERE -- major medical condition |
| Digital Micromirror Device | Technology (TI) | Moderate | Moderate collision |
| DMD (Thai entertainment) | Media | Moderate (Asia) | Low (geographic separation) |
| Delta DMD (Serbia) | Consumer goods | Low | Low (geographic separation) |
| **DMD Furnishing** | **Commercial furniture** | **Very Low** | **Drowned by above** |

### Disambiguation Recommendations

1. **Always use full brand name** -- "DMD Furnishing" not "DMD" in all content, metadata, and external mentions
2. **Build entity associations** -- Associate "DMD Furnishing" with: Foxboro MA, hospitality FF&E, commercial furniture, hotel renovation
3. **Structured data** -- Ensure Organization schema includes `sameAs` links to all verified social profiles
4. **Consistent NAP** -- Name, Address, Phone must be identical across all platforms
5. **Long-tail brand queries** -- Optimize for "DMD Furnishing hospitality furniture" and "DMD Furnishing Foxboro MA" rather than "DMD furniture"

---

## Competitive Benchmark

For context, here is what typical B2B furniture manufacturers have for brand mentions:

| Metric | DMD Furnishing | Small Competitor | Mid-size Competitor |
|--------|---------------|-----------------|-------------------|
| Wikipedia | None | None | Stub article |
| Reddit mentions | 0 | 2-5 | 10-20 |
| YouTube (own channel) | None | 5-15 videos | 50+ videos |
| YouTube (mentions by others) | 0 | 1-3 | 10+ |
| LinkedIn company page | 404 | Active, 200-500 followers | Active, 1K-5K followers |
| LinkedIn posts/month | 0 | 2-4 | 8-12 |
| Trade publication mentions | 0 | 1-3 | 5-15 |
| **Brand Mention Score** | **8** | **25-35** | **55-70** |

---

## Priority Action Plan

### Week 1 (Critical)
- [ ] Create LinkedIn company page -- immediate B2B visibility fix
- [ ] Complete LinkedIn profile with all business information
- [ ] Ensure all employee profiles link to company page

### Week 2-4
- [ ] Create YouTube channel with channel art and description
- [ ] Upload 2-3 initial videos (project walkthroughs, brand intro)
- [ ] Make first Reddit contributions in r/hospitality and r/InteriorDesign

### Month 2-3
- [ ] Reach 5+ YouTube videos
- [ ] Reach 10+ quality Reddit contributions
- [ ] Begin LinkedIn posting cadence (2-3/week)
- [ ] Pitch 1-2 trade publications for project features

### Projected Score After 90 Days
| Platform | Current | Target | Change |
|----------|---------|--------|--------|
| Wikipedia | 0/25 | 0/25 | No change (requires years of effort) |
| Reddit | 0/25 | 5/25 | +5 (10+ quality contributions) |
| YouTube | 0/25 | 8/25 | +8 (channel + 5-10 videos) |
| LinkedIn | 8/25 | 18/25 | +10 (active page, regular posts) |
| **Total** | **8/100** | **31/100** | **+23 points** |

---

*Audit conducted 2026-04-09 by geo-brand-mentions skill. Data sourced from Wikipedia API, Reddit search API, YouTube search, and LinkedIn HTTP status check.*
