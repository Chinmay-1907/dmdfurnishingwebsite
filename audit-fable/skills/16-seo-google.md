# Skill Audit 16 — seo-google

**Skill purpose:** Pull Google's own field/search data — Search Console (clicks, impressions, CTR, position, coverage, URL inspection, sitemaps), GA4 organic traffic, PageSpeed/CrUX Core Web Vitals — via Google Cloud APIs (API key + service account). Bridges crawl-based audits with real Google data.

**Target:** DMD Furnishing — B2B hospitality FF&E lead-gen site. Source: `C:\Users\chin\dmdfurnishingwebsite-fable` (branch `fable-dmd`), prod domain `https://dmdfurnishing.com`, live dev `http://localhost:3006`.

**Date:** 2026-06-10

**Status:** partial (API access) — site is wired and ready, but Google APIs return no DMD data because the property has not been granted to the service account, GA4 has no property, and analytics is not firing.

---

## On-site Google readiness (table: Check | Result | Evidence)

| Check | Result | Evidence |
|---|---|---|
| GSC verification meta tag | 🟠 Wired but OFF | `app/layout.js:69-74` — `verification.google` only spreads in when `process.env.GSC_VERIFICATION_TOKEN` is set. `.env` has no such var (grep: no matches); `.env.example` only covers EmailJS/SMTP/Replicate. So no `<meta name="google-site-verification">` is emitted today. |
| Bing verification meta tag | 🟠 Wired but OFF | `app/layout.js:71-73` — `msvalidate.01` gated on `BING_VERIFICATION_TOKEN`, also unset. |
| Site-verification file (public/) | 🟢 Not a GSC token | `public/c2f5892f84b6428da1e0da44742db082.txt` contains `c2f5892f84b6428da1e0da44742db082` — this equals `public/indexnow-key.txt` exactly. It is the IndexNow key file, NOT a Google verification file. No Google HTML-file verifier present. |
| Analytics tag firing | 🔴 Not firing | `app/layout.js:84,95-102` — Plausible `<Script>` injects only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set. Var is absent from `.env`. No GA4/gtag/GTM anywhere in source. So zero analytics on prod or dev — matches sibling finding "no analytics firing." |
| Sitemap exists + submittable | 🟢 Ready | `app/sitemap.js` generates a dynamic App-Router sitemap at `/sitemap.xml` (static pages + guides + 6 blog posts + inspirations + places + product/type/detail + projects). `public/robots.txt:38` points `Sitemap: https://dmdfurnishing.com/sitemap.xml`. Static `public/DMD_Website.xml` (246 KB) + `public/projects.xml` (26 KB) also present. Ready to submit once GSC property is verified. |
| robots.txt allows crawl | 🟢 Pass | `public/robots.txt` — `Allow: /`, only `Disallow: /api/`. AI crawlers explicitly allow-listed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, OAI-SearchBot, ChatGPT-User, anthropic-ai, cohere-ai). |
| IndexNow key + submitter | 🟢 Ready | Key file pair present (`indexnow-key.txt` + `c2f5892....txt`, identical key). `scripts/submit-indexnow.js` fetches live `/sitemap.xml`, extracts `<loc>` URLs, POSTs to `api.indexnow.org/indexnow` with `keyLocation` = `https://dmdfurnishing.com/<KEY>.txt`. Notifies Bing/Yandex/Seznam/Naver. Needs a deployed sitemap to run; not yet wired to a deploy webhook (comment line 15). |

---

## API access status

Re-confirmed live this run via the wired MCP tools (Tier 1/2 of the skill):

| API | Tool called | Result | Meaning |
|---|---|---|---|
| GSC site list | `mcp__gsc__list_gsc_sites` | empty (no output) | Service account sees zero verified properties. DMD not granted → all GSC commands (gsc, inspect, sitemaps, coverage) return nothing for DMD. Effective **403 / no-access**. |
| GA4 accounts | `mcp__ga4__get_account_summaries` | `[]` | No GA4 account/property reachable by the service account. GA4 organic reports impossible. |

Tier reachable today: **Tier 0 only** (PageSpeed/CrUX — API-key, no property needed). Tier 1 (GSC) and Tier 2 (GA4) are blocked until access is granted. CrUX field data may still 404 for DMD if Chrome traffic is below the reporting threshold (small B2B site) — that is a data-volume limit, not an auth error.

---

## Grant steps + reports to pull (gap checklist)

**To unlock GSC (Tier 1):**
1. Verify the property. Easiest path that matches the codebase: set `GSC_VERIFICATION_TOKEN` in `.env` (and the prod host env, e.g. Netlify) to the token GSC gives you, then redeploy — `app/layout.js` will emit the `<meta name="google-site-verification">` tag. Alternative: DNS TXT record (no code change). Prefer a Domain property (`sc-domain:dmdfurnishing.com`) so http/https/www all roll up.
2. In GSC → Settings → Users and permissions → Add user → paste the **service account `client_email`** (the one used by the gsc MCP), role = Full or Restricted. This is the step that turns the current empty list into real data.
3. Re-run `mcp__gsc__list_gsc_sites` to confirm `dmdfurnishing.com` now appears.

