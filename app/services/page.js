import Image from 'next/image';
import Link from 'next/link';
import {
  GiMagnifyingGlass,
  GiPencilRuler,
  GiFactory,
  GiChecklist,
  GiCargoShip,
  GiAutoRepair,
} from 'react-icons/gi';
import { getAllPlaces } from '../../lib/catalog';
import { getAllProjects } from '../../lib/projects';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import ProcessTimeline from '../../components/services/ProcessTimeline';
import IndustryTabs from '../../components/services/IndustryTabs';
import styles from './page.module.css';

// ---------------------------------------------------------------------------
// Static data: services, process, FAQ
// ---------------------------------------------------------------------------

const coreServices = [
  {
    id: 'design-consultation',
    title: 'Consultation & Project Discovery',
    description:
      'Every project starts with understanding your space, your guests, and your budget.',
    Icon: GiMagnifyingGlass,
    bullets: [
      'On-site or virtual walkthroughs',
      'Budget range development',
      'Scope documentation & BOQ drafting',
    ],
  },
  {
    id: 'design-support',
    title: 'Design Support & Specifications',
    description:
      'We translate design intent into production-ready specs — working directly with your architect or designer.',
    Icon: GiPencilRuler,
    bullets: [
      'Material & finish selection',
      'Space planning & layout assistance',
      'Shop drawing review & approval coordination',
    ],
  },
  {
    id: 'custom-manufacturing',
    title: 'Manufacturing & Sourcing',
    description:
      'Hybrid model: domestic production for speed, overseas sourcing for scale. You choose based on timeline and budget.',
    Icon: GiFactory,
    bullets: [
      'Custom casegoods, seating & upholstery',
      'Domestic & global production management',
      'Prototype & sample development',
    ],
  },
  {
    id: 'ffe-project-management',
    title: 'FF&E Project Management',
    description:
      'One dedicated project manager from PO to punch list — no handoffs, no surprises.',
    Icon: GiChecklist,
    bullets: [
      'Specification management & change orders',
      'Vendor coordination & timeline tracking',
      'Budget monitoring & reporting',
    ],
  },
  {
    id: 'logistics',
    title: 'Logistics & Delivery Coordination',
    description:
      'We sequence deliveries around your construction schedule, not the other way around.',
    Icon: GiCargoShip,
    bullets: [
      'Warehousing & staging',
      'Phased delivery scheduling',
      'Site-readiness coordination with GC',
    ],
  },
  {
    id: 'installation-setup',
    title: 'Installation & Close-out',
    description:
      'Experienced crews handle assembly, placement, and punch list resolution so you can focus on opening day.',
    Icon: GiAutoRepair,
    bullets: [
      'Professional assembly & placement',
      'Protection of existing finishes',
      'Final walkthrough & warranty activation',
    ],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Consultation & Scope',
    description:
      'On-site or virtual walkthrough. We define project requirements, budget parameters, and timeline goals together.',
    timeline: 'Week 0\u20131',
    deliverable: 'Scope document & preliminary BOQ',
  },
  {
    number: '02',
    title: 'Design & Specifications',
    description:
      'Material selection, dimensions, finish samples, and shop drawing review with your designer or architect.',
    timeline: 'Week 1\u20133',
    deliverable: 'Approved specifications package',
  },
  {
    number: '03',
    title: 'Manufacturing & Sourcing',
    description:
      'Production across domestic or global facilities, with progress updates and sample verification at key milestones.',
    timeline: 'Week 3\u20138',
    deliverable: 'QA photos & production milestone reports',
  },
  {
    number: '04',
    title: 'Quality Review',
    description:
      'Pre-shipment inspection against approved specifications. Packaging confirmation before anything leaves the factory.',
    timeline: 'Week 8\u20139',
    deliverable: 'QC inspection report with photos',
  },
  {
    number: '05',
    title: 'Delivery & Installation',
    description:
      'Phased delivery coordinated with your site schedule. Professional assembly and placement, room by room.',
    timeline: 'Week 9\u201311',
    deliverable: 'Installed furniture, room-by-room',
  },
  {
    number: '06',
    title: 'Close-out & Follow-up',
    description:
      'Punch list resolution, warranty documentation, and a final walkthrough to confirm everything meets the standard.',
    timeline: 'Week 11\u201312',
    deliverable: 'Warranty packet & project close-out report',
  },
];

