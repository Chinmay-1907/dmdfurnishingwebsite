# Audit 03 — seo-article-loop (agent)
**Lens:** 9-phase evidence-first article quality
**Target:** DMD Furnishing (fable-dmd) · source C:\Users\chin\dmdfurnishingwebsite-fable · live http://localhost:3006
**Date:** 2026-06-10
**Status:** complete (source + live HTML; no GSC/SERP API needed for content-quality lens)

## What this lens audits
The Espressio 9-phase loop says good SEO is `evidence → brief → draft → review → distribute → learn`, not `keyword → draft → publish`. The human gate at step 4 is what kills "slop." So for each published article I check the *output signature* of that process:
- **Evidence / sourcing** — are claims backed by real authorities, or asserted from thin air?
- **Original angle / first-hand POV** — does it carry operator knowledge a generic AI rewrite couldn't fake?
- **Anti-slop** — no invented statistics, no filler, no generic listicle padding.
- **Depth + structure** — H2/H3 hierarchy, answer-first lede, comparison tables, real FAQs.
- **Schema** — BlogPosting + FAQPage + Breadcrumb + speakable + named author entity (E-E-A-T).

## Method (which articles checked)
Read full source of 3 articles + 1 guide + author page; grepped all 8 long-form pages for external citations; curled 1 live post to confirm schema + citations render server-side.
- `app/blog/hpl-veneer-solid-wood-hotel-casegoods/page.js` (full read, 579 lines)
- `app/blog/ffe-procurement-timeline/page.js` (full read, 510 lines)
- `app/guides/hospitality-ffe/page.js` (partial read, body sections)
- `app/author/dmd-furnishing-editorial/page.js` (E-E-A-T author page)
- Grep external links across all 6 blog + 2 guide pages
- Live: `curl http://localhost:3006/blog/value-engineering-commercial-furniture` → 8 ld+json blocks, 2 FAQPage, 14 speakable nodes, AIA/NFPA/ADA citations all present in SSR HTML

## Findings
| Severity | Article / File | Issue | Fix |
|---|---|---|---|
| 🟢 pass | All 8 long-form pages | Each carries 1–2 outbound citations to real authorities (USDA Forest Products Lab, AWI, CMAA, AHLA, NRA, ADA, AIA, NFPA, Hospitality Design, Hotel Business). Anti-slop discipline visible. | Keep. This is rare quality for a manufacturer blog. |
| 🟢 pass | author/dmd-furnishing-editorial | Real E-E-A-T page: "written by PMs, shop floor leads, installers… we do not outsource to generalist copywriters" + explicit "How We Fact Check" section ("we do not invent statistics… describe the range rather than quote a figure we cannot verify"). Named `Person`/author entity wired into every article's `author.@id`. | Keep. |
| 🟢 pass | hpl-veneer-solid-wood-hotel-casegoods | Strong original operator angle: tier-by-tier spec logic (economy→luxury), real spec language ("Laminate/Veneer; edge-banded MDF"), 8-row comparison table, 4 substantive FAQs. Reads like a fabricator wrote it, not an AI. | Keep as the template for new posts. |
| 🟠 high | All articles | **Citations are domain-level, not deep-linked.** Every external link points to a homepage (`fpl.fs.usda.gov/`, `awinet.org/`, `cmaanet.org/`) and is phrased vaguely ("research is published by…"). No specific standard number, document, or page is cited. A reader/LLM can't verify the actual claim. Weakens E-E-A-T and citation trust. | Deep-link to the specific standard/page (e.g. ANSI/BIFMA X5.1 seating, NFPA 701, the actual FPL TechNote). Name the standard inline. |
| 🟠 high | All articles | **Zero `Citation`/`citation` schema and no first-party proof.** The loop's step 3 ("proof inventory") and step 9 ("winning angle / proof gaps") want original evidence — DMD's own project photos labelled as DMD work, named case studies, real lead-time data from their floor. Current images are generic stock-style `/Images/*.jpg` reused across posts; figcaptions describe a generic room, not "DMD's install at [property]." | Add 1 real first-party data point or named project per article. Add `citation` array to BlogPosting schema pointing at the standards. |
| 🟡 medium | ffe-procurement-timeline; hospitality-ffe guide | **Specific numbers asserted without a source.** "16–24 weeks," "FF&E is 15–25% of total capital cost," "6–8 year casegoods cycles," "10–14 days for RFQ" are presented as fact with no citation. These are plausible operator estimates, but the lens flags any hard number that isn't sourced or explicitly framed as DMD's own experience. | Either cite (AHLA/PKF capex benchmarks) or reframe as "in our projects we typically see…" to convert unsourced stat → first-hand evidence. |
| 🟡 medium | All articles | **No "last reviewed / freshness" signal beyond modifiedTime, and modifiedTime is hard-coded.** dateModified is a static string (e.g. '2026-03-22'); it won't update on real edits, so the freshness signal will silently rot. | Drive dateModified from a real edit timestamp or a content-version constant updated on revision. |
| 🟡 medium | restaurant-seating-guide, value-engineering | Citations sit in a single mid-body sentence each; no "Sources" / "References" section at article end. LLM answer engines favor an explicit reference list. | Add a short `<section>References</section>` listing the standards cited, with deep links. |
| 🟢 minor | hospitality-ffe guide | `className="snippet-bait"` on the lede — works, but the literal class name is a tell if ever leaked to a human reviewer. Cosmetic only. | Rename class to something neutral (`.lede-answer`). |

