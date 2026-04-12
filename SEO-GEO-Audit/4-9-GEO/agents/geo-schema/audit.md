# GEO Schema Audit -- DMD Furnishing

**Site:** https://dmdredesign.netlify.app (production: https://dmdfurnishing.com)
**Date:** 2026-04-09
**Agent:** geo-schema
**Focus:** Structured data + entity graph construction for AI platform discoverability

---

## 1. Schema Detection Summary

| Page | Schema Types Detected | Delivery Method | Valid JSON-LD |
|------|----------------------|-----------------|---------------|
| Root Layout (all pages) | Organization, LocalBusiness, WebSite | `<JsonLd>` component (SSR) | YES |
| Homepage `/` | WebPage + SpeakableSpecification | `<JsonLd>` component (SSR) | YES |
| Products `/products` | BreadcrumbList, CollectionPage | Inline `dangerouslySetInnerHTML` (SSR) | YES |
| Services `/services` | BreadcrumbList, ItemList(Service), HowTo, FAQPage | Inline `dangerouslySetInnerHTML` (SSR) | YES |
| About `/about` | AboutPage, BreadcrumbList, FAQPage | Inline `dangerouslySetInnerHTML` (SSR) | YES |
| Contact `/contact` | ContactPage, BreadcrumbList | Inline `dangerouslySetInnerHTML` (SSR) | YES |
| Blog Index `/blog` | CollectionPage + BreadcrumbList | `<JsonLd>` component (SSR) | YES |
| Blog Articles (x6) | Article + BreadcrumbList | `<JsonLd>` component (SSR) | YES |
| Projects `/projects` | CollectionPage, BreadcrumbList, ItemList | Inline `dangerouslySetInnerHTML` (SSR) | YES |
| Inspirations `/inspirations` | CollectionPage, BreadcrumbList, ItemList | Inline `dangerouslySetInnerHTML` (SSR) | YES |

**Delivery:** All schemas are rendered server-side via Next.js App Router (NOT client-side JS-injected). This is correct for GEO.

---

## 2. sameAs Audit

### Current sameAs URLs (in both Organization and LocalBusiness schemas)

| URL | HTTP Status | Verdict |
|-----|-------------|---------|
| `https://facebook.com/dmdfurnishing` | Redirects to login/generic page | UNVERIFIABLE -- page existence cannot be confirmed without auth; likely does not exist as a business page |
| `https://instagram.com/dmdfurnishing` | Loads generic Instagram shell | UNVERIFIABLE -- no profile data visible; likely does not exist |
| `https://linkedin.com/company/dmdfurnishing` | **404 Not Found** | BROKEN -- confirmed dead link |
| `https://pinterest.com/dmdfurnishing` | Loads Pinterest shell | UNVERIFIABLE -- no profile data visible |

Also tested:
| URL | HTTP Status | Verdict |
|-----|-------------|---------|
| `https://www.linkedin.com/company/dmdfurnishing` | **404 Not Found** | BROKEN |
| `https://www.linkedin.com/company/dmd-furnishing` | **404 Not Found** | BROKEN |

### sameAs Verdict

- **0 of 4 sameAs URLs are confirmed working**
- LinkedIn is confirmed broken (404)
- Facebook, Instagram, Pinterest cannot be verified but likely do not represent real business profiles
- **No Wikipedia/Wikidata sameAs links** -- critical gap for entity graph construction
- **No YouTube, Twitter/X, or Google Knowledge Graph links**

### Impact on GEO

sameAs is the primary mechanism by which AI platforms (ChatGPT, Perplexity, Gemini, Claude) build entity confidence. Broken or fake sameAs URLs actively harm entity recognition. AI systems cross-reference sameAs targets to validate that an entity is real and authoritative. Linking to non-existent profiles signals a thin or fabricated entity.

---

## 3. Schema Issues Found

### CRITICAL Issues

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | **LinkedIn sameAs returns 404** | `lib/metadata.js` lines 99, 150 | Broken entity graph link; AI platforms flag as unreliable |
| 2 | **Facebook sameAs likely non-existent** | `lib/metadata.js` lines 97, 148 | Phantom entity reference |
| 3 | **No Wikipedia/Wikidata sameAs** | `lib/metadata.js` | Zero knowledge graph anchor; AI platforms cannot cross-reference entity |
| 4 | **LocalBusiness type should be FurnitureStore** | `lib/metadata.js` line 105 | Generic type loses semantic precision; `FurnitureStore` is a valid schema.org subtype |
| 5 | **Blog author uses @type:Organization instead of Person** | All 6 blog article pages | Google and AI platforms expect `Person` for article authorship; Organization as author triggers warnings |
| 6 | **HowTo schema on /services is deprecated for this use case** | `app/services/page.js` line 322 | HowTo is for user-performable tasks, not business process descriptions; should be removed or replaced |

