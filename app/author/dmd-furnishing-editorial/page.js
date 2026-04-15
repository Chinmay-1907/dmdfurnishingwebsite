import Link from 'next/link';
import { generatePageMetadata, siteUrl } from '../../../lib/metadata';
import JsonLd from '../../../components/JsonLd';
import styles from './page.module.css';

export const metadata = generatePageMetadata({
  title: 'DMD Furnishing Editorial Team',
  description:
    'The DMD Furnishing editorial team. Hospitality FF&E specialists and commercial furniture manufacturing authors writing practical guides on casegoods, seating, value engineering, and procurement.',
  path: '/author/dmd-furnishing-editorial',
  image: '/DMD_Furnishing_Logo_Embedded.svg',
});

const articles = [
  {
    slug: 'what-is-ffe-hospitality',
    title: 'What Is FF&E? A Complete Guide for Hospitality Projects',
  },
  {
    slug: 'hotel-guestroom-furniture-checklist',
    title: 'Hotel Guestroom Furniture Checklist: Everything That Goes In a Room',
  },
  {
    slug: 'value-engineering-commercial-furniture',
    title: 'Value Engineering Commercial Furniture Without Losing Design Intent',
  },
  {
    slug: 'hpl-veneer-solid-wood-hotel-casegoods',
    title: 'HPL vs Veneer vs Solid Wood for Hotel Casegoods',
  },
  {
    slug: 'restaurant-seating-guide',
    title: 'Restaurant Seating Guide: Booth, Chair or Bar Stool',
  },
  {
    slug: 'ffe-procurement-timeline',
    title: 'FF&E Procurement Timeline: Concept to Install',
  },
];

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/author/dmd-furnishing-editorial#person`,
  name: 'DMD Furnishing Editorial Team',
  url: `${siteUrl}/author/dmd-furnishing-editorial`,
  jobTitle: 'Hospitality FF&E Specialists and Commercial Furniture Manufacturing Authors',
  description:
    'The DMD Furnishing editorial team. Hospitality FF&E specialists and commercial furniture manufacturing authors writing practical guides for procurement managers, interior designers, hospitality developers, and general contractors. Topics include hotel casegoods, restaurant seating, upholstery, value engineering, and the FF&E procurement workflow.',
  image: `${siteUrl}/DMD_Furnishing_Logo_Embedded.svg`,
  worksFor: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'DMD Furnishing',
    url: siteUrl,
  },
  knowsAbout: [
    'hospitality FF&E',
    'commercial furniture manufacturing',
    'hotel guestroom furniture',
    'hotel casegoods',
    'restaurant seating',
    'commercial upholstery',
    'value engineering commercial furniture',
    'FF&E procurement workflow',
    'commercial millwork',
    'healthcare and bariatric furniture',
    'contract-grade furniture specifications',
    'commercial fire safety standards',
  ],
  sameAs: ['https://www.linkedin.com/company/dmd-usaa/'],
};

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${siteUrl}/author/dmd-furnishing-editorial#profilepage`,
  url: `${siteUrl}/author/dmd-furnishing-editorial`,
  name: 'DMD Furnishing Editorial Team',
  description:
    'Profile of the DMD Furnishing editorial team. Hospitality FF&E specialists and commercial furniture manufacturing authors.',
  mainEntity: { '@id': `${siteUrl}/author/dmd-furnishing-editorial#person` },
  isPartOf: { '@id': `${siteUrl}/#website` },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Editorial Team', item: `${siteUrl}/author/dmd-furnishing-editorial` },
    ],
  },
};

export default function EditorialTeamPage() {
  return (
    <main className={styles.page}>
      <JsonLd data={personSchema} />
      <JsonLd data={profilePageSchema} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Editorial Team</p>
          <h1 className={styles.title}>DMD Furnishing Editorial Team</h1>
          <p className={styles.lede}>
            We write about how commercial and hospitality furniture actually gets specified,
            manufactured, procured, installed, and maintained. Every piece is built to be
            useful on a live project, for FF&amp;E procurement managers, interior designers,
            hospitality developers, and general contractors.
          </p>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.bodyInner}>
          <div className={styles.prose}>
            <h2>Who Writes For DMD Furnishing</h2>
            <p>
              Our content is written and reviewed by the team that runs DMD Furnishing: project
              managers, shop floor leads, procurement coordinators, and installers. These are
              the people who see what works and what fails across hotel, restaurant,
              healthcare, education, office, and multi family projects. We do not outsource
              editorial to generalist copywriters.
            </p>

            <h2>What We Cover</h2>
            <p>
              Our scope stays inside commercial FF&amp;E, the furniture, fixtures, and
              equipment that sit inside hospitality and institutional buildings. That includes
              hotel guestroom casegoods, restaurant seating, commercial upholstery, millwork,
              bariatric and healthcare furniture, educational casegoods, and the procurement
              and installation workflow that ties it all together. We reference published
              industry standards for durability, fire safety, and construction quality, and
              cite the{' '}
              <a href="https://www.ahla.com/" target="_blank" rel="noopener noreferrer">
                American Hotel &amp; Lodging Association
              </a>{' '}
              where its guidance is relevant.
            </p>

            <h2>How We Fact Check Our Work</h2>
            <p>
              Every published piece is reviewed against our own shop experience and against
              published industry standards before it goes live. We do not invent statistics.
              When a number is genuinely uncertain, like lead times, cost ranges, or warranty
              terms, we describe the range in plain language rather than quoting a specific
              figure we cannot verify.
            </p>
          </div>

          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Published Articles</h2>
            <ul className={styles.articleList}>
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/blog/${article.slug}`} prefetch={false}>
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.sidebarMeta}>
              <h3>Areas of expertise</h3>
              <ul>
                <li>Hospitality FF&amp;E</li>
                <li>Hotel casegoods and guestroom packages</li>
                <li>Restaurant banquettes and seating</li>
                <li>Healthcare and bariatric furniture</li>
                <li>Value engineering</li>
                <li>FF&amp;E procurement workflow</li>
              </ul>
            </div>
            <div className={styles.sidebarMeta}>
              <h3>Organization</h3>
              <p>
                <Link href="/about">DMD Furnishing</Link>
                <br />
                56 Leonard St Unit 5, Foxboro MA 02035
                <br />
                <a href="https://www.linkedin.com/company/dmd-usaa/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
