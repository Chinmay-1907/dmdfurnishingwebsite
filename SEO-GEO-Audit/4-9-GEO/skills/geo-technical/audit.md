# GEO Technical Infrastructure Audit

**Site:** https://dmdredesign.netlify.app  
**Date:** 2026-04-09  
**Auditor:** geo-technical agent  
**Stack:** Next.js 15 on Netlify  

---

## Technical Score: 88/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Server-Side Rendering | 25% | 23/25 | 23 |
| Crawlability | 15% | 15/15 | 15 |
| Meta Tags & Indexability | 15% | 12/15 | 12 |
| Core Web Vitals | 10% | 6/10 | 6 |
| Mobile Optimization | 10% | 9/10 | 9 |
| Security Headers | 10% | 10/10 | 10 |
| URL Structure | 5% | 4/5 | 4 |
| Response Headers | 5% | 5/5 | 5 |
| Additional Checks (GEO) | 5% | 4/5 | 4 |
| **TOTAL** | **100%** | | **88/100** |

---

## 1. Server-Side Rendering (23/25) -- LOW RISK

### Verdict: SSR is FULLY OPERATIONAL. AI crawlers receive complete content.

**Evidence:**

| Check | Result |
|-------|--------|
| `X-Powered-By` header | `Next.js` |
| `X-Nextjs-Prerender` header | `1, 1` (static pre-render confirmed) |
| HTML body content | 99,706 bytes of fully rendered HTML |
| `<h1>` in source | `Designed. Manufactured. Delivered.` (server-rendered) |
| `<h2>` tags in source | 6 section headings, all server-rendered |
| `<p>` content in source | Full paragraphs, CTAs, card text -- all in raw HTML |
| `__NEXT_DATA__` script | Not present (using App Router RSC, not Pages Router) |
| JSON-LD schemas in source | 4 schemas server-rendered in `<head>` |
| Products page HTML size | 762,125 bytes (SSR confirmed) |
| Blog post HTML size | 66,856 bytes with `<h1>` in source (SSR confirmed) |
| About page HTML size | 79,897 bytes (SSR confirmed) |

**Deduction (-2):** Homepage H1 ("Designed. Manufactured. Delivered.") is brand-creative, not keyword-rich. AI crawlers parse H1 as the primary content signal. A keyword-bearing H1 (e.g., "Custom Hospitality Furniture & FF&E Solutions") would be more informative for AI extraction. This is a content-strategy issue, not a rendering issue.

**Trust bar stats render as `0+`** for Rooms Renovated, Completed Projects, and Products. These appear to be animated counters that require JavaScript to display final values. AI crawlers will see "0+" instead of actual numbers. This is a minor SSR gap.

---

## 2. Crawlability (15/15) -- NO ISSUES

### robots.txt

| Crawler | Directive | Status |
|---------|-----------|--------|
| GPTBot | `Allow: /` | PASS |
| OAI-SearchBot | `Allow: /` | PASS |
| ChatGPT-User | `Allow: /` | PASS |
| ClaudeBot | `Allow: /` | PASS |
| PerplexityBot | `Allow: /` | PASS |
| Google-Extended | `Allow: /` | PASS |
| CCBot | `Allow: /` | PASS |
| anthropic-ai | `Allow: /` | PASS |
| cohere-ai | `Allow: /` | PASS |
| Default (`*`) | `Disallow:` (empty = allow all) | PASS |

**Sitemap reference:** `Sitemap: https://dmdfurnishing.com/sitemap.xml` -- correctly declared.

### AI Crawler Content Parity Test

All three Tier 1 AI crawlers receive identical content to standard browsers:

| Crawler User-Agent | Response Size | `DMD Furnishing` present | Parity |
|--------------------|---------------|--------------------------|--------|
| GPTBot/1.0 | 99,706 bytes | Yes | IDENTICAL |
| ClaudeBot/1.0 | 99,706 bytes | Yes | IDENTICAL |
| PerplexityBot | 99,706 bytes | Yes | IDENTICAL |
| Standard browser | 99,706 bytes | Yes | BASELINE |

**No cloaking or differential serving detected.** All crawlers get the exact same pre-rendered HTML.

---

## 3. Meta Tags & Indexability (12/15)

### Homepage Meta Tags

