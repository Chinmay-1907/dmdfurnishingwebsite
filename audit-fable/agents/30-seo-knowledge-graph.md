# Audit 30 — seo-knowledge-graph (agent)

**Lens:** entity knowledge-graph + interlinking readiness (article-loop Phase 9 — post-publish learning loop + entity/KG writeback)
**Target:** DMD Furnishing — `C:\Users\chin\dmdfurnishingwebsite-fable` (branch `fable-dmd`) · live dev `http://localhost:3006` · prod domain `https://dmdfurnishing.com`
**Date:** 2026-06-10
**Status:** Complete (source + live HTML verified). Phase-9 *learning loop* itself is NOT implemented for this site — audited as readiness, not as a running loop.

## What this lens audits

Phase 9 of the SEO article loop is the **memory/learning layer**: after publish, write back what worked into a per-client knowledge graph (ruvector + `/graphify`) so the next article inherits prior lessons. Two halves:
1. **The learning store** — is there a populated KG / vector memory the site or content system reads from and writes back to?
2. **The site as a knowledge graph an engine can traverse** — do the core entities (DMD org, services, markets/products, guides, blog, author) connect into one coherent graph via internal links + schema `@id` edges, with no orphans or dangling references?

For a B2B lead-gen site (no published-then-scored article cadence), half 2 is where the real value is: AI engines (the allow-listed GPTBot/ClaudeBot/PerplexityBot) need a connected entity graph to cite DMD confidently.

## Method

- Read lens def + site snapshot.
- Pulled live HTML for 8 representative entity pages (home, about, services, products, products/hotel, blog/what-is-ffe-hospitality, guides/hospitality-ffe, author/editorial) from `:3006`.
- Parsed every `application/ld+json` block; extracted `@type` + `@id` for each node and every cross-entity edge (`publisher`, `author`, `provider`, `isPartOf`, `about`, `parentOrganization`, `manufacturer`, `mainEntityOfPage`, `mainEntity`, `sameAs`, `knowsAbout`).
- Categorized internal `<a href>` links per page to map the human-traversable graph vs. the schema graph.
- Status-checked product-detail URLs from `itemListElement` to catch dangling edges (200 vs 404).
- Inspected `ruvector.db` (binary header), `agentdb.rvf`, and grepped the whole repo for any code wiring to them or to graphify.

## Entity graph + edges (entity → links to)

Central hub is `https://dmdfurnishing.com/#organization`. It is re-declared and referenced by `@id` on **every** page sampled. The schema graph is genuinely connected, not isolated islands:

| Entity (node @id) | Outbound schema edges (verified) |
|---|---|
| `#organization` (Organization) | `sameAs` → LinkedIn, Facebook, Instagram · `knowsAbout` → 3 topics · `areaServed` → US |
| `#localbusiness` (FurnitureStore) | `parentOrganization` → `@id #organization` · `hasOfferCatalog` → url `/products` |
| `#website` (WebSite) | `publisher` → `@id #organization` |
| `/#webpage`, `/about`, CollectionPages | `isPartOf` → `@id #website` · `about` → `@id #organization` |
| Service nodes (`/services#design-consultation` … 6 nodes) | `provider` → `@id #organization` · `areaServed` → Country |
| BlogPosting `/blog/what-is-ffe-hospitality#article` | `author` → `@id …/author/…#person` · `mainEntityOfPage` → article URL · `publisher` → **inline Organization (no @id)** |
| Article `/guides/hospitality-ffe#article` | `author` → `@id …#person` · `publisher` → `@id #organization` · `about` → 3× `Thing` (no @id) |
| ProfilePage `/author/…#profilepage` | `isPartOf` → `@id #website` |
| Author `…#person` | typed **Organization** (not Person) · `sameAs` → LinkedIn · `knowsAbout` → 12 topics |
| Product `/products/2-seater-sofa` (+ catalog) | `manufacturer` → `@id #organization` ✅ · `brand` → inline Organization · `category`, `material`, `sku` present |
| CollectionPage `/products/hotel#collection` | `mainEntity` → ItemList of 46 ListItems → real Product URLs (all 200) |

**Human-link graph (internal `<a>`):** cross-cluster linking is healthy. Blog↔guide↔author↔products all interlink (blog-ffe links the guide + 3 sibling posts + author + products; guide links 5 blog posts + author; author hub links 7 posts; home links all clusters). Product pages link guides/blog/projects. No cluster is link-orphaned.

**Dangling-edge check:** product-detail URLs in `itemListElement` (e.g. `/products/2-seater-sofa`, `/products/sectional-sofa`) all return **200** and render a real `Product` entity with its own `@id`. Edges resolve — no broken schema references found in the sample.

## Orphans / missing edges

