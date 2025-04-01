
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { useEmmaIngredients } from "@/hooks/useEmmaIngredients";
import { Button } from "@/components/ui/button";
import { EmmaIngredientsTable } from "./EmmaIngredientsTable";
import { EmmaIngredientsSearch } from "./EmmaIngredientsSearch";
import { EmmaIngredientsSummary } from "./EmmaIngredientsSummary";
import { EmmaIngredientsDebugDialog } from "./EmmaIngredientsDebugDialog";
import { EmmaIngredientsError } from "./EmmaIngredientsError";
import { EmmaIngredientsEmpty } from "./EmmaIngredientsEmpty";
import { EmmaIngredientsLoading } from "./EmmaIngredientsLoading";
import { EmmaIngredientsContent } from "./EmmaIngredientsContent";

export const EmmaIngredientsContainer: React.FC = () => {
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

  const [showDebugDialog, setShowDebugDialog] = useState(false);
  
  // Filter out equipment and accessories categories
  const filteredIngredientsWithoutEquipment = ingredients.filter(
    (ingredient) => {
      const category = ingredient.Category?.toLowerCase() || "";
      return !category.includes("equipment") && !category.includes("accessories") && !category.includes("accessory");
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
          testSQL={testSQL}
          connectionStatus={connectionStatus}
          onShowDebugDialog={() => setShowDebugDialog(true)}
        />
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
      </>
    );
  }

  if (filteredIngredientsWithoutEquipment.length === 0) {
    return (
      <>
        <EmmaIngredientsEmpty
          refetch={refetch}
          testSQL={testSQL}
          connectionStatus={connectionStatus}
          onShowDebugDialog={() => setShowDebugDialog(true)}
        />
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
      </>
    );
  }

  return (
    <>
      <EmmaIngredientsContent 
        ingredients={filteredIngredientsWithoutEquipment}
        refetch={refetch}
        connectionStatus={connectionStatus}
        setShowDebugDialog={setShowDebugDialog}
      />
      
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
    </>
  );
};
