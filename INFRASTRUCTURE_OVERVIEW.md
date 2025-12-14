# Infrastructure Overview

This document explains the website’s architecture and build process step by step, with exact file paths and commands.

## Architecture
- Frontend SPA built with React (`react-scripts`).
- Product and project data served from XML under `public/`.
- Static assets (images, icons, manifest) live in `public/`.
- Client-side routing for product/category/project pages.
- Next.js scaffold present for future migration (SSR/SSG support).

## Repo Layout
- Source code: `src/`
  - Components: `src/components/` (e.g., `Products.js`, `ProductDetail.js`, `ProductGallery.js`)
  - Styles: `src/styles/` (e.g., `ProductDetail.css`, `Products.css`)
  - Utilities: `src/utils/catalogPaths.js`
  - Next pages (migration): `src/pages/` (`_app.js`, `_document.js`, `index.js`)
- Data: `public/DMD_Website.xml`, `public/projects.xml`
- Images: `public/Images/...` (e.g., `public/Images/Hotel/Guest Room/Vanities/Vanitie 1.png`)
- SPA redirects: `public/_redirects`
- Optional Node server: `server/index.js`
- Next.js config and plan: `next.config.js`, `package.json.next`, `NEXT_MIGRATION_PLAN.md`

## Local Development
- Install dependencies: `npm install`
- Start dev server: `npm start`
  - Typically serves at `http://localhost:3004/` (configure via `.env` if needed)
  - Example routes:
    - `http://localhost:3004/products/hotel/guest-room/vanities/vanity-1`
    - `http://localhost:3004/products/hotel/guest-room/head-board/queen-head-board`
- Run tests (if used): `npm test`

## Data Model
- XML schema (in `public/DMD_Website.xml`):
  - `furnitureType` → `subcategory` → `product` → `images` and `specifications`.
  - Example product with images: `public/DMD_Website.xml` under `Hotel → Guest Room → Vanities → Vanity 1`.
- Projects: `public/projects.xml` consumed by `src/components/Projects.js` and `ProjectDetail.js`.

## Routing
- Product URLs: `/products/{vertical}/{area}/{subcategory}/{product-slug}`
  - Example: `/products/hotel/guest-room/head-board/queen-head-board`
- Category URLs: `/products/{vertical}/{area}/{subcategory}`
- SPA fallback (Netlify-style): `public/_redirects` contains `/* /index.html 200`

## Rendering Flow
- Client-side router extracts URL params (vertical/area/subcategory/product).
- XML is fetched from `public/` and parsed to locate the requested item.
- Listings rendered by `src/components/Products.js`.
- Product details rendered by `src/components/ProductDetail.js`:
  - Hero image plus thumbnail grid styled in `src/styles/ProductDetail.css`.
  - Specifications table populated from XML `<specifications>`.
- Optional gallery slider: `src/components/ProductGallery.js` with `src/styles/ProductGallery.css`.

## Styling and Assets
- Global styles: `src/index.css`.
- Component styles: `src/styles/*.css`.
- Images referenced in XML with paths like `/Images/...` (served from `public/Images/...`).

## Build and Deployment
- Production build: `npm run build` (outputs to `build/`).
- Static hosting options:
  - Netlify: deploy `build/` and include `public/_redirects` for SPA routing.
  - Any static host that serves `index.html` for unknown routes.
- Optional Node hosting: `server/index.js` if you prefer a custom server.

## Environments and Config
- Environment variables: `.env`, `.env.example` (e.g., `PORT=3004`).
- Next.js config: `next.config.js` (used when migrating to Next.js).

## Observability & Performance
- Image optimization scripts: `scripts/` (e.g., `optimize-living-room-images.js`).
- Consider CDN caching for `public/Images/` in production.

## Next.js Migration Path
- Pages scaffold: `src/pages/` ready for SSR/SSG.
- Use `getStaticProps`/`getStaticPaths` to read XML at build time.
- Scripts and plan: `migrate-to-next.js`, `NEXT_MIGRATION_PLAN.md`, `package.json.next`.

## Quick Commands
- Install: `npm install`
- Develop: `npm start`
- Test: `npm test`
- Build: `npm run build`

