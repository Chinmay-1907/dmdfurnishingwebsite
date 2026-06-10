# Audit 05 — seo-content (agent)
**Lens:** E-E-A-T, readability, thin content, keyword targeting
**Target:** DMD Furnishing (fable-dmd) · source C:\Users\chin\dmdfurnishingwebsite-fable · live http://localhost:3006
**Date:** 2026-06-10
**Status:** complete

## What this lens audits
Content quality against Google's Sept 2025 Quality Rater Guidelines: E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness), readability, thin-content detection, content depth/uniqueness, keyword targeting, AI-citation readiness, and AI-generated-content quality markers. Word-count floors are topical-coverage checks, not ranking targets.

## Method (real pages checked)
Fetched 9 live pages from :3006, stripped scripts/nav, extracted `<main>` text, headings, titles, meta, JSON-LD dates, internal links. Pages: `/`, `/about`, `/services`, `/products/hotel`, `/products/restaurant`, `/products` (index), `/inspirations`, `/contact`, `/author/dmd-furnishing-editorial`, `/blog/what-is-ffe-hospitality`, `/blog/restaurant-seating-guide`. Compared two product pages for boilerplate duplication.

Main-content word counts (chrome stripped): homepage ~1029 · about ~987 · services ~1640 · product/hotel ~353 listing + dense editorial blocks · blog FF&E 1947 · blog restaurant-seating 2073 · author 320 · inspirations index 331 · products index 328 · contact 166.

## Findings
| Severity | Page | Issue | Fix |
|---|---|---|---|
| 🟢 | /author/dmd-furnishing-editorial | Real author/E-E-A-T page: states who writes ("project managers, shop floor leads, procurement coordinators, installers… we do not outsource to generalist copywriters"), fact-check policy ("we do not invent statistics… describe the range rather than quoting a figure we cannot verify"), cites American Hotel & Lodging Association. Experience + Expertise + Trust all present. | None — keep. Best E-E-A-T asset on site. |
| 🟢 | /blog/* | Both posts 1900–2073 words, clear H2 question hierarchy, visible byline "Published March 2, 2026 · Updated April 1, 2026 · By [author link]" + JSON-LD datePublished/dateModified + linked author. Freshness + attribution done right. | None. |
| 🟢 | /products/hotel vs /products/restaurant | Vertical-specific editorial prose, NOT boilerplate. Hotel = renovation cycle/finish-match; restaurant = flammability compliance/cleaning code. Genuine specifier expertise, quotable for AI. | None — strong differentiation. |
| 🟢 | Titles / meta | All 6+ titles 46–61 chars, keyword + brand + location; descriptions 132–160 chars, benefit-led, no truncation risk. | None. |
| 🟡 | /blog/what-is-ffe-hospitality | "Frequently Asked Questions" H2 exists but Q items render as plain text, not H3/`<h3>?` headings (0 question headings detected in HTML). Weakens FAQ rich-result + AI-citation chunking. | Mark each FAQ question as an H3 (or `<dt>`); pair with FAQPage schema if not already emitted. |
| 🟡 | /inspirations (index) | ~331 main words; mostly a board-grid intro. Borderline thin for a hub page; risk grows if child `/inspirations/[slug]` pages are equally light. | Add 150–250 words of context per inspiration board (the "why these finishes work" angle the author page promises). Verify child pages aren't thin. |
| 🟡 | /products (index) & /products/hotel listing | Index ~328 words; product cards are name + category breadcrumb only, no per-product copy. Listing is functional but thin as standalone; depth lives in the lower editorial blocks. | Ensure each `/products/[place]/[type]` leaf has the contract-grade prose seen on space pages; keep listing pages canonical-clean so thin grids don't compete. |
| 🟡 | /contact | ~166 main words. Acceptable for a contact page, but light on trust reinforcement (no NAP block in body, no "PM reads every inquiry" backed by response-time / credentials). | Add visible address + phone + hours and a one-line trust proof; cross-link the editorial/about expertise. |
| 🟢 | Readability | Short declarative sentences, concrete specifier language ("edge-banded tops, recessed hardware, scratch-resistant HPL"), no keyword stuffing, no generic AI filler. Reads as written by people who do the work. | None. |
| 🟢 | Keyword targeting | Clean intent map: homepage = "hospitality furniture manufacturer / custom FF&E"; about = "commercial furniture manufacturer Foxboro MA"; services = "FF&E services design to install"; product = "contract-grade hotel casegoods". No cannibalization seen across the 9 pages. | None. |

## Score / verdict (88/100)
Genuinely strong content with real first-hand expertise, a credible editorial/author page, dated+attributed blog posts, and unique per-vertical product prose — rare for a B2B manufacturer site; the only drags are a few thin hub/index/contact pages and FAQ markup that isn't machine-readable.

## Gaps
- E-E-A-T factor breakdown: Experience 19/20, Expertise 24/25, Authoritativeness 19/25 (no external citations/press/awards beyond AH&LA reference — that's the weakest factor), Trustworthiness 28/30.
- Authoritativeness ceiling needs OFF-SITE signals (backlinks, reviews, press, named individual authors with bylines) — out of this lens; defer to backlinks/local-SEO agents.
- Child pages not crawled: `/inspirations/[slug]`, `/products/[place]/[type]` leaves, 4 remaining blog posts, 2 guides — spot-checks suggest they're solid but confirm leaf-page depth.
- No live GSC/GA4 here, so actual query coverage, dwell, and which pages already earn AI citations are unverified (state method only; not blocking for content quality).

## Top 3 actions
1. **Make FAQ machine-readable** — wrap each blog/product FAQ question in an H3 and emit FAQPage schema so Google and AI assistants can lift the Q/A directly (highest-leverage, low effort).
2. **Lift the thin hubs** — add 150–250 words of contextual prose to `/inspirations` index + each board, and confirm `/products/[place]/[type]` leaves carry the contract-grade editorial blocks (don't let bare card grids stand alone).
3. **Strengthen Authoritativeness** — add named bylines/credentials on the author page, surface any client logos/press/standards bodies, and put a visible NAP + trust line on `/contact`; this is the one E-E-A-T factor pulling the score down.
