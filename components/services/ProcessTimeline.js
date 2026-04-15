'use client';

import { useState } from 'react';
import styles from './ProcessTimeline.module.css';

export default function ProcessTimeline({ steps = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStep = steps[activeIndex];

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
              role="tab"
              className={`${styles.step} ${isActive ? styles.stepActive : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-selected={isActive}
              aria-controls="process-step-detail"
              tabIndex={isActive ? 0 : -1}
            >
              <span className={styles.dot}>
                <span>{step.number}</span>
              </span>
              <span className={styles.label}>{step.shortLabel || step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Always-open detail panel */}
      {activeStep && (
        <div
          id="process-step-detail"
          role="tabpanel"
          className={styles.detail}
          key={activeIndex}
        >
          <div className={styles.detailInner}>
            <div className={styles.detailHeader}>
              <span className={styles.detailNumber}>{activeStep.number}</span>
              <h3 className={styles.detailTitle}>{activeStep.title}</h3>
            </div>
            <p className={styles.detailDesc}>{activeStep.description}</p>
            {activeStep.bullets && activeStep.bullets.length > 0 && (
              <ul className={styles.detailBullets}>
                {activeStep.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {(activeStep.timeline || activeStep.deliverable) && (
              <div className={styles.detailMeta}>
                {activeStep.timeline && (
                  <span className={styles.metaTag}>{activeStep.timeline}</span>
                )}
                {activeStep.deliverable && (
                  <span className={styles.deliverable}>
                    Deliverable: {activeStep.deliverable}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
