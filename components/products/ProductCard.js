'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './catalog-new.module.css';

const TIER_COLORS = {
  Essentials: '#3a7d44',
  Classic: '#2f6f9f',
  Premium: '#6b4e9a',
  Luxury: '#a8842c',
  Custom: '#1f5c52',
  Inquire: '#6b6b6b',
};
const TIER_LABELS = { Inquire: 'Contact for Pricing', Custom: 'Custom Made' };

// priority: set on the first row of an above-the-fold grid. Hardcoded lazy
// loading meant the first visible card image was the page's LCP element but
// was never preloaded.
export default function ProductCard({ product, priority = false }) {
  const hasHover = product.hoverImage && product.hoverImage !== product.image;
  const tierLabel = product.tier ? (TIER_LABELS[product.tier] || `${product.tier} Tier`) : '';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
          <span className={styles.productBadge} style={{ marginBottom: 0 }}>{product.placeName}</span>
          {tierLabel ? (
            <span
              style={{
                display: 'inline-block',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: '#fff',
                background: TIER_COLORS[product.tier] || '#6b6b6b',
              }}
            >
              {tierLabel}
            </span>
          ) : null}
        </div>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPath}>
          {product.furnitureTypeName} &rsaquo; {product.subcategoryName}
        </p>
      </div>
    </Link>
  );
}
