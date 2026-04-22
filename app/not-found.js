import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

const quickLinks = [
  { href: '/products', label: 'Browse Commercial Furniture' },
  { href: '/services', label: 'Our Services' },
  { href: '/projects', label: 'Recent Projects' },
  { href: '/contact#schedule', label: 'Schedule a Free Consultation' },
  { href: '/contact', label: 'Contact Us' },
];

export default function NotFound() {
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
      <p style={{ color: 'var(--text-accent)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>404</p>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary, #b0b0b0)', marginBottom: '2rem', lineHeight: 1.6 }}>
        The page you are looking for does not exist or has been moved. Try one of these links to find what you need.
      </p>
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
