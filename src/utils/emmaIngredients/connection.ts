
import { supabase } from "@/integrations/supabase/client";

/**
 * Checks if the Supabase connection is working
 */
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

/**
 * Tests the Supabase table access with a direct SQL query
 */
export const testTableWithSQL = async (): Promise<{ data: any, error: any }> => {
  try {
    console.log("Testing table access with direct SQL query...");
    
    const { data, error } = await supabase
      .from('emma_ingredients')
      .select('Reference', { count: 'exact' })
      .limit(1);
    
    if (error) {
      console.error("SQL test query failed:", error);
    } else {
      console.log("Table accessibility test successful. Found data:", data);
    }
    
    return { data, error };
  } catch (err) {
    console.error("Error testing table with SQL:", err);
    return { data: null, error: err };
  }
};
