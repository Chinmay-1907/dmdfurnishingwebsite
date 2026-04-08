import styles from './catalog-new.module.css';

export default function CatalogHero({ title, description, stats, searchQuery, onSearchChange }) {
  return (
    <section className={styles.catalogHero}>
      <div className={styles.heroInner}>
        <p className={styles.heroEyebrow}>Product Catalog</p>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroDescription}>{description}</p>

        <div className={styles.heroSearch}>
          <svg className={styles.heroSearchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.heroSearchInput}
            aria-label="Search products"
          />
        </div>

        {stats && (
          <div className={styles.heroStats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.heroStat}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
