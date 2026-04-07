import Link from 'next/link';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import styles from './page.module.css';

const faqItems = [
  {
    name: 'Is the consultation free?',
    answer: 'Yes, the initial 30-minute consultation is completely free with no obligation.',
  },
  {
    name: 'Do I need finalized drawings?',
    answer: 'No, we can start with rough concepts or floor plans. If you have them, great. If not, we can help guide the design process.',
  },
  {
    name: 'Can you work with my designer or architect?',
    answer: 'Absolutely. We often collaborate with design teams to ensure manufacturability and budget alignment.',
  },
  {
    name: 'Do you handle small renovations?',
    answer: 'Yes, we assist with renovations of all sizes. Whether you are refreshing a lobby, updating a restaurant, or renovating a block of rooms, our team provides custom solutions to match your needs and budget.',
  },
  {
    name: 'Do you offer value engineering?',
    answer: 'Yes, value engineering is a core part of our service to help you achieve your design vision within budget.',
  },
  {
    name: 'Can this lead to an in-person meeting?',
    answer: 'Yes, depending on the project scope and location, a site visit or showroom meeting can be the next step.',
  },
];

const callTopics = [
  'Project type: hotel, motel, restaurant, corporate, renovation, or new build',
  'Furniture scope: casegoods, seating, wardrobes, vanities, cubbies, millwork',
  'Material options: HPL, scratch-free laminates, veneer, solid wood, metal',
  'Budget alignment and value engineering',
  'Manufacturing approach: domestic versus overseas',
  'Lead times, logistics, and installation considerations',
  'Clear next steps after the call',
];

const whoItIsFor = [
  'Hotel owners and operators',
  'Hospitality project managers',
  'Interior designers and architects',
  'Franchise renovation teams',
  'Commercial property owners',
  'Procurement and sourcing managers',
];

const takeaways = [
  'Clear project direction',
  'Material and finish recommendations',
  'Rough budget guidance',
  'Manufacturing feasibility insights',
  'Timeline clarity',
  'Option to proceed with drawings, BOQ, samples, or site visit',
];

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Free Consultation | Hospitality Furniture',
    description:
      'Book a free 30-minute consultation with DMD Furnishing. Discuss custom FF&E, materials, timelines, and budgets for your hotel, restaurant, or commercial project — no obligation.',
    path: '/schedule-call',
    image: '/Images/Join_Our_Satisfied_Clients.jpg',
  });
}

const scheduleSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${siteUrl}/schedule-call`,
      name: 'Free Hospitality Furniture Consultation',
      url: `${siteUrl}/schedule-call`,
      description: 'Book a free 30-minute consultation with DMD Furnishing to discuss custom FF&E, materials, timelines, and budgets for your commercial project.',
      provider: { '@type': 'Organization', '@id': `${siteUrl}/#organization` },
      areaServed: 'US',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: 'Free 30-minute consultation',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Schedule a Call', item: `${siteUrl}/schedule-call` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.name,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
};

export default function ScheduleCallPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scheduleSchema) }} />
      <section className={styles.hero} aria-label="Schedule a consultation">
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Schedule a Call</p>
          <h1>Speak with a Hospitality Furniture Specialist</h1>
          <p>
            Get expert guidance on custom FF&E, materials, timelines, and budgets. The
            initial consultation is free and has no obligation.
          </p>
          <div className={styles.actions}>
            <a href="#scheduling-section" className={styles.primaryButton}>Schedule a Call</a>
            <a href="mailto:sales@dmdfurnishing.com" className={styles.secondaryButton}>Request a Video Meeting</a>
          </div>
        </div>
      </section>

      <div className={styles.shell}>
        <section className={styles.section}>
          <p className={styles.eyebrow}>What We Will Cover</p>
          <h2>What to Expect on the Call</h2>
          <ul className={styles.list}>
            {callTopics.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <p className={styles.eyebrow}>Who This Is For</p>
          <h2>Designed for active project teams</h2>
          <ul className={styles.list}>
            {whoItIsFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.note}>Ideal for projects starting within the next 3 to 12 months.</p>
        </section>

        <section className={styles.section}>
          <p className={styles.eyebrow}>What You Get</p>
          <h2>Practical guidance after the call</h2>
          <ul className={styles.list}>
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="scheduling-section" className={`${styles.section} ${styles.booking}`}>
          <p className={styles.eyebrow}>Booking</p>
          <h2>Schedule Your 30-Minute Consultation</h2>
          <p>
            Choose a time that works for you. Calls typically last 30 minutes. We support
            phone, Zoom, and Microsoft Teams.
          </p>
          <div className={styles.bookingCard}>
            <p className={styles.bookingTitle}>Book Your Free Consultation</p>
            <p>
              Contact us by phone or email to schedule your consultation at your convenience.{' '}
              Call <a href="tel:+16172237781">+1 (617) 223-7781</a> or email{' '}
              <a href="mailto:sales@dmdfurnishing.com">sales@dmdfurnishing.com</a>.
            </p>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <p className={styles.eyebrow}>Why Partner With Us</p>
          <h2>End-to-end service for complex commercial work</h2>
          <div className={styles.cardGrid}>
            <article className={styles.card}><h3>End-to-End Service</h3><p>Design, manufacturing, delivery, and installation coordinated together.</p></article>
            <article className={styles.card}><h3>Proven Expertise</h3><p>Experience with branded and independent hospitality projects.</p></article>
            <article className={styles.card}><h3>Nationwide Reach</h3><p>Nationwide service with local project oversight.</p></article>
            <article className={styles.card}><h3>Quality Assured</h3><p>Materials and execution aligned with brand and regulatory standards.</p></article>
          </div>
        </section>

        <section className={styles.section}>
          <p className={styles.eyebrow}>Frequently Asked Questions</p>
          <h2>Common questions before booking</h2>
          <div className={styles.faqGrid}>
            {faqItems.map((item) => (
              <article key={item.name} className={styles.faqCard}>
                <h3>{item.name}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Ready to discuss your project?</h2>
          <p>No obligation, expert guidance, hospitality-focused.</p>
          <a href="#scheduling-section" className={styles.primaryButton}>Book Your Free Consultation</a>
        </section>
      </div>

    </main>
  );
}
