# geo-schema Fixes Applied — 2026-04-09

## Score: 56/100 -> ~78/100 (estimated after fixes)

### Fixes Implemented

| # | Issue | File | Status | Score Impact |
|---|-------|------|--------|-------------|
| 1 | All 4 broken sameAs URLs removed | `lib/metadata.js` | DONE | +8 |
| 2 | LocalBusiness -> FurnitureStore | `lib/metadata.js` | DONE | +4 |
| 3 | Blog author Organization -> Person | All 6 blog pages | IN PROGRESS (agents) | +3 |
| 4 | HowTo schema misuse removed | `app/services/page.js` | DONE | +2 |
| 5 | Organization-LocalBusiness linked via parentOrganization | `lib/metadata.js` | DONE | +1 |
| 6 | knowsAbout added to Organization | `lib/metadata.js` | DONE | +1 |
| 7 | areaServed added to Organization | `lib/metadata.js` | DONE | +1 |
| 8 | publisher added to WebSite schema | `lib/metadata.js` | DONE | +1 |
| 9 | email added to LocalBusiness | `lib/metadata.js` | DONE | +1 |

### Remaining
- No Wikipedia/Wikidata sameAs links (need notability first)
- No foundingDate (need verified date)
- No numberOfEmployees (need verified count)
- SpeakableSpecification only on homepage (need blog articles)
- All blog articles same datePublished/dateModified
- Re-add sameAs only after creating real social profiles
