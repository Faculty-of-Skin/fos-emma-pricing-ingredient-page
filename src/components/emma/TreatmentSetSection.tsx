
import { useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// Base prices in EUR
const PRICES = {
  texture: 5.86,
  active: 5.56,
  perfume: 3.38,
  bottle: 5.00
};

export const TreatmentSetSection = () => {
  const { formatPrice, convertPrice } = useCurrency();
  const [textureCount, setTextureCount] = useState(1);
  const [activeCount, setActiveCount] = useState(1);
  const [perfumeCount, setPerfumeCount] = useState(1);
  const [bottleCount, setBottleCount] = useState(1);

  // Calculate the total price based on selected quantities
  const calculateTotalPrice = () => {
    const texturePrice = PRICES.texture * textureCount;
    const activePrice = PRICES.active * activeCount;
    const perfumePrice = PRICES.perfume * perfumeCount;
    const bottlePrice = PRICES.bottle * bottleCount;
    
    return texturePrice + activePrice + perfumePrice + bottlePrice;
  };

  const totalPrice = calculateTotalPrice();
  
  return (
    <section className="py-2">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-4 bg-brutal-white/60 border-2 border-brutal-black p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase mb-2">Customize Your Treatment Set</h2>
            <p className="text-brutal-charcoal font-mono mb-4">
              Select the quantities of each component to create your personalized treatment set
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <Card className="border-2 border-brutal-black">
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-mono text-brutal-black font-bold mb-2">Texture Capsules</h3>
                  <p className="text-sm text-brutal-charcoal mb-2 font-mono">
                    {formatPrice(convertPrice(PRICES.texture))} each
                  </p>
                  <div className="w-full mt-2">
                    <Select 
                      value={textureCount.toString()} 
                      onValueChange={(value) => setTextureCount(parseInt(value))}
                    >
                      <SelectTrigger className="w-full h-8 bg-brutal-white border-2 border-brutal-black">
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent className="bg-brutal-white border-2 border-brutal-black">
                        <SelectItem value="0" className="font-mono">0</SelectItem>
                        <SelectItem value="1" className="font-mono">1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-brutal-black">
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-mono text-brutal-black font-bold mb-2">Active Capsules</h3>
                  <p className="text-sm text-brutal-charcoal mb-2 font-mono">
                    {formatPrice(convertPrice(PRICES.active))} each
                  </p>
                  <div className="w-full mt-2">
                    <Select 
                      value={activeCount.toString()} 
                      onValueChange={(value) => setActiveCount(parseInt(value))}
                    >
                      <SelectTrigger className="w-full h-8 bg-brutal-white border-2 border-brutal-black">
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent className="bg-brutal-white border-2 border-brutal-black">
                        <SelectItem value="0" className="font-mono">0</SelectItem>
                        <SelectItem value="1" className="font-mono">1</SelectItem>
                        <SelectItem value="2" className="font-mono">2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-brutal-black">
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-mono text-brutal-black font-bold mb-2">Perfume Capsules</h3>
                  <p className="text-sm text-brutal-charcoal mb-2 font-mono">
                    {formatPrice(convertPrice(PRICES.perfume))} each
                  </p>
                  <div className="w-full mt-2">
                    <Select 
                      value={perfumeCount.toString()} 
                      onValueChange={(value) => setPerfumeCount(parseInt(value))}
                    >
                      <SelectTrigger className="w-full h-8 bg-brutal-white border-2 border-brutal-black">
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent className="bg-brutal-white border-2 border-brutal-black">
                        <SelectItem value="0" className="font-mono">0</SelectItem>
                        <SelectItem value="1" className="font-mono">1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-brutal-black">
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-mono text-brutal-black font-bold mb-2">Reusable Bottles</h3>
                  <p className="text-sm text-brutal-charcoal mb-2 font-mono">
                    {formatPrice(convertPrice(PRICES.bottle))} each
                  </p>
                  <div className="w-full mt-2">
                    <Select 
                      value={bottleCount.toString()} 
                      onValueChange={(value) => setBottleCount(parseInt(value))}
                    >
                      <SelectTrigger className="w-full h-8 bg-brutal-white border-2 border-brutal-black">
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent className="bg-brutal-white border-2 border-brutal-black">
                        <SelectItem value="0" className="font-mono">0</SelectItem>
                        <SelectItem value="1" className="font-mono">1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-4 py-3 border-t-2 border-brutal-black/20">
            <p className="text-xl font-bold font-mono text-brutal-black mb-1">
              Total: {formatPrice(convertPrice(totalPrice))}
            </p>
            <p className="text-brutal-charcoal font-mono mt-1 text-sm">
              {textureCount} Texture, {activeCount} Active, {perfumeCount} Perfume, {bottleCount} Bottle
            </p>
            <p className="text-brutal-charcoal font-mono mt-3 text-sm max-w-2xl mx-auto">
              Customize your treatment set for your specific needs. Each treatment set is designed for optimal results and sustainability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
