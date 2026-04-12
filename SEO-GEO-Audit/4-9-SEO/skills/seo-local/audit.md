# Local SEO Audit: DMD Furnishing

**URL:** https://dmdredesign.netlify.app  
**Date:** 2026-04-09  
**Auditor:** seo-local agent  
**Business Type:** Hybrid (physical showroom + service area business)

---

## Overall Local SEO Score: 22/100

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| GBP Signals | 25% | 5/100 | 1.25 |
| Reviews & Reputation | 20% | 5/100 | 1.00 |
| Local On-Page SEO | 20% | 55/100 | 11.00 |
| NAP Consistency & Citations | 15% | 25/100 | 3.75 |
| Local Schema Markup | 10% | 45/100 | 4.50 |
| Local Link & Authority | 10% | 5/100 | 0.50 |
| **TOTAL** | **100%** | | **22.00** |

**Rating: CRITICAL** -- Local SEO is severely underdeveloped. The business has no Google Business Profile, zero local citations, no third-party reviews, and broken social media links. The on-page local content and schema markup are the only positive signals.

---

## 1. Business Type Assessment

**Classification: Hybrid (Showroom + Service Area Business)**

- Physical location: 56 Leonard St, Unit 5, Foxboro, MA 02035
- Showroom hours listed: Mon-Fri 9-6, Sat-Sun 10-4 (By Appointment Only)
- Service area: Nationwide (US)
- Homepage explicitly states: "Based in Foxboro, MA -- serving clients nationwide"
- Industry: Commercial/Hospitality Furniture, FF&E Manufacturing

**Implication:** DMD Furnishing should be listed as a Service Area Business (SAB) on GBP with the storefront also visible, since their service delivery is nationwide but they have a physical showroom.

---

## 2. NAP Consistency Analysis

### NAP Extraction by Source

| Source | Name | Address | Phone | Email |
|--------|------|---------|-------|-------|
| JSON-LD (Organization) | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | +1-617-223-7781 | Sales@DMDFurnishing.com |
| JSON-LD (LocalBusiness) | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | +1-617-223-7781 | (not in schema) |
| Footer (all pages) | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | +1 (617) 223-7781 | Sales@DMDFurnishing.com |
| Contact Page (visible) | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | +1 (617) 223-7781 | **sales@dmdfurnishing.com** |
| Header (nav) | DMD Furnishing | (none) | +1 (617) 223-7781 | (none) |
| About FAQ | DMD Furnishing | **56 Leonard Street, Unit 5, Foxboro, Massachusetts 02035** | (none) | (none) |
| Homepage FAQ | DMD Furnishing | **56 Leonard St, Foxboro, Massachusetts 02035** (missing Unit 5) | (none) | (none) |
| Website Policies | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | (none) | Sales@DMDFurnishing.com |

### Inconsistencies Found

| Issue | Severity | Location | Details |
|-------|----------|----------|---------|
| Email casing mismatch | LOW | Contact page (ContactPage.js:399) | Displays `sales@dmdfurnishing.com` vs. `Sales@DMDFurnishing.com` everywhere else. Email is case-insensitive for delivery but inconsistent display can confuse search engines. |
| Address abbreviation mismatch | MEDIUM | About page FAQ | Uses "56 Leonard Street" (full) vs. "56 Leonard St" (abbreviated) elsewhere. Also uses "Massachusetts" instead of "MA". |
| Missing "Unit 5" | MEDIUM | Homepage FAQ (page.js:349) | Address reads "56 Leonard St, Foxboro, Massachusetts 02035" -- missing "Unit 5". |
| Phone format in schema vs. display | LOW | metadata.js vs. visible text | Schema uses `+1-617-223-7781` (dashes), visible text uses `+1 (617) 223-7781` (parentheses). Both are valid but inconsistent. |
| No email in LocalBusiness schema | MEDIUM | metadata.js:104-153 | The `localBusinessSchema` object does not include an `email` property, only the Organization schema does. |

### NAP Consistency Score: 25/100

**Primary issue:** While the core NAP is mostly consistent across the site, there is no NAP presence whatsoever on any external platform (GBP, Yelp, BBB, directories). Internal consistency alone cannot compensate for the total absence of external citations.

---

## 3. Local Schema Markup Audit

### Schemas Present

