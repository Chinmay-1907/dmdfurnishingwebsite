# Image SEO Audit — dmdredesign.netlify.app
**Agent:** seo-image-gen | **Date:** 2026-04-09 | **Status:** COMPLETE

## Overall Score: 52/100

The site has a solid foundation with Next.js Image component adoption (automatic AVIF/WebP), but suffers from critical issues: OG images pointing to wrong domain, identical hero alt text across 4 images, zero blog images, an oversized SVG logo (20000x18000 intrinsic), and missing featured images on article cards.

---

## Image Audit Summary Table

| Metric | Value | Status |
|--------|-------|--------|
| Pages with OG images | 10/10 | PASS |
| OG images correct domain | 0/10 | CRITICAL FAIL |
| OG images correct size (1200x630) | 10/10 (declared) | PASS (unverified actual dims) |
| Alt text present on all images | ~95% | WARN |
| Alt text descriptive & unique | ~60% | FAIL |
| WebP/AVIF adoption (Next.js Image) | 100% (via next.config.js) | PASS |
| Images with width/height (CLS) | ~90% (fill or explicit) | PASS |
| Lazy loading correct | ~80% | WARN |
| Priority on LCP/hero images | 4/10 pages | WARN |
| Blog cards with featured images | 0/6 | CRITICAL FAIL |
| In-article images (blog) | 0 | CRITICAL FAIL |
| Schema ImageObject usage | 3 instances | WARN |
| SVG logo intrinsic dimensions | 20000x18000px | CRITICAL FAIL |

---

## Page-by-Page Image Analysis

### 1. Homepage (/)

**Total images:** ~19 (4 hero + 6 category grid + 4 project cards + 2 before/after + 1 services + 1 logo + 1 OG)

**Hero Carousel (4 images):**
- `/Images/Tailored_Guestroom_Collections.jpg` — priority=true (correct)
- `/Images/Elevated_Restaurant_Seating.jpg`
- `/Images/Modern_Social_Lounges.jpg`
- `/Images/Outdoor.jpg`
- **CRITICAL:** All 4 share identical alt text: `"DMD Furnishing commercial hospitality furniture"` — search engines see this as duplicate/uninformative
- **FIX:** Each image needs unique, descriptive alt text matching its content (e.g., "Tailored hotel guestroom furniture collection by DMD Furnishing", "Elevated restaurant seating arrangement with custom upholstery")
- `fill` + `sizes="100vw"` — correct for full-width hero
- Only index 0 has `priority` — correct (others load via CSS animation delay)

**Product Category Grid (6 images):**
- Alt text uses `{place.name}` — e.g., "Hotel", "Hospital", "Lobby Area" — too generic
- **FIX:** Should be descriptive like "Hotel furniture collection — guestroom casegoods and seating"
- `fill` with responsive `sizes` — correct
- No `priority` — correct (below fold)

**Project Cards (4 images):**
- Alt text uses `{project.name}` — e.g., "Quality Inn - Gainesville, FL" — acceptable but could include "furniture renovation project"
- `fill` + `sizes` — correct

**Before/After Slider (2 images):**
- Before alt: `"Towne Lyne Motel - Ogunquit, ME before renovation"` — GOOD
- After alt: `"Towne Lyne Motel - Ogunquit, ME after renovation by DMD Furnishing"` — GOOD

**Services Image (1):**
- Alt: `"DMD Furnishing project coordination and manufacturing"` — GOOD

**OG/Twitter Meta:**
- og:image: `https://dmdfurnishing.com/Images/Tailored_Guestroom_Collections.jpg` — WRONG DOMAIN
- twitter:image: `https://dmdfurnishing.com/Images/Tailored_Guestroom_Collections.jpg` — WRONG DOMAIN
- Dimensions declared: 1200x630 — correct

**Schema:**
- `primaryImageOfPage.url`: `https://dmdfurnishing.com/Images/Tailored_Guestroom_Collections.jpg` — correct usage of ImageObject

---

### 2. About Page (/about)

**Total images:** 1 content image + 1 logo

