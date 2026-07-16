/**
 * lib/product-copy-groups.js
 *
 * Per-subcategory copy groups (66 total), one entry per distinct product
 * subcategoryName from public/DMD_Website.xml (see copy-groups-manifest.json).
 * Generated 2026-07-16 from .copy-fragments/batch1.js, batch2.js, batch3.js
 * (copywriter deliverables), merged here as the single source of truth.
 *
 * Each group has the same shape as the legacy COPY_GROUPS in product-copy.js:
 *   { materials: { heading, body }, specification: { heading, body } }
 *
 * Bodies use {name} {material} {color} {subcategory} {place} tokens,
 * interpolated by lib/product-copy.js via interpolate().
 *
 * Keys are the exact subcategoryName string from the XML (e.g. "Bed Frame",
 * "Dining Chairs"). lib/product-copy.js matches case-insensitively.
 */

export const SUBCATEGORY_COPY_GROUPS = {
  "Sofa": {
    materials: {
      heading: 'Sofa construction built for years of daily seating',
      body: 'Every {name} starts with a kiln-dried hardwood or engineered frame, corner-blocked and doweled rather than stapled, because a sofa that racks after two seasons costs more than the piece itself. Seat and back cushions combine sinuous-spring or webbed suspension with high-density foam that holds its loft under repeated sitting, wrapped in {material} selected for the cleaning chemistry of the room it lives in. Legs and bases run solid wood or powder-coated metal, matched to {color} finish call-outs on the cutsheet. Seams and welts follow the design drawing exactly, piece to piece.',
    },
    specification: {
      heading: 'Sized and finished to the living-room plan',
      body: '{subcategory} pieces get specified around the room they anchor: sectional depth against the actual floor plan, arm height against the coffee table program, fabric against how the space actually gets used. DMD builds each {name} to the dimensions and {color} finish you send rather than a fixed showroom size, so a loveseat and a full sectional come off the same construction standard. Designers and property owners furnishing {place} projects send the room layout and fabric standard; we return shop drawings and yardage requirements before production starts.',
    },
  },
  "Dining Table": {
    materials: {
      heading: 'Dining table bases engineered for the everyday meal',
      body: 'A {name} takes more daily stress at the base-to-top joint than almost any other piece in the room, so DMD reinforces that connection with steel or solid-wood mounting plates rather than surface screws alone. Tops are {material}, sized to the seating count on the order, with edges sealed against spills and the daily wipe-down. {color} finish is matched across every unit in a matching-set order, including tables shipped with matching chairs or benches. Extension mechanisms, where specified, run on hardware rated for repeated opening and closing, not a one-time showroom demo.',
    },
    specification: {
      heading: 'Matched across a full dining program',
      body: 'Dining tables rarely ship alone: DMD coordinates the {subcategory} finish against chairs, benches, and sideboards ordered in the same {place} project so the whole room reads as one family rather than a mix of separately sourced pieces. We size the top to the seat count you specify and hold {color} and {material} consistent across a multi-unit order, including replacement tops years after the original run. Send your room dimensions, seat count, and finish standard and we will return shop drawings before production.',
    },
  },
  "Bed Frame": {
    materials: {
      heading: 'Platform construction rated for nightly turnover',
      body: '{name} frames come off the line in one of two families: welded steel platforms with powder-coated finishes, or engineered-wood platforms in edge-banded MDF or plywood faced in {material}. Steel units use welded corner joints and bolt-together rails sized for box-spring-free platforms; wood-panel frames are doweled and cam-locked for knock-down assembly on install day. {color} finish is confirmed against your sample before the production run starts, and platform height is coordinated to your mattress program and housekeeping clearance so nothing gets re-measured on site.',
    },
    specification: {
      heading: 'Built to the mattress program and install schedule',
      body: 'Hotel PMs and purchasing firms typically specify the {subcategory} alongside the headboard and casegoods package so heights and finishes arrive coordinated for one bed wall elevation. DMD builds each {name} to your mattress spec and target platform height, confirms {color} against the approved sample, and ships knock-down to cut freight cost on multi-unit orders. Send your mattress program, platform height, and unit count for {place} rooms and we will return shop drawings for approval before production.',
    },
  },
  "Nightstand": {
    materials: {
      heading: 'Nightstand carcasses built for the bedside, not the showroom floor',
      body: 'A {name} carries a lamp, a phone charger, and a full glass of water most nights of its service life, so DMD builds the carcass on plywood or MDF with edge-banded, moisture-sealed surfaces rather than raw particleboard. Drawer fronts and tops are finished in {material}, with {color} confirmed against your sample before production, and drawers run on full-extension, soft-close commercial slides rated for daily open-close cycles. Backs and interiors are finished, not left raw, because housekeeping and residents see every face of the piece.',
    },
    specification: {
      heading: 'Matched to the dresser and bed program',
      body: 'Nightstands are almost never ordered alone: DMD matches the {subcategory} finish to the bed frame, dresser, and wardrobe in the same {place} order so a bedroom reads as one coordinated set rather than mismatched pieces. We hold {color} and {material} consistent across a multi-unit run, size drawer counts to your storage program, and can adjust width to fit an existing wall gap during a renovation. Send your bedroom finish schedule and unit count and we will return shop drawings for approval.',
    },
  },
  "Lounge Chair": {
    materials: {
      heading: 'Lounge chair frames built for public-space duty cycles',
      body: '{name} construction starts with a kiln-dried hardwood or engineered frame, corner-blocked and sprung for years of sitting rather than a season of it. Upholstery is {material} chosen for the cleaning chemistry of {place} environments, from residential fabric wear to hospital-grade wipe-downs, layered over commercial-density foam that resists flattening. {color} is confirmed against your sample before the cutting begins, and legs or bases run solid wood or powder-coated metal to match the rest of the seating program. Replaceable cushion construction keeps the chair in service longer than a glued residential build.',
    },
    specification: {
      heading: 'Specified for the room it actually sits in',
      body: 'A {subcategory} in a living room and one in a patient room solve different problems even when the silhouette looks similar, so DMD builds the durability underneath the design to the room\'s actual use. We supply {color} and {material} to your sample, coordinate the chair against sofas or accent pieces ordered in the same project, and can build to COM (customer-supplied material) when your fabric standard is already selected. Share your fabric standard and {place} use case and we will return yardage requirements and shop drawings.',
    },
  },
  "TV Unit": {
    materials: {
      heading: 'Media console construction built around cable and heat management',
      body: 'A {name} carries more equipment weight and heat than a standard console, so DMD builds the carcass on plywood or MDF with reinforced shelf spans and rear cutouts sized to your cable and ventilation plan rather than a single generic hole. Surfaces are {material} with edge-banded, moisture-sealed fronts, and {color} is confirmed against your sample before the production run. Drawers and cabinet doors run on commercial-rated soft-close hardware, and open shelving is dadoed or mechanically fastened to hold component weight without sagging over time.',
    },
    specification: {
      heading: 'Matched to the living-room finish schedule',
      body: 'TV units get specified against the room\'s finish schedule first, screen size second: DMD matches {color} and {material} to the sofa and coffee table program in the same {place} order so the wall reads as one elevation. We size shelf openings to your equipment list and cable plan, and can adjust width and height to fit an existing wall niche during renovation without re-engineering the whole piece. Send your equipment list, room layout, and finish standard and we will return shop drawings for approval.',
    },
  },
  "Vanities": {
    materials: {
      heading: 'Vanity construction built for daily water contact',
      body: 'A {name} sits at the wettest point of a guestroom, so DMD builds the carcass on moisture-sealed plywood or MDF with {material} surfaces and edge-banded fronts that resist swelling from splashed water and daily condensation. Countertops are selected for scratch and stain resistance under makeup, hair product, and cleaning chemical contact, and drawer boxes run on full-extension, soft-close commercial slides rated for daily use. Mirror and lighting cutouts are coordinated to the electrical plan before production, so nothing gets field-modified on install day.',
    },
    specification: {
      heading: 'Coordinated with the guestroom casegoods package',
      body: 'Hotel PMs typically specify the {subcategory} alongside the nightstand, dresser, and TV panel so finishes match across the guestroom rather than arriving as a separate order. DMD builds each {name} to your room dimensions, coordinates plumbing and electrical cutouts with your MEP drawings, and returns shop drawings and finish samples before production begins. Send your unit count, finish standard, and mirror or lighting spec for {place} rooms and we will quote the full package with a production schedule.',
    },
  },
  "Dining Chairs": {
    materials: {
      heading: 'Dining chair joinery built for daily dragging and stacking',
      body: 'A {name} gets pulled out, sat in, and pushed back hundreds of times a week, so DMD builds wood-frame chairs with reinforced joinery and glued mortise joints rather than the stapled connections common in residential seating. Metal-frame versions use welded steel with powder-coat finishes that resist chair-leg scuffing on tile and hardwood alike. Upholstered seats run commercial-grade high-density foam under {material} chosen to tolerate grease, wine, and bleach-based cleaners without losing its finish over repeated cycles.',
    },
    specification: {
      heading: 'Specified to seat height and cleaning protocol',
      body: 'Restaurants and hotel breakfast areas specify {subcategory} around three things: seat height against the table program, cover count against the floor plan, and cleaning chemistry against the fabric or finish on order. DMD builds to your seat height across dining, counter, and bar programs, matches finish across chairs ordered with the same table run, and recommends attic stock from the original production so replacements match years later. Send your floor plan and fabric standard for {place} service and we will quote the full seating package.',
    },
  },
  "Dining Tables": {
    materials: {
      heading: 'Table tops and bases sized for breakfast and dinner service',
      body: '{name} units are engineered around cover count and turn time rather than a single fixed size: two-seat, four-seat, and six-seat tops share the same base construction standard so a mixed order reads as one family on the floor. Tops are {material} with sealed, edge-banded perimeters that hold up under daily bussing and cleaning chemistry, and bases use reinforced mounting plates on steel or solid-wood legs sized for the actual floor covering. Every size in the order gets the same joinery, not a scaled-down version for the smaller tops.',
    },
    specification: {
      heading: 'Sized to the floor plan and turn time',
      body: 'Restaurant and hotel breakfast programs specify {subcategory} against covers and turn time, then finish second: a room built around two-tops turns faster than one built around communal six-seaters, and DMD sizes the table mix to your floor plan rather than a stock ratio. We match finishes across the full table program so different sizes read as one scheme, and quote replacement tops from retained finish records. Send your floor plan and cover count for {place} service and we will return a full quote.',
    },
  },
  "Desk": {
    materials: {
      heading: 'Desk surfaces and frames built for daily writing and laptop use',
      body: 'A {name} pairs a {material} work surface with a powder-coated metal base or panel-end construction in edge-banded MDF, sealed at every perimeter to survive daily contact and cleaning. Executive and workstation configurations add cable management, modesty panels, and storage pedestals with full-extension, soft-close drawer hardware, while compact guestroom writing desks keep the same joinery standard at a smaller footprint. Frames are engineered to stay rigid under daily laptop and stationery load, with leg geometry adjustable to room clearances and outlet placement.',
    },
    specification: {
      heading: 'From the guestroom writing desk to the home office',
      body: 'Hotels specify the {subcategory} as part of the guestroom casegoods package, matched to the nightstand and TV panel finish; residential and home-office orders select a compact footprint that still meets daily-use durability standards. DMD builds each {name} to your room dimensions and finish schedule, coordinates outlet and cable grommet placement with your electrical plan, and ships knock-down or assembled depending on site access. Send your room layout and finish standard for {place} projects and we will return shop drawings.',
    },
  },
  "Arm Chair": {
    materials: {
      heading: 'Arm chair frames built for lobby and guestroom seating rotation',
      body: 'An {name} in a hotel setting sees a different guest almost every day, so DMD frames it on kiln-dried hardwood or engineered stock with corner-blocked joinery rather than a lighter residential build. Upholstery is {material} selected for contract-grade cleaning chemistry, layered over commercial-density foam that resists flattening under repeated, short-duration use. Legs run solid wood or powder-coated metal, matched to the finish schedule of the room set it ships with, and seams follow the design drawing so every unit in a multi-piece order looks identical.',
    },
    specification: {
      heading: 'Ordered as part of a guestroom or lobby seating set',
      body: '{subcategory} pieces rarely stand alone in a {place} project: DMD matches the {name} finish to the sofa, ottoman, or accent seating ordered in the same room package so the set reads as one scheme rather than pieces from different runs. We build to COM (customer-supplied material) or supply contract fabric options, hold finish consistent across a multi-unit hotel order, and can produce replacement units from retained records. Share your fabric standard and unit count and we will return shop drawings and yardage requirements.',
    },
  },
  "Bookshelves": {
    materials: {
      heading: 'Shelving built to hold a full load without sagging',
      body: '{name} units fail by sagging and racking long before the finish wears out, so DMD builds them with thicker substrates and tighter shelf spans than residential product. Carcasses are plywood or MDF in {material} faces with edge-banded shelf fronts; fixed shelves are dadoed or mechanically fastened, and adjustable shelves run on commercial-grade pin systems rated for full book loads rather than decorative display weight. Tall units ship with anti-tip anchoring hardware as standard, because a loaded bookshelf weighs far more than it looks like it should.',
    },
    specification: {
      heading: 'Engineered to the actual load, not the catalog default',
      body: 'Libraries specify {subcategory} to collection weight and sightline requirements; offices specify them for records and reference storage. DMD engineers shelf spans to the load you describe rather than a generic residential rating, coordinates unit heights with ceiling and window lines in your {place} space, and supplies anchoring details for the installer ahead of time. Units ship assembled or flat-packed depending on building access. Send elevation drawings or room dimensions and we will return configurations with load guidance and finish options.',
    },
  },
  "Ergonomic Chair": {
    materials: {
      heading: 'Ergonomic mechanisms built for eight-hour duty cycles',
      body: 'An {name} combines a commercial-grade tilt and height mechanism with mesh, fabric, or {material} upholstery over high-density foam selected for full-shift sitting, not an evening at home. Adjustable seat height and lumbar support are specified per order, and the base runs reinforced nylon or metal in a five-star design with casters matched to the floor surface it rolls on. Every mechanism is rated for daily commercial-duty adjustment cycles, which is the difference between a chair that holds its settings after a year of office use and one that does not.',
    },
    specification: {
      heading: 'Specified fleet-wide for consistency, not one desk at a time',
      body: 'Office managers and workplace designers specify {subcategory} across an entire floor rather than chair by chair, because one standard simplifies maintenance, spare parts, and future reorders. DMD supplies seating coordinated with the desking finish already ordered for the {place} project, quotes in volume with staged delivery matched to move-in phasing, and recommends breathable mesh for daily assigned seats versus wipeable upholstery for shared or visitor seats. Send headcount and finish standards for a fleet quote.',
    },
  },
  "Executive Desk": {
    materials: {
      heading: 'Executive desk construction for the corner office and the L-shaped floor plan',
      body: 'An {name} pairs a {material} work surface with a panel-end or metal-frame base engineered to stay rigid under the extra load an L-shaped or double-pedestal configuration carries. Storage pedestals run full-extension, soft-close drawer hardware, cable management is built into the surface rather than added after the fact, and every exposed edge is sealed against daily contact and cleaning. Modesty panels and return sections are sized to the floor plan you specify rather than a fixed showroom footprint.',
    },
    specification: {
      heading: 'Specified for the corner office, ordered in volume',
      body: 'Corporate projects specify {subcategory} floor-wide for consistent cable access and storage even when individual desk shapes vary between offices. DMD builds each unit to the room dimensions and finish schedule, coordinates grommet and power locations with your electrical plan, and ships knock-down or assembled depending on {place} site access. Provide your floor layout and finish standard and we will return shop drawings and a production timeline before the order moves to the shop.',
    },
  },
  "Head Board": {
    materials: {
      heading: 'Headboard panels built for wall-mounted daily contact',
      body: 'An {name} is built as a wall-mounted panel or full unit in {material}: edge-banded MDF with laminate or veneer faces, or upholstered panels using commercial-grade foam over engineered-wood frames with fabric, polyurethane, or leather facings. Wall-mount cleat systems keep the panel rigid through years of guest contact, and upholstered faces are specified in contract fabrics that tolerate commercial cleaning chemistry rather than a single wipe-down. Widths follow standard king, queen, and full XL mattress programs, with custom widths available for connected wallguard runs.',
    },
    specification: {
      heading: 'The bed-wall centerpiece, built to the prototype schedule',
      body: 'Designers treat the {subcategory} as the signature piece of the guestroom scheme, so DMD builds each {name} to the prototype finish schedule, matching laminate patterns, stain colors, and upholstery from the approved sample set. Hotel PMs typically order it with the bed base, nightstands, and TV panel so the entire bed wall installs as one elevation in {place} rooms. Units ship with concealed mounting hardware and templated install dimensions. Provide your bed program and brand standard and we will produce shop drawings for approval.',
    },
  },
  "Reception Desk": {
    materials: {
      heading: 'Reception desks built from architectural drawings, not a catalog page',
      body: 'A {name} is custom millwork, fabricated on plywood and MDF substrates with {material} or solid-surface faces rather than picked from a stock list. Transaction tops and service surfaces use materials rated for constant hand contact and cleaning, internal construction accommodates cable routing and equipment cutouts, and accessible-height sections are built to code where the design calls for them. Curved, straight, and glass-top configurations all share the same substrate and joinery standard underneath the visible finish.',
    },
    specification: {
      heading: 'The first thing visitors see, engineered from the design intent',
      body: 'Architects detail the {subcategory} as a one-off piece, so shop-drawing quality determines how the design survives fabrication. DMD develops shop drawings from your design intent, resolves equipment and power coordination before production starts, and field-verifies dimensions for renovation work in {place} lobbies. Hospital and office projects typically schedule this piece with the general contractor\'s millwork package so installation lands after flooring and finishes are complete. Send design drawings and equipment specs and we will return engineered shop drawings for approval.',
    },
  },
  "Accent Chairs": {
    materials: {
      heading: 'Accent chair frames built to anchor a lobby seating group',
      body: 'An {name} carries more visual weight than square footage, so DMD builds the frame on kiln-dried hardwood or welded metal with corner-blocked or welded joinery rated for public-space duty rather than occasional residential use. Upholstery is {material} over commercial-density foam, chosen for the cleaning protocol of the lobby it furnishes, and wood or metal legs are finished to match the surrounding furniture group. Every unit in a multi-chair order carries identical joinery and finish, not a hand-varying showroom build.',
    },
    specification: {
      heading: 'Grouped with the lobby\'s sofa and table program',
      body: '{subcategory} pieces get specified as part of a seating group, not alone: DMD matches the finish of the {name} to the lobby sofa and coffee table already on order for the {place} project so the grouping reads as one composition. We build to COM (customer-supplied material) or supply contract fabric, and can produce additional units later from retained finish records if the lobby seating plan expands. Share your fabric standard and layout and we will return yardage requirements and shop drawings.',
    },
  },
  "Bar Stools": {
    materials: {
      heading: 'Bar stool footrests and frames built for counter-height turnover',
      body: 'A {name} takes a different kind of wear than a dining chair: constant mounting, dismounting, and footrest contact at counter or bar height. DMD wear-plates the footrest where shoes land, welds steel frames with powder-coat finishes for swivel and fixed-base models alike, and specifies {material} upholstery over commercial-grade foam where a cushioned seat is called for. Wood-frame stools use solid hardwood with reinforced joinery rather than the glued connections common in residential bar seating.',
    },
    specification: {
      heading: 'Matched to the counter height and the seating program',
      body: 'Restaurants specify {subcategory} against counter and bar height first, finish second, since a stool built for the wrong height creates a service problem no fabric choice fixes. DMD builds to your seat height program, matches finish across stools ordered with the dining chair and table package for the same {place} location, and recommends attic stock from the original run for future replacements. Send your counter dimensions and fabric standard and we will quote the full seating package with lead times.',
    },
  },
  "Bedside Cabinet": {
    materials: {
      heading: 'Bedside cabinets built around infection-control cleaning protocol',
      body: 'A {name} is specified around disinfection first and storage second, so DMD builds the carcass in laminate-faced MDF or plywood with sealed, edge-banded surfaces that tolerate hospital-grade disinfectants rather than residential cleaning products. Tops are {material} for scratch and moisture resistance, mobile units run on locking casters for repositioning at bedside, and lockable drawers protect patient belongings without adding crevices that complicate the environmental services team\'s cleaning routine during a full patient-room turnover.',
    },
    specification: {
      heading: 'Specified to the cleaning protocol your facility already runs',
      body: 'Hospital facilities directors specify the {subcategory} to the disinfectant chemistry their environmental services team actually uses, not a generic finish palette. DMD confirms which surfaces and hardware survive your specific cleaning protocol before production, sizes each {name} to patient-room clearances and bed heights, and can adjust for bariatric requirements where the {place} program calls for it. Send your room counts and infection-control requirements and we will return compliant material options with shop drawings for approval.',
    },
  },
  "Booths": {
    materials: {
      heading: 'Booth frames built for public-assembly seating hours',
      body: 'A {name} carries continuous seating hours that a standalone chair never sees, so DMD builds booth frames from kiln-dried hardwood with reinforced back and seat structure rather than a lighter build sized for occasional use. Upholstery is {material} specified to public-assembly durability, layered over commercial-grade foam dense enough to resist compression from all-day service. Corner, double, and single-booth configurations share the same frame and joinery standard, so a mixed-size order reads as one family on the floor.',
    },
    specification: {
      heading: 'Sized to the dining layout and cover count',
      body: 'Restaurant operators specify {subcategory} against the floor plan first: corner units anchor a section, single booths fill a wall run, and DMD sizes each configuration to the actual footprint rather than a fixed catalog dimension. We match upholstery across a mixed booth-and-chair order for the same {place} dining room, and recommend fabric attic stock from the original production run. Send your floor plan and fabric standard and we will quote the full booth package with lead times.',
    },
  },
  "Buffet Counter": {
    materials: {
      heading: 'Buffet counters engineered around hot, cold, and dry service zones',
      body: 'A {name} does three different jobs depending on the zone: hot holding, refrigerated holding, or dry storage, and DMD engineers the construction to match. Cabinet interiors are moisture-sealed with clearances built for the actual equipment specified, exterior faces run {material} rated for constant guest and staff contact, and service surfaces are selected for the cleaning chemistry a breakfast buffet actually sees every morning. Equipment cutouts and power routing are resolved before production, not field-modified during install.',
    },
    specification: {
      heading: 'Built around your equipment list, not a generic buffet shape',
      body: 'Hotel breakfast programs specify {subcategory} against the actual equipment being installed, from chafing units to refrigerated wells, so DMD develops shop drawings from your equipment spec before cutting begins. We coordinate power and water rough-in locations with your MEP drawings, size the counter run to your breakfast area footprint, and schedule delivery to land with the general contractor\'s install sequence for {place} projects. Send your equipment list and floor plan and we will return engineered shop drawings for approval.',
    },
  },
  "Bunk Beds": {
    materials: {
      heading: 'Bunk bed construction built for dormitory-grade daily use',
      body: 'A {name} adds structural demands a standard bed frame never sees: full guardrails, ladder attachment points, and a top bunk that has to hold weight without flex. DMD builds bunk frames in welded steel with powder-coated finishes or engineered-wood platforms in {material}, with guardrail and ladder hardware engineered specifically for institutional use rather than adapted from a residential bunk kit. Every joint on the load path is bolted or welded, not glued, because dormitory turnover happens every August whether the frame is ready or not.',
    },
    specification: {
      heading: 'Specified to the room count and academic calendar',
      body: 'University housing and facilities teams specify {subcategory} against unit count and a fixed summer install window, so DMD plans production to the academic calendar rather than a standard commercial lead time. We ship knock-down to simplify move-in-week installation, stage deliveries by building and floor for {place} dormitory projects, and supply consistent finishes across rooms so future replacements match the original run. Send your room counts, mattress program, and install window and we will return a phased delivery plan.',
    },
  },
  "Chairs": {
    materials: {
      heading: 'Classroom chair construction built for every school day',
      body: '{name} is built on the same standard every DMD classroom chair follows: welded steel frames or one-piece molded polypropylene shells, sized to student age groups and finished to survive daily stacking, dragging, and cafeteria duty. Steel-frame chairs use powder-coated tubing with reinforced leg welds; plastic-shell chairs mold in a single impact-resistant piece with no fasteners to work loose. Desk-chair combination units add a bolted or welded work surface bracket rated for the same duty cycle as the seat. {material} construction throughout means chairs stack cleanly for floor cleaning and hold up through a full academic year without the wobble residential seating develops.',
    },
    specification: {
      heading: 'Specified by classroom counts, not by catalog page',
      body: 'School districts and campus facilities teams order {subcategory} by the room, matching seat height to grade level and stacking footprint to storage closets sized years before the current enrollment. DMD builds {name} to your grade-band height standard and finishes classroom runs to match across a building so replacement units purchased later still fit the set. Because summer is the only real installation window, we plan production against your school calendar rather than a generic lead time. Send enrollment counts, room list, and target delivery week and we will return a phased production plan.',
    },
  },
  "Coffee Tables": {
    materials: {
      heading: 'Lobby coffee table construction rated for constant guest contact',
      body: '{name} pairs a top material chosen for the lobby\'s traffic pattern, tempered glass, wood veneer, or laminate, with a base engineered for stability under bags, laptops, and the occasional guest who sits on the edge. Glass tops are tempered and edge-polished; wood and laminate tops use sealed, edge-banded perimeters that tolerate spilled coffee and daily wipe-downs. Bases are welded steel or solid-wood joinery sized to the tabletop footprint, not scaled down from a residential frame. {material} selection follows the same cleaning-chemistry standard as the rest of the lobby furniture package, so replacement tops match years into the property\'s life.',
    },
    specification: {
      heading: 'Matched to the lobby seating program, not sold alone',
      body: 'Hotel and office lobbies specify {subcategory} alongside sofas and accent chairs so finishes and heights read as one arrangement rather than mismatched pieces bought separately. DMD sizes {name} to the seating layout you send, coordinates the finish with lounge upholstery and wood tones already on order, and ships knock-down where loading dock access is tight. Because lobby furniture takes the first impression a guest forms, we confirm shop drawings before production rather than shipping stock dimensions. Send your seating plan and finish standard and we will quote the matched table program.',
    },
  },
  "Executive Chair": {
    materials: {
      heading: 'Executive chair mechanisms and upholstery built for full-shift use',
      body: '{name} uses a heavy-duty pneumatic or synchro-tilt mechanism rated for daily executive-office duty cycles, not the lighter mechanisms found in general task seating. High-back and mid-back profiles are built over steel or reinforced-nylon frames, upholstered in leather, polyurethane, or performance fabric over high-density foam that keeps its shape through years of full-day sitting. Padded arms adjust to desk height, and the base runs on casters matched to hard floors or carpet tile. {material} choices are confirmed against the rest of the office furniture package so the executive suite reads as one finish standard.',
    },
    specification: {
      heading: 'Specified as the anchor piece of the executive office',
      body: 'Facilities managers and office designers specify {subcategory} to set the finish and quality bar the rest of the workstation package follows, so DMD builds {name} to the same upholstery and wood-tone standard as the surrounding casegoods. We supply single units for a corner office or fleet quantities for a full executive floor, with consistent mechanism specifications so replacement parts stay interchangeable. Send your seat count, upholstery standard, and desk program and we will return chair options with lead times attached.',
    },
  },
  "Food Service Cabinets": {
    materials: {
      heading: 'Heated, refrigerated, and dry-storage cabinet construction for breakfast service',
      body: '{name} is built to the temperature and moisture demands of hotel breakfast service: dry-storage cabinets use moisture-sealed, edge-banded laminate carcasses; heated and refrigerated units add insulated panel construction and commercial-rated components engineered for continuous cycling, not intermittent home use. Exterior faces match the breakfast area\'s HPL or laminate finish schedule, while interiors are sealed and finished for the spills and steam a working buffet line generates. Hardware and hinges are contract-rated for the open-close frequency of daily service. {material} selection balances the finish program against the equipment\'s actual duty cycle.',
    },
    specification: {
      heading: 'Specified with the buffet line, not as a standalone appliance',
      body: 'Hotel operators and food-service consultants specify {subcategory} as part of the breakfast area\'s full buffet package, coordinating cabinet width and finish with the counters and serving stations around it. DMD builds {name} to the equipment cutouts, power, and ventilation your kitchen consultant specifies, and matches exterior finishes to the rest of the breakfast area. Because equipment specifications vary by manufacturer, we confirm dimensions and clearances before production rather than assuming a standard footprint. Send your equipment spec sheet and floor plan and we will return engineered shop drawings.',
    },
  },
  "Lobby Sofa": {
    materials: {
      heading: 'Lobby sofa frames and upholstery built for continuous public use',
      body: '{name} is constructed on a kiln-dried hardwood or engineered frame with corner-blocked joinery and sinuous-spring suspension sized for guests sitting down and standing up hundreds of times a week, not the occasional residential use a frame is otherwise built for. Seat and back cushions use commercial-grade high-density foam that resists the permanent compression lobby seating takes on. Face fabrics are contract-rated performance wovens, vinyl, or COM (customer-supplied material) selected for the lobby cleaning protocol, and exposed legs are solid wood or powder-coated metal matched to the room finish schedule. {material} choices carry through 2-seat, 3-seat, and sectional configurations as one family.',
    },
    specification: {
      heading: 'Sized to the arrival experience, not picked from a catalog',
      body: 'Hotel owners and interior designers specify {subcategory} as the centerpiece of the arrival sequence, so DMD builds {name} to the exact footprint your lobby furniture plan calls for, from a compact two-seater to a full sectional. We match upholstery and wood tones across the whole lobby seating group so sofas, accent chairs, and coffee tables read as one designed arrangement. COM fabric or our contract fabric program both work; either way we confirm yardage and finish before cutting begins. Send your floor plan and fabric standard for a full seating quote.',
    },
  },
  "Magazine Table": {
    materials: {
      heading: 'Waiting-area side table construction for continuous public contact',
      body: '{name} is built for the wear pattern of a waiting room: constant handling, magazines and clipboards set down and picked up, and disinfectant wipe-downs between patients. Glass tops are tempered and edge-polished; metal tables use welded steel frames with powder-coat finishes; wood tables use sealed, edge-banded tops that resist moisture rings. Bases are weighted or widened for stability in high-traffic aisles where a narrow residential base would tip. {material} selection is chosen for the facility cleaning chemistry first and appearance second, because a table that cannot be disinfected does not belong in a clinical waiting area.',
    },
    specification: {
      heading: 'Specified around cleaning protocol and occupancy, not style',
      body: 'Hospitals and clinics specify {subcategory} to match the disinfectant regimen their environmental services team already runs, so DMD builds {name} in materials confirmed against that cleaning chemistry before production starts. We coordinate table height and footprint with the waiting-room seating plan so aisles stay code-compliant, and match finishes across the full waiting-area furniture package. Facilities teams typically order these alongside waiting chairs on one purchase order. Send your infection-control requirements and floor plan and we will return material options with shop drawings for approval.',
    },
  },
  "Night Stand": {
    materials: {
      heading: 'Guest-room nightstand construction built for daily housekeeping turnover',
      body: '{name} is built on a plywood or MDF carcass faced in high-pressure laminate (HPL) or wood veneer, with edge-banded, moisture-sealed surfaces on every exposed face, including the back and underside housekeeping sees during turndown. Drawer boxes run on full-extension, soft-close commercial slides rated for the open-close cycles a guest room sees over years of turnover, and open-shelf configurations use reinforced shelf supports rather than pin-and-hole hardware that loosens under repeated cleaning-cart contact. {material} finish is matched to the headboard and bed base so the whole sleep-wall reads as one coordinated elevation.',
    },
    specification: {
      heading: 'Ordered with the bed package, not as a loose item',
      body: 'Hotel purchasing teams and PMs specify {subcategory} alongside the bed frame, headboard, and TV panel so the guestroom\'s sleep wall installs as one finish family rather than mismatched pieces. DMD builds {name} to your case-good finish schedule and drawer configuration, whether single-drawer, double-drawer, or open-shelf, and coordinates outlet and USB cutouts with your electrical plan where the design calls for them. Units ship knock-down to reduce freight on multi-room renovations. Send your room count, bed program, and finish standard and we will return shop drawings for approval.',
    },
  },
  "Outdoor Chairs": {
    materials: {
      heading: 'Outdoor chair frames built for sun, rain, and seasonal storage',
      body: '{name} is constructed from powder-coated aluminum or steel, UV-stabilized molded polypropylene, or synthetic wicker over a corrosion-resistant frame, chosen for the property\'s actual climate exposure rather than showroom conditions. Fasteners are stainless or coated to prevent the rust streaking that ruins an otherwise sound frame, and any cushioned versions use quick-dry foam with solution-dyed outdoor fabric. Stacking geometry is built into the frame so chairs store flat between seasons without a separate storage rack. {material} selection is confirmed against your climate and season length before production, not assumed from the finish photo.',
    },
    specification: {
      heading: 'Specified for revenue seating, not decoration',
      body: 'Restaurant and hotel operators treat outdoor seating as revenue square footage, so a chair that fades or corrodes mid-season costs covers, not just a replacement line item. DMD specifies {name} to your climate conditions and expected season length, and can match {subcategory} finishes to your indoor seating scheme when the concept calls for visual continuity between dining rooms. Stackable designs simplify off-season storage for properties that close outdoor seating in winter. Send your patio layout, climate, and season length and we will recommend a package with appropriate material ratings.',
    },
  },
  "Overbed Table": {
    materials: {
      heading: 'Overbed table mechanisms built for bedside clinical use',
      body: '{name} pairs a laminate-faced, moisture-sealed tabletop with a height-adjustable steel column and a wide, weighted base engineered to roll under a hospital bed without tipping under a patient\'s weight. Adjustable models use a locking gas-spring or crank mechanism rated for repeated daily height changes; fixed and rolling configurations use reinforced steel tubing with locking casters for bedside stability. Tabletop edges are sealed and rounded to tolerate hospital-grade disinfectants without delaminating. {material} choices prioritize infection-control performance over decorative finish, since this surface gets wiped down between every patient interaction.',
    },
    specification: {
      heading: 'Specified to the cleaning protocol before the finish palette',
      body: 'Hospital facilities directors and clinical planners specify {subcategory} against their environmental services disinfectant list first, then the design palette, so DMD confirms {name} materials survive the exact cleaning chemistry your unit uses before finishing production. Height range and base clearance are built to your bed program and patient population, including bariatric requirements where the unit calls for them. We supply consistent mechanisms across a full patient-room order so maintenance and spare parts stay standardized. Send your bed program and infection-control requirements and we will return compliant material options.',
    },
  },
  "Patio Tables": {
    materials: {
      heading: 'Outdoor table construction for seasonal exposure, not indoor tables outside',
      body: '{name} uses tops in tempered glass, weather-sealed wood, or HPL laminate mounted on powder-coated aluminum or steel bases engineered for wind resistance and freeze-thaw cycling, not a residential base moved outdoors. Fasteners and hardware are stainless or corrosion-coated, glass edges are polished and tempered for safety, and umbrella-ready models integrate a reinforced center hole and locking collar rather than a drilled afterthought. Base weight is calculated to the tabletop size so tables stay stable in open-air seating without sandbags or clamps. {material} choices are matched to your climate before the order ships.',
    },
    specification: {
      heading: 'Sized to covers and turn time on the outdoor floor',
      body: 'Restaurant and hotel operators specify {subcategory} around cover counts and turn time the same way they specify indoor tables, with the added constraint of weather durability and stacking for off-season storage. DMD sizes {name} to your patio floor plan, matches finishes across two-tops and communal configurations so the outdoor floor reads as one family, and confirms base stability for your specific site exposure. Send your patio layout, seat counts, and climate conditions and we will quote the full outdoor table package with lead times.',
    },
  },
  "Podium": {
    materials: {
      heading: 'Lecture podium construction built for daily campus use',
      body: '{name} is built as freestanding millwork on a plywood or MDF substrate faced in laminate, wood veneer, or solid wood, with a sloped reading surface, internal shelving for notes and equipment, and a base wide enough to stay stable when a presenter leans on it. Smart podium configurations add reinforced cable routing and equipment cutouts engineered around your AV integrator\'s spec sheet rather than a generic opening. Edges and corners are finished to tolerate the bumps a podium takes moving between rooms. {material} finish is matched to the lecture hall\'s millwork and casegood palette.',
    },
    specification: {
      heading: 'Specified by AV requirements as much as by finish',
      body: 'University facilities teams and campus planners specify {subcategory} around the AV equipment it needs to house, so DMD coordinates {name} cable routing, power access, and equipment cutouts with your integrator\'s drawings before production starts. We build fixed lecture-hall podiums and portable classroom versions from the same construction standard, finished to match the room\'s casegood palette. Because podiums move between spaces more than most classroom furniture, we reinforce base and caster hardware for that duty cycle. Send your AV spec sheet and room list and we will return engineered shop drawings.',
    },
  },
  "Reading Chairs": {
    materials: {
      heading: 'Library reading chair and bean bag construction for extended sitting',
      body: '{name} is built for hours-long sitting rather than brief use: upholstered reading armchairs use commercial-grade high-density foam over a hardwood or engineered frame with corner-blocked joinery, finished in contract-rated fabric that tolerates constant handling and occasional spills. Bean bag and soft-seating configurations use double-stitched, heavy-duty outer shells over commercial fill rated to hold its shape under repeated compression rather than flattening after a semester of use. Wood-frame armchairs are joined with the same durability standard as DMD lounge seating line. {material} selection follows the library cleaning protocol and the reading room design palette together.',
    },
    specification: {
      heading: 'Specified for library and reading-room dwell time',
      body: 'Schools and public libraries specify {subcategory} around dwell time and cleaning frequency rather than turnover speed, since students and patrons sit in reading areas for hours at a stretch. DMD builds {name} to the library fabric and finish standard, supplies mixed configurations, armchairs, bean bags, upholstered chairs, on one purchase order, and confirms fabric performance against the space cleaning protocol before production. Reading rooms typically reorder in small batches as collections grow, so we retain finish records for exact future matches. Send your room layout and fabric standard for a quote.',
    },
  },
  "Recliner Chair": {
    materials: {
      heading: 'Patient recliner mechanisms and upholstery built for clinical duty',
      body: '{name} combines a reinforced steel or hardwood frame with a manual or electric reclining mechanism rated for the daily position changes a patient room requires, not the occasional-use mechanism found in residential recliners. Upholstery uses healthcare-rated vinyl or polyurethane over commercial foam, with crevice-minimizing seams that simplify cleaning between patients and resist the disinfectants environmental services teams apply repeatedly. Electric models use a locking motor and control pendant engineered for clinical reliability; manual models use a reinforced ratchet mechanism. {material} selection is confirmed against your infection-control protocol before the chair is finished.',
    },
    specification: {
      heading: 'Specified by clinical planners around cleaning chemistry',
      body: 'Hospital facilities directors specify {subcategory} against the environmental services disinfectant list first and comfort features second, so DMD confirms {name} upholstery and seam construction survive your unit\'s exact cleaning chemistry before production. Electric and manual mechanisms are available across the same frame family so a floor can standardize on one maintenance profile. We size recliners to patient room clearances and can accommodate bariatric requirements where the unit specifies them. Send your infection-control requirements and room counts and we will return compliant material options with shop drawings.',
    },
  },
  "Student Desks": {
    materials: {
      heading: 'Student desk construction built for daily classroom impact',
      body: '{name} is built on a welded steel frame with a powder-coat finish and a work surface in high-pressure laminate (HPL) over an MDF or plywood core with impact-resistant edge banding, engineered for the daily bumps, dragging, and pencil-gouging a classroom desk actually takes. Adjustable-height models use a locking mechanism rated for repeated seasonal readjustment as students grow, and double-desk configurations reinforce the shared support leg for two students\' worth of daily load. Bookbox or shelf storage underneath is finished to the same standard as the top surface. {material} choices are confirmed against your district\'s replacement and maintenance standard.',
    },
    specification: {
      heading: 'Specified in volume against the summer install window',
      body: 'School districts specify {subcategory} in volume, ordering by grade-level height standard and matching finishes across a building so replacements bought years later still fit the room. DMD plans {name} production against the academic calendar, since summer is the only realistic install window most districts have, and stages deliveries by building and floor to match your facilities team\'s sequencing. Adjustable and fixed-height models ship from the same production run. Send enrollment counts, room schedules, and your install window and we will return a phased delivery plan.',
    },
  },
  "Study Desks": {
    materials: {
      heading: 'Dormitory study desk construction built for repeated reconfiguration',
      body: '{name} uses a laminate or wood-veneer work surface on a steel or panel-end base, edge-banded and moisture-sealed on every exposed edge to tolerate the daily use a dorm room desk sees over a four-year lifespan. Wall-mounted configurations use reinforced cleat systems rated for the weight of a laptop, monitor, and stacked textbooks; freestanding single and double desks use the same commercial-grade joinery as DMD\'s office desk line, scaled to a residence-hall footprint. Cable grommets and outlet cutouts are positioned to the room\'s actual electrical plan rather than a generic desk template. {material} finish matches the wardrobe and bed frame in the same room package.',
    },
    specification: {
      heading: 'Specified with the full dorm-room casegood package',
      body: 'University housing departments specify {subcategory} alongside the bed frame and wardrobe so a residence-hall room installs as one coordinated finish package rather than separately sourced pieces. DMD builds {name} to your room dimensions and footprint constraints, whether single, double, or wall-mounted, and stages production against your summer turnover and renovation schedule. Because dorm rooms reconfigure between academic years, we build to a durability standard beyond typical office furniture. Send your unit count, room dimensions, and finish standard and we will quote the full package.',
    },
  },
  "Study Tables": {
    materials: {
      heading: 'Library study table construction for group and solo use',
      body: '{name} is built with a laminate, wood-veneer, or solid-wood top on a steel or hardwood base engineered for the load of stacked books, laptops, and constant repositioning across a library floor. Carrel-style single-study units add privacy panels in the same edge-banded, moisture-sealed material as the tabletop, while group study tables reinforce the center support for the wider spans a communal table requires. Edges are sealed against the scuffs and moisture rings daily library use produces. {material} selection is matched across carrels, group tables, and single tables so a reading room reads as one furniture family.',
    },
    specification: {
      heading: 'Specified for collection layout and quiet-zone planning',
      body: 'Schools and university libraries specify {subcategory} around room layout and noise zoning, mixing group tables in collaborative areas with carrels in quiet zones on one coordinated order. DMD builds {name} to your floor plan and finish standard, and can adjust table footprint to fit stacks-adjacent spaces without re-engineering the whole program. Facilities teams typically reorder individual units as furniture ages rather than replacing a full room at once, so we retain finish records for exact matches. Send your room layout and elevation drawings and we will return configuration options.',
    },
  },
  "Teacher Desk": {
    materials: {
      heading: 'Teacher desk construction built for classroom command and storage',
      body: '{name} pairs a laminate or wood-finish work surface with a steel or wood-panel base that includes locking storage for materials and personal items, built to the same daily-impact standard as the surrounding classroom furniture. Metal-frame desks use welded steel with a powder-coat finish; wood desks use edge-banded, moisture-sealed panels; portable configurations add locking casters rated for regular room-to-room moves. Drawer hardware is contract-rated for the open-close cycles a working classroom desk sees across a school year. {material} finish is matched to the student desks in the same room for a consistent classroom appearance.',
    },
    specification: {
      heading: 'Specified alongside the student desk order, not separately',
      body: 'Districts typically specify {subcategory} on the same purchase order as student desks so the classroom reads as one finish standard rather than a mismatched teacher station. DMD builds {name} to your room schedule, whether fixed, mobile, or portable, and coordinates locking storage requirements with your facilities team\'s security standard. Because teacher desks move between rooms more often than student furniture, we build casters and hardware for that duty cycle. Send your room list, finish standard, and mobility requirements and we will return a production and delivery plan.',
    },
  },
  "Tiered Seating": {
    materials: {
      heading: 'Tiered and auditorium seating engineered for fixed installation',
      body: '{name} is built on a structural steel frame engineered for code-compliant floor or riser anchoring, with seat surfaces in cleanable polypropylene, upholstered vinyl, or contract fabric over commercial foam depending on the lecture hall\'s use pattern. Fixed configurations bolt permanently to the riser; movable and cushioned configurations use the same frame family with hardware rated for occasional reconfiguration between event layouts. Row spacing and sightline geometry follow the architect\'s drawing rather than a stock module, and every joint is engineered for the load of continuous public assembly. {material} selection balances comfort against the cleaning and durability standard of a lecture hall.',
    },
    specification: {
      heading: 'Specified by sightlines and code, not by seat style',
      body: 'University facilities teams and architects specify {subcategory} around sightlines, row spacing, and code-compliant anchoring, coordinating those constraints directly with DMD before {name} goes into production. We supply fixed, movable, and cushioned configurations from one engineering standard so a lecture hall can mix seating types across sections without a mismatched frame underneath. Anchoring hardware and installation details are confirmed with your general contractor\'s structural drawings. Send your room layout, expected occupancy, and code requirements and we will return a seating plan with product options.',
    },
  },
  "Visitor Chairs": {
    materials: {
      heading: 'Office visitor chair construction for daily guest-facing use',
      body: '{name} is built on a welded steel or reinforced-nylon frame with padded, plastic, or stackable seat construction depending on how the space actually gets used, waiting areas favor stackable and cleanable surfaces, while executive-adjacent visitor seating uses padded upholstery matched to the office finish schedule. Frames are engineered for the sit-down, stand-up frequency of guest seating rather than the sustained-use mechanisms built into task chairs. Stackable models nest cleanly for storage between meetings or events. {material} choices are confirmed against the space\'s cleaning frequency and the surrounding furniture\'s finish standard.',
    },
    specification: {
      heading: 'Specified fleet-wide for consistency, not chair by chair',
      body: 'Office managers and facilities teams specify {subcategory} across a floor or building for consistency in maintenance and spare parts, so DMD supplies {name} in volume with one frame and upholstery standard rather than mixed one-off orders. Padded, plastic, and stackable configurations are available from the same production run, letting a facilities team match seating type to each space traffic pattern. We coordinate finish with the desking and task-seating package already on order. Send your headcount, space list, and finish standard for a fleet quote.',
    },
  },
  "Waiting Chairs": {
    materials: {
      heading: 'High-occupancy waiting chair construction for hospitals and clinics',
      body: '{name} is built on a welded steel frame with a powder-coat finish and seat surfaces in cleanable polypropylene, upholstered vinyl, or contract fabric, engineered for constant, unsupervised use by patients and visitors who cycle through a waiting room all day. Linked and ganged configurations keep rows aligned and simplify floor cleaning between patients, while plastic and upholstered single-seat versions stack for storage during off-hours or events. Every surface is selected to tolerate the disinfectant wipe-downs a healthcare waiting area requires. {material} choices default to non-porous, wipeable options unless your facility specifies otherwise.',
    },
    specification: {
      heading: 'Specified around occupancy counts and cleaning protocol',
      body: 'Hospitals and clinics specify {subcategory} against expected occupancy and their environmental services disinfectant list, and DMD coordinates {name} seat counts and configuration, linked, plastic, or upholstered, to your exact floor plan before production. Ganging and anchoring hardware ship with linked configurations so rows install straight and stay code-compliant. For healthcare waiting areas we default to non-porous surfaces unless the design calls for something else. Send your room layout and expected occupancy and we will return a seating plan with product options and lead times.',
    },
  },
  "Wardrobes": {
    materials: {
      heading: 'Dormitory wardrobe construction built for repeated student turnover',
      body: '{name} is built on a plywood or MDF carcass faced in laminate or wood veneer, with edge-banded, moisture-sealed surfaces on every exposed face including the interior a student sees every day. Sliding-door configurations run on reinforced tracks rated for the daily open-close cycles of shared housing, while hinged two-door and three-door units use contract-rated hinges sized for repeated slamming rather than gentle residential use. Interior shelving and hanging rods sit on reinforced brackets, and units are built to survive the move-in, move-out cycle every residence hall repeats each year. {material} finish matches the study desk and bed frame in the same room.',
    },
    specification: {
      heading: 'Specified with the full dormitory casegood package',
      body: 'University housing departments specify {subcategory} alongside the study desk and bed frame so a dorm room installs as one coordinated finish package, and DMD builds {name} to the unit count and configuration, two-door, three-door, or sliding, your housing plan calls for. Production is staged against the summer turnover window most campuses depend on for renovation and replacement work. Because residence halls see heavier daily use than typical bedroom furniture, we build to a duty cycle beyond standard casegoods. Send your unit count, room dimensions, and finish standard and we will quote the full package.',
    },
  },
  "Coffee Table": {
    materials: {
      heading: 'Residential coffee table construction, built to our contract-line standard',
      body: '{name} uses a top in glass, solid wood, or wood veneer over a hardwood or engineered-wood base, joined with the same edge-banding and moisture-sealing DMD applies to its hospitality casegoods, not a lighter residential-only construction. Glass tops are tempered and edge-polished for safety in a family living room; wood tops use sealed finishes that tolerate daily coasters, remotes, and foot traffic. Base joinery is doweled or mechanically fastened rather than glued, so the piece holds up under years of everyday living-room use. {material} selection is confirmed against your living-room finish scheme before production.',
    },
    specification: {
      heading: 'Sized and finished to the room, not the showroom floor',
      body: 'Multi-family developers and interior designers specify {subcategory} to match the living-room furniture package in a model unit or full building rollout, and DMD builds {name} to the footprint and finish standard your project calls for. We size tops to the seating arrangement so the table reads proportionate to the sofa and chairs around it, and match wood tones or glass detailing across the full living-room program. Send your room layout and finish standard and we will quote the table as part of the larger residential package.',
    },
  },
  "Dining Chair": {
    materials: {
      heading: 'Dining chair construction built to outlast daily meals',
      body: 'A {name} starts with the joint that fails first on cheap dining seating: the seat-to-leg connection. DMD frames use doweled and glued hardwood joinery or welded metal legs rather than the screwed butt joints common on stapled-together imports, so the chair stays tight through years of pulling out, sitting down, and pushing back in. Seats are either solid wood, upholstered over commercial-grade foam, or a wood-and-upholstery hybrid, built from {material} selected for the wear a dining chair actually takes. Finishes match across a set so every chair at the table reads as one piece.',
    },
    specification: {
      heading: 'Sized and finished to the table it sits at',
      body: 'A {name} is specified alongside the dining table it serves, so seat height, arm clearance, and finish are set to that table rather than picked in isolation. Send the table dimensions and finish sample; DMD confirms seat height and produces the set to match. Because the chair is built to order, quantities can run from a single replacement to a full dining set without re-tooling. Provide your table specs and finish standard and we will confirm the chair profile before production starts.',
    },
  },
  "Lecture Desks": {
    materials: {
      heading: 'Attached desk-chair units engineered for lecture hall rows',
      body: 'A {name} combines a fixed or folding writing surface with an integrated seat on one welded steel frame, built so the connection between desk and chair does not loosen under the daily stand-sit cycle of a full lecture hall. Work surfaces are {material} over a moisture-sealed core, sized for a laptop and notebook rather than a full workstation. Frames anchor to the floor in fixed rows or move on request for flat-floor rooms, and every exposed edge is finished to survive years of bag straps, elbows, and foot traffic.',
    },
    specification: {
      heading: 'Specified by facilities teams against row counts, not single-unit orders',
      body: 'University facilities offices and architects specify lecture desks by row count and sightline, coordinating unit spacing with the room drawing rather than ordering pieces one at a time. DMD builds to the room plan you provide, staging production and delivery around the academic calendar so installation lands during a break window. Fixed and movable configurations can be mixed within the same room order. Send your seat count, row layout, and finish standard and we will return a phased delivery plan.',
    },
  },
  "Writing Desk": {
    materials: {
      heading: 'Compact desk construction for home offices and workstations',
      body: 'A {name} pairs a laminate or veneer top with a metal or wood-panel leg structure, built with the same edge-banded, sealed-surface standard DMD applies to full executive desks, just at a smaller footprint. Tops are {material}, chosen for daily contact and easy cleaning, with sealed perimeters that resist chipping at the corners where a desk actually takes abuse. Leg assemblies bolt together for straightforward delivery and setup, and cable routing can be added where the workstation needs it.',
    },
    specification: {
      heading: 'Right-sized for rooms where floor space is the constraint',
      body: 'A {name} is typically specified for home offices, guest room workstations, or compact office layouts where a full executive desk will not fit the footprint. DMD builds each unit to the leg style, top finish, and dimensions you confirm, so a small order still gets the same shop-drawing process as a large one. Send the room dimensions and finish sample; we return a production timeline before the order is confirmed.',
    },
  },
  "Amenity Tower": {
    materials: {
      heading: 'Guestroom amenity storage built into the casegoods package',
      body: 'A {name} is a compact vertical casegood, built on a plywood or MDF carcass faced in {material}, with edge-banded, moisture-sealed surfaces on every exposed face, matching the construction standard of the nightstand and dresser it ships alongside. Interior shelving holds coffee service, ice buckets, or minibar equipment depending on the brand program, and drawers or doors run on commercial-rated hardware sized for daily housekeeping access. Finish and hardware match the rest of the guestroom casegoods run so the room reads as one coordinated scheme.',
    },
    specification: {
      heading: 'Ordered as part of the guestroom casegoods set, not alone',
      body: 'Hotel project managers specify the amenity tower with the nightstand, dresser, and TV panel so finishes and hardware match across the room. DMD builds the interior configuration to your brand standard, whether that means a coffee station, minibar clearance, or open shelving, and coordinates dimensions with the electrical and plumbing rough-in where equipment is involved. Send your amenity program and finish schedule and we will return shop drawings for approval before production.',
    },
  },
  "Bar Stool": {
    materials: {
      heading: 'Counter-height stool construction for daily kitchen use',
      body: 'A {name} is built on a steel or solid-wood frame reinforced at the footrest, the point where residential stools usually loosen first under repeated foot contact. Seats are {material}, upholstered over commercial-grade foam or finished in sealed wood, and swivel or fixed base options are engineered so the connection to the frame stays tight through daily use. Height is set to standard counter or bar dimensions, with custom heights available where the counter runs outside the norm.',
    },
    specification: {
      heading: 'Matched to the counter it sits at',
      body: 'A {name} is ordered against the counter height and finish it will sit beside, so send the counter dimensions and material sample before DMD confirms the stool profile. Because each stool is built to order, finish and upholstery can be matched to existing kitchen or bar cabinetry rather than picked from a fixed catalog run. Provide your counter height and finish standard and we will confirm the build before production, whether it replaces one stool or a full set.',
    },
  },
  "Bookcase": {
    materials: {
      heading: 'Home-office bookcase built to hold real book weight',
      body: 'A {name} is built on a plywood or MDF carcass with {material} faces and edge-banded shelf fronts, using the same span and joinery standard DMD applies to library shelving, because a fully loaded bookcase carries more weight than its size suggests. Shelves are fixed or adjustable on commercial-grade pin systems, and tall units ship with anti-tip anchoring hardware as standard. Finish is color-matched to the room or to adjacent casegoods on request.',
    },
    specification: {
      heading: 'Sized to the room and the collection it will hold',
      body: 'A {name} is specified against the actual wall dimensions and expected book load rather than a stock size, since a home office or den often has a specific footprint to fill. DMD engineers shelf spacing to the load you describe and confirms height against ceiling and window lines before production. Anchoring hardware ships with every tall unit as standard, not an optional add-on. Send your room dimensions and finish standard and we will return a configuration with load guidance.',
    },
  },
  "Bunk Bed": {
    materials: {
      heading: 'Kids bunk bed construction built around guardrail safety',
      body: 'A {name} is built on a solid-wood or engineered-wood frame with reinforced guardrails and ladder attachment points engineered to the same duty-cycle standard DMD uses on dormitory bunk beds, because a kids bunk bed takes climbing and jumping that a standard bed frame never sees. Frames use {material} with sanded, sealed edges and rounded corners, and every joint is doweled or bolted rather than glued for a connection that stays tight over years of active use.',
    },
    specification: {
      heading: 'Built to the mattress size and room the family already has',
      body: 'A {name} is specified against the mattress sizes and ceiling height of the actual bedroom, since kids room layouts vary more than a standard bed program. DMD confirms guardrail height, ladder placement, and finish before production and ships knock-down for straightforward home assembly. When replacing an existing bunk bed, send the current footprint so the new unit fits the same room without rearranging furniture. Send your room dimensions, mattress sizes, and finish preference and we will confirm the build before it goes into production.',
    },
  },
  "Chair": {
    materials: {
      heading: 'Guestroom activity chair built for daily hotel turnover',
      body: 'A {name} is a compact seat placed in a hotel guest room for reading or working at the desk, built on a wood or metal frame with joinery rated for daily hotel use rather than lighter residential duty. Upholstery uses {material}, selected for the cleaning chemistry housekeeping runs between stays, and the frame is sized to fit beside the desk or by the window without crowding the room. Finish and fabric are matched to the guestroom casegoods package.',
    },
    specification: {
      heading: 'Coordinated with the rest of the guestroom furniture package',
      body: 'Hotel project managers specify this chair alongside the desk and bed package so finish and fabric match the room scheme. DMD builds to your prototype sample, confirms fabric performance against the housekeeping cleaning protocol, and ships coordinated with the rest of the guestroom order for one installation pass. Reorders for renovation phasing draw from the same finish records so later rooms match the earlier phase. Send your finish schedule and unit count and we will return shop drawings for approval.',
    },
  },
  "Dresser": {
    materials: {
      heading: 'Bedroom dresser built on the same standard as hotel casegoods',
      body: 'A {name} is built on a plywood or MDF carcass faced in {material}, with edge-banded, moisture-sealed exposed surfaces and drawers running on full-extension, soft-close commercial slides, the same construction DMD uses in hotel casegoods packages rather than a lighter residential build. Drawer boxes are joined, not stapled, and interiors are finished rather than left raw. Finish options include laminate pattern matching and veneer with stain color-match to the rest of the bedroom set.',
    },
    specification: {
      heading: 'Matched to the bedroom set it completes',
      body: 'A {name} is typically ordered to match an existing or coordinated bedroom set, so DMD confirms finish and hardware against the nightstand or headboard already specified. Send a finish sample or existing product reference; we return a matched build with drawer configuration confirmed before production. Because each piece is built to order, drawer count and width can be adjusted to the room, and later reorders draw from the same finish records for a true match across the whole set.',
    },
  },
  "Headboards": {
    materials: {
      heading: 'Bedroom headboard construction, panel or upholstered',
      body: 'A {name} is built as a wall-mounted panel in edge-banded MDF with laminate or veneer facing, or as an upholstered unit using commercial-grade foam over an engineered-wood frame finished in {material}. Wall-mount cleat systems keep the panel rigid against daily contact, and upholstered faces are specified in fabrics or vinyls that hold up to normal household cleaning. Width follows standard mattress sizing, with custom widths available for platform beds outside the standard range.',
    },
    specification: {
      heading: 'The finish anchor of the bedroom, matched to the bed program',
      body: 'A {name} is specified against the bed frame and mattress size already chosen, since headboard width and mounting height depend on that program. Send the bed width and finish sample; DMD confirms mounting hardware and produces the headboard to match. Concealed mounting hardware and templated install dimensions keep the installation straightforward for a single room or a full renovation, and a wall-mount design means the headboard installs without touching the bed frame itself at any point.',
    },
  },
  "Luggage Bench": {
    materials: {
      heading: 'Guestroom luggage bench built for repeated hard use',
      body: 'A {name} pairs a hardwood or steel frame with an upholstered or wood-slat top, built to the same duty cycle as the rest of the hotel guestroom casegoods package because a luggage bench absorbs the direct impact of bags set down and stood on daily. Upholstered tops use {material} rated for the housekeeping cleaning protocol, and frame joints are doweled or welded rather than glued for a connection that holds under repeated point-load weight.',
    },
    specification: {
      heading: 'Ordered with the casegoods package it sits beside',
      body: 'Hotel project managers specify the luggage bench alongside the dresser and desk so finish and upholstery match the rest of the room. DMD builds to your finish schedule and confirms fabric performance against your cleaning protocol before production. Because it ships with the broader casegoods order, dimensions can be adjusted to fit the specific footprint at the base of the bed, and future replacement units draw from the same finish records for a consistent match.',
    },
  },
  "Office Chair": {
    materials: {
      heading: 'Home-office seating built for full workday use',
      body: 'A {name} combines an adjustable-height mechanism with mesh, fabric, or {material} upholstery over commercial-grade foam, built to the same duty-cycle standard DMD applies to executive office seating rather than a lighter home-furniture build. The base is reinforced nylon or metal on a five-caster design, matched to hard floor or carpet depending on the room. Lumbar support and armrest height are adjustable so the chair fits a full workday, not just occasional use.',
    },
    specification: {
      heading: 'Specified for the room it actually sits in',
      body: 'A {name} is ordered against the desk height and room finish it pairs with, so send the desk specification and finish preference before DMD confirms the chair build. Because it ships as a single unit rather than a fleet order, lead time and minimums are lighter than a full office seating program while the underlying construction standard stays the same. If a second matching chair is needed later, the original build specification stays on file for reference.',
    },
  },
  "Outdoor Dining Set": {
    materials: {
      heading: 'Patio dining set built from outdoor-rated materials only',
      body: 'A {name} pairs a weather-sealed table with matching chairs, both built exclusively from outdoor-rated stock: powder-coated aluminum or steel frames, UV-stabilized {material}, and tempered glass or sealed wood tops that tolerate rain and freeze-thaw cycles rather than showroom conditions. Fasteners are stainless or coated against rust streaking, and the full set ships with matched finishes so the table and chairs read as one coordinated piece on the patio rather than pieces sourced from different runs.',
    },
    specification: {
      heading: 'Specified to the actual climate and season length',
      body: 'A {name} is specified around the climate it will sit in year-round, not the mild weather of a showroom, so DMD confirms frame and finish ratings against your location before production. Send the patio layout and expected season length; we recommend material ratings appropriate to that exposure and return a set built to match your indoor furniture scheme if continuity matters to the project, with stacking options available for seasonal storage in the off months.',
    },
  },
  "Outdoor Lounge Chair": {
    materials: {
      heading: 'Patio lounge seating engineered for sun, rain, and storage',
      body: 'A {name} is built on a powder-coated aluminum or steel frame with cushions in quick-dry foam under solution-dyed outdoor {material}, engineered to resist fading and mildew rather than the indoor fabrics used on residential lounge furniture. Stackable frame designs simplify off-season storage, and every fastener is stainless or coated to prevent the rust streaking that ruins outdoor fabric over a single season on an unrated frame left exposed to the weather.',
    },
    specification: {
      heading: 'Built for the season your patio actually gets',
      body: 'A {name} is specified against the climate conditions and season length of the property, since a lounge chair rated for a mild coastal patio will not hold up on an exposed rooftop. DMD recommends frame and cushion material ratings based on your conditions and matches the outdoor silhouette to your indoor furniture when the design calls for continuity. Send your patio layout, climate details, and expected exposure and we will return a material recommendation before production.',
    },
  },
  "Outdoor Side Table": {
    materials: {
      heading: 'Compact patio table built to the same outdoor standard',
      body: 'A {name} pairs a powder-coated metal base with a tempered-glass, sealed-wood, or {material} top, built from the same outdoor-rated material family DMD uses across the full patio program so a side table matches the dining and lounge pieces around it. Tops are sized for a drink and a phone rather than dining use, and frame joints are welded or doweled for stability on uneven patio surfaces where a lighter table would rock or tip.',
    },
    specification: {
      heading: 'Matched to the outdoor set it accompanies',
      body: 'A {name} is typically ordered alongside lounge chairs or a dining set so finishes match across the patio. DMD confirms the base finish and top material against your existing or planned outdoor pieces before production. Send your patio layout and the outdoor furniture it needs to match, and we will confirm the build before the order is placed, whether that means a single table or a full patio run for a new property.',
    },
  },
  "Outdoor Sofa": {
    materials: {
      heading: 'Patio sofa construction built for weather, not just looks',
      body: 'A {name} is built on a powder-coated aluminum frame or synthetic wicker weave over a corrosion-resistant core, with cushions in quick-dry foam under solution-dyed {material} that resists fading, mildew, and standing water. Seams and welts follow the design drawing the same way an indoor sofa would, but every material in the build is rated for direct weather exposure rather than borrowed from an indoor upholstery program not meant to live outside.',
    },
    specification: {
      heading: 'Specified to the exposure the patio actually gets',
      body: 'A {name} is specified around sun exposure, rain frequency, and storage plans for the off-season, since a patio sofa left exposed year-round needs a different material rating than one stored each winter. DMD recommends frame and fabric ratings to match your climate and can coordinate the outdoor silhouette with an indoor sofa already specified for the project. Share your patio conditions and layout and we will return a material recommendation before production begins.',
    },
  },
  "Sideboard": {
    materials: {
      heading: 'Dining room buffet cabinet built for daily serving use',
      body: 'A {name} is built on a plywood or MDF carcass faced in {material}, with edge-banded, moisture-sealed surfaces and doors or drawers on commercial-rated hinges and slides, built to the same standard DMD applies to hotel casegoods rather than a lighter residential buffet. Interior shelving is finished, not raw, and tops are selected for the scratch and moisture resistance a serving surface actually needs when it holds hot dishes and serving pieces during daily use.',
    },
    specification: {
      heading: 'Matched to the dining room it serves',
      body: 'A {name} is specified against the dining table and room finish it accompanies, so send the room dimensions and finish sample before DMD confirms door and drawer configuration. Because each piece is built to order, width and storage layout can be adjusted to the specific wall it sits against rather than forcing the room to fit a stock size, and drawer versus open-shelf storage can be mixed within the same unit on request.',
    },
  },
  "Storage Cabinets": {
    materials: {
      heading: 'Modular storage cabinets built for records and daily access',
      body: 'A {name} is built on a plywood or MDF carcass faced in {material}, with edge-banded, moisture-sealed surfaces and soft-close commercial hardware on every door and drawer, engineered for the daily open-close cycle of an office storage and organization program. Modular sizing allows units to be combined into a full storage wall or specified individually, and interiors are finished to hold files, supplies, or equipment without raw exposed surfaces anywhere in the cabinet.',
    },
    specification: {
      heading: 'Specified as a modular system, not a single unit',
      body: 'A {name} is typically specified as part of a modular storage wall, so office managers and facilities teams send the room elevation and storage volume needed. DMD configures module width and internal layout to that plan and confirms finish against the office scheme. Send your elevation drawing and storage requirements and we will return a configuration with finish options and a production schedule for the full run before installation begins on site.',
    },
  },
  "Study Desk": {
    materials: {
      heading: 'Kids study desk built to survive homework and hobbies',
      body: 'A {name} pairs a laminate or {material} work surface with a compact metal or wood-panel frame, built with sealed, edge-banded edges that hold up to the crayons, spills, and daily use a kids room desk actually gets, using the same construction discipline DMD applies to classroom furniture. Frame geometry is sized for a smaller room footprint, and corners are rounded and finished for safety in a child room setting rather than left sharp like an adult desk.',
    },
    specification: {
      heading: 'Sized to the room and the age it serves',
      body: 'A {name} is specified against the room dimensions and the age range using it, since a kids study desk needs a smaller footprint and lower work height than a standard home-office desk. DMD confirms desk height and finish before production and ships assembled or knock-down depending on room access. Send your room dimensions, the child age range, and finish preference and we will confirm the build before production starts on the order.',
    },
  },
  "TV Media Panel": {
    materials: {
      heading: 'Guestroom TV panel built into the casegoods finish scheme',
      body: 'A {name} is built on a plywood or MDF substrate faced in {material}, with edge-banded, sealed surfaces and integrated cable routing behind the mounting point, matching the finish and construction standard of the dresser and nightstand it ships beside. Mounting hardware is rated for the television weight specified, and panel dimensions are confirmed against the brand equipment standard so the finished wall reads as one continuous surface before production begins.',
    },
    specification: {
      heading: 'Coordinated with the guestroom casegoods and equipment plan',
      body: 'Hotel project managers specify the TV panel with the rest of the casegoods package so finishes and reveals match across the bed wall. DMD confirms mounting height, cable routing, and equipment clearance against your electrical plan before shop drawings are issued. Send your TV size, mounting standard, and finish schedule and we will return shop drawings for approval before the panel goes into production for your rooms and install sequence.',
    },
  },
  "Toy Storage": {
    materials: {
      heading: 'Kids room storage built for constant open-close use',
      body: 'A {name} is built on a plywood or MDF carcass faced in {material}, with rounded, sanded edges and soft-close hardware on every cubby or drawer, because a kids storage piece takes more daily impact than almost any other furniture category in the house. Interior compartments are finished and sized for bins or loose toys, and the frame is anchored with anti-tip hardware as standard given the climbing a toy storage unit invites.',
    },
    specification: {
      heading: 'Sized to the room and the storage system already in place',
      body: 'A {name} is specified against the room dimensions and any existing storage bins or organization system, so DMD confirms cubby count and compartment sizing before production. Send room dimensions and finish preference; we return a configuration sized to the space with anti-tip anchoring details for the installer. Finish can be matched to existing bedroom furniture on request, and unit count scales for classroom or shared-room orders across a full renovation project.',
    },
  },
  "Wardrobe": {
    materials: {
      heading: 'Bedroom wardrobe built on the same standard as dormitory units',
      body: 'A {name} is built on a plywood or MDF carcass faced in {material}, with edge-banded, moisture-sealed surfaces, sliding or hinged doors on commercial-rated hardware, and a reinforced hanging rod bracket sized for daily use rather than occasional storage. Interior shelving and rod placement are configured to the room, and backs and interiors are finished rather than left raw, matching the standard DMD applies to dormitory and hotel wardrobe units built for the same daily traffic.',
    },
    specification: {
      heading: 'Configured to the room and the storage it needs to hold',
      body: 'A {name} is specified against the actual room dimensions and door swing clearance, since wardrobe depth and door style depend on the space available. Send room dimensions and a finish sample; DMD confirms door configuration and interior layout before production. Because each unit is built to order, sliding-door and hinged-door options are both available without a custom-order premium, and interior fittings can be adjusted to the storage mix the room needs at any point.',
    },
  },
};
