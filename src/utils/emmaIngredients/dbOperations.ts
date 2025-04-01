
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EmmaIngredient } from "@/types/emmaIngredients";

export const checkConnection = async (): Promise<boolean> => {
  try {
    console.log("Checking Supabase connection...");
    
    // Perform a simple query to check connection status
    const { data, error } = await supabase.from('emma_ingredients').select('Reference').limit(1);
    
    if (error) {
      console.error("Connection check failed:", error);
      return false;
    }
    
    console.log("Connection check successful:", data);
    return true;
  } catch (err) {
    console.error("Unexpected error checking connection:", err);
    return false;
  }
};

export const getTableInfo = async (): Promise<{columnInfo: string[], introspectionData: any} | null> => {
  try {
    // Get information about the table structure
    const { data, error } = await supabase
      .from('emma_ingredients')
      .select('*')
      .limit(0);
    
    if (error) {
      console.error("Failed to get table information:", error);
      return null;
    }
    
    // Use the returned query to get column information
    const columnInfo = Object.keys(data?.length ? data[0] : {});
    console.log("Column information for emma_ingredients:", columnInfo);
    
    return {
      columnInfo,
      introspectionData: null
    };
  } catch (err) {
    console.error("Error getting table information:", err);
    return null;
  }
};

export const fetchRowCount = async (): Promise<number | null> => {
  try {
    console.log("Checking if emma_ingredients table has any data...");
    
    // Use the count option in Supabase's select method to get a row count
    const { count, error } = await supabase
      .from('emma_ingredients')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error("Row count check failed:", error);
      toast.error("Failed to count rows: " + error.message);
      return null;
    }
    
    console.log("Table row count:", count);
    
    if (count === 0) {
      toast.warning("The emma_ingredients table exists but contains no data");
    } else if (count && count > 0) {
      toast.success(`Found ${count} rows in emma_ingredients table`);
    }
    
    return count;
  } catch (err) {
    console.error("Error counting rows:", err);
    toast.error("Failed to count rows due to an unexpected error");
    return null;
  }
};

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

export const testTableWithSQL = async (): Promise<{ data: any, error: any }> => {
  try {
    console.log("Testing table access with direct SQL query...");
    
    const { data, error } = await supabase
      .from('emma_ingredients')
      .select('Reference', { count: 'exact' })
      .limit(1);
    
    if (error) {
      console.error("SQL test query failed:", error);
      toast.error("SQL test failed: " + error.message);
    } else {
      console.log("Table accessibility test successful. Found data:", data);
      toast.success("SQL test successful");
    }
    
    return { data, error };
  } catch (err) {
    console.error("Error testing table with SQL:", err);
    toast.error("SQL test failed with an unexpected error");
    return { data: null, error: err };
  }
};
