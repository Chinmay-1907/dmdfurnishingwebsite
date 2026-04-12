# Skill: seo-audit (Structured Checklist) — dmdredesign.netlify.app
**Date:** 2026-04-09 | **Status:** COMPLETE

## Summary
Structured pass/fail SEO audit checklist covering all critical technical and on-page SEO components. Of 12 major checkpoints, only 4 pass cleanly, 1 is partial, and 7 fail. The site has solid foundational infrastructure but critical gaps in indexation, performance, and content signals.

## Checklist Results

| Check | Status | Notes |
|-------|--------|-------|
| robots.txt | PASS | Well-configured; AI crawlers explicitly allowed |
| Sitemap | FAIL | 310 URLs submitted, 53 are dead (/products/school/*, /products/university/*) |
| Canonical Tags | FAIL | Points to dmdfurnishing.com while serving from dmdredesign.netlify.app |
| HTTPS | PASS | SSL valid; HTTP-to-HTTPS redirect working |
| Schema Markup | PARTIAL | Organization + Product schema present; sameAs links broken (LinkedIn 404) |
| Mobile-Friendly | PASS | Responsive design; passes mobile usability checks |
| Core Web Vitals | FAIL | Mobile LCP ~11s (threshold 2.5s); desktop borderline acceptable |
| Indexation | FAIL | Only 3 of ~725 URLs indexed by Google |
| Meta Tags | FAIL | Many product pages have duplicate or generic meta descriptions |
| Heading Structure | PASS | Proper H1-H6 hierarchy on most pages |
| Internal Linking | FAIL | Shallow link depth; orphan product pages with no cross-links |
| Page Speed | FAIL | Unoptimized images; large JS bundles on mobile |

## Key Findings
- The 53 dead sitemap URLs are the most urgent fix — they waste crawl budget and signal poor site maintenance to search engines
- Canonical mismatch between staging and production domains is actively preventing proper indexation
- Mobile performance is the single largest CWV blocker, driven primarily by unoptimized images and render-blocking JavaScript
- Only 3 indexed pages means Google has essentially not discovered the site

## Recommendations
- Remove all dead URLs from sitemap.xml immediately; regenerate dynamically via Next.js app/sitemap.ts
- Align canonical tags to the actual serving domain or complete the domain migration
- Implement next/image optimization and lazy loading for all product images
- Submit updated sitemap to Google Search Console and request indexing of priority pages
- Add unique meta descriptions to all product pages (currently generic or duplicated)
