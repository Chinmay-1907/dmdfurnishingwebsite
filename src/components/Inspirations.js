import React, { useEffect } from 'react';
import '../styles/Inspirations.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../styles/AboutUs.module.css';

function Inspirations() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, mirror: false });
  }, []);

  const inspirationSections = [
    {
      title: 'Veneer & Wood Finishes',
      description: 'Explore natural wood veneers, custom stains, and grain-matched applications designed for hospitality durability and visual impact.',
      image: '/Images/Hotel/Guest Room/Head Board/Head Board.jpg', // Placeholder for wood finishes
      alt: 'Premium wood veneer finishes'
    },
    {
      title: 'Upholstery & Seating Details',
      description: 'From tailored banquettes to accent seating, our upholstery inspirations reflect durability, comfort, and refined detailing for high-traffic environments.',
      image: '/Images/Elevated_Restaurant_Seating.jpg', // Placeholder for upholstery
      alt: 'Custom upholstery and seating details'
    },
    {
      title: 'Casegoods Craftsmanship',
      description: 'Our casegoods inspirations demonstrate precision joinery, durable construction, and clean detailing engineered for repeat renovation cycles.',
      image: '/Images/Hotel/Guest Room/Night Stand/Night Stand.jpg', // Placeholder for casegoods
      alt: 'Durable hospitality casegoods'
    },
    {
      title: 'Metal & Mixed Materials',
      description: 'Mixed-material designs combine warmth and durability, supporting modern hospitality aesthetics with commercial-grade performance.',
      image: '/Images/Hotel/Breakfast Area/Dining Tables/2-Seater Table/2-Seater Table SS1.jpg', // Stainless steel table base example
      alt: 'Metal and mixed material furniture design'
    },
    {
      title: 'Statement & Feature Pieces',
      description: 'Feature pieces are designed to anchor spaces while maintaining manufacturability, durability, and brand alignment.',
      image: '/Images/Hotel/Breakfast Area/Buffet Counter/Hot Buffet Counter/Buffet Counter - Deep Navy.jpg', // Custom buffet counter
      alt: 'Statement furniture for lobbies and public spaces'
    }
  ];

  return (
    <div className="inspirations-container">
      {/* Hero Section */}
      <section className={styles.heroSection} style={{
        background: `linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.35)), url("${encodeURI('/Images/Our_Projects.jpg')}" )`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Design Inspirations</h1>
          <p className={styles.heroSubtitle}>Explore curated hospitality furniture inspirations showcasing veneers, finishes, and high-end craftsmanship.</p>
        </div>
      </section>

      {/* Inspiration Sections */}
      <section className="inspiration-sections">
        {inspirationSections.map((section, index) => (
          <div key={index} className={`inspiration-section ${index % 2 !== 0 ? 'reverse' : ''}`} data-aos="fade-up">
            <div className="inspiration-image-wrapper">
              <div 
                className="inspiration-image" 
                style={{ backgroundImage: `url("${encodeURI(section.image)}")` }}
                aria-label={section.alt}
              />
            </div>
            <div className="inspiration-content">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Design Collaboration Callout */}
      <section className="design-collaboration" data-aos="fade-up">
        <div className="collaboration-content">
          <h2>Design Collaboration</h2>
          <p>These inspirations represent our material and craftsmanship capabilities. Our team works closely with project stakeholders to translate concepts into custom, project-ready furniture solutions.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="inspirations-cta" data-aos="fade-up">
        <h2>Ready to bring your design vision to life?</h2>
        <div className="cta-actions">
          <Link to="/contact" className="cta-button primary">Request Material Samples or Design Support</Link>
        </div>
      </section>
    </div>
  );
}

export default Inspirations;
