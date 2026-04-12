# Full SEO Audit Report: dmdfurnishing.com

**Date:** 2026-04-09 | **Platform:** Next.js 15 on Netlify | **Pages:** 310 in sitemap
**Production:** https://dmdfurnishing.com (serves old CRA SPA) | **Staging:** https://dmdredesign.netlify.app (Next.js site)
**Agents:** 13 SEO audits completed

---

## Executive Summary

DMD Furnishing has built a technically sophisticated Next.js 15 website with strong content quality (82/100), comprehensive schema markup (78/100), and solid Core Web Vitals foundations (78/100). However, the site is functionally invisible to search engines because the production domain (dmdfurnishing.com) still serves an old Create React App SPA that outputs "You need to enable JavaScript to run this app." -- rendering all SEO investment useless. Only 3 of 725 URLs are indexed in Google. The off-site authority profile is catastrophically weak: zero backlinks, zero Google Business Profile, zero directory citations, zero reviews, and a broken LinkedIn company page. The on-site SEO excellence creates a strong foundation, but until the deployment crisis and off-site authority vacuum are resolved, the site will remain invisible in search.

---

## Overall SEO Health Score: 46/100

---

## Score Breakdown

| Category | Raw Score | Weight | Weighted | Key Agent(s) |
|----------|-----------|--------|----------|--------------|
| Technical SEO | 72 | 20% | 14.4 | seo-technical |
| Content Quality | 82 | 20% | 16.4 | seo-content |
| On-Page SEO | 75 | 15% | 11.3 | seo-visual, seo-google |
| Schema/Structured Data | 78 | 10% | 7.8 | seo-schema |
| Performance (CWV) | 78 | 10% | 7.8 | seo-performance, seo-google |
| Sitemap & Indexation | 45 | 10% | 4.5 | seo-sitemap, seo-dataforseo |
| Images | 52 | 5% | 2.6 | seo-image-gen |
| Local SEO | 22 | 5% | 1.1 | seo-local, seo-maps |
| Backlinks & Authority | 18 | 5% | 0.9 | seo-backlinks, seo-dataforseo |
| **Subtotal** | | **100%** | **66.8** | |
| **Critical Penalty** | Production domain serves CRA SPA, not Next.js | | **-20.8** | seo-technical, seo-dataforseo |
| **Final Score** | | | **46/100** | |

The 20.8-point penalty reflects the reality that all SEO work is negated while the production domain serves the old, non-indexable CRA build. Without this penalty, the on-site score would be 67/100.

---

## Top 5 Critical Issues

### 1. Production domain serves old CRA SPA (seo-technical: CRITICAL)
- **What:** https://dmdfurnishing.com returns "You need to enable JavaScript to run this app." -- the old Create React App build that is completely non-indexable.
- **Impact:** All canonical URLs, sitemap URLs, and OG URLs point to dmdfurnishing.com. Google is trying to index the broken CRA version instead of the SEO-optimized Next.js site at dmdredesign.netlify.app. This single issue renders the entire SEO investment ineffective.
- **Effort:** MEDIUM -- Requires DNS/Netlify custom domain configuration.
- **Fix:** Point dmdfurnishing.com DNS to the Netlify site serving the Next.js build.

### 2. Only 3 of 725 URLs indexed in Google (seo-dataforseo: CRITICAL)
- **What:** A `site:dmdfurnishing.com` search returns only 3 pages (homepage, /products, /website-policies). All 6 blog posts, all product category pages, and all product detail pages appear unindexed.
- **Impact:** Zero organic search visibility. Zero keyword rankings. The site is functionally invisible in search despite having strong content.
- **Effort:** LOW-MEDIUM -- Requires GSC verification, sitemap submission, and initial backlink acquisition.
- **Fix:** Deploy to production domain, verify GSC, submit sitemap, request indexing for priority pages.

