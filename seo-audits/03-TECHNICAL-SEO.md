# Technical SEO Audit - DMD Furnishing

**Site:** https://dmdfurnishing.com
**Date:** 2026-03-25
**Platform:** React CRA SPA on Netlify

---

## Overall Technical SEO Score: 39/100

| Category | Status | Severity | Score |
|----------|--------|----------|-------|
| 1. Crawlability | Warning | High | 45/100 |
| 2. Indexability | Fail | Critical | 25/100 |
| 3. Security | Fail | High | 30/100 |
| 4. URL Structure | Warning | Medium | 65/100 |
| 5. Mobile | Pass | Low | 85/100 |
| 6. Core Web Vitals | Warning | High | 40/100 |
| 7. Structured Data | Warning | Medium | 55/100 |
| 8. JavaScript Rendering | Fail | Critical | 10/100 |
| 9. IndexNow | Fail | Medium | 0/100 |

---

## 1. Crawlability (45/100)

### robots.txt
**Status:** Valid and open
```
User-agent: *
Disallow:
Sitemap: https://www.dmdfurnishing.com/sitemap.xml
```
- All crawlers permitted (including AI crawlers)
- No specific rules for GPTBot, ClaudeBot, PerplexityBot
- **Issue:** Sitemap URL uses `www.dmdfurnishing.com` while canonicals use `dmdfurnishing.com`

### Sitemap
- **475 URLs** in sitemap
- Missing 6 static pages (`/about`, `/services`, `/contact`, `/schedule-call`, `/inspirations`, `/website-policies`)
- Missing `<lastmod>` and `<changefreq>` on all entries
- Domain mismatch with canonical URLs
- See `06-SITEMAP-AUDIT.md` for full details

### AI Crawler Access
| Crawler | Allowed? | Can See Content? |
|---------|----------|-----------------|
| GPTBot | Yes | NO (no JS rendering) |
| ClaudeBot | Yes | NO (no JS rendering) |
| PerplexityBot | Yes | NO (no JS rendering) |
| Google-Extended | Yes | Partial (delayed JS rendering) |
| CCBot | Yes | NO (no JS rendering) |

---

## 2. Indexability (25/100) — CRITICAL

### Canonical Tags
- **No canonical in static HTML** — `public/index.html:23` has a comment explaining this is intentional
- Canonicals are set via JS only (`SEO.js:95` useEffect)
- 3 pages have no canonical at all (ScheduleCall, Inspirations, InspirationDetail)
- **Impact:** Google receives zero canonical signal until JS renders

### Duplicate Content Risk
- `Home.js:108-119` renders `<SEO>` component **twice**, causing meta tag overwrites
- `Services.js` calls **both** `setPageSEO()` (line 113) AND `<SEO>` (line 126) with different titles
- Every URL returns identical HTML shell (title "DMD Furnishing") — soft duplicate

### Domain Conflict
| Source | Domain |
|--------|--------|
| Sitemap (`generate-sitemap.js:35`) | `https://www.dmdfurnishing.com` |
| All canonical URLs in code | `https://dmdfurnishing.com` |
| robots.txt Sitemap directive | `https://www.dmdfurnishing.com` |
| SEO.js siteUrl constant | `https://dmdfurnishing.com` |

### Missing 404 Route
- **No 404/catch-all route** in React Router (`App.js`)
- `_redirects` returns `/* /index.html 200` — all unknown URLs return HTTP 200
- **Impact:** Search engines cannot discover dead pages; soft 404 issue

---

## 3. Security (30/100) — HIGH

### HTTPS
**Status:** PASS — Netlify automatic SSL

### Security Headers
**Status:** FAIL — No `public/_headers` file exists

| Header | Status | Impact |
|--------|--------|--------|
| `Strict-Transport-Security` | MISSING | No HSTS enforcement |
| `X-Content-Type-Options` | MISSING | MIME sniffing risk |
| `X-Frame-Options` | MISSING | Clickjacking risk |
| `Content-Security-Policy` | MISSING | XSS risk |
| `Referrer-Policy` | MISSING | Privacy risk |
| `Permissions-Policy` | MISSING | Feature policy risk |
| `X-XSS-Protection` | MISSING | Legacy XSS protection |

### Recommended `public/_headers`
```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 4. URL Structure (65/100)

### Good
- Clean, semantic URLs: `/products/hotels-motels/guest-room-furniture/headboards/...`
- Breadcrumb structure matches URL hierarchy
- Auto-normalization via `toCatalogSlug()` with 301-style redirect in `ProductDetail.js:207-215`

### Issues
- **Typos from XML data** baked into URLs: `tv-media-penal` (should be `panel`), `luggage-bentch` (should be `bench`)
- **Lobby Area double segment:** `/products/lobby-area/lobby-area/accent-chairs` (place and furnitureType share same ID)
- **No trailing-slash normalization** in `_redirects`
- **Case-sensitivity redirect is JS-only** — no HTTP 301 redirect for case mismatches
- **Mixed-case image paths:** `/Images/` vs `/images/` in `Home.js:79`

---

## 5. Mobile (85/100) — PASS

### Viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```
**Status:** Correctly configured in `public/index.html:6`

