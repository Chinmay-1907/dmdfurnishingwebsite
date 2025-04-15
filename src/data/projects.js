// Project data organized in a structured format
// Each project contains detailed information including multiple images, specifications, and descriptions

const projectData = [
  {
    id: 'quality-inn-gainesville',
    name: 'Quality Inn - Gainesville, FL',
    category: 'Hospitality',
    shortDescription: 'Complete furnishing solution for a hotel renovation, including guest rooms, lobby, and dining areas with custom-designed furniture pieces.',
    fullDescription: 'This comprehensive renovation project for Quality Inn in Gainesville, Florida involved furnishing 120 guest rooms, the main lobby, reception area, and dining facilities. Our team worked closely with the hotel management to create a cohesive design that balanced comfort, durability, and aesthetic appeal. The project was completed over a period of 3 months, with minimal disruption to hotel operations.',
    completionDate: 'June 2022',
    clientTestimonial: 'DMD Furnishing transformed our dated property into a modern, inviting space that our guests love. The quality of the furniture and attention to detail exceeded our expectations. Their team was professional and accommodating throughout the entire process.',
    clientName: 'Robert Johnson',
    clientPosition: 'General Manager, Quality Inn Gainesville',
    mainImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Hotel lobby with modern furnishings' },
      { id: 2, url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Guest room with custom bed and seating' },
      { id: 3, url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Dining area with custom tables and chairs' },
      { id: 4, url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Reception desk and waiting area' },
      { id: 5, url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Conference room setup' }
    ],
    specifications: [
      { name: 'Project Scope', value: '120 guest rooms, lobby, dining area, reception' },
      { name: 'Timeline', value: '3 months' },
      { name: 'Furniture Items', value: '580+ pieces' },
      { name: 'Custom Designs', value: '15 unique pieces' },
      { name: 'Materials Used', value: 'Sustainable hardwoods, commercial-grade fabrics, metal accents' },
      { name: 'Color Palette', value: 'Earth tones with blue accents' }
    ],
    highlights: [
      'Custom-designed headboards for all guest rooms',
      'Ergonomic desk setups with integrated power solutions',
      'Modular lobby seating that can be reconfigured for events',
      'Dining furniture designed for heavy use while maintaining elegance',
      'ADA-compliant designs throughout the property'
    ]
  },
  {
    id: 'towne-lyne-motel-ogunquit',
    name: 'Towne Lyne Motel - Ogunquit, ME',
    category: 'Hospitality',
    shortDescription: 'Custom-designed furniture for a boutique motel, featuring coastal-inspired pieces that blend comfort with local aesthetic elements.',
    fullDescription: 'The Towne Lyne Motel in Ogunquit, Maine underwent a complete transformation to create a boutique experience that celebrates the coastal charm of the region. Our team designed and manufactured custom furniture pieces that incorporate nautical elements while providing modern comfort. The project included 45 guest rooms, a small lobby, and an outdoor lounge area, all designed to create a cohesive, memorable guest experience.',
    completionDate: 'April 2023',
    clientTestimonial: 'Working with DMD Furnishing was a pleasure from start to finish. They truly understood our vision for a coastal-inspired boutique motel and delivered furniture that perfectly captures the essence of Ogunquit. Our guests frequently comment on how beautiful and comfortable the rooms are.',
    clientName: 'Sarah Miller',
    clientPosition: 'Owner, Towne Lyne Motel',
    mainImage: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Coastal-inspired guest room' },
      { id: 2, url: 'https://images.unsplash.com/photo-1520483601560-389dff434fdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Custom bed with nautical elements' },
      { id: 3, url: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Outdoor lounge area with custom furniture' },
      { id: 4, url: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Boutique motel lobby' },
      { id: 5, url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Bathroom vanity with coastal design' }
    ],
    specifications: [
      { name: 'Project Scope', value: '45 guest rooms, lobby, outdoor lounge' },
      { name: 'Timeline', value: '4 months' },
      { name: 'Furniture Items', value: '220+ pieces' },
      { name: 'Custom Designs', value: '8 unique pieces' },
      { name: 'Materials Used', value: 'Reclaimed wood, weather-resistant fabrics, brass accents' },
      { name: 'Color Palette', value: 'Blues, whites, and natural wood tones' }
    ],
    highlights: [
      'Custom headboards featuring rope detailing',
      'Built-in storage solutions to maximize space in compact rooms',
      'Weather-resistant outdoor furniture for the coastal environment',
      'Locally-inspired design elements that tell the story of Ogunquit',
      'Sustainable materials used throughout the project'
    ]
  },
  {
    id: 'marriott-courtyard-boston',
    name: 'Marriott Courtyard - Boston, MA',
    category: 'Hospitality',
    shortDescription: 'Complete furnishing package for guest rooms and common areas, featuring custom-designed pieces that reflect the brand\'s identity and local culture.',
    fullDescription: 'For the Marriott Courtyard in Boston, we delivered a comprehensive furniture package that adheres to the brand standards while incorporating elements of Boston\'s rich history and culture. The project encompassed 200 guest rooms, an expansive lobby with multiple seating zones, a business center, and meeting spaces. Our team worked closely with Marriott\'s design team to ensure all pieces met their rigorous quality and aesthetic requirements while still providing a unique sense of place.',
    completionDate: 'November 2022',
    clientTestimonial: 'DMD Furnishing delivered exceptional quality and service for our Boston property. They navigated the complexities of our brand requirements while still creating spaces that feel uniquely Boston. The furniture has performed exceptionally well under heavy use, proving their commitment to both form and function.',
    clientName: 'Michael Chen',
    clientPosition: 'Regional Director, Marriott Hotels',
    mainImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Hotel lobby with multiple seating zones' },
      { id: 2, url: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Guest room with custom furnishings' },
      { id: 3, url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Business center with ergonomic workstations' },
      { id: 4, url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Meeting room with conference table and seating' },
      { id: 5, url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Dining area with custom tables and chairs' }
    ],
    specifications: [
      { name: 'Project Scope', value: '200 guest rooms, lobby, business center, meeting spaces' },
      { name: 'Timeline', value: '5 months' },
      { name: 'Furniture Items', value: '950+ pieces' },
      { name: 'Custom Designs', value: '12 unique pieces' },
      { name: 'Materials Used', value: 'Commercial-grade fabrics, engineered wood, metal frames' },
      { name: 'Color Palette', value: 'Marriott brand colors with Boston-inspired accents' }
    ],
    highlights: [
      'Modular lobby furniture that can adapt to changing guest needs',
      'Custom case goods with integrated technology solutions',
      'Meeting room furniture designed for quick reconfiguration',
      'Locally-inspired artwork and design elements',
      'Furniture designed to meet Marriott\'s sustainability initiatives'
    ]
  },
  {
    id: 'hampton-inn-portland',
    name: 'Hampton Inn - Portland, OR',
    category: 'Hospitality',
    shortDescription: 'Comprehensive furniture solution for a hotel renovation, including custom beds, seating, and case goods designed for durability and style.',
    fullDescription: 'The Hampton Inn in Portland, Oregon underwent a complete renovation to update their guest experience and align with the brand\'s evolving aesthetic. Our team provided a full furniture package for 150 guest rooms, the lobby, breakfast area, and fitness center. The design incorporated elements of the Pacific Northwest\'s natural beauty while maintaining the Hampton Inn\'s signature comfort and functionality. Special attention was paid to durability and ease of maintenance, ensuring the furniture would withstand heavy use while remaining attractive.',
    completionDate: 'August 2022',
    clientTestimonial: 'The furniture DMD provided has transformed our property. Not only does it look fantastic, but it\'s holding up beautifully to the demands of a busy hotel. Their team was responsive and solution-oriented throughout the entire process, making what could have been a stressful renovation into a smooth experience.',
    clientName: 'Jennifer Park',
    clientPosition: 'Operations Manager, Hampton Inn Portland',
    mainImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Hotel lobby with Pacific Northwest-inspired design' },
      { id: 2, url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Guest room with custom bed and seating' },
      { id: 3, url: 'https://images.unsplash.com/photo-1576095910326-9de5a8b5b7b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Breakfast area with durable tables and chairs' },
      { id: 4, url: 'https://images.unsplash.com/photo-1572177215152-32f247303126?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Fitness center with custom storage solutions' },
      { id: 5, url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Business center with ergonomic workstations' }
    ],
    specifications: [
      { name: 'Project Scope', value: '150 guest rooms, lobby, breakfast area, fitness center' },
      { name: 'Timeline', value: '4 months' },
      { name: 'Furniture Items', value: '700+ pieces' },
      { name: 'Custom Designs', value: '10 unique pieces' },
      { name: 'Materials Used', value: 'Stain-resistant fabrics, solid wood, laminate surfaces' },
      { name: 'Color Palette', value: 'Earth tones with green and blue accents' }
    ],
    highlights: [
      'Custom beds with integrated USB charging',
      'Breakfast area furniture designed for quick cleaning and reconfiguration',
      'Lobby seating zones that accommodate both social interaction and private work',
      'Fitness center furniture with antimicrobial properties',
      'Case goods with enhanced durability features for high-traffic areas'
    ]
  }
];

export default projectData;