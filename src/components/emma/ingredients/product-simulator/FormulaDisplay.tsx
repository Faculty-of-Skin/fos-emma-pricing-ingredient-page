
import React from "react";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FlaskConical, List, Leaf, Sparkles, Droplets, ArrowRight, CreditCard } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

// Base prices in EUR
const PRICES = {
  texture: 5.86,
  active: 5.56,
  fragrance: 3.38
};

interface FormulaDisplayProps {
  selectedTexture: EmmaIngredient | null;
  selectedActives: EmmaIngredient[];
  selectedFragrance: EmmaIngredient | null;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ 
  selectedTexture, 
  selectedActives, 
  selectedFragrance 
}) => {
  const { formatPrice, convertPrice } = useCurrency();
  
  const textureStyles = {
    badge: 'bg-green-100 text-green-800',
    icon: <Leaf className="h-3 w-3 text-green-600" />
  };
  
  const activeStyles = {
    badge: 'bg-blue-100 text-blue-800',
    icon: <Sparkles className="h-3 w-3 text-blue-600" />
  };
  
  const fragranceStyles = {
    badge: 'bg-purple-100 text-purple-800',
    icon: <Droplets className="h-3 w-3 text-purple-600" />
  };

  // Calculate the total price based on selected capsules
  const calculateTotalPrice = () => {
    let total = 0;
    
    if (selectedTexture) {
      total += PRICES.texture;
    }
    
    if (selectedActives.length > 0) {
      total += PRICES.active * selectedActives.length;
    }
    
    if (selectedFragrance) {
      total += PRICES.fragrance;
    }
    
    return total;
  };

  const totalPrice = calculateTotalPrice();

  if (!selectedTexture) {
    return (
      <>
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
        </CardContent>
        <CardFooter className="bg-slate-50 border-t px-5 py-3">
          <p className="text-xs text-slate-500">
            <strong>Formula Guide:</strong> One texture capsule is required. You may add up to two active capsules and one fragrance capsule.
          </p>
        </CardFooter>
      </>
    );
  }

  return (
    <>
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
        <div className="p-5 bg-gradient-to-br from-slate-50 to-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-wrap gap-2">
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
            
            <div className="bg-white border rounded-lg px-4 py-2 shadow-sm">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                <span className="text-lg font-bold text-primary" data-price-element="true">
                  {formatPrice(convertPrice(totalPrice))}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                <span>{selectedTexture ? 1 : 0} Texture</span>
                <span> • {selectedActives.length} Active</span>
                <span> • {selectedFragrance ? 1 : 0} Fragrance</span>
              </div>
            </div>
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
      </CardContent>
      <CardFooter className="bg-slate-50 border-t px-5 py-3 flex justify-between items-center">
        <p className="text-xs text-slate-500">
          <strong>Formula Guide:</strong> One texture capsule is required. You may add up to two active capsules and one fragrance capsule.
        </p>
        
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-700 font-medium">Total:</span>
          <span className="text-xs font-bold text-primary" data-price-element="true">
            {formatPrice(convertPrice(totalPrice))}
          </span>
        </div>
      </CardFooter>
    </>
  );
};
