
import React, { useState } from "react";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  InfoIcon, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  List 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  fullWidth = false
}) => {
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("face");

  const toggleIngredient = (reference: string) => {
    if (expandedIngredient === reference) {
      setExpandedIngredient(null);
    } else {
      setExpandedIngredient(reference);
    }
  };

  // Filter products based on Category column values for face/body capsules
  const filteredIngredients = ingredients.filter(ingredient => {
    const category = ingredient.Category?.toLowerCase() || "";
    
    if (categoryFilter === "face") {
      return category.includes("face capsule") || 
             (category.includes("capsule") && !category.includes("body capsule")) ||
             (!category.includes("capsule") && !category.includes("body"));
    } else if (categoryFilter === "body") {
      return category.includes("body capsule") || 
             (category.includes("body") && !category.includes("face"));
    }
    
    return true;
  });

  return (
    <Card className={`${fullWidth ? 'col-span-full' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="outline">{filteredIngredients.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="face" onValueChange={setCategoryFilter} className="mb-4">
          <TabsList className="grid w-44 grid-cols-2">
            <TabsTrigger value="face">Face</TabsTrigger>
            <TabsTrigger value="body">Body</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {filteredIngredients.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">{emptyMessage}</div>
        ) : (
          <ScrollArea className={`${fullWidth ? 'h-[400px]' : 'h-[350px]'}`}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Reference</TableHead>
                  <TableHead className="w-2/3">Description</TableHead>
                  <TableHead className="w-1/12 text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIngredients.map((ingredient) => (
                  <React.Fragment key={ingredient.Reference}>
                    <TableRow>
                      <TableCell className="font-medium">{ingredient.Reference}</TableCell>
                      <TableCell>{ingredient.Description}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleIngredient(ingredient.Reference)}
                        >
                          {expandedIngredient === ingredient.Reference ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedIngredient === ingredient.Reference && (
                      <TableRow>
                        <TableCell colSpan={3} className="bg-muted/30 p-4">
                          <div className="space-y-4">
                            {ingredient["INCI LIST"] && (
                              <div className="bg-card p-3 rounded-md border">
                                <div className="flex items-center gap-2 mb-2 text-primary">
                                  <List className="h-4 w-4" />
                                  <h4 className="font-medium">INCI List</h4>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{ingredient["INCI LIST"]}</p>
                              </div>
                            )}
                            
                            {ingredient["Ingredient Breakdown"] && (
                              <div className="bg-card p-3 rounded-md border">
                                <div className="flex items-center gap-2 mb-2 text-primary">
                                  <FileText className="h-4 w-4" />
                                  <h4 className="font-medium">Ingredient Breakdown</h4>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{ingredient["Ingredient Breakdown"]}</p>
                              </div>
                            )}

                            {ingredient["FRAGRANCE NOTES"] && (
                              <div className="bg-card p-3 rounded-md border">
                                <div className="flex items-center gap-2 mb-2 text-primary">
                                  <InfoIcon className="h-4 w-4" />
                                  <h4 className="font-medium">Fragrance Notes</h4>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{ingredient["FRAGRANCE NOTES"]}</p>
                              </div>
                            )}

                            {ingredient.Benefit && (
                              <div className="bg-card p-3 rounded-md border">
                                <div className="flex items-center gap-2 mb-2 text-primary">
                                  <InfoIcon className="h-4 w-4" />
                                  <h4 className="font-medium">Benefits</h4>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{ingredient.Benefit}</p>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
