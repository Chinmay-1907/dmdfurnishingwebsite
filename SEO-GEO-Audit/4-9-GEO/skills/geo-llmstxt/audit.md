# GEO llms.txt Validation Audit -- DMD Furnishing

**Date:** 2026-04-09
**URL:** https://dmdredesign.netlify.app/llms.txt
**Status:** COMPLETE
**Score: 82/100**

---

## File Status

| Check | Result |
|-------|--------|
| HTTP Status | 200 OK |
| Content-Type | text/plain (served correctly) |
| File Size | ~3.2 KB |
| Format | Valid Markdown |

---

## Structure Validation

### Required Elements

| Element | Present | Details | Score |
|---------|---------|---------|-------|
| H1 title (`# DMD Furnishing`) | YES | First line of file | 10/10 |
| H2 sections | YES | 16 sections found | 10/10 |
| Markdown format | YES | Clean, valid Markdown | 15/15 |
| File accessible at /llms.txt | YES | 200 response | 20/20 |

### Content Sections Found

| # | Section (H2) | Content Quality |
|---|--------------|-----------------|
| 1 | About | Company description, location, services -- well-written |
| 2 | Contact | Phone, email, address -- complete |
| 3 | Services | 6 service categories listed |
| 4 | Markets Served | 6 market categories with examples |
| 5 | Key Pages | 8 page URLs listed |
| 6 | Process | 4-step process description |
| 7 | Materials | 4 material categories |
| 8 | Industry Glossary | 5 terms defined (FF&E, Casegoods, BOQ, HPL, Value Engineering) |
| 9 | FAQs | 5 questions with answers |
| 10 | Products | Catalog summary: 475+ items, 6 categories |
| 11 | Blog & Resources | 6 blog post links |
| 12 | Projects | Portfolio description |
| 13 | Target Audience | 5 audience segments |
| 14 | Geographic Coverage | Headquarters + nationwide service |

### H3 Subsections (Glossary Terms)

| Term | Definition Quality |
|------|-------------------|
| FF&E (Furniture, Fixtures & Equipment) | Excellent -- includes budget % range (15-25%) |
| Casegoods | Good -- lists specific furniture types |
| BOQ (Bill of Quantities) | Good -- explains purpose in manufacturing |
| HPL (High-Pressure Laminate) | Good -- describes construction and use cases |
| Value Engineering | Good -- defines process and purpose |

---

## Page Coverage Analysis

### Pages Listed in llms.txt

| Page | URL | Accessible |
|------|-----|------------|
| Homepage | https://dmdfurnishing.com/ | YES (via redirect) |
| Products | https://dmdfurnishing.com/products | YES |
| Services | https://dmdfurnishing.com/services | YES |
| Projects | https://dmdfurnishing.com/projects | YES |
| About Us | https://dmdfurnishing.com/about | YES |
| Contact | https://dmdfurnishing.com/contact | YES |
| Schedule Consultation | https://dmdfurnishing.com/schedule-call | YES |
| Design Inspirations | https://dmdfurnishing.com/inspirations | YES |

**Total: 8 pages listed** (Target: 10-30)

### Missing Pages That Should Be Listed

| Page | Why Include |
|------|------------|
| Blog index (/blog) | Shows topical authority |
| Individual product categories | 6+ category pages with product listings |
| Individual project case studies | Portfolio credibility signals |
| Individual blog posts | Topical depth for AI queries |
| Sitemap reference | Helps AI crawlers find all content |

**Score deduction: -3 points** (8 pages vs. 10-30 target)

---

## Scoring Breakdown

| Criterion | Max | Score | Notes |
|-----------|-----|-------|-------|
| File present and accessible | 20 | 20 | 200 OK |
| Valid Markdown format | 15 | 15 | Clean formatting |
| H1 title present | 10 | 10 | "# DMD Furnishing" |
| H2 sections (4+ required) | 10 | 10 | 14 H2 sections |
| Page count (10-30 target) | 10 | 7 | 8 pages listed (-3) |
| Content completeness | 15 | 12 | Missing product/project detail pages |
| Glossary/educational content | 10 | 10 | 5 industry terms defined |
| FAQ coverage | 5 | 5 | 5 questions answered |
| Contact info | 5 | 5 | Phone, email, address |
| **TOTAL** | **100** | **82** | |

---

## Comparison: llms.txt Best Practices

| Best Practice | DMD Status | Assessment |
|---------------|-----------|------------|
| Use Markdown headings (H1-H3) | YES | H1, H2, and H3 used correctly |
| Lead with company description | YES | "About" section is second after H1 |
| Include contact info | YES | Phone, email, physical address |
| List all public pages | PARTIAL | 8 of estimated 25+ public pages |
| Define industry terminology | YES | 5-term glossary is excellent |
| Include FAQ | YES | 5 common questions covered |
| List products/services | YES | Both included with detail |
| Target audience defined | YES | 5 audience segments listed |
| Blog/resource links | YES | 6 blog posts linked |
| Version/date info | NO | No last-updated timestamp |

---

## Recommendations

### Priority 1: Expand Page Listings
Add these pages to the Key Pages section:
- Blog index page
- Each product category page (Hotel & Lodging, Restaurant, Healthcare, Education, Corporate, Multi-family)
- Each project case study page
- Blog post URLs (already in Blog section but should also be in Key Pages)

**Target: 20-25 total page listings**

### Priority 2: Add Metadata
```markdown
## Metadata
- Last updated: 2026-04-09
- Canonical domain: https://dmdfurnishing.com
- Sitemap: https://dmdfurnishing.com/sitemap.xml
```

### Priority 3: Add Structured Data Hints
```markdown
## Structured Data
- Organization schema on all pages
- LocalBusiness schema on contact page
- Product schema on product pages
- FAQPage schema on pages with FAQ sections
- Article schema on blog posts
```

### Priority 4: Expand Glossary
Add terms: OS&E, Millwork, PIP (Property Improvement Plan), GC (General Contractor), PO (Purchase Order), Punch List

---

*Audit conducted 2026-04-09 by geo-llmstxt skill. File fetched live from https://dmdredesign.netlify.app/llms.txt.*
