
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  RefreshCw,
  Loader2,
  AlertCircle,
  Search,
  Database,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";
import { useEmmaIngredients, EmmaIngredient } from "@/hooks/useEmmaIngredients";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCurrency } from "@/context/CurrencyContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const EmmaIngredients = () => {
  const { ingredients, isLoading, error, refetch, connectionStatus, rawData } = useEmmaIngredients();
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { formatPrice, convertPrice } = useCurrency();
  const [showDebugDialog, setShowDebugDialog] = useState(false);
  
  useEffect(() => {
    console.log("EmmaIngredients loaded with data:", ingredients);
    console.log("Connection status:", connectionStatus);
    console.log("Raw data from hook:", rawData);
  }, [ingredients, connectionStatus, rawData]);

  const toggleIngredient = (reference: string) => {
    if (expandedIngredient === reference) {
      setExpandedIngredient(null);
    } else {
      setExpandedIngredient(reference);
    }
  };

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesSearch =
      searchQuery === "" ||
      ingredient.Reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ingredient.Category && ingredient.Category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      categoryFilter === "all" || ingredient.Category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [
    "all",
    ...Array.from(new Set(ingredients.map((ingredient) => ingredient.Category))).filter(Boolean),
  ];

  const ConnectionStatusIndicator = () => {
    switch (connectionStatus) {
      case 'success':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Connected to database</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center text-red-600">
            <XCircle className="h-5 w-5 mr-2" />
            <span>Connection failed</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-muted-foreground">
            <Database className="h-5 w-5 mr-2" />
            <span>Checking connection...</span>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <Card className="brutal-card mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Emma Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Loading ingredients...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="brutal-card mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Emma Ingredients</CardTitle>
          <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Retry
          </Button>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading ingredients</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <ConnectionStatusIndicator />
          <div className="mt-4">
            <Button variant="outline" onClick={() => setShowDebugDialog(true)}>
              Show Debug Information
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
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowDebugDialog(true)}>
              <Info className="h-4 w-4" /> Debug
            </Button>
          </div>
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
            <div className="mb-6">
              <ConnectionStatusIndicator />
            </div>
            <div className="space-y-4 w-full max-w-md">
              <p className="text-sm text-muted-foreground">
                Some possible causes:
              </p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                <li>The emma_ingredients table doesn't exist in your database</li>
                <li>The table exists but has no data</li>
                <li>There may be permission issues accessing the table</li>
                <li>The connection to Supabase may be misconfigured</li>
                <li>Column names in the database don't match expected names</li>
              </ul>
            </div>
            <Button onClick={refetch} className="gap-2 mt-6">
              <RefreshCw className="h-4 w-4" /> Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="brutal-card mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Emma Ingredients</CardTitle>
          <CardDescription>
            All ingredients available in the Emma collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="mb-2 block">
                Search Ingredients
              </Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by reference, description or category..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <Label htmlFor="category" className="mb-2 block">
                Filter by Category
              </Label>
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredIngredients.length} of {ingredients.length} ingredients
            </p>
            <div className="flex items-center gap-2">
              <ConnectionStatusIndicator />
              <Button variant="outline" size="sm" onClick={() => setShowDebugDialog(true)}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[600px] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Reference</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-36">Category</TableHead>
                  <TableHead className="w-36">Order Quantity</TableHead>
                  <TableHead className="w-28 text-right">Beauty Institute</TableHead>
                  <TableHead className="w-28 text-right">Distributor</TableHead>
                  <TableHead className="w-28 text-right">Importer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIngredients.map((ingredient) => (
                  <React.Fragment key={ingredient.Reference}>
                    <TableRow 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleIngredient(ingredient.Reference)}
                    >
                      <TableCell className="font-medium">{ingredient.Reference}</TableCell>
                      <TableCell>{ingredient.Description}</TableCell>
                      <TableCell>
                        {ingredient.Category && (
                          <Badge variant="outline">{ingredient.Category}</Badge>
                        )}
                      </TableCell>
                      <TableCell>{ingredient["Order quantity"] || "EMPTY"}</TableCell>
                      <TableCell className="text-right">
                        {ingredient["Beauty institute"] 
                          ? formatPrice(convertPrice(ingredient["Beauty institute"])) 
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {ingredient.Distributor 
                          ? formatPrice(convertPrice(ingredient.Distributor)) 
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {ingredient.Importer 
                          ? formatPrice(convertPrice(ingredient.Importer)) 
                          : "-"}
                      </TableCell>
                    </TableRow>
                    {expandedIngredient === ingredient.Reference && (
                      <TableRow className="bg-muted/30">
                        <TableCell colSpan={7} className="p-4">
                          <div className="space-y-3">
                            {ingredient["Ingredient Breakdown"] && (
                              <div>
                                <h4 className="font-semibold mb-1">Ingredient Breakdown</h4>
                                <p className="text-sm">{ingredient["Ingredient Breakdown"]}</p>
                              </div>
                            )}
                            
                            {ingredient["INCI LIST"] && (
                              <div>
                                <h4 className="font-semibold mb-1">INCI List</h4>
                                <p className="text-sm">{ingredient["INCI LIST"]}</p>
                              </div>
                            )}
                            
                            {ingredient["FRAGRANCE NOTES"] && (
                              <div>
                                <h4 className="font-semibold mb-1">Fragrance Notes</h4>
                                <p className="text-sm">{ingredient["FRAGRANCE NOTES"]}</p>
                              </div>
                            )}
                            
                            {ingredient.Benefit && (
                              <div>
                                <h4 className="font-semibold mb-1">Benefits</h4>
                                <p className="text-sm">{ingredient.Benefit}</p>
                              </div>
                            )}
                            
                            {ingredient.Texture && (
                              <div>
                                <h4 className="font-semibold mb-1">Texture</h4>
                                <p className="text-sm">{ingredient.Texture}</p>
                              </div>
                            )}
                            
                            {ingredient["Full Description"] && (
                              <div>
                                <h4 className="font-semibold mb-1">Full Description</h4>
                                <p className="text-sm">{ingredient["Full Description"]}</p>
                              </div>
                            )}
                            
                            {ingredient["Final consumer"] && (
                              <div>
                                <h4 className="font-semibold mb-1">Final Consumer</h4>
                                <p className="text-sm">{ingredient["Final consumer"]}</p>
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
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-muted-foreground">
            Total: {ingredients.length} ingredients
          </p>
          <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDebugDialog} onOpenChange={setShowDebugDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Database Debug Information</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-md">Connection Status:</h3>
              <div className="p-2 bg-muted rounded-md">
                <ConnectionStatusIndicator />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-md">Raw Data from Database:</h3>
              <div className="p-2 bg-muted rounded-md max-h-60 overflow-auto">
                <pre className="text-xs whitespace-pre-wrap">
                  {rawData ? JSON.stringify(rawData, null, 2) : "No raw data available"}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-md">Mapped Data:</h3>
              <div className="p-2 bg-muted rounded-md max-h-60 overflow-auto">
                <pre className="text-xs whitespace-pre-wrap">
                  {ingredients.length > 0 ? JSON.stringify(ingredients, null, 2) : "No mapped data available"}
                </pre>
              </div>
            </div>

            <div className="pt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Troubleshooting Tips</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                    <li>Check that the table name is exactly 'emma_ingredients' (case-sensitive)</li>
                    <li>Verify column names match the expected format</li>
                    <li>Ensure your Supabase connection details are correct</li>
                    <li>Check that Row Level Security policies allow access to this table</li>
                    <li>Try inserting a test row directly in the Supabase dashboard</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
