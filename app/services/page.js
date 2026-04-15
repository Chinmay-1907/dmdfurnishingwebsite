import Image from 'next/image';
import Link from 'next/link';
import { getAllPlaces } from '../../lib/catalog';
import { getAllProjects } from '../../lib/projects';
import { generatePageMetadata, siteUrl } from '../../lib/metadata';
import ProcessTimeline from '../../components/services/ProcessTimeline';
import IndustryTabs from '../../components/services/IndustryTabs';
import styles from './page.module.css';

// ---------------------------------------------------------------------------
// Static data: services, process, FAQ
// ---------------------------------------------------------------------------

const processSteps = [
  {
    number: '01',
    shortLabel: 'Intro Call',
    title: 'Your First Call, No Commitment Yet',
    description:
      'A short call or walkthrough so we can understand the property, the brand standards, and the timeline you are working against. You ask what you need to ask. We confirm whether DMD is the right partner for the job before anyone signs anything.',
    bullets: [
      'Virtual or on site walkthrough of the property',
      'Your brand standards, operational needs, and timeline reviewed',
      'Honest fit check, we tell you if it is not a match',
    ],
  },
  {
    number: '02',
    shortLabel: 'Budget & Scope',
    title: 'Room Count, Budget Range, Written Scope',
    description:
      'We walk the property, count room types, and set a realistic budget range grounded in finish level, not industry averages. You leave this phase with a written scope document and a preliminary bill of quantities ready for ownership review.',
    bullets: [
      'Every room type counted and confirmed by finish grade',
      'Realistic budget range tied to actual scope and finish level',
      'Written scope document and preliminary bill of quantities for ownership',
    ],
    deliverable: 'Written scope document with preliminary bill of quantities',
  },
  {
    number: '03',
    shortLabel: 'Design & 3D',
    title: 'Plan Every Room in 3D Before Anything Is Built',
    description:
      'Our in house design team models every guest room and public space in 3D and plans layouts around the way your staff actually runs the property. You review renderings and physical material samples together. The spec book is not closed until you have signed off on every room and every detail.',
    bullets: [
      '3D renderings of every guest room and public space',
      'Layouts planned around circulation, staff access, and daily operations',
      'Brand standards and ADA requirements factored in from the first rendering',
    ],
    deliverable: 'Signed specifications package',
  },
  {
    number: '04',
    shortLabel: 'Manufacturing',
    title: 'Production: Foxboro Shop or Partner Factory',
    description:
      'Our Foxboro shop handles prototypes, short runs, and anything that needs a fast revision cycle. Partner factories overseas handle high volume guestroom packages where unit economics matter. You pick the mix on every project.',
    bullets: [
      'Custom casegoods, seating, upholstery, and millwork',
      'Sample pieces cleared against signed spec before the full run starts',
      'Progress photos delivered at every production milestone',
    ],
    deliverable: 'Progress photos with production milestone reports',
  },
  {
    number: '05',
    shortLabel: 'Factory QC',
    title: 'Every Piece Inspected Before It Ships',
    description:
      'Dimensions, finish, hardware, and fabric each inspected against the signed spec sheet. Photo documentation compiled into a QC report. Nothing leaves until every item passes.',
    bullets: [
      'Dimensions, finish, hardware, and fabric each inspected against spec',
      'Photo documentation compiled into a written QC report',
      'Defects resolved before containers load',
    ],
    deliverable: 'Photo documented QC inspection report',
  },
  {
    number: '06',
    shortLabel: 'Delivery & Install',
    title: 'Phased Delivery and On Site Installation',
    description:
      'Furniture arrives in phased drops timed with your GC schedule so each space gets furnished as it opens. Assembly, placement, leveling, and anchoring handled room by room with existing finishes protected throughout.',
    bullets: [
      'Warehousing and staging near your project site',
      'Phased drops by floor, wing, or room type, direct with your GC',
      'Assembly, placement, leveling, and wall anchoring with floor and finish protection',
    ],
    deliverable: 'Installed furniture room by room',
  },
  {
    number: '07',
    shortLabel: 'Close Out',
    title: 'Every Punch List Item Closed Before We Leave',
    description:
      'We walk every room with your team and resolve punch list items on the spot. You leave with warranty documentation, care instructions, and an as built piece count in a written close out packet.',
    bullets: [
      'Final walkthrough room by room with your team',
      'Punch list items resolved on the spot, not logged for later',
      'Warranty documentation, care instructions, and as built piece count',
    ],
    deliverable: 'Close out report and warranty packet handed over at final walkthrough',
  },
];

