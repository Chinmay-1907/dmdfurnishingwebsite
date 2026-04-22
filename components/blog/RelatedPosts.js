import Link from 'next/link';
import { getRelatedBlogPosts } from '../../lib/blog-posts';
import styles from './RelatedPosts.module.css';

export default function RelatedPosts({ currentSlug, limit = 3 }) {
  const posts = getRelatedBlogPosts(currentSlug, limit);
  if (!posts.length) return null;

  return (
    <aside className={styles.wrap} aria-label="Related articles">
      <p className={styles.eyebrow}>Read Next</p>
      <h2 className={styles.h2}>More on FF&amp;E and commercial furniture</h2>
      <ul className={styles.grid}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.card}>
            <Link href={`/blog/${post.slug}`} className={styles.link} prefetch={false}>
              <p className={styles.cardMeta}>{post.category}</p>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <span className={styles.cardCta}>
                Read article <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
