import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const detailedServices = [
  {
    id: 'design-consultation',
    title: 'Design Consultation',
    description: 'Our design team collaborates with you to translate your vision into reality. We provide material selection, space planning, and custom furniture design to perfectly match your brand aesthetic and functional requirements.',
    points: ['Material Selection', 'Space Planning', 'Custom Design', 'Brand Alignment'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    id: 'custom-manufacturing',
    title: 'Custom Manufacturing',
    description: 'We own and operate state-of-the-art manufacturing facilities. This allows us to maintain strict quality control, offer limitless customization options, and ensure timely production for projects of any scale.',
    points: ['Quality Control', 'Limitless Customization', 'Timely Production', 'Scalable Solutions'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V6.5a2.5 2.5 0 0 0-5 0V12h5z" />
        <path d="M4 12v-2a4 4 0 0 1 8 0v2h8" />
        <path d="M18 12v5.5a2.5 2.5 0 0 1-5 0V12h5z" />
        <path d="M6 12v2a4 4 0 0 0 8 0v-2H6z" />
      </svg>
    )
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Our dedicated project managers oversee every detail of your furniture procurement. We coordinate between designers, manufacturers, and on-site teams to ensure strict adherence to timelines and budgets. From the initial quote to the final punch list, we provide transparent communication and proactive problem-solving for seamless execution.',
    points: ['Timeline Adherence', 'Budget Management', 'Proactive Coordination', 'Transparent Communication'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" />
        <path d="M8 15l4 4 4-4" />
      </svg>
    )
  },
  {
    id: 'installation-services',
    title: 'Installation Services',
    description: 'We provide professional, white-glove installation services for hotels and commercial spaces. Our experienced teams handle logistics, warehousing, assembly, and placement with precision. We ensure minimal disruption to your operations and leave your space guest-ready, managing all packaging removal and final site cleanup.',
    points: ['White-Glove Service', 'Logistics & Warehousing', 'Professional Assembly', 'Site Cleanup'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  }
];

const industries = ['Hospitality', 'Corporate', 'Commercial'];

function Services() {
  const navigate = useNavigate();
  
  const handleGetInTouch = () => {
    navigate('/contact');
  };

  return (
    <div className="services-container">
      <section className="services-hero">
        <div className="services-hero-inner">
          <span className="hero-tag">Furniture Solutions</span>
          <h1>Our Services</h1>
          <p>Comprehensive furniture solutions for your business</p>

          <div className="hero-actions">
            <button className="hero-action-primary" onClick={handleGetInTouch}>Get in Touch</button>
            <a href="#services-grid" className="hero-action-secondary">
              Explore Services
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
            {detailedServices.map((phase) => (
              <a key={phase.title} href={`#${phase.id}`} className="overview-highlight" style={{textDecoration: 'none'}}>
                <div className="highlight-icon">{phase.icon}</div>
                <p>{phase.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="services-grid" className="services-grid-section">
        <div className="services-grid-intro">
          <p className="section-eyebrow">What We Do</p>
          <h2>Tailored Services for Every Project</h2>
          <p>
            Whether you need a single custom piece or a complete hotel fit-out, our comprehensive range of services ensures your project is delivered on time, on budget, and to the highest standards of quality.
          </p>
        </div>
        
        <div className="services-grid">
          {detailedServices.map((service) => (
            <div key={service.id} id={service.id} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-points">
                {service.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              <button className="learn-more" onClick={handleGetInTouch}>
                Start Your Project
              </button>
            </div>
          ))}
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
        <button className="cta-button" onClick={handleGetInTouch}>Get in Touch</button>
      </section>
    </div>
  );
}

export default Services;
