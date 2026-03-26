import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const NotFound = () => {
  useEffect(() => {
    let meta = document.head.querySelector('meta[name="robots"]');
    const existed = Boolean(meta);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    const previousContent = meta.getAttribute('content');
    meta.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (!existed) {
        meta.remove();
      } else {
        meta.setAttribute('content', previousContent || '');
      }
    };
  }, []);

  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist."
      />
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-primary, #e5e5e5)',
      }}>
        <h1 style={{
          fontSize: '6rem',
          fontWeight: '700',
          margin: '0',
          lineHeight: '1',
          color: 'var(--accent-color, #c9a96e)',
        }}>
          404
        </h1>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '400',
          margin: '1rem 0 0.5rem',
          color: 'var(--text-primary, #e5e5e5)',
        }}>
          Page Not Found
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary, #a0a0a0)',
          margin: '0 0 2rem',
          maxWidth: '400px',
        }}>
          The page you are looking for doesn't exist or may have been moved.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: 'var(--accent-color, #c9a96e)',
            color: '#1a1a1a',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.95rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
