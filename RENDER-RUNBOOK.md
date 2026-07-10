# Render Runbook — Codex Image Generation

How to run the daily image-render job, where images land, how resuming
works, and what a quota stop looks like.

## What this does

`scripts/render_images.py` reads a prompt file (`codex_image_prompts.md` /
`closet_image_prompts.md`), and for every image block that isn't rendered
yet, asks Codex to generate one photoreal PNG and drops it at the block's
`output_path` under `public/Images/...`.

Codex's own shell is broken on this machine, so Codex is **only** asked to
generate the image. The script does all the file handling itself: it notes
which session folders exist under `~/.codex/generated_images/` before
calling Codex, sees which new folder shows up after, and moves the new PNG
into place. Never ask Codex to "save" or "copy" a file — it will burn
several minutes failing at that every time.

## Daily usage

```bash
cd C:\Users\chin\dmdfurnishingwebsite-1   # or your working worktree
python scripts/render_images.py --limit 40
```

- `--limit 40` renders up to 40 images and stops. Each render calls Codex
  once, and Codex image generation is not instant — a batch of 40 is a
  reasonable chunk for one sitting.
- Run it again (same command) to pick up the next batch. Already-rendered
  images are skipped automatically — see "How resume/skip works" below.
- Drop `--limit` to try to render everything that's left in one run (not
  recommended for the full ~930-image backlog in a single sitting — prefer
  several `--limit 40` batches so a bad run doesn't burn the whole budget).

Other flags:

- `--dry-run` — parse the prompt file(s) and print pending/done counts.
  Performs zero renders. Use this to sanity-check before spending quota.
- `--file <path>` — repeatable. Point at a specific prompt markdown file
  (absolute or repo-root-relative). Default: `closet_image_prompts.md`
  then `codex_image_prompts.md`, whichever exist at the repo root.
- `--repo-root <path>` — override the repo root (default: the repo that
  contains `scripts/render_images.py`).

## Where images land

Each block's `output_path` in the prompt file already includes the full
`public/Images/...` path — the script creates any missing folders and
writes the file there directly. No manual copying needed.

If `output_path` ends in `.webp`, the script converts the harvested PNG to
WebP (quality 80) using Pillow, or falls back to the repo's `sharp` package
via `node -e ...` if Pillow isn't installed. In the current
`codex_image_prompts.md`, every `output_path` is `.png`, so this path
mostly matters for future prompt files.

## How resume/skip works

A block is treated as "already done" and skipped if **either**:

1. Its `output_path` file already exists on disk, **or**
2. `generation_log.csv` (repo root) has a row for that `image_id` with
   `status=OK` (most recent row wins).

This means you can safely re-run the same command as many times as you
like — it will only ever work on what's actually missing. It also means
if you manually drop a file at the right path (e.g. a hand-picked reshoot),
the script will treat it as done without needing a CSV row.

`generation_log.csv` is append-only. Columns:

```
timestamp, image_id, output_path, status, codex_session, note
```

`status` is one of `OK`, `FAIL`, or `QUOTA`. `codex_session` is the
`~/.codex/generated_images/<session-id>` folder the PNG was harvested from
(useful for tracing a specific render back to its Codex session). `note`
has the file size on success, or the failure reason on failure.

## How to spot-check outputs

1. Open `generation_log.csv` and filter for `status=FAIL` to see what
   needs a retry or a prompt tweak.
2. Spot-check a handful of the newest `OK` files directly in
   `public/Images/...` — image generation quality varies, and this script
   only checks file size (>20 KB), not content.
3. Re-running the script will **not** retry a `FAIL` unless the file was
   removed or the CSV row's `image_id` no longer shows as `OK` — a `FAIL`
   row is not skipped, so a plain re-run of the same command already
   retries every `FAIL`led block. `QUOTA` rows are also retried on the
   next run (they aren't a terminal state).

## What a QUOTA stop looks like

The run stops itself (exit code 0, not an error) when either:

- Codex's own output mentions something like "rate limit", "usage limit",
  or "quota exceeded", or
- 3 renders in a row fail for any reason (heuristic: this usually means
  Codex has stopped actually generating images, e.g. it's out of quota).

When this happens you'll see something like:

```
STOPPED (not an error): quota/rate-limit text detected in codex output
Codex has likely hit its usage/rate limit for now.
Resume later with the same command -- completed images are skipped automatically:
  python scripts/render_images.py --limit 40
Progress so far is recorded in generation_log.csv
```

A `QUOTA` row is appended to `generation_log.csv` for the block(s) involved
so you can see exactly where the run stopped. Just re-run the same command
later (next day, next quota window, etc.) — it resumes from where it left
off.

## Design notes

- The composed Codex prompt is: the block's `PROMPT:` text, then
  `Avoid: <NEGATIVE line>`, then a fixed instruction to render a square,
  high-resolution image. The prompt file's own per-shot-type aspect-ratio
  table (some shots suggest 3:2 landscape) is **not** currently honored —
  everything is requested square. If landscape shots start looking
  cropped/wrong, that's the first thing to revisit.
- `MIN_OUTPUT_BYTES` (20 KB) is a cheap sanity check, not a quality check.
  It catches truly broken/blank renders, nothing more.
- `codex exec` is called with `stdin=DEVNULL` and an 8-minute timeout per
  the confirmed-working invocation shape; a timeout is logged as a normal
  `FAIL` (counts toward the 3-consecutive-fail stop).
