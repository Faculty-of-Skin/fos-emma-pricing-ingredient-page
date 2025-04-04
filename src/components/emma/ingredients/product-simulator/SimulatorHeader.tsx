
import React from "react";
import { FlaskConical } from "lucide-react";
import { ProductTypeSelector } from "./ProductTypeSelector";

interface SimulatorHeaderProps {
  productType: "face" | "body";
  onProductTypeChange: (value: string) => void;
}

export const SimulatorHeader: React.FC<SimulatorHeaderProps> = ({
  productType,
  onProductTypeChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center">
          <FlaskConical className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Product Simulator</h2>
          <p className="text-slate-500">Mix and match capsules to create your custom formula</p>
        </div>
      </div>
      
      <ProductTypeSelector 
        productType={productType} 
        onProductTypeChange={onProductTypeChange} 
      />
    </div>
  );
};