**Content Image:**
- `/Images/About_DMD_Furnishing_Page.jpg`
- Alt: `"DMD Furnishing craftsmanship and materials"` — GOOD, descriptive
- `fill` + `sizes="(max-width: 800px) 100vw, 45vw"` — correct
- No `priority` — ISSUE: This is the primary above-fold image on About page, should have priority

**OG/Twitter Meta:**
- og:image: `https://dmdfurnishing.com/Images/About_DMD_Furnishing_Page.jpg` — WRONG DOMAIN
- 1200x630 declared — correct

**Missing:**
- No hero background image (pure CSS/overlay hero section)
- No team/staff photos — missed opportunity for E-E-A-T signals

---

### 3. Services Page (/services)

**Total images:** 1 hero image + 1 logo

**Hero Image:**
- `/Images/Our Services.jpg` — NOTE: filename has space (URL-encoded, works but not ideal)
- Alt: `"DMD Furnishing commercial furniture services"` — GOOD
- `fill` + `sizes` + `priority` — all correct

**Service Icons:**
- 6 SVG icons from react-icons (GiMagnifyingGlass, GiPencilRuler, etc.) — render as inline SVG, not images
- No alt text needed (decorative, paired with text labels)

**OG/Twitter Meta:**
- og:image: `https://dmdfurnishing.com/Images/Our%20Services.jpg` — WRONG DOMAIN
- 1200x630 declared — correct

**Missing:**
- No individual service illustration images
- Service cards rely entirely on icons — could benefit from contextual photography

---

### 4. Products Page (/products)

**Total images:** ~180+ product images (dynamically rendered via client-side JS)

**Product Grid Images:**
- Rendered via Next.js `/_next/image` API with `q=75` quality
- Alt text uses `{product.name}` — e.g., "2-Seater Table", "Double Drawer Cabinet" — adequate but not keyword-rich
- Alternate views have alt: `"{product.name} alternate view"` — GOOD practice

**OG/Twitter Meta:**
- Uses `generatePageMetadata` with `image: '/Images/Our_Products.jpg'`
- Resolves to: `https://dmdfurnishing.com/Images/Our_Products.jpg` — WRONG DOMAIN

**Issues:**
- Product images are fully client-rendered — search engine crawlers may not see them in initial HTML
- No `loading="lazy"` explicit control — Next.js handles this automatically for non-priority images
- Product images lack structured data (no schema.org/Product ImageObject per item)

---

### 5. Products/Hotel (/products/hotel)

**Total images:** ~46 hotel product images

**Product Images:**
- Same pattern as /products — Next.js Image component with auto optimization
- Alt text from product names — adequate
- OG image uses `{place.image}` which resolves to the hotel category image

**OG/Twitter Meta:**
- og:image resolves to: `https://dmdfurnishing.com/Images/Hotel/Hotel furniture collection.jpg` — WRONG DOMAIN + space in filename

---

### 6. Blog Index (/blog)

**Total images:** 0 content images (only logo in header)

**CRITICAL ISSUE: Zero blog card featured images.**
- 6 article cards rendered as text-only (title, excerpt, category, read time)
- No `<Image>` component used anywhere on this page
- Blog cards without images have significantly lower CTR in search results and social shares

**OG/Twitter Meta:**
- og:image: `https://dmdfurnishing.com/Images/Tailored_Guestroom_Collections.jpg` — WRONG DOMAIN
- Uses fallback homepage hero image — not blog-specific

**Schema:**
- CollectionPage schema present — no image references in schema

---

### 7. Blog Article (/blog/what-is-ffe-hospitality)

**Total images:** 0 inline content images

**CRITICAL ISSUE: Zero images in a 1500+ word article.**
- No hero/featured image
- No inline illustrations, diagrams, or photos
- No infographics for the FF&E categories table
- This severely hurts engagement, dwell time, and image search visibility

**OG/Twitter Meta:**
- og:image: `https://dmdfurnishing.com/Images/Tailored_Guestroom_Collections.jpg` — WRONG DOMAIN
- Uses same fallback image as homepage — not article-specific
- Article schema includes `image` field pointing to same generic image