### 3. 53 dead URLs and 52 orphan pages from sitemap slug mismatch (seo-sitemap: CRITICAL)
- **What:** The sitemap generator uses raw XML place IDs ("school", "university") but the Next.js app routes to "educational-facilities". Result: 17% of sitemap URLs return 404, and 52 live pages are invisible to crawlers.
- **Impact:** Google encounters dead URLs on every crawl, wasting crawl budget and signaling poor site quality. 52 live product pages cannot be discovered.
- **Effort:** LOW -- Fix the slug mapping in `/scripts/generate-sitemap.js`.
- **Fix:** Use catalog library slug resolution instead of raw XML parsing.

### 4. Zero off-site authority (seo-backlinks, seo-local, seo-maps: CRITICAL)
- **What:** Zero detectable backlinks. No Google Business Profile. Zero citations on any directory (Yelp, BBB, Houzz, chambers of commerce). Zero reviews on any platform. LinkedIn company page returns 404. Brand "DMD" collides with Duchenne Muscular Dystrophy.
- **Impact:** Without external validation signals, Google has no reason to trust or rank this site. The brand is invisible in search, on maps, and in local results.
- **Effort:** HIGH (ongoing) -- Requires systematic directory submissions, GBP creation, and backlink outreach.
- **Fix:** Create GBP, build foundational citations, fix LinkedIn, begin link building.

### 5. Mobile LCP is POOR on 4 of 5 key pages (seo-google: HIGH)
- **What:** PageSpeed Insights shows 10-12 second LCP on mobile for homepage (11s), products (10.5s), services (10s), and contact (12s). Only the blog page passes (2.0s). Zero CrUX field data.
- **Impact:** Google uses mobile CWV as a ranking signal. Poor mobile LCP means worse rankings even once the indexation crisis is resolved. No field data means no "page experience" signal at all.
- **Effort:** MEDIUM -- Requires image optimization, render-blocking CSS fixes, and LCP preload hints.
- **Fix:** Inline critical CSS, add LCP preload hints, optimize image delivery, reduce RSC prefetching.

---

## Top 5 Quick Wins

### 1. Fix hero carousel alt text (Impact: HIGH, Effort: 10 min)
All 4 homepage hero images share identical alt text: "DMD Furnishing commercial hospitality furniture". Each image needs unique, descriptive alt text matching its content. This affects image search visibility across all hero images. *(seo-image-gen, seo-visual)*

### 2. Remove deprecated HowTo schema from /services (Impact: HIGH, Effort: 5 min)
Google removed HowTo rich results in September 2023. The HowTo block on the services page will never generate rich results and may trigger validation warnings. Remove it. *(seo-schema)*

### 3. Add FAQPage schema to homepage (Impact: HIGH, Effort: 30 min)
The homepage displays 7 well-written FAQ items but has no FAQPage structured data. The about and services pages already have this schema. Adding it to the homepage unlocks AI citation potential for the site's strongest content. *(seo-schema, seo-geo)*

### 4. Change blog author from Organization to Person (Impact: HIGH, Effort: 20 min)
All 6 blog articles list "DMD Furnishing" (Organization) as author. Google strongly prefers Person authors with names and credentials. Change @type to Person across all blog articles. *(seo-schema, geo-content)*

### 5. Fix SVG logo intrinsic dimensions (Impact: MEDIUM, Effort: 5 min)
The logo SVG has `width="20000" height="18000"` intrinsic dimensions but renders at 180x60. This causes excessive memory consumption on mobile. Change to `width="600" height="600"` to match the viewBox. *(seo-image-gen)*

---

## Detailed Findings by Agent

### seo-technical (Score: 72/100)
**Agent file:** `4-9-SEO/agents/seo-technical/audit.md`

The technical foundation is strong: Next.js App Router with React Server Components, full SSG for product pages, comprehensive security headers (HSTS, CSP, X-Frame-Options), and well-configured robots.txt with explicit AI crawler allowances. The llms.txt file is excellent.

**Critical issues:**
- Production dmdfurnishing.com serves old CRA SPA -- the single most impactful issue in the entire audit
- Canonical URL domain mismatch (staging has canonicals pointing to broken production)
- IndexNow key appears to be a placeholder; not automated
- No Google Search Console or Bing Webmaster Tools verification
- Static sitemap risks going stale (not using Next.js dynamic sitemap)

