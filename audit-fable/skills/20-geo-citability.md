# Skill Audit 20 — geo-citability

**Skill purpose:** Score how citation-ready the content is for AI answer engines (ChatGPT, Claude, Perplexity, Gemini). AI engines preferentially extract passages that are self-contained, fact-dense, definition-led, and ~134-167 words.

**Target:** DMD Furnishing — B2B hospitality FF&E manufacturer. 4 representative assets scored against the skill's 5-category rubric (Answer Block 30% / Self-Containment 25% / Structure 20% / Stats 15% / Uniqueness 10%).

**Date:** 2026-06-10

**Status:** Complete (live :3006 HTML + source verified). No API needed — this lens reads rendered content directly.

---

## Citability scorecard

Pages scored from live rendered HTML at `http://localhost:3006`. Sub-scores 0-100; "score" column is the weighted block average.

| Page | Quotable answers | Sourced stats | Definitions | Structure | Score |
|---|---|---|---|---|---|
| `/blog/what-is-ffe-hospitality` | 92 | 45 | 95 | 90 | **82** |
| `/guides/hospitality-ffe` | 88 | 48 | 90 | 92 | **80** |
| `/` (homepage) | 70 | 40 | 78 | 80 | **66** |
| `/products/hotel` | 22 | 10 | 15 | 60 | **31** |

**Site weighted average across 4 assets: ~65/100.** The two long-form editorial assets are genuinely strong; the product catalog page drags the average down hard.

---

## Most / least citable assets

**MOST citable — `/blog/what-is-ffe-hospitality` (82/100).** Textbook GEO structure. Every H2 is a question that matches a real AI query ("What Is the Difference Between FF&E and OS&E?"), and each section opens with a 1-2 sentence standalone definition before the supporting detail. Real passage AI can lift verbatim:
> "FF&E (Furniture, Fixtures and Equipment) is the movable furniture, casegoods, seating, and fixtures that outfit a commercial hospitality building and are procured separately from the base construction."

It also ships a real comparison **table** (FF&E vs OS&E across 7 rows: full name, item type, examples, budget treatment, replacement cycle, procurement timing, standards body) — AI extracts table rows with high accuracy. Definition-led + question headings + table = the exact pattern the skill rewards. Only weak spot: its quantified claims aren't attributed.

**LEAST citable — `/products/hotel` (31/100).** It is a filterable catalog grid, not prose. The "content" is a product list ("Hotel 2-Seater Table — Breakfast Area › Dining Tables", "Hotel King Bed Frame - MDF"). No definitions, no standalone-quotable sentences, no statistics, no answer blocks. An AI engine has nothing to extract and present as an answer. This is expected for a catalog page, but it means the entire `/products/*` tree (the largest part of the site by URL count) contributes near-zero citability. The only prose is a single CTA line: "Our FF&E project management team can guide your selection from specification through delivery."

---

## Findings

| Severity | Page | Issue | Fix |
|---|---|---|---|
| 🟠 high | guide + homepage + blog (3×) | **The "15-25%" stat is uncited everywhere.** "FF&E is typically 15 to 25 percent of a hotel project's total capital cost" (`app/guides/hospitality-ffe/page.js:172`), repeated on homepage FAQ (`app/page.js:115`) and blog (`app/blog/.../page.js:122,481`). No named source, study, or date on any of the three. Skill: source citations get cited 20-25% more often by Perplexity/ChatGPT; this is the single biggest stat on the site and it's unattributed. | Attach a named source + year to the canonical instance (e.g. an HVS / STR / industry development-cost reference), then keep wording identical across all 3 so AI sees one consistent, sourced claim. |
| 🟠 high | `/products/*` tree | Catalog pages have **no extractable prose** — zero definitions, stats, or answer blocks (`/products/hotel` scored 31). Largest URL group on the site, near-zero citability. | Add a 120-160 word definition-led intro per category page ("Hotel guestroom casegoods are…") plus a short spec/FAQ block. Lifts the whole tree from invisible to citable. |
| 🟡 medium | all long-form | **Vague quantifiers replace specifics.** Lifecycle bands ("6 to 8 year casegoods cycles"), "save 10 percent", "fails within four years" are good, but brand-standard and durability claims lean on "typically", "generally", "substantially longer" with no figures or named standard numbers. Statistical Density scored 40-48 (the weakest category sitewide). | Convert "contract-grade lasts substantially longer" → a number; cite the actual standard codes (e.g. named flammability / seating cycle-count standards) the guide already alludes to. |
| 🟡 medium | blog + guide | **Authority is named but not quoted.** "The American Hotel & Lodging Association consistently highlights FF&E investment as a key driver…" — named entity, but no quote and no stat. Skill: authority quotations lift citation up to 115% in some categories. | Add one short attributed quotation or a specific AHLA/brand figure rather than a paraphrase. |
| 🟡 medium | homepage | Strong hero stats ("285+ Rooms Delivered", "7 Verticals", "Multi-State — FL · ME · MD · MA") are **first-party and unique** but live as disconnected UI chips, not in a quotable sentence. AI can't lift "285+" as a standalone fact without a subject. | Wrap them in one self-contained sentence: "DMD Furnishing has delivered and installed 285+ guestrooms across FL, ME, MD, and MA." |
| 🟢 pass | blog + guide | Question-based H2s, definition-first openings, real comparison table, FAQ blocks, freshness dates ("Updated April 10, 2026"), named author/editorial entity, internal cross-links. These are exactly what the rubric rewards — keep this template and apply it outward. | Use the blog/guide as the citability template for weaker pages. |

---

## Score

**65/100** (4-asset weighted average)

Two editorial assets are strong (80-82) and would already get cited for FF&E definitional queries. The score is held down by (a) every key statistic being unsourced, and (b) the large product/catalog tree producing almost no extractable content. Fix those two and the site moves into the high-70s.

Category read across the site: Answer Blocks and Definitions are the strengths; **Statistical Density (40-48) and source attribution are the consistent weakness** — DMD has the facts but doesn't cite where they come from.

---

## Top 3 actions

1. **Source the "15-25%" stat once, propagate identically.** It's the most-repeated number on the site (homepage + guide + blog) and currently has zero attribution. Add one named source + year and unify the wording. Highest-leverage single fix. (+5-8 pts)
2. **Add a 120-160 word definition-led intro + mini-FAQ to each `/products/[place]` and `/products/[place]/[type]` page.** Turns the largest, currently-uncitable part of the site into AI-extractable answer blocks. (+10 pts on that tree)
3. **Quantify or attribute the vague claims in the long-form guides** — replace "substantially longer", "typically", "consistently highlights" with real numbers or one named-source quote (AHLA, brand PIP standard, a cited durability standard). Targets the weakest rubric category (Stats). (+4-6 pts)
