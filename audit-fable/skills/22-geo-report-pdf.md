# Skill Audit 22 — geo-report-pdf (PDF-ready GEO report)

**Date:** 2026-06-10
**Client:** DMD Furnishing — B2B hospitality FF&E manufacturer
**Target:** https://dmdfurnishing.com (audited from source `C:\Users\chin\dmdfurnishingwebsite-fable`, branch `fable-dmd`, live dev `http://localhost:3006`)
**Skill applied:** `~/.claude/teams/seo/skills/geo-report-pdf/SKILL.md`
**Source findings consolidated from:** agents 01 (master GEO), 21 (seo-geo), 22 (ai-visibility), 23 (geo-content/E-E-A-T), 24 (platform-analysis), 25 (geo-schema), 26 (geo-technical).

---

## PDF render method (exact command per skill)

The `geo-report-pdf` skill prescribes a **ReportLab** Python generator. Below is the prescribed path, plus a verified working fallback for this Windows environment.

### Environment check (run 2026-06-10)
- `reportlab 4.4.10` — **installed** (under `python`, not `python3`).
- `pandoc` — **installed** (`C:\Users\chin\scoop\shims\pandoc`).
- Skill's prescribed script `~/.claude/skills/geo/scripts/generate_pdf_report.py` — **MISSING** (only `SKILL.md` ships in `geo-report-pdf/`; no `scripts/` payload on disk).
- Sibling `pretty-pdf` skill ReportLab component library — **present** at `~/.claude/skills/pretty-pdf/scripts/pdf_components.py`.

### Path A — prescribed ReportLab command (per skill, once script is restored)
```bash
# 1. (one-time) install engine
pip install reportlab

# 2. write the audit JSON (schema in geo-report-pdf/SKILL.md) to a temp file
#    -> /tmp/geo-audit-data.json   (Windows: %TEMP%\geo-audit-data.json)

# 3. render
python ~/.claude/skills/geo/scripts/generate_pdf_report.py \
  /tmp/geo-audit-data.json "GEO-REPORT-DMD-Furnishing.pdf"
```
The JSON for DMD is supplied at the end of this file (Appendix B) and matches the skill schema (geo_score, scores{6}, platforms{5}, findings[], quick_wins/medium_term/strategic, crawler_access).

### Path B — verified fallback that works in THIS environment (pandoc)
The prescribed script is not on disk, so to render today, convert this markdown directly:
```bash
# from audit-fable\skills\
pandoc 22-geo-report-pdf.md -o GEO-REPORT-DMD-Furnishing.pdf \
  --pdf-engine=wkhtmltopdf -V geometry:margin=2cm -V mainfont="Calibri" \
  --toc --metadata title="DMD Furnishing — GEO Audit Report"
```
If no LaTeX/wkhtmltopdf engine is present, render to styled HTML first (always available) then print to PDF from the browser:
```bash
pandoc 22-geo-report-pdf.md -s -o GEO-REPORT-DMD-Furnishing.html \
  --metadata title="DMD Furnishing — GEO Audit Report" --toc
# then open the .html and Ctrl+P -> Save as PDF
```

### Path C — pretty-pdf component library (richest visuals, ReportLab)
The `pretty-pdf` skill's `pdf_components.py` is present and gives score badges, progress bars, metric rows, colored status tables, and callouts. To use it, copy the library next to a small driver script and feed the Appendix B JSON:
```bash
cp ~/.claude/skills/pretty-pdf/scripts/pdf_components.py ./pdf_components.py
python build_geo_pdf.py   # driver imports pdf_components, reads the JSON, writes the PDF
```

**Recommendation:** Path B (pandoc → HTML → browser print) is the fastest reliable route right now because it needs zero missing scripts. Restore `generate_pdf_report.py` to use Path A as the skill intends.

---

## --- REPORT (print-ready) ---

