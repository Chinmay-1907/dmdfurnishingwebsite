# DMD Furnishing Website

The primary runtime is **Next.js App Router** on standard Node.

## Runtime

- Primary dev: `npm run dev`
- Primary build: `npm run build`
- Primary start: `npm run start`
- Primary lint: `npm run lint`

## Architecture

- App Router frontend: `app/`
- Shared Next UI: `components/`
- Server-side data helpers: `lib/`
- Retained stylesheet assets: `src/styles/`
- Product data: `public/DMD_Website.xml`
- Project data: `public/projects.xml`
- Images and static assets: `public/`

## Data model

- Product catalog data is sourced from `public/DMD_Website.xml`.
- Project data is sourced from `public/projects.xml`.
- The Next runtime reads these files server-side through helpers in `lib/`.

## API

The site uses same-origin API endpoints for the consultation flow:

- `/api/request-otp`
- `/api/verify-otp`
- `/api/send-consultation`

Environment variables still use the existing SMTP and reCAPTCHA surface:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `MAIL_TO`
- `OTP_SECRET`
- `RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`
- `RECAPTCHA_MIN_SCORE`

## Notes

- `netlify.toml` still exists for historical compatibility, but it is not the source of truth for the portable Next runtime.
