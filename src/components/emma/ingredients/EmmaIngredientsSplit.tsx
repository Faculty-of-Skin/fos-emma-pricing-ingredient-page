
import React, { useState } from "react";
import { useEmmaIngredients } from "@/hooks/useEmmaIngredients";
import { useAuth } from "@/context/AuthContext";
import { EmmaIngredientsDebugDialog } from "./EmmaIngredientsDebugDialog";
import { EmmaIngredientsError } from "./EmmaIngredientsError";
import { EmmaIngredientsEmpty } from "./EmmaIngredientsEmpty";
import { EmmaIngredientsLoading } from "./EmmaIngredientsLoading";
import { EmmaIngredientsCategoryTable } from "./EmmaIngredientsCategoryTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search } from "lucide-react";

export const EmmaIngredientsSplit: React.FC = () => {
  const { 
    ingredients, 
    isLoading, 
    error, 
    refetch, 
    connectionStatus, 
    rawData,
    queryDetails,
    tableInfo,
    testSQL,
    rowCount,
    checkRowCount
  } = useEmmaIngredients();

  const { isAdmin } = useAuth();
  const [showDebugDialog, setShowDebugDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter ingredients based on search query
  const filteredIngredients = ingredients.filter(ingredient => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      ingredient.Reference.toLowerCase().includes(lowerCaseQuery) ||
      ingredient.Description.toLowerCase().includes(lowerCaseQuery) ||
      (ingredient["INCI LIST"] && ingredient["INCI LIST"].toLowerCase().includes(lowerCaseQuery))
    );
  });
  
  // Filter out equipment and accessory categories
  const filteredIngredientsWithoutEquipment = filteredIngredients.filter(
    (ingredient) => {
      const category = ingredient.Category?.toLowerCase() || "";
      return !category.includes("equipment") && 
             !category.includes("accessories") && 
             !category.includes("accessory");
    }
  );

  // Group ingredients by type
  const textureIngredients = filteredIngredientsWithoutEquipment.filter(
    ingredient => ingredient.Description.toLowerCase().startsWith("texture")
  );
  
  const activeIngredients = filteredIngredientsWithoutEquipment.filter(
    ingredient => ingredient.Description.toLowerCase().startsWith("active")
  );
  
  const perfumeIngredients = filteredIngredientsWithoutEquipment.filter(
    ingredient => {
      const desc = ingredient.Description.toLowerCase();
      return desc.startsWith("perfume") || desc.startsWith("fragrance");
    }
  );

  if (isLoading) {
    return <EmmaIngredientsLoading />;
  }

  if (error) {
    return (
      <>
        <EmmaIngredientsError 
          error={error} 
          refetch={refetch} 
          testSQL={isAdmin ? testSQL : undefined}
          connectionStatus={connectionStatus}
          onShowDebugDialog={isAdmin ? () => setShowDebugDialog(true) : undefined}
          isAdmin={isAdmin}
        />
        {isAdmin && (
          <EmmaIngredientsDebugDialog 
            showDebugDialog={showDebugDialog}
            setShowDebugDialog={setShowDebugDialog}
            connectionStatus={connectionStatus}
            queryDetails={queryDetails}
            tableInfo={tableInfo}
            rawData={rawData}
            ingredients={ingredients}
            refetch={refetch}
            testSQL={testSQL}
            rowCount={rowCount}
            checkRowCount={checkRowCount}
          />
        )}
      </>
    );
  }

  if (filteredIngredientsWithoutEquipment.length === 0) {
    return (
      <>
        <EmmaIngredientsEmpty
          refetch={refetch}
          testSQL={isAdmin ? testSQL : undefined}
          connectionStatus={connectionStatus}
          onShowDebugDialog={isAdmin ? () => setShowDebugDialog(true) : undefined}
          isAdmin={isAdmin}
        />
        {isAdmin && (
          <EmmaIngredientsDebugDialog 
            showDebugDialog={showDebugDialog}
            setShowDebugDialog={setShowDebugDialog}
            connectionStatus={connectionStatus}
            queryDetails={queryDetails}
            tableInfo={tableInfo}
            rawData={rawData}
            ingredients={ingredients}
            refetch={refetch}
            testSQL={testSQL}
            rowCount={rowCount}
            checkRowCount={checkRowCount}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search ingredients..."
            className="pl-8 w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <EmmaIngredientsCategoryTable 
          title="Texture Capsules" 
          ingredients={textureIngredients} 
          emptyMessage="No texture capsules found"
        />
        
        <EmmaIngredientsCategoryTable 
          title="Active Capsules" 
          ingredients={activeIngredients} 
          emptyMessage="No active capsules found"
        />
      </div>
      
      <EmmaIngredientsCategoryTable 
        title="Fragrance Capsules" 
        ingredients={perfumeIngredients} 
        emptyMessage="No fragrance capsules found"
        fullWidth
      />
      
      {isAdmin && (
        <EmmaIngredientsDebugDialog 
          showDebugDialog={showDebugDialog}
          setShowDebugDialog={setShowDebugDialog}
          connectionStatus={connectionStatus}
          queryDetails={queryDetails}
          tableInfo={tableInfo}
          rawData={rawData}
          ingredients={ingredients}
          refetch={refetch}
          testSQL={testSQL}
          rowCount={rowCount}
          checkRowCount={checkRowCount}
        />
      )}
    </>
  );
};
