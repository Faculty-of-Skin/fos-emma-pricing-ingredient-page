
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (reference: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [reference]: !prev[reference]
    }));
  };

  return (
    <Card className={cn(
      "border-2 shadow-sm",
      fullWidth && "col-span-1 md:col-span-2"
    )}>
      <CardHeader className="border-b px-4 py-3 bg-slate-50">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          {title}
          <Badge variant="outline">{ingredients.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {ingredients.length > 0 ? (
          <div className="divide-y">
            {ingredients.map((ingredient) => (
              <div key={ingredient.Reference} className="hover:bg-slate-50">
                <div 
                  className="px-4 py-3 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleItem(ingredient.Reference)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{ingredient.Reference}</span>
                      {ingredient.Category && (
                        <Badge variant="outline" className="text-xs">{ingredient.Category}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{ingredient.Description}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {expandedItems[ingredient.Reference] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {expandedItems[ingredient.Reference] && (
                  <div className="px-4 py-3 bg-slate-50 border-t text-sm space-y-3">
                    {ingredient["INCI LIST"] && (
                      <div>
                        <h4 className="font-medium mb-1 text-xs uppercase">INCI List:</h4>
                        <p className="text-muted-foreground">
                          {ingredient["INCI LIST"]}
                        </p>
                      </div>
                    )}
                    {ingredient["Ingredient Breakdown"] && (
                      <div>
                        <h4 className="font-medium mb-1 text-xs uppercase">Ingredient Breakdown:</h4>
                        <p className="text-muted-foreground">
                          {ingredient["Ingredient Breakdown"]}
                        </p>
                      </div>
                    )}
                    {ingredient.Category && (
                      <div>
                        <h4 className="font-medium mb-1 text-xs uppercase">Category:</h4>
                        <p className="text-muted-foreground">
                          {ingredient.Category}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
