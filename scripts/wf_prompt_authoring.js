export const meta = {
  name: 'dmd-nonfoa-prompt-authoring',
  description: 'Author 930 photoreal product-image prompts (REDO+MISSING) into per-batch fragments via the cmo-visual eye',
  phases: [{ title: 'Author', detail: '38 cmo-visual agents, one per product batch', model: 'sonnet' }],
}

// ---- Shared house "prompt DNA" — director-authored, every agent fills per-product specifics ----
const DNA = [
'You are a cmo-visual prompt author on the DMD Furnishing marketing team (Sonnet tier, faceless image lane).',
'You write PHOTOREAL product-image prompts for a hospitality FF&E catalog. You are NOT rendering — you author text prompts a separate Codex image pipeline runs later.',
'',
'WHO BUYS THESE: hotel owner-operators, GMs, hospitality interior designers, procurement/PM. They judge spec, fit, durability (365-day guest use), brand-standard compliance, material quality. Sell the piece to that buyer, not to a magazine.',
'',
'DMD LOOK (operator-on-site realism, NOT ad-agency gloss):',
'- Photoreal, full-frame camera feel, true-to-life material color, sharp focus, honest commercial photography.',
'- Warm neutral light ~4800K, soft directional key, gentle fill, natural contact shadows.',
'- AVOID: heavy retouch, luxury bokeh, dreamy haze, HDR halos, plastic/wax sheen, oversaturation, fake glow.',
'- House camera defaults: eye-level, 50mm, ~f5.6 unless the shot type says otherwise.',
'',
'ABSOLUTE BANS in EVERY frame (put in NEGATIVE): people, humans, hands, fingers, human silhouettes, faces, mannequins; text, numbers, letters, captions, watermarks, logos, brand marks, signage; warped geometry, duplicated/extra legs, melted or distorted edges, impossible joinery, floating objects, clutter.',
'',
'CONSISTENCY (hard rule): every shot of ONE product shares the SAME material identity, color, light temperature, lens character and white balance. Derive a one-line consistency_profile per product (from its KEEP images if any, else from its name + description) and make every prompt for that product obey it.',
'',
'PER-SHOT-TYPE RECIPES (fill {product}/{material}/{color} from the real product; keep within consistency_profile):',
'- white_seamless_hero  -> {product} centered on a seamless warm-white/ivory studio sweep, e-commerce catalog hero, eye-level 50mm, soft large key upper-left + fill, true {material} texture and {color}, crisp edge-to-edge focus, subtle contact shadow, no props, clean negative space. THIS IS THE GRID THUMBNAIL.',
'- three_quarter_angle  -> {product} at a 3/4 front angle on a clean warm-ivory surface, 50mm, directional soft light revealing form and {material} grain, true {color}, light graphite shadow, minimal styling.',
'- side_profile         -> {product} in clean side elevation, neutral warm-ivory backdrop, even shadow-light, true silhouette and proportions, 50mm flat-ish perspective.',
'- low_hero_angle       -> {product} from a slightly low angle for presence/stature, warm-ivory studio, 35-50mm, directional light, grounded heavy contact shadow.',
'- top_down             -> {product} shot straight top-down on warm-ivory surface, even soft light, true {material}/{color}, plan-like clarity, no perspective distortion.',
'- texture_macro        -> extreme macro of {product} {material} surface/weave/grain, 100mm macro, raking directional light to reveal texture + durability, true {color}, shallow depth on the detail.',
'- hardware_detail      -> tight close-up of {product} functional hardware (joint, hinge, caster, handle, pull, edge band, leg-to-frame junction), 100mm, directional light, crisp craftsmanship + build-quality cue, no text.',
'- material_swatch_row  -> a clean horizontal row of the actual finish/upholstery swatches for {product} on warm-ivory, true materials, even light, NO text labels baked in (swatch names added later as a code overlay).',
'- functional_transformation -> OBJECT-ONLY depiction of the mechanism (recline / fold / stack / swivel / height-adjust / nesting), shown as the piece mid-function, warm-ivory studio, 50mm, even directional light, absolutely no hands.',
'- modular_reconfig     -> OBJECT-ONLY, the modular pieces shown in 2-3 configurations, warm-ivory studio, even light, no hands, no text.',
'- full_room_scene      -> {product} placed in a REAL, sector-appropriate interior, EMPTY and faceless, natural directional window light, photoreal, product in sharp focus, room legible but slightly soft, no people. Context by sector: Hotel->guestroom/suite/lounge/lobby; Hospital->patient room/waiting area; University->residence-hall/lecture/common room; School->classroom/library; Office->workspace/conference; Restaurant->dining room; Lobby Area->hotel-or-corporate lobby; Residential->upscale apartment living/bedroom. NEVER a generic stock living room.',
'- wide_establishing    -> wider environmental establishing frame of that same sector-appropriate room with {product} as the anchor, 24-35mm, natural light, empty + faceless.',
'- second_environment   -> a SECOND, visibly different sector-appropriate context from the first environment shot (different room/time-of-day), same realism rules.',
'- single_prop_styling  -> {product} with exactly ONE quiet styling prop (a folded white towel, a closed book, a small potted plant, a plain tray), warm-ivory studio, no people, prop supports scale + use, never dominates.',
'- vignette             -> {product} as focal point of a restrained faceless styled vignette, warm hospitality palette where natural, photoreal, editorial-but-honest, no people.',
'- dimension_diagram    -> CLEAN photoreal base for a spec shot: {product} in straight side/orthographic-feel profile on a plain neutral warm-ivory background, even near-shadowless light, true {material}/{color}, with ONE subtle real-world scale-reference object beside it (a plain folded white towel, a plain ceramic mug, or a closed neutral binder). NO numbers, NO measurement lines, NO text baked in. Dimension callouts are added later as a code overlay.',
'- footprint_plan       -> CLEAN top-down footprint of {product} on a plain neutral warm-ivory surface, even light, true material, NO grid text/numbers baked in (scale + dims added later as a code overlay).',
'- (any other type)     -> default to a clean photoreal product shot obeying the consistency_profile and all bans.',
'',
'PALETTE NOTE: DMD brand palette (warm ivory #F6F2EA, graphite ink #12161D, champagne gold #D7B676, restrained magenta #A42963) styles STUDIO backdrops and, where natural, hospitality environments. It NEVER overrides sector realism (a hospital room stays clinical/real, a classroom stays a real classroom) and NEVER recolors the actual product.',
].join('\n')

