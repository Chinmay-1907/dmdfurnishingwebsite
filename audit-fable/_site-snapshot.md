# DMD Furnishing — Shared Site Snapshot (for all audit subagents)

> Read this FIRST. Grounds every agent/skill audit so you don't re-crawl blind.
> Audit the REAL site. Cite real paths, real tag values, real issues. Date: 2026-06-10.

## Identity
- **Business:** DMD Furnishing — B2B commercial/hospitality FF&E (Furniture, Fixtures & Equipment) manufacturer.
- **Type:** Lead-gen B2B manufacturer site (NOT ecommerce — no cart/checkout/prices). Conversion = consultation request.
- **Location:** 56 Leonard St Unit 5, Foxboro, MA 02035 · Phone +1 (617) 223-7781 · sales@dmdfurnishing.com · LinkedIn /company/dmd-usaa/
- **Markets:** Hotels, restaurants, offices, education, healthcare, franchise renovation.
- **Production domain:** https://dmdfurnishing.com

## Stack / location
- **Source root:** `C:\Users\chin\dmdfurnishingwebsite-fable`  (branch `fable-dmd`)
- **Framework:** Next.js `^15.5.15`, React `^19.1.0` (App Router, SSR).
- **Live dev server:** http://localhost:3006  (UP, returns full SSR HTML). Use this for live-HTML checks.
- **Build out dir:** not currently built (`out/` empty) — audit source + live dev.
- **Scripts:** dev, start, build, lint, generate:sitemap, generate:residential, optimize:living-room.

## Routes (app/ — 23 page files)
- `/` homepage
- `/about`, `/services`, `/contact`, `/projects`, `/inspirations`
- `/products` , `/products/[placeSlug]` (e.g. /products/hotel), `/products/[placeSlug]/[typeSlug]`
- `/projects/[projectId]`
- `/inspirations/[slug]`
- `/blog` + 6 posts: ffe-procurement-timeline, hotel-guestroom-furniture-checklist, hpl-veneer-solid-wood-hotel-casegoods, restaurant-seating-guide, value-engineering-commercial-furniture, what-is-ffe-hospitality
- `/guides` + 2: commercial-furniture-manufacturing, hospitality-ffe
- `/author/dmd-furnishing-editorial`
- `/website-policies`, `/feed.xml`
- API (noindex, disallowed): `/api/request-otp`, `/api/verify-otp`, `/api/send-consultation`, `/api/vitals`

## SEO/GEO surface already present (verify quality, don't assume)
- `public/robots.txt` — allows all, disallows /api/, EXPLICITLY allow-lists AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, OAI-SearchBot, ChatGPT-User, anthropic-ai, cohere-ai). Sitemap → /sitemap.xml.
- `public/DMD_Website.xml` — sitemap, 246 KB. `public/projects.xml` — 26 KB.
- `public/llms.txt` (7 KB) + `public/llms-full.txt` (13 KB) — populated, structured (About/Contact/Services/Markets/Key Pages/Product Categories).
- `public/_headers`, `public/_redirects` (Netlify) — netlify.toml present.
- IndexNow key files present (indexnow-key.txt + hashed txt).
- `public/favicon.ico`, logo SVG.

## Live HTML facts (homepage, http://localhost:3006/)
- `<title>`: "Hospitality Furniture Manufacturer | Custom FF&E"
- meta description: "Custom hospitality FF&E designed, built, and installed nationwide. Hotels, restaurants, offices: 20-room refreshes to 500-key rollouts. Foxboro, MA."
- canonical: https://dmdfurnishing.com
- Full Open Graph + Twitter card set, og:image = /Images/Tailored_Guestroom_Collections.jpg
- **10 `application/ld+json` schema blocks** on homepage.
- Product page `/products/hotel` title: "Hotel Furniture & Casegoods | DMD Furnishing" (200 OK).
- Blog `/blog/what-is-ffe-hospitality` 200 OK.

## Prior audit work (REFERENCE — do not duplicate, build on it)
- `seo-audits/` — 01-FULL-SITE-AUDIT, 03-TECHNICAL-SEO, 04-CONTENT-QUALITY, 05-SCHEMA-AUDIT (+ *-COMPLETED variants).
- `SEO-GEO-Audit/` — 4-9-GEO, 4-9-SEO, content-quality-audit.md, keyword-map.md.
- `SEO-SCOREBOARD.md` at root. `image-prompts/` dir.

## Audit ground rules (every subagent)
1. Audit the ACTUAL site (source files + live :3006). No generic advice — cite real file paths and real values.
2. Severity tags: 🔴 critical · 🟠 high · 🟡 medium · 🟢 pass/minor.
3. If your lens needs a live API not wired (GSC, GA4, DataForSEO, Moz, Google Business Profile/Maps): state the method, what IS checkable from source/live HTML, what NEEDS the API, and a gap checklist. Mark status "partial (API needed)".
4. Spot-check ~3–6 representative files/pages — don't crawl all 23. Snapshot already gives structure.
5. Be concrete and short. Findings table + top-3 actions.
