import styles from './CategoryContentBlock.module.css';

/**
 * CategoryContentBlock
 *
 * Server component rendering long-form category content (buying guide,
 * materials notes, FAQs) below the ProductCatalog on /products/[placeSlug]
 * pages. Content comes from lib/place-content.js keyed by place slug.
 *
 * Style matches catalog-new.module.css (dark + cream gold accent). Does not
 * compete with the CatalogHero — it sits after the catalog and reads as
 * supporting educational content for AI search and buyer research.
 */
export default function CategoryContentBlock({ placeName, content }) {
  if (!content) return null;

  const { buyingGuide, materials, faqs } = content;
  const hasGuide = Array.isArray(buyingGuide) && buyingGuide.length > 0;
  const hasMaterials = typeof materials === 'string' && materials.trim().length > 0;
  const hasFaqs = Array.isArray(faqs) && faqs.length > 0;

  if (!hasGuide && !hasMaterials && !hasFaqs) return null;

  return (
    <section
      className={styles.block}
      aria-labelledby={`category-content-${placeName.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={styles.inner}>
        {hasGuide && (
          <div className={styles.section}>
            <p className={styles.eyebrow}>Buying Guide</p>
            <h2
              id={`category-content-${placeName.toLowerCase().replace(/\s+/g, '-')}`}
              className={styles.title}
            >
              Specifying {placeName} Furniture
            </h2>
            <ul className={styles.guideGrid}>
              {buyingGuide.map((item, i) => (
                <li key={i} className={styles.guideItem}>
                  <span className={styles.guideTitle}>{item.title}</span>
                  <p className={styles.guideText}>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasMaterials && (
          <div className={styles.section}>
            <p className={styles.eyebrow}>Materials &amp; Construction</p>
            <h2 className={styles.title}>What We Build It From</h2>
            <p className={styles.materialsText}>{materials}</p>
          </div>
        )}

        {hasFaqs && (
          <div className={styles.section}>
            <p className={styles.eyebrow}>Frequently Asked</p>
            <h2 className={styles.title}>Questions About {placeName} Furniture</h2>
            <div className={styles.faqList}>
              {faqs.map((faq, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>{faq.question}</summary>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
