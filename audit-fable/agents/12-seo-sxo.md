# Audit 12 — seo-sxo (agent)

**Lens:** Search Experience Optimization — does the page satisfy the searcher's intent fast (above-fold answer), is the consultation CTA clear, are next-step links present, is content scannable, and where is the friction in the contact funnel.
**Target:** DMD Furnishing — B2B hospitality FF&E manufacturer (lead-gen, conversion = consultation request). Source `C:\Users\chin\dmdfurnishingwebsite-fable`, live `http://localhost:3006`.
**Date:** 2026-06-10
**Status:** Complete (live-HTML + source). No GSC/GA4 dwell data wired — engagement signals inferred from page structure, not measured. Marked where measurement is needed.

## What this lens audits

Search Experience Optimization (SXO) asks: when a buyer lands from a Google/AI search, does the page (1) answer the likely query above the fold, (2) make the consultation next-step obvious, (3) link them to the logical next page, (4) read scannably, and (5) let them convert without avoidable friction. It is the bridge between "ranks" and "converts" — Core Web Vitals plus intent satisfaction plus engagement signals.

## Method

- Pulled rendered SSR HTML from 5 representative pages on `:3006` via curl: `/` (home), `/services`, `/products/hotel`, `/blog/what-is-ffe-hospitality`, `/contact`. All 200 OK, SSR delivers full content (sizes 46KB–252KB, server time 9–42ms).
- Extracted H1/H2 structure, CTA link text, FAQ blocks, internal links, word counts (Python tag-strip).
- Read the contact funnel source: `app/contact/page.js` + `components/contact/ContactPage.js` to trace the real conversion flow and OTP friction step.
- Mapped each page to its dominant search intent and judged "answered above fold? / clear next step? / friction?".

## Findings

| Severity | Page | Issue | Fix |
|---|---|---|---|
| 🟠 high | `/contact` (Send a Message tab) | Conversion requires a 6-digit email OTP step. Buyer fills the form, clicks "Send Message," then must leave the tab, open inbox, copy a code, return, paste, click "Verify & Send." Two-step verification on a B2B lead form adds drop-off; high-intent buyers who mistype email or don't get the code (spam folder) are lost silently. `ContactPage.js` lines 196–255. | Keep OTP only if spam is a real problem. Otherwise drop to reCAPTCHA v3 + honeypot (both already wired) and send on first submit. If OTP stays: show a "Didn't get it? Check spam / Resend" line inline at submit time, and auto-advance focus to the code field. |
| 🟠 high | `/contact` (default Schedule a Call tab) | The page opens on "Schedule a Call," but with no Calendly env var set (`NEXT_PUBLIC_CALENDLY_URL` empty by default, `page.js` line 55) the tab shows only a phone number + WhatsApp button — no actual self-serve booking. A searcher who clicked a "Book Consultation" CTA expecting a calendar hits a dead-feeling card. | Wire a real booking link (Calendly/Cal.com) so the default tab honors the "Book/Schedule" promise, OR rename the default CTA path to "Call or Message Us" so expectation matches reality. |
| 🟡 medium | All pages | No response-time / SLA trust signal anywhere near the CTA (grep for "within 24h / reply within / business day" = 0 hits). B2B buyers comparing 3 manufacturers pick the one that signals speed. The form only promises "a project manager reads every inquiry." | Add one line under each primary CTA: e.g. "A project manager replies within one business day." Reduces the "will this go into a void?" hesitation that kills form submits. |
| 🟡 medium | `/products/hotel` | Above-fold is the filter rail + product grid ("Showing 24 of 46"). The buying-intent answer (contract-grade guidance, materials, lead-time FAQ) and the only CTA ("Schedule a Call," via "Need help selecting?") sit far below the grid. A "hotel furniture supplier" searcher sees a catalog, not a "talk to us" path, until they scroll past 24 cards. | Add a compact intent banner above or beside the grid: one-line value prop + "Talk to a project manager" button, so the consultation path is visible without scrolling the catalog. |
| 🟡 medium | `/blog/what-is-ffe-hospitality` (2,009 words, strong informational answer) | The post answers the query well and links to product catalog + services + sibling guides, but the in-content conversion nudge is soft ("Browse the product catalog"). An informational reader who is actually a buyer gets no consultation CTA until the global footer. | Add one mid-article soft CTA block after "How Much Should You Budget" ("Planning an FF&E budget now? Get a realistic range — talk to DMD") linking to `/contact`. Captures the buyer hiding inside the researcher. |
| 🟢 pass | `/` (home) | Above-fold H1 "Custom Hospitality Furniture. Designed. Manufactured. Delivered." + nationwide / 20-room–500-key subhead answers "who are you / what do you do" instantly. Two persistent CTAs ("Book Consultation" x2) plus 9 section CTAs (Browse Products, See Projects, Explore Services, Get a Free Project Estimate). Strong. | Keep. |
| 🟢 pass | All pages | Highly scannable: numbered process steps (01–07), Before/After, "Why DMD" 6-reason grid, FAQ accordions on every key page (home, services, products, blog). Embedded FAQPage + Speakable schema supports SERP snippets and voice. Internal next-step links are dense and logical (products → contact?product=, services → projects, blog → guides). | Keep. |
| 🟢 pass | `/contact` | Smart conversion-first form design: full form visible immediately (no gating before typing), category-conditional fields (room count, seating capacity, etc.) qualify the lead, message auto-prefills from `?product=` / `?category=` deep links, map lazy-loads with a shimmer skeleton (no layout-shift blank box). The OTP friction (above) is the one blemish on an otherwise well-built flow. | Keep structure; address OTP. |

