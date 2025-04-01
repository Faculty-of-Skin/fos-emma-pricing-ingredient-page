
import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, FlaskConical } from "lucide-react";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { ProductTypeSelector } from "./ProductTypeSelector";
import { TextureCapsuleSelector } from "./TextureCapsuleSelector";
import { ActiveCapsuleSelector } from "./ActiveCapsuleSelector";
import { FragranceCapsuleSelector } from "./FragranceCapsuleSelector";
import { FormulaDisplay } from "./FormulaDisplay";

interface EmmaProductSimulatorProps {
  ingredients: EmmaIngredient[];
}

export const EmmaProductSimulator: React.FC<EmmaProductSimulatorProps> = ({ ingredients }) => {
  const [productType, setProductType] = useState<"face" | "body">("face");
  const [selectedTextureRef, setSelectedTextureRef] = useState<string | null>(null);
  const [selectedActiveRefs, setSelectedActiveRefs] = useState<string[]>([]);
  const [selectedFragranceRef, setSelectedFragranceRef] = useState<string | null>(null);

  // Filter ingredients based on product type and categories
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FlaskConical className="h-7 w-7 text-primary" />
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Product Simulator</h2>
              <p className="text-slate-500">Mix and match capsules to create your custom formula</p>
            </div>
          </div>
          
          <ProductTypeSelector 
            productType={productType} 
            onProductTypeChange={handleProductTypeChange} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TextureCapsuleSelector 
            textureIngredients={textureIngredients}
            selectedTexture={selectedTexture}
            onTextureChange={handleTextureChange}
          />

          <ActiveCapsuleSelector 
            activeIngredients={activeIngredients}
            selectedActiveRefs={selectedActiveRefs}
            onActiveChange={handleActiveChange}
          />

          <FragranceCapsuleSelector 
            fragranceIngredients={fragranceIngredients}
            selectedFragranceRef={selectedFragranceRef}
            onFragranceChange={handleFragranceChange}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={resetSelections} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Reset Selections
          </Button>
        </div>
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
