'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './IndustryTabs.module.css';

export default function IndustryTabs({ industries }) {
  const [activeSlug, setActiveSlug] = useState(
    industries && industries.length > 0 ? industries[0].slug : null
  );

  if (!industries || industries.length === 0) return null;

  const resolvedSlug = industries.some((ind) => ind.slug === activeSlug)
    ? activeSlug
    : industries[0].slug;

  return (
    <div className={styles.wrapper}>
      {/* Pill tab bar */}
      <nav className={styles.tabBar} aria-label="Filter by industry">
        <div className={styles.tabScroll}>
          {industries.map((industry) => (
            <button
              key={industry.slug}
              className={`${styles.tab} ${
                resolvedSlug === industry.slug ? styles.tabActive : ''
              }`}
              onClick={() => setActiveSlug(industry.slug)}
              aria-pressed={resolvedSlug === industry.slug}
            >
              {industry.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Content panels — ALL rendered in the DOM so crawlers and AI agents can
          read every vertical's description; inactive ones are CSS-hidden. */}
      {industries.map((industry) => {
        const isActive = industry.slug === resolvedSlug;
        return (
          <div
            key={industry.slug}
            className={`${styles.panel} ${isActive ? styles.panelActive : ''}`}
            hidden={!isActive}
          >
            <div className={styles.grid}>
              {/* Image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  sizes="(max-width: 720px) 100vw, 50vw"
                  className={styles.image}
                />
              </div>

              {/* Text content */}
              <div className={styles.content}>
                <h3 className={styles.industryName}>{industry.fullName || industry.name}</h3>
                <p className={styles.description}>{industry.description}</p>

                {industry.highlights && industry.highlights.length > 0 && (
                  <ul className={styles.highlights}>
                    {industry.highlights.map((item, index) => (
                      <li key={index} className={styles.highlightItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {industry.productLink && (
                  <Link href={industry.productLink} className={styles.productLink}>
                    View Products
                    {industry.productCount != null && (
                      <span className={styles.productCount}>
                        {' '}({industry.productCount})
                      </span>
                    )}
                    <span className={styles.arrow} aria-hidden="true">&#8594;</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
