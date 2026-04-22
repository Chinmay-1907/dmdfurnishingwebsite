'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import CatalogHero from './CatalogHero';
import SpaceNav from './SpaceNav';
import CatalogFilters from './CatalogFilters';
import ProductCard from './ProductCard';
import styles from './catalog-new.module.css';

const PAGE_SIZE = 24;

function getInitialFilters(initialFilters) {
  if (typeof window === 'undefined') {
    return {
      spaces: initialFilters?.space ? [initialFilters.space] : [],
      furnitureTypes: initialFilters?.furnitureType ? [initialFilters.furnitureType] : [],
      subcategories: initialFilters?.subcategory ? [initialFilters.subcategory] : [],
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    spaces: params.get('space')?.split(',').filter(Boolean) ||
      (initialFilters?.space ? [initialFilters.space] : []),
    furnitureTypes: params.get('type')?.split(',').filter(Boolean) ||
      (initialFilters?.furnitureType ? [initialFilters.furnitureType] : []),
    subcategories: params.get('sub')?.split(',').filter(Boolean) ||
      (initialFilters?.subcategory ? [initialFilters.subcategory] : []),
  };
}

export default function ProductCatalog({ products, filterOptions, initialFilters, heroTitle, heroDescription }) {
  const [activeFilters, setActiveFilters] = useState(() => getInitialFilters(initialFilters));
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('az');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setMounted(true);
    // Read search query from URL on mount
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setSearchQuery(q);
  }, []);

  const syncUrl = useCallback((filters, query) => {
    const params = new URLSearchParams();
    if (filters.spaces.length) params.set('space', filters.spaces.join(','));
    if (filters.furnitureTypes.length) params.set('type', filters.furnitureTypes.join(','));
    if (filters.subcategories.length) params.set('sub', filters.subcategories.join(','));
    if (query) params.set('q', query);
    const qs = params.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }, []);

  const handleFilterChange = useCallback((dimension, slug) => {
    setActiveFilters((prev) => {
      const current = prev[dimension];
      const next = current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug];
      const updated = { ...prev, [dimension]: next };

      if (dimension === 'spaces') {
        updated.furnitureTypes = [];
        updated.subcategories = [];
      } else if (dimension === 'furnitureTypes') {
        updated.subcategories = [];
      }

      syncUrl(updated, searchQuery);
      return updated;
    });
  }, [searchQuery, syncUrl]);

  const handleSpaceChange = useCallback((slug) => {
    const updated = {
      spaces: slug ? [slug] : [],
      furnitureTypes: [],
      subcategories: [],
    };
    setActiveFilters(updated);
    syncUrl(updated, searchQuery);
  }, [searchQuery, syncUrl]);

  const handleClearAll = useCallback(() => {
    const cleared = { spaces: [], furnitureTypes: [], subcategories: [] };
    setActiveFilters(cleared);
    setSearchQuery('');
    syncUrl(cleared, '');
  }, [syncUrl]);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    syncUrl(activeFilters, query);
  }, [activeFilters, syncUrl]);

  const filtered = useMemo(() => {
    let result = products;

    // Membership-based filtering. A product shows up in every category it's a member of.
    // Fall back to the primary slug fields if membership arrays aren't present (legacy shape).
    if (activeFilters.spaces.length) {
      result = result.filter((p) => {
        const places = p.placeSlugs?.length ? p.placeSlugs : [p.placeSlug].filter(Boolean);
        return activeFilters.spaces.some((f) => places.includes(f));
      });
    }
    if (activeFilters.furnitureTypes.length) {
      result = result.filter((p) => {
        const fts = p.furnitureTypeSlugs?.length ? p.furnitureTypeSlugs : [p.furnitureTypeSlug].filter(Boolean);
        return activeFilters.furnitureTypes.some((f) => fts.includes(f));
      });
    }
    if (activeFilters.subcategories.length) {
      result = result.filter((p) => {
        const subs = p.subcategoryKeys?.length ? p.subcategoryKeys : [p.subcategoryKey].filter(Boolean);
        return activeFilters.subcategories.some((f) => subs.includes(f));
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.placeName.toLowerCase().includes(q) ||
        p.furnitureTypeName.toLowerCase().includes(q) ||
        p.subcategoryName.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sortOrder) {
      case 'za':
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'space':
        result = [...result].sort((a, b) => a.placeName.localeCompare(b.placeName) || a.name.localeCompare(b.name));
        break;
      case 'az':
      default:
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, activeFilters, searchQuery, sortOrder]);

  // Reset paging window whenever the filtered result set changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeFilters, searchQuery, sortOrder]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;
  const remaining = filtered.length - visibleCount;

  const stats = [
    { label: 'Spaces', value: filterOptions.spaces.length },
    { label: 'Categories', value: filterOptions.furnitureTypes.length },
    { label: 'Products', value: products.length },
  ];

  return (
    <main className={styles.catalogPage}>
      <CatalogHero
        title={heroTitle || 'Commercial Furniture Catalog'}
        description={heroDescription || `Filter, compare, and request a quote on ${products.length} products across ${filterOptions.spaces.length} commercial environments.`}
        stats={stats}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <SpaceNav
        spaces={filterOptions.spaces}
        activeSpace={activeFilters.spaces.length === 1 ? activeFilters.spaces[0] : null}
        onSpaceChange={handleSpaceChange}
      />

      <div className={styles.catalogBody}>
        <CatalogFilters
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          mobileOpen={mobileFiltersOpen}
          onMobileClose={() => setMobileFiltersOpen(false)}
        />

        <div className={styles.gridArea}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <button
                className={styles.mobileFilterBtn}
                onClick={() => setMobileFiltersOpen(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M6 12h12M8 18h8" /></svg>
                Filters
              </button>
              <span className={styles.resultCount}>
                Showing <strong>{visibleProducts.length}</strong> of {filtered.length}
                {filtered.length !== products.length ? ` matches` : ` products`}
              </span>
            </div>
            <select
              className={styles.sortSelect}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              aria-label="Sort products"
            >
              <option value="az">Name A-Z</option>
              <option value="za">Name Z-A</option>
              <option value="space">By Space</option>
            </select>
          </div>

          {filtered.length > 0 ? (
            <>
              <div className={styles.productGrid}>
                {visibleProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
              {hasMore && (
                <div className={styles.loadMoreWrap}>
                  <button
                    type="button"
                    className={styles.loadMoreBtn}
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  >
                    Show more products
                    <span className={styles.loadMoreRemaining}>
                      {remaining} remaining
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <h2>No products match your filters</h2>
              <p>Try adjusting your filters or search query.</p>
              <button className={styles.clearAllBtn} onClick={handleClearAll}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <section className={styles.catalogCta}>
        <div className={styles.ctaInner}>
          <h2>Need help selecting the right products?</h2>
          <p>Our FF&E project management team can guide your selection from specification through delivery.</p>
          <div className={styles.ctaActions}>
            <Link href="/contact#schedule" className={styles.ctaPrimary}>Schedule a Call</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
