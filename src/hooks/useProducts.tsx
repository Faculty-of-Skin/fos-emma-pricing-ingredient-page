
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { fetchProductsWithFallback } from "@/utils/supabaseUtils";

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
  const { toast } = useToast();

  // Get unique categories for filter
  const categories = ["all", ...new Set(products.map(product => product.category))].sort();

  const refetch = () => {
    setFetchAttempt(prev => prev + 1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Fetching products data... (attempt: " + (fetchAttempt + 1) + ")");
        
        // Use our enhanced function with multiple fallbacks
        const result = await fetchProductsWithFallback({
          orderBy: ["category.asc", "reference.asc"]
        });
        
        if (result.data && result.data.length > 0) {
          console.log("Products fetch successful:", result.data.length, "items");
          setProducts(result.data);
          setFilteredProducts(result.data);
          
          // If we previously had an error but now succeeded, show success toast
          if (error) {
            toast({
              title: "Data connection restored",
              description: "Products loaded successfully.",
              variant: "default",
            });
          }
        } else {
          console.warn("Products fetch returned no data");
          setProducts([]);
          setFilteredProducts([]);
          setError("No products data available. Please try again later.");
        }
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setError("An unexpected error occurred. Please try again later.");
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
    refetch
  };
};
