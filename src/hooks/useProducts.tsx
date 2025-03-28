
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  // Get unique categories for filter
  const categories = ["all", ...new Set(products.map(product => product.category))].sort();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        console.log("Fetching products data...");
        
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("category", { ascending: true })
          .order("reference", { ascending: true });

        if (error) {
          console.error("Error fetching products:", error);
          
          // Special handling for recursion errors - don't show to user if it's the RLS recursion issue
          if (error.message?.includes("infinite recursion detected")) {
            console.log("Handling recursion error gracefully, continuing with app");
            
            // Continue with empty data rather than blocking the UI
            setProducts([]);
            setFilteredProducts([]);
            setIsLoading(false);
            return;
          } else {
            // For other errors, show the toast
            setError(error.message || "Failed to load products");
            toast({
              title: "Error fetching products",
              description: error.message || "Failed to load products",
              variant: "destructive",
            });
          }
          return;
        }
        
        console.log("Products data retrieved:", data?.length || 0, "items");
        setProducts(data || []);
        setFilteredProducts(data || []);
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setError(error.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

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
    categories
  };
};
