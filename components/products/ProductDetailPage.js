import Image from 'next/image';
import Link from 'next/link';
import ProductGallery from './ProductGallery';
import styles from './product-detail.module.css';

function buildGalleryImages(product) {
  if (product.images?.length) {
    return product.images;
  }

  return [
    {
      src: product.image || '/placeholder.png',
      alt: product.name,
    },
  ];
}

export default function ProductDetailPage({ place, furnitureType, subcategory, product, relatedProducts }) {
  const galleryImages = buildGalleryImages(product);
  const productTags = product.tags?.filter(Boolean) || [];
  const specifications = product.specifications?.filter((spec) => spec.name && spec.value) || [];
  const subcategoryHref = `/products/${place.slug}/${furnitureType.slug}/${subcategory.slug}`;

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol>
            <li><Link href={`/products/${place.slug}`}>Products</Link></li>
            <li><Link href={subcategoryHref}>{subcategory.name}</Link></li>
            <li><span aria-current="page">{product.name}</span></li>
          </ol>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Catalog Detail</p>
            <h1>{product.name}</h1>
            <p className={styles.description}>
              {product.description || `Commercial furniture for ${subcategory.name.toLowerCase()} applications.`}
            </p>

            {productTags.length ? (
              <div className={styles.tags} aria-label="Product tags">
                {productTags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={styles.actions}>
              <Link href="/schedule-call" className={styles.primaryAction}>
                Schedule a free consultation
              </Link>
              <Link href="/contact" className={styles.secondaryAction}>
                Request a quote
              </Link>
            </div>
          </div>

          <aside className={styles.summaryCard}>
            <p className={styles.cardLabel}>Catalog Context</p>
            <dl className={styles.summaryGrid}>
              <div>
                <dt>Place</dt>
                <dd>{place.name}</dd>
              </div>
              <div>
                <dt>Furniture type</dt>
                <dd>{furnitureType.name}</dd>
              </div>
              <div>
                <dt>Subcategory</dt>
                <dd>{subcategory.name}</dd>
              </div>
              <div>
                <dt>Specifications</dt>
                <dd>{specifications.length || 'Not listed'}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className={styles.contentGrid}>
          <ProductGallery images={galleryImages} productName={product.name} />

          <div className={styles.contentColumn}>
            <section className={styles.card}>
              <p className={styles.cardLabel}>Product Summary</p>
              <h2>Designed for commercial use</h2>
              <p>
                This catalog entry sits within the {subcategory.name.toLowerCase()} range under{' '}
                {furnitureType.name.toLowerCase()} for {place.name.toLowerCase()} environments.
                Use the listed specifications and imagery as the starting point for material,
                finish, and dimensional discussions.
              </p>
            </section>

            <section className={styles.card}>
              <p className={styles.cardLabel}>Project Support</p>
              <h2>Need a variant or specification review?</h2>
              <p>
                DMD Furnishing can adapt dimensions, materials, finishes, and quantities to fit
                your project scope. Reach out when you need help aligning this product with a room
                package or property standard.
              </p>
              <Link href="/contact" className={styles.inlineLink}>
                Talk to the team
              </Link>
            </section>
          </div>
        </section>

        <section className={styles.specSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Technical Details</p>
            <h2>Specifications</h2>
            <p>
              Standard dimensions, materials, and finish options for this product. All specifications
              can be confirmed, adjusted, or value-engineered during project planning.
            </p>
          </div>

          {specifications.length ? (
            <div className={styles.specGrid}>
              {specifications.map((spec) => (
                <article key={`${spec.name}-${spec.value}`} className={styles.specCard}>
                  <h3>{spec.name}</h3>
                  <p>{spec.value}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No specifications are listed for this product yet.</p>
            </div>
          )}
        </section>

        <section className={styles.relatedSection}>
          <div className={styles.relatedContent}>
            <div>
              <p className={styles.eyebrow}>Browse More</p>
              <h2>More in {subcategory.name}</h2>
              <p>
                See the full range of {subcategory.name.toLowerCase()} products available for{' '}
                {place.name.toLowerCase()} environments, or explore other {furnitureType.name.toLowerCase()} options.
              </p>

              {relatedProducts?.length > 0 && (
                <div className={styles.relatedGrid}>
                  {relatedProducts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/products/${place.slug}/${furnitureType.slug}/${subcategory.slug}/${rp.slug}`}
                      className={styles.relatedCard}
                    >
                      <div className={styles.relatedImageWrap}>
                        <Image
                          src={rp.image || '/placeholder.png'}
                          alt={rp.name}
                          fill
                          sizes="(max-width: 640px) 50vw, 180px"
                          className={styles.relatedImage}
                          loading="lazy"
                        />
                      </div>
                      <span className={styles.relatedName}>{rp.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              <div className={styles.actions} style={{ marginTop: '1.25rem' }}>
                <Link href={`/products?space=${place.slug}`} className={styles.secondaryAction}>
                  Back to Catalog
                </Link>
                <Link href={subcategoryHref} className={styles.ghostAction}>
                  View all {subcategory.name}
                </Link>
              </div>
            </div>
            <div className={styles.relatedCta}>
              <p className={styles.cardLabel}>Ready to specify?</p>
              <h3>Let&apos;s build your project together.</h3>
              <p>Free consultation, no obligation. Our team can help align this product with your room package, budget, and timeline.</p>
              <Link href="/schedule-call" className={styles.primaryAction}>
                Book a free call
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
