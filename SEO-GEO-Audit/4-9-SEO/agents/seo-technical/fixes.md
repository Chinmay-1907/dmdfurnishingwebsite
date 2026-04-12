# seo-technical Fixes Applied — 2026-04-09

## Score: 72/100 -> ~80/100 (estimated after fixes)

### Fixes Implemented

| # | Issue | File | Status | Score Impact |
|---|-------|------|--------|-------------|
| 1 | Sitemap slug mismatch (53 dead URLs) | `app/sitemap.js` | DONE | +4 |
| 2 | CSP tightened (frame-ancestors, base-uri) | `next.config.js` | DONE | +1 |
| 3 | Email casing inconsistency site-wide | 8 files | DONE | +1 |
| 4 | Broken LinkedIn in sameAs schema | `lib/metadata.js` | DONE | +2 |

### Remaining (requires external action)
- Production domain still serves old CRA SPA (DNS change needed)
- IndexNow key is placeholder (need real key + automation)
- No GSC or Bing Webmaster verification (need account setup)
- Product URL depth (5 levels) — structural, low priority
- Inspiration pages use numeric IDs (structural change)
