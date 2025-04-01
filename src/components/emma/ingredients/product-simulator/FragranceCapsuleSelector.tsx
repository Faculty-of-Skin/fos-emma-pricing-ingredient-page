
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Droplets } from "lucide-react";
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
          <ScrollArea className="h-[200px] pr-1 rounded-md border border-purple-100 bg-purple-50/20">
            <div className="space-y-2 p-2">
              {fragranceIngredients.map(ingredient => (
                <Button
                  key={ingredient.Reference}
                  variant={selectedFragranceRef === ingredient.Reference ? "default" : "outline"}
                  size="sm"
                  className={`w-full justify-start text-left ${selectedFragranceRef === ingredient.Reference ? 'bg-purple-600 hover:bg-purple-700' : 'border-dashed bg-white'}`}
                  onClick={() => onFragranceChange(ingredient.Reference)}
                >
                  <div className="flex items-center gap-2">
                    {selectedFragranceRef === ingredient.Reference && <Check className="h-4 w-4" />}
                    <span className="font-medium">{ingredient.Reference}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="truncate">{ingredient.Description}</span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
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
    </Card>
  );
};
