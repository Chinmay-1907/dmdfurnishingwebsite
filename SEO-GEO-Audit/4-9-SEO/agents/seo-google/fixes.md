# seo-google Fixes Applied — 2026-04-09

## Score: 72/100 -> ~76/100 (estimated after fixes)

### Fixes Implemented

| # | Issue | File | Status | Score Impact |
|---|-------|------|--------|-------------|
| 1 | Image cache headers fixed | `netlify.toml` | DONE | +2 |
| 2 | CSP strengthened | `next.config.js` | DONE | +1 |
| 3 | CountUp SSR fix | `components/CountUp.js` | DONE | +1 |

### Remaining
- Mobile LCP POOR on 4/5 pages (10-12s) — needs image optimization, preloading
- Render-blocking CSS (~450ms savings available)
- Legacy JavaScript polyfills (11KB waste)
- No CrUX field data (insufficient traffic)
- Images served oversized on mobile
