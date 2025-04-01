
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  FlaskConical, 
  List, 
  Droplets, 
  Sparkles, 
  Leaf,
  Check,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

  // Visual helper to determine capsule type styling
  const getCapsuleTypeStyles = (type: 'texture' | 'active' | 'fragrance') => {
    switch (type) {
      case 'texture':
        return {
          bg: 'bg-green-50',
          border: 'border-green-100',
          icon: <Leaf className="h-5 w-5 text-green-600" />,
          header: 'bg-gradient-to-r from-green-50 to-green-100',
          badge: 'bg-green-100 text-green-800'
        };
      case 'active':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-100',
          icon: <Sparkles className="h-5 w-5 text-blue-600" />,
          header: 'bg-gradient-to-r from-blue-50 to-blue-100',
          badge: 'bg-blue-100 text-blue-800'
        };
      case 'fragrance':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-100',
          icon: <Droplets className="h-5 w-5 text-purple-600" />,
          header: 'bg-gradient-to-r from-purple-50 to-purple-100',
          badge: 'bg-purple-100 text-purple-800'
        };
    }
  };

  const textureStyles = getCapsuleTypeStyles('texture');
  const activeStyles = getCapsuleTypeStyles('active');
  const fragranceStyles = getCapsuleTypeStyles('fragrance');

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-100 to-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FlaskConical className="h-7 w-7 text-primary" />
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Product Simulator</h2>
              <p className="text-slate-500">Mix and match capsules to create your custom formula</p>
            </div>
          </div>
          
          <Tabs value={productType} onValueChange={handleProductTypeChange} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="face" className="text-sm">Face</TabsTrigger>
              <TabsTrigger value="body" className="text-sm">Body</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Texture Capsule Selection */}
          <Card className={`border-l-4 ${textureStyles.border} hover:shadow-md transition-shadow`}>
            <CardHeader className={`${textureStyles.header} pb-3`}>
              <div className="flex items-center gap-2">
                {textureStyles.icon}
                <div>
                  <CardTitle className="text-sm font-semibold">Texture Capsule</CardTitle>
                  <CardDescription className="text-xs">Required: Select 1</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {textureIngredients.length > 0 ? (
                <Select value={selectedTextureRef || ""} onValueChange={handleTextureChange}>
                  <SelectTrigger className="w-full border-dashed">
                    <SelectValue placeholder="Select texture capsule" />
                  </SelectTrigger>
                  <SelectContent>
                    {textureIngredients.map(ingredient => (
                      <SelectItem key={ingredient.Reference} value={ingredient.Reference}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{ingredient.Reference}</span>
                          <span className="text-muted-foreground">•</span>
                          <span>{ingredient.Description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>No texture capsules available</p>
                </div>
              )}
              
              {selectedTexture && (
                <div className="mt-4 p-3 bg-green-50/50 rounded-md border border-green-100">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <p className="text-sm font-medium text-slate-800">{selectedTexture.Reference} selected</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{selectedTexture.Description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Capsule Selection */}
          <Card className={`border-l-4 ${activeStyles.border} hover:shadow-md transition-shadow`}>
            <CardHeader className={`${activeStyles.header} pb-3`}>
              <div className="flex items-center gap-2">
                {activeStyles.icon}
                <div>
                  <CardTitle className="text-sm font-semibold">Active Capsules</CardTitle>
                  <CardDescription className="text-xs">Optional: Select up to 2</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {activeIngredients.length > 0 ? (
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {activeIngredients.map(ingredient => (
                    <Button
                      key={ingredient.Reference}
                      variant={selectedActiveRefs.includes(ingredient.Reference) ? "default" : "outline"}
                      size="sm"
                      className={`w-full justify-start text-left ${selectedActiveRefs.includes(ingredient.Reference) ? 'bg-blue-600 hover:bg-blue-700' : 'border-dashed'}`}
                      onClick={() => handleActiveChange(ingredient.Reference)}
                    >
                      <div className="flex items-center gap-2">
                        {selectedActiveRefs.includes(ingredient.Reference) && <Check className="h-4 w-4" />}
                        <span className="font-medium">{ingredient.Reference}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="truncate">{ingredient.Description}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>No active capsules available</p>
                </div>
              )}
              
              {selectedActiveRefs.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50/50 rounded-md border border-blue-100">
                  <p className="text-sm font-medium text-slate-800">{selectedActiveRefs.length} active capsule(s) selected</p>
                  <p className="text-xs text-slate-500 mt-1">{selectedActiveRefs.join(', ')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Fragrance Capsule Selection */}
          <Card className={`border-l-4 ${fragranceStyles.border} hover:shadow-md transition-shadow`}>
            <CardHeader className={`${fragranceStyles.header} pb-3`}>
              <div className="flex items-center gap-2">
                {fragranceStyles.icon}
                <div>
                  <CardTitle className="text-sm font-semibold">Fragrance Capsule</CardTitle>
                  <CardDescription className="text-xs">Optional: Select up to 1</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {fragranceIngredients.length > 0 ? (
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {fragranceIngredients.map(ingredient => (
                    <Button
                      key={ingredient.Reference}
                      variant={selectedFragranceRef === ingredient.Reference ? "default" : "outline"}
                      size="sm"
                      className={`w-full justify-start text-left ${selectedFragranceRef === ingredient.Reference ? 'bg-purple-600 hover:bg-purple-700' : 'border-dashed'}`}
                      onClick={() => handleFragranceChange(ingredient.Reference)}
                    >
                      <div className="flex items-center gap-2">
                        {selectedFragranceRef === ingredient.Reference && <Check className="h-4 w-4" />}
                        <span className="font-medium">{ingredient.Reference}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="truncate">{ingredient.Description}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>No fragrance capsules available</p>
                </div>
              )}
              
              {selectedFragranceRef && (
                <div className="mt-4 p-3 bg-purple-50/50 rounded-md border border-purple-100">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-600" />
                    <p className="text-sm font-medium text-slate-800">{selectedFragranceRef} selected</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={resetSelections} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Reset Selections
          </Button>
        </div>
      </div>

      {/* Final Product Formula Result */}
      <Card className="border shadow-lg overflow-hidden">
        <CardHeader className={`bg-gradient-to-r from-slate-800 to-slate-700 text-white`}>
          <div className="flex items-center gap-3">
            <FlaskConical className="h-6 w-6 text-white" />
            <CardTitle>Final Product Formula</CardTitle>
          </div>
          <CardDescription className="text-slate-300">
            The combined ingredients of your selected capsules
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {selectedTexture ? (
            <div>
              <div className="p-5 bg-gradient-to-br from-slate-50 to-white">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTexture && (
                    <Badge variant="outline" className={`${textureStyles.badge} flex items-center gap-1`}>
                      {textureStyles.icon}
                      <span>{selectedTexture.Reference}</span>
                    </Badge>
                  )}
                  
                  {selectedActives.map(active => (
                    <Badge key={active.Reference} variant="outline" className={`${activeStyles.badge} flex items-center gap-1`}>
                      <Sparkles className="h-3 w-3 text-blue-600" />
                      <span>{active.Reference}</span>
                    </Badge>
                  ))}
                  
                  {selectedFragrance && (
                    <Badge variant="outline" className={`${fragranceStyles.badge} flex items-center gap-1`}>
                      <Droplets className="h-3 w-3 text-purple-600" />
                      <span>{selectedFragrance.Reference}</span>
                    </Badge>
                  )}
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="inci" className="border-none">
                    <AccordionTrigger className="py-2 hover:no-underline">
                      <div className="flex items-center gap-2 text-left">
                        <List className="h-4 w-4 text-primary" />
                        <div>
                          <span className="font-medium">Combined INCI List</span>
                          <p className="text-xs text-muted-foreground">Full ingredient declaration</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-white">
                        <div className="space-y-4">
                          {selectedTexture && (
                            <div className="p-3 rounded-md bg-green-50/50 border border-green-100">
                              <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                                {textureStyles.icon}
                                <span>{selectedTexture.Reference} - {selectedTexture.Description}</span>
                              </h4>
                              <Separator className="my-2" />
                              <p className="text-xs whitespace-pre-wrap">{selectedTexture["INCI LIST"] || "No INCI list available"}</p>
                            </div>
                          )}
                          
                          {selectedActives.length > 0 && selectedActives.map(active => (
                            <div key={active.Reference} className="p-3 rounded-md bg-blue-50/50 border border-blue-100">
                              <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                                {activeStyles.icon}
                                <span>{active.Reference} - {active.Description}</span>
                              </h4>
                              <Separator className="my-2" />
                              <p className="text-xs whitespace-pre-wrap">{active["INCI LIST"] || "No INCI list available"}</p>
                            </div>
                          ))}
                          
                          {selectedFragrance && (
                            <div className="p-3 rounded-md bg-purple-50/50 border border-purple-100">
                              <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                                {fragranceStyles.icon}
                                <span>{selectedFragrance.Reference} - {selectedFragrance.Description}</span>
                              </h4>
                              <Separator className="my-2" />
                              <p className="text-xs whitespace-pre-wrap">{selectedFragrance["INCI LIST"] || "No INCI list available"}</p>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-slate-100 to-slate-50 border-t">
                <div className="flex items-center gap-2 text-primary">
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-sm font-medium">Your formula is ready for mixing</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-slate-50">
              <div className="max-w-md mx-auto">
                <FlaskConical className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700 mb-2">Create Your Formula</h3>
                <p className="text-slate-500 mb-6">Select at least a texture capsule to start visualizing your custom product formula</p>
                <div className="flex justify-center">
                  <div className="inline-flex items-center text-sm text-primary">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Choose ingredients from the selection panels above
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-slate-50 border-t px-5 py-3">
          <p className="text-xs text-slate-500">
            <strong>Formula Guide:</strong> One texture capsule is required. You may add up to two active capsules and one fragrance capsule.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
