
import { useState, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { CircleDollarSign } from "lucide-react";

export const ROICalculator = () => {
  const { formatPrice, convertPrice, currency } = useCurrency();
  const [machineCount, setMachineCount] = useState(1);
  const [utilizationRate, setUtilizationRate] = useState(50);
  const [daysPerYear, setDaysPerYear] = useState(300);
  const [pricePerProduct, setPricePerProduct] = useState(67); // USD base price
  const [showDetails, setShowDetails] = useState(false);
  
  // Operational constants
  const DAILY_CAPACITY = 12; // Maximum treatments per day per machine
  const OPERATIONAL_COST_PERCENT = 0.3; // 30% of revenue
  
  // Calculate financials
  const actualDailyTreatments = Math.floor(DAILY_CAPACITY * (utilizationRate / 100));
  const yearlyTreatments = actualDailyTreatments * daysPerYear * machineCount;
  const monthlyTreatments = yearlyTreatments / 12;
  
  // Convert product price from USD to current currency
  const convertedPrice = currency === "USD" ? pricePerProduct : convertPrice(pricePerProduct / 1.10);
  
  const annualRevenue = yearlyTreatments * convertedPrice;
  const monthlyRevenue = annualRevenue / 12;
  const annualOperationalCost = annualRevenue * OPERATIONAL_COST_PERCENT;
  const annualProfit = annualRevenue - annualOperationalCost;
  const monthlyProfit = annualProfit / 12;
  
  return (
    <section className="py-2">
      <div className="container mx-auto px-4">
        <div className="ms-window mb-4 p-0 bg-brutal-white">
          <div className="ms-window-title">
            <h2 className="text-xl font-bold uppercase">
              ROI Calculator for the Faculty of Skin Emma Machine
            </h2>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-4">
              <p className="text-brutal-black mb-4 max-w-3xl mx-auto">
                Optimize Your Investment with Our Custom ROI Calculator
              </p>
              <p className="text-brutal-black mb-8 max-w-3xl mx-auto text-sm">
                Maximize your returns and understand the financial benefits of integrating the Faculty of Skin Emma machine into your beauty institute. Use our easy-to-navigate calculator to input your specific costs and pricing to see detailed financial outcomes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="ms-window">
                <div className="ms-window-title">
                  <h3>Input Your Details</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="machineCount" className="font-bold text-brutal-black mb-2 block">
                        1. Number of Emma Machines: {machineCount}
                      </Label>
                      <Slider 
                        id="machineCount"
                        min={1} 
                        max={10} 
                        step={1}
                        value={[machineCount]}
                        onValueChange={(value) => setMachineCount(value[0])}
                        className="my-2"
                      />
                      <p className="text-xs text-brutal-black mt-1">
                        Select how many Emma machines you plan to operate.
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="utilizationRate" className="font-bold text-brutal-black mb-2 block">
                        2. Utilization Rate: {utilizationRate}%
                      </Label>
                      <Slider 
                        id="utilizationRate"
                        min={10} 
                        max={100} 
                        step={5}
                        value={[utilizationRate]}
                        onValueChange={(value) => setUtilizationRate(value[0])}
                        className="my-2"
                      />
                      <p className="text-xs text-brutal-black mt-1">
                        Adjust the slider to set the percent utilization of the Emma machine based on daily customer appointments.
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="daysPerYear" className="font-bold text-brutal-black mb-2 block">
                        3. Operating Days Per Year: {daysPerYear}
                      </Label>
                      <Slider 
                        id="daysPerYear"
                        min={100} 
                        max={365} 
                        step={5}
                        value={[daysPerYear]}
                        onValueChange={(value) => setDaysPerYear(value[0])}
                        className="my-2"
                      />
                      <p className="text-xs text-brutal-black mt-1">
                        Enter the number of days your business is open each year.
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="pricePerProduct" className="font-bold text-brutal-black mb-2 block">
                        4. Average Price per Product: {formatPrice(convertedPrice)}
                      </Label>
                      <Slider 
                        id="pricePerProduct"
                        min={20} 
                        max={150} 
                        step={1}
                        value={[pricePerProduct]}
                        onValueChange={(value) => setPricePerProduct(value[0])}
                        className="my-2"
                      />
                      <p className="text-xs text-brutal-black mt-1">
                        Set the price for a typical product using the Emma machine. Base price: $67 USD.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Results Section */}
              <div className="ms-window">
                <div className="ms-window-title">
                  <h3>View Your Financial Projections</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-brutal-black mb-2">Monthly Revenue</h4>
                      <p className="text-2xl font-bold text-brutal-black">
                        {formatPrice(monthlyRevenue)}
                      </p>
                      <p className="text-xs text-brutal-black mt-1">
                        Based on {monthlyTreatments.toFixed(0)} treatments per month
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-brutal-black mb-2">Annual Revenue</h4>
                      <p className="text-2xl font-bold text-brutal-black">
                        {formatPrice(annualRevenue)}
                      </p>
                      <p className="text-xs text-brutal-black mt-1">
                        Based on {yearlyTreatments.toFixed(0)} treatments per year
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-brutal-black mb-2">Net Profit</h4>
                      <p className="text-2xl font-bold text-brutal-black">
                        {formatPrice(annualProfit)} <span className="text-sm">per year</span>
                      </p>
                      <p className="text-xs text-brutal-black mt-1">
                        {formatPrice(monthlyProfit)} per month after operational costs
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setShowDetails(!showDetails)}
                      className="ms-button w-full mt-4 text-sm"
                    >
                      {showDetails ? 'Hide Calculation Details' : 'Show Calculation Details'}
                    </button>
                    
                    {showDetails && (
                      <div className="mt-4 p-4 border-2 border-dashed border-brutal-black">
                        <h4 className="font-bold text-brutal-black mb-2">Calculation Details</h4>
                        <ul className="space-y-2 text-sm text-brutal-black">
                          <li>• Daily capacity per machine: {DAILY_CAPACITY} treatments</li>
                          <li>• Actual daily treatments: {actualDailyTreatments} (based on {utilizationRate}% utilization)</li>
                          <li>• Operational cost: {(OPERATIONAL_COST_PERCENT * 100).toFixed(0)}% of revenue</li>
                          <li>• Annual operational cost: {formatPrice(annualOperationalCost)}</li>
                          <li>• Average price per treatment: {formatPrice(convertedPrice)}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-brutal-black text-sm max-w-3xl mx-auto">
                Adjust and experiment with different scenarios to find the most profitable setup for your business. 
                This calculator provides an estimate based on the provided inputs and industry averages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
