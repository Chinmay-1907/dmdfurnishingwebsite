# Audit 26 — geo-technical (agent)

**Lens:** technical foundations for AI search (SSR, semantic HTML, crawler access)
**Target:** DMD Furnishing — https://dmdfurnishing.com (audited live at http://localhost:3006, source `C:\Users\chin\dmdfurnishingwebsite-fable`, branch `fable-dmd`)
**Date:** 2026-06-10
**Status:** Complete (live dev + source verified; field Core Web Vitals need PageSpeed/CrUX API — see gap note)

## What this lens audits

AI search engines (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) do NOT execute JavaScript. They read the raw HTML the server sends. This lens checks whether real page text, headings, and structured data exist in that raw HTML — not just after browser JS runs — plus crawler access (robots), clean semantic markup, response speed, canonical/indexability, and no cloaking. Server-side rendering (SSR) is the single most important factor; if content only appears after JS, AI crawlers see a blank page.

## Method

- `curl` raw HTML (no JS engine) for 3 page types: homepage `/`, product `/products/hotel`, blog `/blog/what-is-ffe-hospitality`, plus `/about`, `/services`, `/contact`.
- Stripped `<script>`/`<style>`/tags to measure real visible text present server-side.
- Inspected HTTP response headers (status, content-type, cache, security, compression).
- Read source: `app/layout.js`, `next.config.js`, `public/robots.txt`; grep for `'use client'` across `app/`.
- Checked robots.txt, sitemap.xml, feed.xml, llms.txt, projects.xml, .well-known/llms.txt, 404 behavior, title uniqueness, schema `@type` inventory.

## SSR content-in-HTML check (page → content present in raw HTML?)

This is the critical AI-search test. Result: **PASS on every page type.** Content is fully server-rendered, not JS-hydrated.

| Page | HTTP | Raw HTML | Visible text in raw HTML | H1 / H2 / H3 | Semantic + schema | SSR verdict |
|------|------|----------|--------------------------|--------------|-------------------|-------------|
| `/` homepage | 200, 0.01s | 109 KB | 6,982 chars present server-side | 1 / 8 / — | main, nav, header, footer, 10 ld+json | ✅ Full SSR |
| `/products/hotel` | 200, 0.12s | 252 KB | 7,335 chars (catalog: spaces, categories, 46 products listed in HTML) | 1 / 8 / 24 | 8 ld+json | ✅ Full SSR |
| `/blog/what-is-ffe-hospitality` | 200, 0.57s | 88 KB | 14,065 chars of article body | 1 / 8 / 6 | `<article>`, 8 ld+json, BlogPosting | ✅ Full SSR |

Proof points: every `page.js` in `app/` is a **server component** — grep for `'use client'` returned only `app/error.js` and `app/not-found.js` (correct; those legitimately need the client). Homepage body minus scripts = 45 KB of real markup with `<main> <nav> <header> <footer>`, `lang="en"`, viewport meta. Response header `x-nextjs-prerender: 1` confirms static prerender. No empty-root CSR pattern anywhere. AI crawlers will see the complete page.

## Findings (Severity | Item | Issue | Fix)

