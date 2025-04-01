
import React, { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";
import { CategoryGroup } from "./ingredients-table/CategoryGroup";

interface EmmaIngredientsTableProps {
  ingredients: EmmaIngredient[];
  filteredIngredients: EmmaIngredient[];
  expandedIngredient: string | null;
  toggleIngredient: (reference: string) => void;
}

// Group ingredients by category and then by type based on first word of description
export const EmmaIngredientsTable: React.FC<EmmaIngredientsTableProps> = ({
  filteredIngredients,
  expandedIngredient,
  toggleIngredient,
}) => {
  // Group ingredients by category and then by first word of description
  const groupedIngredients = useMemo(() => {
    const byCategory: Record<string, EmmaIngredient[]> = {};
    
    // First group by category
    filteredIngredients.forEach(ingredient => {
      const category = ingredient.Category || "Uncategorized";
      if (!byCategory[category]) {
        byCategory[category] = [];
      }
      byCategory[category].push(ingredient);
    });
    
    // Then for each category, group by type (first word of description)
    const result: Record<string, Record<string, EmmaIngredient[]>> = {};
    
    Object.entries(byCategory).forEach(([category, ingredients]) => {
      result[category] = {};
      
      ingredients.forEach(ingredient => {
        // Extract first word from description to determine type
        const firstWord = ingredient.Description.split(' ')[0];
        let type = "Other";
        
        if (/texture/i.test(firstWord)) {
          type = "Texture";
        } else if (/active/i.test(firstWord)) {
          type = "Active";
        } else if (/perfume/i.test(firstWord) || /fragrance/i.test(firstWord)) {
          type = "Perfume";
        } else if (/base/i.test(firstWord)) {
          type = "Base";
        }
        
        if (!result[category][type]) {
          result[category][type] = [];
        }
        result[category][type].push(ingredient);
      });
    });
    
    return result;
  }, [filteredIngredients]);
  
  // Get array of categories for rendering
  const categories = useMemo(() => {
    return Object.keys(groupedIngredients).sort();
  }, [groupedIngredients]);

  return (
    <ScrollArea className="h-[600px] rounded-md border">
      <div className="p-3">
        {categories.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No ingredients match your search criteria
          </div>
        ) : (
          categories.map((category) => (
            <CategoryGroup 
              key={category}
              category={category}
              typeGroups={groupedIngredients[category]}
              expandedIngredient={expandedIngredient}
              toggleIngredient={toggleIngredient}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
};
