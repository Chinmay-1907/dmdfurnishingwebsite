# Skill Audit 15 — seo-maps

**Skill purpose:** Maps intelligence for local SEO — geo-grid rank tracking, Google Business Profile (GBP) auditing, review intelligence, cross-platform NAP (Name/Address/Phone) verification, competitor radius mapping, and LocalBusiness schema generation. Three tiers: free (Overpass/Geoapify/Nominatim), DataForSEO (full), DataForSEO + Google Maps Platform.

**Target:** DMD Furnishing — B2B hospitality FF&E manufacturer · 56 Leonard St Unit 5, Foxboro, MA 02035 · +1 (617) 223-7781 · sales@dmdfurnishing.com · https://dmdfurnishing.com (source root `C:\Users\chin\dmdfurnishingwebsite-fable`, live dev `http://localhost:3006`)

**Date:** 2026-06-10

**Status:** partial (API needed)

**Tier detected:** Tier 0 (free). No DataForSEO MCP, no Google Maps Platform key wired. Per the skill's own tier rules, geo-grid rank tracking, live GBP audit, and review intelligence are all blocked — only on-site map-readiness (GBP Tier-0 manual workflow), schema generation, and competitor-method are runnable. Geo-grid + GBP + reviews are documented as method, not measured.

---

## On-site map-readiness checklist (Tier-0 buildable signals)

| Check | Result | Evidence |
|---|---|---|
| `GeoCoordinates` in schema | 🟢 Present + renders live | `lib/metadata.js:160-164` — `geo` block `latitude: 42.0654, longitude: -71.2478` in `localBusinessSchema`. Live `curl /contact` returns 2× `"@type":"GeoCoordinates"`. |
| `LocalBusiness` type + props | 🟢 Strong | `lib/metadata.js:140-182` — `FurnitureStore` + `additionalType: Manufacturer`, `priceRange: $$$`, `openingHoursSpecification` (Mon-Fri 9-18; weekend correctly omitted per comment), `parentOrganization`, `hasOfferCatalog`. |
| Full `PostalAddress` (NAP) | 🟢 Present + consistent | Identical address in `organizationSchema` (`:123-130`) and `localBusinessSchema` (`:152-159`): 56 Leonard St Unit 5 · Foxboro · MA · 02035 · US. Matches visible NAP in `ContactPage.js:607-608`. |
| Schema on every page (site-wide entity) | 🟢 Present | `localBusinessSchema` injected globally via `app/layout.js`; live `/contact` carries `FurnitureStore` even though it is the contact route. |
| Embedded Google Map on /contact | 🟢 Present (search-embed) | `ContactPage.js:653-662` — lazy iframe, shimmer skeleton until load, `referrerPolicy` set, descriptive `title`. Live HTML confirms `google.com/maps?q=56+Leonard+St+Unit+5,+Foxboro,+MA+02035&output=embed`. Note: address-search embed, not a `place_id`/CID embed. |
| Clickable phone (`tel:`) | 🟢 Present | `tel:+16172237781` at `ContactPage.js:454` (CTA) and `:615` (NAP). |
| `hasMap` property | 🟡 Missing | `localBusinessSchema` has `geo` but no `hasMap`. Live `/contact` grep returns 0 `hasMap`. |
| "Get directions" link | 🟡 Missing | Address is plain text (`ContactPage.js:607-608`); no `maps/dir` link anywhere in `lib`/`components`/`app`/`public` (grep returned 0). Iframe exists but no one-tap directions CTA. |
| Local `areaServed` (regional layer) | 🟡 Too coarse | Only `areaServed: US` / `Country: United States` (`metadata.js:114,120`; `contact/page.js:32`). Live `/contact` shows 6× `areaServed`, all national. No State/City/GeoCircle for the Foxboro local pin. |
| GBP URL in `sameAs` / `hasMap` | 🟠 Absent | `sameAs` = LinkedIn, Facebook, Instagram only (`metadata.js:131-135`). No Google Business Profile / `maps.app.goo.gl` / `g.page` / place URL anywhere in source (grep across `lib`/`components`/`app`/`public` = 0 hits). No GBP mention in `llms.txt`. Can't confirm from code whether the profile is even claimed. |

---

## Geo-grid + competitor method + gap checklist (API-blocked)

**Geo-grid setup** (Local Falcon turnkey, or DataForSEO Maps SERP `location_coordinate`, or Google Places):
- **Center:** 42.0654, -71.2478 — reuse the schema coords so on-site and grid agree.
- **Grid:** 5×5 or 7×7 pins, ~1.5–2 mi spacing (covers Foxboro + Mansfield + Norton + Wrentham + the Route 1 / I-95 corridor toward Boston).
- **Per pin:** record Maps rank 1-20 (or "not found"); **SoLV** = `(top_3_count / total_points) × 100`. Render ASCII heatmap (skill `references/maps-geo-grid.md`).
- **Cost gate (skill requires):** show "Grid 7×7 (49 points) | Keywords N | Est. cost $X — Proceed?" before firing.

