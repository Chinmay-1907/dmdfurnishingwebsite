# Skill Audit 23 — seo-schema

**Skill purpose:** Detect, validate, and generate Schema.org structured data (JSON-LD preferred). Check required/recommended properties per @type, @context, absolute URLs, ISO 8601 dates, @id linking, deprecated types.
**Target:** DMD Furnishing — source `C:\Users\chin\dmdfurnishingwebsite-fable` + live `http://localhost:3006`. Extracted JSON-LD from homepage, product page `/products/hotel`, blog `/blog/what-is-ffe-hospitality`, project `/projects/quality-inn-gainesville`, author `/author/dmd-furnishing-editorial`.
**Date:** 2026-06-10
**Status:** Pass with fixes — schema coverage is strong and well-linked; 3 real defects (1 date format, 1 type/@id mismatch, 1 missing required Article props). Score 82/100.

## Block-count clarification (sibling 1 confirmed)
Homepage emits **5 real schema blocks**, not 10. `curl | grep application/ld+json` counts 10 because Next.js App Router streams each `<script>` twice — once in SSR HTML, once echoed in the React Server Component (RSC) flight payload at page bottom. After de-dup by `@id`, the 5 unique blocks are: `#organization` (Organization), `#localbusiness` (FurnitureStore + additionalType Manufacturer), `#website` (WebSite), `#webpage` (WebPage), `#faq` (FAQPage). Confirmed by parsing only the `<script type="application/ld+json">` tags (regex) → 5 distinct objects.

## Schema validation

| @type | Page | Required props OK? | Issues |
|---|---|---|---|
| Organization (`#organization`) | all pages (global) | ✅ name, url, logo (ImageObject w/ w+h), address, contactPoint, sameAs×3, foundingDate | 🟢 Exemplary. Absolute URLs, valid @id. |
| FurnitureStore + `additionalType` Manufacturer (`#localbusiness`) | all pages | ✅ name, address, geo, telephone, priceRange, openingHoursSpecification, parentOrganization→#organization | 🟢 Valid LocalBusiness subtype. `priceRange "$$$"` fine for B2B. |
| WebSite (`#website`) | all pages | ✅ name, url, publisher→#organization, potentialAction SearchAction | 🟡 SearchAction target `/products?q=` — verify the site actually handles `?q=`; broken SearchAction is a soft warning in Rich Results. |
| WebPage (`#webpage`) | homepage | ✅ url, name, isPartOf→#website, about→#organization, primaryImageOfPage, speakable | 🟢 Good @id graph linking. |
| FAQPage (`#faq`) | homepage, `/products/hotel`, all 6 blog posts | ✅ mainEntity[] Question/acceptedAnswer/Answer text | 🟠 **FAQPage rich results are restricted (Aug 2023) to government + healthcare authority sites.** DMD is a commercial manufacturer → FAQ rich snippets will NOT show. Markup is valid and still useful for AI/GEO extraction, but won't earn Google FAQ rich results. Not an error; manage expectations. |
| BreadcrumbList | product, blog, project pages | ✅ itemListElement position/name/item (absolute) | 🟢 Correct. |
| CollectionPage (`#collection`) | `/products/hotel` | ✅ url, name, description, isPartOf→#website, about→#organization, mainEntity ItemList numberOfItems:46 + 46 ListItems | 🟢 Strong product-listing schema. |
| BlogPosting (`#article`) | all 6 blog posts | ⚠️ headline, description, datePublished (ISO ✅), dateModified (ISO ✅), image[], author, publisher, mainEntityOfPage, breadcrumb | 🟠 `author.@id` → `#person`, but that node is typed **Organization** (see sibling 3). |
| Article | project pages (`/projects/[id]`) | ❌ headline, image, url, author, publisher, about — **`datePublished` is free text, `dateModified` missing** | 🔴 `datePublished:"June 2022"` is NOT ISO 8601 (sibling 2). No `dateModified`. |
| ImageGallery | project pages | ✅ name, about→Article @id, image[] ImageObject contentUrl+name | 🟢 Valid. |
| ProfilePage (`#profilepage`) | author page | ✅ url, name, dateCreated, dateModified (ISO), mainEntity→#person, isPartOf→#website, breadcrumb | 🟢 Valid. |
| "Person" node (`#person`) | author page | ❌ — declared `@type: Organization` but `@id` ends `#person` | 🔴 Type/@id contradiction (sibling 3). |

