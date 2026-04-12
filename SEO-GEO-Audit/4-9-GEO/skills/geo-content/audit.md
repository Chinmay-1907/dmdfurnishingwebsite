# GEO Content & E-E-A-T Audit Report
**Site:** https://dmdredesign.netlify.app (DMD Furnishing)
**Date:** 2026-04-09
**Agent:** geo-content
**Focus:** AI citation readiness, E-E-A-T compliance, passage extractability

---

## Overall Content Score: 68/100

### E-E-A-T Breakdown

| Dimension | Score | Max | Assessment |
|-----------|-------|-----|------------|
| Experience | 14 | 25 | Project gallery exists (Quality Inn, Towne Lyne Motel) but no case studies with specific outcomes, timelines, or lessons learned. "Before/After" section is a strong experience signal but lacks quantified results. |
| Expertise | 18 | 25 | Blog posts show genuine technical depth (FF&E procurement process, commercial specs, BIFMA references). However, no individual author attribution, no credentials, no "written by" bylines. All content attributed to "DMD Furnishing" as organization. |
| Authoritativeness | 12 | 25 | No external citations or backlinks visible. References to AHLA, BIFMA, Hospitality Design, and Hotel Business are name-drops without hyperlinks to source material. No media mentions, awards, certifications, or industry association memberships displayed. No third-party reviews or testimonials. |
| Trustworthiness | 24 | 25 | HTTPS active. Full contact info (address, phone, email). Privacy policy exists at /website-policies. Physical address verified in schema. Social media links present. Only deduction: no individual names behind the company. |
| **TOTAL** | **68** | **100** | |

---

## Page-by-Page Analysis

### 1. Homepage (/)
**Content Score: 62/100**

#### Citability Assessment
- **Opening statement:** "Custom Hospitality Furniture -- Designed. Manufactured. Delivered." -- Marketing tagline, NOT extractable as a factual citation.
- **Best citable passage:** The FAQ answer: "FF&E stands for Furniture, Fixtures & Equipment -- the movable items in a commercial space such as beds, desks, chairs, lighting, and accessories that are not permanently attached to the structure. For hotels, restaurants, and offices, FF&E typically represents 15-25% of total construction costs and directly shapes guest experience and brand consistency."
  - **Citability: 8/10** -- Self-contained, factual, direct answer format. Includes a specific percentage range. References AHLA.
- **Project stats:** "0+ Rooms Renovated, 0+ Completed Projects, 0+ Products" -- **These counters render as zero in SSR**, which is a critical AI extraction failure. An AI system reading the HTML would see "0+" for all metrics, not the animated values.
- **Who We Serve section:** Lists 7 market categories with product counts -- extractable but thin.
- **Why DMD section:** 6 value propositions with descriptions. Self-contained and extractable.
- **How We Work:** 6-step process clearly numbered. Good extractability for process-based queries.
- **FAQ section:** 6 questions with substantive answers. Best AI-citable content on the page.

#### AI Extraction Issues
1. **CRITICAL: Counter values render as "0+" in static HTML.** AI crawlers that do not execute JavaScript will extract "0+ Rooms Renovated" as the factual claim.
2. No FAQ schema markup on homepage despite having FAQ content (schema exists on about/services pages but NOT homepage).
3. Speakable markup present in schema -- good for voice assistant extraction.

#### Freshness
- No visible date on the homepage. Schema shows no datePublished/dateModified.

---

### 2. About Page (/about)
**Content Score: 65/100**

#### Citability Assessment
- **Opening:** "A commercial furniture manufacturer based in Foxboro, Massachusetts -- providing custom FF&E solutions for hotels, restaurants, offices, and institutional spaces nationwide." **Citability: 7/10** -- Good entity description, directly extractable.
- **Our Story:** Describes company mission but avoids specific founding date, founder names, or history milestones. An AI system cannot extract "when was DMD Furnishing founded?" from this page.
- **How We're Different:** 6 differentiators with descriptions. Clear, structured, extractable.
- **Materials section:** HPL, Engineered Wood, Solid Wood, Metal, Hardware -- each with a brief description. **Citability: 7/10** -- Good for "what materials are used in hotel furniture" queries.
- **FAQ section:** 4 questions with answers. FAQPage schema IS present -- good.

