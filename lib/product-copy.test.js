import { describe, it, expect } from 'vitest';
import { getProductCopy, interpolate, buildCopyVars } from './product-copy.js';
import { SUBCATEGORY_COPY_GROUPS } from './product-copy-groups.js';

const SUPPORTED_VARS = new Set(['name', 'material', 'color', 'subcategory', 'place']);
const FORBIDDEN_WORDS = ['delve', 'leverage', 'robust', 'seamless', 'comprehensive'];
const EM_DASH = '—';

describe('interpolate', () => {
  it('substitutes a {var} token with the matching value', () => {
    expect(interpolate('Built from {material}.', { material: 'welded steel' })).toBe(
      'Built from welded steel.'
    );
  });

  it('substitutes multiple distinct tokens in one pass', () => {
    const out = interpolate('{name} in {color} for {place}.', {
      name: 'King Platform Frame',
      color: 'Matte Black',
      place: 'Hotels & Motels',
    });
    expect(out).toBe('King Platform Frame in Matte Black for Hotels & Motels.');
  });

  it('falls back to the per-var fallback string when the value is missing', () => {
    expect(interpolate('Built from {material}.', {})).toBe(
      'Built from commercial-grade materials.'
    );
  });

  it('falls back when the value is an empty string', () => {
    expect(interpolate('Finished in {color}.', { color: '' })).toBe(
      'Finished in your specified finish.'
    );
  });

  it('falls back when vars is undefined', () => {
    expect(interpolate('For {place} use.', undefined)).toBe('For commercial spaces use.');
  });

  it('leaves an unrecognized token untouched rather than erasing it', () => {
    expect(interpolate('Some {unknownVar} here.', {})).toBe('Some {unknownVar} here.');
  });

  it('passes through text with no tokens unchanged', () => {
    expect(interpolate('Plain sentence, no tokens.', { material: 'steel' })).toBe(
      'Plain sentence, no tokens.'
    );
  });

  it('returns falsy input unchanged (no heading/body to interpolate)', () => {
    expect(interpolate('', {})).toBe('');
    expect(interpolate(undefined, {})).toBe(undefined);
  });
});

describe('buildCopyVars', () => {
  it('resolves name from product.name and subcategory/place from primary', () => {
    const primary = { subcategoryName: 'Bed Frame', placeName: 'Hotels & Motels' };
    const product = { name: 'King Platform Frame', specifications: [] };
    const vars = buildCopyVars(primary, product);
    expect(vars.name).toBe('King Platform Frame');
    expect(vars.subcategory).toBe('Bed Frame');
    expect(vars.place).toBe('Hotels & Motels');
  });

  it('reads material from a "Material" spec (singular schema)', () => {
    const product = { specifications: [{ name: 'Material', value: 'Laminate/MDF carcass' }] };
    expect(buildCopyVars(null, product).material).toBe('Laminate/MDF carcass');
  });

  it('reads material from a "Materials" spec (plural schema) when singular is absent', () => {
    const product = { specifications: [{ name: 'Materials', value: 'Solid hardwood frame' }] };
    expect(buildCopyVars(null, product).material).toBe('Solid hardwood frame');
  });

  it('reads color from a "Color" spec, case-insensitively matched', () => {
    const product = { specifications: [{ name: 'color', value: 'Walnut' }] };
    expect(buildCopyVars(null, product).color).toBe('Walnut');
  });

  it('returns empty strings for every field when called with no arguments', () => {
    const vars = buildCopyVars();
    expect(vars).toEqual({ name: '', material: '', color: '', subcategory: '', place: '' });
  });

  it('returns empty strings when product has no specifications array', () => {
    const vars = buildCopyVars({ subcategoryName: 'Desk' }, { name: 'Writing Desk' });
    expect(vars.material).toBe('');
    expect(vars.color).toBe('');
  });

  it('ignores a spec with a blank value', () => {
    const product = { specifications: [{ name: 'Color', value: '' }] };
    expect(buildCopyVars(null, product).color).toBe('');
  });
});

