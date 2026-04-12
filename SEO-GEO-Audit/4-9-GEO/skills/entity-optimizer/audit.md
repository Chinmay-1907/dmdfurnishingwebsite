# Entity Optimizer Audit -- DMD Furnishing

**Site:** https://dmdredesign.netlify.app (production: https://dmdfurnishing.com)
**Date:** 2026-04-09
**Skill:** entity-optimizer
**Focus:** Entity graph strength for AI search platform discoverability (GEO)

---

## 1. Entity Recognition Assessment

### Primary Entity: DMD Furnishing

| Signal | Present | Quality | Notes |
|--------|---------|---------|-------|
| Organization schema | YES | GOOD | Has name, URL, email, logo, contact, address |
| LocalBusiness schema | YES | FAIR | Generic type (should be FurnitureStore) |
| WebSite schema | YES | FAIR | Missing `publisher` reference |
| sameAs (social profiles) | YES (4 URLs) | POOR | 0 of 4 confirmed working; LinkedIn 404 |
| sameAs (knowledge graph) | NO | MISSING | No Wikipedia, Wikidata, or Google KG |
| knowsAbout | NO | MISSING | No explicit topic expertise declared |
| foundingDate | NO | MISSING | Cannot be fabricated; add when verifiable |
| numberOfEmployees | NO | MISSING | Cannot be fabricated; add when verifiable |
| areaServed (top-level) | NO | MISSING | Only on ContactPoint, not Organization |
| Industry codes (NAICS/ISIC) | NO | MISSING | Would help AI categorization |

### Entity Graph Connectivity: 1 / 5 (WEAK)

The entity has internal schema structure but almost zero external graph connections. AI platforms cannot validate this entity against any authoritative third-party source.

---

## 2. Entity Graph Map

```
                        [MISSING]                    [MISSING]
                      Wikipedia -----.          .---- Wikidata
                                      \        /
                    [404]              v       v
                  LinkedIn ---X   DMD Furnishing (Organization)
                                  |     |     |
                    [PHANTOM?]    |     |     |
                  Facebook ---?   |     |     |
                                  |     |     |
                    [PHANTOM?]    |     |     |
                  Instagram ---?  |     |     |
                                  |     |     |
                    [PHANTOM?]    |     |     |
                  Pinterest ---?  |     |     |
                                  |     |     |
                    [MISSING]     |     |     |
                  YouTube --------'     |     |
                                        |     |
                              LocalBusiness   WebSite
                              (DISCONNECTED)  (no publisher ref)
                                  |
                              [GENERIC TYPE]
                              Should be: FurnitureStore
```

**Target state:** At least 3 confirmed social profiles + 1 knowledge graph anchor (Wikipedia or Wikidata) + connected internal schemas.

---

## 3. sameAs Strategy (Highest Priority for GEO)

### Current State: 0 working links

All 4 sameAs URLs are either broken (LinkedIn 404) or unverifiable (Facebook, Instagram, Pinterest load generic shells with no profile data).

### Target State: 5-7 verified links

| Platform | Priority | Action Required | GEO Value |
|----------|----------|-----------------|-----------|
| LinkedIn | P0 | Create company page at linkedin.com/company/dmd-furnishing (or similar); populate with logo, description, employees | HIGH -- most referenced by AI for B2B entities |
| Instagram | P1 | Create @dmdfurnishing profile; post project photos, behind-the-scenes | MEDIUM -- visual proof of real business |
| YouTube | P1 | Create @dmdfurnishing channel; upload project walkthroughs, material comparisons | HIGH -- video content strongly boosts entity confidence |
| Facebook | P2 | Create business page if needed; lower priority for B2B | LOW-MEDIUM |
| Pinterest | P2 | Create if visual content strategy warrants it | LOW |
| Wikidata | P1 | Create entity with basic facts (name, location, industry, URL) | VERY HIGH -- direct knowledge graph entry |
| Wikipedia | P2 | Create article when notability criteria met (press coverage, awards) | VERY HIGH -- ultimate entity validation |

### sameAs Implementation Rules

1. **Never include a URL you cannot visit and confirm shows your business**
2. **Use canonical URL format** (e.g., `https://www.linkedin.com/company/slug/` not `https://linkedin.com/company/slug`)
3. **Populate profiles first** -- an empty profile is worse than no profile
4. **Add to schema only after** the profile has logo, description, and at least one post
5. **Test every URL** with a curl/fetch before deploying

---

## 4. knowsAbout Strategy

The `knowsAbout` property on Organization explicitly tells AI platforms what topics this entity has expertise in. This directly influences whether AI platforms cite DMD Furnishing when answering questions about these topics.

### Recommended knowsAbout Array

```json
"knowsAbout": [
  "commercial furniture manufacturing",
  "hospitality FF&E",
  "hotel guestroom furniture",
  "restaurant seating",
  "custom casegoods",
  "value engineering",
  "FF&E procurement",
  "furniture installation",
  "HPL laminate surfaces",
  "wood veneer casegoods",
  "hotel renovation",
  "commercial upholstery"
]
```

Each entry should correspond to content that actually exists on the site (blog articles, product pages, service descriptions). Do not add topics the site does not substantively cover.

---

## 5. Author Entity Strategy

