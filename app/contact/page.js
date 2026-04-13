import ContactPage from '../../components/contact/ContactPage';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Contact Us | Request a Consultation',
  description:
    'Request a consultation with DMD Furnishing. Discuss scope, materials, budgets, and timelines for your commercial furniture project. Foxboro, MA.',
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
      name: 'Contact DMD Furnishing | Request a Consultation',
      description:
        'Contact DMD Furnishing to request a quote, schedule a free consultation, or start a commercial furniture project for hotels, restaurants, offices, or institutional spaces.',
      isPartOf: { '@id': `${siteUrl}/#website` },
    },
    {
      '@type': 'Service',
      name: 'Hospitality Furniture Consultation',
      url: `${siteUrl}/contact#schedule`,
      description:
        'Request a consultation with DMD Furnishing to discuss custom FF&E, materials, timelines, and budgets for your commercial project.',
      provider: { '@type': 'Organization', '@id': `${siteUrl}/#organization` },
      areaServed: 'US',
    },
    {
      '@type': 'ScheduleAction',
      name: 'Request a Consultation',
      target: process.env.NEXT_PUBLIC_CALENDLY_URL || `${siteUrl}/contact#schedule`,
      description:
        'Request a consultation with DMD Furnishing to discuss custom FF&E, materials, timelines, and budgets for your commercial project.',
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
      <ContactPage
        initialCategory={params?.category || ''}
        recaptchaSiteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.REACT_APP_RECAPTCHA_SITE_KEY || ''}
        calendlyUrl={calendlyUrl}
      />
    </>
  );
}
