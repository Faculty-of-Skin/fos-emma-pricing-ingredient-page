
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { fetchProductsWithFallback } from "@/utils/supabase";
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
  const [rawError, setRawError] = useState<any>(null);
  const { toast } = useToast();

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
        setRawError(null);
        console.log("Fetching products data... (attempt: " + (fetchAttempt + 1) + ")");
        
        try {
          console.log("Attempting direct query first...");
          // Test the profiles connection first to check if RLS is working correctly
          const profilesCheck = await supabase.from("profiles").select("role").limit(1);
          if (profilesCheck.error) {
            console.error("Profile check failed:", profilesCheck.error);
            throw profilesCheck.error;
          } else {
            console.log("Profile check successful:", profilesCheck.data);
          }
          
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
            sonnerToast.success("Products loaded successfully");
            return;
          }
        } catch (directError: any) {
          console.error("Direct query exception:", directError);
          setRawError(directError);
          // Continue to fallback methods
        }
        
        console.log("Trying fallback methods...");
        const result = await fetchProductsWithFallback({
          orderBy: ["category.asc", "reference.asc"],
          useMockOnFailure: true // Always allow mock data as last resort
        });
        
        if (result.data && result.data.length > 0) {
          console.log("Products fetch successful via fallback:", result.data.length, "items");
          setProducts(result.data);
          setFilteredProducts(result.data);
          
          const firstItem = result.data[0];
          if (firstItem.id.startsWith('mock-')) {
            console.log("Using mock data as fallback");
            setIsUsingFallbackData(true);
            const errorMsg = result.error || rawError?.message || 
              "Unable to connect to the database. Database permission error (recursive policy).";
            setError(errorMsg);
            sonnerToast.warning("Using sample data - Database connection issue");
          } else {
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
        setRawError(error);
        
        let errorMessage = "An unexpected error occurred. Please try again later.";
        if (error.message && error.message.includes("infinite recursion")) {
          errorMessage = "Database permission error (recursive policy). Please contact your administrator.";
          console.log("Detected recursion error in RLS policies");
        } else if (error.message && error.message.includes("JWT")) {
          errorMessage = "Authentication error. Please try logging in again.";
        }
        
        setError(errorMessage);
        
        try {
          console.log("Attempting to load mock data as final fallback");
          const mockData = await fetchProductsWithFallback({
            orderBy: ["category.asc", "reference.asc"],
            useMockOnFailure: true
          });
          
          if (mockData.data && mockData.data.length > 0) {
            console.log("Falling back to mock data");
            setProducts(mockData.data);
            setFilteredProducts(mockData.data);
            setIsUsingFallbackData(true);
            sonnerToast.warning("Using sample data - Database connection issue");
          }
        } catch (mockError) {
          console.error("Failed to load even mock data:", mockError);
          sonnerToast.error("Error loading any data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [fetchAttempt, toast]);

  useEffect(() => {
    let result = products;
    
    if (categoryFilter !== "all") {
      result = result.filter(product => product.category === categoryFilter);
    }
    
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
    isUsingFallbackData,
    rawError
  };
};
