# GEO (Generative Engine Optimization) Audit - DMD Furnishing

**Date:** 2026-03-25
**Business Type:** B2B Commercial Furniture Manufacturer (Hospitality FF&E)
**Focus:** AI Overviews, ChatGPT Web Search, Perplexity Citability

---

## Overall AI Citation Readiness Score: 29/100

| GEO Area | Score | Weight | Weighted |
|----------|-------|--------|----------|
| AI Crawler Accessibility | 8/100 | 25% | 2.0 |
| Passage-Level Citability | 42/100 | 25% | 10.5 |
| Entity Clarity | 55/100 | 15% | 8.25 |
| Structured Data for AI | 30/100 | 15% | 4.5 |
| Content Structure for AI Citations | 35/100 | 10% | 3.5 |
| Platform-Specific Optimization | 12/100 | 10% | 1.2 |

---

## 1. AI Crawler Accessibility (8/100)

### The Core Problem
Every AI crawler that cannot execute JavaScript sees only:
```html
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
```

### Crawler Status

| Crawler | Can Access Content? | Notes |
|---------|-------------------|-------|
| GPTBot (ChatGPT) | NO | Does not render JS |
| ClaudeBot (Anthropic) | NO | Does not render JS |
| PerplexityBot | NO | Does not render JS |
| Google-Extended (AI Overviews) | PARTIAL | Google renders JS but with delay |
| Bingbot (Copilot) | PARTIAL | Limited JS rendering |
| CCBot (Common Crawl) | NO | Does not render JS |

### robots.txt — AI Crawlers Allowed
```
User-agent: *
Disallow:
```
All AI bots are permitted. **The problem is not access control — it's rendering architecture.**

### llms.txt
**Status:** Does not exist
**Impact:** AI systems have no machine-readable guide to understand site structure, business purpose, or content hierarchy.

### Estimated Score After Pre-rendering: ~55/100
Adding `react-snap` or Netlify pre-rendering would make all existing content visible to AI crawlers immediately, with zero content changes.

---

## 2. Passage-Level Citability (42/100)

### What Scores Well (If Rendered)

**ScheduleCall.js FAQ Section** — Best citable asset on the site:
```
Q: Is the consultation free?
A: Yes. Our initial consultation is completely free...

Q: Do I need finalized drawings?
A: No. We can work from concepts, sketches...
```
6 clear Q&A pairs that AI systems could extract and cite directly.

**Services.js Process Steps** — Structured 4-step process:
1. Consultation & Requirements
2. Design & Specifications
3. Manufacturing & Quality Review
4. Delivery & Installation Coordination

**Home.js Capabilities List** — Clear, scannable bullet points.

### What Scores Poorly

