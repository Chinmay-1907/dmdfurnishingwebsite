# Skill Audit 18 — geo

**Skill purpose:** GEO base checklist — make the site easy for AI search engines (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) to crawl, extract, and cite, while keeping traditional SEO intact.
**Target:** DMD Furnishing — B2B hospitality FF&E manufacturer. Source: `C:\Users\chin\dmdfurnishingwebsite-fable`. Live: http://localhost:3006 (production https://dmdfurnishing.com).
**Date:** 2026-06-10
**Status:** Done — live HTML + source verified. Live AI-answer testing (does ChatGPT/Perplexity actually cite DMD) is **partial — needs API**; method noted under Findings.

## GEO checklist applied

| Check | Result | Evidence |
|---|---|---|
| AI crawler access (robots.txt) | ✅ | `public/robots.txt` live 200. `User-agent: *` Allow `/`, Disallow `/api/`. Explicit allow-list for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, OAI-SearchBot, ChatGPT-User, anthropic-ai, cohere-ai. Sitemap declared. |
| llms.txt present + structured | ✅ | `public/llms.txt` live 200, 7 KB. Clean H1/H2: About, Contact, Services, Markets, Key Pages, Process, Materials, Industry Glossary, FAQs, Products, Guides, Projects, Target Audience, Geographic Coverage. `llms-full.txt` also 200. |
| .well-known mirror | ✅ | Real file at `public/.well-known/llms.txt` (7031 bytes), live 200, byte-identical opening to root copy. Two physical files — keep them in sync on every edit. |
| Sitemap reachable by AI | ✅ | `/sitemap.xml` live 200, **231 `<loc>` URLs**. `/DMD_Website.xml` + `/projects.xml` also 200. |
| Extractable / answer-first content | ⚠️ | FAQPage schema gives clean Q/A answer blocks on homepage (7 Q/A), products (3), blog (4). BUT **0 of 6 blog posts** have a visible TL;DR / key-takeaways / "in short" block at the top — AI extractors lean on the schema, not a human-readable answer-first lede. |
| Entity schema (Organization / LocalBusiness) | ✅ | Homepage emits a single JSON-LD `@graph` with `Organization` + `FurnitureStore` (LocalBusiness subtype) carrying `PostalAddress`, `GeoCoordinates`, `ContactPoint`, `OpeningHoursSpecification`, `OfferCatalog`, `sameAs` LinkedIn. Consistent across product + blog pages. |
| FAQ / Q&A schema | ✅ | `FAQPage` with `Question`/`Answer` on homepage (7), `/products/hotel` (3), blog post (4). `SpeakableSpecification` present on homepage + blog. |
| Page-type schema breadth | ✅ | Product = `CollectionPage` + `BreadcrumbList` + `ItemList` (49 `ListItem`). Blog = `BlogPosting` + `BreadcrumbList`. Homepage = `WebSite` + `SearchAction`. |
| Citable facts have inline sources | ⚠️ | Posts DO carry external authority links — `what-is-ffe` → ahla.com; `hpl-veneer` → fpl.fs.usda.gov + awinet.org; `value-engineering` → aia.org, nfpa.org, ada.gov. BUT the flagship **"FF&E = 15-25% of construction cost"** stat has **no inline cite** next to it in 3 places (`app/page.js:115`, `app/blog/what-is-ffe-hospitality/page.js:122`, `app/guides/hospitality-ffe/page.js:172`) and is baked verbatim into FAQPage schema — exactly what AI lifts. |
| Author E-E-A-T = Organization, not Person | ✅ | `app/author/dmd-furnishing-editorial/page.js:43` → `@type: 'Organization'` ("DMD Furnishing Editorial Team") with `knowsAbout` (12 topics), `sameAs` LinkedIn, `ProfilePage`. Blog `author` @id resolves to this Org node — **no fake Person**. Note: the @id slug is `#person` (cosmetic mismatch, harmless). |
| Comparison / "vs" / alternatives assets | ❌ | No `/compare`, `/vs`, `/alternatives` routes. Only `hpl-veneer-solid-wood-hotel-casegoods` is comparison-shaped, and it has no comparison table schema. AI "X vs Y" and "best/alternatives" queries have nothing structured to cite. |
| Live AI-answer citation test | ⚠️ | **Partial — needs API.** Checkable from source: crawlability, schema, llms.txt (all pass). NEEDS live API (ChatGPT/Perplexity/Gemini) to confirm DMD is actually surfaced/cited for "what is FF&E", "hospitality furniture manufacturer MA". Gap: run prompt-set across 3 engines, log citation + competitor share. |

## Findings

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🟠 high | 15-25% FF&E stat in schema | Most-quoted number on site is uncited in prose AND sits in machine-readable FAQPage schema on 3 pages. AI cites schema verbatim; an unsourced % is a hesitation/hallucination risk. | Add one authority cite (HVS / ISHC / AHLA) inline next to the stat in `app/page.js`, `what-is-ffe`, `hospitality-ffe` guide — or reframe as DMD first-party range ("in our projects, 15-25%"). Use `value-engineering` post (already links NFPA/AIA/ADA) as the template. |
| 🟠 high | No comparison assets | Zero structured "X vs Y / alternatives / best" pages — a top GEO query class for B2B buyers (HPL vs veneer, manufacturer vs broker, lead-time comparisons). | Build 1-2 comparison pages with a real HTML `<table>` + matching `ItemList`/`Article` schema. `hpl-veneer` content already exists — add a side-by-side table and comparison schema. |
| 🟡 medium | No answer-first lede in posts | 0/6 blog posts open with a TL;DR / 2-sentence direct answer. AI extractors prefer a self-contained opening passage over reconstructing from prose. | Add a 40-60 word bolded "Short answer:" block at the top of each post (mirror the FAQPage answer). Cheap, high-leverage. |
| 🟡 medium | Two physical llms.txt files | `public/llms.txt` and `public/.well-known/llms.txt` are separate files, not a redirect. They can silently drift on the next edit. | Either generate both from one source in the sitemap/llms build script, or make `.well-known` a redirect to the canonical. |
| 🟢 pass | Stale prior-audit note | Earlier audits flagged "only hpl-veneer cites NEMA." Live HTML shows hpl-veneer now cites **USDA Forest Products Lab + AWI** (no NEMA); multiple posts now carry authority links. Citation coverage is better than prior notes — only the 15-25% stat remains the real gap. | No action — record corrected baseline. |

## Score

**82 / 100**

- Crawler access + llms.txt + .well-known + sitemap: near-perfect (foundation done right).
- Entity + FAQ + page-type schema: strong and consistent across page types.
- Author E-E-A-T: correctly Organization, not a fabricated Person.
- Deductions: flagship stat uncited inside schema (−8), no comparison assets (−6), no answer-first ledes (−3), live AI-citation test unverified (−1).

## Top 3 actions

1. **Source the 15-25% FF&E stat** inline on all 3 surfaces (homepage, what-is-ffe, guide) — it leaks into FAQPage schema, which is exactly what AI quotes. Highest leverage, lowest effort.
2. **Ship 1-2 comparison pages** (start with HPL vs veneer vs solid wood) with a real table + comparison schema — captures the missing "vs / best / alternatives" GEO query class.
3. **Add answer-first ledes** to all 6 blog posts (40-60 word "Short answer" block mirroring the FAQ), then run a live 3-engine citation test (ChatGPT/Perplexity/Gemini) to baseline actual AI visibility.
