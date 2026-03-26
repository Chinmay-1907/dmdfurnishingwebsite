# Homepage Deep Dive - DMD Furnishing

**URL:** https://dmdfurnishing.com/
**Component:** `src/components/Home.js`
**Date:** 2026-03-25

---

## Page Score Card

```
Overall Score:   34/100

On-Page SEO:     40/100  ████░░░░░░
Content Quality: 55/100  ██████░░░░
Technical:       20/100  ██░░░░░░░░
Schema:          25/100  ███░░░░░░░
Images:          18/100  ██░░░░░░░░
```

---

## 1. On-Page SEO (40/100)

### Title Tag
**Current (JS-rendered):** `Custom Hospitality Furniture & FF&E Solutions | DMD Furnishing`
**Static HTML fallback:** `DMD Furnishing`
**Character count:** 60 (JS) / 15 (static)

| Check | Status | Notes |
|-------|--------|-------|
| Length 50-60 chars | PASS (JS) / FAIL (static) | Static title is generic |
| Primary keyword included | PASS | "Hospitality Furniture", "FF&E" |
| Brand name included | PASS | "DMD Furnishing" appended by SEO component |
| Unique to this page | FAIL | Static title same for ALL pages |

**Issue:** Two `<SEO>` components rendered (lines 108-113 and 114-119) — both set the same title, but the second one overwrites the first's meta tags and adds schema. Wasteful and confusing.

### Meta Description
**Current (JS-rendered):** `Custom furniture solutions for hotels, restaurants, offices, and institutional spaces. Designed, manufactured, and installed with precision.`
**Static HTML fallback:** `DMD Furnishing specializes in high-quality, custom-manufactured furniture for commercial spaces-including hotels, restaurants, and multi-family residences. Explore our FF&E project solutions.`
**Character count:** 157 (JS) / 196 (static — too long)

| Check | Status | Notes |
|-------|--------|-------|
| Length 150-160 chars | PASS (JS) / FAIL (static) | Static is 196 chars |
| Compelling / action-oriented | PARTIAL | Descriptive but no CTA or differentiator |
| Includes primary keyword | PASS | "furniture", "hotels", "restaurants" |

**Recommended improvement:**
> `Custom hospitality furniture designed, manufactured & installed by DMD Furnishing. End-to-end FF&E solutions for hotels, restaurants & offices. Free consultation.` (162 chars)

### H1 Tag
**Text:** `Custom Hospitality Furniture. Designed. Manufactured. Delivered.`
**Character count:** 63

| Check | Status | Notes |
|-------|--------|-------|
| Exactly one H1 | PASS | Single H1 on homepage |
| Includes primary keyword | PASS | "Hospitality Furniture" |
| Matches page intent | PASS | Clear value proposition |
| Unique vs other pages | PASS | Unique to homepage |

### Heading Hierarchy
```
H1: Custom Hospitality Furniture. Designed. Manufactured. Delivered.
  H2: Who We Serve
    H3: Hotels & Motels
    H3: Restaurants & Cafes
    H3: Corporate Offices & Workspaces
    H3: Franchise Renovation Projects
    H3: Universities & Educational Facilities
    H3: Healthcare & Institutional Environments
  H2: What Sets DMD Furnishing Apart
    H3: End-to-End Management
    H3: Hospitality-Focused Expertise
    H3: Custom & Value-Engineered Solutions
    H3: Flexible Manufacturing Options
    H3: Reliable Execution
  H2: Our Capabilities
  H2: A Clear, Proven Process              <-- uses H4 for steps (skips H3!)
    H4: Consultation & Scope Review
    H4: Design, BOQ & Material Finalization
    H4: Manufacturing & Quality Assurance
    H4: Delivery, Installation & Close-Out
  H2: Selected Projects
  H2: Built with Quality Materials
  H2: Let's Discuss Your Project
```

| Check | Status | Notes |
|-------|--------|-------|
| No skipped levels | FAIL | H2 -> H4 in Process section (skips H3) |
| Descriptive headings | PASS | All headings are descriptive |
| Logical flow | PASS | Good narrative structure |

**Fix:** Change `<h4>` tags in Process section (lines 263, 268, 273, 278) to `<h3>`.

### URL
**Canonical (JS):** `https://dmdfurnishing.com/`
**Canonical (static):** Not set in HTML

| Check | Status |
|-------|--------|
| Short and descriptive | PASS (homepage root) |
| No parameters | PASS |
| HTTPS | PASS |
| Trailing slash consistent | PASS |

### Internal Links (from Homepage)

