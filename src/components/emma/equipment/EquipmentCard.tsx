
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCurrency } from "@/context/CurrencyContext";

interface EquipmentCardProps {
  title: string;
  reference: string;
  price: number;
  description: string;
}

export const EquipmentCard = ({
  title,
  reference,
  price,
  description,
}: EquipmentCardProps) => {
  const { formatPrice, convertPrice } = useCurrency();
  
  return (
    <Card className="border-2 border-brutal-black">
      <CardHeader>
        <CardTitle className="font-mono text-brutal-black">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold mb-2 font-mono" data-price-element="true">
          {formatPrice(convertPrice(price))}
        </p>
        <CardDescription className="font-mono">
          {description}
        </CardDescription>
        <div className="text-xs mt-2 font-mono text-brutal-gray">
          Ref: {reference}
        </div>
      </CardContent>
    </Card>
  );
};
