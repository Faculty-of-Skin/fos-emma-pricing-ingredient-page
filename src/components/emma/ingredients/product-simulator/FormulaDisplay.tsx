
import React from "react";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { FlaskConical, ArrowRight } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { FormulaBadges } from "./FormulaBadges";
import { InciListAccordion } from "./InciListAccordion";
import { PriceDisplay } from "./PriceDisplay";

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
            <FormulaBadges 
              selectedTexture={selectedTexture} 
              selectedActives={selectedActives} 
              selectedFragrance={selectedFragrance} 
            />
            
            <PriceDisplay 
              totalPrice={totalPrice}
              textureCount={selectedTexture ? 1 : 0}
              activeCount={selectedActives.length}
              fragranceCount={selectedFragrance ? 1 : 0}
            />
          </div>

          <InciListAccordion 
            selectedTexture={selectedTexture}
            selectedActives={selectedActives}
            selectedFragrance={selectedFragrance}
          />
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