| Link Target | Anchor Text | Count | Quality |
|-------------|-------------|-------|---------|
| `/schedule-call` | "Schedule a Call" | 2 | Good CTA |
| `/contact` | "Request a Quote" | 2 | Good CTA |
| `/products/hotels-motels` | (icon + "Hotels & Motels") | 2 | Good — but duplicated! |
| `/products/restaurants-cafes` | (icon + "Restaurants & Cafes") | 1 | Good |
| `/products/office-corporate-spaces` | (icon + "Corporate Offices") | 1 | Good |
| `/products/educational-facilities` | (icon + "Universities & Educational") | 1 | Good |
| `/products/healthcare-care-facilities` | (icon + "Healthcare & Institutional") | 1 | Good |
| `/services` | "Explore Our Capabilities" | 1 | Good |
| `/projects` | "View All Projects" | 1 | Good |

**Issues found:**
1. **"Franchise Renovation Projects" (line 173) links to `/products/hotels-motels`** — same URL as "Hotels & Motels" (line 161). This is a misleading link — Franchise Renovations should have its own destination or link to a filtered view.
2. **No link to `/about`** from homepage body content
3. **No link to `/inspirations`** from homepage body content
4. **Project cards (lines 292-303) are not clickable** — they're static images with captions, no `<Link>` wrapper. Should link to actual project detail pages.

### External Links
None from homepage body content. Social links are in the Footer (separate component).

---

## 2. Content Quality (55/100)

### Word Count
**Estimated visible text:** ~400 words (excluding navigation/footer)
**Minimum for homepage:** 300-500 words
**Status:** PASS (borderline — more substantive content would help)

### Keyword Analysis

| Keyword / Phrase | Occurrences | Density | Assessment |
|-----------------|-------------|---------|------------|
| furniture | 7 | ~1.8% | Good |
| hospitality | 4 | ~1.0% | Good |
| custom | 3 | ~0.8% | Good |
| FF&E | 2 | ~0.5% | Good (industry term) |
| hotel/hotels | 3 | ~0.8% | Good |
| restaurant | 2 | ~0.5% | Good |
| manufacturing | 3 | ~0.8% | Good |
| commercial | 2 | ~0.5% | Good |
| design/designed | 3 | ~0.8% | Good |
| installation | 2 | ~0.5% | Good |

**Assessment:** Natural keyword usage. No stuffing. Good semantic coverage of primary and secondary keywords.

### Missing Keywords (Opportunities)
- "furniture manufacturer" (not used as a phrase)
- "casegoods" (only in capabilities list)
- "Foxboro MA" / "Massachusetts" (only in hero support text)
- "renovation" (only in one card title)
- "project management" (implied but not stated)

### E-E-A-T Signals on Homepage

| Signal | Present? | Details |
|--------|----------|---------|
| First-hand experience | PARTIAL | Shows projects but no details/metrics |
| Industry expertise | PASS | Correct terminology (FF&E, BOQ, HPL, casegoods) |
| Authority signals | FAIL | No certifications, awards, client logos |
| Trust signals | PARTIAL | Address/phone present, no reviews/BBB |
| Author/company bio | FAIL | No founder info, no "years in business" |
| Social proof | FAIL | Project images but no client names or testimonials |
| Quantifiable claims | FAIL | No numbers (rooms furnished, projects completed, etc.) |

### Content Freshness
- No publication date
- No "last updated" date
- No dynamic content (blog feed, news, recent projects)

---

## 3. Technical Elements (20/100)

### What Crawlers Actually See (Static HTML)

```html
<title>DMD Furnishing</title>
<meta name="description" content="DMD Furnishing specializes in high-quality, custom-manufactured furniture..." />
<meta property="og:title" content="DMD Furnishing" />
<meta property="og:description" content="Explore guest room, lobby, office, and restaurant furniture collections." />
<meta property="og:image" content="%PUBLIC_URL%/DMD_Furnishing_Logo_Embedded.svg" />
<meta name="twitter:card" content="summary_large_image" />
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
```

**Everything else is JS-only.** No heading content, no internal links, no schema, no images visible.

### Canonical Tag
| Check | Status | Notes |
|-------|--------|-------|
| Present in static HTML | FAIL | Intentionally omitted (comment on line 23) |
| Set via JS | PASS | SEO component sets `https://dmdfurnishing.com/` |
| Self-referencing | PASS (JS only) | |
| Correct domain | PARTIAL | Uses non-www but sitemap uses www |

### Meta Robots
| Check | Status |
|-------|--------|
| No noindex | PASS |
| No nofollow | PASS |
| Defaults to index,follow | PASS |