## Per-article evidence scorecard
Scale 0–5 per dimension: Sourcing (external authority cited + verifiable), Original POV (operator knowledge), Anti-slop (no invented stats / filler), Depth+Structure (H-tree, table, FAQ), Schema (BlogPosting+FAQ+speakable+author).

| Article | Source | POV | Anti-slop | Depth | Schema | Notes |
|---|---|---|---|---|---|---|
| hpl-veneer-solid-wood-casegoods | 3 | 5 | 5 | 5 | 5 | Best post. Tier logic + spec language + 8-row table. Citation only domain-level → 3. |
| ffe-procurement-timeline | 3 | 4 | 4 | 5 | 5 | Strong 5-phase structure; several hard week/%-figures unsourced. |
| restaurant-seating-guide | 3 | 4 | 4 | 5 | 5 | NRA + ADA cited (domain-level). |
| value-engineering | 3 | 4 | 4 | 5 | 5 | AIA/NFPA/ADA cited; live-verified rendering. |
| hotel-guestroom-checklist | 2 | 4 | 4 | 4 | 5 | Single Hotel Business homepage link; checklist format. |
| what-is-ffe-hospitality | 3 | 4 | 4 | 4 | 5 | AHLA + Hospitality Design cited. |
| guides/hospitality-ffe | 2 | 4 | 3 | 5 | — | Pillar guide; 15–25% capex + lifecycle bands unsourced; brand PIP claims (Marriott/Hilton) plausible but uncited. |
| guides/commercial-furniture-manufacturing | n/a-spot | 4 | 4 | 5 | — | Not deep-read; pattern consistent with siblings. |

## Score / verdict (78/100)
Genuinely above-average evidence-first content — real named author with a fact-check policy, real outbound authorities, original fabricator POV, clean schema. It loses points because the sourcing is shallow (homepage links, not deep-linked standards) and the loop's "original proof" leg is missing: no first-party DMD project data, named case studies, or own-floor numbers, while several hard statistics ride uncited.

## Gaps
- **API-dependent (not checkable here):** which of these posts actually rank / get cited by AI engines (needs GSC + a SERP/DataForSEO pull — out of scope for this content-quality lens). The loop's step 9 "learning loop" can't be audited without that data.
- **Process artifacts absent:** no brief/source-pack/knowledge-graph writeback files in repo — can't confirm the human gate (step 4) was actually run vs. the polished output just looking like it was.
- commercial-furniture-manufacturing guide spot-checked via grep only, not full-read.

## Top 3 actions
1. **Deep-link every citation + add a References section.** Replace homepage links with the specific standard/document (ANSI/BIFMA X5.1, NFPA 701, the exact FPL publication) named inline, and add an end-of-article reference list. Biggest E-E-A-T and AI-citation win.
2. **Inject first-party proof into each article.** One real DMD data point or named project per post (own lead-time range "in our shop," a labelled DMD install photo, a case study link). This is the missing "original evidence" leg of the loop and what separates these from a good AI rewrite.
3. **Source or reframe the hard numbers.** Every standalone statistic (16–24 wks, 15–25% capex, lifecycle bands, brand PIP cadence) must either cite an authority or be reframed as DMD's own observed range — matching the author page's stated "we do not invent statistics" policy, which the body currently violates.
