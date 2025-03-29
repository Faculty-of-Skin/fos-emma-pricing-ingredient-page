
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
    <Select value={currency} onValueChange={handleCurrencyChange}>
      <SelectTrigger className="w-24 h-8 bg-brutal-white border border-brutal-black/30">
        <SelectValue placeholder="USD" />
      </SelectTrigger>
      <SelectContent className="bg-brutal-white border border-brutal-black/30">
        <SelectItem value="USD" className="font-mono">USD</SelectItem>
        <SelectItem value="EUR" className="font-mono">EUR</SelectItem>
        <SelectItem value="CAD" className="font-mono">CAD</SelectItem>
      </SelectContent>
    </Select>
  );
};