### HIGH Issues

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 7 | **Organization and LocalBusiness are disconnected** | `lib/metadata.js` | No `@id` cross-reference between them; should use `parentOrganization` |
| 8 | **No `foundingDate` on Organization** | `lib/metadata.js` | Missing entity signal for AI platforms |
| 9 | **No `numberOfEmployees` on Organization** | `lib/metadata.js` | Missing entity signal |
| 10 | **No `naics` or `isicV4` industry code** | `lib/metadata.js` | Industry classification helps AI categorize the entity |
| 11 | **No `knowsAbout` on Organization** | `lib/metadata.js` | Explicit topic expertise signals for GEO |
| 12 | **No `areaServed` on Organization** | `lib/metadata.js` (only on ContactPoint) | Should be top-level for entity geographic scope |
| 13 | **sameAs duplicated in both Organization and LocalBusiness** | `lib/metadata.js` | Redundant; should only be on Organization; LocalBusiness should reference it |
| 14 | **WebSite schema missing `publisher`** | `lib/metadata.js` line 156 | Should reference the Organization |

### MEDIUM Issues

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 15 | **Blog articles all have same datePublished and dateModified** | All blog pages | Signals no content freshness; dateModified should be updated when articles are revised |
| 16 | **No `speakable` on blog articles** | Blog article pages | Missed opportunity for voice assistant surfacing |
| 17 | **No `FAQPage` schema on homepage** | `app/page.js` | Homepage has 7 FAQ items but no FAQPage schema for them |
| 18 | **Inspirations schema uses `CreativeWork` generically** | `app/inspirations/page.js` | Could use `VisualArtwork` or `ImageGallery` for better specificity |
| 19 | **Projects ItemList uses `Article` type** | `app/projects/page.js` | Projects are better described as `CreativeWork` |

---

## 4. Scoring

| Criterion | Max | Score | Notes |
|-----------|-----|-------|-------|
| Organization/LocalBusiness present + valid | 15 | 12 | Present but LocalBusiness should be FurnitureStore; schemas disconnected |
| sameAs links present + valid + 3+ platforms | 15 | 3 | 4 URLs present but 0 confirmed working; no knowledge graph anchors |
| Article schema with Author + dateModified | 10 | 5 | Present on all 6 articles but author is Organization (should be Person); dateModified never updated |
| Business-specific schema type | 10 | 4 | Uses generic LocalBusiness instead of FurnitureStore |
| Speakable property | 5 | 3 | Present on homepage only; missing from blog articles |
| JSON-LD format (not Microdata) | 10 | 10 | All schemas use JSON-LD correctly |
| No deprecated schemas | 5 | 2 | HowTo on /services is misused |
| No JS-injected schemas | 10 | 10 | All SSR-rendered via Next.js App Router |
| Required properties all present | 10 | 7 | Missing foundingDate, numberOfEmployees, knowsAbout, publisher on WebSite |
| sameAs URLs resolving (HTTP 200) | 10 | 0 | LinkedIn 404; others unverifiable/likely non-existent |

### **TOTAL: 56 / 100**

---

## 5. GEO Impact Assessment

### Entity Graph Status: WEAK

DMD Furnishing currently has a **fragile entity graph**. The structured data exists in the right format (JSON-LD, SSR) but the entity identity signals are thin:

1. **No knowledge graph anchors** -- Without Wikipedia/Wikidata sameAs links, AI platforms have no authoritative external source to validate the entity. This is the single biggest blocker for GEO.

2. **Broken social proof** -- The LinkedIn 404 and likely-phantom Facebook/Instagram profiles make the entity look fabricated to AI systems that cross-check sameAs targets.

3. **Generic business typing** -- `LocalBusiness` is too broad. AI platforms parsing structured data for "furniture store in Massachusetts" will weight `FurnitureStore` entities higher.

