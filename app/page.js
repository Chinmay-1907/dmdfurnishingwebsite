import Image from 'next/image';
import Link from 'next/link';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import CountUp from '../components/CountUp';
import JsonLd from '../components/JsonLd';
import { getAllPlaces } from '../lib/catalog';
import { generatePageMetadata } from '../lib/metadata';
import { getAllProjects } from '../lib/projects';
import styles from './page.module.css';

const heroImages = [
  '/Images/Tailored_Guestroom_Collections.jpg',
  '/Images/Elevated_Restaurant_Seating.jpg',
  '/Images/Modern_Social_Lounges.jpg',
  '/Images/Outdoor.jpg',
];

const whyDmd = [
  ['End-to-End Management', 'Design, manufacturing, delivery, and installation coordinated under one accountable team.'],
  ['Hospitality-Grade Durability', 'Furniture engineered for high-traffic environments and repeat renovation cycles.'],
  ['Custom & Value-Engineered', 'Premium design balanced with practical manufacturing choices and budgets.'],
  ['Reliable Execution', 'Clear communication, realistic timelines, and dependable delivery from start to finish.'],
  ['Full FF&E Capability', 'Custom casegoods, seating, upholstery, millwork, procurement, and installation — all in-house.'],
  ['Durable Material Selection', 'HPL, veneer, solid wood, metal structures, and commercial-grade hardware — chosen for performance and visual consistency.'],
];

const processSteps = [
  ['01', 'Consultation and scope alignment', 'Establish project goals, budget, and timeline requirements.'],
  ['02', 'Design support and specifications', 'Coordinate materials, dimensions, and product requirements.'],
  ['03', 'Manufacturing and sourcing', 'Manage production across domestic and global facilities.'],
  ['04', 'Quality review and readiness', 'Confirm specifications and readiness before shipment.'],
  ['05', 'Delivery and installation', 'Sequence logistics for efficient delivery and install.'],
  ['06', 'Project close-out and follow-up', 'Final verification and post-project support.'],
];

const pageDescription =
  'Custom hospitality furniture and FF&E solutions for hotels, restaurants, offices, and institutional spaces. Based in Foxboro, MA — designed, manufactured, and installed nationwide by DMD Furnishing.';

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Custom Hospitality Furniture & FF&E Solutions',
    description: pageDescription,
    path: '/',
    image: '/Images/Tailored_Guestroom_Collections.jpg',
  });
}