| Severity | Item | Issue | Fix |
|----------|------|-------|-----|
| 🟢 | Server-side rendering | All page types deliver full text + headings + schema in raw HTML. Zero client-only pages. `x-nextjs-prerender:1`. | None — exemplary. Keep all `page.js` as server components. |
| 🟢 | AI crawler access | `public/robots.txt` allow-lists GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, ChatGPT-User, CCBot, anthropic-ai, cohere-ai, Google-Extended; only `/api/` disallowed. | None. Note: `Google-Extended: Allow` opts INTO AI training — intentional here, keep if desired. |
| 🟢 | Semantic HTML | Proper single `<h1>`, ordered `<h2>/<h3>`, `<main> <nav> <header> <footer>`, `<article>` on blog, skip-link, `lang="en"`. | None. |
| 🟢 | Security headers | HSTS (preload), X-Content-Type-Options nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy, Permissions-Policy, strict CSP (no `unsafe-eval` in prod). | None — best-in-class. |
| 🟢 | Indexability / canonical | No accidental `noindex` on any of 6 pages checked. Self-referencing absolute canonicals (e.g. blog → `https://dmdfurnishing.com/blog/what-is-ffe-hospitality`). `metadataBase` set. | None. |
| 🟢 | Response speed + caching | All pages 200; 0.01–0.57s; `Cache-Control: s-maxage=31536000`; gzip on (`Content-Encoding: gzip`); `x-nextjs-cache: HIT`. | None for dev; verify Netlify CDN serves brotli + same cache in prod. |
| 🟢 | Discovery files | robots/sitemap (231 URLs, lastmod dates, image entries)/feed.xml/llms.txt/projects.xml/.well-known/llms.txt all 200. 404 returns true 404. | None. |
| 🟢 | Structured data depth | FurnitureStore + LocalBusiness (geo, hours, ContactPoint), Organization, WebSite+SearchAction, FAQPage, BlogPosting, BreadcrumbList, and **SpeakableSpecification** (explicitly AI/voice-targeted). | None — strong GEO signal. |
| 🟢 | Image handling (CLS/LCP) | next/image used everywhere (`/_next/image`, `srcSet`, AVIF/WebP, 1-yr cache TTL). Logo has explicit width/height; hero uses `fill` in sized container. 16/18 lazy-loaded. | None. Initial "raw img / missing dimensions" read was a false alarm (camelCase `srcSet`). |
| 🟢 | Font CLS engineering | `next/font` self-hosted, `display: 'optional'`, weights trimmed; layout comment documents fixing a prior 0.13 CLS reflow. | None — already remediated. |
| 🟡 | Field Core Web Vitals | Lab signals all favorable (fast TTFB, prerender, optimized images/fonts, dimensioned media). Real-user LCP/INP/CLS not measurable from source. | Pull CrUX / PageSpeed Insights on the live `dmdfurnishing.com` domain post-deploy to confirm field LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. |
| 🟡 | Search Console verification | `app/layout.js` reads `GSC_VERIFICATION_TOKEN` / `BING_VERIFICATION_TOKEN` from env, currently unset → no verification meta emitted. | Set both env vars in Netlify so GSC/Bing can confirm ownership and surface crawl/index data. |
| 🟢 | H1 brand styling | Homepage H1 wraps D/M/D letters in `<span class="goldLetter">` for visual styling; raw text reads cleanly as "Custom Hospitality Furniture. Designed. Manufactured. Delivered." | None — spans add no stray whitespace; crawlers parse it correctly. |

## Score (94/100)

Weighted to the lens framework: SSR 25/25 · Crawlability 15/15 · Meta/Indexability 15/15 · Core Web Vitals 8/10 (lab excellent, field unconfirmed) · Mobile 10/10 (viewport + responsive) · Security 10/10 · URL structure 5/5 · Response headers 5/5 · Additional 1/5 (GSC/Bing verification unset). **Severity: Excellent.** This is a reference-grade GEO-technical foundation — among the strongest possible for an AI-crawler-first manufacturer site.

## Top 3 actions

1. 🟡 **Set `GSC_VERIFICATION_TOKEN` and `BING_VERIFICATION_TOKEN` env vars in Netlify** so Search Console / Bing can verify the domain and expose real crawl + index status (the only meaningful gap).
2. 🟡 **Confirm field Core Web Vitals after deploy** via CrUX/PageSpeed on `dmdfurnishing.com` — lab signals are excellent, but verify real-user LCP/INP/CLS hit "good" thresholds, especially on the heavy `/products/[place]` catalog pages (252 KB HTML).
3. 🟢 **Verify the production CDN (Netlify) matches dev** — brotli/gzip compression on, `s-maxage` cache headers preserved, and all AI-crawler robots rules served — so the strong local posture holds in production.
