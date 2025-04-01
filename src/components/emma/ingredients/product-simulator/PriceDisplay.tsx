
import React from "react";
import { CreditCard } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

interface PriceDisplayProps {
  totalPrice: number;
  textureCount: number;
  activeCount: number;
  fragranceCount: number;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  totalPrice,
  textureCount,
  activeCount,
  fragranceCount
}) => {
  const { formatPrice, convertPrice } = useCurrency();
  
  return (
    <div className="bg-white border rounded-lg px-4 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <CreditCard className="h-4 w-4 text-primary" />
        <span className="text-lg font-bold text-primary" data-price-element="true">
          {formatPrice(convertPrice(totalPrice))}
        </span>
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        <span>{textureCount} Texture</span>
        <span> • {activeCount} Active</span>
        <span> • {fragranceCount ? 1 : 0} Fragrance</span>
      </div>
    </div>
  );
};
