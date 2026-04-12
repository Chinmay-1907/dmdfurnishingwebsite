# GEO (Generative Engine Optimization) Audit — DMD Furnishing

**Site:** https://dmdredesign.netlify.app  
**Canonical:** https://dmdfurnishing.com  
**Audit Date:** 2026-04-09  
**Auditor:** SEO-GEO Bridge Agent  

---

## GEO Readiness Score: 61/100

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Citability | 25% | 62/100 | 15.5 |
| Structural Readability | 20% | 72/100 | 14.4 |
| Multi-Modal Content | 15% | 48/100 | 7.2 |
| Authority & Brand Signals | 20% | 38/100 | 7.6 |
| Technical Accessibility | 20% | 82/100 | 16.4 |
| **TOTAL** | **100%** | | **61.1** |

---

## 1. Technical Accessibility (82/100)

### AI Crawler Access — robots.txt

**Status:** EXCELLENT — All major AI crawlers explicitly allowed.

| Crawler | Tier | Status | Notes |
|---------|------|--------|-------|
| GPTBot | Tier 1 (Critical) | ALLOWED | Explicit `Allow: /` directive |
| OAI-SearchBot | Tier 1 (Critical) | ALLOWED | Explicit `Allow: /` directive |
| ChatGPT-User | Tier 1 (Critical) | ALLOWED | Explicit `Allow: /` directive |
| ClaudeBot | Tier 1 (Critical) | ALLOWED | Explicit `Allow: /` directive |
| PerplexityBot | Tier 1 (Critical) | ALLOWED | Explicit `Allow: /` directive |
| Google-Extended | Tier 2 (Ecosystem) | ALLOWED | Explicit `Allow: /` directive |
| Applebot-Extended | Tier 2 (Ecosystem) | NOT LISTED | Allowed by default `*` rule, but no explicit directive |
| Amazonbot | Tier 2 (Ecosystem) | NOT LISTED | Allowed by default `*` rule, but no explicit directive |
| FacebookBot | Tier 2 (Ecosystem) | NOT LISTED | Allowed by default `*` rule, but no explicit directive |
| CCBot | Tier 3 (Training) | ALLOWED | Explicit `Allow: /` directive |
| anthropic-ai | Tier 3 (Training) | ALLOWED | Explicit `Allow: /` directive |
| Bytespider | Tier 3 (Training) | NOT LISTED | Allowed by default `*` rule |
| cohere-ai | Tier 3 (Training) | ALLOWED | Explicit `Allow: /` directive |

**Gaps:**
- Applebot-Extended, Amazonbot, FacebookBot, and Bytespider are not explicitly listed. They are allowed by the default `User-agent: *` rule, but explicit directives strengthen intent signals for AI platforms.

### llms.txt

**Status:** PRESENT (200 OK) — Excellent

The site serves a well-structured `/llms.txt` file containing:
- Company description and positioning
- Contact information (phone, email, address)
- Full service catalog (6 services listed)
- Markets served (6 categories with sub-details)
- Key page URLs with complete link structure
- 4-step process overview
- Materials list
- Industry glossary with definitions (FF&E, Casegoods, BOQ, HPL, Value Engineering)
- FAQ section (7 questions with detailed answers)
- Product catalog summary (475+ items across 6 categories)
- Blog/resource links (6 articles)
- Project portfolio summary
- Target audience definitions
- Geographic coverage statement

**Quality Assessment:** 9/10 — Comprehensive, well-organized, and AI-extractable. One of the best llms.txt implementations for a B2B manufacturer. Minor improvement: add version date and author/company entity identifier at top.

### Sitemap

**Status:** sitemap.xml returns 200. Referenced in robots.txt (though pointing to `dmdfurnishing.com` not the Netlify staging URL).

### AI Plugin Manifest

**Status:** `/.well-known/ai-plugin.json` returns 404. Not implemented.

### Schema Markup (JSON-LD)

Four schema types detected on homepage:

1. **Organization** — Complete with name, URL, email, logo, description, contactPoint, address, sameAs (4 social profiles)
2. **LocalBusiness** — Complete with geo coordinates, opening hours, price range, offer catalog, sameAs
3. **WebSite** — Includes SearchAction with URL template for product search
4. **WebPage** — Includes SpeakableSpecification targeting `h1` and `[data-speakable]` selectors

