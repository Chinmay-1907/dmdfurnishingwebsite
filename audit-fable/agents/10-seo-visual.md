# Audit 10 — seo-visual (agent)
**Lens:** rendering, mobile responsiveness, viewport, layout integrity
**Target:** DMD Furnishing (fable-dmd) · source C:\Users\chin\dmdfurnishingwebsite-fable · live http://localhost:3006
**Date:** 2026-06-10
**Status:** partial (screenshot tool needed) — structure audited from source + live SSR HTML; no rendered-pixel capture (Playwright/Chromium not invoked).

## What this lens audits
Does the page render correctly and stay usable on phones, tablets, and desktops? Viewport meta, responsive CSS coverage, mobile navigation drawer, responsive image handling, horizontal-scroll risks, above-the-fold (H1 + CTA visible without scrolling), and base font legibility.

## Method (real files/pages checked)
- Live SSR HTML pulled from `:3006` for `/` (109 KB, HTTP 200) and `/products/hotel` (HTTP 200).
- `app/globals.css` (base layer, tokens, breakpoints).
- `components/Header.js` + `components/Header.css` (nav / mobile drawer).
- `src/styles/Home.css` (hero + above-the-fold).
- Media-query census across `src/styles/*.css` (44 queries) + `components/*.css`.
- Live `<img>` markup for `next/image` `sizes` / `srcSet`.

## Findings
| Severity | File / Page | Issue | Fix |
|---|---|---|---|
| 🟢 | live `/` + `/products/hotel` | Viewport meta correct: `width=device-width, initial-scale=1`. No `maximum-scale`/`user-scalable=no` — pinch-zoom allowed. | Keep. |
| 🟢 | `components/Header.css` | Real mobile drawer: slide-in from right `width: min(320px, 82vw)`, backdrop overlay, `body.body-no-scroll` lock, `overscroll-behavior: contain`, `env(safe-area-inset-bottom)`. Breakpoints 1200/1024/768/640. | Keep — exemplary. |
| 🟢 | `components/Header.css` | Touch targets meet 48×48: `.hamburger-menu` 48px, `.nav-links a` `min-height:48px`, `.consultation-button` `min-height:48px`. | Keep. |
| 🟢 | live `/` HTML | `next/image` responsive: 17 `sizes` attrs + `srcSet` present (`data-nimg="fill"`, `sizes="(max-width:768px) 100vw, (max-width:1280px) 100vw, 1280px"`). Hero `priority`. `img{max-width:100%}` global. | Keep. |
| 🟢 | live `/` HTML | Above-the-fold solid: `<h1>Custom Hospitality Furniture…</h1>` SSR-rendered in hero; dual CTA group + hero photo present without scroll. Hero `100vh; min-height:600px`. | Keep. |
| 🟢 | `src/styles/Home.css` | Horizontal-scroll guarded: `.home-container{overflow-x:hidden}`. No `100vw` block-width overflow risks found in CSS scan. Fluid `clamp()` type + `auto-fill minmax()` grids. | Keep. |
| 🟢 | `app/globals.css` | `prefers-reduced-motion` honored (kills animations/transitions); fade-ins are opacity-only (CLS-safe). `next/font` self-hosted (`__variable`), no render-blocking Google Fonts link. | Keep. |
| 🟡 | `app/globals.css` L186 | `html { font-size: 90% }` shrinks base to ~14.4px — below the 16px mobile-legibility guideline. Compounds with many sub-rem sizes. | Set `html` base to 100% (16px), or scale only desktop; re-test small text. |
| 🟡 | `Footer.css` L33, `Contact.css` L630, `Header.css` L135 | Tiny text: `0.68rem`/`0.70rem`/`0.72rem` × 14.4px base ≈ 9.8–10.4px rendered. Legibility/readability risk on phones (eyebrows, footer fine print, labels). | Floor body-copy/labels at ~0.85rem on mobile, or fix the 90% base above. |
| 🟡 | `src/styles/PageHeader.css`, `ScrollProgress.css` | 0 media queries each. PageHeader drives hero titles on most inner pages — relies entirely on `clamp()` for fluidity (acceptable) but has no breakpoint-level layout fallback. Verify on 375px. | Confirm via render at 375/768; add breakpoint only if title/lede crowds. |
| 🟡 | whole site | No rendered-pixel verification this pass — overlap, text clipping, and CLS at 375/768/1366/1920 are inferred from CSS, not seen. | Run `scripts/capture_screenshot.py` at the 4 viewports on `/`, `/products/hotel`, `/contact`, one blog post. |

## Score / verdict (88/100 + one line)
Responsive foundation is genuinely strong — true mobile drawer, correct viewport, responsive `next/image`, overflow guards, reduced-motion, SSR above-the-fold; only the 90% base-font shrink and a few sub-10px text sizes hold it back.

## Gaps
- **Screenshot capture not run** (lens's core tool). Needs Playwright+Chromium at 1920/1366/768/375 to confirm no overlap, clipping, or layout shift — especially the Header `light-hero-page` text-color logic and the mobile drawer open state.
- **CLS not measured** (only structurally inferred from opacity-only animations + `width/height` on `next/image`).
- **Real-device touch / tap-target spacing** unverified beyond CSS min-sizes.

## Top 3 actions
1. Run the lens screenshot script on `/`, `/products/hotel`, `/contact`, one blog post at 375 / 768 / 1366 / 1920; eyeball overlap, clipping, and drawer-open state.
2. Fix base legibility: change `html{font-size:90%}` to 100% (or desktop-only), then floor footer/eyebrow/label text so nothing renders under ~12px on phones.
3. Spot-confirm the two zero-breakpoint files (`PageHeader.css`, `ScrollProgress.css`) at 375px — add a breakpoint only if hero titles crowd.
