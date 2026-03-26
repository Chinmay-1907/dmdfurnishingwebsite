import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaHotel, FaUtensils, FaBuilding, FaTools, FaGraduationCap, FaHospital } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import SEO from './SEO';

function Home() {
  useEffect(() => {
    AOS.init({
      offset: 60,
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  const [autoplay, setAutoplay] = useState(true);

  // Custom Arrows
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style }}
        onClick={(e) => {
          setAutoplay(false);
          if (onClick) onClick(e);
        }}
        role="button"
        aria-label="Previous Slide"
      />
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style }}
        onClick={(e) => {
          setAutoplay(false);
          if (onClick) onClick(e);
        }}
        role="button"
        aria-label="Next Slide"
      />
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    arrows: false 
  };

  // Hero Background Images
  const heroImages = [
    { src: '/Images/Tailored_Guestroom_Collections.jpg', alt: 'Tailored hotel guestroom furniture collection' },
    { src: '/Images/Elevated_Restaurant_Seating.jpg', alt: 'Elevated restaurant seating and dining furniture' },
    { src: '/Images/Modern_Social_Lounges.jpg', alt: 'Modern social lounge furniture for hotels' },
    { src: '/Images/Outdoor.jpg', alt: 'Durable outdoor hospitality furniture' }
  ];

  const pageDescription = 'Custom hospitality furniture designed, manufactured & installed by DMD Furnishing. End-to-end FF&E solutions for hotels, restaurants & offices. Free consultation.';

  // Homepage-specific WebPage schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://dmdfurnishing.com/#webpage",
    "url": "https://dmdfurnishing.com/",
    "name": "Custom Hospitality Furniture & FF&E Solutions | DMD Furnishing",
    "description": pageDescription,
    "isPartOf": { "@id": "https://dmdfurnishing.com/#website" },
    "about": { "@id": "https://dmdfurnishing.com/#organization" },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://dmdfurnishing.com/Images/Tailored_Guestroom_Collections.jpg"
    }
  };

  // ItemList schema for "Who We Serve" section
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Markets Served by DMD Furnishing",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Hotels & Motels", "url": "https://dmdfurnishing.com/products/hotels-motels" },
      { "@type": "ListItem", "position": 2, "name": "Restaurants & Cafes", "url": "https://dmdfurnishing.com/products/restaurants-cafes" },
      { "@type": "ListItem", "position": 3, "name": "Corporate Offices", "url": "https://dmdfurnishing.com/products/office-corporate-spaces" },
      { "@type": "ListItem", "position": 4, "name": "Educational Facilities", "url": "https://dmdfurnishing.com/products/educational-facilities" },
      { "@type": "ListItem", "position": 5, "name": "Healthcare Facilities", "url": "https://dmdfurnishing.com/products/healthcare-care-facilities" }
    ]
  };

  // Combined schema array for the homepage
  const homepageSchema = [webPageSchema, itemListSchema];

  return (
    <div className="home-container">
      <SEO
        title="Custom Hospitality Furniture & FF&E Solutions"
        description={pageDescription}
        canonical="https://dmdfurnishing.com/"
        type="website"
        image="/Images/Tailored_Guestroom_Collections.jpg"
        schema={homepageSchema}
      />
      {/* 1. Hero Section */}
      <section className="hero-section">
        <Slider {...sliderSettings} className="hero-slider">
          {heroImages.map((img, index) => (
            <div key={index} className="hero-slide">
               <div className="slide-image-wrapper">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="slide-image"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchpriority={index === 0 ? "high" : undefined}
                    style={{ aspectRatio: '16/9', width: '100%', height: 'auto' }}
                  />
               </div>
            </div>
          ))}
        </Slider>
        
        {/* Static Overlay Content */}
        <div className="hero-static-overlay">
          <div className="hero-content-wrapper">
             <h1 data-aos="fade-up">Custom Hospitality Furniture.<br/>Designed. Manufactured. Delivered.</h1>
             <p className="hero-subheadline" data-aos="fade-up" data-aos-delay="100">
               End-to-end FF&E solutions for hotels, motels, restaurants, and commercial spaces built to meet brand standards, timelines, and budgets.
             </p>
             <div className="hero-cta-group" data-aos="fade-up" data-aos-delay="200">
               <Link to="/schedule-call" className="btn btn-primary">Schedule a Call</Link>
               <Link to="/contact" className="btn btn-secondary">Request a Quote</Link>
             </div>
             <p className="hero-support-text" data-aos="fade-in" data-aos-delay="300">
               Serving hospitality and commercial projects nationwide from our Massachusetts base.
             </p>
          </div>
        </div>
      </section>


      {/* 2. Who We Serve */}
      <section className="section who-we-serve">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title" data-aos="fade-up">Who We Serve</h2>
            <p className="section-intro" data-aos="fade-up" data-aos-delay="100">
              DMD Furnishing is a commercial furniture manufacturer based in Foxboro, Massachusetts, serving hotels, restaurants, corporate offices, educational facilities, and healthcare environments nationwide. We partner with owners, operators, designers, and project teams who need reliable, high-quality FF&E (Furniture, Fixtures &amp; Equipment) solutions for active and future spaces.
            </p>
          </div>
          
          <div className="segments-grid">
            <Link to="/products/hotels-motels" className="segment-card" data-aos="fade-up" style={{ textDecoration: 'none' }}>
              <div className="icon-wrapper"><FaHotel className="segment-icon" /></div>
              <h3>Hotels & Motels</h3>
            </Link>
            <Link to="/products/restaurants-cafes" className="segment-card" data-aos="fade-up" data-aos-delay="100" style={{ textDecoration: 'none' }}>
              <div className="icon-wrapper"><FaUtensils className="segment-icon" /></div>
              <h3>Restaurants & Cafés</h3>
            </Link>
            <Link to="/products/office-corporate-spaces" className="segment-card" data-aos="fade-up" data-aos-delay="200" style={{ textDecoration: 'none' }}>
              <div className="icon-wrapper"><FaBuilding className="segment-icon" /></div>
              <h3>Corporate Offices & Workspaces</h3>
            </Link>
            <Link to="/products" className="segment-card" data-aos="fade-up" data-aos-delay="300" style={{ textDecoration: 'none' }}>
              <div className="icon-wrapper"><FaTools className="segment-icon" /></div>
              <h3>Franchise Renovation Projects</h3>
            </Link>
             <Link to="/products/educational-facilities" className="segment-card" data-aos="fade-up" data-aos-delay="400" style={{ textDecoration: 'none' }}>
              <div className="icon-wrapper"><FaGraduationCap className="segment-icon" /></div>
              <h3>Universities & Educational Facilities</h3>
            </Link>
             <Link to="/products/healthcare-care-facilities" className="segment-card" data-aos="fade-up" data-aos-delay="500" style={{ textDecoration: 'none' }}>
              <div className="icon-wrapper"><FaHospital className="segment-icon" /></div>
              <h3>Healthcare & Institutional Environments</h3>
            </Link>
          </div>
          
          <div className="section-note" data-aos="fade-up" data-aos-delay="600">
            <p><strong>Note:</strong> For educational and healthcare settings, our scope includes durable, non-clinical furniture for public areas, administrative spaces, lounges, dormitories, and waiting areas.</p>
          </div>
        </div>
      </section>

      {/* 3. What Sets Us Apart */}
      <section className="section differentiators-section bg-surface">
        <div className="container">
           <h2 className="section-title text-center mb-5" data-aos="fade-up">What Sets DMD Furnishing Apart</h2>
           <div className="differentiators-grid">
              <div className="diff-item" data-aos="fade-up">
                 <h3>End-to-End Management</h3>
                 <p>Design, manufacturing, delivery, and installation managed under one accountable partner.</p>
              </div>
              <div className="diff-item" data-aos="fade-up" data-aos-delay="100">
                 <h3>Hospitality-Focused Expertise</h3>
                 <p>Furniture engineered for durability, consistency, and repeat renovation cycles.</p>
              </div>
              <div className="diff-item" data-aos="fade-up" data-aos-delay="200">
                 <h3>Custom & Value-Engineered Solutions</h3>
                 <p>Premium design balanced with cost-effective manufacturing.</p>
              </div>
              <div className="diff-item-row-last">
                <div className="diff-item" data-aos="fade-up" data-aos-delay="300">
                   <h3 style={{ 
                      fontWeight: '700', 
                      color: 'var(--color-gold)',
                      border: '2px solid var(--color-magenta)',
                      backgroundColor: 'rgba(164, 41, 99, 0.1)',
                      padding: '8px 16px',
                      display: 'inline-block',
                      borderRadius: '4px'
                   }}>Flexible Manufacturing Options</h3>
                   <p style={{ fontWeight: '500' }}>Domestic and overseas production strategically aligned to project scope, timelines, and budget.</p>
                </div>
                <div className="diff-item" data-aos="fade-up" data-aos-delay="400">
                   <h3>Reliable Execution</h3>
                   <p>Clear communication, realistic timelines, and dependable delivery.</p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* 4. Core Capabilities */}
      <section className="section capabilities-section">
         <div className="container">
            <div className="split-layout">
               <div className="col-text" data-aos="fade-right">
                  <h2 className="section-title">Our Capabilities</h2>
                  <ul className="capabilities-list">
                     <li><span className="check-icon"><FiCheck /></span> Custom Casegoods & Millwork</li>
                     <li><span className="check-icon"><FiCheck /></span> Seating & Upholstered Furniture</li>
                     <li><span className="check-icon"><FiCheck /></span> Wardrobes, Vanities & Cubicles</li>
                     <li><span className="check-icon"><FiCheck /></span> FF&E Procurement & Sourcing</li>
                     <li><span className="check-icon"><FiCheck /></span> Delivery, Installation & Project Coordination</li>
                  </ul>
                  <div className="mt-8">
                     <Link to="/services" className="btn btn-outline">Explore Our Capabilities</Link>
                  </div>
               </div>
               <div className="col-image" data-aos="fade-left">
                  <img src="/Images/Our Services.jpg" alt="Custom casegood manufacturing and furniture assembly at DMD Furnishing facility" className="rounded-image shadow-lift" loading="lazy" style={{ aspectRatio: '16/9', width: '100%', height: 'auto' }} />
               </div>
            </div>
         </div>
      </section>

      {/* 5. How It Works */}
      <section className="section process-section">
         <div className="container">
            <h2 className="section-title text-center" data-aos="fade-up">A Clear, Proven Process</h2>
            <div className="process-steps">
               <div className="step" data-aos="fade-up" data-aos-delay="100">
                  <span className="step-number">01</span>
                  <h3>Consultation & Scope Review</h3>
               </div>
               <div className="step-divider"></div>
               <div className="step" data-aos="fade-up" data-aos-delay="200">
                  <span className="step-number">02</span>
                  <h3>Design, BOQ & Material Finalization</h3>
               </div>
               <div className="step-divider"></div>
               <div className="step" data-aos="fade-up" data-aos-delay="300">
                  <span className="step-number">03</span>
                  <h3>Manufacturing & Quality Assurance</h3>
               </div>
               <div className="step-divider"></div>
               <div className="step" data-aos="fade-up" data-aos-delay="400">
                  <span className="step-number">04</span>
                  <h3>Delivery, Installation & Close-Out</h3>
               </div>
            </div>
            <p className="text-center mt-6 text-muted-light" data-aos="fade-in" data-aos-delay="500">Transparent communication at every stage - no surprises.</p>
         </div>
      </section>

      {/* 6. Selected Projects */}
      <section className="section projects-section">
         <div className="container">
            <h2 className="section-title text-center" data-aos="fade-up">Selected Projects</h2>
            <p className="section-intro text-center" data-aos="fade-up" data-aos-delay="100">A snapshot of recent hospitality and commercial furniture projects completed by DMD Furnishing.</p>
            
            <div className="projects-grid">
               <Link to="/projects" className="project-card" data-aos="fade-up" data-aos-delay="100" style={{ textDecoration: 'none' }}>
                  <img src="/Images/Tailored_Guestroom_Collections.jpg" alt="Luxury Hotel Guestroom" loading="lazy" style={{ aspectRatio: '16/9', width: '100%', height: 'auto' }} />
                  <div className="project-caption">Luxury Hotel Guestroom</div>
               </Link>
               <Link to="/projects" className="project-card" data-aos="fade-up" data-aos-delay="200" style={{ textDecoration: 'none' }}>
                  <img src="/Images/Elevated_Restaurant_Seating.jpg" alt="Fine Dining Restaurant" loading="lazy" style={{ aspectRatio: '16/9', width: '100%', height: 'auto' }} />
                  <div className="project-caption">Fine Dining Restaurant</div>
               </Link>
               <Link to="/projects" className="project-card" data-aos="fade-up" data-aos-delay="300" style={{ textDecoration: 'none' }}>
                  <img src="/Images/Modern_Social_Lounges.jpg" alt="Corporate Lounge" loading="lazy" style={{ aspectRatio: '16/9', width: '100%', height: 'auto' }} />
                  <div className="project-caption">Corporate Lounge</div>
               </Link>
            </div>
            
            <div className="text-center mt-6 cta-buttons gap-4 d-flex justify-content-center flex-wrap" data-aos="fade-up">
               <Link to="/projects" className="btn btn-primary">View All Projects</Link>
               <Link to="/inspirations" className="btn btn-outline">Browse Design Inspirations</Link>
            </div>
         </div>
      </section>

      {/* 7. Materials & Craftsmanship */}
      <section className="section materials-section bg-surface">
         <div className="container">
            <div className="split-layout reverse-mobile">
               <div className="col-image" data-aos="fade-right">
                  <img src="/Images/About_DMD_Furnishing_Page.jpg" alt="DMD Furnishing premium materials and craftsmanship" className="rounded-image" loading="lazy" style={{ aspectRatio: '16/9', width: '100%', height: 'auto' }} />
               </div>
               <div className="col-text" data-aos="fade-left">
                  <h2 className="section-title">Built with Quality Materials</h2>
                  <p className="mb-4">Our furniture is crafted using materials selected for durability, performance, and visual consistency:</p>
                  <ul className="materials-list">
                     <li>HPL and scratch-resistant laminates</li>
                     <li>Veneer and solid wood</li>
                     <li>Metal structures and commercial-grade hardware</li>
                     <li>Custom finishes and textures</li>
                  </ul>
                  <p className="mt-6 text-gold font-medium">Samples and finish options available upon request.</p>
                  <div className="mt-4">
                     <Link to="/about" className="btn btn-outline">Learn More About DMD</Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 8. Call to Action */}
      <section className="section cta-section">
         <div className="container text-center">
            <h2 className="section-title mb-5" data-aos="fade-up">Let’s Discuss Your Project</h2>
            <div className="cta-buttons gap-4 d-flex justify-content-center flex-wrap" data-aos="fade-up" data-aos-delay="100">
               <Link to="/schedule-call" className="btn btn-primary btn-lg">Schedule a Call</Link>
               <Link to="/contact" className="btn btn-secondary btn-lg">Request a Quote</Link>
            </div>
            <p className="mt-4 text-muted small-text" data-aos="fade-in" data-aos-delay="200">Free consultation • Hospitality-focused • No obligation</p>
         </div>
      </section>
    </div>
  );
}

export default Home;