| Tag | Value | Assessment |
|-----|-------|------------|
| `<title>` | `Custom Hospitality Furniture & FF&E Solutions` | 45 chars -- PASS (optimal: 50-60, but acceptable) |
| `<meta name="description">` | `Custom hospitality furniture and FF&E solutions for hotels, restaurants, offices, and institutional spaces. Based in Foxboro, MA -- designed, manufactured, and installed nationwide by DMD Furnishing.` | 200 chars -- FAIL (over 160 char limit; will be truncated in SERPs) |
| `<link rel="canonical">` | `https://dmdfurnishing.com` | PASS |
| `<meta name="viewport">` | `width=device-width, initial-scale=1` | PASS |
| `<meta name="theme-color">` | `#000000` | PASS |
| `<meta name="robots">` | Not present | NEUTRAL (defaults to index,follow) |
| `X-Robots-Tag` header | Not present | NEUTRAL (no restrictions) |

### Open Graph Tags

| Tag | Value | Status |
|-----|-------|--------|
| `og:title` | `Custom Hospitality Furniture & FF&E Solutions | DMD Furnishing` | PASS |
| `og:description` | (same as meta description) | PASS (slightly long) |
| `og:url` | `https://dmdfurnishing.com` | PASS |
| `og:site_name` | `DMD Furnishing` | PASS |
| `og:image` | `https://dmdfurnishing.com/Images/Tailored_Guestroom_Collections.jpg` | PASS |
| `og:image:width` | `1200` | PASS |
| `og:image:height` | `630` | PASS |
| `og:type` | `website` | PASS |

### Twitter Card Tags

| Tag | Value | Status |
|-----|-------|--------|
| `twitter:card` | `summary_large_image` | PASS |
| `twitter:title` | Present | PASS |
| `twitter:description` | Present | PASS |
| `twitter:image` | Present | PASS |

### Deductions
- **-2:** Meta description at 200 chars exceeds the 150-160 char recommendation. Will be truncated in both traditional SERPs and AI search citations.
- **-1:** Title at 45 chars is slightly under the optimal 50-60 range. Missing brand name in title tag (though OG title has it).

---

## 4. Core Web Vitals (6/10)

| Metric | Estimate | Status |
|--------|----------|--------|
| TTFB | 99ms | EXCELLENT (Netlify CDN cache hit) |
| HTML size (homepage) | 99.7 KB | GOOD |
| Render-blocking scripts | 0 sync in head (all async) | EXCELLENT |
| Async scripts | 9 | GOOD (all non-blocking) |
| Font preloads | 2 woff2 fonts preloaded | GOOD |
| LCP image | Preloaded via `<link rel="preload">` | GOOD |
| Known mobile LCP | 11s (from prior SEO audit) | POOR |

**Deductions:**
- **-3:** Mobile LCP of 11s is POOR (should be <2.5s). This is the single biggest CWV issue. The preloaded hero image at multiple srcSet sizes suggests large image payloads on mobile connections.
- **-1:** Products page at 762 KB HTML is very large. While SSR is correct, the HTML payload itself may slow parsing for AI crawlers with rate limits.

---

## 5. Mobile Optimization (9/10)

| Check | Result | Status |
|-------|--------|--------|
| Viewport meta | `width=device-width, initial-scale=1` | PASS |
| Responsive images | `srcSet` with 8 breakpoints per image | PASS |
| `sizes` attribute | Present on all images | PASS |
| Lazy loading | `loading="lazy"` on below-fold images | PASS |
| Touch-friendly CTAs | "Schedule a Call" / "Request a Quote" buttons | PASS |
| Font preloading | 2 WOFF2 fonts preloaded | PASS |
| Prior audit score | 90/100 | GOOD |

**Deduction (-1):** Mobile LCP of 11s impacts mobile usability significantly, though the rendering infrastructure itself is sound.

---

## 6. Security Headers (10/10) -- ALL PASS

| Header | Value | Status |
|--------|-------|--------|
| HTTPS | 301 redirect from HTTP | PASS |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | PASS (max score) |
| `Content-Security-Policy` | `default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:` | PASS |
| `X-Frame-Options` | `SAMEORIGIN` | PASS |
| `X-Content-Type-Options` | `nosniff` | PASS |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | PASS |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | PASS |

All seven security headers are correctly configured. This is a perfect score.

---

## 7. URL Structure (4/5)

