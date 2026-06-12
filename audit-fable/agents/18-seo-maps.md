# Audit 18 — seo-maps (agent)

**Lens:** geo-grid rank, GBP (Google Business Profile), competitor mapping
**Target:** DMD Furnishing — B2B hospitality FF&E manufacturer · 56 Leonard St Unit 5, Foxboro, MA 02035 · +1 (617) 223-7781 · https://dmdfurnishing.com (source root `C:\Users\chin\dmdfurnishingwebsite-fable`, live dev `http://localhost:3006`)
**Date:** 2026-06-10
**Status:** partial (API needed)

---

## What this lens audits

Local/Maps visibility — how DMD shows up when someone near Foxboro searches "hospitality furniture manufacturer near me" on Google Maps. Three jobs:

1. **Geo-grid rank tracking** — drop a grid of pins around the address, query Maps rank for target keywords at each pin, render a heatmap + Share-of-Local-Voice (SoLV) %. **Needs a live Maps SERP API** (DataForSEO / Local Falcon / Places). Not wired here → method + gap checklist only.
2. **GBP audit** — completeness, reviews, posts, Q&A of the live Google Business Profile. **Needs GBP API or manual login.** Not accessible from source → checklist only.
3. **Competitor mapping** — discover furniture makers in a radius, compare rating/review counts. Free tier possible via Overpass/Nominatim; method given below.

What IS checkable now: the on-site map-readiness signals — geo coordinates in schema, the embedded Google Map, NAP consistency, address/phone markup. Those are audited fully below.

---

## Method (on-site readiness checked)

- Grepped `app/` + `lib/` + `components/` for `geo` / `latitude` / `GeoCoordinates` / `areaServed` / `hasMap` / `PostalAddress`.
- Read the real schema source: `lib/metadata.js` (`localBusinessSchema`, `organizationSchema`) — injected globally on every page via `app/layout.js` (lines 107-109).
- Read `app/contact/page.js` + `components/contact/ContactPage.js` for the embedded map and NAP block.
- Verified against live HTML: `curl http://localhost:3006/contact` (200) and `/` (200).

---

## On-site geo/map findings

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🟢 | `GeoCoordinates` in schema | PRESENT. `lib/metadata.js:160-164` — `geo` block with `latitude: 42.0654, longitude: -71.2478` inside `localBusinessSchema`. Renders live (`curl /contact` returns 2× `GeoCoordinates`). | Keep. Spot-verify the pair points exactly at 56 Leonard St (Foxboro centroid ≈ 42.065,-71.248 — looks right; confirm against the GBP-pinned location once claimed). |
| 🟢 | `LocalBusiness` type | PRESENT + strong. `FurnitureStore` + `additionalType: Manufacturer`, with `priceRange`, `openingHoursSpecification` (Mon-Fri 9-18, weekend correctly omitted), `parentOrganization` link, `hasOfferCatalog`. `lib/metadata.js:140-182`. | Keep. Best-practice subtype for a furniture maker. |
| 🟢 | Full `PostalAddress` | PRESENT in BOTH `organizationSchema` (`:123-130`) and `localBusinessSchema` (`:152-159`) — street, locality `Foxboro`, region `MA`, postal `02035`, country `US`. NAP matches snapshot identity. | Keep. NAP is internally consistent. |
| 🟢 | Schema on every page | `localBusinessSchema` injected globally in `app/layout.js` (not just /contact), so Maps entity signal is site-wide. | Keep. |
| 🟢 | Embedded Google Map | PRESENT on /contact. `ContactPage.js:653-661` — lazy iframe (`loading="lazy"`), shimmer placeholder until load, `referrerPolicy` set, descriptive `title`. Live HTML confirms `google.com/maps?q=...output=embed`. | Keep. Clean implementation. |
| 🟢 | Clickable phone | `tel:+16172237781` links present (`ContactPage.js:454, 615`). | Keep. |
| 🟡 | `hasMap` property missing | `localBusinessSchema` has `geo` but no `hasMap` pointing at the live Google Maps place URL. Minor Maps-entity signal left on the table. | Add `hasMap: 'https://www.google.com/maps?q=56+Leonard+St+Unit+5,+Foxboro,+MA+02035'` (or the GBP share URL once claimed) to `localBusinessSchema`. |
| 🟡 | No "Get directions" link on address text | Address renders as plain text in the contact NAP block (`ContactPage.js:607-608`) and in `Footer.js:50-58` (`<address>`, good semantics) — neither links to Maps. Embedded iframe exists but a one-tap directions CTA is missing. | Wrap the address (contact + footer) in `<a href="https://www.google.com/maps/dir/?api=1&destination=56+Leonard+St+Unit+5,+Foxboro,+MA+02035">`. |
| 🟡 | `areaServed` too coarse for local | Schema declares `areaServed: US` / `Country: United States` (`metadata.js:114,120`; `contact/page.js:32`; `services/page.js:330,341`). Correct for a nationwide manufacturer, but no local/regional service-area signal (e.g. New England, Greater Boston) to reinforce the Foxboro local pin. | Optionally add a `GeoCircle` or named `State`/`City` `areaServed` entries alongside `US` to strengthen the local layer without dropping national reach. |
| 🟡 | GBP presence unverifiable from source | `sameAs` lists LinkedIn, Facebook, Instagram (`metadata.js:131-135`) but **no Google Business Profile / Maps place URL**. Can't tell from code whether the profile is claimed. | Claim/verify GBP, then add its `maps.app.goo.gl` or place URL to `sameAs` and to `hasMap`. This is the #1 Maps-ranking lever and lives outside the codebase. |

