# Image SEO Audit - DMD Furnishing

**Date:** 2026-03-25
**Total `<img>` tags:** 12 across 7 components
**Total `backgroundImage` usages:** 14 across 6 components
**Image directory:** `public/Images/`

---

## Summary Score: 22/100

---

## Critical Issues

### 1. SVG Logo Used as Social Share Image (1.97 MB)
**Severity:** Critical
**File:** `public/index.html:18,22`
**Issue:** `DMD_Furnishing_Logo_Embedded.svg` (1,979,191 bytes) is used as the OG and Twitter image. SVGs are **unsupported by all major social platforms** (Facebook, Twitter/X, LinkedIn) — every share card is broken.
**Fix:** Create a 1200x630px PNG/JPG social image (<200KB).

### 2. Schema References Non-Existent `/logo.png`
**Severity:** Critical
**Files:** `src/components/SEO.js:12,34` and `src/components/Home.js:89`
**Issue:** `logo.png` does not exist in `public/`. Schema validation fails.
**Fix:** Create `public/logo.png` from the SVG, or update references to actual file.

### 3. Mixed-Case Path Bugs (Potential 404s on Linux)
**Severity:** Critical
**Files:**
- `src/components/Home.js:79` — uses `/images/Outdoor.jpg` (lowercase `images`)
- All other references use `/Images/` (uppercase)

**Issue:** Netlify on Linux is case-sensitive. Lowercase `/images/` will 404 if the directory is `/Images/`.

### 4. Zero Images Have `width`/`height` Attributes
**Severity:** High
**Impact:** CLS (Cumulative Layout Shift) penalty on every page. Browser cannot reserve space before image loads.
**Affected:** All 12 `<img>` tags across all components.

### 5. Only 2 of 12 Images Have `loading="lazy"`
**Severity:** High
**Files with lazy:** `ProductDetail.js:380,406` only
**Missing lazy:** Home.js (5 images), Services.js (1), Header.js (1), ProjectDetail.js (2), ProductGallery.js (1)
**Note:** Hero/LCP images should NOT be lazy — they need `fetchpriority="high"` instead.

### 6. No `fetchpriority="high"` on LCP Image
**Severity:** High
**File:** `src/components/Home.js:126`
**Issue:** Hero slider images are the LCP candidate but have no priority hint.
**Fix:** Add `fetchpriority="high"` to the first hero image.

### 7. No WebP/AVIF Delivery
**Severity:** High
**Issue:** All images served as original JPG. 5 orphaned `.webp` files exist in `public/Images/` but are not referenced by any component.
**Fix:** Implement `<picture>` element with WebP source, or use Netlify Image CDN.

### 8. No Responsive Images (`srcset`/`sizes`)
**Severity:** High
**Issue:** Mobile users download full desktop-resolution images. No `srcset` or `sizes` attributes on any image.

---

## Image File Size Analysis

### Oversized Files (>500KB)

| File | Size | Used In |
|------|------|---------|
| `DMD_Furnishing_Logo_Embedded.svg` | 1.97 MB | Header, OG image |
| `Hospital.jpg` | ~1.3 MB | Products category |
| `Lobby_Area.jpg` | ~1.1 MB | Products category |
| `University.jpg` | ~1.0 MB | Products category |
| `Restaurant.jpg` | ~950 KB | Products category |
| `School.jpg` | ~870 KB | Products category |
| `Elevated_Restaurant_Seating.jpg` | ~638 KB | Home hero |
| `Outdoor.jpg` | ~615 KB | Home hero |

### Orphaned/Unused Images
~6.5 MB of image files in `public/Images/` that are not referenced by any component. These should be identified and removed to reduce build size.

---

## Complete `<img>` Tag Inventory

| File:Line | src | alt | loading | width/height | fetchpriority |
|-----------|-----|-----|---------|-------------|---------------|
| `Home.js:126` | Hero carousel images | Good (descriptive) | MISSING | MISSING | MISSING |
| `Home.js:250` | `/Images/Our Services.jpg` | "DMD Capabilities" (generic) | MISSING | MISSING | N/A |
| `Home.js:293` | Hero image reused | "Luxury Hotel Guestroom" | MISSING | MISSING | N/A |
| `Home.js:297` | Hero image reused | "Fine Dining Restaurant" | MISSING | MISSING | N/A |
| `Home.js:301` | Hero image reused | "Corporate Lounge" | MISSING | MISSING | N/A |
| `Home.js:317` | About page image | Good (descriptive) | MISSING | MISSING | N/A |
| `Header.js:58` | Logo SVG | Assumed present | MISSING | MISSING | Should be eager |
| `Services.js:168` | Service overview | Assumed present | MISSING | MISSING | N/A |
| `ProductDetail.js:378` | Main product image | Product name fallback | `lazy` | MISSING | N/A |
| `ProductDetail.js:406` | Thumbnails | Product name fallback | `lazy` | MISSING | N/A |
| `ProjectDetail.js:~` | Gallery images | From data | MISSING | MISSING | N/A |
| `ProductSearch.js:194` | Search thumbnails | `alt=""` (EMPTY) | MISSING | MISSING | N/A |

---

## `backgroundImage` Inventory

| File:Line | Used For | `role="img"` | `aria-label` |
|-----------|----------|-------------|-------------|
| `Products.js:426` | Furniture type cards | MISSING | MISSING |
| `Products.js:463` | Subcategory cards | MISSING | MISSING |
| `Products.js:498` | Product cards | MISSING | MISSING |
| `ProductOverview.js:78` | Category cards | MISSING | MISSING |
| `ProjectDetail.js:169` | Hero background | MISSING | MISSING |
| `Projects.js:122` | Project cards | MISSING | MISSING |
| `InspirationDetail.js:167` | Gallery items | MISSING | MISSING |
| `Inspirations.js:68` | Section backgrounds | Present | Present (Good) |
| `ScheduleCall.js:11` | Hero background | MISSING | MISSING |
| `Contact.js` | Hero background | MISSING | MISSING |
| `AboutUs.js` | Hero background | MISSING | MISSING |
| `Services.js` | Hero background | MISSING | MISSING |

---

## Recommendations

### Priority 1 — Critical Fixes
1. Create `public/logo.png` (optimized PNG version of logo, <100KB)
2. Create `public/og-image.jpg` (1200x630px social share image, <200KB)
3. Fix mixed-case path: `Home.js:79` change `/images/` to `/Images/`
4. Fix `ProductSearch.js:194`: change `alt=""` to `alt={it.name || 'Product'}`

### Priority 2 — CLS & Performance
5. Add `width` and `height` to all `<img>` tags
6. Add `loading="lazy"` to all below-fold images
7. Add `fetchpriority="high"` to hero slider first image
8. Optimize SVG logo with SVGO (target <50KB)

### Priority 3 — Format Optimization
9. Convert large JPGs to WebP (40-60% size reduction)
10. Implement `<picture>` element for format fallback
11. Add `srcset`/`sizes` for responsive images
12. Consider Netlify Image CDN for automatic optimization

### Priority 4 — Cleanup
13. Remove orphaned image files (~6.5MB)
14. Add `role="img"` and `aria-label` to all `backgroundImage` divs
15. Improve generic alt text ("DMD Capabilities" -> "Custom casegood manufacturing and millwork by DMD Furnishing")

---

*Generated by Image SEO Audit*