| Issue | Impact | File Reference |
|-------|--------|---------------|
| No definition-style content | AI can't extract authoritative definitions | All pages |
| No statistical claims | Nothing quantifiable to cite | All pages |
| No "what is FF&E" explainer | Missing foundational citable content | N/A (doesn't exist) |
| No comparative content | "Why custom vs catalog furniture" | N/A |
| No data tables or specifications | Product specs are minimal | `ProductDetail.js` |
| Placeholder testimonials | Fake quotes damage citability | `src/data/projects.js` |

### Citability Improvements
- Add answer-first formatting: Lead paragraphs with the key takeaway
- Create glossary/definition content for industry terms
- Add quantifiable claims: "Furnished 500+ hotel rooms", "Serving 12 states"
- Structure FAQ content as proper Q&A pairs with schema

---

## 3. Entity Clarity (55/100)

### Business Identity Signals

| Signal | Status | Consistency |
|--------|--------|-------------|
| Business Name | "DMD Furnishing" | Consistent across all pages |
| Address | 56 Leonard St Unit 5, Foxboro, MA 02035 | Consistent (SEO.js, Contact.js, Footer.js) |
| Phone | +1 (617) 223-7781 | Consistent |
| Email | Sales@DMDFurnishing.com | Consistent |
| Business Type | Commercial furniture manufacturer | Consistent (except footer tagline) |
| Service Area | "Nationwide" | Mentioned but not specific |

### Inconsistencies Found

**Footer Tagline Mismatch:**
- `Footer.js:12`: "Luxury furniture solutions for discerning clients" (B2C luxury positioning)
- Every other page: B2B commercial/hospitality positioning
- **Impact:** AI systems build brand understanding from repeated patterns. Contradictory signals weaken entity clarity.

### Missing Entity Signals
- No founding year
- No founder/owner name
- No number of employees
- No specific geographic service area (just "nationwide")
- No industry classification (NAICS code, SIC code)
- No Google Business Profile link
- No LinkedIn company URL verification

---

## 4. Structured Data for AI (30/100)

### What Exists (Client-Side Only)

| Schema Type | Valid? | Visible to AI? | File |
|-------------|--------|----------------|------|
| Organization | Yes (but references non-existent logo.png) | NO (JS-only) | `SEO.js:7-28` |
| LocalBusiness | Yes | NO (JS-only) | `SEO.js:30-59` |
| Product | Partially (missing offers) | NO (JS-only) | `ProductDetail.js:255-263` |
| BreadcrumbList | Yes | NO (JS-only) | `ProductDetail.js:265-274` |
| "Project" | INVALID TYPE | NO (JS-only) | `seo.js:169` |

### What's Missing

| Schema Type | Where It Should Be | AI Impact |
|-------------|-------------------|-----------|
| FAQPage | ScheduleCall.js | High — direct answer extraction |
| Service | Services.js | High — service understanding |
| WebSite + SearchAction | Global | Medium — site structure |
| HowTo | Services process steps | Medium — process citability |
| sameAs | Organization schema | Medium — entity verification |

---

## 5. Content Structure for AI Citations (35/100)

### Heading Hierarchy Quality
- Homepage: Good H1 > H2 > H3 hierarchy
- Most pages: Single H1, proper H2 nesting
- **Issue:** ProjectDetail has duplicate H1 tags
- **Issue:** Footer uses H2/H3 for styling (adds noise)

### Answer-First Formatting
**Current:** Most content uses narrative style rather than answer-first.
**Example (current):**
> "DMD Furnishing partners with owners, operators, designers, and project teams who need reliable, high-quality furniture solutions..."

**Recommended (answer-first):**
> "DMD Furnishing provides custom commercial furniture for hotels, restaurants, and offices nationwide. We handle the full FF&E lifecycle — design, manufacturing, delivery, and installation — as a single accountable partner."

### Unique vs Generic Content
- Industry terminology: Good (FF&E, casegoods, BOQ, HPL)
- Unique insights: Low — mostly descriptive, no original research or data
- Competitive differentiators: Stated but not substantiated with evidence

---

## 6. Platform-Specific Optimization (12/100)

### ChatGPT Web Search
- **Blocked by:** JS rendering requirement
- **If rendered:** Moderate citability for queries like "commercial furniture manufacturer Massachusetts"
- **Missing:** Authoritative signals (reviews, certifications, case studies)

### Perplexity
- **Blocked by:** JS rendering requirement
- **If rendered:** FAQ content would be highly citable
- **Missing:** Source citations, statistical claims

### Google AI Overviews
- **Partially accessible:** Google can render JS (with delay)
- **Missing:** Schema that triggers rich features (FAQPage, HowTo)
- **Opportunity:** Product schema with offers could appear in shopping-related AI overviews

### Brand Mention Signals
- **Current:** Very low — no external signals of authority
- **Needed:** Press mentions, industry directory listings, partner co-mentions

---

## 7. Recommendations (Priority Order)

### 1. Enable Pre-Rendering (Critical)
**Estimated impact:** Score jumps from 29 to ~52/100
All existing content becomes visible to all AI crawlers. Options:
- `react-snap` (free, build-time)
- Netlify prerendering (paid, zero code changes)
- Next.js migration (permanent solution, already planned)

### 2. Create `llms.txt` File
**File:** `public/llms.txt`
```
# DMD Furnishing

## About
DMD Furnishing is a B2B commercial furniture manufacturer specializing in hospitality FF&E (Furniture, Fixtures & Equipment). Based in Foxboro, Massachusetts, we design, manufacture, and install custom furniture for hotels, restaurants, offices, and institutional spaces nationwide.

## Services
- Custom Casegoods & Millwork
- Seating & Upholstered Furniture
- FF&E Procurement & Sourcing
- Delivery, Installation & Project Coordination
- Value Engineering

## Markets Served
- Hotels & Motels
- Restaurants & Cafes
- Corporate Offices
- Educational Facilities
- Healthcare Facilities

## Contact
- Phone: +1 (617) 223-7781
- Email: Sales@DMDFurnishing.com
- Address: 56 Leonard St Unit 5, Foxboro, MA 02035

## Key Pages
- Products: /products
- Services: /services
- Projects: /projects
- Contact: /contact
- Schedule Consultation: /schedule-call
```

### 3. Add FAQPage Schema to ScheduleCall
Highest-value citable content on the site. Add JSON-LD for the 6 FAQ items.

### 4. Fix Footer Tagline
Change `Footer.js:12` from "Luxury furniture solutions for discerning clients" to "Commercial furniture solutions for hospitality and corporate projects" — aligns with actual positioning.

### 5. Add Quantifiable Claims
Throughout the site, add verifiable statistics:
- "Furnished X+ hotel rooms across Y states"
- "Z years in commercial furniture manufacturing"
- "Completed N projects for M clients"

### 6. Create Glossary/Definition Content
AI systems frequently cite definition content. Create pages or sections for:
- "What is FF&E?"
- "Types of hospitality casegoods"
- "Commercial vs residential furniture specifications"

### 7. Add `sameAs` to Organization Schema
Link social profiles in schema for entity verification.

### 8. Add HowTo Schema to Services Process
The 4-step process on Services page is a perfect HowTo schema candidate.

### 9. Add AI Crawler Rules to robots.txt
Explicitly welcome AI crawlers (optional but shows awareness):
```
# AI Crawlers Welcome
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

### 10. Replace Placeholder Testimonials
Current testimonials in `projects.js` appear fabricated. Replace with real client quotes or remove entirely — fake testimonials actively harm AI citation trust.

---

## Score Projection

| Scenario | Projected Score |
|----------|----------------|
| Current state | 29/100 |
| After pre-rendering only | ~52/100 |
| After pre-rendering + llms.txt + FAQ schema | ~62/100 |
| After all 10 recommendations | ~78/100 |
| After Next.js migration + blog + case studies | ~88/100 |

---

*Generated by GEO / AI Search Readiness Audit*
