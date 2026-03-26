# Schema / Structured Data Audit - DMD Furnishing

**Date:** 2026-03-25
**Business Type:** B2B Commercial Furniture Manufacturer (Hospitality FF&E)

---

## Overall Schema Score: 30/100

---

## 1. Currently Implemented Schema (7 Instances)

| # | Schema Type | File:Line | Scope | Status |
|---|------------|-----------|-------|--------|
| 1 | `Organization` | `SEO.js:7-28` | Every page | Issues found |
| 2 | `LocalBusiness` | `SEO.js:30-59` | Every page | Issues found |
| 3 | `Organization` (duplicate) | `Home.js:84-104` | Homepage only | DUPLICATE |
| 4 | `Product` + `BreadcrumbList` (@graph) | `ProductDetail.js:255-286` | Product detail pages | Incomplete |
| 5 | `BreadcrumbList` | `seo.js:115-129` | Projects pages | OK |
| 6 | `Product` (utility function) | `seo.js:131-156` | NEVER CALLED | Dead code |
| 7 | **`Project` (INVALID TYPE)** | **`seo.js:169`** | Project detail pages | **INVALID** |

### Architectural Critical Issue
All 7 schema instances are injected via JavaScript `useEffect` / DOM manipulation. They are **invisible to non-JS crawlers**. This includes GPTBot, ClaudeBot, PerplexityBot, and social media scrapers.

---

## 2. Validation Issues

### 2.1 Organization Schema (`SEO.js:7-28`)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DMD Furnishing",
  "url": "https://dmdfurnishing.com",
  "logo": "https://dmdfurnishing.com/logo.png",  // BROKEN - file does not exist
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-617-223-7781",
    "contactType": "sales",
    "areaServed": "US",
    "availableLanguage": "en"
  },
  "address": { ... }
}
```

**Issues:**
| Field | Issue | Severity |
|-------|-------|----------|
| `logo` | References `/logo.png` which does NOT exist | Critical |
| `@id` | Missing — required for entity disambiguation | High |
| `sameAs` | Missing — social profiles not linked | High |
| `description` | Missing — business description | Medium |
| `foundingDate` | Missing | Low |
| `numberOfEmployees` | Missing | Low |

### 2.2 LocalBusiness Schema (`SEO.js:30-59`)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "DMD Furnishing",
  "image": "https://dmdfurnishing.com/logo.png",  // BROKEN
  "@id": "https://dmdfurnishing.com/#localbusiness",
  "url": "https://dmdfurnishing.com",
  "telephone": "+1-617-223-7781",
  "priceRange": "$$$",
  "address": { ... },
  "openingHoursSpecification": { ... }
}
```

**Issues:**
| Field | Issue | Severity |
|-------|-------|----------|
| `image` | References `/logo.png` which does NOT exist | Critical |
| `sameAs` | Missing — social profiles not linked | High |
| `geo` | Missing — latitude/longitude for local search | High |
| `description` | Missing | Medium |
| `hasOfferCatalog` | Missing — could link to products | Low |

### 2.3 Duplicate Organization (`Home.js:84-104`)
Homepage defines a **second** Organization schema with slight differences:
- Includes `email` field (which `SEO.js` version does not)
- Same broken `logo.png` reference
- **Impact:** Two competing Organization blocks on homepage — Google may pick the wrong one

### 2.4 Product Schema (`ProductDetail.js:255-263`)
```javascript
const productLd = {
  '@type': 'Product',
  '@id': canonicalUrl,
  name: product.name,
  description: product.description,
  image: [...],
  brand: { '@type': 'Brand', name: 'DMD Furnishing' },
  sku: product.id,
  // MISSING: offers, category, manufacturer, aggregateRating
};
```

**Issues:**
| Field | Issue | Severity |
|-------|-------|----------|
| `offers` | Missing — **required for Product rich results** | Critical |
| `category` | Missing — could use institution/furnitureType | Medium |
| `manufacturer` | Missing — could be DMD Furnishing | Low |
| `aggregateRating` | Missing — if reviews exist | Low |
| `@context` | Present only at `@graph` level — correct | OK |

