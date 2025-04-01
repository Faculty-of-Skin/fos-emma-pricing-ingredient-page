
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tags } from "lucide-react";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";
import { IngredientCard } from "./IngredientCard";

interface TypeGroupProps {
  type: string;
  ingredients: EmmaIngredient[];
  expandedIngredient: string | null;
  toggleIngredient: (reference: string) => void;
}

// Component to display a type group within a category
export const TypeGroup: React.FC<TypeGroupProps> = ({ 
  type, 
  ingredients,
  expandedIngredient,
  toggleIngredient
}) => {
  return (
    <div className="mb-4">
      <h4 className="text-md font-medium mb-2 flex items-center gap-2">
        <Tags className="h-4 w-4 text-primary" />
        {type}
        <Badge variant="outline" className="ml-2">{ingredients.length}</Badge>
      </h4>
      
      <div className="pl-3 space-y-3">
        {ingredients.map(ingredient => (
          <IngredientCard 
            key={ingredient.Reference}
            ingredient={ingredient}
            isExpanded={expandedIngredient === ingredient.Reference}
            toggleIngredient={toggleIngredient}
          />
        ))}
      </div>
    </div>
  );
};
