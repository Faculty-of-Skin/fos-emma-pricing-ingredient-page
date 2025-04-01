
import React, { useState } from "react";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

  if (ingredients.length === 0) {
    return (
      <Card className={`${fullWidth ? "col-span-2" : ""}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex justify-between items-center">
            {title}
            <span className="text-sm text-muted-foreground">(0)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            {emptyMessage}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${fullWidth ? "col-span-2" : ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          {title}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">({ingredients.length})</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
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
        <ScrollArea className={`${expanded ? "h-[400px]" : "h-[200px]"}`}>
          <div className="space-y-2">
            {ingredients.map((ingredient) => (
              <div key={ingredient.Reference}>
                <div className="border rounded-md p-3 hover:bg-accent/50 transition-colors">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{ingredient.Reference}</h4>
                      <p className="text-sm text-muted-foreground">{ingredient.Description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {ingredient.Category?.includes("face") ? "Face" : ingredient.Category?.includes("body") ? "Body" : "General"}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0" 
                        onClick={() => toggleDetails(ingredient.Reference)}
                      >
                        <Info className="h-4 w-4 text-primary" />
                      </Button>
                    </div>
                  </div>
                  
                  <Collapsible open={detailsShown === ingredient.Reference}>
                    <CollapsibleContent className="mt-3 pt-3 border-t">
                      {ingredient["INCI LIST"] && (
                        <div className="mt-2 text-xs">
                          <p className="font-medium text-muted-foreground">INCI:</p>
                          <p className="whitespace-pre-wrap">{ingredient["INCI LIST"]}</p>
                        </div>
                      )}
                      
                      {ingredient.Benefit && (
                        <div className="mt-2 text-xs">
                          <p className="font-medium text-muted-foreground">Benefits:</p>
                          <p className="whitespace-pre-wrap">{ingredient.Benefit}</p>
                        </div>
                      )}
                      
                      {ingredient.Texture && (
                        <div className="mt-2 text-xs">
                          <p className="font-medium text-muted-foreground">Texture:</p>
                          <p className="whitespace-pre-wrap">{ingredient.Texture}</p>
                        </div>
                      )}
                      
                      {ingredient["FRAGRANCE NOTES"] && (
                        <div className="mt-2 text-xs">
                          <p className="font-medium text-muted-foreground">Fragrance Notes:</p>
                          <p className="whitespace-pre-wrap">{ingredient["FRAGRANCE NOTES"]}</p>
                        </div>
                      )}
                      
                      {ingredient["Ingredient Breakdown"] && (
                        <div className="mt-2 text-xs">
                          <p className="font-medium text-muted-foreground">Ingredient Breakdown:</p>
                          <p className="whitespace-pre-wrap">{ingredient["Ingredient Breakdown"]}</p>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
