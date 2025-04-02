
import { useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEquipmentProducts } from "./equipment/useEquipmentProducts";
import { EquipmentItemCard } from "./equipment/EquipmentItemCard";
import { EquipmentSummary } from "./equipment/EquipmentSummary";

export const CustomizeEquipmentSection = () => {
  const { formatPrice, convertPrice } = useCurrency();
  const [machinePackCount, setMachinePackCount] = useState(1); // Always at least 1
  const [calibrationKitCount, setCalibrationKitCount] = useState(0);
  const [thermalPrinterCount, setThermalPrinterCount] = useState(0);
  const [dermoSmartCount, setDermoSmartCount] = useState(0);
  
  const { isLoading, error, getProductPrice } = useEquipmentProducts();

  // Calculate the total price based on selected quantities
  const calculateTotalPrice = () => {
    const machinePackPrice = getProductPrice("AE101") * machinePackCount;
    const calibrationKitPrice = getProductPrice("AE201") * calibrationKitCount;
    const thermalPrinterPrice = getProductPrice("AE600") * thermalPrinterCount;
    const dermoSmartPrice = getProductPrice("AE500") * dermoSmartCount;
    
    return machinePackPrice + calibrationKitPrice + thermalPrinterPrice + dermoSmartPrice;
  };

  const totalPrice = calculateTotalPrice();
  
  if (isLoading) {
    return (
      <section className="py-2">
        <div className="container mx-auto px-4">
          <div className="brutal-card mb-4 bg-brutal-white/60 border-2 border-brutal-black p-6">
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading equipment data...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-2">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-4 bg-brutal-white/60 border-2 border-brutal-black p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase mb-2">Customize Your Equipment Set</h2>
            <p className="text-brutal-charcoal font-mono mb-4">
              Select the quantities of each equipment component to create your personalized setup
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <EquipmentItemCard 
              title="Emma Machine Pack"
              reference="AE101"
              price={formatPrice(convertPrice(getProductPrice("AE101")))}
              count={machinePackCount}
              minCount={1}
              maxCount={2}
              isRequired={true}
              onCountChange={setMachinePackCount}
            />

            <EquipmentItemCard 
              title="Calibration Kit"
              reference="AE201"
              price={formatPrice(convertPrice(getProductPrice("AE201")))}
              count={calibrationKitCount}
              maxCount={2}
              onCountChange={setCalibrationKitCount}
            />

            <EquipmentItemCard 
              title="Thermal Printer"
              reference="AE600"
              price={formatPrice(convertPrice(getProductPrice("AE600")))}
              count={thermalPrinterCount}
              maxCount={2}
              onCountChange={setThermalPrinterCount}
            />

            <EquipmentItemCard 
              title="Chowis DermoSmart"
              reference="AE500"
              price={formatPrice(convertPrice(getProductPrice("AE500")))}
              count={dermoSmartCount}
              maxCount={2}
              onCountChange={setDermoSmartCount}
            />
          </div>

          <EquipmentSummary 
            machinePackCount={machinePackCount}
            calibrationKitCount={calibrationKitCount}
            thermalPrinterCount={thermalPrinterCount}
            dermoSmartCount={dermoSmartCount}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </section>
  );
};
