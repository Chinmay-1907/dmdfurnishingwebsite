# DMD Furnishing - Full SEO Audit Report

**Site:** https://dmdfurnishing.com
**Date:** 2026-03-25
**Business Type:** B2B Commercial Furniture Manufacturer (Hospitality FF&E)
**Platform:** React CRA (Create React App) on Netlify
**Pages in Sitemap:** 475

---

## Executive Summary

### Overall SEO Health Score: 28/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 20/100 | 25% | 5.0 |
| Content Quality | 55/100 | 25% | 13.8 |
| On-Page SEO | 40/100 | 20% | 8.0 |
| Schema / Structured Data | 35/100 | 10% | 3.5 |
| Performance (CWV) | 25/100 | 10% | 2.5 |
| Images | 30/100 | 5% | 1.5 |
| AI Search Readiness | 5/100 | 5% | 0.3 |
| **Total** | | | **34.6** |

### Top 5 Critical Issues

1. **Client-Side Rendering Only (No SSR/SSG)** - The entire site is a React SPA. Search engines receive an empty `<div id="root"></div>` with no content, meta tags, or schema. Google can render JS but with delays; Bing, AI crawlers (GPTBot, ClaudeBot, PerplexityBot) likely cannot.
2. **WWW vs Non-WWW Domain Mismatch** - Sitemap uses `https://www.dmdfurnishing.com` but all canonical URLs in code use `https://dmdfurnishing.com`. This creates conflicting signals for search engines.
3. **Pages Missing SEO Component** - `ScheduleCall`, `Inspirations`, and `InspirationDetail` have no SEO component, meaning no meta description, canonical, OG tags, or schema for these pages.
4. **Schema References Non-Existent Logo File** - `SEO.js` and `Home.js` reference `/logo.png` which does not exist. The actual logo is `/DMD_Furnishing_Logo_Embedded.svg` (1.9 MB — also far too large).
5. **Dual Conflicting SEO Systems** - `Services.js` uses BOTH the `<SEO>` component AND `setPageSEO()` utility simultaneously, with different titles/descriptions, causing meta tag conflicts. `Projects.js` and `ProjectDetail.js` use only `setPageSEO()` while other pages use `<SEO>` component.

### Top 5 Quick Wins

1. Add `<SEO>` component to `ScheduleCall.js`, `Inspirations.js`, and `InspirationDetail.js`
2. Fix www/non-www consistency (pick one and redirect the other)
3. Fix schema logo URL from `/logo.png` to actual file path
4. Remove duplicate `<SEO>` from `Home.js` and consolidate dual SEO system in `Services.js`
5. Add `_headers` file with security headers

---

## 1. Technical SEO (Score: 20/100)

### 1.1 Rendering Architecture - CRITICAL

**Issue:** The site is a React CRA single-page application with zero server-side rendering.

