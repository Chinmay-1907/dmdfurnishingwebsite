export const DEFAULT_BLOG_AUTHOR = 'DMD Furnishing Editorial Team';

export const blogPosts = [
  {
    slug: 'what-is-ffe-hospitality',
    title: 'What Is FF&E? The Hospitality Buyer Guide',
    excerpt:
      'FF&E stands for Furniture, Fixtures, and Equipment, and it drives both your budget and the guest experience. See exactly what qualifies, how it differs from OS&E, and where buyers get tripped up.',
    date: 'April 1, 2026',
    isoDate: '2026-04-01',
    author: DEFAULT_BLOG_AUTHOR,
    category: 'FF&E Guide',
    tags: ['ffe', 'hospitality', 'procurement'],
  },
  {
    slug: 'hotel-guestroom-furniture-checklist',
    title: 'Hotel Guestroom Furniture Checklist for Every Room',
    excerpt:
      'Every piece a commercial guestroom actually needs, from bed frame and headboard to desk, luggage bench, and vanity. Includes the spec notes brand standards expect.',
    date: 'March 29, 2026',
    isoDate: '2026-03-29',
    author: DEFAULT_BLOG_AUTHOR,
    category: 'Hotel Furniture',
    tags: ['hotel', 'casegoods', 'ffe'],
  },
  {
    slug: 'value-engineering-commercial-furniture',
    title: 'How to Value Engineer Commercial Furniture the Right Way',
    excerpt:
      'Value engineering is not the same as cost cutting. See the moves procurement teams use to trim FF&E spend while protecting durability, finish quality, and brand standards.',
    date: 'March 26, 2026',
    isoDate: '2026-03-26',
    author: DEFAULT_BLOG_AUTHOR,
    category: 'Procurement',
    tags: ['procurement', 'ffe', 'value-engineering'],
  },
  {
    slug: 'hpl-veneer-solid-wood-hotel-casegoods',
    title: 'HPL vs Veneer vs Solid Wood for Hotel Casegoods',
    excerpt:
      'Each surface has a different story on cost, durability, and finish. Compare HPL, wood veneer, and solid wood for guestroom casegoods so you can spec with confidence.',
    date: 'March 22, 2026',
    isoDate: '2026-03-22',
    author: DEFAULT_BLOG_AUTHOR,
    category: 'Materials',
    tags: ['materials', 'casegoods', 'hotel'],
  },
  {
    slug: 'restaurant-seating-guide',
    title: 'Restaurant Seating Guide: Booth, Chair, or Bar Stool',
    excerpt:
      'Seating shapes dwell time, table density, and brand feel. Learn when to spec booths, dining chairs, or bar stools based on concept, layout, and commercial durability needs.',
    date: 'March 31, 2026',
    isoDate: '2026-03-31',
    author: DEFAULT_BLOG_AUTHOR,
    category: 'Restaurant',
    tags: ['restaurant', 'seating'],
  },
  {
    slug: 'ffe-procurement-timeline',
    title: 'FF&E Procurement Timeline from Concept to Install',
    excerpt:
      'Lead times, approvals, and delivery logistics can make or break an opening date. Walk through a realistic FF&E schedule for a commercial hospitality project.',
    date: 'April 2, 2026',
    isoDate: '2026-04-02',
    author: DEFAULT_BLOG_AUTHOR,
    category: 'Hospitality',
    tags: ['ffe', 'procurement', 'hospitality'],
  },
  {
    slug: 'office-furniture-commercial-projects',
    title: 'Office Furniture for Commercial Projects: Procurement Guide',
    excerpt:
      'Specifying office furniture for a commercial fit-out takes more than picking chairs. Standards, durability tiers, lead times, and the procurement sequence that keeps the project on schedule.',
    date: 'June 4, 2026',
    isoDate: '2026-06-04',
    author: DEFAULT_BLOG_AUTHOR,
    category: 'Office',
    tags: ['office', 'procurement', 'ffe'],
  },
  {
    slug: 'healthcare-furniture-guide',
    title: 'Healthcare Furniture: Durability, Cleanability, Compliance',
    excerpt:
      'Healthcare furniture has to survive harsh cleaners, constant use, and strict codes. What to look for in materials, construction, and compliance when you furnish clinical and waiting spaces.',
    date: 'June 5, 2026',
    isoDate: '2026-06-05',
    author: DEFAULT_BLOG_AUTHOR,
    category: 'Healthcare',
    tags: ['healthcare', 'durability', 'ffe'],
  },
  {
    slug: 'student-housing-furniture-guide',
    title: 'Student Housing Furniture: The Specification Guide',
    excerpt:
      'Dorm and student housing furniture takes the hardest use in commercial interiors. How to spec beds, desks, and casegoods that survive a decade of turnover without constant replacement.',
    date: 'June 6, 2026',
    isoDate: '2026-06-06',
    author: DEFAULT_BLOG_AUTHOR,
    category: 'Education',
    tags: ['education', 'student-housing', 'casegoods'],
  },
  {
    slug: 'multifamily-ffe-guide',
    title: 'Multifamily FF&E: Furnishing Apartments and Common Areas',
    excerpt:
      'Model units, furnished apartments, and amenity spaces each need a different furniture strategy. A practical FF&E playbook for multifamily developers and property managers.',
    date: 'June 8, 2026',
    isoDate: '2026-06-08',
    author: DEFAULT_BLOG_AUTHOR,
    category: 'Multifamily',
    tags: ['multifamily', 'residential', 'ffe'],
  },
  {
    slug: 'hotel-lobby-furniture-guide',
    title: 'Hotel Lobby Furniture: Planning Public Spaces That Work',
    excerpt:
      'Your lobby sets the first impression and takes round-the-clock use. How to plan seating zones, pick contract-grade pieces, and balance design intent with durability.',
    date: 'June 9, 2026',
    isoDate: '2026-06-09',
    author: DEFAULT_BLOG_AUTHOR,
    category: 'Hotel Furniture',
    tags: ['hotel', 'lobby', 'seating'],
  },
];

export function getAllBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function getRelatedBlogPosts(currentSlug, limit = 3) {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return blogPosts.slice(0, limit);

  const scored = blogPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score: (p.tags || []).filter((t) => (current.tags || []).includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}
