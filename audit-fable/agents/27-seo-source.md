# Audit 27 — seo-source (agent)

**Lens:** Phase-3 evidence sort of published claims (article-loop evidence layer — confident / needs_proof / avoid / human_needed)
**Target:** DMD Furnishing — published factual claims across blog (6), guides (2), homepage, about, services
**Date:** 2026-06-10
**Status:** Complete (source-only; no GSC/external-fact-check API needed for this lens)

## What this lens audits

The seo-source lens normally builds the evidence pack for a NEW article: every number, stat, lifecycle band, and spec gets sorted into four buckets before drafting, so nothing un-sourced gets written. Here the same sort runs in reverse — applied to claims **already live on the site**. The question for each claim: could DMD defend this number if a buyer, a brand auditor, or an AI search engine asked "says who?"

Buckets:
- ✅ **confident** — sourced on-page, or self-evidently true / non-falsifiable practice statement.
- ⚠️ **needs_proof** — stated as hard fact, plausible, but uncited. A reader cannot verify it. Citation risk.
- ⛔ **avoid** — specific number presented as universal fact that varies widely in reality, or risks being wrong/misleading. Highest slop/liability risk.
- 🙋 **human_needed** — only DMD can confirm (first-party performance data, what's actually true about the company).

## Method

Read full source of the 4 highest-claim-density blog posts (`ffe-procurement-timeline`, `value-engineering-commercial-furniture`, `hpl-veneer-solid-wood-hotel-casegoods`, `restaurant-seating-guide`), both pillar guides (`hospitality-ffe`, `commercial-furniture-manufacturing`), the checklist post stat grid, `about/page.js`, `services/page.js`, and `app/page.js` trust bar + FAQ. Pulled every hard claim: numeric ranges, lifecycle bands, material specs, code/standard references, and first-party company claims. Grepped `app/` for "nationwide / 500-key / 15-25% / capex / rooms / projects". Sorted each. Note: the FAQ text in blog/guide pages is **duplicated verbatim into FAQPage schema** (`acceptedAnswer.text`), so any weak claim is double-exposed — once to readers, once to AI/rich-results crawlers.

## Claim evidence ledger

| # | Claim (verbatim/near) | Page | Bucket | Source on page? | Action |
|---|---|---|---|---|---|
| 1 | "285+ Rooms Delivered and Installed" (animated counter, `end={totalRooms \|\| 285}`) | `app/page.js:211` | 🙋 human_needed | No | DMD must confirm 285 is current + real. Hard-coded `\|\| 285` fallback fires if data missing — risk of showing an invented number. |
| 2 | "Multi-State … FL · ME · MD · MA" | `app/page.js:216` | 🙋 human_needed | No | Confirm DMD has shipped full-property installs in all four states. First-party, only DMD knows. |
| 3 | "installed nationwide" / "operators nationwide … across the United States" | `app/page.js:38,163,407`, `about:94`, `cfm guide:139` | ⚠️ needs_proof | No | If real projects are 4 states (claim #2), "nationwide … across the United States" overstates footprint. Reconcile, or soften to "delivery available nationwide." |
| 4 | "FF&E typically represents **15 to 25 percent** of total construction costs / total capital cost" | `app/page.js:115`, `what-is-ffe:122`, `hospitality-ffe guide:172` | ⚠️ needs_proof | No (no industry cite) | Round-number industry stat, stated 3× as fact + in schema. Add a 3rd-party cite (e.g. HVS/industry body) or qualify "varies widely." |
| 5 | "A full hotel renovation FF&E procurement typically runs **16 to 24 weeks**" (also in FAQ schema) | `ffe-procurement-timeline:104,176,451` | ⚠️ needs_proof | No | Defensible as DMD experience; frame as "in our experience" or cite. Currently bare fact in schema. |
| 6 | Phase lead-time bands: "Standard … 6 to 10 weeks", "Custom … 10 to 14 weeks", "Highly custom … 14 to 20 weeks or longer" | `ffe-procurement-timeline:273-283` | ✅ confident | Implicit (DMD's own production) | First-party manufacturer estimate — defensible. Optionally label "DMD lead-time guide." |
| 7 | Lifecycle bands: "Upper-upscale/luxury: **6 to 8 yr** casegoods, **4 to 5 yr** soft seating" … through "Economy/midscale: 10+ yr" | `hospitality-ffe guide:243-260` | ⛔ avoid | No | Four precise year-bands presented as universal fact, uncited. Varies by occupancy/brand. High slop risk + double-exposed (also implied in FAQ). Cite an industry source or reframe as "general guidance, varies." |
| 8 | "Brand refresh programs from **Marriott, Hilton, IHG, and Hyatt** typically require soft goods refreshes at **five-year intervals**" | `hospitality-ffe guide:248-252` | ⛔ avoid | No | Names specific brands + a specific interval as fact. PIP cycles are confidential/variable. Wrong-or-unverifiable + brand-name liability. Generalize: "major brands publish PIP refresh cadences (confirm per flag)." |
| 9 | "A Marriott Autograph guestroom package costs **roughly double** a Fairfield Inn package" | `hospitality-ffe guide:363-365` | ⛔ avoid | No | Specific cross-brand cost ratio, uncited, names two brands. Reframe to tier language ("upper-upscale ≈ 2× select-service"). |
| 10 | "a manufacturer … can typically find **8 to 15 percent** savings through substitutions" (VE) | `hospitality-ffe:377`, `cfm guide:391` | ⚠️ needs_proof | No | DMD's own VE claim — make first-party ("we typically find…") so it's a defensible experience claim, not a bare stat. |
| 11 | "Residential-grade pieces … fail within **four years** instead of the **ten years** … Lifecycle cost is **triple**." | `hospitality-ffe guide:432-435` | ⛔ avoid | No | Three hard numbers (4yr / 10yr / 3×) stacked, all uncited. "Lifecycle cost is triple" is an outcome-claim with no methodology. Soften or cite. |
| 12 | "rated for **100,000+ double rubs**" (contract-grade upholstery) | `restaurant-seating-guide:198` | ⚠️ needs_proof | No | Real industry metric (Wyzenbeek/Martindale exist) but the threshold is stated bare. Cite the standard (ACT/Wyzenbeek) — easy upgrade to confident. |
| 13 | "may turn a seat **300 to 400 times per week**" | `restaurant-seating-guide:411` | ⚠️ needs_proof | No | Plausible but uncited round figure. Frame as illustration ("a busy seat can turn…") or cite. |
| 14 | "**15 to 18 square feet** per seat" (casual dining); ADA "**at least 5 percent** of tables accessible"; seat heights 24-26"/28-30", counters 34-36"/40-42"; aisles 36"/24"; knee clearance 27"/30"/19"; foam "**1.8 lb density** minimum" | `restaurant-seating-guide:111,388,396,432` etc. | ✅ confident | Partial (ADA + National Restaurant Assn linked) | ADA dimensions are code-true and ADA.gov is linked — confident. Add a source for the 15-18 sq ft and 1.8 lb foam figures (currently uncited but standard). |
| 15 | Veneer "typically **0.5 mm to 3 mm** thick"; HPL/veneer/solid-wood durability + moisture comparison table | `hpl-veneer:269`, table `387-394` | ✅ confident | FPL (USDA Forest Products Lab) + AWI linked | Material facts are accurate and the post links primary references (FPL, AWI). Strongest-sourced page on the site. Keep as model. |
| 16 | "CAL 133 in California and NFPA standards elsewhere" (fire); ADA height "no higher than 34 inches" | `value-engineering:368`, `restaurant-seating:402` | ✅ confident | NFPA + ADA linked | Named standards with authoritative outbound links. Confident. |
| 17 | Construction standards refs ("contract-grade", "vertical flame propagation", "architectural woodwork quality standards") deliberately **un-named** | `cfm guide:231-254`, `hospitality-ffe:280-300` | ✅ confident | N/A (generic by design) | Safe — describes standard categories without claiming a specific cert. No risk, but also no E-E-A-T lift; naming BIFMA/ANSI/NFPA 260/261 would upgrade authority. |
| 18 | Company process claims: "in-house design team", "two manufacturing paths (Foxboro + overseas partners)", "one PM start to finish", "three-point QC", "reply within one business day" | `about:8-13`, `services`, guides | 🙋 human_needed | No | Operational truths only DMD can confirm. Verify each is accurate before treating as confident (esp. "reply within one business day" = a service promise). |
| 19 | "11+ Essential Pieces Per Room / 4 Core Categories / 100% Custom Sizing Available" (stat grid) | `hotel-guestroom-checklist:175-185` | ✅ confident | Self-evident from article | Derived from the checklist itself; low risk. "100% custom sizing" is a capability claim — confirm with DMD (minor human_needed). |
| 20 | "FF&E typically **15 to 25%**" appears identically in homepage FAQ schema, what-is-ffe schema, and guide body | schema blocks across 3 pages | ⚠️ needs_proof | No | Same un-cited stat is now in **machine-readable FAQPage schema** 3×, which is what AI engines lift verbatim. Fixing #4 fixes the schema exposure too. |

## Findings (risk summary by severity)

**🔴 Critical (fix first) — bare numbers stated as universal fact, no source, high "wrong-or-unverifiable" risk:**
- **Claims #7, #8, #9, #11** (all in the `hospitality-ffe` guide): lifecycle year-bands, brand-specific PIP intervals, the "Marriott Autograph = 2× Fairfield" cost ratio, and the "4yr/10yr/triple cost" durability math. These name real brands and assert precise numbers an auditor could disprove. This one guide carries most of the site's citation risk.
- **Claim #1** (`285+` rooms with `|| 285` hard-coded fallback): if the data source is empty, the site silently displays an unverified number. A first-party performance counter must never fall back to a guessed value.

**🟠 High — first-party / footprint claims only DMD can confirm:**
- **#2, #3** "nationwide / across the United States" vs the concrete "FL · ME · MD · MA" four-state counter. These contradict each other in tone. AI engines and buyers notice "nationwide" next to a 4-state list.
- **#18** operational promises ("reply within one business day", "in-house design team", dual-manufacturing). Confirm true before they read as fact.

**🟡 Medium — plausible but uncited industry stats (easy citation upgrades):**
- **#4/#20** 15-25% FF&E cost share (3× + in schema), **#5** 16-24 week timeline, **#10** 8-15% VE savings, **#12** 100k double rubs, **#13** 300-400 turns/week, **#14** 15-18 sq ft + 1.8 lb foam. None are likely *wrong*; they just have no "says who." Add one authoritative cite each, or reframe DMD-experience claims as first-party ("in our projects…").

**🟢 Pass — the model pages:**
- `hpl-veneer-solid-wood` (#15) and the fire/ADA references (#16) cite primary sources (USDA FPL, AWI, NFPA, ADA.gov) and keep numbers accurate. The `restaurant-seating-guide` ADA section (#14) links ADA.gov for the binding dimensions. This is the standard the rest of the site should match.

**Cross-cutting pattern:** DMD's *own* estimates (lead times, VE savings, rooms delivered) are strong if simply re-voiced as first-person experience claims ("In our projects, custom items run 10-14 weeks"). The dangerous claims are the ones spoken in a **neutral-industry voice** about **other companies' brands and universal lifecycles** — that voice implies a citation that does not exist.

## Score

**Evidence integrity: 68 / 100**

- Strong base: material/spec facts are accurate, primary standards (FPL, AWI, NFPA, ADA, CMAA, AIA) are linked on most pages — rare and good. (+)
- Drag: one guide (`hospitality-ffe`) concentrates 4 high-risk, brand-naming, uncited numeric claims, and they're mirrored into FAQPage schema. (−)
- Drag: the headline first-party counter has a hard-coded fallback number and no public proof, plus a "nationwide" vs "4-state" contradiction. (−)
- No fabrication detected in material science; risk is **un-attributed industry stats**, not invented facts — which is recoverable with citations + re-voicing rather than rewrites.

## Top 3 actions

1. **Fix the `hospitality-ffe` guide's four red claims (#7-9, #11).** Drop brand-specific intervals/cost ratios ("Marriott/Hilton/IHG/Hyatt … five-year", "Autograph = 2× Fairfield", "4yr/10yr/triple") OR attach an authoritative cite. Reframe lifecycle bands as "general guidance — varies by occupancy and brand." This single page is the biggest citation-risk surface and it feeds schema.
2. **Make first-party numbers honest and self-voiced.** Remove the `|| 285` hard-coded fallback on the rooms counter (show nothing rather than a guess), have DMD confirm the 285 + the FL/ME/MD/MA list, and reconcile "nationwide" wording with the real footprint. Re-voice DMD estimates (#5, #10, lead times) as "in our experience" so they're defensible experience claims, not bare stats.
3. **Add one citation per remaining ⚠️ industry stat (#4, #12, #13, #14).** The 15-25% FF&E share (also in 3 schema blocks), 100k double-rubs (cite Wyzenbeek/ACT), seat-turn and sq-ft figures. Use the `hpl-veneer` post as the template — it already does this correctly. Cheapest lift from 68 to ~85.
