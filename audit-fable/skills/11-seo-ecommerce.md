# Skill Audit 11 — seo-ecommerce

**Skill purpose:** E-commerce SEO checklist — product/category page SEO, Product schema, faceted nav, breadcrumbs, internal links, image SEO, reviews, plus marketplace (Google Shopping / Amazon) intelligence via DataForSEO.
**Target:** `/products` (catalog root), `/products/[placeSlug]` (place category + flat product detail), `/products/[placeSlug]/[typeSlug]` (mid-tier type landing). Source: `C:\Users\chin\dmdfurnishingwebsite-fable`. Live: http://localhost:3006.
**Date:** 2026-06-10
**Status:** Complete (on-page + schema). Marketplace modules N-A — DMD has no Google Merchant Center feed and no prices; DataForSEO not wired.

## Applicability note (B2B lead-gen, no price)

DMD is a B2B FF&E manufacturer, not a store: no cart, no checkout, no public prices, conversion = consultation/quote request. The skill's checklist still maps cleanly with one structural adaptation:

- **Price/offers fields → dropped on purpose.** Product JSON-LD has no `offers`, `price`, `priceCurrency`, or `availability` (confirmed: zero hits on the live `/products/queen-bed-frame` HTML). Correct for a no-price model — but it means Product rich results (price/availability) are not eligible. The page leans on `BreadcrumbList`, `CollectionPage`/`ItemList`, and site-wide `FurnitureStore` schema for SERP features instead. This is the right call; flag it only so no one "fixes" it by inventing fake prices.
- **Reviews/ratings → genuinely absent, not adapted away.** No `aggregateRating` or `review` anywhere. This is a real gap (see findings), not a no-price consequence.
- **Marketplace (Google Shopping, Amazon, gap analysis) → N-A.** Requires a Merchant Center feed + DataForSEO Merchant API. DMD sells custom, quoted goods; Shopping ads don't fit the model. State the method, don't run it.

## Ecommerce checklist applied

| Item | Applies / N-A / Adapt | Result | Evidence |
|---|---|---|---|
| Category page SEO (title/meta/H1/intro) | Applies | Pass. Per-vertical title/desc/H1 overrides + intro copy + FAQ. `/products/hotel` → title "Hotel Furniture & Casegoods", single H1, FAQPage schema. | `app/products/[placeSlug]/page.js` L48-91, 129-140; live `/products/hotel` |
| Product page SEO (title/meta/H1) | Applies | Pass. Title `[Name] \| Commercial [Subcat] \| DMD`, single H1 = product name, desc from product or templated fallback. | `app/products/[placeSlug]/page.js` L107-116; `ProductDetailPage.js` L56; live `/products/queen-bed-frame` |
| Mid-tier type landing SEO | Applies | Pass. Thin-content gate (≥3 products), keyword-built titles ("Hotel Guest Room Furniture"), unique meta, CollectionPage+ItemList. | `app/products/[placeSlug]/[typeSlug]/page.js` L20, 52-60, 89-98 |
| Product schema (required fields) | Adapt | Partial. Has `name`, `image[]`, `description`, `brand`, `sku`, `category`, `manufacturer`, `material`, `additionalProperty`. Missing `offers`/`price` (intentional, no-price) and `gtin/mpn`. | `buildProductStructuredData()` L142-204 |
| Product schema (recommended: rating/review/gtin) | Applies | Fail. No `aggregateRating`, no `review`, no `gtin13/14/mpn`. SKU falls back to slug when `id` missing. | live PDP: zero `aggregateRating`/`review`/`offers` matches |
| Faceted / filtered navigation | Applies | Pass (client-side). `ProductCatalog` + `CatalogFilters` filter by space/type/subcategory client-side; no crawlable `?filter=` URL explosion, so no faceted-nav index-bloat or canonical risk. | `components/products/ProductCatalog.js`, `CatalogFilters.js` |
| Breadcrumbs (UI + schema) | Applies | Pass. Visible `<nav aria-label="Breadcrumb">` on all three tiers + `BreadcrumbList` JSON-LD matching the trail. | `Breadcrumbs` component used in all 3 routes; live: `aria-label="Breadcrumb"` present |
| Internal linking | Applies | Pass (strong). Server-rendered A–Z crawl index on `/products` and each place page; "More [place] furniture" sibling links; related-products grid (6) on PDP; every product reachable in static HTML. | `/products` L97-123; `[placeSlug]/page.js` L364-386; type page L228-244 |
| Image SEO — alt text | Applies | Mixed. Templated alt on cards/related/gallery is good in pattern, but a real data bug surfaces wrong-product alt (see findings). | `ProductCard.js` L18, `ProductDetailPage.js` L188; live PDP alt mismatch |
| Image SEO — format/sizing/lazy | Applies | Mostly pass. `next/image` responsive srcset to 3840px + runtime WebP, lazy below-fold, `priority` on first row. Source files are all `.png` (no native WebP/AVIF). | `ProductCard.js` L16-34; live srcset widths 256–3840 |
| Reviews / UGC on page | Applies | Fail. No on-page reviews, ratings, testimonials, or case-study proof on product/category pages. | `ProductDetailPage.js` (no review block); live PDP |
| Marketplace (Google Shopping / Amazon / gaps) | N-A | No Merchant feed, no prices, custom-quote model. Method: would need Merchant Center + DataForSEO; not appropriate for this business. | snapshot Identity; skill §2-4 |
| Content quality (unique desc, specs table) | Applies | Pass. Furniture-type-specific copy blocks (materials + specification) replace boilerplate across 174 PDPs; specs grid renders when data present, graceful empty state otherwise. | `ProductDetailPage.js` L47-49, 124-165; `lib/product-copy` |

