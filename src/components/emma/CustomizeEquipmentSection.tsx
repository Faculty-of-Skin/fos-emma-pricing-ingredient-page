
import { useState, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type EquipmentProduct = {
  reference: string;
  description: string;
  beauty_institute_price: number;
  final_consumer_price: number | null;
};

export const CustomizeEquipmentSection = () => {
  const { formatPrice, convertPrice } = useCurrency();
  const [machinePackCount, setMachinePackCount] = useState(1); // Always at least 1
  const [calibrationKitCount, setCalibrationKitCount] = useState(0);
  const [thermalPrinterCount, setThermalPrinterCount] = useState(0);
  const [dermoSmartCount, setDermoSmartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [equipmentProducts, setEquipmentProducts] = useState<EquipmentProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fallback prices (in EUR) in case database fetch fails
  const FALLBACK_PRICES = {
    AE101: 1500, // Emma Machine Pack
    AE201: 14,   // Calibration Kit
    AE600: 200,  // Thermal Printer
    AE500: 721   // Chowis DermoSmart
  };

  useEffect(() => {
    const fetchEquipmentProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("reference, description, beauty_institute_price, final_consumer_price")
          .eq("category", "Equipment")
          .in("reference", ["AE101", "AE201", "AE600", "AE500"])
          .order("reference");
          
        if (error) {
          console.error("Error fetching equipment products:", error);
          setError("Failed to load equipment data");
        } else {
          console.log("Fetched equipment products for customize section:", data);
          setEquipmentProducts(data || []);
        }
      } catch (err) {
        console.error("Exception fetching equipment for customize section:", err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEquipmentProducts();
  }, []);

  // Helper function to get product price from database or use fallback
  const getProductPrice = (reference: string): number => {
    const product = equipmentProducts.find(product => product.reference === reference);
    if (product && product.beauty_institute_price) {
      return product.beauty_institute_price;
    }
    return FALLBACK_PRICES[reference as keyof typeof FALLBACK_PRICES] || 0;
  };

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
            <Card className="border-2 border-brutal-black">
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-mono text-brutal-black font-bold mb-2">Emma Machine Pack</h3>
                  <p className="text-sm text-brutal-charcoal mb-2 font-mono">
                    {formatPrice(convertPrice(getProductPrice("AE101")))} each
                  </p>
                  <div className="w-full mt-2">
                    <Select 
                      value={machinePackCount.toString()} 
                      onValueChange={(value) => setMachinePackCount(parseInt(value))}
                    >
                      <SelectTrigger className="w-full h-8 bg-brutal-white border-2 border-brutal-black">
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent className="bg-brutal-white border-2 border-brutal-black">
                        <SelectItem value="1" className="font-mono">1</SelectItem>
                        <SelectItem value="2" className="font-mono">2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-brutal-charcoal mt-2 italic font-mono">
                    Required component (AE101)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-brutal-black">
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-mono text-brutal-black font-bold mb-2">Calibration Kit</h3>
                  <p className="text-sm text-brutal-charcoal mb-2 font-mono">
                    {formatPrice(convertPrice(getProductPrice("AE201")))} each
                  </p>
                  <div className="w-full mt-2">
                    <Select 
                      value={calibrationKitCount.toString()} 
                      onValueChange={(value) => setCalibrationKitCount(parseInt(value))}
                    >
                      <SelectTrigger className="w-full h-8 bg-brutal-white border-2 border-brutal-black">
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className="bg-brutal-white border-2 border-brutal-black">
                        <SelectItem value="0" className="font-mono">0</SelectItem>
                        <SelectItem value="1" className="font-mono">1</SelectItem>
                        <SelectItem value="2" className="font-mono">2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-brutal-charcoal mt-2 italic font-mono">
                    AE201
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-brutal-black">
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-mono text-brutal-black font-bold mb-2">Thermal Printer</h3>
                  <p className="text-sm text-brutal-charcoal mb-2 font-mono">
                    {formatPrice(convertPrice(getProductPrice("AE600")))} each
                  </p>
                  <div className="w-full mt-2">
                    <Select 
                      value={thermalPrinterCount.toString()} 
                      onValueChange={(value) => setThermalPrinterCount(parseInt(value))}
                    >
                      <SelectTrigger className="w-full h-8 bg-brutal-white border-2 border-brutal-black">
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className="bg-brutal-white border-2 border-brutal-black">
                        <SelectItem value="0" className="font-mono">0</SelectItem>
                        <SelectItem value="1" className="font-mono">1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-brutal-charcoal mt-2 italic font-mono">
                    AE600
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-brutal-black">
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-mono text-brutal-black font-bold mb-2">Chowis DermoSmart</h3>
                  <p className="text-sm text-brutal-charcoal mb-2 font-mono">
                    {formatPrice(convertPrice(getProductPrice("AE500")))} each
                  </p>
                  <div className="w-full mt-2">
                    <Select 
                      value={dermoSmartCount.toString()} 
                      onValueChange={(value) => setDermoSmartCount(parseInt(value))}
                    >
                      <SelectTrigger className="w-full h-8 bg-brutal-white border-2 border-brutal-black">
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className="bg-brutal-white border-2 border-brutal-black">
                        <SelectItem value="0" className="font-mono">0</SelectItem>
                        <SelectItem value="1" className="font-mono">1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-brutal-charcoal mt-2 italic font-mono">
                    AE500
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-4 py-3 border-t-2 border-brutal-black/20">
            <p className="text-xl font-bold font-mono text-brutal-black mb-1">
              Total: {formatPrice(convertPrice(totalPrice))}
            </p>
            <p className="text-brutal-charcoal font-mono mt-1 text-sm">
              {machinePackCount} Machine Pack, {calibrationKitCount} Calibration Kit, {thermalPrinterCount} Thermal Printer, {dermoSmartCount} DermoSmart
            </p>
            <p className="text-brutal-charcoal font-mono mt-3 text-sm max-w-2xl mx-auto">
              Build your professional beauty equipment setup with the components you need. Each Emma machine is designed for optimal performance and long-term reliability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
