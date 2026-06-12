/**
 * lib/product-copy.js
 * Subcategory-aware detail-page copy for /products/[slug] pages.
 *
 * ProductDetailPage previously rendered two identical boilerplate cards on all
 * 174 product pages. This module maps each product's primary subcategory
 * (e.g. "Bed Frame", "Night Stand", "Booths") to one of ~14 furniture-type
 * copy groups, each with two expert blocks:
 *   - materials:     construction + materials specifics
 *   - specification: contract-use context + who specs it + how to engage
 *
 * Tone mirrors lib/place-content.js: professional B2B, contract-furniture
 * vocabulary (HPL, edge-banding, COM, FF&E), no fabricated stats.
 */

const COPY_GROUPS = {
  bedFrames: {
    materials: {
      heading: 'Built to hold up under nightly commercial use',
      body: 'DMD bed frames are fabricated in two construction families: welded steel platforms with powder-coated finishes, and engineered-wood platforms using edge-banded MDF or plywood with laminate or veneer faces. Steel frames use welded corner joints and bolt-together rails sized for box-spring-free platform builds, while wood-panel frames are doweled and cam-locked for repeatable knock-down assembly during installation. Bunk and loft configurations add guardrails and ladder reinforcement engineered for institutional use. Every frame is dimensioned to the mattress program you specify, with platform heights coordinated to housekeeping clearance or under-bed luggage storage.',
    },
    specification: {
      heading: 'Specified for hotels, dorms, and multi-family projects',
      body: 'Hotel project managers and purchasing firms typically specify bed frames alongside the headboard and casegoods package so finishes, heights, and wallguard details arrive coordinated. For dormitories and workforce housing, facilities teams prioritize steel construction and replaceable components over glued residential builds. DMD produces frames to your unit count and phasing schedule, ships knock-down to reduce freight, and supports room-by-room installation sequencing. Send your mattress spec, target platform height, and renovation timeline and we will return shop drawings with finish options for approval before production.',
    },
  },

  headboards: {
    materials: {
      heading: 'Panel, upholstered, and wallguard-integrated construction',
      body: 'DMD headboards are built as wall-mounted panels or full headboard units in three constructions: edge-banded MDF with high-pressure laminate (HPL) or wood veneer faces; upholstered panels using commercial-grade foam over engineered-wood frames with fabric, polyurethane, or leather facings; and hybrid units that integrate laminate wallguards and nightstand returns into a single assembly. Wall-mount cleat systems keep panels rigid through years of daily contact, and upholstered faces are specified with contract fabrics that tolerate commercial cleaning chemistry. Widths follow standard king, queen, and full XL mattress programs, with custom widths for connected wallguard runs.',
    },
    specification: {
      heading: 'The visual anchor of the guestroom package',
      body: 'Designers treat the headboard as the signature piece of a guestroom scheme, so DMD builds to the prototype finish schedule, matching laminate patterns, stain colors, and upholstery from your approved sample set. Hotel PMs and purchasing agents typically order headboards with the bed base, nightstands, and TV panel so the bed wall installs as one coordinated elevation. Units ship with concealed mounting hardware and templated install dimensions for repeatable room-by-room fit-out. Provide your bed program, wall widths, and brand standard and we will produce shop drawings for approval.',
    },
  },

  casegoods: {
    materials: {
      heading: 'HPL and veneer casegoods engineered for daily abuse',
      body: 'DMD casegoods, from nightstands and dressers to wardrobes, TV panels, amenity towers, vanities, and benches, are built on plywood or MDF carcasses faced in high-pressure laminate (HPL) or wood veneer, with edge-banded, moisture-sealed edges on every exposed surface. Horizontal tops use HPL where scratch and moisture resistance matter most; drawers run on full-extension, soft-close commercial slides; and hardware comes from contract-rated product lines. Backs and interiors are finished, not raw, because housekeeping sees every face of the piece. Finish options include laminate pattern matching, veneer with stain color-match, and two-tone combinations to the designer schedule.',
    },
    specification: {
      heading: 'Coordinated guestroom and unit packages',
      body: 'Casegoods are usually specified as a coordinated package so finishes and reveals match across the room: nightstand, dresser, wardrobe, luggage bench, and TV panel arriving as one family. Hotel project managers and multi-family developers send unit counts, room mixes, and the approved finish schedule; DMD returns shop drawings, finish samples, and a production schedule aligned to your install sequencing. Pieces ship blanket-wrapped or boxed knock-down depending on site logistics, and dimensions can be adjusted to fit existing wall niches during renovation without re-engineering the whole package.',
    },
  },

  healthcare: {
    materials: {
      heading: 'Cleanable, lockable, and built for clinical settings',
      body: 'Healthcare pieces such as bedside cabinets, overbed tables, and patient recliners are specified around infection control and continuous use. Carcasses use laminate-faced MDF or plywood with sealed, edge-banded surfaces that tolerate hospital-grade disinfectants; tops are high-pressure laminate (HPL) for scratch and moisture resistance. Mobile pieces run on locking casters, lockable storage protects patient belongings, and recliner upholstery uses healthcare-rated vinyl or polyurethane fabrics over commercial foam, with crevice-minimizing seams that simplify cleaning. Steel components are powder-coated for corrosion resistance under repeated wipe-downs.',
    },
    specification: {
      heading: 'Specified by facilities and clinical planning teams',
      body: 'Hospital facilities directors, clinical planners, and healthcare architects specify patient room furniture to the cleaning protocol first and the finish palette second. DMD builds to both: every surface is selected to survive the disinfectants your environmental services team actually uses, and finishes follow the project design palette. Pieces are sized for patient room clearances and bed heights, and can be customized for bariatric requirements or specific equipment. Send room counts and your infection-control requirements and we will return compliant material options with shop drawings for approval.',
    },
  },

  diningSeating: {
    materials: {
      heading: 'Contract chair, stool, and booth construction',
      body: 'DMD dining chairs, bar stools, and booths are built for the turnover, dragging, and daily sanitizing of commercial food service. Wood chairs use solid hardwood frames with reinforced joinery, corner blocks, and glued mortise joints rather than the stapled connections common in residential seating. Metal frames are welded steel with powder-coat finishes, and stool footrests are wear-plated where shoes land. Upholstered seats use commercial-grade high-density foam under vinyl, polyurethane, or performance fabrics that tolerate grease, wine, and bleach-based cleaners. Booth frames are kiln-dried hardwood with upholstery specified to public-assembly durability.',
    },
    specification: {
      heading: 'Specified to the operator turn time and cleaning chemistry',
      body: 'Restaurant owners, hospitality designers, and purchasing groups specify dining seating around three constraints: cover counts, cleaning protocol, and replacement stock. DMD builds to your seat height program across dining, counter, and bar heights, with finishes matched across chairs, stools, and booths so the front of house reads as one scheme. We recommend ordering attic stock in the original production run so dye lots and finishes match when pieces rotate out of service. Send your floor plan and fabric standard and we will quote the full seating package with lead times.',
    },
  },

  loungeSeating: {
    materials: {
      heading: 'Commercial lounge construction under tailored upholstery',
      body: 'Sofas, lounge chairs, and armchairs from DMD are built on kiln-dried hardwood or engineered frames with corner-blocked joinery, sinuous-spring or webbed suspensions, and commercial-grade high-density foam selected to keep its shape through years of public use. Face fabrics are contract-rated performance wovens, vinyl, or polyurethane, chosen for the cleaning chemistry of the space, and legs or bases are solid wood or powder-coated metal. Seams, welts, and panel details follow the designer drawing, and replaceable cushion construction extends service life in high-traffic lobbies and lounges.',
    },
    specification: {
      heading: 'Lobby, lounge, and guest-facing soft seating',
      body: 'Lounge pieces carry the first impression of a lobby or living space, so designers specify the silhouette and DMD engineers the durability underneath it. Hotel and multi-family projects typically pair lobby sofas with accent chairs and occasional tables on one finish schedule; libraries and waiting areas prioritize stain-resistant, cleanable upholstery. We build to COM (customer-supplied material) or supply contract fabric options, match exposed wood finishes to your sample, and size pieces to the furniture plan. Share your fabric standard and layout and we will return yardage requirements and shop drawings.',
    },
  },

  taskSeating: {
    materials: {
      heading: 'Ergonomic and executive seating built for eight-hour days',
      body: 'DMD task and executive seating combines commercial-grade mechanisms with mesh, fabric, polyurethane, or leather upholstery over high-density foam. Task chairs are specified with adjustable seat height and lumbar support; executive chairs add high-back profiles and padded arms. Bases are reinforced nylon or metal five-star designs with casters matched to the floor surface. Upholstery is selected for daily contact and cleaning: breathable mesh in dense open plans, wipeable polyurethane in shared seats. Every chair is intended for full-shift commercial duty cycles, not the lighter use residential chairs are built around.',
    },
    specification: {
      heading: 'Specified by workplace and facilities teams',
      body: 'Office managers, tenant fit-out contractors, and workplace designers specify task seating fleet-wide, so consistency matters as much as comfort: one chair standard across the floor simplifies maintenance, spare parts, and future reorders. DMD supplies seating coordinated with desking finishes, quotes in volume with staged delivery to match move-in phasing, and offers upholstery options that align with the broader furniture package. For shared and visitor seats we recommend wipeable upholstery; for daily assigned seats, breathable mesh or fabric. Send headcount and finish standards for a fleet quote.',
    },
  },

  publicSeating: {
    materials: {
      heading: 'Beam, visitor, and tiered seating for public spaces',
      body: 'Waiting-area and visitor seating takes constant, unsupervised use, so DMD builds these pieces on welded steel frames with powder-coat finishes and seat surfaces in cleanable polypropylene, upholstered vinyl, or wood. Linked beam configurations keep rows aligned and simplify floor cleaning; stackable visitor chairs store flat between events. Upholstered options use commercial foam and healthcare- or public-assembly-rated fabrics that survive disinfectant wipe-downs. Tiered and auditorium seating adds fixed or movable structural frames engineered for code-compliant anchoring and long institutional service.',
    },
    specification: {
      heading: 'High-occupancy seating for waiting rooms and halls',
      body: 'Hospitals, clinics, universities, and public agencies specify this seating around occupancy counts, cleaning protocols, and code requirements rather than fashion cycles. DMD coordinates seat counts to your floor plan, supplies ganging and anchoring hardware, and matches finishes to the facility palette. For healthcare waiting areas we default to non-porous, wipeable surfaces; for lecture and assembly spaces we coordinate sightlines and row spacing with the architect. Send your room layout and expected occupancy and we will return a seating plan with product options and lead times.',
    },
  },

  desks: {
    materials: {
      heading: 'Desk construction for daily commercial use',
      body: 'DMD desks pair laminate or veneer work surfaces with powder-coated metal bases or panel-end construction in edge-banded MDF. Tops use high-pressure laminate (HPL) where durability leads, or wood veneer where the design calls for warmth, always with sealed, edge-banded perimeters that survive daily cleaning. Executive and workstation models integrate cable management, modesty panels, and storage pedestals with full-extension, soft-close drawer hardware. Frames are engineered to stay rigid at commercial duty cycles with no racking under daily load, and leg geometry can be tailored to room clearances and outlet locations.',
    },
    specification: {
      heading: 'From guestroom writing desks to executive offices',
      body: 'Hotels specify desks as part of the guestroom casegoods package, matched to the nightstand and TV panel finishes; corporate projects specify them floor-wide with consistent cable access and storage; home-office and residential developments select compact footprints that still meet daily-use durability. DMD builds each desk to the project dimensions and finish schedule, coordinates grommet and power locations with your electrical plan, and ships knock-down or assembled depending on site access. Provide the room layout and finish standard and we will return shop drawings and a production timeline.',
    },
  },

  education: {
    materials: {
      heading: 'Classroom and campus furniture built for institutional use',
      body: 'School and university furniture takes harder use than nearly any commercial category, so DMD builds student desks, teacher desks, lecture units, study tables, and classroom chairs on welded steel frames with powder-coat finishes and work surfaces in high-pressure laminate (HPL) over MDF or plywood cores with impact-resistant edge banding. Chair shells are molded polypropylene or upholstered in contract-grade, cleanable fabrics. Adjustable-height mechanisms, ganging hardware, and bolt-down options are engineered for institutional service, and every exposed edge and corner is finished to tolerate years of daily student contact.',
    },
    specification: {
      heading: 'Specified by districts, facilities teams, and campus planners',
      body: 'School districts, university procurement offices, and education architects specify furniture in volume against tight summer installation windows. DMD plans production to the academic calendar, stages deliveries by building and floor, and supplies consistent finishes across classrooms so future replacements match. Desk heights follow age-group standards, lecture and library pieces coordinate with the architect room layouts, and laminate surfaces are color-matched to the campus palette. Send enrollment counts, room schedules, and your install window and we will return a phased production and delivery plan.',
    },
  },

  tables: {
    materials: {
      heading: 'Commercial table construction, from dining tops to coffee tables',
      body: 'DMD tables are engineered around the joint where every commercial table fails first: the base-to-top connection. Dining and breakfast tables use reinforced mounting plates on steel or solid-wood bases; coffee, side, and magazine tables use welded or doweled frames sized for public-space use. Tops are high-pressure laminate (HPL), wood veneer, solid wood, or glass on metal frames depending on design intent, always with sealed edges that tolerate daily cleaning chemistry. Heights follow commercial standards across dining, counter, bar, and lounge applications, and base geometry is selected so seating fits without knee conflicts.',
    },
    specification: {
      heading: 'Sized to the floor plan, finished to the scheme',
      body: 'Restaurants and hotels specify tables around covers and turn time; lobbies and waiting areas specify them around traffic flow and durability. DMD sizes tops to your seating plan, matches finishes across the table program so two-tops, four-tops, and communal tables read as one family, and engineers bases for stability on the actual floor surface. Replacement tops can be produced years later from retained finish records. Send the floor plan and finish standard and we will quote the full table package with lead times.',
    },
  },

  receptionMillwork: {
    materials: {
      heading: 'Statement millwork: reception desks, podiums, and counters',
      body: 'Reception desks, podiums, buffet counters, and food-service cabinets are custom millwork pieces, built from architectural drawings rather than picked from a catalog. DMD fabricates them on plywood and MDF substrates with high-pressure laminate (HPL), wood veneer, or solid-surface faces; transaction tops and service surfaces use materials rated for constant contact and cleaning. Internal construction accommodates cable routing, equipment cutouts, accessible counter heights, and integrated lighting where the design requires it. Food-service pieces add moisture-sealed interiors and clearances for hot, cold, or refrigerated equipment.',
    },
    specification: {
      heading: 'The first thing guests see, built to the architect drawing',
      body: 'Architects and interior designers detail reception and service millwork as one-off pieces, so shop-drawing quality determines how the design survives fabrication. DMD develops shop drawings from your design intent, resolves equipment and power coordination before production, and field-verifies dimensions for renovation work. Hotel, healthcare, and office projects typically schedule these pieces with the general contractor millwork package so installation lands after flooring and finishes. Send design drawings and equipment specs and we will return engineered shop drawings for approval.',
    },
  },

  shelving: {
    materials: {
      heading: 'Bookshelves and storage walls built to stay straight',
      body: 'Shelving fails by sagging and racking, so DMD builds bookcases and library shelving with thicker substrates and tighter spans than residential product. Carcasses are plywood or MDF with laminate or veneer faces and edge-banded shelf fronts; fixed shelves are dadoed or mechanically fastened, and adjustable shelves run on commercial-grade pin or standard systems rated for full book loads. Tall units include anti-tip anchoring hardware as standard. Finishes follow the project palette, with color-matched laminate or stained veneer carried across the full storage program.',
    },
    specification: {
      heading: 'Library, office, and residential storage programs',
      body: 'Libraries and schools specify shelving to collection loads and sightline requirements; offices specify it for records and display; multi-family projects use it as built-in-style unit storage. DMD engineers shelf spans to the actual load, since full bookshelf rows weigh far more than styled decor suggests, coordinates heights with ceiling and window lines, and supplies anchoring details for the installer. Units ship assembled or flat-packed depending on building access. Send elevation drawings or room dimensions and we will return configurations with load guidance and finish options.',
    },
  },

  outdoor: {
    materials: {
      heading: 'Outdoor-rated construction, not indoor furniture outside',
      body: 'Outdoor furniture must survive UV, rain, freeze-thaw cycles, and standing water, so DMD builds patio and terrace pieces only from outdoor-rated materials: powder-coated aluminum and steel, UV-stabilized molded polypropylene, synthetic wicker over corrosion-resistant frames, and tempered glass or weather-sealed tops. Fasteners are stainless or coated to prevent rust streaking, and cushioned pieces use quick-dry foam with solution-dyed outdoor fabrics. Stackable designs simplify off-season storage, and frame finishes are specified for the project actual climate exposure rather than showroom conditions.',
    },
    specification: {
      heading: 'Patios, terraces, and pool decks that earn revenue',
      body: 'Restaurant operators and hotel asset managers treat outdoor seating as revenue square footage, which makes furniture durability a revenue issue: pieces that corrode or fade mid-season cost covers, not just replacement budget. DMD specifies frames and finishes to the climate, supplies stacking and storage-friendly designs for seasonal markets, and matches outdoor silhouettes to your indoor scheme when the concept calls for continuity. Send your patio layout, climate conditions, and season length and we will recommend a package with appropriate material ratings.',
    },
  },

  default: {
    materials: {
      heading: 'Commercial-grade construction as standard',
      body: 'Every DMD piece is built to contract-grade expectations rather than residential standards: engineered-wood substrates with high-pressure laminate (HPL) or wood veneer faces, edge-banded and moisture-sealed exposed surfaces, welded or reinforced joinery, powder-coated metal components, and commercial-rated hardware throughout. Upholstered elements use high-density foam and contract fabrics selected for the cleaning protocols of commercial environments. Materials and finishes are confirmed during specification, and our team adjusts construction details to the duty cycle of the space the piece will actually live in.',
    },
    specification: {
      heading: 'Built to project specifications, not stocked in a warehouse',
      body: 'DMD manufactures to order, which means dimensions, materials, finishes, and quantities flex to fit your project instead of forcing the project to fit a catalog. Hotel PMs, designers, general contractors, and facilities teams send us the room layout, finish standard, and unit count; we return shop drawings, finish samples, and a production schedule aligned to your installation sequence. If this piece is close but not exact, that gap is normal: variants are the default in contract manufacturing, not the exception.',
    },
  },
};

