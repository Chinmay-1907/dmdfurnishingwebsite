'use client';

import BeforeAfterSlider from '../BeforeAfterSlider';
import styles from './BeforeAfterShowcase.module.css';

/**
 * Single before/after slider: caller pre-picks the best before + after image.
 * If `degradeBefore` is true, the before frame gets a slight quality drop
 * (blur + desaturation) to visually signal "earlier / lower-fidelity shot."
 */
export default function BeforeAfterShowcase({
  beforeImage,
  afterImage,
  projectName,
  degradeBefore = false,
}) {
  if (!beforeImage || !afterImage) return null;

  return (
    <div className={styles.sliderWrap}>
      <BeforeAfterSlider
        beforeSrc={beforeImage.url}
        afterSrc={afterImage.url}
        beforeAlt={beforeImage.alt || `${projectName} before`}
        afterAlt={afterImage.alt || `${projectName} after`}
        degradeBefore={degradeBefore}
      />
    </div>
  );
}