const serviceFaqs = [
  [
    'What types of furniture do you manufacture?',
    'Custom casegoods, seating, upholstery, wardrobes, vanities, and millwork for hotels, restaurants, offices, healthcare facilities, and institutional spaces.',
  ],
  [
    'Do you offer value engineering?',
    'Yes. Value engineering is a core part of our service. We help optimize designs to meet budget requirements without compromising quality, durability, or design intent.',
  ],
  [
    'What are your lead times?',
    'Most projects run 9\u201312 weeks from approved specifications to delivery. Timelines vary based on scope, materials, and whether production is domestic or overseas.',
  ],
  [
    'Can you work with my designer or architect?',
    'Absolutely. We regularly collaborate with design teams to ensure manufacturability, budget alignment, and design intent preservation throughout the project.',
  ],
  [
    'Do you handle installation?',
    'Yes. Our installation teams or trusted local partners handle assembly, placement, and final setup. We coordinate directly with your GC to sequence installs around the construction schedule.',
  ],
  [
    'What\u2019s the minimum project size?',
    'We handle projects of all sizes \u2014 from a 10-room motel refresh to multi-property franchise rollouts. If you have a space that needs furniture, we can help.',
  ],
  [
    'Do you provide samples before production?',
    'Yes. For custom projects we provide material samples, finish swatches, and when feasible, prototype units for review before full production begins.',
  ],
  [
    'What warranty do you offer?',
    'Warranty terms vary by product category and materials. We provide warranty documentation at project close-out and stand behind the quality of every piece we deliver.',
  ],
];

// ---------------------------------------------------------------------------
// Dynamic data from catalog & projects
// ---------------------------------------------------------------------------

const places = getAllPlaces();
const allProjects = getAllProjects();

// Build industry data for tabs
const industryDescriptions = {
  hotel: {
    description:
      'Guest rooms, lobbies, breakfast areas, and common spaces. We furnish every touchpoint of the guest experience.',
    highlights: [
      'Guestroom packages (casegoods, beds, seating)',
      'Lobby & common area furniture',
      'Breakfast and dining furniture',
    ],
  },
  restaurant: {
    description:
      'Dining rooms, bars, patios, and fast-casual spaces. Furniture built for high-turnover environments.',
    highlights: [
      'Dining tables & chairs',
      'Bar and lounge seating',
      'Outdoor and patio furniture',
    ],
  },
  hospital: {
    description:
      'Patient rooms, waiting areas, and staff spaces. Infection-control-friendly materials and commercial-grade durability.',
    highlights: [
      'Patient room casegoods & recliners',
      'Waiting area seating',
      'Overbed tables & bedside cabinets',
    ],
  },
  office: {
    description:
      'Private offices, open floor plans, conference rooms, and reception areas. Furniture that supports how teams actually work.',
    highlights: [
      'Desks, workstations & storage',
      'Conference and meeting room furniture',
      'Reception and lounge seating',
    ],
  },
  residential: {
    description:
      'Common areas, model units, and resident amenity spaces. Residential aesthetics with commercial durability.',
    highlights: [
      'Living room and bedroom packages',
      'Common area and amenity furniture',
      'Model unit staging',
    ],
  },
  'lobby-area': {
    description:
      'Lobbies, corridors, and shared common areas. First-impression furniture that sets the tone for the entire property.',
    highlights: [
      'Lobby seating and tables',
      'Reception desks',
      'Corridor and transition furniture',
    ],
  },
  'educational-facilities': {
    description:
      'Classrooms, libraries, study spaces, and dormitories. Durable furniture designed for institutional daily use.',
    highlights: [
      'Library shelving and study carrels',
      'Classroom and lecture seating',
      'Dormitory casegoods',
    ],
  },
};

// Short tab names for long catalog names
const tabNames = {
  hospital: 'Healthcare',
  'lobby-area': 'Lobby & Common',
  hotel: 'Hospitality',
  office: 'Office',
  restaurant: 'Restaurant',
  residential: 'Residential',
  'educational-facilities': 'Education',
};

const industries = places.map((place) => {
  const productCount = place.furnitureTypes.reduce(
    (sum, ft) =>
      sum + ft.subcategories.reduce((s, sc) => s + sc.products.length, 0),
    0,
  );
  const info = industryDescriptions[place.slug] || {
    description: `Commercial furniture solutions for ${place.name.toLowerCase()} environments.`,
    highlights: [],
  };
  return {
    name: tabNames[place.slug] || place.name,
    fullName: place.name,
    slug: place.slug,
    image: place.image,
    description: info.description,
    highlights: info.highlights,
    productLink: `/products?space=${place.slug}`,
    productCount: productCount,
  };
});