| Schema Type | Present | File | Status |
|-------------|---------|------|--------|
| Organization | YES | lib/metadata.js (line 66) | Injected globally in layout.js |
| LocalBusiness | YES | lib/metadata.js (line 104) | Injected globally in layout.js |
| WebSite + SearchAction | YES | lib/metadata.js (line 156) | Injected globally in layout.js |
| ContactPage | YES | app/contact/page.js | Page-level |
| AboutPage + FAQPage | YES | app/about/page.js | Page-level |
| BreadcrumbList | YES | Multiple pages | Per-page |
| Service (ItemList) | YES | app/services/page.js | Services list |
| Review (per project) | YES | app/projects/[projectId]/page.js | Conditional |

### LocalBusiness Schema Validation

| Property | Present | Value | Issue |
|----------|---------|-------|-------|
| @type | YES | LocalBusiness | **WRONG SUBTYPE** -- Should be `FurnitureStore` or at minimum a more specific type. Generic `LocalBusiness` misses category signals. |
| name | YES | DMD Furnishing | OK |
| image | YES | Logo SVG | Should also include a photo of the showroom/business |
| @id | YES | `https://dmdfurnishing.com/#localbusiness` | OK |
| url | YES | `https://dmdfurnishing.com` | OK |
| telephone | YES | +1-617-223-7781 | OK |
| priceRange | YES | $$$ | OK |
| address | YES | Complete PostalAddress | OK |
| geo | YES | 42.0654, -71.2478 | OK |
| openingHoursSpecification | YES | Mon-Fri 9-18, Sat-Sun 10-16 | OK but missing "By Appointment Only" qualifier shown on contact page |
| email | **NO** | -- | Missing from LocalBusiness schema |
| description | YES | Full description | OK |
| hasOfferCatalog | YES | Points to /products | OK |
| sameAs | YES | 4 social URLs | LinkedIn URL is 404 (broken) |
| aggregateRating | **NO** | -- | No aggregate rating |
| review | **NO** | -- | No reviews in main schema (only per-project) |
| areaServed | **NO** | -- | Missing from LocalBusiness (only in Organization.contactPoint) |
| makesOffer / hasOfferCatalog | PARTIAL | Only catalog link | No specific service offers |
| paymentAccepted | **NO** | -- | Missing |
| currenciesAccepted | **NO** | -- | Missing |
| foundingDate | **NO** | -- | Missing |
| numberOfEmployees | **NO** | -- | Missing |

### Schema Issues Summary

1. **CRITICAL: Generic @type** -- `LocalBusiness` should be `FurnitureStore` (schema.org/FurnitureStore) for a furniture manufacturer/retailer
2. **HIGH: No aggregateRating** -- No review signals in the main schema
3. **HIGH: No areaServed** -- The LocalBusiness schema doesn't declare service area
4. **MEDIUM: Missing email** -- Only Organization schema has email, not LocalBusiness
5. **MEDIUM: Broken sameAs URL** -- LinkedIn returns 404
6. **LOW: No paymentAccepted, currenciesAccepted, foundingDate** -- Optional but helpful signals

### Local Schema Score: 45/100

---

## 4. Google Business Profile (GBP) Signals

### GBP Checklist

| Signal | Present | Details |
|--------|---------|---------|
| Google Maps embed on site | **NO** | No iframe or Maps API integration found anywhere |
| GBP link/button | **NO** | No "Find us on Google Maps" or directions link |
| Place ID reference | **NO** | No Google Place ID in codebase |
| "Get Directions" link | **NO** | No directions functionality |
| GBP reviews displayed | **NO** | No Google review widget or integration |
| GBP category match | **N/A** | Cannot verify -- no GBP listing appears to exist |
| GBP listing verified | **LIKELY NO** | Google Maps search returned no listing data |

### GBP Status: NOT CLAIMED / NOT CREATED

Based on the codebase analysis and attempted verification:
- Zero references to any Google Maps or Places API
- No Place ID, Maps embed, or directions link anywhere in the code
- Google Maps search for "DMD Furnishing Foxboro MA" returned no business listing data
- The seo-backlinks agent independently confirmed zero local citations

### GBP Score: 5/100

**This is the single most damaging gap in DMD Furnishing's local SEO.**

---

## 5. Reviews & Reputation Health

### On-Site Reviews

