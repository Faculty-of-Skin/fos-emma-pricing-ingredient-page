
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Leaf, ChevronDown, ChevronUp } from "lucide-react";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { Button } from "@/components/ui/button";

interface TextureCapsulesProps {
  textureIngredients: EmmaIngredient[];
  selectedTexture: EmmaIngredient | null;
  onTextureChange: (value: string) => void;
}

export const TextureCapsuleSelector: React.FC<TextureCapsulesProps> = ({
  textureIngredients,
  selectedTexture,
  onTextureChange
}) => {
  const textureStyles = {
    border: 'border-green-100',
    header: 'bg-gradient-to-r from-green-50 to-green-100',
    icon: <Leaf className="h-5 w-5 text-green-600" />
  };
  
  const [showAll, setShowAll] = useState(false);
  const displayCount = showAll ? textureIngredients.length : 5;
  const displayIngredients = textureIngredients.slice(0, displayCount);
  
  // Extract first few ingredients from INCI list to show as preview
  const getIngredientsPreview = (inciList: string | undefined) => {
    if (!inciList) return "No ingredients available";
    
    const ingredients = inciList.split(',').map(i => i.trim());
    const previewIngredients = ingredients.slice(0, 3);
    return previewIngredients.join(', ') + (ingredients.length > 3 ? '...' : '');
  };

  return (
    <Card className={`border-l-4 ${textureStyles.border} hover:shadow-md transition-shadow`}>
      <CardHeader className={`${textureStyles.header} pb-3`}>
        <div className="flex items-center gap-2">
          {textureStyles.icon}
          <div>
            <h3 className="text-sm font-semibold">Texture Capsule</h3>
            <p className="text-xs text-muted-foreground">Required: Select 1</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {textureIngredients.length > 0 ? (
          <Select value={selectedTexture?.Reference || ""} onValueChange={onTextureChange}>
            <SelectTrigger className="w-full border-dashed">
              <SelectValue placeholder="Select texture capsule" />
            </SelectTrigger>
            <SelectContent>
              {displayIngredients.map(ingredient => (
                <SelectItem key={ingredient.Reference} value={ingredient.Reference} className="py-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{ingredient.Reference}</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{ingredient.Description}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {getIngredientsPreview(ingredient["INCI LIST"])}
                    </p>
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
      {textureIngredients.length > 5 && (
        <CardFooter className="pt-2 pb-4 px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs w-full flex items-center justify-center gap-1"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                Show less <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                Show all {textureIngredients.length} capsules <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
