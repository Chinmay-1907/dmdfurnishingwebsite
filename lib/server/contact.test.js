import { describe, it, expect, vi } from 'vitest';
import {
  generateOtp,
  createOtpHash,
  verifyOtpHash,
  isValidEmail,
  isDisposableEmail,
  isValidPhone,
  containsProfanity,
  verifyRecaptcha,
  getSmtpHint,
  escapeHtml,
  formatArray,
  getClientIp,
} from './contact.js';

describe('generateOtp', () => {
  it('returns a zero-padded string of the requested length', () => {
    // TODO: mock crypto.randomInt to a known value, assert padStart behavior
  });

  it('clamps digits to a max of 6', () => {
    // TODO: generateOtp(4, 20) should never exceed 6 digits
  });
});

describe('createOtpHash / verifyOtpHash', () => {
  it('verifies a hash created with matching email/otp/expires', () => {
    const expires = Date.now() + 60_000;
    const hash = createOtpHash('a@b.com', '123456', expires);
    expect(verifyOtpHash('a@b.com', '123456', hash, expires)).toBe(true);
  });

  it('rejects when otp does not match', () => {
    // TODO
  });

  it('rejects when hash is stale (expires in the past)', () => {
    const expires = Date.now() - 1000;
    const hash = createOtpHash('a@b.com', '123456', expires);
    expect(verifyOtpHash('a@b.com', '123456', hash, expires)).toBe(false);
  });

  it('does NOT silently pass when expires is non-numeric (regression guard)', () => {
    // BUG: Number.parseInt('not-a-number', 10) -> NaN, Date.now() > NaN -> false,
    // so verifyOtpHash currently treats a malformed expires as "not yet expired".
    const hash = createOtpHash('a@b.com', '123456', 'garbage');
    expect(verifyOtpHash('a@b.com', '123456', hash, 'garbage')).toBe(false); // will FAIL today
  });
});

describe('isValidEmail', () => {
  it.each([
    ['a@b.com', true],
    ['a.b+c@sub.domain.co', true],
    ['not-an-email', false],
    ['a@b', false],
    ['', false],
  ])('%s -> %s', (input, expected) => {
    expect(isValidEmail(input)).toBe(expected);
  });
});

describe('isDisposableEmail', () => {
  it('flags known disposable domains', () => {
    expect(isDisposableEmail('x@mailinator.com')).toBe(true);
  });

  it('is case-insensitive on domain', () => {
    expect(isDisposableEmail('x@MAILINATOR.COM')).toBe(true);
  });

  it('allows normal domains', () => {
    expect(isDisposableEmail('x@gmail.com')).toBe(false);
  });

  it('handles missing "@" without throwing', () => {
    expect(isDisposableEmail('not-an-email')).toBe(false);
  });
});

describe('isValidPhone', () => {
  it.each([
    ['1234567', true],
    ['+1 (234) 567-8901', true],
    ['123', false],
    ['1'.repeat(16), false],
  ])('%s -> %s', (input, expected) => {
    expect(isValidPhone(input)).toBe(expected);
  });
});

describe('containsProfanity', () => {
  it('matches on substring, case-insensitive', () => {
    expect(containsProfanity('this is a BadWord here')).toBe(true);
  });

  it('returns false for clean text', () => {
    expect(containsProfanity('hello world')).toBe(false);
  });
});

describe('verifyRecaptcha', () => {
  it('returns false immediately when token missing', async () => {
    expect(await verifyRecaptcha('', '1.2.3.4')).toBe(false);
  });

  it('returns true when Google responds success + score above threshold', async () => {
    // TODO: vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: async () => ({ success: true, score: 0.9 }) }))
  });

  it('returns false when fetch throws (fail-closed)', async () => {
    // TODO: mock fetch to reject, assert false and no throw escapes
  });

  it('returns false when score is below recaptchaMinScore', async () => {
    // TODO
  });
});

describe('getSmtpHint', () => {
  it('maps EAUTH to an auth hint', () => {
    expect(getSmtpHint({ code: 'EAUTH' })).toMatch(/authentication/i);
  });

  it('maps ETIMEDOUT to a timeout hint', () => {
    expect(getSmtpHint({ code: 'ETIMEDOUT' })).toMatch(/timed out/i);
  });

  it('falls back to a generic hint for unknown errors', () => {
    expect(getSmtpHint({})).toMatch(/verify smtp settings/i);
  });
});

describe('escapeHtml', () => {
  it('escapes all five reserved characters', () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).not.toMatch(/[<>"']/);
  });
});

describe('formatArray', () => {
  it('joins arrays with ", "', () => {
    expect(formatArray(['a', 'b'])).toBe('a, b');
  });

  it('passes through non-array values, defaults falsy to empty string', () => {
    expect(formatArray(null)).toBe('');
    expect(formatArray('x')).toBe('x');
  });
});

describe('getClientIp', () => {
  it('prefers x-forwarded-for over client-ip', () => {
    const request = { headers: new Map([['x-forwarded-for', '1.1.1.1'], ['client-ip', '2.2.2.2']]) };
    request.headers.get = (k) => new Map(request.headers).get(k);
    expect(getClientIp(request)).toBe('1.1.1.1');
  });
});
