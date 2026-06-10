import Link from 'next/link';
import JsonLd from '../../../components/JsonLd';
import AnswerCallout from '../../../components/AnswerCallout';
import RelatedPosts from '../../../components/blog/RelatedPosts';
import ImagePromptBox from '../../../components/blog/ImagePromptBox';
import { siteUrl } from '../../../lib/metadata';
import styles from '../page.module.css';

export const metadata = {
  title: 'Healthcare Furniture: Durability, Cleanability, Compliance',
  description:
    'How to specify healthcare furniture that survives hospital-grade disinfectants, passes CAL TB 117-2013, and supports infection control in waiting rooms and patient spaces.',
  alternates: {
    canonical: `${siteUrl}/blog/healthcare-furniture-guide`,
  },
  openGraph: {
    title: 'Healthcare Furniture: Durability, Cleanability, Compliance | DMD Furnishing',
    description:
      'How to specify healthcare furniture that survives hospital-grade disinfectants, passes CAL TB 117-2013, and supports infection control in waiting rooms and patient spaces.',
    url: `${siteUrl}/blog/healthcare-furniture-guide`,
    siteName: 'DMD Furnishing',
    type: 'article',
    locale: 'en_US',
    publishedTime: '2026-06-05',
    modifiedTime: '2026-06-10',
    authors: ['DMD Furnishing Editorial Team'],
    images: [
      {
        url: `${siteUrl}/Images/og-default.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare Furniture: Durability, Cleanability, Compliance | DMD Furnishing',
    description:
      'How to specify healthcare furniture that survives hospital-grade disinfectants, passes CAL TB 117-2013, and supports infection control in waiting rooms and patient spaces.',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      '@id': `${siteUrl}/blog/healthcare-furniture-guide#article`,
      headline: 'Healthcare Furniture: Durability, Cleanability, Compliance',
      description:
        'How to specify healthcare furniture that survives hospital-grade disinfectants, passes CAL TB 117-2013, and supports infection control in waiting rooms and patient spaces.',
      datePublished: '2026-06-05',
      dateModified: '2026-06-10',
      author: { '@id': `${siteUrl}/author/dmd-furnishing-editorial#editorial-team` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['[data-speakable]'],
      },
      publisher: { '@id': `${siteUrl}/#organization` },
      mainEntityOfPage: `${siteUrl}/blog/healthcare-furniture-guide`,
      image: [`${siteUrl}/Images/og-default.jpg`],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${siteUrl}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Healthcare Furniture: Durability, Cleanability, Compliance',
          item: `${siteUrl}/blog/healthcare-furniture-guide`,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/blog/healthcare-furniture-guide#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why does healthcare furniture fail faster than standard commercial furniture?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The cleaning chemicals used in clinical environments are far more aggressive than what standard commercial furniture is built to resist. Hospital-grade disinfectant wipes applied many times a day break down residential and lightly specified commercial finishes within months. Surfaces crack, upholstery seams open, and substrate materials swell when moisture gets under inadequate edge treatments. Healthcare furniture must be specified for chemical resistance from the start, not retrofitted.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does CAL TB 117-2013 mean for healthcare upholstery?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'California Technical Bulletin 117-2013 (CAL TB 117-2013) is a flammability standard for upholstered furniture. It requires that seating and upholstered items meet smolder and open-flame resistance tests. Many healthcare facilities require CAL TB 117-2013 compliance as a baseline for all upholstered pieces. Confirm that any piece you specify carries a compliant test report from the fabric or foam supplier.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is bariatric seating and when do I need to specify it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bariatric seating is weight-rated seating built for higher load capacities than standard chairs. Healthcare waiting areas and patient spaces should include a portion of rated bariatric seating to serve the full range of patients without requiring staff intervention or special accommodation. The exact quantity to specify depends on your facility type, space use, and patient population. Specify rated seating rather than relying on visual estimates of frame strength.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does an open-base chair design matter for infection control?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Open-base chair designs, sometimes called clean-out or cantilevered-leg designs, allow housekeeping staff to reach under and around the chair frame with mops and disinfectant equipment without moving the chair. Enclosed pedestal bases and solid-panel chair sides create hidden zones where pathogens can accumulate and go uncleaned during routine housekeeping. In clinical and high-traffic patient spaces, open-base geometry is a practical infection-control specification.',
          },
        },
      ],
    },
  ],
};

