import Link from 'next/link';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import JsonLd from '../../components/JsonLd';
import styles from './commercial-furniture-manufacturing/page.module.css';

export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Buyer Guides',
  description:
    'Buyer guides for commercial furniture: hospitality FF&E procurement, contract durability, hotel casegoods, and value engineering. Foxboro, MA.',
  path: '/guides',
  image: '/Images/Our_Products.jpg',
});

const guides = [
  {
    slug: 'commercial-furniture-manufacturing',
    title: 'Commercial Furniture Manufacturing: A Buyer Guide',
    lede: 'What commercial furniture manufacturing actually covers, which construction and durability standards matter, how material choices change cost, and how a project moves from specification to install.',
    posts: [
      {
        slug: 'hpl-veneer-solid-wood-hotel-casegoods',
        title: 'HPL vs Veneer vs Solid Wood for Hotel Casegoods',
      },
      {
        slug: 'value-engineering-commercial-furniture',
        title: 'How to Value Engineer Commercial Furniture the Right Way',
      },
    ],
  },
  {
    slug: 'hospitality-ffe',
    title: 'Hospitality FF&E: A Complete Procurement Guide',
    lede: 'What hospitality FF&E includes, replacement lifecycles by property tier, how brand standards shape specs, the full procurement process, and the mistakes that blow budgets.',
    posts: [
      {
        slug: 'what-is-ffe-hospitality',
        title: 'What Is FF&E? The Hospitality Buyer Guide',
      },
      {
        slug: 'hotel-guestroom-furniture-checklist',
        title: 'Hotel Guestroom Furniture Checklist for Every Room',
      },
      {
        slug: 'ffe-procurement-timeline',
        title: 'FF&E Procurement Timeline from Concept to Install',
      },
      {
        slug: 'restaurant-seating-guide',
        title: 'Restaurant Seating Guide: Booth, Chair, or Bar Stool',
      },
    ],
  },
];

const indexSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${siteUrl}/guides`,
      url: `${siteUrl}/guides`,
      name: 'Commercial Furniture Buyer Guides',
      description:
        'In-depth guides for commercial furniture buyers: hospitality FF&E procurement, contract durability standards, and value engineering.',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteUrl}/guides` },
      ],
    },
  ],
};

export default function GuidesIndexPage() {
  return (
    <main className={styles.page}>
      <JsonLd data={indexSchema} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Guides</span>
          </nav>
          <p className={styles.eyebrow}>Commercial Furniture Library</p>
          <h1 className={styles.h1}>Commercial Furniture Buyer Guides</h1>
          <p className={styles.lede}>
            Long-form guides for interior designers, hotel owners, and FF&amp;E procurement teams.
            Each one walks through the contract durability and fire safety standards that matter,
            and the real decisions a hospitality project has to make.
          </p>
        </div>
      </section>

      <section className={styles.bodyWrap}>
        <div className={styles.bodyInner} style={{ gridTemplateColumns: '1fr' }}>
          <article className={styles.article} style={{ maxWidth: '880px', margin: '0 auto' }}>
            <section style={{ marginBottom: '2.5rem' }}>
              <p>
                Buying commercial furniture is a different discipline from buying residential
                furniture. The pieces may look similar in a rendering, but the budget lines,
                performance standards, lead times, and approval workflows behind a hotel or
                restaurant fit-out have far more in common with construction procurement than
                with retail shopping. A guestroom casegood package has to reconcile brand
                standards, fire safety and durability requirements, a fixed opening date, and a
                budget set months before the first purchase order. The decisions that determine
                whether all of that holds together are made early, during design development,
                not at the loading dock.
              </p>
              <p>
                These guides exist to make those decisions easier. They are written for the
                people who actually carry FF&amp;E responsibility on a project: owners and
                developers approving budgets, interior designers writing specifications, and
                procurement managers holding the schedule. Each guide walks the full decision
                path, covering what to specify, which standards to cite, where the real costs hide, and
                how the procurement process unfolds from bill of quantities through factory
                quality control and installation. Everything draws on what we see daily as a
                commercial furniture manufacturer serving hospitality projects across the
                United States.
              </p>
              <p>
                Start with the pillar guide closest to your current question, then use the
                supporting articles under each one to go deeper on specific decisions like
                surface materials, value engineering, seating selection, and procurement
                scheduling.
              </p>
            </section>
          </article>

          {/* Pillar guides as typographic cards (matches blog index card language) */}
          <div className={styles.guideCardGrid}>
            {guides.map((guide) => (
              <article key={guide.slug} className={styles.guideCard}>
                <p className={styles.guideCardEyebrow}>Pillar Guide</p>
                <h2 className={styles.guideCardTitle}>
                  <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h2>
                <p className={styles.guideCardLede}>{guide.lede}</p>
                <p className={styles.guideCardLinksLabel}>Supporting articles</p>
                <ul className={styles.guideCardLinks}>
                  {guide.posts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/guides/${guide.slug}`} className={styles.guideCardCta}>
                  Read the full guide
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