**SpeakableSpecification:** PRESENT — 6 `data-speakable` attributes found on homepage. This is a strong GEO signal — it tells voice assistants and AI systems which content is most important to extract.

**Missing schemas that would boost GEO:**
- `FAQPage` schema for the FAQ section (content exists but schema missing)
- `HowTo` schema for the 6-step process section
- `Product` schema for individual products
- `Article` / `BlogPosting` with `Person` author for blog posts (currently uses Organization author, which weakens E-E-A-T)

### Open Graph & Social Metadata

- **OG tags:** 8 present (title, description, url, site_name, image, image:width, image:height, type) — Complete
- **Twitter Card:** Present (summary_large_image with title, description, image) — Complete
- **Canonical:** Present, pointing to `https://dmdfurnishing.com`

---

## 2. Citability Analysis (62/100)

Citability measures how likely AI systems are to extract and cite content from the site in generated responses.

### Homepage Content Structure

**Hero Section:**
> "Custom Hospitality Furniture. Designed. Manufactured. Delivered. From boutique hotels to national chains — we handle design, manufacturing, and installation so your renovation stays on time, on brand, and on budget. Based in Foxboro, MA — serving clients nationwide."

- Word count: ~40 words (excluding brand fragments)
- **Issue:** The hero text is fragmented by animated text effects ("esigned.", "anufactured.", "elivered.") — these render as broken words in raw HTML extraction. AI crawlers may parse "esigned" instead of "Designed". This damages extractability.

**FAQ Section — STRONG for citability:**

The FAQ section contains 7 question-answer pairs with:
- Question-based headings (e.g., "What is FF&E and why does it matter for hospitality projects?")
- Direct answers in the first sentence of each response
- Self-contained answer blocks of 40-80 words each
- External authority citations (AHLA link)

**Sample citable passage (strong):**
> "FF&E stands for Furniture, Fixtures & Equipment — the movable items in a commercial space such as beds, desks, chairs, lighting, and accessories that are not permanently attached to the structure. For hotels, restaurants, and offices, FF&E typically represents 15-25% of total construction costs and directly shapes guest experience and brand consistency."

- Word count: ~50 words
- Contains a definition, specific statistic (15-25%), and context
- Self-contained and extractable
- **Grade: A** — This is exactly what AI models look for when answering "What is FF&E?"

**Why DMD Section:**
Six value propositions with short descriptions (15-25 words each). Too short for standalone citation but good for list extraction.

**How We Work Section:**
Six process steps with brief descriptions. Structured but lacks the depth for standalone AI citation.

### Blog Content — STRONG for citability

The blog post "What Is FF&E?" demonstrates excellent AI-citable writing:
- Starts with a clear definition in the first paragraph
- Contains specific data points (7-12 year renovation cycles, 10-16 week lead times, 15-25% budget share)
- References authoritative sources (AHLA, BIFMA, Hospitality Design magazine)
- Uses clear section headings that mirror search queries
- Passages are 100-170 words — within optimal range for AI extraction
- Distinguishes FF&E vs OS&E with a practical rule of thumb

### Citability Scores by Section

| Section | Score | Notes |
|---------|-------|-------|
| FAQ Section | 85/100 | Question-based headings, direct answers, self-contained blocks |
| Blog Content | 88/100 | Authoritative, well-sourced, optimal passage length |
| Hero/Value Props | 35/100 | Fragmented animated text, no citable data points |
| Process Section | 45/100 | Structured but too brief for citation |
| Product Sections | 40/100 | Category names only, no substantive content to cite |

### Key Citability Gaps

1. **No statistics with sources on homepage** — Mentions "180+ products" and project counts but no sourced industry statistics
2. **Animated hero text breaks extraction** — "esigned.", "anufactured.", "elivered." parse incorrectly
3. **No "About DMD" definition passage** — Missing a single, self-contained 50-80 word passage that defines the company for AI extraction
4. **Missing comparison content** — No "DMD vs. competitors" or "custom vs. stock furniture" comparison that AI models frequently cite
5. **No pricing ranges or benchmarks** — FAQ on cost redirects to consultation instead of providing any ballpark figures

---

## 3. Structural Readability (72/100)

### Heading Hierarchy

