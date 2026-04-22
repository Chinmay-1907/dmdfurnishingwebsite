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
