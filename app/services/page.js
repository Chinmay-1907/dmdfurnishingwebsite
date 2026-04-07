import Link from 'next/link';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import styles from './page.module.css';

const processSteps = [
  ['01', 'Consultation and scope alignment', 'Establish project goals, budget, and timeline requirements.'],
  ['02', 'Design support and specifications', 'Coordinate materials, dimensions, and product requirements.'],
  ['03', 'Manufacturing and sourcing', 'Manage production across domestic and global facilities.'],
  ['04', 'Quality review and readiness', 'Confirm specifications and readiness before shipment.'],
  ['05', 'Delivery and installation coordination', 'Sequence logistics for efficient delivery and install.'],
  ['06', 'Project close-out and follow-up', 'Final verification and post-project support.'],
];

const coreServices = [
  ['design-consultation', 'Consultation and Project Discovery', 'Every project begins with a detailed consultation focused on scope, functional needs, timelines, and budget considerations.', ['Requirement alignment', 'Scope clarification', 'Early-stage feasibility input']],
  ['design-support', 'Design Support and Specifications', 'We provide design support to help translate project intent into clear furniture specifications.', ['Material and finish selection', 'Space planning support', 'Specification coordination']],
  ['custom-manufacturing', 'Manufacturing and Sourcing', 'We operate through a hybrid manufacturing and sourcing model that supports both speed and scale.', ['Domestic and global manufacturing', 'Custom production', 'Quality oversight']],
  ['ffe-project-management', 'FF&E Project Management', 'End-to-end furniture and fixture project management for hospitality environments.', ['Specification management', 'Production and logistics oversight', 'On-site execution']],
  ['logistics', 'Logistics and Delivery Coordination', 'We coordinate delivery planning to align with project schedules and site readiness.', ['Delivery planning', 'Staging support', 'Site schedule coordination']],
  ['installation-setup', 'Installation Support', 'Installation services are provided through experienced teams and trusted partners.', ['Installation coordination', 'Assembly oversight', 'Final placement support']],
];

const industries = ['Hospitality', 'Corporate and Office', 'Commercial and Multi-Family', 'Educational', 'Healthcare'];

const whyChooseUsPoints = [
  'Project-focused execution',
  'Hybrid manufacturing flexibility',
  'Clear communication and coordination',
  'Experience with renovation and repeat-project cycles',
  'Practical solutions designed for real-world use',
];

const glossary = [
  ['FF&E (Furniture, Fixtures and Equipment)', 'Movable items such as beds, desks, chairs, lighting, drapery, and accessories that are not permanently attached to the building structure.'],
  ['Casegoods', 'Hard-surface furniture pieces such as dressers, nightstands, desks, credenzas, and wardrobes.'],
  ['BOQ (Bill of Quantities)', 'A detailed document listing furniture items, quantities, dimensions, materials, and finishes required for a project.'],
  ['HPL (High-Pressure Laminate)', 'A durable, scratch-resistant surface material widely used in commercial furniture.'],
  ['Value Engineering', 'Analyzing materials and construction methods to reduce cost without compromising quality or durability.'],
];

const serviceFaqs = [
  ['What types of furniture do you manufacture?', 'We manufacture custom casegoods, seating, wardrobes, vanities, and millwork for hotels, restaurants, offices, and institutional spaces.'],
  ['Do you offer value engineering?', 'Yes, value engineering is a core part of our service. We help optimize designs to meet budget requirements without compromising quality or durability.'],
  ['What are your lead times?', 'Typical project timelines range from 9-12 weeks, depending on scope, materials, and whether production is domestic or overseas.'],
  ['Can you work with my designer or architect?', 'Absolutely. We regularly collaborate with design teams to ensure manufacturability, budget alignment, and design intent preservation.'],
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'DMD Furnishing Services',
      itemListElement: coreServices.map(([id, title, description], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: title,
          description,
          url: `https://dmdfurnishing.com/services#${id}`,
          provider: { '@type': 'Organization', name: 'DMD Furnishing' },
          areaServed: 'US',
        },
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: serviceFaqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    },
  ],
};

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Commercial Furniture Services | FF&E Solutions',
    description:
      'End-to-end commercial furniture services: custom design, manufacturing, FF&E procurement, and installation for hospitality and corporate projects. Serving clients nationwide from Foxboro, Massachusetts.',
    path: '/services',
    image: '/Images/Our Services.jpg',
  });
}

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label="Commercial furniture services">
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Furniture Services</p>
          <h1>Commercial Furniture Services, Built Around Your Project</h1>
          <p>
            DMD Furnishing provides end-to-end commercial furniture services from design consultation and custom manufacturing to FF&E procurement, delivery, and installation.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryButton}>Request a Consultation</Link>
            <a href="#services-grid" className={styles.secondaryButton}>Explore Our Services</a>
          </div>
        </div>
      </section>

      <div className={styles.shell}>
        <section className={styles.section}>
          <p className={styles.eyebrow}>Services Overview</p>
          <h2>Coordinated Commercial Furniture Services</h2>
          <p>
            We support hospitality and commercial projects through a coordinated service model that brings together consultation, design support, manufacturing, logistics, and installation coordination. Browse our <Link href="/products">commercial furniture catalog</Link> to explore the product lines we work with.
          </p>
          <div className={styles.pills}>
            {industries.map((industry) => (
              <span key={industry} className={styles.pill}>{industry}</span>
            ))}
          </div>
        </section>

        <section id="services-grid" className={styles.section}>
          <p className={styles.eyebrow}>Our Core Services</p>
          <h2>End-to-End Project Support</h2>
          <div className={styles.cardGrid}>
            {coreServices.map(([id, title, description, points]) => (
              <article key={id} id={id} className={styles.card}>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <p className={styles.eyebrow}>Our Process</p>
          <h2>Structured Execution</h2>
          <div className={styles.stepGrid}>
            {processSteps.map(([number, title, description]) => (
              <article key={number} className={styles.stepCard}>
                <span className={styles.stepNumber}>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <p className={styles.eyebrow}>Why Clients Choose Us</p>
          <h2>Structure and Flexibility</h2>
          <ul className={styles.checkList}>
            {whyChooseUsPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <p className={styles.eyebrow}>Industry Terms</p>
          <h2>Key Commercial Furniture Terms</h2>
          <dl className={styles.glossary}>
            {glossary.map(([term, definition]) => (
              <div key={term} className={styles.glossaryRow}>
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.section}>
          <p className={styles.eyebrow}>Learn More</p>
          <h2>Related Resources</h2>
          <ul className={styles.checkList}>
            <li><Link href="/blog/what-is-ffe-hospitality">What Is FF&amp;E? A Complete Guide</Link></li>
            <li><Link href="/blog/ffe-procurement-timeline">FF&amp;E Procurement Timeline: Concept to Install</Link></li>
            <li><Link href="/blog/value-engineering-commercial-furniture">How to Value-Engineer Commercial Furniture</Link></li>
          </ul>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <p className={styles.eyebrow}>Common Questions</p>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {serviceFaqs.map(([question, answer]) => (
              <div key={question} className={styles.faqItem}>
                <p className={styles.faqQuestion}>{question}</p>
                <p className={styles.faqAnswer}>{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <p className={styles.eyebrow}>Work With Us</p>
          <h2>Ready to discuss your project?</h2>
          <p>Contact us to schedule a consultation and explore how our services can support your space.</p>
          <Link href="/contact" className={styles.primaryButton}>Request a Consultation</Link>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </main>
  );
}
