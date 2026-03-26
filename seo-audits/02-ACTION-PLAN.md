# DMD Furnishing - SEO Action Plan

**Generated:** 2026-03-25
**Current Score:** 28/100
**Target Score:** 70+ /100

---

## CRITICAL (Fix Immediately - Blocks Indexing)

### 1. Implement Server-Side Rendering or Prerendering
**Impact:** +25-30 points | **Effort:** High
**Current:** Site returns empty HTML to all crawlers
**Fix Options (pick one):**

**Option A - Migrate to Next.js (Recommended, already planned)**
- Follow existing `NEXT_MIGRATION_PLAN.md`
- Use App Router with `generateMetadata()` for per-page SEO
- Use `generateStaticParams()` for product pages
- Benefits: SSR/SSG, automatic code splitting, image optimization

**Option B - Add prerendering to CRA (Quick interim fix)**
```bash
npm install react-snap
```
Add to `package.json`:
```json
"scripts": {
  "postbuild": "react-snap"
},
"reactSnap": {
  "source": "build",
  "minifyHtml": { "collapseWhitespace": false }
}
```

**Option C - Netlify Prerendering (Fastest, paid feature)**
- Enable "Prerendering" in Netlify site settings
- Uses prerender.io to serve cached HTML to bots
- No code changes needed

### 2. Fix WWW vs Non-WWW Domain Conflict
**Impact:** +5 points | **Effort:** Low
**Current:** Sitemap uses `www.dmdfurnishing.com`, canonicals use `dmdfurnishing.com`

**Fix:** Pick ONE canonical domain and redirect the other.

**If choosing non-www (matches current canonical URLs):**
1. Update `scripts/generate-sitemap.js:35`:
   ```js
   const baseUrl = 'https://dmdfurnishing.com';
   ```
2. Update `public/robots.txt`:
   ```
   Sitemap: https://dmdfurnishing.com/sitemap.xml
   ```
3. Add redirect in `netlify.toml`:
   ```toml
   [[redirects]]
   from = "https://www.dmdfurnishing.com/*"
   to = "https://dmdfurnishing.com/:splat"
   status = 301
   force = true
   ```

---

## HIGH (Fix Within 1 Week - Significant Ranking Impact)

### 3. Fix Schema Logo URL (References Non-Existent File)
**Impact:** +3 points | **Effort:** Trivial
**Current:** `SEO.js:12,34` and `Home.js:89` reference `/logo.png` — this file does NOT exist.
**Fix:** Update to actual logo path:
```js
// SEO.js
'logo': `${siteUrl}/DMD_Furnishing_Logo_Embedded.svg`,
'image': `${siteUrl}/DMD_Furnishing_Logo_Embedded.svg`,
```
**Better:** Create an optimized PNG version of the logo and reference that (SVG is 1.9 MB).

### 4. Optimize SVG Logo (1.9 MB)
**Impact:** +3 points | **Effort:** Medium
**Current:** `public/DMD_Furnishing_Logo_Embedded.svg` is 1,979,191 bytes (1.9 MB)
**Fix:**
- Run through SVGO to strip metadata/embedded data
- Create a PNG version at appropriate sizes (logo.png for schema, og-image.png at 1200x630 for social)
- Target: SVG < 50KB, PNG < 100KB

### 5. Fix Dual SEO System Conflict in Services.js
**Impact:** +2 points | **Effort:** Low
**Current:** `Services.js` uses BOTH systems simultaneously:
- Line 113: `setPageSEO({ title: 'Commercial Furniture Services | Custom Manufacturing...' })`
- Line 126: `<SEO title="Our Services - DMD Furnishing" description="(280+ chars)" />`
**Fix:** Remove the `setPageSEO()` call (lines 112-118) and keep only `<SEO>`. Also fix:
- Shorten description to <160 chars
- Change separator from `-` to `|` for consistency