Homepage headings extracted:
- **H1:** "Custom Hospitality Furniture" (implied from title tag) — Only 1 H1, correct
- **H2:** "Projects built to last.", "See the difference.", "Structured execution for demanding commercial work.", "Six steps from consultation to close-out.", "Frequently asked about commercial furniture projects.", "Ready to furnish your space."
- **H3:** 6 market categories, 4 project names, 6 value propositions

**Assessment:** 
- Good H2/H3 hierarchy
- H2 headings use statement format, not question format (except FAQ section) — this reduces question-matching for AI
- No H1 visible in extracted text — may be animated/hidden

### Content Organization

- **Sections are logically ordered:** Hero > Markets > Projects > Before/After > Why DMD > Process > FAQ > CTA
- **Each section is self-contained** — good for AI chunk extraction
- **data-speakable attributes** on key content blocks — excellent for voice/AI prioritization

### Passage Length Analysis

| Section | Avg. Passage Length | Optimal (134-167)? |
|---------|--------------------|--------------------|
| FAQ answers | 50-80 words | Below optimal — too short |
| Blog paragraphs | 100-170 words | Optimal range |
| Value prop descriptions | 15-25 words | Far below — fragment-level |
| Process steps | 10-15 words | Far below — fragment-level |

### Readability Issues

1. Homepage sections are concise for UX but below optimal length for AI citation
2. Blog content hits the right length but homepage underperforms
3. No "summary block" or "key takeaway" pattern used on any page

---

## 4. Multi-Modal Content (48/100)

### Images

- **18 images on homepage**
- **Alt text:** Present on all images, but quality varies:
  - 4 images use generic alt: "DMD Furnishing commercial hospitality furniture" (duplicate, non-descriptive)
  - 6 market category images have descriptive alt text
  - 4 project images include location names
  - Before/after images have distinct, descriptive alt text
- **Image optimization:** Next.js Image component with srcset and responsive sizing — good
- **Image format:** JPG via Next.js image optimization pipeline

### Video Content

- **Status:** NO video content found on homepage or blog
- **Impact:** Major gap — AI models increasingly index video transcripts and YouTube descriptions

### Audio / Podcast

- **Status:** Not present

### Interactive Content

- **Before/After slider:** Present for project showcase — good visual content but not AI-extractable
- **Animated text:** Hero section uses character animation — damages text extraction

### Multi-Modal Scores

| Type | Score | Notes |
|------|-------|-------|
| Images + Alt Text | 60/100 | Present but 4 duplicates need unique descriptive alt |
| Video | 0/100 | Not present — major gap |
| Audio/Podcast | 0/100 | Not present |
| Interactive | 40/100 | Before/after exists but not AI-parseable |
| Data Visualizations | 0/100 | No charts, infographics, or data tables |

---

## 5. Authority & Brand Signals (38/100)

### Wikipedia Presence

**Status:** NOT FOUND

Wikipedia API search for "DMD Furnishing" returned 8 results — none related to DMD Furnishing the company. All results reference the abbreviation "DMD" in unrelated contexts (dental, military, genetics).

**Impact:** CRITICAL — Wikipedia is a primary entity knowledge source for AI models. Without a Wikipedia entry (or even a Wikidata entity), AI systems have no authoritative third-party confirmation that "DMD Furnishing" is a real, notable entity. This severely limits brand mention likelihood in AI-generated responses.

### Reddit Presence

**Status:** UNABLE TO VERIFY (Reddit blocked automated request)

Based on the company's niche B2B positioning and small digital footprint, Reddit mentions are likely minimal to nonexistent.

**Impact:** Moderate — Reddit is scraped by AI models for training data and real-time search (Perplexity, Google AI Overviews). No Reddit presence means no community-sourced brand signals.

### YouTube Presence

**Status:** NOT FOUND

YouTube search for "DMD Furnishing" returned zero relevant results. All results were generic furniture/interior design videos from other creators.

**Impact:** HIGH — YouTube is the second-largest search engine and a primary video training source for multimodal AI. No YouTube presence means:
- No video transcripts for AI to index
- No brand entity association in video search
- Missing opportunity for "how-to" and project showcase content that AI frequently cites

### LinkedIn Company Page

**Status:** Known 404 (per prior audit findings)

The LinkedIn URL `https://linkedin.com/company/dmdfurnishing` is referenced in schema sameAs but reportedly returns 404.

