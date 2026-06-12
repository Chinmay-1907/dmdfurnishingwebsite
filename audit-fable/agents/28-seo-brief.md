# Audit 28 — seo-brief (agent)

**Lens:** brief-driven, human-gated, anti-slop production (article-loop Phase 4 — the content brief + HUMAN GATE that kills slop)
**Target:** DMD Furnishing — `C:\Users\chin\dmdfurnishingwebsite-fable` · live http://localhost:3006 · 6 blog posts + 2 guides
**Date:** 2026-06-10
**Status:** PASS (strong) — minor polish only. Live-HTML + source verified.

## What this lens audits

The seo-brief agent is the human gate in the article loop: it turns a SERP plan + source pack into a working brief (target keyword, unique angle, outline, required examples, citations, CTA), then HARD-STOPS for human sign-off before a draft is written. "What stops the slop is the wait."

This audit reverse-checks the finished site for evidence that content was produced that way. Three questions:
1. Does each article have a clear target keyword + intent + a non-generic angle? (brief-driven)
2. Is there an editorial/brief artifact in the repo, and signs of human review? (human-gated)
3. Do the bodies carry AI-slop tells, or do they read as edited, entity-grounded copy? (anti-slop)

## Method

- Read the lens definition (`~/.claude/teams/seo/agents/seo-brief.md`) and the shared site snapshot.
- Read the two editorial-process artifacts in repo: `SEO-GEO-Audit/keyword-map.md` and `SEO-GEO-Audit/content-quality-audit.md`.
- Read 2 full blog bodies (`value-engineering-commercial-furniture`, `restaurant-seating-guide`) plus the author entity page.
- Ran a single regex AI-tell scan across all 6 blog post files (`app/blog/**/*.js`) — 40+ slop phrases including "in today's fast-paced world", "when it comes to", "navigating the landscape", "cutting-edge", "seamlessly", "leverage", "unparalleled", "dive into", "a testament to".
- No external API needed for this lens; everything is checkable from source + live HTML.

## Anti-slop scan (AI-tells found?)

**Result: essentially clean.** One mild hit across all 6 posts:

> `app/blog/hpl-veneer-solid-wood-hotel-casegoods/page.js:219` — "…TV media panels across a **wide range of** commercial…"

"Wide range of" is a soft filler phrase, not a hard AI tell. Zero hits for the heavy slop markers: no "in today's fast-paced world", no "when it comes to", no "navigating the landscape", no "cutting-edge / state-of-the-art / world-class", no "seamlessly", no "leverage", no "dive/delve into", no "a testament to", no "elevate your", no "unlock". The site's own `content-quality-audit.md` ran the same banned-words scan and confirms it: `world-class 0 · unparalleled 0 · cutting-edge 0 · seamlessly 0 · leverage 0 · state-of-the-art 0 · best-in-class 0`. Only "solutions" recurs, in the defensible domain phrase "FF&E solutions."

Positive anti-slop signals in the bodies (real evidence of editing, not generation):
- Concrete, checkable specifics: "contract-grade vinyl…rated for 100,000+ double rubs", "seat height 24 to 26 inches pair with 34 to 36-inch counter surfaces", "MDF carcass with solid wood legs and edge details".
- Named tier-1 entities with real outbound links: AIA, NFPA, ADA (value-engineering post); BIFMA, NFPA 701, CAL 117-2013, NEMA LD 3, AHLA across the cluster.
- A real editorial trail: the author page has a "How We Fact Check Our Work" section and states content is "written and reviewed by the team that runs DMD Furnishing… project managers… not generalist copywriters" (`app/author/dmd-furnishing-editorial/page.js:113`). Every post carries Person-author schema pointing at that entity.

## Brief-readiness per content type

