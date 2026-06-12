# Audit 19 — seo-google (agent)

**Lens:** GSC + GA4 + CrUX via Google APIs
**Target:** https://dmdfurnishing.com (source: `C:\Users\chin\dmdfurnishingwebsite-fable`, branch `fable-dmd`, live dev `http://localhost:3006`)
**Date:** 2026-06-10
**Status:** partial (API access) — Google APIs reachable, but DMD property NOT granted to the connected service account

## What this lens audits

Field-data and ground-truth signals that only Google's own APIs can give, plus the on-site wiring needed to feed them:

- **GSC** — indexation status, top queries/pages, clicks, impressions, CTR, average position, sitemap processing, rich-result eligibility (URL Inspection).
- **GA4** — organic sessions, landing pages, engagement, conversions (consultation form completions).
- **CrUX** — real-user Core Web Vitals (LCP / INP / CLS) field data, 28-day rolling.

On-site readiness is always checkable from source + live HTML. The API data needs the property to be verified and the service account granted. Both were checked.

## On-site Google readiness (verification, analytics tag, sitemap submit)

| Item | State | Evidence |
|------|-------|----------|
| Google site-verification (meta tag) | NOT active | `app/layout.js` lines 64-74: `verification.google` only renders when `process.env.GSC_VERIFICATION_TOKEN` is set. Env var unset → live homepage at `:3006` has **no** `google-site-verification` meta tag (confirmed by curl). |
| Google verification (HTML file method) | MISLEADING | `public/c2f5892f84b6428da1e0da44742db082.txt` exists and serves 200, but its **content is the IndexNow key** (`c2f5892f84b6428da1e0da44742db082`), identical to `public/indexnow-key.txt`. This is NOT a Google verification token — it is the IndexNow key file. No real Google HTML-file verification is present. |
| Analytics tag firing | NONE active | Plausible is wired in `app/layout.js` lines 83-102, gated behind `process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. Env var unset → no analytics script on live homepage (confirmed by curl: no `plausible.io`, no `gtag`, no `googletagmanager`). No GA4/gtag anywhere in source (user prefers Plausible). `SEO-SCOREBOARD.md` line 62 flags `analytics-wiring 25/25 — blocked: needs analytics choice`. |
| Sitemap (route) | GOOD | `app/sitemap.js` serves `/sitemap.xml` (200) with **154 URLs** (462 = 3 tags × 154 entries). `robots.txt` line 38 points at `https://dmdfurnishing.com/sitemap.xml`. Ready to submit to GSC once verified. |
| Static sitemaps | PRESENT (not referenced by robots) | `public/DMD_Website.xml` (246 KB) + `public/projects.xml` exist but robots points only at the dynamic route. Decide one source of truth before GSC submit. |
| IndexNow (Bing/Yandex side) | READY | `public/indexnow-key.txt` + hashed key file both serve 200; `scripts/submit-indexnow.js` POSTs live sitemap URLs to api.indexnow.org. This covers Bing/Yandex, not Google. |
| robots.txt | GOOD | Allows all, disallows `/api/`, allow-lists AI crawlers, declares sitemap. Serves 200. |

## API attempt result (what GSC/GA4 tools returned)

The Google API service account is connected and reachable, but has no access to this property:

| Tool called | Result |
|-------------|--------|
| `gsc list_gsc_sites` | Empty (no verified sites on this service account). |
| `gsc inspect_url` (homepage) | **HTTP 403** — "You do not own this site, or the inspected URL is not part of this property." |
| `gsc get_search_analytics` (summary) | **HTTP 403** — "User does not have sufficient permission for site 'https://dmdfurnishing.com/'." |
| `ga4 get_account_summaries` | `[]` (empty — no GA4 accounts/properties accessible). |

Conclusion: APIs work, DMD is not granted. No live GSC/GA4/CrUX field data could be pulled this pass.

## Findings

