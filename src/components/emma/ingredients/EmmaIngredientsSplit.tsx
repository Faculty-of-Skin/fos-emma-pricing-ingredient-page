
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
import { RefreshCw, Search, Filter, Leaf, Sparkles, Droplets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
      <div className="bg-gradient-to-r from-slate-50 to-white p-4 rounded-lg mb-6 border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative flex-1 w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search by name, INCI list, or description..."
              className="pl-9 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Card className="border border-slate-200 bg-white p-1 flex items-center gap-2">
              <div className="flex items-center gap-1 px-2">
                <Leaf className="h-4 w-4 text-emerald-500" /> 
                <span className="text-xs font-medium">{textureIngredients.length}</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-1 px-2">
                <Sparkles className="h-4 w-4 text-blue-500" /> 
                <span className="text-xs font-medium">{activeIngredients.length}</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-1 px-2">
                <Droplets className="h-4 w-4 text-violet-500" /> 
                <span className="text-xs font-medium">{perfumeIngredients.length}</span>
              </div>
            </Card>
            
            <Button variant="outline" size="sm" onClick={refetch} className="gap-2 bg-white">
              <RefreshCw className="h-4 w-4" /> 
              <span className="hidden md:inline">Refresh</span>
            </Button>
          </div>
        </div>
        
        {searchQuery && (
          <div className="mt-4 text-sm text-muted-foreground">
            Found {filteredIngredientsWithoutEquipment.length} ingredients matching "{searchQuery}"
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
