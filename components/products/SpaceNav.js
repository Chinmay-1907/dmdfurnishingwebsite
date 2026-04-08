'use client';

import { useRef, useEffect } from 'react';
import styles from './catalog-new.module.css';

export default function SpaceNav({ spaces, activeSpace, onSpaceChange }) {
  const scrollRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const active = activeRef.current;
      const left = active.offsetLeft - container.offsetWidth / 2 + active.offsetWidth / 2;
      container.scrollTo({ left, behavior: 'smooth' });
    }
  }, [activeSpace]);

  return (
    <nav className={styles.spaceNav} aria-label="Filter by space">
      <div className={styles.spaceNavScroll} ref={scrollRef}>
        <button
          className={`${styles.spaceTab} ${!activeSpace ? styles.spaceTabActive : ''}`}
          onClick={() => onSpaceChange(null)}
          ref={!activeSpace ? activeRef : null}
        >
          All
        </button>
        {spaces.map((space) => (
          <button
            key={space.slug}
            className={`${styles.spaceTab} ${activeSpace === space.slug ? styles.spaceTabActive : ''}`}
            onClick={() => onSpaceChange(space.slug === activeSpace ? null : space.slug)}
            ref={activeSpace === space.slug ? activeRef : null}
          >
            {space.name}
            <span className={styles.spaceTabCount}>{space.count}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
