# Audit 07 — seo-backlinks (agent)
**Lens:** backlink profile (Moz/Bing/Common Crawl) + internal link structure
**Target:** DMD Furnishing (fable-dmd) · source C:\Users\chin\dmdfurnishingwebsite-fable · live http://localhost:3006
**Date:** 2026-06-10
**Status:** partial (API needed)

## What this lens audits
Two halves. (1) **Off-site backlink profile** — who links TO dmdfurnishing.com, how many referring domains, anchor-text mix, toxic/spam ratio, link velocity. This needs an external data source (Moz / Bing Webmaster / Common Crawl / DataForSEO). None of those are wired in this environment, so that half is documented as method + gap checklist only. (2) **On-site link structure** — internal linking, nav/footer reach, anchor quality, outbound links, orphan-page risk. This IS checkable from source + live HTML, and was fully audited below.

## Method (what I could check now)
- Read the global link surfaces in source: `components/Header.js`, `components/Footer.js`, `components/Breadcrumbs.js`, `components/blog/RelatedPosts.js`.
- Pulled live SSR HTML from :3006 for 5 representative pages (`/`, `/products/hotel`, `/blog/what-is-ffe-hospitality`, `/guides/hospitality-ffe`, `/about`) and counted every `href`.
- Checked index→child coverage for the three deep route families (`/products`, `/projects`, `/inspirations`) to test orphan risk.
- Inspected `rel` and anchor text on outbound links.
- Verified the real sitemap (`/sitemap.xml`) — the canonical crawl surface a backlink tool would map.
- Source labels: **Parsed (0.95)** = read from source file · **Live (0.95)** = observed in served HTML · **CC/Moz (n/a)** = needs external API.

## Internal linking findings

| Severity | Page/Component | Issue | Fix |
|---|---|---|---|
| 🟢 pass | `Header.js` | Global nav links to all 8 top-level sections (Home, About, Products, Services, Projects, Inspirations, Guides, Blog) + Contact CTA. Every page inherits full-reach nav. Parsed (0.95) | None. |
| 🟢 pass | `Footer.js` | Footer adds Quick Links + 4 deep `/services#anchor` jump links + Contact. Reinforces top-level reach site-wide. Parsed (0.95) | None. |
| 🟢 pass | Index→child coverage | `/products` lists all product detail slugs; `/projects` links all 5 project detail pages; `/inspirations` links all 6 slugs. No orphaned detail pages found. Live (0.95) | None. |
| 🟢 pass | Blog/guide body copy | In-content links use keyword-rich descriptive anchors — e.g. "hotel guestroom furniture checklist", "value engineering guide", "FF&E procurement timeline guide", not "click here". Strong topical anchor signal. Live (0.95) | None. |
| 🟢 pass | Outbound authority links | Blog posts link out to `ahla.com` (American Hotel & Lodging Association) and `hospitalitydesign.com` with `target="_blank" rel="noopener noreferrer"` and real anchor text. Good E-E-A-T citation behavior. Live (0.95) | None. |
| 🟢 pass | `RelatedPosts.js` | Every blog post renders up to 3 related-post links (`prefetch={false}`), so posts cross-link instead of dead-ending. Parsed (0.95) | None. |
| 🟡 medium | `Header.js` line 114 | `Testimonials` nav item commented out; no testimonials route exists. Minor — a social-proof page would attract links and add an internal hub. Parsed (0.95) | Optional: build `/testimonials` later; it's a natural link magnet. |
| 🟡 medium | Product detail pages | `/products/hotel` links ~30 product-detail children but those deep leaf pages (e.g. `/products/king-bed-frame---mdf`) mostly receive links only from their category page — shallow inbound internal links per leaf. Live (0.95) | Add a few contextual links from blog/guide copy into top product leaves (e.g. casegoods post → headboard product) to push internal equity deeper. |
| 🟡 medium | Snapshot mislabel (not a site bug) | Snapshot calls `public/DMD_Website.xml` the "sitemap" — it is actually the **product catalog data file** (`<places>`/`<furnitureType>`), 246 KB. The real sitemap is `/sitemap.xml` (231 URLs, correct `<urlset>` format, all `dmdfurnishing.com`, with image + lastmod). robots.txt correctly points to `/sitemap.xml`. Live (0.95) | None on the site. Note for other agents: don't audit DMD_Website.xml as a sitemap. |
| 🟢 pass | Self-canonical / domain | Every audited page emits `<link rel=canonical href="https://dmdfurnishing.com/...">` and sitemap is 100% on that one domain — clean single-host backlink target, no www/non-www or staging-domain leak. Live (0.95) | None. |

