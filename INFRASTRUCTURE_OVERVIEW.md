# Infrastructure Overview

## Current runtime

The production runtime is **Next.js App Router** running on standard Node.

Primary commands:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Repo layout

- `app/`: App Router route entrypoints and route metadata
- `components/`: shared Next UI and client islands
- `lib/`: server-side data parsing and metadata helpers
- `src/styles/`: retained legacy stylesheet assets still used by migrated routes
- `public/`: XML data, images, static assets, robots, sitemap, `llms.txt`

## Data sources

- Product catalog: `public/DMD_Website.xml`
- Projects: `public/projects.xml`

The Next runtime consumes these through:

- `lib/catalog.js`
- `lib/projects.js`
- `lib/inspirations.js`
- `lib/metadata.js`

## Public route contract

The migration preserves these route families:

- `/`
- `/about`
- `/products`
- nested product URLs
- `/projects`
- `/projects/:projectId`
- `/services`
- `/contact`
- `/schedule-call`
- `/inspirations`
- `/inspirations/:id`
- `/website-policies`
- `404`

## API contract

Same-origin API endpoints are preserved:

- `/api/request-otp`
- `/api/verify-otp`
- `/api/send-consultation`

SMTP and OTP behavior now run through Next route handlers without changing the contract surface.

## Deployment stance

- The target is **platform-neutral portable Next on standard Node**
- No hosting-provider-specific plugin or deploy config is authoritative
- Any remaining provider-specific config is compatibility-only, not the runtime source of truth

## Migration notes

- `package.json` is the primary runtime manifest
- CRA-specific deployment assumptions such as static `build/` output are no longer part of the active operating model
