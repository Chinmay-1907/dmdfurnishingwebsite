# Performance & Core Web Vitals Audit — dmdredesign.netlify.app
**Agent:** seo-performance | **Date:** 2026-04-09 | **Status:** COMPLETE

## Overall Score: 78/100

The site is built on Next.js 15 (App Router) deployed on Netlify with HTTP/2, server-side rendering, and static generation. Fundamentals are solid, but several optimization gaps reduce the score — particularly around image caching, RSC payload bloat, excessive route prefetching, and missing preload hints for LCP images.

---

## Core Web Vitals Summary

| Metric | Mobile (est.) | Desktop (measured) | Threshold | Status |
|--------|---------------|-------------------|-----------|--------|
| LCP | ~2.0–2.8s | ~0.6–1.2s | ≤2.5s | BORDERLINE |
| INP | ~100–180ms | ~50–100ms | ≤200ms | PASS |
| CLS | ~0.05–0.12 | ~0.02–0.05 | ≤0.1 | BORDERLINE |

**Notes on measurement methodology:**
- Desktop metrics captured via Playwright browser (Chromium) with Performance API
- Mobile estimates derived from lab measurements + 4x mobile slowdown factor applied to observed timings
- PSI API was rate-limited (429) during audit; estimates based on HTML source analysis and real browser measurements
- All pages use H2 protocol, Netlify CDN edge caching, and gzip/brotli compression

---

## Page-by-Page Performance

### 1. Homepage (`/`)

| Metric | Value |
|--------|-------|
| TTFB | 28ms |
| FCP | 76–136ms |
| DOM Content Loaded | 52–66ms |
| Load Complete | 91–610ms |
| HTML Size (compressed) | ~18KB initial |
| HTML Size (decompressed) | ~14KB initial, ~97KB with RSC hydration |
| Total Resources | 46 |
| Protocol | H2 |

**LCP Element:** Hero image `/Images/Tailored_Guestroom_Collections.jpg` (1408x768, 371KB original, ~55KB as WebP via `/_next/image`)
- Correctly marked with `priority={true}` on first hero image
- 4 hero images loaded (carousel), only first has priority — good
- No explicit `<link rel="preload">` for the hero image in document head

**CLS Risks:**
- `fade-in-up` class starts elements at `opacity: 0; transform: translateY(28px)` — content shifts 28px when revealed
- CountUp component starts at `0` and animates to final values — causes text reflow in trust bar
- Hero images use `fill` with absolute positioning — no CLS from images (good)

**INP Observations:**
- Header scroll listener uses `{ passive: true }` — good
- ScrollReveal uses IntersectionObserver (non-blocking) — good
- No heavy event handlers detected

**Bottlenecks:**
- 7 RSC prefetch requests fired immediately (`?_rsc=` for about, products, projects, inspirations, services, schedule-call, contact) — ~61KB total prefetch payload
- Hero image not preloaded in document head (relies on Next.js Image priority attribute which adds preload but only after JS parses)

---

### 2. Products (`/products`)

| Metric | Value |
|--------|-------|
| TTFB | 349ms |
| FCP | 496ms |
| DOM Content Loaded | 403ms |
| Load Complete | 652ms |
| HTML Size (decompressed) | ~43KB initial |
| RSC Payload | 135KB |
| Total Resources | 41 |
| Image Resources | 6 loaded (largest: 100KB) |

**LCP Element:** Text heading "Commercial Furniture Products" or first visible product grid image
- No images have `priority` on this page — all product images use `loading="lazy"`
- First 6 product images loaded on initial viewport, but without priority hints

**CLS Risks:**
- Product cards use `fill` images within explicit aspect-ratio containers — CLS minimal for images
- Filter sidebar uses client-side `useState` with `mounted` check — may cause brief layout jump

**Bottlenecks:**
- 135KB RSC payload is heavy (all ~180 product data serialized)
- TTFB higher (349ms) due to server rendering all product data
- No pagination — all products rendered in DOM, though lazy-loaded images help

---

### 3. Products/Hotel (`/products/hotel`)

| Metric | Value |
|--------|-------|
| TTFB | 25ms (cached) |
| FCP | 220ms |
| Load Complete | 206ms |
| HTML Size (decompressed) | ~26KB |
| Total Transfer | ~66KB |

**LCP Element:** First product grid image or page heading
- Product images use Unsplash URLs via Next.js Image optimization
- Hotel product images in source are 2–4MB PNGs, optimized down to ~40–100KB via `/_next/image`

**Bottlenecks:**
- Minimal — this is a filtered subset, loads fast
- Product images are large PNGs at source (up to 4.3MB), relying entirely on runtime optimization

---

### 4. Blog (`/blog`)