**Schema:**
- Article schema with `image`: generic homepage hero — should be article-specific
- Publisher logo references SVG with 20000x18000 intrinsic dimensions

---

### 8. Projects Page (/projects)

**Total images:** 7 images (1 hero + 1 featured + 5 project cards)

**Hero Background:**
- `/Images/Our_Projects.jpg`
- Alt: `"DMD Furnishing completed projects"` — GOOD
- `fill` + `priority` + `sizes="100vw"` — all correct

**Featured Project:**
- Uses `{featured.mainImage}` with fallback to `/placeholder.png`
- Alt: `{featured.mainImageAlt || featured.name + " project"}` — dynamic alt text with fallback, GOOD pattern
- `fill` + responsive `sizes` — correct

**Project Grid Cards:**
- Each uses `{project.mainImage}` with alt: `{project.mainImageAlt || project.name + " project"}`
- `fill` + `sizes="(max-width: 720px) 100vw, 50vw"` — correct

**OG/Twitter Meta:**
- og:image: `https://dmdfurnishing.com/Images/Our_Projects.jpg` — WRONG DOMAIN

**Schema:**
- ItemList schema includes per-project `image` URLs — GOOD for rich results

---

### 9. Inspirations Page (/inspirations)

**Total images:** 7 images (1 hero + 6 gallery)

**Hero Image:**
- Unsplash URL: `https://images.unsplash.com/photo-1590381105924-c72589b9ef3f...`
- Alt: `"Hospitality design inspiration"` — generic, could be more specific
- `fill` + `priority` + responsive `sizes` — correct

**Gallery Images (6):**
- All sourced from Unsplash (external URLs)
- Alt text uses `{insp.title}` — e.g., "Modern Minimalist Hotel Lobby", "Luxury Restaurant Seating" — GOOD, descriptive
- `fill` + `sizes` — correct
- No `priority` — correct (below fold)

**OG/Twitter Meta:**
- og:image: `https://dmdfurnishing.com/Images/Elevated_Restaurant_Seating.jpg` — WRONG DOMAIN

**Issues:**
- Gallery hero image is same Unsplash URL as first gallery item — duplicate image
- External Unsplash images are not self-hosted — dependency on third-party CDN
- No ImageObject schema for gallery items despite using schema.org ItemList

---

### 10. Contact Page (/contact)

**Total images:** 0 content images (only logo in header)

**OG/Twitter Meta:**
- og:image: `https://dmdfurnishing.com/Images/Contact_Page.jpg` — WRONG DOMAIN
- 1200x630 declared — correct

**Missing:**
- No hero image or visual element
- No office/location photo — missed opportunity for local SEO
- Contact pages with imagery of the business location rank better for local searches

---

## Cross-Site Issues

### 1. SVG Logo — Oversized Intrinsic Dimensions (CRITICAL)
- **File:** `/public/DMD_Furnishing_Logo_Embedded.svg`
- **Intrinsic dimensions:** `width="20000" height="18000"`
- **viewBox:** `0 0 600 600`
- **Rendered at:** 180x60 (Header), 300x100 (schema)
- **Impact:** Browsers download and parse a 20000x18000 coordinate space even though viewBox is 600x600. This can cause rendering lag, excessive memory consumption on mobile, and CLS issues.
- **FIX:** Change `width="600" height="600"` or remove explicit width/height and let viewBox control sizing.

### 2. OG Images — All Point to Wrong Domain (CRITICAL)
- **metadataBase** in `layout.js`: `new URL('https://dmdfurnishing.com')`
- All OG/Twitter images resolve to `https://dmdfurnishing.com/Images/...`
- The live deployment is at `https://dmdredesign.netlify.app`
- **Impact:** Social sharing crawlers (Facebook, Twitter, LinkedIn) may fail to fetch OG images if dmdfurnishing.com doesn't serve them, OR they may fetch stale/different versions
- **Note:** Testing shows dmdfurnishing.com DOES serve the images (verified), so functional impact is limited. But once the domain migrates, this becomes a non-issue. For now, it works but is architecturally incorrect for the Netlify deployment.
- **FIX:** If dmdredesign.netlify.app is the canonical deployment, update metadataBase accordingly. If dmdfurnishing.com is the production domain, this is correct.

