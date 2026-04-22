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
  { src: '/Images/Tailored_Guestroom_Collections.jpg', alt: 'DMD Furnishing custom hotel guestroom casegoods with HPL desks and upholstered headboards in a Foxboro Massachusetts project' },
  { src: '/Images/Elevated_Restaurant_Seating.jpg', alt: 'Custom commercial restaurant seating with wood dining chairs and upholstered banquettes by DMD Furnishing' },
  { src: '/Images/Modern_Social_Lounges.jpg', alt: 'Modern hotel lobby social lounge with custom lounge chairs and occasional tables manufactured by DMD Furnishing' },
  { src: '/Images/Outdoor.jpg', alt: 'Commercial outdoor patio furniture with powder-coated frames for hotel and restaurant terraces by DMD Furnishing' },
];

const whyDmd = [
  ['In House Design Team', 'Our drafters turn designer sketches into shop drawings and cut sheets before anything hits the quote.'],
  ['Dual Manufacturing', 'Foxboro shop for prototypes and fast turn runs. Partner factories for high volume hotel guestroom packages.'],
  ['One PM Start to Finish', 'Same project manager from signed PO through punch list. No handoffs. No re-explaining the spec.'],
  ['We Fit Your Budget', 'Show us the number. We rework the BOQ line by line, swap materials, adjust construction, and keep the look the designer drew.'],
  ['Contract-Grade Materials', 'HPL, hardwood veneer, performance fabric, commercial hardware. Same suppliers we have used for years, so specs repeat.'],
  ['Three Point Quality Control', 'Specs confirmed before production. Pieces photographed before shipment. Installers verify on site.'],
];

const processSteps = [
  ['01', 'Intro Call', 'Short discovery call. We understand the property, brand standards, and timeline before anyone signs anything.'],
  ['02', 'Budget & Scope', 'Walk the property, count room types, set a realistic budget. Written scope doc and preliminary BOQ.'],
  ['03', 'Design & 3D', 'Our in house design team models every guestroom and public space in 3D before a piece is built.'],
  ['04', 'Manufacturing', 'Foxboro shop for prototypes and fast turn runs. Partner factories for high volume guestroom packages.'],
  ['05', 'Factory QC', 'Every piece inspected against signed spec. Photo documented QC report before anything ships.'],
  ['06', 'Delivery & Install', 'Phased drops timed with your GC schedule. Assembly, placement, and anchoring room by room.'],
  ['07', 'Close Out', 'Every punch list item resolved on site. Warranty documentation and final packet handed over.'],
];

