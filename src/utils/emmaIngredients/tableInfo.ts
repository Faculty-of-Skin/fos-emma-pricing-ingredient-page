
import { supabase } from "@/integrations/supabase/client";

/**
 * Gets information about the table structure
 */
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

/**
 * Fetches the row count of the emma_ingredients table
 */
export const fetchRowCount = async (): Promise<number | null> => {
  try {
    console.log("Checking if emma_ingredients table has any data...");
    
    // Use the count option in Supabase's select method to get a row count
    const { count, error } = await supabase
      .from('emma_ingredients')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error("Row count check failed:", error);
      return null;
    }
    
    console.log("Table row count:", count);
    return count;
  } catch (err) {
    console.error("Error counting rows:", err);
    return null;
  }
};
