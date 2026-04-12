# Content Quality Audit — DMD Furnishing

**Date:** 2026-04-10
**Scope:** Every user-facing page's body copy (excluding JSON-LD, metadata, and structural elements).
**Purpose:** Diagnostic document. No rewrites yet — produce a punch list so the human can approve or reject each change before any Edit happens.

## Scoring axes (1-5, 5 is best)

| Axis | What it measures |
|---|---|
| **Specificity** | Concrete nouns/verbs vs abstractions. "HPL tops on dresser casegoods" > "durable surfaces." |
| **Entity mentions** | Tier-1 source citations by name (BIFMA, NFPA 701, CAL 117-2013, ANSI/BIFMA X5.1, Crypton, AHLA, AWI). |
| **Active voice %** | Share of sentences in active voice. Passive is flagged when it hides the actor. |
| **Fluff count** | Banned words present: `world-class`, `unparalleled`, `cutting-edge`, `seamlessly`, `leverage`, `transform` (generic), `innovative` (without novelty), `solutions` (generic), `state-of-the-art`, `best-in-class`. |
| **Snippet-bait opener** | Does the first paragraph directly answer the page's core question in 40-60 words? |
| **E-E-A-T** | Experience, Expertise, Authoritativeness, Trustworthiness signals — real-world examples, sourced claims, author attribution. |

---

## Page 1 — Homepage (`app/page.js`)

| Axis | Score | Notes |
|---|---|---|
| Specificity | 3/5 | Hero eyebrow "Custom Hospitality Furniture" is good. Trust bar stats are specific. But "Structured execution for demanding commercial work" (H2 on Why DMD) is vague. |
| Entity mentions | 2/5 | AHLA appears in FAQ only. No BIFMA, no NFPA 701, no CAL 117 anywhere visible on homepage. |
| Active voice % | 4/5 | Mostly active. "Every project begins with a consultation" is fine. |
| Fluff count | 5/5 | Clean. No banned words. |
| Snippet-bait opener | 2/5 | Hero lede is CTA-y, not snippet-answerable. Doesn't answer "what does DMD do?" directly. |
| E-E-A-T | 3/5 | Stats (rooms, projects, products) suggest experience. No named clients or case specifics. |

### Specific sentences flagged

**Hero lede (line ~123):**
> "From boutique hotels to national chains — we handle design, manufacturing, and installation so your renovation stays on time, on brand, and on budget. Based in Foxboro, MA — serving clients nationwide."

**Problem:** Marketing-y opener. Doesn't answer "what does DMD Furnishing do?" in a snippet-extractable way.
**Rewrite suggestion:** "DMD Furnishing is a commercial furniture manufacturer in Foxboro, Massachusetts, specializing in hospitality FF&E — custom casegoods, seating, and millwork for hotels, restaurants, offices, and institutional projects from boutique properties to national chains. Design, manufacturing, and installation coordinated by one team."

**Why DMD H2 (line ~265):**
> "Structured execution for demanding commercial work."

**Problem:** Vague, noun-heavy, brochure-speak. "Structured execution" could mean anything.
**Rewrite suggestion:** "Six specialized capabilities behind every DMD project." Or, better: rename to an answer-style H2 like "What Sets DMD Furnishing Apart From Other FF&E Vendors?"

**Why DMD card copy (lines ~19-25):**
> "Structured execution for demanding commercial work."
> "Premium design balanced with practical manufacturing choices and budgets."
> "Hospitality-Grade Durability — Furniture engineered for high-traffic environments and repeat renovation cycles."

**Problem:** Two of six cards use generic language ("premium," "demanding," "high-traffic"). Missing entity grounding.
**Rewrite suggestion:** Replace "Hospitality-Grade Durability" with "BIFMA Contract-Grade Specification" and ground the description in specific durability tests: "Every casegood specified to BIFMA contract-grade minimums, the commercial furniture industry's durability standard, so pieces survive 7-10 year renovation cycles without failure."

