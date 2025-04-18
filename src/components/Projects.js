import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Projects.css';

function Projects() {
  const navigate = useNavigate();
  
  // Add scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const projectGrid = document.querySelector('.project-grid');
      if (projectGrid) {
        const scrollPosition = window.scrollY;
        const heroHeight = document.querySelector('.projects-hero').offsetHeight;
        
        if (scrollPosition > heroHeight * 0.5) {
          projectGrid.style.opacity = '1';
          projectGrid.style.transform = 'translateY(0)';
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="projects-container">
      <section className="projects-hero">
        <h1>Recent Projects</h1>
        <p>Explore our latest furniture installations and designs</p>
      </section>

      <div className="project-grid">
        <div className="project-card">
          <div className="card-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}></div>
          <div className="card-content">
            <h3>Quality Inn - Gainesville, FL</h3>
            <p className="project-location">Hospitality</p>
            <p className="project-description">
              Complete furnishing solution for a hotel renovation, including guest rooms, 
              lobby, and dining areas with custom-designed furniture pieces.
            </p>
            <button className="view-project" onClick={() => navigate('/projects/quality-inn-gainesville')}>View Project Details</button>
          </div>
        </div>

        <div className="project-card">
          <div className="card-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}></div>
          <div className="card-content">
            <h3>Towne Lyne Motel - Ogunquit, ME</h3>
            <p className="project-location">Hospitality</p>
            <p className="project-description">
              Custom-designed furniture for a boutique motel, featuring coastal-inspired 
              pieces that blend comfort with local aesthetic elements.
            </p>
            <button className="view-project" onClick={() => navigate('/projects/towne-lyne-motel-ogunquit')}>View Project Details</button>
          </div>
        </div>

        <div className="project-card">
          <div className="card-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}></div>
          <div className="card-content">
            <h3>Marriott Courtyard - Boston, MA</h3>
            <p className="project-location">Hospitality</p>
            <p className="project-description">
              Complete furnishing package for guest rooms and common areas, 
              featuring custom-designed pieces that reflect the brand's identity and local culture.
            </p>
            <button className="view-project" onClick={() => navigate('/projects/marriott-courtyard-boston')}>View Project Details</button>
          </div>
        </div>

        <div className="project-card">
          <div className="card-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}></div>
          <div className="card-content">
            <h3>Hampton Inn - Portland, OR</h3>
            <p className="project-location">Hospitality</p>
            <p className="project-description">
              Comprehensive furniture solution for a hotel renovation, including custom beds, 
              seating, and case goods designed for durability and style.
            </p>
            <button className="view-project" onClick={() => navigate('/projects/hampton-inn-portland')}>View Project Details</button>
          </div>
        </div>

        <div className="project-card">
          <div className="card-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}></div>
          <div className="card-content">
            <h3>Hilton Garden Inn - Miami, FL</h3>
            <p className="project-location">Hospitality</p>
            <p className="project-description">
              Modern furnishing package for a newly constructed hotel, featuring contemporary designs 
              that complement the vibrant Miami atmosphere.
            </p>
            <button className="view-project" onClick={() => navigate('/projects/hilton-garden-inn-miami')}>View Project Details</button>
          </div>
        </div>

        <div className="project-card">
          <div className="card-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`}}></div>
          <div className="card-content">
            <h3>Ocean View Resort - San Diego, CA</h3>
            <p className="project-location">Hospitality</p>
            <p className="project-description">
              Luxury furnishing solution for a beachfront resort, featuring custom pieces 
              designed to withstand coastal conditions while providing exceptional comfort.
            </p>
            <button className="view-project" onClick={() => navigate('/projects/ocean-view-resort-san-diego')}>View Project Details</button>
          </div>
        </div>
      </div>

      <section className="project-categories">
        <h2>Browse Projects by Category</h2>
        <div className="category-buttons">
          <button className="category-button active">All Projects</button>
          <button className="category-button">Hotels & Resorts</button>
          <button className="category-button">Restaurants</button>
          <button className="category-button">Corporate Offices</button>
          <button className="category-button">Retail Spaces</button>
        </div>
      </section>

      <section className="project-cta">
        <h2>Ready to Start Your Project?</h2>
        <p>Let us help you create exceptional spaces with our premium furniture solutions.</p>
        <button className="cta-button">Schedule a Consultation</button>
      </section>
    </div>
  );
}

export default Projects;