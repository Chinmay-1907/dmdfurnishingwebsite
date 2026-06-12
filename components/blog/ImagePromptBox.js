import styles from './ImagePromptBox.module.css';

/**
 * Visible image slot for articles whose imagery is rendered externally.
 * The CEO pastes the prompt into an image model, then swaps this box for
 * the finished <Image>. Props: prompt (required), aspect, alt (the alt
 * text the final image should ship with).
 */
export default function ImagePromptBox({ prompt, aspect = '16:9', alt }) {
  return (
    <figure className={styles.box} data-image-slot>
      <div className={styles.label}>
        <span aria-hidden="true">🖼</span> Image slot · {aspect}
      </div>
      <p className={styles.prompt}>{prompt}</p>
      {alt ? (
        <figcaption className={styles.caption}>Final alt text: {alt}</figcaption>
      ) : null}
    </figure>
  );
}
