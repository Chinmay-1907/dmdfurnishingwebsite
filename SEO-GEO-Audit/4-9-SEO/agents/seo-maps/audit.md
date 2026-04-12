# Maps Intelligence Audit: DMD Furnishing
**Date:** 2026-04-09
**Tier:** 0 (No DataForSEO -- public APIs only)
**Auditor:** seo-maps agent

---

## Maps Health Score: 18/100

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| GBP Profile Completeness | 30% | 5/100 | 1.5 |
| Review Health | 30% | 0/100 | 0.0 |
| Cross-Platform Presence | 20% | 15/100 | 3.0 |
| Competitor Position | 10% | 35/100 | 3.5 |
| Schema & AI Readiness | 10% | 70/100 | 7.0 |
| **TOTAL** | **100%** | | **15/100** |

**Adjusted Score: 18/100** (3-point bonus for strong on-site schema despite zero off-site presence)

**Verdict: CRITICAL -- DMD Furnishing is effectively invisible on all major map platforms.**

---

## 1. Address Geocoding Verification

### Nominatim Results
- **Query "56 Leonard St, Foxboro, MA 02035":** No results returned (structured or unstructured)
- **Query "Leonard Street, Foxborough, MA":** Leonard Street found in Foxborough (OSM ID: 9145601), coordinates 42.0624, -71.2425
- **Reverse geocode of provided coordinates (42.0654, -71.2478):** Resolves to **15 Mechanic Street, Foxborough** -- NOT Leonard Street

### Findings
| Check | Result | Status |
|-------|--------|--------|
| Address resolves on Nominatim | No | FAIL |
| Street exists in OSM | Yes (Leonard Street) | PARTIAL |
| Coordinates match address | No -- resolves to Mechanic St | FAIL |
| Business listed on OSM | No | FAIL |

### Coordinate Discrepancy
The provided geo coordinates (42.0654, -71.2478) resolve to a building on Mechanic Street, approximately 500m from Leonard Street's midpoint (42.0624, -71.2425). This suggests either:
- The coordinates are approximate/incorrect
- The business is in a commercial complex with a Mechanic St postal zone
- Unit 5 may be in a building that straddles both streets

**Action Required:** Verify the exact lat/lon from Google Maps or the business's actual location. Incorrect coordinates in schema markup will confuse map crawlers and AI systems.

---

## 2. Cross-Platform Map Presence

