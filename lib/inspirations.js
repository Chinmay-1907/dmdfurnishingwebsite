/**
 * lib/inspirations.js
 * Static inspiration data — six cohesive themes that match what DMD actually
 * builds. Every image lives under /public/images/inspirations/{theme-slug}/.
 *
 * Brand palette across all themes: warm walnut, cream, tan, peach. No black,
 * no stark white. Editorial photography style, no people, no logos.
 */

const INSPIRATIONS = [
  {
    id: '1',
    slug: 'modern-minimalist',
    title: 'Modern Minimalist Guestroom',
    description:
      'A quiet oak and cream guestroom built around clean lines, soft daylight, and zero visual noise.',
    fullDescription:
      'This is the room a guest exhales in. A low oak platform bed sits against a cream plaster wall with one matte bronze pendant overhead. Ivory linens, a single tan throw, no ornament fighting for attention. We build the case goods in solid white oak veneer over a poplar core, with hand-rubbed satin finish so the grain reads warm under daylight. Headboard is upholstered in a heavy cream bouclé rated for contract use. Every drawer pull is a recessed walnut finger pull, no metal. The point of this room is restraint. Nothing here is trying too hard, and that is exactly why it works for boutique properties chasing a calm signature.',
    image: '/images/inspirations/modern-minimalist/hero.webp',
    category: 'Hotel',
    materials: ['White Oak Veneer', 'Cream Boucle Upholstery', 'Matte Bronze Hardware', 'Heavy Linen Drapery'],
    features: ['Low Platform Bed', 'Recessed Walnut Pulls', 'Integrated Reading Light', 'Restrained Color Palette'],
    relatedImages: [
      '/images/inspirations/modern-minimalist/detail-1.webp',
      '/images/inspirations/modern-minimalist/detail-2.webp',
      '/images/inspirations/modern-minimalist/detail-3.webp',
    ],
  },
  {
    id: '2',
    slug: 'warm-hospitality',
    title: 'Warm Hospitality Lobby Nook',
    description:
      'An intimate hotel lobby corner where walnut paneling, velvet, and brass do the talking.',
    fullDescription:
      'Lobbies do not have to feel like airports. This nook is sized for two travelers and a coffee, with a velvet armchair facing a curved bouclé sofa across a terrazzo side table. Walls are walnut paneling with a vertical reveal pattern, broken by a single brass sconce and a curated three-piece art wall. The seating frames are kiln-dried hardwood, eight-way hand-tied springs, foam wrapped in down for the cushion crown. Fabric is a peach-toned mohair velvet on the chair and a cream wool bouclé on the sofa, both contract grade and cleanable. We size the whole vignette to your floor plate so it reads as a destination, not leftover lobby square footage.',
    image: '/images/inspirations/warm-hospitality/hero.webp',
    category: 'Hotel',
    materials: ['Walnut Wall Paneling', 'Mohair Velvet', 'Cream Wool Boucle', 'Terrazzo and Brass'],
    features: ['Eight-Way Hand-Tied Springs', 'Curated Art Wall', 'Wall Sconce Lighting', 'Two-Person Conversation Layout'],
    relatedImages: [
      '/images/inspirations/warm-hospitality/detail-1.webp',
      '/images/inspirations/warm-hospitality/detail-2.webp',
      '/images/inspirations/warm-hospitality/detail-3.webp',
    ],
  },
  {
    id: '3',
    slug: 'classic-luxury',
    title: 'Classic Luxury Dining Alcove',
    description:
      'Deep walnut, tufted velvet, brass sconces, and amber overhead light for fine dining that earns its check average.',
    fullDescription:
      'Private dining works when the room itself feels like a decision. This alcove pairs a deep walnut tufted banquette with brass sconces dropped low over a cream linen table. Overhead fixture is a single warm amber pendant, dimmed to 2700 Kelvin. The banquette frame is solid walnut with a hand-applied dark stain, button tufts on a mohair seat back, and a high crown so guests sit upright through a five-course meal. We build banquettes in modular sections so any room shape works, and every cushion zips off for laundering. Brass throughout is a hand-burnished satin finish that hides fingerprints and reads warm rather than yellow. This is the room people book the table for.',
    image: '/images/inspirations/classic-luxury/hero.webp',
    category: 'Restaurant',
    materials: ['Solid Walnut Frame', 'Mohair Velvet Tufting', 'Hand-Burnished Brass', 'Cream Linen'],
    features: ['Modular Banquette Sections', 'Zip-Off Cushion Covers', 'Dimmable 2700K Pendant', 'Acoustic Wall Backing'],
    relatedImages: [
      '/images/inspirations/classic-luxury/detail-1.webp',
      '/images/inspirations/classic-luxury/detail-2.webp',
      '/images/inspirations/classic-luxury/detail-3.webp',
    ],
  },
  {
    id: '4',
    slug: 'resort-coastal',
    title: 'Resort and Coastal Suite',
    description:
      'A lanai-facing suite interior in rattan, linen, and sunlit hardwood — the resort feeling without a single beach photo.',
    fullDescription:
      'Coastal does not mean a wall full of seashells. This suite earns the resort feeling from inside the room. A woven rattan pendant hangs over a teak console, linen drapes filter the late afternoon light, and a single indoor potted palm anchors the corner. Floors are wide plank sunlit hardwood with a matte wax finish that hides sand. The sofa frame is solid teak with woven cane side panels, cushions wrapped in a cream performance linen rated for UV and humidity. Every fabric in this room passes a 50,000 double rub Wyzenbeek test and shrugs off chlorine splash. We finish all wood with a marine-grade penetrating oil so the look stays warm even three years into oceanfront service.',
    image: '/images/inspirations/resort-coastal/hero.webp',
    category: 'Resort',
    materials: ['Solid Teak', 'Woven Rattan and Cane', 'Performance Linen', 'Marine-Grade Oil Finish'],
    features: ['UV-Stable Upholstery', '50K Double Rub Fabric', 'Indoor Planting Detail', 'Lanai-Facing Layout'],
    relatedImages: [
      '/images/inspirations/resort-coastal/detail-1.webp',
      '/images/inspirations/resort-coastal/detail-2.webp',
      '/images/inspirations/resort-coastal/detail-3.webp',
    ],
  },
  {
    id: '5',
    slug: 'executive-workplace',
    title: 'Executive and Workplace Lounge',
    description:
      'Club chairs facing a walnut panel wall, coffered ceiling, brass drinks cart — the room business gets done in.',
    fullDescription:
      'This is where deals close. Two leather club chairs face a walnut panel wall under a shallow coffered ceiling, with a brass drinks cart rolled into the corner and an ivory wool rug underfoot. Chair frames are solid hardwood with eight-way hand-tied springs, top-grain leather in a warm cognac with a hand-burnished pull-up finish that ages in instead of wearing out. The coffee table is a single slab of walnut on a brushed bronze base. We spec wool blend rugs in cream and tan because they read calm on video calls and hold up to wheeled luggage and chair casters. Lighting sits inside the coffer instead of bolted on. Built for executive lounges, private client rooms, and law firm receptions.',
    image: '/images/inspirations/executive-workplace/hero.webp',
    category: 'Corporate',
    materials: ['Top-Grain Cognac Leather', 'Solid Walnut Slab', 'Brushed Bronze', 'Ivory Wool Rug'],
    features: ['Coffered Ceiling Light', 'Eight-Way Hand-Tied Frames', 'Pull-Up Leather Finish', 'Video-Call Friendly Backdrop'],
    relatedImages: [
      '/images/inspirations/executive-workplace/detail-1.webp',
      '/images/inspirations/executive-workplace/detail-2.webp',
      '/images/inspirations/executive-workplace/detail-3.webp',
    ],
  },
  {
    id: '6',
    slug: 'multi-family-comfort',
    title: 'Multi-Family Amenity Lounge',
    description:
      'A residential amenity space that reads like a great living room — sectional, oak coffee table, tall windows, plants.',
    fullDescription:
      'Amenity lounges live or die on whether residents actually use them. This one feels like a great living room. A deep cream sectional in a performance fabric anchors the space, an oak coffee table sits on an ivory wool rug, and tall windows wear soft linen curtains that filter the afternoon. Two oversized planters carry the room into the corners. The sectional is built on a kiln-dried hardwood frame with eight-way hand-tied springs, cushions wrapped in a peach-flecked performance weave that bleach-cleans. Side tables are solid white oak with hand-rubbed satin. We size every piece to a real apartment community traffic pattern, so the space looks great empty at 9am and still looks great after a 6pm wine event.',
    image: '/images/inspirations/multi-family-comfort/hero.webp',
    category: 'Corporate',
    materials: ['Performance Weave Upholstery', 'Solid White Oak', 'Wool Blend Rug', 'Linen Curtain'],
    features: ['Bleach-Cleanable Fabric', 'Modular Sectional', 'Oversized Indoor Planting', 'Daylight-Friendly Layout'],
    relatedImages: [
      '/images/inspirations/multi-family-comfort/detail-1.webp',
      '/images/inspirations/multi-family-comfort/detail-2.webp',
      '/images/inspirations/multi-family-comfort/detail-3.webp',
    ],
  },
];

/**
 * Returns all inspirations.
 */
export function getAllInspirations() {
  return INSPIRATIONS;
}

/**
 * Returns a single inspiration by its id (string or number).
 */
export function getInspirationById(id) {
  const strId = String(id);
  return INSPIRATIONS.find((i) => i.id === strId) || null;
}
