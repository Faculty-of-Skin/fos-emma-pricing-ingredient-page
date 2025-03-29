
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type ProductIngredient = {
  id: string;
  code: string;
  description: string;
  ingredients: string;
  properties: string;
  created_at: string;
  updated_at: string;
};

export const useProductIngredients = () => {
  const [ingredients, setIngredients] = useState<ProductIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIngredients = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from("product_ingredients")
        .select("*")
        .order("code");
      
      if (error) {
        console.error("Error fetching product ingredients:", error);
        setError(error.message);
        toast.error("Failed to load product ingredients");
        return;
      }
      
      setIngredients(data || []);
    } catch (error: any) {
      console.error("Unexpected error fetching ingredients:", error);
      setError(error.message || "An unexpected error occurred");
      toast.error("Failed to load product ingredients");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return {
    ingredients,
    isLoading,
    error,
    refetch: fetchIngredients
  };
};
