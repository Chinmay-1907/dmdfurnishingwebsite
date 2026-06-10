# Audit 06 — seo-schema (agent)
**Lens:** Schema.org structured data coverage + validity
**Target:** DMD Furnishing (fable-dmd) · source C:\Users\chin\dmdfurnishingwebsite-fable · live http://localhost:3006
**Date:** 2026-06-10
**Status:** complete

## What this lens audits
Which Schema.org types are present, whether they validate (required/recommended fields, ISO dates, https context, absolute URLs, valid @types), and what rich-result / AI-citation opportunities are missing. JSON-LD only (no Microdata/RDFa found).

## Method (pages/files checked)
- Curled live HTML on 8 routes, parsed every `<script type="application/ld+json">` block with Python json.loads (all valid JSON, 0 parse failures).
- Routes: `/`, `/products/hotel` (place), `/products/hotel/guest-room` (type/leaf), `/blog/what-is-ffe-hospitality`, `/projects/quality-inn-gainesville` (+ 2 more project slugs), `/services`, `/guides/hospitality-ffe`, `/author/dmd-furnishing-editorial`.
- Source: `components/JsonLd.js` (renderer), `app/layout.js` (global triplet lines 107-109), `app/page.js` (home WebPage+FAQ), `app/projects/[projectId]/page.js` (line 70 datePublished), `app/products/[placeSlug]/[typeSlug]/page.js`, `lib/metadata.js`.
- Note: homepage has **5** real `<script>` JSON-LD blocks, not 10. The snapshot's "10" double-counted — 5 render in HTML, 5 are echoed inside the Next.js RSC flight payload (`self.__next_f`). Normal App-Router behavior, not duplication.

## Schema types found (page → @types)
| Page | @types present |
|---|---|
| Global (every page, from layout.js) | Organization, FurnitureStore (+`additionalType` Manufacturer, = LocalBusiness), WebSite |
| `/` home | + WebPage (w/ SpeakableSpecification), FAQPage (7 Q&A) |
| `/products/hotel` (place) | + @graph: BreadcrumbList, CollectionPage, ItemList (46 ListItems), FAQPage |
| `/products/hotel/guest-room` (type/leaf) | + @graph: BreadcrumbList, CollectionPage |
| `/blog/what-is-ffe-hospitality` | + @graph: BlogPosting (author/publisher/image/dates), FAQPage |
| `/projects/quality-inn-gainesville` | + @graph: BreadcrumbList, Article, ImageGallery (20 images) |
| `/services` | + @graph: BreadcrumbList, ItemList, 6× Service, FAQPage |
| `/projects` | + @graph: CollectionPage, BreadcrumbList, ItemList |
| `/guides/hospitality-ffe` | + @graph: BreadcrumbList, Article (ISO dates ✅), FAQPage |
| `/author/dmd-furnishing-editorial` | + Organization (`#person` @id), ProfilePage |

Entity graph is well-wired: WebPage→`#organization`, FurnitureStore→`parentOrganization #organization`, WebSite→`publisher #organization`, BlogPosting→`author` ref. `@context` is `https://schema.org` everywhere (0 http occurrences). All URLs absolute. Org/LocalBusiness/Breadcrumb/Article/FAQ/Service/ItemList all covered.

## Findings
| Severity | Page | Issue | Fix |
|---|---|---|---|
| 🟠 high | All `/projects/[id]` | `Article.datePublished` is non-ISO free text — "June 2022", "April 2023", "2024". Source `app/projects/[projectId]/page.js:70` passes raw `project.completionDate`. Google requires ISO 8601; will fail Rich Results / dropped. | Store `completionDate` as ISO (`2022-06` or `2022-06-01`) in `lib/projects.js`, or format at line 70 before assigning. |
| 🟡 med | `/author/...` + all blog/guide | Author node `@id` ends `#person` but is typed `Organization` (name "DMD Furnishing Editorial Team"). Article `author` refs `#person`. Resolves (Google allows Org author) but type/id name mismatch is internally inconsistent and weakens E-E-A-T author signal. | Either type it `Person` (real named author, best for E-E-A-T) or rename @id to `#organization`-style + keep Organization. Pick one. |
| 🟡 med | `/projects/[id]` | `Article.dateModified` emitted as `null` (and `author` = `#organization`, not the editorial author used on blog/guide). Null is sloppy; omit the key instead. | Omit `dateModified` when absent; align project `author` with the editorial author node. |
| 🟢 pass | `/products/hotel/guest-room` (leaf) | Has BreadcrumbList + CollectionPage but no ItemList (place page has 46-item ItemList; type page omits it). Minor — fewer items at leaf — but an ItemList of the type's products would add value. | Optional: add ItemList of products shown on the type page. |
| 🟢 pass | FAQPage (home, services, products) | 5 FAQPage blocks on a commercial site. Per lens rule, Google restricts FAQ rich results to gov/health (Aug 2023) — these won't show as rich results but DO help AI/LLM citation. Info-only, keep. | No action. Good GEO asset. |
| 🟢 pass | All | JSON-LD valid, https context, absolute URLs, @graph well-linked, Speakable present, geo/openingHours/priceRange on LocalBusiness. | — |

## Score / verdict (88/100)
Among the strongest schema implementations in this class — full entity graph, breadcrumbs/collection/article/service/FAQ all server-rendered and valid; only one real validity bug (non-ISO project dates) plus two consistency nits hold it back from the 90s.

## Gaps / missing schema opportunities
- **Product schema** — none exist, and that is **correct**: site is lead-gen B2B with no individual product pages, no prices/cart. ItemList of products is the right pattern. Do NOT add Product/Offer (no price/availability = invalid Offers).
- **Review / AggregateRating** — absent. If DMD has client testimonials, `Review`/`AggregateRating` on the Organization or projects would unlock star eligibility and strong AI-citation value. Highest-ROI net-new schema.
- **VideoObject** — none. If any project/process videos exist, add VideoObject for video rich results.
- **ProfilePage author** — present but typed Organization; converting to a named Person would strengthen author/E-E-A-T signals AI engines weigh.

## Top 3 actions
1. **Fix `Article.datePublished` to ISO 8601 on all project pages** (the only validation-failing bug) — store/format `completionDate` as `2022-06` in `lib/projects.js` or at `page.js:70`.
2. **Resolve the author node** — make it a real `Person` (best for E-E-A-T) or stop labeling an Organization node `#person`; align project `author` to match blog/guide.
3. **Add Review/AggregateRating** to Organization (or projects) if testimonials exist — biggest net-new win for both rich results and AI-engine trust signals.
