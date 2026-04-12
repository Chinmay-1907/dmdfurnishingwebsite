# Google Data Audit -- Raw Data Tables
**Skill:** seo-google | **Date:** 2026-04-09 | **Status:** COMPLETE
**Tool:** Lighthouse 13.0.1 via pagespeed.web.dev | **CrUX:** No field data available

---

## Homepage Scores

| Category | Mobile | Desktop |
|----------|--------|---------|
| Performance | 72 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |

## Core Web Vitals -- Homepage Lab Data

| Metric | Mobile | Desktop | Good Threshold |
|--------|--------|---------|----------------|
| LCP | 11.0s | 0.5s | <=2.5s |
| TBT (INP proxy) | 50ms | 10ms | <=200ms |
| CLS | 0 | 0.003 | <=0.1 |
| FCP | 1.2s | 0.3s | <=1.8s |
| SI | 4.4s | 0.8s | <=3.4s |

## All Pages -- Mobile Performance

| Page | Perf | A11y | BP | SEO | LCP | FCP | TBT | CLS | SI |
|------|------|------|----|-----|-----|-----|-----|-----|-----|
| `/` | 72 | 100 | 96 | 100 | 11.0s | 1.2s | 50ms | 0 | 4.4s |
| `/products` | 69 | 95 | 100 | 100 | 10.5s | 1.6s | 50ms | 0 | 6.1s |
| `/blog` | 99 | 95 | 100 | 100 | 2.0s | 0.9s | 10ms | 0 | 1.7s |
| `/contact` | 73 | 98 | 100 | 100 | 12.0s | 1.2s | 50ms | 0 | 4.0s |
| `/services` | 73 | 100 | 100 | 100 | 10.0s | 1.2s | 40ms | 0 | 4.0s |

## LCP Breakdown -- Homepage Mobile

| Subpart | Duration |
|---------|----------|
| Time to First Byte | 0ms |
| Element Render Delay | 2,290ms |
| **LCP Element** | `<h1>` "Designed. Manufactured. Delivered." |

## Render-Blocking Resources -- Homepage Mobile

| Resource | Size | Block Duration |
|----------|------|----------------|
| `cd450...eae.css` | 4.4 KiB | 450ms |
| `098e84a8b419a0c7.css` | 6.5 KiB | 150ms |
| **Total** | **11.0 KiB** | **600ms** |

## Image Optimization Opportunities

| Page | Est. Savings | Key Images |
|------|-------------|------------|
| `/` | 309 KiB | Quality Inn (48.2 KiB), Hero Elevated_Restaurant (41.6 KiB), Towne Lyne Motel (36.7 KiB), Hero Outdoor (36.7 KiB), Healthcare (34.3 KiB), Restaurants (32.9 KiB) |
| `/contact` | 274 KiB | Not itemized |
| `/services` | 53 KiB | Not itemized |

## Legacy JS Polyfills -- All Pages

| Chunk | Wasted | Polyfills |
|-------|--------|-----------|
| `1255-e20022f908dd06d9.js` | 10.8 KiB | Array.at, Array.flat, Array.flatMap, Object.fromEntries, Object.hasOwn, String.trimStart, String.trimEnd |

## Long Main-Thread Tasks

| Page | Count | Longest Task |
|------|-------|-------------|
| `/` | 2 | 91ms (at 9,171ms mark) |
| `/products` | 4 | Not itemized |
| `/blog` | 2 | Not itemized |
| `/contact` | 2 | Not itemized |
| `/services` | 2 | Not itemized |

## DOM Statistics -- Homepage

| Stat | Value |
|------|-------|
| Total elements | 370 |
| DOM depth | 11 |
| Most children | 33 (body.dark-mode) |

## Best Practices Issues

| Issue | Pages Affected |
|-------|---------------|
| Images with incorrect aspect ratio | Homepage (mobile + desktop) |
| No CSP against XSS | All |
| No COOP for origin isolation | All |
| No Trusted Types | All |

## Accessibility Issues

| Issue | Pages | Score Impact |
|-------|-------|-------------|
| Insufficient contrast ratio | `/products` | 95 |
| Links rely on color only | `/blog` | 95 |
| Missing main landmark | `/blog`, `/contact` | Minor |
| Non-sequential headings | `/products` | Minor |
| ARIA role misuse | `/contact` | Minor |

## CrUX / Field Data

| Source | Status |
|--------|--------|
| CrUX via PSI (dmdredesign.netlify.app) | No Data |
| CrUX via PSI (dmdfurnishing.com) | No Data |
| CrUX API (dmdredesign.netlify.app) | 403 -- API key required |
| CrUX API (dmdfurnishing.com) | 403 -- API key required |
| Google Search Console | Not accessible |
| Google Analytics | Not accessible |