describe('getProductCopy backwards compatibility', () => {
  // "Bed Frame" itself is now one of the 66 new per-subcategory groups (see
  // the "new per-subcategory groups win" describe block below), so this
  // fixture uses a subcategoryName that only resolves via resolveByKeyword's
  // fallback into the legacy `bedFrames` group -- exercising the untouched
  // legacy path these tests were written to cover.
  const bedFramePrimary = { subcategoryName: 'Custom Platform Bed', placeName: 'Hotels & Motels' };

  it('still works when called with only primary (no product arg)', () => {
    const copy = getProductCopy(bedFramePrimary);
    expect(copy.materials.heading).toBe('Built to hold up under nightly commercial use');
    expect(copy.specification.heading).toBe('Specified for hotels, dorms, and multi-family projects');
  });

  it('returns byte-identical text whether or not a product row is passed, since the 15 groups carry no {var} tokens', () => {
    const withoutProduct = getProductCopy(bedFramePrimary);
    const withProduct = getProductCopy(bedFramePrimary, {
      name: 'King Platform Frame',
      specifications: [{ name: 'Material', value: 'Welded steel' }],
    });
    expect(withProduct).toEqual(withoutProduct);
  });

  it('falls back to the default group for an unmapped subcategory, with or without a product arg', () => {
    const unknownPrimary = { subcategoryName: 'Some New Thing', furnitureTypeName: '' };
    const copy = getProductCopy(unknownPrimary, { name: 'Mystery Item' });
    expect(copy.materials.heading).toBe('Commercial-grade construction as standard');
  });

  it('leaves the dedicated closets group untouched', () => {
    const closetsPrimary = { subcategoryName: 'Walk-In Closets' };
    const copy = getProductCopy(closetsPrimary, {
      name: 'Reach-In System',
      specifications: [{ name: 'Material', value: 'HPL laminate' }],
    });
    expect(copy.materials.heading).toBe('How much space does a walk-in closet system need?');
    expect(copy.specification.heading).toBe(
      'Can a walk-in closet system be installed in a condo or a smaller unit?'
    );
  });

  it('handles a null primary and undefined product without throwing', () => {
    expect(() => getProductCopy(null)).not.toThrow();
    expect(() => getProductCopy(null, undefined)).not.toThrow();
  });
});

describe('getProductCopy — new per-subcategory groups win over legacy', () => {
  it('resolves "Bed Frame" to the new dedicated group, not the legacy bedFrames group', () => {
    const copy = getProductCopy(
      { subcategoryName: 'Bed Frame', placeName: 'Hotels & Motels' },
      { name: 'King Platform Frame', specifications: [{ name: 'Material', value: 'Welded steel' }] }
    );
    expect(copy.materials.heading).toBe('Platform construction rated for nightly turnover');
    expect(copy.materials.body).toContain('King Platform Frame');
    expect(copy.materials.body).toContain('Welded steel');
    // Legacy heading text must NOT appear.
    expect(copy.materials.heading).not.toBe('Built to hold up under nightly commercial use');
  });

  it('matches subcategoryName case-insensitively against the new groups', () => {
    const copy = getProductCopy({ subcategoryName: 'sofa' }, { name: 'Test Sofa' });
    expect(copy.materials.heading).toBe('Sofa construction built for years of daily seating');
  });

  it('interpolates {subcategory} and {place} tokens using the primary membership', () => {
    const copy = getProductCopy(
      { subcategoryName: 'Dining Table', placeName: 'Restaurants' },
      { name: 'Test Table' }
    );
    expect(copy.materials.body).toContain('Test Table');
    expect(copy.specification.body).toContain('Dining Table');
    expect(copy.specification.body).toContain('Restaurants');
  });

  it('leaves the dedicated closets group untouched even though 66 new groups now exist', () => {
    const copy = getProductCopy({ subcategoryName: 'Walk-In Closets' }, { name: 'Reach-In System' });
    expect(copy.materials.heading).toBe('How much space does a walk-in closet system need?');
  });
});

describe('SUBCATEGORY_COPY_GROUPS — data integrity (66 groups)', () => {
  const entries = Object.entries(SUBCATEGORY_COPY_GROUPS);

  it('has exactly 66 groups', () => {
    expect(entries.length).toBe(66);
  });

  it('does not define a "closets" or "walk-in closet" key (owned by the dedicated legacy group)', () => {
    const keys = Object.keys(SUBCATEGORY_COPY_GROUPS).map((k) => k.toLowerCase());
    expect(keys).not.toContain('closets');
    expect(keys).not.toContain('walk-in closets');
    expect(keys).not.toContain('walk-in closet');
  });

  for (const [name, group] of entries) {
    describe(`"${name}"`, () => {
      it('has non-empty materials heading and body', () => {
        expect(group.materials?.heading?.trim().length).toBeGreaterThan(0);
        expect(group.materials?.body?.trim().length).toBeGreaterThan(0);
      });

      it('has non-empty specification heading and body', () => {
        expect(group.specification?.heading?.trim().length).toBeGreaterThan(0);
        expect(group.specification?.body?.trim().length).toBeGreaterThan(0);
      });

      it('only uses tokens the interpolator supports', () => {
        const text = [
          group.materials.heading,
          group.materials.body,
          group.specification.heading,
          group.specification.body,
        ].join(' ');
        const tokens = [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
        for (const token of tokens) {
          expect(SUPPORTED_VARS.has(token), `unsupported token {${token}} in "${name}"`).toBe(true);
        }
      });

      it('contains no forbidden words or em-dash characters in body text', () => {
        const bodies = [group.materials.body, group.specification.body];
        for (const body of bodies) {
          expect(body.includes(EM_DASH), `em-dash found in "${name}" body`).toBe(false);
          const lower = body.toLowerCase();
          for (const word of FORBIDDEN_WORDS) {
            const re = new RegExp(`\\b${word}\\b`, 'i');
            expect(re.test(lower), `forbidden word "${word}" found in "${name}" body`).toBe(false);
          }
        }
      });
    });
  }
});
