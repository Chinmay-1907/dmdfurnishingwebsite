#!/usr/bin/env python3
"""Resumable Codex image-render runner for DMD Furnishing.

Reads one or more markdown prompt files (see codex_image_prompts.md format),
renders each pending image by shelling out to `codex exec` (which uses
Codex's built-in image_gen tool), harvests the resulting PNG from
~/.codex/generated_images/<session-id>/, moves it to the block's
output_path, and logs progress to generation_log.csv at the repo root.

Codex's internal shell is broken in this environment, so Codex is only ever
asked to GENERATE the image -- this script does 100% of the file handling
(snapshot-diff-move). Never ask Codex to save/copy anything.

Usage:
    python scripts/render_images.py --dry-run
    python scripts/render_images.py --limit 40
    python scripts/render_images.py --file codex_image_prompts.md --limit 10

See RENDER-RUNBOOK.md for day-to-day usage.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import shutil
import subprocess
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable, Optional

# --------------------------------------------------------------------------
# Constants
# --------------------------------------------------------------------------

DEFAULT_FILENAMES = ["closet_image_prompts.md", "codex_image_prompts.md"]
CODEX_GENERATED_DIR = Path.home() / ".codex" / "generated_images"
CSV_COLUMNS = ["timestamp", "image_id", "output_path", "status", "codex_session", "note"]
MIN_OUTPUT_BYTES = 20 * 1024  # 20 KB -- anything smaller is treated as a bad/blank render
CODEX_TIMEOUT_SEC = 8 * 60
MAX_CONSECUTIVE_FAILS = 3
QUOTA_RE = re.compile(r"\b(rate limit|usage limit|quota exceeded|limit reached|too many requests)\b", re.I)

FIELD_LINE_RE = re.compile(r"^-\s*([a-zA-Z_]+):\s*(.*)$")


# --------------------------------------------------------------------------
# Parsing
# --------------------------------------------------------------------------

@dataclass
class ImageBlock:
    image_id: str
    product_ref: str
    shot_type: str
    gallery_position: str
    output_path: str
    prompt: str
    negative: str
    product_group: Optional[str]
    consistency_profile: Optional[str]
    source_file: str


@dataclass
class ParseResult:
    blocks: list = field(default_factory=list)
    warnings: list = field(default_factory=list)


def parse_file(path: Path) -> ParseResult:
    """Line-based state-machine parser for the codex_image_prompts.md format.

    Format recap:
      # PRODUCT: <name>            -- group header, carries target_set + consistency_profile
      target_set: ...
      consistency_profile: ...

      ## <image_id>                -- one image block
      - product_ref: ...
      - shot_type: ...
      - gallery_position: ...
      - output_path: ...
      - vars: ...
      - consistency_profile: ...
      - redo_of: ...
      (blank line)
      PROMPT:
      <prose, possibly multi-line>

      NEGATIVE:
      <one line>
      ---

    Non-image "## " headers (e.g. "## How to run" in the file's own intro)
    are skipped automatically because they never carry an output_path field.
    """
    result = ParseResult()
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    n = len(lines)
    i = 0
    current_product: Optional[str] = None
    current_consistency: Optional[str] = None

    while i < n:
        line = lines[i]

        if line.startswith("# PRODUCT:"):
            current_product = line[len("# PRODUCT:"):].strip()
            current_consistency = None
            i += 1
            continue

        if current_consistency is None and line.strip().startswith("consistency_profile:"):
            current_consistency = line.split(":", 1)[1].strip()
            i += 1
            continue

        if line.startswith("## "):
            image_id = line[3:].strip()
            block_start_line = i + 1
            i += 1

            fields: dict[str, str] = {}
            while i < n:
                stripped = lines[i].strip()
                if not stripped:
                    break
                m = FIELD_LINE_RE.match(stripped)
                if m:
                    fields[m.group(1)] = m.group(2).strip()
                    i += 1
                    continue
                break

            while i < n and lines[i].strip() == "":
                i += 1

            prompt_lines: list[str] = []
            negative_lines: list[str] = []

            if i < n and lines[i].strip() == "PROMPT:":
                i += 1
                while i < n and lines[i].strip() != "NEGATIVE:":
                    prompt_lines.append(lines[i])
                    i += 1
                if i < n and lines[i].strip() == "NEGATIVE:":
                    i += 1
                    while (
                        i < n
                        and lines[i].strip() != "---"
                        and not lines[i].startswith("## ")
                        and not lines[i].startswith("# PRODUCT:")
                    ):
                        negative_lines.append(lines[i])
                        i += 1

            # This "## " header is only a real image block if it has an
            # output_path. Otherwise it's document structure (e.g. "How to
            # run") -- silently skip it.
            if "output_path" not in fields:
                continue

            prompt_text = "\n".join(prompt_lines).strip()
            negative_text = "\n".join(negative_lines).strip()

            if not prompt_text:
                result.warnings.append(
                    f"{path.name}:{block_start_line}: block '{image_id}' has output_path but no PROMPT text -- skipped"
                )
                continue

            result.blocks.append(
                ImageBlock(
                    image_id=image_id,
                    product_ref=fields.get("product_ref", ""),
                    shot_type=fields.get("shot_type", ""),
                    gallery_position=fields.get("gallery_position", ""),
                    output_path=fields.get("output_path", ""),
                    prompt=prompt_text,
                    negative=negative_text,
                    product_group=current_product,
                    consistency_profile=current_consistency,
                    source_file=str(path),
                )
            )
            continue

        i += 1

    return result


# --------------------------------------------------------------------------
# generation_log.csv helpers
# --------------------------------------------------------------------------

def ensure_csv_header(csv_path: Path) -> None:
    if not csv_path.exists():
        with csv_path.open("w", newline="", encoding="utf-8") as f:
            csv.writer(f).writerow(CSV_COLUMNS)


def load_last_status(csv_path: Path) -> dict:
    """Return {image_id: last_status} -- later rows win (append-only log)."""
    statuses: dict[str, str] = {}
    if not csv_path.exists():
        return statuses
    with csv_path.open("r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            image_id = row.get("image_id", "")
            status = row.get("status", "")
            if image_id:
                statuses[image_id] = status
    return statuses


def append_csv_row(csv_path: Path, *, image_id: str, output_path: str, status: str,
                    codex_session: str = "", note: str = "") -> None:
    ensure_csv_header(csv_path)
    with csv_path.open("a", newline="", encoding="utf-8") as f:
        csv.writer(f).writerow([
            time.strftime("%Y-%m-%dT%H:%M:%S%z"),
            image_id,
            output_path,
            status,
            codex_session,
            note,
        ])


# --------------------------------------------------------------------------
# Codex invocation + harvesting
# --------------------------------------------------------------------------

@dataclass
class RenderResult:
    status: str  # OK / FAIL
    note: str
    codex_session: str
    quota_detected: bool = False


def snapshot_sessions() -> set:
    if not CODEX_GENERATED_DIR.exists():
        return set()
    return {p.name for p in CODEX_GENERATED_DIR.iterdir() if p.is_dir()}


def find_new_png(candidate_dirs: Iterable[str], start_time: float) -> Optional[Path]:
    dirs = list(candidate_dirs)
    if not dirs and CODEX_GENERATED_DIR.exists():
        # Defensive fallback: Codex reused an existing session dir instead of
        # minting a new one. Look at every session dir for a PNG newer than
        # our invocation start time.
        dirs = [p.name for p in CODEX_GENERATED_DIR.iterdir() if p.is_dir()]

    candidates: list[tuple[float, Path]] = []
    for name in dirs:
        d = CODEX_GENERATED_DIR / name
        if not d.is_dir():
            continue
        for f in d.glob("ig_*.png"):
            try:
                mtime = f.stat().st_mtime
            except OSError:
                continue
            if mtime >= start_time - 2:  # small clock-skew buffer
                candidates.append((mtime, f))

    if not candidates:
        return None
    candidates.sort(key=lambda t: t[0], reverse=True)
    return candidates[0][1]


def compose_prompt(block: ImageBlock) -> str:
    negative_line = " ".join(block.negative.split())
    parts = [block.prompt]
    if negative_line:
        parts.append(f"Avoid: {negative_line}")
    parts.append("Render a single square (1:1 aspect ratio) image at high resolution.")
    return "\n\n".join(parts)


def convert_to_webp(png_path: Path, webp_path: Path, repo_root: Path) -> tuple[bool, str]:
    """Convert PNG -> WebP q80. Prefer Pillow; fall back to repo's sharp via node."""
    try:
        from PIL import Image  # type: ignore

        img = Image.open(png_path)
        img.save(webp_path, "WEBP", quality=80)
        png_path.unlink(missing_ok=True)
        return True, ""
    except ImportError:
        pass
    except Exception as e:  # noqa: BLE001 - report and try the fallback
        note = f"Pillow webp conversion failed ({e}); trying sharp fallback"
    else:
        return True, ""

    node_script = (
        "const sharp=require('sharp');"
        f"sharp({json.dumps(str(png_path))}).webp({{quality:80}}).toFile({json.dumps(str(webp_path))})"
        ".then(()=>{console.log('OK');process.exit(0);})"
        ".catch(e=>{console.error(String(e));process.exit(1);});"
    )
    try:
        proc = subprocess.run(
            ["node", "-e", node_script],
            cwd=str(repo_root),
            stdin=subprocess.DEVNULL,
            capture_output=True,
            text=True,
            timeout=60,
        )
        if proc.returncode == 0 and webp_path.exists():
            png_path.unlink(missing_ok=True)
            return True, ""
        return False, f"sharp fallback failed: {(proc.stderr or proc.stdout).strip()[:300]}"
    except Exception as e:  # noqa: BLE001
        return False, f"sharp fallback exception: {e}"


def render_one(block: ImageBlock, repo_root: Path) -> RenderResult:
    out_path = repo_root / block.output_path
    out_path.parent.mkdir(parents=True, exist_ok=True)

    full_prompt = compose_prompt(block)
    before_sessions = snapshot_sessions()
    start_time = time.time()

    try:
        proc = subprocess.run(
            ["codex", "exec", "--skip-git-repo-check", "--sandbox", "workspace-write", full_prompt],
            stdin=subprocess.DEVNULL,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            timeout=CODEX_TIMEOUT_SEC,
            text=True,
        )
        output_text = proc.stdout or ""
    except subprocess.TimeoutExpired:
        return RenderResult(status="FAIL", note="codex exec timed out after 8 min", codex_session="")
    except FileNotFoundError:
        return RenderResult(status="FAIL", note="codex CLI not found on PATH", codex_session="")
    except Exception as e:  # noqa: BLE001 - never let one bad render crash the run
        return RenderResult(status="FAIL", note=f"subprocess error: {e}", codex_session="")

    quota_detected = bool(QUOTA_RE.search(output_text))

    after_sessions = snapshot_sessions()
    new_dirs = after_sessions - before_sessions
    png = find_new_png(new_dirs, start_time)

    if png is None:
        note = "no PNG harvested from ~/.codex/generated_images"
        if quota_detected:
            note += "; quota/rate-limit text detected in codex output"
        return RenderResult(
            status="FAIL", note=note, codex_session=",".join(sorted(new_dirs)), quota_detected=quota_detected
        )

    session_id = png.parent.name
    is_webp = out_path.suffix.lower() == ".webp"
    move_target = out_path.with_suffix(".png") if is_webp else out_path

    try:
        shutil.move(str(png), str(move_target))
    except Exception as e:  # noqa: BLE001
        return RenderResult(status="FAIL", note=f"failed to move harvested PNG: {e}", codex_session=session_id,
                             quota_detected=quota_detected)

    if is_webp:
        ok, note = convert_to_webp(move_target, out_path, repo_root)
        if not ok:
            return RenderResult(status="FAIL", note=note or "webp conversion failed", codex_session=session_id,
                                 quota_detected=quota_detected)

    final_path = out_path
    if not final_path.exists() or final_path.stat().st_size < MIN_OUTPUT_BYTES:
        size = final_path.stat().st_size if final_path.exists() else 0
        return RenderResult(
            status="FAIL",
            note=f"output missing or too small ({size} bytes < {MIN_OUTPUT_BYTES})",
            codex_session=session_id,
            quota_detected=quota_detected,
        )

    return RenderResult(status="OK", note=f"{final_path.stat().st_size} bytes", codex_session=session_id,
                         quota_detected=quota_detected)


# --------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------

def default_repo_root() -> Path:
    return Path(__file__).resolve().parent.parent


def resolve_files(file_args: Optional[list], repo_root: Path) -> list:
    if file_args:
        resolved = []
        for f in file_args:
            p = Path(f)
            if not p.is_absolute():
                p = (repo_root / p).resolve()
            resolved.append(p)
        return resolved

    found = []
    for name in DEFAULT_FILENAMES:
        p = repo_root / name
        if p.exists():
            found.append(p)
    return found


def print_resume_instructions(csv_path: Path, reason: str) -> None:
    print()
    print(f"STOPPED (not an error): {reason}")
    print("Codex has likely hit its usage/rate limit for now.")
    print("Resume later with the same command -- completed images are skipped automatically:")
    print("  python scripts/render_images.py --limit 40")
    print(f"Progress so far is recorded in {csv_path}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Resumable Codex image-render runner")
    parser.add_argument("--file", action="append", default=None,
                         help="Prompt markdown file to process (repeatable). "
                              "Default: closet_image_prompts.md then codex_image_prompts.md, whichever exist.")
    parser.add_argument("--limit", type=int, default=None, help="Max number of renders to perform this run")
    parser.add_argument("--dry-run", action="store_true", help="Parse and report pending counts, zero renders")
    parser.add_argument("--repo-root", type=str, default=None, help="Repo root (default: repo containing this script)")
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve() if args.repo_root else default_repo_root()
    files = resolve_files(args.file, repo_root)

    if not files:
        print("No prompt files found. Pass --file explicitly, or place "
              "closet_image_prompts.md / codex_image_prompts.md at the repo root.")
        return 1

    all_blocks: list[ImageBlock] = []
    all_warnings: list[str] = []
    per_file_counts: dict[str, int] = {}

    for f in files:
        if not f.exists():
            print(f"WARNING: file not found, skipping: {f}")
            continue
        result = parse_file(f)
        all_blocks.extend(result.blocks)
        all_warnings.extend(result.warnings)
        per_file_counts[str(f)] = len(result.blocks)

    csv_path = repo_root / "generation_log.csv"
    last_status = load_last_status(csv_path)

    pending: list[ImageBlock] = []
    done = 0
    seen_ids: set = set()
    duplicate_ids = 0

    for b in all_blocks:
        if b.image_id in seen_ids:
            duplicate_ids += 1
            continue
        seen_ids.add(b.image_id)

        out_path = repo_root / b.output_path
        already_ok = out_path.exists() or last_status.get(b.image_id) == "OK"
        if already_ok:
            done += 1
        else:
            pending.append(b)

    print("=" * 70)
    print("Codex image-render runner")
    print("=" * 70)
    print(f"Repo root: {repo_root}")
    for f, count in per_file_counts.items():
        print(f"  parsed {count:>4} image blocks from {f}")
    if duplicate_ids:
        print(f"  ({duplicate_ids} duplicate image_id(s) across files, first occurrence kept)")
    if all_warnings:
        print(f"  {len(all_warnings)} warning(s):")
        for w in all_warnings[:20]:
            print(f"    - {w}")
        if len(all_warnings) > 20:
            print(f"    ... and {len(all_warnings) - 20} more")
    print("-" * 70)
    print(f"Total unique image blocks: {len(seen_ids)}")
    print(f"  already done (file exists or logged OK): {done}")
    print(f"  pending:                                 {len(pending)}")
    print("-" * 70)

    if args.dry_run:
        print("DRY RUN -- no renders performed.")
        if pending:
            print("Next up:")
            for b in pending[:10]:
                print(f"  - {b.image_id}  ->  {b.output_path}")
            if len(pending) > 10:
                print(f"  ... and {len(pending) - 10} more")
        return 0

    if not pending:
        print("Nothing to render. All caught up.")
        return 0

    ensure_csv_header(csv_path)
    to_process = pending[: args.limit] if args.limit else pending
    print(f"Rendering {len(to_process)} image(s) this run (limit={args.limit or 'none'})...")
    print()

    rendered = 0
    failed = 0
    consecutive_fails = 0

    for idx, block in enumerate(to_process, start=1):
        result = render_one(block, repo_root)
        status_for_csv = "QUOTA" if result.quota_detected else result.status
        append_csv_row(
            csv_path,
            image_id=block.image_id,
            output_path=block.output_path,
            status=status_for_csv,
            codex_session=result.codex_session,
            note=result.note,
        )

        if status_for_csv == "OK":
            rendered += 1
            consecutive_fails = 0
        else:
            failed += 1
            if status_for_csv != "QUOTA":
                consecutive_fails += 1

        remaining = len(to_process) - idx
        print(f"[{idx}/{len(to_process)}] {block.image_id}: {status_for_csv}  "
              f"(done={rendered} failed={failed} remaining_this_run={remaining})  {result.note}")

        if result.quota_detected:
            print_resume_instructions(csv_path, "quota/rate-limit text detected in codex output")
            return 0

        if consecutive_fails >= MAX_CONSECUTIVE_FAILS:
            append_csv_row(
                csv_path,
                image_id=block.image_id,
                output_path=block.output_path,
                status="QUOTA",
                codex_session="",
                note=f"stopping after {MAX_CONSECUTIVE_FAILS} consecutive fails (last error: {result.note})",
            )
            print_resume_instructions(csv_path, f"{MAX_CONSECUTIVE_FAILS} consecutive failures in a row")
            return 0

    print()
    print("=" * 70)
    print(f"Run complete. rendered={rendered} failed={failed} "
          f"pending_remaining={len(pending) - len(to_process)}")
    print("=" * 70)
    return 0


if __name__ == "__main__":
    sys.exit(main())
