import Image from 'next/image';
import Link from 'next/link';
import styles from './catalog.module.css';

function Breadcrumbs({ items }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${item.href || index}`}>
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StatPills({ stats }) {
  if (!stats?.length) return null;

  return (
    <div className={styles.stats} aria-label="Catalog summary">
      {stats.map((stat) => (
        <div key={stat.label} className={styles.stat}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

function Hero({ eyebrow, title, description, image, imageAlt, stats }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
        <StatPills stats={stats} />
      </div>

      <div className={styles.heroMedia}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 38vw"
            className={styles.heroImage}
          />
        ) : (
          <div className={styles.heroPlaceholder} aria-hidden="true" />
        )}
      </div>
    </section>
  );
}

function CardGrid({ items, emptyTitle, emptyDescription }) {
  if (!items?.length) {
    return (
      <div className={styles.emptyState}>
        <h2>{emptyTitle}</h2>
        <p>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => {
        const content = (
          <>
            <div className={styles.cardImageWrap}>
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className={styles.cardImage}
                />
              ) : (
                <div className={styles.cardPlaceholder} aria-hidden="true" />
              )}
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardHeading}>
                {item.eyebrow ? <span className={styles.cardEyebrow}>{item.eyebrow}</span> : null}
                <h2>{item.title}</h2>
              </div>
              {item.description ? <p>{item.description}</p> : null}
              {item.meta ? <div className={styles.cardMeta}>{item.meta}</div> : null}
              {item.tags?.length ? (
                <div className={styles.cardTags} aria-label={`${item.title} tags`}>
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </>
        );

        return item.href ? (
          <Link key={item.key || item.href || item.title} href={item.href} className={styles.card}>
            {content}
          </Link>
        ) : (
          <article key={item.key || item.title} className={styles.card}>
            {content}
          </article>
        );
      })}
    </div>
  );
}

export function CatalogPageLayout({
  breadcrumbs,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  stats,
  children,
}) {
  return (
    <main className={styles.page}>
      <section className={styles.pageShell}>
        <Breadcrumbs items={breadcrumbs} />
        <Hero
          eyebrow={eyebrow}
          title={title}
          description={description}
          image={image}
          imageAlt={imageAlt}
          stats={stats}
        />
        <div className={styles.content}>{children}</div>
      </section>
    </main>
  );
}

export function CatalogSection({ title, description, items, emptyTitle, emptyDescription }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        {title ? <h2>{title}</h2> : null}
        {description ? <p>{description}</p> : null}
      </div>
      <CardGrid
        items={items}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
      />
    </section>
  );
}

export function CatalogCallout({ title, description, href, label }) {
  return (
    <section className={styles.callout}>
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {href ? (
        <Link href={href} className={styles.calloutLink}>
          {label}
        </Link>
      ) : null}
    </section>
  );
}
