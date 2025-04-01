
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
        onProductTypeChange={onProductTypeChange} 
      />
    </div>
  );
};