### 6. Fix Duplicate H1 in ProjectDetail.js
**Impact:** +2 points | **Effort:** Trivial
**Current:** Two `<h1>` tags at lines 172 and 185
**Fix:** Change line 185 from `<h1>{project.name}</h1>` to `<h2>{project.name}</h2>`

### 7. Add SEO Component to Missing Pages
**Impact:** +5 points | **Effort:** Low

**ScheduleCall.js** - Add:
```jsx
import SEO from './SEO';
// Inside return, before first section:
<SEO
  title="Schedule a Free Consultation"
  description="Book a free 30-minute consultation with DMD Furnishing's hospitality furniture specialists. Discuss FF&E, custom furniture, timelines, and budgets."
  canonical="https://dmdfurnishing.com/schedule-call"
/>
```

**Inspirations.js** - Add:
```jsx
import SEO from './SEO';
<SEO
  title="Design Inspirations"
  description="Explore furniture design inspirations for hospitality projects. Wood veneers, upholstery details, casegoods craftsmanship, and custom finish options."
  canonical="https://dmdfurnishing.com/inspirations"
/>
```

**InspirationDetail.js** - Add dynamic SEO per inspiration.

### 8. Remove Duplicate SEO Component on Homepage
**Impact:** +2 points | **Effort:** Trivial
**File:** `src/components/Home.js:108-119`
**Fix:** Remove lines 108-113 (first `<SEO>` without `schema` prop). Keep lines 114-119.

### 9. Add Security Headers
**Impact:** +3 points | **Effort:** Low
**Create** `public/_headers`:
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### 10. Add Missing Pages to Sitemap
**Impact:** +3 points | **Effort:** Low
**File:** `scripts/generate-sitemap.js:104-109`

Add these static pages:
```js
urls.push(`${baseUrl}/about`);
urls.push(`${baseUrl}/services`);
urls.push(`${baseUrl}/contact`);
urls.push(`${baseUrl}/schedule-call`);
urls.push(`${baseUrl}/inspirations`);
urls.push(`${baseUrl}/website-policies`);
```

### 11. Add `<lastmod>` to Sitemap
**Impact:** +2 points | **Effort:** Medium
**File:** `scripts/generate-sitemap.js`
- Use file modification dates from XML source or git commit dates
- At minimum, add current build date as `<lastmod>` for all URLs

### 12. Fix Invalid Schema Type
**Impact:** +2 points | **Effort:** Trivial
**File:** `src/utils/seo.js:169`
**Fix:** Change `'@type': 'Project'` to `'@type': 'CreativeWork'`

---

## MEDIUM (Fix Within 1 Month - Optimization)

### 13. Add Image Lazy Loading
**Impact:** +3 points | **Effort:** Low
**Current:** Only 2 of 17+ `<img>` tags have `loading="lazy"`

Add `loading="lazy"` to all images EXCEPT:
- Hero/above-fold images (these should have `fetchpriority="high"`)
- LCP candidate images

**Files to update:**
- `Home.js` - Hero slider images should get `fetchpriority="high"`, all others `loading="lazy"`
- `Services.js` - Add `loading="lazy"`
- `ProjectDetail.js` - Add `loading="lazy"` to gallery images
- `ProductGallery.js` - Add `loading="lazy"`

### 14. Add Width/Height to Images
**Impact:** +3 points (CLS improvement) | **Effort:** Medium
Add explicit `width` and `height` attributes or use CSS `aspect-ratio` to prevent layout shifts.

### 15. Fix Footer Heading Hierarchy
**Impact:** +2 points | **Effort:** Low
**File:** `src/components/Footer.js:11,17,26,35`
**Fix:** Change `<h2>` to `<div className="footer-heading">` and `<h3>` to `<div className="footer-subheading">`. Apply same styles via CSS.

### 16. Add FAQPage Schema to Schedule Call
**Impact:** +3 points | **Effort:** Low
**File:** `src/components/ScheduleCall.js`
The page has 6 FAQ items (lines 122-148). Add JSON-LD:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the consultation free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