> Print styling notes: each `##` is a page-break candidate. Score badges are rendered as text tags (`[ 78 / 100 — STRONG ]`) so they survive markdown→PDF with no images. Severity dots: 🔴 critical · 🟠 high · 🟡 medium · 🟢 pass.

---

## Cover

# DMD Furnishing
## Generative Engine Optimization (GEO) Audit Report

**Prepared for:** DMD Furnishing — Commercial & Hospitality FF&E Manufacturer
**Website:** https://dmdfurnishing.com
**Location:** 56 Leonard St Unit 5, Foxboro, MA 02035
**Report date:** 2026-06-10
**Scope:** AI answer-engine readiness — can ChatGPT, Perplexity, Google AI Overviews, Gemini, and Bing Copilot find, trust, extract, and cite DMD.

### Overall GEO Score

# [ 81 / 100 — STRONG ]

*Weighted composite of 6 dimensions. Reference-grade on-site foundation; every lost point is an unfinished off-site or verification connection, not a content defect.*

`Confidential — prepared for DMD Furnishing · GEO audit · 2026-06-10`

---

## Executive summary

DMD Furnishing has one of the most AI-ready on-site foundations a B2B manufacturer can have. AI crawlers are fully welcomed, the `llms.txt` files are real and richly structured, the schema graph is connected, and every page is fully server-rendered so AI crawlers (which do not run JavaScript) read the complete page. Content is written answer-first with FAQ blocks, speakable markup, and a published fact-check policy — textbook AI-liftable structure.

The gaps are not about quality; they are about **finishing connections**. Three things hold the score back. First, two verification tokens (Google Search Console and Bing Webmaster) are coded but never set, so Bing, Copilot, ChatGPT-via-Bing, AI Overviews, and Gemini cannot all fully confirm the site. Second, the brand has **no off-site authority anchor** — no Wikidata entry, no named human founder or author in the schema, and the most-quoted statistic on the site ("FF&E is 15–25% of build cost") carries no source. Third, there is no "best FF&E manufacturer" comparison asset, which is exactly the query class DMD is weakest on.

The top three moves are cheap and high-leverage: (1) set the two verification env vars and create the properties; (2) add a named founder/author as a `Person` entity and seed a Wikidata entry, then mirror both into schema and `llms.txt`; (3) source every headline statistic and ship one manufacturer-comparison page. Done together, these lift the weakest dimensions (schema entity richness, platform verification, off-site authority) without touching the already-excellent technical base.

**Verdict:** Strong, AI-ready, and ahead of nearly every competitor's site — but currently a "great house with the utilities not yet switched on." The remaining work is connection, not construction.

---

## Scorecard table

| Dimension | Score | Badge | One-line read |
|---|---|---|---|
| Technical foundation (SSR, crawler access, semantic HTML) | 94 | [ 94 — EXCELLENT ] | Reference-grade; full SSR on every page, AI crawlers read everything. |
| AI-visibility (robots + llms.txt + entity consistency) | 88 | [ 88 — EXCELLENT ] | Best-in-class crawler access + dual llms.txt; schema lacks a `description`. |
| GEO master (overall citability + E-E-A-T) | 87 | [ 87 — STRONG ] | Citable for "what is FF&E"; weak on "best manufacturer" query class. |
| Content / E-E-A-T (answer-first, sourced facts) | 84 | [ 84 — STRONG ] | Answer-first + fact-check policy; flagship stats are unsourced. |
| Platform readiness (per-engine plumbing) | 68 | [ 68 — MODERATE ] | Verification tokens unset; IndexNow built but unwired. |
| Schema entity graph (knowledge-graph build) | 66 | [ 66 — MODERATE ] | Connected `@id` graph; author mistyped, no founder, thin `sameAs`. |
| **OVERALL (weighted)** | **81** | **[ 81 — STRONG ]** | Excellent base; finish the off-site + verification connections. |

