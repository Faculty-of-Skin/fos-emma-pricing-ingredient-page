
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { FormulaDisplay } from "./FormulaDisplay";
import { SimulatorHeader } from "./SimulatorHeader";
import { CapsuleSelectors } from "./CapsuleSelectors";
import { useProductIngredientFilters } from "./useProductIngredientFilters";

interface EmmaProductSimulatorProps {
  ingredients: EmmaIngredient[];
}

export const EmmaProductSimulator: React.FC<EmmaProductSimulatorProps> = ({ ingredients }) => {
  const [productType, setProductType] = useState<"face" | "body">("face");
  const [selectedTextureRef, setSelectedTextureRef] = useState<string | null>(null);
  const [selectedActiveRefs, setSelectedActiveRefs] = useState<string[]>([]);
  const [selectedFragranceRef, setSelectedFragranceRef] = useState<string | null>(null);

  // Get filtered ingredients based on product type
  const { 
    textureIngredients, 
    activeIngredients, 
    fragranceIngredients 
  } = useProductIngredientFilters(ingredients, productType);

  // Find selected ingredients
  const selectedTexture = textureIngredients.find(i => i.Reference === selectedTextureRef) || null;
  const selectedActives = activeIngredients.filter(i => selectedActiveRefs.includes(i.Reference));
  const selectedFragrance = fragranceIngredients.find(i => i.Reference === selectedFragranceRef) || null;

  // Event handlers
  const handleProductTypeChange = (value: string) => {
    setProductType(value as "face" | "body");
    resetSelections();
  };

  const handleTextureChange = (value: string) => {
    setSelectedTextureRef(value);
  };

  const handleActiveChange = (value: string) => {
    if (selectedActiveRefs.includes(value)) {
      setSelectedActiveRefs(selectedActiveRefs.filter(ref => ref !== value));
    } else {
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

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-100 to-white p-6 rounded-xl border shadow-sm">
        <SimulatorHeader 
          productType={productType}
          onProductTypeChange={handleProductTypeChange}
        />

        <CapsuleSelectors 
          textureIngredients={textureIngredients}
          activeIngredients={activeIngredients}
          fragranceIngredients={fragranceIngredients}
          selectedTextureRef={selectedTextureRef}
          selectedActiveRefs={selectedActiveRefs}
          selectedFragranceRef={selectedFragranceRef}
          onTextureChange={handleTextureChange}
          onActiveChange={handleActiveChange}
          onFragranceChange={handleFragranceChange}
          onReset={resetSelections}
        />
      </div>

      <Card className="border shadow-lg overflow-hidden">
        <FormulaDisplay 
          selectedTexture={selectedTexture}
          selectedActives={selectedActives}
          selectedFragrance={selectedFragrance}
        />
      </Card>
    </div>
  );
};
