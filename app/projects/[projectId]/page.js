import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectById, pickBestImage } from '../../../lib/projects';
import { generatePageMetadata, siteUrl } from '../../../lib/metadata';
import BeforeAfterShowcase from '../../../components/projects/BeforeAfterShowcase';
import ProjectGallery from '../../../components/projects/ProjectGallery';
import ProjectNav from '../../../components/projects/ProjectNav';
import Breadcrumbs from '../../../components/Breadcrumbs';
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
  const beforeImagesRaw = Array.isArray(project.beforeImages) ? project.beforeImages : [];
  const pageUrl = `${siteUrl}/projects/${project.id}`;
  const schema = buildSchema(project, pageUrl);

  // Projects whose source images are small (<800px wide). For these, cap the
  // gallery render width so the image isn't upscaled and pixelated. Discovered
  // via image audit: SureStay SSBW-* files are 720x480; Quality Inn Bangor
  // PHOTO-2025-* files are 2048x1536 (tighter than the 6720px IMG_* set).
  const lowResProjects = new Set(['surestay-bw-fredrick-md', 'quality-inn-bangor-maine']);
  const galleryMaxWidth = lowResProjects.has(project.id) ? 720 : null;

  // Slider only renders when real before images exist.
  // "After" uses <featuredAfter> override if present — otherwise picks the
  // largest gallery file. We deliberately skip mainImage because it's usually
  // the exterior hero shot, not the furniture installation we want to showcase.
  const hasRealBefore = beforeImagesRaw.length > 0;
  const bestAfter = hasRealBefore
    ? (project.featuredAfter || pickBestImage(galleryImages))
    : null;
  const bestBefore = hasRealBefore ? pickBestImage(beforeImagesRaw) : null;
  const showSlider = hasRealBefore && bestAfter && bestBefore;
  const beforeImages = beforeImagesRaw;

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
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: project.name },
          ]}
        />


        {/* ── 3. Gallery (images first) ── */}
        {galleryImages.length > 0 && (
          <section className={styles.componentSection}>
            <p className={styles.eyebrow}>Gallery</p>
            <h2>Installation Photography</h2>
            <div
              style={
                galleryMaxWidth
                  ? { marginTop: '1.25rem', maxWidth: `${galleryMaxWidth}px`, marginLeft: 'auto', marginRight: 'auto' }
                  : { marginTop: '1.25rem' }
              }
            >
              <ProjectGallery images={galleryImages} projectName={project.name} />
            </div>
          </section>
        )}

        {/* ── 4. Before/After ── */}
        {showSlider && (
          <section className={styles.componentSection}>
            <p className={styles.eyebrow}>Transformation</p>
            <h2>Before &amp; After</h2>
            <div
              style={
                galleryMaxWidth
                  ? { marginTop: '1.25rem', maxWidth: `${galleryMaxWidth}px`, marginLeft: 'auto', marginRight: 'auto' }
                  : { marginTop: '1.25rem' }
              }
            >
              <BeforeAfterShowcase
                beforeImage={bestBefore}
                afterImage={bestAfter}
                projectName={project.name}
              />
            </div>
          </section>
        )}

        {/* ── 5. Overview Panel ── */}
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