// ---------------------------------------------------------------------------
// Schema markup
// ---------------------------------------------------------------------------

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
      itemListElement: coreServices.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url: `${siteUrl}/services#${service.id}`,
          provider: { '@type': 'Organization', name: 'DMD Furnishing' },
          areaServed: 'US',
        },
      })),
    },
    {
      '@type': 'HowTo',
      name: 'DMD Furnishing Project Process',
      description:
        'Our structured six-step process from initial consultation to project close-out.',
      step: processSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.title,
        text: step.description,
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

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Commercial Furniture Services | FF&E Solutions',
    description:
      'End-to-end commercial furniture services: custom design, manufacturing, FF&E procurement, and installation for hospitality and corporate projects. Serving clients nationwide from Foxboro, Massachusetts.',
    path: '/services',
    image: '/Images/Our Services.jpg',
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ── 1. Hero ── */}
      <section className={styles.hero} aria-label="Commercial furniture services">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroSplit}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>Commercial FF&E Services</p>
            <h1>
              From Concept to Installation.
              <br />
              One Team. One Process.
            </h1>
            <p className={styles.heroLede}>
              End-to-end furniture solutions for hotels, restaurants, healthcare, and
              commercial spaces — design, manufacturing, logistics, and installation managed
              under one roof.
            </p>
            <div className={styles.heroActions}>
              <Link href="/schedule-call" className={styles.primaryBtn}>
                Schedule a Consultation
              </Link>
              <a href="#process" className={styles.secondaryBtn}>
                See Our Process
              </a>
            </div>
          </div>
          <div className={styles.heroImageWrap}>
            <Image
              src="/Images/Our Services.jpg"
              alt="DMD Furnishing commercial furniture services"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
              className={styles.heroImage}
              priority
            />
          </div>
        </div>
      </section>

      <div className={styles.shell}>
        {/* ── 2. Services Grid ── */}
        <section id="services-grid" className={styles.section}>
          <p className={styles.eyebrow}>What We Do</p>
          <h2>Full-Spectrum FF&E Services</h2>
          <p className={styles.sectionLede}>
            From the first design conversation to the final piece placed on-site — every
            step coordinated by one team.
          </p>
          <div className={styles.servicesGrid}>
            {coreServices.map((service) => (
              <article key={service.id} id={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIconWrap}>
                  <service.Icon className={styles.serviceIcon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className={styles.serviceBullets}>
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── 3. Process Timeline ── */}
        <section id="process" className={styles.section}>
          <p className={styles.eyebrow}>How We Work</p>
          <h2>Six Steps from Concept to Completion</h2>
          <p className={styles.sectionLede}>
            A structured process that keeps your project on-time, on-budget, and aligned
            with your design vision.
          </p>
          <ProcessTimeline steps={processSteps} />
        </section>

        {/* ── 4. Industries ── */}
        <section className={styles.section}>
          <p className={styles.eyebrow}>Industries We Serve</p>
          <h2>Built for Every Commercial Environment</h2>
          <p className={styles.sectionLede}>
            We furnish spaces across {places.length} industries — each with its own durability
            requirements, compliance standards, and design expectations.
          </p>
          <IndustryTabs industries={industries} />
        </section>

        {/* ── 5. FAQ (compact, matches homepage style) ── */}
        <section className={styles.section}>
          <p className={styles.eyebrow}>Common Questions</p>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {serviceFaqs.map(([question, answer]) => (
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
          <p className={styles.eyebrow}>Get Started</p>
          <h2>Have a project in mind?</h2>
          <p className={styles.ctaLede}>
            Free 30-minute consultation — leave with a budget range, timeline estimate, and
            clear next steps.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/schedule-call" className={styles.primaryBtn}>
              Schedule a Call
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              Request a Quote
            </Link>
            <Link href="/projects" className={styles.tertiaryBtn}>
              View Our Projects
            </Link>
          </div>
          <div className={styles.ctaContact}>
            <a href="tel:+16172237781">+1 (617) 223-7781</a>
            <span>|</span>
            <a href="mailto:Sales@DMDFurnishing.com">Sales@DMDFurnishing.com</a>
          </div>
        </section>
      </div>
    </main>
  );
}
