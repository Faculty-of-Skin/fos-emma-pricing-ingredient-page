
import { useMemo } from "react";
import { EmmaIngredient } from "@/types/emmaIngredients";

export const useProductIngredientFilters = (
  ingredients: EmmaIngredient[],
  productType: "face" | "body"
) => {
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

  return {
    textureIngredients,
    activeIngredients,
    fragranceIngredients
  };
};
