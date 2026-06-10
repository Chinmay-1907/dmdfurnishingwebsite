# Audit 25 — geo-schema (agent)

**Lens:** schema entity graph for AI discoverability
**Target:** DMD Furnishing — source `C:\Users\chin\dmdfurnishingwebsite-fable`, live `http://localhost:3006`
**Date:** 2026-06-10
**Status:** complete (source + live HTML verified; sameAs URLs resolved)

## What this lens audits

Not schema *validity* (sibling audit 06-seo-schema owns that). This lens asks: **can an AI assistant build a correct knowledge graph of DMD from the structured data?** That means `@id` nodes wired into one graph, `sameAs` links to outside authority (LinkedIn, Wikidata, Google KG), a complete Organization entity (founder, knowsAbout, areaServed), a real author Person entity, Product/Service entities, and consistency between JSON-LD and `llms.txt`.

## Method

- Read schema source: `lib/metadata.js` (Organization, LocalBusiness/FurnitureStore, WebSite), `components/JsonLd.js` (injection), per-route schema in `app/page.js`, `app/about/page.js`, `app/services/page.js`, `app/author/dmd-furnishing-editorial/page.js`, `app/blog/what-is-ffe-hospitality/page.js`, `app/products/[placeSlug]/page.js`.
- Confirmed server-side rendering via `curl http://localhost:3006/` — schema is in the SSR HTML, **not** JS-injected (AI crawlers can read it).
- Resolved all `sameAs` URLs over HTTP. Cross-checked `public/llms.txt` against schema entity facts.

## Entity graph map (@id nodes + sameAs links)

**Global anchor nodes** (injected on every page via `app/layout.js` → org/localbusiness/website schemas from `lib/metadata.js`):

| @id | @type | Wired into graph via |
|---|---|---|
| `…/#organization` | Organization | referenced by `#localbusiness.parentOrganization`, `#website.publisher`, Service `provider`, Product `manufacturer`, CollectionPage `about` |
| `…/#localbusiness` | FurnitureStore (+ additionalType Manufacturer) | `parentOrganization` → `#organization` |
| `…/#website` | WebSite + SearchAction | `publisher` → `#organization`; referenced by `isPartOf` on WebPage/CollectionPage/ProfilePage |

**Per-page nodes:** `/#webpage`, `/#faq` (home); `#article` BlogPosting → `author` `#person` + `breadcrumb`; `#person` + `#profilepage` (author page); `services#<slug>` Service nodes → `provider` `#organization`; Product `@id`=canonical URL → `manufacturer` `#organization`; CollectionPage `#collection` → `isPartOf #website` + `about #organization`.

**sameAs (Organization, live-verified):**
- `https://www.linkedin.com/company/dmd-usaa/` → HTTP 301 (live)
- `https://www.facebook.com/profile.php?id=61575451781876` → HTTP 301 (live)
- `https://www.instagram.com/dmdfurnishing/` → HTTP 200 (live)

**Verdict:** The graph is genuinely connected — `@id` cross-references form one traversable web rooted at `#organization`. This is well above typical SMB sites. The gaps below are about *entity richness and link breadth*, not a broken graph.

## Findings (table)

