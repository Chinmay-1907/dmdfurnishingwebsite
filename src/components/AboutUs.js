import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/AboutUs.module.css';
import SEO from './SEO';

// Header image
const HERO_IMAGE_URL = '/images/About_DMD_Furnishing_Page.jpg';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.aboutContainer}>
      <SEO 
        title="About Us | Commercial Furniture Manufacturing" 
        description="DMD Furnishing provides custom commercial furniture and FF&E solutions for hotels, restaurants, and institutional spaces. Learn about our story, process, and commitment to quality."
        canonical="https://dmdfurnishing.com/about"
      />
      {/* Hero Section */}
      <section
        className={styles.heroSection}
        style={{
          background:
            `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('${HERO_IMAGE_URL}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Built for Commercial Spaces.<br/>Designed for Real-World Use.</h1>
          <p className={styles.heroSubtitle}>
            We provide thoughtfully designed, well-crafted furniture solutions for hospitality and commercial projects—combining practical design, reliable manufacturing, and hands-on project coordination.
          </p>
        </div>
      </section>
      
      <div className={styles.mainContent}>
        {/* Decorative pattern */}
        <div className={`${styles.decorativePattern} ${styles.patternTopRight}`}></div>
        
        {/* Our Story Section */}
        <section className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <p className={styles.paragraph}>
              Our company was established with a simple goal: to make commercial furniture sourcing more dependable and more transparent.
            </p>
            <p className={styles.paragraph}>
              In many projects, delays, unclear specifications, and inconsistent quality create unnecessary challenges. We built our approach around clarity—clear communication, defined scopes, and coordinated execution from start to finish.
            </p>
            <p className={styles.paragraph}>
              By aligning design intent with manufacturing realities, we help clients move projects forward with confidence.
            </p>
          </div>
        </section>
        
        <div className={styles.decorativeLine}></div>
        
        {/* What We Do Section */}
        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>What We Do</h2>
            <p className={styles.paragraph}>
              We support commercial projects with furniture solutions tailored to real-world use, timelines, and budgets.
            </p>
            <p className={styles.paragraph}><strong>Our services include:</strong></p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Custom furniture design and detailing</li>
              <li className={styles.listItem}>Casegoods and seating manufacturing</li>
              <li className={styles.listItem}>FF&E coordination</li>
              <li className={styles.listItem}>Project-based sourcing and fabrication</li>
              <li className={styles.listItem}>Delivery and installation coordination support</li>
            </ul>
            <p className={styles.paragraph}>
              Each project is approached with attention to durability, functionality, and long-term value.
            </p>
          </div>
        </section>
        
        <div className={styles.decorativeLine}></div>
        
        {/* How We Work Section */}
        <section className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>How We Work</h2>
            <p className={styles.paragraph}>
              Our process is structured, collaborative, and designed to reduce uncertainty at every stage.
            </p>
            
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>1</div>
                <h3>Consultation & Requirements</h3>
                <p>We begin by understanding project scope, usage needs, timelines, and constraints.</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>2</div>
                <h3>Design & Specifications</h3>
                <p>Materials, dimensions, finishes, and compliance considerations are aligned before production.</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>3</div>
                <h3>Manufacturing & Quality Review</h3>
                <p>Production is managed with a focus on consistency and project readiness.</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>4</div>
                <h3>Delivery & Installation Coordination</h3>
                <p>We support smooth delivery and on-site coordination to meet project schedules.</p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.decorativeLine}></div>

        {/* Our Manufacturing Approach Section */}
        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Our Manufacturing Approach</h2>
            <p className={styles.paragraph}>
              Commercial projects often require a balance between efficiency, quality, and schedule reliability. To support this, we operate with a hybrid manufacturing and sourcing model that combines domestic production capabilities with an established overseas supply chain.
            </p>
            <p className={styles.paragraph}>
              Domestic manufacturing allows us to support projects that require shorter lead times, revisions, or phased deliveries. It also provides closer oversight during prototyping, quality checks, and final adjustments.
            </p>
            <p className={styles.paragraph}>
              Overseas manufacturing and sourcing enables scalable production and material flexibility for larger-volume programs, while maintaining consistent specifications and finish standards.
            </p>
            <p className={styles.paragraph}>
              By aligning both capabilities under one coordinated process, we help clients reduce risk, manage timelines more effectively, and adapt to real-world project changes without disruption.
            </p>
            
            <p className={styles.paragraph}><strong>This approach helps our clients by:</strong></p>
            <ul className={styles.checkList}>
              <li className={styles.checkItem}>Reducing dependency on a single production source</li>
              <li className={styles.checkItem}>Allowing flexibility when project scope or timelines evolve</li>
              <li className={styles.checkItem}>Supporting consistent quality across phases and locations</li>
              <li className={styles.checkItem}>Balancing cost considerations with execution reliability</li>
            </ul>
          </div>
        </section>

        <div className={styles.decorativeLine}></div>
        
        {/* Who We Serve Section */}
        <section className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Who We Serve</h2>
            <p className={styles.paragraph}>
              We work with clients across a range of commercial environments, including:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link to="/products/hotel">Hotels & Motels</Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/products/hotel">Multi-family and Residential Developments</Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/products/restaurant">Restaurants & Cafés</Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/products/corporate">Corporate and Office Spaces</Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/products/university">Educational</Link> and <Link to="/products/healthcare">Healthcare-adjacent Facilities</Link>
              </li>
            </ul>
            <p className={styles.paragraph}>
              Each category brings unique requirements, and our approach adapts accordingly.
            </p>
          </div>
        </section>

        <div className={styles.decorativeLine}></div>

        {/* What Sets Us Apart Section */}
        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>What Sets Us Apart</h2>
            <ul className={styles.checkList}>
              <li className={styles.checkItem}>Project-focused approach rather than one-size-fits-all solutions</li>
              <li className={styles.checkItem}>Practical customization without unnecessary complexity</li>
              <li className={styles.checkItem}>Clear communication and scope alignment</li>
              <li className={styles.checkItem}>Experience supporting renovation and repeat-project cycles</li>
              <li className={styles.checkItem}>Designs developed with durability and long-term use in mind</li>
            </ul>
          </div>
        </section>

        <div className={styles.decorativeLine}></div>

        {/* Our Commitment Section */}
        <section className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Our Commitment</h2>
            <p className={styles.paragraph}>
              We are committed to delivering furniture solutions that balance design intent, functionality, and execution reliability.
            </p>
            <p className={styles.paragraph}><strong>Our work is guided by:</strong></p>
            <div className={styles.valuesGrid}>
              <div className={styles.valueItem}>Quality craftsmanship</div>
              <div className={styles.valueItem}>Transparent communication</div>
              <div className={styles.valueItem}>Respect for timelines and budgets</div>
              <div className={styles.valueItem}>Long-term client relationships</div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className={`${styles.section} ${styles.ctaSection}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.ctaTitle}>Have a project in mind?</h2>
            <p className={styles.ctaText}>
              We welcome the opportunity to discuss your requirements and explore the right furniture solution for your space.
            </p>
            <div className={styles.ctaButtonWrapper}>
              <Link 
                to="/contact"
                className={`${styles.button} ${styles.primaryButton}`}
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </section>
        
        {/* Decorative pattern */}
        <div className={`${styles.decorativePattern} ${styles.patternBottomLeft}`}></div>
      </div>
    </div>
  );
};

export default AboutUs;