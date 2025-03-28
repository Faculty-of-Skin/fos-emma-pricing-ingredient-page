
import { useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { ROICalculatorInputSection } from "./ROICalculatorInputs";
import { ROICalculatorResultsSection } from "./ROICalculatorResults";
import { calculateROIResults, ROICalculatorInputs } from "@/utils/roiCalculator";

export const ROICalculator = () => {
  const { currency, convertPrice } = useCurrency();
  const [inputs, setInputs] = useState<ROICalculatorInputs>({
    machineCount: 1,
    utilizationRate: 50,
    daysPerYear: 300,
    pricePerProduct: 67, // USD base price
  });
  
  const handleInputChange = (key: keyof ROICalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };
  
  // Calculate results based on inputs
  const results = calculateROIResults(inputs, currency, convertPrice);
  
  return (
    <section className="py-2">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-4 bg-brutal-white/60 border-2 border-brutal-black p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase mb-2">
              ROI Calculator for the Faculty of Skin Emma Machine
            </h2>
            <p className="text-brutal-charcoal font-mono mb-4 max-w-3xl mx-auto">
              Optimize Your Investment with Our Custom ROI Calculator
            </p>
            <p className="text-brutal-charcoal font-mono mb-8 max-w-3xl mx-auto text-sm">
              Maximize your returns and understand the financial benefits of integrating the Faculty of Skin Emma machine into your beauty institute. Use our easy-to-navigate calculator to input your specific costs and pricing to see detailed financial outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <ROICalculatorInputSection 
              inputs={inputs} 
              onInputChange={handleInputChange} 
            />
            
            {/* Results Section */}
            <ROICalculatorResultsSection results={results} />
          </div>
          
          <div className="text-center mt-6">
            <p className="text-brutal-charcoal font-mono text-sm max-w-3xl mx-auto">
              Adjust and experiment with different scenarios to find the most profitable setup for your business. 
              This calculator provides an estimate based on the provided inputs and industry averages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
