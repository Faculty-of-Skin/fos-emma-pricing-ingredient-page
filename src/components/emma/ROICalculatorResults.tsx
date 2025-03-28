
import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/context/CurrencyContext";
import { ROICalculatorResults, formatNumber, OPERATIONAL_COST_PERCENT } from "@/utils/roiCalculator";
import { useState } from "react";
import { Eye } from "lucide-react";

interface ROICalculatorResultsProps {
  results: ROICalculatorResults;
}

export const ROICalculatorResultsSection = ({ results }: ROICalculatorResultsProps) => {
  const { formatPrice } = useCurrency();
  const [showDetails, setShowDetails] = useState(false);
  
  const {
    monthlyTreatments,
    yearlyTreatments,
    convertedPrice,
    annualRevenue,
    monthlyRevenue,
    annualOperationalCost,
    annualProfit,
    monthlyProfit
  } = results;

  // Format monetary values with two decimal places
  const formatMonetaryValue = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <Card className="border-2 border-brutal-black">
      <CardContent className="p-6">
        <h3 className="font-mono text-brutal-black font-bold mb-4 text-lg">View Your Financial Projections</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-mono text-brutal-black font-medium mb-2">Monthly Revenue</h4>
            <p className="text-3xl font-bold text-brutal-black font-mono">
              ${formatMonetaryValue(monthlyRevenue)}
            </p>
            <p className="text-sm text-brutal-charcoal mt-1 font-mono">
              Based on {formatNumber(monthlyTreatments)} treatments per month
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-brutal-black font-medium mb-2">Annual Revenue</h4>
            <p className="text-3xl font-bold text-brutal-black font-mono">
              ${formatMonetaryValue(annualRevenue)}
            </p>
            <p className="text-sm text-brutal-charcoal mt-1 font-mono">
              Based on {formatNumber(yearlyTreatments)} treatments per year
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-brutal-black font-medium mb-2">Net Profit</h4>
            <p className="text-3xl font-bold text-brutal-black font-mono">
              ${formatMonetaryValue(annualProfit)} <span className="text-lg">per year</span>
            </p>
            <p className="text-sm text-brutal-charcoal mt-1 font-mono">
              ${formatMonetaryValue(monthlyProfit)} per month after operational costs
            </p>
          </div>
          
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="brutal-button w-full bg-brutal-dark text-brutal-white p-4 font-mono text-center border-brutal-dark"
          >
            {showDetails ? "HIDE DETAILS" : "SHOW CALCULATION DETAILS"}
          </button>
          
          {showDetails && (
            <div className="mt-4 p-4 bg-brutal-gray/30 rounded-md">
              <h4 className="font-mono text-brutal-black font-medium mb-2">Calculation Details</h4>
              <ul className="space-y-2 text-sm font-mono text-brutal-charcoal">
                <li>• Daily capacity per machine: {12} treatments</li>
                <li>• Actual daily treatments: {Math.floor(12 * (results.yearlyTreatments / (365 * 12)))} (based on utilization)</li>
                <li>• Operational cost: {(OPERATIONAL_COST_PERCENT * 100).toFixed(0)}% of revenue</li>
                <li>• Annual operational cost: ${formatMonetaryValue(annualOperationalCost)}</li>
                <li>• Average price per treatment: ${formatMonetaryValue(convertedPrice)}</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
