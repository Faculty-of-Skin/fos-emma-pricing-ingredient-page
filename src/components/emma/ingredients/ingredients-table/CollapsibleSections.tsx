
import React from "react";
import { 
  FileText, 
  Info, 
  ChevronRight,
  Sparkles,
  Droplets,
  Scroll
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
    <div className="space-y-3">
      {/* Fragrance Notes */}
      {ingredient["FRAGRANCE NOTES"] && (
        <Collapsible className="border rounded-md overflow-hidden shadow-sm">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium bg-white hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-purple-600" />
              <span>Fragrance Notes</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ui-open:rotate-90 transition-transform" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-2 border-t bg-white">
            <p className="text-sm whitespace-pre-wrap">{ingredient["FRAGRANCE NOTES"]}</p>
          </CollapsibleContent>
        </Collapsible>
      )}
      
      {/* Texture */}
      {ingredient.Texture && (
        <Collapsible className="border rounded-md overflow-hidden shadow-sm">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium bg-white hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-600" />
              <span>Texture</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ui-open:rotate-90 transition-transform" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-2 border-t bg-white">
            <p className="text-sm whitespace-pre-wrap">{ingredient.Texture}</p>
          </CollapsibleContent>
        </Collapsible>
      )}
      
      {/* Benefits */}
      {ingredient.Benefit && (
        <Collapsible className="border rounded-md overflow-hidden shadow-sm">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium bg-white hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Benefits</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ui-open:rotate-90 transition-transform" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-2 border-t bg-white">
            <p className="text-sm whitespace-pre-wrap">{ingredient.Benefit}</p>
          </CollapsibleContent>
        </Collapsible>
      )}
      
      {/* Full Description */}
      {ingredient["Full Description"] && (
        <Collapsible className="border rounded-md overflow-hidden shadow-sm">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium bg-white hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <Scroll className="h-4 w-4 text-primary" />
              <span>Full Description</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ui-open:rotate-90 transition-transform" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-2 border-t bg-white">
            <p className="text-sm whitespace-pre-wrap">{ingredient["Full Description"]}</p>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};
