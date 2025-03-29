
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { fetchProductsWithDirectFetch } from "@/utils/supabase";

type Accessory = {
  category: string;
  reference: string;
  description: string;
  importer_price: number;
  distributor_price: number;
  beauty_institute_price: number;
  final_consumer_price: number | null;
  importer_moq: number;
  distributor_moq: number;
  beauty_institute_moq: number;
};

export const useAccessoriesData = () => {
  const [accessoriesData, setAccessoriesData] = useState<Accessory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchAccessories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching accessories data...");
      
      const categories = ['Accessories', 'Face capsule', 'Body capsule', 'Marketing item'];
      
      // Try with Supabase client first
      let { data, error } = await supabase
        .from("products")
        .select("*")
        .in("category", categories)
        .order("category")
        .order("reference");
      
      if (error) {
        console.error("Error fetching accessories:", error);
        console.log("Full error object:", JSON.stringify(error));
        
        // Try with direct fetch as a fallback
        console.log("Retrying with direct fetch...");
        
        const result = await fetchProductsWithDirectFetch({
          category: categories,
          orderBy: ["category.asc", "reference.asc"]
        });
        
        if (result.error) {
          console.error("Direct fetch also failed:", result.error);
          // If both approaches fail, show a user-friendly error
          if (!error.message?.includes("infinite recursion")) {
            setError("Unable to load accessories data. Please try again later.");
            toast({
              title: "Error fetching accessories",
              description: "Unable to load accessories data. Please try again later.",
              variant: "destructive",
            });
          }
          setAccessoriesData([]);
        } else {
          console.log("Direct fetch successful, retrieved:", result.data?.length || 0, "items");
          setAccessoriesData(result.data || []);
        }
      } else {
        console.log("Accessories data retrieved:", data?.length || 0, "items");
        setAccessoriesData(data || []);
      }
    } catch (error: any) {
      console.error("Failed to fetch accessories data:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, [toast]);

  return {
    accessoriesData,
    isLoading,
    error,
    fetchAccessories,
    beautyInstituteData: {
      moq: accessoriesData.length > 0 
        ? accessoriesData.find(item => 
            item.category === 'Face capsule' || item.category === 'Body capsule'
          )?.beauty_institute_moq || 5 
        : 5
    }
  };
};
