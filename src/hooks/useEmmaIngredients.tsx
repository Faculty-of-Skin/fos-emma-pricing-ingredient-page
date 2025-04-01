
import { useState, useEffect } from "react";
import { EmmaIngredient, ConnectionStatus, EmmaIngredientsQueryDetails } from "@/types/emmaIngredients";
import { 
  checkConnection, 
  getTableInfo, 
  fetchRowCount, 
  fetchIngredients,
  testTableWithSQL
} from "@/utils/emmaIngredients";

export type { EmmaIngredient } from "@/types/emmaIngredients";

export const useEmmaIngredients = () => {
  const [ingredients, setIngredients] = useState<EmmaIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('unknown');
  const [rawData, setRawData] = useState<any[] | null>(null);
  const [queryDetails, setQueryDetails] = useState<EmmaIngredientsQueryDetails>({
    url: import.meta.env.VITE_SUPABASE_URL || '',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    tableName: 'emma_ingredients'
  });
  const [tableInfo, setTableInfo] = useState<any>(null);
  const [rowCount, setRowCount] = useState<number | null>(null);

  const fetchAllIngredients = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check connection and update status
      const isConnected = await checkConnection();
      setConnectionStatus(isConnected ? 'success' : 'failed');
      
      if (!isConnected) {
        setError("Could not connect to database. Please check your Supabase connection.");
        return;
      }
      
      // Get table info
      const tableInfoResult = await getTableInfo();
      if (tableInfoResult) {
        setTableInfo(tableInfoResult);
      }
      
      // Get row count
      const count = await fetchRowCount();
      setRowCount(count);
      
      // Get ingredients
      const result = await fetchIngredients();
      setIngredients(result.ingredients);
      setRawData(result.rawData);
      
      if (result.error) {
        setError(result.error);
      }
    } catch (error: any) {
      console.error("Unexpected error in useEmmaIngredients:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const checkRowCount = async () => {
    const count = await fetchRowCount();
    setRowCount(count);
    return count;
  };

  useEffect(() => {
    fetchAllIngredients();
    // Also try direct SQL test
    testTableWithSQL();
  }, []);

  return {
    ingredients,
    isLoading,
    error,
    refetch: fetchAllIngredients,
    connectionStatus,
    rawData,
    queryDetails,
    tableInfo,
    testSQL: testTableWithSQL,
    rowCount,
    checkRowCount
  };
};