*Weighting: Technical 20% · AI-visibility 18% · GEO master 17% · Content 17% · Platform 14% · Schema 14%. Weighted total ≈ 81.*

### AI platform readiness (per engine)

| Platform | Readiness | Badge | Biggest gap |
|---|---|---|---|
| Google AI Overviews | 82 | [ 82 — STRONG ] | GSC verification token unset. |
| Google Gemini | 72 | [ 72 — STRONG ] | No YouTube in `sameAs`, no Wikidata. |
| Perplexity | 70 | [ 70 — STRONG ] | No off-site corroboration (site is sole source). |
| ChatGPT / OAI-Search | 62 | [ 62 — MODERATE ] | No Wikidata; rides Bing, which is unverified. |
| Bing Copilot | 52 | [ 52 — MODERATE ] | IndexNow unwired + Bing Webmaster unverified. |

---

## Findings by dimension

### 1. Technical foundation — [ 94 — EXCELLENT ]
- 🟢 **Full server-side rendering on every page.** Raw HTML (no JS) carries 7k–14k chars of real text, headings, and schema. `x-nextjs-prerender:1`. AI crawlers see the complete page. Only `error.js`/`not-found.js` are client components (correct).
- 🟢 **AI crawler access best-in-class.** `robots.txt` allow-lists GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, ChatGPT-User, CCBot, anthropic-ai, cohere-ai, Google-Extended; only `/api/` disallowed.
- 🟢 **Semantic HTML + security + speed.** Single `<h1>`, ordered headings, `<main>/<nav>/<header>/<footer>/<article>`, strict CSP, HSTS, gzip, `s-maxage` cache, 0.01–0.57s responses.
- 🟡 **Field Core Web Vitals unconfirmed.** Lab signals excellent; real-user LCP/INP/CLS need CrUX/PageSpeed on the live domain post-deploy (heavy 252 KB `/products/[place]` pages worth watching).
- 🟡 **Verification tokens unset** (shared with Platform dimension) — no GSC/Bing meta emitted.

### 2. AI-visibility — [ 88 — EXCELLENT ]
- 🟢 **0 of 12 priority AI crawlers blocked**; 9 explicitly allow-listed. No `X-Robots-Tag` traps in `_headers` or `next.config.js`; no project middleware.
- 🟢 **`llms.txt` (7 KB) + `llms-full.txt` (13 KB) + `/.well-known/llms.txt` mirror all live 200**, `text/plain`, with glossary (FF&E, Casegoods, BOQ, HPL, Value Engineering) and FAQs — genuinely citable, not boilerplate. The `.well-known` mirror is byte-identical.
- 🟡 **Schema has `name` but no `description`** on Organization/FurnitureStore — AI has no schema-level "DMD is…" to cross-confirm against meta + llms.txt.
- 🟡 **`alternateName` absent** — "DMD" / "DMD USA" (the LinkedIn `dmd-usaa` handle) not tied to the entity.
- 🟡 **4 AI bots rely on `*` only** (Applebot-Extended, Amazonbot, Bytespider, FacebookBot) — allowed, but not explicitly signaled.

### 3. GEO master / overall citability — [ 87 — STRONG ]
- 🟢 **Entity clarity (who/what/where) fully machine-readable** — Organization + FurnitureStore with GeoCoordinates, PostalAddress, foundingDate, 8-item knowsAbout, FAQPage, SpeakableSpecification, OfferCatalog.
- 🟢 **Extractable-answer format on blog** — question H2s with anchor IDs, clean self-contained first sentence after each definition heading.
- 🟠 **Homepage `<title>` omits the brand** ("Hospitality Furniture Manufacturer | Custom FF&E") while every interior page and `og:title` carry "DMD Furnishing" — weak brand/entity signal on the top page.
- 🟡 **No manufacturer-comparison / "best FF&E" listicle or comparison-table** — the exact format AI cites for "best X" queries; DMD's weakest query class.
- 🟡 **Sitemap `lastmod` mostly hardcoded** (`LAST_BUILD = '2026-06-10'` on 224 of 231 URLs) — dilutes freshness signal.

