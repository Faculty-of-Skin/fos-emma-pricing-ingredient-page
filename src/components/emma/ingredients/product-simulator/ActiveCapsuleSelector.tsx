
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ChevronDown, ChevronUp, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ActiveCapsulesProps {
  activeIngredients: EmmaIngredient[];
  selectedActiveRefs: string[];
  onActiveChange: (value: string) => void;
}

export const ActiveCapsuleSelector: React.FC<ActiveCapsulesProps> = ({
  activeIngredients,
  selectedActiveRefs,
  onActiveChange
}) => {
  const [showAll, setShowAll] = useState(false);
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);
  
  const displayCount = showAll ? activeIngredients.length : 5;
  const displayIngredients = activeIngredients.slice(0, displayCount);
  
  // Extract first few ingredients from INCI list to show as preview
  const getIngredientsPreview = (inciList: string | undefined) => {
    if (!inciList) return "No ingredients available";
    
    const ingredients = inciList.split(',').map(i => i.trim());
    const previewIngredients = ingredients.slice(0, 3);
    return previewIngredients.join(', ') + (ingredients.length > 3 ? '...' : '');
  };

  const toggleIngredientDetails = (reference: string) => {
    if (expandedIngredient === reference) {
      setExpandedIngredient(null);
    } else {
      setExpandedIngredient(reference);
    }
  };

  return (
    <Card className="border-l-4 border-blue-400 hover:shadow-md transition-shadow rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-1.5 rounded-full shadow-sm">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Active Capsules</h3>
            <p className="text-xs text-slate-500">Optional: Select up to 2</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {activeIngredients.length > 0 ? (
          <div className="space-y-2">
            {displayIngredients.map(ingredient => (
              <div key={ingredient.Reference} className="space-y-1">
                <Button
                  variant={selectedActiveRefs.includes(ingredient.Reference) ? "default" : "outline"}
                  size="sm"
                  className={`w-full justify-start text-left ${
                    selectedActiveRefs.includes(ingredient.Reference) 
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-sm' 
                      : 'border-dashed bg-white hover:border-blue-300 hover:bg-blue-50'
                  } rounded-lg transition-all py-3`}
                  onClick={() => onActiveChange(ingredient.Reference)}
                >
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      {selectedActiveRefs.includes(ingredient.Reference) && <Check className="h-4 w-4 flex-shrink-0" />}
                      <span className="font-medium">{ingredient.Reference}</span>
                      <span className={selectedActiveRefs.includes(ingredient.Reference) ? "text-blue-200" : "text-muted-foreground"}>•</span>
                      <span className="truncate">{ingredient.Description}</span>
                      
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="ml-auto h-6 w-6 p-0" 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleIngredientDetails(ingredient.Reference);
                              }}
                            >
                              <Info className={`h-4 w-4 ${
                                selectedActiveRefs.includes(ingredient.Reference) ? "text-blue-200" : "text-blue-600"
                              }`} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Click for details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className={`text-xs mt-1 line-clamp-1 ${
                      selectedActiveRefs.includes(ingredient.Reference) ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {getIngredientsPreview(ingredient["INCI LIST"])}
                    </p>
                  </div>
                </Button>
                
                {expandedIngredient === ingredient.Reference && (
                  <div className="mt-1 p-3 bg-blue-50 rounded-md border border-blue-100 text-sm">
                    <h4 className="font-medium text-slate-800 mb-1">{ingredient.Reference} - {ingredient.Description}</h4>
                    {ingredient.Benefit && (
                      <p className="text-xs mb-2 text-slate-600">
                        <span className="font-medium">Benefits:</span> {ingredient.Benefit}
                      </p>
                    )}
                    {ingredient["INCI LIST"] && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-slate-700">INCI List:</p>
                        <p className="text-xs mt-1 whitespace-pre-wrap text-slate-600">{ingredient["INCI LIST"]}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-slate-500 bg-blue-50/20 rounded-md border border-blue-100">
            <p>No active capsules available</p>
          </div>
        )}
        
        {selectedActiveRefs.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100 shadow-sm">
            <p className="text-sm font-medium text-slate-800">{selectedActiveRefs.length} active capsule(s) selected</p>
            <p className="text-xs text-slate-500 mt-1">{selectedActiveRefs.join(', ')}</p>
            {selectedActiveRefs.length > 0 && (
              <div className="mt-2 pt-2 border-t border-blue-100">
                {selectedActiveRefs.map(ref => {
                  const ingredient = activeIngredients.find(i => i.Reference === ref);
                  return ingredient && ingredient["INCI LIST"] ? (
                    <p key={ref} className="text-xs text-slate-500 mt-1 line-clamp-1 italic">
                      <span className="font-medium">{ref} INCI:</span> {getIngredientsPreview(ingredient["INCI LIST"])}
                    </p>
                  ) : null;
                })}
              </div>
            )}
          </div>
        )}
      </CardContent>
      {activeIngredients.length > 5 && (
        <CardFooter className="pt-2 pb-4 px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs w-full flex items-center justify-center gap-1"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                Show less <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                Show all {activeIngredients.length} capsules <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
