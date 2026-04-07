import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from '../../lib/projects';
import styles from './page.module.css';

const projectsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Commercial Furniture Projects | DMD Furnishing',
      description:
        'Browse DMD Furnishing\'s portfolio of commercial hospitality furniture installations — hotels, restaurants, and multi-family properties across the United States.',
      url: 'https://dmdfurnishing.com/projects',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dmdfurnishing.com' },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://dmdfurnishing.com/projects' },
      ],
    },
  ],
};

export const metadata = {
  title: 'Hospitality Furniture Projects | Commercial Installations',
  description:
    'Browse DMD Furnishing\'s portfolio of commercial hospitality furniture installations — hotels, restaurants, and multi-family properties across the United States.',
  alternates: {
    canonical: 'https://dmdfurnishing.com/projects',
  },
  openGraph: {
    title: 'Projects | DMD Furnishing',
    description:
      'Browse DMD Furnishing\'s portfolio of commercial hospitality furniture installations — hotels, restaurants, and multi-family properties across the United States.',
    url: 'https://dmdfurnishing.com/projects',
    images: [
      {
        url: '/Images/Our_Projects.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }} />
      <section className={styles.hero}>
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Project Portfolio</p>
          <h1>Recent Projects</h1>
          <p className={styles.heroText}>
            From boutique hotels to large-scale franchise renovations, our portfolio reflects a
            commitment to quality craftsmanship and reliable project execution.
          </p>
          <p className={styles.heroText}>
            Each installation showcases custom-manufactured furniture designed to balance
            aesthetics, durability, and budget.
          </p>
        </div>
        <div className={styles.heroImageWrap}>
          <Image
            src="/Images/Our_Projects.jpg"
            alt="Completed hospitality project portfolio"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 42vw"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Browse Work</p>
          <h2>Selected installations</h2>
          <p>
            These projects show the breadth of our hospitality and commercial work across guest
            rooms, lobbies, dining areas, and common spaces. Explore the{' '}
            <Link href="/products">furniture collections</Link> used in these projects, or learn
            about our <Link href="/services">full-service capabilities</Link>.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.card}>
              <div className={styles.cardImageWrap}>
                <Image
                  src={project.mainImage || '/placeholder.png'}
                  alt={project.mainImageAlt || `${project.name} project`}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className={styles.cardImage}
                />
                <span className={styles.category}>{project.category}</span>
              </div>
              <div className={styles.cardBody}>
                <h3>{project.name}</h3>
                <p className={styles.projectMeta}>{project.completionDate}</p>
                <p>{project.shortDescription}</p>
                <div className={styles.cardFooter}>
                  <Link href={`/projects/${project.id}`} className={styles.cardLink}>
                    View Project Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.callout}>
        <div>
          <p className={styles.eyebrow}>Project Planning</p>
          <h2>Ready to start your project?</h2>
          <p>
            Let us help you create exceptional spaces with premium furniture solutions built for
            your property and schedule.
          </p>
        </div>
        <Link href="/schedule-call" className={styles.cta}>
          Schedule a Consultation
        </Link>
      </section>
    </main>
  );
}