### 4. Content / E-E-A-T — [ 84 — STRONG ]
- 🟢 **Answer-first done right on all 8 articles** — `AnswerCallout` + `data-speakable="lede"` + question H2s, verified in SSR HTML. FAQ blocks present as visible Q&A + `FAQPage` JSON-LD.
- 🟢 **Author page is the strongest single trust asset** — published fact-check/corrections policy ("We do not invent statistics…"), `knowsAbout`, ProfilePage schema, NAP, article index. Rare and high-value.
- 🟢 **Fresh dates** — all content 2026 (≤3 months), visible + schema `datePublished`/`dateModified`.
- 🟠 **Flagship statistic is unsourced** — "FF&E typically represents 15–25% of construction costs" appears in prose AND FAQ schema with no citation; AI will lift it and attribute it to DMD with no authority behind it. Same for "10–15% contingency."
- 🟡 **Bare dimensional specs** in `restaurant-seating-guide` (sq-ft/seat, seat heights) — industry-standard but unanchored.
- 🟡 **Thin outbound sourcing on 3 posts** (1 citation each) and **no named-person author** caps the Expertise signal.

### 5. Platform readiness — [ 68 — MODERATE ]
- 🔴 **Bing Webmaster token (`msvalidate.01`) env-gated and never set** — Bing unverified; this hits both Copilot AND ChatGPT (which reads the Bing index).
- 🔴 **IndexNow built but unwired** — key pair exists and `scripts/submit-indexnow.js` is correct, but it is absent from `package.json` scripts with no postbuild/deploy hook; changed URLs never auto-push to Bing.
- 🟠 **GSC verification token env-gated and never set** — no `google-site-verification` meta; blocks AIO/Gemini crawl-data confirmation.
- 🟠 **`sameAs` links only owned social** — no Wikidata/Wikipedia knowledge-base anchor (the strongest ChatGPT/Gemini entity signal).
- 🟡 **No YouTube** in `sameAs` (Gemini weights Google-owned video); **Perplexity** sees the site as the sole source for its facts (no off-site corroboration).

### 6. Schema entity graph — [ 66 — MODERATE ]
- 🔴 **Author node mistyped** — `app/author/.../page.js` types the author as `Organization` but every blog post references it as `author:{@id:…#person}`; AI sees "an article authored by an Organization."
- 🔴 **No `founder` entity anywhere** — `foundingDate:'2021'` exists but no named human; AI cannot attach a person to the brand.
- 🟠 **Blog `publisher` is an inline duplicate** Organization (not `{@id:…#organization}`) — creates phantom duplicate org nodes per blog page.
- 🟠 **`sameAs` has zero authority/knowledge-graph anchors** (no Wikidata, Google KG, ThomasNet, Houzz).
- 🟡 **Logo URL split** (PNG vs SVG across schemas) and **llms.txt lists only LinkedIn** while schema lists 3 socials — entity facts drift between the two AI-facing sources.

---

## Action plan

### Quick wins (this week — high leverage, low effort)
1. **Set `GSC_VERIFICATION_TOKEN` + `BING_VERIFICATION_TOKEN` env vars** in Netlify and create both properties. Code already renders the meta conditionally — one move unlocks AIO, Gemini, ChatGPT-via-Bing, and Copilot.
2. **Add `| DMD Furnishing` to the homepage `<title>`** (1 line in `app/page` metadata) — fixes the only weak brand/entity signal on the top page.
3. **Add `description` + `alternateName:["DMD","DMD USA"]` to Organization/FurnitureStore schema** — copy the llms.txt About sentence verbatim so all three AI-facing surfaces agree.
4. **Add explicit `robots.txt Allow:/` blocks** for Applebot-Extended, Amazonbot, Bytespider, FacebookBot — parity with the existing 9-bot pattern.
5. **Source the 15–25% FF&E-cost stat** (and 10–15% contingency) in `what-is-ffe-hospitality` — inline citation to HVS/ISHC/AHLA, or reword as stated experience. It is the most-quoted number on the site.

