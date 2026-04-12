# Per-Page SEO Content Audit — DMD Furnishing
**Site:** https://dmdredesign.netlify.app
**Date:** 2026-04-09

---

## Page 1: Homepage (/)

### Scores
- **Content Score:** 88/100
- **Word Count:** ~1,200 (body text only)
- **Content Minimum (500+):** PASS

### Heading Hierarchy
```
H1: Designed. Manufactured. Delivered.
  H2: [totalProducts]+ products built for commercial spaces.
  H2: Projects built to last.
  H2: See the difference.
  H2: Structured execution for demanding commercial work.
    H3: End-to-End Management
    H3: Hospitality-Grade Durability
    H3: Custom & Value-Engineered
    H3: Reliable Execution
    H3: Full FF&E Capability
    H3: Durable Material Selection
  H2: Six steps from consultation to close-out.
  H2: Frequently asked about commercial furniture projects.
  H2: Ready to furnish your space?
```
**Assessment:** Clean hierarchy. Single H1. H2s segment sections clearly. H3s used appropriately.

### Meta Description
"Custom hospitality furniture and FF&E solutions for hotels, restaurants, offices, and institutional spaces. Based in Foxboro, MA — designed, manufactured, and installed nationwide by DMD Furnishing."
**Length:** 186 characters — OVER LIMIT (ideal: 150-160)
**Fix:** "Custom hospitality furniture & FF&E for hotels, restaurants, and offices. Designed, manufactured & installed nationwide from Foxboro, MA." (138 chars)

### Keyword Analysis
| Keyword | Count | Assessment |
|---------|-------|------------|
| FF&E | 4 | Good |
| hospitality furniture | 2 | Good |
| commercial | 3 | Good |
| custom furniture | 1 | Could add 1 more |
| Foxboro | 2 | Good for local |

### E-E-A-T Signals Present
- [x] Physical address in CTA
- [x] Phone number + email
- [x] Dynamic stats from real data
- [x] Project portfolio links
- [x] FAQ with 7 questions + AHLA external link
- [x] SpeakableSpecification schema
- [ ] Author byline — MISSING
- [ ] Testimonials — MISSING
- [ ] Trust badges — MISSING

### Internal Links (13 total)
/schedule-call (x2), /contact (x2), /products (x1), /products/[slug] (x6), /projects (x1), /projects/[slug] (x4), /about (x1), /services (x1)
**Assessment:** Strong — all major sections connected. Missing: /blog

### AI Citation Targets
1. "FF&E stands for Furniture, Fixtures & Equipment — the movable items in a commercial space..."
2. "FF&E typically represents 15-25% of total construction costs" (needs source citation)
3. 6-step process with numbered steps

### Issues
1. H1 creative ("Designed. Manufactured. Delivered.") — low keyword density
2. Meta description 186 chars — will be truncated
3. "15-25% of total construction costs" claim lacks citation
4. No link to /blog from homepage

---

## Page 2: About (/about)

### Scores
- **Content Score:** 80/100
- **Word Count:** ~800
- **Content Minimum (800+):** BORDERLINE PASS

### Heading Hierarchy
```
H1: Built for Commercial Spaces. Designed for Real-World Use.
  H2: Why we started — and what drives us.
  H2: What you get when you work with DMD.
    H3: [6 differentiator titles]
  H2: What goes into every piece.
    H3: [5 material titles]
  H2: About DMD Furnishing. (FAQ)
  H2: Have a project in mind?
```

### Meta Description
**Length:** 168 chars — SLIGHTLY OVER
**Fix:** "About DMD Furnishing — commercial furniture manufacturer in Foxboro, MA. Custom FF&E for hotels, restaurants, and commercial spaces nationwide." (143 chars)

### Schema
AboutPage + FAQPage (4 questions) + BreadcrumbList

### E-E-A-T Gaps
- [ ] Founding year — MISSING
- [ ] Founder/team names — MISSING
- [ ] Team photos — MISSING
- [ ] Certifications/awards — MISSING
- [ ] Client logos — MISSING

### Issues
1. CRITICAL: "DMD Furnishing was established with a simple goal" — no year, no names
2. Content at minimum threshold; needs 200-400 more words
3. No link to /products (natural: "see what we build")

---

## Page 3: Services (/services)

### Scores
- **Content Score:** 86/100
- **Word Count:** ~2,500+
- **Content Minimum (800+):** PASS

