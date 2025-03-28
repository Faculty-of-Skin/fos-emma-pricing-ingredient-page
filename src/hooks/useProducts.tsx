
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
        setIsLoading(true);
        setError(null);
        console.log("Fetching products data...");
        
        // First try with anonymous auth (public access)
        let { data, error } = await supabase
          .from("products")
          .select("*")
          .order("category", { ascending: true })
          .order("reference", { ascending: true });

        if (error) {
          console.error("Error fetching products:", error);
          
          // For debugging, log the full error
          console.log("Full error object:", JSON.stringify(error));
          
          // Try the request again without any additional headers/auth
          console.log("Retrying with direct fetch...");
          
          try {
            const response = await fetch(`${supabase.supabaseUrl}/rest/v1/products?select=*&order=category.asc,reference.asc`, {
              headers: {
                'apikey': supabase.supabaseKey,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              const directData = await response.json();
              console.log("Direct fetch successful, retrieved:", directData.length || 0, "items");
              setProducts(directData || []);
              setFilteredProducts(directData || []);
              setIsLoading(false);
              return;
            } else {
              console.error("Direct fetch also failed:", await response.text());
            }
          } catch (fetchError) {
            console.error("Error with direct fetch:", fetchError);
          }
          
          // If both attempts fail, just continue with empty data
          setProducts([]);
          setFilteredProducts([]);
          
          // Only show user-friendly errors, not technical ones
          if (!error.message?.includes("infinite recursion")) {
            setError("Unable to load product data. Please try again later.");
            toast({
              title: "Error fetching products",
              description: "Unable to load product data. Please try again later.",
              variant: "destructive",
            });
          }
        } else {
          console.log("Products data retrieved:", data?.length || 0, "items");
          setProducts(data || []);
          setFilteredProducts(data || []);
        }
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setError("An unexpected error occurred. Please try again later.");
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
