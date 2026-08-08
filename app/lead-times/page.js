import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import Breadcrumbs from '../../components/Breadcrumbs';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import styles from './page.module.css';

// ---------------------------------------------------------------------------
// Static data — every range below is already published elsewhere on the
// site (blog posts, guides, services FAQ). Nothing here is a new claim.
// ---------------------------------------------------------------------------

const rangeItems = [
  {
    label: 'DMD standard scopes',
    value: '9 to 10 weeks',
    detail:
      'DMD Furnishing commits standard scopes in about 9 to 10 weeks, compared to an industry default of 12 to 20 weeks for contract furniture.',
  },
  {
    label: 'Standard catalog items, standard finishes',
    value: '6 to 10 weeks',
    detail: 'Counted from order confirmation to finished goods leaving the factory.',
  },
  {
    label: 'Custom items, standard materials',
    value: '10 to 14 weeks',
    detail: 'Includes time for custom shop drawings, approval, and production scheduling.',
  },
  {
    label: 'Highly custom items',
    value: '14 to 20 weeks or longer',
    detail: 'Custom dimensions, exotic veneers, and custom metalwork all extend the schedule.',
  },
  {
    label: 'Design development phase (industry)',
    value: '10 to 16 weeks',
    detail: 'The long-lead-time window most projects budget for during design development, before purchase orders are issued.',
  },
  {
    label: 'Full hotel renovation FF&E procurement',
    value: '16 to 24 weeks',
    detail: 'From design completion to installation. Highly custom items or international sourcing should budget 24 weeks or more.',
  },
];

const coverItems = [
  {
    title: 'Production',
    body:
      'Time from a confirmed purchase order to finished goods leaving the factory floor, whether that is our Foxboro shop or an overseas partner.',
  },
  {
    title: 'Finishes',
    body:
      'Sample and finish approval happens before production starts. HPL ships fastest; veneer adds time for species selection and face matching; solid wood carries the longest lead time because of material sourcing, drying, and machining.',
  },
  {
    title: 'Freight',
    body:
      'Delivery from the factory to your site, staged and phased around your GC schedule. International shipments add customs documentation on top of transit time.',
  },
];

const factorItems = [
  {
    title: 'Quantity',
    body:
      'Multi-property rollouts and full guestroom packages queue behind other production runs and stretch the schedule beyond a single-room order.',
  },
  {
    title: 'Custom finishes',
    body:
      'HPL is the fastest surface material because it is manufactured to consistent, stocked specifications. Veneer adds lead time for species selection, face matching, and panel sequencing. Solid wood has the longest lead time of the three, due to material sourcing, drying, and machining requirements.',
  },
  {
    title: 'Shipping destination',
    body:
      'Whether production runs through our Foxboro shop or an overseas partner factory changes both production and freight time. International shipments require customs documentation that domestic orders do not.',
  },
];

const leadTimeFaqs = [
  [
    'What are DMD Furnishing’s lead times?',
    'Lead times depend on scope, finish availability, and whether production runs through our Foxboro shop or an overseas partner. Every project gets a written timeline at contract signing with dates for sample approval, production start, QC, and install.',
  ],
  [
    'How does DMD’s standard lead time compare to the industry?',
    'DMD Furnishing commits standard scopes in about 9 to 10 weeks, compared to an industry default of 12 to 20 weeks for contract furniture.',
  ],
  [
    'Does the finish material change my lead time?',
    'Yes. HPL is manufactured to consistent, stocked specifications and ships fastest. Veneer adds lead time for species selection, face matching, and panel sequencing. Solid wood has the longest lead time because of material sourcing, drying, and machining requirements.',
  ],
  [
    'How long does a full FF&E procurement take from design to installation?',
    'A full hotel renovation FF&E procurement typically runs 16 to 24 weeks from design completion to installation. Projects with highly custom items or international sourcing should budget 24 weeks or more.',
  ],
];

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const leadTimesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Lead Times', item: `${siteUrl}/lead-times` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: leadTimeFaqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
};

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Lead Times | Custom Commercial Furniture',
    description:
      'How long DMD Furnishing orders take: 9 to 10 week standard scopes, published ranges for custom and highly custom items, and what moves your project timeline.',
    path: '/lead-times',
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LeadTimesPage() {
  return (
    <main className={styles.page}>
      <JsonLd data={leadTimesSchema} />

      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Lead Times</p>
          <h1>How long does a DMD order take?</h1>
          <p className={styles.heroLede}>
            Every project gets a written, dated timeline at contract signing with dates for
            sample approval, production start, QC, and install. Below are the ranges we
            publish across our guides and project breakdowns, and what moves your project
            inside them.
          </p>
        </div>
      </section>

      <div className={styles.shell}>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Lead Times' }]} />

        {/* ── 2. What lead time covers ── */}
        <section className={styles.section}>
          <p className={styles.eyebrow}>What&apos;s Included</p>
          <h2>What does lead time cover?</h2>
          <div className={styles.coverGrid}>
            {coverItems.map((item) => (
              <article key={item.title} className={styles.coverCard}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── 3. Published ranges ── */}
        <section className={styles.section}>
          <p className={styles.eyebrow}>Published Ranges</p>
          <h2>What lead times have we published?</h2>
          <p className={styles.sectionLede}>
            These are the exact ranges we cite in our project guides and case breakdowns,
            not a new estimate. Your written timeline at contract signing will confirm the
            actual dates for your scope.
          </p>
          <div className={styles.rangeList}>
            {rangeItems.map((item) => (
              <div key={item.label} className={styles.rangeRow}>
                <span className={styles.rangeValue}>{item.value}</span>
                <div>
                  <p className={styles.rangeLabel}>{item.label}</p>
                  <p className={styles.rangeDetail}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Factors ── */}
        <section className={styles.section}>
          <p className={styles.eyebrow}>What Moves It</p>
          <h2>What changes your lead time?</h2>
          <div className={styles.coverGrid}>
            {factorItems.map((item) => (
              <article key={item.title} className={styles.coverCard}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── 5. FAQ ── */}
        <section className={styles.section}>
          <p className={styles.eyebrow}>Common Questions</p>
          <h2>What buyers ask about lead times.</h2>
          <div className={styles.faqList}>
            {leadTimeFaqs.map(([question, answer]) => (
              <details key={question} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{question}</summary>
                <p className={styles.faqAnswer}>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── 6. CTA ── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaLine} />
          <p className={styles.eyebrow}>Plan Your Project</p>
          <h2>Want a date for your project?</h2>
          <p className={styles.ctaLede}>
            Bring a room count and finish selections. Leave with a written, dated timeline
            for your specific scope.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact#schedule" className={styles.primaryBtn}>
              Schedule a Consultation
            </Link>
            <Link href="/services" className={styles.tertiaryBtn}>
              See Our Process
            </Link>
          </div>
          <div className={styles.ctaContact}>
            <a href="tel:+16172237781">+1 (617) 223-7781</a>
            <span>|</span>
            <a href="mailto:sales@dmdfurnishing.com">sales@dmdfurnishing.com</a>
          </div>
        </section>
      </div>
    </main>
  );
}
