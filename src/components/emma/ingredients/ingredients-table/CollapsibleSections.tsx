
import React from "react";
import { 
  FileText, 
  Info, 
  ChevronRight,
  Sparkles,
  Droplets,
  Scroll,
  Beaker,
  Waves
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";
import { Separator } from "@/components/ui/separator";

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
        <Collapsible className="border rounded-md overflow-hidden shadow-sm group">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium bg-gradient-to-r from-white to-purple-50 hover:from-purple-50 hover:to-purple-100 transition-colors">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-purple-100 text-purple-600">
                <Droplets className="h-4 w-4" />
              </div>
              <span>Fragrance Notes</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground transform transition-transform duration-200 group-data-[state=open]:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="p-4 pt-2 border-t bg-purple-50/30">
              <p className="text-sm whitespace-pre-wrap">{ingredient["FRAGRANCE NOTES"]}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
      
      {/* Texture */}
      {ingredient.Texture && (
        <Collapsible className="border rounded-md overflow-hidden shadow-sm group">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-green-100 transition-colors">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-green-100 text-green-600">
                <Waves className="h-4 w-4" />
              </div>
              <span>Texture</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground transform transition-transform duration-200 group-data-[state=open]:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="p-4 pt-2 border-t bg-green-50/30">
              <p className="text-sm whitespace-pre-wrap">{ingredient.Texture}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
      
      {/* Benefits */}
      {ingredient.Benefit && (
        <Collapsible className="border rounded-md overflow-hidden shadow-sm group">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-blue-100 transition-colors">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-blue-100 text-blue-600">
                <Sparkles className="h-4 w-4" />
              </div>
              <span>Benefits</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground transform transition-transform duration-200 group-data-[state=open]:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="p-4 pt-2 border-t bg-blue-50/30">
              <p className="text-sm whitespace-pre-wrap">{ingredient.Benefit}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
      
      {/* Full Description */}
      {ingredient["Full Description"] && (
        <Collapsible className="border rounded-md overflow-hidden shadow-sm group">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium bg-gradient-to-r from-white to-slate-50 hover:from-slate-50 hover:to-slate-100 transition-colors">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-slate-100 text-primary">
                <Scroll className="h-4 w-4" />
              </div>
              <span>Full Description</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground transform transition-transform duration-200 group-data-[state=open]:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="p-4 pt-2 border-t bg-slate-50/30">
              <p className="text-sm whitespace-pre-wrap">{ingredient["Full Description"]}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};
