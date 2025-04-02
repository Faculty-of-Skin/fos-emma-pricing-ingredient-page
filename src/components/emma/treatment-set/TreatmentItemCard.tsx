
import { useCurrency } from "@/context/CurrencyContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TreatmentItemCardProps {
  title: string;
  priceInEUR: number;
  count: number;
  onCountChange: (count: number) => void;
  options: number[];
  disabled?: boolean;
  isRequired?: boolean;
}

export const TreatmentItemCard = ({
  title,
  priceInEUR,
  count,
  onCountChange,
  options,
  disabled = false,
  isRequired = false,
}: TreatmentItemCardProps) => {
  const { formatPrice, convertPrice } = useCurrency();

  return (
    <Card className="border-2 border-brutal-black">
      <CardContent className="pt-4">
        <div className="flex flex-col items-center">
          <h3 className="font-mono text-brutal-black font-bold mb-2">{title}</h3>
          <p className="text-sm text-brutal-charcoal mb-2 font-mono">
            {formatPrice(convertPrice(priceInEUR))} each
          </p>
          <div className="w-full mt-2">
            <Select
              value={count.toString()}
              onValueChange={(value) => onCountChange(parseInt(value))}
              disabled={disabled}
            >
              <SelectTrigger className="w-full h-8 bg-brutal-white border-2 border-brutal-black">
                <SelectValue placeholder={count.toString()} />
              </SelectTrigger>
              <SelectContent className="bg-brutal-white border-2 border-brutal-black">
                {options.map((option) => (
                  <SelectItem
                    key={option}
                    value={option.toString()}
                    className="font-mono"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isRequired && (
            <p className="text-xs text-brutal-charcoal mt-2 italic font-mono">
              Required component
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
