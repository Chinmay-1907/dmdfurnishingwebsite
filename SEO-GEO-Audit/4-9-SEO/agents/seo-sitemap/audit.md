# SEO Sitemap Audit -- DMD Furnishing

**Date:** 2026-04-09
**Site:** https://dmdredesign.netlify.app (production domain: https://dmdfurnishing.com)
**Sitemap URL:** https://dmdfurnishing.com/sitemap.xml
**Generator:** `/scripts/generate-sitemap.js` (build-time, from XML catalog)

---

## Overall Score: 52/100

The sitemap has a critical slug mismatch bug that produces 53 dead URLs (17% of all entries) and leaves 52 live pages unindexed. All `lastmod` dates are identical (today's date), providing zero signal to crawlers. The XML structure is valid and canonical URLs are consistent, but the dead-URL problem alone is a CRITICAL SEO blocker.

---

## Validation Report

| # | Check | Result | Details |
|---|-------|--------|---------|
| 1 | XML format validity | PASS | Well-formed XML, correct namespace `http://www.sitemaps.org/schemas/sitemap/0.9` |
| 2 | Sitemap referenced in robots.txt | PASS | `Sitemap: https://dmdfurnishing.com/sitemap.xml` present |
| 3 | Total URL count | INFO | **310 URLs** (not 461 as previously documented) |
| 4 | Duplicate URLs | PASS | 0 duplicates found |
| 5 | `<loc>` tag present in all entries | PASS | 310/310 entries have `<loc>` |
| 6 | `<lastmod>` present | PASS (format) / FAIL (value) | All 310 entries have `<lastmod>`, but ALL set to `2026-04-09` (build date). See finding below. |
| 7 | Deprecated `<priority>` tag | WARNING | Present in all 310 entries. Google ignores this tag entirely. Adds ~4KB bloat. |
| 8 | Deprecated `<changefreq>` tag | WARNING | Present in all 310 entries. Google ignores this tag entirely. Adds ~3KB bloat. |
| 9 | Dead URLs (404s in sitemap) | **CRITICAL FAIL** | **53 URLs return 404** (17.1% of sitemap). All are `/products/school/*` and `/products/university/*` paths. |
| 10 | Orphan pages (live but not in sitemap) | **CRITICAL FAIL** | **52 live pages missing** from sitemap. All are `/products/educational-facilities/*` paths. |
| 11 | Sitemap index needed? | PASS | 310 URLs is well under the 50,000 limit. No index needed. |
| 12 | URL consistency (www vs non-www) | PASS | All URLs use `https://dmdfurnishing.com` (no www, no http). |
| 13 | Trailing slash consistency | PASS | Only homepage `/` has trailing slash. All other URLs have no trailing slash. Consistent. |
| 14 | Canonical URL alignment | PASS | Canonical `<link>` tags on pages match sitemap `<loc>` URLs. Both use `https://dmdfurnishing.com`. |
| 15 | XML comment contains markup | WARNING | Comment on line 2 contains literal `<lastmod>` and `<changefreq>` text, which inflates regex-based tag counts. Not a parser issue but sloppy. |

---

## Critical Finding: Slug Mismatch (School/University vs Educational-Facilities)

### Root Cause

The sitemap generator (`/scripts/generate-sitemap.js`) reads raw place names from `public/DMD_Website.xml`:
- `<place id="School">` --> slug: `school`
- `<place id="University">` --> slug: `university`

But the catalog library (`/lib/catalog.js`) merges these into a single place:
- Both School and University --> slug: `educational-facilities`

The Next.js app uses the catalog library for routing (`dynamicParams = false`), so only `educational-facilities` URLs resolve. The sitemap sends crawlers to `school` and `university` URLs that all 404.

### Impact

| Metric | Count |
|--------|-------|
| Dead sitemap URLs (404) | 53 |
| Orphan live pages (not indexed) | 52 |
| Affected product detail pages | 35 |
| Affected category/subcategory pages | 17 |
| Affected institution-level pages | 2 (`/products/school`, `/products/university`) |

### Fix Required

Update `/scripts/generate-sitemap.js` to use the catalog library's slug resolution instead of raw XML parsing, OR add a mapping that converts `School` and `University` to `educational-facilities`.

---

## URL Coverage Analysis

### By Section

| Section | In Sitemap | Live (200) | Dead (404) | Orphan (not in sitemap) |
|---------|-----------|------------|------------|------------------------|
| Homepage | 1 | 1 | 0 | 0 |
| About | 1 | 1 | 0 | 0 |
| Services | 1 | 1 | 0 | 0 |
| Contact | 1 | 1 | 0 | 0 |
| Schedule Call | 1 | 1 | 0 | 0 |
| Website Policies | 1 | 1 | 0 | 0 |
| Products Index | 1 | 1 | 0 | 0 |
| Products (all levels) | 283 | 230 | 53 | 52 |
| Blog Index | 1 | 1 | 0 | 0 |
| Blog Posts | 6 | 6 | 0 | 0 |
| Inspirations Index | 1 | 1 | 0 | 0 |
| Inspirations Detail | 6 | 6 | 0 | 0 |
| Projects Index | 1 | 1 | 0 | 0 |
| Project Detail | 5 | 5 | 0 | 0 |
| **TOTAL** | **310** | **257** | **53** | **52** |

### Product URL Depth Distribution

| Depth | Count | Description | Example |
|-------|-------|-------------|---------|
| 1 level (`/products/hotel`) | 8 | Institution pages | `/products/hotel` |
| 2 levels | 21 | Furniture type pages | `/products/hotel/bedroom` |
| 3 levels | 74 | Subcategory pages | `/products/hotel/bedroom/bed` |
| 4 levels | 180 | Product detail pages | `/products/hotel/bedroom/bed/king-bed` |

### Live Institution Pages

| Institution Slug | In Sitemap | Live | Status |
|------------------|-----------|------|--------|
| hospital | Yes | Yes | OK |
| lobby-area | Yes | Yes | OK |
| hotel | Yes | Yes | OK |
| office | Yes | Yes | OK |
| restaurant | Yes | Yes | OK |
| residential | Yes | Yes | OK |
| school | Yes | **404** | DEAD -- should be `educational-facilities` |
| university | Yes | **404** | DEAD -- should be `educational-facilities` |
| educational-facilities | **No** | Yes | ORPHAN -- missing from sitemap |

---

## Dead URLs (Full List -- 53 URLs)

All dead URLs follow the pattern `/products/school/*` or `/products/university/*`:

### /products/school/* (27 URLs)
- `/products/school`
- `/products/school/classroom`
- `/products/school/library`
- `/products/school/classroom/chairs`
- `/products/school/classroom/student-desks`
- `/products/school/classroom/teacher-desk`
- `/products/school/library/bookshelves`
- `/products/school/library/reading-chairs`
- `/products/school/library/study-tables`
- `/products/school/classroom/chairs/ergonomic-student-chair`
- `/products/school/classroom/chairs/plastic-chair`
- `/products/school/classroom/chairs/desk-chair`
- `/products/school/classroom/student-desks/adjustable-height-desk`
- `/products/school/classroom/student-desks/double-desk`
- `/products/school/classroom/student-desks/single-desk`
- `/products/school/classroom/teacher-desk/metal-teacher-desk`
- `/products/school/classroom/teacher-desk/portable-teacher-desk`
- `/products/school/classroom/teacher-desk/wooden-teacher-desk`
- `/products/school/library/bookshelves/medium-bookshelf`
- `/products/school/library/bookshelves/short-bookshelf`
- `/products/school/library/bookshelves/tall-bookshelf`
- `/products/school/library/reading-chairs/armchair`
- `/products/school/library/reading-chairs/bean-bag`
- `/products/school/library/reading-chairs/upholstered-chair`
- `/products/school/library/study-tables/carrel-desk`
- `/products/school/library/study-tables/group-study-table`
- `/products/school/library/study-tables/single-study-table`

### /products/university/* (26 URLs)
- `/products/university`
- `/products/university/dormitory`
- `/products/university/lecture-hall`
- `/products/university/dormitory/bunk-beds`
- `/products/university/dormitory/study-desks`
- `/products/university/dormitory/wardrobes`
- `/products/university/lecture-hall/lecture-desks`
- `/products/university/lecture-hall/podium`
- `/products/university/lecture-hall/tiered-seating`
- `/products/university/dormitory/bunk-beds/full-bunk-bed`
- `/products/university/dormitory/bunk-beds/twin-bunk-bed`
- `/products/university/dormitory/bunk-beds/twin-xl-bunk-bed`
- `/products/university/dormitory/study-desks/double-study-desk`
- `/products/university/dormitory/study-desks/single-study-desk`
- `/products/university/dormitory/study-desks/wall-mounted-study-desk`
- `/products/university/dormitory/wardrobes/2-door-wardrobe`
- `/products/university/dormitory/wardrobes/3-door-wardrobe`
- `/products/university/dormitory/wardrobes/sliding-door-wardrobe`
- `/products/university/lecture-hall/lecture-desks/attached-desk-chair`
- `/products/university/lecture-hall/lecture-desks/fixed-desk`
- `/products/university/lecture-hall/podium/metal-podium`
- `/products/university/lecture-hall/podium/smart-podium`
- `/products/university/lecture-hall/podium/wooden-podium`
- `/products/university/lecture-hall/tiered-seating/cushioned-seating`
- `/products/university/lecture-hall/tiered-seating/fixed-seating`
- `/products/university/lecture-hall/tiered-seating/movable-seating`

---

## Orphan Pages (Full List -- 52 Live Pages Not in Sitemap)

All orphan pages follow the pattern `/products/educational-facilities/*`:

- `/products/educational-facilities` (institution index)
- `/products/educational-facilities/classroom`
- `/products/educational-facilities/library`
- `/products/educational-facilities/dormitory`
- `/products/educational-facilities/lecture-hall`
- `/products/educational-facilities/classroom/chairs`
- `/products/educational-facilities/classroom/student-desks`
- `/products/educational-facilities/classroom/teacher-desk`
- `/products/educational-facilities/library/bookshelves`
- `/products/educational-facilities/library/reading-chairs`
- `/products/educational-facilities/library/study-tables`
- `/products/educational-facilities/dormitory/bunk-beds`
- `/products/educational-facilities/dormitory/study-desks`
- `/products/educational-facilities/dormitory/wardrobes`
- `/products/educational-facilities/lecture-hall/lecture-desks`
- `/products/educational-facilities/lecture-hall/podium`
- `/products/educational-facilities/lecture-hall/tiered-seating`
- Plus 35 product detail pages under `/products/educational-facilities/*/...`

---

## lastmod Analysis

| Finding | Status |
|---------|--------|
| All 310 entries have `<lastmod>` | PASS |
| Date format (YYYY-MM-DD) | PASS |
| Unique dates | **FAIL** -- only 1 unique value: `2026-04-09` |

**Problem:** The generator sets `lastmod` to `new Date().toISOString().split('T')[0]` (today's build date) for every URL. This means:
- Google cannot distinguish recently updated pages from stale ones
- The signal is completely useless -- equivalent to not having `lastmod` at all
- Every build resets all dates, so Google sees all 310 pages as "just modified" every time

**Fix:** Use actual content modification dates:
- Blog posts: use file modification time or front-matter dates
- Product pages: use XML catalog modification time
- Static pages: use git commit dates
- At minimum: stop resetting dates on every build

---

## priority and changefreq Analysis

### priority Distribution
| Value | Count | Pages |
|-------|-------|-------|
| 0.5 | 187 | Product details, inspirations, website-policies |
| 0.6 | 80 | Subcategory pages, blog posts |
| 0.7 | 30 | Furniture type pages, about, services, contact, project details |
| 0.8 | 10 | Institution pages, projects index, blog index |
| 0.9 | 1 | Products index |
| 1.0 | 1 | Homepage |
| 0.3 | 1 | Website policies |

### changefreq Distribution
| Value | Count |
|-------|-------|
| monthly | 306 |
| weekly | 3 (homepage, products, blog) |
| yearly | 1 (website-policies) |

**Note:** Google has publicly stated it ignores both `<priority>` and `<changefreq>`. These tags add ~7KB of unnecessary bloat. Not harmful, but not useful either.

---

## Quality Gate Assessment

| Gate | Threshold | Result | Status |
|------|-----------|--------|--------|
| Location pages with <60% unique content | WARNING at 30+ | 0 location pages detected | PASS |
| Location pages total | HARD STOP at 50+ | 0 location pages | PASS |

No location/geo pages exist in the sitemap. Quality gates do not apply.

---

## robots.txt Assessment

| Check | Result |
|-------|--------|
| robots.txt exists | PASS (200) |
| Sitemap directive present | PASS |
| Sitemap URL matches sitemap domain | PASS (`https://dmdfurnishing.com/sitemap.xml`) |
| AI crawler access | PASS -- explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, OAI-SearchBot, ChatGPT-User, anthropic-ai, cohere-ai |
| Disallow rules | None (fully open) |

---

## Recommendations (Priority Order)

### P0 -- CRITICAL (Fix immediately)

1. **Fix the school/university slug mismatch in sitemap generator**
   - File: `/scripts/generate-sitemap.js`
   - Problem: Raw XML uses `School` and `University` as place IDs; catalog lib maps them to `educational-facilities`
   - Impact: 53 dead URLs being submitted to Google, 52 live pages invisible to crawlers
   - Fix: Import and use the catalog library's `getAllPlaces()` / `getAllProductPaths()` instead of raw XML parsing, OR add a slug mapping: `{ 'school': 'educational-facilities', 'university': 'educational-facilities' }`

### P1 -- HIGH (Fix this sprint)

2. **Implement real lastmod dates**
   - Stop using build-date for all URLs
   - Use git log dates, file modification times, or content hashes to detect actual changes
   - At minimum: only update `lastmod` when content actually changes (cache previous sitemap and compare)

3. **Remove deprecated tags (optional but recommended)**
   - Remove `<priority>` and `<changefreq>` -- Google ignores both
   - Saves ~7KB per sitemap generation
   - Reduces noise and potential confusion

### P2 -- MEDIUM (Next sprint)

4. **Verify canonical tags on all dynamically generated product pages**
   - Canonical tags ARE present and correctly point to `https://dmdfurnishing.com/*`
   - Spot-checked 5 pages: all working correctly

5. **Clean up XML comment**
   - Line 2 comment `<!-- SEO related changes: auto-generated sitemap. Next expand: add <lastmod>, <changefreq>, and production domain config. -->` contains literal `<lastmod>` and `<changefreq>` text
   - This is outdated (those features were already added) and should be removed or updated

6. **Consider using Next.js built-in sitemap generation**
   - Next.js 15 supports `app/sitemap.js` or `app/sitemap.xml/route.js` for automatic sitemap generation
   - This would keep sitemap in sync with actual routes automatically
   - Eliminates the slug mismatch class of bugs entirely

### P3 -- LOW (Backlog)

7. **Add image sitemap entries** for product pages (Google Images indexing)
8. **Add hreflang if multi-language support is planned**
9. **Monitor sitemap via Google Search Console** for coverage errors

---

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total URLs in sitemap | 310 |
| Live URLs (200) | 257 (82.9%) |
| Dead URLs (404) | 53 (17.1%) |
| Orphan pages (not in sitemap) | 52 |
| Duplicate URLs | 0 |
| Unique lastmod values | 1 (all identical) |
| XML validity | Valid |
| robots.txt reference | Present |
| Canonical consistency | Consistent |
| Sitemap index needed | No |

**Score Breakdown:**
- XML validity and format: 15/15
- robots.txt integration: 10/10
- URL health (82.9% live): 8/20 (17.1% dead is severe)
- Coverage completeness: 5/20 (52 orphan pages)
- lastmod quality: 2/15 (all identical = useless)
- Canonical consistency: 10/10
- Best practices: 2/10 (deprecated tags, stale comment)
- **Total: 52/100**
