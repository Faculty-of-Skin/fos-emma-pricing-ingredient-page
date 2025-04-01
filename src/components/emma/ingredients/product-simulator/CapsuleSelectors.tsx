
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { TextureCapsuleSelector } from "./TextureCapsuleSelector";
import { ActiveCapsuleSelector } from "./ActiveCapsuleSelector";
import { FragranceCapsuleSelector } from "./FragranceCapsuleSelector";

interface CapsuleSelectorsProps {
  textureIngredients: EmmaIngredient[];
  activeIngredients: EmmaIngredient[];
  fragranceIngredients: EmmaIngredient[];
  selectedTextureRef: string | null;
  selectedActiveRefs: string[];
  selectedFragranceRef: string | null;
  onTextureChange: (value: string) => void;
  onActiveChange: (value: string) => void;
  onFragranceChange: (value: string) => void;
  onReset: () => void;
}

export const CapsuleSelectors: React.FC<CapsuleSelectorsProps> = ({
  textureIngredients,
  activeIngredients,
  fragranceIngredients,
  selectedTextureRef,
  selectedActiveRefs,
  selectedFragranceRef,
  onTextureChange,
  onActiveChange,
  onFragranceChange,
  onReset
}) => {
  const selectedTexture = textureIngredients.find(i => i.Reference === selectedTextureRef) || null;
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TextureCapsuleSelector 
          textureIngredients={textureIngredients}
          selectedTexture={selectedTexture}
          onTextureChange={onTextureChange}
        />

        <ActiveCapsuleSelector 
          activeIngredients={activeIngredients}
          selectedActiveRefs={selectedActiveRefs}
          onActiveChange={onActiveChange}
        />

        <FragranceCapsuleSelector 
          fragranceIngredients={fragranceIngredients}
          selectedFragranceRef={selectedFragranceRef}
          onFragranceChange={onFragranceChange}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Reset Selections
        </Button>
      </div>
    </>
  );
};
