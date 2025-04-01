
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmmaIngredient } from "@/types/emmaIngredients";

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
          <ScrollArea className="h-[200px] pr-1 rounded-md border border-blue-200 bg-blue-50/20">
            <div className="space-y-2 p-2">
              {activeIngredients.map(ingredient => (
                <Button
                  key={ingredient.Reference}
                  variant={selectedActiveRefs.includes(ingredient.Reference) ? "default" : "outline"}
                  size="sm"
                  className={`w-full justify-start text-left ${
                    selectedActiveRefs.includes(ingredient.Reference) 
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-sm' 
                      : 'border-dashed bg-white hover:border-blue-300 hover:bg-blue-50'
                  } rounded-lg transition-all`}
                  onClick={() => onActiveChange(ingredient.Reference)}
                >
                  <div className="w-full overflow-hidden">
                    <ScrollArea className="w-full max-w-full">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        {selectedActiveRefs.includes(ingredient.Reference) && <Check className="h-4 w-4 flex-shrink-0" />}
                        <span className="font-medium flex-shrink-0">{ingredient.Reference}</span>
                        <span className="text-muted-foreground flex-shrink-0">•</span>
                        <span className="truncate">{ingredient.Description}</span>
                      </div>
                    </ScrollArea>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-4 text-slate-500 bg-blue-50/20 rounded-md border border-blue-100">
            <p>No active capsules available</p>
          </div>
        )}
        
        {selectedActiveRefs.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100 shadow-sm">
            <p className="text-sm font-medium text-slate-800">{selectedActiveRefs.length} active capsule(s) selected</p>
            <p className="text-xs text-slate-500 mt-1">{selectedActiveRefs.join(', ')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
