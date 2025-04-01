
import React, { useState, useEffect } from "react";
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
  ChevronDown, 
  ChevronUp, 
  RefreshCw,
  Loader2,
  AlertCircle,
  Search,
  Database
} from "lucide-react";
import { useEmmaIngredients, EmmaIngredient } from "@/hooks/useEmmaIngredients";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FloatingCurrencySelector } from "@/components/emma/FloatingCurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";

export const EmmaIngredients = () => {
  const { ingredients, isLoading, error, refetch } = useEmmaIngredients();
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { formatPrice, convertPrice } = useCurrency();
  
  useEffect(() => {
    console.log("EmmaIngredients loaded with data:", ingredients);
  }, [ingredients]);

  const toggleIngredient = (reference: string) => {
    if (expandedIngredient === reference) {
      setExpandedIngredient(null);
    } else {
      setExpandedIngredient(reference);
    }
  };

  // Get unique categories
  const categories = ["all", ...new Set(ingredients.map(ingredient => ingredient.Category).filter(Boolean))].sort();

  // Filter ingredients based on search and category
  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = 
      ingredient.Reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.Description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient?.Texture?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient?.Benefit?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || ingredient.Category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <Card className="brutal-card mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Emma Ingredients</CardTitle>
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
          <CardTitle className="text-xl">Emma Ingredients</CardTitle>
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Emma Ingredients</CardTitle>
          <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-12">
            <Database className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-center text-lg font-medium mb-2">
              No ingredient data available
            </p>
            <p className="text-center text-muted-foreground mb-6 max-w-md">
              There might be an issue connecting to the database or the emma_ingredients table is empty.
            </p>
            <Button onClick={refetch} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <FloatingCurrencySelector />
      <Card className="brutal-card mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Emma Ingredients</CardTitle>
          <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search ingredients..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Reference</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIngredients.map((ingredient) => (
                  <React.Fragment key={ingredient.Reference}>
                    <TableRow className="hover:bg-accent/50">
                      <TableCell className="font-mono font-medium">
                        {ingredient.Reference}
                      </TableCell>
                      <TableCell>{ingredient.Description}</TableCell>
                      <TableCell>
                        {ingredient.Category && (
                          <Badge variant="outline">{ingredient.Category}</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono" data-price-element="true">
                        {ingredient["Beauty institute"] 
                          ? formatPrice(convertPrice(ingredient["Beauty institute"])) 
                          : "N/A"}
                      </TableCell>
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
                      <TableRow className="bg-muted/30">
                        <TableCell colSpan={5} className="p-4">
                          <div className="flex flex-col space-y-4">
                            {ingredient["INCI LIST"] && (
                              <div>
                                <h4 className="text-sm font-semibold mb-1">INCI List:</h4>
                                <p className="text-sm text-muted-foreground">
                                  {ingredient["INCI LIST"]}
                                </p>
                              </div>
                            )}
                            {ingredient["Ingredient Breakdown"] && (
                              <div>
                                <h4 className="text-sm font-semibold mb-1">Ingredient Breakdown:</h4>
                                <p className="text-sm text-muted-foreground">
                                  {ingredient["Ingredient Breakdown"]}
                                </p>
                              </div>
                            )}
                            {ingredient["FRAGRANCE NOTES"] && (
                              <div>
                                <h4 className="text-sm font-semibold mb-1">Fragrance Notes:</h4>
                                <p className="text-sm text-muted-foreground">
                                  {ingredient["FRAGRANCE NOTES"]}
                                </p>
                              </div>
                            )}
                            {ingredient.Benefit && (
                              <div>
                                <h4 className="text-sm font-semibold mb-1">Benefits:</h4>
                                <p className="text-sm text-muted-foreground">
                                  {ingredient.Benefit}
                                </p>
                              </div>
                            )}
                            {ingredient.Texture && (
                              <div>
                                <h4 className="text-sm font-semibold mb-1">Texture:</h4>
                                <p className="text-sm text-muted-foreground">
                                  {ingredient.Texture}
                                </p>
                              </div>
                            )}
                            {ingredient["Full Description"] && (
                              <div>
                                <h4 className="text-sm font-semibold mb-1">Full Description:</h4>
                                <p className="text-sm text-muted-foreground">
                                  {ingredient["Full Description"]}
                                </p>
                              </div>
                            )}
                            {ingredient["Order quantity"] && (
                              <div>
                                <h4 className="text-sm font-semibold mb-1">Order Quantity:</h4>
                                <p className="text-sm text-muted-foreground">
                                  {ingredient["Order quantity"]}
                                </p>
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
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredIngredients.length} of {ingredients.length} ingredients
          </div>
        </CardContent>
      </Card>
    </>
  );
};
