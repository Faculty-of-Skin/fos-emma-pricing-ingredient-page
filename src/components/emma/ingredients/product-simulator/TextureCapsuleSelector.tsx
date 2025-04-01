
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Leaf } from "lucide-react";
import { EmmaIngredient } from "@/types/emmaIngredients";

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
  );
};
