'use client';

import { useEffect, useState } from 'react';
import styles from './ProcessTimeline.module.css';

export default function ProcessTimeline({ steps = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function syncToHash() {
      const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
      if (!hash) return;
      const idx = steps.findIndex((s) => s.slug === hash);
      if (idx >= 0) {
        setActiveIndex(idx);
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    syncToHash();
    window.addEventListener('hashchange', syncToHash);
    return () => window.removeEventListener('hashchange', syncToHash);
  }, [steps]);

  return (
    <div className={styles.timeline}>
      {/* Horizontal dot strip */}
      <div className={styles.track} role="tablist" aria-label="Process phases">
        <div className={styles.line} aria-hidden="true" />

        {steps.map((step, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={step.number}
              id={step.slug}
              role="tab"
              className={`${styles.step} ${isActive ? styles.stepActive : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-selected={isActive}
              aria-controls={`process-step-detail-${step.slug}`}
              tabIndex={isActive ? 0 : -1}
              style={{ scrollMarginTop: '120px' }}
            >
              <span className={styles.dot}>
                <span>{step.number}</span>
              </span>
              <span className={styles.label}>{step.shortLabel || step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Detail panels — ALL steps rendered in the DOM so crawlers and AI agents
          can read every phase's description; inactive ones are CSS-hidden. */}
      {steps.map((step, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={step.number}
            id={`process-step-detail-${step.slug}`}
            role="tabpanel"
            className={`${styles.detail} ${isActive ? styles.detailActive : ''}`}
            hidden={!isActive}
          >
            <div className={styles.detailInner}>
              <div className={styles.detailHeader}>
                <span className={styles.detailNumber}>{step.number}</span>
                <h3 className={styles.detailTitle}>{step.title}</h3>
              </div>
              <p className={styles.detailDesc}>{step.description}</p>
              {step.bullets && step.bullets.length > 0 && (
                <ul className={styles.detailBullets}>
                  {step.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {(step.timeline || step.deliverable) && (
                <div className={styles.detailMeta}>
                  {step.timeline && (
                    <span className={styles.metaTag}>{step.timeline}</span>
                  )}
                  {step.deliverable && (
                    <span className={styles.deliverable}>
                      Deliverable: {step.deliverable}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

    </div>
  );
}
