import React from 'react';
import { Link } from 'react-router-dom'; // Assuming React Router is used for navigation
import styles from '../styles/AboutUs.module.css';

const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About DMD Furnishing</h1>
          <p className={styles.heroSubtitle}>Crafted for Those Who Live Design</p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Decorative pattern */}
        <div className={`${styles.decorativePattern} ${styles.patternTopRight}`}></div>
        
        {/* Company Section */}
        <section className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Company</h2>
            <p className={styles.paragraph}>
              For years, DMD Furnishing has helped shape beautiful interiors through custom-crafted furniture solutions for both commercial and residential spaces. From luxury hotels to modern offices, our work reflects a deep commitment to craftsmanship, design integrity, and personal service.
            </p>
            <p className={styles.paragraph}>
              We offer full customization and hands-on collaboration to ensure that each project not only meets expectations — but redefines them. With agile manufacturing, design-centric thinking, and a budget-conscious approach, DMD is proud to be a trusted partner to designers, property developers, and homeowners alike.
            </p>
          </div>
        </section>
        
        <div className={styles.decorativeLine}></div>
        
        {/* What We Do Section */}
        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>What We Do</h2>
            <p className={styles.paragraph}>
              At DMD, we know that no two projects are the same. Whether you're starting from a rough sketch or a refined design brief, our team partners with engineers and designers to craft pieces that fit your vision perfectly.
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Custom-built furniture tailored to specific dimensions, materials, and finishes</li>
              <li className={styles.listItem}>End-to-end project support, from ideation to delivery</li>
              <li className={styles.listItem}>Solutions that meet the design vision, timeline, and budget — every time</li>
            </ul>
            <p className={styles.paragraph}>
              From standout statement pieces to complete furnishing solutions, we turn concepts into functional art.
            </p>
          </div>
        </section>
        
        <div className={styles.decorativeLine}></div>
        
        {/* Service Section */}
        <section className={`${styles.section} ${styles.sectionLight}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Service</h2>
            <p className={styles.paragraph}>
              We believe that great design deserves great execution. That's why we focus on transparency, precision, and proactive communication throughout the entire process.
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Timely coordination with stakeholders</li>
              <li className={styles.listItem}>On-budget production with scalable flexibility</li>
              <li className={styles.listItem}>Responsive support and updates from our team</li>
            </ul>
            <p className={styles.paragraph}>
              Your vision is our blueprint. Every detail matters, and every milestone is tracked — so you can move forward with confidence.
            </p>
            <div>
              <Link 
                to="/services"
                className={`${styles.button} ${styles.primaryButton}`}
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </section>
        
        <div className={styles.decorativeLine}></div>
        
        {/* Who We Serve Section */}
        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Who We Serve</h2>
            <p className={styles.paragraph}>
              We're proud to work with:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Hospitality groups</li>
              <li className={styles.listItem}>Interior design firms</li>
              <li className={styles.listItem}>Commercial real estate developers</li>
              <li className={styles.listItem}>Homeowners with a passion for great design</li>
            </ul>
            <p className={styles.paragraph}>
              Each partnership is built on trust, collaboration, and a shared vision for quality.
            </p>
            <div>
              <Link 
                to="/testimonials"
                className={`${styles.button} ${styles.secondaryButton}`}
              >
                Read Our Testimonials
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