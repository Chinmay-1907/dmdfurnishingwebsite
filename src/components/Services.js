import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Services.css';
import SEO from './SEO';
import { setPageSEO } from '../utils/seo';

// Process Steps Data
const processSteps = [
  {
    number: '01',
    title: 'Consultation & Scope Alignment',
    description: 'Establishing project goals, budget, and timeline requirements.'
  },
  {
    number: '02',
    title: 'Design Support & Specifications',
    description: 'Detailed product specifications and material coordination.'
  },
  {
    number: '03',
    title: 'Manufacturing & Sourcing',
    description: 'Production oversight across domestic and global facilities.'
  },
  {
    number: '04',
    title: 'Quality Review & Readiness',
    description: 'Comprehensive checks to ensure specifications are met.'
  },
  {
    number: '05',
    title: 'Delivery & Installation Coordination',
    description: 'Managed logistics and site sequencing for efficient install.'
  },
  {
    number: '06',
    title: 'Project Close-Out & Follow-Up',
    description: 'Final verification and post-project support.'
  }
];

// Core Services Data
const coreServices = [
  {
    id: 'design-consultation',
    title: 'Consultation & Project Discovery',
    description: 'Every project begins with a detailed consultation focused on understanding scope, functional needs, timelines, and budget considerations. Where appropriate, we collaborate with clients, designers, and contractors to review layouts, usage requirements, and space constraints—supporting informed decisions early in the process.',
    points: ['Requirement alignment', 'Scope clarification', 'Early-stage feasibility input'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
    )
  },
  {
    id: 'design-support',
    title: 'Design Support & Specifications',
    description: 'We provide design support to help translate project intent into clear furniture specifications. This includes material selection, finish coordination, dimensional planning, and alignment with brand or operational requirements.',
    points: ['Material & finish selection', 'Space planning support', 'Custom furniture detailing', 'Specification coordination'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
    )
  },
  {
    id: 'custom-manufacturing',
    title: 'Manufacturing & Sourcing',
    description: 'To support a wide range of project needs, we operate through a hybrid manufacturing and sourcing model, combining domestic production capabilities with an established overseas supply chain. Domestic manufacturing supports projects requiring shorter lead times, prototyping, phased deliveries, or revisions. Overseas manufacturing and sourcing allows scalable production and material flexibility for larger programs.',
    points: ['Domestic & global manufacturing coordination', 'Custom and program-based production', 'Quality oversight and specification alignment'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M13 11V7"/><path d="M17 15h-8"/></svg>
    )
  },
  {
    id: 'ffe-project-management',
    title: 'FF&E (Furniture & Fixtures) Project Management',
    description: 'End-to-end furniture and fixture project management for hospitality environments, from design coordination through manufacturing and installation. We manage specifications, production, logistics, and on-site execution to deliver projects on time and on brand.',
    points: ['Specification management', 'Production & logistics oversight', 'On-site execution'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/></svg>
    )
  },
  {
    id: 'logistics',
    title: 'Logistics & Delivery Coordination',
    description: 'We coordinate logistics and delivery planning to align with project schedules and site readiness. This includes packaging coordination, delivery sequencing, and staging considerations to support efficient installation.',
    points: ['Delivery planning', 'Staging and sequencing support', 'Coordination with site schedules'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2" ry="2"/><line x1="16" y1="8" x2="20" y2="8"/><line x1="16" y1="16" x2="23" y2="16"/><path d="M16 12h4a2 2 0 0 1 2 2v2h-2"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/></svg>
    )
  },
  {
    id: 'installation-setup',
    title: 'Installation Support',
    description: 'Installation services are provided through experienced teams and trusted partners, depending on project location and scope. Our role focuses on coordination, sequencing, and readiness—supporting a smooth transition from delivery to final placement.',
    points: ['Installation coordination', 'Assembly oversight', 'Final placement support'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    )
  }
];

const industries = ['Hospitality', 'Corporate & Office', 'Commercial & Multi-Family'];

