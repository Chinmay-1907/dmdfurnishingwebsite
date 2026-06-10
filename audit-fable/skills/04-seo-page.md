# Skill Audit 04 — seo-page

**Skill purpose:** Deep single-page on-page SEO analysis — title/meta/H1/headings, keyword placement, internal & external links, image alts, canonical, meta robots, Open Graph/Twitter, schema (JSON-LD), and content/word count — for one URL at a time.

**Target:** DMD Furnishing (B2B hospitality FF&E manufacturer, lead-gen). 3 representative pages audited live + source: Home `/`, Product `/products/hotel`, Blog `/blog/what-is-ffe-hospitality`. Source root `C:\Users\chin\dmdfurnishingwebsite-fable`; live dev `http://localhost:3006`. Production domain `https://dmdfurnishing.com`.

**Date:** 2026-06-10

**Status:** Complete. All 3 pages returned 200 with full SSR HTML — every element below is read from live rendered markup, not assumed. No external SEO API used (none needed for on-page; live SERP positions would need DataForSEO — not wired, out of scope for on-page).

## Per-page on-page audit

| Element | Home `/` | Product `/products/hotel` | Blog `/blog/what-is-ffe-hospitality` | Verdict |
|---|---|---|---|---|
| HTTP | 200 (109 KB) | 200 (252 KB) | 200 (88 KB) | 🟢 all live |
| Title (chars) | "Hospitality Furniture Manufacturer \| Custom FF&E" (52) | "Hotel Furniture & Casegoods \| DMD Furnishing" (48) | "What Is FF&E in Hospitality? \| DMD Furnishing" (49) | 🟢 all in 48–60 sweet spot, unique, brand suffix |
| Meta description (chars) | 152 — keyword + geo "Foxboro, MA" | 132 — keyword present | 160 — keyword + intent | 🟡 product 132 is short (room for ~25 more chars); blog 160 at hard ceiling |
| H1 (exactly one) | "Custom Hospitality Furniture. Designed. Manufactured. Delivered." | "Hotel Furniture & Casegoods" | "What Is FF&E? A Complete Guide for Hospitality Projects" | 🟢 exactly 1 H1 each |
| Heading hierarchy | H1×1, H2×8, H3×20 | H1×1, H2×8, H3×24 | H1×1, H2×8, H3×6 | 🟢 logical, no skipped levels; blog H2s are question-form (good for GEO) |
| Keyword in URL | n/a (root) | 🟢 slug `hotel` = "Hotel Furniture" | 🟢 slug `what-is-ffe-hospitality` = exact query | 🟢 |
| Keyword in title | 🟢 "Hospitality Furniture" | 🟢 "Hotel Furniture" | 🟢 "FF&E in Hospitality" | 🟢 |
| Keyword in H1 | 🟢 "Hospitality Furniture" | 🟢 "Hotel Furniture & Casegoods" | 🟢 "FF&E…Hospitality" | 🟢 |
| Title↔H1 match | aligned | aligned (slug↔H1↔title) | 🟡 title says "What Is FF&E in Hospitality?", H1 says "What Is FF&E? A Complete Guide…" — close but not identical | 🟡 blog minor mismatch |
| Keyword in first paragraph | 🟢 "Custom Hospitality FF&E" (hero lead) | 🟢 "FF&E project management" lead | 🟠 first `<p>` is the byline/date line ("Published…Updated…By DMD"); keyword appears in next block, not first para | 🟠 blog lead para is metadata, not keyword copy |
| Internal links | 46 (30 unique) | 107 (71 unique) | 34 (19 unique) | 🟢 strong internal linking on all; product is a hub |
| External links | 4 (ahla.com, social) | 3 (social only) | 5 (ahla.com, hospitalitydesign.com, social) | 🟡 product page cites zero authority sources (only social); blog/home cite industry bodies |
| Image alts | 18 imgs, 0 missing alt attr, 7 empty alt="", 16 lazy/data-src | 43 imgs, 0 missing, 0 empty, 39 lazy | 3 imgs, 0 missing, 0 empty, 2 lazy | 🟡 home has 7 decorative empty-alt (acceptable if truly decorative; verify hero isn't among them) |
| Canonical | `https://dmdfurnishing.com` (absolute) | `…/products/hotel` (self-ref) | `…/blog/what-is-ffe-hospitality` (self-ref) | 🟢 all correct, absolute, self-referencing |
| Meta robots | none → defaults index,follow | none → index,follow | none → index,follow | 🟢 all indexable |
| Open Graph | 7 tags incl og:image:alt | 7 tags incl og:image:alt | 7 tags incl og:image:width/height | 🟢 complete |
| Twitter Card | 4 tags (card,title,desc,image) | 4 tags | 6 tags (+image dims) | 🟢 complete |
| Schema (JSON-LD blocks) | 10 blocks | 8 blocks | 8 blocks | 🟢 very rich (see note) |
| Schema key types | Organization/FurnitureStore, WebSite+SearchAction, FAQPage, Speakable, PostalAddress/Geo | CollectionPage, ItemList (49 ListItems), BreadcrumbList, FurnitureStore, FAQPage | BlogPosting, BreadcrumbList, FurnitureStore, FAQPage, Speakable | 🟢 structure / 🟠 FAQ (see findings) |
| Word count (visible) | 991 | 1004 | 1919 | 🟢 home/product solid for type; blog 1919 = strong long-form |
| E-E-A-T (blog) | n/a | n/a | 🟢 byline "DMD Furnishing Editorial Team" + Published Mar 2 2026 + Updated Apr 1 2026 dates | 🟢 author + freshness present |

## Findings

| Severity | Page | Issue | Fix |
|---|---|---|---|
| 🟠 high | All 3 | `FAQPage` schema emitted on every page. The seo-page skill explicitly says NEVER recommend FAQ schema — Google restricts FAQ rich results to government/health sites; for others it renders no rich result and can be flagged as misused structured data. | Decide intent: if used only for GEO/LLM context, keep but accept zero SERP rich-result value. If chasing rich results, remove `FAQPage` markup (keep the visible Q&A copy — it still helps GEO and "Speakable"). |
| 🟠 high | Blog | First `<p>` is the byline/date line ("Published…Updated…By DMD"), so the primary keyword "FF&E in hospitality" is not in the literal first paragraph of body copy. | Move the date/byline into a `<div>`/`<span>` metadata block (or `<time>`) so the first real `<p>` is keyword-bearing intro copy. |
| 🟡 medium | Product | Meta description only 132 chars — leaves ~25 chars of SERP space unused; also no geo/CTA. | Extend to ~150–160 chars, add "nationwide" / "Foxboro, MA" or a consultation CTA to match home/blog pattern. |
| 🟡 medium | Product | Zero authoritative external links (only social profiles). Home and blog both cite industry bodies (ahla.com, hospitalitydesign.com). | Add 1–2 outbound links to authority sources (AHLA, ISFM, hospitality design standards) where natural in the spec copy. |
| 🟡 medium | Blog | Title ("What Is FF&E in Hospitality?") and H1 ("What Is FF&E? A Complete Guide…") don't match; the exact-match question is split. | Align: make H1 lead with the exact query phrase "What Is FF&E in Hospitality?" then append "— A Complete Guide" for full title↔H1 consistency. |
| 🟡 medium | Blog | Meta description is exactly 160 chars — at the hard truncation ceiling; risk of mid-word cut on some SERPs. | Trim to ~150–155 chars for safety margin. |
| 🟢 minor | Home | 7 images carry empty `alt=""`. Fine if decorative, but confirm the LCP hero image is not among them. | Audit the 7; give the hero/above-fold image a descriptive, keyword-natural alt. |
| 🟢 minor | Home | Canonical is the bare domain `https://dmdfurnishing.com` (no trailing slash) while product/blog use full paths — consistent and correct; just confirm production redirects `/` ↔ no-trailing-slash cleanly. | No action; verify redirect parity in production. |

## Score (84/100)

| Sub-area | Score | Notes |
|---|---|---|
| On-page SEO (title/H1/URL/links) | 90/100 | Titles & H1s excellent; minor title↔H1 drift on blog; product desc short |
| Content quality | 88/100 | 991 / 1004 / 1919 words — all above type minimums; blog long-form + dated + bylined |
| Technical (canonical/robots/OG/Twitter) | 95/100 | Complete OG+Twitter, correct self-referencing canonicals, all indexable |
| Schema | 70/100 | Very rich & valid JSON-LD, BUT FAQPage used site-wide against skill guidance |
| Images | 85/100 | All alts present (no missing attrs), lazy-loading correct; 7 decorative empty-alts to verify |

**Weighted overall: 84/100** — strong, well-instrumented on-page foundation; the only structural risk is FAQ schema misuse, the rest are polish.

## Top 3 actions

1. **Resolve the FAQPage schema decision** across all pages — either accept it as GEO-only (no SERP rich result) or strip it to avoid structured-data misuse flags. Highest-leverage, site-wide.
2. **Fix the blog's first paragraph** — move the byline/date out of the first `<p>` so keyword-bearing intro copy leads the body; align the blog H1 to the exact-match query.
3. **Beef up the product page** — extend the 132-char meta description toward 155 chars with geo/CTA, and add 1–2 authoritative outbound links (currently only social).
