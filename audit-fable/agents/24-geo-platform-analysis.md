# Audit 24 — geo-platform-analysis (agent)

**Lens:** per-platform AI search readiness (how the site is positioned for ChatGPT, Perplexity, Google AI Overviews, Gemini, Bing Copilot — each engine's citation preferences)
**Target:** DMD Furnishing — B2B hospitality FF&E manufacturer · source `C:\Users\chin\dmdfurnishingwebsite-fable` (branch `fable-dmd`) · live `http://localhost:3006`
**Date:** 2026-06-10
**Status:** partial (live SERP/answer testing needs API — out of scope; on-site readiness fully checked from source + live HTML)

## What this lens audits

Whether the on-page and on-server signals that each AI engine relies on for *citing* a site are present. Not rankings — the plumbing each engine reads before it decides to quote you: crawler access, entity links, schema, freshness, index-push hooks, and verification tokens. Scored per platform because the same page can be 90-ready for one engine and 30 for another.

## Method

Read the real config and live HTML, no assumptions:
- `public/robots.txt` — AI crawler allow-list
- `public/llms.txt` (130 lines, fully populated) + `public/llms-full.txt`
- `app/layout.js` + `lib/metadata.js` — head metadata, verification tokens, JSON-LD schema source
- `scripts/submit-indexnow.js` + `package.json` scripts — IndexNow wiring
- `public/indexnow-key.txt` + `public/c2f5892f84b6428da1e0da44742db082.txt` — IndexNow key pair
- Live fetch of `/` and `/blog/what-is-ffe-hospitality` → counted rendered JSON-LD `@type` values and freshness fields

## Per-platform readiness

### ChatGPT / OAI-SearchBot (uses Bing index + OpenAI's own crawl)
**Present:** `OAI-SearchBot`, `GPTBot`, `ChatGPT-User` all explicitly `Allow: /` in robots.txt. `llms.txt` is rich (glossary, FAQs, entity facts, canonical URLs) — directly quotable. Organization schema renders live with `sameAs` (LinkedIn, Facebook, Instagram) and `knowsAbout`. Blog has author byline (`/author/dmd-furnishing-editorial`) + `datePublished`/`dateModified`.
**Missing:** No Wikipedia or Wikidata entry (strongest ChatGPT entity signals — `sameAs` points only to owned social, not knowledge bases). Bing-indexability depends on Bing Webmaster verification, which is **not active** (token is env-gated placeholder — see Bing section). No `.well-known/llms.txt` mirror (emerging convention noted in robots.txt comment but file absent).

### Perplexity / PerplexityBot
**Present:** `PerplexityBot Allow: /`. Fully server-rendered (Next.js SSR — confirmed live HTML returns complete content, no JS-execution dependency). `llms.txt` positions the site as the primary source with original definitions (FF&E, BOQ, HPL, value engineering). FAQPage schema live on homepage + blog.
**Missing:** No community-validation footprint visible from site (Reddit/Quora/forum mentions — off-site, not buildable here but the gap Perplexity weighs most). Content is authoritative but the site is the *only* corroborating source — Perplexity prefers cross-referenced facts.

### Google AI Overviews
**Present (strongest platform):** 10 JSON-LD blocks render live on `/`; blog renders BlogPosting + FAQPage (4 Q/A) + BreadcrumbList + SpeakableSpecification + dates. Question-style FAQ content extractable. Clean semantic SSR HTML. Definition patterns in llms.txt and glossary.
**Missing / unverifiable:** Google Search Console verification token is **env-gated placeholder** (`GSC_VERIFICATION_TOKEN` — not set, so no `google-site-verification` meta renders — confirmed absent in live head). AIO correlates heavily with top-10 organic position; ranking data needs GSC API (out of scope). Sitemap is referenced but GSC submission unverifiable without API.

### Google Gemini
**Present:** Same Google-ecosystem schema as AIO. `Google-Extended Allow: /` (permits Gemini training/grounding). LocalBusiness/FurnitureStore schema with geo coords + NAP consistent across schema, llms.txt, footer. Long-form guides (2 pillar guides + 6 blog posts) give topical depth Gemini favors.
**Missing:** No YouTube channel/videos in `sameAs` (Gemini leans on Google-owned video). No Google Business Profile signal verifiable from source (NAP is consistent, which helps a Knowledge Panel, but GBP itself is off-site). No Wikidata link.

### Bing Copilot
**Present:** IndexNow key pair exists and matches (`indexnow-key.txt` = `c2f5892f84b6428da1e0da44742db082`, and the hashed `c2f5...082.txt` key file is served from `/public`). `scripts/submit-indexnow.js` is correct and complete (POSTs sitemap URLs to api.indexnow.org). Professional B2B tone fits Copilot's enterprise context.
**Missing (weakest platform):** (1) `msvalidate.01` Bing Webmaster token is **env-gated placeholder** — `BING_VERIFICATION_TOKEN` not set, so no Bing verification meta renders (confirmed absent live). Bing/Copilot is the index ChatGPT *also* reads, so this gap hits two engines. (2) IndexNow script is **not wired** — it's absent from `package.json` scripts and has no postbuild/deploy hook; the script's own comment flags "wire into Netlify deploy-succeeded webhook" as an unfinished TODO. So the key exists but new/changed URLs are never auto-pushed to Bing.

## Findings

| Severity | Platform | Gap | Fix |
|---|---|---|---|
| 🔴 | Bing Copilot + ChatGPT | `msvalidate.01` Bing token env-gated, never set → Bing Webmaster unverified; blocks the index both engines read | Create Bing Webmaster property, set `BING_VERIFICATION_TOKEN` env var (layout.js already wires it conditionally) |
| 🔴 | Bing Copilot | IndexNow script exists but not wired to build/deploy — changed URLs never pushed | Add `postbuild` or Netlify deploy-succeeded hook calling `node scripts/submit-indexnow.js` |
| 🟠 | Google AIO + Gemini | `GSC_VERIFICATION_TOKEN` env-gated, never set → no Search Console verification meta | Create GSC property, set env var; submit `/sitemap.xml` in GSC |
| 🟠 | ChatGPT + Gemini | `sameAs` links only owned social, no Wikidata/Wikipedia → weak entity grounding | Create Wikidata entry for DMD Furnishing; add its URL to `organizationSchema.sameAs` in `lib/metadata.js` |
| 🟡 | Gemini | No YouTube presence in `sameAs` (Gemini weights Google-owned video) | Add a brand YouTube channel + link in `sameAs` when available |
| 🟡 | ChatGPT | `.well-known/llms.txt` mirror absent (robots.txt comment promises it) | Copy `public/llms.txt` to `public/.well-known/llms.txt` |
| 🟡 | Perplexity | Site is sole source for its facts; no off-site corroboration | Seed factual mentions on Reddit/industry forums + earn citations (off-site, not code) |
| 🟢 | All | Robots AI allow-list, SSR, llms.txt, 10 live schema blocks, FAQPage, BlogPosting, dates, author, Speakable all present and correct | Keep |

## Score: 68/100

Per-platform: Google AIO **82** (best — deep schema + SSR + freshness, only GSC verify missing) · Gemini **72** (ecosystem strong, no video/Wikidata) · Perplexity **70** (open + SSR + authoritative, no community corroboration) · ChatGPT **62** (open + llms.txt, but no Wikidata and rides Bing which is unverified) · Bing Copilot **52** (weakest — IndexNow built but unwired, Bing unverified). Average ≈ 68. The on-page foundation is excellent; every losing point is an unfinished *connection* (env tokens unset, IndexNow unhooked, no knowledge-base entity), not a content gap.

## Top 3 actions

1. **Set the two verification env vars and create the properties** (Bing Webmaster + Google Search Console). The code already conditionally renders both meta tags — they just need real tokens. This unlocks AIO, Gemini, ChatGPT (via Bing), and Copilot in one move.
2. **Wire IndexNow to deploy.** Add `submit-indexnow.js` to a `postbuild` script or Netlify deploy-succeeded webhook so Bing/Copilot get fresh URLs automatically — the script is done, it's just never called.
3. **Create a Wikidata entry and add it to `sameAs`** in `lib/metadata.js`. This is the single highest-leverage entity signal for ChatGPT and Gemini, and the only knowledge-base anchor the site currently lacks.
