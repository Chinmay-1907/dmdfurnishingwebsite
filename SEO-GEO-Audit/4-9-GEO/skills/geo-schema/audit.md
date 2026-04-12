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
| `https://facebook.com/dmdfurnishing` | Redirects to login/generic page | UNVERIFIABLE -- likely does not exist as a business page |
| `https://instagram.com/dmdfurnishing` | Loads generic Instagram shell | UNVERIFIABLE -- likely does not exist |
| `https://linkedin.com/company/dmdfurnishing` | **404 Not Found** | BROKEN -- confirmed dead link |
| `https://pinterest.com/dmdfurnishing` | Loads Pinterest shell | UNVERIFIABLE -- no profile data visible |

- **0 of 4 sameAs URLs are confirmed working**
- **No Wikipedia/Wikidata sameAs links** -- critical gap for entity graph construction
- **No YouTube, Twitter/X, or Google Knowledge Graph links**

---

## 3. Issues Found (19 total)

### CRITICAL (6)

1. LinkedIn sameAs returns 404 (`lib/metadata.js`)
2. Facebook sameAs likely non-existent (`lib/metadata.js`)
3. No Wikipedia/Wikidata sameAs (`lib/metadata.js`)
4. LocalBusiness type should be FurnitureStore (`lib/metadata.js` line 105)
5. Blog author uses @type:Organization instead of Person (all 6 blog articles)
6. HowTo schema on /services is deprecated for this use case (`app/services/page.js`)

### HIGH (8)

7. Organization and LocalBusiness schemas are disconnected
8. No `foundingDate` on Organization
9. No `numberOfEmployees` on Organization
10. No `naics` or `isicV4` industry code
11. No `knowsAbout` on Organization
12. No top-level `areaServed` on Organization
13. sameAs duplicated in both Organization and LocalBusiness
14. WebSite schema missing `publisher`

### MEDIUM (5)

15. Blog articles all have same datePublished and dateModified
16. No `speakable` on blog articles
17. No `FAQPage` schema on homepage (7 FAQ items present)
18. Inspirations schema uses generic `CreativeWork`
19. Projects ItemList uses `Article` type instead of `CreativeWork`

---

## 4. Score: 56 / 100

| Criterion | Max | Score |
|-----------|-----|-------|
| Organization/LocalBusiness present + valid | 15 | 12 |
| sameAs links present + valid + 3+ platforms | 15 | 3 |
| Article schema with Author + dateModified | 10 | 5 |
| Business-specific schema type | 10 | 4 |
| Speakable property | 5 | 3 |
| JSON-LD format (not Microdata) | 10 | 10 |
| No deprecated schemas | 5 | 2 |
| No JS-injected schemas | 10 | 10 |
| Required properties all present | 10 | 7 |
| sameAs URLs resolving (HTTP 200) | 10 | 0 |

---

## 5. Priority Actions

### P0 -- Immediate

1. Remove or fix all broken sameAs URLs in `lib/metadata.js`
2. Change LocalBusiness to FurnitureStore
3. Remove HowTo schema from /services

### P1 -- This Sprint

4. Create real social profiles (LinkedIn, Instagram, YouTube) -- add to sameAs only when live
5. Fix blog article author type to Person (all 6 articles)
6. Add `publisher` to WebSite schema
7. Add `knowsAbout` to Organization schema
8. Add `parentOrganization` to LocalBusiness
9. Add FAQPage schema to homepage

### P2 -- Next Sprint

10. Add `foundingDate` and `numberOfEmployees` (when verifiable)
11. Add `speakable` to blog articles
12. Create Wikipedia article / Wikidata entity
13. Add YouTube channel to sameAs
14. Update `dateModified` on blog articles

---

## 6. JSON-LD Templates

See `agents/geo-schema/audit.md` section 6 for complete ready-to-implement templates covering:
- 6A: Enhanced Organization schema
- 6B: Enhanced LocalBusiness (FurnitureStore) schema
- 6C: Enhanced WebSite schema with publisher
- 6D: Blog article author fix (Organization -> Person)
- 6E: Services page HowTo removal
- 6F: Homepage FAQPage addition

---

## 7. Files to Modify

| File | Changes |
|------|---------|
| `lib/metadata.js` | Replace all 3 schema objects |
| `app/services/page.js` | Remove HowTo block |
| `app/page.js` | Add FAQPage schema |
| `app/blog/*/page.js` (6 files) | Change author @type to Person |
