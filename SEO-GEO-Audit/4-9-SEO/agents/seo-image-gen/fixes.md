# seo-image-gen Fixes Applied — 2026-04-09

## Score: 52/100 -> ~65/100 (estimated after fixes)

### Fixes Implemented

| # | Issue | File | Status | Score Impact |
|---|-------|------|--------|-------------|
| 1 | Hero carousel identical alt text | `app/page.js` | DONE | +3 |
| 2 | SVG logo 20000x18000 intrinsic dimensions | `public/DMD_Furnishing_Logo_Embedded.svg` | DONE | +3 |
| 3 | Product schema price: '0' | `app/products/[...slug]/page.js` | DONE | +2 |

### Remaining
- Blog has ZERO images (6 articles, 0 inline images) — need to create/add
- 5/6 blog posts share same OG image — need unique images per post
- About page primary image missing priority attribute
- Product images have minimal alt text (just product names)
- Schema uses SVG for logo (Google prefers PNG)
- No per-product ImageObject schema
