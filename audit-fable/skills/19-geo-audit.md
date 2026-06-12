# Skill Audit 19 — geo-audit

**Skill purpose:** Full Generative Engine Optimization (GEO) audit — measure how well a site can be discovered, understood, cited, and recommended by AI search systems (ChatGPT, Claude, Perplexity, Gemini, AI Overviews). Produces a composite GEO score + prioritized fixes.

**Target:** DMD Furnishing (B2B hospitality FF&E manufacturer, lead-gen). Source: `C:\Users\chin\dmdfurnishingwebsite-fable`. Live: http://localhost:3006. Production: https://dmdfurnishing.com.

**Date:** 2026-06-10

**Status:** PASS (strong). GEO foundation is mature — AI crawlers explicitly allow-listed, llms.txt + llms-full.txt populated, deep schema graph, SSR-rendered citable content, dated/authored articles. Main gaps are entity-typing (author = Organization not Person), thin numeric trust proof, and off-site brand authority (not checkable from source — needs live APIs).

---

## GEO audit routine

| Section | Result | Evidence |
|---|---|---|
| Crawler access (AI bots) | ✅ | `public/robots.txt` (live `/robots.txt`): `User-agent: *` Allow `/`, Disallow `/api/`. Explicit Allow blocks for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, OAI-SearchBot, ChatGPT-User, anthropic-ai, cohere-ai. No accidental AI blocking. |
| llms.txt / AI discovery | ✅ | `/llms.txt` (200) structured: About, Contact, Services, Markets, Key Pages, Product Categories. `/llms-full.txt` (200, 268 lines) full content incl. all 6 blog posts + 2 guides + geo coverage. `/.well-known/llms.txt` mirror also 200. |
| Content extractability (SSR) | ✅ | Real text in server HTML, not JS-only. Blog `/blog/what-is-ffe-hospitality` = 1,949 words after stripping scripts; guide `/guides/hospitality-ffe` = 1,860 words; homepage = 3,170 words. Clean H1→H2 outline with question-style IDs (`#full-definition`, `#ffe-vs-ose`, `#budget-considerations`) — ideal for AI passage extraction. |
| Entity / schema graph | ⚠️ | Deep, interlinked JSON-LD: homepage has 10 `ld+json` blocks (Organization, FurnitureStore/LocalBusiness, WebSite+SearchAction, FAQPage w/ 7 Q&A, GeoCoordinates, OpeningHours, Speakable). Inner pages add BlogPosting, Article, CollectionPage, BreadcrumbList, ItemList. Stable `@id` anchors (`/#organization`, `/#localbusiness`, `/#website`). **Gap:** author node typed `"@type":"Organization"` at id `…/author/…#person` while `BlogPosting.author` references that `#person` @id → type/anchor mismatch (should be `Person` or `Organization` consistently). `/services` correctly carries 12 `Service` + 1 `OfferCatalog`. |
| E-E-A-T signals | ⚠️ | Dedicated author page `/author/dmd-furnishing-editorial` (200, ProfilePage schema) with strong first-person Experience bio: "written and reviewed by the team that runs DMD Furnishing: project managers, shop floor leads, procurement coordinators, and installers… We do not outsource editorial." Every post attributes `author` → editorial @id. **Gap:** no named individual experts, no credentials/headshots; About page surfaces **zero** hard numeric proof (years in business, projects completed, sq ft, states served) — loose regex scan returned `[]`. |
| Freshness | ✅ | All 6 posts carry both `datePublished` + `dateModified`, modified dates newer than published (e.g. what-is-ffe pub 2026-03-02 / mod 2026-04-01; procurement-timeline mod 2026-04-02). Dates are recent (within ~10 weeks of audit). |
| Comparison / citable assets | ✅ | HTML comparison tables present where AI loves to cite: `/blog/hpl-veneer-solid-wood-hotel-casegoods`, `/blog/restaurant-seating-guide`, `/blog/what-is-ffe-hospitality` each render a `<table>`. FAQ Q&A blocks site-wide (homepage 7, product/hotel 3, guide 3, blog 4) — both visible HTML and FAQPage schema. SpeakableSpecification on homepage (`h1`, `[data-speakable]`). |
| Brand mentions (off-site) | ⚠️ | On-site entity links present: Organization `sameAs` → LinkedIn (`/company/dmd-usaa/`), Facebook, Instagram. **Off-site authority (Reddit, Wikipedia, YouTube, third-party citations, AI answer-share) NOT verifiable from source/live HTML — needs live APIs (Perplexity/SERP, GSC, social listening). Marked partial.** |

