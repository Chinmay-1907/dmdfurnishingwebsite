# SEO-SCOREBOARD — fable-dmd iteration loop

Goal: every category ≥95. Max 25 iterations. Baseline = iteration 0 (commit 8346de3).

## Lighthouse (mobile, prod build :3006)

| Page | Perf I0 | SEO I0 | A11y I0 | BP I0 |
|---|---|---|---|---|
| home | 63 | 100 | 95 | 93 |
| products | 69 | 100 | 95 | 96 |
| place-hotel | err* | 100 | 95 | 96 |
| product-detail | 68 | 100 | 96 | 96 |
| services | 73 | 100 | 97 | 96 |
| about | 73 | 100 | 96 | 96 |
| contact | 66 | 92 | 96 | 96 |
| blog | 74 | 100 | 96 | 96 |
| blog-post | 66 | 100 | 96 | 96 |
| guide | 71 | 100 | 96 | 96 |
| projects | 73 | 100 | 96 | 96 |
| inspirations | 68 | 100 | 96 | 96 |

*place-hotel perf run errored (re-run next iteration)

## Toolkit audits (claude-seo v2, all 18 agents + 25 skills applied)

| Category | I0 |
|---|---|
| technical-seo | 84 |
| sitemap | 86 |
| performance-hygiene | 62 |
| on-page | 72 |
| content-quality | 70 |
| topic-clusters | 58 |
| schema | 72 |
| geo-ai-visibility | 80 |
| sxo | 72 |
| image-seo | 64 |
| internal-linking | 58 |
| architecture | 62 |
| local-seo | 45 |
| ecommerce-seo | 58 |
| analytics-wiring | 25 |
| ui-ux | 62 |

## Notes
- GSC/GA4 MCP data unavailable this session (servers wired but tools need session reload; Google-side access still propagating). Audits ran on code + crawl + Lighthouse only.
- Worst offenders at baseline: ~20 broken images in prod (path case/comma mismatches), 2MB logo SVG render-critical on every page, ~150/174 product pages crawl-orphaned (PAGE_SIZE=24), self-serving Review schema, 3 deprecated HowTo blocks, FAQPage schema invisible on /products, no analytics, OTP-gated contact form.

## Iteration log

### Iteration 0 (baseline) — 2026-06-10
Full audit: 7 parallel toolkit workers + UI/UX visual pass (16 pages × 2 viewports) + Lighthouse ×12.
