
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Droplets, ChevronDown, ChevronUp, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FragranceCapsulesProps {
  fragranceIngredients: EmmaIngredient[];
  selectedFragranceRef: string | null;
  onFragranceChange: (value: string) => void;
}

export const FragranceCapsuleSelector: React.FC<FragranceCapsulesProps> = ({
  fragranceIngredients,
  selectedFragranceRef,
  onFragranceChange
}) => {
  const fragranceStyles = {
    border: 'border-purple-100',
    header: 'bg-gradient-to-r from-purple-50 to-purple-100',
    icon: <Droplets className="h-5 w-5 text-purple-600" />
  };
  
  const [showAll, setShowAll] = useState(false);
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);
  
  const displayCount = showAll ? fragranceIngredients.length : 5;
  const displayIngredients = fragranceIngredients.slice(0, displayCount);
  
  // Extract first few ingredients from INCI list to show as preview
  const getIngredientsPreview = (inciList: string | undefined, fragranceNotes: string | undefined) => {
    if (fragranceNotes) return `Notes: ${fragranceNotes}`;
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
    <Card className={`border-l-4 ${fragranceStyles.border} hover:shadow-md transition-shadow rounded-xl overflow-hidden`}>
      <CardHeader className={`${fragranceStyles.header} pb-3`}>
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 p-1.5 rounded-full shadow-sm">
            {fragranceStyles.icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Fragrance Capsule</h3>
            <p className="text-xs text-slate-500">Optional: Select up to 1</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {fragranceIngredients.length > 0 ? (
          <div className="space-y-2">
            {displayIngredients.map(ingredient => (
              <div key={ingredient.Reference} className="space-y-1">
                <Button
                  variant={selectedFragranceRef === ingredient.Reference ? "default" : "outline"}
                  size="sm"
                  className={`w-full justify-start text-left ${
                    selectedFragranceRef === ingredient.Reference 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'border-dashed bg-white hover:border-purple-300 hover:bg-purple-50'
                  } py-3`}
                  onClick={() => onFragranceChange(ingredient.Reference)}
                >
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      {selectedFragranceRef === ingredient.Reference && <Check className="h-4 w-4" />}
                      <span className="font-medium">{ingredient.Reference}</span>
                      <span className={selectedFragranceRef === ingredient.Reference ? "text-purple-200" : "text-muted-foreground"}>•</span>
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
                                selectedFragranceRef === ingredient.Reference ? "text-purple-200" : "text-purple-600"
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
                      selectedFragranceRef === ingredient.Reference ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {getIngredientsPreview(ingredient["INCI LIST"], ingredient["FRAGRANCE NOTES"])}
                    </p>
                  </div>
                </Button>
                
                {expandedIngredient === ingredient.Reference && (
                  <div className="mt-1 p-3 bg-purple-50 rounded-md border border-purple-100 text-sm">
                    <h4 className="font-medium text-slate-800 mb-1">{ingredient.Reference} - {ingredient.Description}</h4>
                    
                    {ingredient["FRAGRANCE NOTES"] && (
                      <p className="text-xs mb-2 text-slate-600">
                        <span className="font-medium">Fragrance Notes:</span> {ingredient["FRAGRANCE NOTES"]}
                      </p>
                    )}
                    
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
          <div className="text-center py-4 text-muted-foreground">
            <p>No fragrance capsules available</p>
          </div>
        )}
        
        {selectedFragranceRef && (
          <div className="mt-4 p-3 bg-purple-50/50 rounded-md border border-purple-100">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-purple-600" />
              <p className="text-sm font-medium text-slate-800">{selectedFragranceRef} selected</p>
            </div>
          </div>
        )}
      </CardContent>
      {fragranceIngredients.length > 5 && (
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
                Show all {fragranceIngredients.length} capsules <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
