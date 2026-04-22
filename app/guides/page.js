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
  },
  {
    slug: 'hospitality-ffe',
    title: 'Hospitality FF&E: A Complete Procurement Guide',
    lede: 'What hospitality FF&E includes, replacement lifecycles by property tier, how brand standards shape specs, the full procurement process, and the mistakes that blow budgets.',
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
            {guides.map((guide) => (
              <section key={guide.slug} style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ marginBottom: '0.75rem' }}>
                  <Link href={`/guides/${guide.slug}`} style={{ borderBottom: 'none' }}>
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
