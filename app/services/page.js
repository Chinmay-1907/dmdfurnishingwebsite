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
      'A walkthrough, a room count, a target budget. You leave with a written scope document and a preliminary BOQ you can take to ownership.',
    Icon: GiMagnifyingGlass,
    bullets: [
      'On-site or virtual walkthrough of every room type',
      'Realistic budget range based on scope and finish level',
      'Written scope document and preliminary bill of quantities',
    ],
  },
  {
    id: 'design-support',
    title: 'Design Support & Specifications',
    description:
      'We work next to your architect or designer, turning renderings into shop drawings, finish schedules, and fabric call-outs a factory can actually build from.',
    Icon: GiPencilRuler,
    bullets: [
      'Material and finish selection with physical samples',
      'Shop drawings and dimensioned layouts for approval',
      'Spec sheets covering fabric grades, hardware, and finish codes',
    ],
  },
  {
    id: 'custom-manufacturing',
    title: 'Manufacturing & Sourcing',
    description:
      'Domestic production for short runs, revisions, and time-sensitive jobs. Overseas partners for high-volume guestroom packages where unit cost matters. You pick the mix.',
    Icon: GiFactory,
    bullets: [
      'Custom casegoods, seating, upholstery, and millwork',
      'Domestic shop for prototypes and fast turns',
      'Full material samples and optional pre-production prototypes',
    ],
  },
  {
    id: 'ffe-project-management',
    title: 'FF&E Project Management',
    description:
      'One PM owns the job from signed PO to punch list. They track specs, change orders, vendor lead times, and budget — and send you one weekly status update instead of twenty emails.',
    Icon: GiChecklist,
    bullets: [
      'Spec sheet version control and change-order tracking',
      'Weekly status reports against the baseline schedule',
      'Budget tracking with variance flagged before it becomes a problem',
    ],
  },
  {
    id: 'logistics',
    title: 'Logistics & Delivery Coordination',
    description:
      'Phased deliveries staged around your GC schedule, not the other way around. We warehouse and drop product room by room so your construction sequence never gets blocked.',
    Icon: GiCargoShip,
    bullets: [
      'Warehousing and staging near the project site',
      'Phased drops by floor, wing, or room type',
      'Direct coordination with your general contractor',
    ],
  },
  {
    id: 'installation-setup',
    title: 'Installation & Close-out',
    description:
      'Our crews assemble, place, level, and anchor every piece. We protect existing finishes, verify the piece count against the spec sheet, and hand you a punch list with every item closed.',
    Icon: GiAutoRepair,
    bullets: [
      'Assembly, placement, leveling, and wall anchoring',
      'Floor and millwork protection during install',
      'Final walkthrough with warranty documentation packet',
    ],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Consultation & Scope',
    description:
      'Walkthrough of every room type. Room counts, brand standards, and rough budget confirmed. You leave with a written scope document and a preliminary bill of quantities you can show ownership.',
    timeline: 'Week 0\u20131',
    deliverable: 'Scope document & preliminary BOQ',
  },
  {
    number: '02',
    title: 'Design & Specifications',
    description:
      'Finish samples on the table. Fabric swatches, hardware samples, and shop drawings reviewed with your designer or architect. Nothing moves to production until the spec book is signed.',
    timeline: 'Week 1\u20133',
    deliverable: 'Approved specifications package',
  },
  {
    number: '03',
    title: 'Manufacturing & Sourcing',
    description:
      'Production runs in our Foxboro shop or a partner factory, whichever fits your timeline. Progress photos at key milestones. Sample pieces verified against the signed spec before full production continues.',
    timeline: 'Week 3\u20138',
    deliverable: 'QA photos & production milestone reports',
  },
  {
    number: '04',
    title: 'Pre-Shipment QC',
    description:
      'Every piece inspected against the approved spec sheet — dimensions, finish, hardware, fabric. Photo report sent before containers load. Nothing with a defect leaves the factory.',
    timeline: 'Week 8\u20139',
    deliverable: 'QC inspection report with photos',
  },
  {
    number: '05',
    title: 'Delivery & Installation',
    description:
      'Phased drops coordinated with your GC so furniture arrives as each space is ready. Assembly, placement, leveling, anchoring, and protection of existing finishes handled room by room.',
    timeline: 'Week 9\u201311',
    deliverable: 'Installed furniture, room-by-room',
  },
  {
    number: '06',
    title: 'Punch & Close-Out',
    description:
      'Final walkthrough with your team. Punch list items resolved on site. Warranty documentation, care instructions, and as-built piece count delivered in a written close-out packet.',
    timeline: 'Week 11\u201312',
    deliverable: 'Warranty packet & project close-out report',
  },
];