### 3. Blog Has Zero Images (CRITICAL)
- Blog index: 0 featured images on 6 article cards
- Blog articles: 0 inline images in article content
- **Impact:** Blog posts cannot appear in Google Image search, have lower CTR in SERPs, lower social sharing engagement, and worse dwell time metrics
- **FIX:** Create featured images (1200x630) for each blog post, add inline diagrams/photos to articles

### 4. Hero Carousel — Identical Alt Text (HIGH)
- All 4 hero images share: `"DMD Furnishing commercial hospitality furniture"`
- **Impact:** Search engines cannot distinguish image content; reduces image search visibility
- **FIX:** Unique descriptive alt per image

### 5. Product Images — Minimal Alt Text (MEDIUM)
- Product card alt text is just the product name (e.g., "2-Seater Table")
- **FIX:** Append category context: "2-Seater Hotel Breakfast Table — DMD Furnishing"

### 6. Schema Image Gaps (MEDIUM)
- Organization logo in schema uses SVG (Google prefers raster for logos in schema)
- LocalBusiness image field uses SVG instead of a photo of the business
- No per-product ImageObject schema on product pages
- Blog article schema uses generic homepage image instead of article-specific image

---

## Image Generation Plan

Priority-ordered list of images needed:

### P0 — Critical (Immediate Impact)

| # | Asset | Dimensions | Purpose | Page |
|---|-------|-----------|---------|------|
| 1 | Blog featured image: "What Is FF&E?" | 1200x630 | OG image + article hero + card thumbnail | /blog/what-is-ffe-hospitality |
| 2 | Blog featured image: "Hotel Guestroom Checklist" | 1200x630 | OG image + card thumbnail | /blog/hotel-guestroom-furniture-checklist |
| 3 | Blog featured image: "Value Engineering" | 1200x630 | OG image + card thumbnail | /blog/value-engineering-commercial-furniture |
| 4 | Blog featured image: "HPL vs Veneer vs Solid Wood" | 1200x630 | OG image + card thumbnail | /blog/hpl-veneer-solid-wood-hotel-casegoods |
| 5 | Blog featured image: "Restaurant Seating Guide" | 1200x630 | OG image + card thumbnail | /blog/restaurant-seating-guide |
| 6 | Blog featured image: "FF&E Procurement Timeline" | 1200x630 | OG image + card thumbnail | /blog/ffe-procurement-timeline |

### P1 — High (SEO Improvement)

| # | Asset | Dimensions | Purpose | Page |
|---|-------|-----------|---------|------|
| 7 | Unique hero alt text (copy, not image) | N/A | Fix identical alt text on 4 hero images | / |
| 8 | In-article diagrams: FF&E categories infographic | 800x600 | Visual aid for "What Is FF&E?" article | /blog/what-is-ffe-hospitality |
| 9 | In-article diagram: FF&E vs OS&E comparison | 800x400 | Visual aid for article | /blog/what-is-ffe-hospitality |
| 10 | In-article diagram: Procurement timeline | 1000x400 | Visual aid for article | /blog/ffe-procurement-timeline |
| 11 | Contact page hero/location photo | 1200x630 | Local SEO + visual engagement | /contact |
| 12 | Raster logo variant (PNG) for schema | 600x200 | Google structured data preference | Global schema |

### P2 — Medium (Enhancement)

| # | Asset | Dimensions | Purpose | Page |
|---|-------|-----------|---------|------|
| 13 | About page — team/workshop photo | 800x600 | E-E-A-T signals | /about |
| 14 | Blog-specific OG fallback image | 1200x630 | Default for blog section | /blog |
| 15 | Self-hosted versions of Unsplash gallery images | Various | Remove third-party dependency | /inspirations |

