# Audit 22 — geo-ai-visibility (agent)

**Lens:** AI crawler access + llms.txt + brand mentions
**Target:** DMD Furnishing — B2B hospitality FF&E manufacturer (https://dmdfurnishing.com) · live dev http://localhost:3006
**Date:** 2026-06-10
**Status:** PASS (strong) — AI-discovery surface is real and reachable; gaps are coverage/consistency, not blocking.

## What this lens audits

How well AI search engines and LLMs can reach, read, and correctly attribute this site:
1. **AI-crawler access** — does `robots.txt` allow GPTBot, ClaudeBot, PerplexityBot and the rest, or silently block them.
2. **llms.txt surface** — root `/llms.txt`, the `/.well-known/llms.txt` mirror, and `/llms-full.txt` actually reachable with content.
3. **Brand entity consistency** — same name/description across llms.txt, schema, and meta so an AI cites one clean entity.
4. **No hidden blocking** — `_headers`, `next.config.js`, middleware not stripping crawlers or adding `X-Robots-Tag: noindex`.

## Method

Live checks against `:3006` with `curl` (status + headers + body), plus source reads of `public/robots.txt`, `public/llms.txt`, `public/llms-full.txt`, `public/.well-known/llms.txt`, `public/_headers`, `next.config.js`. No project `middleware.ts` exists (only Next.js internals). Schema name/description pulled live from homepage `ld+json`.

## AI-crawler access matrix (crawler → allowed?)

robots.txt has `User-agent: *` → `Allow: /` / `Disallow: /api/`, so **every crawler is allowed by default**; 9 AI bots are also explicitly allow-listed (redundant but harmless and signals intent). "Explicit" = own block in robots.txt.

| Crawler | Tier | Allowed? | How |
|---|---|---|---|
| GPTBot | 1 | ✅ | Explicit block |
| OAI-SearchBot | 1 | ✅ | Explicit block |
| ChatGPT-User | 1 | ✅ | Explicit block |
| ClaudeBot | 1 | ✅ | Explicit block |
| PerplexityBot | 1 | ✅ | Explicit block |
| Google-Extended | 2 | ✅ | Explicit block |
| Applebot-Extended | 2 | ✅ | Via `*` only (not explicit) |
| Amazonbot | 2 | ✅ | Via `*` only |
| FacebookBot / meta-externalagent | 2 | ✅ | Via `*` only |
| CCBot | 3 | ✅ | Explicit block |
| anthropic-ai | 3 | ✅ | Explicit block |
| Bytespider | 3 | ✅ | Via `*` only |
| cohere-ai | 3 | ✅ | Explicit block |

**Crawler-access score: 100/100** — 0 of the 12 lens crawlers blocked. No `Disallow` traps other than `/api/` (correct — those are OTP/consultation endpoints, not content). No `X-Robots-Tag` anywhere in `_headers` or `next.config.js`.

## llms.txt / .well-known check (path → status)

| Path | HTTP | Size | Notes |
|---|---|---|---|
| `/robots.txt` | 200 | — | Allows all + 9 AI bots; `Sitemap:` points to prod `/sitemap.xml`; comment claims `.well-known` mirror |
| `/llms.txt` | 200 | 7031 B | Full structured doc — H1, About, Contact, Services, Markets, Key Pages, Glossary, FAQs, Products, Guides |
| `/.well-known/llms.txt` | 200 | 7031 B | **Mirror confirmed real** — byte-identical to root (robots comment is truthful) |
| `/llms-full.txt` | 200 | 12939 B | Consolidated full-content snapshot, links back to canonical URLs + sitemap |
| `/sitemap.xml` | 200 | — | Reachable (rewrite to `DMD_Website.xml`) |

`Content-Type: text/plain; charset=UTF-8` on llms.txt — correct, not HTML. Quality is strong: opens with a clean "DMD Furnishing is a B2B commercial furniture manufacturer..." definition, has an Industry Glossary (FF&E, Casegoods, BOQ, HPL, Value Engineering) and FAQs — exactly the extractable, self-contained passages AI engines cite.

## Findings (Severity | Item | Issue | Fix)

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🟢 | robots AI rules | 0/12 crawlers blocked; 9 explicitly allowed; `*` covers the rest | None |
| 🟢 | `.well-known` mirror | Exists and is byte-identical to root llms.txt (200, 7031 B) | None |
| 🟢 | llms-full.txt | Present, 12.9 KB, well-structured, links to canonical | None |
| 🟢 | Crawler headers | No `X-Robots-Tag`/blocking in `_headers`, `next.config.js`; no project middleware | None |
| 🟡 | Schema description gap | `Organization` and `FurnitureStore` blocks have a `name` but **no `description`** field — brand definition lives only in meta + llms.txt, so AI has no schema-level "X is..." to cross-confirm | Add identical `description` to Organization + FurnitureStore schema, matching the llms.txt About line |
| 🟡 | Missing AI bots in explicit list | `Applebot-Extended`, `Amazonbot`, `Bytespider`, `FacebookBot` rely on `*` only — allowed, but not signaled | Add explicit `Allow: /` blocks for these 4 for parity + clear intent |
| 🟡 | `alternateName` absent | No `alternateName`/`legalName` on Organization — "DMD", "DMD USA" (LinkedIn `/dmd-usaa/`) not tied to the entity | Add `alternateName: ["DMD","DMD USA"]` so AI links brand variants |
| 🟢 | Name consistency | "DMD Furnishing" identical across llms.txt H1, Organization, FurnitureStore, meta `og:site_name`, title | None |
| 🟡 | Two llms surfaces, no `X-Robots` allow header | llms.txt served with `Cache-Control: public, max-age=0` (fine) but no positive signal it's indexable content | Optional: nothing required; acceptable as-is |

## Score (88/100)

| Component | Weight | Score | Weighted |
|---|---|---|---|
| Crawler Access | 25% | 100 | 25.0 |
| llms.txt (presence + mirror + full + quality) | 10% | 100 | 10.0 |
| Citability (llms.txt passages, glossary, FAQ, definitions) | 35% | 88 | 30.8 |
| Brand entity consistency (name ✅; schema description + alternateName missing) | 30% | 73 | 21.9 |
| **Total** | | | **~88/100 — Excellent** |

Brand-mention platform reach (Wikipedia/Reddit/YouTube/LinkedIn) not measurable from source/live HTML — needs Wikipedia API + web checks (status: partial, API needed). Only LinkedIn `/company/dmd-usaa/` is confirmed (cited in llms.txt + snapshot). Score above is the on-site, fully verifiable portion.

## Top 3 actions

1. **Add `description` to Organization + FurnitureStore schema** (15 min) — copy the llms.txt About sentence verbatim so AI engines get one identical, schema-anchored brand definition across all three surfaces. Biggest entity-consistency win.
2. **Add `alternateName: ["DMD","DMD USA"]` to Organization schema** (5 min) — ties brand variants (incl. the LinkedIn `dmd-usaa` handle) to the single entity so AI doesn't fragment mentions.
3. **Add explicit robots.txt `Allow: /` blocks for Applebot-Extended, Amazonbot, Bytespider, FacebookBot** (5 min) — they're already allowed via `*`, but explicit blocks remove ambiguity and match the existing 9-bot pattern.