---

## Geo-grid + competitor mapping — method + gap checklist (API)

**Grid setup (Local Falcon / DataForSEO Maps SERP / Places API):**
- Center: 42.0654, -71.2478 (the schema coords — reuse them so on-site and grid agree).
- Grid: 5×5 or 7×7 pins, ~1.5–2 mi spacing (covers Foxboro + Mansfield + Norton + Wrentham + the Route 1 / I-95 corridor toward Boston).
- For each pin: query Maps rank, record position 1-20 (or "not found"), then compute **SoLV** = % of pins where DMD ranks in top 3.

**Target keywords (mix near-me + city-modified + category):**
- "hospitality furniture manufacturer near me"
- "commercial furniture Foxboro MA"
- "hotel furniture manufacturer Massachusetts"
- "restaurant furniture supplier near me"
- "FF&E manufacturer New England"
- "custom commercial casegoods Boston"

**Competitor set (seed for radius mapping — confirm via API):**
- National FF&E/hospitality makers that also chase MA/New England jobs.
- Regional MA/RI/CT commercial furniture + millwork shops within ~50 mi.
- Discover the live radius set via Overpass (`shop=furniture` + `craft=carpenter`/`office`) around the centroid, or DataForSEO `business_listings_search` by category — then rank by rating × review count.

**Tools needed:** DataForSEO Maps SERP API (`location_coordinate`) OR Local Falcon (turnkey grid + heatmap) for rank; GBP API / My Business Info for profile + reviews + posts; Places API or Overpass+Nominatim (free tier) for competitor discovery.

**Gap checklist (all blocked until an API/login is wired):**
- [ ] Geo-grid SoLV % across the 6 keywords above
- [ ] Heatmap render (pin-by-pin rank)
- [ ] GBP claimed? completeness score (categories, hours, photos, services, description, attributes)
- [ ] Review health — count, avg rating, velocity, owner response rate
- [ ] GBP posts cadence + Q&A gaps
- [ ] Competitor radius count + top 5 by rating/reviews
- [ ] Cross-platform NAP check — Bing Places, Apple Business Connect, OSM listing exist + match
- [ ] Confirm GBP-pinned lat/lng matches schema `geo` (42.0654,-71.2478)

---

## Score (map-readiness X/100)

**On-site map readiness: 78/100** (only the buildable, on-page half — NOT a full Maps Health Score; geo-grid/GBP/reviews are unscored, API-blocked).

| Dimension (on-site only) | Earned | Notes |
|---|---|---|
| GeoCoordinates in schema | 20/20 | Present, live, plausible coords |
| LocalBusiness type + properties | 20/20 | FurnitureStore+Manufacturer, hours, priceRange, catalog |
| NAP consistency (schema + visible) | 18/20 | Consistent; footer address not linked |
| Embedded map / directions UX | 12/20 | Map present + lazy; missing `hasMap` + directions link |
| Local areaServed / GBP signal in code | 8/20 | Only `US`; no GBP URL in `sameAs`/`hasMap` |

Geo-grid (25%), GBP completeness (20%), and review health (20%) of the full rubric are **not scored** — they require the Maps/GBP APIs. Treat 78/100 as "the on-page foundation is strong; the live Maps presence is unmeasured."

---

## Top 3 actions

1. **Claim + verify the Google Business Profile, then wire it back into the site** (`metadata.js`). Add the GBP place URL to `sameAs` and add `hasMap` to `localBusinessSchema`. This is the single biggest Maps-ranking lever and it lives outside the code. (🔴 highest impact, off-site.)
2. **Add a one-tap "Get directions" link** on the contact NAP block (`ContactPage.js:607-608`) and footer address (`Footer.js:50-58`) → `maps/dir/?api=1&destination=...`. Small code change, real local-UX + signal win. (🟡)
3. **Run a geo-grid baseline** (Local Falcon or DataForSEO Maps SERP) on the 6 keywords from the centroid 42.0654,-71.2478 to get a starting SoLV % and competitor radius set. Everything Maps-ranking is currently flying blind without this. (🟡, API needed.)
