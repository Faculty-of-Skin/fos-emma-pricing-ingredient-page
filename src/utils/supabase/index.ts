
// Main index file for Supabase utilities
import { supabase } from "@/integrations/supabase/client";
import { FetchProductsOptions } from './mockData';
import { getMockProductData } from './mockData';
import { fetchProductsWithDirectFetch } from './directFetch';

// Export functions from the other files for easy access
export * from './constants';
export * from './mockData';
export * from './directFetch';

// Fetch products using both direct fetch and Supabase client with fallback to mock data
export const fetchProductsWithFallback = async (options: FetchProductsOptions) => {
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