| Check | Result | Status |
|-------|--------|--------|
| Clean URLs (no query params, no extensions) | Yes | PASS |
| Lowercase | All lowercase | PASS |
| Hyphenated words | Yes (e.g., `/schedule-call`, `/what-is-ffe-hospitality`) | PASS |
| Descriptive slugs | Yes | PASS |
| URL length < 100 chars | 307/310 URLs pass | PARTIAL |

**Deduction (-1):** 3 URLs exceed 100 characters:
- `/products/lobby-area/lobby-furniture/reception-desk/reception-desk-collections` (103 chars)
- `/products/office/storage-and-organization/storage-cabinets/dmd-softclose-modular-cabinet` (113 chars)
- `/products/office/storage-and-organization/bookshelves/dmd-bookshelf-collection` (103 chars)

These deeply nested product URLs are marginally over the limit. Not critical, but could be shortened.

---

## 8. Response Headers (5/5)

| Header | Value | Assessment |
|--------|-------|------------|
| `Content-Type` | `text/html; charset=utf-8` | PASS |
| `Cache-Control` | `public, max-age=0, must-revalidate` | PASS (Netlify ISR pattern) |
| `Cache-Status` | `"Netlify Edge"; hit` | PASS (CDN cache serving) |
| `Etag` | Present | PASS |
| `Server` | `Netlify` | PASS |
| `Vary` | `rsc, next-router-state-tree, ...` | PASS (correct Next.js App Router) |
| `X-Nextjs-Stale-Time` | `300` (5 min) | PASS |

---

## 9. Additional GEO-Specific Checks (4/5)

### JSON-LD Schema (Server-Rendered)

All 4 schemas are embedded in the initial HTML -- not injected by JavaScript:

| Schema Type | Key Data | Status |
|-------------|----------|--------|
| `Organization` | Name, address, logo, contact, sameAs | PASS |
| `LocalBusiness` | Geo coordinates, hours, price range | PASS |
| `WebSite` | SearchAction with URL template | PASS |
| `WebPage` | SpeakableSpecification with `h1` and `[data-speakable]` selectors | PASS |

The `SpeakableSpecification` is particularly valuable for AI voice assistants -- it tells crawlers which content is suitable for voice/spoken answers.

### llms.txt

| File | HTTP Status | Assessment |
|------|-------------|------------|
| `/llms.txt` | 200 | PASS -- Comprehensive file with About, Services, Markets, Products, FAQs, Glossary, Blog links |
| `/.well-known/llms.txt` | 404 | MINOR -- Not required, but could be added for completeness |

The `llms.txt` file is **excellent** -- well-structured content covering:
- Business overview and contact
- Service catalog
- Market segments served
- Key page URLs
- Process overview
- Materials used
- Industry glossary (FF&E, Casegoods, BOQ, HPL, Value Engineering)
- FAQs
- Product catalog overview (475+ items, 6 categories)
- Blog/resource links
- Target audience
- Geographic coverage

**Deduction (-1):** The `llms.txt` mentions "475+ commercial furniture items" but the sitemap contains 310 URLs total (including blog, inspirations, policies). The product count claim in `llms.txt` should be verifiable.

### Sitemap

| Check | Result | Status |
|-------|--------|--------|
| Format | Valid XML with proper namespace | PASS |
| URL count | 310 URLs | GOOD |
| `<lastmod>` dates | Present on all entries | PASS |
| `<changefreq>` | Present (weekly, monthly, yearly) | PASS |
| `<priority>` | Present (1.0 to 0.3) | PASS |
| Domain in sitemap | `dmdfurnishing.com` (production) | CORRECT |
| Sitemap reference in robots.txt | `https://dmdfurnishing.com/sitemap.xml` | CORRECT |

---

## AI Crawler Access Summary

### Can AI Crawlers See the Content?

**YES -- FULLY ACCESSIBLE.** This is one of the strongest GEO technical setups audited.

| AI Crawler | robots.txt | SSR Content | JSON-LD | llms.txt | Content Parity | Overall |
|------------|-----------|-------------|---------|----------|----------------|---------|
| GPTBot | ALLOWED | FULL | 4 schemas | Available | IDENTICAL to browser | EXCELLENT |
| OAI-SearchBot | ALLOWED | FULL | 4 schemas | Available | IDENTICAL to browser | EXCELLENT |
| ChatGPT-User | ALLOWED | FULL | 4 schemas | Available | IDENTICAL to browser | EXCELLENT |
| ClaudeBot | ALLOWED | FULL | 4 schemas | Available | IDENTICAL to browser | EXCELLENT |
| PerplexityBot | ALLOWED | FULL | 4 schemas | Available | IDENTICAL to browser | EXCELLENT |

