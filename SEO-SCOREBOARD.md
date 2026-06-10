# SEO-SCOREBOARD — fable-dmd iteration loop

Goal: every category ≥95. Max 25 iterations. Baseline = iteration 0 (commit 8346de3).

## Lighthouse (mobile, prod build :3006) — Perf/SEO/A11y/BP per iteration

| Page | I0 | I2 | I3 | I4 | I5 | I6 | I7 |
|---|---|---|---|---|---|---|---|
| home | 63/100/95/93 | 79/100/95/96 | 75/100/96/100 | 80/100/96/100 | 80/100/100/100 | 80/100/100/100 | **80/100/100/100** |
| products | 69/100/95/96 | 90/100/95/100 | 90/100/100/100 | 82/100/100/100 | 91/100/100/100 | 83/100/100/100 | **90/100/100/100** |
| place-hotel | err*/100/95/96 | 89/100/95/100 | 73/100/100/100 | 85/100/100/100 | 85/100/100/100 | 82/100/100/100 | **90/100/100/100** |
| type-page (new I3) | — | — | 78/100/100/100 | 93/100/100/100 | 94/100/100/100 | 83/100/100/100 | **93/100/100/100** |
| product-detail | 68/100/96/96 | 88/100/96/100 | 81/100/100/100 | 88/100/100/100 | 93/100/100/100 | 92/100/100/100 | **93/100/100/100** |
| services | 73/100/97/96 | 88/100/97/100 | 93/100/97/100 | 90/100/97/100 | 93/100/100/100 | 91/100/100/100 | **94/100/100/100** |
| about | 73/100/96/96 | 84/100/96/100 | 93/100/96/100 | 93/100/96/100 | 92/100/100/100 | 77/100/100/100 | **92/100/100/100** |
| contact | 66/92/96/96 | 96/92†/96/100 | 96/100/100/100 | 92/100/100/100 | 96/100/100/100 | 93/100/100/100 | **98/100/100/100** |
| blog | 74/100/96/96 | 87/100/96/100 | 95/100/100/100 | 95/100/100/100 | 95/100/100/100 | 95/100/100/100 | **95/100/100/100** |
| blog-post | 66/100/96/96 | 86/100/96/100 | 75/100/100/100 | 94/100/100/100 | 81/100/100/100 | 85/100/100/100 | **94/100/100/100** |
| guide | 71/100/96/96 | 83/100/96/100 | 93/100/96/100 | 89/100/100/100 | 94/100/100/100 | 93/100/100/100 | **87/100/100/100** |
| projects | 73/100/96/96 | 94/100/96/100 | 71/100/96/100 | 94/100/96/100 | 94/100/100/100 | 91/100/100/100 | **94/100/100/100** |
| inspirations | 68/100/96/96 | 90/100/96/100 | 81/100/100/100 | 93/100/100/100 | 94/100/100/100 | 94/100/100/100 | **94/100/100/100** |

I1 omitted (contaminated by concurrent agent builds — treat as floor). I3 perf
partially contaminated by concurrent edits during the run; I4/I5 ran clean.

**As of I5 (held through I6/I7): SEO 100, A11y 100, Best Practices 100 on all
13 pages.** Perf 80–98; remaining gap is Lighthouse's simulated slow-4G LCP —
observed (unthrottled) LCP is 0.3–1.5s on every page. Dominant simulated
terms: RTT chains to render-blocking CSS (~30KB, already small) and hydration
payload. Run noise dominates the residual: about swung 92→77→92 and blog-post
94→81→85→94 across I4–I7 with zero perf-affecting changes between runs (±8–15
on the same machine). **Perf STALL logged per loop rule:** every code-level
lever shipped (static orbs, optional fonts, LCP priorities, static first hero
slide, en-dash 400s, critters tried+reverted); residual <95 on some pages is
simulation floor + run variance, not an unaddressed regression. Home is the
one consistent 80 — its simulated LCP is the full-bleed hero photo itself;
shrinking it further means degrading the hero art, declined on design grounds.

