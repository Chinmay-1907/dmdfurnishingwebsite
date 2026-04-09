import Image from 'next/image';
import Link from 'next/link';
import { getAllInspirations } from '../../lib/inspirations';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import styles from './page.module.css';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Hospitality Furniture Design Inspirations',
    description:
      'Browse hospitality furniture design inspirations from DMD Furnishing \u2014 hotel lobbies, guestroom casegoods, restaurant seating, suites, lounges, and cafe concepts for commercial projects.',
    path: '/inspirations',
    image: '/Images/Elevated_Restaurant_Seating.jpg',
  });
}

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

function buildSchema(inspirations) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Hospitality Furniture Design Inspirations | DMD Furnishing',
        description:
          'Browse hospitality furniture design inspirations from DMD Furnishing.',
        url: `${siteUrl}/inspirations`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Inspirations', item: `${siteUrl}/inspirations` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'DMD Furnishing Design Inspirations',
        itemListElement: inspirations.map((insp, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'CreativeWork',
            name: insp.title,
            description: insp.description,
            url: `${siteUrl}/inspirations/${insp.id}`,
          },
        })),
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const highlights = [
  'Material & finish direction',
  'Furniture planning ideas',
  'Hospitality-focused styling',
  'Custom project adaptation',
];

// Category → product space slug mapping
const categoryToSpace = {
  Hotel: 'hotel',
  Restaurant: 'restaurant',
  Resort: 'hotel',
  Corporate: 'office',
  Cafe: 'restaurant',
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function InspirationsPage() {
  const inspirations = getAllInspirations();
  const schema = buildSchema(inspirations);

  // Build alternating rows for visual rhythm
  const layoutRows = [];
  if (inspirations.length >= 2) {
    layoutRows.push({ type: 'largeSmall', items: inspirations.slice(0, 2) });
  }
  if (inspirations.length >= 4) {
    layoutRows.push({ type: 'smallLarge', items: inspirations.slice(2, 4) });
  }
  if (inspirations.length >= 5) {
    const remaining = inspirations.slice(4);
    layoutRows.push({
      type: remaining.length >= 3 ? 'triple' : 'largeSmall',
      items: remaining,
    });
  }

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── 1. Hero Card ── */}
      <section className={styles.hero} aria-label="Design inspirations">
        <div className={styles.heroCard}>
          <div className={styles.heroCardGlow} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Design Library</p>
            <h1>Inspiration for Every Space</h1>
            <p className={styles.heroLede}>
              Visual concepts and material direction for hospitality, commercial, and
              institutional environments &mdash; paired with the furniture to bring them to life.
            </p>
            <div className={styles.heroPills}>
              {highlights.map((item) => (
                <span key={item} className={styles.heroPill}>{item}</span>
              ))}
            </div>
            <div className={styles.heroActions}>
              <Link href="/schedule-call" className={styles.primaryBtn}>
                Schedule a Consultation
              </Link>
              <a href="#gallery" className={styles.secondaryBtn}>
                Explore Concepts
              </a>
            </div>
          </div>
          <div className={styles.heroImageWrap}>
            <Image
              src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Hospitality design inspiration"
              fill
              priority
              sizes="(max-width: 720px) 100vw, 50vw"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      <div className={styles.shell}>
        {/* ── 2. Gallery ── */}
        <section id="gallery" className={styles.gallerySection}>
          <p className={styles.eyebrow}>Browse Concepts</p>
          <h2>Ideas You Can Build From</h2>
          <p className={styles.sectionLede}>
            Each concept pairs a strong visual direction with practical materials and features
            that translate to commercial furniture programs.
          </p>

          <div className={styles.gallery}>
            {layoutRows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={`${styles.galleryRow} ${
                  row.type === 'largeSmall'
                    ? styles.rowLargeSmall
                    : row.type === 'smallLarge'
                      ? styles.rowSmallLarge
                      : styles.rowTriple
                }`}
              >
                {row.items.map((insp) => {
                  const spaceSlug = categoryToSpace[insp.category];
                  return (
                    <article key={insp.id} className={styles.card}>
                      <div className={styles.cardBg}>
                        <Image
                          src={insp.image}
                          alt={insp.title}
                          fill
                          sizes="(max-width: 720px) 100vw, 50vw"
                          className={styles.cardBgImage}
                        />
                      </div>
                      <div className={styles.cardOverlay} aria-hidden="true" />
                      <div className={styles.cardContent}>
                        <span className={styles.cardCategory}>{insp.category}</span>
                        <h3>{insp.title}</h3>
                        <p className={styles.cardDesc}>{insp.description}</p>
                        <div className={styles.cardFooter}>
                          <Link
                            href={`/inspirations/${insp.id}`}
                            className={styles.cardLink}
                          >
                            View Concept <span>&rarr;</span>
                          </Link>
                          {spaceSlug && (
                            <Link
                              href={`/products?space=${spaceSlug}`}
                              className={`${styles.cardLink} ${styles.cardLinkMuted}`}
                            >
                              Browse Products <span>&rarr;</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. CTA ── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaLine} />
          <p className={styles.eyebrow}>Have a Space in Mind?</p>
          <h2>Let&rsquo;s bring your vision to life.</h2>
          <p className={styles.ctaLede}>
            These concepts are starting points &mdash; we adapt materials, finishes, and
            furniture to fit your project, timeline, and budget.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/schedule-call" className={styles.primaryBtn}>
              Schedule a Call
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              Request a Quote
            </Link>
          </div>
          <div className={styles.ctaContact}>
            <a href="tel:+16172237781">+1 (617) 223-7781</a>
            <span>|</span>
            <a href="mailto:Sales@DMDFurnishing.com">Sales@DMDFurnishing.com</a>
          </div>
        </section>
      </div>
    </main>
  );
}
