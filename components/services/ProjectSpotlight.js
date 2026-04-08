import Image from 'next/image';
import Link from 'next/link';
import BeforeAfterSlider from '../BeforeAfterSlider';
import styles from './ProjectSpotlight.module.css';

export default function ProjectSpotlight({ featured, projects }) {
  return (
    <section className={styles.section}>
      <div className={styles.featuredWrapper}>
        <div className={styles.sliderContainer}>
          <BeforeAfterSlider
            beforeSrc={featured.beforeImage}
            afterSrc={featured.afterImage}
            beforeAlt="Before renovation"
            afterAlt="After renovation"
          />
        </div>

        <div className={styles.featuredInfo}>
          <h3 className={styles.featuredName}>{featured.name}</h3>
          <p className={styles.featuredMeta}>
            <span className={styles.location}>{featured.location}</span>
            {featured.location && featured.scope && (
              <span className={styles.separator}> &mdash; </span>
            )}
            <span className={styles.scope}>{featured.scope}</span>
          </p>
          <Link href={`/projects/${featured.slug}`} className={styles.featuredLink}>
            View Full Project
          </Link>
        </div>
      </div>

      {projects && projects.length > 0 && (
        <div className={styles.thumbnailGrid}>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.thumbnailCard}
            >
              <div className={styles.thumbnailImageWrapper}>
                <Image
                  src={project.heroImage}
                  alt={project.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 200px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <p className={styles.thumbnailName}>{project.name}</p>
            </Link>
          ))}
        </div>
      )}

      <div className={styles.viewAllWrapper}>
        <Link href="/projects" className={styles.viewAllLink}>
          View All Projects
        </Link>
      </div>
    </section>
  );
}
