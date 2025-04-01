
import React, { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  FileText, 
  List, 
  Info, 
  ChevronDown, 
  ChevronUp,
  ChevronRight,
  FolderOpen,
  Tags
} from "lucide-react";

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

interface CategoryGroupProps {
  category: string;
  typeGroups: Record<string, EmmaIngredient[]>;
  expandedIngredient: string | null;
  toggleIngredient: (reference: string) => void;
}

// Component to display a category group
const CategoryGroup: React.FC<CategoryGroupProps> = ({ 
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

interface TypeGroupProps {
  type: string;
  ingredients: EmmaIngredient[];
  expandedIngredient: string | null;
  toggleIngredient: (reference: string) => void;
}

// Component to display a type group within a category
const TypeGroup: React.FC<TypeGroupProps> = ({ 
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

interface IngredientCardProps {
  ingredient: EmmaIngredient;
  isExpanded: boolean;
  toggleIngredient: (reference: string) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ 
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
            
            {/* Collapsible sections for less important details */}
            <div className="space-y-2">
              {/* Fragrance Notes */}
              {ingredient["FRAGRANCE NOTES"] && (
                <Collapsible className="border rounded-md overflow-hidden">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      <span>Fragrance Notes</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ui-open:rotate-90 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 pt-0 border-t">
                    <p className="text-sm whitespace-pre-wrap">{ingredient["FRAGRANCE NOTES"]}</p>
                  </CollapsibleContent>
                </Collapsible>
              )}
              
              {/* Texture */}
              {ingredient.Texture && (
                <Collapsible className="border rounded-md overflow-hidden">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      <span>Texture</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ui-open:rotate-90 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 pt-0 border-t">
                    <p className="text-sm whitespace-pre-wrap">{ingredient.Texture}</p>
                  </CollapsibleContent>
                </Collapsible>
              )}
              
              {/* Benefits */}
              {ingredient.Benefit && (
                <Collapsible className="border rounded-md overflow-hidden">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      <span>Benefits</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ui-open:rotate-90 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 pt-0 border-t">
                    <p className="text-sm whitespace-pre-wrap">{ingredient.Benefit}</p>
                  </CollapsibleContent>
                </Collapsible>
              )}
              
              {/* Full Description */}
              {ingredient["Full Description"] && (
                <Collapsible className="border rounded-md overflow-hidden">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>Full Description</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ui-open:rotate-90 transition-transform" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 pt-0 border-t">
                    <p className="text-sm whitespace-pre-wrap">{ingredient["Full Description"]}</p>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
