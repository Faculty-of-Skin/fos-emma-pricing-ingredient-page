
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTypeSelectorProps {
  productType: "face" | "body";
  onProductTypeChange: (value: string) => void;
}

export const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({ 
  productType, 
  onProductTypeChange 
}) => {
  return (
    <Tabs value={productType} onValueChange={onProductTypeChange} className="w-[200px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="face" className="text-sm">Face</TabsTrigger>
        <TabsTrigger value="body" className="text-sm">Body</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
