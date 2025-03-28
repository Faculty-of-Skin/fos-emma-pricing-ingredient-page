
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

// Fetch products with direct fetch as a fallback when Supabase client fails
export const fetchProductsWithDirectFetch = async (options: { 
  category?: string | string[]; 
  orderBy?: string[];
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
      return { data: null, error: JSON.stringify(errorData) };
    }
    
    const data = await response.json();
    console.log("Direct fetch successful, retrieved items:", data?.length || 0);
    
    // Return empty array instead of null for easier handling
    return { data: data || [], error: null };
  } catch (error) {
    console.error('Exception in direct fetch:', error);
    return { data: [], error: String(error) };
  }
};
