'use client';

import BeforeAfterSlider from '../BeforeAfterSlider';
import styles from './BeforeAfterShowcase.module.css';

/**
 * Single before/after slider — picks the first pair.
 * @param {{ beforeImages: {url:string, alt:string}[], afterImages: {url:string, alt:string}[], projectName: string }} props
 */
export default function BeforeAfterShowcase({ beforeImages, afterImages, projectName }) {
  if (!beforeImages?.length || !afterImages?.length) return null;

  return (
    <div className={styles.sliderWrap}>
      <BeforeAfterSlider
        beforeSrc={beforeImages[0].url}
        afterSrc={afterImages[0].url}
        beforeAlt={beforeImages[0].alt || `${projectName} before`}
        afterAlt={afterImages[0].alt || `${projectName} after`}
      />
    </div>
  );
}