### Current Problem

All 6 blog articles use `@type: Organization` for the `author` field. This is technically valid but suboptimal for GEO because:

- Google's Article schema guidelines prefer Person for authorship
- AI platforms build E-E-A-T entity graphs around Person entities, not organizations
- A Person author with `worksFor` linking back to the Organization creates a richer entity network

### Recommended Approach

**Option A (Ideal):** Use a real person's name who writes or reviews the content.

```json
"author": {
  "@type": "Person",
  "name": "Chinmay Patil",
  "jobTitle": "Founder",
  "url": "https://dmdfurnishing.com/about",
  "worksFor": { "@id": "https://dmdfurnishing.com/#organization" }
}
```

**Option B (Fallback):** Use a named editorial identity.

```json
"author": {
  "@type": "Person",
  "name": "DMD Furnishing Editorial",
  "url": "https://dmdfurnishing.com/about",
  "worksFor": { "@id": "https://dmdfurnishing.com/#organization" }
}
```

Option A creates stronger entity signals. Option B is better than the current Organization approach.

---

## 6. Schema Type Optimization

### LocalBusiness -> FurnitureStore

`FurnitureStore` is a valid schema.org subtype of `Store` > `LocalBusiness`. It provides:
- More precise industry categorization for AI platforms
- Better matching for furniture-related queries
- Alignment with Google's recognized business types

Change in `lib/metadata.js` line 105:
```javascript
// FROM:
'@type': 'LocalBusiness',
// TO:
'@type': 'FurnitureStore',
```

### Organization-LocalBusiness Connection

Add `parentOrganization` to LocalBusiness:
```javascript
parentOrganization: { '@id': `${siteUrl}/#organization` },
```

This creates a semantic link telling AI platforms that the physical store location belongs to the larger organization entity.

---

## 7. Entity Confidence Score Projection

| Action | Current Score Impact | Projected Score After |
|--------|---------------------|----------------------|
| Fix/remove broken sameAs | 56 -> 56 (removes penalty) | 56 |
| Change to FurnitureStore | +6 | 62 |
| Add knowsAbout | +3 | 65 |
| Add publisher to WebSite | +1 | 66 |
| Fix blog author to Person | +5 | 71 |
| Remove HowTo from /services | +3 | 74 |
| Add homepage FAQPage | +1 | 75 |
| Connect Org <-> LocalBusiness | +2 | 77 |
| Create + add 3 real social profiles | +7 | 84 |
| Create Wikidata entity | +5 | 89 |
| Add speakable to blog articles | +2 | 91 |
| Create Wikipedia article | +5 | 96 |

**Realistic target this sprint (P0 + P1): 77 / 100**
**Realistic target next sprint (+ P2): 91 / 100**

---

## 8. Implementation Checklist

### Phase 1: Fix What's Broken (P0)

- [ ] Remove all 4 current sameAs URLs from `lib/metadata.js` Organization schema
- [ ] Remove all 4 current sameAs URLs from `lib/metadata.js` LocalBusiness schema
- [ ] Change `@type: 'LocalBusiness'` to `@type: 'FurnitureStore'` in `lib/metadata.js`
- [ ] Remove HowTo block from `app/services/page.js` serviceSchema

### Phase 2: Strengthen Entity (P1)

- [ ] Add `knowsAbout` array to Organization schema
- [ ] Add `areaServed` to Organization schema (top-level)
- [ ] Add `parentOrganization` to LocalBusiness schema
- [ ] Add `publisher` to WebSite schema
- [ ] Change author `@type` from Organization to Person in all 6 blog articles
- [ ] Add FAQPage schema to homepage (`app/page.js`)
- [ ] Create LinkedIn company page, populate, add to sameAs
- [ ] Create Instagram profile, populate, add to sameAs
- [ ] Create YouTube channel, upload 1+ video, add to sameAs
- [ ] Create Wikidata entity for DMD Furnishing

### Phase 3: Advanced Entity Graph (P2)

- [ ] Add `speakable` to blog article schemas
- [ ] Add `foundingDate` to Organization (when verifiable)
- [ ] Add `numberOfEmployees` to Organization (when verifiable)
- [ ] Update `dateModified` on blog articles when revised
- [ ] Pursue Wikipedia article creation (after establishing notability)
- [ ] Add industry codes (NAICS: 337127 for institutional furniture)
- [ ] Add `memberOf` for any industry associations

---

## 9. Files to Modify

| File | Changes |
|------|---------|
| `lib/metadata.js` | Replace organizationSchema, localBusinessSchema, websiteSchema |
| `app/services/page.js` | Remove HowTo from serviceSchema @graph array |
| `app/page.js` | Add FAQPage schema + `<JsonLd>` component |
| `app/blog/what-is-ffe-hospitality/page.js` | author @type -> Person |
| `app/blog/hotel-guestroom-furniture-checklist/page.js` | author @type -> Person |
| `app/blog/hpl-veneer-solid-wood-hotel-casegoods/page.js` | author @type -> Person |
| `app/blog/value-engineering-commercial-furniture/page.js` | author @type -> Person |
| `app/blog/restaurant-seating-guide/page.js` | author @type -> Person |
| `app/blog/ffe-procurement-timeline/page.js` | author @type -> Person |
