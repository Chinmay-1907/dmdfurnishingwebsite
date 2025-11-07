import React from 'react';
import '../styles/Services.css';

const processSteps = [
  {
    number: '01',
    title: 'Initial Consultation',
    description:
      'We begin with a detailed discussion to understand your vision, requirements, and budget. Our experts will guide you through options and possibilities.'
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Our designers create custom concepts tailored to your needs, providing detailed renderings and material samples for your approval.'
  },
  {
    number: '03',
    title: 'Manufacture',
    description:
      'Once designs are approved, our skilled craftsmen begin production using premium materials and meticulous attention to detail.'
  },
  {
    number: '04',
    title: 'Shipping',
    description:
      'We carefully package and ship your furniture, coordinating logistics to ensure safe and timely delivery to your location.'
  },
  {
    number: '05',
    title: 'Installation',
    description:
      'Our professional team handles the installation process, ensuring everything is perfectly placed and assembled according to plan.'
  },
  {
    number: '06',
    title: 'Follow-up',
    description: 'Ensuring your complete satisfaction'
  }
];

const servicePhases = ['Design consultation', 'Manufacturing', 'Delivery', 'Installation'];
const industries = ['Hospitality', 'Corporate', 'Commercial'];

function Services() {
  return (
    <div className="services-container">
      <section className="services-hero">
        <div className="services-hero-inner">
          <span className="hero-tag">Furniture Solutions</span>
          <h1>Our Services</h1>
          <p>Comprehensive furniture solutions for your business</p>

          <div className="hero-actions">
            <button className="hero-action-primary">Get in Touch</button>
            <a href="#our-process" className="hero-action-secondary">
              See Our Process
            </a>
          </div>
        </div>
      </section>

      <section className="services-overview" aria-labelledby="services-overview-title">
        <div className="overview-layout">
          <div className="overview-copy">
            <p className="section-eyebrow">How We Can Help You</p>
            <h2 id="services-overview-title">DMD Furnishing offers end-to-end furniture solutions</h2>
            <p>
              DMD Furnishing offers end-to-end furniture solutions for hospitality, corporate, and commercial spaces.
            </p>
            <p>
              From design consultation to manufacturing, delivery, and installation, we handle every aspect of your project.
            </p>

            <div className="industry-pills" aria-label="Industries served">
              {industries.map((industry) => (
                <span key={industry} className="industry-pill">
                  {industry}
                </span>
              ))}
            </div>
          </div>

          <div className="overview-highlights" aria-label="Service phases">
            {servicePhases.map((phase) => (
              <div key={phase} className="overview-highlight">
                <span className="highlight-dot" />
                <p>{phase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="our-process" className="process-section">
        <div className="process-header">
          <p className="section-eyebrow">Our Process</p>
          <h2>Our Process</h2>
          <p>
            From design consultation to manufacturing, delivery, and installation, we handle every aspect of your project while ensuring your complete satisfaction.
          </p>
        </div>

        <div className="process-grid">
          {processSteps.map((step) => (
            <article key={step.title} className="process-card">
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-cta">
        <p className="section-eyebrow">Get Started</p>
        <h2>Ready to Transform Your Space?</h2>
        <p>Contact us today to discuss your furniture needs and schedule a consultation.</p>
        <div className="cta-actions">
          <button className="cta-button">Get in Touch</button>
          <a className="cta-link" href="#our-process">
            Review Our Process
          </a>
        </div>
      </section>
    </div>
  );
}

export default Services;