**Impact:** HIGH — LinkedIn is a B2B authority signal. For a B2B furniture manufacturer, LinkedIn is the most relevant social platform. A 404 company page signals to AI models that the business entity is unverified or defunct.

### Backlink Profile

**Status:** 18/100 (per existing SEO audit)

Very weak authority signal. Few to no authoritative backlinks means AI models have limited external corroboration of the site's content claims.

### Social Proof Signals

Schema `sameAs` references 4 social profiles:
- Facebook: https://facebook.com/dmdfurnishing
- Instagram: https://instagram.com/dmdfurnishing
- LinkedIn: https://linkedin.com/company/dmdfurnishing (404!)
- Pinterest: https://pinterest.com/dmdfurnishing

**Missing:** YouTube, Houzz, Yelp, Google Business Profile link, BBB page.

### E-E-A-T Signals for AI

| Signal | Status | Impact |
|--------|--------|--------|
| Blog author uses Organization, not Person | WEAK | AI models weight personal expertise (Person schema with credentials) higher than corporate authorship |
| No team/leadership page with credentials | MISSING | No way for AI to verify human expertise behind content |
| External authority citations in blog | PRESENT | AHLA, BIFMA, Hospitality Design referenced — good |
| Customer testimonials/reviews | NOT FOUND | No third-party social proof for AI to reference |
| Industry certifications mentioned | NOT FOUND | No trade association memberships or certifications listed |
| Case studies with measurable outcomes | PARTIAL | Project names/locations listed but no measurable results (e.g., "reduced renovation time by X%") |

### Authority Score by Platform

| Platform | Score | Status |
|----------|-------|--------|
| Wikipedia/Wikidata | 0/100 | Not present |
| Reddit | 5/100 | Likely not present |
| YouTube | 0/100 | Not present |
| LinkedIn | 10/100 | 404 page |
| Google Business Profile | Unknown | Not verified |
| Industry Directories | Unknown | Not verified |
| Backlinks | 18/100 | Very weak |

---

## Platform-Specific GEO Scores

### ChatGPT / OpenAI Search (Score: 65/100)

| Factor | Score | Notes |
|--------|-------|-------|
| GPTBot access | 10/10 | Explicitly allowed |
| llms.txt | 10/10 | Comprehensive and well-structured |
| Schema markup | 8/10 | 4 types present, missing FAQPage |
| Content citability | 7/10 | Blog excellent, homepage needs work |
| Authority signals | 3/10 | No Wikipedia, weak backlinks |
| Speakable markup | 5/5 | Present with 6 data-speakable attrs |
| **Subtotal** | **43/55 = 78%** | |

Adjusted for authority penalty: **65/100**

### Perplexity (Score: 58/100)

| Factor | Score | Notes |
|--------|-------|-------|
| PerplexityBot access | 10/10 | Explicitly allowed |
| Source-cited content | 8/10 | Blog cites AHLA, BIFMA — Perplexity values sources |
| Passage extractability | 6/10 | Blog great, homepage fragments too short |
| Freshness signals | 5/10 | Blog dated March 2026, no news/PR coverage |
| Multi-source corroboration | 2/10 | Almost no external sources mention DMD |
| **Subtotal** | **31/50 = 62%** | |

Adjusted for corroboration penalty: **58/100**

### Google AI Overviews (Score: 60/100)

| Factor | Score | Notes |
|--------|-------|-------|
| Google-Extended access | 10/10 | Explicitly allowed |
| Existing organic rankings | Unknown | Not verified in this audit |
| Schema richness | 7/10 | Good but missing FAQ/HowTo schema |
| Content quality score | 8/10 | 82/100 from prior audit |
| E-E-A-T signals | 3/10 | Organization author, no person expertise |
| Page experience | 7/10 | Next.js SSR, responsive images |
| **Subtotal** | **35/50 = 70%** | |

Adjusted for E-E-A-T penalty: **60/100**

### Claude / Anthropic (Score: 68/100)

| Factor | Score | Notes |
|--------|-------|-------|
| ClaudeBot access | 10/10 | Explicitly allowed |
| anthropic-ai access | 10/10 | Explicitly allowed |
| llms.txt quality | 10/10 | Excellent structured data for LLM consumption |
| Content depth | 8/10 | Blog posts demonstrate genuine expertise |
| Factual grounding | 6/10 | Good citations, but limited verifiable claims |
| **Subtotal** | **44/50 = 88%** | |

