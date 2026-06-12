# Audit 29 — seo-doc (agent)

**Lens:** reader-facing doc quality + scaffolding leak check (article-loop Phase 7 — strip production scaffolding, ensure clean reader-first formatting, scannability, no internal/process leakage)
**Target:** DMD Furnishing — `app/blog/*` (6 posts), `app/guides/*` (2 guides), shared blog/guide components. Source `C:\Users\chin\dmdfurnishingwebsite-fable` · Live http://localhost:3006
**Date:** 2026-06-10
**Status:** PASS (clean) — zero scaffolding leaks; one consistency gap (missing TOC on 3 long posts)

## What this lens audits

The seo-doc lens is the final "reader-facing doc generator" stage. It checks that published articles are what a human reader should see — nothing more. Specifically:
- **No leaked production scaffolding** — `TODO`, `FIXME`, `lorem ipsum`, `[insert]`, `placeholder text`, `coming soon`, `TBD`, draft notes, beat-plan labels, source-bucket annotations (`<!-- confident: -->`, `<!-- needs_proof: -->`), `[needs verification]` flags, internal HTML comments. **Any leak found = critical.**
- **Clean formatting** — sane H1→H2→H3 hierarchy, lists, tables, short paragraphs.
- **Scannability** — answer callouts / TL;DR blocks, jump-link table of contents on long guides, FAQ blocks, author byline, figures with captions.
- **Reading flow + mobile** — responsive image sizing, no broken structure.

## Method

1. Grep all of `app/`, `components/`, and content dirs for the full scaffolding-leak string set.
2. Read 3 representative source files in full: `app/blog/what-is-ffe-hospitality/page.js`, `app/blog/ffe-procurement-timeline/page.js`, `app/guides/hospitality-ffe/page.js`.
3. Curl-render all 6 blog posts + 2 guides + blog index off live `:3006`, then re-scan the **rendered HTML** for leaks (catches anything that only appears at runtime).
4. Measure rendered word count + H2 count per post; check which posts have a TOC; check meta-title lengths.

Spot-checked files (real paths):
- `app/blog/what-is-ffe-hospitality/page.js` — has TOC, AnswerCallout, FAQ, comparison table, 2 figures w/ captions, pro-tip + callout blocks, author card.
- `app/blog/ffe-procurement-timeline/page.js` — AnswerCallout + "Quick answer" callout + FAQ, but **no TOC** (9 H2s, ~4.8k rendered words).
- `app/guides/hospitality-ffe/page.js` — data-driven TOC via `sections.map()`, AnswerCallout, snippet-bait lede, sectioned `id`-anchored H2s.

## Scaffolding-leak scan (result)

**Source grep** (`app/`, `components/`) for `TODO|FIXME|lorem|ipsum|[insert]|placeholder text|coming soon|TBD|needs_proof|confident:|needs verification|<!-- section|beat-plan|per editor|TKTK` → **no reader-facing leaks.** Only hits were legitimate, non-leaking:
- `app/layout.js:64-67` — code comment explaining Search Console verification env tokens (gated by `process.env`; never rendered).
- `app/products/[placeSlug]/page.js:149`, `app/projects/page.js:127,172` — `'/placeholder.png'` image **fallback** string in code (safe default, not visible draft text).
- `components/` — zero hits.

**Rendered-HTML re-scan** (all 6 posts + 2 guides + `/blog` index, live `:3006`) → **`leaks:[NONE]` on every URL.** No `lorem`, no `TODO`, no `coming soon`, no stray `<!-- -->` annotation, no `[needs verification]` flag survives to the page. This is the strongest signal: production scaffolding is fully stripped. **No critical findings.**

## Findings (table)

