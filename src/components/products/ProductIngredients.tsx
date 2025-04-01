
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Info, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useProductIngredients, ProductIngredient } from "@/hooks/useProductIngredients";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ProductIngredients = () => {
  const { ingredients, isLoading, error, refetch } = useProductIngredients();
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);

  const toggleIngredient = (id: string) => {
    if (expandedIngredient === id) {
      setExpandedIngredient(null);
    } else {
      setExpandedIngredient(id);
    }
  };

  if (isLoading) {
    return (
      <Card className="brutal-card mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Product Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-12">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading ingredients data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="brutal-card mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Product Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-6">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <p className="mt-2 text-muted-foreground">{error}</p>
            <Button 
              onClick={refetch} 
              variant="outline" 
              className="mt-4"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (ingredients.length === 0) {
    return (
      <Card className="brutal-card mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Product Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-6">
            No ingredient data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="brutal-card mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Product Ingredients</CardTitle>
        <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ingredient) => (
                <React.Fragment key={ingredient.id}>
                  <TableRow className="hover:bg-accent/50">
                    <TableCell className="font-mono font-medium">
                      {ingredient.code}
                    </TableCell>
                    <TableCell>{ingredient.description}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleIngredient(ingredient.id)}
                      >
                        {expandedIngredient === ingredient.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedIngredient === ingredient.id && (
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={3} className="p-4">
                        <div className="flex flex-col space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Ingredients:</h4>
                            <p className="text-sm text-muted-foreground">
                              {ingredient.ingredients}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Properties:</h4>
                            <p className="text-sm text-muted-foreground">
                              {ingredient.properties}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
