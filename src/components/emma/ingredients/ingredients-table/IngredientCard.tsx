
import React from "react";
import { 
  FileText, 
  List, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Leaf,
  Droplets
} from "lucide-react";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";
import { CollapsibleSections } from "./CollapsibleSections";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  // Determine icon based on ingredient description
  const getIcon = () => {
    const desc = ingredient.Description.toLowerCase();
    if (desc.startsWith('texture')) return <Leaf className="h-4 w-4 text-green-600" />;
    if (desc.startsWith('active')) return <Sparkles className="h-4 w-4 text-blue-600" />;
    if (desc.startsWith('perfume') || desc.startsWith('fragrance')) return <Droplets className="h-4 w-4 text-purple-600" />;
    return <FileText className="h-4 w-4 text-primary" />;
  };

  // Get appropriate color theme based on ingredient type
  const getThemeClasses = () => {
    const desc = ingredient.Description.toLowerCase();
    if (desc.startsWith('texture')) {
      return {
        headerBg: 'bg-green-50',
        border: 'border-green-100 hover:border-green-200',
        badge: 'bg-green-100 text-green-800'
      };
    }
    if (desc.startsWith('active')) {
      return {
        headerBg: 'bg-blue-50',
        border: 'border-blue-100 hover:border-blue-200',
        badge: 'bg-blue-100 text-blue-800'
      };
    }
    if (desc.startsWith('perfume') || desc.startsWith('fragrance')) {
      return {
        headerBg: 'bg-purple-50',
        border: 'border-purple-100 hover:border-purple-200',
        badge: 'bg-purple-100 text-purple-800'
      };
    }
    return {
      headerBg: 'bg-slate-50',
      border: 'border hover:border-slate-300',
      badge: 'bg-slate-100 text-slate-800'
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`rounded-lg overflow-hidden bg-white border transition-all shadow-sm ${themeClasses.border} ${isExpanded ? 'shadow-md' : ''}`}>
      {/* Card Header - Always visible */}
      <div 
        className={`p-4 flex items-start justify-between cursor-pointer hover:bg-slate-50 transition-colors ${isExpanded ? themeClasses.headerBg : ''}`}
        onClick={() => toggleIngredient(ingredient.Reference)}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {getIcon()}
            <h3 className="font-semibold flex items-center gap-2">
              {ingredient.Reference}
              <Badge variant="outline" className={themeClasses.badge}>
                {ingredient.Category?.includes("face") ? "Face" : ingredient.Category?.includes("body") ? "Body" : ""}
              </Badge>
            </h3>
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
        <div className="border-t p-4 bg-slate-50">
          <div className="space-y-4">
            <Separator />
            
            {/* INCI List - Full Version */}
            {ingredient["INCI LIST"] && (
              <div className="bg-white p-4 rounded-md border shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <List className="h-4 w-4" />
                  <h4 className="font-medium">INCI List</h4>
                </div>
                <p className="text-sm whitespace-pre-wrap">{ingredient["INCI LIST"]}</p>
              </div>
            )}
            
            {/* Ingredient Breakdown */}
            {ingredient["Ingredient Breakdown"] && (
              <div className="bg-white p-4 rounded-md border shadow-sm">
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
