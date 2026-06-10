# Audit 04 — seo-technical (agent)
**Lens:** crawlability, indexability, redirects, security, status codes
**Target:** DMD Furnishing (fable-dmd) · source C:\Users\chin\dmdfurnishingwebsite-fable · live http://localhost:3006
**Date:** 2026-06-10
**Status:** complete

## What this lens audits
Can search engines and AI crawlers reach, read, and index every page; do canonicals point one clean direction; are redirects sane (no loops/chains/conflicts); do real pages return 200, dead pages 404, APIs 405; are security/transport headers present and not blocking embeds. No live GSC/crawl-budget data — that needs Search Console (gap below). Everything else verified from source + live dev HTML.

## Method (real files/pages checked)
- Source: `public/robots.txt`, `public/_headers`, `public/_redirects`, `netlify.toml`, `next.config.js`, `app/sitemap.js`, `lib/metadata.js`.
- Live (`curl` against :3006): HTTP status of `/`, `/products/hotel`, `/blog/what-is-ffe-hospitality`, a bogus 404 route, `/api/vitals`; canonical + robots meta on 4 pages; response headers on `/` and `/robots.txt`; status + content of `/sitemap.xml`, `/DMD_Website.xml`, `/projects.xml`, `/robots.txt`, `/llms.txt`.

**Verified-good (no action):** canonicals self-reference with absolute `https://dmdfurnishing.com` host on all 4 pages tested · `/`=200, `/products/hotel`=200, blog=200, bad route=**404** (correct), `/api/vitals`=**405** (correct) · 404 page carries `<meta name="robots" content="noindex">` · robots.txt allow-lists 9 AI crawlers + disallows `/api/` + points `Sitemap:` at the real `/sitemap.xml` · `app/sitemap.js` dynamically emits **231 URLs** covering static/guides/blog/inspirations/places/mid-tier/products/projects · all 6 security headers present AND applied on the live response (HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) · `www → apex` 301 + flat-catalog legacy 301s defined · `/.well-known/llms.txt` mirror present · IndexNow key file present.

## Findings
| Severity | File / Page | Issue | Fix |
|---|---|---|---|
| 🟠 high | `public/_headers` vs `next.config.js` | Header conflict. `_headers` sets `X-Frame-Options: DENY`; `next.config.js` sets `SAMEORIGIN`. The site embeds Google Maps + Calendly iframes (allowed in CSP `frame-src`), so a `DENY` that ever wins would not break those (DENY only blocks *being framed*, not framing others) — but the two files disagreeing is a config-rot risk. `_headers` also sets `HSTS max-age=31536000` vs Next's `63072000`, and `_headers` has **no CSP** while Next does. On Netlify with `publish=".next"` the framework adapter headers normally win, but the duplicate is fragile. | Pick one source of truth. Recommend deleting the duplicated directives from `public/_headers` (keep Next's `next.config.js headers()` as canonical) OR sync both to identical values incl. CSP. Don't ship two HSTS max-ages. |
| 🟡 medium | `public/DMD_Website.xml` (246 KB) | NOT a search-engine sitemap — it's a product-catalog data file with a `<places>` root (0 `<loc>` urls). Snapshot mislabeled it as "sitemap". It's publicly served (200) but unreferenced by robots.txt, so it won't be crawled as a sitemap. Harmless for indexing, but it ships a large internal data file publicly. | Confirm intentional. If it's only build-time catalog data, move it out of `public/` (e.g. `data/`) so it isn't served. If kept, it's fine — just don't call it a sitemap. |
| 🟡 medium | `netlify.toml` redirects | Heavy reliance on `force=false` catch-alls (`/products/:place/:ft/:sub` → `/products/:place`, etc.). These are correct by design but create a deep rule stack; a legacy 4-seg URL hits `:place/:ft/:sub/:productSlug` → flat, while 3-seg → place. No loop detected, but it's the most chain-prone area. | Spot-test 2-3 real legacy URLs post-deploy (curl `-I`) to confirm single-hop 301 → 200, no 301→301 chains. Source looks single-hop. |
| 🟡 medium | `public/_redirects` typo-fix rules | 7 hardcoded 301s for misspelled slugs (`tv-media-penal`→`panel`, `luggage-bentch`→`bench`, `lobby-area/lobby-area`→`lobby-furniture`). Fine as cleanup, but these only run on Netlify, not on the live Next dev server — so they're unverifiable locally and easy to forget. | Confirm these slugs are truly dead in the current catalog (they should 404 at source). Keep the 301s; add a comment with sunset date. |
| 🟢 pass | `next.config.js` CSP | Production CSP drops `unsafe-eval` (dev keeps it), allows only `'self' 'unsafe-inline'` for scripts/styles, frames limited to google.com + calendly. Tight and correct. `'unsafe-inline'` script is the only soft spot (needed for inline JSON-LD/Next bootstrap). | No action; nonce-based CSP is a future hardening, not required. |
| 🟢 pass | `next.config.js` | `trailingSlash: false` + absolute canonicals = no trailing-slash duplicate risk. `/schedule-call`→`/contact#schedule` permanent 301 defined. | None. |

## Score / verdict (88/100)
Technically clean and crawl-ready: correct status codes, self-referencing canonicals, a complete 231-URL dynamic sitemap, AI-crawler-friendly robots, and a full live-applied security/CSP header stack — the one real issue is duplicated/conflicting headers across `_headers` and `next.config.js` that should collapse to a single source of truth.

## Gaps
- **GSC/crawl data (API needed):** coverage report, indexed-vs-submitted count, crawl errors, mobile-usability flags, and actual indexed canonical require Google Search Console. Method: `mcp__gsc__inspect_url` + `get_sitemaps` against the live `dmdfurnishing.com` property once access is granted. Not checkable from source.
- **Production header reality:** confirmed headers fire on `:3006` (Next dev). On Netlify the merge of `_headers` + adapter headers can differ — verify with `curl -I https://dmdfurnishing.com/` after deploy.
- **HSTS preload status:** `preload` directive is set; confirm the apex is actually submitted at hstspreload.org (directive alone doesn't enroll the domain).

## Top 3 actions
1. **Collapse the header conflict.** Strip the duplicated `X-Frame-Options`/`HSTS` lines from `public/_headers` (or sync them exactly incl. CSP) so one source of truth governs security headers. (🟠)
2. **Reclassify `DMD_Website.xml`.** It's catalog data, not a sitemap — move it out of `public/` if build-only, and update the audit snapshot's "sitemap, 246 KB" label. The real sitemap is the 231-URL `app/sitemap.js` output. (🟡)
3. **Post-deploy redirect smoke test.** `curl -I` 3 legacy product URLs + the www→apex rule on production to prove single-hop 301→200 (no chains/loops) — the `netlify.toml` stack is the only place that could chain. (🟡)
