import './globals.css';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import Footer from '../components/Footer';
import Header from '../components/Header';
import JsonLd from '../components/JsonLd';
import ScrollReveal from '../components/ScrollReveal';
import ScrollToTop from '../components/ScrollToTop';
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from '../lib/metadata';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-serif',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
    'Custom hospitality furniture designed, manufactured and installed by DMD Furnishing in Foxboro, MA. End-to-end FF&E solutions for hotels, restaurants, offices, and institutional spaces nationwide.',
  openGraph: {
    type: 'website',
    siteName: 'DMD Furnishing',
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
  other: {
    'theme-color': '#000000',
  },
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`${playfair.variable} ${sourceSans.variable} dark-mode`}>
      <body className="dark-mode">
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
      </body>
    </html>
  );
}