## Intent-match scorecard

| Page | Likely query intent | Answered above fold? | Clear next step? | Friction? | Verdict |
|---|---|---|---|---|---|
| `/` | "hospitality / commercial furniture manufacturer" (navigational + commercial) | Yes — H1 + subhead state exactly who/what/where | Yes — dual Book Consultation + 9 section CTAs | None | Satisfied |
| `/services` | "FF&E process / what do they do" (consideration) | Yes — "One Team, Concept to Installation" + 7-phase summary | Yes — Schedule a Consultation x2, See Projects | None | Satisfied |
| `/products/hotel` | "hotel furniture / casegoods supplier" (commercial) | Partial — grid loads first; value prop + CTA below 24 cards | Weak above fold — CTA buried under grid | Scroll friction | Partial |
| `/blog/what-is-ffe-hospitality` | "what is FF&E" (informational) | Yes — definition answered in first paragraph + table | Soft — catalog link only mid-page; no consult CTA until footer | Buyer-in-researcher leak | Mostly satisfied |
| `/contact` | "contact / book consultation" (transactional) | Yes — H1 + form/booking visible | Yes but — default tab has no real calendar; message path needs OTP | OTP + missing booking | Partial |

## Score (72/100)

- Above-fold intent answer: 16/20 — home/services/blog excellent; product page buries the answer under the grid.
- CTA clarity: 15/20 — CTAs everywhere and well-labeled, but the default "Schedule a Call" tab doesn't actually schedule, and no response-time reassurance.
- Internal next-step links: 17/20 — dense, logical, deep-linked (`?product=`, `?category=`); only the blog under-converts.
- Scannability / readability: 18/20 — numbered steps, FAQ accordions, Before/After, schema-backed — strong.
- Conversion friction: 6/20 — the OTP gate is the single biggest experience tax on a high-intent B2B form; missing booking widget compounds it.

## Top 3 actions

1. **Cut or soften the OTP gate** on the Send-a-Message form (`ContactPage.js` 196–255). reCAPTCHA v3 + honeypot already protect it. If OTP stays, add inline "check spam / resend" guidance and auto-focus the code field so high-intent leads don't drop at the verification step.
2. **Make the default "Schedule a Call" tab actually schedule** — wire `NEXT_PUBLIC_CALENDLY_URL` (or Cal.com), or rename the path so the CTA promise matches the phone/WhatsApp reality.
3. **Add a response-time trust line + a mid-blog consult CTA** — "A project manager replies within one business day" under each primary CTA, and one soft "talk to DMD about your budget" block inside the FF&E blog post to catch buyers reading informational content.

*Limitation: real dwell time, scroll depth, and form-abandon rate need GA4/GSC (not wired). Findings on engagement are inferred from page structure and the rendered funnel, not measured behavior.*