#### AI Extraction Issues
1. No founding year, no founder names, no team member bios.
2. No certifications or industry memberships listed.
3. No specific project outcomes or metrics (e.g., "completed 500 rooms for Marriott").

#### Freshness
- Copyright says 2026. No specific page date.

---

### 3. Services Page (/services)
**Content Score: 72/100**

#### Citability Assessment
- **Opening:** "End-to-end furniture solutions for hotels, restaurants, healthcare, and commercial spaces -- design, manufacturing, logistics, and installation managed under one roof." **Citability: 7/10**
- **Service descriptions:** 6 service categories, each with bullet points. Well-structured for extraction.
  - "Consultation & Project Discovery" -- 3 sub-bullets
  - "Design Support & Specifications" -- 3 sub-bullets
  - "Manufacturing & Sourcing" -- 3 sub-bullets
  - "FF&E Project Management" -- 3 sub-bullets
  - "Logistics & Delivery Coordination" -- 3 sub-bullets
  - "Installation & Close-out" -- 3 sub-bullets
- **Industries We Serve:** 7 industries listed with descriptions. **Citability: 8/10** -- Structured, categorical, extractable.
- **FAQ section:** 8 questions with substantive answers. Best FAQ depth on the site.
- **Schema:** Service schema markup present with ItemList -- excellent for structured extraction.

#### AI Extraction Issues
1. "Most projects run 9-12 weeks" -- Good specific claim, but no source or basis provided.
2. No case studies or client references within service descriptions.

#### Freshness
- No visible date.

---

### 4. Blog: What Is FF&E? (/blog/what-is-ffe-hospitality)
**Content Score: 82/100** (Best on site)

#### Citability Assessment
- **Opening definition:** "FF&E -- Furniture, Fixtures & Equipment -- refers to every movable, non-structural element specified and installed during a hospitality fit-out." **Citability: 9/10** -- Perfect direct-answer format for "what is FF&E" queries.
- **What Is Included in FF&E:** Comprehensive categorized list (Furniture, Fixtures, Equipment) with specific items under each. **Citability: 9/10** -- This is the kind of structured, authoritative list AI systems extract and cite.
- **FF&E vs. OS&E:** "A practical rule of thumb: if you replace it once per renovation cycle, it's FF&E. If you reorder it every quarter, it's OS&E." **Citability: 9/10** -- Original phrasing, memorable, answers a common confusion.
- **Budget section:** "Lead times for custom commercial furniture range from 10 to 16 weeks on average" **Citability: 8/10** -- Specific, factual, attributable.
- **Pro Tip box:** "Start FF&E procurement well before construction reaches finish-out -- late procurement is one of the most common causes of delayed hotel openings and costly expedite fees." **Citability: 8/10**
- **External references:** AHLA, BIFMA, Hospitality Design -- name-dropped but only BIFMA is hyperlinked.
- **FAQ section:** 4 questions with substantive answers. Article schema with FAQ.

#### AI Extraction Issues
1. Author listed as "DMD Furnishing" organization, not an individual expert.
2. "FF&E typically represents 15-25% of total construction costs" -- no source citation for this specific statistic. An AI system may hesitate to cite an unsourced percentage.
3. datePublished: 2026-03-28, dateModified: 2026-03-28 -- both same date, no update signal.

#### Freshness
- Published: March 28, 2026. Visible on page. Article schema includes dates. Adequate.

---

### 5. Blog: Hotel Guestroom Furniture Checklist (/blog/hotel-guestroom-furniture-checklist)
**Content Score: 80/100**

#### Citability Assessment
- **Opening:** "Every hotel guestroom requires a defined set of furniture pieces to meet brand standards, pass franchisor inspection, and deliver the guest experience the property promises." **Citability: 8/10**
- **Stats box:** "11+ Essential Pieces Per Room, 4 Core Furniture Categories, 100% Custom Sizing Available" **Citability: 7/10** -- Structured, quotable.
- **Individual item descriptions:** Each furniture piece (Headboard, Bed Frame, Night Stand, Dresser, Desk, Luggage Bench, Desk Chair, Lounge Chair, TV Media Panel, Amenity Tower, Vanity) gets a dedicated paragraph with specific commercial specs. **Citability: 8/10** -- Excellent depth per item. Specific dimensions mentioned (e.g., nightstand height "26-30 inches").
- **Complete Checklist:** Bullet list of all items with quantities. **Citability: 9/10** -- Perfect for "hotel room furniture list" queries.
- **Pro Tip:** "Media panels are among the first casegoods to enter shop drawing production. Confirm your TV size specification..." **Citability: 8/10** -- Specific, practical, experience-based.
- **FAQ section:** 4 questions including "What furniture is standard in a hotel guestroom?" with a comprehensive answer.