### Heading Hierarchy
```
H1: From Concept to Installation. One Team. One Process.
  H2: Full-Spectrum FF&E Services
    H3: [6 service card titles]
  H2: Six Steps from Concept to Completion
  H2: Built for Every Commercial Environment
  H2: Frequently Asked Questions
  H2: Have a project in mind?
```

### Meta Description
**Length:** 200 chars — TOO LONG
**Fix:** "End-to-end commercial furniture services: design, manufacturing, FF&E procurement & installation for hospitality projects. Foxboro, MA." (136 chars)

### Schema (4 types — excellent)
BreadcrumbList + Service ItemList (6 services) + HowTo (6 steps) + FAQPage (8 questions)

### Issues
1. Meta description must be trimmed
2. No pricing indicators or ranges
3. Industry tab descriptions should link to relevant blog posts
4. No downloadable service brochure

---

## Page 4: Products (/products)

### Scores
- **Content Score:** 72/100
- **Word Count:** ~150
- **Content Minimum (300+):** FAIL

### Schema
BreadcrumbList + CollectionPage

### Issues
1. **CRITICAL: THIN CONTENT** — Interactive catalog wrapper with no supporting text
2. No introductory paragraph, buying guide, or FAQ
3. No contextual links to blog posts about materials or specifications
4. Heading hierarchy entirely delegated to CatalogHero sub-component

### Recommendations
- Add introductory paragraph (100+ words) explaining the product range above catalog
- Add FAQ section below catalog ("How to request a custom quote," "What customization is available")
- Add contextual blog links: "Learn about HPL vs Veneer" -> /blog/hpl-veneer-solid-wood-hotel-casegoods
- Add "How to order" guidance section

---

## Page 5: Products/Hotel (/products/hotel)

### Scores
- **Content Score:** 68/100
- **Word Count:** ~50
- **Content Minimum (300+):** FAIL

### Issues
1. **CRITICAL: THIN CONTENT** — Same catalog component with pre-filtered view
2. Only unique text is brief place.description from catalog data
3. No category-specific buying guide or specification guidance
4. No FAQ about hotel furniture
5. No links to /blog/hotel-guestroom-furniture-checklist or /blog/hpl-veneer-solid-wood-hotel-casegoods
6. Only schema: BreadcrumbList (no FAQPage, no ItemList)

### Recommendations
- Add 300+ words of hotel-specific furniture guidance below hero
- Add FAQ section specific to hotel furniture (can pull from blog content)
- Link to relevant blog posts prominently
- Add ItemList or Product schema for SEO

---

## Page 6: Blog Index (/blog)

### Scores
- **Content Score:** 78/100
- **Word Count:** ~400

### Heading Hierarchy
```
H1: Commercial Furniture & FF&E Insights
  H2: [6 article titles as cards]
  H2: Related Resources
    H3: Product Catalog / Our Services / About DMD / Free Consultation
```

### Schema
CollectionPage + BreadcrumbList

### Strengths
- Keyword-rich H1
- Intro paragraph establishing expertise and audience
- Related Resources section with 4 internal links
- Category tags and read time on cards

### Issues
1. All 6 posts dated March 28, 2026 — batch publication, no cadence signal
2. No category/tag filtering
3. No author photos or individual bylines
4. No newsletter subscription CTA
5. No "popular" or "featured" designation

---

## Page 7: Blog — What Is FF&E (/blog/what-is-ffe-hospitality)

### Scores
- **Content Score:** 90/100
- **Word Count:** ~2,200
- **Content Minimum (1500+):** PASS

### Heading Hierarchy
```
H1: What Is FF&E? A Complete Guide for Hospitality Projects
  H2: The Full Definition of FF&E
  H2: What Is Included in FF&E?
    H3: Furniture / Fixtures / Equipment
  H2: FF&E vs. OS&E: Understanding the Distinction
  H2: Why FF&E Matters in Hospitality
  H2: The FF&E Procurement Process
  H2: Budget Considerations for FF&E
  H2: Frequently Asked Questions
```

### Meta Description
**Length:** ~200 chars — TOO LONG
**Fix:** "What is FF&E? Furniture, Fixtures & Equipment explained for hospitality projects. Definition, procurement process, budget guide from DMD Furnishing." (152 chars)