const whyChooseUsPoints = [
  'Project-focused execution',
  'Hybrid manufacturing flexibility',
  'Clear communication and coordination',
  'Experience with renovation and repeat-project cycles',
  'Practical solutions designed for real-world use'
];

function Services() {
  const navigate = useNavigate();
  
  useEffect(() => {
    setPageSEO({
      title: 'Commercial Furniture Services | Custom Manufacturing & Project Solutions',
      description: 'Comprehensive commercial furniture services including custom manufacturing, project-based solutions, and global sourcing for hospitality and corporate environments.',
      canonicalPath: '/services'
    });
  }, []);

  const handleGetInTouch = () => {
    navigate('/contact');
  };

  return (
    <div className="services-container">
      <SEO 
        title="End-to-End Furniture Services"
        description="Comprehensive furniture services including design consultation, custom manufacturing, FF&E project management, and installation support for hospitality and commercial spaces."
        canonical="https://dmdfurnishing.com/services"
      />
      
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-inner">
          <span className="hero-tag">Furniture Services</span>
          <h1>Commercial Furniture Services, Built Around Your Project</h1>
          <p>From early planning to final installation, we provide project-based furniture solutions designed to support complex commercial environments.</p>

          <div className="hero-actions">
            <button className="hero-action-primary" onClick={handleGetInTouch}>Request a Consultation</button>
            <a href="#services-grid" className="hero-action-secondary">
              Explore Our Services
            </a>
          </div>
        </div>
      </section>

      <section className="services-overview" aria-labelledby="services-overview-title">
        <div className="overview-single-column">
          <p className="section-eyebrow">Services Overview</p>
          <h2 id="services-overview-title" className="section-title">Coordinated Commercial Furniture Services</h2>
          <p className="section-subheading">Integrated support for custom furniture manufacturing and project execution.</p>
          <p>
            We support hospitality and commercial projects through a coordinated service model that brings together consultation, design support, manufacturing, logistics, and installation coordination.
          </p>
          <p>
            Our approach is structured yet flexible—designed to adapt to project size, scope, and timelines while maintaining clarity at every stage.
          </p>

          <div className="industry-pills" aria-label="Industries served">
            {industries.map((industry) => (
              <span key={industry} className="industry-pill">
                {industry}
              </span>
            ))}
          </div>
          <div className="col-image" data-aos="fade-left">
            <img src="/Images/Our Services.jpg" alt="DMD Furnishing commercial furniture manufacturing and project capabilities" className="rounded-image shadow-lift" />
          </div>
        </div>
      </section>

      <section id="services-grid" className="services-grid-section">
        <div className="services-grid-intro">
          <p className="section-eyebrow">Our Core Services</p>
          <h2 className="section-title">End-to-End Project Support</h2>
        </div>
        
        <div className="services-grid">
          {coreServices.map((service) => (
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
            </div>
          ))}
        </div>
      </section>

      <section id="our-process" className="process-section">
        <div className="process-header">
          <p className="section-eyebrow">Our Process</p>
          <h2 className="section-title">Structured Execution</h2>
          <p className="section-subheading">Managing domestic and global furniture manufacturing with transparency.</p>
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

      <section className="why-choose-us-section">
        <div className="why-choose-us-content">
          <p className="section-eyebrow">Why Clients Choose Us</p>
          <h2 className="section-title">Structure & Flexibility</h2>
          <p className="why-choose-intro">
            Clients value our ability to bring structure to complex furniture projects while maintaining flexibility where it matters most.
          </p>
          <ul className="why-choose-list">
            {whyChooseUsPoints.map((point, index) => (
              <li key={index} className="why-choose-item">
                <span className="check-icon">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-cta">
        <p className="section-eyebrow">Call to Action</p>
        <h2>Ready to discuss your project?</h2>
        <p>Contact us to schedule a consultation and explore how our services can support your space.</p>
        <button className="cta-button" onClick={handleGetInTouch}>Request a Consultation</button>
      </section>
    </div>
  );
}

export default Services;
