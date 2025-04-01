
import React from "react";
import { Badge } from "@/components/ui/badge";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { Leaf, Sparkles, Droplets } from "lucide-react";

interface FormulaBadgesProps {
  selectedTexture: EmmaIngredient | null;
  selectedActives: EmmaIngredient[];
  selectedFragrance: EmmaIngredient | null;
}

export const FormulaBadges: React.FC<FormulaBadgesProps> = ({
  selectedTexture,
  selectedActives,
  selectedFragrance
}) => {
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
  
  return (
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
  );
};
