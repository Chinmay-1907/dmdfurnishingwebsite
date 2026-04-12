# seo-schema Fixes Applied — 2026-04-09

## Score: 78/100 -> ~93/100 (estimated after fixes)

### Fixes Implemented

| # | Issue | File | Status | Score Impact |
|---|-------|------|--------|-------------|
| 1 | LocalBusiness -> FurnitureStore | `lib/metadata.js` | DONE | +3 |
| 2 | Remove all broken sameAs URLs | `lib/metadata.js` | DONE | +4 |
| 3 | Add parentOrganization to LocalBusiness | `lib/metadata.js` | DONE | +1 |
| 4 | Add knowsAbout to Organization | `lib/metadata.js` | DONE | +1 |
| 5 | Add areaServed to Organization | `lib/metadata.js` | DONE | +1 |
| 6 | Add publisher to WebSite schema | `lib/metadata.js` | DONE | +1 |
| 7 | Add email to LocalBusiness | `lib/metadata.js` | DONE | +1 |
| 8 | Remove HowTo from /services | `app/services/page.js` | DONE | +2 |
| 9 | Add FAQPage to homepage | `app/page.js` | DONE | +2 |
| 10 | Fix product price: '0' | `app/products/[...slug]/page.js` | DONE | +2 |
| 11 | Change blog author Org -> Person | All 6 blog pages | IN PROGRESS (agents) | +3 |
| 12 | Add FAQPage to blog posts | All 6 blog pages | IN PROGRESS (agents) | +2 |

### Remaining (cannot fix in code)
- Add foundingDate to Organization (need verified date — DO NOT fabricate)
- Add numberOfEmployees (LinkedIn says 2-10, but need exact count)
- Verify geocoordinates (42.0654, -71.2478) — may be ~500m off

### Update: LinkedIn URL re-added (2026-04-09)
User provided real LinkedIn: `linkedin.com/company/dmd-usaa/`. Verified via WebFetch as actual DMD Furnishing company page (Foxborough, MA, hospitality furniture). Added back to `organizationSchema.sameAs`.
