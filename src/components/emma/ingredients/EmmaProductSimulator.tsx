
import React, { useState, useMemo } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RefreshCw, FlaskConical, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface EmmaProductSimulatorProps {
  ingredients: EmmaIngredient[];
}

export const EmmaProductSimulator: React.FC<EmmaProductSimulatorProps> = ({ ingredients }) => {
  const [productType, setProductType] = useState<"face" | "body">("face");
  const [selectedTextureRef, setSelectedTextureRef] = useState<string | null>(null);
  const [selectedActiveRefs, setSelectedActiveRefs] = useState<string[]>([]);
  const [selectedFragranceRef, setSelectedFragranceRef] = useState<string | null>(null);

  // Filter ingredients by type and product type (face/body)
  const textureIngredients = useMemo(() => 
    ingredients.filter(ingredient => {
      const category = ingredient.Category?.toLowerCase() || "";
      const description = ingredient.Description?.toLowerCase() || "";
      return description.startsWith("texture") && 
             (productType === "face" ? 
                category.includes("face capsule") || 
                (category.includes("capsule") && !category.includes("body capsule")) : 
                category.includes("body capsule"));
    }), 
  [ingredients, productType]);

  const activeIngredients = useMemo(() => 
    ingredients.filter(ingredient => {
      const category = ingredient.Category?.toLowerCase() || "";
      const description = ingredient.Description?.toLowerCase() || "";
      return description.startsWith("active") && 
             (productType === "face" ? 
                category.includes("face capsule") || 
                (category.includes("capsule") && !category.includes("body capsule")) : 
                category.includes("body capsule"));
    }), 
  [ingredients, productType]);

  const fragranceIngredients = useMemo(() => 
    ingredients.filter(ingredient => {
      const category = ingredient.Category?.toLowerCase() || "";
      const description = ingredient.Description?.toLowerCase() || "";
      return (description.startsWith("perfume") || description.startsWith("fragrance")) && 
             (productType === "face" ? 
                category.includes("face capsule") || 
                (category.includes("capsule") && !category.includes("body capsule")) : 
                category.includes("body capsule"));
    }), 
  [ingredients, productType]);

  // Get the selected ingredients based on reference
  const selectedTexture = textureIngredients.find(i => i.Reference === selectedTextureRef) || null;
  const selectedActives = activeIngredients.filter(i => selectedActiveRefs.includes(i.Reference));
  const selectedFragrance = fragranceIngredients.find(i => i.Reference === selectedFragranceRef) || null;

  // Combined INCI list and other properties
  const combinedInciList = useMemo(() => {
    const incis: string[] = [];
    
    if (selectedTexture && selectedTexture["INCI LIST"]) {
      incis.push(selectedTexture["INCI LIST"]);
    }
    
    selectedActives.forEach(active => {
      if (active["INCI LIST"]) {
        incis.push(active["INCI LIST"]);
      }
    });
    
    if (selectedFragrance && selectedFragrance["INCI LIST"]) {
      incis.push(selectedFragrance["INCI LIST"]);
    }
    
    return incis.join("\n\n");
  }, [selectedTexture, selectedActives, selectedFragrance]);

  // Handle selections
  const handleTextureChange = (value: string) => {
    setSelectedTextureRef(value);
  };

  const handleActiveChange = (value: string) => {
    if (selectedActiveRefs.includes(value)) {
      setSelectedActiveRefs(selectedActiveRefs.filter(ref => ref !== value));
    } else {
      // Only allow up to 2 active ingredients
      if (selectedActiveRefs.length < 2) {
        setSelectedActiveRefs([...selectedActiveRefs, value]);
      }
    }
  };

  const handleFragranceChange = (value: string) => {
    setSelectedFragranceRef(value === selectedFragranceRef ? null : value);
  };

  const resetSelections = () => {
    setSelectedTextureRef(null);
    setSelectedActiveRefs([]);
    setSelectedFragranceRef(null);
  };

  const handleProductTypeChange = (value: string) => {
    setProductType(value as "face" | "body");
    resetSelections();
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-xl">Product Simulator</CardTitle>
        <CardDescription>
          Create your ideal formula by combining different capsule types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Select Product Type</h3>
            <Tabs value={productType} onValueChange={handleProductTypeChange} className="w-[200px]">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="face">Face</TabsTrigger>
                <TabsTrigger value="body">Body</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Texture Capsule Selection */}
            <Card className="border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Texture Capsule</CardTitle>
                <CardDescription className="text-xs">Required: Select 1</CardDescription>
              </CardHeader>
              <CardContent>
                {textureIngredients.length > 0 ? (
                  <Select value={selectedTextureRef || ""} onValueChange={handleTextureChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select texture capsule" />
                    </SelectTrigger>
                    <SelectContent>
                      {textureIngredients.map(ingredient => (
                        <SelectItem key={ingredient.Reference} value={ingredient.Reference}>
                          {ingredient.Reference} - {ingredient.Description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-muted-foreground">No texture capsules available</p>
                )}
              </CardContent>
            </Card>

            {/* Active Capsule Selection */}
            <Card className="border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Capsules</CardTitle>
                <CardDescription className="text-xs">Optional: Select up to 2</CardDescription>
              </CardHeader>
              <CardContent>
                {activeIngredients.length > 0 ? (
                  <div className="space-y-2">
                    {activeIngredients.map(ingredient => (
                      <div key={ingredient.Reference} className="flex items-center">
                        <Button
                          variant={selectedActiveRefs.includes(ingredient.Reference) ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start text-left"
                          onClick={() => handleActiveChange(ingredient.Reference)}
                        >
                          {ingredient.Reference} - {ingredient.Description}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No active capsules available</p>
                )}
              </CardContent>
            </Card>

            {/* Fragrance Capsule Selection */}
            <Card className="border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Fragrance Capsule</CardTitle>
                <CardDescription className="text-xs">Optional: Select up to 1</CardDescription>
              </CardHeader>
              <CardContent>
                {fragranceIngredients.length > 0 ? (
                  <div className="space-y-2">
                    {fragranceIngredients.map(ingredient => (
                      <div key={ingredient.Reference} className="flex items-center">
                        <Button
                          variant={selectedFragranceRef === ingredient.Reference ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start text-left"
                          onClick={() => handleFragranceChange(ingredient.Reference)}
                        >
                          {ingredient.Reference} - {ingredient.Description}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No fragrance capsules available</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Combined Product Result */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Final Product Formula</h3>
              <Button variant="ghost" size="sm" onClick={resetSelections} className="ml-auto">
                <RefreshCw className="h-4 w-4 mr-2" /> Reset
              </Button>
            </div>

            {selectedTexture ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-primary/10">
                    {selectedTexture.Reference} (Texture)
                  </Badge>
                  
                  {selectedActives.map(active => (
                    <Badge key={active.Reference} variant="outline" className="bg-secondary/10">
                      {active.Reference} (Active)
                    </Badge>
                  ))}
                  
                  {selectedFragrance && (
                    <Badge variant="outline" className="bg-muted">
                      {selectedFragrance.Reference} (Fragrance)
                    </Badge>
                  )}
                </div>

                <Card className="bg-muted/30">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <List className="h-4 w-4 text-primary" />
                      <CardTitle className="text-sm font-medium">Combined INCI List</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                      <div className="space-y-4">
                        {selectedTexture && (
                          <div>
                            <h4 className="text-xs font-semibold mb-1">{selectedTexture.Reference} - {selectedTexture.Description}</h4>
                            <p className="text-xs whitespace-pre-wrap">{selectedTexture["INCI LIST"] || "No INCI list available"}</p>
                          </div>
                        )}
                        
                        {selectedActives.length > 0 && selectedActives.map(active => (
                          <div key={active.Reference}>
                            <Separator className="my-2" />
                            <h4 className="text-xs font-semibold mb-1">{active.Reference} - {active.Description}</h4>
                            <p className="text-xs whitespace-pre-wrap">{active["INCI LIST"] || "No INCI list available"}</p>
                          </div>
                        ))}
                        
                        {selectedFragrance && (
                          <div>
                            <Separator className="my-2" />
                            <h4 className="text-xs font-semibold mb-1">{selectedFragrance.Reference} - {selectedFragrance.Description}</h4>
                            <p className="text-xs whitespace-pre-wrap">{selectedFragrance["INCI LIST"] || "No INCI list available"}</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Select at least a texture capsule to visualize the final product</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>
          <strong>Note:</strong> A finished product requires one texture capsule, can have up to two active capsules, and optionally one fragrance capsule.
        </p>
      </CardFooter>
    </Card>
  );
};
