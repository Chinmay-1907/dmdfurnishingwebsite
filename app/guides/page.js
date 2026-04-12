import Link from 'next/link';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import JsonLd from '../../components/JsonLd';
import styles from './commercial-furniture-manufacturing/page.module.css';

export const metadata = generatePageMetadata({
  title: 'Commercial Furniture Guides — DMD Furnishing',
  description:
    'In-depth guides for commercial furniture buyers. Hospitality FF&E procurement, BIFMA construction standards, hotel guestroom casegoods, and value engineering from a Foxboro MA manufacturer.',
  path: '/guides',
  image: '/Images/Our_Products.jpg',
});

const guides = [
  {
    slug: 'commercial-furniture-manufacturing',
    title: 'Commercial Furniture Manufacturing — A Complete Buyer Guide',
    lede: 'What commercial furniture manufacturing is, the standards that matter (BIFMA, NFPA, CAL 117, AWI), material choices, and the manufacturing process from specification to install.',
  },
  {
    slug: 'hospitality-ffe',
    title: 'Hospitality FF&E — A Complete Procurement Guide',
    lede: 'A practical walkthrough of what hospitality FF&E includes, replacement lifecycles by property tier, brand standards, the procurement process, and the mistakes that blow budgets.',
  },
];

const indexSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${siteUrl}/guides`,
      url: `${siteUrl}/guides`,
      name: 'Commercial Furniture Guides',
      description:
        'In-depth guides for commercial furniture buyers — hospitality FF&E procurement, construction standards, and value engineering.',
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
          <h1 className={styles.h1}>In-Depth Guides for Commercial Furniture Buyers</h1>
          <p className={styles.lede}>
            Practical guides written for interior designers, hotel general managers, and FF&amp;E
            procurement teams. Each guide cites the industry standards that matter (BIFMA,
            NFPA 701, CAL 117-2013, AWI Quality Standards) and walks through the decisions a
            typical project actually hits.
          </p>
        </div>
      </section>

      <section className={styles.bodyWrap}>
        <div className={styles.bodyInner} style={{ gridTemplateColumns: '1fr' }}>
          <article className={styles.article} style={{ maxWidth: '880px', margin: '0 auto' }}>
            {guides.map((guide) => (
              <section key={guide.slug} style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ marginBottom: '0.75rem' }}>
                  <Link href={`/guides/${guide.slug}`} style={{ color: '#f5f1e8', borderBottom: 'none' }}>
                    {guide.title}
                  </Link>
                </h2>
                <p>{guide.lede}</p>
                <p>
                  <Link href={`/guides/${guide.slug}`}>Read the full guide →</Link>
                </p>
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
