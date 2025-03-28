
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/context/CurrencyContext";
import { ROICalculatorInputs } from "@/utils/roiCalculator";

interface ROICalculatorInputsProps {
  inputs: ROICalculatorInputs;
  onInputChange: (key: keyof ROICalculatorInputs, value: number) => void;
}

export const ROICalculatorInputSection = ({ inputs, onInputChange }: ROICalculatorInputsProps) => {
  const { formatPrice, convertPrice, currency } = useCurrency();
  const { machineCount, utilizationRate, daysPerYear, pricePerProduct } = inputs;
  
  // Convert product price from USD to current currency for display
  const convertedPrice = currency === "USD" ? pricePerProduct : convertPrice(pricePerProduct / 1.10);

  return (
    <Card className="border-2 border-brutal-black">
      <CardContent className="p-6">
        <h3 className="font-mono text-brutal-black font-bold mb-4 text-lg">Input Your Details</h3>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="machineCount" className="font-mono text-brutal-black mb-2 block">
              1. Number of Emma Machines: {machineCount}
            </Label>
            <Slider 
              id="machineCount"
              min={1} 
              max={10} 
              step={1}
              value={[machineCount]}
              onValueChange={(value) => onInputChange('machineCount', value[0])}
              className="my-2"
            />
            <p className="text-xs text-brutal-charcoal mt-1 font-mono">
              Select how many Emma machines you plan to operate.
            </p>
          </div>
          
          <div>
            <Label htmlFor="utilizationRate" className="font-mono text-brutal-black mb-2 block">
              2. Utilization Rate: {utilizationRate}%
            </Label>
            <Slider 
              id="utilizationRate"
              min={10} 
              max={100} 
              step={5}
              value={[utilizationRate]}
              onValueChange={(value) => onInputChange('utilizationRate', value[0])}
              className="my-2"
            />
            <p className="text-xs text-brutal-charcoal mt-1 font-mono">
              Adjust the slider to set the percent utilization of the Emma machine based on daily customer appointments.
            </p>
          </div>
          
          <div>
            <Label htmlFor="daysPerYear" className="font-mono text-brutal-black mb-2 block">
              3. Operating Days Per Year: {daysPerYear}
            </Label>
            <Slider 
              id="daysPerYear"
              min={100} 
              max={365} 
              step={5}
              value={[daysPerYear]}
              onValueChange={(value) => onInputChange('daysPerYear', value[0])}
              className="my-2"
            />
            <p className="text-xs text-brutal-charcoal mt-1 font-mono">
              Enter the number of days your business is open each year.
            </p>
          </div>
          
          <div>
            <Label htmlFor="pricePerProduct" className="font-mono text-brutal-black mb-2 block">
              4. Average Price per Product: {formatPrice(convertedPrice)}
            </Label>
            <Slider 
              id="pricePerProduct"
              min={20} 
              max={150} 
              step={1}
              value={[pricePerProduct]}
              onValueChange={(value) => onInputChange('pricePerProduct', value[0])}
              className="my-2"
            />
            <p className="text-xs text-brutal-charcoal mt-1 font-mono">
              Set the price for a typical product using the Emma machine. Base price: $67 USD.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
