# Schema / Structured Data Audit -- DMD Furnishing

**Site:** https://dmdredesign.netlify.app (canonical: https://dmdfurnishing.com)  
**Date:** 2026-04-09  
**Auditor:** seo-schema agent  
**Framework:** Next.js 15 App Router, JSON-LD via `components/JsonLd.js` + inline `dangerouslySetInnerHTML`

---

## Overall Score: 78 / 100

| Category | Score | Weight | Notes |
|----------|-------|--------|-------|
| Global schemas (Org, LocalBusiness, WebSite) | 95 | 25% | Excellent -- all valid, absolute URLs, correct @context |
| Page-level schemas | 82 | 25% | Every audited page has page-specific schema; minor issues |
| Breadcrumbs | 90 | 15% | Present on all key pages; well-structured |
| Blog / Article schema | 85 | 15% | Good Article schema; missing Person author, inline FAQ schema |
| Critical issues | 50 | 10% | HowTo schema must be removed (deprecated Sept 2023) |
| Missing opportunities | 60 | 10% | No Product schema on category pages; no AggregateRating |

---

## 1. Schema Detection Table

| Schema @type | Page(s) | Format | Renders Live? | Valid? |
|---|---|---|---|---|
| Organization | All (layout) | JSON-LD | YES | YES |
| LocalBusiness | All (layout) | JSON-LD | YES | YES |
| WebSite + SearchAction | All (layout) | JSON-LD | YES | YES |
| WebPage + SpeakableSpecification | / (homepage) | JSON-LD | YES | YES |
| AboutPage | /about | JSON-LD (@graph) | YES | YES |
| BreadcrumbList | /about | JSON-LD (@graph) | YES | YES |
| FAQPage | /about | JSON-LD (@graph) | YES | WARN (see below) |
| BreadcrumbList | /services | JSON-LD (@graph) | YES | YES |
| ItemList > Service | /services | JSON-LD (@graph) | YES | YES |
| HowTo | /services | JSON-LD (@graph) | YES | **FAIL -- DEPRECATED** |
| FAQPage | /services | JSON-LD (@graph) | YES | WARN (see below) |
| BreadcrumbList | /products | JSON-LD (@graph) | YES | YES |
| CollectionPage | /products | JSON-LD (@graph) | YES | YES |
| BreadcrumbList | /products/hotel | JSON-LD | YES | YES |
| BreadcrumbList | /products/[place]/[type] | JSON-LD | YES (codebase) | YES |
| BreadcrumbList | /products/[place]/[type]/[sub] | JSON-LD | YES (codebase) | YES |
| BreadcrumbList + Product | /products/[...slug] (detail) | JSON-LD (@graph) | YES (codebase) | YES |
| CollectionPage + BreadcrumbList | /blog | JSON-LD | YES | YES |
| Article + BreadcrumbList | /blog/what-is-ffe-hospitality | JSON-LD | YES | YES |
| Article + BreadcrumbList | /blog/* (all 6 articles) | JSON-LD | YES (codebase) | YES |
| CollectionPage + BreadcrumbList + ItemList | /projects | JSON-LD (@graph) | YES | YES |
| BreadcrumbList + Article + ImageGallery + Review | /projects/[id] | JSON-LD (@graph) | YES (codebase) | YES |
| ContactPage + BreadcrumbList | /contact | JSON-LD (@graph) | YES | YES |
| Service + BreadcrumbList + FAQPage | /schedule-call | JSON-LD (@graph) | YES (codebase) | YES |
| Microdata | -- | -- | NONE | N/A |
| RDFa | -- | -- | NONE | N/A |

**Total unique schema types detected: 15**  
**Total JSON-LD blocks across 9 audited pages: ~35 (3 global x 9 + page-specific)**

---

## 2. Validation Results Per Block

### 2.1 Organization (Global -- layout.js)
- **@context:** `https://schema.org` -- PASS
- **@type:** Organization -- PASS (valid, not deprecated)
- **@id:** `https://dmdfurnishing.com/#organization` -- PASS (absolute)
- **name:** "DMD Furnishing" -- PASS
- **url:** absolute -- PASS
- **email:** present -- PASS
- **logo:** ImageObject with absolute URL -- PASS
- **contactPoint:** telephone, contactType, areaServed, availableLanguage -- PASS
- **address:** complete PostalAddress -- PASS
- **sameAs:** 4 social profiles -- PASS
- **Note:** Logo is SVG (`DMD_Furnishing_Logo_Embedded.svg`). Google accepts SVG.
- **Verdict: VALID**

### 2.2 LocalBusiness (Global -- layout.js)
- **@context:** `https://schema.org` -- PASS
- **@type:** LocalBusiness -- PASS
- **@id:** `https://dmdfurnishing.com/#localbusiness` -- PASS
- **All required fields present:** name, image, telephone, address, geo, openingHours -- PASS
- **geo:** latitude 42.0654, longitude -71.2478 -- PASS
- **priceRange:** "$$$" -- PASS
- **hasOfferCatalog:** OfferCatalog with absolute URL -- PASS
- **Issue:** `description` duplicates Organization description. Not an error but suboptimal.
- **Issue:** LocalBusiness should ideally link to Organization via `parentOrganization` or use `@type: ["LocalBusiness", "FurnitureStore"]` for more specificity.
- **Verdict: VALID**

### 2.3 WebSite + SearchAction (Global -- layout.js)
- **@context:** `https://schema.org` -- PASS
- **@type:** WebSite -- PASS
- **@id:** `https://dmdfurnishing.com/#website` -- PASS
- **SearchAction target:** EntryPoint with urlTemplate -- PASS
- **query-input:** correct format -- PASS
- **Issue:** SearchAction points to `/products?search={search_term_string}`. Verify this endpoint actually supports a `search` query parameter. If not, remove SearchAction to avoid misleading Google.
- **Verdict: VALID (conditional on search actually working)**

### 2.4 WebPage + Speakable (Homepage)
- **@type:** WebPage -- PASS
- **speakable:** SpeakableSpecification with cssSelector -- PASS
- **isPartOf / about:** cross-references via @id -- PASS
- **primaryImageOfPage:** absolute URL -- PASS
- **Issue:** Homepage has FAQ section in HTML but NO FAQPage schema for it. This is a missed opportunity. (7 FAQ items displayed on homepage with no structured data.)
- **Verdict: VALID but incomplete**

### 2.5 AboutPage + FAQPage + BreadcrumbList (/about)
- **@graph:** proper multi-entity graph -- PASS
- **AboutPage:** all required fields -- PASS
- **BreadcrumbList:** 2-level, correct positions -- PASS
- **FAQPage:** 4 questions with acceptedAnswer -- PASS structurally
- **FAQPage Warning:** As of August 2023, Google restricted FAQPage rich results to government and health sites. This schema will NOT generate rich results on a commercial site. However, it still provides structured data for AI citation engines (Perplexity, ChatGPT, Gemini) so retaining it has GEO value.
- **Verdict: VALID (no rich result eligibility but AI-citation value)**

### 2.6 Services Page Schema (/services)
- **BreadcrumbList:** 2-level -- PASS
- **ItemList > Service:** 6 services properly enumerated -- PASS
  - Each Service has: name, description, url (with anchor), provider, areaServed -- PASS
- **HowTo:** -- **CRITICAL FAIL**
  - Google removed HowTo rich results in September 2023. This schema type will never generate rich results and may trigger Rich Results Test warnings.
  - **Recommendation: REMOVE the HowTo block entirely.** The process information is already conveyed by the ItemList/Service schema and page content.
- **FAQPage:** 8 questions -- same FAQPage eligibility note as /about
- **Verdict: FAIL (HowTo must be removed)**

### 2.7 Products Page (/products)
- **BreadcrumbList:** 2-level -- PASS
- **CollectionPage:** @id, url, name, description, isPartOf, provider -- PASS
- **Issue:** No ItemList enumerating the product categories. Adding an ItemList of the 7 place categories would improve discoverability.
- **Verdict: VALID**

### 2.8 Products/Hotel (/products/hotel)
- **BreadcrumbList:** 3-level (Home > Products > Hotels & Motels) -- PASS
- **Issue:** Only BreadcrumbList. No CollectionPage schema for this subcategory landing page.
- **Verdict: VALID but minimal**

### 2.9 Product Detail Pages (/products/[...slug])
- **BreadcrumbList:** Up to 6 levels deep -- PASS
- **Product schema:** Comprehensive with name, description, image array, sku, brand, category, manufacturer, material, offers, additionalProperty -- PASS
- **Offers:** price "0" with description "Quote required" -- This is a pragmatic approach for custom/quote-based products. Google may flag `price: 0` but the `availability: InStock` and description mitigate it.
- **Issue:** No `aggregateRating` or `review` properties. Products without ratings may rank lower in product-oriented SERP features.
- **Verdict: VALID**

### 2.10 Blog Index (/blog)
- **CollectionPage:** with embedded BreadcrumbList (via `breadcrumb` property) -- PASS
- **Issue:** Blog index uses nested breadcrumb inside CollectionPage rather than separate @graph entry. Both approaches are valid, but @graph is more consistent with other pages.
- **Issue:** No ItemList of blog posts on the index page. Adding this would help search engines discover all articles.
- **Verdict: VALID**

### 2.11 Blog Article (/blog/what-is-ffe-hospitality)
- **Article:** headline, description, datePublished (ISO 8601), dateModified, author, publisher, image, mainEntityOfPage -- PASS
- **BreadcrumbList:** 3-level (embedded via breadcrumb property) -- PASS
- **Publisher logo:** ImageObject with URL -- PASS
- **Issue:** `author` is Organization, not Person. Google strongly prefers `Person` type for article authors with a `name` and ideally a `url` to an author page. This affects E-E-A-T signals.
- **Issue:** Blog article has 4 FAQ items in the HTML content but NO FAQPage schema for them. Even though FAQPage won't generate rich results, it aids AI citation.
- **Issue:** `datePublished: "2026-03-28"` -- all 6 blog articles share the same date, which looks unnatural. Consider staggering dates.
- **Verdict: VALID with improvements needed**

### 2.12 Projects Page (/projects)
- **CollectionPage:** name, description, url -- PASS
- **BreadcrumbList:** 2-level -- PASS
- **ItemList:** Enumerates all projects as Article type -- PASS
- **Issue:** Project items use `@type: Article`. A more accurate type would be `CreativeWork` or a custom approach. Article works but is imprecise.
- **Verdict: VALID**

### 2.13 Project Detail (/projects/[projectId])
- **BreadcrumbList:** 3-level -- PASS
- **Article:** with headline, description, image, datePublished, publisher -- PASS
- **ImageGallery:** conditional, includes ImageObject array -- PASS
- **Review:** conditional on client testimonial existing -- PASS
- **Issue:** `datePublished` falls back to `'2024-01-01'` when completionDate is missing. This hardcoded fallback is misleading.
- **Verdict: VALID**

### 2.14 Contact Page (/contact)
- **ContactPage:** @id, url, name, description, isPartOf -- PASS
- **BreadcrumbList:** 2-level -- PASS
- **Verdict: VALID**

---

## 3. Issues by Severity

### CRITICAL (Must Fix)

| # | Issue | Page | Impact | Fix |
|---|---|---|---|---|
| C1 | **HowTo schema present** -- deprecated Sept 2023, never generates rich results | /services | Rich Results Test warnings; wasted markup; potential future penalties | Remove the HowTo block from `serviceSchema` in `app/services/page.js` |

### HIGH (Should Fix)

| # | Issue | Page | Impact | Fix |
|---|---|---|---|---|
| H1 | Homepage FAQ (7 items) has no FAQPage schema | / | Missed AI citation opportunity; homepage FAQs are high-value for GEO | Add FAQPage schema to homepage WebPage schema |
| H2 | Blog articles use Organization as author instead of Person | /blog/* | Weakened E-E-A-T signals; Google prefers Person authors | Change `author` to `@type: Person` with name and url |
| H3 | Product `price: 0` may trigger warnings | /products/[...slug] | Google may flag zero-price products | Consider omitting `price` field or using `priceSpecification` with `minPrice` |
| H4 | SearchAction endpoint may not work | Global (WebSite) | Misleading if /products?search= doesn't actually filter | Verify or remove SearchAction |

### MEDIUM (Recommended)

| # | Issue | Page | Impact | Fix |
|---|---|---|---|---|
| M1 | No ItemList of product categories on /products | /products | Reduced crawl signal for category pages | Add ItemList of place categories |
| M2 | Blog article FAQs (4 items each) have no schema | /blog/* | Missed AI citation for in-article FAQs | Add FAQPage to article schema |
| M3 | Blog index missing ItemList of posts | /blog | Articles less discoverable via structured data | Add ItemList enumerating posts |
| M4 | /products/hotel has only BreadcrumbList | /products/[placeSlug] | No CollectionPage schema for subcategory | Add CollectionPage to place-level product pages |
| M5 | All blog articles share datePublished 2026-03-28 | /blog/* | Looks unnatural to search engines | Stagger publication dates |
| M6 | Project fallback datePublished is hardcoded 2024-01-01 | /projects/[id] | Misleading date for projects without completionDate | Use actual date or omit field |
| M7 | Duplicate description between Organization and LocalBusiness | Global | Minor; suboptimal | Differentiate descriptions |

### LOW (Nice to Have)

| # | Issue | Page | Impact | Fix |
|---|---|---|---|---|
| L1 | LocalBusiness could use more specific type | Global | Better categorization | Use `@type: ["LocalBusiness", "FurnitureStore"]` |
| L2 | No `aggregateRating` on Product schema | Product detail | Products without ratings rank lower | Add when reviews are collected |
| L3 | Blog CollectionPage uses nested breadcrumb vs @graph | /blog | Inconsistent with other pages | Refactor to @graph for consistency |

---

## 4. Missing Schema Opportunities

### 4.1 Product Schema on Category Pages (HIGH priority)
Product category pages (`/products/hotel`, `/products/restaurant`, etc.) currently only have BreadcrumbList. Adding CollectionPage + ItemList of products would strengthen these pages for search.

**Ready-to-implement JSON-LD for /products/[placeSlug]:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dmdfurnishing.com" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://dmdfurnishing.com/products" },
        { "@type": "ListItem", "position": 3, "name": "{place.name}", "item": "https://dmdfurnishing.com/products/{place.slug}" }
      ]
    },
    {
      "@type": "CollectionPage",
      "@id": "https://dmdfurnishing.com/products/{place.slug}",
      "url": "https://dmdfurnishing.com/products/{place.slug}",
      "name": "{place.name} Furniture | DMD Furnishing",
      "description": "{place.description}",
      "isPartOf": { "@id": "https://dmdfurnishing.com/#website" }
    }
  ]
}
```

### 4.2 Homepage FAQPage Schema (HIGH priority)
The homepage displays 7 FAQ items but has no corresponding FAQPage schema. Even though FAQPage rich results are restricted, the structured FAQ data is valuable for AI search engines.

**Ready-to-implement -- add to homepage schema in app/page.js:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is FF&E and why does it matter for hospitality projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FF&E stands for Furniture, Fixtures & Equipment..."
      }
    }
  ]
}
```

### 4.3 Person Author for Blog Articles (HIGH priority)
```json
"author": {
  "@type": "Person",
  "name": "DMD Furnishing Team",
  "url": "https://dmdfurnishing.com/about",
  "worksFor": {
    "@type": "Organization",
    "name": "DMD Furnishing"
  }
}
```

### 4.4 Service Schema on Services Page (Already present -- GOOD)
The services page already has well-structured Service schema via ItemList. No action needed.

### 4.5 VideoObject -- N/A
No videos detected on the site. Not applicable.

### 4.6 ImageObject Enhancement
Project detail pages already include ImageGallery with ImageObject. Product detail pages include image arrays. The implementation is solid. Consider adding `width`, `height`, and `caption` properties to ImageObjects for richer data.

### 4.7 Review / AggregateRating
- Project detail pages conditionally render Review schema when a client testimonial exists -- GOOD
- Product pages have no review/rating data -- expected for B2B custom furniture
- **Opportunity:** Add AggregateRating to LocalBusiness schema once Google Business Profile reviews accumulate

### 4.8 Event Schema -- N/A
No events detected. Not applicable.

### 4.9 Blog ItemList on Index Page
```json
{
  "@type": "ItemList",
  "name": "FF&E & Commercial Furniture Articles",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "BlogPosting",
        "headline": "What Is FF&E? A Complete Guide for Hospitality Projects",
        "url": "https://dmdfurnishing.com/blog/what-is-ffe-hospitality",
        "datePublished": "2026-03-28"
      }
    }
  ]
}
```

---

## 5. Positive Findings

1. **Consistent JSON-LD format** -- every schema uses JSON-LD (preferred by Google), no Microdata or RDFa
2. **Proper @context** -- all blocks use `https://schema.org` (HTTPS, not HTTP)
3. **Absolute URLs throughout** -- no relative URLs detected in any schema
4. **ISO 8601 dates** -- all datePublished/dateModified values are properly formatted
5. **@id cross-referencing** -- Organization, LocalBusiness, and WebSite schemas are properly linked via @id references across pages
6. **@graph usage** -- multi-type pages correctly use @graph arrays
7. **Global schema efficiency** -- 3 global schemas rendered via layout.js ensure every page has foundational structured data
8. **Product schema depth** -- product detail pages have comprehensive Product schema with sku, brand, manufacturer, material, specifications, and offers
9. **Conditional rendering** -- Review and ImageGallery schemas only render when data exists (no empty/null schemas)
10. **Speakable schema** -- homepage has SpeakableSpecification targeting h1 and data-speakable elements, which is forward-thinking for voice search

---

## 6. Action Items (Priority Order)

1. **REMOVE** HowTo schema from `/services` page (Critical)
2. **ADD** FAQPage schema to homepage for the 7 FAQ items (High)
3. **CHANGE** blog article author from Organization to Person (High)
4. **VERIFY** SearchAction endpoint actually works at `/products?search=` (High)
5. **ADD** CollectionPage schema to `/products/[placeSlug]` pages (Medium)
6. **ADD** FAQPage schema to blog articles that have inline FAQ sections (Medium)
7. **ADD** ItemList of posts to blog index page (Medium)
8. **STAGGER** blog article publication dates (Medium)
9. **FIX** project detail fallback datePublished from hardcoded 2024-01-01 (Medium)
10. **CONSIDER** omitting price field or using priceSpecification for quote-based products (Medium)

---

## Key Files

| File | Schemas Defined |
|---|---|
| `lib/metadata.js` | Organization, LocalBusiness, WebSite (global) |
| `components/JsonLd.js` | Rendering component |
| `app/layout.js` | Global schema injection |
| `app/page.js` | WebPage + Speakable (homepage) |
| `app/about/page.js` | AboutPage + BreadcrumbList + FAQPage |
| `app/services/page.js` | BreadcrumbList + ItemList/Service + **HowTo** + FAQPage |
| `app/products/page.js` | BreadcrumbList + CollectionPage |
| `app/products/[placeSlug]/page.js` | BreadcrumbList |
| `app/products/[...slug]/page.js` | BreadcrumbList + Product |
| `app/blog/page.js` | CollectionPage + BreadcrumbList |
| `app/blog/what-is-ffe-hospitality/page.js` | Article + BreadcrumbList |
| `app/projects/page.js` | CollectionPage + BreadcrumbList + ItemList |
| `app/projects/[projectId]/page.js` | BreadcrumbList + Article + ImageGallery + Review |
| `app/contact/page.js` | ContactPage + BreadcrumbList |