### Open Graph Tags (Static HTML)

| Tag | Value | Status |
|-----|-------|--------|
| `og:site_name` | "DMD Furnishing" | PASS |
| `og:type` | "website" | PASS |
| `og:title` | "DMD Furnishing" | FAIL — generic, not page-specific |
| `og:description` | "Explore guest room, lobby, office, and restaurant furniture collections." | PARTIAL — different from meta description |
| `og:image` | SVG logo | FAIL — SVG unsupported by Facebook/LinkedIn/Twitter |
| `og:url` | Not set in static | FAIL |

### Open Graph Tags (JS-Rendered)

| Tag | Value | Status |
|-----|-------|--------|
| `og:type` | "website" | PASS |
| `og:title` | "Custom Hospitality Furniture & FF&E Solutions \| DMD Furnishing" | PASS |
| `og:description` | Same as meta description | PASS |
| `og:url` | `https://dmdfurnishing.com/` | PASS |
| `og:image` | Not explicitly set (no `image` prop on SEO) | FAIL — falls back to SVG logo |

**Critical issue:** Neither SEO component call passes an `image` prop (lines 108-119). The homepage has beautiful hero images but the social share image is a generic SVG logo.

### Twitter Card Tags

| Tag | Static HTML | JS-Rendered |
|-----|-------------|-------------|
| `twitter:card` | "summary_large_image" | "summary" (no image passed) |
| `twitter:title` | "DMD Furnishing" | Full title |
| `twitter:description` | Generic | Page description |
| `twitter:image` | SVG logo | SVG logo fallback |

---

## 4. Schema Markup (25/100)

### Currently Implemented (JS-Only)

**1. Organization Schema** (from `Home.js:84-104`, passed via `<SEO schema={orgSchema}>`)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DMD Furnishing",
  "url": "https://dmdfurnishing.com",
  "logo": "https://dmdfurnishing.com/logo.png",  // 404 - FILE DOES NOT EXIST
  "contactPoint": { ... },
  "address": { ... }
}
```

**2. Organization + LocalBusiness** (from `SEO.js`, injected on every page including homepage)
- Also references `logo.png` (404)
- Creates **3 total schema blocks** on homepage (Organization x2 + LocalBusiness)

### Issues
| Issue | Severity |
|-------|----------|
| `logo.png` does not exist (404) | Critical |
| Duplicate Organization schema (Home.js + SEO.js) | High |
| All schema JS-only (invisible to crawlers) | Critical |
| Missing `@id` for entity disambiguation | High |
| Missing `sameAs` (social profiles) | High |
| No WebSite schema | Medium |
| No WebPage schema for homepage | Medium |

### Missing Schema Opportunities (Homepage-Specific)

**WebPage Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://dmdfurnishing.com/#webpage",
  "url": "https://dmdfurnishing.com/",
  "name": "Custom Hospitality Furniture & FF&E Solutions | DMD Furnishing",
  "description": "Custom furniture solutions for hotels, restaurants, offices, and institutional spaces.",
  "isPartOf": { "@id": "https://dmdfurnishing.com/#website" },
  "about": { "@id": "https://dmdfurnishing.com/#organization" },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://dmdfurnishing.com/Images/Tailored_Guestroom_Collections.jpg"
  }
}
```

