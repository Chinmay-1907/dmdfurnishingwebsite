# Audit 11 — seo-image-gen (agent)

**Lens:** image SEO + gen planning
**Target:** DMD Furnishing (Next.js 15, App Router) — source `C:\Users\chin\dmdfurnishingwebsite-fable`, live http://localhost:3006, prod https://dmdfurnishing.com
**Date:** 2026-06-10
**Status:** Complete (static + live HTML). nanobanana-mcp NOT loaded this session → gen plan is briefs only, no auto-generation.

## What this lens audits
Alt-text quality, image filenames, dimensions/formats, file weight, modern-format adoption (WebP/AVIF), image sitemap, decorative-vs-meaningful alt handling, `og:image`/`og:image:alt`, schema `ImageObject`, and gaps where pages lack imagery + a generation plan to fill them.

## Method
- `ls`/`find` over `public/Images` (730 raster files) for naming, format, byte size.
- `grep` for `alt=`, `next/image`, `<img>`, `og:image` across `app/` + `components/`.
- Read `next.config.js` (images block), `app/sitemap.js`, `image-prompts/`.
- `curl` live: `/`, `/products/hotel`, `/inspirations`, `/sitemap.xml` — rendered alts, og tags, image-namespace, and a raw-vs-encoded space-URL HTTP test.

## Findings

| Severity | File / Page | Issue | Fix |
|---|---|---|---|
| 🔴 | `public/Images/**` (191 of 730 files) + `/sitemap.xml` | Filenames contain raw spaces (e.g. `Our Services.jpg`, `Hotel/Hotel furniture collection.jpg`). 191 of 414 `<image:loc>` entries in the live sitemap carry an un-encoded space. Direct test: `GET /Images/Our Services.jpg` → `000` (fails); `%20` version → `200`. Google Image bot fetches the sitemap loc verbatim → ~half the catalog images are undiscoverable via image sitemap. | URL-encode every image path in `app/sitemap.js` (wrap `loc` in `encodeURI()` inside `abs()`), AND/OR rename files to hyphen-case (`our-services.jpg`). Renaming is the durable fix — spaces also weaken filename keyword signals. |
| 🟠 | `public/Images/**` (396 PNGs, ~180 over 700 KB) | Heavy PNGs used for photos: `services-hero.png` / `Hotel_Guest_Room_Hero.png` = 827 KB each; dozens of product PNGs 700–990 KB (`Wooden Teacher Desk.png` 988 KB). PNG is wrong format for photographic content. next/image serves AVIF/WebP for `<Image>` components, but bare `og:image` / sitemap / schema URLs serve the raw heavy PNG. | Convert product + hero photos to WebP/JPEG source (target <200 KB hero, <100 KB thumb). Keep PNG only for the logo/line art. Add a `generate:webp` build step. |
| 🟠 | `app/layout.js`, all `/products/*`, place pages | `og:image` points at raw source files (`Tailored_Guestroom_Collections.jpg`, `Hotel/Hotel%20furniture%20collection.jpg`). No dimension guarantee — several aren't confirmed 1200×630. Social/AI link previews may crop or reject. | Generate dedicated 1200×630 OG cards per template (home, product-place, blog already covered) using `og-default.jpg` (84 KB, exists) as the pattern. Set explicit `width/height` in OG metadata. |
| 🟡 | 19 `alt={...}` dynamic spots in `components/` | Fallback alts are generic: `alt={\`${product.name} for ${product.placeName} environments\`}` → "2-Seater Sofa for Lobby Area environments". 41 such generic alts render on `/products/hotel` alone. Functional, not stuffed, but no material/finish/use-case keywords. | Enrich `mainImageAlt` per product in catalog data; fall back to a richer template ("…commercial-grade {material} {product} by DMD Furnishing"). Hand-written hero alts (homepage) are the gold standard — match that depth. |
| 🟡 | `public/Images/**` directory tree | Deep nested folders with spaces (`Hospital/Patient Room/Recliner Chair/Manual Recliner/manual recliner.png`) + duplicate paths (`Padded Visitor Chair` exists at two depths). Increases broken-link surface and crawl confusion. | Flatten + hyphenate product image paths to mirror the flat `/products/{slug}` URL refactor already done. |
| 🟢 | `next.config.js` L12 | `formats: ['image/avif', 'image/webp']` + `minimumCacheTTL: 31536000` — best-practice on-the-fly modern formats + 1yr cache for all `next/image` output. | Keep. |
| 🟢 | Homepage / inspirations rendered alts | Hero alts are descriptive, keyword-rich, location-tagged, NOT stuffed (e.g. "Custom hotel guestroom casegoods with HPL desks and upholstered headboards in a Foxboro Massachusetts project"). One correct decorative `alt=""`. Zero raw `<img>` — 21 files use `next/image`. | Keep — this is the model for the 🟡 dynamic alts. |
| 🟢 | `/sitemap.xml` | Image namespace present (`xmlns:image=...image/1.1`), 414 `<image:loc>` emitted via Next's `images` field in `app/sitemap.js`. Structure correct — only the un-encoded paths (🔴) break it. | Keep structure; fix encoding. |
| 🟢 | `og:image:alt` + `image-prompts/` | `og:image:alt` present on homepage. `image-prompts/` has populated gen briefs (hotel/hospital/office/restaurant/school/residential `.md`) + `generated/` (paired PNG+WebP outputs) — a real pipeline already exists. | Reuse pipeline for the gaps below. |

