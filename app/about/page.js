import Image from 'next/image';
import Link from 'next/link';
import { GiWoodBeam, GiMaterialsScience, GiTreeBranch, GiMetalBar, GiGears } from 'react-icons/gi';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import styles from './page.module.css';

const differentiators = [
  ['In House Design Team', 'Our drafters turn designer sketches into shop drawings, cut sheets, and finish schedules a factory can actually build. If a detail will fail in production, we flag it before it gets quoted, not after the PO is signed.'],
  ['Two Manufacturing Paths', 'Our Foxboro shop handles prototypes, short runs, and anything that needs a fast revision cycle. Partner factories overseas handle high volume guestroom packages where unit economics matter. You pick the mix on every project.'],
  ['One PM From Start to Finish', 'One project manager owns your job from signed PO through punch list. They know your spec book, your GC, and your install sequence, so you never re explain the project to someone new.'],
  ['Value Engineered Line by Line', 'We review the bill of quantities (BOQ) line by line to optimize each spec. Swap an exotic veneer for a commercial-grade equivalent, change a drawer box, resize a headboard - tuning materials and construction to your budget without compromising design intent or guest experience.'],
  ['Commercial Material Sourcing', 'Standing relationships with HPL suppliers, hardwood veneer mills, performance fabric weavers, and commercial hardware distributors. Commercial projects demand additional durability, performance standards, and repeatable sourcing for business environments - our supply chain is built around those requirements while still supporting residential references where design intent calls for it.'],
  ['Three Point Quality Control', 'Specs confirmed before production starts. Every piece photographed and inspected before it leaves the factory. Installers verify piece count and condition on site before the crate is signed off.'],
];

const materials = [
  { title: 'High Pressure Laminate (HPL)', desc: 'Best for guestroom desktops, dresser tops, and restaurant tabletops. HPL resists scratching, heat from coffee cups, and moisture rings in ways real wood cannot.', Icon: GiMaterialsScience },
  { title: 'Hardwood Veneer on Stable Substrate', desc: 'Use this when the design calls for real wood grain but a solid hardwood panel would warp. A thin face of walnut, oak, or maple laid over MDF or particleboard gives you the look without the seasonal movement that splits drawer fronts.', Icon: GiWoodBeam },
  { title: 'Solid Hardwood', desc: 'Reserved for chair frames, table legs, bed rails, and anything that takes structural load or needs to be refinished over its life. Oak, maple, ash, and walnut are the usual picks for commercial seating frames.', Icon: GiTreeBranch },
  { title: 'Powder-Coated Steel and Aluminum', desc: 'Powder-coat outlasts wet paint in high-traffic rooms and resists chipping from housekeeping carts. Steel goes on load-bearing chair and bed frames; aluminum where weight matters, like outdoor patio seating.', Icon: GiMetalBar },
  { title: 'Commercial-Grade Hardware', desc: 'Full-extension ball-bearing drawer slides, soft-close hinges, and cam locks sized for housekeeping key systems. The hardware is what makes guestroom casegoods survive renovation cycle after renovation cycle.', Icon: GiGears },
];

const values = [
  'Quality craftsmanship',
  'Transparent communication',
  'Respect for timelines',
];

export function generateMetadata() {
  return generatePageMetadata({
    title: 'About Us | Foxboro MA Furniture Manufacturer',
    description:
      'Commercial furniture manufacturer in Foxboro, MA. In house design team, dual manufacturing model, custom FF&E for hotels, restaurants, and offices.',
    path: '/about',
    image: '/Images/About_DMD_Furnishing_Page.jpg',
  });
}