- **No learning store wired.** `ruvector.db` (1.5 MB, `redb` format — NOT SQLite, opened as binary) and `agentdb.rvf` sit at repo root, gitignored, and are referenced **only** in `.gitignore` and two audit docs (`agents/03-seo-article-loop.md`, `agents/25-geo-schema.md`). No app/script code reads or writes them. There is **no `graphify-out/`** and no `seo/knowledge-graph/` writeback tree. The Phase-9 memory layer is dropped scaffolding, not a live loop.
- **Author `@id` / `@type` mismatch.** Node `…/author/dmd-furnishing-editorial#person` is typed `Organization`. The slug + `#person` fragment implies a Person; articles cite it via `author`. "Editorial Team = Organization" is defensible, but the `#person`-named-`Organization` is an inconsistency an engine may distrust for E-E-A-T author signals. No `Person` entity exists anywhere on the site.
- **Inline publisher (duplicate, not link).** BlogPosting `publisher` is an inline `Organization` object instead of `@id` → `#organization`. The guide's `Article.publisher` does it correctly. This splits the org into two representations on blog pages — a weak edge where a strong one exists one route over.
- **`Service` provider inconsistency.** On `/services`, the ItemList Services use inline `provider: Organization` while the standalone Service nodes use `@id` → `#organization`. Mixed strength on the same page.
- **`Article.about` → bare `Thing`s (no @id).** The guide declares `about: [Thing, Thing, Thing]` with no `@id`, so topical entities (FF&E, casegoods, value engineering) are NOT minted as reusable graph nodes. The glossary in `llms.txt` defines these terms richly, but they are not entities the schema graph can point at — a missing topical layer.
- **`brand` inline on Product** (minor) — `manufacturer` correctly uses `@id`, so the product→org edge is closed; `brand` is just a cosmetic duplicate.
- **llms.txt as entity index — good, but link-only.** `public/llms.txt` is well-structured (About/Contact/Services/Markets/Key Pages/Products/Glossary/FAQs/Process) and functions as a clean entity index for AI crawlers. It lists 6 blog posts but the snapshot/site have 6 — matches. It does not, however, expose the `@id` scheme, so it complements rather than mirrors the schema graph.

## Findings

| Severity | Entity / Link | Issue | Fix |
|---|---|---|---|
| 🟠 high | Author `#person` node | Typed `Organization` but `@id` ends `#person`; no real `Person`; cited as article `author` | Make it a true `Person` (or rename `@id` to `#editorial-team` + keep Organization) and add `worksFor` → `@id #organization`; align type↔id |
| 🟠 high | BlogPosting `publisher` | Inline `Organization`, not `@id` ref — duplicates org on blog pages | Replace with `{"@id":"https://dmdfurnishing.com/#organization"}` (match the guide's pattern) |
| 🟡 med | `Article.about` / topical entities | `about` → bare `Thing` with no `@id`; FF&E/casegoods/value-engineering not minted as graph nodes | Mint `DefinedTerm`/`Thing` nodes with stable `@id` (e.g. `/#ffe`) referenced from glossary, guides, blog `about`, and Product `category` |
| 🟡 med | `Service.provider` on /services | Inline `Organization` on ItemList services vs `@id` on standalone nodes — mixed | Standardize all `provider` to `@id` → `#organization` |
| 🟡 med | Learning store (ruvector/agentdb) | Phase-9 KG memory present as files but un-wired; no graphify-out, no writeback tree | Either implement the writeback loop (run `/graphify` on a `seo/knowledge-graph/` tree post-publish) or remove the stray `ruvector.db`/`agentdb.rvf` so they aren't mistaken for a live store |
| 🟢 pass | `#organization` hub + `@id` scheme | Connected hub-and-spoke; org referenced by `@id` on all 8 pages; product→`manufacturer` @id closed; itemList edges all 200 | Keep |
| 🟢 pass | Internal HTML interlinking | Cross-cluster links (blog↔guide↔author↔product↔home) all present; no orphan clusters | Keep |
| 🟢 pass | llms.txt entity index | Structured, complete, glossary + FAQ + key-page index for AI crawlers | Keep; consider adding the guide-cluster `@id`s |

## Score: 74/100

Strong, genuinely-connected schema graph (correct `@id` hub-and-spoke, closed product→org edge, resolving itemList edges, healthy cross-cluster internal linking, a real llms.txt entity index) — an engine *can* traverse this site as a coherent graph today. Held back by: author entity type/id mismatch, inline `publisher` weakening blog→org edges, topical entities (FF&E/casegoods/VE) never minted as reusable `@id` nodes, and — for the lens's namesake Phase-9 — the learning/memory loop is unimplemented (stray `ruvector.db`/`agentdb.rvf` with no code, no graphify output, no writeback tree).

## Top 3 actions

1. **Fix the two high-severity schema edges** — convert BlogPosting `publisher` to an `@id` ref to `#organization`, and resolve the author node's type↔`@id` mismatch (true `Person` with `worksFor`, or rename to `#editorial-team`). These close the two weakest edges in an otherwise tight graph and lift E-E-A-T author signals.
2. **Mint topical entity nodes** — give FF&E, casegoods, HPL, value engineering, BOQ stable `@id`s (`DefinedTerm`/`Thing`), define them once, then reference them from the glossary, guide/blog `about`, and Product `category`. This adds the missing topical layer that turns a company graph into a *subject-matter* graph engines cite.
3. **Decide the Phase-9 memory loop** — either wire it (post-publish writeback → `seo/knowledge-graph/` → `/graphify`, queried by `graph-scout` before the next article) or delete the un-referenced `ruvector.db`/`agentdb.rvf` so they don't masquerade as a live learning store.