export default function HomePage() {
  const projects = getAllProjects();
  const places = getAllPlaces();
  const totalProducts = places.reduce(
    (sum, place) =>
      sum +
      place.furnitureTypes.reduce(
        (ftSum, ft) =>
          ftSum + ft.subcategories.reduce((scSum, sc) => scSum + sc.products.length, 0),
        0
      ),
    0
  );

  const featuredProjects = projects.slice(0, 4);
  // Reorder places so hotel is first (featured/biggest card)
  const hotelFirst = [...places].sort((a, b) => {
    if (a.slug === 'hotel') return -1;
    if (b.slug === 'hotel') return 1;
    return 0;
  });
  const featuredPlaces = hotelFirst.slice(0, 6);

  const beforeAfterProject = projects.find((p) => p.beforeImages && p.beforeImages.length > 0);

  // Compute total rooms renovated from project specifications
  const totalRooms = projects.reduce((sum, p) => {
    const scopeSpec = p.specifications?.find((s) => /room|guest/i.test(s.value));
    const match = scopeSpec?.value?.match(/(\d+)/);
    return sum + (match ? parseInt(match[1], 10) : 0);
  }, 0);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://dmdfurnishing.com/#webpage',
    url: 'https://dmdfurnishing.com/',
    name: 'Custom Hospitality Furniture & FF&E Solutions | DMD Furnishing',
    description: pageDescription,
    isPartOf: { '@id': 'https://dmdfurnishing.com/#website' },
    about: { '@id': 'https://dmdfurnishing.com/#organization' },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://dmdfurnishing.com/Images/Tailored_Guestroom_Collections.jpg',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '[data-speakable]'],
    },
  };

  return (
    <main className={styles.page}>
      <JsonLd data={schema} />

      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          {heroImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt="DMD Furnishing commercial hospitality furniture"
              fill
              sizes="100vw"
              priority={index === 0}
              style={{ animationDelay: `${index * 7}s` }}
              className={styles.heroImage}
            />
          ))}
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Custom Hospitality Furniture</p>
          <h1><span className={styles.goldLetter}>D</span>esigned. <span className={styles.goldLetter}>M</span>anufactured. <span className={styles.goldLetter}>D</span>elivered.</h1>
          <p className={styles.lede} data-speakable="lede">
            From boutique hotels to national chains — we handle design, manufacturing, and
            installation so your renovation stays on time, on brand, and on budget. Based in
            Foxboro, MA — serving clients nationwide.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/schedule-call" className={styles.primaryCta}>
              Schedule a Call
            </Link>
            <Link href="/contact" className={styles.secondaryCta}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Trust Bar — Animated Stats ── */}
      <div className={styles.trustBar}>
        <div className={styles.trustStats}>
          <div className={styles.trustStat}>
            <CountUp end={totalRooms || 285} suffix="+" className={styles.trustStatNumber} />
            <span className={styles.trustStatLabel}>Rooms Renovated</span>
          </div>
          <div className={styles.trustStat}>
            <CountUp end={projects.length} suffix="+" className={styles.trustStatNumber} />
            <span className={styles.trustStatLabel}>Completed Projects</span>
          </div>
          <div className={styles.trustStat}>
            <CountUp end={totalProducts} suffix="+" className={styles.trustStatNumber} />
            <span className={styles.trustStatLabel}>Products</span>
          </div>
          <div className={styles.trustStat}>
            <span className={styles.trustStatNumber}>Nationwide</span>
            <span className={styles.trustStatLabel}>Service Area</span>
          </div>
        </div>
      </div>

      {/* ── 3. Who We Serve — Merged Visual Grid ── */}
      <section className={styles.sectionWide}>
        <div className={`${styles.sectionHeader} fade-in-up`}>
          <p className={styles.eyebrow}>Who We Serve</p>
          <h2>{totalProducts}+ products built for commercial spaces.</h2>
        </div>
        <div className={styles.productGrid}>
          {featuredPlaces.map((place, index) => (
            <Link
              key={place.slug}
              href={`/products/${place.slug}`}
              className={`${styles.productCard} ${index === 0 ? styles.productGridFeature : ''} fade-in-up`}
            >
              <Image
                src={place.image}
                alt={place.name}
                fill
                sizes={index === 0 ? '(max-width: 800px) 100vw, 66vw' : '(max-width: 800px) 100vw, 33vw'}
              />
              <div className={styles.productCardOverlay} />
              <div className={styles.productCardBody}>
                <h3>{place.name}</h3>
                <p className={styles.productCardCount}>
                  {place.furnitureTypes.length} furniture {place.furnitureTypes.length === 1 ? 'type' : 'types'}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className={`${styles.ctaRow} ${styles.center}`} style={{ marginTop: 32 }}>
          <Link href="/products" className={styles.secondaryCta}>
            Browse the Full Catalog
          </Link>
        </div>
      </section>

      {/* ── 4. Recent Work ── */}
      <section className={`${styles.sectionWide} ${styles.altSection}`}>
        <div className={`${styles.projectHeader} fade-in-up`}>
          <div>
            <p className={styles.eyebrow}>Recent Work</p>
            <h2>Projects built to last.</h2>
          </div>
          <Link href="/projects" className={styles.projectsViewAllInline}>
            View all {projects.length} projects &rarr;
          </Link>
        </div>
        <div className={styles.projectStrip}>
          {featuredProjects.map((project) => {
            const scope = project.specifications?.[0]?.value || '';
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`${styles.projectCard} fade-in-up`}
              >
                <Image
                  src={project.mainImage}
                  alt={project.name}
                  fill
                  sizes="(max-width: 800px) 100vw, 25vw"
                />
                <div className={styles.projectCardOverlay} />
                <div className={styles.projectCardBody}>
                  <h3>{project.name}</h3>
                  <p className={styles.projectCardMeta}>{project.category}</p>
                  {scope && <span className={styles.projectCardScope}>{scope}</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 5. Before & After Slider ── */}
      {beforeAfterProject && (
        <section className={styles.section}>
          <div className={`${styles.sectionHeader} fade-in-up`}>
            <p className={styles.eyebrow}>Transformation</p>
            <h2>See the difference.</h2>
          </div>
          <div className={`${styles.beforeAfterWrap} fade-in-up`}>
            <BeforeAfterSlider
              beforeSrc={beforeAfterProject.beforeImages[0].url}
              afterSrc={beforeAfterProject.images[0]?.url || beforeAfterProject.mainImage}
              beforeAlt={`${beforeAfterProject.name} before renovation`}
              afterAlt={`${beforeAfterProject.name} after renovation by DMD Furnishing`}
            />
          </div>
          <div className={`${styles.beforeAfterInfo} fade-in-up`}>
            <h3>{beforeAfterProject.name}</h3>
            <span className={styles.beforeAfterDivider} />
            <p>{beforeAfterProject.specifications?.[0]?.value || beforeAfterProject.category}</p>
            <Link href={`/projects/${beforeAfterProject.slug}`} className={styles.ghostCta} style={{ marginTop: 0 }}>
              View Full Project
            </Link>
          </div>
        </section>
      )}

      {/* ── 6. Why DMD ── */}
      <section className={`${styles.section} ${styles.altSection}`}>
        <div className={`${styles.sectionHeader} fade-in-up`}>
          <p className={styles.eyebrow}>Why DMD</p>
          <h2>Structured execution for demanding commercial work.</h2>
        </div>
        <div className={styles.whyGrid}>
          {whyDmd.map(([title, description]) => (
            <article key={title} className={`${styles.whyCard} fade-in-up`}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className={styles.ctaRow} style={{ marginTop: 32 }}>
          <Link href="/about" className={styles.secondaryCta}>
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* ── 7. How We Work ── */}
      <section className={styles.section}>
        <div className={`${styles.sectionHeader} fade-in-up`}>
          <p className={styles.eyebrow}>How We Work</p>
          <h2>Six steps from consultation to close-out.</h2>
        </div>
        <div className={`${styles.processLayout} fade-in-up`}>
          <div className={styles.processSteps}>
            {processSteps.map(([num, title, desc]) => (
              <div key={num} className={styles.processStep}>
                <span className={styles.processStepNumber}>{num}</span>
                <div>
                  <p className={styles.processStepTitle}>{title}</p>
                  <p className={styles.processStepDesc}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.imagePanel}>
            <Image
              src="/Images/Our Services.jpg"
              alt="DMD Furnishing project coordination and manufacturing"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className={styles.ctaRow} style={{ marginTop: 32 }}>
          <Link href="/services" className={styles.secondaryCta}>
            See Our Full Services
          </Link>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className={`${styles.section} ${styles.altSection}`}>
        <div className={`${styles.sectionHeader} fade-in-up`}>
          <p className={styles.eyebrow}>Common Questions</p>
          <h2>Frequently asked about commercial furniture projects.</h2>
        </div>
        <div className={`${styles.faqList} fade-in-up`} data-speakable="faq">
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What is FF&amp;E and why does it matter for hospitality projects?</summary>
            <p className={styles.faqAnswer}>FF&amp;E stands for Furniture, Fixtures &amp; Equipment — the movable items in a commercial space such as beds, desks, chairs, lighting, and accessories that are not permanently attached to the structure. For hotels, restaurants, and offices, FF&amp;E typically represents 15–25% of total construction costs and directly shapes guest experience and brand consistency. The{' '}<a href="https://www.ahla.com/" target="_blank" rel="noopener noreferrer">American Hotel &amp; Lodging Association (AHLA)</a>{' '}offers industry guidance on hospitality standards and capital planning.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What types of commercial spaces does DMD Furnishing serve?</summary>
            <p className={styles.faqAnswer}>DMD Furnishing serves hotels and motels, restaurants and cafes, corporate offices, educational facilities, healthcare-adjacent spaces, and franchise renovation programs. Our catalog covers over {totalProducts} products across {places.length} market categories, all engineered for commercial durability and high-use environments.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>How does the custom furniture process work?</summary>
            <p className={styles.faqAnswer}>Every project begins with a consultation to align on scope, budget, and timeline. From there, we support design and material specifications, manage manufacturing through our domestic and overseas network, coordinate delivery, and oversee installation. The entire process is managed under one team from start to close-out.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What is value engineering in commercial furniture?</summary>
            <p className={styles.faqAnswer}>Value engineering is the process of analyzing materials, construction methods, and design details to reduce cost without compromising quality, durability, or visual intent. At DMD Furnishing, value engineering is a standard part of our service — we identify where practical material substitutions or manufacturing adjustments can meet budget requirements while preserving the design direction.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>How much does custom hospitality furniture cost?</summary>
            <p className={styles.faqAnswer}>Costs vary based on scope, materials, room count, and customization level. Value engineering is built into every DMD project — we balance design intent with practical manufacturing choices to meet your budget without compromising quality. <Link href="/schedule-call">Schedule a free consultation</Link> to discuss your project and get a realistic budget range and timeline estimate.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Do you handle both small renovations and large-scale projects?</summary>
            <p className={styles.faqAnswer}>Yes. We work with projects of varying scale — from refreshing a lobby or updating a restaurant dining area to full-scale hotel room block renovations and phased franchise rollouts. Our hybrid manufacturing model supports both speed-sensitive smaller projects and high-volume programs that require scale.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Where is DMD Furnishing based and what areas do you serve?</summary>
            <p className={styles.faqAnswer}>DMD Furnishing is headquartered at 56 Leonard St, Foxboro, Massachusetts 02035. We serve commercial clients and hospitality operators nationwide, with project experience spanning hotels, restaurants, and institutional spaces across the United States.</p>
          </details>
        </div>
      </section>

      {/* ── 9. Final CTA ── */}
      <section className={`${styles.section} ${styles.finalCta} fade-in-up`}>
        <div className={`${styles.sectionHeader} ${styles.center}`}>
          <p className={styles.eyebrow}>Next Step</p>
          <h2>Ready to furnish your space?</h2>
          <p>Free 30-minute consultation — leave with a budget range and timeline estimate.</p>
        </div>
        <div className={`${styles.ctaRow} ${styles.center}`}>
          <Link href="/schedule-call" className={styles.primaryCtaLarge}>
            Schedule a Call
          </Link>
          <Link href="/contact" className={styles.secondaryCtaLarge}>
            Request a Quote
          </Link>
        </div>
        <div className={`${styles.ctaContact} ${styles.center}`}>
          <a href="tel:+16172237781" className={styles.ctaContactLink}>+1 (617) 223-7781</a>
          <span className={styles.ctaContactDivider}>|</span>
          <a href="mailto:Sales@DMDFurnishing.com" className={styles.ctaContactLink}>Sales@DMDFurnishing.com</a>
        </div>
      </section>
    </main>
  );
}
