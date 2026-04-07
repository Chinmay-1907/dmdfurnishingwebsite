import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectById } from '../../../lib/projects';
import { siteUrl } from '../../../lib/metadata';
import styles from './page.module.css';

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    projectId: project.id,
  }));
}

export async function generateMetadata({ params }) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    return {
      title: 'Project Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = project.shortDescription || project.fullDescription || 'Project details';
  const image = project.mainImage || project.images?.[0]?.url || '/Images/Our_Projects.jpg';

  return {
    title: project.name,
    description,
    alternates: {
      canonical: `${siteUrl}/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.name} | DMD Furnishing`,
      description,
      url: `${siteUrl}/projects/${project.id}`,
      type: 'article',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  const galleryImages = Array.isArray(project.images) ? project.images : [];
  const beforeImages = Array.isArray(project.beforeImages) ? project.beforeImages : [];
  const pageUrl = `${siteUrl}/projects/${project.id}`;
  const imageUrl = project.mainImage
    ? (project.mainImage.startsWith('http') ? project.mainImage : `${siteUrl}${project.mainImage}`)
    : `${siteUrl}/Images/Our_Projects.jpg`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/projects` },
          { '@type': 'ListItem', position: 3, name: project.name, item: pageUrl },
        ],
      },
      {
        '@type': 'Article',
        '@id': pageUrl,
        headline: project.name,
        description: project.shortDescription || project.fullDescription || '',
        image: imageUrl,
        url: pageUrl,
        datePublished: project.completionDate || '2024-01-01',
        publisher: {
          '@type': 'Organization',
          name: 'DMD Furnishing',
          '@id': `${siteUrl}/#organization`,
        },
        about: {
          '@type': 'LocalBusiness',
          '@id': `${siteUrl}/#localbusiness`,
        },
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section
        className={styles.hero}
        style={
          project.mainImage
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(8, 23, 29, 0.2), rgba(8, 23, 29, 0.8)), url(${project.mainImage})`,
              }
            : undefined
        }
      >
        <div className={styles.heroOverlay}>
          <p className={styles.eyebrow}>{project.category}</p>
          <h1>{project.name}</h1>
          <p className={styles.heroText}>{project.shortDescription || project.fullDescription}</p>
        </div>
      </section>

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/projects">All Projects</Link>
        <span aria-hidden="true">/</span>
        <span>{project.name}</span>
      </nav>

      <section className={styles.content}>
        <article className={styles.panel}>
          <div className={styles.summary}>
            <div>
              <p className={styles.eyebrow}>Project Overview</p>
              <h2>{project.name}</h2>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.categoryTag}>{project.category}</span>
              {project.completionDate ? (
                <span className={styles.completionDate}>Completed: {project.completionDate}</span>
              ) : null}
            </div>
          </div>

          {project.fullDescription ? <p className={styles.bodyText}>{project.fullDescription}</p> : null}

          {project.specifications.length > 0 ? (
            <section className={styles.block}>
              <p className={styles.sectionLabel}>Project Details</p>
              <div className={styles.specGrid}>
                {project.specifications.map((spec) => (
                  <div key={`${spec.name}-${spec.value}`} className={styles.specItem}>
                    <span className={styles.specName}>{spec.name}</span>
                    <span className={styles.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {project.highlights.length > 0 ? (
            <section className={styles.block}>
              <p className={styles.sectionLabel}>Project Highlights</p>
              <ul className={styles.list}>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.clientTestimonial && project.clientName !== 'DMD Furnishing Team' ? (
            <section className={styles.block}>
              <p className={styles.sectionLabel}>Client Feedback</p>
              <blockquote className={styles.quote}>
                <p>"{project.clientTestimonial}"</p>
                <footer>
                  <cite>
                    - {project.clientName}
                    {project.clientPosition ? `, ${project.clientPosition}` : ''}
                  </cite>
                </footer>
              </blockquote>
            </section>
          ) : null}
        </article>

        {galleryImages.length > 0 ? (
          <section className={styles.gallerySection}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Project Gallery</p>
              <h2>Completed installation imagery</h2>
            </div>
            <div className={styles.gallery}>
              {galleryImages.map((image, index) => (
                <figure key={image.id || `${image.url}-${index}`} className={styles.galleryItem}>
                  <div className={styles.galleryImageWrap}>
                    <Image
                      src={image.url}
                      alt={image.alt || project.name}
                      fill
                      sizes="(max-width: 900px) 100vw, 40vw"
                      className={styles.galleryImage}
                    />
                  </div>
                  {image.alt ? <figcaption>{image.alt}</figcaption> : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {beforeImages.length > 0 ? (
          <section className={styles.gallerySection}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Before Gallery</p>
              <h2>Pre-renovation context</h2>
            </div>
            <div className={styles.gallery}>
              {beforeImages.map((image, index) => (
                <figure key={image.id || `before-${image.url}-${index}`} className={styles.galleryItem}>
                  <div className={styles.galleryImageWrap}>
                    <Image
                      src={image.url}
                      alt={image.alt || `${project.name} before`}
                      fill
                      sizes="(max-width: 900px) 100vw, 40vw"
                      className={styles.galleryImage}
                    />
                  </div>
                  {image.alt ? <figcaption>{image.alt}</figcaption> : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}
      </section>

      <section className={styles.actions}>
        <Link href="/projects" className={styles.secondaryCta}>
          Back to Projects
        </Link>
        <Link href="/schedule-call" className={styles.cta}>
          Schedule a Consultation
        </Link>
      </section>
    </main>
  );
}
