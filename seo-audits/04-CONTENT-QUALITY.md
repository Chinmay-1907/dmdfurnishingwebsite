# Content Quality & E-E-A-T Audit - DMD Furnishing

**Date:** 2026-03-25
**Business Type:** B2B Commercial Furniture Manufacturer (Hospitality FF&E)
**Site Architecture:** React CRA SPA (client-side rendered)

---

## Overall Content Quality Score: 32/100

---

## 1. E-E-A-T Assessment

### Experience: 15/100
**What's present:**
- Projects page shows completed installations with images
- "Selected Projects" section on homepage with 3 project cards

**What's missing:**
- No detailed case studies with measurable outcomes (budget saved, timeline met, rooms furnished)
- No before/after comparisons
- No client testimonials with verifiable details (company names link to real businesses)
- No project timelines or scope documentation
- Testimonials in `Testimonials.js` appear to be placeholder content ("James Wilson, Grand Luxury Hotel") — not real, verifiable reviews
- `src/data/projects.js` — projects have `clientTestimonial` field but testimonials appear identical/templated across projects

### Expertise: 48/100
**What's present:**
- Correct industry terminology throughout: FF&E, casegoods, BOQ, HPL laminates, value engineering
- Detailed service descriptions in `Services.js` covering the full project lifecycle
- Materials section on homepage lists specific material types
- Product categorization shows deep understanding of hospitality segments

**What's missing:**
- No technical blog or knowledge base
- No whitepapers or guides (e.g., "How to spec hospitality furniture")
- No industry standards referenced (BIFMA, ANSI, fire codes)
- No manufacturing process detail beyond high-level descriptions

### Authoritativeness: 12/100
**What's present:**
- Consistent business identity (DMD Furnishing)
- Physical address and phone number

**What's missing:**
- No team page or founder bio
- No author profiles on any content
- No industry certifications displayed (ISO, BIFMA, sustainability certs)
- No press mentions or media coverage
- No partner/client logos
- No industry association memberships (NEWH, AHLA, ASID)
- No awards or recognitions
- No years in business stated
- No number of projects completed
- Social media links in footer but no verified social presence evidence

### Trustworthiness: 28/100
**What's present:**
- Physical address: 56 Leonard St Unit 5, Foxboro, MA 02035 (consistent across pages)
- Phone: +1 (617) 223-7781 (consistent)
- Email: Sales@DMDFurnishing.com (consistent)
- Website Policies page (`WebsitePolicies.js`)
- HTTPS enabled

**What's missing:**
- No BBB rating or accreditation
- No Google Business Profile link
- No customer reviews/ratings from third parties
- No insurance/licensing information
- No privacy policy (only "Website Policies" which covers Terms of Use)
- No GDPR/CCPA compliance statement
- Footer tagline "Luxury furniture solutions for discerning clients" (`Footer.js:12`) contradicts the B2B commercial positioning used everywhere else

---

## 2. Content Quality by Page

| Page | Est. Word Count | Primary Keyword | Content Depth | SEO Component | Score |
|------|----------------|-----------------|---------------|---------------|-------|
| Home | ~400 | hospitality furniture, FF&E | Good (8 sections) | Yes (duplicate) | 65/100 |
| About | ~500 | commercial furniture manufacturer | Good | Yes | 60/100 |
| Services | ~350 | furniture services, custom manufacturing | Good | Yes (dual system conflict) | 55/100 |
| Products (root) | ~100 | commercial furniture | Thin (nav only) | Yes | 30/100 |
| Product Detail | Varies | product name + category | Varies by XML data | Yes | 40/100 |
| Projects | ~150 | furniture projects, installations | Thin (card grid) | Yes (setPageSEO) | 35/100 |
| Project Detail | ~300 | project name + category | Moderate | Yes (setPageSEO) | 50/100 |
| Contact | ~200 | contact, consultation | Adequate for type | Yes | 55/100 |
| Schedule Call | ~400 | consultation, FF&E specialist | Good (FAQ section) | **MISSING** | 45/100 |
| Inspirations | ~200 | design inspirations | Moderate | **MISSING** | 30/100 |
| Inspiration Detail | ~150 | specific inspiration | Thin | **MISSING** | 25/100 |
| Website Policies | ~300 | N/A | Adequate | Yes | 40/100 |

---

## 3. Thin Content Detection

### Critical Thin Pages

| Page | Issue | File:Line |
|------|-------|-----------|
| Products root (`/products`) | Just category cards, ~100 words | `Products.js:540-555` |
| Projects listing (`/projects`) | Card grid with ~20-word descriptions per project | `Projects.js:95-155` |
| Inspiration Detail pages | ~150 words, mostly lists | `InspirationDetail.js:130-175` |
| Product category pages | Navigation-only with background images | `Products.js:410-470` |

### Product Description Quality
Product descriptions come from `DMD_Website.xml` attributes. Quality varies:
- Some products have detailed descriptions
- Some have only a product name with no description (`description=""`)
- No user reviews, specifications depth, or comparison content

