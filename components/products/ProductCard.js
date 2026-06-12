'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './catalog-new.module.css';

// priority: set on the first row of an above-the-fold grid. Hardcoded lazy
// loading meant the first visible card image was the page's LCP element but
// was never preloaded.
export default function ProductCard({ product, priority = false }) {
  const hasHover = product.hoverImage && product.hoverImage !== product.image;

  return (
    <Link href={product.href} className={`${styles.productCard} ${hasHover ? styles.productCardHasHover : ''}`}>
      <div className={styles.productImageWrap}>
        <Image
          src={product.image || '/placeholder.png'}
          alt={`${product.name} for ${product.placeName || 'commercial'} environments`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
          className={styles.productImage}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
        {hasHover && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} for ${product.placeName || 'commercial'} environments, alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
            className={styles.productImageHover}
            loading="lazy"
          />
        )}
      </div>
      <div className={styles.productBody}>
        <span className={styles.productBadge}>{product.placeName}</span>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPath}>
          {product.furnitureTypeName} &rsaquo; {product.subcategoryName}
        </p>
      </div>
    </Link>
  );
}