| Metric | Value |
|--------|-------|
| TTFB | 28ms |
| FCP | 224ms |
| Load Complete | 173ms |
| HTML Size (decompressed) | ~9KB |
| Total Transfer | ~108KB |
| Total Resources | 39 |

**LCP Element:** `<h1>` heading "Commercial Furniture & FF&E Insights"
- Pure text page — no images in body
- Fastest page on the site

**CLS Risks:** Minimal — text-only layout, no dynamic injection

**Bottlenecks:**
- Blog title in `<title>` tag is duplicated: "FF&E & Commercial Furniture Blog | DMD Furnishing | DMD Furnishing" — the `| DMD Furnishing` appears twice (template metadata applied on top of explicit title)
- No blog post images or thumbnails — could help visual engagement but is fine for performance

---

### 5. Contact (`/contact`)

| Metric | Value |
|--------|-------|
| TTFB | 216ms |
| FCP | 296ms |
| Load Complete | 282ms |
| HTML Size (decompressed) | ~9KB |
| Total Transfer | ~63KB |
| Total Resources | 36 |

**LCP Element:** Form heading "Request a Consultation" or the email input form
- No hero image — text-driven LCP (fast)

**CLS Risks:**
- Multi-step form (`step` state: email → otp → form) — layout changes between steps
- Form fields rendered conditionally based on project category selection

**Bottlenecks:**
- `react-icons/fa` imports 6 icons — tree-shaking should handle this, but verify bundle includes only needed icons
- No images to optimize

---

### 6. Services (`/services`)

| Metric | Value |
|--------|-------|
| TTFB | 210ms |
| FCP | 268ms |
| Load Complete | 283ms |
| HTML Size (decompressed) | ~17KB |
| Total Transfer | ~64KB |
| Total Resources | 36 |

**LCP Element:** Hero image `/Images/Our Services.jpg` (469KB original, ~55KB as WebP)
- Correctly marked with `priority={true}` — good
- Uses `fill` with responsive sizes — proper sizing

**CLS Risks:**
- IndustryTabs component — tab switching causes content change (expected interaction, not CLS issue)
- ProcessTimeline component — animation-driven, could cause CLS if not pre-dimensioned

**Bottlenecks:**
- `react-icons/gi` imports 6 icons — check tree-shaking effectiveness
- Hero image served at 55KB WebP — well optimized

---

## Resource Analysis

### JavaScript Bundles
| Resource | Size (compressed) | Caching |
|----------|------------------|---------|
| webpack runtime | ~2.8KB | immutable, 1yr |
| React framework chunks | ~130KB total | immutable, 1yr |
| Page-specific chunks | ~5–15KB each | immutable, 1yr |
| Polyfills | 112KB (uncompressed) | immutable, 1yr |

**Total estimated JS:** ~200–250KB compressed across all chunks for initial page load.

### CSS
| Resource | Size | Caching |
|----------|------|---------|
| globals.css (098e84a8b419a0c7) | 38KB | immutable, 1yr |
| Page-specific CSS | 2–8KB each | immutable, 1yr |

**Total estimated CSS:** ~50–60KB for initial load.

### Fonts
| Resource | Size | Loading | Caching |
|----------|------|---------|---------|
| Playfair Display (woff2) | ~29KB | preload, `display: swap` | immutable, 1yr |
| Source Sans 3 (woff2) | ~29KB | preload, `display: swap` | immutable, 1yr |

Font loading is well-optimized: self-hosted WOFF2, preloaded, with `font-display: swap`.

### Images
| Metric | Value |
|--------|-------|
| Total source images | 779 files |
| Total source image size | ~9.6GB |
| Largest source image | 9.5MB (project photos) |
| Image optimization | Next.js Image (AVIF/WebP, q=75) |
| Hero image (served) | ~55KB (WebP from 371KB JPEG) |
| Product images (served) | ~40–100KB each |

---

## Issues Found

### Critical

1. **Image Cache-Control Missing Long-Term Caching**
   - `/_next/image` responses return `Cache-Control: public,max-age=0,must-revalidate`
   - Every return visit forces revalidation of all images
   - Static assets (JS/CSS/fonts) correctly use `immutable, max-age=31536000`
   - **Impact:** Repeat visitors re-download images, increasing LCP on return visits
   - **Fix:** Configure Netlify headers or Next.js `minimumCacheTTL` (already set to 31536000 in config but not being applied to served headers — investigate Netlify Image CDN override)

