
import React from "react";
import { 
  FileText, 
  List, 
  ChevronDown, 
  ChevronUp
} from "lucide-react";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";
import { CollapsibleSections } from "./CollapsibleSections";

interface IngredientCardProps {
  ingredient: EmmaIngredient;
  isExpanded: boolean;
  toggleIngredient: (reference: string) => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({ 
  ingredient, 
  isExpanded,
  toggleIngredient 
}) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      {/* Card Header - Always visible */}
      <div 
        className="p-4 flex items-start justify-between cursor-pointer hover:bg-muted/50"
        onClick={() => toggleIngredient(ingredient.Reference)}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{ingredient.Reference}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{ingredient.Description}</p>
          
          {/* Quick preview of INCI List - always visible */}
          {ingredient["INCI LIST"] && (
            <div className="mt-2">
              <div className="flex items-center gap-1 text-xs text-primary">
                <List className="h-3 w-3" />
                <span className="font-medium">INCI:</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {ingredient["INCI LIST"]}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          {isExpanded ? 
            <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          }
        </div>
      </div>
      
      {/* Expandable Content */}
      {isExpanded && (
        <div className="border-t p-4 bg-muted/30">
          <div className="space-y-4">
            {/* INCI List - Full Version */}
            {ingredient["INCI LIST"] && (
              <div className="bg-white p-3 rounded-md border border-muted">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <List className="h-4 w-4" />
                  <h4 className="font-medium">INCI List</h4>
                </div>
                <p className="text-sm whitespace-pre-wrap">{ingredient["INCI LIST"]}</p>
              </div>
            )}
            
            {/* Ingredient Breakdown */}
            {ingredient["Ingredient Breakdown"] && (
              <div className="bg-white p-3 rounded-md border border-muted">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <FileText className="h-4 w-4" />
                  <h4 className="font-medium">Ingredient Breakdown</h4>
                </div>
                <p className="text-sm whitespace-pre-wrap">{ingredient["Ingredient Breakdown"]}</p>
              </div>
            )}
            
            {/* Collapsible sections */}
            <CollapsibleSections ingredient={ingredient} />
          </div>
        </div>
      )}
    </div>
  );
};
