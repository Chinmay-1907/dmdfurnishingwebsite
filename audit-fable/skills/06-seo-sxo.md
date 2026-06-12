# Skill Audit 06 — seo-sxo

**Skill purpose:** Search Experience Optimization — checks whether a page actually satisfies the searcher's intent and gives them a low-friction path to act, not just whether it's technically optimized. Scores the experience through buyer personas on Relevance, Clarity, Trust, Action.

**Target:** DMD Furnishing (B2B FF&E manufacturer, lead-gen). Pages checked live on http://localhost:3006 + source: homepage `/`, contact `/contact`, product `/products/hotel`, blog `/blog/what-is-ffe-hospitality`. Conversion event = consultation request.

**Date:** 2026-06-10

**Status:** Complete (source + live HTML). No SERP/persona search-volume API (GSC/DataForSEO) wired — persona weighting is from on-page intent signals, not live SERP. SXO score below is experience-fit, separate from the technical SEO Health score.

## SXO checklist applied

| Check | Result | Evidence |
|---|---|---|
| Intent satisfaction — page type matches buyer need | ✅ | `/products/hotel` H1 "Hotel Furniture & Casegoods", ~15,600 rendered words, 8 H2 sections + FAQ — a true product/category page, what a "hotel casegoods manufacturer" searcher expects. Homepage H1 "Custom Hospitality Furniture. Designed. Manufactured. Delivered." nails the transactional manufacturer intent. |
| Above-fold answer in 10 seconds | ✅ | Homepage hero states what + who + outcome in one line; `/contact` H1 "Talk to a Project Manager." with sub-line naming estimate/consultation/scope/lead-times before any scroll. |
| CWV — LCP image prioritized | ⚠️ | Hero image (IMG1, `app/.../Hero`) renders with NO `fetchpriority="high"` and NO eager hint; 2 image preloads exist (`as="image"`) so it's partially covered, but the actual LCP `<img>` is not explicitly flagged high-priority. 16 of 18 homepage images correctly `loading="lazy"`. |
| CWV — CLS / layout stability | ✅ | Contact map iframe has a shimmer skeleton placeholder (`cp-map-skeleton`) until load, preventing a blank-box shift (`ContactPage.js` L645-663); images use next/image sizing. |
| Engagement / scannability (content pages) | ✅ | Blog `/blog/what-is-ffe-hospitality`: 8 H2, 6 H3, 8 bullet lists, 1 comparison table, in-page jump links (7 `href="#"` TOC anchors), ~2,150 words. Strong scan structure. |
| CTA presence + clarity on money pages | ✅ | Homepage: 6 contact CTAs — "Book Consultation" (x2), "Request a Project Consultation", "Get a Free Project Estimate", "Schedule a call". Product page repeats "Book Consultation" + "Schedule a Call". Action-oriented, value-framed. |
| Conversion friction — the "OTP gate" | ✅ | **Earlier "OTP contact gate" concern is resolved in this build.** `ContactPage.js` L30-33 + flow: full form is visible immediately (`step='form'`), the 6-digit email code is a POST-submit confirmation (`step='otp'`), not a pre-gate. Buyer types first, verifies after. Helper text warns up front (L552). Not a blocker. |
| Conversion friction — alternative low-commitment paths | ✅ | Schedule tab offers tel: click-to-call, WhatsApp deep link, and 3 reassurance bullets ("No commitment yet", "no sales pitch", "speak directly with a PM"). Multiple readiness levels served. |
| Trust signals at decision point | ⚠️ | Contact page has NAP, hours, showroom, "a PM reads every inquiry" — but NO testimonials, client logos, certifications, or case-study proof on the conversion page itself. Trust must be inferred from other pages. |
| Internal next-steps from content → conversion | ✅ | Blog links to `/products` (3x) and `/contact` (4x); product page links to `/contact`. Content does not dead-end. |
| Structured data supports rich result / AI answer | ✅ | Homepage 10 ld+json blocks incl. FAQPage (7 Questions); contact page has ContactPage + Service + ScheduleAction + BreadcrumbList; blog has FAQPage. Strong GEO/AI-overview surface. |
| BreadcrumbList for orientation | ⚠️ | Contact + product pages emit BreadcrumbList, but homepage HTML shows no BreadcrumbList (expected — root) and product breadcrumb relies on JSON only; confirm visible breadcrumb UI renders on inner pages. |
| Image alt text (accessibility + image search) | ✅ | Spot-check: hero alt "DMD Furnishing custom hotel guestroom casegoods…", restaurant + lobby images have descriptive, keyword-relevant alts. No missing alts in first 4. |

## Findings

| Severity | Page | Issue | Fix |
|---|---|---|---|
| 🟠 high | Homepage `/` | LCP hero `<img>` lacks `fetchpriority="high"` / `priority` flag; relies on generic preload only. Slows largest paint on mobile. | Add `priority` to the hero `next/image` (sets fetchpriority=high + preload). Drop logo from being IMG0 above hero or keep it tiny. |
| 🟠 high | `/contact` | No trust proof at the decision point — zero testimonials, client logos, or certifications on the page where the buyer commits. | Add a 3-logo client strip + 1 short hospitality testimonial above or beside the form (`cp-info-col`). |
| 🟡 medium | `/contact` message form | 6-required-field form (name, email, company optional, phone, category, message) + conditional fields can feel heavy for a top-of-funnel lead. | Mark phone optional OR add a "just send a quick note" minimal mode; keep rich fields for ready buyers. Friction is moderate, not severe. |
| 🟡 medium | All inner pages | Visible breadcrumb UI not confirmed in homepage HTML; orientation relies on JSON schema. | Verify `Breadcrumbs` component renders visibly on `/products/*` and `/blog/*`, not just in ld+json. |
| 🟢 minor | Blog/product | FAQ schema present and good; ensure FAQ answers also appear as visible on-page text (not schema-only) for AI-overview eligibility. | Spot-confirm visible FAQ blocks match the FAQPage JSON. |

## Score

**SXO experience-fit score: 82/100** (separate from technical SEO Health). Breakdown vs the 7 SXO dimensions: Page-type match 15/15 · Content depth 14/15 · UX/CTA signals 13/15 · Schema 14/15 · Media richness 12/15 · Authority/trust 9/15 (the gap) · Freshness 5/10. The site is strategically well-aligned to buyer intent; the two real drags are missing decision-point trust proof and an un-prioritized LCP image.

Persona read (from on-page intent signals): the "ready hotel/restaurant buyer" persona scores ~85/100 (clear product pages, easy call/WhatsApp path). The "skeptical first-time evaluator" persona scores lower (~70) purely on the Trust dimension — no social proof where they decide.

## Top 3 actions

1. **Add trust proof to `/contact`** — client logo strip + one hospitality testimonial beside the form. Biggest persona-gap fix (Trust 9/15).
2. **Prioritize the homepage LCP hero image** — set `priority` on the hero `next/image` so it preloads at high fetchpriority. Direct Core Web Vitals win.
3. **Offer a low-friction lead path on the message form** — make phone optional or add a "quick note" minimal mode so top-of-funnel buyers aren't filtered out by the full project form.