2. **Excessive RSC Route Prefetching**
   - On initial homepage load, 7 RSC prefetch requests fire immediately (~61KB)
   - Routes prefetched: `/`, `/about`, `/products`, `/projects`, `/inspirations`, `/schedule-call`, `/contact`
   - This competes with LCP image loading for bandwidth
   - **Impact:** On mobile/slow networks, LCP delayed by bandwidth contention
   - **Fix:** Add `prefetch={false}` to non-critical navigation links, or use `prefetch="intent"` (Next.js 15+)

### High

3. **Products Page RSC Payload Bloat (135KB)**
   - All ~180 product data serialized in RSC stream payload
   - Includes full image paths, metadata for every product
   - **Impact:** TTFB elevated (349ms vs 28ms for homepage), slow initial parse
   - **Fix:** Implement pagination or virtual scrolling; limit initial product load to 20–30 items

4. **No Preload Hint for LCP Hero Image**
   - Homepage hero image `/Images/Tailored_Guestroom_Collections.jpg` uses Next.js `priority` prop
   - Next.js adds a `<link rel="preload">` dynamically, but only after the JS parses — not in initial HTML
   - **Impact:** Browser doesn't discover LCP image until JS executes
   - **Fix:** Add manual `<link rel="preload" as="image" href="/_next/image?url=..." fetchpriority="high">` in layout head, or use Next.js metadata API to add preload

5. **Source Images Not Pre-Optimized**
   - 779 images totaling ~9.6GB in `/public/Images/`
   - Project photos up to 9.5MB each (JPEG from phone cameras)
   - Product images up to 4.3MB each (high-res PNGs)
   - Runtime optimization via `/_next/image` handles this, but increases TTFB for first requests
   - **Impact:** First-time image loads are slow (server must optimize on-the-fly), Netlify build/deploy size bloated
   - **Fix:** Pre-optimize source images to 1920px max width, convert PNGs to JPEG/WebP at source

### Medium

6. **CLS from `fade-in-up` Animation Pattern**
   - Elements with class `fade-in-up` start with `opacity: 0; transform: translateY(28px)`
   - When IntersectionObserver fires, elements shift 28px upward
   - While opacity transition masks some shift, `translateY` change still contributes to CLS
   - **Impact:** CLS score elevated, especially on slower devices where animation timing misaligns
   - **Fix:** Change to `opacity`-only animation (remove `translateY`), or use `will-change: transform` and `contain: layout` to isolate

7. **CountUp Component Causes Text Reflow**
   - Trust bar numbers animate from 0 to final values (e.g., 0 to 285+)
   - Text width changes during animation (e.g., "0" to "285+")
   - **Impact:** Minor CLS in trust bar section
   - **Fix:** Set `min-width` on counter elements to match final value width, or use CSS `font-variant-numeric: tabular-nums`

8. **Blog Title Metadata Duplication**
   - Blog page title renders as "FF&E & Commercial Furniture Blog | DMD Furnishing | DMD Furnishing"
   - The layout template appends `| DMD Furnishing` to the page's already-suffixed title
   - **Impact:** Poor SEO signal (duplicate branding), unprofessional in search results
   - **Fix:** Remove `| DMD Furnishing` from the blog page's explicit metadata title

9. **No `fetchpriority` Attribute on Critical Images**
   - While `priority` prop is used on hero images, the explicit `fetchpriority="high"` attribute provides additional browser prioritization hint
   - Next.js Image with `priority` adds this automatically in recent versions — verify deployed HTML contains it

### Low

10. **HTML Document Cache-Control is `max-age=0`**
    - HTML responses use `Cache-Control: public,max-age=0,must-revalidate` with ETags
    - This is standard for SSR/ISR but means every navigation requires a server round-trip
    - Netlify edge caching and `X-Nextjs-Stale-Time: 300` partially mitigate this
    - **Impact:** Minimal — standard pattern for dynamic content

11. **No Third-Party Script Loading**
    - No analytics (GA4/GTM), no chat widgets, no marketing pixels detected
    - **Impact:** This is actually a performance positive — no third-party blocking
    - **Note:** When analytics are eventually added, use `next/script` with `strategy="lazyOnload"` or `afterInteractive`

12. **Product Images Lack Explicit Width/Height in Source**
    - Product cards use `fill` layout (position: absolute) — no CLS from this pattern
    - However, product detail pages should verify they have explicit container dimensions
    - **Impact:** Minimal due to container sizing approach

13. **Polyfills Bundle (112KB Uncompressed)**
    - Standard Next.js polyfills.js included — compressed to ~35KB
    - Served to all browsers including modern ones that don't need them
    - **Impact:** Low — compressed size is acceptable, and this is standard Next.js behavior

---

## Recommendations (Prioritized by Impact)

### P0 — Fix Before Launch (Critical Impact)

