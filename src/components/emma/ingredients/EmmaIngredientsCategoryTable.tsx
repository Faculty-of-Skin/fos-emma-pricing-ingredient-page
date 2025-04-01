
import React, { useState } from "react";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Info, List, Sparkles, Leaf, Droplets, FlaskConical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

interface EmmaIngredientsCategoryTableProps {
  title: string;
  ingredients: EmmaIngredient[];
  emptyMessage: string;
  fullWidth?: boolean;
}

export const EmmaIngredientsCategoryTable: React.FC<EmmaIngredientsCategoryTableProps> = ({
  title,
  ingredients,
  emptyMessage,
  fullWidth = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [detailsShown, setDetailsShown] = useState<string | null>(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleDetails = (reference: string) => {
    if (detailsShown === reference) {
      setDetailsShown(null);
    } else {
      setDetailsShown(reference);
    }
  };

  // Extract first few ingredients from INCI list to show as preview
  const getIngredientsPreview = (inciList: string | undefined) => {
    if (!inciList) return null;
    
    const ingredients = inciList.split(',').map(i => i.trim());
    const previewIngredients = ingredients.slice(0, 3);
    return previewIngredients.join(', ') + (ingredients.length > 3 ? '...' : '');
  };

  // Get the appropriate icon and color based on ingredient type
  const getCategoryIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.startsWith('texture')) {
      return { icon: <Leaf className="h-4 w-4 text-emerald-500" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    } else if (desc.startsWith('active')) {
      return { icon: <Sparkles className="h-4 w-4 text-blue-500" />, color: 'bg-blue-50 text-blue-700 border-blue-200' };
    } else if (desc.startsWith('perfume') || desc.startsWith('fragrance')) {
      return { icon: <Droplets className="h-4 w-4 text-violet-500" />, color: 'bg-violet-50 text-violet-700 border-violet-200' };
    }
    return { icon: <FlaskConical className="h-4 w-4 text-gray-500" />, color: 'bg-gray-50 text-gray-700 border-gray-200' };
  };

  // Get header style based on title
  const getHeaderStyle = () => {
    if (title.toLowerCase().includes('texture')) {
      return 'bg-gradient-to-r from-emerald-50 to-transparent border-b border-emerald-100';
    } else if (title.toLowerCase().includes('active')) {
      return 'bg-gradient-to-r from-blue-50 to-transparent border-b border-blue-100';
    } else if (title.toLowerCase().includes('fragrance')) {
      return 'bg-gradient-to-r from-violet-50 to-transparent border-b border-violet-100';
    }
    return '';
  };

  if (ingredients.length === 0) {
    return (
      <Card className={`${fullWidth ? "col-span-2" : ""} shadow-md border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg`}>
        <CardHeader className={`pb-2 ${getHeaderStyle()}`}>
          <CardTitle className="text-lg flex justify-between items-center">
            {title}
            <span className="text-sm text-muted-foreground">(0)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground flex flex-col items-center justify-center">
            <FlaskConical className="h-12 w-12 text-slate-200 mb-3" />
            {emptyMessage}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${fullWidth ? "col-span-2" : ""} shadow-md border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg`}>
      <CardHeader className={`pb-2 ${getHeaderStyle()}`}>
        <CardTitle className="text-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            {title.toLowerCase().includes('texture') && <Leaf className="h-5 w-5 text-emerald-500" />}
            {title.toLowerCase().includes('active') && <Sparkles className="h-5 w-5 text-blue-500" />}
            {title.toLowerCase().includes('fragrance') && <Droplets className="h-5 w-5 text-violet-500" />}
            {title}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700">
              {ingredients.length}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full hover:bg-slate-100" 
              onClick={toggleExpanded}
            >
              {expanded ? 
                <ChevronUp className="h-4 w-4" /> : 
                <ChevronDown className="h-4 w-4" />
              }
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className={`${expanded ? "h-[500px]" : "h-[250px]"} transition-all duration-300 pr-4`}>
          <div className="space-y-3">
            {ingredients.map((ingredient) => {
              const { icon, color } = getCategoryIcon(ingredient.Description);
              return (
                <div key={ingredient.Reference} className="animate-fade-up" style={{animationDelay: `${ingredients.indexOf(ingredient) * 50}ms`}}>
                  <div className="border rounded-lg p-4 hover:bg-slate-50 transition-colors shadow-sm">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0">
                            {icon}
                          </div>
                          <h4 className="font-medium">{ingredient.Reference}</h4>
                          <Badge variant="outline" className={`${color} text-xs`}>
                            {ingredient.Category?.includes("face") ? "Face" : ingredient.Category?.includes("body") ? "Body" : "General"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{ingredient.Description}</p>
                        {ingredient["INCI LIST"] && getIngredientsPreview(ingredient["INCI LIST"]) && (
                          <div className="flex items-center gap-1 mt-2 bg-slate-50 p-2 rounded-md border border-slate-100">
                            <List className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {getIngredientsPreview(ingredient["INCI LIST"])}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 rounded-full hover:bg-slate-100" 
                          onClick={() => toggleDetails(ingredient.Reference)}
                        >
                          <Info className="h-4 w-4 text-primary" />
                        </Button>
                      </div>
                    </div>
                    
                    <Collapsible open={detailsShown === ingredient.Reference}>
                      <CollapsibleContent className="mt-4 pt-4 border-t animate-accordion-down">
                        {ingredient["INCI LIST"] && (
                          <div className="mt-2 text-xs group">
                            <p className="font-medium text-primary mb-1 flex items-center gap-1">
                              <List className="h-3 w-3" />
                              INCI:
                            </p>
                            <p className="whitespace-pre-wrap bg-slate-50 p-3 rounded-md border border-slate-100 group-hover:border-slate-200 transition-colors">
                              {ingredient["INCI LIST"]}
                            </p>
                          </div>
                        )}
                        
                        {ingredient.Benefit && (
                          <div className="mt-3 text-xs group">
                            <p className="font-medium text-primary mb-1 flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              Benefits:
                            </p>
                            <p className="whitespace-pre-wrap bg-slate-50 p-3 rounded-md border border-slate-100 group-hover:border-slate-200 transition-colors">
                              {ingredient.Benefit}
                            </p>
                          </div>
                        )}
                        
                        {ingredient.Texture && (
                          <div className="mt-3 text-xs group">
                            <p className="font-medium text-primary mb-1 flex items-center gap-1">
                              <Leaf className="h-3 w-3" />
                              Texture:
                            </p>
                            <p className="whitespace-pre-wrap bg-slate-50 p-3 rounded-md border border-slate-100 group-hover:border-slate-200 transition-colors">
                              {ingredient.Texture}
                            </p>
                          </div>
                        )}
                        
                        {ingredient["FRAGRANCE NOTES"] && (
                          <div className="mt-3 text-xs group">
                            <p className="font-medium text-primary mb-1 flex items-center gap-1">
                              <Droplets className="h-3 w-3" />
                              Fragrance Notes:
                            </p>
                            <p className="whitespace-pre-wrap bg-slate-50 p-3 rounded-md border border-slate-100 group-hover:border-slate-200 transition-colors">
                              {ingredient["FRAGRANCE NOTES"]}
                            </p>
                          </div>
                        )}
                        
                        {ingredient["Ingredient Breakdown"] && (
                          <div className="mt-3 text-xs group">
                            <p className="font-medium text-primary mb-1 flex items-center gap-1">
                              <FlaskConical className="h-3 w-3" />
                              Ingredient Breakdown:
                            </p>
                            <p className="whitespace-pre-wrap bg-slate-50 p-3 rounded-md border border-slate-100 group-hover:border-slate-200 transition-colors">
                              {ingredient["Ingredient Breakdown"]}
                            </p>
                          </div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
