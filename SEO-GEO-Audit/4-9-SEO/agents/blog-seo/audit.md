# Blog SEO Audit — dmdredesign.netlify.app
**Agent:** blog-seo | **Date:** 2026-04-09 | **Status:** COMPLETE

## Overall Blog SEO Score: 5.2/9 average across 6 posts

---

## Blog Index (/blog)
- **Title:** Double brand name — "DMD Furnishing" appears twice due to layout template + page-level title both including it
- **Meta Description:** Over 160 chars
- **Schema:** CollectionPage + BreadcrumbList present
- **Article Cards:** Zero featured images
- **Pagination:** None (all 6 posts on one page)

---

## Per-Post Results

### Post 1: What Is FF&E in Hospitality?
| # | Check | Status | Details | Fix |
|---|-------|--------|---------|-----|
| 1 | Title Tag | PASS | 55 chars, keyword in first half | — |
| 2 | Meta Description | FAIL | 183 chars (over 160), no stats | Trim to 155 chars, add a stat |
| 3 | Heading Hierarchy | PASS | Single H1, no skips | Reframe H2s as questions |
| 4 | Internal Links | PASS | 5 contextual links | Add cross-links to other posts |
| 5 | External Links | PASS | AHLA, BIFMA, other tier-1 | — |
| 6 | Canonical URL | PASS | Uses `${siteUrl}` correctly | — |
| 7 | OG Meta Tags | PASS | All 4 required tags present | Unique OG image needed |
| 8 | Twitter Card | PASS | summary_large_image, 55 chars | — |
| 9 | URL Structure | PASS | 4 words, keyword present | — |
**Score: 7/9**

### Post 2: Hotel Guestroom Furniture Checklist
| # | Check | Status | Details | Fix |
|---|-------|--------|---------|-----|
| 1 | Title Tag | FAIL | Double brand: "...| DMD Furnishing | DMD Furnishing" (71 chars) | Remove `| DMD Furnishing` from page title |
| 2 | Meta Description | PASS | 158 chars | — |
| 3 | Heading Hierarchy | PASS | Clean hierarchy | Reframe H2s as questions |
| 4 | Internal Links | FAIL | Only 2 internal links | Add 2-3 more contextual links |
| 5 | External Links | PASS | Tier-1 sources | — |
| 6 | Canonical URL | PASS | Uses `${siteUrl}` correctly | — |
| 7 | OG Meta Tags | PASS | Present | Unique OG image needed |
| 8 | Twitter Card | PASS | Correct format | — |
| 9 | URL Structure | PASS | 4 words, keyword present | — |
**Score: 6/9**

### Post 3: Value Engineering Commercial Furniture
| # | Check | Status | Details | Fix |
|---|-------|--------|---------|-----|
| 1 | Title Tag | PASS | 52 chars | — |
| 2 | Meta Description | PASS | 156 chars | Add a stat |
| 3 | Heading Hierarchy | PASS | Clean | Reframe H2s as questions |
| 4 | Internal Links | PASS | 4 links | Add cross-links to other posts |
| 5 | External Links | PASS | Relevant sources | — |
| 6 | Canonical URL | FAIL | Missing `siteUrl` import, hardcoded URL | Import and use `${siteUrl}` |
| 7 | OG Meta Tags | FAIL | URLs hardcoded, not using siteUrl | Fix to use template literal |
| 8 | Twitter Card | FAIL | Title 75 chars (over 70 limit) | Trim title |
| 9 | URL Structure | PASS | 3 words, keyword present | — |
**Score: 5/9**

### Post 4: HPL vs Veneer vs Solid Wood Hotel Casegoods
| # | Check | Status | Details | Fix |
|---|-------|--------|---------|-----|
| 1 | Title Tag | PASS | 58 chars | — |
| 2 | Meta Description | PASS | 155 chars | — |
| 3 | Heading Hierarchy | PASS | Clean | Reframe H2s as questions |
| 4 | Internal Links | PASS | 3 links | Add cross-links to other posts |
| 5 | External Links | PASS | BIFMA, AIA sources | — |
| 6 | Canonical URL | FAIL | Missing `siteUrl` import, hardcoded URL | Import and use `${siteUrl}` |
| 7 | OG Meta Tags | FAIL | URLs hardcoded | Fix to use template literal |
| 8 | Twitter Card | PASS | Under 70 chars | — |
| 9 | URL Structure | FAIL | 7-word slug (too long) | Consider shortening |
**Score: 5/9**