**Homepage FAQs (lines ~324-350):**
- FAQ 1 ("What is FF&E") — Good, cites AHLA, specific 15-25% figure. Keep.
- FAQ 2 ("What types of commercial spaces") — Fact-heavy. Good.
- FAQ 3 ("How does the custom furniture process work") — "Every project begins with a consultation to align on scope, budget, and timeline." Good but could add a concrete lead-time anchor ("typical projects run 9-12 weeks after spec lock").
- FAQ 4 ("Value engineering") — Good definition.
- FAQ 5 ("How much does custom hospitality furniture cost") — "Costs vary based on scope, materials, room count, and customization level." This is the weakest answer. **Flag: expand with a qualitative range grounded in category ("hotel guestroom packages typically run per-key; restaurant banquettes typically run per linear foot") without quoting specific dollar figures.**

---

## Page 2 — About (`app/about/page.js`)

| Axis | Score | Notes |
|---|---|---|
| Specificity | 3/5 | Materials section is specific (HPL, veneer, powder-coated steel). Story section is generic. |
| Entity mentions | 1/5 | No BIFMA, NFPA, CAL 117, ANSI, AHLA anywhere on About page. |
| Active voice % | 4/5 | Clean active voice throughout. |
| Fluff count | 5/5 | No banned words. |
| Snippet-bait opener | 2/5 | Hero lede is fine but the Story section's "DMD Furnishing was established with a simple goal" is brochure-y. |
| E-E-A-T | 2/5 | "Years of hospitality-focused sourcing" is unsubstantiated. No project counts, no named clients, no founding year. |

### Specific sentences flagged

**Story section (line ~107):**
> "DMD Furnishing was established with a simple goal: make commercial furniture sourcing more dependable and more transparent."

**Problem:** Could describe any furniture manufacturer. No hook. No "why DMD, specifically."
**Rewrite suggestion (conservative — no invented facts):** "DMD Furnishing exists because hospitality FF&E procurement is where most hotel and restaurant projects lose time and money. We run manufacturing, sourcing, delivery, and installation from one team so owners and designers don't have to coordinate five vendors to get a guestroom package delivered on schedule."

**Differentiators list (lines ~7-14):**
- "In-House Design Team — Concepts translated into production-ready specifications by people who understand manufacturing constraints." **Good — specific capability.**
- "Dual Manufacturing — Domestic production for speed and revisions. Overseas sourcing for scale and material flexibility." **Excellent — specific trade-off named.**
- "Dedicated Project Managers — One point of contact from initial quote through final installation — no handoffs." **Good.**
- "Value Engineering Built In" — **Good but could cite BIFMA compliance as the floor it can't drop below.**
- "Material Sourcing Relationships — Years of hospitality-focused sourcing means access to commercial-grade materials at competitive pricing." **Weak — "years" and "competitive pricing" are unverifiable. Rewrite: "Established supplier relationships for BIFMA contract-grade casegoods, NFPA 701-compliant upholstery, and CAL 117-2013 foam — so sourcing a compliant package doesn't mean restarting vendor qualification for every project."**
- "Quality Control Alignment — Specifications confirmed before production, inspected before shipment, verified at installation." **Excellent.**

**Materials section intro (line ~167):**
> "Commercial furniture demands materials selected for durability, performance, and visual consistency across repeat renovation cycles."

**Problem:** Fine, but "demands" is filler. Could name the durability test instead.
**Rewrite suggestion:** "Commercial-grade substrates, contract-rated fabrics, and hardware selected against BIFMA cycle testing — the materials every casegood and seating piece on this site is built from."

**Materials section cards (lines ~16-22):** All solid. Keep.

**About FAQ 4 ("How long does a typical project take") line ~44:**
> "Most projects run 9–12 weeks from approved specifications to delivery."

**Problem:** This is specific and defensible — keep. But verify with DMD that 9-12 weeks is typical; if actual typical is longer (say 12-16 weeks), soften.

---

## Page 3 — Services (`app/services/page.js`)

