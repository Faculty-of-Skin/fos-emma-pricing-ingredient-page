
import { EmmaIngredient } from "@/types/emmaIngredients";
import { supabase } from "@/integrations/supabase/client";
import { checkConnection } from "./connection";
import { getTableInfo, fetchRowCount } from "./tableInfo";
import { toast } from "sonner";

/**
 * Fetches all ingredients from the emma_ingredients table
 */
export const fetchIngredients = async (): Promise<{
  ingredients: EmmaIngredient[];
  error: string | null;
  rawData: any[] | null;
}> => {
  try {
    const isConnected = await checkConnection();
    
    if (!isConnected) {
      return {
        ingredients: [],
        error: "Could not connect to database. Please check your Supabase connection.",
        rawData: null
      };
    }
    
    // Try to get table structure info
    await getTableInfo();
    
    // Check row count before fetching all data
    const count = await fetchRowCount();
    
    if (count === 0) {
      console.log("No data found in emma_ingredients table");
      return {
        ingredients: [],
        error: null,
        rawData: []
      };
    }
    
    console.log("Fetching all rows from emma_ingredients table...");
    
    const { data, error } = await supabase
      .from("emma_ingredients")
      .select("*");
    
    if (error) {
      console.error("Error fetching emma ingredients:", error);
      return {
        ingredients: [],
        error: error.message,
        rawData: null
      };
    }
    
    // Log the raw data to inspect what's coming back
    console.log("Raw data from emma_ingredients:", data);
    
    if (!data || data.length === 0) {
      console.log("No data returned from emma_ingredients table");
      return {
        ingredients: [],
        error: null,
        rawData: data || []
      };
    }
    
    // Map the data to ensure it matches our EmmaIngredient type
    const mappedIngredients = data.map(item => ({
      Reference: item.Reference || "",
      Description: item.Description || "",
      Category: item.Category || "",
      "INCI LIST": item["INCI LIST"] || "",
      "FRAGRANCE NOTES": item["FRAGRANCE NOTES"] || "",
      "Ingredient Breakdown": item["Ingredient Breakdown"] || "",
      Benefit: item.Benefit || "",
      Texture: item.Texture || "",
      "Beauty institute": item["Beauty institute"] || null,
      "Order quantity": item["Order quantity"] || "",
      "Full Description": item["Full Description"] || "",
      Importer: item.Importer || null,
      Distributor: item.Distributor || null,
      "Final consumer": item["Final consumer"] || ""
    }));
    
    console.log("Mapped ingredients:", mappedIngredients);
    
    return {
      ingredients: mappedIngredients,
      error: null,
      rawData: data
    };
  } catch (error: any) {
    console.error("Unexpected error fetching emma ingredients:", error);
    return {
      ingredients: [],
      error: error.message || "An unexpected error occurred",
      rawData: null
    };
  }
};