const aboutFaqs = [
  ['Where is DMD Furnishing located?', 'Our headquarters and drafting office are at 56 Leonard St, Unit 5, Foxboro, MA 02035, about 30 miles south of Boston. Delivery and installation is coordinated to project sites across the United States.'],
  ['Do you work on small projects?', 'Yes. A single boutique restaurant, a lobby refresh, or a small motel are all inside our normal range. Small projects get the same PM, the same QC process, and the same written timeline as a full property rollout.'],
  ['What industries do you serve?', 'Primary focus is hospitality: hotels, motels, resorts, restaurants, and bars. We also produce Furniture, Fixtures and Equipment (FF&E) for corporate offices, educational buildings, and non-clinical healthcare spaces like waiting rooms and administrative offices.'],
  ['How long does a typical project take?', 'Lead time depends on scope, finish selections, and whether production runs domestic or overseas. We give you a written timeline at contract signing and update it at every milestone, so you always know where your order stands.'],
  ['What standards do you build to?', 'We build to commercial contract-grade durability appropriate for each project type. Specific material, fire safety, and durability requirements are documented on the spec sheet for every project so nothing is ambiguous.'],
];

const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${siteUrl}/about`,
      url: `${siteUrl}/about`,
      name: 'About DMD Furnishing | Commercial Furniture Manufacturer in Foxboro MA',
      description:
        'DMD Furnishing is a commercial furniture manufacturer based in Foxboro, Massachusetts, with an in house design team and a dual manufacturing model serving hotels, restaurants, offices, and institutional FF&E projects nationwide.',
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
          <h1>Custom Commercial Furniture Manufacturer</h1>
          <p className={styles.heroLede}>
            DMD Furnishing is a commercial furniture manufacturer based in Foxboro, Massachusetts.
            <br />
            We custom build casegoods, seating, and millwork for hotels, restaurants, offices, and institutional projects.
            <br />
            Shipped and installed across the United States.
          </p>
        </div>
      </section>

      {/* ── 2. Who We Are ── */}
      <section className={styles.whoWeAreSection}>
        <div className={styles.whoWeAreInner}>
          <p className={styles.eyebrow}>Who We Are</p>
          <h2>Who we are</h2>
          <p className={styles.whoWeArePara}>
            We&rsquo;re DMD Furnishing, a commercial FF&amp;E manufacturer based in Foxboro, Massachusetts, building custom furniture for hotels, restaurants, and multifamily projects from concept through installation.
          </p>
        </div>
      </section>

      {/* ── 3. Our Story ── */}
      <section className={styles.storySection}>
        <div className={styles.storySplit}>
          <div className={styles.storyText}>
            <p className={styles.eyebrow}>Our Story</p>
            <h2>Why did we start DMD Furnishing?</h2>
            <p>
              DMD Furnishing was built around one frustration the founders kept hearing
              from hotel owners and designers: commercial furniture procurement is opaque.
              Specs get lost between the designer, the factory, and the installer. Delivery
              dates slip. Samples arrive looking nothing like production.
            </p>
            <p>
              We run the whole chain ourselves. Our drafters write specs the factory can
              build. Our PMs track every line item. Our installers verify pieces against
              the spec sheet before the crate is signed off. No handoffs, no lost details.
            </p>
            <p>
              The approach works for a small motel refresh and for a multi property
              franchise rollout. Same process, same single point of contact, same written
              timelines. Scaled to the job.
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
              priority
            />
          </div>
        </div>
      </section>

      {/* ── 3. How We're Different ── */}
      <section className={styles.diffSection}>
        <div className={styles.diffHeader}>
          <p className={styles.eyebrow}>How We&apos;re Different</p>
          <h2>What do you get when you work with DMD?</h2>
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
            View Hotel and Restaurant Projects
          </Link>
        </div>
      </section>

      {/* ── 4. Materials & Craftsmanship ── */}
      <section className={styles.materialsSection}>
        <div className={styles.materialsHeader}>
          <p className={styles.eyebrow}>Materials and Craftsmanship</p>
          <h2>What materials does DMD specify, and why?</h2>
          <p>
            Commercial furniture fails in predictable places: surfaces scratch, veneers
            lift, drawer slides bind, fabric wears through at the seat edge. The materials
            below are the ones we reach for first because they solve those specific
            failures.
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
          <h2>What buyers ask before signing with us.</h2>
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
          Bring a room count and a target budget. Leave with a realistic price range, a
          lead time estimate, and a clear list of next steps.
        </p>
        <div className={styles.ctaButtons}>
          <Link href="/contact#schedule" className={styles.primaryBtn}>
            Schedule a Call
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