| Content type | Target keyword defined? | Unique angle vs generic? | Brief artifact exists? | Verdict |
|---|---|---|---|---|
| Blog (6 posts) | Yes — one primary keyword per post, mapped in `keyword-map.md` clusters 2–7 | Yes — angles are manufacturer-POV, not listicle ("preserve veneer where it's seen, HPL where it isn't"; "when NOT to cut corners: structural / fire / ADA") | Yes — keyword-map + content-quality-audit per page | 🟢 Strong |
| Guides (2) | Yes — pillar keywords (commercial-furniture-manufacturing, hospitality-ffe) | Yes — pillar/cluster hub framing | Partial — mapped in keyword-map, lighter QA notes | 🟡 Good |
| Category/product pages | Yes — per-vertical keyword targets in cluster list | Yes — `content-quality-audit` scores `lib/place-content.js` 5/5 specificity, "gold standard for the rest of the site" | Yes — explicit per-claim verification list | 🟢 Strong |
| Author/editorial entity | N/A (trust page) | Original — fact-check policy + scope | Yes — scored 5/5 across all axes | 🟢 Strong |

## Findings

| Severity | Article / Surface | Issue | Fix |
|---|---|---|---|
| 🟢 | All 6 blog posts | Brief-driven structure is consistent: AnswerCallout snippet opener, TOC, question-format H2s, named-standard citations, cross-links, FAQPage schema. Reads human-edited. | None — this IS the template. Keep. |
| 🟡 | `hpl-veneer-solid-wood-hotel-casegoods` (line 219) | Single soft-filler phrase "wide range of" | Swap to a concrete count or category ("hotel, restaurant, and office casegoods") |
| 🟡 | `keyword-map.md` (lines 84, 140, 161, 183) | Several "check file — user editing" / "needs check" placeholders left in the live brief artifact | Close the loop: fill in current title/description so the brief is a finished gate record, not a half-filled draft |
| 🟡 | `content-quality-audit.md` "Claims requiring user verification" (7 items, e.g. "9-12 week lead times", "ten-to-fifteen-year frame warranties") | Brief surfaced the right blocking questions, but no recorded human answer / sign-off date — the gate was opened, not closed in writing | Add a one-line "Verified by [name], 2026-XX-XX" against each claim so the human gate is auditable |
| 🟢 | `value-engineering-commercial-furniture` | "When Not to Cut Corners" section (structural / fire / ADA hard limits) is a genuinely original B2B angle a generic AI draft would omit | None — exemplary |
| 🟡 | Repo overall | No reusable, blank brief template exists — the two artifacts are post-hoc audits, not a forward "fill-before-you-write" form | Add `SEO-GEO-Audit/brief-template.md` (see Top 3) so future posts start from the gate, not the draft |

## Score

**Anti-slop: 92 / 100.**
- AI-tell density: 30/30 (one soft phrase across 6 posts).
- Entity grounding / specificity: 24/25 (named standards + checkable numbers throughout).
- Evidence of human gate: 20/25 (author fact-check page + per-claim verification list exist, but sign-off is not recorded; placeholders left in the brief).
- Angle originality vs generic: 18/20 (manufacturer-POV angles; guides slightly more pillar-generic than blogs).

Verdict: this is brief-driven, human-edited content, not unreviewed AI slop. The gate clearly ran; the remaining gap is *closing* the gate on the record (sign-offs, filled placeholders) and making it *repeatable* (a template).

## Top 3 actions

1. **Close the open gate items.** Fill the "check file / needs check" placeholders in `keyword-map.md` and stamp each of the 7 unverified claims in `content-quality-audit.md` with "Verified by [name], date." Turns an opened gate into a closed, auditable one.
2. **Add a reusable brief template** at `SEO-GEO-Audit/brief-template.md` mirroring the proven post shape: target keyword + intent · 1-sentence unique angle ("what makes this not generic") · outline (question H2s) · required examples & named standards to cite · internal-link plan · CTA tier · **blocking human questions (gate) + sign-off line**. Every future post starts here, not at the draft.
3. **Fix the one soft phrase** ("wide range of", hpl post line 219) and keep the banned-words scan as a pre-publish step so the 92 doesn't drift down as content scales.