### External Authority Links
- BIFMA (bifma.org) — furniture standards
- AHLA (ahla.com) — hospitality industry
- Hospitality Design (hdmagazine.com) — trade publication

### Internal Links
- /products (CTA block)
- /services (contextual link)

### AI Citation Targets (Excellent)
1. "FF&E stands for Furniture, Fixtures & Equipment — the movable items in a commercial space..."
2. "If you replace it once per renovation cycle, it's FF&E. If you reorder it every quarter, it's OS&E."
3. "Custom commercial furniture typically requires 10-16 weeks from approved shop drawings to delivery."
4. "Getting FF&E right the first time protects both the opening timeline and the long-term asset value."

### Schema
Article (datePublished, dateModified, author, publisher) + BreadcrumbList

### Issues
1. Meta description too long
2. dateModified = datePublished (March 28, 2026) — no update signal
3. No related articles section linking to other blog posts
4. No images in article body
5. Author is organization, not named person

---

## Page 8: Blog — Hotel Guestroom Checklist (/blog/hotel-guestroom-furniture-checklist)

### Scores
- **Content Score:** 88/100
- **Word Count:** ~2,500
- **Content Minimum (1500+):** PASS

### Heading Hierarchy
```
H1: Hotel Guestroom Furniture Checklist: What Every Room Needs
  H2: Why a Furniture Checklist Matters
  H2: Bed Components
    H3: Headboard / Bed Frame
  H2: Casegoods
    H3: Night Stand / Dresser-Wardrobe / Desk / Luggage Bench
  H2: Seating
    H3: Desk Chair / Lounge Chair
  H2: Media and Technology Furniture
    H3: TV Media Panel
  H2: Amenity Storage
    H3: Amenity Tower
  H2: Bathroom Furniture
    H3: Vanity
  H2: Complete Guestroom Furniture Checklist
  H2: Frequently Asked Questions
```

### External Authority Links
- Hotel Business (hotelbusiness.com)

### AI Citation Targets (Excellent)
1. "A standard hotel guestroom typically includes a bed frame, headboard, two nightstands..."
2. "11+ essential pieces per room, 4 core furniture categories"
3. Complete bulleted checklist of all items

### Issues
1. Only 1 external authority link (Hotel Business); could add AHLA or BIFMA
2. No cross-link to HPL vs Veneer article (natural connection from casegoods section)
3. No images of individual furniture pieces
4. No related articles section

---

## Page 9: Blog — Value Engineering (/blog/value-engineering-commercial-furniture)

### Scores
- **Content Score:** 87/100
- **Word Count:** ~2,400
- **Content Minimum (1500+):** PASS

### External Authority Links
- AIA (aia.org) — architecture standards
- NFPA (nfpa.org) — fire safety
- ADA (ada.gov) — accessibility

### AI Citation Targets
1. "Value engineering is a structured review that matches specification to actual performance requirements..."
2. Three non-negotiable areas: structural integrity, fire safety, ADA compliance

### Issues
1. No cross-link to HPL vs Veneer article (direct topical overlap)
2. Breadcrumb separator uses " > " instead of "/" (inconsistency with other posts)
3. No specific cost savings examples or percentages
4. Author card present but organization-level only

---

## Page 10: Blog — HPL vs Veneer vs Solid Wood (/blog/hpl-veneer-solid-wood-hotel-casegoods)

### Scores
- **Content Score:** 89/100
- **Word Count:** ~3,000+
- **Content Minimum (1500+):** PASS

### External Authority Links
- USDA Forest Products Laboratory (fpl.fs.usda.gov) — wood science
- Architectural Woodwork Institute (awinet.org) — woodwork standards

### AI Citation Targets (Excellent)
1. Comparison table: 8 attributes x 3 materials (HPL, Veneer, Solid Wood)
2. Tier recommendations: Economy = HPL throughout; Midscale = HPL base + veneer accents; Upscale = veneer-dominant + solid wood details; Luxury = solid wood prominent + veneer panels

### Unique Strengths
- Inline HTML comparison table with clear data
- Per-tier hotel recommendations with rationale
- "Laminate/Veneer; edge-banded MDF" specification explained

### Issues
1. No cross-link to Value Engineering article
2. Breadcrumb separator inconsistency
3. Comparison table is inline HTML; consider structured data version

---

## Page 11: Blog — Restaurant Seating Guide (/blog/restaurant-seating-guide)

