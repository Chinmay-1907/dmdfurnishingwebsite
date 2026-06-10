'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './catalog-new.module.css';

export default function SpaceNav({ spaces, activeSpace, onSpaceChange }) {
  const scrollRef = useRef(null);
  const activeRef = useRef(null);
  const mountedRef = useRef(false);
  const pathname = usePathname();
  // On place pages (/products/hotel etc.) tabs are real links so crawlers can
  // follow them. On /products they stay buttons driving the client-side filter.
  const linkMode = Boolean(pathname && pathname !== '/products');

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const active = activeRef.current;
      const left = active.offsetLeft - container.offsetWidth / 2 + active.offsetWidth / 2;
      // Instant on mount: a smooth animated scroll here suppresses Chrome's
      // LCP reporting for the whole page load. Smooth only on user-driven changes.
      if (mountedRef.current) {
        container.scrollTo({ left, behavior: 'smooth' });
      } else {
        container.scrollLeft = left;
        mountedRef.current = true;
      }
    }
  }, [activeSpace]);

  return (
    <nav className={styles.spaceNav} aria-label="Filter by space">
      <div className={styles.spaceNavScroll} ref={scrollRef}>
        {linkMode ? (
          <Link
            href="/products"
            className={`${styles.spaceTab} ${!activeSpace ? styles.spaceTabActive : ''}`}
            ref={!activeSpace ? activeRef : null}
          >
            All
          </Link>
        ) : (
          <button
            className={`${styles.spaceTab} ${!activeSpace ? styles.spaceTabActive : ''}`}
            onClick={() => onSpaceChange(null)}
            ref={!activeSpace ? activeRef : null}
          >
            All
          </button>
        )}
        {spaces.map((space) =>
          linkMode ? (
            <Link
              key={space.slug}
              href={`/products/${space.slug}`}
              className={`${styles.spaceTab} ${activeSpace === space.slug ? styles.spaceTabActive : ''}`}
              aria-current={activeSpace === space.slug ? 'page' : undefined}
              ref={activeSpace === space.slug ? activeRef : null}
            >
              {space.name}
              <span className={styles.spaceTabCount}>{space.count}</span>
            </Link>
          ) : (
            <button
              key={space.slug}
              className={`${styles.spaceTab} ${activeSpace === space.slug ? styles.spaceTabActive : ''}`}
              onClick={() => onSpaceChange(space.slug === activeSpace ? null : space.slug)}
              ref={activeSpace === space.slug ? activeRef : null}
            >
              {space.name}
              <span className={styles.spaceTabCount}>{space.count}</span>
            </button>
          )
        )}
      </div>
    </nav>
  );
}
