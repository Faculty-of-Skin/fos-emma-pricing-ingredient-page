
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
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'success' | 'failed'>('unknown');

  const checkConnection = async () => {
    try {
      // Perform a simple query to check connection status
      const { data, error } = await supabase.from('emma_ingredients').select('Reference').limit(1);
      
      if (error) {
        console.error("Connection check failed:", error);
        setConnectionStatus('failed');
        return false;
      }
      
      console.log("Connection check successful:", data);
      setConnectionStatus('success');
      return true;
    } catch (err) {
      console.error("Unexpected error checking connection:", err);
      setConnectionStatus('failed');
      return false;
    }
  };

  const fetchIngredients = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Checking database connection...");
      const isConnected = await checkConnection();
      
      if (!isConnected) {
        setError("Could not connect to database. Please check your Supabase connection.");
        toast.error("Database connection failed");
        return;
      }
      
      console.log("Fetching emma ingredients from database...");
      
      // Use the table name directly and explicit type casting for the expected response
      const { data, error } = await supabase
        .from("emma_ingredients")
        .select("*");
      
      if (error) {
        console.error("Error fetching emma ingredients:", error);
        setError(error.message);
        toast.error("Failed to load emma ingredients");
        return;
      }
      
      console.log("Fetched ingredients:", data);
      
      if (!data || data.length === 0) {
        console.log("No data returned from emma_ingredients table");
        setIngredients([]);
        return;
      }
      
      // Cast the data to ensure TypeScript understands it matches our EmmaIngredient type
      setIngredients(data as unknown as EmmaIngredient[]);
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
    refetch: fetchIngredients,
    connectionStatus
  };
};