### Scores
- **Content Score:** 86/100
- **Word Count:** ~2,800
- **Content Minimum (1500+):** PASS

### External Authority Links
- National Restaurant Association (restaurant.org) — industry standards
- ADA (ada.gov) — accessibility compliance

### Unique Strengths
- Specific measurements: seat heights (17-19", 24-26", 28-30"), aisle widths (36"+), table clearances
- ADA dimensions: 27" high x 30" wide x 19" deep knee clearance, 30x48" clear floor
- Material specs: 100,000+ Wyzenbeek double rubs, 1.8 lb foam density minimum
- Outdoor materials section
- Zone strategy framework

### AI Citation Targets
1. "Counter-height stools with 24 to 26-inch seat heights pair with 34 to 36-inch counters"
2. "ADA guidelines require at least 5 percent of tables to be accessible"
3. "15 to 18 square feet of total dining room area per seat" for casual dining

### Issues
1. No images of booth, chair, or stool examples
2. No cross-links to other blog posts
3. No comparison table for seating types

---

## Page 12: Blog — FF&E Procurement Timeline (/blog/ffe-procurement-timeline)

### Scores
- **Content Score:** 88/100
- **Word Count:** ~2,800
- **Content Minimum (1500+):** PASS

### External Authority Links
- CMAA (cmaanet.org) — construction management
- BIFMA (bifma.org) — furniture standards

### AI Citation Targets
1. "A typical FF&E procurement process runs 16 to 24 weeks from design concept to final installation."
2. Lead times: Standard 6-10 weeks, Custom 10-14 weeks, Highly custom 14-20+ weeks
3. 5-phase timeline with specific week ranges

### Unique Strengths
- Phase-by-phase structure with actionable checklists
- "Tips for Staying on Schedule" section
- "Common Delays and How to Avoid Them" section

### Issues
1. No visual timeline or Gantt chart
2. No cross-links to other blog posts (e.g., value engineering, HPL vs veneer)

---

## Page 13: Projects (/projects)

### Scores
- **Content Score:** 76/100
- **Word Count:** ~300 (page shell)

### Schema
CollectionPage + BreadcrumbList + ItemList (Article items)

### Strengths
- Featured project section with specifications
- Category pills and completion dates
- CTA with phone + email

### Issues
1. No aggregate statistics on page (total rooms, geographic spread)
2. No filtering by category, location, or project type
3. No testimonials associated with projects
4. No before/after showcase on index (only on homepage)

---

## Page 14: Contact (/contact)

### Scores
- **Content Score:** 79/100
- **Word Count:** ~200 (page shell)

### Schema
ContactPage + BreadcrumbList

### Strengths
- OTP email verification (trust signal)
- Category-specific conditional form fields (hotel/restaurant/corporate/university/healthcare)
- reCAPTCHA v3 protection

### Issues
1. No embedded map or driving directions
2. Business hours not displayed on page (only in schema)
3. No response time expectation ("We typically respond within 24 hours")
4. No FAQ about the consultation process
5. No "what to expect" for first-time inquiries
6. Dead-end page — no contextual links to services, products, or blog

---

## Cross-Page Internal Linking Matrix

| From \ To | / | /about | /services | /products | /projects | /blog | /contact | /schedule-call |
|-----------|---|--------|-----------|-----------|-----------|-------|----------|----------------|
| Homepage | - | YES | YES | YES | YES | NO | YES | YES |
| About | NO | - | YES | NO | YES | NO | YES | YES |
| Services | NO | NO | - | NO | YES | NO | YES | YES |
| Products | NO | NO | NO | - | NO | NO | NO | NO |
| Projects | NO | NO | NO | NO | - | NO | YES | YES |
| Blog Index | YES | YES | YES | YES | NO | - | NO | YES |
| Blog Posts | NO | NO | YES | YES | NO | NO | NO | YES |
| Contact | NO | NO | NO | NO | NO | NO | - | NO |

### Key Internal Linking Gaps
1. **Products pages link to nothing** — no contextual internal links at all
2. **Blog posts don't link to each other** — no "Related Articles" section
3. **Blog posts don't link to /projects** — missed opportunity to show real work
4. **About page doesn't link to /products** — natural "see what we build" connection
5. **Homepage doesn't link to /blog** — blog content invisible from main page
6. **Contact page is a dead end** — no contextual links to services or products
7. **Footer lacks /blog link** — Quick Links section missing blog
