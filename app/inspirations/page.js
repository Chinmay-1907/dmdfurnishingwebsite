import Image from 'next/image';
import Link from 'next/link';
import { getAllInspirations } from '../../lib/inspirations';
import styles from './inspirations.module.css';

const inspirationsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Hospitality Furniture Design Inspirations | DMD Furnishing',
      description:
        'Browse hospitality furniture design inspirations from DMD Furnishing — hotel lobbies, guestroom casegoods, restaurant seating, suites, lounges, and cafe concepts for commercial projects.',
      url: 'https://dmdfurnishing.com/inspirations',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dmdfurnishing.com' },
        { '@type': 'ListItem', position: 2, name: 'Inspirations', item: 'https://dmdfurnishing.com/inspirations' },
      ],
    },
  ],
};

export const metadata = {
  title: 'Hospitality Furniture Design Inspirations | DMD Furnishing',
  description:
    'Browse hospitality furniture design inspirations from DMD Furnishing — hotel lobbies, guestroom casegoods, restaurant seating, suites, lounges, and cafe concepts for commercial projects.',
  alternates: {
    canonical: 'https://dmdfurnishing.com/inspirations',
  },
  openGraph: {
    title: 'Hospitality Furniture Design Inspirations | DMD Furnishing',
    description:
      'Browse hospitality furniture design inspirations from DMD Furnishing — hotel lobbies, guestroom casegoods, restaurant seating, suites, lounges, and cafe concepts for commercial projects.',
    url: 'https://dmdfurnishing.com/inspirations',
    images: [
      {
        url: '/Images/Elevated_Restaurant_Seating.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const inspirationHighlights = [
  'Material and finish direction',
  'Furniture planning ideas',
  'Hospitality-focused styling cues',
  'Ready for custom project adaptation',
];

export default function InspirationsPage() {
  const inspirations = getAllInspirations();

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(inspirationsSchema) }} />
      <section className={styles.hero}>
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Design Library</p>
          <h1>Design Inspirations</h1>
          <p className={styles.heroText}>
            Curated hospitality concepts showing how furniture, finishes, and layout choices
            can shape the feel of a space before it becomes a project.
          </p>
          <div className={styles.heroMeta}>
            {inspirationHighlights.map((item) => (
              <span key={item} className={styles.heroPill}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.heroImageWrap}>
          <Image
            src="/Images/Elevated_Restaurant_Seating.jpg"
            alt="Hospitality design inspiration gallery"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 42vw"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Browse Concepts</p>
          <h2>Ideas you can build from</h2>
          <p>
            Each inspiration pairs a strong visual direction with practical materials and
            features that translate well to commercial furniture programs.
          </p>
        </div>

        <div className={styles.grid}>
          {inspirations.map((inspiration) => (
            <article key={inspiration.id} className={styles.card}>
              <div className={styles.cardImageWrap}>
                <Image
                  src={inspiration.image}
                  alt={inspiration.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className={styles.cardImage}
                />
                <span className={styles.category}>{inspiration.category}</span>
              </div>
              <div className={styles.cardBody}>
                <h3>{inspiration.title}</h3>
                <p>{inspiration.description}</p>
                <div className={styles.cardFooter}>
                  <Link href={`/inspirations/${inspiration.id}`} className={styles.cardLink}>
                    View inspiration
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.callout}>
        <div>
          <p className={styles.eyebrow}>Design Collaboration</p>
          <h2>Use these concepts as a starting point.</h2>
          <p>
            These are not fixed templates. They are visual references for material direction,
            furniture types, and spatial tone that can be adapted to your project.
          </p>
        </div>
        <Link href="/contact" className={styles.cta}>
          Request design support
        </Link>
      </section>
    </main>
  );
}
