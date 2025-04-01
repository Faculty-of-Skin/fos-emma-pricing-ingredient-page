
import React, { useState } from "react";
import { useEmmaIngredients } from "@/hooks/useEmmaIngredients";
import { useAuth } from "@/context/AuthContext";
import { EmmaIngredientsContent } from "./EmmaIngredientsContent";
import { EmmaIngredientsDebugDialog } from "./EmmaIngredientsDebugDialog";
import { EmmaIngredientsError } from "./EmmaIngredientsError";
import { EmmaIngredientsEmpty } from "./EmmaIngredientsEmpty";
import { EmmaIngredientsLoading } from "./EmmaIngredientsLoading";

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

  const { isAdmin } = useAuth();
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
      <EmmaIngredientsContent 
        ingredients={filteredIngredientsWithoutEquipment}
        refetch={refetch}
        connectionStatus={connectionStatus}
        setShowDebugDialog={isAdmin ? setShowDebugDialog : undefined}
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
};
