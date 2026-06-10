# Skill Audit 03 — seo-technical

**Skill purpose:** Technical SEO audit across 9 categories — crawlability, indexability, security, URL structure, mobile, Core Web Vitals, structured data, JavaScript rendering, IndexNow (AgriciDaniel seo-technical v2.0.0).

**Target:** DMD Furnishing — Next.js 15 SSR B2B FF&E lead-gen site. Source `C:\Users\chin\dmdfurnishingwebsite-fable` (branch `fable-dmd`). Live dev `http://localhost:3006`. Production `https://dmdfurnishing.com` (Netlify, `@netlify/plugin-nextjs`).

**Date:** 2026-06-10

**Status:** Complete (live HTML + source verified). CrUX/PSI field data NOT wired — Core Web Vitals are source-inference only, marked partial.

> Note: agent-04 already covered this lens broadly. This pass runs the seo-technical SKILL's specific 9-category checklist with real values and resolves the `_headers` vs `next.config.js` conflict the brief flagged.

## Technical checklist applied

| Check | Result | Evidence |
|---|---|---|
| robots.txt exists + valid | ✅ | `public/robots.txt` → 200 live. `User-agent: *` Allow `/`, Disallow `/api/`. Sitemap line present. |
| AI crawler management | ✅ | 9 AI bots explicitly allow-listed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, OAI-SearchBot, ChatGPT-User, anthropic-ai, cohere-ai). Pro-AI-visibility strategy — correct for lead-gen brand. |
| XML sitemap exists + referenced | ✅ | Dynamic `app/sitemap.js` → `/sitemap.xml` 200, **231 `<loc>` URLs**, image extensions, `lastmod` 2026-06-10, all `https://` absolute. Referenced in robots.txt. |
| robots.txt sitemap URL matches | ⚠️ | robots.txt points to `https://dmdfurnishing.com/sitemap.xml` (the live 231-URL one — correct). But `public/DMD_Website.xml` (246 KB) is a `<places>` **product catalog, NOT a sitemap** — snapshot mislabels it. No crawl risk, just naming confusion. |
| Noindex tags — intentional vs accidental | ✅ | Homepage, `/products/hotel`, `/blog/*`, `/contact` carry **no** `<meta name="robots" noindex>`. All indexable. API routes blocked via robots Disallow (not meta — fine, they 405/JSON). |
| Canonical — self-referencing, no conflict | ✅ | Homepage `https://dmdfurnishing.com` · `/products/hotel` → `.../products/hotel` · `/blog/what-is-ffe-hospitality` → self. All absolute, production-domain, self-referencing. |
| HTTPS enforced + SSL | ✅ (prod) | Canonicals + sitemap all `https://`. www→non-www 301 in `netlify.toml`. Dev is http://localhost (expected). No mixed-content seen in source. |
| HSTS header | ⚠️ | Live = `max-age=63072000; includeSubDomains; preload` (from `next.config.js`). **`public/_headers` disagrees**: `max-age=31536000`. See conflict finding. |
| X-Frame-Options | ⚠️ | Live = `SAMEORIGIN` (next.config.js). **`public/_headers` says `DENY`** — direct conflict. |
| X-Content-Type-Options | ✅ | `nosniff` live (both files agree). |
| Referrer-Policy | ✅ | `strict-origin-when-cross-origin` live (both agree). |
| Content-Security-Policy | ⚠️ | Live CSP present + reasonable (from next.config.js). **`public/_headers` has NO CSP at all** — if Netlify static `_headers` ever wins, CSP vanishes. |
| Permissions-Policy | ✅ | `camera=(), microphone=(), geolocation=()` live. |
| Clean URLs / hierarchy | ✅ | Hyphenated, descriptive, no query params for content. Logical `/products/{place}/{type}` nesting. |
| Redirects — 301, ≤1 hop | ✅ | `netlify.toml`: www→non-www 301, legacy 4-seg→flat 301, inspirations numeric→slug 301. `_redirects` 301s for typo URLs. No chains observed. `next.config.js` `/schedule-call`→`/contact#schedule` (308 live, `permanent:true`). |
| Trailing slash consistency | ✅ | `trailingSlash:false`. `/about/` → 308 → `/about`. Consistent. |
| Status codes | ✅ | `/` 200, `/products/hotel` 200, unknown path 404, `/api/vitals` 405 (method-gated). No soft-404s seen. |
| Mobile — viewport + responsive | ✅ | `<meta name="viewport" content="width=device-width, initial-scale=1">`. Tailwind responsive. `lang="en"` set. (Touch-target/font-size = design lens.) |
| Core Web Vitals | ⚠️ partial | No CrUX/PSI MCP wired — cannot cite field LCP/INP/CLS. Source positives: AVIF/WebP, `minimumCacheTTL` 1yr, SSR prerender (`x-nextjs-prerender:1`, cache HIT), immutable `_next/static`. `/api/vitals` route suggests RUM collection exists. Needs PSI/CrUX to score. |
| Structured data | ✅ | Homepage = **10 JSON-LD blocks** (per snapshot). Full validation = seo-schema skill (05). |
| JS rendering — SSR vs CSR | ✅ | Next 15 App Router SSR. `x-nextjs-prerender:1`, `x-nextjs-cache: HIT` — canonical/title/meta/JSON-LD all in initial HTML, not JS-injected. Meets Dec-2025 Google guidance. |
| IndexNow protocol | ✅ | `indexnow-key.txt` (200) = `c2f5...db082`, matching hashed `c2f5...db082.txt` in public. Key files served. (Auto-ping-on-publish code not found — manual/external submit assumed.) |

