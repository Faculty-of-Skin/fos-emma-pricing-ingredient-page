
import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { FolderOpen } from "lucide-react";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";
import { TypeGroup } from "./TypeGroup";

interface CategoryGroupProps {
  category: string;
  typeGroups: Record<string, EmmaIngredient[]>;
  expandedIngredient: string | null;
  toggleIngredient: (reference: string) => void;
}

// Component to display a category group
export const CategoryGroup: React.FC<CategoryGroupProps> = ({ 
  category, 
  typeGroups,
  expandedIngredient,
  toggleIngredient
}) => {
  // Get types in a preferred order
  const types = useMemo(() => {
    const preferredOrder = ["Texture", "Active", "Perfume", "Base", "Other"];
    return Object.keys(typeGroups).sort((a, b) => {
      return preferredOrder.indexOf(a) - preferredOrder.indexOf(b);
    });
  }, [typeGroups]);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <FolderOpen className="h-5 w-5 text-primary" />
        {category}
        <Badge variant="outline" className="ml-2">{
          Object.values(typeGroups).flat().length
        } items</Badge>
      </h3>
      
      <div className="pl-4 space-y-4">
        {types.map(type => (
          <TypeGroup 
            key={`${category}-${type}`}
            type={type}
            ingredients={typeGroups[type]}
            expandedIngredient={expandedIngredient}
            toggleIngredient={toggleIngredient}
          />
        ))}
      </div>
    </div>
  );
};
