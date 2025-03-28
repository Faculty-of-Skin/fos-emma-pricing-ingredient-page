
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
    
    // Make the fetch request
    const response = await fetch(
      `${baseUrl}/rest/v1/products?${queryParams}`, 
      {
        headers: {
          'apikey': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Direct fetch failed:', errorText);
      return { data: null, error: errorText };
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error with direct fetch:', error);
    return { data: null, error: String(error) };
  }
};