const serviceFaqs = [
  [
    'What types of furniture do you manufacture?',
    'Custom casegoods (dressers, desks, nightstands, wardrobes, vanities), lounge and dining seating, upholstered beds and headboards, booths, tables, and architectural millwork. We build for hotels, restaurants, offices, non-clinical healthcare spaces, and institutional interiors.',
  ],
  [
    'Do you offer value engineering?',
    'Yes, on every bid. We mark up the BOQ line by line and flag where a finish swap, a drawer box change, or a different substrate can reduce cost without changing what a guest sees or touches. Typical savings come from hardware, non-visible joinery, and finish grades — not from downgrading the face materials.',
  ],
  [
    'What are your lead times?',
    'Typical lead times run multiple weeks from approved specifications to delivery on site. The exact number depends on scope, finish availability, and whether production runs through our domestic shop or an overseas partner. You get a written timeline at contract signing with dates for sample approval, production start, QC, and install.',
  ],
  [
    'Can you work with my designer or architect?',
    'Yes — most of our projects come in with a design team already engaged. We handle the manufacturing side: shop drawings, material substitution recommendations, and spec-sheet translation so the design intent survives the move from rendering to production line.',
  ],
  [
    'Do you handle installation?',
    'Yes. Our installation teams or vetted local partners assemble, place, level, and anchor every piece. We coordinate directly with your general contractor so deliveries arrive room-ready and installs sequence around the construction schedule, not across it.',
  ],
  [
    'What\u2019s the minimum project size?',
    'A single restaurant dining room, a 10-room motel refresh, or a lobby and breakfast-area update are all inside our normal range. Small jobs get the same PM, the same QC process, and the same written timeline as a multi-property rollout.',
  ],
  [
    'Do you provide samples before production?',
    'Yes. For custom work we provide finish swatches, fabric samples, and hardware samples before specs are locked. On larger runs we can produce a prototype unit for in-person review before full production starts.',
  ],
  [
    'What warranty do you offer?',
    'Warranty terms are documented in writing at project close-out and vary by product category and material — frame warranties for seating, mechanism warranties for drawer hardware, and finish warranties for casegoods. We stand behind the spec sheet we build to.',
  ],
  [
    'What standards do you build to?',
    'Task and lounge seating is engineered against BIFMA X5.1 and BIFMA X5.4 durability benchmarks. Upholstery fabrics are specified to CAL 117-2013 and NFPA 701 where required by code. Architectural millwork follows AWI Quality Standards. We will note any deviation from these on the spec sheet.',
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
      'Guestrooms, lobbies, breakfast rooms, and corridors. HPL worktops, upholstered headboards, and BIFMA-rated seating sized for brand standards and five-year refresh cycles.',
    highlights: [
      'Guestroom packages: dressers, desks, nightstands, beds, luggage benches',
      'Lobby sofas, lounge chairs, and reception desks',
      'Breakfast-area tables, stacking chairs, and booths',
    ],
  },
  restaurant: {
    description:
      'Dining rooms, bar areas, patios, and quick-service counters. Chairs engineered for ten seatings a night. Tabletops specified to survive hot plates, spills, and daily sanitizing.',
    highlights: [
      'Dining tables, side chairs, and host stations',
      'Bar stools, banquettes, and booth systems',
      'Outdoor patio seating in powder-coated aluminum',
    ],
  },
  hospital: {
    description:
      'Non-clinical areas: waiting rooms, family lounges, administrative offices, and cafeteria spaces. Wipeable fabrics and cleanable surfaces — no patient-care clinical furniture.',
    highlights: [
      'Waiting-room lounge seating with Crypton Health fabric',
      'Administrative desks and filing casegoods',
      'Cafeteria tables and stacking chairs',
    ],
  },
  office: {
    description:
      'Private offices, open-plan workstations, conference rooms, and reception areas. Built for daily keyboard wear, hot-desking, and rolling chairs on hard floors.',
    highlights: [
      'Desks, benching systems, and storage credenzas',
      'Conference tables with integrated power and data',
      'Reception sofas, side chairs, and coffee tables',
    ],
  },
  residential: {
    description:
      'Multifamily common rooms, model units, and resident amenity spaces. Residential look, commercial-grade guts — frames and fabrics sized for shared-use wear.',
    highlights: [
      'Amenity-room lounge and dining packages',
      'Model-unit casegoods, beds, and accent pieces',
      'Outdoor and rooftop furniture for shared terraces',
    ],
  },
  'lobby-area': {
    description:
      'Lobbies, corridors, and public transition spaces. This is the first thing a guest touches — the seating has to look considered and hold up to luggage, umbrellas, and foot traffic.',
    highlights: [
      'Lobby sofas, lounge chairs, and occasional tables',
      'Reception desks and concierge millwork',
      'Corridor benches and accent casegoods',
    ],
  },
  'educational-facilities': {
    description:
      'Dormitories, libraries, study commons, and faculty offices. Built for institutional abuse: laptops dragged across desktops, chairs dragged across tile, daily disinfection.',
    highlights: [
      'Dormitory beds, desks, wardrobes, and dressers',
      'Library carrels, reading tables, and lounge seating',
      'Common-area soft seating and study tables',
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

const serviceSchemaEntries = [
  {
    slug: 'design-consultation',
    name: 'Consultation & Project Discovery',
    description:
      'Every project starts with understanding your space, your guests, and your budget. DMD Furnishing begins with on-site or virtual walkthroughs, develops a budget range, and documents scope through preliminary BOQ drafting so commercial FF&E projects launch with a clearly defined foundation before design or manufacturing work begins.',
    serviceType: 'Design Consultation',
  },
  {
    slug: 'design-support',
    name: 'Design Support & Specifications',
    description:
      'DMD Furnishing translates design intent into production-ready specifications, working directly with your architect or designer. The team handles material and finish selection, space planning and layout assistance, and shop drawing review with approval coordination so every detail is resolved before furniture moves into manufacturing.',
    serviceType: 'Design Consultation',
  },
  {
    slug: 'custom-manufacturing',
    name: 'Manufacturing & Sourcing',
    description:
      'A hybrid manufacturing model pairs domestic production for speed with overseas sourcing for scale, chosen based on timeline and budget. DMD Furnishing produces custom casegoods, seating, and upholstery, manages domestic and global production, and develops prototypes and samples before committing to full production runs.',
    serviceType: 'Commercial Furniture Manufacturing',
  },
  {
    slug: 'ffe-project-management',
    name: 'FF&E Project Management',
    description:
      'One dedicated project manager runs each project from purchase order to punch list, with no handoffs and no surprises. DMD Furnishing manages specifications and change orders, coordinates vendors and timelines, and monitors budgets with ongoing reporting so commercial FF&E rollouts stay aligned with design intent and construction schedules.',
    serviceType: 'FF&E Procurement',
  },
  {
    slug: 'logistics',
    name: 'Logistics & Delivery Coordination',
    description:
      'DMD Furnishing sequences deliveries around your construction schedule, not the other way around. The team provides warehousing and staging, phased delivery scheduling, and site-readiness coordination with the general contractor so furniture arrives room-ready when each space is prepared to receive it during commercial project installation.',
    serviceType: 'Installation',
  },
  {
    slug: 'installation-setup',
    name: 'Installation & Close-out',
    description:
      'Experienced installation crews handle assembly, placement, and punch list resolution so teams can focus on opening day. DMD Furnishing delivers professional assembly and placement, protects existing finishes during install, and completes a final walkthrough with warranty activation to close out every commercial FF&E project cleanly.',
    serviceType: 'Installation',
  },
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
    ...serviceSchemaEntries.map((entry) => ({
      '@type': 'Service',
      '@id': `${siteUrl}/services#${entry.slug}`,
      name: entry.name,
      description: entry.description,
      serviceType: entry.serviceType,
      provider: { '@id': `${siteUrl}/#organization` },
      areaServed: { '@type': 'Country', name: 'United States' },
    })),
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
    title: 'Commercial Furniture Services | Design, Manufacturing & Install',
    description:
      'Six commercial furniture services under one team: design consultation, custom manufacturing, FF&E procurement, project management, logistics, and installation. DMD Furnishing, Foxboro MA.',
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
              Commercial Furniture Manufacturing Services,
              <br />
              Concept to Installation.
            </h1>
            <p className={styles.heroLede}>
              DMD Furnishing delivers six custom FF&E services under one contract:
              consultation, design specification, commercial furniture manufacturing, FF&E
              project management, logistics, and installation. Built for hotels, restaurants,
              offices, and institutional projects across the United States from our Foxboro,
              Massachusetts shop.
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
              alt="Custom commercial casegoods and upholstery in production at the Foxboro, Massachusetts manufacturing shop"
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
          <h2>Six commercial furniture manufacturing services, one contract.</h2>
          <p className={styles.sectionLede}>
            Each service below answers a specific question: what gets built, who manages it,
            how it ships, and who installs it. You can hire us for all six or plug us into
            the phases where you need the most help.
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
          <h2>Six phases, each with a named deliverable.</h2>
          <p className={styles.sectionLede}>
            Every phase has a week range and a document you get at the end of it — a scope
            doc, approved specs, a QC report, a punch list sign-off. If a phase slips, you
            see it in the weekly status report the same week it happens.
          </p>
          <ProcessTimeline steps={processSteps} />
        </section>

        {/* ── 4. Industries ── */}
        <section className={styles.section}>
          <p className={styles.eyebrow}>Industries We Serve</p>
          <h2>Built for {places.length} commercial environments.</h2>
          <p className={styles.sectionLede}>
            Each industry has its own failure modes — hotel dressers take suitcase impact,
            restaurant chairs take ten seatings a night, office workstations take daily
            keyboard wear. We spec materials and hardware to match.
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
            Free 30-minute call. Bring a rough room count and a target budget. Leave with a
            realistic price range, a lead-time estimate, and a written list of next steps.
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
            <a href="mailto:sales@dmdfurnishing.com">sales@dmdfurnishing.com</a>
          </div>
        </section>
      </div>
    </main>
  );
}
