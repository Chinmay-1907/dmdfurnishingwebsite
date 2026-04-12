# Google Data Audit -- dmdredesign.netlify.app
**Agent:** seo-google | **Date:** 2026-04-09 | **Status:** COMPLETE
**Data Sources:** PageSpeed Insights (Lighthouse 13.0.1 via pagespeed.web.dev), CrUX (unavailable -- see Data Availability Notes)

## Overall Score: 72/100

The overall score reflects the homepage mobile performance score, which is the most SEO-critical metric. Desktop performance is excellent (100/100), but mobile is severely impacted by LCP issues.

---

## PageSpeed Insights Summary (Homepage)

| Category | Mobile | Desktop |
|----------|--------|---------|
| Performance | **72** | **100** |
| Accessibility | **100** | **100** |
| Best Practices | **96** | **96** |
| SEO | **100** | **100** |

### Score Interpretation
- **Desktop:** Perfect across the board (100/100/96/100). No performance concerns.
- **Mobile:** Performance is the weak link at 72/100 (Needs Improvement range). All other categories are excellent.

---

## Core Web Vitals (Lab Data Only -- No Field Data Available)

### Homepage

| Metric | Mobile (Lab) | Desktop (Lab) | Threshold | Status |
|--------|-------------|---------------|-----------|--------|
| **LCP** (Largest Contentful Paint) | **11.0 s** | **0.5 s** | <=2.5s Good | POOR (mobile) / GOOD (desktop) |
| **TBT** (Total Blocking Time, proxy for INP) | **50 ms** | **10 ms** | <=200ms Good | GOOD / GOOD |
| **CLS** (Cumulative Layout Shift) | **0** | **0.003** | <=0.1 Good | GOOD / GOOD |
| **FCP** (First Contentful Paint) | **1.2 s** | **0.3 s** | <=1.8s Good | GOOD / GOOD |
| **Speed Index** | **4.4 s** | **0.8 s** | <=3.4s Good | POOR (mobile) / GOOD (desktop) |

### LCP Element Identified (Homepage Mobile)
- **Element:** `<h1>` containing "Designed. Manufactured. Delivered."
- **LCP Breakdown:**
  - Time to First Byte: 0 ms
  - Element Render Delay: **2,290 ms** (the primary bottleneck)
- **Root Cause:** The LCP element is text-based but render is blocked by CSS and JavaScript. The 2,290ms render delay indicates render-blocking resources are preventing the hero text from painting quickly.

---

## Page-by-Page PSI Scores (Mobile)

| Page | Perf | A11y | BP | SEO | LCP | FCP | TBT | CLS | SI | Key Issue |
|------|------|------|----|-----|-----|-----|-----|-----|-----|-----------|
| **Homepage** `/` | 72 | 100 | 96 | 100 | 11.0s | 1.2s | 50ms | 0 | 4.4s | LCP 11s -- render-blocking CSS, image delivery |
| **Products** `/products` | 69 | 95 | 100 | 100 | 10.5s | 1.6s | 50ms | 0 | 6.1s | LCP 10.5s -- render blocking, DOM size, LCP discovery |
| **Blog** `/blog` | 99 | 95 | 100 | 100 | 2.0s | 0.9s | 10ms | 0 | 1.7s | Minor: render-blocking requests |
| **Contact** `/contact` | 73 | 98 | 100 | 100 | 12.0s | 1.2s | 50ms | 0 | 4.0s | LCP 12s -- image delivery (274 KiB savings) |
| **Services** `/services` | 73 | 100 | 100 | 100 | 10.0s | 1.2s | 40ms | 0 | 4.0s | LCP 10s -- render blocking, image delivery, DOM size |

### Page-by-Page Summary
- **Blog** is the only page with Good mobile performance (99/100, LCP 2.0s)
- **All other pages** have Poor LCP (10-12 seconds on mobile), dragging performance into the 69-73 range
- **CLS is perfect** across all pages (0)
- **TBT/interactivity is good** across all pages (10-50ms)
- **SEO scores are perfect** (100) across all pages
- **Accessibility** ranges from 95-100, generally excellent

---

## Key Opportunities

### From PSI Diagnostics -- Specific and Actionable

#### 1. Render-Blocking Requests (ALL pages, est. savings 100-450ms)
- **Homepage:** 2 CSS files blocking render for 600ms total
  - `cd450...eae.css` (4.4 KiB, 450ms block)
  - `098e84a8b419a0c7.css` (6.5 KiB, 150ms block)
- **Fix:** Inline critical CSS, defer non-critical stylesheets, or use `media` attributes

#### 2. Image Delivery Optimization (Homepage, Contact, Services)
- **Homepage:** Est. savings of 309 KiB across ~8 images
  - Images served larger than displayed dimensions (e.g., 750x421 served for 378x218 display)
  - Image compression can be increased (currently using q=75)
  - Key offenders: Project images (Quality Inn, Towne Lyne Motel), hero images, category images
- **Contact:** Est. savings of 274 KiB
- **Services:** Est. savings of 53 KiB
- **Fix:** Use responsive `srcset` with tighter breakpoints, increase compression (q=60-65), serve WebP/AVIF

#### 3. LCP Request Discovery (Products, Contact, Services)
- LCP resource is not discoverable early enough in the HTML
- **Fix:** Add `<link rel="preload">` for the LCP image/resource, ensure it is in the initial HTML

