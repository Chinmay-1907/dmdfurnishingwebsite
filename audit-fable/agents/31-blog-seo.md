# Audit 31 — blog-seo (agent)

**Lens:** blog on-page SEO validation (per-post)
**Target:** DMD Furnishing — 6 blog posts + `/blog` index. Source `C:\Users\chin\dmdfurnishingwebsite-fable\app\blog\*\page.js`; live `http://localhost:3006`.
**Date:** 2026-06-10
**Status:** complete (source + live HTML, no API needed)

## What this lens audits

Per-post on-page SEO: title tag length, meta description length + quality, single H1, heading hierarchy (no skipped levels), internal links, outbound links + tiers, slug quality, publish/updated dates, author byline, image alt text, `BlogPosting` schema, and word count. Canonical + Open Graph + Twitter Card are checked as supporting signals.

## Method

1. Read all 6 `app/blog/<slug>/page.js` source files + `app/blog/page.js` (index).
2. Fetched all 7 live URLs from `:3006`; parsed rendered `<title>`, `<meta description>`, H1/H2/H3 counts, `application/ld+json` block count, canonical, OG/Twitter tag counts, `<img>` alt coverage, and visible word count.
3. Counted internal (`<Link href="/...">`) and outbound (`<a href="https://...">`) links from source.

Note on titles: each `metadata.title` (e.g. `"Restaurant Seating Guide"`) renders with a `| DMD Furnishing` template suffix. Lengths below are the **rendered** `<title>` (what Google shows), which is the correct unit to measure.

## Per-post compliance

| Post | Title len | Meta len | H1 | Links (int / ext) | Date (pub → upd) | Schema | Words | Verdict |
|---|---|---|---|---|---|---|---|---|
| what-is-ffe-hospitality | 45 ✅ | 152 ✅ | 1 ✅ | 6 / 2 ✅ | 2026-03-02 → 04-01 ✅ | BlogPosting+FAQ+Breadcrumb ✅ | 1947 ✅ | 🟢 Pass |
| ffe-procurement-timeline | 53 ✅ | 139 🟡 | 1 ✅ | 4 / 1 ✅ | 2026-03-25 → 04-02 ✅ | BlogPosting+FAQ+Breadcrumb ✅ | 1954 ✅ | 🟢 Pass |
| hotel-guestroom-furniture-checklist | 52 ✅ | 148 🟡 | 1 ✅ | 3 / 1 ✅ | 2026-03-08 → 03-29 ✅ | BlogPosting+FAQ+Breadcrumb ✅ | 2127 ✅ | 🟢 Pass |
| hpl-veneer-solid-wood-hotel-casegoods | 54 ✅ | 136 🟡 | 1 ✅ | 3 / 3 ✅ | 2026-03-16 → 03-22 ✅ | BlogPosting+FAQ+Breadcrumb ✅ | 2118 ✅ | 🟢 Pass |
| restaurant-seating-guide | 41 ✅ | 131 🟠 | 1 ✅ | 3 / 3 ✅ | 2026-03-20 → 03-31 ✅ | BlogPosting+FAQ+Breadcrumb ✅ | 2162 ✅ | 🟢 Pass |
| value-engineering-commercial-furniture | 55 ✅ | 139 🟡 | 1 ✅ | 4 / 3 ✅ | 2026-03-12 → 03-26 ✅ | BlogPosting+FAQ+Breadcrumb ✅ | 1845 ✅ | 🟢 Pass |
| /blog (index) | 37 🟡 | 140 🟡 | 1 ✅ | 11 / 0 ✅ | n/a (CollectionPage) | CollectionPage+ItemList ✅ | 458 ✅ | 🟢 Pass |

