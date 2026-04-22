import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import { siteUrl } from '../../lib/metadata';
import { getAllBlogPosts } from '../../lib/blog-posts';
import styles from './page.module.css';

export const metadata = {
  title: 'Commercial FF&E Blog | Hotel Furniture Insights',
  description:
    'Hospitality FF&E articles: hotel guestroom checklists, casegood materials, restaurant seating, value engineering, and procurement timelines.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'Commercial FF&E Blog | DMD Furnishing',
    description:
      'Hospitality FF&E articles: hotel guestroom checklists, casegood materials, restaurant seating, value engineering, and procurement timelines.',
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
      'Hospitality FF&E articles: hotel guestroom checklists, casegood materials, restaurant seating, value engineering, and procurement timelines.',
  },
};

const posts = getAllBlogPosts();

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