Adjusted for authority: **68/100**

---

## Top 5 Priority Improvements

### 1. Add FAQPage Schema to Homepage FAQ Section (Impact: HIGH, Effort: LOW)

The FAQ section already has 7 well-written Q&A pairs. Adding `FAQPage` structured data would:
- Make FAQ content eligible for Google AI Overview featured answers
- Enable direct extraction by ChatGPT and Perplexity as verified Q&A
- Boost the Structural Readability score by 8-10 points

**Action:** Add `FAQPage` JSON-LD schema wrapping all 7 questions and answers on the homepage.

### 2. Fix Animated Hero Text for AI Extraction (Impact: HIGH, Effort: LOW)

The hero text renders as "esigned.", "anufactured.", "elivered." when extracted by AI crawlers. This means the most prominent content on the page is garbled for every AI system that crawls it.

**Action:** Ensure the full words "Designed", "Manufactured", "Delivered" exist in the DOM as complete strings (using `aria-label`, `sr-only` text, or restructured markup) regardless of animation state.

### 3. Create YouTube Channel with Project Walkthroughs (Impact: HIGH, Effort: MEDIUM)

Zero video presence is a critical blind spot. AI models increasingly cite video content, and YouTube descriptions/transcripts are primary training data.

**Action:** 
- Create a branded YouTube channel
- Upload 3-5 project walkthrough videos (before/after transformations)
- Include keyword-rich descriptions with "FF&E", "hospitality furniture", "hotel renovation"
- Add video schema to project pages that embed these videos

### 4. Fix LinkedIn Company Page (404) and Build External Entity Signals (Impact: HIGH, Effort: MEDIUM)

The LinkedIn 404 is actively harming entity recognition. Combined with no Wikipedia, no Reddit, and no YouTube presence, AI models have almost no external corroboration that DMD Furnishing exists as a legitimate entity.

**Action:**
- Fix or create the LinkedIn company page immediately
- Create a Wikidata entity for DMD Furnishing (lower bar than Wikipedia article)
- Claim/create Google Business Profile
- Submit to industry directories (Houzz, Hospitality Net, Hotel Management directory)
- Get listed on BBB
- Pursue 2-3 backlinks from hospitality trade publications

### 5. Add Person-Authored Content with Expert Credentials (Impact: MEDIUM, Effort: MEDIUM)

Blog posts authored by "DMD Furnishing" (Organization) carry less E-E-A-T weight than posts by a named person with verifiable credentials in hospitality furniture.

**Action:**
- Create an author profile page for the company principal or lead designer
- Include credentials, years of experience, and professional associations
- Update blog post schema from Organization author to Person author
- Add `author` schema with `sameAs` links to LinkedIn profile, industry memberships

---

## Additional Recommendations (Priority 6-10)

6. **Add HowTo schema** for the 6-step process section — enables Google rich results and AI extraction of process content

7. **Lengthen homepage content blocks** — Current value propositions (15-25 words) and process steps (10-15 words) are too short for AI citation. Expand each to 50-80 words minimum with specific details

8. **Add customer testimonials with Review schema** — Third-party social proof is missing entirely. Even 3-5 verified reviews with `Review` schema would boost AI trust signals

9. **Create comparison content** — Blog posts like "Custom vs. Stock Hotel Furniture: Cost, Timeline & Quality Comparison" would target high-citation AI queries

10. **Add pricing benchmark content** — The cost FAQ deflects to consultation. Adding ballpark ranges (e.g., "Hotel guestroom FF&E packages typically range from $X-$Y per room depending on tier") would make the content citable for pricing queries

---

## Summary

DMD Furnishing's site is **technically well-prepared** for AI crawlers (robots.txt, llms.txt, schema, speakable markup), but **significantly lacks external authority signals** that AI models use to validate entities and decide what to cite.

The strongest GEO asset is the blog content, which demonstrates genuine expertise with proper citations and optimal passage length. The weakest area is brand presence across external platforms — no Wikipedia, no YouTube, broken LinkedIn, no Reddit, and very few backlinks.

The gap between technical readiness (82/100) and authority signals (38/100) is the primary barrier. Closing this gap through external platform presence and entity building would likely move the GEO score from 61 to 75+ within 3-6 months.