#### AI Extraction Issues
1. Same author issue -- organization, not individual.
2. Reference to "Hotel Business" publication but no hyperlink.
3. Same publish date as all other blog posts (2026-03-28).

#### Freshness
- Published: March 28, 2026. Visible on page.

---

### 6. Products: Hotel (/products/hotel)
**Content Score: 28/100** (Worst on site)

#### Citability Assessment
- **Opening:** "Hotel furniture collection" -- 3 words. Not citable.
- **Product listings:** 46 products listed by name only (e.g., "2-Seater Table," "Amenity Tower," "King Bed Frame - Metal"). No descriptions, no specifications, no pricing, no dimensions.
- **Category stats:** "7 Spaces, 21 Categories, 180 Products" -- extractable but thin.
- **CTA:** "Our FF&E project management team can guide your selection from specification through delivery." -- One sentence.
- **Total extractable text:** Under 100 words excluding product names and navigation.

#### AI Extraction Issues
1. **CRITICAL: Product pages are pure catalog listings with zero descriptive content.** An AI system cannot learn anything about DMD's hotel furniture beyond product names and categories.
2. No product descriptions, no material info, no dimensions, no pricing ranges.
3. No product schema markup (no Product type in JSON-LD).
4. Meta description is generic: "Hotel furniture collection Browse all hotels & motels furniture products." -- Not a useful citation source.
5. Individual product pages likely needed but not evaluated (not in scope).

#### Freshness
- No dates visible. No datePublished in schema.

---

## Citability Score Summary

| Page | Citability Score | Best Citable Passage | AI Query It Would Answer |
|------|-----------------|---------------------|--------------------------|
| Homepage | 6/10 | FF&E FAQ answer (15-25% of construction costs) | "what is FF&E in hotels" |
| About | 5/10 | Company description + location | "who is DMD Furnishing" |
| Services | 7/10 | 6-step process + industry list | "hotel furniture services" |
| Blog: FF&E | 9/10 | FF&E definition, FF&E vs OS&E distinction | "what is FF&E", "FF&E vs OS&E" |
| Blog: Checklist | 8/10 | Complete guestroom checklist + item specs | "hotel room furniture checklist" |
| Products: Hotel | 2/10 | Product count (46 products, 7 spaces) | None substantive |
| **Site Average** | **6.2/10** | | |

---

## Content Freshness Assessment

| Signal | Status | Impact |
|--------|--------|--------|
| Blog publish dates | All posts dated 2026-03-28 (same day) | NEGATIVE: Signals bulk publication, not organic content cadence |
| dateModified | Same as datePublished on all posts | NEGATIVE: No update signals |
| Homepage date | None visible | NEUTRAL |
| Service/About dates | None visible | NEUTRAL |
| Copyright year | 2026 | POSITIVE: Current year |
| Content recency signals | No "updated for 2026" language | NEGATIVE: No freshness markers |

**Freshness Score: 4/10** -- All blog content published on a single date undermines the signal of ongoing expertise. No content update history visible.

---

## Topical Authority Assessment

| Topic Cluster | Pages Covering It | Depth | Authority Score |
|--------------|-------------------|-------|----------------|
| FF&E (definition, procurement, budgeting) | 3 (homepage FAQ, FF&E blog, services) | Deep | 8/10 |
| Hotel guestroom furniture | 2 (checklist blog, product page) | Moderate | 6/10 |
| Custom furniture manufacturing | 3 (about, services, homepage) | Moderate | 6/10 |
| Hospitality renovation | 2 (homepage projects, services) | Shallow | 4/10 |
| Material specifications | 2 (about materials, blog mentions) | Moderate | 5/10 |
| Healthcare furniture | 1 (services mention) | Very thin | 2/10 |
| Restaurant furniture | 1 (services mention) | Very thin | 2/10 |
| Office furniture | 1 (services mention) | Very thin | 2/10 |

