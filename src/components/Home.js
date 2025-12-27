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
    '/Images/Tailored_Guestroom_Collections.jpg',
    '/Images/Elevated_Restaurant_Seating.jpg',
    '/Images/Modern_Social_Lounges.jpg',
    '/images/Outdoor.jpg'
  ];

  return (
    <div className="home-container">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <Slider {...sliderSettings} className="hero-slider">
          {heroImages.map((img, index) => (
            <div key={index} className="hero-slide">
               <div className="slide-image-wrapper">
                  <img src={img} alt={`Hospitality Furniture ${index + 1}`} className="slide-image" />
               </div>
            </div>
          ))}
        </Slider>
        
        {/* Static Overlay Content */}
        <div className="hero-static-overlay">
          <div className="hero-content-wrapper">
             <h1 data-aos="fade-up">Custom Hospitality Furniture.<br/>Designed. Manufactured. Delivered.</h1>
             <p className="hero-subheadline" data-aos="fade-up" data-aos-delay="100">
               End-to-end FF&E solutions for hotels, motels, restaurants, and commercial spaces — built to meet brand standards, timelines, and budgets.
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
              DMD Furnishing partners with owners, operators, designers, and project teams who need reliable, high-quality furniture solutions for active and future spaces.
            </p>
          </div>
          
          <div className="segments-grid">
            <div className="segment-card" data-aos="fade-up">
              <div className="icon-wrapper"><FaHotel className="segment-icon" /></div>
              <h3>Hotels & Motels</h3>
            </div>
            <div className="segment-card" data-aos="fade-up" data-aos-delay="100">
              <div className="icon-wrapper"><FaUtensils className="segment-icon" /></div>
              <h3>Restaurants & Cafés</h3>
            </div>
            <div className="segment-card" data-aos="fade-up" data-aos-delay="200">
              <div className="icon-wrapper"><FaBuilding className="segment-icon" /></div>
              <h3>Corporate Offices & Workspaces</h3>
            </div>
            <div className="segment-card" data-aos="fade-up" data-aos-delay="300">
              <div className="icon-wrapper"><FaTools className="segment-icon" /></div>
              <h3>Franchise Renovation Projects</h3>
            </div>
             <div className="segment-card" data-aos="fade-up" data-aos-delay="400">
              <div className="icon-wrapper"><FaGraduationCap className="segment-icon" /></div>
              <h3>Universities & Educational Facilities</h3>
            </div>
             <div className="segment-card" data-aos="fade-up" data-aos-delay="500">
              <div className="icon-wrapper"><FaHospital className="segment-icon" /></div>
              <h3>Healthcare & Institutional Environments</h3>
            </div>
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
                 <h3>End-to-End Control</h3>
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
              <div className="diff-item" data-aos="fade-up" data-aos-delay="300">
                 <h3>Flexible Manufacturing Options</h3>
                 <p>Domestic and overseas production aligned to project needs.</p>
              </div>
              <div className="diff-item" data-aos="fade-up" data-aos-delay="400">
                 <h3>Reliable Execution</h3>
                 <p>Clear communication, realistic timelines, and dependable delivery.</p>
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
                  <img src="/Images/Our Services.jpg" alt="DMD Capabilities" className="rounded-image shadow-lift" />
               </div>
            </div>
         </div>
      </section>

      {/* 5. How It Works */}
      <section className="section process-section bg-dark text-light">
         <div className="container">
            <h2 className="section-title text-center text-white" data-aos="fade-up">A Clear, Proven Process</h2>
            <div className="process-steps">
               <div className="step" data-aos="fade-up" data-aos-delay="100">
                  <span className="step-number">01</span>
                  <h4>Consultation & Scope Review</h4>
               </div>
               <div className="step-divider"></div>
               <div className="step" data-aos="fade-up" data-aos-delay="200">
                  <span className="step-number">02</span>
                  <h4>Design, BOQ & Material Finalization</h4>
               </div>
               <div className="step-divider"></div>
               <div className="step" data-aos="fade-up" data-aos-delay="300">
                  <span className="step-number">03</span>
                  <h4>Manufacturing & Quality Control</h4>
               </div>
               <div className="step-divider"></div>
               <div className="step" data-aos="fade-up" data-aos-delay="400">
                  <span className="step-number">04</span>
                  <h4>Delivery, Installation & Close-Out</h4>
               </div>
            </div>
            <p className="text-center mt-6 text-muted-light" data-aos="fade-in" data-aos-delay="500">Transparent communication at every stage — no surprises.</p>
         </div>
      </section>

      {/* 6. Selected Projects */}
      <section className="section projects-section">
         <div className="container">
            <h2 className="section-title text-center" data-aos="fade-up">Selected Projects</h2>
            <p className="section-intro text-center" data-aos="fade-up" data-aos-delay="100">A snapshot of recent hospitality and commercial furniture projects completed by DMD Furnishing.</p>
            
            <div className="projects-grid">
               <div className="project-card" data-aos="fade-up" data-aos-delay="100">
                  <img src="/Images/Tailored_Guestroom_Collections.jpg" alt="Luxury Hotel Guestroom" />
                  <div className="project-caption">Luxury Hotel Guestroom</div>
               </div>
               <div className="project-card" data-aos="fade-up" data-aos-delay="200">
                  <img src="/Images/Elevated_Restaurant_Seating.jpg" alt="Fine Dining Restaurant" />
                  <div className="project-caption">Fine Dining Restaurant</div>
               </div>
               <div className="project-card" data-aos="fade-up" data-aos-delay="300">
                  <img src="/Images/Modern_Social_Lounges.jpg" alt="Corporate Lounge" />
                  <div className="project-caption">Corporate Lounge</div>
               </div>
            </div>
            
            <div className="text-center mt-6" data-aos="fade-up">
               <Link to="/projects" className="btn btn-primary">View All Projects</Link>
            </div>
         </div>
      </section>

      {/* 7. Materials & Craftsmanship */}
      <section className="section materials-section bg-surface">
         <div className="container">
            <div className="split-layout reverse-mobile">
               <div className="col-image" data-aos="fade-right">
                  <img src="/Images/About_DMD_Furnishing_Page.jpg" alt="Quality Materials" className="rounded-image" />
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