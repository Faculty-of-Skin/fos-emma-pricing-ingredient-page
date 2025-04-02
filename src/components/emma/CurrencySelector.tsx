
import { useCurrency, Currency } from '@/context/CurrencyContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from 'react';

export const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();
  
  const handleCurrencyChange = (value: string) => {
    console.log("CurrencySelector: Setting currency to", value);
    setCurrency(value as Currency);
  };
  
  // Debug current currency value
  useEffect(() => {
    console.log("CurrencySelector: Current currency is", currency);
  }, [currency]);

  return (
    <Select value={currency} onValueChange={handleCurrencyChange}>
      <SelectTrigger className="w-24 h-8 bg-brutal-white border-2 border-brutal-black text-sm font-mono uppercase">
        <SelectValue placeholder="USD" />
      </SelectTrigger>
      <SelectContent className="bg-brutal-white border-2 border-brutal-black">
        <SelectItem value="USD" className="font-mono text-sm uppercase">USD</SelectItem>
        <SelectItem value="EUR" className="font-mono text-sm uppercase">EUR</SelectItem>
        <SelectItem value="CAD" className="font-mono text-sm uppercase">CAD</SelectItem>
      </SelectContent>
    </Select>
  );
};