**Impact:** When any crawler (including Googlebot's first pass) requests a page, it receives:
```html
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
```

- All `<title>`, `<meta>`, canonical, OG tags, Twitter cards, and JSON-LD schema are injected **client-side via `useEffect`**
- Google's renderer processes JS pages with a "second wave" delay (hours to days)
- Bing, Yandex, AI crawlers (GPTBot, ClaudeBot, PerplexityBot) may not render JS at all
- 475 URLs in sitemap, none serving pre-rendered content

**Files affected:**
- `public/index.html` - Only static HTML served
- `src/components/SEO.js` - All meta tags injected via `useEffect` (line 68)
- `src/utils/seo.js` - All SEO utilities are client-side DOM manipulation

**Recommendation:** Migrate to Next.js (already planned per `NEXT_MIGRATION_PLAN.md`) or implement `react-snap` / `prerender-spa-plugin` for static prerendering as an interim solution.

### 1.2 Robots.txt

**Status:** Present and correctly configured
```
User-agent: *
Disallow:
Sitemap: https://www.dmdfurnishing.com/sitemap.xml
```

**Issue:** Sitemap URL uses `www.dmdfurnishing.com` but canonical URLs use `dmdfurnishing.com`

**File:** `public/robots.txt`

### 1.3 Sitemap.xml

**Status:** Auto-generated at build time via `scripts/generate-sitemap.js`

**Issues:**
- Uses `www.dmdfurnishing.com` domain (line 35) while all canonical URLs use `dmdfurnishing.com`
- Missing `<lastmod>` dates on all 475 URLs
- Missing `<changefreq>` values
- Missing static pages: `/about`, `/services`, `/contact`, `/schedule-call`, `/inspirations`, `/website-policies`
- Priority values are simplistic (homepage 1.0, products 0.9, everything else 0.7-0.8)

**File:** `scripts/generate-sitemap.js:35`

### 1.4 Canonical URLs

**Status:** Partially implemented

- SEO component sets canonical per page (`src/components/SEO.js:95`)
- Canonical uses `https://dmdfurnishing.com` (no www)
- Sitemap uses `https://www.dmdfurnishing.com` (with www)
- No canonical in the static `index.html` (intentionally, per comment on line 23)

**Conflict:** Sitemap and canonical URLs point to different domains.

### 1.5 URL Structure

**Status:** Good

- Clean, semantic URLs: `/products/hotels-motels/guest-room-furniture/headboards/headboard-name`
- Breadcrumb structure matches URL hierarchy
- Product slugs are auto-normalized via `toCatalogSlug()` (`src/utils/catalogPaths.js`)
- Canonical redirect for URL normalization in `ProductDetail.js:207-215`

### 1.6 SPA Routing / Redirects

**Status:** Correctly configured

- `public/_redirects` sends all routes to `index.html` with 200 status (Netlify SPA catch-all)
- API routes correctly proxied to Netlify Functions

**Issue:** The `/* /index.html 200` redirect means every URL returns a 200 status, even non-existent pages. This prevents search engines from discovering 404s.

### 1.7 Security Headers

**Status:** Missing

No `public/_headers` file exists. Missing headers:
- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Content-Security-Policy`
- `Referrer-Policy`
- `Permissions-Policy`

### 1.8 HTTPS

**Status:** Enabled (via Netlify automatic SSL)

### 1.9 Mobile Viewport

**Status:** Correctly configured
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

---

## 2. Content Quality (Score: 55/100)

### 2.1 E-E-A-T Assessment

**Experience:** Moderate - Projects page shows completed work but lacks case studies with measurable outcomes, client testimonials with full names/companies, or before/after comparisons.

**Expertise:** Good - Content demonstrates industry knowledge (FF&E, casegoods, HPL laminates, value engineering). Uses correct terminology.

**Authoritativeness:** Weak - No author profiles, no industry certifications displayed, no press mentions, no partner logos, no awards.

**Trustworthiness:** Moderate - Physical address and phone displayed consistently. Missing: BBB rating, industry association memberships, insurance/licensing info.

### 2.2 Content by Page

| Page | Title | Meta Description | Content Depth |
|------|-------|-----------------|---------------|
| Home | "Custom Hospitality Furniture & FF&E Solutions \| DMD Furnishing" | Good (157 chars) | Good - 8 sections |
| About | Has SEO component | Has description | Good |
| Products | Has SEO component | Dynamic per level | Good |
| Product Detail | Has SEO component | Product description | Varies by product |
| Services | Has SEO component | Has description | Good |
| Contact | Has SEO component | Has description | Good |
| Projects | Uses setPageSEO | Has description | Good |
| Project Detail | Uses setPageSEO | Has description | Good |
| **Schedule Call** | **MISSING SEO** | **MISSING** | Good content, no meta |
| **Inspirations** | **MISSING SEO** | **MISSING** | Good content, no meta |
| **Inspiration Detail** | **MISSING SEO** | **MISSING** | Good content, no meta |
| Website Policies | Has SEO component | Has description | Adequate |

### 2.3 Heading Hierarchy

**Homepage (`Home.js`):**
- H1: "Custom Hospitality Furniture. Designed. Manufactured. Delivered." - Good
- H2s: 7 total - "Who We Serve", "What Sets DMD Furnishing Apart", "Our Capabilities", "A Clear, Proven Process", "Selected Projects", "Built with Quality Materials", "Let's Discuss Your Project" - Good hierarchy
- H3s: Properly nested under H2s - Good

**ProjectDetail (`ProjectDetail.js`) - DUPLICATE H1:**
- Line 172: `<h1 className="hero-title">{project.name}</h1>` (in hero section)
- Line 185: `<h1>{project.name}</h1>` (in content section)
- **Issue:** Two H1 tags with same text. Line 185 should be `<h2>`.

**Services (`Services.js`) - DUAL SEO CONFLICT:**
- `setPageSEO()` on line 113 sets title: "Commercial Furniture Services | Custom Manufacturing & Project Solutions"
- `<SEO>` on line 126 sets title: "Our Services - DMD Furnishing"
- **Issue:** Two different titles and descriptions compete, and the separator is `-` instead of `|` (inconsistent with other pages)
- **Also:** The `<SEO>` description is 280+ characters (should be under 160)

**Footer (`Footer.js`):**
- H2: "DMD Furnishing" - This is in the footer on EVERY page, creating a misleading heading hierarchy
- H3s: "Quick Links", "Services", "Contact" - Footer headings are adding noise to heading structure

**Issue:** Footer uses H2/H3 tags for styling rather than semantics. Should use `<div>` or `<span>` with CSS classes.

### 2.4 Thin Content Risk

- Product pages rely on XML data descriptions which may be very short
- Category listing pages are primarily navigation with minimal text content
- The `ProductSearch.js` results have `alt=""` (empty alt text) on images (line 194)

---

## 3. On-Page SEO (Score: 40/100)

### 3.1 Title Tags

**Issues:**
- Static `index.html` title is just "DMD Furnishing" (line 40) - this is what crawlers see for ALL pages since there's no SSR
- Per-page titles are set via client-side JS only
- Home page renders `<SEO>` twice, creating duplicate title setting

### 3.2 Meta Descriptions

**Issues:**
- Static `index.html` has a generic description for ALL pages (line 12)
- Per-page descriptions only work if JS is rendered
- 3 pages completely missing descriptions (ScheduleCall, Inspirations, InspirationDetail)

### 3.3 Open Graph Tags

**Issues:**
- Static `index.html` OG image uses `%PUBLIC_URL%/DMD_Furnishing_Logo_Embedded.svg` - SVG may not be supported by all social platforms
- OG tags in code reference `logo.png` - verify this file exists at root
- Per-page OG tags are client-side only

### 3.4 Internal Linking

**Good:**
- Footer links to all major sections
- Homepage links to all product categories
- Product pages have breadcrumb navigation
- CTA buttons link to contact/schedule pages

**Issues:**
- No contextual internal links within content (e.g., blog posts, related products)
- No "Related Products" section on product detail pages
- No cross-linking between Projects and Products
- Footer service links use hash anchors (`/services#design-consultation`) which may not work properly in SPA

### 3.5 External Links

- Social media links in footer (Facebook, Instagram, LinkedIn, Pinterest) - Good
- Social links use `href` without `target="_blank"` or `rel="noopener noreferrer"` - Minor security/UX issue

---

## 4. Schema / Structured Data (Score: 35/100)

### 4.1 Implemented Schema

| Type | Location | Status |
|------|----------|--------|
| Organization | `SEO.js:7-28` | Present, client-side only |
| LocalBusiness | `SEO.js:30-59` | Present, client-side only |
| Product | `ProductDetail.js:255-263` | Present on product pages, client-side only |
| BreadcrumbList | `ProductDetail.js:265-274` | Present on product pages, client-side only |

### 4.2 Issues

1. **All schema is client-side only** - Search engines may not see it
2. **`@type: "Project"`** in `seo.js:169` is **not a valid Schema.org type**. Should use `CreativeWork` or `Article`
3. **Duplicate Organization schema** - Defined in both `SEO.js` and `Home.js` with slight differences (Home.js includes email, SEO.js doesn't)
4. **Schema references non-existent file** - `SEO.js:12` and `SEO.js:34` reference `logo.png` which does NOT exist on disk. Actual logo is `DMD_Furnishing_Logo_Embedded.svg`. This causes Google's schema validation to fail.
5. **Product schema missing required fields** - No `offers` (price/availability), no `review`, no `aggregateRating`
6. **LocalBusiness lacks `sameAs`** - Should include social media profile URLs
7. **No FAQPage schema** on Schedule Call page despite having FAQ content
8. **No WebSite schema** with SearchAction
9. **No Service schema** on Services page

### 4.3 Missing Schema Opportunities

- `FAQPage` for ScheduleCall FAQ section
- `Service` for each service offered
- `ImageGallery` for project galleries
- `WebSite` with `SearchAction` for site search
- `sameAs` property linking social profiles

---

## 5. Performance / Core Web Vitals (Score: 25/100)

### 5.1 Bundle Size Concerns

- React 19 + React Router 7 + react-slick + AOS + react-icons = substantial JS bundle
- No code splitting visible (CRA default is a single bundle)
- `react-slick` + `slick-carousel` CSS loaded on every page even when not using slider
- AOS (Animate On Scroll) library loaded globally

### 5.2 Image Loading

- **Only 2 images** use `loading="lazy"` (both in `ProductDetail.js`)
- Hero images on homepage load eagerly (correct for LCP) but have no `fetchpriority="high"`
- No `width` or `height` attributes on most images (CLS risk)
- Images served from `/Images/` directory - no image optimization pipeline
- No WebP/AVIF format usage
- No responsive images (`srcset`/`sizes`)

### 5.3 Third-Party Scripts

- AOS library adds ~14KB
- react-slick + slick-carousel adds ~40KB
- No analytics scripts detected (good for performance, bad for tracking)

### 5.4 CSS

- Multiple CSS files loaded: `App.css`, `Home.css`, `Inspirations.css`, etc.
- No CSS purging or tree-shaking
- Slick carousel CSS loaded globally

---

## 6. Images (Score: 30/100)

### 6.1 Alt Text

**Good:**
- Most images have descriptive alt text
- Hero images have specific, keyword-rich alt text: "Tailored hotel guestroom furniture collection"
- Product images fall back to product name if no specific alt

**Issues:**
- `ProductSearch.js:194` has `alt=""` (empty alt) on search result thumbnails
- Generic alt text on some images: "DMD Capabilities" (Home.js:250)

### 6.2 Image Optimization

**Issues:**
- No image optimization pipeline (no WebP/AVIF conversion)
- No responsive images (`srcset`/`sizes` attributes)
- No image CDN or Netlify Image CDN usage
- Images served as original JPG format
- Mixed case in image paths: `/Images/` vs `/images/` (Home.js:79 uses `/images/Outdoor.jpg` while others use `/Images/`)

### 6.3 OG/Social Images

- OG image uses SVG logo (`DMD_Furnishing_Logo_Embedded.svg`) - many platforms don't support SVG
- Should use a PNG/JPG at 1200x630px for optimal social sharing

---

## 7. AI Search Readiness (Score: 5/100)

### 7.1 AI Crawler Accessibility

- **FAIL** - Site returns empty HTML to all non-JS crawlers
- No `llms.txt` file
- No structured data visible in static HTML
- No `robots.txt` rules for AI crawlers (GPTBot, ClaudeBot, etc.)

### 7.2 Passage-Level Citability

- Content is well-structured with clear headings
- Good use of lists and structured content
- BUT: none of this is visible without JS rendering

### 7.3 Entity Clarity

- Business name, address, phone consistent across pages
- Industry terminology used correctly (FF&E, casegoods, BOQ)
- Missing: author information, publication dates, source citations

---

## Technical Details by File

### Files with SEO Issues

| File | Issue | Severity |
|------|-------|----------|
| `public/index.html:40` | Static title "DMD Furnishing" serves for all pages | Critical |
| `src/components/SEO.js:12,34` | References `/logo.png` which does NOT exist | Critical |
| `src/components/Home.js:89` | References `/logo.png` which does NOT exist | Critical |
| `src/components/Services.js:113+126` | Uses BOTH `setPageSEO()` AND `<SEO>` with conflicting titles | High |
| `src/components/Services.js:128` | Meta description 280+ chars (should be <160) | High |
| `src/components/Home.js:108-119` | Duplicate `<SEO>` component rendered | High |
| `src/components/ScheduleCall.js` | No SEO component at all | High |
| `src/components/Inspirations.js` | No SEO component at all | High |
| `src/components/InspirationDetail.js` | No SEO component at all | High |
| `src/components/ProjectDetail.js:172,185` | Duplicate H1 tags on same page | High |
| `scripts/generate-sitemap.js:35` | Uses `www.dmdfurnishing.com` domain | High |
| `src/components/SEO.js:5` | Uses `dmdfurnishing.com` (no www) | High (conflict) |
| `public/DMD_Furnishing_Logo_Embedded.svg` | 1.9 MB SVG logo (should be <50KB) | High |
| `src/utils/seo.js:169` | Invalid `@type: "Project"` schema | Medium |
| `src/components/Footer.js:11` | H2 in footer on every page | Medium |
| `src/components/ProductSearch.js:194` | Empty alt text on images | Medium |
| `src/components/Products.js:426,463,498` | Background images missing `role="img"` and `aria-label` | Medium |
| `src/components/ProjectDetail.js:169` | Background image missing `aria-label` | Medium |
| `public/index.html:18` | OG image is SVG (poor social sharing support) | Medium |
| `src/components/Footer.js:49-52` | Social links missing `rel="noopener noreferrer"` | Low |

---

## Domain & Hosting Notes

- Hosted on Netlify
- SSL: Automatic via Netlify
- CDN: Netlify Edge (global)
- Build: `node scripts/generate-sitemap.js && react-scripts build`
- Functions: Netlify Functions for API (OTP, email)