const pageDescription =
  'Custom hospitality FF&E designed, built, and installed nationwide. Hotels, restaurants, offices: 20-room refreshes to 500-key rollouts. Foxboro, MA.';

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Hospitality Furniture Manufacturer | Custom FF&E',
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
    name: 'Custom Hospitality Furniture & Commercial FF&E | DMD Furnishing',
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://dmdfurnishing.com/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is FF&E and why does it matter for hospitality projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FF&E stands for Furniture, Fixtures & Equipment: the movable items in a commercial space such as beds, desks, chairs, lighting, and accessories that are not permanently attached to the structure. For hotels, restaurants, and offices, FF&E typically represents 15 to 25 percent of total construction costs and directly shapes guest experience and brand consistency.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of commercial spaces does DMD Furnishing serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `DMD Furnishing serves hotels, restaurants, corporate offices, educational facilities, healthcare-adjacent spaces, and franchise renovation programs. We carry ${totalProducts}+ products across ${places.length} market categories, all built for commercial-grade durability.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How does DMD\'s custom furniture process work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every project starts with a consultation to lock in scope, budget, and timeline. We then manage design specs, manufacturing, delivery, and installation, all under one project manager from first call to final punch list.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is value engineering in commercial furniture?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Value engineering means analyzing materials, construction methods, and design details to cut cost without sacrificing quality or visual intent. At DMD, it\'s standard on every bid. We find where smarter material choices and manufacturing methods can hit your budget while keeping the design intact.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does custom hospitality furniture cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on scope, materials, room count, and customization. A 20-room motel refresh and a 300-key hotel renovation have very different budgets. We value-engineer every project to hit your number. Schedule a call and we\'ll give you a realistic range.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can DMD handle both small renovations and large-scale hotel projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. From a single lobby refresh to a 300-room hotel renovation or phased franchise rollout. Our hybrid manufacturing model handles speed-sensitive small jobs and high-volume programs equally well.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is DMD Furnishing based and what areas do you serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DMD Furnishing is headquartered at 56 Leonard St, Unit 5, Foxboro, MA 02035. We serve commercial clients and hospitality operators nationwide, with project experience spanning hotels, restaurants, and institutional spaces across the United States.',
        },
      },
    ],
  };

  return (
    <main className={styles.page}>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />

      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          {heroImages.map((img, index) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
              priority={index === 0}
              style={{ animationDelay: `${index * 7}s` }}
              className={styles.heroImage}
            />
          ))}
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Custom Hospitality FF&amp;E · Built to Spec · Installed Nationwide</p>
          <h1><span className={styles.goldLetter}>D</span>esigned. <span className={styles.goldLetter}>M</span>anufactured. <span className={styles.goldLetter}>D</span>elivered.</h1>
          <p className={styles.heroTagline}>Custom FF&amp;E for Hotels, Restaurants &amp; Commercial Spaces</p>
          <p className={styles.lede} data-speakable="lede">
            Every piece built to your finish samples, hardware selections, and dimension drawings.<br />
            From 20 guestrooms to a full property installation, we handle the entire project.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/contact#schedule" className={styles.primaryCta}>
              Request a Project Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Trust Bar — Animated Stats ── */}
      <div className={styles.trustBar}>
        <div className={styles.trustStats}>
          <div className={styles.trustStat}>
            <CountUp end={totalRooms || 285} suffix="+" className={styles.trustStatNumber} />
            <span className={styles.trustStatLabel}>Rooms Delivered and Installed</span>
          </div>
          <div className={styles.trustStat}>
            <CountUp end={projects.length} suffix="+" className={styles.trustStatNumber} />
            <span className={styles.trustStatLabel}>Commercial FF&amp;E Projects</span>
          </div>
          <div className={styles.trustStat}>
            <CountUp end={places.length} className={styles.trustStatNumber} />
            <span className={styles.trustStatLabel}>Verticals We Serve</span>
          </div>
          <div className={styles.trustStat}>
            <span className={styles.trustStatNumber}>Nationwide</span>
            <span className={styles.trustStatLabel}>Delivery &amp; Installation</span>
          </div>
        </div>
      </div>

      {/* ── 3. Who We Serve — Merged Visual Grid ── */}
      <section className={styles.sectionWide}>
        <div className={`${styles.sectionHeader} fade-in-up`} style={{ maxWidth: 'none' }}>
          <p className={styles.eyebrow}>Who We Serve</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 2.9vw, 2.6rem)' }}>Hotels, restaurants, offices, healthcare, residential.<br />We furnish them all.</h2>
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
              </div>
            </Link>
          ))}
        </div>
        <div className={`${styles.ctaRow} ${styles.center}`} style={{ marginTop: 32 }}>
          <Link href="/products" className={styles.secondaryCta}>
            Browse All Products
          </Link>
        </div>
      </section>

      {/* ── 4. Recent Work ── */}
      <section className={`${styles.sectionWide} ${styles.altSection}`}>
        <div className={`${styles.sectionHeader} fade-in-up`}>
          <p className={styles.eyebrow}>Installed Projects</p>
          <h2>Real projects. Real spaces. See the work.</h2>
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
        <div className={`${styles.ctaRow} ${styles.center}`} style={{ marginTop: 32 }}>
          <Link href="/projects" className={styles.secondaryCta}>
            See All Projects
          </Link>
        </div>
      </section>

      {/* ── 5. Before & After Slider ── */}
      {beforeAfterProject && (
        <section className={styles.section}>
          <div className={`${styles.sectionHeader} fade-in-up`}>
            <p className={styles.eyebrow}>The Difference We Make</p>
            <h2>Same space. Completely different experience.</h2>
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
            <Link href={`/projects/${beforeAfterProject.slug}`} className={styles.ghostCta} style={{ marginTop: 0 }}>
              See the Full Transformation
            </Link>
          </div>
        </section>
      )}

      {/* ── 6. Why DMD ── */}
      <section className={`${styles.section} ${styles.altSection} ${styles.whySection}`}>
        <div className={`${styles.sectionHeader} fade-in-up`}>
          <p className={styles.eyebrow}>Why DMD</p>
          <h2>Six reasons hotel and restaurant teams pick our Foxboro MA shop for custom FF&amp;E.</h2>
        </div>
        <div className={styles.whyGrid}>
          {whyDmd.map(([title, description], index) => (
            <article key={title} className={`${styles.whyCard} fade-in-up`}>
              <span className={styles.whyCardNumber}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className={`${styles.ctaRow} ${styles.center}`} style={{ marginTop: 32 }}>
          <Link href="/about" className={styles.secondaryCta}>
            Learn About the DMD Team
          </Link>
        </div>
      </section>

      {/* ── 7. How We Work ── */}
      <section className={styles.section}>
        <div className={`${styles.sectionHeader} fade-in-up`}>
          <p className={styles.eyebrow}>How We Work</p>
          <h2>Your project in seven phases, from first call to close out.</h2>
        </div>
        <div className={`${styles.processLayout} ${styles.processLayoutSingle} fade-in-up`}>
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
        </div>
        <div className={`${styles.ctaRow} ${styles.center}`} style={{ marginTop: 32 }}>
          <Link href="/services" className={styles.secondaryCta}>
            Explore All Services
          </Link>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className={`${styles.section} ${styles.altSection}`}>
        <div className={`${styles.sectionHeader} fade-in-up`}>
          <p className={styles.eyebrow}>Common Questions</p>
          <h2>What buyers ask before starting a furniture project.</h2>
        </div>
        <div className={`${styles.faqList} fade-in-up`} data-speakable="faq">
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What is FF&amp;E and why does it matter for hospitality projects?</summary>
            <p className={styles.faqAnswer}>FF&amp;E stands for Furniture, Fixtures &amp; Equipment: the movable items in a commercial space such as beds, desks, chairs, lighting, and accessories that are not permanently attached to the structure. For hotels, restaurants, and offices, FF&amp;E typically represents 15 to 25 percent of total construction costs and directly shapes guest experience and brand consistency. The{' '}<a href="https://www.ahla.com/" target="_blank" rel="noopener noreferrer">American Hotel &amp; Lodging Association (AHLA)</a>{' '}offers industry guidance on hospitality standards and capital planning.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What types of commercial spaces does DMD Furnishing serve?</summary>
            <p className={styles.faqAnswer}>DMD Furnishing serves hotels, restaurants, corporate offices, educational facilities, healthcare-adjacent spaces, and franchise renovation programs. We carry {totalProducts}+ products across {places.length} market categories, all built for commercial-grade durability.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>How does DMD&rsquo;s custom furniture process work?</summary>
            <p className={styles.faqAnswer}>Every project starts with a consultation to lock in scope, budget, and timeline. We then manage design specs, manufacturing, delivery, and installation, all under one project manager from first call to final punch list.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What is value engineering in commercial furniture?</summary>
            <p className={styles.faqAnswer}>Value engineering means analyzing materials, construction methods, and design details to cut cost without sacrificing quality or visual intent. At DMD, it&rsquo;s standard on every bid. We find where smarter material choices and manufacturing methods can hit your budget while keeping the design intact.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>How much does custom hospitality furniture cost?</summary>
            <p className={styles.faqAnswer}>It depends on scope, materials, room count, and customization. A 20-room motel refresh and a 300-key hotel renovation have very different budgets. We value-engineer every project to hit your number. <Link href="/contact#schedule">Schedule a call</Link> and we&rsquo;ll give you a realistic range.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Can DMD handle both small renovations and large-scale hotel projects?</summary>
            <p className={styles.faqAnswer}>Yes. From a single lobby refresh to a 300-room hotel renovation or phased franchise rollout. Our hybrid manufacturing model handles speed-sensitive small jobs and high-volume programs equally well.</p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Where is DMD Furnishing based and what areas do you serve?</summary>
            <p className={styles.faqAnswer}>DMD Furnishing is headquartered at 56 Leonard St, Unit 5, Foxboro, MA 02035. We serve commercial clients and hospitality operators nationwide, with project experience spanning hotels, restaurants, and institutional spaces across the United States.</p>
          </details>
        </div>
      </section>

      {/* ── 9. Final CTA ── */}
      <section className={`${styles.section} ${styles.finalCta} fade-in-up`}>
        <div className={`${styles.sectionHeader} ${styles.center}`}>
          <p className={styles.eyebrow}>Next Step</p>
          <h2>Let&rsquo;s talk about your project.</h2>
          <p>Bring a room count and a target budget. You&rsquo;ll leave with a realistic price range, a lead-time estimate, and a clear list of next steps.</p>
        </div>
        <div className={`${styles.ctaRow} ${styles.center}`}>
          <Link href="/contact#schedule" className={styles.primaryCtaLarge}>
            Get a Free Project Estimate
          </Link>
        </div>
        <div className={`${styles.ctaContact} ${styles.center}`}>
          <a href="tel:+16172237781" className={styles.ctaContactLink}>+1 (617) 223-7781</a>
          <span className={styles.ctaContactDivider}>|</span>
          <a href="mailto:sales@dmdfurnishing.com" className={styles.ctaContactLink}>sales@dmdfurnishing.com</a>
        </div>
      </section>
    </main>
  );
}
