/**
 * lib/inspirations.js
 * Static inspiration data, ported from src/components/InspirationDetail.js.
 * Exported as plain data so Next.js Server Components can use it without
 * any client-side dependencies.
 */

const INSPIRATIONS = [
  {
    id: '1',
    title: 'Modern Minimalist Hotel Lobby',
    description:
      'Clean lines and neutral tones create a welcoming atmosphere in this contemporary hotel lobby design.',
    fullDescription:
      'This hotel lobby pairs a neutral material palette with clean-lined furniture built for high-traffic use. The reception desk is walnut veneer on a steel subframe. Seating areas use commercial-grade upholstery rated for daily guest turnover. Ambient lighting is integrated into the millwork rather than added as an afterthought.',
    image:
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Hotel',
    materials: ['Walnut Wood', 'Brushed Brass', 'Italian Marble', 'Premium Upholstery'],
    features: ['Custom Reception Desk', 'Modular Seating', 'Integrated Lighting', 'Acoustic Design'],
    relatedImages: [
      'https://images.unsplash.com/photo-1576354302919-96748cb8299e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ],
  },
  {
    id: '2',
    title: 'Luxury Restaurant Seating',
    description:
      'Plush velvet seating and rich wood tones elevate this fine dining experience with sophistication and comfort.',
    fullDescription:
      'Custom dining seating that balances comfort and durability for fine dining service. Deep jewel-tone velvet upholstery is paired with solid oak frames and brass accent hardware. Ergonomic seat profiles keep guests comfortable through a multi-course meal. Every frame is rated for ten seatings per night.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Restaurant',
    materials: ['Velvet Upholstery', 'Solid Oak', 'Brass Accents', 'Leather Details'],
    features: [
      'Custom Banquette Seating',
      'Ergonomic Design',
      'Sound Absorption',
      'Stain-Resistant Fabrics',
    ],
    relatedImages: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ],
  },
  {
    id: '3',
    title: 'Boutique Hotel Suite',
    description:
      'A perfect blend of luxury and comfort in this boutique hotel suite featuring custom-designed furniture.',
    fullDescription:
      'A boutique suite where every furniture piece is built to a single spec book. The headboard integrates reading lights and USB charging. The seating area uses the same veneer palette as the casegoods for visual continuity. Bed frame, nightstands, desk, and luggage bench are all manufactured as a matched set.',
    image:
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Hotel',
    materials: ['Premium Linens', 'Natural Wood', 'Custom Upholstery', 'Blackout Drapery'],
    features: [
      'Statement Headboard',
      'Integrated Technology',
      'Custom Storage Solutions',
      'Ambient Lighting',
    ],
    relatedImages: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ],
  },
  {
    id: '4',
    title: 'Executive Lounge Design',
    description:
      'Sophisticated and functional furniture creates an ideal environment for business travelers.',
    fullDescription:
      'An executive lounge built for business travelers who need both focus and comfort. Private pods with acoustic panels for calls. Communal worktables with integrated power. Ergonomic task seating in premium leather. The material palette uses warm woods and commercial-grade fabrics that hold up to daily use.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Corporate',
    materials: ['Premium Leather', 'Engineered Wood', 'Acoustic Panels', 'Commercial-Grade Fabrics'],
    features: [
      'Ergonomic Workstations',
      'Private Pods',
      'Integrated Power Solutions',
      'Modular Design',
    ],
    relatedImages: [
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ],
  },
  {
    id: '5',
    title: 'Coastal Resort Aesthetic',
    description:
      'Light, airy furniture with natural materials perfectly complement this beachfront property.',
    fullDescription:
      'Resort furniture that takes its cues from the surrounding environment. Light, airy pieces in rattan and teak with performance fabrics rated for sun, salt, and moisture. The color palette pulls from sand and ocean tones. Every piece is weather-resistant without sacrificing a high-end look.',
    image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Resort',
    materials: ['Rattan', 'Teak Wood', 'Performance Fabrics', 'Natural Stone'],
    features: [
      'Weather-Resistant Construction',
      'Indoor-Outdoor Versatility',
      'Lightweight Design',
      'UV-Protected Finishes',
    ],
    relatedImages: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ],
  },
  {
    id: '6',
    title: 'Urban Cafe Concept',
    description:
      'Industrial-inspired furniture with warm accents creates a welcoming space for this city cafe.',
    fullDescription:
      'An urban cafe with mixed seating zones: communal tables for the social crowd, lounge corners for longer stays. Reclaimed wood tops on powder-coated steel frames strike a balance between industrial edge and warmth. The layout optimizes foot traffic while creating distinct areas for different cafe experiences.',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Cafe',
    materials: ['Reclaimed Wood', 'Powder-Coated Steel', 'Concrete', 'Industrial Leather'],
    features: ['Mixed Seating Options', 'Space Optimization', 'Durability', 'Easy Maintenance'],
    relatedImages: [
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
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
