
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
      <SelectTrigger className="w-20 h-7 bg-brutal-white border border-brutal-black/30 text-sm">
        <SelectValue placeholder="USD" />
      </SelectTrigger>
      <SelectContent className="bg-brutal-white border border-brutal-black/30">
        <SelectItem value="USD" className="font-mono text-sm">USD</SelectItem>
        <SelectItem value="EUR" className="font-mono text-sm">EUR</SelectItem>
        <SelectItem value="CAD" className="font-mono text-sm">CAD</SelectItem>
      </SelectContent>
    </Select>
  );
};