## Findings

| Severity | Page | Issue | Fix |
|---|---|---|---|
| 🔴 | `/products/queen-bed-frame` (and likely other near-duplicate SKUs) | Product page titled/H1'd "Queen Bed Frame" renders **King Bed Frame** images (`/Images/.../King Bed Frame/...png`) with alt `"King Bed Frame - bedroom"` — wrong images + wrong alt on a live product page. Hurts image SEO and on-page trust. | Fix the catalog data mapping so the Queen record points at queen images/alt; audit `lib/catalog` source XML for other copy-paste image rows. |
| 🟠 | All product detail pages | No `aggregateRating` / `review` / on-page social proof. Loses review rich-result eligibility and a trust signal competitors use. | Add real testimonials/case-study counts; emit `aggregateRating` + `review` JSON-LD only when genuine review data exists (never fabricate). |
| 🟡 | All product detail pages | Product schema missing `gtin13/14`/`mpn`; `sku` falls back to slug when `product.id` is absent. | Populate stable `sku`/`mpn` per product where available; keep slug fallback as last resort. |
| 🟡 | Image pipeline (all product images) | Source assets are `.png`; relying on `next/image` runtime conversion. Larger origin files, slower first byte for the image optimizer, no AVIF source. | Pre-generate WebP/AVIF source variants (there's an `optimize:*` script pattern already) to cut origin weight. |
| 🟢 | `/products`, `/products/hotel` | Category/FAQ/breadcrumb/internal-link structure is strong and crawler-friendly — A–Z static index ensures all 174 product pages are reachable. | None — keep. |

## Score (72/100)

Weighted per skill rubric (schema 25, image 20, content 20, title/meta 15, internal-link 10, technical 10): schema ~16/25 (solid required fields, no rating/gtin, price intentionally absent), images ~13/20 (good pipeline, one wrong-product alt bug, png source), content ~17/20 (unique per-type copy, no reviews), title/meta 14/15, internal-link 10/10, technical 8/10. The wrong-image bug and total absence of reviews are the main drags; structure and internal linking are genuinely strong.

## Top 3 actions

1. **Fix the Queen Bed Frame wrong-image/alt data bug** and sweep `lib/catalog` source for other products inheriting another SKU's images/alt (🔴 — wrong content on live product pages).
2. **Add genuine reviews/testimonials + `aggregateRating`/`review` schema** on product and category pages — the one B2B-friendly rich-result and trust signal currently missing (🟠).
3. **Enrich Product schema identifiers** (`mpn`/stable `sku`, `gtin` where it exists) and pre-generate WebP/AVIF image sources to lighten the origin (🟡).
