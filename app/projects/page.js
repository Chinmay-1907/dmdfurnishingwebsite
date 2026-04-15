import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from '../../lib/projects';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import styles from './page.module.css';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Hospitality Furniture Projects & Hotel Case Studies',
    description:
      'Browse DMD Furnishing hotel renovation case studies, restaurant buildouts, and commercial FF&E installations. Real projects, real scopes, real delivered work.',
    path: '/projects',
    image: '/Images/Our_Projects.jpg',
  });
}

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

function buildSchema(projects) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Hospitality Furniture Projects | DMD Furnishing',
        description:
          'Hotel renovation case studies, restaurant buildouts, and commercial FF&E installations delivered by DMD Furnishing.',
        url: `${siteUrl}/projects`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/projects` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'DMD Furnishing Project Portfolio',
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Article',
            name: p.name,
            description: p.shortDescription,
            url: `${siteUrl}/projects/${p.id}`,
            image: p.mainImage?.startsWith('http') ? p.mainImage : `${siteUrl}${p.mainImage}`,
          },
        })),
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Pick up to `count` specs that make good pills (short values) */
function pickSpecs(specs, count = 3) {
  if (!specs?.length) return [];
  return specs.slice(0, count);
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ProjectsPage() {
  const projects = getAllProjects();
  const [featured, ...rest] = projects;
  const schema = buildSchema(projects);

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── 1. Hero ── */}
      <section className={styles.hero} aria-label="Project portfolio">
        <div className={styles.heroBg}>
          <Image
            src="/Images/Our_Projects.jpg"
            alt="Completed hotel guestroom and restaurant dining installations from the DMD project portfolio"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImage}
          />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Project Portfolio</p>
          <h1>The Work That Built DMD</h1>
          <p className={styles.heroLede}>
            Hotel guestroom renovations, restaurant dining rooms, lobby refreshes, and multi
            property rollouts. Every installation is built with contract-grade commercial
            furniture and the scope is documented end to end. Open any project for the room
            count, finish palette, and the materials we built it from.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact#schedule" className={styles.primaryBtn}>
              Schedule a Consultation
            </Link>
            <a href="#projects" className={styles.secondaryBtn}>
              Browse Our Work
            </a>
          </div>
        </div>
      </section>

      <div className={styles.shell}>
        {/* ── 2. Featured Project ── */}
        {featured && (
          <section className={styles.section} aria-label="Featured project">
            <p className={styles.eyebrow}>Featured Project</p>
            <div className={styles.featuredPanel}>
              <div className={styles.featuredImageWrap}>
                <Image
                  src={featured.mainImage || '/placeholder.png'}
                  alt={featured.mainImageAlt || `${featured.name} project`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={styles.featuredImage}
                />
              </div>
              <div className={styles.featuredInfo}>
                <h2>{featured.name}</h2>
                <p className={styles.featuredDesc}>{featured.shortDescription}</p>
                {featured.specifications?.length > 0 && (
                  <div className={styles.featuredSpecs}>
                    {pickSpecs(featured.specifications).map((spec) => (
                      <span key={spec.name} className={styles.specPill}>
                        <span className={styles.specLabel}>{spec.name}:</span>
                        <span className={styles.specVal}>{spec.value}</span>
                      </span>
                    ))}
                  </div>
                )}
                <Link href={`/projects/${featured.id}`} className={styles.featuredLink}>
                  View Full Project <span className={styles.featuredArrow}>&rarr;</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── 3. Project Grid ── */}
        <section id="projects" className={`${styles.section} ${styles.gridSection}`}>
          <p className={styles.eyebrow}>The Portfolio</p>
          <h2>More Hotel Renovations and Commercial Buildouts</h2>
          <p className={styles.sectionLede}>
            Each card opens the full case study: the original brief, the production approach,
            and how it installed on site. Every piece on this page was custom made by our team.
          </p>
          <div className={styles.grid}>
            {rest.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className={styles.card}
              >
                <div className={styles.cardBg}>
                  <Image
                    src={project.mainImage || '/placeholder.png'}
                    alt={project.mainImageAlt || `${project.name} project`}
                    fill
                    sizes="(max-width: 720px) 100vw, 50vw"
                    className={styles.cardBgImage}
                  />
                </div>
                <div className={styles.cardOverlay} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.categoryPill}>{project.category}</span>
                    {project.completionDate && (
                      <span className={styles.cardDate}>{project.completionDate}</span>
                    )}
                  </div>
                  <h3>{project.name}</h3>
                  <p className={styles.cardDesc}>{project.shortDescription}</p>
                  <span className={styles.cardArrow}>
                    View Project <span>&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 4. CTA ── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaLine} />
          <p className={styles.eyebrow}>Get Started</p>
          <h2>Bring Us Your Scope</h2>
          <p className={styles.ctaLede}>
            Bring a room or seat count and a target budget. Leave with a realistic price
            range, a lead time window, and a clear list of next steps.
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
