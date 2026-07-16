"""Batch-generate all DMD inspirations theme images.

Usage:
  GOOGLE_AI_API_KEY=... python3 _batch.py

Spawns parallel Gemini calls (4 workers), saves PNGs into per-theme folders,
then converts to webp via PIL.
"""
import os, sys, subprocess, json, shutil
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

GENERATE = r"C:/Users/chin/.claude/teams/marketing/skills/content/banana/scripts/generate.py"
OUT_ROOT = Path(r"C:/Users/chin/dmdfurnishingwebsite-1/public/images/inspirations")

# Common style suffix appended to every prompt for brand cohesion.
STYLE = (
    " No people, no figures, no body parts, empty unoccupied uninhabited room. "
    "No text, no logos, no measurements. Warm walnut and cream and tan and soft "
    "peach brand palette, no black, no stark white. Editorial interior photography, "
    "captured with Hasselblad X2D 100C and 45mm lens at f/4, soft natural daylight, "
    "Architectural Digest feature photograph."
)

JOBS = [
    # ----- Modern Minimalist (oak + cream guestroom) -----
    ("modern-minimalist", "hero",
     "Full boutique hotel guestroom interior, wide magazine cover shot from the corner "
     "showing floor to ceiling. Low solid white oak platform bed center right against a "
     "cream plaster wall, ivory linen bedding, one folded tan wool throw at the foot, single "
     "matte bronze pendant hanging low overhead, narrow walnut nightstand with a small "
     "ceramic vessel and a minimal framed abstract art piece above it, tall window on the "
     "left with sheer linen drapes diffusing soft morning daylight, wide plank white oak "
     "floor visible across the foreground, uncluttered. Slightly elevated angle, multiple "
     "furniture pieces in context, ceiling edge visible.", "16:9"),
    ("modern-minimalist", "detail-1",
     "Tight detail of a low solid white oak platform bed corner against a cream plaster "
     "wall, ivory linen sheet folded back to reveal a single tan wool throw, soft daylight "
     "raking across the grain of the oak.", "4:3"),
    ("modern-minimalist", "detail-2",
     "Close shot of a slim walnut nightstand against a cream wall, single matte bronze "
     "pendant hanging in frame, one small ceramic vessel and a hardback book on the surface, "
     "warm soft daylight.", "4:3"),
    ("modern-minimalist", "detail-3",
     "Three quarter view of a cream boucle upholstered headboard with a flat oak frame, "
     "ivory linens, single recessed walnut finger pull on the nightstand drawer visible.", "4:3"),

    # ----- Warm Hospitality (boutique hotel lobby) -----
    ("warm-hospitality", "hero",
     "Full boutique hotel lobby scene, wide interior magazine shot showing floor to "
     "ceiling. Walnut vertical reveal paneled wall as backdrop, curved cream wool boucle "
     "sofa anchoring the left side, single peach mohair velvet armchair facing from the "
     "right, round terrazzo coffee table centered between them, tall brass floor lamp in "
     "the corner, layered Persian style rug in muted rust and cream across a polished tan "
     "stone floor, three piece curated art wall above the sofa, warm 2700 Kelvin ambient "
     "light pooling from a brass ceiling fixture, ceiling reveal visible, editorial wide "
     "angle showing multiple furniture pieces in context.", "16:9"),
    ("warm-hospitality", "detail-1",
     "Tight three quarter shot of a peach mohair velvet armchair on a kiln dried hardwood "
     "frame, single round terrazzo side table beside it carrying a small brass tray, walnut "
     "paneled wall behind, brass wall sconce upper frame.", "4:3"),
    ("warm-hospitality", "detail-2",
     "Detail of walnut vertical reveal wall paneling behind a curved cream boucle sofa "
     "edge, single brass sconce mid frame casting warm 2700K light pool, one framed abstract "
     "art piece on the wall.", "4:3"),
    ("warm-hospitality", "detail-3",
     "Overhead three quarter view of a round terrazzo side table on a soft cream wool rug, "
     "small brass tray with a ceramic vessel, edge of a velvet armchair on the right, edge "
     "of a boucle sofa on the left.", "4:3"),

    # ----- Classic Luxury (private dining alcove) -----
    ("classic-luxury", "hero",
     "Full restaurant dining room interior, wide magazine cover shot showing architecture. "
     "Deep walnut tufted mohair velvet banquette running along one wall, two round pedestal "
     "dining tables draped in cream linen set for service, bentwood dining chairs, brass "
     "pendant lights hanging overhead at 2700 Kelvin, coffered detailed ceiling visible, "
     "moody amber brass wall sconces along the walnut paneled walls, dark stained hardwood "
     "floor across the foreground, heavy walnut drapery framing a tall window on the side, "
     "empty tables ready for service, no diners. Editorial interior architecture on full "
     "display.", "16:9"),
    ("classic-luxury", "detail-1",
     "Tight detail of a deep walnut tufted banquette upholstered in mohair velvet, button "
     "tufting pattern across the seat back, brass nailhead trim along the bottom rail.", "4:3"),
    ("classic-luxury", "detail-2",
     "Cream linen draped restaurant table set for two with brass flatware and amber rimmed "
     "glassware, single brass sconce on the wall above casting warm light, edge of walnut "
     "banquette in foreground.", "4:3"),
    ("classic-luxury", "detail-3",
     "Single warm amber pendant fixture hanging low over an empty cream linen table, soft "
     "moody light, walnut paneled back wall slightly out of focus.", "4:3"),

    # ----- Resort and Coastal (lanai-facing suite INTERIOR) -----
    ("resort-coastal", "hero",
     "Full lanai facing resort suite INTERIOR, wide magazine shot showing floor to ceiling. "
     "Cream performance linen sofa anchoring one side, two bouclé accent chairs facing, low "
     "teak console behind the sofa, woven rattan pendant hanging overhead, linen curtains "
     "drawn half across louvered wood shutter windows filtering warm daylight, wide plank "
     "sunlit white oak floor across the foreground, tall indoor potted palm in a terracotta "
     "pot in the corner, soft tan jute rug under the seating. INTERIOR ONLY, no beach, no "
     "ocean, no water visible in frame, lanai shutters framed but only warm exterior glow "
     "filtering through. Tropical calm but interior focused.", "16:9"),
    ("resort-coastal", "detail-1",
     "Three quarter detail of a solid teak sofa with woven cane side panels, cream "
     "performance linen cushions stacked, soft daylight from the right.", "4:3"),
    ("resort-coastal", "detail-2",
     "Close shot of a woven rattan pendant fixture hanging in a sunlit room, sheer linen "
     "drapery behind catching the late afternoon glow.", "4:3"),
    ("resort-coastal", "detail-3",
     "Low teak console table with one ceramic vessel and a stack of two hardback books, "
     "indoor potted palm in a terracotta pot beside it, wide plank hardwood floor.", "4:3"),

    # ----- Executive and Workplace (lounge) -----
    ("executive-workplace", "hero",
     "Full executive lounge private club interior, wide magazine shot showing full "
     "architecture. Walnut vertical panel wall as backdrop, two top grain cognac leather "
     "club chairs with hand burnished pull up finish facing each other, low walnut slab "
     "coffee table on a brushed bronze base between them, brass drinks cart with two amber "
     "decanters in the corner, coffered ceiling with integrated warm light, library "
     "bookshelves in warm walnut along one side wall, heavy wool rug in ivory and tan "
     "across the floor, tall brass floor lamp arching over one chair, single framed "
     "abstract art on the paneled wall. Masculine and warm, multiple furniture pieces in "
     "context, ceiling to floor.", "16:9"),
    ("executive-workplace", "detail-1",
     "Three quarter detail of a top grain cognac leather club chair with a hand burnished "
     "pull up finish, soft daylight raking across the leather grain.", "4:3"),
    ("executive-workplace", "detail-2",
     "Close shot of a brass drinks cart with two amber glass decanters and a small stack "
     "of low ball glasses, walnut panel wall behind.", "4:3"),
    ("executive-workplace", "detail-3",
     "Single walnut slab coffee table on a brushed bronze sculptural base, ivory wool rug "
     "underneath, edge of a leather club chair in the frame.", "4:3"),

    # ----- Multi-Family Comfort (residential amenity lounge) -----
    ("multi-family-comfort", "hero",
     "Full multi family amenity lounge interior, wide magazine shot showing full shared "
     "amenity scale. Large deep cream sectional sofa in a peach flecked performance weave "
     "anchoring one half of the room, low solid white oak coffee table in front, woven jute "
     "rug underfoot, tall arched windows along the back wall with soft linen curtains "
     "filtering afternoon daylight, oak built in shelving along one side wall, one tall "
     "fiddle leaf fig in a terracotta planter and smaller potted plants in the corner, two "
     "soft brass pendant lights hanging from the ceiling, white oak side tables with hand "
     "rubbed satin finish beside the sectional. Residential comfortable scale, clearly a "
     "shared amenity space not a private home, multiple furniture pieces in context.", "16:9"),
    ("multi-family-comfort", "detail-1",
     "Tight three quarter detail of a deep cream sectional sofa corner in a peach flecked "
     "performance weave, edge of an oak coffee table in front, soft afternoon daylight.", "4:3"),
    ("multi-family-comfort", "detail-2",
     "Close shot of a tall window with soft linen curtains backlit by afternoon sun, one "
     "oversized terracotta planter with a leafy indoor tree beside it.", "4:3"),
    ("multi-family-comfort", "detail-3",
     "Solid white oak side table with hand rubbed satin finish carrying a ceramic vessel "
     "and a stack of two design books, edge of a cream sectional sofa in the frame.", "4:3"),
]


