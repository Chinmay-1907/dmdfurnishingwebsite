import Image from 'next/image';
import Link from 'next/link';
import { GiWoodBeam, GiMaterialsScience, GiTreeBranch, GiMetalBar, GiGears } from 'react-icons/gi';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import styles from './page.module.css';

const differentiators = [
  ['In-House Design Team', 'Our drafters turn designer sketches into shop drawings, cut sheets, and finish schedules a factory can actually build. If a detail will fail in production, we flag it before it gets quoted — not after.'],
  ['Dual Manufacturing Model', 'Our Foxboro shop handles prototypes, short runs, and anything that needs a fast revision cycle. Partner factories overseas handle high-volume guestroom packages where unit economics matter. You pick the mix on every project.'],
  ['Dedicated Project Managers', 'One PM owns your job from the signed PO to the punch list. They know your spec book, your GC, and your install sequence — so you never re-explain the project to someone new.'],
  ['Value Engineering on Every Bid', 'We mark up the BOQ line by line. Swap an exotic veneer for a commercial-grade equivalent, change a drawer box, resize a headboard. Cuts cost without touching what the guest sees or touches.'],
  ['Commercial Material Sourcing', 'Standing relationships with HPL suppliers, hardwood veneer mills, Crypton Health and performance fabric weavers, and commercial hardware distributors — so lead times and pricing stay predictable.'],
  ['Three-Point Quality Control', 'Specs confirmed before production starts. Pieces photographed and inspected before they leave the factory. Installers verify piece count and condition on site before the crate is signed off.'],
];

const materials = [
  { title: 'High-Pressure Laminate (HPL)', desc: 'Best for guestroom desktops, dresser tops, and restaurant tabletops. HPL resists scratching, heat from coffee cups, and moisture rings in ways real wood cannot — which is why it shows up on almost every hospitality spec book.', Icon: GiMaterialsScience },
  { title: 'Hardwood Veneer on Stable Substrate', desc: 'Use this when the design calls for real wood grain but a solid hardwood panel would warp. A thin face of walnut, oak, or maple laid over MDF or particleboard gives you the look without the seasonal movement that splits drawer fronts.', Icon: GiWoodBeam },
  { title: 'Solid Hardwood', desc: 'Reserved for chair frames, table legs, bed rails, and anything that takes structural load or needs to be refinished over its life. Oak, maple, ash, and walnut are the usual picks for commercial seating frames.', Icon: GiTreeBranch },
  { title: 'Powder-Coated Steel & Aluminum', desc: 'Powder-coat finish outlasts wet paint in high-traffic rooms and resists chipping from housekeeping carts. Steel is used for load-bearing chair and bed frames; aluminum where weight matters, like outdoor patio seating.', Icon: GiMetalBar },
  { title: 'Commercial-Grade Hardware', desc: 'Full-extension ball-bearing drawer slides rated for 100-lb loads, soft-close hinges tested for 80,000+ cycles, and cam locks sized for housekeeping key systems. The hardware is what makes guestroom casegoods survive a five-year renovation cycle.', Icon: GiGears },
];

const values = [
  'Quality craftsmanship',
  'Transparent communication',
  'Respect for timelines',
];

export function generateMetadata() {
  return generatePageMetadata({
    title: 'About Us | Commercial Furniture Manufacturer in Foxboro MA',
    description:
      'DMD Furnishing is a commercial furniture manufacturer in Foxboro, Massachusetts. Custom casegoods, seating and millwork for hotels, restaurants, healthcare and institutional FF&E projects nationwide.',
    path: '/about',
    image: '/Images/About_DMD_Furnishing_Page.jpg',
  });
}

const aboutFaqs = [
  ['Where is DMD Furnishing located?', 'Our headquarters and drafting office are at 56 Leonard Street, Unit 5, Foxboro, Massachusetts 02035 — about 30 miles south of Boston. Delivery and installation is coordinated to project sites across the United States.'],
  ['Do you work on small projects?', 'Yes. A single boutique restaurant, a lobby refresh, or a 20-room motel are all inside our normal range. Small projects get the same PM, the same QC process, and the same written timeline as a 200-room rollout.'],
  ['What industries do you serve?', 'Primary focus is hospitality — hotels, motels, resorts, restaurants, and bars. We also produce FF&E for corporate offices, educational buildings (dormitories, common areas, libraries), and non-clinical healthcare spaces like waiting rooms and administrative offices.'],
  ['How long does a typical project take?', 'Typical lead times run multiple weeks once specifications are approved — the exact number depends on scope, finish selections, and whether production is domestic or overseas. We give you a written timeline at contract signing and update it at each milestone.'],
  ['What standards do you build to?', 'Seating is built against BIFMA X5.1 (task) and X5.4 (lounge) durability benchmarks. Upholstery fabrics are specified to CAL 117-2013 and NFPA 701 where code requires. Architectural millwork follows AWI Quality Standards. We will call out deviations from these on the spec sheet so nothing is ambiguous.'],
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
          <h1>A Commercial Furniture Manufacturer in Foxboro, Massachusetts.</h1>
          <p className={styles.heroLede}>
            DMD Furnishing is a commercial furniture manufacturer based in Foxboro,
            Massachusetts. We custom-build casegoods, seating, upholstery, and millwork for
            hotels, restaurants, offices, and institutional projects — shipped and installed
            across the United States.
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
              DMD Furnishing was built around one frustration the founders kept hearing from
              hotel owners and designers: commercial furniture procurement is opaque. Specs
              get lost between the designer, the factory, and the installer. Delivery dates
              slip. Samples arrive looking nothing like production.
            </p>
            <p>
              We run the whole chain ourselves. Our drafters write specs the factory can
              build. Our PMs track every line item. Our installers verify the pieces against
              the spec sheet before the crate is signed off. No handoffs, no lost details.
            </p>
            <p>
              The approach works for a 20-room motel refresh and for a multi-property
              franchise rollout. Same process, same single point of contact, same written
              timelines — scaled to the job.
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
              alt="Custom hotel casegoods and upholstered seating on the workshop floor at the Foxboro, Massachusetts shop"
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
            View Hotel & Restaurant Furniture Projects
          </Link>
        </div>
      </section>

      {/* ── 4. Materials & Craftsmanship ── */}
      <section className={styles.materialsSection}>
        <div className={styles.materialsHeader}>
          <p className={styles.eyebrow}>Materials &amp; Craftsmanship</p>
          <h2>What we specify, and why.</h2>
          <p>
            Commercial furniture fails in predictable places: surfaces scratch, veneers lift,
            drawer slides bind, fabric wears through at the seat edge. The materials below
            are the ones we reach for first because they solve those specific failures.
          </p>
        </div>
        <div className={styles.materialsGrid}>
          {materials.map(({ title, desc, Icon }) => (
            <article key={title} className={styles.materialCard}>
              <div className={styles.materialIconWrap}>
                <Icon className={styles.materialIcon} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <p className={styles.eyebrow}>Common Questions</p>
          <h2>About our commercial furniture manufacturing operation.</h2>
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
          Free 30-minute call. Bring a rough room count and a rough budget. Leave with a
          realistic price range, a lead-time estimate, and a written list of next steps.
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
          <a href="mailto:sales@dmdfurnishing.com">sales@dmdfurnishing.com</a>
        </div>
      </section>
    </main>
  );
}
