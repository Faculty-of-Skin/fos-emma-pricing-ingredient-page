
// Mock data generation for fallback scenarios

// Interface for the fetch options
export interface FetchProductsOptions {
  category?: string | string[];
  orderBy?: string[];
  useMockOnFailure?: boolean;
}

// Mock product data for cases when the database connection fails completely
export const getMockProductData = (category?: string | string[]) => {
  // Define common mock data
  const mockData = [
    // Equipment category
    {
      id: "mock-equip-1",
      reference: "EMMA2024-PRO",
      description: "Emma Professional Machine",
      category: "Equipment",
      importer_price: 1200,
      distributor_price: 1600,
      beauty_institute_price: 2400,
      final_consumer_price: 3200,
      importer_moq: 400,
      distributor_moq: 20,
      beauty_institute_moq: 1,
      created_at: new Date().toISOString()
    },
    // Accessories category
    {
      id: "mock-acc-1",
      reference: "EMMA-ACC-01",
      description: "Standard Handpiece",
      category: "Accessories",
      importer_price: 180,
      distributor_price: 240,
      beauty_institute_price: 320,
      final_consumer_price: 400,
      importer_moq: 100,
      distributor_moq: 10,
      beauty_institute_moq: 1,
      created_at: new Date().toISOString()
    },
    // Face capsule category
    {
      id: "mock-face-1",
      reference: "EMMA-FACE-01",
      description: "Rejuvenating Face Capsule",
      category: "Face capsule",
      importer_price: 90,
      distributor_price: 120,
      beauty_institute_price: 180,
      final_consumer_price: 220,
      importer_moq: 500,
      distributor_moq: 50,
      beauty_institute_moq: 5,
      created_at: new Date().toISOString()
    },
    // Body capsule category
    {
      id: "mock-body-1",
      reference: "EMMA-BODY-01",
      description: "Slimming Body Capsule",
      category: "Body capsule",
      importer_price: 110,
      distributor_price: 140,
      beauty_institute_price: 210,
      final_consumer_price: 250,
      importer_moq: 500,
      distributor_moq: 50,
      beauty_institute_moq: 5,
      created_at: new Date().toISOString()
    },
    // Marketing items
    {
      id: "mock-marketing-1",
      reference: "EMMA-MKT-01",
      description: "Emma Brochure Pack",
      category: "Marketing item",
      importer_price: 50,
      distributor_price: 70,
      beauty_institute_price: 90,
      final_consumer_price: null,
      importer_moq: 1000,
      distributor_moq: 100,
      beauty_institute_moq: 10,
      created_at: new Date().toISOString()
    }
  ];
  
  // Filter by category if provided
  if (category) {
    if (Array.isArray(category)) {
      return mockData.filter(item => category.includes(item.category));
    } else if (category !== "all") {
      return mockData.filter(item => item.category === category);
    }
  }
  
  return mockData;
};
