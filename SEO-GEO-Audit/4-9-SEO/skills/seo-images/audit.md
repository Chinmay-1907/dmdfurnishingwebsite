# Image SEO Audit -- dmdredesign.netlify.app
**Skill:** seo-images | **Date:** 2026-04-09 | **Status:** COMPLETE
**Target:** https://dmdredesign.netlify.app

## Overall Image SEO Score: 71/100

## Executive Summary

The site uses Next.js Image component (`data-nimg`) throughout, which provides automatic WebP/AVIF conversion, responsive srcset generation, and lazy loading. All images have alt text (no missing alt attributes found), but several share identical generic alt text. The primary issues are duplicate alt text on the hero carousel, OG images pointing to the wrong domain, blog articles having zero featured images, and the SVG logo having unnecessarily large intrinsic dimensions. Image formats are properly optimized via Next.js Image Optimization API.

---

## Image Inventory by Page

### Homepage (/) -- 18 images
| Image | Alt Text | Format | Loading | Dimensions (natural) | Issues |
|-------|----------|--------|---------|---------------------|--------|
| Logo | DMD Furnishing Logo | SVG | auto | 20000x18000 | Intrinsic size excessive |
| Hero slide 1 | DMD Furnishing commercial hospitality furniture | JPG via /_next/image | auto (eager) | 1408x768 | Duplicate alt (x4) |
| Hero slide 2 | DMD Furnishing commercial hospitality furniture | JPG via /_next/image | lazy | 1408x768 | Duplicate alt (x4) |
| Hero slide 3 | DMD Furnishing commercial hospitality furniture | JPG via /_next/image | lazy | 1408x768 | Duplicate alt (x4) |
| Hero slide 4 | DMD Furnishing commercial hospitality furniture | JPG via /_next/image | lazy | 1408x768 | Duplicate alt (x4) |
| Hotels & Motels | Hotels & Motels | JPG via /_next/image | lazy | 900x506 | Good alt |
| Healthcare | Healthcare & Care Facilities | PNG via /_next/image | lazy | 633x356 | Good alt |
| Lobby Area | Public & Common Areas | JPG via /_next/image | lazy | 633x345 | Good alt |
| Office | Office & Corporate Spaces | JPG via /_next/image | lazy | 633x356 | Good alt |
| Restaurant | Restaurants & Cafes | PNG via /_next/image | lazy | 633x356 | Good alt |
| Residential | Multi-Family & Residential Projects | PNG via /_next/image | lazy | 633x356 | Good alt |
| Project 1 | Quality Inn - Gainesville, FL | PNG via /_next/image | lazy | 0x0 (not loaded) | Good alt |
| Project 2 | Towne Lyne Motel - Ogunquit, ME | PNG via /_next/image | lazy | 0x0 | Good alt |
| Project 3 | Quality Inn - Bangor, ME | PNG via /_next/image | lazy | 0x0 | Good alt |
| Project 4 | USA INN - Wells, ME | PNG via /_next/image | lazy | 0x0 | Good alt |
| Before/After (after) | Towne Lyne Motel - Ogunquit, ME after renovation by DMD Furnishing | JPEG via /_next/image | lazy | 0x0 | Excellent descriptive alt |
| Before/After (before) | Towne Lyne Motel - Ogunquit, ME before renovation | JPG via /_next/image | lazy | 0x0 | Excellent descriptive alt |
| Process image | DMD Furnishing project coordination and manufacturing | JPG via /_next/image | lazy | 0x0 | Good alt |

### About (/about) -- 2 images
| Image | Alt Text | Format | Loading | Issues |
|-------|----------|--------|---------|--------|
| Logo | DMD Furnishing Logo | SVG | auto | Same SVG size issue |
| Craftsmanship image | DMD Furnishing craftsmanship and materials | JPG via /_next/image | lazy | Good |

### Services (/services) -- 3 images
| Image | Alt Text | Format | Loading | Issues |
|-------|----------|--------|---------|--------|
| Logo | DMD Furnishing Logo | SVG | auto | Same SVG size issue |
| Hero image | DMD Furnishing commercial furniture services | JPG via /_next/image | auto | Good |
| Healthcare filter | Healthcare | PNG via /_next/image | lazy | Alt could be more descriptive |

### Products (/products) -- 180+ product images
- All product images use Next.js Image with lazy loading
- Product images have alt text matching product names (e.g., "2-Door Wardrobe", "Amenity Tower")
- Product cards include alternate view images where available (good for visual variety)
- Typos found: "2-Siter Sofa" and "3-Siter Sofa" (should be "Seater")

### Blog (/blog) -- 1 image
| Image | Alt Text | Notes |
|-------|----------|-------|
| Logo | DMD Furnishing Logo | Only image on entire blog listing page |
- **ZERO featured images on blog article cards** -- major visual and SEO gap

### Contact (/contact) -- 1 image
| Image | Alt Text | Notes |
|-------|----------|-------|
| Hero | DMD Furnishing contact page hero request a consultation | Good, descriptive |

### Projects (/projects) -- ~5 images
| Image | Alt Text | Notes |
|-------|----------|-------|
| Hero | DMD Furnishing completed projects | Good |
| Project images | Individual project names | Good descriptive alt text |

---

## Alt Text Analysis

### Strengths
- **Zero missing alt attributes** across all audited pages
- **Project images have excellent alt text** with location specifics (e.g., "Quality Inn - Gainesville, FL")
- **Before/after images use contextual alt** ("...after renovation by DMD Furnishing" / "...before renovation")
- **Product images use product names** as alt text with category breadcrumbs in link context
- **Social media links have descriptive aria-labels** ("Visit our Facebook page", etc.)

