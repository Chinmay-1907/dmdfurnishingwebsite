import Image from 'next/image';
import Link from 'next/link';
import ProductGallery from './ProductGallery';
import { getProductCopy } from '../../lib/product-copy';
import styles from './product-detail.module.css';

function buildGalleryImages(product) {
  if (product.images?.length) {
    return product.images;
  }

  return [
    {
      src: product.image || '/placeholder.png',
      alt: `${product.name}, custom commercial furniture by DMD Furnishing`,
    },
  ];
}

/**
 * ProductDetailPage
 *
 * Accepts a FLAT product record (with memberships[] and primary). Renders:
 *   - Hero, specs, gallery, related (breadcrumb is rendered by the page route)
 *   - "Also appears in" badges for all additional memberships so users see every
 *     context this product is built for (hotel lobby, hotel guestroom, restaurant, etc.)
 */
export default function ProductDetailPage({ product, relatedProducts = [] }) {
  const primary = product.primary || (product.memberships && product.memberships[0]);
  const otherMemberships = (product.memberships || []).filter((m) => m !== primary);

  const galleryImages = buildGalleryImages(product);
  const specifications = product.specifications?.filter((spec) => spec.name && spec.value) || [];

  const primaryPlaceName = primary?.placeName || 'Commercial Spaces';
  const primarySubName = primary?.subcategoryName || 'Commercial Furniture';
  const primaryFtName = primary?.furnitureTypeName || '';
  const primaryPlaceHref = primary?.placeSlug ? `/products/${primary.placeSlug}` : '/products';

  // Meaningful context chips instead of the product name split into words
  const productTags = [...new Set([primarySubName, primaryFtName, primaryPlaceName].filter(Boolean))];

  // Pre-fill the contact form with this product so the message lands ready to send.
  const quoteHref = `/contact?product=${encodeURIComponent(product.name)}#message`;

  // Furniture-type-specific copy blocks (construction/materials + specification
  // context) so the 174 detail pages stop rendering identical boilerplate.
  const detailCopy = getProductCopy(primary);

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Product Detail</p>
            <h1>{product.name}</h1>
            <p className={styles.description}>
              {product.description ||
                `Commercial-grade ${primarySubName.toLowerCase()} built for ${primaryPlaceName.toLowerCase()} environments.`}
            </p>

            {otherMemberships.length > 0 ? (
              <div className={styles.alsoAppearsIn}>
                <p className={styles.alsoLabel}>Also built for:</p>
                <div className={styles.alsoChips}>
                  {otherMemberships.map((m) => (
                    <Link
                      key={`${m.placeSlug}-${m.subcategorySlug}`}
                      href={`/products/${m.placeSlug}`}
                      className={styles.alsoChip}
                    >
                      {m.placeName}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

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
              <Link href="/contact#schedule" className={styles.primaryAction}>
                Schedule a free consultation
              </Link>
              <Link href={quoteHref} className={styles.secondaryAction}>
                Request a quote
              </Link>
            </div>
          </div>

          <aside className={styles.summaryCard}>
            <p className={styles.cardLabel}>Product Context</p>
            <dl className={styles.summaryGrid}>
              <div>
                <dt>Primary Space</dt>
                <dd>{primaryPlaceName}</dd>
              </div>
              {primaryFtName ? (
                <div>
                  <dt>Furniture Type</dt>
                  <dd>{primaryFtName}</dd>
                </div>
              ) : null}
              <div>
                <dt>Subcategory</dt>
                <dd>{primarySubName}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className={styles.contentGrid}>
          <ProductGallery images={galleryImages} productName={product.name} />

          <div className={styles.contentColumn}>
            <section className={styles.card}>
              <p className={styles.cardLabel}>Construction &amp; Materials</p>
              <h2>{detailCopy.materials.heading}</h2>
              <p>{detailCopy.materials.body}</p>
            </section>

            <section className={styles.card}>
              <p className={styles.cardLabel}>Specification Notes</p>
              <h2>{detailCopy.specification.heading}</h2>
              <p>{detailCopy.specification.body}</p>
              <Link href={quoteHref} className={styles.inlineLink}>
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
              Standard dimensions, materials, and finish options. All specifications can be
              confirmed, adjusted, or value-engineered during project planning.
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
              <p>Specifications provided with quote &mdash; built to your project&rsquo;s requirements.</p>
            </div>
          )}
        </section>

        <section className={styles.relatedSection}>
          <div className={styles.relatedContent}>
            <div>
              <p className={styles.eyebrow}>Browse More</p>
              <h2>More in {primarySubName}</h2>
              <p>
                See the full range of {primarySubName.toLowerCase()} products available for{' '}
                {primaryPlaceName.toLowerCase()} environments.
              </p>

              {relatedProducts?.length > 0 && (
                <div className={styles.relatedGrid}>
                  {relatedProducts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/products/${rp.slug}`}
                      className={styles.relatedCard}
                    >
                      <div className={styles.relatedImageWrap}>
                        <Image
                          src={rp.image || '/placeholder.png'}
                          alt={`${rp.name}, custom commercial furniture by DMD Furnishing`}
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
                <Link href={primaryPlaceHref} className={styles.secondaryAction}>
                  Back to {primaryPlaceName}
                </Link>
                <Link href="/products" className={styles.ghostAction}>
                  View all products
                </Link>
              </div>
            </div>
            <div className={styles.relatedCta}>
              <p className={styles.cardLabel}>Ready to specify?</p>
              <h3>Let&apos;s build your project together.</h3>
              <p>Free consultation, no obligation. Our team can help align this product with your room package, budget, and timeline.</p>
              <Link href="/contact#schedule" className={styles.primaryAction}>
                Book a free call
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