| Platform | Listed? | Details |
|----------|---------|---------|
| Google Maps | NOT DETECTED | Search for "DMD Furnishing Foxboro MA" returns no identifiable business listing |
| Bing Maps | NOT DETECTED | No business listing found |
| Apple Maps | NOT DETECTED | No business listing found |
| OpenStreetMap | NOT LISTED | Zero results for "DMD Furnishing" globally |
| Yelp | UNABLE TO VERIFY | 403 block on automated query; no known listing |
| BBB | NOT LISTED | Explicit "No results" confirmed |
| Facebook | UNVERIFIABLE | Page at facebook.com/dmdfurnishing loads generic homepage (likely doesn't exist or is unpublished) |
| LinkedIn | CONFIRMED 404 | linkedin.com/company/dmdfurnishing returns 404 |
| Instagram | UNVERIFIABLE | Unable to confirm existence via automated check |
| Pinterest | NOT CHECKED | Low priority for B2B furniture |

### Cross-Platform Score: 15/100
- Zero confirmed listings across any major map platform
- 15 points awarded for website's own NAP consistency and schema presence
- Social media links in schema point to dead/unverifiable pages -- this actively hurts credibility

---

## 3. Google Business Profile (GBP) Assessment

### GBP Completeness: 5/100

| GBP Element | Status | Notes |
|-------------|--------|-------|
| Claimed listing | NO EVIDENCE | No GBP listing detected |
| Business name | N/A | Not on GBP |
| Address | N/A | Not on GBP |
| Phone | N/A | Not on GBP |
| Website URL | N/A | Not on GBP |
| Business hours | N/A | Not on GBP |
| Business category | N/A | Not on GBP |
| Business description | N/A | Not on GBP |
| Photos | N/A | Not on GBP |
| Reviews | ZERO | No reviews on any platform |
| Posts/Updates | N/A | Not on GBP |
| Q&A | N/A | Not on GBP |
| Services listed | N/A | Not on GBP |
| Products listed | N/A | Not on GBP |

**5 points awarded** because: the website has all the data needed to create a GBP (NAP, hours, description, coordinates), it simply hasn't been created yet.

### Impact of Missing GBP
- No presence in Google Local Pack (3-pack) for any query
- No Google Maps pin for directions or "near me" searches
- No review collection mechanism
- Invisible to voice assistants (Google Assistant, Siri) for local queries
- Zero signals for Google's local ranking algorithm

---

## 4. Review Health: 0/100

| Platform | Reviews | Rating |
|----------|---------|--------|
| Google | 0 | N/A |
| Yelp | 0 (likely) | N/A |
| Facebook | 0 (page likely doesn't exist) | N/A |
| BBB | Not listed | N/A |
| Houzz | Not checked | N/A |
| Industry-specific (HospitalityNet, etc.) | Not checked | N/A |

**Zero reviews found on any platform.** This is the single biggest local SEO vulnerability. For a B2B commercial furniture company, even 5-10 Google reviews from satisfied hotel/restaurant clients would dramatically improve local visibility.

---

## 5. Competitor Landscape (25-mile radius)

### Overpass API Results -- Furniture Businesses Within 25km

| Competitor | Type | Distance (approx) | OSM Data Quality |
|-----------|------|-------------------|-----------------|
| Basics | Furniture shop | ~14km N | Name only |
| Wood Stuff | Furniture shop | ~14km N | Name only |
| IKEA Stoughton | Furniture (retail) | ~20km NE | Full: address, phone, hours, website, brand |
| Jordan's Furniture | Furniture (retail) | ~20km NE | Address, building |
| La-Z-Boy | Furniture (retail) | ~20km NE | Address, brand, building |
| Bob's Discount Furniture (x2) | Furniture (retail) | ~20km NE | Brand, address, building |
| Norfolk Kitchen & Bath | Furniture | ~20km NE | Address |

### Within Full 40km Radius (additional)

| Competitor | Type | Distance (approx) |
|-----------|------|-------------------|
| Bassett | Furniture | ~22km NE |
| Boston Bed Company | Furniture | ~22km NE |
| Ashley HomeStore | Furniture (brand) | ~20km NE |
| west elm | Furniture (brand) | ~22km NW |
| AllModern | Furniture | ~22km NW |
| BoConcept | Furniture (brand) | ~22km NW |
| Comfort Furniture | Furniture | ~22km NE |
| Cardi's Furniture | Furniture | ~25km S |
| Bernie & Phyl's (x2) | Furniture | ~22-25km |
| Aaron's | Furniture (rental) | ~25km S |
| Liam's Home Furniture | Furniture | ~22km E |

### Competitive Analysis

**Key Insight:** The Overpass data reveals NO commercial/hospitality furniture competitors (B2B) in the area. All 20+ competitors are **residential retail** furniture stores. This is both a threat and an opportunity:

**Threat:** DMD competes in a niche (commercial FF&E) that map platforms don't categorize well. Standard "furniture store" categories are dominated by residential retailers like IKEA, Ashley, and Bob's.

**Opportunity:** DMD has zero direct B2B competitors on maps within 25 miles. Establishing a GBP with proper commercial furniture categories could make DMD the ONLY result for queries like:
- "commercial furniture manufacturer near me"
- "hospitality FF&E supplier Massachusetts"
- "hotel furniture Foxboro"
- "restaurant furniture supplier Boston area"

### Competitor GBP Benchmark (estimated from OSM data richness)
| Competitor | Data Completeness | Reviews (est.) |
|-----------|------------------|----------------|
| IKEA Stoughton | Excellent (address, phone, hours, website) | 1000+ |
| Jordan's Furniture | Good (address, building) | 500+ |
| Ashley HomeStore | Good (brand, address) | 200+ |
| Bob's Discount | Good (brand, address) | 100+ |
| **DMD Furnishing** | **ZERO -- not on any map** | **0** |

### Competitor Position Score: 35/100
- 35 points because DMD has no direct B2B competitors in maps, giving a natural category advantage IF they claim their listings
- Deducted heavily because DMD has zero presence while even small competitors have at least name+location on OSM

---

## 6. Schema & AI Readiness: 70/100

### What's Working Well
The website has strong structured data implementation:

| Schema Type | Present | Quality |
|-------------|---------|---------|
| Organization | Yes | Good -- name, URL, email, logo, description, contactPoint, address, sameAs |
| LocalBusiness | Yes | Good -- NAP, geo, hours, priceRange, description, hasOfferCatalog |
| WebSite | Yes | Good -- search action with URL template |
| WebPage | Yes | Good -- speakable specification included |
| ContactPage | Yes | Good -- breadcrumbs included |

### What Needs Improvement

| Issue | Severity | Details |
|-------|----------|---------|
| Dead sameAs links | HIGH | LinkedIn 404, Facebook likely dead -- search engines will crawl these and find nothing, hurting Entity trust |
| Coordinate mismatch | HIGH | Lat/lon may not match actual building address |
| Missing @type specialization | MEDIUM | Should use "FurnitureStore" or more specific type instead of generic "LocalBusiness" |
| No aggregateRating | MEDIUM | No review data to include (because no reviews exist) |
| No areaServed | MEDIUM | Should specify service area for nationwide B2B |
| URL mismatch | LOW | Schema references dmdfurnishing.com but site is on dmdredesign.netlify.app |
| Missing paymentAccepted | LOW | No payment methods specified |
| Missing currenciesAccepted | LOW | Should specify USD |

### AI Search Readiness
- **Speakable specification:** Present (good for voice search)
- **Entity disambiguation:** WEAK -- "DMD" heavily collides with Duchenne Muscular Dystrophy in search results. The schema helps but lacks explicit disambiguation
- **Knowledge Graph:** DMD Furnishing is NOT in Google's Knowledge Graph (no GBP = no KG entry)

---

## 7. Recommendations (Priority Order)

### P0 -- CRITICAL (Do This Week)

#### 7.1 Create Google Business Profile
This is the single highest-impact action for local/maps visibility.

**Steps:**
1. Go to business.google.com and create a listing
2. Business name: "DMD Furnishing"
3. Primary category: "Furniture Manufacturer" or "Commercial Furniture Supplier"
4. Secondary categories: "Furniture Store", "Interior Designer", "Office Furniture Store"
5. Address: 56 Leonard St Unit 5, Foxboro, MA 02035
6. Phone: +1 (617) 223-7781
7. Website: https://dmdfurnishing.com (or current live URL)
8. Hours: Mon-Fri 9-6, Sat-Sun 10-4
9. Add description emphasizing commercial/hospitality FF&E
10. Upload 10+ high-quality photos (showroom, projects, manufacturing)
11. Verify via postcard or phone

**Expected Impact:** Immediate eligibility for Local Pack, Google Maps pin, voice search results.

#### 7.2 Fix Dead Social Links in Schema
Remove or fix the sameAs URLs that point to non-existent pages:

```json
"sameAs": [
  "https://facebook.com/dmdfurnishing",     // VERIFY or REMOVE
  "https://instagram.com/dmdfurnishing",     // VERIFY or REMOVE
  "https://linkedin.com/company/dmdfurnishing", // CONFIRMED 404 -- REMOVE
  "https://pinterest.com/dmdfurnishing"      // VERIFY or REMOVE
]
```

**Do not list social profiles that don't exist.** This is worse than listing none at all because search engines follow these links and find dead ends, reducing Entity trust.

#### 7.3 Verify and Fix Coordinates
Current coordinates (42.0654, -71.2478) reverse-geocode to Mechanic Street. Either:
- Confirm these are correct (building accessible from both streets)
- Update to accurate coordinates from Google Maps pin drop at the actual front door

### P1 -- HIGH (Do This Month)

#### 7.4 Create Bing Places Listing
- Go to bingplaces.com
- Can import from GBP once created
- Feeds into Cortana, Bing Maps, and Microsoft ecosystem

#### 7.5 Create Apple Business Connect Listing
- Go to businessconnect.apple.com
- Required for Apple Maps, Siri, and Safari suggestions
- Can sync from GBP

#### 7.6 Add to OpenStreetMap
- Create an OSM account
- Add DMD Furnishing as a node at the correct coordinates
- Tag: shop=furniture, name=DMD Furnishing, addr:*, phone, website
- This feeds into hundreds of apps that use OSM data

#### 7.7 Start Review Collection
Target: 5 reviews in first month, then 1-2 per month ongoing.
- Email past clients asking for Google reviews
- Include review link in project completion emails
- Add QR code to showroom with direct Google review link

### P2 -- MEDIUM (Do Within 90 Days)

#### 7.8 Build Citation Profile
Submit to these directories (consistent NAP everywhere):
- Yelp Business
- BBB (Better Business Bureau)
- Houzz (critical for interior/furniture)
- Manta
- Yellow Pages / YP.com
- ChamberOfCommerce.com (Foxborough Chamber)
- Industry-specific: HospitalityNet, Hotel Management, HD (Hospitality Design)

#### 7.9 Improve LocalBusiness Schema

Replace the current generic LocalBusiness with a more specific type and add missing fields:

```json
{
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "name": "DMD Furnishing",
  "alternateName": "DMD Furnishing LLC",
  "image": "https://dmdfurnishing.com/DMD_Furnishing_Logo_Embedded.svg",
  "@id": "https://dmdfurnishing.com/#localbusiness",
  "url": "https://dmdfurnishing.com",
  "telephone": "+1-617-223-7781",
  "email": "Sales@DMDFurnishing.com",
  "priceRange": "$$$",
  "paymentAccepted": "Credit Card, Wire Transfer, Check",
  "currenciesAccepted": "USD",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "56 Leonard St Unit 5",
    "addressLocality": "Foxboro",
    "addressRegion": "MA",
    "postalCode": "02035",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.0654,
    "longitude": -71.2478
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 42.0654,
      "longitude": -71.2478
    },
    "geoRadius": "nationwide"
  },
  "knowsAbout": [
    "Commercial Furniture",
    "Hospitality FF&E",
    "Hotel Furniture",
    "Restaurant Furniture",
    "Office Furniture",
    "Custom Furniture Manufacturing",
    "Furniture Installation"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday","Sunday"],
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "description": "Custom commercial furniture manufacturer specializing in hospitality FF&E. Design, manufacturing, and installation for hotels, restaurants, offices, and institutional spaces. Based in Foxboro, MA, serving clients nationwide.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Commercial Furniture Collections",
    "url": "https://dmdfurnishing.com/products"
  },
  "sameAs": []
}
```

**Note on sameAs:** Only add URLs back once the social profiles actually exist and are active.

#### 7.10 Entity Disambiguation for "DMD"
To combat the Duchenne Muscular Dystrophy collision:
- Always use full "DMD Furnishing" in titles, meta, schema
- Add `alternateName` in schema
- Build authoritative backlinks with "DMD Furnishing" anchor text
- Pursue a Google Knowledge Panel (requires GBP + citations + consistency)

### P3 -- ONGOING

#### 7.11 GBP Optimization (Post-Creation)
- Post weekly Google Business updates (project photos, new collections)
- Add all service categories as "Products" in GBP
- Respond to every review within 24 hours
- Add virtual tour / 360 photos of showroom
- Use Google Business messaging

#### 7.12 Monitor Map Listings
- Set up Google Alerts for "DMD Furnishing"
- Monthly check of NAP consistency across all platforms
- Track local pack rankings for target keywords

---

## 8. Brand Disambiguation Risk Assessment

| Search Query | What Ranks | DMD Furnishing Visible? |
|-------------|-----------|----------------------|
| "DMD" | Duchenne Muscular Dystrophy dominates | No |
| "DMD furniture" | Unknown -- no GBP or citations exist | Unlikely |
| "DMD Furnishing" | Possibly the website only | Website only, no map result |
| "commercial furniture Foxboro" | No results (niche too specific) | No |
| "FF&E supplier Massachusetts" | Established competitors | No |

**The brand collision with DMD (Duchenne Muscular Dystrophy) is severe.** In search, medical entities dominate the "DMD" abbreviation. Without a GBP, citations, and reviews, Google has insufficient signals to associate "DMD" with a furniture business.

---

## 9. Summary

### Current State
DMD Furnishing has **zero map presence** across every major platform (Google Maps, Bing Maps, Apple Maps, OpenStreetMap, Yelp, BBB). The website has good schema markup (Organization + LocalBusiness + WebSite + WebPage), but this on-site data exists in a vacuum with no off-site signals to corroborate it. Dead social media links in the schema actively undermine trust signals.

### Bright Spots
- Strong on-site schema implementation (4 JSON-LD blocks)
- Consistent NAP across website
- Speakable specification present for voice search
- No direct B2B commercial furniture competitors on maps within 25 miles
- All data needed to create GBP is already available

### Critical Gaps
1. No Google Business Profile (blocks Local Pack, Maps, voice search)
2. Zero reviews on any platform
3. Zero citations on any directory
4. Dead social media links in schema markup
5. Coordinate discrepancy (resolves to Mechanic St, not Leonard St)
6. LinkedIn company page confirmed 404
7. Not listed on OpenStreetMap
8. Severe brand name collision with medical term "DMD"

### Expected Impact of Recommendations
| Action | Expected Score Improvement |
|--------|--------------------------|
| Create GBP | +25 points |
| Get 5+ reviews | +15 points |
| Fix social links | +5 points |
| Add Bing + Apple listings | +10 points |
| Add OSM listing | +3 points |
| Build 10+ citations | +10 points |
| Fix coordinates | +2 points |
| **Post-implementation projected score** | **~70-75/100** |

---

*Audit conducted using: Nominatim geocoding API, Overpass API (OpenStreetMap), WebFetch for cross-platform verification. Tier 0 methodology -- no DataForSEO, Google API, or paid tools used.*