### Project Description Quality
From `src/data/projects.js`:
- Projects have `fullDescription` but some are very short (~50 words)
- `highlights` array is good but generic across projects
- `clientTestimonial` appears templated/fake across all projects

---

## 4. Duplicate Content Issues

### 4.1 Identical Testimonial Across Projects
**Severity:** High
**File:** `src/data/projects.js`
**Issue:** The `clientTestimonial` content appears identical or near-identical across all 4+ projects. Placeholder testimonials damage E-E-A-T.

### 4.2 Duplicate Organization Schema
**Severity:** Medium
**Files:** `src/components/SEO.js:7-28` vs `src/components/Home.js:84-104`
**Issue:** Organization schema defined twice with slight differences (Home.js includes email field).

### 4.3 Repeated "What Sets Us Apart" Content
**Severity:** Low
**Files:** `Home.js:193-230` and `AboutUs.js:185-210`
**Issue:** Similar differentiator content appears on both pages.

### 4.4 Footer Tagline Inconsistency
**Severity:** Medium
**File:** `Footer.js:12`
**Issue:** "Luxury furniture solutions for discerning clients" is a B2C luxury positioning. The rest of the site is B2B commercial/hospitality. This confuses brand signals.

---

## 5. Content Gaps

### Missing Page Types
| Content Type | Competitor Standard | Priority |
|-------------|-------------------|----------|
| Blog / Knowledge Base | All major competitors have one | Critical |
| Detailed Case Studies | Expected for B2B | Critical |
| Team / Leadership Page | Standard for B2B trust | High |
| FAQ Page (standalone) | Common for service businesses | High |
| Client Logo Wall | B2B social proof standard | High |
| Certifications Page | Industry trust signal | Medium |
| Manufacturing Process Page | Differentiator content | Medium |
| Sustainability / CSR Page | Growing industry expectation | Medium |
| Video Content | Project walkthroughs, factory tours | Medium |
| Careers Page | Company credibility signal | Low |

### Missing Content Elements
| Element | Where It Should Be | Priority |
|---------|-------------------|----------|
| Real client testimonials with names/companies | Projects, Home | Critical |
| Quantifiable results (# rooms, $ saved, timeline) | Case studies | Critical |
| Industry certifications (BIFMA, ISO) | About, Footer | High |
| Years in business | About, Home | High |
| Number of projects completed | About, Home | High |
| Partner/supplier logos | About, Home | Medium |
| Material specification guides | Services, Products | Medium |
| Project timeline examples | Services | Medium |

---

## 6. AI Citation Readiness: 18/100

### Why So Low
1. **Rendering blocker** — All content invisible to AI crawlers (0 points for accessibility)
2. **No Q&A formatted content** except ScheduleCall FAQ (which lacks schema)
3. **No statistical claims** with sources
4. **No unique research or data** — all content is descriptive, not analytical
5. **No definition-style content** that AI could extract as authoritative answers

### What Would Score Well (If Rendered)
- ScheduleCall FAQ section has 6 clear Q&A pairs
- Services page has structured process steps
- Product categorization is clear and hierarchical
- Industry terminology is correctly used

### Recommendations for Citability
1. Add answer-first formatting to service descriptions
2. Create FAQ pages with structured Q&A for each service area
3. Add statistics: "Furnished X+ hotel rooms", "Completed Y projects in Z states"
4. Create glossary content (FF&E definition, casegood types, etc.)
5. Ensure all content is pre-rendered for crawler access

---

## 7. Prioritized Recommendations

### Critical
1. **Add real, verifiable testimonials** — Replace placeholder testimonials in `projects.js` with actual client quotes
2. **Create a blog/knowledge base** — Hospitality furniture guides, specification advice, trend content
3. **Add team/leadership page** — Founder bio, key team members, headshots
4. **Fix footer tagline** — Change from "Luxury furniture solutions for discerning clients" to match B2B positioning
5. **Add SEO to 3 missing pages** — ScheduleCall, Inspirations, InspirationDetail

### High
6. Add industry certifications and association memberships
7. Add years in business and project count to About page
8. Create standalone FAQ page from ScheduleCall content
9. Add client logo wall to Homepage and About
10. Create 2-3 detailed case studies with measurable outcomes
11. Fix Services.js dual SEO system conflict
12. Shorten Services meta description to <160 chars

### Medium
13. Add manufacturing process content with photos
14. Enrich thin product descriptions in XML
15. Add sustainability/materials sourcing content
16. Create project comparison content (before/after)
17. Add specification guides for key product categories

### Low
18. Add video content (factory tour, project walkthroughs)
19. Create careers page
20. Add press/media mentions section
21. Consolidate duplicate "What Sets Us Apart" content
22. Add partner/supplier logos

---

*Generated by Content Quality & E-E-A-T Audit*
