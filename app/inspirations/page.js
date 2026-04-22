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
      'Hotel furniture design ideas, restaurant interior design inspiration, and commercial furniture inspiration gallery from DMD Furnishing. Real rooms, real specs, built to order.',
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
          'Hotel furniture design ideas, restaurant interior design inspiration, and commercial furniture inspiration from DMD Furnishing. Each board pairs a visual direction with contract-grade specs.',
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
        name: 'DMD Furnishing Hospitality Furniture Design Inspirations',
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
  'Material and finish palettes',
  'Furniture layout plans',
  'Hospitality grade specs',
  'Built to your brand',
];

// Category → product space slug mapping (keys drive routing, do not change)
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
      <section className={styles.hero} aria-label="Hospitality furniture design inspirations">
        <div className={styles.heroCard}>
          <div className={styles.heroCardGlow} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Hospitality Design Inspirations</p>
            <h1>Design Ideas You Can Build</h1>
            <p className={styles.heroLede}>
              Browse real hotel lobbies, guestrooms, restaurants, lounges, and offices,
              with the furniture, fabrics, and finishes that made each one work. Every board
              pairs a visual direction with contract-grade specs our shop can manufacture to
              your floor plan.
            </p>
            <div className={styles.heroPills}>
              {highlights.map((item) => (
                <span key={item} className={styles.heroPill}>{item}</span>
              ))}
            </div>
            <div className={styles.heroActions}>
              <Link href="/contact#schedule" className={styles.primaryBtn}>
                Schedule a Consultation
              </Link>
              <a href="#gallery" className={styles.secondaryBtn}>
                Explore Concepts
              </a>
            </div>
          </div>
          <div className={styles.heroImageWrap}>
            <Image
              src="/images/Hotel_Guest_Room_Hero.png"
              alt="Custom walnut casegoods, upholstered headboard, and contract-grade furniture in a tailored hotel guestroom interior"
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
          <h2>Hotel, restaurant, and commercial furniture inspiration.</h2>
          <p className={styles.sectionLede}>
            Each board shows a complete room and the pieces behind it. HPL versus real
            veneer, performance fabric versus linen, solid oak versus oak on substrate. Start
            with one you like and we will adapt it to your brand and budget.
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
          <h2>Pick a board. We will build it for your project.</h2>
          <p className={styles.ctaLede}>
            Send us the board you like and we will adapt it. Different finishes, different
            fabrics, different dimensions, all tailored to your brand standards, floor plan,
            and budget.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact#schedule" className={styles.primaryBtn}>
              Schedule a Call
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
