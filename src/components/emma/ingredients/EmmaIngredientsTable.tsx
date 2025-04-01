
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  FileText, 
  List, 
  Info, 
  ChevronDown, 
  ChevronRight,
  ChevronUp
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface EmmaIngredientsTableProps {
  ingredients: EmmaIngredient[];
  filteredIngredients: EmmaIngredient[];
  expandedIngredient: string | null;
  toggleIngredient: (reference: string) => void;
}

export const EmmaIngredientsTable: React.FC<EmmaIngredientsTableProps> = ({
  filteredIngredients,
  expandedIngredient,
  toggleIngredient,
}) => {
  return (
    <ScrollArea className="h-[600px] rounded-md border">
      <div className="p-1">
        {filteredIngredients.map((ingredient) => (
          <IngredientCard 
            key={ingredient.Reference}
            ingredient={ingredient}
            isExpanded={expandedIngredient === ingredient.Reference}
            toggleIngredient={toggleIngredient}
          />
        ))}
      </div>
    </ScrollArea>
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
    <div className="mb-3 border rounded-lg overflow-hidden bg-card">
      {/* Card Header - Always visible */}
      <div 
        className="p-4 flex items-start justify-between cursor-pointer hover:bg-muted/50"
        onClick={() => toggleIngredient(ingredient.Reference)}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{ingredient.Reference}</h3>
            {ingredient.Category && (
              <Badge variant="outline" className="ml-2">{ingredient.Category}</Badge>
            )}
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