| Axis | Score | Notes |
|---|---|---|
| Specificity | 4/5 | Service grid is fact-heavy and specific. Hero lede is concrete. |
| Entity mentions | 1/5 | No BIFMA, NFPA, CAL 117, ANSI, AHLA. |
| Active voice % | 4/5 | Clean. |
| Fluff count | 4/5 | "Full-Spectrum FF&E Services" is mild fluff but acceptable as an H2. |
| Snippet-bait opener | 3/5 | Hero lede is descriptive but doesn't answer a specific question. |
| E-E-A-T | 3/5 | Service descriptions demonstrate expertise. No sourced claims. |

### Specific sentences flagged

**Hero H1 (line ~421):**
> "From Concept to Installation. One Team. One Process."

**Assessment:** This is a good H1 — memorable, specific to DMD's positioning, not generic. Keep.

**Services Grid H2 (line ~457):**
> "Full-Spectrum FF&E Services"

**Problem:** "Full-Spectrum" is soft fluff.
**Rewrite suggestion:** "Six Services That Cover Every FF&E Phase." This also introduces a specific number which is more snippet-extractable.

**Hero lede (line ~426):**
> "End-to-end furniture solutions for hotels, restaurants, healthcare, and commercial spaces — design, manufacturing, logistics, and installation managed under one roof."

**Problem:** "Solutions" is a mildly generic word. "Under one roof" is a good specific claim.
**Rewrite suggestion:** "End-to-end FF&E for hotels, restaurants, healthcare facilities, and commercial spaces — design, manufacturing, logistics, and installation managed by one team under one roof in Foxboro, Massachusetts."

**Add (suggestion):** A sentence naming BIFMA as the durability floor for all services would strengthen E-E-A-T. Example: "Every service on this page works to the BIFMA contract-grade standard — the industry durability baseline for commercial furniture."

---

## Page 4 — /products (`app/products/page.js`)

| Axis | Score | Notes |
|---|---|---|
| Specificity | N/A | Now renders ProductCatalog alone (I removed the earlier unstyled intro that broke the UX). The CatalogHero provides the title and description. |
| Entity mentions | N/A | The FAQPage schema still includes the rendered answers, but they no longer show on the page (intentional — invisible SEO). |
| Active voice % | N/A | |
| Fluff count | 5/5 | Clean. |
| Snippet-bait opener | 3/5 | CatalogHero description is snippet-extractable. |
| E-E-A-T | 3/5 | Product count and breadth demonstrate experience. |

**Note:** The visible /products intro section was removed after the user correctly flagged it as a UX mistake. The FAQPage schema (invisible JSON-LD) remains.

**Recommendation:** If we want visible long-form content on /products, it must live in the **CatalogHero description field** (already specific) or a new styled section **below** ProductCatalog matching the design language — NOT a raw section above the hero.

---

## Page 5 — Category pages (`lib/place-content.js` + CategoryContentBlock)

| Axis | Score | Notes |
|---|---|---|
| Specificity | 5/5 | Highest-scoring surface on the site. Every claim is grounded in a material, standard, or specific use case. |
| Entity mentions | 5/5 | BIFMA, NFPA 701, CAL 117-2013, ANSI/BIFMA X5.1, Crypton Health, Wyzenbeek — all cited by name. |
| Active voice % | 4/5 | Mostly active. A few instances of passive ("is engineered," "is specified") where the actor is understood. |
| Fluff count | 5/5 | Zero banned words. |
| Snippet-bait opener | 4/5 | Intros are strong but not always in the 40-60 word snippet range. |
| E-E-A-T | 5/5 | Technical authority is explicit. No vague claims. |

### Claims that need user verification (flagged elsewhere, repeated here for one-stop review)

1. `residential.materials`: "eight-way hand-tied or sinuous spring systems on premium pieces" — verify DMD does premium residential spring construction.
2. `lobby-area.buyingGuide[1]`: "ADA-compliant transaction heights" — verify DMD routinely builds ADA-compliant reception desks.
3. `hotel.buyingGuide[3]`: "eight-to-sixteen-week production lead times" — verify DMD's typical hotel casegoods lead time.
4. `educational-facilities.buyingGuide[3]`: "ten-to-fifteen-year frame warranties" — verify DMD's actual structural warranty terms.
5. `office.buyingGuide[4]`: "ten to fifteen percent attic stock" — verify DMD advises/stocks this for clients.

