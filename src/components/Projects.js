import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Projects.css';
import styles from '../styles/AboutUs.module.css';
import { loadProjectsData } from '../data/projects';
// SEO: centralized helpers
import { setPageSEO, setBreadcrumbJsonLd } from '../utils/seo';

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

  // SEO: Projects listing page
  useEffect(() => {
    const originTitle = 'DMD Furnishing';
    setPageSEO({
      title: `Projects | ${originTitle}`,
      description: 'Explore recent furniture installations and designs by DMD Furnishing.',
      canonicalPath: '/projects',
      image: undefined,
      type: 'website'
    });
    setBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' }
    ]);
  }, []);

  return (
    <div className="projects-container">
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
            <div key={project.id} className="project-card">
              <div
                className="card-image"
                style={{
                  backgroundImage: project.mainImage ? `url('${project.mainImage}')` : undefined
                }}
                aria-label={project.mainImageAlt || project.name}
              ></div>
              <div className="card-content">
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
        <button className="cta-button">Schedule a Consultation</button>
      </section>
    </div>
  );
}

export default Projects;
