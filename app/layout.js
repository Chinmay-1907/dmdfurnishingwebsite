import './globals.css';
import Script from 'next/script';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import Footer from '../components/Footer';
import Header from '../components/Header';
import JsonLd from '../components/JsonLd';
import ScrollReveal from '../components/ScrollReveal';
import ScrollToTop from '../components/ScrollToTop';
import WebVitals from '../components/WebVitals';
import { ThemeProvider, themeBootScript } from '../components/ThemeProvider';
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from '../lib/metadata';

// Weights trimmed to what the CSS actually uses (audit 2026-06):
// Playfair 400 had a single user (.pullQuote, remapped to 500);
// Source Sans 300 only styled FAQ "+" glyphs (remapped to 400).
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-serif',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  metadataBase: new URL('https://dmdfurnishing.com'),
  title: {
    default: 'DMD Furnishing',
    template: '%s | DMD Furnishing',
  },
  description:
    'Custom hospitality furniture designed, manufactured, and installed by DMD Furnishing in Foxboro, MA. FF&E for hotels, restaurants, and offices nationwide.',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    siteName: 'DMD Furnishing',
    locale: 'en_US',
    images: [
      {
        url: '/Images/Tailored_Guestroom_Collections.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  // Verification tokens for Search Console tooling.
  // Replace placeholder strings once each property is created:
  //  - google: Search Console property token (DNS or HTML tag method)
  //  - msvalidate.01: Bing Webmaster Tools token
  //  - yandex: Yandex Webmaster token (optional)
  verification: {
    ...(process.env.GSC_VERIFICATION_TOKEN && { google: process.env.GSC_VERIFICATION_TOKEN }),
    ...(process.env.BING_VERIFICATION_TOKEN && {
      other: { 'msvalidate.01': process.env.BING_VERIFICATION_TOKEN },
    }),
  },
  other: {
    'theme-color': '#000000',
  },
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  // Plausible analytics activates only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        {/* Anti-FOUC: resolve and apply the theme attribute synchronously,
            BEFORE first paint. Without this, every visit would briefly show
            the wrong theme while React hydrates. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <ThemeProvider>
          <WebVitals />
          <ScrollToTop />
          <ScrollReveal />
          <JsonLd data={organizationSchema} />
          <JsonLd data={localBusinessSchema} />
          <JsonLd data={websiteSchema} />
          <div className="site-shell">
            <a href="#main-content" className="skip-link-global">
              Skip to main content
            </a>
            <Header />
            <div className="main-content" id="main-content">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
