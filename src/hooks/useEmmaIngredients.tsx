
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type EmmaIngredient = {
  Reference: string;
  Description: string;
  Category: string;
  "INCI LIST": string;
  "FRAGRANCE NOTES": string;
  "Ingredient Breakdown": string;
  Benefit: string;
  Texture: string;
  "Beauty institute": number;
  "Order quantity": string;
  "Full Description": string;
};

export const useEmmaIngredients = () => {
  const [ingredients, setIngredients] = useState<EmmaIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIngredients = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from("emma_ingredients")
        .select("*")
        .order("Reference");
      
      if (error) {
        console.error("Error fetching emma ingredients:", error);
        setError(error.message);
        toast.error("Failed to load emma ingredients");
        return;
      }
      
      setIngredients(data || []);
    } catch (error: any) {
      console.error("Unexpected error fetching emma ingredients:", error);
      setError(error.message || "An unexpected error occurred");
      toast.error("Failed to load emma ingredients");
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