**ItemList Schema for "Who We Serve" section:**
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Markets Served by DMD Furnishing",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Hotels & Motels", "url": "https://dmdfurnishing.com/products/hotels-motels" },
    { "@type": "ListItem", "position": 2, "name": "Restaurants & Cafes", "url": "https://dmdfurnishing.com/products/restaurants-cafes" },
    { "@type": "ListItem", "position": 3, "name": "Corporate Offices", "url": "https://dmdfurnishing.com/products/office-corporate-spaces" },
    { "@type": "ListItem", "position": 4, "name": "Educational Facilities", "url": "https://dmdfurnishing.com/products/educational-facilities" },
    { "@type": "ListItem", "position": 5, "name": "Healthcare Facilities", "url": "https://dmdfurnishing.com/products/healthcare-care-facilities" }
  ]
}
```

---

## 5. Images (18/100)

### Image Inventory

| # | File:Line | src | Alt Text | Size | loading | w/h | fetchpriority | Status |
|---|-----------|-----|----------|------|---------|-----|---------------|--------|
| 1 | `Home.js:126` (hero) | `/Images/Tailored_Guestroom_Collections.jpg` | "Tailored hotel guestroom furniture collection" | 362 KB | MISSING | MISSING | MISSING | LCP candidate |
| 2 | `Home.js:126` (hero) | `/Images/Elevated_Restaurant_Seating.jpg` | "Elevated restaurant seating and dining furniture" | 623 KB | MISSING | MISSING | N/A | >500KB CRITICAL |
| 3 | `Home.js:126` (hero) | `/Images/Modern_Social_Lounges.jpg` | "Modern social lounge furniture for hotels" | 499 KB | MISSING | MISSING | N/A | ~500KB WARNING |
| 4 | `Home.js:126` (hero) | `/images/Outdoor.jpg` | "Durable outdoor hospitality furniture" | 601 KB | MISSING | MISSING | N/A | >500KB CRITICAL + WRONG PATH |
| 5 | `Home.js:250` | `/Images/Our Services.jpg` | "DMD Capabilities" | 458 KB | MISSING | MISSING | N/A | Generic alt, space in filename |
| 6 | `Home.js:293` | `/Images/Tailored_Guestroom_Collections.jpg` | "Luxury Hotel Guestroom" | (same as #1) | MISSING | MISSING | N/A | Image reused |
| 7 | `Home.js:297` | `/Images/Elevated_Restaurant_Seating.jpg` | "Fine Dining Restaurant" | (same as #2) | MISSING | MISSING | N/A | Image reused |
| 8 | `Home.js:301` | `/Images/Modern_Social_Lounges.jpg` | "Corporate Lounge" | (same as #3) | MISSING | MISSING | N/A | Image reused |
| 9 | `Home.js:317` | `/Images/About_DMD_Furnishing_Page.jpg` | "DMD Furnishing premium materials and craftsmanship" | 362 KB | MISSING | MISSING | N/A | Good alt |
| 10 | `Header.js:58` | `/DMD_Furnishing_Logo_Embedded.svg` | "DMD Furnishing Logo" | 1,979 KB | MISSING | MISSING | N/A | 1.9MB CRITICAL |

### Critical Image Issues

**1. Two separate image directories exist on disk:**
```
public/Images/   (uppercase — most images here)
public/images/   (lowercase — Outdoor.jpg is here)
```
`Home.js:79` references `/images/Outdoor.jpg` (lowercase). On case-sensitive Linux hosts (Netlify), this works only because the file is literally in a different directory. This is fragile and confusing.

**2. Total homepage image weight: ~4.9 MB**
| Component | Total Size |
|-----------|-----------|
| Hero images (4) | 2,085 KB |
| Section images (2) | 820 KB |
| Project images (3, reused) | 0 KB (cached) |
| Logo SVG | 1,979 KB |
| **Total** | **~4,884 KB** |

A well-optimized homepage should target <1 MB total image weight.

**3. No image is optimized for the web:**
- No WebP/AVIF formats
- No `srcset`/`sizes` for responsive delivery
- No `loading="lazy"` on any homepage image
- No `width`/`height` on any homepage image
- No `fetchpriority="high"` on LCP hero image
- Space in filename: `Our Services.jpg` (may cause URL encoding issues)

### Alt Text Quality

| Image | Alt Text | Quality |
|-------|----------|---------|
| Hero 1 | "Tailored hotel guestroom furniture collection" | GOOD - descriptive, keyword-rich |
| Hero 2 | "Elevated restaurant seating and dining furniture" | GOOD |
| Hero 3 | "Modern social lounge furniture for hotels" | GOOD |
| Hero 4 | "Durable outdoor hospitality furniture" | GOOD |
| Services | "DMD Capabilities" | POOR - generic, not descriptive |
| Project 1 | "Luxury Hotel Guestroom" | OKAY - could be more specific |
| Project 2 | "Fine Dining Restaurant" | OKAY |
| Project 3 | "Corporate Lounge" | OKAY |
| Materials | "DMD Furnishing premium materials and craftsmanship" | GOOD |
| Logo | "DMD Furnishing Logo" | GOOD |

**Fix for Services image alt:** Change `"DMD Capabilities"` to `"Custom casegood manufacturing and furniture assembly at DMD Furnishing"` or similar descriptive text.

---

## 6. Core Web Vitals Assessment

### LCP (Largest Contentful Paint) — HIGH RISK
- **LCP candidate:** First hero slider image (`Tailored_Guestroom_Collections.jpg`, 362 KB)
- **Problem:** Image is rendered by React inside a Slider component inside a `useEffect` hydration
- **Load sequence:** HTML shell -> JS bundle -> React hydrate -> Slider init -> image starts loading
- **No `<link rel="preload">` in `index.html` for this image**
- **No `fetchpriority="high"` attribute**
- **Estimated LCP:** 3-5 seconds on 4G connection
- **Target:** <2.5 seconds

### CLS (Cumulative Layout Shift) — HIGH RISK
- **0 of 10 images** have `width`/`height` attributes
- Hero slider has no reserved height before JS loads
- Navigation collapses on scroll (height change from `--header-height` to `--header-height-compact`)
- AOS animations shift content into view (though `once: true` mitigates repeat shifts)
- **Estimated CLS:** 0.15-0.25 (poor — target is <0.1)

### INP (Interaction to Next Paint) — MEDIUM RISK
- Slider arrow clicks trigger state change + re-render
- AOS scroll listener adds overhead
- No code splitting — full app bundle loads on homepage
- **Estimated INP:** 100-200ms (needs improvement — target is <200ms)

---

## 7. Homepage-Specific Issues Summary

### Critical (Fix Immediately)

| # | Issue | Line | Fix |
|---|-------|------|-----|
| 1 | **Duplicate `<SEO>` component** — renders twice | 108-119 | Remove lines 108-113, keep 114-119 |
| 2 | **`logo.png` doesn't exist** in Organization schema | 89 | Change to actual logo path |
| 3 | **No OG image passed** to SEO component | 108-119 | Add `image="/Images/Tailored_Guestroom_Collections.jpg"` |
| 4 | **SVG logo is 1.9 MB** — loaded on every page | Header.js:58 | Optimize with SVGO, target <50 KB |
| 5 | **Two image directories** (`/Images/` + `/images/`) | 79 | Consolidate to single directory |

### High (Fix Within 1 Week)

| # | Issue | Line | Fix |
|---|-------|------|-----|
| 6 | **4.9 MB total image weight** | All images | Compress, convert to WebP, add srcset |
| 7 | **No `loading="lazy"`** on below-fold images | 250, 293-301, 317 | Add `loading="lazy"` |
| 8 | **No `fetchpriority="high"`** on LCP image | 126 | Add to first hero image |
| 9 | **No `width`/`height`** on any image | All images | Add dimensions to prevent CLS |
| 10 | **H2 -> H4 heading skip** in Process section | 263, 268, 273, 278 | Change `<h4>` to `<h3>` |
| 11 | **"Franchise Renovation" links to wrong URL** | 173 | Should not duplicate hotels-motels link |
| 12 | **Project cards not clickable** | 292-303 | Wrap in `<Link>` to project detail pages |

### Medium (Fix Within 1 Month)

| # | Issue | Line | Fix |
|---|-------|------|-----|
| 13 | **Generic alt text** "DMD Capabilities" | 250 | Write descriptive alt |
| 14 | **Space in image filename** `Our Services.jpg` | 250 | Rename to `Our-Services.jpg` |
| 15 | **No social proof** on homepage | N/A | Add client logos, testimonials, or stats |
| 16 | **No quantifiable claims** | N/A | Add "X+ rooms furnished", "Y years experience" |
| 17 | **Static meta description too long** (196 chars) | index.html:12 | Shorten to <160 chars |
| 18 | **No WebPage schema** for homepage | N/A | Add JSON-LD (code provided above) |
| 19 | **Duplicate Organization schema** (Home.js vs SEO.js) | 84-104 | Remove from Home.js, let SEO.js handle globally |
| 20 | **No `<link rel="preload">` for LCP image** | index.html | Add preload hint in `<head>` |

### Low (Nice to Have)

| # | Issue | Line | Fix |
|---|-------|------|-----|
| 21 | Add ItemList schema for "Who We Serve" | N/A | Code provided above |
| 22 | Add publication/update date to page | N/A | Content freshness signal |
| 23 | Link to `/about` from homepage body | N/A | Internal link equity |
| 24 | Link to `/inspirations` from homepage body | N/A | Internal link equity |

---

## Recommended Title & Meta for Homepage

**Title (60 chars):**
```
Custom Hospitality Furniture & FF&E Solutions | DMD Furnishing
```
*Current title is already good — keep it.*

**Meta Description (162 chars):**
```
Custom hospitality furniture designed, manufactured & installed by DMD Furnishing. End-to-end FF&E solutions for hotels, restaurants & offices. Free consultation.
```

**OG Image:**
Use the first hero image instead of SVG logo:
```jsx
<SEO
  title="Custom Hospitality Furniture & FF&E Solutions"
  description={pageDescription}
  canonical="https://dmdfurnishing.com/"
  schema={orgSchema}
  image="/Images/Tailored_Guestroom_Collections.jpg"
/>
```

---

*Generated by Single Page SEO Analysis*
