# Audit 17 — seo-local (agent)

**Lens:** local SEO, NAP consistency, LocalBusiness schema, GBP / citations / reviews
**Target:** DMD Furnishing — B2B commercial/hospitality FF&E manufacturer (lead-gen, not ecommerce). HQ = 56 Leonard St Unit 5, Foxboro, MA 02035 · +1 (617) 223-7781 · sales@dmdfurnishing.com
**Date:** 2026-06-10
**Status:** partial (Google Business Profile API not wired — GBP / citations / reviews portions are method + gap checklist only)

## What this lens audits

Local search signals that the SITE controls: name/address/phone (NAP) matching everywhere (footer, contact page, schema, llms.txt), LocalBusiness/FurnitureStore structured data (address, geo, opening hours, area served), local landing content (Foxboro/MA/New England signals), and the embedded map. Off-site signals — Google Business Profile, directory citations (Yelp/BBB), and reviews — need the GBP/Maps API, which is not connected; those are documented as a method + checklist gap, not scored as live data.

**Business type detected:** Hybrid. Visible street address + Google Maps embed + directions context ("30 miles south of Boston") = brick-and-mortar showroom/shop, but national service area ("installed nationwide", `areaServed: US`) = service-area overlay. Showroom is by appointment.
**Vertical:** Manufacturer / FurnitureStore (B2B contract furniture). Correctly NOT modeled as a retail store with prices — no cart, `priceRange: $$$` only.

## Method

1. Grepped source for phone (`617-223-7781`), street (`Leonard St`), city/zip (`Foxboro`, `02035`) across all non-`node_modules` files — mapped every NAP surface (footer, header, 7+ page CTAs, contact page, schema, 3× llms.txt).
2. Read `lib/metadata.js` (Organization + FurnitureStore schema source) and `app/layout.js` (confirms both schemas render site-wide on every page).
3. Read `components/contact/ContactPage.js` (visible NAP, hours, map embed) and `app/contact/page.js` (page-level ContactPage schema graph).
4. Pulled live SSR HTML from `http://localhost:3006/` and `/contact` via curl; confirmed the FurnitureStore block, geo, and opening hours render as shipped.
5. Verified geo accuracy independently: reverse-geocoded the schema coordinates and forward-geocoded the real address via OpenStreetMap Nominatim.

## NAP consistency check

| Location (source) | Name | Address | Phone | Match? |
|---|---|---|---|---|
| Footer (`components/Footer.js`, all pages) | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | +1 (617) 223-7781 | ✅ |
| Header nav (`components/Header.js`) | DMD Furnishing | (no address — by design) | +1 (617) 223-7781 | ✅ phone only |
| Contact page visible (`ContactPage.js`) | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | +1 (617) 223-7781 | ✅ |
| Page CTAs (about/services/projects/inspirations/home, 7 files) | — | — | tel:+16172237781 → +1 (617) 223-7781 | ✅ |
| Organization schema (`metadata.js`) | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA, 02035, US | +1-617-223-7781 | ✅ |
| FurnitureStore/LocalBusiness schema (`metadata.js`, live on every page) | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA, 02035, US | +1-617-223-7781 | ✅ |
| `public/llms.txt` + `llms-full.txt` + `.well-known/llms.txt` | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | +1 (617) 223-7781 | ✅ |
| Author page (`app/author/...`) | DMD Furnishing | 56 Leonard St Unit 5, Foxboro MA 02035 | — | ✅ |
| Website policies page | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | — | ✅ |

**Verdict: NAP is clean.** Name, street, city, region, zip identical everywhere. Email lowercase `sales@dmdfurnishing.com` consistent across all 12 live occurrences on /contact (prior audits noted a `Sales@DMDFurnishing.com` casing drift — that is now fixed). Phone shows two formats — display `+1 (617) 223-7781` (parentheses) vs schema `+1-617-223-7781` (dashes). Both are valid E.164-ish; not a real discrepancy, but a single canonical format is cleaner.

## Findings