4. **No expertise signals** -- Missing `knowsAbout`, `hasCredential`, and industry codes mean AI platforms must infer expertise from content alone rather than from structured declarations.

5. **Author identity gap** -- Using Organization as blog article author prevents building a separate expert entity graph that AI platforms use for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals.

### What AI Platforms See Today

When ChatGPT, Perplexity, or Gemini encounter DMD Furnishing:
- They find a `LocalBusiness` in Foxboro, MA (generic category)
- They attempt to cross-reference 4 social profiles and find 0 confirmed
- They have no Wikipedia/Wikidata anchor to validate the entity exists
- They cannot attribute blog expertise to a named person
- They classify it as a **low-confidence entity** with limited citation potential

---

## 6. Ready-to-Implement JSON-LD Templates

### 6A. Enhanced Organization Schema (replace current in `lib/metadata.js`)

```javascript
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'DMD Furnishing',
  legalName: 'DMD Furnishing LLC',
  url: siteUrl,
  email: 'Sales@DMDFurnishing.com',
  telephone: '+1-617-223-7781',
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/DMD_Furnishing_Logo_Embedded.svg`,
    width: 300,
    height: 100,
  },
  image: `${siteUrl}/Images/About_DMD_Furnishing_Page.jpg`,
  description:
    'Custom commercial furniture manufacturer specializing in hospitality FF&E. Design, manufacturing, and installation for hotels, restaurants, offices, and institutional spaces.',
  // foundingDate: 'YYYY', // ADD WHEN KNOWN -- do not fabricate
  // numberOfEmployees: { '@type': 'QuantitativeValue', value: N }, // ADD WHEN KNOWN
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-617-223-7781',
    contactType: 'sales',
    areaServed: 'US',
    availableLanguage: 'en',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '56 Leonard St Unit 5',
    addressLocality: 'Foxboro',
    addressRegion: 'MA',
    postalCode: '02035',
    addressCountry: 'US',
  },
  knowsAbout: [
    'commercial furniture manufacturing',
    'hospitality FF&E',
    'hotel guestroom furniture',
    'restaurant seating',
    'custom casegoods',
    'value engineering',
    'FF&E procurement',
    'furniture installation',
  ],
  sameAs: [
    // ONLY include URLs that are confirmed working and represent real profiles
    // 'https://www.linkedin.com/company/CORRECT-SLUG', // FIX: find real LinkedIn URL
    // 'https://www.instagram.com/REAL-HANDLE/',         // FIX: confirm real profile
    // 'https://www.facebook.com/REAL-PAGE/',             // FIX: confirm real page
    // 'https://www.pinterest.com/REAL-HANDLE/',          // FIX: confirm real profile
    // 'https://en.wikipedia.org/wiki/DMD_Furnishing',   // CREATE when notable
    // 'https://www.wikidata.org/wiki/QXXXXXXX',         // CREATE after Wikipedia
    // 'https://www.youtube.com/@dmdfurnishing',          // CREATE channel
  ],
};
```

### 6B. Enhanced LocalBusiness Schema (replace current in `lib/metadata.js`)

```javascript
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',  // CHANGED from LocalBusiness
  '@id': `${siteUrl}/#localbusiness`,
  name: 'DMD Furnishing',
  image: `${siteUrl}/Images/About_DMD_Furnishing_Page.jpg`,
  url: siteUrl,
  telephone: '+1-617-223-7781',
  priceRange: '$$$',
  parentOrganization: { '@id': `${siteUrl}/#organization` },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '56 Leonard St Unit 5',
    addressLocality: 'Foxboro',
    addressRegion: 'MA',
    postalCode: '02035',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.0654,
    longitude: -71.2478,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '16:00',
    },
  ],
  description:
    'Custom commercial furniture manufacturer specializing in hospitality FF&E. Design, manufacturing, and installation for hotels, restaurants, offices, and institutional spaces.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Commercial Furniture Collections',
    url: `${siteUrl}/products`,
  },
  // sameAs REMOVED -- only needed on Organization; LocalBusiness references it via parentOrganization
};
```

### 6C. Enhanced WebSite Schema (replace current in `lib/metadata.js`)

```javascript
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  publisher: { '@id': `${siteUrl}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/products?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};
```

### 6D. Blog Article Author Fix (apply to all 6 blog articles)

Replace:
```javascript
author: {
  '@type': 'Organization',
  name: 'DMD Furnishing',
  url: siteUrl,
},
```

With:
```javascript
author: {
  '@type': 'Person',
  name: 'DMD Furnishing Editorial',
  url: `${siteUrl}/about`,
  worksFor: { '@id': `${siteUrl}/#organization` },
},
```

Or better, if there is a real person who writes/reviews:
```javascript
author: {
  '@type': 'Person',
  name: 'REAL AUTHOR NAME',
  jobTitle: 'THEIR TITLE',
  url: `${siteUrl}/about`,
  worksFor: { '@id': `${siteUrl}/#organization` },
},
```

### 6E. Services Page -- Remove HowTo, Keep Service ItemList

Remove the HowTo block entirely from `app/services/page.js` (lines 322-333 of the serviceSchema). The process steps are a business workflow, not a user-performable HowTo. The Service ItemList and FAQPage schema are correct and should remain.

### 6F. Homepage FAQPage Schema Addition

Add to `app/page.js` alongside the existing WebPage schema:

```javascript
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is FF&E and why does it matter for hospitality projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FF&E stands for Furniture, Fixtures & Equipment...',
      },
    },
    // ... remaining 6 FAQ items
  ],
};
```

---

## 7. Priority Actions

### P0 -- Do Immediately (entity graph is actively harmed)

1. **Remove or fix all broken sameAs URLs** in `lib/metadata.js`
   - Remove `https://linkedin.com/company/dmdfurnishing` (confirmed 404)
   - Remove `https://facebook.com/dmdfurnishing` unless confirmed real page
   - Remove `https://instagram.com/dmdfurnishing` unless confirmed real profile
   - Remove `https://pinterest.com/dmdfurnishing` unless confirmed real profile
   - **Rule: never include a sameAs URL you cannot visit in a browser and confirm shows your business**

