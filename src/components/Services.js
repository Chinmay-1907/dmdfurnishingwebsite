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

const servicePhases = [
  {
    name: 'Design Consultation',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1.618a1 1 0 0 1 .555.168l7.25 4.532a1 1 0 0 1 .445.832v8.7a1 1 0 0 1-.445.832l-7.25 4.532a1 1 0 0 1-1.11 0l-7.25-4.532A1 1 0 0 1 4 15.85V7.15a1 1 0 0 1 .445-.832l7.25-4.532A1 1 0 0 1 12 1.618z" />
        <path d="M12 22.382V12" />
        <path d="m19.45 6.15-7.45-4.532-7.45 4.532" />
        <path d="m4.55 17.85 7.45 4.532 7.45-4.532" />
        <path d="M9 12v3" />
        <path d="M15 12v3" />
      </svg>
    )
  },
  {
    name: 'Manufacturing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V6.5a2.5 2.5 0 0 0-5 0V12h5z" />
        <path d="M4 12v-2a4 4 0 0 1 8 0v2h8" />
        <path d="M18 12v5.5a2.5 2.5 0 0 1-5 0V12h5z" />
        <path d="M6 12v2a4 4 0 0 0 8 0v-2H6z" />
      </svg>
    )
  },
  {
    name: 'Delivery',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M15 12H9" />
        <path d="m12 9 3 3-3 3" />
      </svg>
    )
  },
  {
    name: 'Installation',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  }
];
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
              <div key={phase.name} className="overview-highlight">
                <div className="highlight-icon">{phase.icon}</div>
                <p>{phase.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="our-process" className="process-section">
        <div className="process-header">
          <p className="section-eyebrow">Our Process</p>
          <h2>A Journey from Concept to Creation</h2>
          <p>
            We follow a meticulously planned process to ensure every project is a seamless success. From the initial spark of an idea to the final installation, we're with you every step of the way.
          </p>
        </div>

        <div className="process-stepper">
          {processSteps.map((step, index) => (
            <div key={step.number} className="step">
              <div className="step-number">
                <span>{step.number}</span>
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
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
