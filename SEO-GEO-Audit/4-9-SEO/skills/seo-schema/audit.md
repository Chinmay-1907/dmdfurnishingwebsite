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

## 2. Issues by Severity

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

## 3. Missing Schema Opportunities with Ready-to-Implement JSON-LD

### 3.1 Homepage FAQPage Schema
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is FF&E and why does it matter for hospitality projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FF&E stands for Furniture, Fixtures & Equipment -- the movable items in a commercial space..."
      }
    }
  ]
}
```

### 3.2 Person Author for Blog Articles
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

### 3.3 CollectionPage for Product Category Pages
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

### 3.4 Blog Index ItemList
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

## 4. Positive Findings

1. **Consistent JSON-LD format** -- every schema uses JSON-LD (preferred by Google), no Microdata or RDFa
2. **Proper @context** -- all blocks use `https://schema.org` (HTTPS, not HTTP)
3. **Absolute URLs throughout** -- no relative URLs detected in any schema
4. **ISO 8601 dates** -- all datePublished/dateModified values are properly formatted
5. **@id cross-referencing** -- Organization, LocalBusiness, and WebSite schemas are properly linked via @id references across pages
6. **@graph usage** -- multi-type pages correctly use @graph arrays
7. **Global schema efficiency** -- 3 global schemas rendered via layout.js ensure every page has foundational structured data
8. **Product schema depth** -- product detail pages have comprehensive Product schema with sku, brand, manufacturer, material, specifications, and offers
9. **Conditional rendering** -- Review and ImageGallery schemas only render when data exists (no empty/null schemas)
10. **Speakable schema** -- homepage has SpeakableSpecification for voice search readiness

---

## 5. Action Items (Priority Order)

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
| `app/products/[placeSlug]/page.js` | BreadcrumbList only |
| `app/products/[...slug]/page.js` | BreadcrumbList + Product |
| `app/blog/page.js` | CollectionPage + BreadcrumbList |
| `app/blog/*/page.js` | Article + BreadcrumbList |
| `app/projects/page.js` | CollectionPage + BreadcrumbList + ItemList |
| `app/projects/[projectId]/page.js` | BreadcrumbList + Article + ImageGallery + Review |
| `app/contact/page.js` | ContactPage + BreadcrumbList |