| Source | Count | Type | Quality |
|--------|-------|------|---------|
| Project testimonials | 0 genuine | All testimonials are from "DMD Furnishing Team" | **Self-testimonials are filtered out in schema** (code checks `clientName !== 'DMD Furnishing Team'`) |
| Dedicated reviews page | **NO** | Testimonials nav link is commented out in Header.js | Page does not exist |
| Third-party review widgets | **NO** | No Google, Yelp, or Houzz review integration | -- |

### External Review Presence

| Platform | Reviews | Rating | Status |
|----------|---------|--------|--------|
| Google Business Profile | 0 | N/A | No GBP listing exists |
| Yelp | 0 | N/A | No listing found |
| BBB | 0 | N/A | No listing found |
| Houzz | 0 | N/A | No listing found (relevant for furniture industry) |
| Facebook | Unknown | Unknown | Page requires login to verify |

### Review Health Assessment

- **Zero verified third-party reviews** across any platform
- All project "testimonials" are self-authored by the DMD Furnishing Team (correctly excluded from Review schema)
- No review generation strategy visible
- No review schema (aggregateRating) in structured data
- Commented-out testimonials page suggests planned but unimplemented feature

### Reviews Score: 5/100

---

## 6. Local On-Page SEO

### Location Signals in Content

| Signal | Present | Details |
|--------|---------|---------|
| City/State in title tags | PARTIAL | Layout default: "DMD Furnishing" (no location). Homepage: "Custom Hospitality Furniture & FF&E Solutions" (no location) |
| City/State in meta descriptions | YES | Layout: "...in Foxboro, MA"; About: "...in Foxboro, MA"; Contact: "Based in Foxboro, MA" |
| City/State in H1 tags | **NO** | No H1 on any page includes "Foxboro" or "Massachusetts" |
| Local content in body text | YES | Multiple pages mention Foxboro, MA and nationwide service |
| FAQ with local question | YES | "Where is DMD Furnishing located?" on homepage and about page |
| Address in footer (all pages) | YES | Full NAP in footer on every page |
| Phone in header (all pages) | YES | Clickable phone in header navigation |
| Local landing pages | **NO** | No city/region-specific pages (e.g., "/furniture-boston-ma") |
| Driving directions / parking info | **NO** | No information about how to visit the showroom |
| "By Appointment Only" clearly stated | YES | Contact page only |
| Service area explicitly defined | PARTIAL | "Nationwide" mentioned in copy, "US" in schema areaServed (Organization only) |

### Title Tag Audit (Local SEO Focus)

| Page | Title | Local Keyword? |
|------|-------|----------------|
| Homepage | Custom Hospitality Furniture & FF&E Solutions | NO |
| About | About DMD Furnishing \| Hospitality FF&E Manufacturer | NO |
| Contact | Contact Us \| Request a Consultation | NO |
| Services | Commercial Furniture Services \| FF&E Solutions | NO |
| Projects | Our Projects \| Commercial Furniture Portfolio | NO |

**None of the title tags contain geographic modifiers** (e.g., "Foxboro, MA" or "Massachusetts"). This is a missed opportunity for local search ranking signals.

### Local On-Page Score: 55/100

The on-page content is decent -- NAP in footer, phone in header, location mentions in copy and FAQs, and "Foxboro, MA" in meta descriptions. However, no titles contain location keywords, there are no local landing pages, and no driving directions or local map content.

---

## 7. Social Media & Local Authority

### Social Media URL Verification

| Platform | URL | Status | NAP Match |
|----------|-----|--------|-----------|
| Facebook | https://facebook.com/dmdfurnishing | Unknown (login wall) | Cannot verify |
| Instagram | https://instagram.com/dmdfurnishing | Unknown (login wall) | Cannot verify |
| LinkedIn | https://linkedin.com/company/dmdfurnishing | **404 -- BROKEN** | N/A -- page does not exist |
| Pinterest | https://pinterest.com/dmdfurnishing | Unknown (login wall) | Cannot verify |

### Social Media Issues

1. **CRITICAL: LinkedIn URL returns 404.** This broken link is in the footer of every page AND in both JSON-LD schemas (Organization + LocalBusiness sameAs arrays). Broken sameAs links degrade schema trustworthiness.
2. **HIGH: Social URLs use non-standard format.** All URLs use `https://facebook.com/` instead of `https://www.facebook.com/`. While these may redirect, the canonical forms with `www.` are preferred for sameAs declarations.
3. **UNKNOWN: Facebook, Instagram, Pinterest existence not verifiable** via unauthenticated fetch. Manual verification required.

