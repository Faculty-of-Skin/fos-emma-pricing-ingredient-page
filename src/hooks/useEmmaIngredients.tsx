
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
    url: supabase.supabaseUrl,
    key: supabase.supabaseKey,
    tableName: 'emma_ingredients'
  });
  const [tableInfo, setTableInfo] = useState<any>(null);

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
      
      // Try introspection query to get more details about the table
      const { data: introspectionData, error: introspectionError } = await supabase
        .rpc('get_columns_for_table', { table_name: 'emma_ingredients' })
        .catch(() => ({ data: null, error: { message: 'Function not available' } }));
      
      console.log("Table introspection results:", introspectionData || "Not available");
      if (introspectionError) {
        console.log("Introspection error:", introspectionError);
      }
      
      setTableInfo({
        columnInfo,
        introspectionData: introspectionData || null
      });
    } catch (err) {
      console.error("Error getting table information:", err);
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
      
      // Check if the first item has lowercase column names instead of the expected format
      const firstItem = data[0];
      const hasLowercaseColumns = 
        firstItem.reference !== undefined && 
        firstItem.Reference === undefined;
      
      if (hasLowercaseColumns) {
        console.log("Warning: Table has lowercase column names instead of expected capitalized format");
        console.log("Converting column names to expected format");
        
        // Convert lowercase column names to the expected format
        const convertedData = data.map(item => ({
          Reference: item.reference || "",
          Description: item.description || "",
          Category: item.category || "",
          "INCI LIST": item.inci_list || "",
          "FRAGRANCE NOTES": item.fragrance_notes || "",
          "Ingredient Breakdown": item.ingredient_breakdown || "",
          Benefit: item.benefit || "",
          Texture: item.texture || "",
          "Beauty institute": item.beauty_institute || null,
          "Order quantity": item.order_quantity || "",
          "Full Description": item.full_description || "",
          Importer: item.importer || null,
          Distributor: item.distributor || null,
          "Final consumer": item.final_consumer || ""
        }));
        
        console.log("Converted data:", convertedData);
        setIngredients(convertedData);
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

  // Add a function to directly test the table via SQL
  const testTableWithSQL = async () => {
    try {
      console.log("Testing table access with direct SQL query...");
      const { data, error } = await supabase.rpc('test_emma_ingredients_table')
        .catch(() => {
          console.log("RPC function not available, trying direct query");
          return { data: null, error: { message: 'Function not available' } };
        });
      
      if (error && error.message !== 'Function not available') {
        console.error("SQL test failed:", error);
      } else if (data) {
        console.log("SQL test result:", data);
      } else {
        console.log("Trying direct SQL query instead of RPC");
        // Fall back to a direct query
        const { data: rawData, error: rawError } = await supabase
          .from('emma_ingredients')
          .select('count(*)');
        
        if (rawError) {
          console.error("Direct SQL count query failed:", rawError);
        } else {
          console.log("Table row count:", rawData);
        }
      }
    } catch (err) {
      console.error("Error testing table with SQL:", err);
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
    testSQL: testTableWithSQL
  };
};
