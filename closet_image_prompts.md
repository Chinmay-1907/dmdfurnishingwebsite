# DMD Furnishing, Codex Image Generation Handoff — Residential Walk-In Closets

**Role:** You (Codex) are the RENDERER. This file is the source of truth. Author = DMD CMO visual director. Execute top to bottom, one image per `##` block, no further interpretation.

## How to run
1. For each `##` block: render ONE photoreal image from its `PROMPT:` text, honoring its `NEGATIVE:` line.
2. Save to the block's `output_path` (already includes the `public/...` prefix and final filename, matching the `src` used for that image slot in `public/DMD_Website.xml`). Create folders as needed.
3. Append one row to `generation_log.csv` (create with header if missing):
   `image_id,product_ref,shot_type,output_path,status,timestamp`
   status = `OK` or `FAILED`. On failure: log `FAILED`, DO NOT halt, continue to the next block.
4. **Resumable:** before rendering, if `output_path` already exists AND its `image_id` is logged `OK`, skip it.

## Global rules (apply to EVERY image)
- Photoreal commercial product / architectural-interior photography. Operator-on-site realism, not ad-agency gloss.
- ABSOLUTELY NO people, hands, fingers, human silhouettes, or faces in any frame.
- NO text, numbers, letters, watermarks, logos, or brand marks baked into any image.
- Consistent material, color, lighting temperature, and lens character within a single product (see each product's `consistency_profile`).
- `white_seamless_hero` is always that product's grid thumbnail.
- Environment shots use a REAL, sector-appropriate context (condo primary suite, multi-family model-unit bedroom, townhome, boutique dressing room), never a generic stock living room and never a hospitality guestroom.

## Variable convention
Each block's `vars:` line records `{product}`, `{material}`, `{color}`, `{ref}` for that piece. The PROMPT prose is already resolved to those values; the vars line makes the prompt reusable for a sibling SKU by swapping values.

## Spec shots are text-free by design
`material_swatch_row` and `hardware_detail` render as CLEAN photoreal base shots with NO baked numbers, measurement lines, or swatch labels. Swatch/hardware names are added later as a code overlay in the product gallery, do not try to render them.

## Suggested aspect ratios
- white_seamless_hero, three_quarter_angle, hardware_detail, material_swatch_row, functional_transformation: square 1:1
- full_room_scene: landscape 3:2

---


<!-- ===== batch 00 ===== -->
# PRODUCT: Modular Walk-In Closet System (L-Shaped)  [Residential | Closets]
target_set: white_seamless_hero, three_quarter_angle, full_room_scene, full_room_scene, hardware_detail, material_swatch_row
consistency_profile: warm greige HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and drawer pulls, matte-finish drawer fronts, powder-coated steel corner brackets; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.

## modular-walk-in-closet-l-shaped_white_seamless_hero
- product_ref: Modular Walk-In Closet System (L-Shaped)
- shot_type: white_seamless_hero
- gallery_position: 1
- output_path: public/Images/Residential/Closets/Walk-In Closets/Modular Walk-In Closet System L-Shaped/modular walk-in closet system l-shaped 1.png
- vars: {product}="Modular Walk-In Closet System (L-Shaped)" | {material}="HPL laminate panels on engineered-wood carcass, satin-nickel hardware" | {color}="warm greige" | {ref}="modular-walk-in-closet-l-shaped"
- consistency_profile: warm greige HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and drawer pulls, matte-finish drawer fronts, powder-coated steel corner brackets; 4800K soft studio key, warm-ivory ground, eye-level medium-format 80mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
A modular L-shaped walk-in closet system, corner configuration, centered on a seamless warm-ivory studio sweep, e-commerce catalog hero, eye-level medium-format 80mm. Two connecting panel runs meet at a corner, each faced in warm greige HPL laminate with visible clean grain, hanging rods in brushed satin-nickel loaded with a few neutral unbranded garment silhouettes (plain fabric, no logos, no readable labels), open shelving with folded neutral linens, and a bank of drawer fronts in matching matte greige with satin-nickel pulls. Edge-banded panel edges are crisp and moisture-sealed. Soft large key light upper-left with gentle fill from the right, even coverage, no harsh shadows. True material color, no golden tint, no bleach. Crisp edge-to-edge sharpness from floor to shelf-top. Subtle contact shadow anchors the unit to the ground. Clean negative space all around, no props beyond the closet system itself. Shot communicates build quality and modular configuration at a glance. Lit with a large softbox key camera-left and a smaller fill softbox camera-right at a lower ratio, so the falloff between light and shadow is visible and gently graduated rather than perfectly even. Backdrop is a genuine white cyclorama sweep with a soft, naturally curved sweep-to-floor transition and a faint true floor shadow directly beneath the product, plus a slight optical vignette toward the frame edges from the physical lens, not a flat digital cutout. Materials show real-world imperfection: natural fabric drape with visible weight and slight wrinkle, authentic wood-grain variance from panel to panel, and believable specular reflections on any metal or laminate surface that shift with the studio lighting rather than reading as a uniform CGI sheen. Color response reads like true photographic film stock -- accurate but not oversaturated, with a faint, even micro-grain across the frame instead of a flawless digital-render surface.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no duplicated or extra panels, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no readable clothing labels, no colored background, 3D render look, CGI, videogame lighting, overly perfect symmetry

---

## modular-walk-in-closet-l-shaped_three_quarter_angle
- product_ref: Modular Walk-In Closet System (L-Shaped)
- shot_type: three_quarter_angle
- gallery_position: 2
- output_path: public/Images/Residential/Closets/Walk-In Closets/Modular Walk-In Closet System L-Shaped/modular walk-in closet system l-shaped 2.png
- vars: {product}="Modular Walk-In Closet System (L-Shaped)" | {material}="HPL laminate panels on engineered-wood carcass, satin-nickel hardware" | {color}="warm greige" | {ref}="modular-walk-in-closet-l-shaped"
- consistency_profile: warm greige HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and drawer pulls, matte-finish drawer fronts, powder-coated steel corner brackets; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The same modular L-shaped walk-in closet system at a 3/4 front-left angle on a clean warm-ivory studio surface, 50mm, directional soft key light from upper-left revealing the corner joinery where the two panel runs meet. True warm greige HPL laminate color throughout, satin-nickel hanging rods and drawer pulls clearly legible, drawer bank shown with one drawer partially open to reveal the soft-close slide mechanism. Light graphite shadow falls naturally to the right. No props beyond the closet system, minimal styling. Shot communicates full three-dimensional corner configuration and material quality, the key spec cues for a multi-family primary-suite closet.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no extra panels, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background

---

## modular-walk-in-closet-l-shaped_full_room_scene_condo
- product_ref: Modular Walk-In Closet System (L-Shaped)
- shot_type: full_room_scene
- gallery_position: 3
- output_path: public/Images/Residential/Closets/Walk-In Closets/Modular Walk-In Closet System L-Shaped/modular walk-in closet system l-shaped 3.png
- vars: {product}="Modular Walk-In Closet System (L-Shaped)" | {material}="HPL laminate panels on engineered-wood carcass, satin-nickel hardware" | {color}="warm greige" | {ref}="modular-walk-in-closet-l-shaped"
- consistency_profile: warm greige HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and drawer pulls, matte-finish drawer fronts, powder-coated steel corner brackets; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The modular L-shaped walk-in closet system installed in a real condominium primary-suite walk-in closet room, empty and faceless, no residents. Soft natural light enters from a small window or skylight above, supplemented by a single overhead fixture. The closet system fills the corner of the room exactly as built, true warm greige HPL laminate and satin-nickel hardware fully legible. Room finishes are realistic: light engineered-wood or carpet flooring, off-white painted walls, simple baseboard trim, a plain closet door frame visible at the edge of frame. The system is in sharp focus with the room softened just enough to read as real architecture, not a rendering void. Scene communicates the corner-fit value proposition to a condo buyer or property developer. No people anywhere in the frame.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no generic hotel guestroom, no residential styling props

---

## modular-walk-in-closet-l-shaped_full_room_scene_model_unit
- product_ref: Modular Walk-In Closet System (L-Shaped)
- shot_type: full_room_scene
- gallery_position: 4
- output_path: public/Images/Residential/Closets/Walk-In Closets/Modular Walk-In Closet System L-Shaped/modular walk-in closet system l-shaped 4.png
- vars: {product}="Modular Walk-In Closet System (L-Shaped)" | {material}="HPL laminate panels on engineered-wood carcass, satin-nickel hardware" | {color}="warm greige" | {ref}="modular-walk-in-closet-l-shaped"
- consistency_profile: warm greige HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and drawer pulls, matte-finish drawer fronts, powder-coated steel corner brackets; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The modular L-shaped walk-in closet system installed in a multi-family model-unit bedroom, viewed from the bedroom looking toward the open closet alcove. Room is empty and faceless, no residents, staged with only a plain unbranded area rug edge visible in the foreground for scale. Soft daylight enters from an out-of-frame window camera-left, supplemented by warm ambient ceiling light. True warm greige HPL laminate and satin-nickel hardware fully legible on the closet system in sharp focus; bedroom wall and flooring finishes softly out of focus behind. Scene communicates how the system reads inside a finished leasing model unit to a multi-family developer or leasing agent. No people anywhere in the frame.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no generic hotel guestroom styling

---

## modular-walk-in-closet-l-shaped_hardware_detail
- product_ref: Modular Walk-In Closet System (L-Shaped)
- shot_type: hardware_detail
- gallery_position: 5
- output_path: public/Images/Residential/Closets/Walk-In Closets/Modular Walk-In Closet System L-Shaped/modular walk-in closet system l-shaped 5.png
- vars: {product}="Modular Walk-In Closet System (L-Shaped)" | {material}="satin-nickel soft-close drawer slide, hanging rod bracket" | {color}="satin-nickel on warm greige laminate" | {ref}="modular-walk-in-closet-l-shaped"
- consistency_profile: warm greige HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and drawer pulls, matte-finish drawer fronts, powder-coated steel corner brackets; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
Extreme close-up macro shot of one open drawer on the modular walk-in closet system, showing the full-extension soft-close drawer slide mechanism fully engaged, and just above it the hanging rod bracket where a satin-nickel rod meets its reinforced mounting point on the warm greige HPL laminate panel. Studio macro lens, shallow depth of field with the slide mechanism and bracket in tack-sharp focus, laminate panel face softly falling off in the background. Soft even key light from upper-left, true satin-nickel metal tone with realistic micro-scratches and machined precision, true warm greige laminate grain. Warm-ivory backdrop consistent with the hero shot. Shot communicates hardware quality to a procurement buyer evaluating durability.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background

---

## modular-walk-in-closet-l-shaped_material_swatch_row
- product_ref: Modular Walk-In Closet System (L-Shaped)
- shot_type: material_swatch_row
- gallery_position: 6
- output_path: public/Images/Residential/Closets/Walk-In Closets/Modular Walk-In Closet System L-Shaped/modular walk-in closet system l-shaped 6.png
- vars: {product}="Modular Walk-In Closet System (L-Shaped)" | {material}="HPL laminate finish options" | {color}="warm greige, soft white, light oak, graphite" | {ref}="modular-walk-in-closet-l-shaped"
- consistency_profile: warm greige HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and drawer pulls, matte-finish drawer fronts, powder-coated steel corner brackets; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
A clean horizontal row of four HPL laminate finish swatches laid flat on a warm-ivory surface, photographed from slightly above at a gentle top-down angle, 50mm. Each swatch is a rectangular laminate sample approximately 12cm x 8cm, showing four finish colorways available for the modular walk-in closet system: warm greige (the primary colorway shown in the hero), soft white, light oak woodgrain, and graphite. Swatches are evenly spaced with consistent gaps, edges flat and true, no curling. Even soft overhead lighting, no harsh shadows, no reflections. True laminate color and texture on each swatch, subtle grain visible up close. Warm-ivory surface below, no background gradient. No text labels, no color names, no numbers baked into the image, swatch names will be added as a code overlay. Shot communicates finish range to a specifying designer or property developer.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background, no curled swatch edges

---


<!-- ===== batch 01 ===== -->
# PRODUCT: Boutique Walk-In Wardrobe with Center Island  [Residential | Closets]
target_set: white_seamless_hero, three_quarter_angle, full_room_scene, full_room_scene, hardware_detail, functional_transformation
consistency_profile: warm walnut-tone HPL laminate cabinetry, soft white solid-surface island top, brushed brass-tone hardware and drawer pulls; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.

## boutique-walk-in-wardrobe-island_white_seamless_hero
- product_ref: Boutique Walk-In Wardrobe with Center Island
- shot_type: white_seamless_hero
- gallery_position: 1
- output_path: public/Images/Residential/Closets/Walk-In Closets/Boutique Walk-In Wardrobe with Center Island/boutique walk-in wardrobe with center island 1.png
- vars: {product}="Boutique Walk-In Wardrobe with Center Island" | {material}="walnut-tone HPL laminate cabinetry, solid-surface island top, brass-tone hardware" | {color}="warm walnut / soft white" | {ref}="boutique-walk-in-wardrobe-island"
- consistency_profile: warm walnut-tone HPL laminate cabinetry, soft white solid-surface island top, brushed brass-tone hardware and drawer pulls; 4800K soft studio key, warm-ivory ground, eye-level medium-format 80mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
A boutique walk-in wardrobe system with a freestanding center island, centered on a seamless warm-ivory studio sweep, e-commerce catalog hero, eye-level medium-format 80mm. Perimeter cabinetry in warm walnut-tone HPL laminate wraps two sides with hanging rods and open shelving, and a freestanding island with drawer banks sits center-frame, topped with a soft white solid-surface counter surface. Brushed brass-tone drawer pulls and hardware throughout. Soft large key light upper-left with gentle fill from the right, even coverage, no harsh shadows. True walnut laminate grain and true soft-white top color, no golden tint, no bleach. Crisp edge-to-edge sharpness. Subtle contact shadow anchors both the island and perimeter cabinetry to the ground. Clean negative space, no props beyond the wardrobe system. Shot communicates the boutique island layout at a glance. Lit with a large softbox key camera-left and a smaller fill softbox camera-right at a lower ratio, so the falloff between light and shadow is visible and gently graduated rather than perfectly even. Backdrop is a genuine white cyclorama sweep with a soft, naturally curved sweep-to-floor transition and a faint true floor shadow directly beneath the product, plus a slight optical vignette toward the frame edges from the physical lens, not a flat digital cutout. Materials show real-world imperfection: authentic wood-grain variance from panel to panel and believable specular reflections on any metal or laminate surface that shift with the studio lighting rather than reading as a uniform CGI sheen. Color response reads like true photographic film stock -- accurate but not oversaturated, with a faint, even micro-grain across the frame instead of a flawless digital-render surface.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no duplicated islands, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background, 3D render look, CGI, videogame lighting, overly perfect symmetry

---

## boutique-walk-in-wardrobe-island_three_quarter_angle
- product_ref: Boutique Walk-In Wardrobe with Center Island
- shot_type: three_quarter_angle
- gallery_position: 2
- output_path: public/Images/Residential/Closets/Walk-In Closets/Boutique Walk-In Wardrobe with Center Island/boutique walk-in wardrobe with center island 2.png
- vars: {product}="Boutique Walk-In Wardrobe with Center Island" | {material}="walnut-tone HPL laminate cabinetry, solid-surface island top, brass-tone hardware" | {color}="warm walnut / soft white" | {ref}="boutique-walk-in-wardrobe-island"
- consistency_profile: warm walnut-tone HPL laminate cabinetry, soft white solid-surface island top, brushed brass-tone hardware and drawer pulls; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The same boutique walk-in wardrobe with center island at a 3/4 front-left angle on a clean warm-ivory studio surface, 50mm, directional soft key light from upper-left revealing the island's solid-surface top texture and the perimeter cabinetry's walnut grain. True warm walnut laminate and true soft-white island top color, brushed brass-tone hardware clearly legible. Light graphite shadow falls naturally to the right. No props beyond the wardrobe system, minimal styling. Shot communicates the full three-dimensional relationship between the island and perimeter storage, the key spec cue for a dressing-room-style closet.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background

---

## boutique-walk-in-wardrobe-island_full_room_scene_condo
- product_ref: Boutique Walk-In Wardrobe with Center Island
- shot_type: full_room_scene
- gallery_position: 3
- output_path: public/Images/Residential/Closets/Walk-In Closets/Boutique Walk-In Wardrobe with Center Island/boutique walk-in wardrobe with center island 3.png
- vars: {product}="Boutique Walk-In Wardrobe with Center Island" | {material}="walnut-tone HPL laminate cabinetry, solid-surface island top, brass-tone hardware" | {color}="warm walnut / soft white" | {ref}="boutique-walk-in-wardrobe-island"
- consistency_profile: warm walnut-tone HPL laminate cabinetry, soft white solid-surface island top, brushed brass-tone hardware and drawer pulls; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The boutique walk-in wardrobe with center island installed in a real condominium primary-suite walk-in closet room, empty and faceless, no residents. Soft natural light enters from a window camera-left, supplemented by a warm overhead fixture above the island. The wardrobe system fills the room exactly as built, true walnut-tone laminate and soft-white island top fully legible. Room finishes are realistic: light engineered-wood flooring, off-white painted walls, simple crown or baseboard trim. The system is in sharp focus with the room softened just enough to read as real architecture. Scene communicates the premium condo-suite value proposition to a developer or buyer. No people anywhere in the frame.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no generic hotel guestroom styling

---

## boutique-walk-in-wardrobe-island_full_room_scene_dressing_room
- product_ref: Boutique Walk-In Wardrobe with Center Island
- shot_type: full_room_scene
- gallery_position: 4
- output_path: public/Images/Residential/Closets/Walk-In Closets/Boutique Walk-In Wardrobe with Center Island/boutique walk-in wardrobe with center island 4.png
- vars: {product}="Boutique Walk-In Wardrobe with Center Island" | {material}="walnut-tone HPL laminate cabinetry, solid-surface island top, brass-tone hardware" | {color}="warm walnut / soft white" | {ref}="boutique-walk-in-wardrobe-island"
- consistency_profile: warm walnut-tone HPL laminate cabinetry, soft white solid-surface island top, brushed brass-tone hardware and drawer pulls; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The boutique walk-in wardrobe with center island staged as a dedicated boutique dressing room, empty and faceless, no residents. A single unbranded freestanding full-length mirror stands against the far wall, plain frame, no reflection details required to be legible. Warm ambient lighting from a statement ceiling fixture above the island, supplemented by soft wall sconces. True walnut-tone laminate and soft-white island top fully legible in sharp focus; room finishes softly out of focus behind, realistic light flooring and neutral wall paint. Scene communicates the elevated dressing-room positioning of this product to a premium multi-family or model-unit buyer. No people anywhere in the frame.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no generic hotel guestroom styling

---

## boutique-walk-in-wardrobe-island_hardware_detail
- product_ref: Boutique Walk-In Wardrobe with Center Island
- shot_type: hardware_detail
- gallery_position: 5
- output_path: public/Images/Residential/Closets/Walk-In Closets/Boutique Walk-In Wardrobe with Center Island/boutique walk-in wardrobe with center island 5.png
- vars: {product}="Boutique Walk-In Wardrobe with Center Island" | {material}="brass-tone soft-close drawer slide and pull" | {color}="brushed brass on walnut laminate" | {ref}="boutique-walk-in-wardrobe-island"
- consistency_profile: warm walnut-tone HPL laminate cabinetry, soft white solid-surface island top, brushed brass-tone hardware and drawer pulls; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
Extreme close-up macro shot of the center island's top drawer, partially open to reveal the full-extension soft-close slide mechanism, with the brushed brass-tone pull in sharp focus in the foreground against the warm walnut laminate drawer front. Studio macro lens, shallow depth of field, slide mechanism and pull tack-sharp, laminate grain softly falling off in the background. Soft even key light from upper-left, true brushed-brass metal tone with realistic machined precision, true walnut laminate grain. Warm-ivory backdrop consistent with the hero shot. Shot communicates island hardware quality to a procurement buyer.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background

---

## boutique-walk-in-wardrobe-island_functional_transformation
- product_ref: Boutique Walk-In Wardrobe with Center Island
- shot_type: functional_transformation
- gallery_position: 6
- output_path: public/Images/Residential/Closets/Walk-In Closets/Boutique Walk-In Wardrobe with Center Island/boutique walk-in wardrobe with center island 6.png
- vars: {product}="Boutique Walk-In Wardrobe with Center Island" | {material}="walnut-tone HPL laminate cabinetry, solid-surface island top" | {color}="warm walnut / soft white" | {ref}="boutique-walk-in-wardrobe-island"
- consistency_profile: warm walnut-tone HPL laminate cabinetry, soft white solid-surface island top, brushed brass-tone hardware and drawer pulls; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The center island of the boutique walk-in wardrobe shown with its full top drawer bank open in a staggered cascade, each drawer pulled to a different depth to reveal the internal storage capacity and soft-close slide hardware, on the same seamless warm-ivory studio background as the hero shot, eye-level 50mm. True walnut laminate and soft-white top color consistent with the hero. Soft large key light upper-left with gentle fill, even coverage. Drawer interiors shown empty and clean, no contents, no dividers with text. Crisp edge-to-edge sharpness. Shot communicates real storage capacity and drawer mechanism quality to a buyer comparing layouts.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background, no drawer contents, no clothing

---


<!-- ===== batch 02 ===== -->
# PRODUCT: Floor-to-Ceiling Walk-In Closet (Double-Sided)  [Residential | Closets]
target_set: white_seamless_hero, three_quarter_angle, full_room_scene, full_room_scene, hardware_detail, material_swatch_row
consistency_profile: light oak-tone HPL laminate panel faces, matte black powder-coated steel vertical supports, brushed satin-nickel hanging rods; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.

## floor-to-ceiling-closet-double-sided_white_seamless_hero
- product_ref: Floor-to-Ceiling Walk-In Closet (Double-Sided)
- shot_type: white_seamless_hero
- gallery_position: 1
- output_path: public/Images/Residential/Closets/Walk-In Closets/Floor-to-Ceiling Walk-In Closet Double-Sided/floor-to-ceiling walk-in closet double-sided 1.png
- vars: {product}="Floor-to-Ceiling Walk-In Closet (Double-Sided)" | {material}="light oak-tone HPL laminate panels, matte black steel supports" | {color}="light oak / matte black" | {ref}="floor-to-ceiling-closet-double-sided"
- consistency_profile: light oak-tone HPL laminate panel faces, matte black powder-coated steel vertical supports, brushed satin-nickel hanging rods; 4800K soft studio key, warm-ivory ground, eye-level medium-format 80mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
A floor-to-ceiling double-sided walk-in closet system, shown as a straight walkway aisle with storage panels on both left and right sides rising full height, centered on a seamless warm-ivory studio sweep, e-commerce catalog hero, eye-level medium-format 80mm looking straight down the aisle. Panel faces are light oak-tone HPL laminate with visible clean grain, separated by matte black powder-coated steel vertical support posts at each panel run, satin-nickel hanging rods on both sides loaded with a few neutral unbranded garment silhouettes, open shelving above and below. Soft large key light with gentle fill from both sides, even coverage down the full height, no harsh shadows. True light oak grain and true matte black steel color. Crisp edge-to-edge sharpness floor to ceiling. Clean negative space at the aisle's vanishing point. Shot communicates the double-sided full-height capacity at a glance. Lit with a large softbox key camera-left and a smaller fill softbox camera-right at a lower ratio, so the falloff between light and shadow is visible and gently graduated rather than perfectly even. Backdrop is a genuine white cyclorama sweep with a soft, naturally curved sweep-to-floor transition and a faint true floor shadow directly beneath the product, plus a slight optical vignette toward the frame edges from the physical lens, not a flat digital cutout. Materials show real-world imperfection: authentic wood-grain variance from panel to panel and believable specular reflections on any metal or laminate surface that shift with the studio lighting rather than reading as a uniform CGI sheen. Color response reads like true photographic film stock -- accurate but not oversaturated, with a faint, even micro-grain across the frame instead of a flawless digital-render surface.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no duplicated aisles, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no readable clothing labels, no colored background, 3D render look, CGI, videogame lighting, overly perfect symmetry

---

## floor-to-ceiling-closet-double-sided_three_quarter_angle
- product_ref: Floor-to-Ceiling Walk-In Closet (Double-Sided)
- shot_type: three_quarter_angle
- gallery_position: 2
- output_path: public/Images/Residential/Closets/Walk-In Closets/Floor-to-Ceiling Walk-In Closet Double-Sided/floor-to-ceiling walk-in closet double-sided 2.png
- vars: {product}="Floor-to-Ceiling Walk-In Closet (Double-Sided)" | {material}="light oak-tone HPL laminate panels, matte black steel supports" | {color}="light oak / matte black" | {ref}="floor-to-ceiling-closet-double-sided"
- consistency_profile: light oak-tone HPL laminate panel faces, matte black powder-coated steel vertical supports, brushed satin-nickel hanging rods; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The same floor-to-ceiling double-sided walk-in closet system at a 3/4 angle from just inside the aisle entrance, on a clean warm-ivory studio surface, 50mm, directional soft key light from upper-left revealing the full height of one panel run and a glimpse of the opposing wall. True light oak laminate grain and true matte black steel supports, satin-nickel hanging rod brackets clearly legible where they meet the steel vertical posts. Light graphite shadow falls naturally along the floor. No props beyond the closet system, minimal styling. Shot communicates full-height, double-sided construction, the key spec cue for a narrow-footprint townhome or multi-family closet.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background

---

## floor-to-ceiling-closet-double-sided_full_room_scene_condo
- product_ref: Floor-to-Ceiling Walk-In Closet (Double-Sided)
- shot_type: full_room_scene
- gallery_position: 3
- output_path: public/Images/Residential/Closets/Walk-In Closets/Floor-to-Ceiling Walk-In Closet Double-Sided/floor-to-ceiling walk-in closet double-sided 3.png
- vars: {product}="Floor-to-Ceiling Walk-In Closet (Double-Sided)" | {material}="light oak-tone HPL laminate panels, matte black steel supports" | {color}="light oak / matte black" | {ref}="floor-to-ceiling-closet-double-sided"
- consistency_profile: light oak-tone HPL laminate panel faces, matte black powder-coated steel vertical supports, brushed satin-nickel hanging rods; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The floor-to-ceiling double-sided walk-in closet system installed in a real condominium primary-suite walk-in closet, viewed from the entrance down the aisle. Room empty and faceless, no residents. Overhead ceiling light runs the length of the aisle, supplemented by soft ambient light from an out-of-frame window. True light oak laminate and matte black steel fully legible floor to ceiling. Realistic architecture: light flooring, off-white ceiling and walls at the aisle's end, a plain door frame visible at the vanishing point. System in sharp focus, room softened just enough to read as real space. Scene communicates full-height double-sided capacity fitting a real condo footprint. No people anywhere in the frame.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no generic hotel guestroom styling

---

## floor-to-ceiling-closet-double-sided_full_room_scene_townhome
- product_ref: Floor-to-Ceiling Walk-In Closet (Double-Sided)
- shot_type: full_room_scene
- gallery_position: 4
- output_path: public/Images/Residential/Closets/Walk-In Closets/Floor-to-Ceiling Walk-In Closet Double-Sided/floor-to-ceiling walk-in closet double-sided 4.png
- vars: {product}="Floor-to-Ceiling Walk-In Closet (Double-Sided)" | {material}="light oak-tone HPL laminate panels, matte black steel supports" | {color}="light oak / matte black" | {ref}="floor-to-ceiling-closet-double-sided"
- consistency_profile: light oak-tone HPL laminate panel faces, matte black powder-coated steel vertical supports, brushed satin-nickel hanging rods; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The floor-to-ceiling double-sided walk-in closet system installed in a real multi-family townhome upstairs hallway-turned-closet, a narrow architectural footprint typical of a townhome floor plan. Room empty and faceless, no residents. Natural daylight spills in from an out-of-frame stairwell window, supplemented by a single overhead fixture. True light oak laminate and matte black steel legible in sharp focus; hallway architecture (sloped ceiling section, painted trim) softly visible at the edges. Scene communicates how the double-sided system fits a real narrow townhome footprint to a builder or developer. No people anywhere in the frame.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no generic hotel guestroom styling

---

## floor-to-ceiling-closet-double-sided_hardware_detail
- product_ref: Floor-to-Ceiling Walk-In Closet (Double-Sided)
- shot_type: hardware_detail
- gallery_position: 5
- output_path: public/Images/Residential/Closets/Walk-In Closets/Floor-to-Ceiling Walk-In Closet Double-Sided/floor-to-ceiling walk-in closet double-sided 5.png
- vars: {product}="Floor-to-Ceiling Walk-In Closet (Double-Sided)" | {material}="satin-nickel hanging rod bracket, matte black steel support" | {color}="satin-nickel and matte black on light oak laminate" | {ref}="floor-to-ceiling-closet-double-sided"
- consistency_profile: light oak-tone HPL laminate panel faces, matte black powder-coated steel vertical supports, brushed satin-nickel hanging rods; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
Extreme close-up macro shot of the reinforced hanging rod bracket where a satin-nickel rod meets the matte black powder-coated steel vertical support post, with the light oak laminate panel face visible just behind. Studio macro lens, shallow depth of field, bracket and rod junction tack-sharp, laminate softly falling off in the background. Soft even key light from upper-left, true satin-nickel and true matte black steel tones, realistic machined precision and visible weld or fastener detail at the bracket. Warm-ivory backdrop consistent with the hero shot. Shot communicates structural hardware quality for a full-height system to a procurement buyer.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background

---

## floor-to-ceiling-closet-double-sided_material_swatch_row
- product_ref: Floor-to-Ceiling Walk-In Closet (Double-Sided)
- shot_type: material_swatch_row
- gallery_position: 6
- output_path: public/Images/Residential/Closets/Walk-In Closets/Floor-to-Ceiling Walk-In Closet Double-Sided/floor-to-ceiling walk-in closet double-sided 6.png
- vars: {product}="Floor-to-Ceiling Walk-In Closet (Double-Sided)" | {material}="HPL laminate finish options" | {color}="light oak, warm greige, soft white, graphite" | {ref}="floor-to-ceiling-closet-double-sided"
- consistency_profile: light oak-tone HPL laminate panel faces, matte black powder-coated steel vertical supports, brushed satin-nickel hanging rods; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
A clean horizontal row of four HPL laminate finish swatches laid flat on a warm-ivory surface, photographed from slightly above at a gentle top-down angle, 50mm. Each swatch is a rectangular laminate sample approximately 12cm x 8cm, showing four finish colorways available for the floor-to-ceiling double-sided closet system: light oak woodgrain (the primary colorway shown in the hero), warm greige, soft white, and graphite. Swatches evenly spaced, edges flat and true, no curling. Even soft overhead lighting, no harsh shadows, no reflections. True laminate color and grain on each swatch. Warm-ivory surface below, no background gradient. No text labels, no color names, no numbers baked into the image, swatch names added later as a code overlay. Shot communicates finish range to a specifying designer or property developer.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background, no curled swatch edges

---


<!-- ===== batch 03 ===== -->
# PRODUCT: Compact Walk-In Closet System for Condos  [Residential | Closets]
target_set: white_seamless_hero, three_quarter_angle, full_room_scene, full_room_scene, hardware_detail, functional_transformation
consistency_profile: soft white HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and shelf brackets, condensed single-wall footprint; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.

## compact-walk-in-closet-condos_white_seamless_hero
- product_ref: Compact Walk-In Closet System for Condos
- shot_type: white_seamless_hero
- gallery_position: 1
- output_path: public/Images/Residential/Closets/Walk-In Closets/Compact Walk-In Closet System for Condos/compact walk-in closet system for condos 1.png
- vars: {product}="Compact Walk-In Closet System for Condos" | {material}="soft white HPL laminate panels, satin-nickel hardware" | {color}="soft white" | {ref}="compact-walk-in-closet-condos"
- consistency_profile: soft white HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and shelf brackets, condensed single-wall footprint; 4800K soft studio key, warm-ivory ground, eye-level medium-format 80mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
A compact single-wall walk-in closet system, condensed footprint sized for a condo closet, centered on a seamless warm-ivory studio sweep, e-commerce catalog hero, eye-level medium-format 80mm. One straight panel run in soft white HPL laminate combines a double-hang rod zone on one side, a single-hang rod zone in the middle, and a narrow shelf tower on the other side, all in the same reduced 12-16 inch depth. Satin-nickel hanging rods hold a few neutral unbranded garment silhouettes. Soft large key light upper-left with gentle fill from the right, even coverage, no harsh shadows. True soft-white laminate color, no yellow tint, no bleach. Crisp edge-to-edge sharpness. Subtle contact shadow anchors the unit to the ground. Clean negative space, no props beyond the closet system. Shot communicates the compact, space-efficient footprint at a glance. Lit with a large softbox key camera-left and a smaller fill softbox camera-right at a lower ratio, so the falloff between light and shadow is visible and gently graduated rather than perfectly even. Backdrop is a genuine white cyclorama sweep with a soft, naturally curved sweep-to-floor transition and a faint true floor shadow directly beneath the product, plus a slight optical vignette toward the frame edges from the physical lens, not a flat digital cutout. Materials show real-world imperfection: authentic wood-grain variance from panel to panel and believable specular reflections on any metal or laminate surface that shift with the studio lighting rather than reading as a uniform CGI sheen. Color response reads like true photographic film stock -- accurate but not oversaturated, with a faint, even micro-grain across the frame instead of a flawless digital-render surface.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no readable clothing labels, no colored background, 3D render look, CGI, videogame lighting, overly perfect symmetry

---

## compact-walk-in-closet-condos_three_quarter_angle
- product_ref: Compact Walk-In Closet System for Condos
- shot_type: three_quarter_angle
- gallery_position: 2
- output_path: public/Images/Residential/Closets/Walk-In Closets/Compact Walk-In Closet System for Condos/compact walk-in closet system for condos 2.png
- vars: {product}="Compact Walk-In Closet System for Condos" | {material}="soft white HPL laminate panels, satin-nickel hardware" | {color}="soft white" | {ref}="compact-walk-in-closet-condos"
- consistency_profile: soft white HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and shelf brackets, condensed single-wall footprint; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The same compact walk-in closet system at a 3/4 front-left angle on a clean warm-ivory studio surface, 50mm, directional soft key light from upper-left revealing the reduced panel depth and the three storage zones side by side. True soft-white laminate color, satin-nickel hardware clearly legible. Light graphite shadow falls naturally to the right. No props beyond the closet system, minimal styling. Shot communicates the condensed depth and zoned layout, the key spec cue for a condo-sized closet.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background

---

## compact-walk-in-closet-condos_full_room_scene_condo
- product_ref: Compact Walk-In Closet System for Condos
- shot_type: full_room_scene
- gallery_position: 3
- output_path: public/Images/Residential/Closets/Walk-In Closets/Compact Walk-In Closet System for Condos/compact walk-in closet system for condos 3.png
- vars: {product}="Compact Walk-In Closet System for Condos" | {material}="soft white HPL laminate panels, satin-nickel hardware" | {color}="soft white" | {ref}="compact-walk-in-closet-condos"
- consistency_profile: soft white HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and shelf brackets, condensed single-wall footprint; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The compact walk-in closet system installed in a real, small condominium walk-in closet, a genuinely tight architectural footprint with the system fit against one wall and a clear walkway in front. Room empty and faceless, no residents. Soft overhead light supplemented by ambient light from an out-of-frame doorway. True soft-white laminate legible in sharp focus. Realistic architecture: light flooring, off-white walls, a visible edge of the closet door frame. System in sharp focus, room softened just enough to read as real, tight urban space. Scene communicates a realistic condo fit to a developer or unit buyer. No people anywhere in the frame.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no generic hotel guestroom styling, no oversized room

---

## compact-walk-in-closet-condos_full_room_scene_micro_unit
- product_ref: Compact Walk-In Closet System for Condos
- shot_type: full_room_scene
- gallery_position: 4
- output_path: public/Images/Residential/Closets/Walk-In Closets/Compact Walk-In Closet System for Condos/compact walk-in closet system for condos 4.png
- vars: {product}="Compact Walk-In Closet System for Condos" | {material}="soft white HPL laminate panels, satin-nickel hardware" | {color}="soft white" | {ref}="compact-walk-in-closet-condos"
- consistency_profile: soft white HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and shelf brackets, condensed single-wall footprint; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The compact walk-in closet system installed in a small multi-family micro-unit bedroom, viewed from the bedroom toward the open closet alcove built into one wall. Room empty and faceless, no residents, staged with only a plain unbranded window blind edge visible for scale. Soft daylight enters from an out-of-frame window, supplemented by warm ambient ceiling light. True soft-white laminate and satin-nickel hardware legible in sharp focus on the closet system; bedroom wall and flooring finishes softly out of focus behind. Scene communicates how the compact system fits a genuinely small leasing unit to a multi-family developer. No people anywhere in the frame.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no generic hotel guestroom styling

---

## compact-walk-in-closet-condos_hardware_detail
- product_ref: Compact Walk-In Closet System for Condos
- shot_type: hardware_detail
- gallery_position: 5
- output_path: public/Images/Residential/Closets/Walk-In Closets/Compact Walk-In Closet System for Condos/compact walk-in closet system for condos 5.png
- vars: {product}="Compact Walk-In Closet System for Condos" | {material}="satin-nickel hanging rod bracket, shelf-pin system" | {color}="satin-nickel on soft-white laminate" | {ref}="compact-walk-in-closet-condos"
- consistency_profile: soft white HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and shelf brackets, condensed single-wall footprint; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
Extreme close-up macro shot of the reduced-depth hanging rod bracket and the adjustable shelf-pin system directly above it, mounted to the soft-white HPL laminate panel of the compact closet system. Studio macro lens, shallow depth of field, bracket and shelf pins tack-sharp, laminate softly falling off in the background. Soft even key light from upper-left, true satin-nickel metal tone with realistic machined precision, true soft-white laminate surface. Warm-ivory backdrop consistent with the hero shot. Shot communicates reduced-depth hardware engineering to a procurement buyer.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background

---

## compact-walk-in-closet-condos_functional_transformation
- product_ref: Compact Walk-In Closet System for Condos
- shot_type: functional_transformation
- gallery_position: 6
- output_path: public/Images/Residential/Closets/Walk-In Closets/Compact Walk-In Closet System for Condos/compact walk-in closet system for condos 6.png
- vars: {product}="Compact Walk-In Closet System for Condos" | {material}="soft white HPL laminate panels, satin-nickel hardware" | {color}="soft white" | {ref}="compact-walk-in-closet-condos"
- consistency_profile: soft white HPL laminate panel faces on an engineered-wood carcass, brushed satin-nickel hanging rods and shelf brackets, condensed single-wall footprint; 4800K soft studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The compact walk-in closet system with its bifold or hinged closet door shown fully open beside it, revealing the complete double-hang, single-hang, and shelf-tower zones inside, on the same seamless warm-ivory studio background as the hero shot, eye-level 50mm. Door panel in a matching soft-white finish, hinged open at roughly 120 degrees to one side, showing true door-swing clearance against the condensed footprint. True soft-white laminate color consistent with the hero. Soft large key light upper-left with gentle fill, even coverage. Interior shown empty and clean, no contents. Crisp edge-to-edge sharpness. Shot communicates real door-swing clearance and full storage capacity to a buyer evaluating a tight condo closet.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background, no clothing

---


<!-- ===== batch 04 ===== -->
# PRODUCT: Luxury Dressing Room Suite with Vanity  [Residential | Closets]
target_set: white_seamless_hero, three_quarter_angle, full_room_scene, full_room_scene, hardware_detail, material_swatch_row
consistency_profile: deep espresso-tone HPL laminate cabinetry, brushed brass hardware, soft dove-grey performance-fabric bench upholstery, laminate or solid-surface vanity top; 4800K warm studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.

## luxury-dressing-room-vanity_white_seamless_hero
- product_ref: Luxury Dressing Room Suite with Vanity
- shot_type: white_seamless_hero
- gallery_position: 1
- output_path: public/Images/Residential/Closets/Walk-In Closets/Luxury Dressing Room Suite with Vanity/luxury dressing room suite with vanity 1.png
- vars: {product}="Luxury Dressing Room Suite with Vanity" | {material}="espresso-tone HPL laminate cabinetry, brass hardware, dove-grey performance-fabric bench" | {color}="deep espresso / soft dove-grey" | {ref}="luxury-dressing-room-vanity"
- consistency_profile: deep espresso-tone HPL laminate cabinetry, brushed brass hardware, soft dove-grey performance-fabric bench upholstery, laminate or solid-surface vanity top; 4800K warm studio key, warm-ivory ground, eye-level medium-format 80mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
A luxury dressing-room suite centered on a seamless warm-ivory studio sweep, e-commerce catalog hero, eye-level medium-format 80mm. A seated vanity module sits center-frame: deep espresso-tone HPL laminate cabinetry with a soft white solid-surface counter top, brushed brass-tone hardware, and an upholstered bench in soft dove-grey performance fabric tucked beneath. Perimeter hanging and shelving cabinetry in matching espresso laminate flanks both sides. Soft warm key light upper-left with gentle fill from the right, even coverage, no harsh shadows. True espresso laminate grain, true dove-grey fabric texture, true brass hardware tone. Crisp edge-to-edge sharpness. Subtle contact shadow anchors the suite to the ground. Clean negative space, no props beyond the suite itself. Shot communicates the coordinated vanity-plus-closet package at a glance. Lit with a large softbox key camera-left and a smaller fill softbox camera-right at a lower ratio, so the falloff between light and shadow is visible and gently graduated rather than perfectly even. Backdrop is a genuine white cyclorama sweep with a soft, naturally curved sweep-to-floor transition and a faint true floor shadow directly beneath the product, plus a slight optical vignette toward the frame edges from the physical lens, not a flat digital cutout. Materials show real-world imperfection: natural fabric drape with visible weight and slight wrinkle and authentic wood-grain variance from panel to panel. Color response reads like true photographic film stock -- accurate but not oversaturated, with a faint, even micro-grain across the frame instead of a flawless digital-render surface.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no mirror reflections of a camera or person, no colored background, 3D render look, CGI, videogame lighting, overly perfect symmetry

---

## luxury-dressing-room-vanity_three_quarter_angle
- product_ref: Luxury Dressing Room Suite with Vanity
- shot_type: three_quarter_angle
- gallery_position: 2
- output_path: public/Images/Residential/Closets/Walk-In Closets/Luxury Dressing Room Suite with Vanity/luxury dressing room suite with vanity 2.png
- vars: {product}="Luxury Dressing Room Suite with Vanity" | {material}="espresso-tone HPL laminate cabinetry, brass hardware, dove-grey performance-fabric bench" | {color}="deep espresso / soft dove-grey" | {ref}="luxury-dressing-room-vanity"
- consistency_profile: deep espresso-tone HPL laminate cabinetry, brushed brass hardware, soft dove-grey performance-fabric bench upholstery, laminate or solid-surface vanity top; 4800K warm studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The same luxury dressing-room suite at a 3/4 front-left angle on a clean warm-ivory studio surface, 50mm, directional soft warm key light from upper-left revealing the bench upholstery texture and the vanity counter's material. True espresso laminate grain, true dove-grey fabric weave, brushed brass hardware clearly legible on both the vanity and the flanking cabinetry. Light graphite shadow falls naturally to the right. No props beyond the suite, minimal styling. Shot communicates the full three-dimensional relationship between vanity, bench, and storage, the key spec cue for a premium primary-suite dressing room.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background

---

## luxury-dressing-room-vanity_full_room_scene_condo
- product_ref: Luxury Dressing Room Suite with Vanity
- shot_type: full_room_scene
- gallery_position: 3
- output_path: public/Images/Residential/Closets/Walk-In Closets/Luxury Dressing Room Suite with Vanity/luxury dressing room suite with vanity 3.png
- vars: {product}="Luxury Dressing Room Suite with Vanity" | {material}="espresso-tone HPL laminate cabinetry, brass hardware, dove-grey performance-fabric bench" | {color}="deep espresso / soft dove-grey" | {ref}="luxury-dressing-room-vanity"
- consistency_profile: deep espresso-tone HPL laminate cabinetry, brushed brass hardware, soft dove-grey performance-fabric bench upholstery, laminate or solid-surface vanity top; 4800K warm studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The luxury dressing-room suite installed in a real, premium condominium primary-suite closet room, empty and faceless, no residents. Warm ambient light from a statement pendant fixture above the vanity, supplemented by soft daylight from an out-of-frame window. True espresso laminate and dove-grey bench fabric fully legible. Realistic upscale architecture: engineered hardwood flooring, off-white or soft-grey painted walls, simple crown trim. Suite in sharp focus, room softened just enough to read as real premium space. Scene communicates the premium condo-suite positioning to a developer or buyer. No people anywhere in the frame.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no generic hotel guestroom styling

---

## luxury-dressing-room-vanity_full_room_scene_dressing_room
- product_ref: Luxury Dressing Room Suite with Vanity
- shot_type: full_room_scene
- gallery_position: 4
- output_path: public/Images/Residential/Closets/Walk-In Closets/Luxury Dressing Room Suite with Vanity/luxury dressing room suite with vanity 4.png
- vars: {product}="Luxury Dressing Room Suite with Vanity" | {material}="espresso-tone HPL laminate cabinetry, brass hardware, dove-grey performance-fabric bench" | {color}="deep espresso / soft dove-grey" | {ref}="luxury-dressing-room-vanity"
- consistency_profile: deep espresso-tone HPL laminate cabinetry, brushed brass hardware, soft dove-grey performance-fabric bench upholstery, laminate or solid-surface vanity top; 4800K warm studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
The luxury dressing-room suite staged as a dedicated boutique dressing room in an amenity-adjacent model residence, empty and faceless, no residents. A single unbranded freestanding full-length mirror stands beside the vanity, plain frame, no reflection details required to be legible. Warm layered lighting: a statement pendant above the vanity plus soft wall sconces flanking the mirror. True espresso laminate and dove-grey bench fabric fully legible in sharp focus; room finishes softly out of focus behind, realistic upscale flooring and wall paint. Scene communicates the finishing-room positioning of this suite to a premium multi-family developer. No people anywhere in the frame.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no generic hotel guestroom styling

---

## luxury-dressing-room-vanity_hardware_detail
- product_ref: Luxury Dressing Room Suite with Vanity
- shot_type: hardware_detail
- gallery_position: 5
- output_path: public/Images/Residential/Closets/Walk-In Closets/Luxury Dressing Room Suite with Vanity/luxury dressing room suite with vanity 5.png
- vars: {product}="Luxury Dressing Room Suite with Vanity" | {material}="brass soft-close cabinet hinge and pull" | {color}="brushed brass on espresso laminate" | {ref}="luxury-dressing-room-vanity"
- consistency_profile: deep espresso-tone HPL laminate cabinetry, brushed brass hardware, soft dove-grey performance-fabric bench upholstery, laminate or solid-surface vanity top; 4800K warm studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
Extreme close-up macro shot of the vanity module's cabinet door, partially open to reveal the soft-close hinge mechanism, with the brushed brass-tone pull in sharp focus in the foreground against the deep espresso laminate door front. Studio macro lens, shallow depth of field, hinge mechanism and pull tack-sharp, laminate grain softly falling off in the background. Soft warm key light from upper-left, true brushed-brass metal tone with realistic machined precision, true espresso laminate grain. Warm-ivory backdrop consistent with the hero shot. Shot communicates vanity hardware quality to a procurement buyer.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background

---

## luxury-dressing-room-vanity_material_swatch_row
- product_ref: Luxury Dressing Room Suite with Vanity
- shot_type: material_swatch_row
- gallery_position: 6
- output_path: public/Images/Residential/Closets/Walk-In Closets/Luxury Dressing Room Suite with Vanity/luxury dressing room suite with vanity 6.png
- vars: {product}="Luxury Dressing Room Suite with Vanity" | {material}="laminate and bench-upholstery finish options" | {color}="espresso laminate, dove-grey fabric, soft white laminate, sage performance fabric" | {ref}="luxury-dressing-room-vanity"
- consistency_profile: deep espresso-tone HPL laminate cabinetry, brushed brass hardware, soft dove-grey performance-fabric bench upholstery, laminate or solid-surface vanity top; 4800K warm studio key, warm-ivory ground, eye-level 50mm, honest commercial sharpness throughout.
- redo_of: -

PROMPT:
A clean horizontal row of four finish swatches laid flat on a warm-ivory surface, photographed from slightly above at a gentle top-down angle, 50mm: two HPL laminate swatches (deep espresso, the primary colorway shown in the hero, and soft white) and two performance-fabric swatches (dove-grey, the primary bench colorway, and soft sage), each rectangular sample approximately 12cm x 8cm. Swatches evenly spaced, edges flat and true, fabric samples with a faint woven texture, laminate samples with true grain. Even soft overhead warm lighting, no harsh shadows, no reflections. Warm-ivory surface below, no background gradient. No text labels, no color names, no numbers baked into the image, swatch names added later as a code overlay. Shot communicates the finish and upholstery range to a specifying designer or property developer.

NEGATIVE:
no people, no humans, no hands, no fingers, no human silhouettes, no faces, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter, no colored background, no curled swatch edges

---