### Post 5: Restaurant Seating Guide
| # | Check | Status | Details | Fix |
|---|-------|--------|---------|-----|
| 1 | Title Tag | PASS | 48 chars | — |
| 2 | Meta Description | FAIL | 145 chars (under 150 minimum) | Expand to 155 chars |
| 3 | Heading Hierarchy | PASS | Clean | Reframe H2s as questions |
| 4 | Internal Links | PASS | 4 links | Add cross-links to other posts |
| 5 | External Links | PASS | Relevant sources | — |
| 6 | Canonical URL | FAIL | Hardcoded despite having siteUrl import | Use `${siteUrl}` template |
| 7 | OG Meta Tags | PASS | Has unique image (restaurant seating) | — |
| 8 | Twitter Card | FAIL | Missing brand suffix (inconsistent with posts 1-4) | Standardize |
| 9 | URL Structure | PASS | 3 words, keyword present | — |
**Score: 4/9**

### Post 6: FF&E Procurement Timeline
| # | Check | Status | Details | Fix |
|---|-------|--------|---------|-----|
| 1 | Title Tag | PASS | 50 chars | — |
| 2 | Meta Description | FAIL | 148 chars (under 150 minimum) | Expand to 155 chars |
| 3 | Heading Hierarchy | PASS | Clean | Reframe H2s as questions |
| 4 | Internal Links | PASS | 3 links | Add cross-links to other posts |
| 5 | External Links | PASS | CMAA, industry sources | — |
| 6 | Canonical URL | FAIL | Hardcoded despite having siteUrl import | Use `${siteUrl}` template |
| 7 | OG Meta Tags | PASS | Present | Unique OG image needed |
| 8 | Twitter Card | FAIL | Missing brand suffix (inconsistent) | Standardize |
| 9 | URL Structure | PASS | 3 words, keyword present | — |
**Score: 4/9**

---

## Cross-Post Patterns

### Issues Affecting ALL 6 Posts
1. **Zero cross-linking between posts** — No post links to any other blog post. Complete topical cluster failure.
2. **Author schema uses @type: Organization** — Should be @type: Person for E-E-A-T.
3. **No FAQPage schema** — All 6 posts have FAQ sections in JSX but no structured data for them.
4. **0% question-format H2s** — Across ~45 H2s, none phrased as questions. Missed featured snippet / PAA opportunities.
5. **5/6 posts share same OG image** — Only restaurant seating guide has a unique image.
6. **All published same date** — 2026-03-28, no dateModified signals.
7. **No featured images on blog index cards** — Article cards are text-only.

### Issues Affecting 4+ Posts
8. **Hardcoded canonical URLs** (Posts 3-6) — Posts 3-4 don't even import `siteUrl`; Posts 5-6 import but don't use it.
9. **Inconsistent Twitter card titles** — Posts 1-4 include brand suffix; Posts 5-6 omit it.

---

## Files Requiring Changes

| File | Issues |
|------|--------|
| `app/blog/page.js` | Double brand title, meta desc over 160 |
| `app/blog/hotel-guestroom-furniture-checklist/page.js` | Double brand title |
| `app/blog/value-engineering-commercial-furniture/page.js` | Missing siteUrl import, hardcoded URLs, Twitter title 75 chars |
| `app/blog/hpl-veneer-solid-wood-hotel-casegoods/page.js` | Missing siteUrl import, hardcoded URLs, 7-word slug |
| `app/blog/restaurant-seating-guide/page.js` | Hardcoded canonical, inconsistent Twitter title |
| `app/blog/ffe-procurement-timeline/page.js` | Hardcoded canonical, inconsistent Twitter title |
| All 6 post files | Need FAQ schema, Person author, cross-links, question H2s |

---

## Priority Fixes

### P0 — Critical
1. Fix double brand name in blog index + Post 2 titles (remove `| DMD Furnishing` from page-level title strings)
2. Add `siteUrl` import to Posts 3-4; use `${siteUrl}` for all canonical/OG URLs across Posts 3-6
3. Add 2-3 cross-links per post to other blog articles

### P1 — High Impact
4. Add FAQPage JSON-LD schema to all 6 posts (low effort, high reward)
5. Change author schema from Organization to Person across all posts
6. Reframe 60-70% of H2 headings as questions
7. Create unique OG images per post (or at minimum per topic cluster)
8. Add statistics with sources to meta descriptions

### P2 — Medium
9. Stagger publication dates (don't publish all same day)
10. Build a Related Articles component for cross-promotion
11. Add featured images to blog index cards
12. Standardize Twitter card title format across all posts
13. Trim Post 4 URL slug from 7 words to 4-5