// Exact subcategory-name → copy group. Keys are normalized lowercase.
const SUBCATEGORY_GROUP_MAP = {
  // Bed frames + bunks
  'bed frame': 'bedFrames',
  'bunk bed': 'bedFrames',
  'bunk beds': 'bedFrames',
  // Headboards
  'head board': 'headboards',
  headboards: 'headboards',
  // Casegoods + storage
  'night stand': 'casegoods',
  nightstand: 'casegoods',
  dresser: 'casegoods',
  wardrobe: 'casegoods',
  wardrobes: 'casegoods',
  'amenity tower': 'casegoods',
  'tv media panel': 'casegoods',
  'tv unit': 'casegoods',
  sideboard: 'casegoods',
  'storage cabinets': 'casegoods',
  'toy storage': 'casegoods',
  vanities: 'casegoods',
  'luggage bench': 'casegoods',
  // Healthcare / patient room
  'bedside cabinet': 'healthcare',
  'overbed table': 'healthcare',
  'recliner chair': 'healthcare',
  // Dining + bar seating ("chair" = hotel guest room activity chair)
  'dining chair': 'diningSeating',
  'dining chairs': 'diningSeating',
  'bar stool': 'diningSeating',
  'bar stools': 'diningSeating',
  booths: 'diningSeating',
  chair: 'diningSeating',
  // Lounge / soft seating
  sofa: 'loungeSeating',
  'lobby sofa': 'loungeSeating',
  'outdoor sofa': 'outdoor',
  'lounge chair': 'loungeSeating',
  'arm chair': 'loungeSeating',
  'accent chairs': 'loungeSeating',
  'reading chairs': 'loungeSeating',
  // Task / office seating
  'ergonomic chair': 'taskSeating',
  'executive chair': 'taskSeating',
  'office chair': 'taskSeating',
  // Public / institutional seating
  'visitor chairs': 'publicSeating',
  'waiting chairs': 'publicSeating',
  'tiered seating': 'publicSeating',
  // Desks
  desk: 'desks',
  'writing desk': 'desks',
  'executive desk': 'desks',
  // Education ("chairs" = classroom chairs subcategory)
  chairs: 'education',
  'student desks': 'education',
  'teacher desk': 'education',
  'lecture desks': 'education',
  'study desk': 'education',
  'study desks': 'education',
  'study tables': 'education',
  podium: 'receptionMillwork',
  // Tables
  'dining table': 'tables',
  'dining tables': 'tables',
  'coffee table': 'tables',
  'coffee tables': 'tables',
  'magazine table': 'tables',
  // Reception + service millwork
  'reception desk': 'receptionMillwork',
  'buffet counter': 'receptionMillwork',
  'food service cabinets': 'receptionMillwork',
  // Shelving
  bookshelves: 'shelving',
  bookcase: 'shelving',
  // Outdoor
  'outdoor chairs': 'outdoor',
  'outdoor lounge chair': 'outdoor',
  'outdoor dining set': 'outdoor',
  'outdoor side table': 'outdoor',
  'patio tables': 'outdoor',
};

