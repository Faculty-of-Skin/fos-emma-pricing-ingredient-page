
import { supabase } from "@/integrations/supabase/client";

// Get the base URL and API key in a safe way
export const getSupabaseUrl = () => {
  return supabase.getUrl();
};

export const getPublicApiKey = () => {
  return supabase.getPublicKey();
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
