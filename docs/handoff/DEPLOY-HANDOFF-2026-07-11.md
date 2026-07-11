# CEO Deploy Handoff — DMD Furnishing + ScAnalytic Landing (2026-07-11)

**Rule for this whole doc:** everything is committed **locally only**. Nothing is
pushed, nothing is deployed. You press deploy; I prep. Honesty rule held
throughout — no invented certs, awards, metrics, testimonials, founder bios,
or lead-time promises anywhere in the copy or schema.

---

## 1. One-screen status

| Item | State | Ships how |
|---|---|---|
| DMD — SEO/GEO fix backlog | ✅ done, local commits on `DMD_SEO` | git → Netlify |
| DMD — new **Indoor Walk-In Closets** page | ✅ page + copy + FAQs + schema built into 788-page build | git → Netlify |
| DMD — closet images (30) | 🎨 rendering now (~56 MB PNG, matches XML) | git → Netlify |
| DMD — 930-product image backlog | 🎨 rendering to disk over the week | ⚠️ **see §5 — do not raw-commit** |
| ScAnalytic landing — SEO/GEO fixes | ✅ done on `feat/action-first-copy` | git → Vercel |
| 3 inputs only you can give | ⏳ blocking a few honest claims | §4 |

---

## 2. Deploy DMD Furnishing → Netlify

- **Branch with the work:** `DMD_SEO` (tip `afd3d8b` at time of writing).
- **Netlify builds:** `master` (repo default). So deploy = **merge `DMD_SEO` → `master`**,
  then Netlify auto-builds. (Or point the Netlify production branch at `DMD_SEO`
  for a preview first.)
- **No env var needed.** DMD's site URL is hardcoded to `https://dmdfurnishing.com`
  in `lib/metadata.js` — unlike ScAnalytic, there is nothing to set.
- **`netlify.toml` already correct:** publish `.next`, www→apex 301, legacy
  product-URL redirects, image cache headers. Don't touch it.
- **Build command:** the repo's normal `next build` (Netlify Next runtime handles SSG).
- **Before you deploy:** make sure the rendered **closet images are committed**
  (they are untracked until I commit them — see §5). The new page needs them or
  it ships with broken images.

**Post-deploy smoke check (2 min):**
```
curl -sI https://dmdfurnishing.com/products/residential/closets      # expect 200
curl -s  https://dmdfurnishing.com/products/residential/closets | grep -i "Indoor Walk-In Closets"   # H1 present
curl -s  https://dmdfurnishing.com/sitemap.xml | grep -c closets     # closets URLs in sitemap
```

---

## 3. Deploy ScAnalytic landing → Vercel

**Already has its own runbook — follow it, don't re-derive:**
`ScAnalytic-landing-page/DEPLOY-RUNBOOK-2026-07-09.md` (branch `feat/action-first-copy`, tip `9bf7c9e0`).

Three things from it that bite if missed:
1. **`NEXT_PUBLIC_SITE_URL` must be set in Vercel** (Production *and* Preview) or
   the build now **fails on purpose** — this branch added a guard so it can never
   again ship the `scanalytic.local` stub. Value today: `https://scanalytic-landing.vercel.app`.
2. **Vercel Hobby git-author block** — if a git-linked deploy is refused, deploy
   from a non-`.git` mirror via `vercel deploy --prod` as the project owner.
3. **Legal pages stay dark.** `lib/legal-config.ts` → `LEGAL_DRAFT = true`. Do **not**
   flip until a lawyer reviews `/legal/*` and the `[bracket]` placeholders are filled.

---

## 4. The 3 inputs only you can provide (honesty rule blocks inventing these)

| # | Need | Unlocks |
|---|---|---|
| 1 | Founder name(s) + one-line bio | Real author/owner entity → strong E-E-A-T + AI-citation signal |
| 2 | Cert status: **CAL 133** fire code? **BIFMA**? (yes/no each) | Lets me state compliance truthfully on product pages + schema |
| 3 | Real LinkedIn company URL | Current `dmd-usaa` slug 404s; fixes broken social + `sameAs` |

Give me these and I wire them in (local commit) the same day.

---

## 5. ⚠️ Decision needed — 930-product image backlog git weight

**The problem:** both closets and the 930-product backlog render as **PNG ~1.9 MB
each**. Closets (30 files ≈ 56 MB) is fine to commit. The 930 backlog is
**≈ 1.77 GB of raw PNG** — committing that raw into git means Netlify clones ~1.8 GB
on every build. That's not acceptable as-is.

**These images render to disk over the week regardless — no quota is wasted**
(the PNG *is* the real image). The only open question is **how they ship**. Options:

| Option | Result | My rec |
|---|---|---|
| A. Convert PNG→WebP q80 before commit | ~1.77 GB → **~560 MB**, matches the repo's existing 80%-WebP catalog; also requires flipping those 930 XML `src` from `.png`→`.webp` | ✅ **recommended** |
| B. External CDN / Netlify Large Media | git stays light; adds an asset host to manage | if repo size still a concern after A |
| C. Raw-commit PNG | simplest, but +1.8 GB repo + slow builds + heavier pages | ❌ band-aid |

The runner **already has a PNG→WebP converter** — Option A is a small change (output
extensions + XML `src`), not a re-render. **I'll hold the 930 backlog at "rendered to
disk, not committed" until you pick A / B / C.** Closets I commit + ship now regardless.

---

## 6. How the image factory runs (so it survives me)

- **Runner:** `scripts/render_images.py` — resumable, one image at a time, light on
  the machine. Skips anything already done (file exists **or** logged `OK` in
  `generation_log.csv`). Stops itself gracefully when the daily image quota trips.
- **Re-run each day** (quota resets) until all done:
  ```
  python scripts/render_images.py --file closet_image_prompts.md      # 30 closets
  python scripts/render_images.py --file codex_image_prompts.md       # 930 backlog
  ```
- **Prompt files** live at repo root: `closet_image_prompts.md` (30),
  `codex_image_prompts.md` (930). One `##` block = one image.
- **Codex gotcha (already fixed):** Codex's own shell can't save files in this
  sandbox, so the runner harvests the PNG from `~/.codex/generated_images/<session>/`
  and moves it. The Windows path fix (`_resolve_codex_base`) is committed and proven.

---

## 7. What is NOT done (open, on purpose)

- 930 backlog: **rendered to disk, not committed** — waiting on §5 decision.
- Wave 2: FOA room-scene gap audit for the ~581 real-photo products (your locked
  call: keep real supplier photos, add AI room scenes around them). Not started.
- ScAnalytic legal pages: stay `noindex` until lawyer review (not my call to flip).
- Nothing pushed; nothing deployed.
