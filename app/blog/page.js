import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import { siteUrl } from '../../lib/metadata';
import styles from './page.module.css';

export const metadata = {
  title: 'FF&E & Commercial Furniture Blog | DMD Furnishing',
  description:
    'Practical FF&E insights for hospitality professionals — from hotel guestroom checklists and material comparisons to procurement timelines and value-engineering strategies.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'FF&E & Commercial Furniture Blog | DMD Furnishing',
    description:
      'Practical FF&E insights for hospitality professionals — from hotel guestroom checklists and material comparisons to procurement timelines and value-engineering strategies.',
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
    title: 'FF&E & Commercial Furniture Blog | DMD Furnishing',
    description:
      'Practical FF&E insights for hospitality professionals — from hotel guestroom checklists and material comparisons to procurement timelines and value-engineering strategies.',
  },
};

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteUrl}/blog#webpage`,
  url: `${siteUrl}/blog`,
  name: 'Commercial Furniture & FF&E Blog | DMD Furnishing',
  description:
    'Practical FF&E and commercial furniture insights for hospitality professionals.',
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
};

const posts = [
  {
    slug: 'what-is-ffe-hospitality',
    title: 'What Is FF&E? A Complete Guide for Hospitality Projects',
    excerpt:
      'FF&E — Furniture, Fixtures & Equipment — is the backbone of every hospitality fit-out. Learn exactly what qualifies as FF&E, how it differs from OS&E, and why it drives both budget and guest experience.',
    date: 'March 28, 2026',
    category: 'FF&E Guide',
    readTime: '6 min read',
  },
  {
    slug: 'hotel-guestroom-furniture-checklist',
    title: 'Hotel Guestroom Furniture Checklist: What Every Room Needs',
    excerpt:
      'A thorough breakdown of every furniture piece required in a hotel guestroom — from the bed frame and headboard to the desk, luggage bench, and vanity — with guidance on commercial specifications.',
    date: 'March 28, 2026',
    category: 'Hotel Furniture',
    readTime: '7 min read',
  },
  {
    slug: 'value-engineering-commercial-furniture',
    title: 'How to Value-Engineer Commercial Furniture Without Losing Quality',
    excerpt:
      'Value engineering is not just cost-cutting. Discover the strategies procurement teams use to reduce FF&E spend while maintaining durability, aesthetics, and brand standards.',
    date: 'March 28, 2026',
    category: 'Procurement',
    readTime: '6 min read',
  },
  {
    slug: 'hpl-veneer-solid-wood-hotel-casegoods',
    title: 'HPL vs Veneer vs Solid Wood: Choosing the Right Surface for Hotel Casegoods',
    excerpt:
      'Each surface material brings different trade-offs in cost, durability, and appearance. This guide compares HPL, wood veneer, and solid wood specifically for hotel guestroom casegoods.',
    date: 'March 28, 2026',
    category: 'Materials',
    readTime: '8 min read',
  },
  {
    slug: 'restaurant-seating-guide',
    title: 'Restaurant Seating Guide: Booth, Chair, or Bar Stool?',
    excerpt:
      'Seating choice shapes dwell time, table density, and brand atmosphere. Understand when to specify booths, dining chairs, or bar stools based on your concept, layout, and commercial durability needs.',
    date: 'March 28, 2026',
    category: 'Restaurant',
    readTime: '7 min read',
  },
  {
    slug: 'ffe-procurement-timeline',
    title: 'FF&E Procurement Timeline: What to Expect from Concept to Install',
    excerpt:
      'Lead times, approval cycles, and delivery logistics can make or break an opening date. Here is a realistic timeline for FF&E procurement on a commercial hospitality project.',
    date: 'March 28, 2026',
    category: 'Hospitality',
    readTime: '8 min read',
  },
];

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
        <h1 className={styles.indexTitle}>Commercial Furniture &amp; FF&amp;E Insights</h1>
        <p className={styles.indexIntro}>
          Practical guidance for hospitality designers, procurement managers, and owners navigating
          FF&amp;E specifications, material selection, and project timelines. All articles are written
          from real commercial furniture manufacturing experience.
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
              <span className={styles.blogCardReadTime}>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

      <section className={styles.relatedResources}>
        <h2>Related Resources</h2>
        <div className={styles.resourceGrid}>
          <Link href="/products" className={styles.resourceCard}>
            <h3>Product Catalog</h3>
            <p>Explore 475+ commercial furniture products for hospitality projects.</p>
          </Link>
          <Link href="/services" className={styles.resourceCard}>
            <h3>Our Services</h3>
            <p>Custom manufacturing, FF&amp;E coordination, and value engineering.</p>
          </Link>
          <Link href="/about" className={styles.resourceCard}>
            <h3>About DMD</h3>
            <p>Learn about our manufacturing approach and commitment to quality.</p>
          </Link>
          <Link href="/schedule-call" className={styles.resourceCard}>
            <h3>Free Consultation</h3>
            <p>Speak with a hospitality furniture specialist today.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
