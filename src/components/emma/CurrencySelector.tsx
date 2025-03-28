
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useCurrency, Currency } from '@/context/CurrencyContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();
  
  const handleCurrencyChange = (value: string) => {
    setCurrency(value as Currency);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span className="font-mono uppercase text-xs text-brutal-charcoal">Currency:</span>
      <Select value={currency} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-24 h-8 bg-brutal-white border-2 border-brutal-black">
          <SelectValue placeholder="USD" />
        </SelectTrigger>
        <SelectContent className="bg-brutal-white border-2 border-brutal-black">
          <SelectItem value="USD" className="font-mono">USD</SelectItem>
          <SelectItem value="EUR" className="font-mono">EUR</SelectItem>
          <SelectItem value="CAD" className="font-mono">CAD</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
