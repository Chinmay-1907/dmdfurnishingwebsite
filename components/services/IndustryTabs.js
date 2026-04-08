'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './IndustryTabs.module.css';

export default function IndustryTabs({ industries }) {
  const [activeSlug, setActiveSlug] = useState(
    industries && industries.length > 0 ? industries[0].slug : null
  );

  const activeIndustry = industries
    ? industries.find((ind) => ind.slug === activeSlug) || industries[0]
    : null;

  if (!industries || industries.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      {/* Pill tab bar */}
      <nav className={styles.tabBar} aria-label="Filter by industry">
        <div className={styles.tabScroll}>
          {industries.map((industry) => (
            <button
              key={industry.slug}
              className={`${styles.tab} ${
                activeSlug === industry.slug ? styles.tabActive : ''
              }`}
              onClick={() => setActiveSlug(industry.slug)}
              aria-pressed={activeSlug === industry.slug}
            >
              {industry.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Content panel */}
      {activeIndustry && (
        <div className={styles.panel} key={activeIndustry.slug}>
          <div className={styles.grid}>
            {/* Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={activeIndustry.image}
                alt={activeIndustry.name}
                fill
                sizes="(max-width: 720px) 100vw, 50vw"
                className={styles.image}
              />
            </div>

            {/* Text content */}
            <div className={styles.content}>
              <h3 className={styles.industryName}>{activeIndustry.fullName || activeIndustry.name}</h3>
              <p className={styles.description}>{activeIndustry.description}</p>

              {activeIndustry.highlights && activeIndustry.highlights.length > 0 && (
                <ul className={styles.highlights}>
                  {activeIndustry.highlights.map((item, index) => (
                    <li key={index} className={styles.highlightItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {activeIndustry.productLink && (
                <Link href={activeIndustry.productLink} className={styles.productLink}>
                  View Products
                  {activeIndustry.productCount != null && (
                    <span className={styles.productCount}>
                      {' '}({activeIndustry.productCount})
                    </span>
                  )}
                  <span className={styles.arrow} aria-hidden="true">&#8594;</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
