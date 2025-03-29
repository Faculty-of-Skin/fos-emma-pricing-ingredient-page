
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { fetchProductsWithFallback } from "@/utils/supabaseUtils";
import { toast as sonnerToast } from "sonner";

type Product = {
  id: string;
  reference: string;
  description: string;
  category: string;
  importer_price: number;
  distributor_price: number;
  beauty_institute_price: number;
  final_consumer_price: number | null;
  importer_moq: number;
  distributor_moq: number;
  beauty_institute_moq: number;
  created_at: string;
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchAttempt, setFetchAttempt] = useState(0);
  const [isUsingFallbackData, setIsUsingFallbackData] = useState(false);
  const { toast } = useToast();

  // Get unique categories for filter, sorted alphabetically
  const categories = ["all", ...new Set(products.map(product => product.category))].sort();

  const refetch = () => {
    setIsLoading(true);
    setFetchAttempt(prev => prev + 1);
    sonnerToast("Refreshing product data...");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setIsUsingFallbackData(false);
        console.log("Fetching products data... (attempt: " + (fetchAttempt + 1) + ")");
        
        // First try direct Supabase query without relying on user profile
        try {
          console.log("Attempting direct query first...");
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("category")
            .order("reference");
            
          if (error) {
            console.warn("Direct query failed:", error);
            throw error;
          }
          
          if (data && data.length > 0) {
            console.log("Direct query successful:", data.length, "items");
            setProducts(data);
            setFilteredProducts(data);
            return;
          }
        } catch (directError) {
          console.error("Direct query exception:", directError);
          // Continue to fallback methods
        }
        
        // Use our enhanced function with multiple fallbacks if direct query failed
        console.log("Trying fallback methods...");
        const result = await fetchProductsWithFallback({
          orderBy: ["category.asc", "reference.asc"]
        });
        
        if (result.data && result.data.length > 0) {
          console.log("Products fetch successful via fallback:", result.data.length, "items");
          setProducts(result.data);
          setFilteredProducts(result.data);
          
          // Check if we're using mock data
          const firstItem = result.data[0];
          if (firstItem.id.startsWith('mock-')) {
            console.log("Using mock data as fallback");
            setIsUsingFallbackData(true);
            setError("Unable to connect to the database. Showing sample data instead.");
            sonnerToast.warning("Using sample data - Database connection issue");
          } else {
            // If we previously had an error but now succeeded, show success toast
            if (error) {
              toast({
                title: "Data connection restored",
                description: "Products loaded successfully.",
                variant: "default",
              });
            }
            sonnerToast.success("Products loaded successfully");
          }
        } else {
          console.warn("Products fetch returned no data");
          setProducts([]);
          setFilteredProducts([]);
          setError("No products data available. Please try again later.");
          setIsUsingFallbackData(true);
          sonnerToast.error("No products data available");
        }
      } catch (error: any) {
        console.error("Error fetching products:", error);
        
        // Look for specific error messages
        let errorMessage = "An unexpected error occurred. Please try again later.";
        if (error.message && error.message.includes("infinite recursion")) {
          errorMessage = "Database permission error. Please contact your administrator.";
          console.log("Detected recursion error in RLS policies");
        } else if (error.message && error.message.includes("JWT")) {
          errorMessage = "Authentication error. Please try logging in again.";
        }
        
        setError(errorMessage);
        setIsUsingFallbackData(true);
        sonnerToast.error("Error fetching products");
        
        // Still try to load mock data
        const mockData = await fetchProductsWithFallback({
          orderBy: ["category.asc", "reference.asc"],
          useMockOnFailure: true
        });
        
        if (mockData.data && mockData.data.length > 0) {
          console.log("Falling back to mock data");
          setProducts(mockData.data);
          setFilteredProducts(mockData.data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [fetchAttempt, toast, error]);

  // Filter products based on category and search query
  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.reference.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [categoryFilter, searchQuery, products]);

  return {
    products,
    filteredProducts,
    isLoading,
    error,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    categories,
    refetch,
    isUsingFallbackData
  };
};
