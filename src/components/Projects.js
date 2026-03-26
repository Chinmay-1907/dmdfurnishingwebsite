import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Projects.css';
import styles from '../styles/AboutUs.module.css';
import { loadProjectsData } from '../data/projects';
import SEO from './SEO';

function Projects() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const projectGridRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError(null);

    loadProjectsData()
      .then((data) => {
        if (isMounted) {
          setProjects(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Unable to load projects.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const gridEl = projectGridRef.current;
    if (!gridEl) {
      return undefined;
    }

    const handleScroll = () => {
      if (!heroRef.current) {
        return;
      }
      const scrollPosition = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight || 0;
      if (scrollPosition > heroHeight * 0.5) {
        gridEl.style.opacity = '1';
        gridEl.style.transform = 'translateY(0)';
      }
    };

    gridEl.style.opacity = '0';
    gridEl.style.transform = 'translateY(30px)';

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects]);


  return (
    <div className="projects-container">
      <SEO
        title="Our Projects | Commercial Furniture Installations"
        description="Explore DMD Furnishing's completed hospitality and commercial furniture projects. Custom FF&E installations for hotels, restaurants, offices, and institutional spaces."
        canonical="https://dmdfurnishing.com/projects"
      />
       <section ref={heroRef} className={styles.heroSection} style={{
        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Recent Projects</h1>
          <p className={styles.heroSubtitle}>Explore our latest furniture installations and designs</p>
        </div>
      </section>

      <section style={{ padding: '2.5rem 2rem 1rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ lineHeight: '1.8', color: 'var(--text-secondary, #b0b0b0)', fontSize: '1.05rem' }}>
          From boutique hotels to large-scale franchise renovations, our portfolio reflects a commitment to quality craftsmanship and reliable project execution.
          Each installation showcases custom-manufactured furniture designed to meet the specific needs of the space — balancing aesthetics, durability, and budget.
        </p>
      </section>

      {error && (
        <div className="project-error">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="project-loading">
          <p>Loading projects...</p>
        </div>
      )}

      {!loading && !error && (
        <div className="project-grid" ref={projectGridRef}>
          {projects.map((project) => (
            <div key={project.id} className="listing-card">
              <div
                className="listing-image"
                style={{
                  backgroundImage: project.mainImage ? `url('${project.mainImage}')` : undefined
                }}
                role="img"
                aria-label={project.mainImageAlt || `${project.name} project`}
              ></div>
              <div className="listing-content">
                <h3>{project.name}</h3>
                <p className="project-location">{project.category}</p>
                <p className="project-description">{project.shortDescription}</p>
                <button
                  className="view-project"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  View Project Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="project-empty">
          <p>No projects available right now. Please check back soon.</p>
        </div>
      )}


      <section className="project-cta">
        <h2>Ready to Start Your Project?</h2>
        <p>Let us help you create exceptional spaces with our premium furniture solutions.</p>
        <Link to="/schedule-call" style={{ textDecoration: 'none' }}>
          <button className="cta-button">Schedule a Consultation</button>
        </Link>
      </section>
    </div>
  );
}

export default Projects;