## External backlink audit — method + gap checklist (needs API)
The backlink *profile* (the core of this lens) could not be measured — no external API is wired here. To complete it, run the seo-backlinks agent's tiered workflow against **domain `dmdfurnishing.com`**:

1. **Tier 0 — Common Crawl (free, always available):**
   `python scripts/commoncrawl_graph.py dmdfurnishing.com --json`
   Returns in-degree, PageRank, harmonic centrality, top referring domains (confidence 0.50, quarterly freshness). At Tier 0 alone, report INSUFFICIENT DATA — fewer than 4 scoring factors have data.
2. **Tier 1 — Moz API (needs `MOZ_ACCESS_ID` / `MOZ_SECRET_KEY`):**
   `moz_api.py metrics https://dmdfurnishing.com` (DA, PA, spam score, referring domains) · `moz_api.py anchors ...` (anchor-text distribution) · `moz_api.py domains ...` (referring-domain list). Confidence 0.85, ~3-day freshness. Rate limit 1 req / 10 s.
3. **Tier 2 — Bing Webmaster (needs Bing API key + verified property):**
   `bing_webmaster.py links https://dmdfurnishing.com` for inbound links; `bing_webmaster.py compare` vs a competitor for gap analysis. Confidence 0.70, near-realtime.
4. **Tier 3 — DataForSEO (premium MCP):** highest-fidelity referring domains, link velocity trend (only source for velocity), follow/nofollow split, geographic relevance. Confidence 1.00.
5. **Verify known links:** `verify_backlinks.py --target https://dmdfurnishing.com --links <file>` once any referring URLs are collected.

**Gap checklist — cannot answer until an API above is connected:**
- [ ] Referring-domain count and trend (link velocity)
- [ ] Domain Authority / quality distribution of referrers
- [ ] Anchor-text naturalness of *inbound* links (over-optimized vs branded vs naked)
- [ ] Toxic / spam backlink ratio (disavow candidates)
- [ ] Follow vs nofollow inbound ratio
- [ ] Geographic relevance of referrers (US-hospitality vs off-topic)
- [ ] Competitor backlink gap (who links to rivals but not DMD)
- [ ] Whether the LinkedIn `/company/dmd-usaa/`, Instagram, and Facebook profiles are sending followed/referral links back (footer links OUT to them; need to confirm they link back)

## Score / verdict (internal-only X/100 + note)
**Internal link structure: 88/100.** On-page linking is genuinely strong: full-reach nav + footer on every page, zero orphaned detail pages in the three deep route families, keyword-rich descriptive in-content anchors, related-posts cross-linking, and clean outbound authority citations with correct `rel`. Points off only for shallow inbound links to deep product leaves and the absent testimonials hub.

**Off-site backlink profile: NOT SCORED (INSUFFICIENT DATA).** Per the lens rules, no numeric score is produced when the core scoring factors (referring domains, quality, toxicity, velocity) have no data source. Connect at least Moz (Tier 1) before claiming a Backlink Health Score. Overall lens status: **partial (API needed)**.

## Top 3 actions
1. **Connect one backlink API and re-run on `dmdfurnishing.com`.** Start with Common Crawl (free) for a baseline referring-domain map, then add Moz Tier 1 for DA + anchor-text + spam-score. Without this, the actual backlink profile is unknown.
2. **Deepen internal links into top product leaves.** Add a handful of contextual in-content links from blog/guide articles to the most important product detail pages (e.g. casegoods post → king headboard unit) so internal link equity reaches deeper than category level.
3. **Confirm social profiles link back and seed a few authority citations.** Footer links OUT to LinkedIn `/company/dmd-usaa/`, Instagram, Facebook — verify those profiles link back to dmdfurnishing.com (followed referral links). Then pursue 2-3 industry-relevant inbound links (AHLA member directory, hospitality-design listings) to start a clean referring-domain base.
