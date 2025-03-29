
import { supabase } from "@/integrations/supabase/client";

// Use hardcoded values from the client since the methods don't exist
const SUPABASE_URL = "https://igftaultyeudvtytgyrg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZnRhdWx0eWV1ZHZ0eXRneXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNDA5NDcsImV4cCI6MjA1ODcxNjk0N30.LEwv_bkuEkt4tWzL7eaCm9JXu4qM_ByH95QKBJ5udFo";

// Get the base URL and API key
export const getSupabaseUrl = () => {
  return SUPABASE_URL;
};

export const getPublicApiKey = () => {
  return SUPABASE_KEY;
};

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

// Fetch products with direct fetch as a fallback when Supabase client fails
export const fetchProductsWithDirectFetch = async (options: { 
  category?: string | string[]; 
  orderBy?: string[];
  useMockOnFailure?: boolean;
}) => {
  const baseUrl = getSupabaseUrl();
  const apiKey = getPublicApiKey();
  
  try {
    console.log("Direct fetch attempt starting with options:", JSON.stringify(options));
    
    // Build the query parameters
    let queryParams = 'select=*';
    
    // Add category filter if provided
    if (options.category) {
      if (Array.isArray(options.category)) {
        queryParams += `&category=in.(${options.category.join(',')})`;
      } else {
        queryParams += `&category=eq.${options.category}`;
      }
    }
    
    // Add ordering if provided
    if (options.orderBy && options.orderBy.length > 0) {
      options.orderBy.forEach(order => {
        queryParams += `&order=${order}`;
      });
    }
    
    // Log the full request URL for debugging
    console.log(`Making direct fetch request to: ${baseUrl}/rest/v1/products?${queryParams}`);
    
    // Make the fetch request with proper headers
    const response = await fetch(
      `${baseUrl}/rest/v1/products?${queryParams}`, 
      {
        method: 'GET',
        headers: {
          'apikey': apiKey,
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Prefer': 'return=representation'
        }
      }
    );
    
    // Check for HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => response.text());
      console.error('Direct fetch failed with status:', response.status, errorData);
      
      // If mock data is requested and fetch failed, return mock data
      if (options.useMockOnFailure) {
        console.log("Returning mock data due to fetch failure");
        return { data: getMockProductData(options.category), error: null };
      }
      
      return { data: null, error: JSON.stringify(errorData) };
    }
    
    const data = await response.json();
    console.log("Direct fetch successful, retrieved items:", data?.length || 0);
    
    // Return empty array instead of null for easier handling
    return { data: data || [], error: null };
  } catch (error) {
    console.error('Exception in direct fetch:', error);
    
    // If mock data is requested and there was an exception, return mock data
    if (options.useMockOnFailure) {
      console.log("Returning mock data due to exception");
      return { data: getMockProductData(options.category), error: null };
    }
    
    return { data: [], error: String(error) };
  }
};

// Fetch products using both direct fetch and Supabase client with fallback to mock data
export const fetchProductsWithFallback = async (options: {
  category?: string | string[];
  orderBy?: string[];
}) => {
  try {
    // First try direct fetch
    const directResult = await fetchProductsWithDirectFetch(options);
    
    // If direct fetch was successful, return the result
    if (!directResult.error && directResult.data && directResult.data.length > 0) {
      return directResult;
    }
    
    console.log("Direct fetch failed or returned no data, trying Supabase client");
    
    // If direct fetch failed, try Supabase client
    let query = supabase.from("products").select("*");
    
    // Add category filter if provided
    if (options.category) {
      if (Array.isArray(options.category)) {
        query = query.in("category", options.category);
      } else {
        query = query.eq("category", options.category);
      }
    }
    
    // Add ordering if provided
    if (options.orderBy && options.orderBy.length > 0) {
      options.orderBy.forEach(order => {
        const [column, direction] = order.split(".");
        query = query.order(column, { ascending: direction === "asc" });
      });
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Supabase client failed:", error);
      
      // Both methods failed, return mock data as last resort
      console.log("Both fetch methods failed, returning mock data");
      return { data: getMockProductData(options.category), error: null };
    }
    
    console.log("Supabase client successful, retrieved items:", data?.length || 0);
    return { data, error: null };
  } catch (error) {
    console.error("Exception in fetchProductsWithFallback:", error);
    
    // Unexpected error, return mock data
    console.log("Exception occurred, returning mock data");
    return { data: getMockProductData(options.category), error: null };
  }
};
