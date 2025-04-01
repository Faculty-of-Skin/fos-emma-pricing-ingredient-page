
import React from "react";
import { 
  FileText, 
  Info, 
  ChevronRight
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";

interface CollapsibleSectionsProps {
  ingredient: EmmaIngredient;
}

export const CollapsibleSections: React.FC<CollapsibleSectionsProps> = ({ 
  ingredient 
}) => {
  return (
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
  );
};
