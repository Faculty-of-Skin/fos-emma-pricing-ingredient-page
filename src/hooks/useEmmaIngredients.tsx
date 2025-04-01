
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type EmmaIngredient = {
  Reference: string;
  Description: string;
  Category: string;
  "INCI LIST"?: string;
  "FRAGRANCE NOTES"?: string;
  "Ingredient Breakdown"?: string;
  Benefit?: string;
  Texture?: string;
  "Beauty institute"?: number;
  "Order quantity"?: string;
  "Full Description"?: string;
  Importer?: number;
  Distributor?: number;
  "Final consumer"?: string;
};

export const useEmmaIngredients = () => {
  const [ingredients, setIngredients] = useState<EmmaIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'success' | 'failed'>('unknown');
  const [rawData, setRawData] = useState<any[] | null>(null);
  const [queryDetails, setQueryDetails] = useState<{
    url: string;
    key: string;
    tableName: string;
  }>({
    url: import.meta.env.VITE_SUPABASE_URL || '',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    tableName: 'emma_ingredients'
  });
  const [tableInfo, setTableInfo] = useState<any>(null);
  const [rowCount, setRowCount] = useState<number | null>(null);

  const checkConnection = async () => {
    try {
      console.log("Checking Supabase connection...");
      
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

  const getTableInfo = async () => {
    try {
      // Get information about the table structure
      const { data, error } = await supabase
        .from('emma_ingredients')
        .select('*')
        .limit(0);
      
      if (error) {
        console.error("Failed to get table information:", error);
        return;
      }
      
      // Use the returned query to get column information
      const columnInfo = Object.keys(data?.length ? data[0] : {});
      console.log("Column information for emma_ingredients:", columnInfo);
      
      setTableInfo({
        columnInfo,
        introspectionData: null
      });
    } catch (err) {
      console.error("Error getting table information:", err);
    }
  };

  const fetchRowCount = async () => {
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
      setRowCount(count);
      
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
      
      // Try to get table structure info
      await getTableInfo();
      
      // Check row count before fetching all data
      const count = await fetchRowCount();
      
      if (count === 0) {
        console.log("No data found in emma_ingredients table");
        setIngredients([]);
        setIsLoading(false);
        return;
      }
      
      console.log("Fetching all rows from emma_ingredients table...");
      
      const { data, error } = await supabase
        .from("emma_ingredients")
        .select("*");
      
      if (error) {
        console.error("Error fetching emma ingredients:", error);
        setError(error.message);
        toast.error("Failed to load emma ingredients");
        return;
      }
      
      // Log the raw data to inspect what's coming back
      console.log("Raw data from emma_ingredients:", data);
      setRawData(data);
      
      if (!data || data.length === 0) {
        console.log("No data returned from emma_ingredients table");
        setIngredients([]);
        return;
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
      setIngredients(mappedIngredients);
    } catch (error: any) {
      console.error("Unexpected error fetching emma ingredients:", error);
      setError(error.message || "An unexpected error occurred");
      toast.error("Failed to load emma ingredients");
    } finally {
      setIsLoading(false);
    }
  };

  // SQL test function to use the correct Supabase format
  const testTableWithSQL = async () => {
    try {
      console.log("Testing table access with direct SQL query...");
      
      // Instead of using count(*), which causes parsing errors,
      // use a simple select and check if the table exists
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

  useEffect(() => {
    fetchIngredients();
    // Also try direct SQL test
    testTableWithSQL();
  }, []);

  return {
    ingredients,
    isLoading,
    error,
    refetch: fetchIngredients,
    connectionStatus,
    rawData,
    queryDetails,
    tableInfo,
    testSQL: testTableWithSQL,
    rowCount,
    checkRowCount: fetchRowCount
  };
};