**To unlock GA4 (Tier 2):**
4. Create a GA4 property for dmdfurnishing.com; copy its numeric **Property ID** (Admin → Property details, format `properties/123456789`).
5. Decide the analytics tag. Site is currently built for **Plausible** (privacy-friendly, no GA4 code). Two clean options: (a) set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=dmdfurnishing.com` and use Plausible (then GA4 MCP stays empty by design), or (b) add a GA4/gtag tag if you specifically want GA4 reports through this skill. Today neither fires.
6. In GA4 → Admin → Property Access Management → add the service account `client_email` as Viewer.

**To unlock IndexNow + sitemap submit:**
7. Deploy so `/sitemap.xml` is live, then run `node scripts/submit-indexnow.js` (Bing/Yandex). Optionally wire it to the Netlify `deploy-succeeded` webhook (script comment line 15).
8. After GSC verified: submit `https://dmdfurnishing.com/sitemap.xml` in GSC → Sitemaps (or via the sitemaps API command).

**Reports to pull once granted (and why):**
- GSC Search Analytics — queries / pages / CTR / position (28-day, dims=query,page). Surfaces quick wins (position 4-10, high impressions) for a brand-new site building authority.
- GSC Coverage / URL Inspection (`inspect`, `inspect-batch`) — confirm homepage, 2 guides, 6 blog posts, key product pages are indexed; catch canonical/robots issues.
- GSC Sitemaps status — discovered vs indexed counts, errors/warnings on the dynamic sitemap.
- GA4 organic report (`ga4`, `ga4-pages`) — organic sessions, top landing pages, engagement → ties consultation leads back to organic traffic.
- CrUX / PageSpeed (`pagespeed`, `crux`, `crux-history`) — real LCP/INP/CLS field data (works on API key now; may 404 for low-traffic origin until volume builds).

---

## Findings (table: Severity | Item | Issue | Fix)

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🔴 | Analytics not firing | No GA4/gtag/GTM in source; Plausible gated on `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` which is unset → zero traffic measurement on prod. | Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=dmdfurnishing.com` (or add GA4 tag) and redeploy. Without this, no organic-traffic data exists to audit. |
| 🔴 | GSC property not granted | `list_gsc_sites` empty → DMD service account has no access; all search-performance/coverage data blind. | Verify property (step 1) + add service-account email as GSC user (step 2). |
| 🟠 | GSC verification token unset | `GSC_VERIFICATION_TOKEN` absent from `.env`/`.env.example` → no verification meta tag rendered; meta-method verification can't succeed yet. | Add the token to env (or use DNS TXT), redeploy. |
| 🟠 | GA4 property missing | `get_account_summaries` = `[]` → no property exists/reachable. | Create GA4 property + grant service account (steps 4-6), or commit to Plausible and skip GA4. |
| 🟡 | IndexNow not auto-triggered | `submit-indexnow.js` exists and is correct but is manual; not wired to deploy. | Add to Netlify `deploy-succeeded` webhook/build plugin so new/updated URLs ping Bing/Yandex automatically. |
| 🟡 | Sitemap not yet submitted to GSC | Dynamic `/sitemap.xml` ready but can't be submitted until property verified. | After step 1-2, submit sitemap in GSC. |
| 🟢 | robots.txt + IndexNow key + sitemap route | Correctly configured; AI crawlers allow-listed; key files match; sitemap covers all route types. | None — keep as is. |

---

## Score (readiness X/100)

**Readiness: 55/100.**

- On-site plumbing is strong (robots, sitemap route, IndexNow key+script, env-gated verification & Plausible hooks all coded correctly): ~+45.
- But every data path is dark: no analytics firing (-20), GSC property not granted (-15), GA4 absent (-10). The skill can run Tier-0 (CrUX/PageSpeed) only; Tier-1/2 return nothing for DMD.
- Net: well-architected and a few env vars + access grants away from full data — but today this skill cannot pull a single real DMD search/traffic number.

---

## Top 3 actions

1. **Turn on analytics.** Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=dmdfurnishing.com` in prod env and redeploy (or add a GA4 tag). Right now nothing is measured.
2. **Verify GSC + grant the service account.** Set `GSC_VERIFICATION_TOKEN` (or DNS TXT) to verify `dmdfurnishing.com`, then add the gsc service-account email as a user. Re-run `list_gsc_sites` to confirm — that single grant unlocks queries/pages/CTR/coverage/sitemap data.
3. **Submit the sitemap + automate IndexNow.** After verification, submit `/sitemap.xml` in GSC, and wire `scripts/submit-indexnow.js` into the Netlify deploy webhook so Bing/Yandex get pinged on every publish.
