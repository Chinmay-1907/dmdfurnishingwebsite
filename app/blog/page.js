import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import { siteUrl } from '../../lib/metadata';
import styles from './page.module.css';

export const metadata = {
  title: 'Commercial FF&E Blog | Hotel Furniture Insights',
  description:
    'Hospitality FF&E articles for hotel, restaurant, and commercial projects: guestroom checklists, casegood materials, value engineering, and procurement timelines.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'Commercial FF&E Blog | DMD Furnishing',
    description:
      'Hospitality FF&E articles for hotel, restaurant, and commercial projects: guestroom checklists, casegood materials, value engineering, and procurement timelines.',
    url: `${siteUrl}/blog`,
    siteName: 'DMD Furnishing',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/Images/Tailored_Guestroom_Collections.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial FF&E Blog | DMD Furnishing',
    description:
      'Hospitality FF&E articles for hotel, restaurant, and commercial projects: guestroom checklists, casegood materials, value engineering, and procurement timelines.',
  },
};

const posts = [
  {
    slug: 'what-is-ffe-hospitality',
    title: 'What Is FF&E? The Hospitality Buyer Guide',
    excerpt:
      'FF&E stands for Furniture, Fixtures, and Equipment, and it drives both your budget and the guest experience. See exactly what qualifies, how it differs from OS&E, and where buyers get tripped up.',
    date: 'March 28, 2026',
    category: 'FF&E Guide',
  },
  {
    slug: 'hotel-guestroom-furniture-checklist',
    title: 'Hotel Guestroom Furniture Checklist for Every Room',
    excerpt:
      'Every piece a commercial guestroom actually needs, from bed frame and headboard to desk, luggage bench, and vanity. Includes the spec notes brand standards expect.',
    date: 'March 28, 2026',
    category: 'Hotel Furniture',
  },
  {
    slug: 'value-engineering-commercial-furniture',
    title: 'How to Value Engineer Commercial Furniture the Right Way',
    excerpt:
      'Value engineering is not the same as cost cutting. See the moves procurement teams use to trim FF&E spend while protecting durability, finish quality, and brand standards.',
    date: 'March 28, 2026',
    category: 'Procurement',
  },
  {
    slug: 'hpl-veneer-solid-wood-hotel-casegoods',
    title: 'HPL vs Veneer vs Solid Wood for Hotel Casegoods',
    excerpt:
      'Each surface has a different story on cost, durability, and finish. Compare HPL, wood veneer, and solid wood for guestroom casegoods so you can spec with confidence.',
    date: 'March 28, 2026',
    category: 'Materials',
  },
  {
    slug: 'restaurant-seating-guide',
    title: 'Restaurant Seating Guide: Booth, Chair, or Bar Stool',
    excerpt:
      'Seating shapes dwell time, table density, and brand feel. Learn when to spec booths, dining chairs, or bar stools based on concept, layout, and commercial durability needs.',
    date: 'March 28, 2026',
    category: 'Restaurant',
  },
  {
    slug: 'ffe-procurement-timeline',
    title: 'FF&E Procurement Timeline from Concept to Install',
    excerpt:
      'Lead times, approvals, and delivery logistics can make or break an opening date. Walk through a realistic FF&E schedule for a commercial hospitality project.',
    date: 'March 28, 2026',
    category: 'Hospitality',
  },
];

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteUrl}/blog#webpage`,
  url: `${siteUrl}/blog`,
  name: 'Commercial FF&E Blog | DMD Furnishing',
  description:
    'Hospitality FF&E articles for hotel, restaurant, and commercial projects.',
  isPartOf: { '@id': `${siteUrl}/#website` },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
    ],
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: posts.length,
    itemListElement: posts.map((post, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${siteUrl}/blog/${post.slug}`,
      name: post.title,
    })),
  },
};

export default function BlogIndexPage() {
  return (
    <div className={styles.blogPage}>
      <JsonLd data={collectionSchema} />

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Blog</span>
      </nav>

      <header className={styles.indexHeader}>
        <h1 className={styles.indexTitle}>Commercial Furniture and FF&amp;E Insights</h1>
        <p className={styles.indexIntro}>
          Straight answers on hospitality FF&amp;E, casegood materials, and procurement timelines,
          written by the DMD Furnishing team from the factory floor out. Built for designers,
          owners, and procurement managers who need to spec it right the first time.
        </p>
      </header>

      <div className={styles.grid}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
            <span className={styles.blogCardCategory}>{post.category}</span>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardExcerpt}>{post.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <span className={styles.cardReadMore}>Read article →</span>
              <span className={styles.blogCardReadTime}>{post.date}</span>
            </div>
          </Link>
        ))}
      </div>

      <section className={styles.relatedResources}>
        <h2>Keep Exploring</h2>
        <div className={styles.resourceGrid}>
          <Link href="/products" className={styles.resourceCard}>
            <h3>Product Catalog</h3>
            <p>Browse commercial furniture built for hotels, restaurants, and multifamily.</p>
          </Link>
          <Link href="/services" className={styles.resourceCard}>
            <h3>Our Services</h3>
            <p>Custom manufacturing, FF&amp;E coordination, and value engineering under one roof.</p>
          </Link>
          <Link href="/about" className={styles.resourceCard}>
            <h3>About DMD</h3>
            <p>In-house design team, dual manufacturing, and a seven phase project process.</p>
          </Link>
          <Link href="/contact#schedule" className={styles.resourceCard}>
            <h3>Free Consultation</h3>
            <p>Talk to a hospitality FF&amp;E specialist about your project scope.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