### 2.5 BreadcrumbList (`ProductDetail.js:265-274`)
```javascript
const breadcrumbsLd = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { position: 1, name: 'Products', item: `${origin}/products` },
    { position: 2, name: institution.name, ... },
    { position: 3, name: furnitureType.name, ... },
    { position: 4, name: subcategory.name, ... },
    { position: 5, name: product.name, item: canonicalUrl },
  ],
};
```

**Issue:** Missing "Home" as position 1. Should start with:
```javascript
{ position: 1, name: 'Home', item: `${origin}/` },
{ position: 2, name: 'Products', item: `${origin}/products` },
// ...
```

### 2.6 Invalid "Project" Type (`seo.js:169`)
```javascript
const json = {
  '@context': 'https://schema.org',
  '@type': 'Project',  // NOT A VALID SCHEMA.ORG TYPE
  name, description, image, url
};
```
**Fix:** Change to `CreativeWork` or `Article`.

### 2.7 Dead Code (`seo.js:131-156`)
`setProductJsonLd()` function is defined but never imported or called anywhere. The `ProductDetail.js` component builds its own Product schema inline instead.

---

## 3. Missing Schema — Recommendations with Code

### 3.1 FAQPage Schema (HIGH PRIORITY)
**Where:** `ScheduleCall.js` — 6 FAQ items at lines 121-149

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the consultation free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our initial consultation is completely free with no obligation."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need finalized drawings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. We can work from early concepts, rough sketches, or even verbal descriptions. Our team helps refine requirements during the consultation."
      }
    },
    {
      "@type": "Question",
      "name": "Can you work with my designer or architect?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We regularly collaborate with interior designers, architects, and project managers to deliver furniture that fits the overall design vision."
      }
    },
    {
      "@type": "Question",
      "name": "Do you handle small renovations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We work on projects of all sizes, from single-room refreshes to full property renovations."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer value engineering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Value engineering is a core part of our process. We help clients achieve their design goals while optimizing costs through material selection, manufacturing methods, and sourcing strategies."
      }
    },
    {
      "@type": "Question",
      "name": "Can this lead to an in-person meeting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. If the initial call goes well, we can arrange an in-person meeting, site visit, or showroom tour as a next step."
      }
    }
  ]
}
```

**Impact:** FAQ rich results have high CTR in search. This is the lowest-effort, highest-impact schema addition.

### 3.2 Service Schema (HIGH PRIORITY)
**Where:** `Services.js` — 6 services defined at lines 42-97

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "DMD Furnishing Services",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Custom Furniture Design",
        "description": "Tailored furniture design for hospitality and commercial environments.",
        "provider": {
          "@type": "Organization",
          "name": "DMD Furnishing"
        },
        "areaServed": "US",
        "serviceType": "Furniture Design"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Manufacturing & Production",
        "description": "Custom manufacturing with domestic and overseas production options.",
        "provider": { "@type": "Organization", "name": "DMD Furnishing" },
        "areaServed": "US",
        "serviceType": "Furniture Manufacturing"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "FF&E Procurement & Sourcing",
        "description": "Strategic sourcing and procurement for furniture, fixtures, and equipment.",
        "provider": { "@type": "Organization", "name": "DMD Furnishing" },
        "areaServed": "US",
        "serviceType": "FF&E Procurement"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Delivery & Installation",
        "description": "Coordinated delivery and professional installation of commercial furniture.",
        "provider": { "@type": "Organization", "name": "DMD Furnishing" },
        "areaServed": "US",
        "serviceType": "Furniture Installation"
      }
    }
  ]
}
```

### 3.3 WebSite Schema with SearchAction (MEDIUM PRIORITY)
**Where:** Global (add to `SEO.js` or `index.html`)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DMD Furnishing",
  "url": "https://dmdfurnishing.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://dmdfurnishing.com/products?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### 3.4 Fixed Organization Schema (CRITICAL)
