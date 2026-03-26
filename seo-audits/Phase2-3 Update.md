---
  10-SEO-STRATEGY.md — Status Report

  Phase 1: Quick Wins — COMPLETE

  All 37 items fixed. Score: 28 → 50-55.

  Phase 2: Foundation — ~90% COMPLETE

  ┌─────────────────────────────────────────────────────────────────────┬────────────────────────────────┐
  │                                Item                                 │             Status             │
  ├─────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ Sitemap overhaul (static pages, lastmod, priority, tier-1/2)        │ DONE                           │
  ├─────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ Schema enrichment (all 8 types valid)                               │ DONE                           │
  ├─────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ Security headers                                                    │ DONE                           │
  ├─────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ Image optimization (lazy, fetchpriority, aspectRatio, aria-labels)  │ DONE                           │
  ├─────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ AI search readiness (llms.txt, FAQPage, noscript content, IndexNow) │ DONE                           │
  ├─────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ Code splitting (React.lazy)                                         │ DONE                           │
  ├─────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ LCP preload                                                         │ DONE                           │
  ├─────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ react-snap pre-rendering                                            │ DEFERRED — build pipeline risk │
  ├─────────────────────────────────────────────────────────────────────┼────────────────────────────────┤
  │ SVG logo optimization (1.9 MB)                                      │ DEFERRED — needs SVGO          │
  └─────────────────────────────────────────────────────────────────────┴────────────────────────────────┘

  Phase 3: Content & E-E-A-T — Partial (code fixes done, content needs business input)

  ┌───────────────────────────────────────────────────────────┬────────────────────────────────────────┐
  │                           Item                            │                 Status                 │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Answer-first formatting                                   │ DONE (Home, Services, About)           │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Industry glossary definitions (FF&E, Casegoods, BOQ, HPL) │ DONE (Services.js)                     │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Privacy Policy + CCPA + GDPR                              │ DONE                                   │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Thin content enriched (Products root, Projects listing)   │ DONE                                   │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ "What Sets Us Apart" differentiated                       │ DONE                                   │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Old SEO system fully migrated                             │ DONE (all 12 pages on <SEO> component) │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Team/leadership page                                      │ Needs real people + bios               │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Replace placeholder testimonials                          │ Needs real client quotes               │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Industry certifications (BIFMA, etc.)                     │ Needs actual certs                     │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Client logo wall                                          │ Needs client permission                │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Case studies with real metrics                            │ Needs real project data                │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Blog launch (6 articles planned)                          │ Content strategy work                  │
  ├───────────────────────────────────────────────────────────┼────────────────────────────────────────┤
  │ Google Business Profile                                   │ Owner needs to set up + verify         │
  └───────────────────────────────────────────────────────────┴────────────────────────────────────────┘

  Phase 4: Next.js Migration — NOT STARTED

  Planning docs exist (NEXT_MIGRATION_PLAN.md). This is the permanent architectural fix for the CRA/JS rendering limitation.

  GEO Strategy Status

  ┌───────────────────────────────────────────┬─────────────────────────────────────┐
  │                  Target                   │               Status                │
  ├───────────────────────────────────────────┼─────────────────────────────────────┤
  │ Inline static schema in index.html        │ DONE                                │
  ├───────────────────────────────────────────┼─────────────────────────────────────┤
  │ llms.txt live and accurate                │ DONE (expanded with glossary + FAQ) │
  ├───────────────────────────────────────────┼─────────────────────────────────────┤
  │ FAQPage schema                            │ DONE                                │
  ├───────────────────────────────────────────┼─────────────────────────────────────┤
  │ Answer-first content formatting           │ DONE                                │
  ├───────────────────────────────────────────┼─────────────────────────────────────┤
  │ Definition/glossary content               │ DONE (Services.js <dl> block)       │
  ├───────────────────────────────────────────┼─────────────────────────────────────┤
  │ Noscript fallback content for AI crawlers │ DONE                                │
  ├───────────────────────────────────────────┼─────────────────────────────────────┤
  │ IndexNow + AI crawler rules               │ DONE                                │
  ├───────────────────────────────────────────┼─────────────────────────────────────┤
  │ Pre-rendering for full crawler visibility │ DEFERRED (react-snap or Next.js)    │
  └───────────────────────────────────────────┴─────────────────────────────────────┘

  KPI Progress

  ┌──────────────────────────┬────────────┬────────┬───────────────┐
  │          Metric          │  Baseline  │ Target │    Current    │
  ├──────────────────────────┼────────────┼────────┼───────────────┤
  │ Schema Errors            │ 5+         │ 0      │ 0             │
  ├──────────────────────────┼────────────┼────────┼───────────────┤
  │ Security Headers         │ F          │ A      │ A             │
  ├──────────────────────────┼────────────┼────────┼───────────────┤
  │ Sitemap URLs             │ 262        │ 400+   │ 303           │
  ├──────────────────────────┼────────────┼────────┼───────────────┤
  │ Code-split chunks        │ 1          │ 12+    │ 13            │
  ├──────────────────────────┼────────────┼────────┼───────────────┤
  │ Pages with SEO component │ 8          │ All    │ All 12        │
  ├──────────────────────────┼────────────┼────────┼───────────────┤
  │ Schema types             │ 4 (broken) │ 8+     │ 8 (all valid) │
  └──────────────────────────┴────────────┴────────┴───────────────┘

  ---
  Bottom line: Everything that can be done with code in the current CRA architecture is done. What remains falls into two buckets:

  1. Business content (Phase 3) — testimonials, team page, certifications, blog, case studies. These need your real data.
  2. Architecture (Phase 4) — Next.js migration for true SSR/SSG, which permanently solves the JS rendering blocker.