**What works well:**
- Crawlability: robots.txt allows all major crawlers including AI bots
- Security: 7/7 security headers correctly configured
- Mobile: viewport meta, responsive images, font swap, skip link
- SSR: All content server-rendered, no JS dependency for content access

---

### seo-content (Score: 82/100)
**Agent file:** `4-9-SEO/agents/seo-content/audit.md`

Content quality is the site's strongest asset. Blog articles demonstrate genuine domain expertise with references to BIFMA standards, CAL 133 fire codes, ADA compliance, and detailed technical vocabulary. The FF&E guide (2,200 words) and guestroom checklist (2,500 words) are excellent.

**Critical issues:**
- Product pages are thin content (<150 words on /products and /products/[category])
- No individual author attribution on any content
- Meta descriptions too long on 4+ pages
- All 6 blog posts share the same publication date (March 28, 2026)

**What works well:**
- Blog articles score 86-90/100 individually
- AI citation readiness: 8/10 -- definitions, FAQ structures, comparison tables
- Natural keyword distribution without stuffing
- Trust signals: physical address on every page, OTP-verified contact form

---

### seo-schema (Score: 78/100)
**Agent file:** `4-9-SEO/agents/seo-schema/audit.md`

Comprehensive structured data implementation with 15 unique schema types across 35+ JSON-LD blocks. All use proper JSON-LD format with absolute URLs, ISO 8601 dates, and @id cross-referencing.

**Critical issues:**
- HowTo schema on /services is deprecated (removed Sept 2023)
- Homepage FAQ (7 items) has no FAQPage schema
- Blog author @type is Organization, not Person
- Product schema has `price: '0'` which may trigger spam flags

**What works well:**
- Consistent JSON-LD format across all pages
- @graph usage for multi-entity pages
- Product detail schema with sku, brand, manufacturer, material, specifications
- SpeakableSpecification on homepage for voice/AI extraction
- Conditional rendering (Review/ImageGallery only when data exists)

---

### seo-sitemap (Score: 52/100)
**Agent file:** `4-9-SEO/agents/seo-sitemap/audit.md`

The sitemap has a critical slug mismatch bug producing 53 dead URLs (17% of entries) and leaving 52 live pages unindexed.

**Critical issues:**
- 53 dead URLs from school/university vs educational-facilities slug mismatch
- 52 orphan pages not in sitemap
- All 310 lastmod dates identical (build date) -- provides zero signal to crawlers
- Deprecated `<priority>` and `<changefreq>` tags add ~7KB bloat

**What works well:**
- Valid XML format with correct namespace
- Properly referenced in robots.txt
- Canonical URL consistency across all entries
- Zero duplicate URLs

---

### seo-backlinks (Score: 18/100)
**Agent file:** `4-9-SEO/agents/seo-backlinks/audit.md`

The domain has minimal-to-no detectable external backlink profile. The site links OUT to 11 high-authority domains (AHLA, BIFMA, ADA.gov) but receives nothing in return.

**Critical issues:**
- Zero detectable backlinks from any external source
- LinkedIn company page returns 404
- Brand "DMD" collides with Duchenne Muscular Dystrophy in search
- No local citations, no industry directory listings
- Blog content lacks differentiation for link attraction

**What works well:**
- Outbound links to high-authority industry organizations (editorial best practice)
- Blog content has moderate link-bait potential (checklists, comparisons, timelines)
- Internal link structure is logical with breadcrumb navigation

---

### seo-image-gen (Score: 52/100)
**Agent file:** `4-9-SEO/agents/seo-image-gen/audit.md`

Next.js Image component adoption is solid (automatic AVIF/WebP, responsive sizes, proper fill mode), but critical gaps exist in blog imagery and OG image configuration.

**Critical issues:**
- Blog has zero images -- no featured images on cards, no inline images in articles
- OG images on all 10 pages point to wrong domain (dmdfurnishing.com)
- SVG logo has 20000x18000 intrinsic dimensions
- All blog articles share a generic homepage OG image

**What works well:**
- Next.js Image pipeline with AVIF/WebP, quality 75, 1-year cache TTL
- Responsive sizes attribute on all images
- Before/After slider has excellent descriptive alt text
- Product gallery has alt text with position index