---

## Issues Summary

### Critical (4)
1. **OG images on wrong domain** — All 10 pages point to `dmdfurnishing.com` instead of deployment domain
2. **Blog has zero images** — 6 articles, 0 featured images, 0 inline images
3. **SVG logo 20000x18000 intrinsic** — Excessive dimensions cause memory/rendering issues
4. **Blog articles lack article-specific OG images** — All use generic homepage hero as fallback

### High (3)
5. **Hero carousel identical alt text** — 4 images share same generic alt string
6. **About page primary image missing priority** — Above-fold image lacks fetchpriority
7. **Schema ImageObject uses SVG for organization/business logo** — Google prefers raster format

### Medium (4)
8. **Product alt text too generic** — Just product names without category/brand context
9. **Category card alt text too short** — "Hotel", "Hospital" instead of descriptive phrases
10. **No per-product schema ImageObject** — Product pages miss structured image data
11. **Inspirations hero duplicates first gallery image** — Same Unsplash URL used twice

### Low (3)
12. **Image filenames contain spaces** — "Our Services.jpg", "Hotel furniture collection.jpg" — hyphens preferred for SEO
13. **No explicit lazy loading attribute on below-fold images** — Next.js handles automatically, but explicit `loading="lazy"` is more crawl-transparent
14. **Contact page has no visual content** — Only logo in header, no imagery

---

## Recommendations

### Immediate Fixes (No New Assets Needed)

1. **Fix hero alt text** — Give each carousel image unique, descriptive alt text in `app/page.js` line 111
2. **Fix SVG logo dimensions** — Change `width="20000" height="18000"` to `width="600" height="600"` in `/public/DMD_Furnishing_Logo_Embedded.svg`
3. **Add `priority` to About page image** — Add `priority` prop to Image in `app/about/page.js` line 128
4. **Enrich product alt text** — Update `ProductCard.js` to include space/category in alt: `{product.placeName} {product.name}`
5. **Enrich category card alt text** — Update homepage product grid to use descriptive alt: `{place.name} furniture collection by DMD Furnishing`
6. **Update metadataBase** — If Netlify is production, change to `https://dmdredesign.netlify.app` in `layout.js`

### Asset Creation Required

7. **Generate 6 blog featured images** — 1200x630, topic-specific, branded
8. **Create raster logo variant** — PNG version for schema.org structured data
9. **Add inline images to blog articles** — Diagrams, infographics, process illustrations
10. **Add contact page hero image** — Office/location photo for local SEO

### Architecture Improvements

11. **Add featured image field to blog post data** — Extend the `posts` array in `app/blog/page.js` with an `image` property
12. **Create blog card component with image** — Blog cards need thumbnail display
13. **Add ImageObject to product schema** — Each product in structured data should reference its image
14. **Self-host Unsplash images** — Download and serve locally to eliminate third-party dependency and improve load reliability
15. **Rename image files with hyphens** — Replace spaces with hyphens in all image filenames for cleaner URLs

---

## Technical Notes

### What's Working Well
- **Next.js Image component** used consistently across all pages (auto AVIF/WebP conversion)
- **Image config** correctly specifies `formats: ['image/avif', 'image/webp']` with `minimumCacheTTL: 31536000` (1 year cache)
- **Responsive `sizes` attribute** properly set on all images based on viewport breakpoints
- **Before/After slider** has excellent descriptive alt text pattern
- **Projects page** uses dynamic alt text with fallbacks (`mainImageAlt || name + " project"`)
- **Product gallery** has alt text for thumbnails with position index
- **Hero images** correctly use `priority` on above-fold images (homepage, services, projects, inspirations)
- **`fill` mode** used correctly for container-sized images (prevents CLS)

### Next.js Image Optimization Pipeline
- All images served via `/_next/image` with automatic format negotiation
- Browser receives AVIF if supported, falls back to WebP, then original format
- Quality set to 75 (default) — good balance of quality and file size
- Remote patterns configured for `images.unsplash.com` — correct for inspirations page