### What AI Crawlers Extract from the Homepage (Without JS)

From the raw HTML, an AI crawler would understand:
1. **Business identity:** DMD Furnishing, custom commercial furniture manufacturer
2. **Location:** 56 Leonard St Unit 5, Foxboro, MA 02035
3. **Services:** Design, manufacturing, installation for hospitality FF&E
4. **Markets:** Hotels, restaurants, offices, healthcare, education, multi-family
5. **Products:** Referenced via structured navigation and cards
6. **Contact:** Phone, email, schedule-call CTA
7. **Proof points:** Project cards with specific property names and locations
8. **Industry expertise:** FAQ section with detailed answers

---

## Priority Actions

### P0 -- Critical (Do Now)
None. The technical infrastructure is sound for AI search visibility.

### P1 -- High (This Sprint)

1. **Fix animated counter SSR values** -- Trust bar shows "0+" for Rooms Renovated, Completed Projects, and Products. Server-render the actual numbers so AI crawlers see real values instead of zeros. Currently, the `0` is the SSR fallback before JS animation runs.

2. **Trim meta description to 155 characters** -- Current: 200 chars. AI search engines and traditional SERPs will truncate. Suggested: "Custom hospitality furniture & FF&E solutions for hotels, restaurants, offices. Designed, manufactured & installed nationwide by DMD Furnishing." (145 chars)

3. **Add brand name to `<title>` tag** -- Current: "Custom Hospitality Furniture & FF&E Solutions" (45 chars). Suggested: "Custom Hospitality Furniture & FF&E Solutions | DMD Furnishing" (61 chars). This helps AI crawlers attribute content to the brand.

### P2 -- Medium (Next Sprint)

4. **Improve homepage H1 for AI extraction** -- "Designed. Manufactured. Delivered." is brand-creative but lacks keywords. Consider wrapping it in a visually hidden `<span>` or changing to "Custom Hospitality Furniture -- Designed, Manufactured, Delivered by DMD" while keeping the visual treatment. Alternatively, use `data-speakable` on a more descriptive element.

5. **Shorten 3 product URLs exceeding 100 chars** -- Flatten the deepest nesting level or abbreviate slug segments.

6. **Investigate mobile LCP of 11s** -- The SSR and image preloading are correctly configured, so the issue is likely image file size or network conditions. Consider WebP/AVIF formats, more aggressive quality reduction, or smaller initial viewport images.

7. **Add `/.well-known/llms.txt`** -- Mirror the existing `/llms.txt` at the well-known path for maximum discoverability.

### P3 -- Low (Backlog)

8. **Verify `llms.txt` product count** -- Claims "475+ commercial furniture items" but should be validated against actual catalog.

9. **Add `robots` meta tag explicitly** -- While default behavior is `index,follow`, explicit declaration removes ambiguity for edge-case crawlers.

10. **Consider adding `X-Robots-Tag` header** -- Explicit `X-Robots-Tag: index, follow` in response headers provides belt-and-suspenders indexability signal.

---

## Summary

The GEO technical infrastructure for DMD Furnishing is **strong at 88/100**. The site is built on Next.js 15 with full server-side rendering, meaning all content is accessible to AI crawlers without JavaScript execution. Key strengths:

- **SSR is fully operational** across all pages (homepage, products, blog, about)
- **All Tier 1 AI crawlers are explicitly allowed** in robots.txt
- **No cloaking or differential serving** -- every crawler gets identical HTML
- **4 JSON-LD schemas are server-rendered** including SpeakableSpecification
- **Comprehensive llms.txt** provides AI-friendly business summary
- **Perfect security headers** (7/7)
- **310-URL sitemap** with proper lastmod, changefreq, and priority

The main areas for improvement are content-level optimizations (meta description length, H1 keyword relevance, title branding) and fixing the animated counter SSR fallback values. The 11s mobile LCP remains the single biggest technical concern but is a performance issue, not an AI-accessibility issue.