| Severity | Page / Item | Issue | Fix |
|---|---|---|---|
| 🔴 | `lib/metadata.js:160-164` (FurnitureStore `geo`) | Geo coordinates `42.0654, -71.2478` are WRONG. Reverse-geocode resolves to **15 Mechanic Street**, ~0.9 km from the real address. Correct coords for 56 Leonard St = **42.0582, -71.2421**. Wrong geo undercuts the #1 local factor (proximity) and can mis-pin the business on map surfaces. Flagged in a prior audit and still live. | Replace with `latitude: 42.0582, longitude: -71.2421` (verify to 5 decimals against the actual building before shipping). |
| 🟠 | `components/contact/ContactPage.js:629` vs `metadata.js:167-173` | Hours mismatch. Visible contact page lists "Sat - Sun: 10:00 AM - 4:00 PM" but schema `openingHoursSpecification` is Mon-Fri only (a deliberate code comment says weekend hours were a "false claim"). The visible text still contradicts the schema and the appointment-only reality. | Remove the Sat-Sun line from the visible card so it matches the schema (Mon-Fri 9-6, by appointment), or add a matching weekend spec to schema — pick one truth. |
| 🟠 | `lib/metadata.js:140-182` (FurnitureStore) | `areaServed` is present on Organization schema but MISSING on the LocalBusiness/FurnitureStore block — the one that actually carries the local-pack signal. For a nationwide-serving SAB hybrid this should be declared on the local entity too. | Add `areaServed: { '@type': 'Country', name: 'United States' }` to `localBusinessSchema`. |
| 🟡 | Phone format | Display uses `(617) 223-7781`, schema uses `617-223-7781`. Harmless but inconsistent. | Standardize on one format across display and schema (E.164 `+16172237781` for tel:, one display style). |
| 🟡 | No `LocalBusiness`-specific landing/location page | All local signals live on `/contact` + global footer. No dedicated "Foxboro MA furniture manufacturer" location/landing page that could rank for `furniture manufacturer Foxboro MA` (prior audit noted this as low-competition opportunity). Single location, so impact is modest. | Optional: enrich `/contact` or `/about` with a short "Our Foxboro shop" section (local landmarks, service radius, drive context) — partly already present. |
| 🟢 | Map embed (`ContactPage.js:653-662`) | Google Maps `?q=...&output=embed` iframe present, lazy-loaded with skeleton, descriptive `title`, points at the correct text address. Good. | None. |
| 🟢 | LocalBusiness schema completeness | `FurnitureStore` + `additionalType: Manufacturer`, full PostalAddress, telephone, email, priceRange, openingHours, `@id`, `parentOrganization` link to Organization, hasOfferCatalog. Renders site-wide via `app/layout.js`. Strong base — only geo + areaServed need fixing. | None beyond findings above. |
| 🟢 | `sameAs` profiles | LinkedIn (`/company/dmd-usaa/`), Facebook, Instagram in Organization schema — gives Google entity-confirmation anchors. | None. |

## GBP / citations / reviews — method + gap checklist (API needed)

These are OFF-SITE and cannot be verified from the codebase. The Google Business Profile / Maps API is not wired, so this section is a method + gap list, not a finding.

**Method when API is available:**
- GBP: Google Business Profile API (`accounts.locations`) or Places API `place/details` — pull primary category, NAP, hours, photo count, post recency, and whether the listing is claimed/verified.
- Citations: `site:` searches or a citation tool (BrightLocal/Whitespark/Moz Local) against Tier-1 directories — confirm NAP on each matches the site exactly.
- Reviews: Places API `reviews` array — rating, review count, last-review date (the 18-day velocity rule), and owner response rate.

**Gap checklist (verify off-site, all currently UNKNOWN):**
- [ ] GBP listing exists, is claimed, and is verified for 56 Leonard St, Foxboro MA.
- [ ] GBP **primary category** is correct (e.g. "Furniture manufacturer" / "Furniture store") — this is the #1 local ranking factor; a wrong category is the #1 negative factor.
- [ ] GBP NAP byte-for-byte matches the site (name "DMD Furnishing", suite "Unit 5", phone, hours Mon-Fri 9-6 by appointment).
- [ ] GBP hours match the corrected schema (Mon-Fri only) — don't repeat the Sat-Sun discrepancy on GBP.
- [ ] GBP photos uploaded (shop floor, finished installs, exterior).
- [ ] Review count + average rating; any review in the last 18 days (velocity).
- [ ] Owner responses to reviews.
- [ ] Tier-1 citations live + NAP-consistent: Yelp, BBB, Bing Places, Apple Business Connect.
- [ ] Industry/local citations: Foxborough/Foxboro Chamber of Commerce, MA manufacturing directories, hospitality/FF&E trade directories.
- [ ] No duplicate or stale GBP listings under old names/addresses.

## Score (on-site local: 78/100)

Scored only what the site controls (off-site GBP/reviews/citations excluded — unknown). Weighted to the lens dimensions that are on-site checkable:

| Dimension | On-site result | Weighted |
|---|---|---|
| Local schema markup | Strong (FurnitureStore site-wide, full NAP, hours, sameAs) — geo wrong, areaServed missing on local entity | 80/100 |
| NAP consistency | Excellent — identical everywhere, email casing fixed | 95/100 |
| Local on-page (Foxboro/MA signals, map) | Good — address, map, "30 mi south of Boston", appointment context; no dedicated location page | 75/100 |
| Geo accuracy | Fail — points to wrong street (~0.9 km off) | 30/100 |
| Hours truthfulness | Visible vs schema mismatch (weekend) | 55/100 |

On-site local foundation is solid; two concrete bugs (wrong geo, weekend-hours mismatch) and one missing property (areaServed on the local entity) are what hold it back. GBP/citations/reviews un-scored pending API.

## Top 3 actions

1. 🔴 **Fix the geo coordinates.** Change `lib/metadata.js` geo to `42.0582, -71.2421` (56 Leonard St) — the current `42.0654, -71.2478` is 15 Mechanic Street. Verify the building pin to 5 decimals before shipping.
2. 🟠 **Resolve the hours contradiction.** Delete the "Sat - Sun: 10:00 AM - 4:00 PM" line on the contact page so visible hours match the Mon-Fri schema (and reality), or add a weekend spec to schema — one source of truth, and mirror it on GBP.
3. 🟠 **Add `areaServed` to the FurnitureStore/LocalBusiness schema** (`United States`), then run the GBP gap checklist above once the Google Business Profile API is connected — primary category and review velocity are the highest-leverage off-site moves.
