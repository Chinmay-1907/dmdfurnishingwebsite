# Audit 23 — geo-content (agent)

**Lens:** E-E-A-T for AI citation readiness (is content structured so AI engines can quote it)
**Target:** DMD Furnishing — 6 blog posts, 2 guides, 1 author page (source `C:\Users\chin\dmdfurnishingwebsite-fable\app`, live `http://localhost:3006`)
**Date:** 2026-06-10
**Status:** Complete (source + live HTML verified; no external API needed)

## What this lens audits

Whether an AI engine (ChatGPT, Perplexity, Claude, Google AI Overviews) can lift a clean, trustworthy answer from a page and feel safe attributing it. Checks: answer-first paragraphs, factual claims with sources, AI-liftable definitions, statistics (sourced vs. bare), author E-E-A-T (real bio, credentials, fact-check policy), freshness/dates, and FAQ blocks.

## Method

Read 4 articles in full (`what-is-ffe-hospitality`, `value-engineering-commercial-furniture`, `hpl-veneer-solid-wood-hotel-casegoods`, plus the `hospitality-ffe` guide head) and the author page source; spot-checked `restaurant-seating-guide` and `ffe-procurement-timeline` for stats and citations. Confirmed against live SSR HTML on :3006 that answer callouts, `data-speakable` markup, FAQPage/BlogPosting schema, and dates all render server-side. Grepped all 8 articles for bare percentage/dollar stats and counted external citations per page.

## Findings (table)

| Severity | Article / Page | Issue | Fix |
|---|---|---|---|
| 🟠 high | `blog/what-is-ffe-hospitality` (body + FAQ schema) | The headline number "FF&E typically represents **15 to 25 percent** of total construction costs" is stated as fact with no source. It is the single most quotable stat on the site and appears in both prose and FAQ schema, so an AI will lift it and attribute it to DMD with no authority behind it. | Attach a citable source inline (e.g. HVS, ISHC, or a brand FF&E standard) or soften to "in our project experience, FF&E commonly runs roughly 15–25%." Same applies to "10 to 15 percent contingency". |
| 🟡 medium | `blog/restaurant-seating-guide` | Dimensional specs ("15 to 18 square feet per seat", seat heights 17–19 / 24–26 / 28–30 in) are industry-standard but presented bare. AI may quote them as DMD claims without a benchmark anchor. | Add one line citing a recognized source (e.g. NRA / building-code occupancy guidance) so the numbers read as referenced, not invented. |
| 🟡 medium | All 6 blog posts | Author shown only as "DMD Furnishing Editorial Team" — an Organization in schema, not a named Person with credentials. Strong for trust, weaker for the "expertise" signal AI weighs for a named expert quote. | Optional: add one named reviewer (e.g. "Reviewed by [Name], 20 yrs commercial FF&E") to lift the Expertise dimension. Current team approach is defensible; this is upside, not a defect. |
| 🟡 medium | `blog/hotel-guestroom-furniture-checklist`, `restaurant-seating-guide`, `ffe-procurement-timeline` | Only 1 external citation each. Definitions and process steps are excellent, but thin outbound sourcing caps the Authoritativeness signal versus the 2–3 citations on the stronger posts. | Add 1–2 more authoritative outbound links (AHLA, AWI, NFPA, ICC) where claims invite them. |
| 🟢 pass | All 8 articles | Answer-first done right: every post opens with an `AnswerCallout` (`role="doc-subtitle"`, `.answer-callout`) plus a `data-speakable="lede"` one-paragraph definition, then H2s phrased as questions. Verified live: 2 answer-callouts, lede + 4 answer speakable nodes render in SSR HTML. This is textbook AI-liftable structure. |
| 🟢 pass | All 8 articles | FAQ blocks present as both visible Q&A and `FAQPage` JSON-LD with `data-speakable="answer"`; definitions ("FF&E stands for…", "Laminate/Veneer; edge-banded MDF means…") are self-contained and extractable. |
| 🟢 pass | `author/dmd-furnishing-editorial` | Real author page with a **published fact-check / corrections policy** ("How We Fact Check Our Work… We do not invent statistics… we describe the range rather than quoting a figure we cannot verify"), `knowsAbout` list, `ProfilePage` + `Organization` schema, `sameAs` LinkedIn, NAP, and an article index. This is the strongest single GEO trust asset on the site. |
| 🟢 pass | All articles | Freshness signals solid: visible Published + Updated `<time>` stamps, `datePublished`/`dateModified` in schema, author page `dateModified: 2026-06-10`. All content dated 2026 (≤3 months) = full freshness. |
| 🟢 pass | Stronger posts | `value-engineering` cites AIA, NFPA, ADA; `hpl-veneer` cites USDA Forest Products Lab + AWI; `what-is-ffe` cites AHLA + Hospitality Design. Qualitative claims are well-anchored — the gap is strictly on the numeric stats above. |

## Citation-readiness scorecard

| Factor | Verdict |
|---|---|
| Answer-first paragraphs | **Strong** — AnswerCallout + speakable lede on all 8 |
| AI-liftable definitions | **Strong** — self-contained, term-first |
| FAQ blocks (visible + schema) | **Strong** — FAQPage JSON-LD on every article |
| Sourced statistics | **Weak** — flagship 15–25% stat is bare; dimensional specs unanchored |
| Qualitative claims sourced | **Strong** — AIA/NFPA/ADA/AHLA/USDA-FPL/AWI cited |
| Author E-E-A-T (bio + policy) | **Strong** — real bio + published fact-check policy (rare) |
| Named-expert / credentials | **Moderate** — team byline, no named person/credential |
| Freshness / dates | **Strong** — visible + schema dates, all 2026 |
| Outbound citation depth | **Moderate** — 2–3 on best posts, 1 on three posts |
| Speakable markup for voice/AI | **Strong** — `data-speakable` on lede + answers, verified live |

## Score: 84 / 100

Experience 20/25 · Expertise 20/25 · Authoritativeness 21/25 · Trust 23/25. Near the top of what a B2B manufacturer site reaches for AI citation. The only thing holding back a 90+ is bare numbers: the content does almost everything right (answer-first, FAQ schema, speakable, fact-check policy, fresh dates) but its most quotable statistics carry no source, which is exactly what an AI engine treats as a low-trust attribution.

## Top 3 actions

1. **Source the 15–25% FF&E-cost stat** (and the 10–15% contingency) in `what-is-ffe-hospitality` — inline citation to HVS/ISHC/AHLA or reword as stated experience. Highest leverage: it is the most-quoted number on the site and currently sourceless in both prose and schema.
2. **Anchor the restaurant dimensional specs** in `restaurant-seating-guide` with one benchmark reference so AI quotes them as referenced industry figures, not DMD inventions.
3. **Raise outbound citations to 2+ on the three thin posts** (`hotel-guestroom-furniture-checklist`, `restaurant-seating-guide`, `ffe-procurement-timeline`) and optionally add one named reviewer credential to lift the Expertise signal across the blog.