### 17. Fix OG Image Format
**Impact:** +2 points | **Effort:** Low
**File:** `public/index.html:18`
**Fix:** Create a 1200x630px PNG/JPG version of the logo and use that for OG image instead of SVG.

### 18. Add `rel="noopener noreferrer"` to External Links
**Impact:** +1 point | **Effort:** Trivial
**File:** `src/components/Footer.js:49-52`
Add `target="_blank" rel="noopener noreferrer"` to social media links.

### 19. Fix Empty Alt Text in Product Search
**Impact:** +1 point | **Effort:** Trivial
**File:** `src/components/ProductSearch.js:194`
**Fix:** Change `alt=""` to `alt={it.name || 'Product thumbnail'}`

### 20. Add `aria-label` to Background Image Divs
**Impact:** +2 points | **Effort:** Low
**Files:** `Products.js:426,463,498`, `ProductOverview.js:78`, `ProjectDetail.js:169`, `Projects.js:122`, `InspirationDetail.js:167`
**Fix:** Add `role="img"` and `aria-label` to divs using `backgroundImage`:
```jsx
<div
  className="category-image"
  style={{ backgroundImage: `url(...)` }}
  role="img"
  aria-label={`${item.name} furniture collection`}
></div>
```

### 21. Consolidate Duplicate Organization Schema
**Impact:** +1 point | **Effort:** Low
**Current:** Organization schema defined in both `SEO.js:7-28` and `Home.js:84-104` with slight differences.
**Fix:** Remove from `Home.js` and let `SEO.js` handle it globally.

### 22. Add `sameAs` to Organization Schema
**Impact:** +2 points | **Effort:** Trivial
**File:** `src/components/SEO.js`
Add to organizationSchema:
```js
'sameAs': [
  'https://facebook.com/dmdfurnishing',
  'https://instagram.com/dmdfurnishing',
  'https://linkedin.com/company/dmdfurnishing',
  'https://pinterest.com/dmdfurnishing'
]
```

---

## LOW (Backlog - Nice to Have)

### 23. Add Service Schema to Services Page
**Impact:** +2 points | **Effort:** Medium

### 24. Add WebSite Schema with SearchAction
**Impact:** +1 point | **Effort:** Low

### 25. Implement Image Optimization Pipeline
**Impact:** +5 points | **Effort:** High
- Convert images to WebP/AVIF
- Implement responsive images with `srcset`
- Use Netlify Image CDN or sharp-based build-time optimization
- Add `aspect-ratio` CSS to prevent CLS

### 26. Add Related Products Section
**Impact:** +3 points | **Effort:** Medium
Cross-link products within the same subcategory on product detail pages.

### 27. Add `llms.txt` for AI Crawler Guidance
**Impact:** +2 points | **Effort:** Low
Create `public/llms.txt` describing the site for AI crawlers.

### 28. Code Splitting
**Impact:** +3 points | **Effort:** Medium
Lazy-load routes with `React.lazy()` and `Suspense` to reduce initial bundle size.

### 29. Normalize Image Path Casing
**Impact:** +1 point | **Effort:** Low
**Current:** Mixed casing `/Images/` vs `/images/` (Home.js:79)
**Fix:** Standardize all paths to lowercase.

---

## Implementation Priority Matrix

```
                    HIGH IMPACT
                        |
     [1] SSR/Prerender  |  [2] WWW Fix
     [7] Missing SEO    |  [3] Fix logo.png
                        |  [5] Dual SEO fix
  HIGH EFFORT --------- + --------- LOW EFFORT
                        |
     [25] Image Pipeline|  [6] Dup H1 fix
     [28] Code Splitting|  [8] Dup SEO Home
                        |  [9] Security Headers
                    LOW IMPACT
```

## Projected Score After Fixes

| If you complete... | Projected Score |
|-------------------|----------------|
| Critical fixes only (1-2) | 50-55/100 |
| Critical + High (1-12) | 62-68/100 |
| Critical + High + Medium (1-22) | 75-82/100 |
| All fixes (1-29) | 85-90/100 |

---

*Report generated by Claude Code SEO Audit*
