import ContactPage from '../../components/contact/ContactPage';
import Breadcrumbs from '../../components/Breadcrumbs';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Contact DMD Furnishing | Foxboro MA Manufacturer',
  description:
    'Request a project estimate or hospitality furniture consultation with DMD Furnishing in Foxboro, Massachusetts. Talk scope, materials, budgets, and lead times.',
  path: '/contact',
  image: '/Images/Contact_Page.jpg',
});

const contactSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${siteUrl}/contact`,
      url: `${siteUrl}/contact`,
      name: 'Contact DMD Furnishing | Foxboro Massachusetts Furniture Manufacturer',
      description:
        'Contact DMD Furnishing to request a project estimate, book a hospitality furniture consultation, or start a custom FF&E project for hotels, restaurants, offices, or institutional spaces.',
      isPartOf: { '@id': `${siteUrl}/#website` },
    },
    {
      '@type': 'Service',
      name: 'Hospitality Furniture Consultation',
      url: `${siteUrl}/contact#schedule`,
      description:
        'Book a hospitality furniture consultation with DMD Furnishing to walk through scope, materials, 2D technical drawings, 3D design, budgets, and lead times for your custom commercial furniture project.',
      provider: { '@type': 'Organization', '@id': `${siteUrl}/#organization` },
      areaServed: 'US',
    },
    {
      '@type': 'ScheduleAction',
      name: 'Request a Project Consultation',
      target: process.env.NEXT_PUBLIC_CALENDLY_URL || `${siteUrl}/contact#schedule`,
      description:
        'Request a project consultation or schedule a call with a DMD Furnishing project manager to walk through custom FF&E scope, materials, and budget.',
      provider: { '@type': 'Organization', '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
      ],
    },
  ],
};

export default async function ContactRoute({ searchParams }) {
  const params = await searchParams;

  /* To enable Calendly, set NEXT_PUBLIC_CALENDLY_URL in your .env.local
     e.g. NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-name/30min */
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <ContactPage
        initialCategory={params?.category || ''}
        recaptchaSiteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.REACT_APP_RECAPTCHA_SITE_KEY || ''}
        calendlyUrl={calendlyUrl}
      />
    </>
  );
}
