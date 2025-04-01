
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
import { Button } from "@/components/ui/button";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { EmmaIngredientsTable } from "./EmmaIngredientsTable";
import { EmmaIngredientsSearch } from "./EmmaIngredientsSearch";
import { EmmaIngredientsSummary } from "./EmmaIngredientsSummary";

interface EmmaIngredientsContentProps {
  ingredients: EmmaIngredient[];
  refetch: () => void;
  connectionStatus: 'unknown' | 'success' | 'failed';
  setShowDebugDialog?: (show: boolean) => void;
  isAdmin: boolean;
}

export const EmmaIngredientsContent: React.FC<EmmaIngredientsContentProps> = ({
  ingredients,
  refetch,
  connectionStatus,
  setShowDebugDialog,
  isAdmin
}) => {
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const toggleIngredient = (reference: string) => {
    if (expandedIngredient === reference) {
      setExpandedIngredient(null);
    } else {
      setExpandedIngredient(reference);
    }
  };

  const filteredIngredients = ingredients.filter((ingredient) => {
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
        ingredients.map((ingredient) => ingredient.Category)
      )
    ).filter(Boolean),
  ];

  return (
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
          ingredients={ingredients}
          filteredIngredients={filteredIngredients}
          connectionStatus={isAdmin ? connectionStatus : undefined}
          onShowDebugDialog={setShowDebugDialog ? () => setShowDebugDialog(true) : undefined}
          isAdmin={isAdmin}
        />

        <EmmaIngredientsTable
          ingredients={ingredients}
          filteredIngredients={filteredIngredients}
          expandedIngredient={expandedIngredient}
          toggleIngredient={toggleIngredient}
        />
      </CardContent>
      <CardFooter className="justify-between">
        <p className="text-sm text-muted-foreground">
          Total: {ingredients.length} ingredients
        </p>
        <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </CardFooter>
    </Card>
  );
};