*place-hotel "err" = NO_LCP — root-caused in iteration 2: SpaceNav smooth-scrolled
the tab strip on mount, suppressing Chrome's LCP reporting (fixed; hotel mobile 0→82).
†contact 92 = meta description streamed into <body>: `await searchParams` made the
route dynamic. Fixed in I3 (client-side ?category= read; route static again).

## Toolkit audits (claude-seo v2, all 18 agents + 25 skills applied)

| Category | I0 | I5 (est. after fixes) |
|---|---|---|
| technical-seo | 84 | 95 — case-sensitive image checker script, static contact, honest OG dims |
| sitemap | 86 | 96 — type pages added, slug inspirations, image entries |
| performance-hygiene | 62 | 90 — orbs static, fonts optional, priority cards, 16KB logo |
| on-page | 72 | 88 — keyword-form type-page titles, per-group product copy |
| content-quality | 70 | 84 — 14-group subcategory copy on 174 product pages |
| topic-clusters | 58 | 86 — guides mainEntity, type-page tier links place↔type↔product |
| schema | 72 | 92 — Review/HowTo pruned, carousel ItemList, honest hours, @id graph |
| geo-ai-visibility | 80 | 88 — llms.txt synced, panels SSR'd, speakable fixed, RSS |
| sxo | 72 | 90 — form-first contact, drawer focus fix, contrast AA everywhere |
| image-seo | 64 | 85 — 133 path fixes, alt rewrites pending on XML (backlog) |
| internal-linking | 58 | 90 — A–Z indexes, 20 type pages, browse-by-type, prev/next |
| architecture | 62 | 90 — place→type→product tier complete, slug URLs, 301s |
| local-seo | 45 | 70 — honest hours, NAP consistent; GBP work out of code scope |
| ecommerce-seo | 58 | 80 — product copy, breadcrumbs, CollectionPage per type |
| analytics-wiring | 25 | 25 — blocked: needs analytics choice (Plausible per user pref) |
| ui-ux | 62 | 85 — scrim, drawer, contrast, grid fixes; full re-pass pending |

## Notes
- GSC/GA4 MCP data unavailable this session (servers wired but tools need session
  reload; Google-side access still propagating). Audits ran on code + crawl + Lighthouse only.
- Worst offenders at baseline: ~20 broken images in prod (path case/comma mismatches),
  2MB logo SVG render-critical on every page, ~150/174 product pages crawl-orphaned
  (PAGE_SIZE=24), self-serving Review schema, 3 deprecated HowTo blocks, FAQPage schema
  invisible on /products, no analytics, OTP-gated contact form.
- Backlog (worst-first): blog in-body images + per-post OG images; DMD_Website.xml /
  projects.xml alt-quality rewrites; project id/slug standardization; Vanity 5-8
  white-image investigation; "DMD Bookshelf Collection" broken image on /products/office;
  home/blog-post/place-hotel simulated-LCP chase (priority cards + static first hero
  slide shipped in I6, unmeasured).

## Iteration log

### Iteration 0 (baseline) — 2026-06-10
Full audit: 7 parallel toolkit workers + UI/UX visual pass (16 pages × 2 viewports) + Lighthouse ×12.

### Iterations 1–2 — 2026-06-10 (commits 3c3610b, 60e8ad6)
Logo 2MB→16KB; 133 broken image paths fixed (case/comma); A–Z crawl indexes;
form-first contact (perf 66→96); NO_LCP root cause (SpaceNav scroll); schema
pruning (Review, HowTo×3, invisible FAQPage); GEO pass (llms.txt, SSR panels,
speakable, RSS); 14-group product copy across 174 pages.

### Iteration 3 — 2026-06-10 (commit d96dac7)
Contact dynamic→static (SEO 92→100 everywhere). A11y contrast batch (footer
alpha, light-theme stat gold, sr-only h2s, decorative place-card alts). 20
furniture-type mid-tier landing pages /products/{place}/{type} (≥3-product
gate) + sitemap + place-page browse-by-type links.