## Findings

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🟠 high | Headers source-of-truth conflict | `public/_headers` (Netlify static CDN) and `next.config.js` `headers()` disagree: HSTS 31536000 vs 63072000, X-Frame `DENY` vs `SAMEORIGIN`, and `_headers` has **no CSP**. On `publish=".next"` with `@netlify/plugin-nextjs`, the Next runtime serves routes so `next.config.js` wins (confirmed live). `public/_headers` only governs static files Netlify serves directly — split-brain risk + the weaker `DENY`/no-CSP set could surface on some asset paths. | Delete `public/_headers` (Next config is authoritative for SSR), OR reconcile both to identical values. Pick `SAMEORIGIN` (Google Maps/Calendly iframes need it) and keep the CSP in both. |
| 🟡 medium | `DMD_Website.xml` mislabeled as sitemap | 246 KB file is a `<places>` product-data catalog, not a sitemap. Snapshot/prior docs imply it's crawl-facing. Harmless but invites a wrong "submit this sitemap" action. | Rename to `products-data.xml` or document clearly. Confirm only `/sitemap.xml` is submitted to Search Console. |
| 🟡 medium | Core Web Vitals unverified | No field data — score is source-inference only. `/api/vitals` exists but no PSI/CrUX wired into audit. | Wire PageSpeed Insights / CrUX (or run `pagespeed_check.py`). Re-score LCP/INP/CLS at 75th percentile. |
| 🟢 low | IndexNow auto-ping | Key files present, but no publish-time ping code found — submissions likely manual. | Add an on-deploy IndexNow ping (Netlify build hook or API call) for faster Bing/Yandex indexing. |
| 🟢 low | `_redirects` only catches fixed typos | Typo redirects in `public/_redirects` are static; real route logic lives in `netlify.toml`. Two redirect sources to keep in sync. | Consolidate redirect rules into `netlify.toml` to avoid drift. |

## Score

**Technical SEO: 88/100**

Crawlability 95 · Indexability 95 · Security 80 (header conflict + CSP gap in `_headers`) · URL Structure 95 · Mobile 90 · Core Web Vitals 70 (unverified) · Structured Data 95 · JS Rendering 100 · IndexNow 90.

Strong SSR foundation with clean canonicals, 231-URL dynamic sitemap, pro-AI robots policy, and correct redirect strategy. Points lost almost entirely to the two-file header conflict and unverified field-CWV.

## Top 3 actions

1. **Resolve the header conflict (🟠).** Make `next.config.js` the single source of truth and delete or fully reconcile `public/_headers` — today they disagree on HSTS, X-Frame, and CSP. Live traffic uses the Next config; the stray `_headers` is a latent security regression.
2. **Wire real Core Web Vitals (🟡).** Connect PSI/CrUX and re-score LCP/INP/CLS at the 75th percentile; the `/api/vitals` RUM hook is half the job.
3. **Disambiguate the two XML files (🟡).** Rename `DMD_Website.xml` (it's a product catalog, not a sitemap) so only the real 231-URL `/sitemap.xml` gets submitted to Search Console.
