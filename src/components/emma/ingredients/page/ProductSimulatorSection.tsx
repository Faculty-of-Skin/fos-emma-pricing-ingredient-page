
import React from "react";
import { FlaskConical } from "lucide-react";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { EmmaProductSimulator } from "@/components/emma/ingredients/product-simulator/EmmaProductSimulator";

interface ProductSimulatorSectionProps {
  ingredients: EmmaIngredient[];
}

export const ProductSimulatorSection: React.FC<ProductSimulatorSectionProps> = ({ 
  ingredients 
}) => {
  return (
    <div className="overflow-hidden">
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border shadow-sm">
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-violet-500"></div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <FlaskConical className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Formula Creator</h2>
                <p className="text-muted-foreground text-sm">Mix and match capsules to visualize your custom product</p>
              </div>
            </div>
            <EmmaProductSimulator ingredients={ingredients} />
          </div>
        </div>
      </div>
    </div>
  );
};