Replace current broken schema with:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://dmdfurnishing.com/#organization",
  "name": "DMD Furnishing",
  "url": "https://dmdfurnishing.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://dmdfurnishing.com/DMD_Furnishing_Logo_Embedded.svg",
    "width": 300,
    "height": 100
  },
  "description": "Custom commercial furniture manufacturer specializing in hospitality FF&E. Design, manufacturing, and installation for hotels, restaurants, offices, and institutional spaces.",
  "telephone": "+1-617-223-7781",
  "email": "Sales@DMDFurnishing.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "56 Leonard St Unit 5",
    "addressLocality": "Foxboro",
    "addressRegion": "MA",
    "postalCode": "02035",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-617-223-7781",
    "contactType": "sales",
    "email": "Sales@DMDFurnishing.com",
    "areaServed": "US",
    "availableLanguage": "en"
  },
  "sameAs": [
    "https://facebook.com/dmdfurnishing",
    "https://instagram.com/dmdfurnishing",
    "https://linkedin.com/company/dmdfurnishing",
    "https://pinterest.com/dmdfurnishing"
  ]
}
```

### 3.5 Inline Static Schema in `index.html` (QUICK WIN)
Add Organization and WebSite schema directly in `public/index.html` `<head>` so they are visible even without JS:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://dmdfurnishing.com/#organization",
      "name": "DMD Furnishing",
      "url": "https://dmdfurnishing.com",
      "logo": "https://dmdfurnishing.com/DMD_Furnishing_Logo_Embedded.svg",
      "telephone": "+1-617-223-7781",
      "email": "Sales@DMDFurnishing.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "56 Leonard St Unit 5",
        "addressLocality": "Foxboro",
        "addressRegion": "MA",
        "postalCode": "02035",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://facebook.com/dmdfurnishing",
        "https://instagram.com/dmdfurnishing",
        "https://linkedin.com/company/dmdfurnishing",
        "https://pinterest.com/dmdfurnishing"
      ]
    },
    {
      "@type": "WebSite",
      "name": "DMD Furnishing",
      "url": "https://dmdfurnishing.com"
    }
  ]
}
</script>
```

This is the **lowest-effort partial fix** for the JS rendering problem — at least Organization and WebSite schema will be visible to all crawlers.

---

## 4. Prioritized Action List

| # | Action | Severity | Effort |
|---|--------|----------|--------|
| 1 | Fix broken `logo.png` references in SEO.js and Home.js | Critical | Trivial |
| 2 | Add inline Organization + WebSite schema to `index.html` | Critical | Low |
| 3 | Remove duplicate Organization from Home.js | High | Trivial |
| 4 | Fix invalid `@type: "Project"` to `CreativeWork` | High | Trivial |
| 5 | Add FAQPage schema to ScheduleCall.js | High | Low |
| 6 | Add `offers` to Product schema in ProductDetail.js | High | Low |
| 7 | Add `sameAs` to Organization schema | High | Trivial |
| 8 | Add "Home" as position 1 in BreadcrumbList | Medium | Trivial |
| 9 | Add Service schema to Services.js | Medium | Medium |
| 10 | Add WebSite schema with SearchAction | Medium | Low |
| 11 | Remove dead `setProductJsonLd` code from seo.js | Low | Trivial |
| 12 | Add `geo` coordinates to LocalBusiness | Low | Low |

---

## 5. Validation Checklist

| Check | Status |
|-------|--------|
| All `@type` values are valid Schema.org types | FAIL (`Project` invalid) |
| All required fields present | FAIL (`offers` missing on Product) |
| All URLs resolve (no 404s) | FAIL (`logo.png` is 404) |
| No duplicate schemas on same page | FAIL (Organization x2 on homepage) |
| Schema visible in static HTML | FAIL (all JS-only) |
| `@id` used for entity disambiguation | FAIL (missing on Organization in SEO.js) |
| Social profiles linked via `sameAs` | FAIL (not in schema) |
| BreadcrumbList starts with Home | FAIL (starts with Products) |

---

*Generated by Schema / Structured Data Audit*
