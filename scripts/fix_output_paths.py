"""Normalize every `- output_path:` line in codex_image_prompts.md to the
authoritative path computed from the batch JSON (keyed by image_id). Fixes any
agent transcription drift (e.g. a dropped /Images/ segment)."""
import json, glob, re, pathlib

canon = {}
for f in glob.glob(".staging-foa/reconcile/prompt_batches/batch_*.json"):
    for p in json.load(open(f, encoding="utf-8")):
        for s in p["slots"]:
            canon[s["image_id"]] = "public" + s["output_path"]

md = pathlib.Path("codex_image_prompts.md").read_text(encoding="utf-8")
parts = re.split(r"(?m)^(## )", md)   # [pre, '## ', body, '## ', body, ...]
out = [parts[0]]
changed = unknown = checked = 0
i = 1
while i < len(parts):
    marker, content = parts[i], parts[i + 1]
    iid = content.split("\n", 1)[0].strip()
    if iid in canon:
        checked += 1
        want = canon[iid]
        def repl(m):
            global changed
            if m.group(1).strip() != want:
                changed += 1
            return "- output_path: " + want
        content = re.sub(r"- output_path:\s*(\S.*)", repl, content, count=1)
    else:
        unknown += 1
        print("  UNKNOWN image_id (not in batches):", iid)
    out.append(marker + content)
    i += 2

pathlib.Path("codex_image_prompts.md").write_text("".join(out), encoding="utf-8")
print(f"blocks checked: {checked}  unknown: {unknown}  paths corrected: {changed}")

# verify: every output_path now starts with public/Images and points at an existing dir
md2 = pathlib.Path("codex_image_prompts.md").read_text(encoding="utf-8")
bad_prefix = baddir = 0
for m in re.finditer(r"- output_path:\s*(\S.*)", md2):
    p = m.group(1).strip()
    if not p.startswith("public/Images/"):
        bad_prefix += 1; print("  STILL BAD PREFIX:", p)
    d = pathlib.Path(p).parent
    if not d.is_dir():
        baddir += 1
        if baddir <= 10: print("  DEST DIR MISSING:", d)
print(f"paths not under public/Images: {bad_prefix}")
print(f"destination dirs missing on disk: {baddir}")
