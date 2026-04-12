# seo-sitemap Fixes Applied — 2026-04-09

## Score: 52/100 -> ~82/100 (estimated after fixes)

### Fixes Implemented

| # | Issue | File | Status | Score Impact |
|---|-------|------|--------|-------------|
| 1 | 53 dead URLs (school/university slug mismatch) | `app/sitemap.js` (NEW) | DONE | +15 |
| 2 | 52 orphan pages (educational-facilities missing) | `app/sitemap.js` (NEW) | DONE | +10 |
| 3 | Migrated from static to Next.js dynamic sitemap | `app/sitemap.js` replaces `scripts/generate-sitemap.js` | DONE | +3 |
| 4 | Removed deprecated priority/changefreq tags | `app/sitemap.js` uses Next.js format | DONE | +2 |
| 5 | Removed old sitemap from build script | `package.json` | DONE | — |

### How it was fixed
- Created `app/sitemap.js` that imports from `lib/catalog.js` (which merges School+University into educational-facilities)
- Old `scripts/generate-sitemap.js` parsed raw XML directly and used raw place IDs, causing the mismatch
- Next.js generates sitemap.xml automatically at build time

### Remaining
- Per-page lastmod dates still use fixed dates (not true last-modified)
- No sitemap index splitting (not needed until >50K URLs)