### Iteration 4 — 2026-06-10 (commit e733981)
Killed infinite floatOrb hero animations (projects SI 10.1s→1.5s, perf 71→94).
Header scrim gradient→solid rgba (axe can't evaluate gradients). Guide CTA
button color specificity bug (magenta-on-gold, both themes). Inspirations
numeric→slug URLs + 6 netlify 301s. OG dims honesty, weekend hours dropped,
guides mainEntity, projects carousel ItemList.

### Iteration 5 — 2026-06-10 (commit a83064c)
Mobile drawer visibility:hidden when closed — cleared the last 4 pages' a11y
(axe tested off-screen drawer links; also fixed real Tab-into-invisible-links
bug). Fonts display:swap→optional (killed font-swap CLS 0.133 on fast-painting
pages). Tried+reverted optimizeCss/critters (no-op on app router).
**Result: SEO/A11y/BP 100 on all 13 pages.**

### Iteration 6 — 2026-06-10 (commit 5e2b4d0)
Hero slide 1 static base layer (was 1.4s fade-from-black on the LCP image).
ProductCard priority prop, first 3 cards eager on catalog/type pages
(place-hotel LCP element = first card image, was lazy-loaded). Nine en-dash
image filenames renamed (next/image optimizer 400s on non-ASCII paths) + XML
refs rewritten + checker now fails on non-ASCII. I6 scores: perf 77–95,
SEO/A11y/BP 100 ×13 (perf remainder = lantern simulation floor; observed LCP
0.3–1.5s, TBT ≤226ms, CLS 0 — documented above).

### Iteration 7 — 2026-06-10 (design-team pass)
Full design-team review: rulebook 7 Rules, redesign SOP, anti-slop 27 greps,
impeccable linter (31 warnings, 0 criticals — ship gate passes), critic
scorecard pass over 6 pages × desktop/mobile screenshots + live checks
(count-up stats, before/after slider, contact map all healthy; "blank" images
in full-page captures = lazy-load capture timing, not bugs).
Implemented: hero headline em-dash→period (anti-slop forbidden char); 2
"Get Started" eyebrows → "Plan Your Project" / "Work With Us" (forbidden
phrase); PDP gallery column position:sticky (killed dead whitespace under
short image card, photo follows specs scroll; static <960px); 14 raw
0.2s/200ms-ease transitions normalized to var(--transition-fast) brand token
(the "uniform 200ms ease" AI-tell); CountUp respects prefers-reduced-motion
(keeps SSR'd end value, skips reset-to-0).
Reviewed + consciously kept: gold left-border cards ×15, footer gold-foil
gradient text ×9, header height transition ×4 (deliberate brand patterns;
impeccable warnings, zero criticals).
I7 re-audit confirms no regression: SEO/A11y/BP 100 ×13 held; perf 80–98
(about 77→92, contact 93→98, blog-post 85→94 — variance, see note above;
guide 93→87 same). Perf stall formally logged; loop's remaining open items
are content-quality backlog (blog in-body/OG images, XML alt rewrites), not
Lighthouse categories.

### Iteration 8 — 2026-06-10 (blog in-body images)
All 6 blog posts were text-only walls. Each now has 2 contextual figures
from existing site photography (12 total): descriptive alts, captions that
add information, real width/height (zero CLS), lazy below-fold. New
figure/figcaption styles in blog CSS (figure = bordered card, both themes).
Image checker 719 refs / 0 missing / 0 non-ascii. Addresses image-seo +
content-quality backlog lines. Honesty pass: inspected every candidate image
before writing alts — materials-macro.jpg is a showroom not a macro,
services-hero.png duplicates Hotel_Guest_Room_Hero.png pixel-for-pixel,
"Premium Collections" is seating not casegoods; slots reassigned, all 12
alts/captions describe actual photo content. Remaining backlog: per-post OG images via
sharp (needs art direction call), DMD_Website.xml / projects.xml alt-quality
rewrites (586-product XML — bulk content task), project id/slug
standardization, BlogPosting schema image arrays (nice-to-have).

### Iteration 10 - 2026-06-10 (audit-fable fix-down: all 54 audits addressed)
Worked the full audit-fable deliverable (31 agent + 23 skill audits, INDEX
P0/P1/P2 fix list) one by one. All 5 P0 bugs fixed: sitemap image URLs now
encodeURI (191 raw-space locs -> 0), queen-bed-frame wrong King gallery
fixed in DMD_Website.xml, geo coords corrected to 56 Leonard St
(42.0582,-71.2421), stale scripts/generate-sitemap.js deleted (+npm script),
project Article.datePublished now ISO 8601 (toIsoDate helper, +dateModified).
P1: author entity @id/type mismatch resolved (#person -> #editorial-team,
Organization + parentOrganization, 10 refs across 9 files); FF&E 15-25% stat
voiced as first-party experience + HVS survey benchmark link (3 surfaces,
unified wording -- HVS does not publish the % so no fabricated citation);
public/_headers deleted (next.config.js single source); /products title
restored to "Commercial Furniture Manufacturer | Product Catalog" (+desc,
schema, H1); 4 vertical titles got "Manufacturer" + named standards (CAL TB
117-2013, NFPA 701, ANSI/BIFMA X5.1); cluster loop closed -- Related Guides
blocks on all 7 product hubs (placeRelatedGuides in place-content.js);
/api/vitals now logs structured JSON lines (was discarding).
P2/walk: og:locale + lengthened meta descriptions on all 6 posts; jump-link
TOCs added to the 3 long posts; blog publisher -> @id ref (6 posts);
4 missing BlogPosting descriptions added; hardcoded URLs -> siteUrl;
sku/mpn = slug on Product schema; project sitemap lastmod from real
completion dates; homepage title now carries brand suffix; homepage tile
alts (7); robots.txt: catalog XML disallowed + 4 more AI bots explicit;
alternateName [DMD, DMD USA]; localBusiness areaServed (US/MA/New England);
contact weekend-hours contradiction removed; Get-directions links (contact +
footer); guide red claims reframed as experience (brand intervals, 2x cost
ratio); 100k double-rubs cited (Wyzenbeek/ACT); || 285 fallback removed;
gallery sweep: 3 more products got own photos first (attached desk-chair
wrong-gallery bug fixed); OG + product JSON-LD images encodeURI; PDP meta
descriptions padded to 150+; 2 deep links blog -> PDPs; content-leak
prebuild gate (scripts/check-content-leaks.js); brief-template.md.
Build clean 240 pages, all spot-checks pass. Parked (accounts/credentials):
GSC grant, Plausible env, Bing token, IndexNow webhook, DataForSEO, GBP,
Wikidata, named founder Person, aggregateRating (no real reviews). Backlog
(content builds): 5 vertical spokes, comparison/RFP pages, type-page content
blocks, PDP prose de-dup, WebP source re-encode, sticky TOC.

### Iteration 11 - 2026-06-10 (5 vertical spoke articles via marketing team)
Closed the audit's biggest content gap (item 11 + 21-adjacent): 5 vertical
spoke articles written by cmo-writer-blog agents, gated by routing-enforcer
(ROUTE_OK) and cmo-qa (scored panel). New posts: office-furniture-commercial-
projects, healthcare-furniture-guide, student-housing-furniture-guide,
multifamily-ffe-guide, hotel-lobby-furniture-guide (each ~1.7-2k words,
answer-first H2s, TOC, FAQ + FAQPage schema matching visible text, soft CTA).
QA round 1: 2 pass (91.1/91.2), 3 hard-stop rejects fixed surgically (office
H8 CTA label + 9-10wk positioning inversion + 2 P6 trims; healthcare H5
unsupported compliance claim cut in 3 spots; lobby H5 catalog claim cut +
og/meta description aligned + CTA moved to house position). All pass post-fix.
Cluster loop now bidirectional for all 7 verticals: placeRelatedGuides leads
with each new spoke; every spoke links its hub 2-3x. Imagery = 15 visible
ImagePromptBox slots (new component) with paste-ready SOTA prompts, collected
in IMAGE-PROMPTS.md for external generation (CEO + image model; Codex cannot
make images). Build clean 245 pages (was 240), leak gate pass, 11 spot-checks
pass on rendered build.
