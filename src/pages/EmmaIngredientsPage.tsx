
import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useEmmaIngredients } from "@/hooks/useEmmaIngredients";
import { EmmaIngredientsHeader } from "@/components/emma/ingredients/page/EmmaIngredientsHeader";
import { IngredientTypeCards } from "@/components/emma/ingredients/page/IngredientTypeCards";
import { IngredientsTableSection } from "@/components/emma/ingredients/page/IngredientsTableSection";
import { ProductSimulatorSection } from "@/components/emma/ingredients/page/ProductSimulatorSection";

const EmmaIngredientsPage = () => {
  const { isAdmin } = useAuth();
  const { ingredients, isLoading, error } = useEmmaIngredients();
  
  // Update document title when component mounts
  useEffect(() => {
    document.title = "Faculty of Skin - Emma Ingredients";
    return () => {
      // Optional: Reset title when component unmounts
      // document.title = "Faculty of Skin";
    };
  }, []);
  
  // Filter out equipment and accessories
  const filteredIngredientsWithoutEquipment = !isLoading && !error ? ingredients.filter(
    (ingredient) => {
      const category = ingredient.Category?.toLowerCase() || "";
      return !category.includes("equipment") && !category.includes("accessories") && !category.includes("accessory");
    }
  ) : [];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <EmmaIngredientsHeader />
          
          <IngredientTypeCards />
          
          <IngredientsTableSection />
          
          {!isLoading && !error && filteredIngredientsWithoutEquipment.length > 0 && (
            <ProductSimulatorSection ingredients={filteredIngredientsWithoutEquipment} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmmaIngredientsPage;
