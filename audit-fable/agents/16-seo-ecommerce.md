# Audit 16 — seo-ecommerce (agent)

**Lens:** product/category SEO (B2B lead-gen applicability)
**Target:** DMD Furnishing — `/products`, `/products/[placeSlug]`, `/products/[placeSlug]/[typeSlug]`, product detail pages
**Date:** 2026-06-10
**Status:** Complete (on-page + live-HTML analysis; no DataForSEO/marketplace API — N-A for B2B, see note)

---

## Applicability note (ecommerce vs B2B lead-gen)

DMD is a **B2B FF&E manufacturer**, not a transactional store. There is **no cart, no price, no checkout, no Google Shopping feed, no marketplace listing**. Conversion = "Request a Quote" / "Schedule a consultation".

So the classic ecommerce-SEO playbook (Offer schema with price, Merchant Center, faceted-nav indexation, review stars on PLPs, cart UX) mostly **does not apply as-is**. The right question is: *which product/category-page SEO patterns still earn rankings and AI-citation for a no-price catalog?* That's what this audit scores. The standard `seo-ecommerce` agent's DataForSEO Merchant / pricing-competitiveness steps are correctly **skipped** — there is no price to compare.

Bottom line: DMD has already adapted the ecommerce pattern well. It uses `Product` schema **without** `offers`, `CollectionPage` + `ItemList` for category pages, server-rendered crawl indexes instead of relying on JS facets, and CTA-to-quote in place of add-to-cart. This is the correct B2B translation.

---

## What this lens audits

Category (PLP) structure, product-detail depth, faceted navigation crawlability, Product/Offer schema applicability, breadcrumbs, related products, image galleries/optimization, and CTA-instead-of-cart — judged against what's appropriate for a price-less B2B catalog.

## Method

- Read route source: `app/products/page.js`, `app/products/[placeSlug]/page.js`, `app/products/[placeSlug]/[typeSlug]/page.js`.
- Read components: `components/products/ProductDetailPage.js`, `ProductCatalog.js`.
- Queried catalog data via `lib/catalog` (`getAllProductsFlat`, `getProductBySlug`, `getFilterOptions`) — 174 products, 7 spaces, 21 types, 74 subcategories.
- Pulled live SSR HTML from `http://localhost:3006`: `/products`, `/products/hotel` (category), `/products/double-drawer-cabinet` (detail). Parsed JSON-LD, headings, canonical, image tags.

## Findings

