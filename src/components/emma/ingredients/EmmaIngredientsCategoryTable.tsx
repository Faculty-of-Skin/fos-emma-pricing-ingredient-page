
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
  List,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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

  // Determine color theme based on title
  const getThemeColor = () => {
    if (title.includes("Texture")) return "green";
    if (title.includes("Active")) return "blue";
    if (title.includes("Fragrance")) return "purple";
    return "primary";
  };
  
  const themeColor = getThemeColor();
  const bgColorClass = `bg-${themeColor}-50`;
  const textColorClass = `text-${themeColor}-600`;
  const borderColorClass = `border-${themeColor}-100`;

  return (
    <Card className={`${fullWidth ? 'col-span-full' : ''} overflow-hidden border-slate-200`}>
      <CardHeader className={`pb-3 ${themeColor === 'green' ? 'bg-green-50' : themeColor === 'blue' ? 'bg-blue-50' : themeColor === 'purple' ? 'bg-purple-50' : ''}`}>
        <div className="flex items-center justify-between">
          <CardTitle className={`text-lg font-semibold flex items-center gap-2 ${themeColor === 'green' ? 'text-green-700' : themeColor === 'blue' ? 'text-blue-700' : themeColor === 'purple' ? 'text-purple-700' : ''}`}>
            <Sparkles className="h-4 w-4" />
            {title}
          </CardTitle>
          <Badge variant="outline" className={`${themeColor === 'green' ? 'bg-green-100 text-green-800' : themeColor === 'blue' ? 'bg-blue-100 text-blue-800' : themeColor === 'purple' ? 'bg-purple-100 text-purple-800' : ''}`}>
            {filteredIngredients.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b bg-slate-50">
          <Tabs defaultValue="face" onValueChange={setCategoryFilter} className="w-full">
            <TabsList className="grid w-full max-w-xs grid-cols-2">
              <TabsTrigger value="face" className="text-sm">Face Capsules</TabsTrigger>
              <TabsTrigger value="body" className="text-sm">Body Capsules</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {filteredIngredients.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">{emptyMessage}</div>
        ) : (
          <ScrollArea className={`${fullWidth ? 'h-[400px]' : 'h-[350px]'}`}>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-1/4 font-medium">Reference</TableHead>
                  <TableHead className="w-2/3 font-medium">Description</TableHead>
                  <TableHead className="w-1/12 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIngredients.map((ingredient) => (
                  <React.Fragment key={ingredient.Reference}>
                    <TableRow className="group cursor-pointer" onClick={() => toggleIngredient(ingredient.Reference)}>
                      <TableCell className="font-medium">
                        {ingredient.Reference}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{ingredient.Description}</span>
                          {ingredient["INCI LIST"] && (
                            <span className="text-xs text-muted-foreground mt-1 line-clamp-1 opacity-70">
                              {ingredient["INCI LIST"]}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
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
                        <TableCell colSpan={3} className={`bg-slate-50 p-6 border-t border-b ${borderColorClass}`}>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <Badge className={`${themeColor === 'green' ? 'bg-green-100 text-green-800' : themeColor === 'blue' ? 'bg-blue-100 text-blue-800' : themeColor === 'purple' ? 'bg-purple-100 text-purple-800' : ''} mr-2`}>
                                {ingredient.Reference}
                              </Badge>
                              <h3 className="text-sm font-medium">{ingredient.Description}</h3>
                            </div>
                            
                            <Separator />
                            
                            {ingredient["INCI LIST"] && (
                              <div className="bg-white p-4 rounded-md border">
                                <div className="flex items-center gap-2 mb-2 text-primary">
                                  <List className="h-4 w-4" />
                                  <h4 className="font-medium">INCI List</h4>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{ingredient["INCI LIST"]}</p>
                              </div>
                            )}
                            
                            {ingredient["Ingredient Breakdown"] && (
                              <div className="bg-white p-4 rounded-md border">
                                <div className="flex items-center gap-2 mb-2 text-primary">
                                  <FileText className="h-4 w-4" />
                                  <h4 className="font-medium">Ingredient Breakdown</h4>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{ingredient["Ingredient Breakdown"]}</p>
                              </div>
                            )}

                            {ingredient["FRAGRANCE NOTES"] && (
                              <div className="bg-white p-4 rounded-md border">
                                <div className="flex items-center gap-2 mb-2 text-primary">
                                  <InfoIcon className="h-4 w-4" />
                                  <h4 className="font-medium">Fragrance Notes</h4>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{ingredient["FRAGRANCE NOTES"]}</p>
                              </div>
                            )}

                            {ingredient.Benefit && (
                              <div className="bg-white p-4 rounded-md border">
                                <div className="flex items-center gap-2 mb-2 text-primary">
                                  <Sparkles className="h-4 w-4" />
                                  <h4 className="font-medium">Benefits</h4>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{ingredient.Benefit}</p>
                              </div>
                            )}
                            
                            <div className="flex justify-end mt-4">
                              <Button variant="outline" size="sm" className="gap-1 text-xs">
                                <ExternalLink className="h-3 w-3" />
                                View Details
                              </Button>
                            </div>
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