**Topical Authority Score: 5/10** -- Strong depth on core FF&E topic but very thin coverage on claimed service areas beyond hospitality. The site claims to serve 7 industries but has substantive content for only 1-2.

---

## AI Content Signals Assessment

| Signal | Present? | Details |
|--------|----------|---------|
| Generic hedging phrases | Minimal | Content is refreshingly direct. Few "may" or "could" hedges. |
| Overly perfect structure | Some | Blog posts follow a rigid template (definition, list, distinction, process, budget, pro tip, FAQ). Consistent but potentially formulaic. |
| Lack of personal voice | Yes | No "I" or "we saw" or "in our experience with [specific project]." All content is third-person declarative. |
| Unsourced statistics | Yes | "15-25% of construction costs," "10-16 weeks lead time," "7-12 years renovation cycle" -- none sourced. |
| Same-day bulk publish | Yes | All blog posts published 2026-03-28. Strong AI-generated content signal. |
| No authorship | Yes | All content attributed to organization, not individuals. |

**AI Content Risk Score: MODERATE** -- Content quality is good enough to be useful, but the combination of no individual authors, bulk publication date, rigid templates, and unsourced statistics creates a pattern that sophisticated AI systems may flag.

---

## Schema Markup Assessment (for AI Extraction)

| Schema Type | Present | Pages | Quality |
|-------------|---------|-------|---------|
| Organization | Yes | All 6 | Good -- full contact, logo, social links |
| LocalBusiness | Yes | All 6 | Good -- geo coordinates, hours, price range |
| WebSite + SearchAction | Yes | All 6 | Good |
| Article | Yes | Blog posts only | Good -- but author is Organization, not Person |
| FAQPage | Yes | About, Services | Good -- but MISSING on Homepage despite FAQ content |
| BreadcrumbList | Yes | About, Services, Products, Blogs | Good |
| Service (ItemList) | Yes | Services only | Good |
| Speakable | Yes | Homepage only | Good for voice extraction |
| Product | **NO** | None | **CRITICAL GAP** -- No product schema on product pages |
| HowTo | No | None | Missing opportunity on process content |
| Review/Rating | No | None | No social proof schema |

---

## Priority Improvements (Ranked by Impact)

### P0 -- Critical (Do First)

1. **Fix SSR counter values on homepage.** The "0+ Rooms Renovated" etc. render as literal zeros in server-side HTML. AI systems and search engines read these as actual values. Either server-render the real numbers or use `<noscript>` fallbacks with actual values.

2. **Add Product schema and descriptions to /products/hotel.** Each product needs at minimum: a 50-100 word description, material info, dimensions, and Product JSON-LD. Without this, the entire product catalog is invisible to AI extraction.

3. **Add individual author attribution to blog posts.** Create an author profile (e.g., a founder or lead designer) with:
   - Name, title, headshot
   - Brief bio with credentials/experience
   - Schema author type changed from Organization to Person
   - Author page linkable from each blog post

### P1 -- High Priority

4. **Add FAQPage schema to homepage.** The homepage already has 6 FAQ items -- they just lack the FAQPage structured data that the about and services pages already have.

5. **Source all statistics.** Every percentage, timeline, or industry figure needs either:
   - A link to a credible external source (AHLA report, BIFMA standard, Hospitality Design article), or
   - Attribution to DMD's own project data (e.g., "based on our last 50 projects")

6. **Stagger blog publication dates.** Either backdate posts to create a natural content cadence, or (better) publish new content on a regular schedule going forward. All-same-date is a strong signal of non-organic content.

7. **Add experience-based content to project pages.** Each project (Quality Inn Gainesville, Towne Lyne Motel, etc.) needs:
   - Specific timeline (start/end dates)
   - Challenges encountered and solutions
   - Specific outcomes (guest satisfaction impact, on-time delivery, budget adherence)
   - Client quote or testimonial

### P2 -- Medium Priority