### Citation & Directory Presence

| Directory/Platform | Listed | NAP Consistent | Notes |
|--------------------|--------|----------------|-------|
| Google Business Profile | **NO** | N/A | Not created |
| Yelp | **NO** | N/A | No listing |
| BBB (Better Business Bureau) | **NO** | N/A | No listing |
| Foxboro Chamber of Commerce | **NO** | N/A | No listing |
| Houzz | **NO** | N/A | No listing (important for furniture/design) |
| Manta | **NO** | N/A | No listing |
| Yellow Pages | **NO** | N/A | No listing |
| Apple Maps / Apple Business Connect | **NO** | N/A | Not verified |
| Bing Places | **NO** | N/A | Not verified |
| Industry directories (AHLA, NEWH) | **NO** | N/A | No membership/listing visible |

**Total citations found: 0**

### Local Link & Authority Score: 5/100

---

## 8. Service Area Coverage Assessment

DMD Furnishing is a hybrid business:
- **Physical location** in Foxboro, MA (showroom by appointment)
- **Service delivery** nationwide across the United States

### Current Implementation

| Aspect | Status | Notes |
|--------|--------|-------|
| Service area declared in schema | PARTIAL | Only `areaServed: 'US'` in Organization.contactPoint and Service schemas, NOT in LocalBusiness |
| Service area in copy | YES | "Serving clients nationwide" appears on homepage, about, contact, services, and blog pages |
| Local landing pages for key markets | **NO** | No pages targeting Boston, New England, or other specific markets |
| GeoCircle or GeoShape in schema | **NO** | No geographic service radius defined |

### Recommendation

For a hybrid SAB, DMD should:
1. Add `areaServed` to the LocalBusiness schema (currently missing)
2. Create location pages for key markets (Boston/New England, tri-state area, etc.)
3. On GBP, configure as SAB with showroom, defining service areas by state or region

---

## Recommendations by Severity

### CRITICAL (Fix Immediately)

| # | Recommendation | Impact | Effort |
|---|---------------|--------|--------|
| C1 | **Create and verify Google Business Profile.** Claim the listing, set category to "Furniture Store" or "Commercial Furniture Manufacturer", add all NAP data, photos, hours, and service area. | Unlocks entire local SEO channel. Required for Maps visibility, local pack, and review collection. | 2-4 hours |
| C2 | **Fix or remove broken LinkedIn URL.** The URL https://linkedin.com/company/dmdfurnishing returns 404. Either create the company page or remove the link from Footer.js and both sameAs arrays in metadata.js. | Broken sameAs links degrade structured data trust. Broken footer link creates bad UX. | 30 min |
| C3 | **Build foundational citations.** Submit consistent NAP to: Yelp, BBB, Bing Places, Apple Business Connect, Manta, Yellow Pages, Houzz, and Foxboro Chamber of Commerce. | Creates the citation foundation search engines use to verify business legitimacy. | 4-6 hours |

### HIGH (Fix This Sprint)

| # | Recommendation | Impact | Effort |
|---|---------------|--------|--------|
| H1 | **Change LocalBusiness @type to FurnitureStore.** In metadata.js line 106, change `'LocalBusiness'` to `'FurnitureStore'`. FurnitureStore is a valid schema.org subtype that provides stronger category signals. | More specific schema type improves relevance for furniture-related queries. | 5 min |
| H2 | **Add geographic modifiers to key title tags.** At minimum, add "Foxboro, MA" or "Massachusetts" to the homepage, about, and contact page titles. Example: "Custom Hospitality Furniture & FF&E Solutions \| Foxboro, MA" | Title tags are the strongest on-page ranking factor for local queries. | 30 min |
| H3 | **Add Google Maps embed to contact page.** Embed a Google Maps iframe showing the Foxboro location on ContactPage.js. | Maps embed signals location relevance and provides UX value for showroom visitors. | 1 hour |
| H4 | **Add aggregateRating to LocalBusiness schema.** Once reviews are collected (via GBP or other platforms), add aggregateRating to the schema. | Review signals directly impact local pack ranking. | 30 min (after reviews exist) |
| H5 | **Add areaServed to LocalBusiness schema.** Add `areaServed: { '@type': 'Country', 'name': 'US' }` to localBusinessSchema in metadata.js. | Declares service area for search engines; important for SAB businesses. | 10 min |
| H6 | **Add email to LocalBusiness schema.** Add `email: 'Sales@DMDFurnishing.com'` to localBusinessSchema in metadata.js. | Completes NAP+E in structured data. | 5 min |

