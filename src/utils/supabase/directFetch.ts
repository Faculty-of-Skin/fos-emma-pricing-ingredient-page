
// Direct fetch implementation for Supabase data
import { getSupabaseUrl, getPublicApiKey } from './constants';
import { FetchProductsOptions } from './mockData';
import { getMockProductData } from './mockData';

// Fetch products with direct fetch as a fallback when Supabase client fails
export const fetchProductsWithDirectFetch = async (options: FetchProductsOptions) => {
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