| Severity | Page | Issue | Fix |
|---|---|---|---|
| 🟢 PASS | all 8 articles (rendered) | Zero scaffolding leaks — no TODO/lorem/placeholder/coming-soon/draft-note/HTML-comment in source or rendered HTML | None — maintain. Add a CI grep gate so it stays clean. |
| 🟠 high | `blog/ffe-procurement-timeline`, `blog/restaurant-seating-guide`, `blog/hpl-veneer-solid-wood-hotel-casegoods` | No jump-link Table of Contents, yet these are the **longest** posts (~4.8k / 5.1k / 5.0k rendered words; 9 / 10 / 8 H2 sections). The shorter what-is-ffe post (6 H2s) *does* have a TOC — inconsistent and backwards. Long reads are hardest to scan without one. | Add the same `styles.toc` jump-link block (anchored `id`s already exist on most H2s) to these 3 posts. Match the what-is-ffe pattern or the guide's `sections.map()` pattern. |
| 🟡 medium | TOC-bearing pages | TOC is a plain static `<ol>` — no "active section" highlight or sticky behavior on long scroll. Guide TOC is an `<aside>` (can be sticky); blog TOC is inline `<nav>`. | Optional: make TOC sticky on desktop + scroll-spy active state. Low effort, real scannability win on 5k-word pages. |
| 🟡 medium | `blog/ffe-procurement-timeline` (and peers) | A handful of body paragraphs run long (400+ chars / 4–6 lines) — e.g. restaurant-seating booth/chair paras. Borderline for mobile scannability, not a blocker. | Spot-split the densest paragraphs into 2, or convert dense "options" prose to bulleted lists (some sections already do this well). |
| 🟢 PASS | all posts | Meta titles all ≤ 60 chars (41–57), every post has AnswerCallout/Quick-answer block, FAQ section, author byline + author card, figures with real alt + figcaption, comparison tables where useful | None. |

## Readability / formatting scorecard

| Check | Result |
|---|---|
| No production-scaffolding strings (source + rendered) | PASS — 0 hits across 8 articles |
| Clean H1 → H2 → H3 hierarchy | PASS — single H1, ordered H2s, H3 sub-groups (furniture/fixtures/equipment) |
| TL;DR / answer block up top | PASS — `AnswerCallout` + lede on every post; guides add "Quick answer" callout |
| FAQ block (reader + schema) | PASS — all posts have visible FAQ + matching FAQPage schema |
| Lists & tables for dense info | PASS — comparison tables, ordered process lists, category bullets |
| Figures w/ captions + alt + responsive `sizes` | PASS — `<figure>`/`<figcaption>`, descriptive alt, `sizes="(max-width:760px)100vw,720px"` |
| Author byline / E-E-A-T surface | PASS — editorial byline links to `/author/...`, author card at foot |
| Jump-link TOC on long content | PARTIAL — 2/2 guides + 3/6 posts; **3 longest posts missing it** (main gap) |
| Internal links resolved (no TODO slugs) | PASS — all internal links are real `/blog`, `/guides`, `/services`, `/products` routes |
| External citations have anchor text + rel | PASS — AHLA, CMAA, Hospitality Design etc. with `rel="noopener"` |
| Mobile reading | PASS — responsive image sizing; only watch the few long paragraphs |

## Score: 90/100

Reader-facing quality is strong: every published article renders clean, fully de-scaffolded, with answer blocks, FAQs, tables, captioned figures, and bylines. Lost points are entirely the **TOC inconsistency** — the three longest, hardest-to-scan posts are the ones missing the jump-link navigation that the shorter post and both guides already have. No critical issues. No leaks.

## Top 3 actions

1. **Add a jump-link TOC to the 3 long TOC-less posts** (`ffe-procurement-timeline`, `restaurant-seating-guide`, `hpl-veneer-solid-wood-hotel-casegoods`). Reuse the existing `styles.toc` block from `what-is-ffe-hospitality` or the guide's `sections.map()` pattern; anchor `id`s are mostly already on the H2s. Highest scannability ROI. (🟠)
2. **Lock the clean state with a CI grep gate** — fail the build if `TODO|FIXME|lorem|ipsum|placeholder text|coming soon|TBD|needs verification|<!--` appears in rendered output or `app/blog`/`app/guides` source. Keeps Phase-7 hygiene from regressing as new posts ship. (🟢 preventive)
3. **Make the TOC sticky + scroll-spy on desktop** and split the few 400+ char paragraphs (or bullet them). Small effort, meaningfully better reading flow on the 5k-word pages. (🟡)