const RET = {
  type: 'object',
  additionalProperties: false,
  properties: {
    batch: { type: 'integer' },
    fragment_path: { type: 'string' },
    prompt_count: { type: 'integer' },
    products: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
  required: ['batch', 'fragment_path', 'prompt_count', 'products'],
}

const ROOT = 'C:/Users/chin/dmdfurnishingwebsite-1'

function brief(b) {
  const nn = String(b.batch).padStart(2, '0')
  const fragPath = ROOT + '/.staging-foa/reconcile/prompt_fragments/batch_' + nn + '.md'
  return [
    DNA,
    '',
    '================ YOUR BATCH ================',
    'Batch index: ' + b.batch + ' (' + b.products + ' products, ' + b.slots + ' prompts to author).',
    'Read your work-list JSON now: ' + ROOT + '/' + b.path,
    'Each product object has: ref, sector, tier, slug, description, dest_folder, target_set (ordered gallery), keep_images (web paths), slots[].',
    'Each slot has: kind (REDO|MISSING), position, shot_type, existing (REDO original web path or null), reason, image_id, output_path.',
    '',
    'STEPS:',
    '1. For every product that has keep_images, READ up to 2 of them to lock the look. On-disk path = ' + ROOT + '/public + the web path (web path starts with /Images/...). For products with no keep_images, infer material/color from the name + description.',
    '   You MAY also read a REDO slot\'s existing image to see what to improve on.',
    '2. Write a ONE-LINE consistency_profile per product (material, color, light temperature, lens character) that all its prompts obey.',
    '3. For EACH slot, in target_set/position order, author one complete self-contained prompt using the matching shot recipe. 110-190 words of concrete photoreal prose. Resolve {product}/{material}/{color} to real values for THIS product (keep the {ref}=slug for traceability).',
    '4. WRITE all of this batch\'s prompt blocks to: ' + fragPath,
    '   (overwrite if it exists; create parent dirs as needed).',
    '',
    'EXACT FRAGMENT FORMAT (Codex reads this top-to-bottom, no interpretation):',
    'For each product, first a product header:',
    '',
    '# PRODUCT: <ref>  [<sector> | <tier>]',
    'target_set: <comma-joined ordered shot_types>',
    'consistency_profile: <one line>',
    '',
    'Then, for each slot, a block:',
    '',
    '## <image_id>',
    '- product_ref: <ref>',
    '- shot_type: <shot_type>',
    '- gallery_position: <position>',
    '- output_path: public<output_path>',
    '- vars: {product}="<resolved>" | {material}="<resolved>" | {color}="<resolved>" | {ref}="<slug>"',
    '- consistency_profile: <same one line as the product header>',
    '- redo_of: <existing web path, or "-" if MISSING>',
    '',
    'PROMPT:',
    '<the full photoreal prompt prose>',
    '',
    'NEGATIVE:',
    'no people, no humans, no hands, no fingers, no human silhouettes, no faces, no mannequins, no text, no numbers, no letters, no captions, no watermarks, no logos, no brand marks, no signage, no warped geometry, no duplicated or extra legs, no melted or distorted edges, no impossible joinery, no floating objects, no plastic sheen, no oversaturation, no HDR halos, no lens flare, no clutter<plus any shot-specific negatives>',
    '',
    '---',
    '',
    'RULE-1 METADATA: end the fragment file with this exact block:',
    'skills_invoked: [gpt-image-2, json-image-brief, image-qc, visual-producer-direction, image-prompter]',
    'sops_cited: [visual/V2-shot-direction.md, visual/V3-render-prose.md, visual/V7-faceless-content-rules.md]',
    'owning_agent: cmo-visual',
    '',
    'Then RETURN the StructuredOutput object: batch=' + b.batch + ', fragment_path="' + fragPath + '", prompt_count=<count you wrote>, products=[refs], notes=<any flags>.',
    'Your prompt_count MUST equal ' + b.slots + '. Do not skip any slot.',
  ].join('\n')
}

const batches = typeof args === 'string' ? JSON.parse(args) : args
log('Authoring ' + batches.reduce((a, b) => a + b.slots, 0) + ' prompts across ' + batches.length + ' batches')

const results = await parallel(batches.map(b => () =>
  agent(brief(b), {
    label: 'author:batch_' + String(b.batch).padStart(2, '0'),
    phase: 'Author',
    model: 'sonnet',
    schema: RET,
  })
))

const ok = results.filter(Boolean)
const authored = ok.reduce((a, r) => a + (r.prompt_count || 0), 0)
log('Done: ' + ok.length + '/' + batches.length + ' batches, ' + authored + ' prompts authored')
return { batches_ok: ok.length, batches_total: batches.length, prompts_authored: authored, results: ok }
