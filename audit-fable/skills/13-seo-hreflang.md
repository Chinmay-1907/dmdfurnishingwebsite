# Skill Audit 13 — seo-hreflang

**Skill purpose:** Validate / generate hreflang (multi-language, multi-region) tags. Catch self-ref, return-tag, x-default, code, canonical-alignment, and protocol errors. Skill at `C:\Users\chin\.claude\teams\seo\skills\seo-hreflang\SKILL.md`.

**Target:** DMD Furnishing — B2B hospitality FF&E manufacturer. Source `C:\Users\chin\dmdfurnishingwebsite-fable` (branch `fable-dmd`). Live dev `http://localhost:3006`. Prod `https://dmdfurnishing.com`.

**Date:** 2026-06-10

**Status:** Complete — verified against source + live SSR HTML.

---

## Applicability verdict (is hreflang needed for DMD?)

**No — hreflang is correctly absent and should stay absent.** DMD is a single-locale **en-US** site serving one market (USA). Hreflang is N/A by design, not by oversight.

Evidence for single-locale:
- **No i18n config.** `next.config.js` has no `i18n` block, no locale routing, no `domains`. Only `trailingSlash: false`, images, redirects, headers. (`next.config.js:1-46`)
- **No locale routes.** Glob for `app/{es,fr,de,en,[lang]}/**` → zero files. No `/es`, `/fr`, `[lang]` segments anywhere in App Router.
- **Single language declared everywhere.** `<html lang="en">` (`app/layout.js:87`), `og:locale: 'en_US'` set in root layout (`app/layout.js:52`) and in the page-metadata generator (`lib/metadata.js:59`). Live HTML confirms both on `/`, `/products/hotel`.
- **Geo is US-only and consistent.** Schema `areaServed: { Country: "United States" }`, `availableLanguage: 'en'`, US postal address, single en sitemap. (`lib/metadata.js:114-129`)
- **No hreflang anywhere.** Grep `hreflang|x-default|xhtml` across source + `public/` → zero. Sitemap `DMD_Website.xml` has no `xmlns:xhtml` namespace, no `<xhtml:link>` alternates. Live `<head>` has no `rel="alternate"` link tags.

**Correct call.** Adding hreflang now (single language) would add risk with zero benefit — a lone self-referencing `en-US`/`x-default` pair is noise Google ignores, and a malformed set would actively suppress indexing. The skill's own rule: "No hreflang tags found → report the absence, check other i18n signals" — there are none, so absence is right.

**Future trigger (when hreflang WOULD be needed):** if DMD ever ships Spanish (`/es`, large US Hispanic hospitality buyer base) or a Canada/UK region split. At that point: subdirectory routing (`/es/...`), self-ref `en-US` + `es-US` (or `es`) + `x-default` → en homepage, full return-tag mesh, and since the site is <50 pages, **HTML `<link>` tags** are the right method (not sitemap). The current absolute-canonical pattern already makes that migration clean.

---

## Checklist (hreflang correctness + i18n readiness)

| Check | Result | Evidence |
|---|---|---|
| Site multi-language / multi-region? | 🟢 No (single en-US) | No `i18n` in `next.config.js`; no locale routes (glob empty) |
| `<html lang>` present + correct | 🟢 Pass | `lang="en"` `app/layout.js:87`; live HTML on `/`, `/products/hotel`, blog all show `lang="en"` |
| `og:locale` present + correct | 🟢 Pass (1 gap) | `en_US` in root `app/layout.js:52` + generator `lib/metadata.js:59`; live `/` and `/products/hotel` echo it. Article pages drop it — see Findings F1 |
| Hreflang tags present | 🟢 N/A (correctly absent) | Grep `hreflang` over source + `public/` = 0; no `rel="alternate"` in live head |
| Broken / partial hreflang tags | 🟢 None | Nothing to break — zero tags, so no malformed/orphan sets |
| Invalid language codes (eng, jp, etc.) | 🟢 N/A | No hreflang to validate; `en` / `en_US` used elsewhere are valid ISO 639-1 / locale form |
| Invalid region codes (en-uk, es-LA) | 🟢 N/A | No region tags present |
| Self-referencing canonical present | 🟢 Pass | Generator emits absolute self-canonical `${siteUrl}${path}` `lib/metadata.js:38,72-74`; root `/` canonical in `app/layout.js` metadata |
| Canonical absolute + exact-match | 🟢 Pass | Live: `/` → `https://dmdfurnishing.com`, `/products/hotel` → `…/products/hotel`, blog → `…/blog/what-is-ffe-hospitality`. All absolute, all self |
| Trailing-slash consistency | 🟢 Pass | `trailingSlash: false` (`next.config.js:6`); canonicals have no trailing slash — matches |
| Protocol consistency (all HTTPS) | 🟢 Pass | `metadataBase` + `siteUrl` both `https://`; HSTS header forces HTTPS (`next.config.js:29`) |
| Sitemap hreflang annotations | 🟢 N/A (correctly absent) | `DMD_Website.xml` is plain urlset, no `xmlns:xhtml` — correct for single-locale |
| x-default needed | 🟢 N/A | Only relevant once 2+ locales exist |

---

## Findings

| Severity | Item | Issue | Fix |
|---|---|---|---|
| 🟢 Pass | Hreflang applicability | Single en-US site; hreflang correctly omitted across source, live HTML, and sitemap | No action. Do **not** add hreflang for one locale |
| 🟢 Pass | Self-referencing canonical | Every page tier emits an absolute, self-referencing canonical that exactly matches the live URL (no trailing-slash drift, all HTTPS) | No action — this is the hreflang-ready foundation |
| 🟡 Medium | `og:locale` missing on article pages (F1) | Blog posts (OG `type: article`) render `<html lang="en">` but no `og:locale` meta. Root layout sets `en_US`, but `lib/metadata.js` builds a fresh `openGraph` object per page and never copies `locale` into it, so article pages lose the tag. Cosmetic for one locale; would matter the moment a 2nd locale is added | In `generatePageMetadata`, add `locale: 'en_US'` to the returned `openGraph` object (`lib/metadata.js:53-61`) so every page — not just the homepage — declares its locale |
| 🟢 Minor | Future-expansion readiness (F2) | If Spanish or a region split ships later, the team must remember to wire i18n. Nothing is wrong today | When/if expanding: use subdirectory routing (`/es/…`), HTML `<link rel="alternate">` tags (<50 pages, not sitemap), full return-tag mesh, `x-default` → en homepage. Document this in `lib/metadata.js` as a comment so it isn't missed |

---

## Score (96/100)

Single-locale correctness is near-perfect. Hreflang is rightly absent; canonicals are absolute, self-referencing, HTTPS, and trailing-slash-consistent; `html lang` and `og:locale` are present and valid. Minus 4 for the one real gap: `og:locale` silently dropped on article pages (F1, medium) plus no documented expansion path (F2, minor). Nothing here suppresses indexing — both are hygiene/future-proofing.

---

## Top 3 actions

1. **Do nothing on hreflang.** Confirmed N/A for a single en-US site. Adding it would add risk, not value. (🟢)
2. **Patch `og:locale` to cover article pages.** Add `locale: 'en_US'` to the `openGraph` object in `generatePageMetadata` (`lib/metadata.js:53-61`) so blog/guide pages declare locale like the homepage does. (🟡 medium, ~1-line fix)
3. **Leave an expansion note in `lib/metadata.js`.** One comment: "If a 2nd locale ships → subdirectory routing + HTML `<link rel=alternate>` + return-tag mesh + `x-default`." Cheap insurance so the next dev wires it correctly. (🟢 minor)
