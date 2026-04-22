import styles from './AnswerCallout.module.css';

export default function AnswerCallout({ children }) {
  if (!children) return null;
  return (
    <p className={`${styles.callout} answer-callout`} role="doc-subtitle">
      {children}
    </p>
  );
}