2. **Change LocalBusiness to FurnitureStore** in `lib/metadata.js` line 105

3. **Remove HowTo schema from /services** in `app/services/page.js`

### P1 -- Do This Sprint (significant GEO improvement)

4. **Create real social profiles** on LinkedIn, Instagram, and optionally YouTube
   - Populate each with real content (logo, description, at least a few posts)
   - Only add to sameAs after they are live and populated

5. **Fix blog article author type** -- change from Organization to Person across all 6 blog articles

6. **Add `publisher` to WebSite schema** referencing the Organization

7. **Add `knowsAbout` to Organization schema** with topic expertise array

8. **Add `parentOrganization` to LocalBusiness** referencing the Organization

9. **Add FAQPage schema to homepage** for the 7 FAQ items

### P2 -- Do Next Sprint (entity graph strengthening)

10. **Add `foundingDate` and `numberOfEmployees`** to Organization when verifiable data is available

11. **Add `speakable` to blog articles**

12. **Create a Wikipedia article** for DMD Furnishing (requires notability -- may need PR/press coverage first)

13. **Create a Wikidata entity** (can be done before Wikipedia if basic facts are verifiable)

14. **Add YouTube channel** to sameAs (create channel with project walkthroughs, material comparisons)

15. **Update `dateModified`** on blog articles when content is revised

### P3 -- Future (advanced entity optimization)

16. **Add industry codes** (`naics`, `isicV4`) to Organization
17. **Add `hasCredential`** if any certifications exist
18. **Add `memberOf`** if part of any industry associations (AHLA, BIFMA, etc.)
19. **Consider `Person` entities** for key team members with their own expertise graphs

---

## 8. Files to Modify

| File | Changes Needed |
|------|---------------|
| `lib/metadata.js` | Replace organizationSchema, localBusinessSchema, websiteSchema per templates above |
| `app/services/page.js` | Remove HowTo block from serviceSchema |
| `app/page.js` | Add FAQPage schema |
| `app/blog/what-is-ffe-hospitality/page.js` | Change author @type from Organization to Person |
| `app/blog/hotel-guestroom-furniture-checklist/page.js` | Change author @type from Organization to Person |
| `app/blog/hpl-veneer-solid-wood-hotel-casegoods/page.js` | Change author @type from Organization to Person |
| `app/blog/value-engineering-commercial-furniture/page.js` | Change author @type from Organization to Person |
| `app/blog/restaurant-seating-guide/page.js` | Change author @type from Organization to Person |
| `app/blog/ffe-procurement-timeline/page.js` | Change author @type from Organization to Person |
