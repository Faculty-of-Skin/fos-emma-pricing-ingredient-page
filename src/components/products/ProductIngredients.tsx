
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
  AlertCircle,
  Beaker
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
      <Card className="border-4 border-brutal-black mt-8">
        <CardHeader className="border-b-4 border-brutal-black bg-brutal-white">
          <CardTitle className="text-xl font-mono uppercase tracking-wider">Product Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-12 bg-brutal-white">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-brutal-black" />
            <p className="mt-4 text-brutal-black font-mono">LOADING INGREDIENTS DATA...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-4 border-brutal-black mt-8">
        <CardHeader className="border-b-4 border-brutal-black bg-brutal-white">
          <CardTitle className="text-xl font-mono uppercase tracking-wider">Product Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="bg-brutal-white">
          <div className="flex flex-col items-center py-6">
            <AlertCircle className="h-8 w-8 text-brutal-dark" />
            <p className="mt-2 text-brutal-black font-mono uppercase">{error}</p>
            <Button 
              onClick={refetch} 
              variant="outline" 
              className="mt-4 border-2 border-brutal-black text-brutal-black hover:bg-brutal-black hover:text-brutal-white font-mono uppercase tracking-wider transition-transform hover:translate-x-1 hover:translate-y-1"
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
      <Card className="border-4 border-brutal-black mt-8">
        <CardHeader className="border-b-4 border-brutal-black bg-brutal-white">
          <CardTitle className="text-xl font-mono uppercase tracking-wider">Product Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="bg-brutal-white">
          <p className="text-center text-brutal-black font-mono uppercase py-6">
            No ingredient data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-brutal-black mt-8 transition-transform hover:translate-x-1 hover:translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between border-b-4 border-brutal-black bg-brutal-white">
        <div className="flex items-center gap-2">
          <Beaker className="h-5 w-5 text-brutal-black" />
          <CardTitle className="text-xl font-mono uppercase tracking-wider">Product Ingredients</CardTitle>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refetch} 
          className="border-2 border-brutal-black text-brutal-black hover:bg-brutal-black hover:text-brutal-white font-mono uppercase tracking-wider transition-transform hover:translate-x-0.5 hover:translate-y-0.5 gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-0 bg-brutal-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-brutal-charcoal">
              <TableRow className="hover:bg-brutal-charcoal/90 border-b-2 border-brutal-black">
                <TableHead className="w-[120px] font-mono uppercase text-brutal-white border-r-2 border-brutal-black">Code</TableHead>
                <TableHead className="font-mono uppercase text-brutal-white border-r-2 border-brutal-black">Description</TableHead>
                <TableHead className="text-right font-mono uppercase text-brutal-white w-[100px]">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ingredient) => (
                <React.Fragment key={ingredient.id}>
                  <TableRow className="hover:bg-brutal-gray/10 border-b-2 border-brutal-black">
                    <TableCell className="font-mono font-medium border-r-2 border-brutal-black">
                      {ingredient.code}
                    </TableCell>
                    <TableCell className="border-r-2 border-brutal-black">{ingredient.description}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleIngredient(ingredient.id)}
                        className="hover:bg-brutal-black hover:text-brutal-white transition-colors"
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
                    <TableRow className="bg-brutal-white/80 border-b-2 border-brutal-black">
                      <TableCell colSpan={3} className="p-4">
                        <div className="flex flex-col space-y-4">
                          <div className="border-2 border-brutal-black p-3 bg-brutal-white">
                            <h4 className="text-sm font-mono uppercase mb-1 border-b border-brutal-black pb-1">Ingredients:</h4>
                            <p className="text-sm whitespace-pre-wrap font-mono">
                              {ingredient.ingredients}
                            </p>
                          </div>
                          <div className="border-2 border-brutal-black p-3 bg-brutal-white">
                            <h4 className="text-sm font-mono uppercase mb-1 border-b border-brutal-black pb-1">Properties:</h4>
                            <p className="text-sm whitespace-pre-wrap font-mono">
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
