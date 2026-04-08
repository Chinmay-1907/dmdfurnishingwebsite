'use client';

import { useState } from 'react';
import styles from './ProcessTimeline.module.css';

export default function ProcessTimeline({ steps = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  function handleToggle(index) {
    setActiveIndex((prev) => (prev === index ? null : index));
  }

  return (
    <div className={styles.timeline}>
      {/* Horizontal dot strip */}
      <div className={styles.track}>
        <div className={styles.line} aria-hidden="true" />

        {steps.map((step, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={step.number}
              className={`${styles.step} ${isActive ? styles.stepActive : ''}`}
              onClick={() => handleToggle(index)}
              aria-expanded={isActive}
              aria-controls={`step-detail-${index}`}
            >
              <span className={styles.dot}>
                <span>{step.number}</span>
              </span>
              <span className={styles.label}>{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Expanded detail panel */}
      {activeIndex !== null && steps[activeIndex] && (
        <div
          id={`step-detail-${activeIndex}`}
          className={styles.detail}
          key={activeIndex}
        >
          <div className={styles.detailInner}>
            <div className={styles.detailHeader}>
              <span className={styles.detailNumber}>{steps[activeIndex].number}</span>
              <h3 className={styles.detailTitle}>{steps[activeIndex].title}</h3>
            </div>
            <p className={styles.detailDesc}>{steps[activeIndex].description}</p>
            <div className={styles.detailMeta}>
              {steps[activeIndex].timeline && (
                <span className={styles.metaTag}>{steps[activeIndex].timeline}</span>
              )}
              {steps[activeIndex].deliverable && (
                <span className={styles.deliverable}>
                  Deliverable: {steps[activeIndex].deliverable}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
