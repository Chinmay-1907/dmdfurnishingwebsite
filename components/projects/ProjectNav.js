import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectNav.module.css';

/**
 * Prev/Next project navigation (server component).
 * @param {{ currentId: string, projects: Array }} props
 */
export default function ProjectNav({ currentId, projects }) {
  if (!projects?.length || projects.length < 2) return null;

  const currentIndex = projects.findIndex((p) => p.id === currentId);
  if (currentIndex === -1) return null;

  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;
  const prev = projects[prevIndex];
  const next = projects[nextIndex];

  return (
    <nav className={styles.nav} aria-label="Project navigation">
      <Link href={`/projects/${prev.id}`} className={styles.card}>
        <span className={styles.arrow}>&larr;</span>
        <div className={styles.thumbWrap}>
          <Image
            src={prev.mainImage || '/placeholder.png'}
            alt={prev.name}
            fill
            sizes="80px"
            className={styles.thumb}
          />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Previous Project</span>
          <span className={styles.name}>{prev.name}</span>
        </div>
      </Link>

      <Link href={`/projects/${next.id}`} className={`${styles.card} ${styles.cardNext}`}>
        <div className={styles.info} style={{ textAlign: 'right' }}>
          <span className={styles.label}>Next Project</span>
          <span className={styles.name}>{next.name}</span>
        </div>
        <div className={styles.thumbWrap}>
          <Image
            src={next.mainImage || '/placeholder.png'}
            alt={next.name}
            fill
            sizes="80px"
            className={styles.thumb}
          />
        </div>
        <span className={styles.arrow}>&rarr;</span>
      </Link>
    </nav>
  );
}