const serviceFaqs = [
  [
    'What types of furniture do you manufacture?',
    'Custom casegoods (dressers, desks, nightstands, wardrobes, vanities), lounge and dining seating, upholstered beds and headboards, booths, tables, and architectural millwork. We build for hotels, restaurants, offices, non-clinical healthcare spaces, and institutional interiors.',
  ],
  [
    'Do you offer value engineering?',
    'Yes, on every bid. We mark up the BOQ line by line and flag where a finish swap, a drawer box change, or a different substrate can reduce cost without changing what a guest sees or touches. Typical savings come from hardware, non-visible joinery, and finish grades, not from downgrading the face materials.',
  ],
  [
    'What are your lead times?',
    'Lead times depend on scope, finish availability, and whether production runs through our Foxboro shop or an overseas partner. Every project gets a written timeline at contract signing with dates for sample approval, production start, QC, and install.',
  ],
  [
    'Can you work with my designer or architect?',
    'Yes. Most of our projects come in with a design team already engaged. We handle the manufacturing side: shop drawings, material substitution recommendations, and spec sheet translation so the design intent survives the move from rendering to production line.',
  ],
  [
    'Do you handle installation?',
    'Yes. Our installation teams or vetted local partners assemble, place, level, and anchor every piece. We coordinate directly with your general contractor so deliveries arrive room ready and installs sequence around the construction schedule, not across it.',
  ],
  [
    'What\u2019s the minimum project size?',
    'A single restaurant dining room, a small motel refresh, or a lobby and breakfast area update are all inside our normal range. Small jobs get the same PM, the same QC process, and the same written timeline as a multi property rollout.',
  ],
  [
    'Do you provide samples before production?',
    'Yes. For custom work we provide finish swatches, fabric samples, and hardware samples before specs are locked. On larger runs we can produce a prototype unit for in-person review before full production starts.',
  ],
  [
    'What warranty do you offer?',
    'Warranty terms are documented in writing at project close out and vary by product category and material. Frame warranties for seating, mechanism warranties for drawer hardware, and finish warranties for casegoods. We stand behind the spec sheet we build to.',
  ],
  [
    'What standards do you build to?',
    'We build to commercial contract-grade durability standards appropriate for each project type. Specific material, fire safety, and durability requirements are documented on the spec sheet for every project.',
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
      'Guestrooms, lobbies, breakfast rooms, and corridors. HPL worktops, upholstered headboards, and contract-grade seating sized for brand standards and the refresh cycle the property runs on.',
    highlights: [
      'Guestroom packages: dressers, desks, nightstands, beds, luggage benches',
      'Lobby sofas, lounge chairs, and reception desks',
      'Breakfast area tables, stacking chairs, and booths',
    ],
  },
  restaurant: {
    description:
      'Dining rooms, bar areas, patios, and quick-service counters. Chairs engineered for nightly restaurant service. Tabletops specified to survive hot plates, spills, and daily sanitizing.',
    highlights: [
      'Dining tables, side chairs, and host stations',
      'Bar stools, banquettes, and booth systems',
      'Outdoor patio seating in powder-coated aluminum',
    ],
  },
  hospital: {
    description:
      'Non-clinical areas: waiting rooms, family lounges, administrative offices, and cafeteria spaces. Wipeable fabrics and cleanable surfaces. No patient-care clinical furniture.',
    highlights: [
      'Waiting-room lounge seating with performance fabric',
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
      'Multifamily common rooms, model units, and resident amenity spaces. Residential look, commercial-grade guts. Frames and fabrics sized for shared-use wear.',
    highlights: [
      'Amenity-room lounge and dining packages',
      'Model-unit casegoods, beds, and accent pieces',
      'Outdoor and rooftop furniture for shared terraces',
    ],
  },
  'lobby-area': {
    description:
      'Lobbies, corridors, and public transition spaces. This is the first thing a guest touches. The seating has to look considered and hold up to luggage, umbrellas, and foot traffic.',
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
      'DMD Furnishing sequences deliveries around your construction schedule, not the other way around. The team provides warehousing and staging, phased delivery scheduling, and site readiness coordination with the general contractor so furniture arrives room ready when each space is prepared to receive it during commercial project installation.',
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
      itemListElement: serviceSchemaEntries.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: entry.name,
          description: entry.description,
          url: `${siteUrl}/services`,
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
    title: 'FF&E Services: Design to Install',
    description:
      'Six FF&E services under one team: design, manufacturing, procurement, project management, logistics, and installation. DMD Furnishing, Foxboro MA.',
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
        <div className={styles.heroBg}>
          <Image
            src="/Images/services-hero.png"
            alt="Luxury hotel guestroom with custom casegoods, upholstered bed, and dresser, commercial furniture by DMD Furnishing"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImage}
          />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Commercial FF&E Services</p>
          <h1>One Team, Concept to Installation</h1>
          <p className={styles.heroLede}>
            Six FF&E services under one contract: consultation, design specs, manufacturing,
            project management, logistics, and installation. Custom commercial furniture for
            hotels, restaurants, offices, and institutions, built from our Foxboro, MA shop.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact#schedule" className={styles.primaryBtn}>
              Schedule a Consultation
            </Link>
            <a href="#process" className={styles.secondaryBtn}>
              See Our Process
            </a>
          </div>
        </div>
      </section>

      <div className={styles.shell}>
        {/* ── 2. Process Timeline ── */}
        <section id="process" className={styles.section}>
          <p className={styles.eyebrow}>How We Work</p>
          <h2>Seven phases, each with a named deliverable.</h2>
          <ProcessTimeline steps={processSteps} />
        </section>

        {/* ── 4. Industries ── */}
        <section className={styles.section}>
          <p className={styles.eyebrow}>Industries We Serve</p>
          <h2>Built for {places.length} commercial environments.</h2>
          <p className={styles.sectionLede}>
            Every commercial space has its own design language. Modern boutique hotels read differently than heritage country clubs. Sleek tech offices need a different palette than warm hospitality lobbies. We tailor materials, finishes, and proportions to the look and feel of the room.
          </p>
          <IndustryTabs industries={industries} />
        </section>

        {/* ── 5. FAQ (compact, matches homepage style) ── */}
        <section className={styles.section}>
          <p className={styles.eyebrow}>Common Questions</p>
          <h2>What buyers ask about our services.</h2>
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
            Bring a room count and a target budget. Leave with a
            realistic price range, a lead time estimate, and a written list of next steps.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact#schedule" className={styles.primaryBtn}>
              Schedule a Call
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
