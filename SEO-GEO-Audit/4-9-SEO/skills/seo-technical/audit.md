# Technical SEO Audit: DMD Furnishing

**URL:** https://dmdredesign.netlify.app (staging) / https://dmdfurnishing.com (production canonical)
**Date:** 2026-04-09
**Stack:** Next.js 15 (App Router, React Server Components) on Netlify
**Auditor:** seo-technical agent

---

## Overall Score: 72/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Crawlability | 85/100 | 15% | 12.8 |
| Indexability | 62/100 | 15% | 9.3 |
| Security Headers | 88/100 | 10% | 8.8 |
| URL Structure | 80/100 | 10% | 8.0 |
| Mobile Optimization | 90/100 | 10% | 9.0 |
| Core Web Vitals Risk | 70/100 | 15% | 10.5 |
| Structured Data | 85/100 | 10% | 8.5 |
| JS Rendering / SSR | 78/100 | 10% | 7.8 |
| IndexNow & Discovery | 55/100 | 5% | 2.8 |
| **Total** | | **100%** | **77.5 -> 72** (adjusted for critical domain issue) |

---

## 1. Crawlability (85/100)

### What Works
- **robots.txt** is well-configured with explicit AI crawler allowances for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, ChatGPT-User, Google-Extended, CCBot, anthropic-ai, cohere-ai
- Universal `User-agent: * / Disallow:` allows all crawlers
- Sitemap directive present: `Sitemap: https://dmdfurnishing.com/sitemap.xml`
- **llms.txt** file present with comprehensive business context for AI crawlers
- HTTP 301 redirect from HTTP to HTTPS confirmed working
- Custom 404 page returns proper HTTP 404 status code
- 404 page correctly has `robots: { index: false, follow: false }`

### Issues

**[HIGH] Sitemap is static, not dynamically generated**
- Sitemap is at `public/sitemap.xml` (static file), not generated via Next.js `app/sitemap.ts`
- Contains **310 URLs** confirmed from live XML
- URL depth distribution: 180 at depth 5 (product detail), 74 at depth 4, 25 at depth 2, 21 at depth 3, 10 at depth 1
- Risk of sitemap going stale as product catalog grows -- new products won't appear until manual regeneration

