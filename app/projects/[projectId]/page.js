import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectById } from '../../../lib/projects';
import { generatePageMetadata, siteUrl } from '../../../lib/metadata';
import BeforeAfterShowcase from '../../../components/projects/BeforeAfterShowcase';
import ProjectGallery from '../../../components/projects/ProjectGallery';
import ProjectNav from '../../../components/projects/ProjectNav';
import styles from './page.module.css';

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    projectId: project.id,
  }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    return { title: 'Project Not Found', robots: { index: false, follow: false } };
  }

  const description = project.shortDescription || project.fullDescription || 'Project details';
  return generatePageMetadata({
    title: project.name,
    description,
    path: `/projects/${project.id}`,
    image: project.mainImage || '/Images/Our_Projects.jpg',
    type: 'article',
  });
}

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

function buildSchema(project, pageUrl) {
  const imageUrl = project.mainImage?.startsWith('http')
    ? project.mainImage
    : `${siteUrl}${project.mainImage}`;

  const graph = [
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
      publisher: { '@type': 'Organization', name: 'DMD Furnishing', '@id': `${siteUrl}/#organization` },
      about: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#localbusiness` },
    },
  ];

  // Gallery schema
  const galleryImages = Array.isArray(project.images) ? project.images : [];
  if (galleryImages.length > 0) {
    graph.push({
      '@type': 'ImageGallery',
      name: `${project.name} Gallery`,
      about: { '@type': 'Article', '@id': pageUrl },
      image: galleryImages.map((img) => ({
        '@type': 'ImageObject',
        contentUrl: img.url.startsWith('http') ? img.url : `${siteUrl}${img.url}`,
        name: img.alt || project.name,
      })),
    });
  }

  // Review schema
  if (project.clientTestimonial && project.clientName !== 'DMD Furnishing Team') {
    graph.push({
      '@type': 'Review',
      reviewBody: project.clientTestimonial,
      author: { '@type': 'Person', name: project.clientName },
      itemReviewed: { '@type': 'LocalBusiness', '@id': `${siteUrl}/#localbusiness` },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ProjectDetailPage({ params }) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) notFound();

  const allProjects = getAllProjects();
  const galleryImages = Array.isArray(project.images) ? project.images : [];
  const beforeImages = Array.isArray(project.beforeImages) ? project.beforeImages : [];
  const pageUrl = `${siteUrl}/projects/${project.id}`;
  const schema = buildSchema(project, pageUrl);

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── 1. Hero ── */}
      <section
        className={styles.hero}
        style={
          project.mainImage
            ? { backgroundImage: `url(${project.mainImage})` }
            : undefined
        }
      >
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <h1>{project.name}</h1>
          <div className={styles.heroMeta}>
            <span className={styles.categoryPill}>{project.category}</span>
            {project.completionDate && (
              <span className={styles.heroDate}>{project.completionDate}</span>
            )}
          </div>
          {(project.shortDescription || project.fullDescription) && (
            <p className={styles.heroDesc}>
              {project.shortDescription || project.fullDescription}
            </p>
          )}
        </div>
      </section>

      <div className={styles.shell}>
        {/* ── 2. Breadcrumb ── */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/projects">All Projects</Link>
          <span aria-hidden="true">/</span>
          <span>{project.name}</span>
        </nav>

        {/* ── 3. Overview Panel ── */}
        <div className={styles.overviewPanel}>
          {/* Description */}
          {project.fullDescription && (
            <div className={styles.panelBlock}>
              <p className={styles.eyebrow}>Project Overview</p>
              <p className={styles.bodyText}>{project.fullDescription}</p>
            </div>
          )}

          {/* Specifications */}
          {project.specifications?.length > 0 && (
            <div className={styles.panelBlock}>
              <p className={styles.eyebrow}>Project Details</p>
              <div className={styles.specGrid}>
                {project.specifications.map((spec) => (
                  <div key={`${spec.name}-${spec.value}`} className={styles.specItem}>
                    <span className={styles.specName}>{spec.name}</span>
                    <span className={styles.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {project.highlights?.length > 0 && (
            <div className={styles.panelBlock}>
              <p className={styles.eyebrow}>Highlights</p>
              <ul className={styles.highlights}>
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Testimonial */}
          {project.clientTestimonial && project.clientName !== 'DMD Furnishing Team' && (
            <div className={styles.panelBlock}>
              <p className={styles.eyebrow}>Client Feedback</p>
              <blockquote className={styles.testimonial}>
                <p>&ldquo;{project.clientTestimonial}&rdquo;</p>
                <footer>
                  <cite>
                    {project.clientName}
                    {project.clientPosition ? `, ${project.clientPosition}` : ''}
                  </cite>
                </footer>
              </blockquote>
            </div>
          )}
        </div>

        {/* ── 4. Before/After ── */}
        {beforeImages.length > 0 && galleryImages.length > 0 && (
          <section className={styles.componentSection}>
            <p className={styles.eyebrow}>Transformation</p>
            <h2>Before &amp; After</h2>
            <div style={{ marginTop: '1.25rem' }}>
              <BeforeAfterShowcase
                beforeImages={beforeImages}
                afterImages={galleryImages}
                projectName={project.name}
              />
            </div>
          </section>
        )}

        {/* ── 5. Gallery ── */}
        {galleryImages.length > 0 && (
          <section className={styles.componentSection}>
            <p className={styles.eyebrow}>Gallery</p>
            <h2>Installation Photography</h2>
            <div style={{ marginTop: '1.25rem' }}>
              <ProjectGallery images={galleryImages} projectName={project.name} />
            </div>
          </section>
        )}

        {/* ── 6. Project Navigation ── */}
        <ProjectNav currentId={project.id} projects={allProjects} />

        {/* ── 7. CTA ── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaLine} />
          <p className={styles.eyebrow}>Start Your Project</p>
          <h2>Ready to transform your space?</h2>
          <p className={styles.ctaLede}>
            Request a consultation. Leave with a budget range, timeline estimate,
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
