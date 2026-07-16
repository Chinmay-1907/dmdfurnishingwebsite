# DMD Inspirations — Image Briefs

One brief per theme. Each theme has 4 images: 1 hero (16:9) plus 3 details (4:3).

All images live under `/public/images/inspirations/{theme-slug}/{slot}.webp` and are referenced by `lib/inspirations.js`.

## Hard rules (apply to every image)
1. NO people, figures, body parts. Use "empty, unoccupied, uninhabited" framing.
2. NO text, logos, measurements.
3. Warm walnut, cream, tan, soft peach. No black, no stark white.
4. Editorial interior photography. Hasselblad X2D 100C, 45mm at f/4.

## Theme files
- `modern-minimalist.md` — oak + cream guestroom, restraint
- `warm-hospitality.md` — boutique hotel lobby nook, walnut + velvet
- `classic-luxury.md` — private dining, walnut tufted banquette
- `resort-coastal.md` — lanai-facing suite INTERIOR, rattan + linen
- `executive-workplace.md` — leather club chairs, walnut panel wall
- `multi-family-comfort.md` — amenity lounge, cream sectional, plants

## Regen
```bash
GOOGLE_AI_API_KEY=... python3 _batch.py
```
The batch script skips any `{slot}.webp` that already exists. Delete a file to regen just that slot.