**Recommendation:** Do NOT rewrite this surface. It is the gold standard for the rest of the site — use these as the template for quality when editing other pages. Just confirm/soften the 5 claims above.

---

## Page 6 — Contact (`components/contact/ContactPage.js`)

| Axis | Score | Notes |
|---|---|---|
| Specificity | 4/5 | Address, phone, email, hours all specific. New map embed is good. |
| Entity mentions | N/A | Contact page isn't the place for standards citations. |
| Active voice % | 5/5 | Clean. |
| Fluff count | 5/5 | Clean. |
| Snippet-bait opener | 3/5 | Doesn't need to be snippet-optimized. |
| E-E-A-T | 4/5 | Physical address + Google Map embed boost trust significantly. |

**No changes recommended.** Contact pages should be minimal and fact-heavy. This one is.

---

## Page 7 — /author/dmd-furnishing-editorial (NEW)

| Axis | Score | Notes |
|---|---|---|
| Specificity | 5/5 | References BIFMA, NFPA 701, CAL 117-2013, ANSI/BIFMA X5.1, AHLA, BIFMA.org as external links. |
| Entity mentions | 5/5 | All major tier-1 standards cited. |
| Active voice % | 5/5 | Clean. |
| Fluff count | 5/5 | Clean. |
| Snippet-bait opener | 5/5 | Opening paragraph directly states the editorial mission in ~50 words. |
| E-E-A-T | 5/5 | Backs the Person schema on all 6 blog posts. Explicit "How we fact-check" section builds trust. |

**No changes recommended.** New page, already at quality bar.

---

## Page 8 — Blog posts

### `what-is-ffe-hospitality` (USER EDITED live during this session)

| Axis | Score | Notes |
|---|---|---|
| Specificity | 5/5 | Question-format H2s, snippet-bait openers, concrete definitions. |
| Entity mentions | 4/5 | AHLA external link. Could add BIFMA reference in "What Is Included" section. |
| Active voice % | 5/5 | Clean. |
| Fluff count | 5/5 | Clean. |
| Snippet-bait opener | 5/5 | Every H2 has a 40-60 word answer paragraph. This is the template. |
| E-E-A-T | 5/5 | Strong — TOC navigation, authoritative definition, sourced context. |

**No changes recommended.** This is the template for the other 5 blog posts.

### `hotel-guestroom-furniture-checklist` (USER EDITED live during this session)

| Axis | Score | Notes |
|---|---|---|
| Specificity | 5/5 | TOC with question H2s, QA audit framing, Hotel Business external citation. |
| Entity mentions | 4/5 | Hotel Business cited. Could add BIFMA for durability claims. |
| Active voice % | 5/5 | Clean. |
| Fluff count | 5/5 | Clean. |
| Snippet-bait opener | 5/5 | Strong. |
| E-E-A-T | 5/5 | QA audit framing is excellent industry context. |

**No changes recommended.** Same template as above.

### Blog posts 3-6 (pending user edits)

| File | Status |
|---|---|
| `value-engineering-commercial-furniture` | Schema done (Person + FAQPage + HowTo). Body content Phase 6 NOT yet applied this session. |
| `hpl-veneer-solid-wood-hotel-casegoods` | Schema done (Person + FAQPage). Body content Phase 6 NOT yet applied. |
| `restaurant-seating-guide` | Schema done (Person + FAQPage). Body content Phase 6 NOT yet applied. |
| `ffe-procurement-timeline` | Schema done (Person + FAQPage + HowTo). Body content Phase 6 NOT yet applied. |

**Recommendation:** The user has been applying Phase 6 edits manually to files 1 and 2 during this session. They should continue on 3-6 using the same pattern (TOC nav, question H2s, 40-60 word snippet openers, tier-1 external citations, cross-links to sibling posts). If they want an agent to draft the starting point, dispatch one with explicit instructions to follow the exact structure of blog 1.

