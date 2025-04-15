import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Projects.css';

function Projects() {
  const navigate = useNavigate();
  return (
    <div className="projects-container">
      <section className="projects-hero">
        <h1>Recent Projects</h1>
        <p>Explore our latest furniture installations and designs</p>
      </section>

      <section className="project-gallery">
        <div className="project-item">
          <div className="project-image"></div>
          <div className="project-info">
            <h3>Quality Inn - Gainesville, FL</h3>
            <p className="project-location">Hospitality</p>
            <p className="project-description">
              Complete furnishing solution for a hotel renovation, including guest rooms, 
              lobby, and dining areas with custom-designed furniture pieces.
            </p>
            <button className="view-project" onClick={() => navigate('/projects/quality-inn-gainesville')}>View Project Details</button>
          </div>
        </div>

        <div className="project-item">
          <div className="project-image"></div>
          <div className="project-info">
            <h3>Towne Lyne Motel - Ogunquit, ME</h3>
            <p className="project-location">Hospitality</p>
            <p className="project-description">
              Custom-designed furniture for a boutique motel, featuring coastal-inspired 
              pieces that blend comfort with local aesthetic elements.
            </p>
            <button className="view-project" onClick={() => navigate('/projects/towne-lyne-motel-ogunquit')}>View Project Details</button>
          </div>
        </div>

        <div className="project-item">
          <div className="project-image"></div>
          <div className="project-info">
            <h3>Marriott Courtyard - Boston, MA</h3>
            <p className="project-location">Hospitality</p>
            <p className="project-description">
              Complete furnishing package for guest rooms and common areas, 
              featuring custom-designed pieces that reflect the brand's identity and local culture.
            </p>
            <button className="view-project" onClick={() => navigate('/projects/marriott-courtyard-boston')}>View Project Details</button>
          </div>
        </div>

        <div className="project-item">
          <div className="project-image"></div>
          <div className="project-info">
            <h3>Hampton Inn - Portland, OR</h3>
            <p className="project-location">Hospitality</p>
            <p className="project-description">
              Comprehensive furniture solution for a hotel renovation, including custom beds, 
              seating, and case goods designed for durability and style.
            </p>
            <button className="view-project" onClick={() => navigate('/projects/hampton-inn-portland')}>View Project Details</button>
          </div>
        </div>
      </section>

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