
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Droplets, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmmaIngredient } from "@/types/emmaIngredients";

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

  return (
    <Card className={`border-l-4 ${fragranceStyles.border} hover:shadow-md transition-shadow`}>
      <CardHeader className={`${fragranceStyles.header} pb-3`}>
        <div className="flex items-center gap-2">
          {fragranceStyles.icon}
          <div>
            <h3 className="text-sm font-semibold">Fragrance Capsule</h3>
            <p className="text-xs text-muted-foreground">Optional: Select up to 1</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {fragranceIngredients.length > 0 ? (
          <div className="space-y-2">
            {displayIngredients.map(ingredient => (
              <Button
                key={ingredient.Reference}
                variant={selectedFragranceRef === ingredient.Reference ? "default" : "outline"}
                size="sm"
                className={`w-full justify-start text-left ${selectedFragranceRef === ingredient.Reference ? 'bg-purple-600 hover:bg-purple-700' : 'border-dashed bg-white'} py-3`}
                onClick={() => onFragranceChange(ingredient.Reference)}
              >
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    {selectedFragranceRef === ingredient.Reference && <Check className="h-4 w-4 flex-shrink-0" />}
                    <span className="font-medium">{ingredient.Reference}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="truncate">{ingredient.Description}</span>
                  </div>
                  <p className={`text-xs mt-1 line-clamp-1 ${
                    selectedFragranceRef === ingredient.Reference ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {getIngredientsPreview(ingredient["INCI LIST"], ingredient["FRAGRANCE NOTES"])}
                  </p>
                </div>
              </Button>
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
