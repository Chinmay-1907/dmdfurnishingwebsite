// Product data organized in a hierarchical structure
// Top level: Institutions (Office, Hotel Room, Outdoor, etc.)
// Second level: Furniture types (Sofas, Chairs, Tables, etc.)
// Third level: Individual products with descriptions and tags

const productData = {
  institutions: [
    {
      id: 'office',
      name: 'Office',
      description: 'Professional furniture for corporate and workspace environments',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      furnitureTypes: [
        {
          id: 'office-desks',
          name: 'Desks',
          description: 'Professional work surfaces for productivity',
          products: [
            {
              id: 'executive-desk-1',
              name: 'Executive L-Shaped Desk',
              description: 'Premium L-shaped desk with built-in storage and cable management',
              image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['executive', 'l-shaped', 'storage', 'premium']
            },
            {
              id: 'standing-desk-1',
              name: 'Adjustable Standing Desk',
              description: 'Height-adjustable desk for ergonomic working positions',
              image: 'https://images.unsplash.com/photo-1544140708-514b7837c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['standing', 'adjustable', 'ergonomic']
            }
          ]
        },
        {
          id: 'office-chairs',
          name: 'Chairs',
          description: 'Ergonomic seating solutions for all-day comfort',
          products: [
            {
              id: 'luxe-executive-chair',
              name: 'Luxe Executive Chair',
              description: 'Premium ergonomic office chair with full adjustability and lumbar support',
              image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['executive', 'ergonomic', 'premium', 'adjustable']
            },
            {
              id: 'task-chair-1',
              name: 'Mesh Task Chair',
              description: 'Breathable mesh chair with essential adjustment features',
              image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['task', 'mesh', 'breathable']
            }
          ]
        },
        {
          id: 'office-storage',
          name: 'Storage',
          description: 'Organizational solutions for documents and office supplies',
          products: [
            {
              id: 'file-cabinet-1',
              name: 'Modern File Cabinet',
              description: 'Contemporary file cabinet with locking drawers',
              image: 'https://images.unsplash.com/photo-1551645120-d70bce4c2637?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['storage', 'filing', 'locking']
            }
          ]
        }
      ]
    },
    {
      id: 'hotel',
      name: 'Hotel Room',
      description: 'Luxury furniture for hospitality and guest accommodations',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      furnitureTypes: [
        {
          id: 'hotel-beds',
          name: 'Beds',
          description: 'Comfortable and stylish beds for guest rooms',
          products: [
            {
              id: 'royal-suite-bed',
              name: 'Royal Suite Bed',
              description: 'Luxury hotel bed with premium headboard and frame',
              image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['luxury', 'suite', 'premium']
            },
            {
              id: 'standard-queen-bed',
              name: 'Standard Queen Bed',
              description: 'Reliable and comfortable queen bed for standard rooms',
              image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['standard', 'queen', 'comfortable']
            }
          ]
        },
        {
          id: 'hotel-seating',
          name: 'Seating',
          description: 'Accent chairs and sofas for guest rooms',
          products: [
            {
              id: 'guest-lounge-chair',
              name: 'Guest Lounge Chair',
              description: 'Comfortable accent chair for hotel room seating',
              image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['lounge', 'accent', 'comfortable']
            }
          ]
        },
        {
          id: 'hotel-tables',
          name: 'Tables',
          description: 'Functional tables for guest rooms',
          products: [
            {
              id: 'bedside-table-1',
              name: 'Modern Bedside Table',
              description: 'Sleek nightstand with drawer and shelf',
              image: 'https://images.unsplash.com/photo-1532372320572-cda25653a694?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['nightstand', 'bedside', 'modern']
            }
          ]
        }
      ]
    },
    {
      id: 'outdoor',
      name: 'Outdoor',
      description: 'Weather-resistant furniture for patios, gardens, and outdoor spaces',
      image: 'https://images.unsplash.com/photo-1529290130-4ca3753253ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      furnitureTypes: [
        {
          id: 'outdoor-seating',
          name: 'Seating',
          description: 'Comfortable outdoor chairs and sofas',
          products: [
            {
              id: 'patio-sofa-set',
              name: 'Luxury Patio Sofa Set',
              description: 'Weather-resistant outdoor sofa set with coffee table',
              image: 'https://images.unsplash.com/photo-1529290130-4ca3753253ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['patio', 'set', 'weather-resistant', 'luxury']
            },
            {
              id: 'adirondack-chair',
              name: 'Premium Adirondack Chair',
              description: 'Classic outdoor chair made from weather-resistant materials',
              price: '$349',
              image: 'https://images.unsplash.com/photo-1559999076-f8346e86f3b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['adirondack', 'classic', 'weather-resistant']
            }
          ]
        },
        {
          id: 'outdoor-dining',
          name: 'Dining',
          description: 'Outdoor dining tables and sets',
          products: [
            {
              id: 'outdoor-dining-set',
              name: 'Teak Dining Set',
              description: '6-person outdoor dining table and chairs made from premium teak',
              price: '$3,299',
              image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['dining', 'teak', 'premium', 'set']
            }
          ]
        }
      ]
    },
    {
      id: 'restaurant',
      name: 'Restaurant & Dining',
      description: 'Elegant furniture solutions for dining establishments',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      furnitureTypes: [
        {
          id: 'dining-tables',
          name: 'Dining Tables',
          description: 'Stylish and durable tables for restaurant use',
          products: [
            {
              id: 'elegance-dining-set',
              name: 'Elegance Dining Set',
              description: 'Sophisticated dining table and chairs for upscale restaurants',
              price: '$2,899',
              image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['dining', 'elegant', 'upscale', 'set']
            }
          ]
        },
        {
          id: 'dining-chairs',
          name: 'Dining Chairs',
          description: 'Comfortable and stylish seating for diners',
          products: [
            {
              id: 'upholstered-dining-chair',
              name: 'Upholstered Dining Chair',
              description: 'Comfortable dining chair with premium upholstery',
              price: '$299',
              image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['dining', 'upholstered', 'comfortable']
            }
          ]
        }
      ]
    },
    {
      id: 'lobby',
      name: 'Lobby & Reception',
      description: 'Create stunning first impressions with our reception furniture',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      furnitureTypes: [
        {
          id: 'reception-desks',
          name: 'Reception Desks',
          description: 'Professional front desk solutions',
          products: [
            {
              id: 'modern-reception-desk',
              name: 'Modern Reception Desk',
              description: 'Contemporary front desk solution with integrated lighting',
              price: '$3,499',
              image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['reception', 'modern', 'integrated', 'lighting']
            }
          ]
        },
        {
          id: 'lobby-seating',
          name: 'Lobby Seating',
          description: 'Comfortable seating for waiting areas',
          products: [
            {
              id: 'lobby-sofa',
              name: 'Contemporary Lobby Sofa',
              description: 'Stylish and durable sofa for high-traffic areas',
              price: '$1,899',
              image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              tags: ['lobby', 'sofa', 'durable', 'contemporary']
            }
          ]
        }
      ]
    }
  ]
};

export default productData;