---

## Findings

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🟠 High | Author entity typing | `/author/dmd-furnishing-editorial` node is `"@type":"Organization"` but sits at `#person` @id that `BlogPosting.author` points to — AI/Google may not resolve author entity cleanly. | Make node `"@type":"Person"` OR `"@type":"Organization"` consistently and align the @id fragment; add `knowsAbout`, `sameAs` to the editorial entity. |
| 🟠 High | Thin trust proof | About/homepage carry no hard numbers (years operating, # projects, # hotels/keys delivered, factory sq ft, states served). AI answers favor sites with concrete, citable stats. | Add a verified stats block (e.g. "X years, Y projects, Z states") on About + homepage, mirror into `llms.txt`. |
| 🟡 Medium | No named human experts | E-E-A-T leans on "team" only; no individual author with title/credentials/photo. | Add 1–2 named experts (title, bio, LinkedIn `sameAs`) as `Person` contributors for top guides. |
| 🟡 Medium | sameAs breadth | Only 3 social profiles in `sameAs`; no Wikidata/Crunchbase/industry-directory links to strengthen entity disambiguation. | Add authoritative third-party profiles to Organization `sameAs` as they exist. |
| 🟢 Low | Dual sitemap naming | `/sitemap.xml` is the valid URL sitemap (231 `<loc>`); `/DMD_Website.xml` is a product-data catalog (`<places>`, 0 `<loc>`) — fine, but name implies sitemap and could confuse crawlers/auditors. | Optional: rename data file (e.g. `catalog.xml`) to avoid "sitemap" confusion. |
| 🟢 Low | Off-site presence unmeasured | Brand authority in AI answers can't be confirmed here. | Run Perplexity/ChatGPT brand-mention probes + GSC/social listening to baseline AI answer-share. |

---

## Score

**87 / 100 — Good (strong GEO foundation, top of band)**

| Category (skill weights) | Score | Note |
|---|---|---|
| AI Citability (25%) | 92 | SSR text, tables, FAQ blocks, clean question-headings, speakable |
| Brand Authority (20%) | 70 | On-site sameAs good; off-site unverified (partial/API) |
| Content E-E-A-T (20%) | 82 | Real authored/dated content; missing named experts + numeric proof |
| Technical GEO (15%) | 96 | AI bots allow-listed, llms.txt + full + well-known mirror, valid sitemap |
| Schema & Structured Data (10%) | 88 | Rich interlinked graph; author type/id mismatch is the one dent |
| Platform Optimization (10%) | 80 | Ready for AI Overviews/Perplexity; off-platform footprint unverified |

Weighted ≈ **87/100**.

---

## Top 3 actions

1. **Fix author entity typing** — make `/author/dmd-furnishing-editorial` a consistent `Person`/`Organization` node matching the `#person` @id that all `BlogPosting.author` references use; add `sameAs` + `knowsAbout`. (High, schema one-liner.)
2. **Add citable numeric proof** — put a verified stats block (years, projects, states, capacity) on About + homepage and mirror it into `llms.txt`; this is the single biggest AI-citation lift for a B2B manufacturer.
3. **Baseline off-site AI brand authority** — run live Perplexity/ChatGPT/SERP + social-listening probes (the API-gated section) to measure current AI answer-share and find third-party citation gaps.
