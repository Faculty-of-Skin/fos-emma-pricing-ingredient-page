
import { useCurrency } from "@/context/CurrencyContext";

// Operational constants
export const DAILY_CAPACITY = 12; // Maximum treatments per day per machine
export const OPERATIONAL_COST_PERCENT = 0.3; // 30% of revenue

export interface ROICalculatorInputs {
  machineCount: number;
  utilizationRate: number;
  daysPerYear: number;
  pricePerProduct: number;
}

export interface ROICalculatorResults {
  monthlyTreatments: number;
  yearlyTreatments: number;
  convertedPrice: number;
  annualRevenue: number;
  monthlyRevenue: number;
  annualOperationalCost: number;
  annualProfit: number;
  monthlyProfit: number;
}

export const calculateROIResults = (
  inputs: ROICalculatorInputs,
  currency: string,
  convertPrice: (price: number) => number
): ROICalculatorResults => {
  const { machineCount, utilizationRate, daysPerYear, pricePerProduct } = inputs;
  
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
  
  return {
    monthlyTreatments,
    yearlyTreatments,
    convertedPrice,
    annualRevenue,
    monthlyRevenue,
    annualOperationalCost,
    annualProfit,
    monthlyProfit
  };
};

// Format numbers with commas for thousands
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(Math.round(num));
};