8. **Expand non-hospitality content.** If DMD genuinely serves healthcare, education, restaurant, and office sectors, each needs at least one dedicated blog post and a content-rich product/service page.

9. **Add HowTo schema to the 6-step process sections.** Both the homepage and services page describe the same 6-step process -- this should have HowTo structured data.

10. **Create a "Pro Tips" or "Knowledge Base" pattern.** The Pro Tip boxes in blog posts are excellent citable content. Consider making this a consistent feature across all content pages.

11. **Hyperlink all external references.** AHLA, BIFMA, Hospitality Design, and Hotel Business are mentioned but mostly not linked. Outbound links to authoritative sources strengthen E-E-A-T signals.

### P3 -- Nice to Have

12. **Add dateModified to all pages** with actual update dates (not same as publish date).

13. **Add Review/AggregateRating schema** once real testimonials are collected.

14. **Create an "About the Author" component** that renders on every blog post with structured Person schema.

15. **Add Speakable markup to blog posts** (currently only on homepage).

---

## Passage Citability Deep-Dive

### Top 5 Most Citable Passages on the Site

**1. FF&E Definition (Blog: What Is FF&E)**
> "FF&E -- Furniture, Fixtures & Equipment -- refers to every movable, non-structural element specified and installed during a hospitality fit-out. It covers the beds, seating, casegoods, light fixtures, and equipment that define a guest's physical experience, and it is budgeted and procured entirely separately from the base building."
- **Citability: 9/10** -- Direct definition, self-contained, quotable, answers the exact query.

**2. FF&E vs OS&E Rule of Thumb (Blog: What Is FF&E)**
> "A practical rule of thumb: if you replace it once per renovation cycle, it's FF&E. If you reorder it every quarter, it's OS&E."
- **Citability: 9/10** -- Original phrasing, memorable, answers a common confusion.

**3. Guestroom Furniture Standard List (Blog: Checklist)**
> "A standard hotel guestroom typically includes a bed frame, headboard, two nightstands, a dresser or wardrobe, a desk with desk chair, a luggage bench, and a TV media panel. Higher-tier properties may also include a lounge chair, ottoman, vanity, and amenity tower storage unit."
- **Citability: 8/10** -- Comprehensive, specific, answers "what furniture does a hotel room need."

**4. FF&E Budget Range (Homepage FAQ)**
> "FF&E typically represents 15-25% of total construction costs and directly shapes guest experience and brand consistency."
- **Citability: 7/10** -- Specific percentage, useful claim. Loses points for being unsourced.

**5. Lead Time Guidance (Blog: What Is FF&E)**
> "Lead times for custom commercial furniture range from 10 to 16 weeks on average, meaning procurement decisions must be made months before the construction completion date."
- **Citability: 7/10** -- Practical, specific, actionable.

### Bottom 5 (Least Citable / Most Problematic)

1. **Product page content** -- "Hotel furniture collection" (3 words). Essentially zero citability.
2. **Homepage hero** -- "Designed. Manufactured. Delivered." -- Marketing, not information.
3. **Homepage counters** -- "0+ Rooms Renovated" -- Factually wrong as rendered in HTML.
4. **About story** -- Avoids all specifics. No founding date, no names, no milestones.
5. **Meta description on products** -- "Hotel furniture collection Browse all hotels & motels furniture products." -- Grammatically incomplete, not citable.

---

## Summary

DMD Furnishing's content strategy is strongest in its blog posts, which demonstrate genuine technical depth in the FF&E/hospitality furniture domain. The FF&E guide and guestroom checklist are genuinely useful content that AI systems can extract and cite. However, the site has three systemic weaknesses that significantly limit AI citation readiness:

1. **No individual expertise signals** -- Every piece of content is attributed to the organization, not a person. AI systems increasingly weight individual author expertise.
2. **Product pages are content voids** -- The product catalog, which should be the commercial backbone, contains virtually no descriptive content for AI extraction.
3. **Trust gaps in statistics** -- Multiple specific claims (budget percentages, lead times, renovation cycles) lack source attribution, which reduces confidence for AI citation.

The path to improving from 68/100 to 80+ involves primarily adding author attribution, expanding product descriptions, and sourcing existing statistical claims -- all achievable without creating new content from scratch.