**Target keywords** (near-me + city-modified + category):
- "hospitality furniture manufacturer near me"
- "commercial furniture Foxboro MA"
- "hotel furniture manufacturer Massachusetts"
- "restaurant furniture supplier near me"
- "FF&E manufacturer New England"
- "custom commercial casegoods Boston"

**Competitor radius mapping:** Tier 0 → Overpass (`shop=furniture` + `craft=carpenter`/office) around the centroid via Nominatim, sort by distance. Tier 1 → DataForSEO `business_listings_search` by category, rank by rating × review count, compute competitor density per km².

**Tools needed:** DataForSEO Maps SERP API or Local Falcon (rank + heatmap); GBP API / My Business Info (profile + reviews + posts); Places API or Overpass+Nominatim (free competitor discovery).

**Gap checklist (all blocked until an API/login is wired):**
- [ ] Geo-grid SoLV % across the 6 keywords
- [ ] Heatmap render (pin-by-pin rank)
- [ ] GBP claimed? completeness score (categories, hours, photos, services, description, attributes)
- [ ] Review health — count, avg rating, velocity (18-day rule), owner response rate
- [ ] GBP post cadence + Q&A gaps
- [ ] Competitor radius count + top 5 by rating/reviews + density
- [ ] Cross-platform NAP — Bing Places, Apple Business Connect, OSM listing exist + match
- [ ] Confirm GBP-pinned lat/lng matches schema `geo` (42.0654, -71.2478)

---

## Findings

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🟠 | GBP not wired into site (and unverifiable) | No Google Business Profile URL in `sameAs` or `hasMap`; not in `llms.txt`. The single biggest Maps-ranking lever and it lives outside the code. | Claim/verify GBP, then add its place URL to `sameAs` (`metadata.js:131-135`) and as `hasMap`. |
| 🟡 | `hasMap` missing | `localBusinessSchema` has `geo` but no `hasMap` — a Maps-entity signal left on the table. | Add `hasMap: 'https://www.google.com/maps?q=56+Leonard+St+Unit+5,+Foxboro,+MA+02035'` (or GBP share URL once claimed) to `localBusinessSchema` (`metadata.js:140-182`). |
| 🟡 | No "Get directions" link | Address is plain text in contact NAP (`ContactPage.js:607-608`) and footer; embed exists but no one-tap directions CTA. | Wrap address in `<a href="https://www.google.com/maps/dir/?api=1&destination=56+Leonard+St+Unit+5,+Foxboro,+MA+02035">` on contact + footer. |
| 🟡 | `areaServed` too coarse | Only `US` — no regional/local layer to reinforce the Foxboro pin. | Add named State/City or a `GeoCircle areaServed` alongside `US` (keeps national reach). |
| 🟢 | GeoCoordinates / LocalBusiness / NAP / embed | Present, live, internally consistent, clean lazy-load implementation. | Keep. Spot-confirm schema coords match GBP-pinned location once claimed. |

---

## Score (map-readiness 78/100)

On-site, buildable half only — NOT a full Maps Health Score. Geo-grid (25%), GBP completeness (20%), review health (20%) are API-blocked and unscored.

| Dimension (on-site only) | Earned | Notes |
|---|---|---|
| GeoCoordinates in schema | 20/20 | Present, live, plausible Foxboro centroid |
| LocalBusiness type + properties | 20/20 | FurnitureStore + Manufacturer, hours, priceRange, catalog |
| NAP consistency (schema + visible) | 18/20 | Consistent; footer/contact address not linked |
| Embedded map / directions UX | 12/20 | Map present + lazy; missing `hasMap` + directions link |
| Local areaServed / GBP signal in code | 8/20 | Only `US`; no GBP URL in `sameAs`/`hasMap` |

Read 78/100 as: on-page foundation is strong; the live Maps presence is unmeasured.

---

## Top 3 actions

1. **Claim + verify the Google Business Profile, then wire it back** (`metadata.js`): add the GBP place URL to `sameAs` and add `hasMap` to `localBusinessSchema`. Biggest Maps lever; lives off-site. (🔴 impact, off-code.)
2. **Add a one-tap "Get directions" link** on the contact NAP (`ContactPage.js:607-608`) and footer address → `maps/dir/?api=1&destination=...`. Small change, real local-UX + signal win. (🟡)
3. **Run a geo-grid baseline** (Local Falcon or DataForSEO Maps SERP) on the 6 keywords from centroid 42.0654,-71.2478 to get a starting SoLV % + competitor radius set. Maps ranking is flying blind without it. (🟡, API needed.)
