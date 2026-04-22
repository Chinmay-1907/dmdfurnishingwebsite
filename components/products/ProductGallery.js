'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './product-gallery.module.css';

export default function ProductGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || images[0];
  const hasMultipleImages = images.length > 1;

  function showPrevious() {
    setActiveIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
  }

  if (!activeImage) {
    return (
      <div className={styles.emptyState}>
        <p>No product imagery is available for this catalog entry.</p>
      </div>
    );
  }

  return (
    <section className={styles.gallery} aria-label={`${productName} gallery`}>
      <div className={styles.stage}>
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt || productName}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 52vw"
          className={styles.stageImage}
        />
        {hasMultipleImages ? (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={showPrevious}
              aria-label="Show previous product image"
            >
              <span aria-hidden="true">{'<'}</span>
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={showNext}
              aria-label="Show next product image"
            >
              <span aria-hidden="true">{'>'}</span>
            </button>
          </>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div className={styles.thumbnailGrid} aria-label="Product image thumbnails">
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className={index === activeIndex ? `${styles.thumbnail} ${styles.thumbnailActive}` : styles.thumbnail}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show product image ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <Image
                src={image.src}
                alt={image.alt || `${productName} thumbnail ${index + 1}`}
                fill
                sizes="120px"
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
