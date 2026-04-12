# Prioritized SEO/GEO Action Plan -- DMD Furnishing

**Date:** 2026-04-09
**Based on:** 13 SEO agent audits + 5 GEO agent audits + 1 bridge audit
**Overall SEO Score:** 46/100 | **Overall GEO Score:** 52/100

---

## The Three-Layer Problem

DMD Furnishing's SEO challenges operate at three distinct layers. Fixes must proceed in order -- higher layers are blocked until lower layers are resolved.

1. **Layer 1: Deployment & Indexation** -- The Next.js site is not live at the production domain. Only 3 of 725 URLs are indexed. Nothing else matters until this is fixed.
2. **Layer 2: Off-Site Authority** -- Zero backlinks, zero GBP, zero citations, zero reviews, broken LinkedIn. Google and AI platforms have no external validation that this business exists.
3. **Layer 3: On-Site Optimization** -- Schema fixes, content expansion, image optimization, performance tuning. These have high value but only after Layers 1 and 2 are addressed.

---

## P0 -- Fix This Week (Deployment & Indexation Crisis)

| # | Action | Impact | Effort | Agent Source |
|---|--------|--------|--------|-------------|
| 1 | **Deploy Next.js site to dmdfurnishing.com** -- Point production DNS to Netlify site running Next.js build. The CRA SPA currently at dmdfurnishing.com says "You need to enable JavaScript to run this app." and is non-indexable. This single change unlocks all SEO work. | CRITICAL | Medium | seo-technical (72) |
| 2 | **Fix sitemap slug mismatch** -- 53 dead URLs (/products/school/*, /products/university/*) and 52 orphan pages (/products/educational-facilities/*). Update `/scripts/generate-sitemap.js` to use catalog library slug resolution. | HIGH | Low | seo-sitemap (52) |
| 3 | **Verify Google Search Console** -- Add `google-site-verification` meta tag and submit sitemap. Currently zero GSC presence. | HIGH | Low | seo-technical (72), seo-dataforseo (38) |
| 4 | **Fix broken LinkedIn company page** -- linkedin.com/company/dmdfurnishing returns 404. Either create the company page or remove from Footer.js and both sameAs arrays in metadata.js. This broken link appears on every page and in all schema. | HIGH | Low | seo-backlinks (18), seo-local (22), geo-schema (56) |
| 5 | **Remove broken sameAs URLs from schema** -- Until social profiles are verified as live, remove all unconfirmed sameAs links. Broken sameAs actively harms entity trust. | HIGH | Low | geo-schema (56) |
| 6 | **Verify geocoordinates** -- Current coords (42.0654, -71.2478) resolve to Mechanic Street, not 56 Leonard St. Confirm or fix. | MEDIUM | Low | seo-maps (18) |

---

## P1 -- Fix This Sprint (Off-Site Authority Foundation)

| # | Action | Impact | Effort | Agent Source |
|---|--------|--------|--------|-------------|
| 7 | **Create Google Business Profile** -- This is the single highest-impact action for local SEO and map visibility. Category: "Furniture Manufacturer" or "Furniture Store". Add photos, hours, description. | CRITICAL | Medium (2-4 hrs) | seo-local (22), seo-maps (18), geo-platform-analysis (34.6) |
| 8 | **Build foundational citations** -- Submit consistent NAP to: Yelp, BBB, Bing Places, Apple Business Connect, Houzz, Foxboro Chamber of Commerce, Manta, Yellow Pages. | HIGH | Medium (4-6 hrs) | seo-local (22), seo-maps (18) |
| 9 | **Verify Bing Webmaster Tools** -- Add `msvalidate.01` meta tag, submit sitemap. Bing powers ChatGPT web search and Copilot. | HIGH | Low | seo-technical (72), geo-platform-analysis (34.6) |
| 10 | **Remove deprecated HowTo schema from /services** -- Google removed HowTo rich results in Sept 2023. May trigger Rich Results Test warnings. | HIGH | Low (5 min) | seo-schema (78) |
| 11 | **Change LocalBusiness @type to FurnitureStore** -- More specific schema type improves furniture-related query relevance. | HIGH | Low (5 min) | seo-local (22), geo-schema (56) |
| 12 | **Fix Product schema pricing** -- Product pages have `price: '0'` which Google may flag as spam. Remove price field or use priceSpecification with note about quote-based pricing. | HIGH | Low | seo-technical (72), seo-schema (78) |
| 13 | **Add FAQPage schema to homepage** -- 7 FAQ items exist in HTML but have no corresponding structured data. Critical for AI citation. | HIGH | Low | seo-schema (78), seo-geo (61) |
| 14 | **Fix blog author from Organization to Person** -- Google and AI platforms strongly prefer Person authors with credentials. Change @type in all 6 blog articles. | HIGH | Low | seo-schema (78), geo-content (68) |
| 15 | **Fix hero carousel alt text** -- All 4 homepage hero images share identical alt: "DMD Furnishing commercial hospitality furniture". Each needs unique descriptive alt. | HIGH | Low | seo-image-gen (52), seo-visual (74) |
| 16 | **Fix SVG logo dimensions** -- Logo has 20000x18000 intrinsic dimensions but renders at 180x60. Change to width="600" height="600". | MEDIUM | Low | seo-image-gen (52) |
| 17 | **Add `<main>` landmarks to Blog and Contact pages** -- Missing semantic landmark affects accessibility and crawlers. | MEDIUM | Low | seo-visual (74), seo-google (72) |

---

## P2 -- Fix This Quarter (On-Site Optimization & Content)

### Schema & Structured Data
| # | Action | Impact | Effort | Agent Source |
|---|--------|--------|--------|-------------|
| 18 | Add CollectionPage schema to /products/[placeSlug] category pages | MEDIUM | Low | seo-schema (78) |
| 19 | Add FAQPage schema to blog articles with inline FAQ sections | MEDIUM | Low | seo-schema (78) |
| 20 | Add ItemList of posts to blog index page | MEDIUM | Low | seo-schema (78) |
| 21 | Add knowsAbout, areaServed, publisher to Organization/WebSite schemas | MEDIUM | Low | geo-schema (56) |
| 22 | Add parentOrganization link from LocalBusiness to Organization | LOW | Low | geo-schema (56) |
| 23 | Create Wikidata entry for DMD Furnishing | MEDIUM | Medium | geo-ai-visibility (52), geo-platform-analysis (34.6) |

### Content Expansion
| # | Action | Impact | Effort | Agent Source |
|---|--------|--------|--------|-------------|
| 24 | Add 300+ words of unique content to /products and /products/[category] pages | HIGH | Medium | seo-content (82), geo-content (68) |
| 25 | Add named author with bio/credentials to blog posts | HIGH | Low | seo-content (82), geo-content (68) |
| 26 | Add client testimonials and case study narratives to projects | HIGH | Medium | seo-content (82), seo-backlinks (18) |
| 27 | Stagger blog publication dates and add dateModified | MEDIUM | Low | seo-content (82), geo-content (68) |
| 28 | Add founding year, team info, credentials to About page | HIGH | Low | seo-content (82) |
| 29 | Create cross-links between related blog posts | MEDIUM | Low | seo-content (82) |
| 30 | Fix meta description lengths (trim to 150-160 chars on 4+ pages) | MEDIUM | Low | seo-content (82), geo-technical (88) |

### Images & Performance
| # | Action | Impact | Effort | Agent Source |
|---|--------|--------|--------|-------------|
| 31 | Create 6 blog featured images (1200x630) -- blog has zero images | HIGH | Medium | seo-image-gen (52) |
| 32 | Fix Netlify image cache headers -- `/_next/image` returns max-age=0 | HIGH | Medium | seo-performance (78) |
| 33 | Pre-optimize source images (9.6GB down to ~500MB) | HIGH | Medium | seo-performance (78) |
| 34 | Reduce RSC route prefetching aggressiveness (7 prefetches on homepage) | MEDIUM | Low | seo-performance (78) |
| 35 | Add manual LCP image preload hint for homepage hero | MEDIUM | Low | seo-performance (78), seo-google (72) |
| 36 | Fix CLS from fade-in-up animation (translateY 28px shift) | MEDIUM | Low | seo-performance (78) |
| 37 | Add inline images/diagrams to blog articles | MEDIUM | Medium | seo-image-gen (52) |

### Technical
| # | Action | Impact | Effort | Agent Source |
|---|--------|--------|--------|-------------|
| 38 | Migrate to dynamic sitemap using Next.js app/sitemap.js | HIGH | Medium | seo-technical (72), seo-sitemap (52) |
| 39 | Implement real lastmod dates per page (not build date) | MEDIUM | Medium | seo-sitemap (52) |
| 40 | Add Web Vitals monitoring (GA4 or Netlify Analytics) | HIGH | Medium | seo-technical (72), seo-google (72) |
| 41 | Fix IndexNow -- generate real key, automate post-deploy | MEDIUM | Medium | seo-technical (72) |
| 42 | Fix triple-dash product URL slugs with 301 redirects | LOW | Medium | seo-technical (72) |
| 43 | Add descriptive slugs to inspiration pages (replace /inspirations/1) | LOW | Medium | seo-technical (72) |
| 44 | Standardize NAP format across all pages (address abbreviation, email casing) | LOW | Low | seo-local (22) |
| 45 | Add geographic modifiers to key title tags ("Foxboro, MA") | MEDIUM | Low | seo-local (22) |

### Backlink Building
| # | Action | Impact | Effort | Agent Source |
|---|--------|--------|--------|-------------|
| 46 | Register with AHLA Allied Member Directory, BIFMA supplier directory | HIGH | Medium | seo-backlinks (18) |
| 47 | Create downloadable PDF resources (FF&E checklist, budget template) | HIGH | High | seo-backlinks (18), seo-content (82) |
| 48 | Submit to Houzz, industry-specific directories | MEDIUM | Medium | seo-backlinks (18), seo-local (22) |
| 49 | Begin Reddit participation (r/hospitality, r/interiordesign) | MEDIUM | Low (ongoing) | geo-ai-visibility (52), geo-platform-analysis (34.6) |
| 50 | Publish original research content (FF&E cost benchmarks) | HIGH | High | seo-backlinks (18), geo-content (68) |

---

## P3 -- Backlog (Future Growth)

| # | Action | Impact | Effort | Agent Source |
|---|--------|--------|--------|-------------|
| 51 | Create YouTube channel with project walkthrough videos | HIGH | High | seo-geo (61), geo-platform-analysis (34.6) |
| 52 | Pursue Wikipedia article / Wikidata entry once notability criteria met | HIGH | High | geo-ai-visibility (52) |
| 53 | Create local landing pages for key markets (Boston, New England) | MEDIUM | High | seo-local (22), seo-dataforseo (38) |
| 54 | Guest post on hospitality trade publications (HD Magazine, Hotel Business) | HIGH | High | seo-backlinks (18) |
| 55 | Submit projects to hospitality design awards (HD Awards, AHEAD) | MEDIUM | Medium | seo-backlinks (18) |
| 56 | Create interactive tools (FF&E budget calculator, room configurator) | MEDIUM | High | seo-backlinks (18), seo-dataforseo (38) |
| 57 | Build competitor monitoring and rank tracking pipeline | LOW | Medium | seo-dataforseo (38) |
| 58 | Add video content to service and project pages | MEDIUM | High | seo-geo (61) |
| 59 | Create comparison content ("custom vs stock furniture") | MEDIUM | Medium | geo-content (68), geo-platform-analysis (34.6) |
| 60 | Implement Product schema on individual product pages | MEDIUM | Medium | seo-schema (78), geo-content (68) |
| 61 | Implement pagination or virtual scrolling for 180-product catalog | MEDIUM | Medium | seo-performance (78), seo-visual (74) |
| 62 | Expand blog to 15-20 articles for topical authority | HIGH | High | seo-dataforseo (38), geo-content (68) |
| 63 | Pursue backlinks from sites linking to competitors but not DMD | HIGH | High | seo-backlinks (18) |

---

## Expected Score Trajectory

| Milestone | SEO Score | GEO Score | Timeline |
|-----------|-----------|-----------|----------|
| Current state | 46/100 | 52/100 | Today |
| After P0 (deployment + indexation) | 58/100 | 55/100 | Week 1 |
| After P1 (off-site foundation) | 65/100 | 62/100 | Sprint 1 (2-3 weeks) |
| After P2 (on-site optimization) | 75/100 | 72/100 | End of Quarter |
| After P3 (authority building) | 82/100 | 78/100 | 6-12 months |

---

## Quick Reference: Agent Scores

| Agent | Score | Primary Domain |
|-------|-------|---------------|
| geo-technical | 88 | GEO technical infrastructure |
| seo-content | 82 | Content quality and E-E-A-T |
| seo-performance | 78 | Core Web Vitals and speed |
| seo-schema | 78 | Structured data |
| seo-visual | 74 | Visual rendering and accessibility |
| seo-technical | 72 | Technical SEO |
| seo-google | 72 | PageSpeed Insights and CWV |
| geo-content | 68 | AI citability and E-E-A-T |
| seo-geo (bridge) | 61 | GEO readiness |
| geo-schema | 56 | Entity graph construction |
| geo-ai-visibility | 52 | AI platform visibility |
| seo-sitemap | 52 | Sitemap health |
| seo-image-gen | 52 | Image SEO |
| geo-platform-analysis | 34.6 avg | Platform readiness |
| seo-dataforseo | 38 | SERP visibility and keywords |
| seo-local | 22 | Local SEO |
| seo-backlinks | 18 | Off-page authority |
| seo-maps | 18 | Map platform visibility |

---

*Action plan synthesized from 19 independent agent audits on 2026-04-09.*