## Findings

| Severity | Type / File | Issue | Fix |
|---|---|---|---|
| 🔴 | Article `datePublished` — `app\projects\[projectId]\page.js:70` | `datePublished: project.completionDate` renders free text e.g. `"June 2022"` (live `/projects/quality-inn-gainesville`). Schema.org Date/DateTime requires ISO 8601 (`2022-06-01`). Google ignores/errors non-ISO dates. | Normalize `completionDate` to ISO at build, e.g. parse `"June 2022"`→`"2022-06"` or `"2022-06-01"`. Add a helper or store ISO in project data. |
| 🔴 | Author node type vs @id — `app\author\dmd-furnishing-editorial\page.js:43-44` | Node is `'@type': 'Organization'` with `'@id': .../#person`. All 6 BlogPosting `author.@id` point to `#person`, so author resolves to an **Organization**, not a Person/author entity. Misleading graph; weakens E-E-A-T author signal. | Either (a) rename `@id` to `#organization`-style and keep Organization, OR (b) change `@type` to `Person`/`Organization` consistently. Cleanest: keep it an `Organization` author but give the @id an honest fragment (e.g. `#editorial-team`) and update the 6 BlogPosting `author.@id` refs to match. |
| 🟠 | Article missing `dateModified` — `app\projects\[projectId]\page.js:63-74` | Article block has no `dateModified` (recommended). Blog posts have it; projects don't. | Add `dateModified` (ISO) from project last-update or fall back to `datePublished`. |
| 🟠 | FAQPage rich-result expectation — homepage `#faq`, product `#faq`, blog `#faq` | FAQ rich results restricted to gov/health since Aug 2023; commercial site won't get FAQ snippets in Google. | Keep for AI/GEO answer extraction (still parsed by LLMs), but don't expect Google FAQ rich results. No code change required; note in SEO roadmap. |
| 🟡 | WebSite SearchAction — `#website` (global layout) | `potentialAction` SearchAction targets `/products?q={search_term_string}`. If `/products` doesn't process `?q=`, Rich Results flags a non-functional SearchAction. | Confirm `/products` reads `?q=`; if not, wire it or drop the SearchAction. |
| 🟢 | Org / LocalBusiness / @id graph | Absolute URLs everywhere, consistent `@id` cross-links (`parentOrganization`, `publisher`, `isPartOf`, `about`), no relative URLs, no placeholder text, no deprecated types (no HowTo/SpecialAnnouncement). | None — this is reference-quality. |

## Score: 82/100

- Coverage & breadth (Org, LocalBusiness, WebSite, WebPage, Breadcrumb, CollectionPage, BlogPosting, FAQ, ProfilePage, ImageGallery): **28/30**
- @id graph linking + absolute URLs (clean, consistent): **24/25**
- Date validity (blog ISO ✅; project Article free-text + missing dateModified): **9/15** (−6 for 🔴 non-ISO)
- Type correctness (author #person typed Organization): **8/12** (−4 for 🔴 mismatch)
- Required/recommended completeness per type: **13/18** (FAQ restriction context, missing dateModified)

## Top 3 actions
1. **Fix project Article dates (🔴):** normalize `completionDate` to ISO 8601 in `app\projects\[projectId]\page.js:70` and add `dateModified`. Stops Google from discarding the date.
2. **Resolve author @id/type mismatch (🔴):** in `app\author\dmd-furnishing-editorial\page.js:43-44`, make `@type` and the `#person` fragment agree, and update the 6 BlogPosting `author.@id` refs. Cleaner E-E-A-T author entity.
3. **Verify the WebSite SearchAction target works (🟡)** and treat the three FAQPage blocks as GEO/AI-answer fuel rather than Google rich-result wins (restricted since Aug 2023). No teardown needed — coverage is otherwise reference-grade.