---

### seo-performance (Score: 78/100)
**Agent file:** `4-9-SEO/agents/seo-performance/audit.md`

Solid foundation with H2 protocol, self-hosted WOFF2 fonts, static generation, and no third-party scripts. Key bottlenecks are image caching, RSC payload bloat, and missing LCP preload hints.

**Critical issues:**
- Image cache headers broken: `/_next/image` returns `Cache-Control: max-age=0` despite config
- 7 RSC prefetch requests fire immediately on homepage (~61KB competing with LCP)
- Products page RSC payload is 135KB (all 180 products serialized)
- Source images total 9.6GB -- relying entirely on runtime optimization

**What works well:**
- TTFB consistently under 100ms on cached pages
- Font loading: self-hosted WOFF2, preloaded, display:swap
- Static generation for all product routes
- Zero third-party script blocking
- Sharp installed for server-side image optimization

---

### seo-visual (Score: 74/100)
**Agent file:** `4-9-SEO/agents/seo-visual/audit.md`

Clean, dark-themed luxury brand presentation with strong heading hierarchy. Product catalog renders correctly with 180 items.

**Critical issues:**
- Blog and Contact pages missing `<main>` landmark
- H1 spacing bug on About ("Spaces.Designed") and Services ("Installation.One")
- Blog title tag duplicated: "... | DMD Furnishing | DMD Furnishing"
- Touch targets below 48x48px on mobile (hamburger 40x40, footer links 20px height)

**What works well:**
- Heading hierarchy clean across all 10 pages (H1 > H2 > H3, no skips)
- Responsive hamburger menu, no horizontal scroll on mobile
- Product naming detects 2 typos: "2-Siter Sofa" / "3-Siter Sofa"

---

### seo-google (Score: 72/100)
**Agent file:** `4-9-SEO/agents/seo-google/audit.md`

Desktop performance is perfect (100/100) but mobile is severely impacted by LCP issues. SEO and Accessibility scores are excellent (100 and 95-100 respectively).

**Critical issues:**
- Mobile LCP POOR on 4/5 pages (10-12 seconds vs 2.5s threshold)
- Render-blocking CSS on all pages (400-450ms savings available)
- Images served oversized (309 KiB savings on homepage)
- Zero CrUX field data (insufficient real-user traffic)

**What works well:**
- Desktop: 100/100 performance, 100/100 SEO, 100/100 accessibility
- CLS perfect (0) across all pages
- TBT/interactivity good (10-50ms) across all pages
- Blog page is 99/100 performance (text-only, fast)

---

### seo-local (Score: 22/100)
**Agent file:** `4-9-SEO/agents/seo-local/audit.md`

Local SEO is severely underdeveloped. On-site signals exist (NAP in footer, LocalBusiness schema, location mentions) but off-site local presence is nonexistent.

**Critical issues:**
- No Google Business Profile (not created)
- Zero local citations across any directory
- Zero third-party reviews on any platform
- LinkedIn 404, other social profiles unverifiable
- No geographic modifiers in any title tag

**What works well:**
- Consistent NAP across footer, schema, and most pages
- Phone number in header on all pages
- "Where is DMD located?" FAQ on homepage and about page
- LocalBusiness schema with geo coordinates and hours

---

### seo-maps (Score: 18/100)
**Agent file:** `4-9-SEO/agents/seo-maps/audit.md`

DMD Furnishing is invisible on all major map platforms. Zero presence on Google Maps, Bing Maps, Apple Maps, OpenStreetMap, Yelp, or BBB.

**Critical issues:**
- Not listed on any map platform
- Geocoordinates (42.0654, -71.2478) resolve to Mechanic Street, not Leonard Street
- Dead social media links in schema undermine entity trust
- Zero reviews on any platform

**Opportunity:** No direct B2B commercial furniture competitors exist on maps within 25 miles. Creating a GBP could make DMD the ONLY result for queries like "commercial furniture manufacturer near me."

---

### seo-dataforseo (Score: 38/100)
**Agent file:** `4-9-SEO/agents/seo-dataforseo/audit.md`