### MEDIUM (Fix This Month)

| # | Recommendation | Impact | Effort |
|---|---------------|--------|--------|
| M1 | **Standardize address format across all pages.** Use "56 Leonard St, Unit 5" consistently. Fix homepage FAQ (missing "Unit 5") and about FAQ (uses "Street" instead of "St"). | NAP consistency is a local ranking factor. | 30 min |
| M2 | **Standardize email display format.** Change `sales@dmdfurnishing.com` on ContactPage.js:399 to `Sales@DMDFurnishing.com` to match all other pages. | Visual consistency; minor SEO impact but important for brand trust. | 5 min |
| M3 | **Create a review generation strategy.** After GBP is live, implement a post-project email sequence asking satisfied clients for Google reviews. Target 10+ reviews in first 3 months. | Reviews are a top-3 local ranking factor. | Ongoing |
| M4 | **Build a dedicated testimonials/reviews page.** The nav link is commented out in Header.js. Create the page with real client testimonials and link to external review platforms. | Provides social proof and additional local content. | 4-8 hours |
| M5 | **Use canonical social media URLs with www prefix.** Change `facebook.com` to `www.facebook.com`, `instagram.com` to `www.instagram.com`, etc. in Footer.js and metadata.js sameAs arrays. | Ensures sameAs declarations point to canonical URLs. | 15 min |
| M6 | **Add "By Appointment Only" to schema openingHours.** The contact page states showroom is by appointment only, but the schema does not reflect this. Add a note or use the `specialOpeningHoursSpecification` property. | Prevents mismatch between what Google shows and what customers experience. | 15 min |

### LOW (Backlog / Nice-to-Have)

| # | Recommendation | Impact | Effort |
|---|---------------|--------|--------|
| L1 | **Create local landing pages for key markets.** Build pages like "/commercial-furniture-boston" or "/hospitality-furniture-new-england" targeting geographic clusters. | Captures long-tail local search traffic. | 8-16 hours |
| L2 | **Join industry directories.** Get listed on AHLA (American Hotel & Lodging Association), NEWH (hospitality design network), and Houzz Pro. | Industry-specific backlinks with local authority. | 4-8 hours |
| L3 | **Add driving directions and parking info to contact page.** Include "30 miles south of Boston, accessible via I-95" and parking details. | Helps showroom visitors and adds local content. | 30 min |
| L4 | **Add foundingDate, numberOfEmployees to schemas.** These optional properties increase entity richness. | Minor signal boost for Knowledge Panel eligibility. | 10 min |
| L5 | **Add paymentAccepted and currenciesAccepted to LocalBusiness schema.** | Completes schema for rich results eligibility. | 5 min |
| L6 | **Replace self-testimonials in projects.xml.** All 5 projects have testimonials from "DMD Furnishing Team" which are correctly filtered from schema. Replace with actual client testimonials. | Real testimonials can generate Review schema and boost trust signals. | Depends on client outreach |

---

## File-Level Fix Map

| File | Changes Needed |
|------|---------------|
| `lib/metadata.js` | Change LocalBusiness @type to FurnitureStore; add email, areaServed; fix/remove LinkedIn sameAs; standardize social URLs with www |
| `components/Footer.js` | Fix/remove LinkedIn link; standardize social URLs with www |
| `components/contact/ContactPage.js` | Standardize email case (line 399); add Google Maps embed |
| `app/page.js` | Add "Unit 5" to FAQ address (line 349); add location to title |
| `app/about/page.js` | Standardize address format in FAQ (line 41); add location to title |
| `app/contact/page.js` | Add location to title |

---

## Summary

DMD Furnishing has built a solid foundation for local SEO within the website itself -- consistent NAP in the footer, phone in the header, location mentions in copy and FAQs, LocalBusiness schema with geo coordinates and hours, and good internal linking. However, the **off-site local SEO is essentially nonexistent**: no Google Business Profile, zero citations across any directory, zero third-party reviews, and a broken LinkedIn page. The overall score of **22/100** reflects that approximately 70-80% of local SEO value comes from signals that exist outside the website, and DMD has none of them. Creating a GBP listing and building foundational citations should be the immediate priority before any on-site refinements.