| Severity | Item | Issue | Fix |
|----------|------|-------|-----|
| 🔴 | GSC property | Not verified / not granted to the connected service account (403 on inspect + analytics). Zero Google search-performance visibility. | Create/verify the GSC property, then add the service-account email as a user (Full or Restricted). |
| 🔴 | Google verification | No active Google verification — meta tag is env-gated and unset; the `.txt` "verification file" is actually the IndexNow key, not a Google token. Easy to mistake for done. | Set `GSC_VERIFICATION_TOKEN` (HTML-tag method) OR add the DNS TXT / real Google HTML-file token. Do not rely on the existing `.txt`. |
| 🟠 | Analytics | No analytics firing at all — Plausible env unset, no GA4. Cannot measure organic traffic, landing pages, or consultation conversions. | Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=dmdfurnishing.com` (per user pref). If GA4 field-data via this lens is wanted, also create a GA4 property + grant the service account. |
| 🟠 | Sitemap submission | Dynamic `/sitemap.xml` is ready but never submitted to Google (blocked on verification). | After verifying GSC, submit `https://dmdfurnishing.com/sitemap.xml`. |
| 🟡 | Sitemap duplication | Dynamic route (154 URLs) and static `DMD_Website.xml` / `projects.xml` coexist; robots references only the route. | Pick one source of truth; delete or `<sitemapindex>`-link the others to avoid GSC confusion. |
| 🟡 | CrUX field data | Can't confirm whether origin has enough Chrome traffic for a CrUX record (needs API key run + live origin). | Once verified/traffic flowing, pull CrUX history for the origin; fall back to PSI lab data if 404. |
| 🟢 | Bing/IndexNow | IndexNow key files + submit script in place. | Wire `submit-indexnow.js` into the post-deploy webhook. |

## Setup + reports to pull once granted (gap checklist)

**Grant steps (do these first):**
1. [ ] Verify `https://dmdfurnishing.com` in Google Search Console (DNS TXT is most durable; or set `GSC_VERIFICATION_TOKEN` env for the HTML-tag method already wired in `app/layout.js`).
2. [ ] Add the connected **service-account email** as a GSC user (the same identity that returned 403 — read its address from `python scripts/google_auth.py --check --json` or the MCP error response).
3. [ ] Create a **GA4 property** for the domain, install the measurement ID (or stand up Plausible per user pref), and grant the service account **Viewer** on the GA4 property.
4. [ ] Submit `https://dmdfurnishing.com/sitemap.xml` in GSC.
5. [ ] Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (and/or GA4 ID) so analytics actually fires.

**Reports to pull once access lands:**
6. [ ] **GSC queries** (28 days): top queries — clicks, impressions, CTR, avg position. (`get_search_analytics`, dimension `query`.)
7. [ ] **GSC pages** (28 days): top landing pages — same metrics. (dimension `page`.)
8. [ ] **GSC CTR outliers**: high-impression / low-CTR queries → title/meta rewrite targets.
9. [ ] **GSC coverage**: URL Inspection on `/`, `/products/hotel`, one blog post — indexed? canonical match? rich-result eligible?
10. [ ] **GSC sitemap status**: submitted, last read, discovered vs indexed URL counts.
11. [ ] **GA4 organic** (28 days): sessions, engaged sessions, avg engagement time, top organic landing pages.
12. [ ] **GA4 conversions**: consultation-form completions by source/medium (organic share).
13. [ ] **CrUX field CWV**: origin-level LCP / INP / CLS (good/needs-improvement/poor split), 28-day rolling; PSI lab fallback if no CrUX record.

Data-freshness reminders: CrUX 28-day rolling · GSC 2-3 day lag · GA4 ~1 day lag.

## Score

**Readiness: 45/100**

Strong on-site plumbing (dynamic sitemap, robots, AI-crawler allow-list, IndexNow, env-gated verification + Plausible hooks already coded), but every Google data channel is dark: no active Google verification, no analytics firing, property not granted (403), sitemap unsubmitted. The wiring exists — it just needs the tokens set and the property granted to flip on.

## Top 3 actions

1. **Verify GSC + grant the service account.** Set `GSC_VERIFICATION_TOKEN` (or DNS TXT), then add the service-account email as a GSC user. This clears the 403 and unlocks queries/pages/indexation.
2. **Turn analytics on.** Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=dmdfurnishing.com` (user pref). Without it there is zero traffic/conversion measurement. Add GA4 + grant the service account only if API-side GA4 reports are needed.
3. **Submit the sitemap + pick one source of truth.** After verification, submit `/sitemap.xml`; retire or index-link the static `DMD_Website.xml`/`projects.xml` so GSC reads one canonical list.
