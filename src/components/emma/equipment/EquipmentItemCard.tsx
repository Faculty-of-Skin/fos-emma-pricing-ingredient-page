
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EquipmentItemCardProps {
  title: string;
  reference: string;
  price: string;
  count: number;
  maxCount: number;
  minCount?: number;
  isRequired?: boolean;
  onCountChange: (count: number) => void;
}

export const EquipmentItemCard = ({
  title,
  reference,
  price,
  count,
  maxCount,
  minCount = 0,
  isRequired = false,
  onCountChange,
}: EquipmentItemCardProps) => {
  return (
    <Card className="border-2 border-brutal-black">
      <CardContent className="pt-4">
        <div className="flex flex-col items-center">
          <h3 className="font-mono text-brutal-black font-bold mb-2">{title}</h3>
          <p className="text-sm text-brutal-charcoal mb-2 font-mono">
            {price} each
          </p>
          <div className="w-full mt-2">
            <Select 
              value={count.toString()} 
              onValueChange={(value) => onCountChange(parseInt(value))}
            >
              <SelectTrigger className="w-full h-8 bg-brutal-white border-2 border-brutal-black">
                <SelectValue placeholder={minCount.toString()} />
              </SelectTrigger>
              <SelectContent className="bg-brutal-white border-2 border-brutal-black">
                {Array.from({ length: maxCount - minCount + 1 }, (_, i) => i + minCount).map((value) => (
                  <SelectItem key={value} value={value.toString()} className="font-mono">
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-brutal-charcoal mt-2 italic font-mono">
            {isRequired ? "Required component" : ""} ({reference})
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
