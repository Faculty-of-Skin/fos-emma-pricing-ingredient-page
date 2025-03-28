
import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/context/CurrencyContext";
import { ROICalculatorResults, formatNumber, OPERATIONAL_COST_PERCENT } from "@/utils/roiCalculator";
import { useState } from "react";

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

  return (
    <Card className="border-2 border-brutal-black">
      <CardContent className="p-6">
        <h3 className="font-mono text-brutal-black font-bold mb-4 text-lg">View Your Financial Projections</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-mono text-brutal-black font-medium mb-2">Monthly Revenue</h4>
            <p className="text-2xl font-bold text-brutal-black font-mono">
              {formatPrice(monthlyRevenue)}
            </p>
            <p className="text-xs text-brutal-charcoal mt-1 font-mono">
              Based on {formatNumber(monthlyTreatments)} treatments per month
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-brutal-black font-medium mb-2">Annual Revenue</h4>
            <p className="text-2xl font-bold text-brutal-black font-mono">
              {formatPrice(annualRevenue)}
            </p>
            <p className="text-xs text-brutal-charcoal mt-1 font-mono">
              Based on {formatNumber(yearlyTreatments)} treatments per year
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-brutal-black font-medium mb-2">Net Profit</h4>
            <p className="text-2xl font-bold text-brutal-black font-mono">
              {formatPrice(annualProfit)} <span className="text-sm">per year</span>
            </p>
            <p className="text-xs text-brutal-charcoal mt-1 font-mono">
              {formatPrice(monthlyProfit)} per month after operational costs
            </p>
          </div>
          
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="brutal-button w-full mt-4 font-mono text-sm tracking-wide"
          >
            {showDetails ? 'Hide Calculation Details' : 'Show Calculation Details'}
          </button>
          
          {showDetails && (
            <div className="mt-4 p-4 bg-brutal-black/5 rounded-md">
              <h4 className="font-mono text-brutal-black font-medium mb-2">Calculation Details</h4>
              <ul className="space-y-2 text-sm font-mono text-brutal-charcoal">
                <li>• Daily capacity per machine: {12} treatments</li>
                <li>• Actual daily treatments: {Math.floor(12 * (results.yearlyTreatments / (results.yearlyTreatments * 12)))} (based on {results.yearlyTreatments / (results.yearlyTreatments * 12) * 100}% utilization)</li>
                <li>• Operational cost: {(OPERATIONAL_COST_PERCENT * 100).toFixed(0)}% of revenue</li>
                <li>• Annual operational cost: {formatPrice(annualOperationalCost)}</li>
                <li>• Average price per treatment: {formatPrice(convertedPrice)}</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
