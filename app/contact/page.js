import ContactPage from '../../components/contact/ContactPage';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Contact Us | Request a Consultation',
  description:
    'Contact DMD Furnishing to request a quote, ask about lead times, or discuss a commercial furniture project. Based in Foxboro, MA — serving hotels, restaurants, and institutional clients nationwide.',
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
      description: 'Contact DMD Furnishing to request a quote, discuss lead times, or start a commercial furniture project for hotels, restaurants, offices, or institutional spaces.',
      isPartOf: { '@id': `${siteUrl}/#website` },
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <ContactPage
        initialCategory={params?.category || ''}
        recaptchaSiteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.REACT_APP_RECAPTCHA_SITE_KEY || ''}
      />
    </>
  );
}