### Issues
1. **Hero carousel: 4 images share identical alt** -- "DMD Furnishing commercial hospitality furniture"
   - Slide 1 shows: Tailored guestroom collections
   - Slide 2 shows: Elevated restaurant seating
   - Slide 3 shows: Modern social lounges
   - Slide 4 shows: Outdoor furniture
   - **Fix:** Use file names as guide -- "Luxury hotel guestroom with custom casegoods and upholstered headboard", "Commercial restaurant with elevated seating and pendant lighting", etc.

2. **Sector cards use category names only** -- "Hotels & Motels", "Healthcare & Care Facilities" -- functional but could be more descriptive (e.g., "Hotel guestroom with custom DMD Furnishing casegoods")

3. **Services page Healthcare image** has alt "Healthcare" -- too brief, should describe what the image shows

---

## Image Format & Optimization

### Next.js Image Optimization
- **All raster images** served through `/_next/image` API with automatic optimization
- **Format:** Browser receives WebP (or AVIF where supported) via content negotiation, even though source files are JPG/PNG
- **Quality:** Default q=75 parameter applied
- **Responsive:** Most images include `srcset` attribute with multiple widths
- **Sizes attribute:** Properly configured per context:
  - Hero: `100vw`
  - Sector cards (large): `(max-width: 800px) 100vw, 66vw`
  - Sector cards (small): `(max-width: 800px) 100vw, 33vw`
  - Project cards: `(max-width: 800px) 100vw, 25vw`
  - Before/after: `(max-width: 800px) 100vw, 80vw`
  - Process: `(max-width: 1024px) 100vw, 50vw`

### Source File Formats
- **JPG:** Hero images, sector images, service images (appropriate for photographs)
- **PNG:** Some sector images (Hospital, Restaurant, Residential) -- could be converted to JPG for smaller file sizes since they are photographic content, not graphics requiring transparency
- **SVG:** Logo only (appropriate)
- **JPEG:** Before/after images (appropriate)

### Lazy Loading
- **First hero image:** Eager loaded (correct -- above the fold)
- **All other images:** Lazy loaded via `loading="lazy"` (correct)
- **No lazy-loading violations** detected (above-fold content is eager)

---

## OG (Open Graph) Images

| Page | OG Image URL | Issue |
|------|-------------|-------|
| Homepage | https://dmdfurnishing.com/Images/Tailored_Guestroom_Collections.jpg | Wrong domain |
| About | https://dmdfurnishing.com/Images/About_DMD_Furnishing_Page.jpg | Wrong domain |
| Services | https://dmdfurnishing.com/Images/Our%20Services.jpg | Wrong domain |
| Contact | https://dmdfurnishing.com/Images/Contact_Page.jpg | Wrong domain |
| Blog | https://dmdfurnishing.com/Images/Tailored_Guestroom_Collections.jpg | Wrong domain + same as homepage |

### OG Image Issues
1. **All OG images point to `dmdfurnishing.com`** instead of `dmdredesign.netlify.app` -- social sharing previews will fail if the production domain is not configured
2. **Blog OG image is not unique** -- reuses homepage image instead of a blog-specific graphic
3. **OG image dimensions** specified as 1200x630 (correct for social sharing)
4. **Twitter card images** also point to wrong domain (same URLs)

---

## SVG Logo Analysis

- **File:** `/DMD_Furnishing_Logo_Embedded.svg`
- **Intrinsic dimensions:** 20000x18000px (excessive)
- **Rendered size:** 80x72px on desktop
- **Impact:** While browsers scale SVGs correctly, the large viewBox may cause:
  - Unnecessary computational overhead during initial parse
  - Potential layout shift if CSS dimensions aren't explicitly set before SVG loads
- **Recommendation:** Optimize SVG viewBox to match intended render proportions (e.g., 200x180 or similar)

---

## Decorative/Icon Images

### Inline SVG Icons (not `<img>` tags)
- **Phone icon** in nav: `aria-hidden="true"` -- correct
- **Search icon** in nav: `aria-hidden="true"` -- correct
- **Social media icons** (Facebook, Instagram, LinkedIn, Pinterest): Missing `aria-hidden="true"` but parent `<a>` elements have proper `aria-label` -- acceptable but could be improved
- **One divider/decoration SVG**: No `aria-hidden`, no parent label -- should be marked decorative

---

## Recommendations

### Priority 1 -- Fix Immediately
1. **Write unique alt text for 4 hero carousel images** based on actual content:
   - Slide 1: "Luxury hotel guestroom with tailored casegood collections by DMD Furnishing"
   - Slide 2: "Upscale restaurant interior with elevated commercial seating"
   - Slide 3: "Modern hotel social lounge with custom furniture and pendant lighting"
   - Slide 4: "Outdoor hospitality furniture arrangement with commercial-grade seating"
2. **Fix OG image URLs** to use correct domain or ensure `dmdfurnishing.com` properly serves these images
3. **Create unique OG image for blog** listing page

### Priority 2 -- This Week
4. **Add featured images to blog post cards** -- each article should have a relevant hero/thumbnail
5. **Convert PNG sector images to JPG** where transparency is not needed (Hospital, Restaurant, Residential) for 20-40% file size savings
6. **Optimize SVG logo viewBox** to reduce intrinsic dimensions
7. **Fix product typos** -- "2-Siter" / "3-Siter" to "2-Seater" / "3-Seater"

### Priority 3 -- Next Sprint
8. **Enrich sector card alt text** with more descriptive content
9. **Add `aria-hidden="true"`** to all decorative inline SVGs
10. **Consider adding structured image data** (ImageObject schema) for product images to enhance Google Image search visibility
11. **Add image sitemaps** for product catalog images to improve crawl coverage of all 180+ product images
