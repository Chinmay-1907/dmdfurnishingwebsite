import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import styles from './page.module.css';

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Terms of Use, Privacy & Data Policies',
    description:
      'Review DMD Furnishing terms of use, privacy policy, disclaimer of warranties, CCPA and GDPR data rights, cookie usage, data security practices, and governing law for Massachusetts.',
    path: '/website-policies',
    image: '/DMD_Furnishing_Logo_Embedded.svg',
  });
}

const websitePoliciesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Terms of Use, Privacy & Data Policies | DMD Furnishing',
      description:
        'Review DMD Furnishing terms of use, privacy policy, disclaimer of warranties, CCPA and GDPR data rights, cookie usage, data security practices, and governing law for Massachusetts.',
      url: 'https://dmdfurnishing.com/website-policies',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dmdfurnishing.com' },
        { '@type': 'ListItem', position: 2, name: 'Website Policies', item: 'https://dmdfurnishing.com/website-policies' },
      ],
    },
  ],
};

export default function WebsitePoliciesPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websitePoliciesSchema) }} />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Website Policies</p>
          <h1>Terms, privacy, and data use information</h1>
        </div>
      </section>

      <div className={styles.shell}>
        <section className={styles.section}>
          <h2>1. Terms of Use</h2>
          <p>By accessing or using our site, you agree to be bound by these Terms of Use and all applicable laws and regulations.</p>
          <p>The content and materials on this site are for informational purposes only and are not a substitute for professional advice.</p>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <h2>2. Disclaimer of Warranties</h2>
          <p>The information, products, and services on this site are provided on an as-is basis. DMD Furnishing makes no warranties, expressed or implied.</p>
          <p>Project details, including timelines, materials, and quantities, are illustrative examples and are subject to change without notice.</p>
        </section>

        <section className={styles.section}>
          <h2>3. Limitation of Liability</h2>
          <p>In no event shall DMD Furnishing or its suppliers be liable for any damages arising out of the use or inability to use the materials on this website.</p>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <h2>4. Accuracy of Materials and Information</h2>
          <p>The materials appearing on our site could include technical, typographical, or photographic errors. We may make changes to the materials contained on our site at any time without notice.</p>
        </section>

        <section className={styles.section}>
          <h2>5. User Agreement</h2>
          <p>By using this site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our site.</p>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <h2>6. Governing Law</h2>
          <p>Any claim relating to DMD Furnishing&apos;s website shall be governed by the laws of the Commonwealth of Massachusetts.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Privacy Policy</h2>
          <p>DMD Furnishing respects your privacy and is committed to protecting personal information you may provide through our website.</p>
          <h3>Information We Collect</h3>
          <p>We may collect personal information that you voluntarily provide when using our contact forms, scheduling consultations, or requesting quotes.</p>
          <h3>How We Use Your Information</h3>
          <p>We use the information we collect to respond to inquiries, provide project consultations, send relevant communications, and improve the website experience.</p>
          <h3>Cookies and Analytics</h3>
          <p>Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze site usage.</p>
          <h3>Data Security</h3>
          <p>We implement reasonable security measures to protect your personal information, but no method of transmission over the internet is 100% secure.</p>
          <h3>Contact Us</h3>
          <p>For questions about our privacy practices, contact us at <a href="mailto:Sales@DMDFurnishing.com">Sales@DMDFurnishing.com</a> or write to DMD Furnishing, 56 Leonard St Unit 5, Foxboro, MA 02035.</p>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <h2>8. California Privacy Rights (CCPA)</h2>
          <p>If you are a California resident, you have the right to request disclosure and deletion of personal information, subject to certain exceptions.</p>
        </section>

        <section className={styles.section}>
          <h2>9. European Privacy Rights (GDPR)</h2>
          <p>If you are located in the European Economic Area or United Kingdom, you have additional rights regarding your personal data, including access, rectification, erasure, restriction, and portability.</p>
          <p>Our legal basis for processing personal information includes consent, contractual necessity, and legitimate business interests.</p>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <h2>10. Changes to These Policies</h2>
          <p>DMD Furnishing may revise these website policies at any time without notice.</p>
          <p><em>Last updated: February 16, 2026</em></p>
        </section>
      </div>
    </main>
  );
}