| Severity | Entity | Issue | Fix |
|---|---|---|---|
| 🔴 | Author `#person` | `app/author/.../page.js` line 43 types the author node as `Organization`, but every blog post references it as `author: {@id: …#person}` and the fragment is literally `#person`. An AI sees an article "authored by an Organization named Editorial Team" — type/identifier mismatch weakens E-E-A-T author understanding. | Change `@type` to `Person` (or `OrganizationRole`/keep Organization but rename fragment to `#editorial-team` and update all 6 blog `author` refs + ProfilePage `mainEntity`). Add `worksFor: {@id: …#organization}`. |
| 🔴 | Organization | No `founder` entity anywhere. `lib/metadata.js` has `foundingDate: '2021'` but no `founder` Person; `app/about/page.js` line 106 only says "the founders" in prose. AI cannot attach a named human to DMD — a major knowledge-graph gap for a manufacturer. | Add `founder: {@type:'Person', name:'…', sameAs:['<LinkedIn personal>']}` to `organizationSchema`. Even one named founder with a LinkedIn `sameAs` materially lifts entity trust. |
| 🟠 | Organization sameAs | Only 3 social links; **zero authority/knowledge-graph anchors** — no Wikidata, no Google Knowledge Graph (`google.com/search?kgmid=`), no industry directory (Houzz, Hospitality Design, ThomasNet). `sameAs` is the single highest-value GEO signal and DMD under-uses it. | Add Wikidata entry + `sameAs` once it exists; add ThomasNet/Houzz/industry-directory profiles. Each verified `sameAs` is a citation pathway for AI. |
| 🟠 | Blog `publisher` | In `app/blog/*/page.js` the BlogPosting `publisher` is an **inline duplicate** `{@type:'Organization', name:'DMD Furnishing', logo:…}` instead of `{@id: …#organization}`. Creates a second, disconnected Organization node per blog page — AI may treat publisher as a different entity than the global org. | Replace inline publisher with `publisher: {@id: ${siteUrl}/#organization}` in all 6 posts. |
| 🟡 | Logo consistency | `organizationSchema.logo` = `/Images/logo.png` (480×480) but blog `publisher.logo` and author `#person.image` = `/DMD_Furnishing_Logo_Embedded.svg`. Two logo URLs for the same brand muddies image-entity resolution. | Standardize on one canonical logo URL (the PNG with declared dimensions is the safer ImageObject for crawlers). |
| 🟡 | Product entities | `Product` nodes have no `offers` (intentional — lead-gen, no prices) and no `aggregateRating`/`review`. Fine for the no-ecommerce model, but AI can't surface price or rating context. `brand` is inline Organization (no `@id`) while `manufacturer` correctly links `#organization`. | Add `@id: …#organization` to `brand` too (link, don't duplicate). Optionally add `Offer` with `priceSpecification` `availability:'InStock'`-free, `url` to consultation, to signal "quote on request". |
| 🟡 | llms.txt ↔ schema | `public/llms.txt` lists **only LinkedIn**; schema lists LinkedIn + Facebook + Instagram. No founder, no `foundingDate` in llms.txt. AI reading both sources sees inconsistent entity facts. | Mirror all 3 `sameAs` + `foundingDate` (+ founder once added) into `llms.txt` so the two AI-facing sources agree. |
| 🟢 | SSR rendering | All JSON-LD is server-rendered (`dangerouslySetInnerHTML` in `components/JsonLd.js`); live `curl` confirms Organization/FurnitureStore/WebSite/WebPage/FAQPage in raw HTML. **No JS-injected schema** — AI crawlers read everything. Pass. |
| 🟢 | knowsAbout / areaServed | Organization has 8-item `knowsAbout` topical fingerprint + `areaServed: Country US`; author `#person` has 12-item `knowsAbout`. Strong topical entity definition for AI. Pass. |

## Score (66/100)

- Organization + LocalBusiness present, valid, `@id`-linked: 15/15
- sameAs present + valid + 3 platforms (all resolve): 12/15 (−3: no Wikidata/Google KG/authority anchor)
- Article + author + dateModified: 7/10 (−3: author typed Organization, not Person)
- Business-specific type (FurnitureStore + Manufacturer + Service entities): 10/10
- speakable implemented: 5/5
- JSON-LD (not Microdata/RDFa): 10/10
- No deprecated schemas (FAQPage retained for LLM citation value — acceptable): 4/5
- No JS-injected schema (full SSR): 10/10
- Required Organization props (founder missing): 7/10 (−3 no founder)
- sameAs resolving HTTP 200/301: 10/10
- Graph connectivity / consistency penalty (inline publisher duplication, logo split, llms.txt drift): −14

**Net: 66/100** — solid, well-connected `@id` graph with full SSR; held back by a mistyped author entity, a missing founder Person, thin authority `sameAs`, and duplicated/​inconsistent Organization references in blog + llms.txt.

## Top 3 actions

1. **Fix the author entity (🔴).** Make `#person` an actual `Person` (or rename the fragment to match its Organization type) and add `worksFor → #organization`. This is the cheapest high-impact fix — it repairs author understanding across all 6 blog posts at once.
2. **Add a named founder to the Organization (🔴).** One `founder: {@type:'Person', sameAs:[LinkedIn]}` in `lib/metadata.js` gives AI a human to anchor the brand to and unlocks a new `sameAs` authority path.
3. **De-duplicate Organization references + broaden sameAs (🟠).** Replace inline blog `publisher` with `{@id: …#organization}`, unify the logo URL, mirror facts into `llms.txt`, and add at least one authority `sameAs` (Wikidata or an industry directory). Collapses phantom duplicate nodes and widens AI citation pathways.