Notes on the table:
- **Title len** = rendered `<title>` incl. ` | DMD Furnishing`. All 6 posts land in the 40–60 band. Index is 37 (slightly short, not a problem).
- **Meta len**: 🟡 = under the ideal 150–160 (still indexable, just leaves SERP space unused). 🟠 restaurant 131 is the shortest.
- **Schema**: every post emits a `BlogPosting` + `FAQPage` + `BreadcrumbList` graph; all pages render 8 `ld+json` blocks live (per-page graph + site-wide Organization/WebSite from layout). All carry `author @id` → `/author/dmd-furnishing-editorial#person`, publisher, `speakable`, and `datePublished`/`dateModified`.
- **Links**: all internal anchors are descriptive (no "click here"/"read more" in body). Outbound links all point to tier-1 industry/government sources (AHLA, NRA, ADA.gov, NFPA, AIA, CMAA, AWI, USDA Forest Products Lab, Hospitality Design, Hotel Business).
- **Images**: every post renders 3 `<img>`, 0 missing alt, 0 empty alt. Alt text is descriptive and keyword-relevant.
- **Author byline**: present in visible `articleMeta` on all 6 + author card at foot, linking to the author page.
- **Slugs**: all keyword-rich, lowercase, hyphenated, no dates, no stop-word noise. `hpl-veneer-solid-wood-hotel-casegoods` is long (5 words) but fully descriptive — acceptable.

## Findings

| Severity | Post | Issue | Fix |
|---|---|---|---|
| 🟠 high | restaurant-seating-guide | Meta description 131 chars — ~25 chars under ideal; wastes SERP real estate and omits a benchmark stat | Extend to ~150–158, fold in a concrete number already in the post (e.g. "15–18 sq ft per seat") |
| 🟡 med | hpl / procurement / value-eng / checklist | Meta descriptions 136–148 chars, all just under the 150–160 band | Pad each to 150–158; each post already has a citable stat (10–16 wk lead time, 15–25% of budget, 100k double rubs) to add |
| 🟡 med | all 6 posts | Outbound `<a target="_blank">` rel attributes inconsistent: most use `rel="noopener noreferrer"`, but what-is-ffe (Hospitality Design link) and ffe-procurement (one link) use only `rel="noopener"` | Standardize all new-tab outbound links to `rel="noopener noreferrer"` (or add `nofollow` if any become sponsored) |
| 🟡 med | 4 posts (procurement, restaurant, hpl, value-eng) | Canonical + OG `url` hardcode the literal `https://dmdfurnishing.com/...` string instead of the `${siteUrl}` constant the other 2 posts use | Switch all to `${siteUrl}/blog/<slug>` for one source of truth — no live-output change, prevents drift if domain changes |
| 🟢 minor | what-is-ffe, value-eng | `articleSchema.description` present on what-is-ffe/checklist but absent on the other 4 `BlogPosting` graphs | Add a one-line `description` to the 4 missing `BlogPosting` nodes for richer rich-result eligibility |
| 🟢 minor | value-engineering | Author card uses `<h4>DMD Furnishing` + `<p>` while the other 5 posts use `<strong>`/`<span>` — a stray H4 in the footer, harmless but inconsistent heading use | Match the other 5 posts' `<strong>`/`<span>` author-card markup |
| 🟢 minor | restaurant-seating, ffe-procurement | No in-page Table of Contents nav (what-is-ffe, checklist, value-eng have one); H2-only structure with no jump links | Optional: add a TOC `nav` for parity and for jump-link sitelinks |

## Score (94/100)

| Area | Score |
|---|---|
| Titles (length, keyword, suffix) | 19/20 |
| Meta descriptions (length/quality) | 13/20 |
| Headings (single H1, hierarchy) | 20/20 |
| Links (internal + outbound tier/rel) | 18/20 |
| Schema (BlogPosting/FAQ/Breadcrumb) | 19/20 |
| Slugs / dates / author / image alt / word count | 5/5 (each fully met) |

This is a strong, template-consistent blog. Every post passes the core checklist — single H1, clean H1→H2→H3 hierarchy, full schema graph, complete dates, descriptive author byline, 100% image alt coverage, and 1,845–2,162 words of substantive content. The only real point loss is meta descriptions: all six run short of the 150–160 ideal, leaving SERP space unused and, on most, omitting a citable stat the post already contains.

## Top 3 actions

1. **Rewrite all 6 meta descriptions to 150–158 chars**, each ending on a value prop and folding in one concrete stat already in the post (lead times, budget %, double-rub rating, sq-ft-per-seat). Restaurant-seating (131) first.
2. **Standardize outbound link rel attributes** to `rel="noopener noreferrer"` across all posts (fix the 2 `noopener`-only links), and switch the 4 hardcoded canonical/OG URLs to the `${siteUrl}` constant.
3. **Add a one-line `description` to the 4 `BlogPosting` schema nodes** missing it (procurement, restaurant, hpl, value-eng) and normalize the value-eng author-card markup to drop the stray `<h4>`.