---

## Summary & Priorities

### High-priority rewrites (immediate impact)

1. **Homepage hero lede** — Convert from CTA-y marketing copy to snippet-extractable answer.
2. **Homepage Why DMD section** — Replace "Structured execution" + generic card descriptions with BIFMA/NFPA-grounded specifics.
3. **Homepage FAQ 5 ("cost")** — Expand with qualitative category ranges.
4. **About Story section** — Replace "simple goal" brochure opener with concrete "why DMD exists" framing.
5. **About Differentiator #5 ("Material Sourcing Relationships")** — Ground the claim in BIFMA / NFPA / CAL 117 supplier compliance instead of "years" of experience.
6. **Services Grid H2** — "Full-Spectrum FF&E Services" → "Six Services That Cover Every FF&E Phase."

### Medium-priority rewrites

7. **Services Hero lede** — Add "under one roof in Foxboro, Massachusetts" specificity.
8. **About Materials section intro** — Name the BIFMA cycle test framing.
9. **Homepage Why DMD H2** — Convert to question format.

### Low-priority (polish)

10. **Add BIFMA reference** in the About Differentiators section cards.
11. **Add tier-1 external links** to About page where industry standards are referenced.

### Things that are already at quality bar — DO NOT REWRITE

- All 7 category page content blocks (`lib/place-content.js`)
- `what-is-ffe-hospitality` blog post (user-edited)
- `hotel-guestroom-furniture-checklist` blog post (user-edited)
- Author entity page (new)
- Homepage FAQ 1-4
- Contact page
- Services grid descriptions (most of them)

### Claims requiring user verification before production

1. "eight-way hand-tied or sinuous spring systems" (residential category)
2. "ADA-compliant transaction heights" on custom reception desks (lobby-area category)
3. "eight-to-sixteen-week production lead times" (hotel category)
4. "ten-to-fifteen-year frame warranties" (educational-facilities category)
5. "ten to fifteen percent attic stock" (office category)
6. "9-12 weeks from approved specifications to delivery" (About FAQ 4)
7. "stock lines that can ship faster" — whether DMD actually has stock inventory alongside custom

---

## Banned Words Audit (site-wide)

Scanned for: `world-class`, `unparalleled`, `cutting-edge`, `seamlessly`, `leverage`, `transform` (generic), `innovative` (without specific novelty), `solutions` (generic), `state-of-the-art`, `best-in-class`.

| Term | Count | Files |
|---|---|---|
| `world-class` | 0 | — |
| `unparalleled` | 0 | — |
| `cutting-edge` | 0 | — |
| `seamlessly` | 0 | — |
| `leverage` (verb) | 0 | — |
| `transform` (generic) | 0 | — |
| `state-of-the-art` | 0 | — |
| `best-in-class` | 0 | — |
| `solutions` (generic) | present in 5+ files | homepage, about, services, metadata defaults |

**Findings:** The site is remarkably clean of marketing fluff. The only generic word appearing with any frequency is "solutions," which is used in the context of "FF&E solutions" — a defensible domain phrase, not empty marketing copy. **No blanket bans recommended.** Individual "solutions" instances flagged above can be tightened one at a time.

---

## Execution plan if the user approves

1. **Homepage rewrites (1-3 above)** — 4 sentence-level edits in `app/page.js`. Low risk.
2. **About rewrites (4-5 above)** — 2 edits in `app/about/page.js`. Low risk.
3. **Services edits (6-8 above)** — 2 edits in `app/services/page.js`. Low risk.
4. **Verify user's claims (1-7 under "Claims requiring verification")** — Ask user to confirm/soften. Edit `lib/place-content.js` and `app/about/page.js` based on answers.

Total file count: 3 files, ~11 targeted edits. Each edit is a single sentence or short paragraph. No new content generation, no body-level rewrites, no design changes.

**Before executing any of these, get user approval of this audit document.**