#### 4. Legacy JavaScript (ALL pages, est. savings 11 KiB)
- `chunks/1255-e20022f908dd06d9.js` contains unnecessary polyfills:
  - `Array.prototype.at`
  - `Array.prototype.flat` / `flatMap`
  - `Object.fromEntries`
  - `Object.hasOwn`
  - `String.prototype.trimStart` / `trimEnd`
- **Fix:** Update Next.js `browserslist` config to target modern browsers only, eliminating these polyfills

#### 5. DOM Size Optimization (Products, Services)
- Homepage: 370 total elements (acceptable)
- Products/Services pages flagged for DOM optimization
- Max DOM depth: 11 (acceptable)
- Most children on single element: 33 (body.dark-mode)
- **Fix:** Virtualize long product lists, lazy-render below-fold content

#### 6. Long Main-Thread Tasks (ALL pages)
- Homepage: 2 long tasks (91ms at 9,171ms, 72ms at 986ms)
- Products: 4 long tasks
- Blog/Contact/Services: 2 long tasks each
- **Fix:** Code-split JavaScript, defer non-critical scripts, break up large JS bundles

---

## Issues Found

### Critical
1. **Mobile LCP is POOR on 4 of 5 pages** (10-12 seconds vs. 2.5s threshold)
   - This directly impacts Core Web Vitals assessment by Google
   - Only `/blog` passes the LCP threshold (2.0s)
   - Primary cause: render-blocking CSS + LCP element render delay (2,290ms on homepage)

### High
2. **Render-blocking CSS on ALL pages** (400-450ms savings available)
   - Two CSS files block rendering on every page load
   - Combined 11 KiB of CSS blocks for up to 600ms
3. **Images served oversized** (309 KiB savings on homepage alone)
   - Images are larger than their display dimensions
   - Compression could be increased from q=75 to q=60-65
4. **No CrUX field data available** -- Google cannot assess real-world CWV
   - Site lacks sufficient real-user traffic for Chrome UX Report
   - This means the site has no "page experience" signal in Google Search

### Medium
5. **Images with incorrect aspect ratio** (Best Practices flag, desktop + mobile)
   - Causing the Best Practices score to drop to 96
6. **Missing Content Security Policy** (Best Practices -- Trust and Safety)
   - No CSP header to protect against XSS
7. **Missing Cross-Origin Opener Policy** (Best Practices -- Trust and Safety)
   - No COOP header for origin isolation
8. **Legacy JavaScript polyfills** (11 KiB wasted on all pages)
9. **Accessibility: contrast issues** on Products and Blog pages (score: 95)
   - Products: insufficient contrast ratio on some elements
   - Blog: links rely on color alone to be distinguishable

### Low
10. **Missing main landmark** on Blog and Contact pages (A11y)
11. **Heading order not sequential** on Products page (A11y)
12. **ARIA role misuse** on Contact page (A11y)
13. **No Trusted Types policy** (Best Practices -- Trust and Safety)
14. **Structured data validity** needs manual verification (SEO)

---

## Data Availability Notes

### What Was Available
- **PageSpeed Insights (Lighthouse):** Full lab data for all 5 pages, both mobile and desktop strategies
- **Lighthouse Version:** 13.0.1
- **Emulated Devices:** Moto G Power (mobile), Desktop
- **Throttling:** Slow 4G (mobile), Custom (desktop)
- **Browser:** HeadlessChromium 146.0.7680.153

### What Was NOT Available
- **CrUX (Chrome UX Report) Field Data:** "No Data" shown for all pages
  - The CrUX API returned `PERMISSION_DENIED` (requires API key)
  - The PSI embedded CrUX showed "No Data" -- confirming insufficient real-user traffic
  - Neither `dmdredesign.netlify.app` nor `dmdfurnishing.com` have CrUX data
  - **Implication:** Google Search has no real-world page experience data for this site. The site needs more organic traffic before field data will be collected.
- **Google Search Console:** Not accessible (requires authenticated access)
- **Google Analytics:** Not accessible (requires authenticated access)
- **Google API scripts:** No scripts found at `~/.claude/skills/seo/scripts/`

### CrUX Data Threshold
Chrome UX Report requires a minimum threshold of real-user visits (typically at least a few hundred unique origins per month) before data is collected. The absence of CrUX data indicates the site is below this threshold, which is expected for a staging/preview URL on Netlify.

---

## Recommendations Priority Matrix

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| P0 | Fix render-blocking CSS (inline critical CSS, defer rest) | LCP improvement 400-600ms | Medium |
| P0 | Add `<link rel="preload">` for LCP resources | LCP improvement significant | Low |
| P0 | Optimize image sizes and compression | LCP improvement, bandwidth savings ~600+ KiB | Medium |
| P1 | Remove legacy JavaScript polyfills | 11 KiB savings per page, faster TBT | Low |
| P1 | Add CSP and COOP security headers | Best Practices score improvement | Low |
| P1 | Fix image aspect ratios | Best Practices score to 100 | Low |
| P2 | Fix accessibility contrast issues | A11y score to 100 on all pages | Low |
| P2 | Add main landmark to Blog/Contact | A11y improvement | Low |
| P2 | Code-split large JS chunks | Reduce long main-thread tasks | Medium |
| P3 | Redirect production domain to accumulate CrUX data | Enable field data collection | Low |
