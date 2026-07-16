import { describe, it, expect } from 'vitest';
import { getProductCopy, interpolate, buildCopyVars } from './product-copy.js';

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
  const bedFramePrimary = { subcategoryName: 'Bed Frame', placeName: 'Hotels & Motels' };

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
