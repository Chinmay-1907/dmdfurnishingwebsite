# seo-visual Fixes Applied — 2026-04-09

## Score: 74/100 -> ~84/100 (estimated after fixes)

### Fixes Implemented

| # | Issue | File | Status | Score Impact |
|---|-------|------|--------|-------------|
| 1 | Blog and Contact missing main landmark | `app/blog/page.js`, `app/contact/page.js` | DONE | +2 |
| 2 | About H1 spacing ("Spaces.Designed") | `app/about/page.js` | DONE | +1 |
| 3 | Blog title duplication | `app/blog/page.js` | DONE | +1 |
| 4 | Hero carousel identical alt text | `app/page.js` | DONE | +2 |
| 5 | SVG logo 20000x18000 dimensions | `public/DMD_Furnishing_Logo_Embedded.svg` | DONE | +2 |
| 6 | LinkedIn 404 removed from footer | `components/Footer.js` | DONE | +2 |

### Remaining
- Touch targets below 48x48px on mobile (CSS change needed)
- Product naming typos ("2-Siter Sofa") — data in XML
- OG image URLs point to wrong domain — needs DNS/domain resolution
- Products page loads all 180 items (no pagination) — structural
