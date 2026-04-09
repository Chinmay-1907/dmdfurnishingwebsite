'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ProjectGallery.module.css';

/**
 * Large featured image + horizontal scroll strip with arrow buttons.
 * @param {{ images: {url:string, alt:string}[], projectName: string }} props
 */
export default function ProjectGallery({ images, projectName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stripRef = useRef(null);

  const scroll = useCallback((direction) => {
    if (!stripRef.current) return;
    const amount = direction === 'left' ? -260 : 260;
    stripRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  }, []);

  if (!images?.length) return null;

  const active = images[activeIndex];

  return (
    <div className={styles.wrapper}>
      {/* Main image */}
      <div className={styles.mainImageWrap}>
        <Image
          key={activeIndex}
          src={active.url}
          alt={active.alt || `${projectName} photo ${activeIndex + 1}`}
          fill
          sizes="(max-width: 720px) 100vw, min(1120px, 100vw)"
          className={styles.mainImage}
          priority={activeIndex === 0}
        />
      </div>

      {/* Horizontal scroll strip with arrows */}
      {images.length > 1 && (
        <div className={styles.stripWrap}>
          <button
            className={`${styles.scrollBtn} ${styles.scrollLeft}`}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            &#8249;
          </button>

          <div className={styles.strip} ref={stripRef}>
            {images.map((img, i) => (
              <button
                key={img.url}
                className={`${styles.thumb} ${i === activeIndex ? styles.thumbActive : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`View photo ${i + 1}`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `Thumbnail ${i + 1}`}
                  fill
                  sizes="120px"
                  className={styles.thumbImage}
                />
              </button>
            ))}
          </div>

          <button
            className={`${styles.scrollBtn} ${styles.scrollRight}`}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}