### Medium-term (this month)
6. **Fix the author entity** — make `#person` a real `Person` (or rename the fragment) and add `worksFor:{@id:…#organization}`; repairs author understanding across all 6 posts at once.
7. **Add a named founder** as `founder:{@type:'Person', sameAs:[LinkedIn]}` in `lib/metadata.js` — gives AI a human anchor and a new authority `sameAs` path.
8. **Wire IndexNow to deploy** — add `submit-indexnow.js` to a `postbuild` script or Netlify deploy-succeeded webhook so Bing/Copilot get fresh URLs automatically.
9. **De-duplicate Organization references** — replace inline blog `publisher` with `{@id:…#organization}`, unify the logo URL, mirror all `sameAs` + facts into `llms.txt`.
10. **Anchor remaining bare stats** (restaurant dimensional specs) and **raise outbound citations to 2+** on the three thin posts.
11. **Replace hardcoded sitemap `lastmod`** with real content dates for products/projects/guides.

### Strategic (this quarter — off-site authority)
12. **Create a Wikidata entry for DMD Furnishing** and add its URL to `organizationSchema.sameAs` — the single highest-leverage entity signal for ChatGPT and Gemini, and the only knowledge-base anchor the site lacks.
13. **Ship one "how to choose an FF&E manufacturer" comparison-table page** to win the "best hospitality FF&E manufacturer" answer slot — directly targets DMD's weakest query class.
14. **Seed off-site corroboration** — trade directories (ISHC, BDNY/ThomasNet/Houzz exhibitor lists), a brand YouTube channel (Gemini video signal), and factual mentions on Reddit/industry forums (Perplexity cross-reference signal).
15. **Track AI-citation reality** via DataForSEO LLM-mention search + live prompt-testing — confirm whether ChatGPT/Perplexity/Claude actually cite DMD (the one blind spot source inspection cannot answer).

---

## Appendix: sources

### A. Audit basis
- **Consolidated from 7 dimension audits** (this `audit-fable` workspace):
  - `audit-fable/agents/01-seo-geo-auditor.md` — master GEO health (88).
  - `audit-fable/agents/21-seo-geo.md` — GEO citability (87).
  - `audit-fable/agents/22-geo-ai-visibility.md` — crawler + llms.txt + entity consistency (88).
  - `audit-fable/agents/23-geo-content.md` — E-E-A-T / citation readiness (84).
  - `audit-fable/agents/24-geo-platform-analysis.md` — per-platform readiness (68).
  - `audit-fable/agents/25-geo-schema.md` — entity graph (66).
  - `audit-fable/agents/26-geo-technical.md` — technical foundations (94).
- **Site snapshot:** `audit-fable/_site-snapshot.md`.
- **Live verification:** `http://localhost:3006` (SSR HTML, JSON-LD, robots/llms/sitemap), 2026-06-10. Prod domain `https://dmdfurnishing.com`.
- **Files cited in findings:** `public/robots.txt`, `public/llms.txt`, `public/llms-full.txt`, `public/.well-known/llms.txt`, `lib/metadata.js`, `app/layout.js`, `app/page.js`, `app/sitemap.js`, `app/author/dmd-furnishing-editorial/page.js`, `app/blog/what-is-ffe-hospitality/page.js`, `scripts/submit-indexnow.js`, `public/indexnow-key.txt`.