### Responsive Design
- CSS uses responsive patterns throughout
- Media queries present in stylesheets
- No horizontal scroll issues detected in code

### Minor Issues
- No `theme-color` meta for mobile browsers... wait, it exists at `index.html:7` — `#000000` — PASS
- Touch targets and font sizes would need visual testing

---

## 6. Core Web Vitals (40/100) — HIGH

### LCP (Largest Contentful Paint) — Risk: HIGH
- Hero slider image (`/Images/Tailored_Guestroom_Collections.jpg`) is JS-rendered
- No `<link rel="preload">` for LCP image in `index.html`
- No `fetchpriority="high"` on hero images
- Image is not in static HTML — must wait for React hydration + slider init
- **Estimated LCP:** 3-5 seconds (poor)

### CLS (Cumulative Layout Shift) — Risk: HIGH
- **Every `<img>` tag** across all components is missing `width` and `height` attributes
- No CSS `aspect-ratio` properties detected
- Hero slider has no reserved space before JS loads
- **Files affected:** Home.js, ProductDetail.js, ProductGallery.js, ProjectDetail.js, Services.js, Header.js

### INP (Interaction to Next Paint) — Risk: MEDIUM
- No code splitting — React Router loads entire app bundle
- No `React.lazy()` usage for route-based splitting
- XML catalog (`DMD_Website.xml`) parsed synchronously client-side on product pages
- AOS library adds animation overhead to scroll events
- react-slick slider adds interaction overhead

### Bundle Size Concerns
| Library | Estimated Size | Loaded On |
|---------|---------------|-----------|
| React 19 + ReactDOM | ~140KB | Every page |
| React Router 7 | ~30KB | Every page |
| react-slick + slick-carousel | ~40KB | Every page (only used on Home) |
| AOS (Animate on Scroll) | ~14KB | Every page (used on most) |
| react-icons | Varies | Every page |
| All CSS files | Unknown | Every page (no purging) |

---

## 7. Structured Data (55/100)

### Implemented (All JS-Only)
| Schema | File | Issues |
|--------|------|--------|
| Organization | `SEO.js:7-28` | Missing `@id`, `sameAs`, `description`; broken `logo.png` reference |
| LocalBusiness | `SEO.js:30-59` | Missing `geo`, `sameAs`; broken logo |
| Organization (duplicate) | `Home.js:84-104` | Creates competing Organization block |
| Product + BreadcrumbList | `ProductDetail.js:255-286` | Missing `offers`, `category`, `manufacturer` |
| BreadcrumbList | `seo.js:115-129` | Used on Projects pages |
| **"Project" (INVALID)** | **`seo.js:169`** | **Not a Schema.org type** |

### Critical Issues
1. `logo.png` does not exist — `public/logo.png` is a 404
2. `@type: "Project"` is invalid Schema.org
3. Product schema missing `offers` — no rich results eligibility
4. All schema is JS-only — invisible to non-JS crawlers

See `05-SCHEMA-AUDIT.md` for full details.

---

## 8. JavaScript Rendering (10/100) — CRITICAL

### The Fundamental Problem
Every URL returns identical HTML:
```html
<title>DMD Furnishing</title>
<meta name="description" content="DMD Furnishing specializes in..." />
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
```

No per-page content, headings, images, links, schema, or dynamic meta tags are in the static HTML.

### What This Breaks
- Title tags: Same for all pages until JS renders
- Meta descriptions: Same generic description for all pages
- OG/Twitter tags: Same for all pages (SVG logo image — unsupported)
- Canonical URLs: Non-existent until JS renders
- Schema/JSON-LD: Non-existent until JS renders
- Content: Empty page until JS renders
- Internal links: None until JS renders

### OG Image Issue
`public/index.html:18,22` uses SVG (`DMD_Furnishing_Logo_Embedded.svg`) as social share image. SVG is unsupported by:
- Facebook
- LinkedIn
- Twitter/X
- Slack
- Discord
- Most social platforms

### Migration Status
Files already in repo suggest Next.js migration is planned:
- `migrate-to-next.js`
- `next.config.js`
- `NEXT_MIGRATION_PLAN.md`
- `package.json.next`

---

## 9. IndexNow (0/100)

**Status:** Not implemented
- No API key file
- No verification file
- No post-deploy hook to ping IndexNow
- **Impact:** Low priority — search engines discover content through sitemap and crawling

---

## Top 5 Actions by ROI

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Enable Netlify Prerendering (dashboard toggle) | Zero code | Fixes JS rendering for crawlers |
| 2 | Create `public/_headers` with security headers | 5 min | Fixes security score |
| 3 | Fix `logo.png` broken reference in schema | 5 min | Fixes structured data validation |
| 4 | Fix OG image to JPG/PNG format | 15 min | Fixes all social sharing |
| 5 | Complete Next.js migration (already planned) | High | Permanent fix for CSR architecture |

---

*Generated by Technical SEO Audit*
