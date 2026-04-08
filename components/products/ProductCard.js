'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './catalog-new.module.css';

export default function ProductCard({ product }) {
  const hasHover = product.hoverImage && product.hoverImage !== product.image;

  return (
    <Link href={product.href} className={styles.productCard}>
      <div className={styles.productImageWrap}>
        <Image
          src={product.image || '/placeholder.png'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
          className={styles.productImage}
          loading="lazy"
        />
        {hasHover && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
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