/**
 * Keyword fallback for subcategory names not in the exact map
 * (future XML additions should still land in a sensible group).
 */
function resolveByKeyword(haystack) {
  if (/outdoor|patio/.test(haystack)) return 'outdoor';
  if (/bunk|bed frame|\bbed\b/.test(haystack)) return 'bedFrames';
  if (/head ?board/.test(haystack)) return 'headboards';
  if (/recliner|overbed|patient/.test(haystack)) return 'healthcare';
  if (/desk|workstation|podium/.test(haystack)) return 'desks';
  if (/stool|booth/.test(haystack)) return 'diningSeating';
  if (/sofa|lounge|arm ?chair|accent/.test(haystack)) return 'loungeSeating';
  if (/ergonomic|executive chair|office chair|task/.test(haystack)) return 'taskSeating';
  if (/waiting|visitor|tiered/.test(haystack)) return 'publicSeating';
  if (/chair|seating|bench/.test(haystack)) return 'diningSeating';
  if (/reception|buffet|counter|service cabinet/.test(haystack)) return 'receptionMillwork';
  if (/shelf|shelv|bookcase/.test(haystack)) return 'shelving';
  if (/table/.test(haystack)) return 'tables';
  if (/cabinet|wardrobe|dresser|storage|stand|tower|vanit/.test(haystack)) return 'casegoods';
  return 'default';
}

/**
 * Returns the two detail-page copy blocks for a product's primary membership.
 *
 * @param {object|null} primary - membership record with subcategoryName / furnitureTypeName
 * @returns {{ materials: {heading, body}, specification: {heading, body} }}
 */
export function getProductCopy(primary) {
  const sub = (primary?.subcategoryName || '').trim().toLowerCase();
  const ft = (primary?.furnitureTypeName || '').trim().toLowerCase();

  let groupKey = SUBCATEGORY_GROUP_MAP[sub];
  if (!groupKey) {
    groupKey = resolveByKeyword(`${sub} ${ft}`.trim());
  }

  return COPY_GROUPS[groupKey] || COPY_GROUPS.default;
}
