import Image from 'next/image';
import Link from 'next/link';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import styles from './page.module.css';

const differentiators = [
  ['In-House Design Team', 'Concepts translated into production-ready specifications by people who understand manufacturing constraints.'],
  ['Dual Manufacturing', 'Domestic production for speed and revisions. Overseas sourcing for scale and material flexibility.'],
  ['Dedicated Project Managers', 'One point of contact from initial quote through final installation — no handoffs.'],
  ['Value Engineering Built In', 'We balance design intent with practical manufacturing choices to protect your budget without compromising quality.'],
  ['Material Sourcing Relationships', 'Years of hospitality-focused sourcing means access to commercial-grade materials at competitive pricing.'],
  ['Quality Control Alignment', 'Specifications confirmed before production, inspected before shipment, verified at installation.'],
];

const materials = [
  ['HPL (High-Pressure Laminate)', 'Scratch-resistant surface material used for hotel casegoods, restaurant tables, and office surfaces. Fuses kraft paper and decorative paper under high heat and pressure.'],
  ['Engineered Wood & Veneer', 'Stable substrate with natural hardwood veneer face for a premium appearance. Used in guestroom casegoods, credenzas, and custom millwork.'],
  ['Solid Wood', 'Selected hardwoods for structural elements, frames, and accent pieces requiring natural grain and durability.'],
  ['Metal Structures', 'Powder-coated steel and aluminum frames for seating, tables, and beds designed for commercial load ratings.'],
  ['Commercial-Grade Hardware', 'Hinges, drawer slides, and locking mechanisms selected for high-cycle durability in hotel and restaurant environments.'],
];

const values = [
  'Quality craftsmanship',
  'Transparent communication',
  'Respect for timelines and budgets',
  'Long-term client relationships',
];

export function generateMetadata() {
  return generatePageMetadata({
    title: 'About DMD Furnishing | Hospitality FF&E Manufacturer',
    description:
      'Learn about DMD Furnishing — a commercial furniture manufacturer in Foxboro, MA providing custom FF&E solutions for hotels, restaurants, and commercial spaces nationwide.',
    path: '/about',
    image: '/Images/About_DMD_Furnishing_Page.jpg',
  });
}

const aboutFaqs = [
  ['Where is DMD Furnishing located?', 'Our headquarters are at 56 Leonard Street, Unit 5, Foxboro, Massachusetts 02035 — approximately 30 miles south of Boston. We serve clients nationwide with delivery and installation coordination across the United States.'],
  ['Do you work on small projects?', 'Yes. We handle projects of all sizes — from refreshing a lobby or updating a restaurant dining area to full-scale hotel room block renovations and phased franchise rollouts.'],
  ['What industries do you serve?', 'We specialize in hospitality (hotels, motels, restaurants) but also serve corporate, educational, healthcare-adjacent, and institutional spaces.'],
  ['How long does a typical project take?', 'Most projects run 9–12 weeks from approved specifications to delivery. Timelines vary based on scope, materials, and customization level.'],
];

const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${siteUrl}/about`,
      url: `${siteUrl}/about`,
      name: 'About DMD Furnishing | Commercial Furniture Manufacturing',
      description:
        'DMD Furnishing is a commercial furniture manufacturer based in Foxboro, Massachusetts, providing custom FF&E solutions for hotels, restaurants, offices, and institutional spaces nationwide.',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'About Us', item: `${siteUrl}/about` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: aboutFaqs.map(([question, answer]) => ({
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

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      {/* ── 1. Hero ── */}
      <section className={styles.hero} aria-label="About DMD Furnishing">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>About DMD Furnishing</p>
          <h1>Built for Commercial Spaces. Designed for Real-World Use.</h1>
          <p className={styles.heroLede}>
            A commercial furniture manufacturer based in Foxboro, Massachusetts — providing
            custom FF&E solutions for hotels, restaurants, offices, and institutional
            spaces nationwide.
          </p>
        </div>
      </section>

      {/* ── 2. Our Story ── */}
      <section className={styles.storySection}>
        <div className={styles.storySplit}>
          <div className={styles.storyText}>
            <p className={styles.eyebrow}>Our Story</p>
            <h2>Why we started — and what drives us.</h2>
            <p>
              DMD Furnishing was established with a simple goal: make commercial furniture
              sourcing more dependable and more transparent.
            </p>
            <p>
              In many projects, delays, unclear specifications, and inconsistent quality
              create unnecessary challenges. We built our approach around clarity,
              communication, defined scopes, and coordinated execution from start to finish.
            </p>
            <p>
              By aligning design intent with manufacturing realities, we help clients move
              projects forward with confidence — whether it&apos;s a 20-room motel refresh
              or a multi-property franchise rollout.
            </p>
            <div className={styles.valuesRow}>
              {values.map((v) => (
                <span key={v} className={styles.valuePill}>{v}</span>
              ))}
            </div>
          </div>
          <div className={styles.storyImage}>
            <Image
              src="/Images/About_DMD_Furnishing_Page.jpg"
              alt="DMD Furnishing craftsmanship and materials"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* ── 3. How We're Different ── */}
      <section className={styles.diffSection}>
        <div className={styles.diffHeader}>
          <p className={styles.eyebrow}>How We&apos;re Different</p>
          <h2>What you get when you work with DMD.</h2>
        </div>
        <div className={styles.diffGrid}>
          {differentiators.map(([title, desc], i) => (
            <article key={title} className={styles.diffCard}>
              <span className={styles.diffNumber}>{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
        <div className={styles.diffCta}>
          <Link href="/services" className={styles.secondaryBtn}>
            See Our Full Services
          </Link>
          <Link href="/projects" className={styles.ghostBtn}>
            View Our Projects
          </Link>
        </div>
      </section>

      {/* ── 4. Materials & Craftsmanship ── */}
      <section className={styles.materialsSection}>
        <div className={styles.materialsHeader}>
          <p className={styles.eyebrow}>Materials &amp; Craftsmanship</p>
          <h2>What goes into every piece.</h2>
          <p>
            Commercial furniture demands materials selected for durability, performance, and
            visual consistency across repeat renovation cycles.
          </p>
        </div>
        <div className={styles.materialsList}>
          {materials.map(([name, description]) => (
            <details key={name} className={styles.materialItem}>
              <summary className={styles.materialTitle}>{name}</summary>
              <p className={styles.materialDesc}>{description}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <p className={styles.eyebrow}>Common Questions</p>
          <h2>About DMD Furnishing.</h2>
        </div>
        <div className={styles.faqList}>
          {aboutFaqs.map(([question, answer]) => (
            <details key={question} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{question}</summary>
              <p className={styles.faqAnswer}>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <section className={styles.ctaSection}>
        <p className={styles.eyebrow}>Next Step</p>
        <h2>Have a project in mind?</h2>
        <p className={styles.ctaLede}>
          Free 30-minute consultation — leave with a budget range and timeline estimate.
        </p>
        <div className={styles.ctaButtons}>
          <Link href="/schedule-call" className={styles.primaryBtn}>
            Schedule a Call
          </Link>
          <Link href="/contact" className={styles.secondaryBtn}>
            Request a Quote
          </Link>
        </div>
        <div className={styles.ctaContact}>
          <a href="tel:+16172237781">+1 (617) 223-7781</a>
          <span>|</span>
          <a href="mailto:Sales@DMDFurnishing.com">Sales@DMDFurnishing.com</a>
        </div>
      </section>
    </main>
  );
}