## Image-gen opportunities
(Briefs only — nanobanana-mcp not loaded; do not auto-generate.)

| Page | Issue | Use case | Prompt idea | Priority |
|---|---|---|---|---|
| `/projects`, `/projects/[id]` | No `images:` in sitemap; project pages thin on hero imagery | hero / og | Finished install wide-shot per project: "Completed [hotel/restaurant] interior after DMD FF&E install, casegoods + seating in situ, natural light, editorial wide angle, 1200×630" | High |
| `/contact` | No `images:` entry; only `Contact_Page.jpg` exists, not in sitemap | og | Branded contact card: Foxboro MA workshop exterior or team-at-table consult shot, 1200×630 | Medium |
| All `/products/{slug}` | OG = raw heavy product PNG, no purpose-built card | og | Templated product OG: product on neutral set + "DMD Furnishing" wordmark lockup, 1200×630 WebP | Medium |
| `/blog`, `/guides` | Posts share generic OG; covered but undifferentiated | og | Per-pillar OG cards (FF&E timeline, value-engineering, HPL-vs-veneer) using `og-default.jpg` template | Low |
| `/inspirations/[slug]` (new styles) | WebP set exists for 4 styles; extend to any new style pages | hero + 3 detail | Match existing inspiration set (hero.webp + detail-1..3.webp), interior-design editorial style | Low |

## Score (62/100)
- Strong: next/image config (AVIF/WebP + 1yr cache), zero raw `<img>`, gold-standard hand-written hero alts, image-namespace sitemap, og:image + og:image:alt, existing gen pipeline. (+)
- Drags: 191/414 sitemap image URLs break on raw spaces (🔴 image-indexing loss), ~180 oversized PNGs serving photos, OG cards not dimension-guaranteed, generic dynamic product alts. (−)

## Top 3 actions
1. **Fix image sitemap encoding (🔴, 1-line + rename pass).** `encodeURI()` the loc in `app/sitemap.js`, then rename spaced files to hyphen-case. Unblocks ~half the catalog for Google Image search.
2. **Convert oversized product/hero PNGs to WebP/JPEG (🟠).** ~180 files at 700 KB–990 KB → target <200 KB. Speeds LCP and shrinks the raw URLs that next/image can't optimize (OG, schema, sitemap).
3. **Enrich dynamic product alts + build 1200×630 OG cards (🟡/🟠).** Add per-product `mainImageAlt` with material/finish keywords; generate purpose-built OG cards per template using the existing `image-prompts/` pipeline.
