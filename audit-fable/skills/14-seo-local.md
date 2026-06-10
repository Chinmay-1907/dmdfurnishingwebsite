# Skill Audit 14 — seo-local

**Skill purpose:** Local SEO analysis — Google Business Profile (GBP) optimization, NAP consistency, citation health, review signals, LocalBusiness schema, location-page quality, and local-link/authority signals. Detects business type + industry vertical, scores 6 weighted dimensions.

**Target:** DMD Furnishing — B2B commercial/hospitality FF&E manufacturer (lead-gen, not ecommerce). 56 Leonard St Unit 5, Foxboro, MA 02035 · +1 (617) 223-7781 · sales@dmdfurnishing.com. Source: `C:\Users\chin\dmdfurnishingwebsite-fable`. Live: http://localhost:3006.

**Business type:** Hybrid — physical showroom (by appointment) + nationwide service. Industry vertical: Home Services / Manufacturer (no clean skill match → generic LocalBusiness path, correctly run as `FurnitureStore`).

**Date:** 2026-06-10
**Status:** partial (GBP API) — on-site portion full; GBP / citations / reviews need live APIs not wired (method + gap checklist below).

---

## Local checklist applied (table)

| Check | Result | Evidence |
|---|---|---|
| Business type detected | ✅ | Hybrid: showroom address + "nationwide" (12×) + appointment-only. `FurnitureStore` + `additionalType: Manufacturer` schema. No cart/price → lead-gen confirmed. |
| LocalBusiness schema present | ✅ | `FurnitureStore` block live sitewide (home, /contact, /about, /services, /products/hotel all carry it). Source: `lib/metadata.js:140-182`. |
| Correct schema subtype | ✅ | `FurnitureStore` (valid LocalBusiness subtype) + `additionalType: schema.org/Manufacturer`. Appropriate for a furniture maker. |
| Schema: address (PostalAddress) | ✅ | Full PostalAddress, all 5 fields, matches real address. `lib/metadata.js:152-159`. |
| Schema: geo coordinates | ❌ | `42.0654, -71.2478` — **wrong**. Reverse-geocodes to 15 Mechanic St, not 56 Leonard St. 931 m off. `lib/metadata.js:160-164`. (detail below) |
| Schema: opening hours | ✅ | `OpeningHoursSpecification` Mon–Fri 09:00–18:00. Comment notes weekend hours removed to match reality (good — avoids false-claim manual action). |
| Schema: telephone | ✅ | `+1-617-223-7781` in both Organization + FurnitureStore. Matches everywhere. |
| Schema: areaServed | ⚠️ | Present on `Organization` (Country=US) + ContactPoint. **Missing on the `FurnitureStore` block.** No named cities/region for the hybrid SAB side. |
| Schema: priceRange / image / @id | ✅ | `priceRange:"$$$"`, image set, `@id:#localbusiness` with `parentOrganization` link to `#organization`. Clean entity graph. |
| NAP visible in page HTML | ✅ | Home footer: "56 Leonard" visible, Foxboro 26×, `tel:+16172237781`. Contact page: full address + tel + mailto. |
| Click-to-call (`tel:`) link | ✅ | `tel:+16172237781` on home footer and contact page. |
| Embedded map | ✅ | Contact page `<iframe src="google.com/maps?q=56+Leonard+St+Unit+5,+Foxboro,+MA+02035&output=embed">`. Uses the **correct text address** (not the wrong coords) — so the visible map is right. |
| Title/H1 local intent | ⚠️ | Home title "Hospitality Furniture Manufacturer \| Custom FF&E" — service keywords, no city. Meta description ends "Foxboro, MA". Acceptable for nationwide play; city not in title/H1. |
| Local content signals | ⚠️ | "Foxboro" 26×, "Massachusetts" 2×, "MA" 22×, "nationwide" 12×. **"New England" 0×, "Boston" 0×.** Regional terms underused for the local/showroom angle. |
| Dedicated service pages | ✅ | `/services` + 7 product category pages (hotel, restaurant, office, etc.). One-page-per-service largely covered. |
| Local landing pages | ❌ | No `/locations/...` or city/region pages. Single nationwide footprint — no doorway-page risk, but no local-page capture either. |
| llms.txt NAP block | ✅ | `public/llms.txt` Contact block: phone, email, address, LinkedIn all correct + consistent. |
| sameAs profiles | ✅ | LinkedIn + Facebook + Instagram in Organization `sameAs`. Consistent handles. |
| GBP signals on page | ⚠️ | No GBP reviews widget / place-ID / GBP map embed. Map is a plain address query, not a claimed-listing embed. Verify against GBP once API wired. |
| Reviews / aggregateRating | ❌ | No `aggregateRating` in schema, no review count/stars on page. (needs GBP API — see gap checklist) |
| Local authority signals | ❌ | No Chamber of Commerce, BBB badge, or local press mentions detected on page. |

---

## NAP + geo verification

**NAP — consistent across all five sources (✅):**

| Source | Name | Address | Phone |
|---|---|---|---|
| Home footer (live) | DMD Furnishing | 56 Leonard St, Foxboro MA | +1 (617) 223-7781 / tel:+16172237781 |
| Contact page (live) | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | tel:+16172237781 |
| FurnitureStore schema | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | +1-617-223-7781 |
| Organization schema | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | +1-617-223-7781 |
| llms.txt | DMD Furnishing | 56 Leonard St Unit 5, Foxboro, MA 02035 | +1 (617) 223-7781 |

Name, street, phone, email all match. No NAP discrepancies. Only formatting differs (spaces vs dashes in phone) — cosmetic, not a problem.

