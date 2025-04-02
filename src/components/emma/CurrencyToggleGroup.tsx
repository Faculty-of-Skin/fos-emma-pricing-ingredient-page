
import { useCurrency, Currency } from '@/context/CurrencyContext';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DollarSign, Euro } from "lucide-react";
import { useEffect } from 'react';

export const CurrencyToggleGroup = () => {
  const { currency, setCurrency } = useCurrency();
  
  const handleCurrencyChange = (value: string) => {
    if (value) {
      console.log("CurrencyToggleGroup: Setting currency to", value);
      setCurrency(value as Currency);
    }
  };

  // Debug current currency value
  useEffect(() => {
    console.log("CurrencyToggleGroup: Current currency is", currency);
  }, [currency]);

  return (
    <ToggleGroup 
      type="single" 
      value={currency} 
      onValueChange={handleCurrencyChange} 
      className="border-2 border-brutal-black/20 rounded-md bg-white"
    >
      <ToggleGroupItem value="USD" aria-label="USD" className="flex gap-1 data-[state=on]:bg-brutal-black data-[state=on]:text-white">
        <DollarSign className="h-3.5 w-3.5" />
        <span className="font-mono text-xs">USD</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="EUR" aria-label="EUR" className="flex gap-1 data-[state=on]:bg-brutal-black data-[state=on]:text-white">
        <Euro className="h-3.5 w-3.5" />
        <span className="font-mono text-xs">EUR</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="CAD" aria-label="CAD" className="flex gap-1 data-[state=on]:bg-brutal-black data-[state=on]:text-white">
        <DollarSign className="h-3.5 w-3.5" />
        <span className="font-mono text-xs">CAD</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