**[MEDIUM] Sitemap lastmod dates all identical**
- Every URL shows `lastmod: 2026-04-09` (today's date on live) or `2026-03-29` (in local source)
- Google treats uniform lastmod as unreliable and may ignore it entirely
- Should reflect actual page modification dates

**[MEDIUM] Sitemap uses deprecated `changefreq` and `priority`**
- Google has confirmed it ignores `<changefreq>` and `<priority>` elements
- These add XML bloat without SEO value
- Consider removing them or migrating to a dynamic sitemap generator

**[LOW] No sitemap index for 310+ URLs**
- While 310 URLs fits in a single sitemap (limit is 50,000), splitting into logical sub-sitemaps (products, blog, pages) improves crawl diagnostics in Google Search Console

---

## 2. Indexability (62/100)

### What Works
- All key pages have unique `<title>` tags following template pattern: `{Page Title} | DMD Furnishing`
- Unique meta descriptions on all audited pages
- Canonical URLs present on homepage, about, services, blog, contact pages
- No `noindex` directives on any content pages (only on 404 page, correctly)
- `metadataBase` set to `https://dmdfurnishing.com` in root layout

### Issues

**[CRITICAL] Production domain serves old CRA SPA, not the Next.js site**
- `https://dmdfurnishing.com` returns: "You need to enable JavaScript to run this app."
- This is the OLD Create React App build -- completely non-indexable by search engines
- ALL canonical URLs, sitemap URLs, and OG URLs point to `https://dmdfurnishing.com`
- The actual Next.js SSR site is only live at `https://dmdredesign.netlify.app`
- **Impact:** Google is indexing the broken CRA version, not the SEO-optimized Next.js version
- **Fix:** Point dmdfurnishing.com DNS to the Netlify site serving the Next.js build, or configure Netlify custom domain

**[HIGH] Canonical URL domain mismatch**
- Canonical on staging: `https://dmdfurnishing.com` (points to broken CRA site)
- Actual content served from: `https://dmdredesign.netlify.app`
- This tells Google the "real" version is the broken one
- Affects: homepage, about, services, blog, contact, all product pages

**[MEDIUM] Some product category pages may have incomplete OG tags in HTML output**
- `/products` main page: OG tags not reliably detected in fetch
- `/products/hotel/guest-room`: OG tags not reliably detected
- `/products/hotel/guest-room/bed-frame`: OG tags not reliably detected
- The `generatePageMetadata` function generates OG tags, but intermediate catalog pages may not be calling it consistently

**[LOW] Blog title has redundant brand name**
- Blog page title: "FF&E & Commercial Furniture Blog | DMD Furnishing | DMD Furnishing"
- Duplicate " | DMD Furnishing" suffix -- template pattern appends it when title already includes it

---

## 3. Security Headers (88/100)

### What Works
Excellent security header configuration across both `next.config.js` and `public/_headers`:

| Header | Value | Status |
|--------|-------|--------|
| Strict-Transport-Security | `max-age=31536000; includeSubDomains; preload` | PASS |
| X-Content-Type-Options | `nosniff` | PASS |
| X-Frame-Options | `SAMEORIGIN` | PASS |
| Referrer-Policy | `strict-origin-when-cross-origin` | PASS |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | PASS |
| Content-Security-Policy | Present with restrictive defaults | PARTIAL |

### Issues

**[MEDIUM] CSP allows `unsafe-inline` for scripts**
- Production CSP: `script-src 'self' 'unsafe-inline'`
- `unsafe-inline` weakens CSP significantly -- allows inline script injection
- Next.js requires this for hydration scripts unless nonce-based CSP is configured
- Consider implementing nonce-based CSP with `next/headers` for stricter protection

**[LOW] CSP missing `connect-src` directive**
- No `connect-src` specified -- defaults to `default-src 'self'`
- If any third-party APIs, analytics, or form services are added, they will be blocked
- Proactively add `connect-src 'self'` and expand as needed

**[LOW] X-Frame-Options conflict between `_headers` (DENY) and `next.config.js` (SAMEORIGIN)**
- Both files define X-Frame-Options with different values
- Next.js headers take precedence at runtime, resulting in SAMEORIGIN
- Align both to the same value for consistency

**[LOW] Missing X-XSS-Protection in next.config.js runtime headers**
- `_headers` includes `X-XSS-Protection: 1; mode=block` but `next.config.js` does not
- While deprecated in modern browsers, some older browsers still respect it

---

## 4. URL Structure (80/100)

### What Works
- Clean hierarchical product URLs: `/products/{place}/{furnitureType}/{subcategory}/{product}`
- Example: `/products/hotel/guest-room/bed-frame/full-xl-bed-frame---metal`
- Consistent lowercase slugs with hyphens
- No trailing slashes (`trailingSlash: false` in next.config.js)
- Logical breadcrumb-matching URL paths
- `_redirects` file handles known typo corrections (e.g., `tv-media-penal` -> `tv-media-panel`, `luggage-bentch` -> `luggage-bench`)

### Issues

**[MEDIUM] Triple-dash separator in some product URLs**
- Example: `/products/hotel/guest-room/bed-frame/full-xl-bed-frame---metal`
- Triple dashes (`---`) are unusual and may confuse crawlers or users
- Should be single dash: `full-xl-bed-frame-metal`

**[MEDIUM] Product URL depth is 5 levels**
- 180 out of 310 URLs (58%) are at depth 5: `/products/{1}/{2}/{3}/{4}`
- Deep URLs receive less crawl equity and may be harder for users to share
- Google has stated URL depth doesn't directly impact rankings, but click-depth from homepage matters
- Ensure all product pages are reachable within 3-4 clicks from homepage

**[LOW] Inspiration pages use numeric IDs**
- URLs: `/inspirations/1`, `/inspirations/2`, etc.
- Non-descriptive slugs provide zero keyword signal
- Should use descriptive slugs: `/inspirations/modern-hotel-lobby-design`

**[LOW] Potential route conflict: `[...slug]` catch-all vs nested `[placeSlug]/[furnitureTypeSlug]/[subcategorySlug]`**
- Both patterns exist under `/products/`
- Next.js resolves this correctly (specific routes take priority over catch-all), but adds maintenance complexity

---

## 5. Mobile Optimization (90/100)

### What Works
- Viewport meta tag correctly set: `width=device-width, initial-scale=1`
- HTML `lang="en"` attribute present
- Next.js Image component used with responsive `sizes` attribute
- Font loading optimized with `display: 'swap'` preventing FOIT (Flash of Invisible Text)
- Skip link present: `<a href="#main-content" class="skip-link-global">Skip to main content</a>`
- Fonts preloaded as woff2 with crossOrigin

### Issues

**[LOW] No explicit touch-action or tap-highlight styles detected**
- Consider adding `-webkit-tap-highlight-color: transparent` for cleaner mobile interactions
- Minor UX polish, not a ranking factor

---

## 6. Core Web Vitals Risk Assessment (70/100)

### CWV Thresholds (2026)
| Metric | Good | Poor |
|--------|------|------|
| LCP | <=2.5s | >4s |
| INP | <=200ms | >500ms |
| CLS | <=0.1 | >0.25 |

### Risk Analysis

**LCP Risk: MEDIUM**
- Homepage hero uses Next.js Image with `priority` flag (good -- disables lazy loading for LCP element)
- Multiple hero images with animation delays (0s, 7s, 14s, 21s) suggest image carousel
- Image optimization configured: AVIF and WebP formats, 1-year cache TTL
- Risk factor: Large hero images on initial load; carousel may delay LCP if first image is not the LCP element
- CSP blocks external image CDNs -- all images must be self-hosted or from `images.unsplash.com`

**INP Risk: MEDIUM**
- React Server Components reduce client-side JS bundle
- `ScrollReveal` and `ScrollToTop` are client components that add event listeners
- Product catalog pages with filtering may have heavy interaction handlers
- `dynamicParams = false` means all pages are statically generated -- good for INP

**CLS Risk: LOW-MEDIUM**
- Next.js Image component provides width/height to prevent layout shift
- Font `display: 'swap'` may cause minor CLS on font load
- Font variables (`--font-serif`, `--font-sans`) used -- good for consistent fallback sizing
- Dark mode default (`data-theme="dark"`) prevents flash/shift from theme change

### Issues

**[HIGH] No Web Vitals monitoring or reporting detected**
- No `web-vitals` library, no `reportWebVitals` export, no analytics integration
- Cannot measure actual field CWV data without monitoring
- Recommend: Add `next/third-parties` Google Analytics with web-vitals reporting, or use Netlify Analytics

**[MEDIUM] Image carousel on homepage may hurt LCP**
- Multiple full-screen images cycling with animation delays
- First image should have explicit `priority` attribute; subsequent images should lazy-load
- Verify LCP element is the first visible image, not a later carousel frame

**[LOW] No `fetchpriority="high"` hints on critical resources**
- While Next.js `priority` prop adds preload, explicit `fetchpriority` on key images can improve LCP

---

## 7. Structured Data Detection (85/100)

### What Works
Comprehensive structured data implementation across the site:

**Global (all pages via root layout):**
- `Organization` schema with @id anchor, logo, contact, address, social profiles
- `LocalBusiness` schema with geo coordinates, opening hours, price range
- `WebSite` schema with SearchAction (sitelinks search box potential)

**Page-specific schemas:**
| Page | Schema Types |
|------|-------------|
| Homepage | WebPage |
| About | AboutPage, FAQPage, BreadcrumbList |
| Services | BreadcrumbList, ItemList (6 services), HowTo (6-step process), FAQPage (8 Q&As) |
| Blog | CollectionPage, BreadcrumbList |
| Contact | ContactPage, BreadcrumbList |
| Product Detail | Product (with offers, brand, manufacturer, SKU, material, specs), BreadcrumbList |
| Product Category | BreadcrumbList, CollectionPage |

### Issues

**[HIGH] Product schema has `price: '0'` which is misleading**
- Product detail pages have: `"price": "0", "priceCurrency": "USD"`
- Google may interpret this as "free products" or flag as spam
- For quote-based pricing, omit `price` entirely or use `priceSpecification` with `minPrice`
- Better approach: Remove `Offer` schema entirely or use `priceRange: "Contact for Quote"`

**[MEDIUM] Organization and LocalBusiness schemas are redundant**
- Both appear on every page via root layout
- Google recommends using one primary entity type
- For a B2B manufacturer, `Organization` is more appropriate globally; `LocalBusiness` should appear only on `/contact` and `/about`

**[LOW] Social profile URLs may not be verified**
- `sameAs` links to facebook.com/dmdfurnishing, instagram.com/dmdfurnishing, etc.
- Ensure these profiles exist and are claimed; broken sameAs links reduce schema trust

---

## 8. JS Rendering / SSR (78/100)

### What Works
- Next.js App Router with React Server Components -- most content is server-rendered
- `generateStaticParams()` with `dynamicParams = false` on all product routes -- fully static generation
- No `__NEXT_DATA__` JSON blob (App Router uses RSC streaming instead, which is more efficient)
- Content is immediately parseable in HTML response without JavaScript execution
- Streaming RSC payloads (`__next_f` chunks) for progressive hydration

### Issues

**[CRITICAL] Production domain (dmdfurnishing.com) serves old CRA SPA**
- `https://dmdfurnishing.com` returns "You need to enable JavaScript to run this app."
- Google's crawler may partially render JavaScript, but CRA SPAs have historically poor indexing
- All the SSR advantages of Next.js are wasted if production traffic goes to the CRA build
- This is the single most impactful issue in this entire audit

**[MEDIUM] Static sitemap risks going stale**
- `public/sitemap.xml` is a static file, not generated by `app/sitemap.ts`
- When products are added/removed from the catalog data, the sitemap must be manually regenerated
- Risk: orphaned URLs in sitemap (404s) or new pages missing from sitemap
- Recommendation: Migrate to dynamic sitemap using Next.js `app/sitemap.js` route

**[LOW] No `_next/static` cache headers optimization visible**
- Next.js static assets get content-hash filenames (good for long-term caching)
- Verify Netlify serves these with `Cache-Control: public, max-age=31536000, immutable`

---

## 9. IndexNow & Discovery (55/100)

### What Works
- IndexNow submission script exists at `scripts/submit-indexnow.js`
- IndexNow key file present at `public/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.txt`
- Backup key file at `public/indexnow-key.txt`
- Script reads sitemap and submits up to 10,000 URLs to `api.indexnow.org`

### Issues

**[HIGH] IndexNow key is a placeholder/test value**
- Key: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
- This looks like a test/placeholder key, not a real registered key
- IndexNow keys should be a unique identifier generated for the specific domain
- Verify this key is actually registered with IndexNow for `dmdfurnishing.com`

**[HIGH] IndexNow is not automated**
- Script must be run manually (`node scripts/submit-indexnow.js`)
- Not integrated into build pipeline or post-deploy hooks
- Should be triggered automatically after each Netlify deploy
- Add to `netlify.toml` as a post-build plugin or deploy-succeeded function

**[MEDIUM] IndexNow submits ALL URLs every time**
- Script submits the entire sitemap (310 URLs) on each run
- IndexNow is designed for notifying about changed/new URLs only
- Submitting unchanged URLs wastes quota and may be rate-limited
- Implement delta detection: track previously submitted URLs and only submit changes

**[MEDIUM] No Google Search Console integration detected**
- No `google-site-verification` meta tag found in layout or metadata
- Critical for monitoring indexing status, crawl errors, and CWV field data

**[MEDIUM] No Bing Webmaster Tools verification detected**
- No `msvalidate.01` meta tag
- Bing is the primary search engine behind IndexNow -- verification is important

---

## Issues Summary by Severity

### Critical (2)
1. **Production domain (dmdfurnishing.com) serves old CRA SPA** -- all canonical URLs, sitemap URLs, and OG URLs point to a JavaScript-dependent app that says "You need to enable JavaScript to run this app." Google cannot properly index this. The entire Next.js SSR investment is wasted.
2. **Canonical URL domain mismatch** -- staging site (dmdredesign.netlify.app) has canonicals pointing to production domain (dmdfurnishing.com) which serves the old broken site.

### High (5)
3. Product schema has `price: '0'` -- Google may flag as spam or misinterpret as free products
4. No Web Vitals monitoring -- cannot measure or improve field CWV data
5. IndexNow key appears to be a placeholder -- submissions may be rejected
6. IndexNow is not automated -- requires manual execution after each deploy
7. Sitemap is static file, not dynamically generated -- risk of staleness

### Medium (9)
8. Sitemap lastmod dates all identical -- Google ignores uniform lastmod
9. Sitemap uses deprecated changefreq/priority tags
10. CSP allows `unsafe-inline` for scripts
11. Triple-dash separator in some product URLs
12. Product URL depth is 5 levels (58% of URLs)
13. Some product category pages may have incomplete OG tags
14. Organization + LocalBusiness schema redundancy on all pages
15. IndexNow submits all URLs every time (no delta detection)
16. No Google Search Console or Bing Webmaster Tools verification
17. Image carousel on homepage may hurt LCP

### Low (8)
18. Blog title has redundant brand name duplication
19. No sitemap index structure
20. Inspiration pages use numeric ID slugs
21. CSP missing explicit connect-src directive
22. X-Frame-Options conflict between _headers and next.config.js
23. Missing X-XSS-Protection in next.config.js runtime headers
24. No explicit fetchpriority hints on critical images
25. Social profile sameAs URLs may not be verified

---

## Priority Recommendations

### Immediate (This Week)
1. **Deploy Next.js site to dmdfurnishing.com** -- Point the custom domain DNS to the Netlify site running the Next.js build. This single change unlocks all the SEO work already done. Until this happens, the site is effectively invisible to search engines.
2. **Verify Google Search Console** -- Add `google-site-verification` meta tag and verify the property. Submit sitemap. Monitor indexing.
3. **Fix Product schema pricing** -- Remove `"price": "0"` from Product offers. Use `priceRange: "Contact for Quote"` or omit the Offer entirely.

### Short Term (2 Weeks)
4. **Automate IndexNow** -- Add post-deploy hook in Netlify to run IndexNow submission automatically. Generate a real IndexNow key for the domain.
5. **Migrate to dynamic sitemap** -- Create `app/sitemap.js` that generates sitemap from catalog data at build time. Include accurate lastmod dates per page.
6. **Add Web Vitals monitoring** -- Integrate `web-vitals` library with Google Analytics 4 or use Netlify Analytics for field CWV data.
7. **Verify Bing Webmaster Tools** -- Add `msvalidate.01` meta tag, verify property.

### Medium Term (1 Month)
8. **Fix triple-dash product slugs** -- Normalize to single dashes with 301 redirects from old URLs.
9. **Add descriptive inspiration slugs** -- Change from `/inspirations/1` to `/inspirations/modern-hotel-lobby`.
10. **Implement nonce-based CSP** -- Remove `unsafe-inline` from script-src using Next.js nonce support.
11. **Separate Organization/LocalBusiness schemas** -- Organization on all pages, LocalBusiness only on location-relevant pages.
12. **Fix blog title duplication** -- Adjust blog page metadata to not include brand name since template adds it.

---

## Architecture Notes

### Rendering Strategy
- **App Router** with React Server Components (streaming SSR)
- All product pages use `generateStaticParams()` + `dynamicParams = false` = full SSG
- Blog, about, services, contact pages are server-rendered
- Font optimization: `next/font/google` with `display: 'swap'` and CSS variables

### Key File Locations
- Security headers: `next.config.js` (lines 15-34) + `public/_headers`
- Root metadata: `app/layout.js` (lines 28-55)
- Metadata generator: `lib/metadata.js`
- Schema definitions: `lib/metadata.js` (lines 66-170)
- Sitemap: `public/sitemap.xml` (static, 310 URLs)
- Robots: `public/robots.txt`
- IndexNow script: `scripts/submit-indexnow.js`
- IndexNow key: `public/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.txt`
- Product routes: `app/products/[placeSlug]/`, `app/products/[...slug]/`
- 404 page: `app/not-found.js`
- LLM context: `public/llms.txt`
- Redirect rules: `public/_redirects`
- Netlify config: `netlify.toml`

### AI Search Readiness
- robots.txt explicitly allows all major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, ChatGPT-User, Google-Extended, CCBot, anthropic-ai, cohere-ai)
- `llms.txt` provides structured business context (services, products, FAQs, glossary)
- All page content is server-rendered (accessible without JS execution)
- Structured data provides entity context for AI model training
- No `ai.txt` or `.well-known/ai-plugin.json` (emerging standards, not yet critical)
