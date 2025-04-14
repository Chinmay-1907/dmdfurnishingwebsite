import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Inspirations.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function InspirationDetail() {
  const { id } = useParams();
  
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Sample inspiration data - in a real app, you would fetch this based on the ID
  const inspirationData = {
    1: {
      title: 'Modern Minimalist Hotel Lobby',
      description: 'Clean lines and neutral tones create a welcoming atmosphere in this contemporary hotel lobby design.',
      fullDescription: 'This modern minimalist hotel lobby showcases the perfect balance of form and function. The carefully selected furniture pieces feature clean lines and a neutral color palette that creates a sense of calm and sophistication. The reception desk is crafted from premium materials, while the seating areas offer both comfort and style. Ambient lighting enhances the space, creating a warm and inviting atmosphere for guests upon arrival.',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Hotel',
      materials: ['Walnut Wood', 'Brushed Brass', 'Italian Marble', 'Premium Upholstery'],
      features: ['Custom Reception Desk', 'Modular Seating', 'Integrated Lighting', 'Acoustic Design'],
      relatedImages: [
        'https://images.unsplash.com/photo-1576354302919-96748cb8299e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      ]
    },
    2: {
      title: 'Luxury Restaurant Seating',
      description: 'Plush velvet seating and rich wood tones elevate this fine dining experience with sophistication and comfort.',
      fullDescription: 'This luxury restaurant design features custom seating that perfectly balances comfort and elegance. The plush velvet upholstery in deep jewel tones creates a sense of luxury, while the ergonomic design ensures guests remain comfortable throughout their dining experience. Rich wood tones and brass accents complement the seating, creating a cohesive and sophisticated aesthetic that enhances the culinary journey.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Restaurant',
      materials: ['Velvet Upholstery', 'Solid Oak', 'Brass Accents', 'Leather Details'],
      features: ['Custom Banquette Seating', 'Ergonomic Design', 'Sound Absorption', 'Stain-Resistant Fabrics'],
      relatedImages: [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      ]
    },
    3: {
      title: 'Boutique Hotel Suite',
      description: 'A perfect blend of luxury and comfort in this boutique hotel suite featuring custom-designed furniture.',
      fullDescription: 'This boutique hotel suite exemplifies the perfect marriage of luxury and comfort. Every furniture piece has been custom-designed to create a unique guest experience. The bed features a statement headboard with integrated lighting, while the seating area offers a comfortable retreat with views of the surroundings. The carefully curated furniture pieces work together to create a cohesive design that feels both luxurious and welcoming.',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Hotel',
      materials: ['Premium Linens', 'Natural Wood', 'Custom Upholstery', 'Blackout Drapery'],
      features: ['Statement Headboard', 'Integrated Technology', 'Custom Storage Solutions', 'Ambient Lighting'],
      relatedImages: [
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      ]
    },
    4: {
      title: 'Executive Lounge Design',
      description: 'Sophisticated and functional furniture creates an ideal environment for business travelers.',
      fullDescription: 'This executive lounge design caters specifically to the needs of business travelers. The furniture selection prioritizes both aesthetics and functionality, with ergonomic seating that supports productivity while maintaining a sophisticated appearance. Private pods offer quiet spaces for calls or focused work, while communal tables encourage collaboration. The material palette features rich leathers, warm woods, and subtle textures that create an atmosphere of refined professionalism.',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Corporate',
      materials: ['Premium Leather', 'Engineered Wood', 'Acoustic Panels', 'Commercial-Grade Fabrics'],
      features: ['Ergonomic Workstations', 'Private Pods', 'Integrated Power Solutions', 'Modular Design'],
      relatedImages: [
        'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      ]
    },
    5: {
      title: 'Coastal Resort Aesthetic',
      description: 'Light, airy furniture with natural materials perfectly complement this beachfront property.',
      fullDescription: 'This coastal resort design embraces the natural surroundings with furniture that complements the beachfront location. Light, airy pieces crafted from natural materials create a sense of relaxed luxury. The color palette draws inspiration from the ocean and sand, with subtle blue accents and neutral tones. Weather-resistant materials ensure durability in the coastal environment, while maintaining a high-end aesthetic that enhances the guest experience.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Resort',
      materials: ['Rattan', 'Teak Wood', 'Performance Fabrics', 'Natural Stone'],
      features: ['Weather-Resistant Construction', 'Indoor-Outdoor Versatility', 'Lightweight Design', 'UV-Protected Finishes'],
      relatedImages: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      ]
    },
    6: {
      title: 'Urban Cafe Concept',
      description: 'Industrial-inspired furniture with warm accents creates a welcoming space for this city cafe.',
      fullDescription: 'This urban cafe concept features industrial-inspired furniture with warm accents that create a welcoming atmosphere for patrons. The seating options vary from communal tables that encourage social interaction to comfortable lounge areas for longer stays. Metal frames combined with wood elements strike the perfect balance between urban edge and inviting warmth. The furniture layout optimizes flow while creating distinct zones for different types of cafe experiences.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      category: 'Cafe',
      materials: ['Reclaimed Wood', 'Powder-Coated Steel', 'Concrete', 'Industrial Leather'],
      features: ['Mixed Seating Options', 'Space Optimization', 'Durability', 'Easy Maintenance'],
      relatedImages: [
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      ]
    }
  };

  const inspiration = inspirationData[id] || {
    title: 'Inspiration Not Found',
    description: 'The inspiration you are looking for does not exist.',
    fullDescription: 'Please return to the inspirations page and select a valid inspiration.',
    image: 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Not Found',
    materials: [],
    features: [],
    relatedImages: []
  };

  return (
    <div className="inspiration-detail-container">
      <div className="inspiration-detail-hero" style={{ backgroundImage: `url(${inspiration.image})` }}>
        <div className="inspiration-detail-overlay">
          <div className="inspiration-detail-content" data-aos="fade-up">
            <span className="inspiration-category">{inspiration.category}</span>
            <h1>{inspiration.title}</h1>
            <p>{inspiration.description}</p>
          </div>
        </div>
      </div>

      <div className="inspiration-detail-body">
        <div className="inspiration-detail-section" data-aos="fade-up">
          <h2>Overview</h2>
          <p>{inspiration.fullDescription}</p>
        </div>

        <div className="inspiration-detail-columns">
          <div className="inspiration-detail-column" data-aos="fade-up">
            <h3>Materials</h3>
            <ul className="inspiration-list">
              {inspiration.materials.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </div>

          <div className="inspiration-detail-column" data-aos="fade-up" data-aos-delay="100">
            <h3>Features</h3>
            <ul className="inspiration-list">
              {inspiration.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {inspiration.relatedImages.length > 0 && (
          <div className="inspiration-detail-section" data-aos="fade-up">
            <h2>Gallery</h2>
            <div className="inspiration-gallery-grid">
              {inspiration.relatedImages.map((image, index) => (
                <div key={index} className="gallery-image" style={{ backgroundImage: `url(${image})` }}></div>
              ))}
            </div>
          </div>
        )}

        <div className="inspiration-detail-nav" data-aos="fade-up">
          <Link to="/inspirations" className="back-button">
            ← Back to Inspirations
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InspirationDetail;