'use client';

import Link from 'next/link';
import { useEffect } from 'react';

const quickLinks = [
  { href: '/', label: 'Return to Home' },
  { href: '/products', label: 'Browse Commercial Furniture' },
  { href: '/services', label: 'Our Services' },
  { href: '/contact#schedule', label: 'Schedule a Free Consultation' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Error({ error, reset }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'exception', { description: error?.message || 'unknown', fatal: false });
    }
  }, [error]);

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        maxWidth: '540px',
        margin: '0 auto',
      }}
    >
      <p style={{ color: 'var(--text-accent)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>500</p>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Something Went Wrong</h1>
      <p style={{ color: 'var(--text-secondary, #b0b0b0)', marginBottom: '2rem', lineHeight: 1.6 }}>
        We hit an unexpected error loading this page. Try again, return to the homepage, or reach out if it keeps happening.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => reset()}
          style={{
            background: 'var(--color-gold)',
            color: '#0b0b0b',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '4px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </div>
      <nav aria-label="Helpful links" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', maxWidth: '320px' }}>
        {quickLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{ color: 'var(--text-accent)', textDecoration: 'underline', padding: '0.35rem 0' }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