**Geo coordinate verification — CONFIRMED WRONG (❌, sibling agent flag verified):**

- Schema geo: `42.0654, -71.2478` (`lib/metadata.js:162-163`).
- Reverse-geocode (OpenStreetMap Nominatim) → **"15 Mechanic Street, Foxborough, MA 02035"** — not the real address.
- Forward-geocode of "56 Leonard St, Foxboro MA 02035" → **42.0582, -71.2421**.
- Haversine distance between the two: **931 m (~0.93 km)**. Matches the sibling agent's ~0.9 km flag.
- Root cause: `geo` block hardcoded at `lib/metadata.js:160-164` to a Foxboro-centroid-ish point, never reconciled with the real `address` block right above it (lines 152-159, which IS correct).
- Note: this exact bug was already raised in prior audits (`agents/17-seo-local.md:89`, `agents/18-seo-maps.md`, `skills/05-seo-plan.md:41`) and never fixed. The contact-page map iframe is unaffected (it queries by text address), so only schema/Maps-consumers see the wrong pin.

---

## Findings (table)

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🔴 | Schema geo coordinates | `42.0654, -71.2478` = 15 Mechanic St, 931 m from real address. Misleads Maps/AI that parse schema geo. | Set `lib/metadata.js:162-163` to the verified building pin (~`42.0582, -71.2421`); confirm exact rooftop to 5 decimals before shipping. |
| 🟠 | GBP not verifiable from source | No GBP place-ID / reviews widget / claimed-listing embed on page. Can't confirm claim status, primary category, reviews. | Wire GBP API (or manual check). Confirm GBP pin matches the corrected schema geo. |
| 🟠 | No review signals anywhere | No `aggregateRating` in schema, no review count/stars on site. Reviews ≈ 20% of local pack weight. | Build review-generation cadence (18-day rule); surface count + stars; add `aggregateRating` only when backed by real GBP reviews. |
| 🟡 | `areaServed` missing on FurnitureStore | Hybrid SAB side has no named service regions in the LocalBusiness block. | Add `areaServed` (US + named regions like Massachusetts / New England) to the `FurnitureStore` schema. |
| 🟡 | Thin regional content | "New England" 0×, "Boston" 0×; city not in title/H1. | Add a Foxboro/Greater-Boston/New-England showroom section or local page; weave region into title/H1 where natural. |
| 🟡 | No local authority signals | No Chamber/BBB/local-press mentions on page. | Pursue Foxboro/MA Chamber + BBB; surface badges + any local press. |

---

## GBP / citations / reviews — method + gap checklist (API needed)

**Method (what would be run with access):**
- GBP: Google Business Profile API or manual listing review → primary + secondary categories, claim/verification status, hours, photos, posts, Q&A→FAQ migration.
- Reviews: GBP API or DataForSEO `local_business_data` → count, avg rating, velocity (18-day rule), owner-response rate, multi-platform spread.
- Citations: DataForSEO `business_listings` or `site:` patterns → Yelp, BBB, Facebook, Apple Business Connect, Bing Places, data aggregators (Data Axle, Foursquare, Neustar).
- Local pack position: Local Falcon / DataForSEO Maps SERP geo-grid from the corrected centroid for the 6 target keywords.

**Gap checklist (cannot confirm from source/live HTML — needs API):**
- [ ] GBP claimed + Google-Verified badge status
- [ ] GBP primary category (single biggest local-pack factor) + 4 secondary categories
- [ ] GBP pin lat/lng vs schema geo (must match after the fix)
- [ ] Review count, avg star rating, recency, owner-response rate
- [ ] Citation presence + NAP consistency on Yelp / BBB / Facebook / Apple / Bing
- [ ] Apple Business Connect + Bing Places claimed (Bing powers ChatGPT/Copilot)
- [ ] Data-aggregator submissions (Data Axle, Foursquare, Neustar)
- [ ] Geo-grid Share-of-Local-Voice baseline for target keywords

---

## Score

**On-site local: 72 / 100**

| Dimension | Weight | Score | Note |
|---|---|---|---|
| GBP signals | 25 | 9/25 | No on-page GBP integration; needs API to confirm listing. |
| Reviews & reputation | 20 | 2/20 | No review signals on site at all. |
| Local on-page SEO | 20 | 16/20 | NAP visible, tel link, service pages, map embed; city not in title/H1, thin regional content. |
| NAP consistency & citations | 15 | 11/15 | NAP perfectly consistent (5 sources); citations unverifiable from source. |
| Local schema markup | 10 | 7/10 | Correct subtype + most properties, but **wrong geo** and FurnitureStore missing areaServed. |
| Local link & authority | 10 | 2/10 | No chamber/BBB/press/best-of signals detected. |

Note: GBP, reviews, and citation dimensions are capped low because they're API-gated, not necessarily absent off-site. On-site fundamentals (schema, NAP, service pages, map) are strong; the geo bug and zero on-site review/authority signals are the drags.

---

## Top 3 actions

1. 🔴 **Fix the geo coordinates.** `lib/metadata.js:162-163` → verified building pin (~`42.0582, -71.2421`) at 5 decimals. Current value is 931 m off (points at 15 Mechanic St). Flagged in 3 prior audits, still unfixed.
2. 🟠 **Claim/verify GBP, then surface reviews.** Confirm GBP pin = corrected schema geo, lock primary category, start an 18-day review cadence, and only then add a real `aggregateRating` to schema.
3. 🟡 **Add regional depth + areaServed.** Put `areaServed` (US + Massachusetts/New England) on the FurnitureStore block, and add a Foxboro/Greater-Boston showroom section (currently "New England" and "Boston" appear 0×).