### B. Audit JSON for the ReportLab generator (skill schema)
Save as `/tmp/geo-audit-data.json` for Path A / Path C above.
```json
{
  "url": "https://dmdfurnishing.com",
  "brand_name": "DMD Furnishing",
  "date": "2026-06-10",
  "geo_score": 81,
  "scores": {
    "ai_citability": 87,
    "brand_authority": 70,
    "content_eeat": 84,
    "technical": 94,
    "schema": 66,
    "platform_optimization": 68
  },
  "platforms": {
    "Google AI Overviews": 82,
    "Gemini": 72,
    "Perplexity": 70,
    "ChatGPT": 62,
    "Bing Copilot": 52
  },
  "executive_summary": "DMD Furnishing has a reference-grade on-site GEO foundation: AI crawlers fully welcomed, dual structured llms.txt files live, a connected schema graph, and full server-side rendering so AI crawlers read every page. Content is answer-first with FAQ schema, speakable markup, and a rare published fact-check policy. The gaps are unfinished connections, not quality defects: two verification tokens (GSC, Bing) are coded but unset, there is no off-site authority anchor (no Wikidata, no named founder/author Person), the most-quoted statistic is unsourced, and there is no manufacturer-comparison page for the 'best FF&E manufacturer' query class. Setting the tokens, adding a named founder + Wikidata entry, sourcing stats, and shipping one comparison page lifts the weakest dimensions without touching the excellent technical base.",
  "findings": [
    {"severity": "critical", "title": "Bing Webmaster token unset", "description": "msvalidate.01 env-gated and never set; Bing unverified, which hits both Copilot and ChatGPT (reads Bing index)."},
    {"severity": "critical", "title": "IndexNow built but unwired", "description": "Key pair + submit-indexnow.js exist and are correct, but absent from package.json scripts with no deploy hook; changed URLs never auto-push to Bing."},
    {"severity": "critical", "title": "Author entity mistyped", "description": "Author node typed Organization while blog posts reference it as author #person; AI sees 'article authored by an Organization'."},
    {"severity": "critical", "title": "No founder Person entity", "description": "foundingDate:2021 exists but no named human founder; AI cannot attach a person to the brand."},
    {"severity": "high", "title": "Flagship statistic unsourced", "description": "'FF&E is 15-25% of build cost' appears in prose and FAQ schema with no citation; AI lifts it and attributes it to DMD with no authority."},
    {"severity": "high", "title": "GSC verification token unset", "description": "No google-site-verification meta; blocks AIO/Gemini crawl-data confirmation."},
    {"severity": "high", "title": "sameAs lacks authority anchor", "description": "Only owned social links; no Wikidata/Wikipedia/Google KG — the strongest ChatGPT/Gemini entity signal is missing."},
    {"severity": "high", "title": "Homepage title omits brand", "description": "Homepage <title> lacks 'DMD Furnishing' while every interior page and og:title carry it; weak brand/entity signal on the top page."},
    {"severity": "medium", "title": "No manufacturer-comparison asset", "description": "No 'best FF&E manufacturer' listicle or comparison-table — the format AI cites for 'best X' queries; DMD's weakest query class."},
    {"severity": "medium", "title": "Schema missing description + alternateName", "description": "Organization/FurnitureStore have name but no description and no alternateName; AI cannot cross-confirm 'DMD is...' or link DMD/DMD USA variants."},
    {"severity": "medium", "title": "Inline blog publisher duplication", "description": "BlogPosting publisher is an inline Organization, not @id ref; creates phantom duplicate org nodes per blog page."},
    {"severity": "medium", "title": "Sitemap freshness diluted", "description": "224 of 231 URLs share a hardcoded LAST_BUILD lastmod; only blog uses real dates."}
  ],
  "quick_wins": [
    "Set GSC + Bing verification env vars and create both properties (code already renders meta conditionally)",
    "Add '| DMD Furnishing' to the homepage <title>",
    "Add description + alternateName:['DMD','DMD USA'] to Organization/FurnitureStore schema (copy llms.txt About line)",
    "Add explicit robots.txt Allow:/ blocks for Applebot-Extended, Amazonbot, Bytespider, FacebookBot",
    "Source the 15-25% FF&E-cost stat (and 10-15% contingency) in what-is-ffe-hospitality"
  ],
  "medium_term": [
    "Fix the author entity to a real Person and add worksFor -> #organization",
    "Add a named founder:{@type:'Person', sameAs:[LinkedIn]} to lib/metadata.js",
    "Wire IndexNow to a postbuild script or Netlify deploy-succeeded webhook",
    "De-duplicate blog publisher to {@id:#organization}, unify logo URL, mirror sameAs+facts into llms.txt",
    "Anchor bare dimensional specs and raise outbound citations to 2+ on the three thin posts",
    "Replace hardcoded sitemap lastmod with real content dates for products/projects/guides"
  ],
  "strategic": [
    "Create a Wikidata entry for DMD Furnishing and add its URL to organizationSchema.sameAs",
    "Ship one 'how to choose an FF&E manufacturer' comparison-table page",
    "Seed off-site corroboration: trade directories (ISHC/BDNY/ThomasNet/Houzz), brand YouTube channel, Reddit/industry-forum mentions",
    "Track real AI-citation visibility via DataForSEO LLM-mention search + live prompt-testing"
  ],
  "crawler_access": {
    "GPTBot": {"platform": "ChatGPT", "status": "Allowed", "recommendation": "Keep allowed (explicit)"},
    "OAI-SearchBot": {"platform": "ChatGPT Search", "status": "Allowed", "recommendation": "Keep allowed (explicit)"},
    "ChatGPT-User": {"platform": "ChatGPT", "status": "Allowed", "recommendation": "Keep allowed (explicit)"},
    "ClaudeBot": {"platform": "Claude", "status": "Allowed", "recommendation": "Keep allowed (explicit)"},
    "PerplexityBot": {"platform": "Perplexity", "status": "Allowed", "recommendation": "Keep allowed (explicit)"},
    "Google-Extended": {"platform": "Gemini / AIO", "status": "Allowed", "recommendation": "Keep allowed (opts into AI grounding/training)"},
    "CCBot": {"platform": "Common Crawl", "status": "Allowed", "recommendation": "Keep allowed (explicit)"},
    "anthropic-ai": {"platform": "Anthropic", "status": "Allowed", "recommendation": "Keep allowed (explicit)"},
    "cohere-ai": {"platform": "Cohere", "status": "Allowed", "recommendation": "Keep allowed (explicit)"},
    "Applebot-Extended": {"platform": "Apple Intelligence", "status": "Allowed (via *)", "recommendation": "Add explicit Allow:/ block for parity"},
    "Amazonbot": {"platform": "Amazon", "status": "Allowed (via *)", "recommendation": "Add explicit Allow:/ block for parity"},
    "Bytespider": {"platform": "TikTok/ByteDance", "status": "Allowed (via *)", "recommendation": "Add explicit block; decide policy"},
    "FacebookBot": {"platform": "Meta AI", "status": "Allowed (via *)", "recommendation": "Add explicit Allow:/ block for parity"}
  }
}
```

### C. Glossary (for the client)
- **GEO** — Generative Engine Optimization: making a site easy for AI answer engines to find, trust, extract, and cite.
- **llms.txt** — a plain-text file that hands AI engines a clean, structured summary of the site (like a press kit for robots).
- **SSR** — server-side rendering: the server sends the full page text in HTML, so AI crawlers (which do not run JavaScript) can read everything.
- **Schema / JSON-LD** — structured data in the page that tells AI "this is the company, this is the author, this is the address."
- **`sameAs`** — schema links that connect the brand to outside profiles (LinkedIn, Wikidata) so AI knows it is one entity.
- **E-E-A-T** — Experience, Expertise, Authoritativeness, Trust: the signals AI weighs before quoting a page.
- **IndexNow** — a ping that tells Bing/Copilot the moment a URL changes so it re-crawls fast.
