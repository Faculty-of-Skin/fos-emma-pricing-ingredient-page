
import React, { useState, useEffect } from "react";
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

// Import our newly created components
import { EmmaIngredientsTable } from "./EmmaIngredientsTable";
import { EmmaIngredientsSearch } from "./EmmaIngredientsSearch";
import { EmmaIngredientsSummary } from "./EmmaIngredientsSummary";
import { EmmaIngredientsDebugDialog } from "./EmmaIngredientsDebugDialog";
import { EmmaIngredientsError } from "./EmmaIngredientsError";
import { EmmaIngredientsEmpty } from "./EmmaIngredientsEmpty";
import { EmmaIngredientsLoading } from "./EmmaIngredientsLoading";

export const EmmaIngredients: React.FC = () => {
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
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showDebugDialog, setShowDebugDialog] = useState(false);
  
  useEffect(() => {
    console.log("EmmaIngredients loaded with data:", ingredients);
    console.log("Connection status:", connectionStatus);
    console.log("Raw data from hook:", rawData);
    console.log("Table row count:", rowCount);
  }, [ingredients, connectionStatus, rawData, rowCount]);

  // Filter out equipment and accessories categories
  const filteredIngredientsWithoutEquipment = ingredients.filter(
    (ingredient) => {
      const category = ingredient.Category?.toLowerCase() || "";
      return !category.includes("equipment") && !category.includes("accessories") && !category.includes("accessory");
    }
  );

  const toggleIngredient = (reference: string) => {
    if (expandedIngredient === reference) {
      setExpandedIngredient(null);
    } else {
      setExpandedIngredient(reference);
    }
  };

  const filteredIngredients = filteredIngredientsWithoutEquipment.filter((ingredient) => {
    const matchesSearch =
      searchQuery === "" ||
      ingredient.Reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ingredient.Category && ingredient.Category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      categoryFilter === "all" || ingredient.Category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories excluding equipment and accessories
  const uniqueCategories = [
    "all",
    ...Array.from(
      new Set(
        filteredIngredientsWithoutEquipment
          .map((ingredient) => ingredient.Category)
      )
    ).filter(Boolean),
  ];

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
      <Card className="brutal-card mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Emma Ingredients</CardTitle>
          <CardDescription>
            All ingredients available in the Emma collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmmaIngredientsSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            uniqueCategories={uniqueCategories}
          />

          <EmmaIngredientsSummary
            ingredients={filteredIngredientsWithoutEquipment}
            filteredIngredients={filteredIngredients}
            connectionStatus={connectionStatus}
            onShowDebugDialog={() => setShowDebugDialog(true)}
          />

          <EmmaIngredientsTable
            ingredients={filteredIngredientsWithoutEquipment}
            filteredIngredients={filteredIngredients}
            expandedIngredient={expandedIngredient}
            toggleIngredient={toggleIngredient}
          />
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-muted-foreground">
            Total: {filteredIngredientsWithoutEquipment.length} ingredients
          </p>
          <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </CardFooter>
      </Card>

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
