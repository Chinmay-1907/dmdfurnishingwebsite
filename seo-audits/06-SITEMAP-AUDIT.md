# Sitemap Structure Audit - DMD Furnishing

**Date:** 2026-03-25
**File:** `public/sitemap.xml` (38 KB, 262 URLs)
**Generator:** `scripts/generate-sitemap.js`

---

## Summary Score: 35/100

---

## Critical Issues

### 1. Six Static Pages Missing from Sitemap
**Severity:** Critical
**Pages missing:**
- `/about`
- `/services`
- `/contact`
- `/schedule-call`
- `/inspirations`
- `/website-policies`

**Root cause:** `scripts/generate-sitemap.js:104-108` only hardcodes `[/, /products, /projects]` as static pages.

**Impact:** `/services` and `/schedule-call` are the highest-conversion pages for a B2B furnishing company — Google may not discover or prioritize them.

### 2. All Inspiration Detail Pages Missing
**Severity:** Critical
**Missing:** `/inspirations/1` through `/inspirations/6`
**Root cause:** Generator has no logic to produce inspiration URLs. Data is hardcoded in `InspirationDetail.js` with no corresponding XML source for the generator to read.

### 3. Zero `<lastmod>` or `<changefreq>` Tags
**Severity:** High
**Impact:** Crawlers cannot prioritize fresh content. All 262 URLs lack temporal metadata.
**Note:** Generator script has a comment acknowledging this is a known gap.

### 4. Tier-1 and Tier-2 Breadcrumb Pages Missing
**Severity:** High
**Missing:** Institution-level pages like `/products/hotels-motels` and furniture-type pages like `/products/hotels-motels/guest-room-furniture`
**Root cause:** Generator only emits 3-segment subcategory paths (`/products/{place}/{furnitureType}/{subcategory}`), skipping the 1-segment and 2-segment intermediate navigation pages that the React router actually serves.

---

## High-Severity Issues

### 5. Typos in Source XML Baked into Sitemap URLs
**Severity:** High

| Typo | Should Be | Affected URLs |
|------|-----------|---------------|
| `tv-media-penal` | `tv-media-panel` | Category + product URLs under hotel/guest-room |
| `luggage-bentch` | `luggage-bench` | Category + product URLs under hotel/guest-room |

**Root cause:** `DMD_Website.xml` has typos in `id` and `name` attributes for these subcategories/products. The sitemap generator faithfully reproduces them.

### 6. Lobby Area Structural Bug — Duplicate Path Segments
**Severity:** High
**Issue:** `place id="Lobby Area"` contains `furnitureType id="Lobby Area"`, generating URLs like:
```
/products/lobby-area/lobby-area/accent-chairs
```
instead of:
```
/products/lobby-area/accent-chairs
```

**Root cause:** Place and furnitureType share the same ID/name, creating redundant path segments.

### 7. Amenity Tower Product Has Wrong Name
**Severity:** Medium
**Issue:** A product under Amenity Tower has `name="TV Media Penal 1"`, generating URL `/products/hotel/guest-room/amenity-tower/tv-media-penal-1` — wrong category name in the product.

---

## Domain Consistency Issue

| Source | Domain Used |
|--------|-------------|
| `robots.txt` Sitemap directive | `https://www.dmdfurnishing.com` |
| All `<loc>` entries in sitemap | `https://www.dmdfurnishing.com` |
| All canonical URLs in code | `https://dmdfurnishing.com` (no www) |

**Verdict:** Sitemap is internally consistent but conflicts with canonical URLs. Must pick one and redirect the other.

---

## Priority Distribution Problems

| Priority | URL Count | Percentage |
|----------|-----------|------------|
| 1.0 | 1 | 0.4% |
| 0.9 | 1 | 0.4% |
| 0.8 | 6 | 2.3% |
| 0.7 | 254 | 96.9% |

**Issue:** 97% of URLs have the same priority (0.7), providing no differentiation between:
- Category landing pages (should be 0.8)
- Leaf product pages (should be 0.6-0.7)

**Root cause:** `generate-sitemap.js:125-126` uses array index position for priority logic, which is fragile and doesn't distinguish page types.

---

## Generator Script Analysis (`scripts/generate-sitemap.js`)

### What It Does Well
- Parses `DMD_Website.xml` and `projects.xml` for dynamic URLs
- Uses consistent slug generation matching frontend routing
- Runs automatically at build time (`npm run build`)

### Gaps
1. Only 3 hardcoded static pages (lines 104-108)
2. No tier-1/tier-2 intermediate pages
3. No inspiration pages
4. No `<lastmod>` support
5. No `<changefreq>` support
6. No type-based priority differentiation
7. No duplicate-segment collapse (Lobby Area bug)
8. Domain hardcoded without environment variable fallback

---

## Recommendations

### Improved Static Page List
```js
// Core pages
urls.push({ loc: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' });
urls.push({ loc: `${baseUrl}/products`, priority: '0.9', changefreq: 'weekly' });
urls.push({ loc: `${baseUrl}/projects`, priority: '0.8', changefreq: 'monthly' });
urls.push({ loc: `${baseUrl}/about`, priority: '0.7', changefreq: 'monthly' });
urls.push({ loc: `${baseUrl}/services`, priority: '0.8', changefreq: 'monthly' });
urls.push({ loc: `${baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' });
urls.push({ loc: `${baseUrl}/schedule-call`, priority: '0.7', changefreq: 'monthly' });
urls.push({ loc: `${baseUrl}/inspirations`, priority: '0.6', changefreq: 'monthly' });
urls.push({ loc: `${baseUrl}/website-policies`, priority: '0.3', changefreq: 'yearly' });

// Inspiration detail pages
for (let i = 1; i <= 6; i++) {
  urls.push({ loc: `${baseUrl}/inspirations/${i}`, priority: '0.5', changefreq: 'monthly' });
}
```

### Type-Based Priority
```js
// Tier-1 institution pages: 0.8
// Tier-2 furniture type pages: 0.7
// Tier-3 subcategory pages: 0.6
// Tier-4 product detail pages: 0.5
```

### Add `<lastmod>`
Use build date as fallback:
```js
const lastmod = new Date().toISOString().split('T')[0];
```

### Fix Lobby Area Double Segment
```js
// Collapse duplicate segments
if (toSlug(currentPlace) === toSlug(currentFurniture)) {
  // Skip furniture segment to avoid /lobby-area/lobby-area/
}
```

### Fix Domain
```js
const baseUrl = process.env.SITE_URL || 'https://dmdfurnishing.com';
```

---

## Checklist

| Item | Status |
|------|--------|
| All static pages included | FAIL (6 missing) |
| All dynamic pages included | FAIL (inspirations, tier-1/2 missing) |
| `<lastmod>` present | FAIL |
| `<changefreq>` present | FAIL |
| Priority differentiation | FAIL (97% same value) |
| Domain consistency | FAIL (www vs non-www) |
| No typos in URLs | FAIL (2 typos from source XML) |
| No structural bugs | FAIL (Lobby Area duplicate) |
| Under 50,000 URLs | PASS |
| Under 50MB | PASS |
| Valid XML | PASS |
| Referenced in robots.txt | PASS |

---

*Generated by Sitemap Structure Audit*