| Severity | Page | Issue / Applies? | Fix |
|---|---|---|---|
| 🟢 | Product detail (all 174) | `Product` schema present **without** `offers` — exactly right for no-price B2B. `name`, `description`, `image[]`, `brand`, `manufacturer`, `category`, `material`, `additionalProperty[]` all populated from real specs. Verified live on `/products/double-drawer-cabinet`. | Keep. Do **not** add fake `offers`/`price`. |
| 🟢 | Category `/products/hotel` | `CollectionPage` + nested `ItemList` (`numberOfItems` 46) + `FAQPage` + `BreadcrumbList`, single clean `<h1>`, correct cross-domain canonical. Strong adapted-ecommerce PLP. | Keep. |
| 🟢 | All product/category | Faceted nav is **not** an index trap. Filters use `history.replaceState` (no crawlable `?space=` URLs spawned), AND every page ships a **server-rendered A-Z crawl index** — `/products/hotel` has 80 static `/products/` links. This is the correct B2B answer to the ecommerce facet-bloat problem. | Keep. |
| 🟠 | Product detail schema | `sku` falls back to the **product name** (`"sku":"Double Drawer Cabinet"`) because catalog records have no real `id`/SKU. A name-as-SKU is weak and non-unique across variants. | Add a stable model/SKU code per product in the catalog source, or drop `sku` rather than echo the name. |
| 🟠 | Product detail images | Source images are **`.png` with literal spaces** in paths (`/Images/Hospital/Patient Room/.../double drawer cabinet.png`). The JSON-LD `image` array carries the **un-encoded space** URL — a schema-validity / crawl-fetch risk. (On-page `<img>` is fine: Next `/_next/image` optimizes to WebP/AVIF and alt text is auto-generated.) | URL-encode (or rename to hyphenated lowercase) image paths feeding JSON-LD `image[]`. Pre-generate WebP originals so non-Next consumers (LLM crawlers, social) get optimized files. |
| 🟡 | Product detail galleries | Only **92/174 (53%)** products have a multi-image gallery; 82 are single-image. Ecommerce best practice = 3-6 angles per product. Thin visuals hurt detail-page dwell + image search. | Source 2-3 more angles for the 82 single-image SKUs (detail, finish, in-context). |
| 🟡 | Product detail copy | `description` and furniture-type copy blocks (`getProductCopy`) are present, but the construction/specification prose is **type-level templated**, not per-product — risk of near-duplicate body text across same-type SKUs. | Add 1-2 product-specific sentences per detail page (what makes *this* model different). Reuses the "content uniqueness" ecommerce priority. |
| 🟡 | Product detail | **No review/rating signal** (no `aggregateRating`, no testimonials on PLP/PDP). N-A for star-rich-results without real reviews, but B2B trust proof is thin on product pages. | Add project/spec social proof (named hotel brands, "specified for X rooms") as page content — not schema — to lift E-E-A-T. |
| 🟢 | Product detail | Related-products module renders 6 same-subcategory items with images + links; "Also built for" cross-links memberships; breadcrumb + back-to-category links. Internal linking is strong. | Keep. |
| 🟢 | CTA model | "Schedule a free consultation" + "Request a quote" (pre-fills contact form with product name via `?product=`). Correct add-to-cart replacement for lead-gen. | Keep. |

## Ecommerce-pattern applicability table

| Ecommerce pattern | Verdict | Notes |
|---|---|---|
| `Product` schema | **Applies** | Present, well-populated, correctly omits `offers`. |
| `Offer` / `price` in schema | **N-A** | No price. Adding fake price would violate Google guidelines. |
| `aggregateRating` / `Review` stars | **N-A → adapt** | No reviews. Add named-client proof as content, not schema. |
| Google Shopping / Merchant feed | **N-A** | No transactional inventory. |
| Marketplace (Amazon) visibility | **N-A** | Not a retailer. |
| `CollectionPage` + `ItemList` (PLP) | **Applies** | Implemented on place + type pages. |
| `BreadcrumbList` | **Applies** | On every product/category page. |
| Faceted nav indexation control | **Adapt — done well** | replaceState (no facet URLs) + server-rendered crawl index. |
| Related / cross-sell products | **Applies** | 6 related + membership cross-links. |
| Image gallery (3-6 angles) | **Applies — partial** | Only 53% multi-image. |
| Image optimization (WebP, alt, ≥800px) | **Applies — mostly** | On-page optimized via Next; JSON-LD URLs un-encoded PNG. |
| Unique product copy | **Applies — partial** | Descriptions unique; spec prose templated by type. |
| Real SKU / GTIN | **Adapt** | No GTIN (custom-build). Add internal model code instead of name-as-SKU. |
| Add-to-cart UX | **N-A → CTA** | Replaced by quote/consultation CTAs. |
| Stock/availability schema | **N-A** | Made-to-order; no inventory state. |

## Score (82/100)

The adapted-ecommerce foundation is strong: correct schema choices for a price-less catalog, real PLP collection markup, solved facet-crawl problem, good internal linking and CTAs. Points off for: name-as-SKU, un-encoded image URLs in JSON-LD, 82 single-image products, type-templated spec prose, and missing trust signals on product pages.

## Top 3 actions

1. **Fix product-image URLs feeding JSON-LD** — URL-encode or rename to hyphenated paths, and pre-generate WebP originals (🟠, schema validity + image SEO).
2. **Replace name-as-SKU with a real model code** in the catalog source, or remove `sku` (🟠, schema quality).
3. **Add 2-3 gallery images to the 82 single-image products + one product-specific sentence per detail page** (🟡, closes the depth/uniqueness gap that drives PDP rankings).
