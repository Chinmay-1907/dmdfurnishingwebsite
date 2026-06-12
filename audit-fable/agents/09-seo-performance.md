# Audit 09 — seo-performance (agent)
**Lens:** Core Web Vitals + page load structural signals
**Target:** DMD Furnishing (fable-dmd) · source C:\Users\chin\dmdfurnishingwebsite-fable · live http://localhost:3006 (dev mode)
**Date:** 2026-06-10
**Status:** partial (prod build / Lighthouse / CrUX field data needed for hard CWV numbers)

## What this lens audits
Whether the page is built to load fast and stay stable: LCP (hero image speed), CLS (layout jumping), INP (input responsiveness). Looks at image optimization, font loading, render-blocking resources, JS/HTML weight, lazy-loading, and whether the site even measures its own vitals. Lab numbers (Lighthouse) and field numbers (CrUX) need a prod build — not possible against a dev server. So this audit judges the *structural signals* that decide CWV, from source + live SSR HTML.

## Method (real files/pages checked)
- `next.config.js` — image formats, cache TTL, headers, CSP.
- `app/layout.js` — font config, Script loading, head scripts.
- `components/WebVitals.js` + `app/api/vitals/route.js` — CWV self-measurement.
- `app/page.js` — hero image props (priority/fill/sizes).
- Live homepage HTML: `curl http://localhost:3006/` — weight, DOM count, preloads, render-blocking, third-party scripts.
- Live `/_next/image` transform endpoint — verified served format/bytes vs source.
- `public/Images/` — `du`/`find` for weight, count, formats.
- `app/globals.css` — CSS weight + @import chain. Priority usage grepped across all pages/components.

## Findings
| Severity | File / Page | Issue | Fix |
|---|---|---|---|
| 🟢 | `next.config.js:12` | `formats: ['image/avif','image/webp']` set. Live test: 94KB source JPG served as **31KB AVIF** at LCP size (1200w) — 3x smaller. Negotiation works. | None. Exemplary. |
| 🟢 | `app/page.js:177-186` | Hero uses `fill` + correct responsive `sizes` + `priority={index===0}` (only first slide). LCP image is `<link rel="preload" as="image">` with full srcset in live HTML head. | None. Textbook LCP setup. |
| 🟢 | `app/layout.js:3-38` | Fonts via `next/font/google` (self-hosted, **zero external font requests** — no fonts.gstatic). `display:'optional'` chosen deliberately to kill a documented 0.13 CLS reflow (comment lines 17-25). Weights trimmed to what CSS uses. | None. This is advanced, correct CLS work. |
| 🟢 | `components/WebVitals.js` + `app/api/vitals/route.js` | Real CWV reporting: `useReportWebVitals` → `sendBeacon('/api/vitals')` in prod, console in dev. Route returns 204, swallows malformed bodies. Site measures itself. | None present. (Route discards data — see gap below.) |
| 🟢 | Live homepage HTML | HTML 109KB raw → **~20KB gzipped**. DOM ~441 elements (limit is 1,500). 2 stylesheet links, 47 script tags (Next chunks, normal). | None. Lean. |
| 🟢 | `app/layout.js:95-102` | Only third-party script is **Plausible**, `defer` + `strategy="afterInteractive"` + gated behind `plausibleDomain` env var. No ad/tracking pixels hijacking main thread (good for INP). | None. |
| 🟢 | `components/products/ProductCard.js:22-23` | Lazy-loading correct: `priority` only on first 3 cards (`index<3`), `loading="lazy"` on the rest. Priority grep across site shows it's applied only to hero/first-item everywhere — never over-applied. | None. |
| 🟡 | `public/Images/Hotel_Guest_Room_Hero.png`, `services-hero.png` (~808KB each) | Two hero-class images stored as **PNG** (827KB). next/image still transcodes them to AVIF/WebP on serve, so users aren't hit — but PNG source is wasteful on disk/build and pointless for photos. | Re-encode these 2 to JPG/WebP source. Cosmetic; served bytes already fine. |
| 🟡 | `public/Images/` (158M, 814 files) | Many raw source images 750KB–965KB (e.g. School/University/Hospital folders). Served bytes are fine (next/image resizes), but build time, repo size, and any non-`next/image` direct hits would be heavy. | Pre-compress source originals (sharp script exists: `optimize:living-room`). Disk hygiene, not user-facing perf. |
| 🟡 | `app/api/vitals/route.js:23` | Vitals endpoint accepts beacons then **discards** them (no storage). Site can't see its own field CWV trend. | Wire to Plausible custom events or a lightweight store. Low effort, high visibility payoff. |
| 🟡 | dev server only | Live `:3006` is `next dev` — no minification, no prod chunk splitting, on-the-fly image transform. **All timing-based CWV numbers here are meaningless.** Structural signals are sound; actual LCP/INP/CLS unverified. | Run `next build && next start`, then Lighthouse + check CrUX. |

## Score / verdict (92/100)
Structurally this is a top-tier performance build — AVIF/WebP image pipeline working, LCP hero preloaded, fonts self-hosted with a deliberate CLS fix, lazy-loading disciplined, near-zero third-party JS, and it even measures its own vitals. Only real gaps are housekeeping (two PNG heroes, heavy source originals, vitals data thrown away) and the unavoidable one: no prod-build numbers to confirm the field result.

## Gaps (needs prod build / Lighthouse / CrUX)
- [ ] Hard LCP / INP / CLS values — need `next build && next start` + Lighthouse 13 (dev server is non-representative).
- [ ] Field CWV at 75th percentile — need CrUX API / CrUX Vis (requires live prod traffic on dmdfurnishing.com).
- [ ] TTFB on real host/CDN (Netlify) — dev TTFB is not production TTFB.
- [ ] Total transferred page weight (JS bundle KB after tree-shake/minify) — only visible in a prod build, not dev.
- [ ] INP under real interaction — needs field data or a scripted Lighthouse user-flow.

## Top 3 actions
1. **Run a prod build + Lighthouse** (`next build && next start`, then Lighthouse on `/`, `/products/hotel`, a blog post). This is the only thing blocking a hard CWV pass/fail — structure is already there.
2. **Make the vitals endpoint useful.** It already receives beacons; forward them to Plausible custom events (Plausible is already loaded) so DMD can watch real-world LCP/INP/CLS without third-party bloat.
3. **Compress source images** (re-encode the 2 PNG heroes to JPG/WebP; run a sharp pass over the 750KB+ originals). Pure disk/build hygiene — served bytes are already optimized — but it shrinks the 158M `public/Images` and speeds builds.