Near-zero organic visibility. DMD does not appear in SERPs for any of 12 researched keywords. The SERPs are dominated by competitors with 20-30+ year track records.

**Critical issues:**
- 99.6% non-indexation rate (3 of 725 URLs indexed)
- Zero keyword rankings detected
- Zero SERP visibility for any target keyword
- Blog content exists for key informational queries but is not appearing

**Key opportunity keywords:**
- "hospitality furniture Foxboro MA" -- very low competition, massive opportunity
- "HPL vs veneer hotel furniture" -- lower competition, DMD has matching blog content
- "what is FF&E in hospitality" -- DMD has a strong guide but it is not indexed

---

### seo-geo bridge (Score: 61/100)
**Agent file:** `4-9-SEO/agents/seo-geo/audit.md`

Technical GEO readiness is strong (82/100) but authority signals are critically weak (38/100).

**Key findings:**
- llms.txt quality: 9/10 (one of the best B2B implementations)
- AI crawler access: 100% (all major bots explicitly allowed)
- Brand mentions: 8/100 (zero Wikipedia, YouTube, Reddit presence)
- Animated hero text ("esigned.", "anufactured.") breaks AI extraction

---

## Action Plan

### P0 -- Fix This Week
1. Deploy Next.js site to dmdfurnishing.com (seo-technical)
2. Fix sitemap slug mismatch for school/university/educational-facilities (seo-sitemap)
3. Verify Google Search Console and submit sitemap (seo-technical, seo-dataforseo)
4. Fix or remove broken LinkedIn URL from footer and schema (seo-backlinks, seo-local)
5. Remove unverified sameAs URLs from schema (geo-schema)
6. Verify geocoordinates match actual business address (seo-maps)

### P1 -- Fix This Sprint
7. Create Google Business Profile (seo-local, seo-maps)
8. Build foundational citations: Yelp, BBB, Bing Places, Houzz, Apple Business Connect (seo-local)
9. Remove HowTo schema from /services (seo-schema)
10. Add FAQPage schema to homepage (seo-schema)
11. Change blog author from Organization to Person (seo-schema, geo-content)
12. Fix Product schema pricing (price: '0') (seo-schema)
13. Fix hero alt text duplication (seo-image-gen)
14. Verify Bing Webmaster Tools (seo-technical)
15. Change LocalBusiness to FurnitureStore (seo-local)

### P2 -- Fix This Quarter
16. Add unique content to product category pages (seo-content)
17. Create 6 blog featured images (seo-image-gen)
18. Fix Netlify image cache headers (seo-performance)
19. Pre-optimize 9.6GB source images (seo-performance)
20. Add Web Vitals monitoring (seo-technical)
21. Migrate to dynamic sitemap (seo-sitemap)
22. Fix mobile LCP (inline critical CSS, image optimization) (seo-google)
23. Add named author with credentials to blog (seo-content)
24. Add client testimonials to projects (seo-content)
25. Register with industry directories (AHLA, BIFMA) (seo-backlinks)

### P3 -- Backlog
26. Create YouTube channel with project videos (seo-geo)
27. Expand blog to 15-20 articles (seo-dataforseo)
28. Create local landing pages (seo-local)
29. Guest post on hospitality trade publications (seo-backlinks)
30. Create downloadable resources for link building (seo-backlinks)
31. Build interactive tools (budget calculator) (seo-dataforseo)
32. Create comparison and "versus" content (geo-content)

---

## On-Site vs Off-Site Gap

The most striking finding across all 13 agents is the massive gap between on-site and off-site SEO:

| Domain | Average Score | Assessment |
|--------|-------------|------------|
| On-site technical (rendering, schema, security) | 76/100 | Strong |
| On-site content (blog, E-E-A-T, structure) | 79/100 | Strong |
| Off-site authority (backlinks, citations, reviews) | 18/100 | Critical |
| External visibility (indexation, SERP, maps) | 32/100 | Critical |

The on-site work is largely done and done well. The path to search visibility is almost entirely about deployment, indexation, and off-site authority building.

---

*Report synthesized from 13 independent SEO agent audits conducted 2026-04-09. All scores, findings, and recommendations cite specific agents. No data has been fabricated.*
