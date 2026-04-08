'use client';

import { useState } from 'react';
import styles from './catalog-new.module.css';

function FilterGroup({ title, options, selected, onToggle, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.filterGroup}>
      <button
        className={styles.filterGroupHeader}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className={styles.filterChevron}>{open ? '\u2212' : '+'}</span>
      </button>
      {open && (
        <div className={styles.filterOptions}>
          {options.map((opt) => {
            const id = opt.key || opt.slug;
            return (
              <label key={id} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selected.includes(id)}
                  onChange={() => onToggle(id)}
                  className={styles.filterCheckbox}
                />
                <span className={styles.filterLabel}>{opt.name}</span>
                <span className={styles.filterCount}>{opt.count}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CatalogFilters({
  filterOptions,
  activeFilters,
  onFilterChange,
  onClearAll,
  mobileOpen,
  onMobileClose,
}) {
  const { spaces, furnitureTypes, subcategories } = filterOptions;

  const visibleTypes = activeFilters.spaces.length
    ? furnitureTypes.filter((ft) => activeFilters.spaces.includes(ft.placeSlug))
    : furnitureTypes;

  const visibleSubs = (() => {
    let subs = subcategories;
    if (activeFilters.spaces.length) {
      subs = subs.filter((s) => activeFilters.spaces.includes(s.placeSlug));
    }
    if (activeFilters.furnitureTypes.length) {
      subs = subs.filter((s) => activeFilters.furnitureTypes.includes(s.furnitureTypeSlug));
    }
    return subs;
  })();

  const hasActiveFilters =
    activeFilters.spaces.length > 0 ||
    activeFilters.furnitureTypes.length > 0 ||
    activeFilters.subcategories.length > 0;

  const content = (
    <>
      <div className={styles.filterHeader}>
        <h2 className={styles.filterTitle}>Filters</h2>
        {hasActiveFilters && (
          <button className={styles.clearAllBtn} onClick={onClearAll}>
            Clear all
          </button>
        )}
      </div>

      <FilterGroup
        title="Space"
        options={spaces}
        selected={activeFilters.spaces}
        onToggle={(slug) => onFilterChange('spaces', slug)}
        defaultOpen
      />

      {visibleTypes.length > 0 && (
        <FilterGroup
          title="Furniture Type"
          options={visibleTypes}
          selected={activeFilters.furnitureTypes}
          onToggle={(slug) => onFilterChange('furnitureTypes', slug)}
          defaultOpen={activeFilters.spaces.length > 0}
        />
      )}

      {visibleSubs.length > 0 && (
        <FilterGroup
          title="Subcategory"
          options={visibleSubs}
          selected={activeFilters.subcategories}
          onToggle={(slug) => onFilterChange('subcategories', slug)}
        />
      )}
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={styles.filterSidebar} aria-label="Product filters">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className={styles.filterDrawerBackdrop} onClick={onMobileClose}>
          <aside
            className={styles.filterDrawer}
            onClick={(e) => e.stopPropagation()}
            aria-label="Product filters"
          >
            <div className={styles.filterDrawerHead}>
              <h2>Filters</h2>
              <button className={styles.filterDrawerClose} onClick={onMobileClose} aria-label="Close filters">
                &times;
              </button>
            </div>
            {content}
            <button className={styles.filterDrawerApply} onClick={onMobileClose}>
              Apply Filters
            </button>
          </aside>
        </div>
      )}
    </>
  );
}