export default function HealthcareFurnitureGuide() {
  return (
    <main className={styles.blogArticle}>
      <JsonLd data={articleSchema} />

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span aria-hidden="true">›</span>{' '}
        <Link href="/blog">Blog</Link> <span aria-hidden="true">›</span>{' '}
        <span>Healthcare Furniture Guide</span>
      </nav>

      <article className={styles.container}>
        <header className={styles.articleHeader}>
          <div className={styles.articleMeta}>
            <span>
              Published <time dateTime="2026-06-05">June 5, 2026</time> · Updated{' '}
              <time dateTime="2026-06-10">June 10, 2026</time>
            </span>
            <span>
              {' '}· By{' '}
              <Link href="/author/dmd-furnishing-editorial">DMD Furnishing Editorial Team</Link>
            </span>
          </div>
          <h1 className={styles.articleTitle}>
            Healthcare Furniture: Durability, Cleanability, Compliance
          </h1>
          <AnswerCallout>
            Healthcare furniture fails faster than almost any other commercial category because the
            cleaning chemicals used in clinical settings are far more aggressive than standard
            commercial finishes are built to resist. Specify for chemical resistance, non-porous
            surfaces, sealed edges, and open-base geometry from day one.
          </AnswerCallout>
          <p className={styles.articleLead} data-speakable="lede">
            Facility managers, project managers, and designers specifying furniture for hospitals,
            clinics, and medical offices face a distinct set of requirements. This guide covers why
            healthcare environments destroy ordinary furniture, what material and construction
            standards actually matter, and how to think through waiting areas, patient rooms, and
            staff spaces as separate specification problems.
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.callout}>
            <p>
              <strong>Quick answer:</strong> Healthcare furniture must survive hospital-grade
              disinfectant wipe-downs many times a day, support infection-control housekeeping
              routines, meet CAL TB 117-2013 flammability requirements, and include rated bariatric
              seating in patient-facing areas. The material and construction decisions you make at
              spec time determine whether the furniture lasts two years or ten. Browse the{' '}
              <Link href="/products/hospital">hospital furniture product line</Link> to see what
              these specs look like in practice.
            </p>
          </div>

          <nav className={styles.toc} aria-label="Table of contents">
            <p className={styles.tocTitle}>In This Article</p>
            <ol className={styles.tocList}>
              <li>
                <a href="#why-healthcare-furniture-fails">
                  Why Healthcare Furniture Fails Faster Than Other Commercial Categories
                </a>
              </li>
              <li>
                <a href="#cleanability-specs">
                  Cleanability Specs: What to Look For in Surfaces and Construction
                </a>
              </li>
              <li>
                <a href="#flammability">
                  Flammability: CAL TB 117-2013 and What It Covers
                </a>
              </li>
              <li>
                <a href="#bariatric-seating">
                  Weight-Rated and Bariatric Seating: Why It Belongs in Every Healthcare Spec
                </a>
              </li>
              <li>
                <a href="#zones">
                  Waiting Areas, Patient Rooms, and Staff Spaces: Three Different Specs
                </a>
              </li>
              <li>
                <a href="#open-base">
                  Open-Base Designs and Infection Control
                </a>
              </li>
              <li>
                <a href="#sourcing-healthcare-furniture">
                  Sourcing and Specifying Healthcare Furniture
                </a>
              </li>
            </ol>
          </nav>

          <h2 id="why-healthcare-furniture-fails">
            Why Healthcare Furniture Fails Faster Than Other Commercial Categories
          </h2>
          <p>
            Standard commercial furniture is built to resist normal cleaning products, daily wear,
            and occasional spills. Healthcare facilities clean at a different intensity. Hospital-grade
            disinfectant wipes are applied to every surface in patient-facing areas many times a
            day. Those wipes contain quaternary ammonium compounds, bleach derivatives, or
            accelerated hydrogen peroxide at concentrations that residential and lightly specified
            commercial finishes are not designed to withstand.
          </p>
          <p>
            The result is predictable: surface finishes crack and cloud within months. Upholstery
            seams open where the cleaning agent wicks into the stitch channel and degrades the
            thread. Low-pressure laminate and thermofoil edges lift when moisture penetrates
            inadequately sealed edges. Foam compression accelerates when the moisture barrier
            under upholstery is absent or inadequate, because disinfectant residue works into the
            substrate over time.
          </p>
          <p>
            Furniture specified for a hotel or office lobby will not hold up in a clinic. The
            failure mode is not aesthetic degradation over years; it is functional breakdown within
            months. This is why healthcare furniture carries its own material and construction
            standards, and why specifying the wrong product for the environment is a budget problem
            waiting to happen.
          </p>

          <ImagePromptBox
            aspect="16:9"
            alt="Healthcare waiting area with cleanable upholstered seating and open-base chair frames on polished concrete floor"
            prompt={'Commercial interior photography of a modern healthcare waiting area. Clean, minimal composition. Upholstered seating in muted warm grey fabric with sealed vinyl-wrapped edges. Open cantilever-leg chair frames in brushed dark steel. Polished concrete floor. Indirect overhead lighting, no harsh shadows. Muted palette with dark charcoal #12161D accents in the frame finish and brass-gold #D7B676 in a reception desk trim detail visible in the background. No people, no text, no logos. Shot at eye level with a 35mm equivalent lens, slight depth of field toward rear wall.'}
          />

          <h2 id="cleanability-specs">
            Cleanability Specs: What to Look For in Surfaces and Construction
          </h2>
          <p>
            A cleanable healthcare piece shares four construction characteristics: non-porous surface
            materials, sealed edges, no open seams in upholstery, and a moisture barrier under any
            padded seat or back. Each characteristic addresses a specific failure path.
          </p>
          <p>
            <strong>Non-porous surfaces</strong> prevent pathogen colonization. High-pressure laminate
            (HPL) case surfaces, solid-surface tops, and commercial-grade vinyl upholstery are all
            non-porous when correctly specified and maintained. The contrast is wood veneer with an
            open-grain finish, fabric upholstery without a moisture barrier, or standard melamine
            that chips and exposes the particleboard substrate underneath.
          </p>
          <p>
            For a deeper look at how HPL compares to veneer and solid wood in commercial
            environments, see the{' '}
            <Link href="/blog/hpl-veneer-solid-wood-hotel-casegoods">
              HPL vs. veneer vs. solid wood guide
            </Link>{' '}
            on this site. The material trade-offs discussed there for hotel casegoods apply directly
            to healthcare casework and storage.
          </p>
          <p>
            <strong>Sealed edges</strong> on casegoods and table surfaces prevent moisture ingress
            at the most vulnerable point in any laminated panel product. T-molding, 3mm PVC edge
            banding properly bonded with hot-melt adhesive, or solid-wood edge banding are all
            acceptable. Thin paper edge tape that peels within a year is not. The edge is where
            most panel failures begin in healthcare settings.
          </p>
          <p>
            <strong>No open seams in upholstery</strong> means welted or heat-welded seam
            construction rather than standard sewn seams with exposed thread. Exposed thread at
            seam lines absorbs cleaning agents, degrades, and opens the seam into a harbor for
            pathogens. Healthcare-grade vinyl and antimicrobial fabric products with welted or
            thermally bonded seams eliminate this failure point.
          </p>
          <p>
            <strong>Moisture barriers under upholstery</strong> are a separate layer of impermeable
            material applied over the foam or cushion substrate before the outer fabric is attached.
            When liquid penetrates the upholstery surface, the barrier stops it from reaching the
            foam. Without a barrier, foam absorbs moisture, creates a concealed environment for
            microbial growth, and compresses permanently over time. This applies to seating, exam
            room stools, and any padded surface in a patient-facing area.
          </p>
          <p>
            Surface and edge specifications for healthcare furniture also interact with your
            facility&apos;s infection-control requirements. DMD follows the construction standards
            above as defaults and can work from your facility&apos;s specific cleaning protocol when
            specifying finishes and materials.
          </p>

          <h2 id="flammability">
            Flammability: CAL TB 117-2013 and What It Covers
          </h2>
          <p>
            California Technical Bulletin 117-2013 (CAL TB 117-2013) is the primary flammability
            standard for upholstered furniture in the United States. It tests seating and upholstered
            pieces against smolder-resistance and open-flame criteria. Many healthcare facilities
            and health system procurement standards require CAL TB 117-2013 compliance as a baseline
            for all upholstered pieces purchased for patient-facing areas.
          </p>
          <p>
            Carry the standard into every upholstered line item you specify, from waiting-room
            seating to <Link href="/products/hospital">patient-room furniture</Link>. When you are reviewing
            submittals or substitutions on a healthcare project, confirm that upholstered pieces
            carry a compliant test report from the fabric or foam supplier, not just a label claim.
            The standard covers both the fabric and the underlying filling material, so a compliant
            fabric on non-compliant foam does not satisfy the full test.
          </p>
          <p>
            Beyond CAL TB 117-2013, some facilities specify additional flammability performance
            depending on occupancy type and local code. The standard cited here is a floor, not a
            ceiling. Review your facility&apos;s fire and life safety requirements during the
            pre-design phase and carry those requirements through to the furniture specification.
          </p>

          <ImagePromptBox
            aspect="16:9"
            alt="Healthcare patient room casegoods including bedside cabinet and wall-mounted shelving in HPL finish with sealed edges"
            prompt={'Commercial interior photography of a clean healthcare patient room. Custom bedside cabinet and small wardrobe unit in HPL finish, medium warm grey with visible sealed PVC edge banding on all panel edges. Wall-mounted shelving in matching finish. Polished vinyl floor. Soft diffused window light from the left. Muted palette, dark charcoal #12161D visible in the bed frame metal detail. Brass-gold #D7B676 as a thin accent strip on the cabinet door pull. No people, no text, no logos, no medical equipment. Wide-angle 24mm equivalent lens, full room in frame, slightly elevated camera position.'}
          />

          <h2 id="bariatric-seating">
            Weight-Rated and Bariatric Seating: Why It Belongs in Every Healthcare Spec
          </h2>
          <p>
            Bariatric seating is weight-rated seating built for higher load capacities than standard
            chairs. Including rated seating in patient-facing areas is a practical equity and safety
            specification, not a specialty accommodation. Healthcare waiting areas, infusion suites,
            pre-admission lounges, and any space where patients sit for extended periods should
            include a proportion of rated bariatric seating within the overall seating mix.
          </p>
          <p>
            The failure mode of under-specifying this category is visible in practice: standard
            chairs that fail structurally, staff who must source a special chair from a storage room
            on request, and patients who experience the accommodation as stigmatizing. Specify rated
            seating in the base package so that it is simply part of the room.
          </p>
          <p>
            When specifying bariatric seating, match the construction and cleanability standards
            described in this guide. A weight-rated frame built to hold a higher load while using
            standard vinyl and open seam construction still fails the cleanability test. Bariatric
            and standard seating in the same space should share the same surface, edge, and seam
            specifications so that housekeeping can clean both with the same protocol.
          </p>
          <p>
            The quantity of rated seating to include in a given space depends on your facility type,
            patient population, and the specific use of each area. In our project experience, the
            right approach is to work through this with the infection-control and facilities teams
            during programming, not at the tail end of FF&amp;E specification.
          </p>

          <h2 id="zones">
            Waiting Areas, Patient Rooms, and Staff Spaces: Three Different Specs
          </h2>
          <p>
            Healthcare interiors divide into at least three functional zones, and each one presents
            a different combination of durability, cleanability, and ergonomic requirements. Applying
            a single furniture specification across all three zones is an error that shows up quickly
            once the facility opens.
          </p>
          <p>
            <strong>Waiting areas</strong> see the widest range of users, the most unpredictable
            use patterns, and often the heaviest total traffic in the building. The specification
            priorities here are cleanability of seating surfaces, a mix of standard and rated
            bariatric seating, open-base geometry to support housekeeping routines, and adequate
            seat depth and back height for extended waits. Waiting area seating takes the most
            abuse of any zone in the building. Specify for that reality.
          </p>
          <p>
            <strong>Patient rooms</strong> require a different balance. Casegoods in patient rooms
            need sealed edges and non-porous surfaces, but the ergonomic and aesthetic requirements
            shift toward supporting a therapeutic environment. Bedside cabinets, overbed tables,
            wardrobe units, and guest seating all operate within tight dimensional constraints set
            by the room layout and the need for clinical staff to move around the bed. The
            construction requirements described in this guide apply throughout; the design language
            often targets a calmer, less institutional palette than waiting areas.
          </p>
          <p>
            <strong>Staff spaces</strong> include nursing stations, break rooms, staff lounges, and
            administrative offices. These areas do not face the same infection-control pressure as
            patient-facing zones, but they are not residential environments either. Durability and
            ease of cleaning remain important. Budget-driven decisions to use lower-grade furniture
            in staff areas tend to produce faster failures because staff areas are often used at
            higher intensity than their square footage suggests.
          </p>

          <h2 id="open-base">
            Open-Base Designs and Infection Control
          </h2>
          <p>
            Open-base chair geometry is one of the most actionable and frequently overlooked
            infection-control specifications in healthcare furniture. An open-base or clean-out
            design uses individual legs, cantilever frames, or sled bases that leave the floor
            under and around the chair fully accessible to mops and disinfectant equipment without
            moving the furniture.
          </p>
          <p>
            Enclosed pedestal bases, solid-panel chair sides, and platform bases create zones
            directly under and around the chair that are difficult or impossible to clean during
            routine housekeeping rounds. In clinical environments where floor cleaning is part of
            the infection-control protocol, those concealed zones accumulate pathogen load between
            scheduled deep cleans.
          </p>
          <p>
            The specification implication is straightforward: chairs and seating units in patient-facing
            clinical spaces should use leg or cantilever construction rather than closed-base or
            pedestal construction. This applies to individual chairs, tandem beam seating in waiting
            areas, and guest seating in patient rooms. In staff break rooms and administrative
            offices, the requirement is less strict, but open-base construction remains preferable
            from a practical housekeeping standpoint.
          </p>
          <p>
            Casegoods in patient rooms present a related question. Floor-mounted bases with
            concealed kick-space zones are harder to clean than wall-hung or leg-mounted cabinet
            configurations that leave the floor fully visible and accessible. When the room layout
            and structural conditions permit, wall-hung casework eliminates the floor-level cleaning
            challenge entirely. For floor-standing units, specify open toe-kick dimensions generous
            enough for standard cleaning equipment to reach beneath.
          </p>

          <ImagePromptBox
            aspect="16:9"
            alt="Healthcare staff break room with durable commercial furniture on open leg bases, easy-clean surfaces throughout"
            prompt={'Commercial interior photography of a modern healthcare staff break room. Round table with HPL top in warm white and slim powder-coated steel legs in dark charcoal #12161D. Chairs with open cantilever sled bases in matching dark steel, upholstered seat pads in muted warm greige vinyl. Compact kitchenette visible in background with sealed laminate cabinet fronts. Overhead LED panel light, clean and even. Muted palette, brass-gold #D7B676 accent visible on a single pendant light fixture above the table. No people, no text, no logos. Shot at standing eye level with a 35mm lens, slight wide crop to show full table setting.'}
          />

          <h2 id="sourcing-healthcare-furniture">
            Sourcing and Specifying Healthcare Furniture
          </h2>
          <p>
            Healthcare furniture projects carry longer specification lead times and tighter
            coordination requirements than most commercial categories. Submittals need to include
            test reports for flammability and chemical resistance. Upholstery selections need to
            be reviewed against your facility&apos;s infection-control requirements before orders
            are placed. Custom casegoods need dimensionally accurate shop drawings before
            fabrication begins.
          </p>
          <p>
            DMD Furnishing handles healthcare projects from specification through installation with
            a single point of contact. We own our own design, fabrication, and install crews.
            Our standard project scopes run nine to ten weeks, which is shorter than the twelve-to-twenty-week
            industry default because there is no handoff chain between a separate dealer, factory,
            and installation subcontractor. For projects where the opening date is the constraint,
            that compressed timeline matters.
          </p>
          <p>
            We are East Coast based, which shortens logistics significantly compared to overseas
            sourcing for projects in the region. On install day, our crew coordinates directly with
            your facilities team; there is no separate installation subcontractor to manage.
            Owners and project managers who want to verify the work before delivery can walk our
            shop floor.
          </p>
          <p>
            For the broader context of materials selection in commercial projects, the{' '}
            <Link href="/guides/commercial-furniture-manufacturing">
              commercial furniture manufacturing guide
            </Link>{' '}
            covers how construction decisions at the factory level translate into product performance
            in the field. Healthcare specifications are one of the highest-stakes applications for
            those choices.
          </p>

          <div className={styles.ctaBlock}>
            <p>
              Planning a healthcare furniture project? We can walk through the specification
              requirements for your specific space type and timeline.
            </p>
            <Link href="/contact#schedule" className={styles.ctaLink}>
              Schedule a Conversation
            </Link>
          </div>

          <section className={styles.faq} aria-label="Frequently asked questions">
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>

            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>
                Why does healthcare furniture fail faster than standard commercial furniture?
              </p>
              <p className={styles.faqAnswer} data-speakable="answer">
                The cleaning chemicals used in clinical environments are far more aggressive than
                what standard commercial furniture is built to resist. Hospital-grade disinfectant
                wipes applied many times a day break down residential and lightly specified
                commercial finishes within months. Surfaces crack, upholstery seams open, and
                substrate materials swell when moisture gets under inadequate edge treatments.
                Healthcare furniture must be specified for chemical resistance from the start, not
                retrofitted.
              </p>
            </div>

            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>
                What does CAL TB 117-2013 mean for healthcare upholstery?
              </p>
              <p className={styles.faqAnswer} data-speakable="answer">
                California Technical Bulletin 117-2013 (CAL TB 117-2013) is a flammability standard
                for upholstered furniture. It requires that seating and upholstered items meet
                smolder and open-flame resistance tests. Many healthcare facilities require CAL TB
                117-2013 compliance as a baseline for all upholstered pieces. Confirm that any
                piece you specify carries a compliant test report from the fabric or foam supplier.
              </p>
            </div>

            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>
                What is bariatric seating and when do I need to specify it?
              </p>
              <p className={styles.faqAnswer} data-speakable="answer">
                Bariatric seating is weight-rated seating built for higher load capacities than
                standard chairs. Healthcare waiting areas and patient spaces should include a
                portion of rated bariatric seating to serve the full range of patients without
                requiring staff intervention or special accommodation. The exact quantity to
                specify depends on your facility type, space use, and patient population. Specify
                rated seating rather than relying on visual estimates of frame strength.
              </p>
            </div>

            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>
                Why does an open-base chair design matter for infection control?
              </p>
              <p className={styles.faqAnswer} data-speakable="answer">
                Open-base chair designs, sometimes called clean-out or cantilevered-leg designs,
                allow housekeeping staff to reach under and around the chair frame with mops and
                disinfectant equipment without moving the chair. Enclosed pedestal bases and
                solid-panel chair sides create hidden zones where pathogens can accumulate and go
                uncleaned during routine housekeeping. In clinical and high-traffic patient spaces,
                open-base geometry is a practical infection-control specification.
              </p>
            </div>
          </section>
        </div>

        <div className={styles.authorCard}>
          <div className={styles.authorAvatar}>D</div>
          <div className={styles.authorInfo}>
            <strong>DMD Furnishing Editorial Team</strong>
            <span>Commercial Furniture Specialists</span>
          </div>
        </div>
      </article>
      <RelatedPosts currentSlug="healthcare-furniture-guide" />
    </main>
  );
}
