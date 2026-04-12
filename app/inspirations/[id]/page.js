import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllInspirations, getInspirationById } from '../../../lib/inspirations';
import { generatePageMetadata, siteUrl } from '../../../lib/metadata';
import styles from './page.module.css';

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllInspirations().map((insp) => ({ id: insp.id }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { id } = await params;
  const insp = getInspirationById(id);

  if (!insp) {
    return { title: 'Inspiration Not Found', robots: { index: false, follow: false } };
  }

  return generatePageMetadata({
    title: insp.title,
    description: insp.description,
    path: `/inspirations/${insp.id}`,
    image: insp.image,
    type: 'article',
  });
}

// ---------------------------------------------------------------------------
// Category → product space mapping
// ---------------------------------------------------------------------------

const categoryToSpace = {
  Hotel: { slug: 'hotel', label: 'Hotel & Hospitality' },
  Restaurant: { slug: 'restaurant', label: 'Restaurant & Dining' },
  Resort: { slug: 'hotel', label: 'Hotel & Resort' },
  Corporate: { slug: 'office', label: 'Office & Corporate' },
  Cafe: { slug: 'restaurant', label: 'Restaurant & Cafe' },
};

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

function buildSchema(insp, pageUrl) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Inspirations', item: `${siteUrl}/inspirations` },
          { '@type': 'ListItem', position: 3, name: insp.title, item: pageUrl },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': pageUrl,
        name: insp.title,
        description: insp.description,
        image: insp.image,
        url: pageUrl,
        creator: { '@type': 'Organization', name: 'DMD Furnishing', '@id': `${siteUrl}/#organization` },
        genre: insp.category || 'Hospitality Furniture Design',
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function InspirationDetailPage({ params }) {
  const { id } = await params;
  const insp = getInspirationById(id);

  if (!insp) notFound();

  const allInspirations = getAllInspirations();
  const currentIndex = allInspirations.findIndex((i) => i.id === insp.id);
  const prevIndex = (currentIndex - 1 + allInspirations.length) % allInspirations.length;
  const nextIndex = (currentIndex + 1) % allInspirations.length;
  const prev = allInspirations[prevIndex];
  const next = allInspirations[nextIndex];

  const pageUrl = `${siteUrl}/inspirations/${insp.id}`;
  const schema = buildSchema(insp, pageUrl);
  const space = categoryToSpace[insp.category];

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── 1. Hero ── */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${insp.image})` }}
      >
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <span className={styles.categoryPill}>{insp.category}</span>
          <h1>{insp.title}</h1>
          <p className={styles.heroDesc}>{insp.description}</p>
        </div>
      </section>

      <div className={styles.shell}>
        {/* ── 2. Breadcrumb ── */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/inspirations">All Inspirations</Link>
          <span aria-hidden="true">/</span>
          <span>{insp.title}</span>
        </nav>

        {/* ── 3. Overview ── */}
        <div className={styles.overviewPanel}>
          <p className={styles.eyebrow}>Concept Direction</p>
          <p className={styles.bodyText}>{insp.fullDescription}</p>

          <div className={styles.twoCol}>
            <div className={styles.subPanel}>
              <p className={styles.eyebrow}>Materials</p>
              <ul className={styles.bulletList}>
                {insp.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div className={styles.subPanel}>
              <p className={styles.eyebrow}>Features</p>
              <ul className={styles.bulletList}>
                {insp.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── 4. Gallery ── */}
        {insp.relatedImages?.length > 0 && (
          <section className={styles.gallerySection}>
            <p className={styles.eyebrow}>Gallery</p>
            <h2>Related References</h2>
            <div className={styles.galleryGrid}>
              {insp.relatedImages.map((img, i) => (
                <div key={img} className={styles.galleryItem}>
                  <Image
                    src={img}
                    alt={`${insp.title} reference ${i + 1}`}
                    fill
                    sizes="(max-width: 720px) 50vw, 33vw"
                    className={styles.galleryImage}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 5. Product Connection ── */}
        {space && (
          <Link href={`/products?space=${space.slug}`} className={styles.productLink}>
            <div className={styles.productLinkText}>
              <p className={styles.eyebrow}>Bring This to Life</p>
              <h3>Browse {space.label} Products</h3>
              <p>
                Explore the furniture, casegoods, and seating that can make this concept a reality.
              </p>
            </div>
            <span className={styles.productLinkArrow}>&rarr;</span>
          </Link>
        )}

        {/* ── 6. Prev/Next Navigation ── */}
        {allInspirations.length > 1 && (
          <nav className={styles.nav} aria-label="Inspiration navigation">
            <Link href={`/inspirations/${prev.id}`} className={styles.navCard}>
              <span className={styles.navArrow}>&larr;</span>
              <div className={styles.navInfo}>
                <span className={styles.navLabel}>Previous</span>
                <span className={styles.navName}>{prev.title}</span>
              </div>
            </Link>
            <Link href={`/inspirations/${next.id}`} className={`${styles.navCard} ${styles.navCardNext}`}>
              <div className={styles.navInfo} style={{ textAlign: 'right' }}>
                <span className={styles.navLabel}>Next</span>
                <span className={styles.navName}>{next.title}</span>
              </div>
              <span className={styles.navArrow}>&rarr;</span>
            </Link>
          </nav>
        )}

        {/* ── 7. CTA ── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaLine} />
          <p className={styles.eyebrow}>Start Your Project</p>
          <h2>Ready to bring this to life?</h2>
          <p className={styles.ctaLede}>
            Free 30-minute consultation. Leave with a budget range, timeline estimate,
            and clear next steps.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact#schedule" className={styles.primaryBtn}>
              Schedule a Call
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              Request a Quote
            </Link>
          </div>
          <div className={styles.ctaContact}>
            <a href="tel:+16172237781">+1 (617) 223-7781</a>
            <span>|</span>
            <a href="mailto:sales@dmdfurnishing.com">sales@dmdfurnishing.com</a>
          </div>
        </section>
      </div>
    </main>
  );
}
