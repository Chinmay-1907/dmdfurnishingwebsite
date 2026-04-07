import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllInspirations, getInspirationById } from '../../../lib/inspirations';
import { siteUrl } from '../../../lib/metadata';
import styles from '../inspirations.module.css';

export function generateStaticParams() {
  return getAllInspirations().map((inspiration) => ({
    id: inspiration.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const inspiration = getInspirationById(id);

  if (!inspiration) {
    return {
      title: 'Inspiration Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: inspiration.title,
    description: inspiration.description,
    alternates: {
      canonical: `${siteUrl}/inspirations/${inspiration.id}`,
    },
    openGraph: {
      title: `${inspiration.title} | DMD Furnishing`,
      description: inspiration.description,
      url: `${siteUrl}/inspirations/${inspiration.id}`,
      images: [
        {
          url: inspiration.image,
          width: 1350,
          height: 900,
        },
      ],
    },
  };
}

export default async function InspirationDetailPage({ params }) {
  const { id } = await params;
  const inspiration = getInspirationById(id);

  if (!inspiration) {
    notFound();
  }

  const pageUrl = `${siteUrl}/inspirations/${inspiration.id}`;
  const imageUrl = inspiration.image?.startsWith('http')
    ? inspiration.image
    : `${siteUrl}${inspiration.image}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Inspirations', item: `${siteUrl}/inspirations` },
          { '@type': 'ListItem', position: 3, name: inspiration.title, item: pageUrl },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': pageUrl,
        name: inspiration.title,
        description: inspiration.description,
        image: imageUrl,
        url: pageUrl,
        creator: {
          '@type': 'Organization',
          name: 'DMD Furnishing',
          '@id': `${siteUrl}/#organization`,
        },
        genre: inspiration.category || 'Hospitality Furniture Design',
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className={styles.detailHero}>
        <div className={styles.detailHeroImageWrap}>
          <Image
            src={inspiration.image}
            alt={inspiration.title}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.detailHeroContent}>
          <p className={styles.eyebrow}>{inspiration.category}</p>
          <h1>{inspiration.title}</h1>
          <p className={styles.heroText}>{inspiration.description}</p>
          <div className={styles.detailActions}>
            <Link href="/inspirations" className={styles.secondaryCta}>
              Back to inspirations
            </Link>
            <Link href="/contact" className={styles.cta}>
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.detailGrid}>
        <article className={styles.detailCard}>
          <p className={styles.eyebrow}>Overview</p>
          <h2>Concept direction</h2>
          <p>{inspiration.fullDescription}</p>
        </article>

        <article className={styles.detailCard}>
          <p className={styles.eyebrow}>Materials</p>
          <h2>Suggested palette</h2>
          <ul className={styles.list}>
            {inspiration.materials.map((material) => (
              <li key={material}>{material}</li>
            ))}
          </ul>
        </article>

        <article className={styles.detailCard}>
          <p className={styles.eyebrow}>Features</p>
          <h2>Functional cues</h2>
          <ul className={styles.list}>
            {inspiration.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>
      </section>

      {inspiration.relatedImages.length > 0 ? (
        <section className={styles.gallerySection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Gallery</p>
            <h2>Related references</h2>
          </div>
          <div className={styles.galleryGrid}>
            {inspiration.relatedImages.map((image, index) => (
              <div key={image} className={styles.galleryItem}>
                <Image
                  src={image}
                  alt={`${inspiration.title} reference ${index + 1}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className={styles.cardImage}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