def _load_api_key():
    k = os.environ.get("GOOGLE_AI_API_KEY", "")
    if k:
        return k
    # Fallback: load from user's claude settings.json
    try:
        with open(os.path.expanduser(r"~/.claude/settings.json"), "r", encoding="utf-8") as f:
            cfg = json.load(f)
        env = cfg.get("env", {})
        for name in ("GOOGLE_AI_API_KEY", "GEMINI_API_KEY", "NANOBANANA_GEMINI_API_KEY"):
            if env.get(name):
                return env[name]
        return ""
    except Exception:
        return ""

API_KEY = _load_api_key()
if not API_KEY:
    print("ERROR: GOOGLE_AI_API_KEY not found in env or ~/.claude/settings.json")
    sys.exit(2)
print(f"API key loaded ({len(API_KEY)} chars)")

def run_one(theme, slot, prompt, ratio):
    out_dir = OUT_ROOT / theme
    out_dir.mkdir(parents=True, exist_ok=True)
    final_webp = out_dir / f"{slot}.webp"
    if final_webp.exists():
        return (theme, slot, "SKIP exists")
    full = prompt + STYLE
    try:
        result = subprocess.run(
            ["py", "-3.11", GENERATE, "--prompt", full, "--aspect-ratio", ratio,
             "--resolution", "1K", "--image-only", "--api-key", API_KEY],
            capture_output=True, text=True, timeout=240,
        )
        if result.returncode != 0:
            return (theme, slot, f"FAIL rc={result.returncode}: {result.stdout[:150]} || {result.stderr[:150]}")
        # Parse JSON from stdout
        out = result.stdout.strip()
        # Strip leading non-JSON noise
        idx = out.find("{")
        if idx < 0:
            return (theme, slot, f"FAIL no json: {out[:200]} || {result.stderr[:200]}")
        try:
            data = json.loads(out[idx:])
        except Exception as e:
            return (theme, slot, f"FAIL json: {out[:200]}")
        if "error" in data and data.get("error"):
            return (theme, slot, f"FAIL api: {data.get('message','?')[:150]}")
        if "path" not in data:
            return (theme, slot, f"FAIL nopath: {str(data)[:200]}")
        png_path = Path(data["path"])
        if not png_path.exists():
            return (theme, slot, f"FAIL png missing: {png_path}")
        # Convert to webp via PIL
        try:
            from PIL import Image
            im = Image.open(png_path)
            im.save(final_webp, "WEBP", quality=88, method=6)
        except ImportError:
            # Fallback: just copy png
            shutil.copy(png_path, out_dir / f"{slot}.png")
            return (theme, slot, "OK png (no PIL)")
        return (theme, slot, f"OK -> {final_webp}")
    except subprocess.TimeoutExpired:
        return (theme, slot, "FAIL timeout")
    except Exception as e:
        return (theme, slot, f"FAIL {e}")


def main():
    print(f"Generating {len(JOBS)} images, 4 workers...")
    results = []
    with ThreadPoolExecutor(max_workers=2) as ex:
        futs = {ex.submit(run_one, *j): j for j in JOBS}
        for f in as_completed(futs):
            r = f.result()
            print(f"  {r[0]}/{r[1]}: {r[2]}")
            results.append(r)
    fails = [r for r in results if not r[2].startswith("OK") and not r[2].startswith("SKIP")]
    print(f"\nDone. {len(results) - len(fails)}/{len(results)} succeeded.")
    if fails:
        print("FAILURES:")
        for f in fails:
            print(f"  {f}")
        sys.exit(1)


if __name__ == "__main__":
    main()