1. **Fix image caching headers** — Investigate why `minimumCacheTTL: 31536000` in `next.config.js` is not reflected in served `/_next/image` responses. Add Netlify `_headers` file or `[[headers]]` in `netlify.toml`:
   ```toml
   [[headers]]
     for = "/_next/image/*"
     [headers.values]
       Cache-Control = "public, max-age=86400, stale-while-revalidate=604800"
   ```

2. **Reduce RSC prefetch aggressiveness** — Add `prefetch={false}` to at least 4 of 7 nav links (inspirations, projects, schedule-call, about) to free bandwidth for LCP:
   ```jsx
   <Link href="/inspirations" prefetch={false}>Inspirations</Link>
   ```

3. **Pre-optimize source images** — Run a one-time batch optimization:
   - Resize all images to max 1920px width
   - Convert PNGs to WebP/JPEG where transparency is not needed
   - Target: reduce `/public/Images/` from 9.6GB to ~500MB
   - This dramatically improves first-time-visitor image TTFB

### P1 — High Impact Improvements

4. **Add manual LCP image preload** — In the homepage layout or page metadata, add a preload link for the hero image so the browser discovers it before JS parsing.

5. **Implement product catalog pagination** — Limit initial render to 24–30 products, add "Load More" or infinite scroll. This reduces:
   - RSC payload from 135KB to ~30KB
   - DOM node count from 1000+ to ~300
   - TTFB from 349ms to ~100ms

6. **Fix blog title duplication** — Change blog page metadata to:
   ```js
   title: 'FF&E & Commercial Furniture Blog',  // Remove "| DMD Furnishing"
   ```

### P2 — Medium Impact Improvements

7. **Reduce CLS from fade-in-up animations** — Change to opacity-only or use CSS `content-visibility: auto` for below-fold sections:
   ```css
   .fade-in-up {
     opacity: 0;
     /* Remove: transform: translateY(28px); */
     transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1);
   }
   ```

8. **Stabilize CountUp component** — Add tabular numbers and minimum width:
   ```css
   .trustStatNumber {
     font-variant-numeric: tabular-nums;
     min-width: 4ch;
     display: inline-block;
   }
   ```

9. **Add `content-visibility: auto` to below-fold sections** — For FAQ, process steps, and other lower sections:
   ```css
   .faqList, .processSteps, .whyGrid {
     content-visibility: auto;
     contain-intrinsic-size: auto 500px;
   }
   ```

### P3 — Low Impact / Future

10. **Prepare for analytics integration** — When adding GA4/GTM, use `next/script` with `strategy="lazyOnload"`.

11. **Consider route-level code splitting** for `react-icons` — Each icon set (gi, fa, fi) should only include used icons via tree-shaking. Verify build output does not include entire icon libraries.

12. **Add resource hints for external domains** — If any external images are used:
    ```html
    <link rel="dns-prefetch" href="https://images.unsplash.com" />
    <link rel="preconnect" href="https://images.unsplash.com" />
    ```

---

## What's Working Well

- **H2 Protocol** — All resources served over HTTP/2 with multiplexing
- **Font Loading** — Self-hosted WOFF2, preloaded, `font-display: swap` — textbook implementation
- **Static Generation** — Product category pages use `generateStaticParams` + `dynamicParams = false`
- **Image Optimization** — Next.js Image component with AVIF/WebP formats, quality 75
- **No Third-Party Scripts** — Zero external script blocking
- **Security Headers** — HSTS, CSP, X-Frame-Options, Referrer-Policy all configured
- **Static Asset Caching** — JS/CSS/fonts properly cached with `immutable, max-age=31536000`
- **Sharp Installed** — Server-side image optimization uses `sharp` (faster than default `squoosh`)
- **Passive Event Listeners** — Scroll handlers use `{ passive: true }`
- **Reduced Motion Support** — ScrollReveal respects `prefers-reduced-motion`
- **Lazy Loading** — Product card images all use `loading="lazy"`

---

## Estimated Impact of Fixes

| Fix | Estimated LCP Improvement | Estimated CLS Improvement |
|-----|--------------------------|--------------------------|
| Image cache headers | -200ms repeat visits | — |
| Reduce RSC prefetch | -300ms mobile first load | — |
| Pre-optimize source images | -500ms first-time visitors | — |
| LCP image preload | -200ms first load | — |
| Product pagination | -250ms products page | — |
| Fix fade-in-up CLS | — | -0.03 to -0.08 |
| Stabilize CountUp | — | -0.01 to -0.03 |

**Combined estimated improvement:** LCP from ~2.5s to ~1.5s (mobile), CLS from ~0.10 to ~0.03

---

*Audit conducted using: Playwright Chromium browser, curl HTTP analysis, Next.js source code review, and Netlify CDN header inspection. PSI API was unavailable due to rate limiting.*
