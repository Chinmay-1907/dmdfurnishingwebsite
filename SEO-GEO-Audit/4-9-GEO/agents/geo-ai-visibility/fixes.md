# geo-ai-visibility Fixes Applied — 2026-04-09

## Score: 52/100 -> ~60/100 (estimated after fixes)

### Fixes Implemented

| # | Issue | File | Status | Score Impact |
|---|-------|------|--------|-------------|
| 1 | Real LinkedIn URL added (dmd-usaa) | `lib/metadata.js`, `components/Footer.js` | DONE | +6 |
| 2 | FAQPage schema (makes FAQ extractable by AI) | `app/page.js` | DONE | +2 |
| 3 | CountUp SSR (AI crawlers see real numbers) | `components/CountUp.js` | DONE | +2 |
| 4 | FurnitureStore type (more specific entity) | `lib/metadata.js` | DONE | +1 |
| 5 | knowsAbout (explicit topic expertise) | `lib/metadata.js` | DONE | +1 |
| 6 | Blog added to main nav (ends orphan state) | `components/Header.js`, `components/Footer.js` | DONE | +2 |

### Remaining (ALL require external action for brand mentions)
- Zero Wikipedia presence (need notability first)
- Zero Reddit mentions (need community participation)
- Zero YouTube presence (need channel + videos)
- Broken LinkedIn page (need to create real company page)
- "DMD" brand collision with Duchenne Muscular Dystrophy — always use "DMD Furnishing"
- Only 10% of content blocks hit optimal 134-167 word passage length
- llms.txt links point to production domain (need DNS resolution)
