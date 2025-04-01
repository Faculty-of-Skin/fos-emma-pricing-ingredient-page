
import { useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FlaskConical, Sparkles, Droplets, Leaf, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Base prices in EUR
const PRICES = {
  texture: 5.86,
  active: 5.56,
  perfume: 3.38,
  bottle: 5.00
};

export const TreatmentSetSection = () => {
  const { formatPrice, convertPrice } = useCurrency();
  const [textureCount, setTextureCount] = useState(1); // Always at least 1
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
        <div className="bg-white rounded-xl border shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-slate-100 to-transparent border-b p-6">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-primary/90">Customize Your Treatment Set</h2>
              </div>
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                Select the quantities of each component to create your personalized treatment set tailored to your skin needs
              </p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 overflow-hidden transition-all hover:shadow-md">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>
                <CardContent className="pt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-white border border-emerald-100 shadow-sm flex items-center justify-center mb-3">
                      <Leaf className="h-5 w-5 text-emerald-500" />
                    </div>
                    <h3 className="font-semibold text-emerald-800 mb-2">Texture Capsules</h3>
                    <Badge variant="outline" className="mb-2 bg-white text-emerald-700 border-emerald-200" data-price-element="true">
                      {formatPrice(convertPrice(PRICES.texture))} each
                    </Badge>
                    <div className="w-full mt-2">
                      <Select 
                        value={textureCount.toString()} 
                        onValueChange={(value) => setTextureCount(parseInt(value))}
                        disabled // Disabled since it always must be 1
                      >
                        <SelectTrigger className="w-full h-10 bg-white border border-emerald-200">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-emerald-200">
                          <SelectItem value="1">1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      Required component for all formulations
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-blue-100 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden transition-all hover:shadow-md">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
                <CardContent className="pt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-white border border-blue-100 shadow-sm flex items-center justify-center mb-3">
                      <Sparkles className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-blue-800 mb-2">Active Capsules</h3>
                    <Badge variant="outline" className="mb-2 bg-white text-blue-700 border-blue-200" data-price-element="true">
                      {formatPrice(convertPrice(PRICES.active))} each
                    </Badge>
                    <div className="w-full mt-2">
                      <Select 
                        value={activeCount.toString()} 
                        onValueChange={(value) => setActiveCount(parseInt(value))}
                      >
                        <SelectTrigger className="w-full h-10 bg-white border border-blue-200">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-blue-200">
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Target specific skin concerns
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-violet-100 bg-gradient-to-br from-white to-violet-50/30 overflow-hidden transition-all hover:shadow-md">
                <div className="absolute top-0 left-0 w-full h-1 bg-violet-400"></div>
                <CardContent className="pt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-white border border-violet-100 shadow-sm flex items-center justify-center mb-3">
                      <Droplets className="h-5 w-5 text-violet-500" />
                    </div>
                    <h3 className="font-semibold text-violet-800 mb-2">Perfume Capsules</h3>
                    <Badge variant="outline" className="mb-2 bg-white text-violet-700 border-violet-200" data-price-element="true">
                      {formatPrice(convertPrice(PRICES.perfume))} each
                    </Badge>
                    <div className="w-full mt-2">
                      <Select 
                        value={perfumeCount.toString()} 
                        onValueChange={(value) => setPerfumeCount(parseInt(value))}
                      >
                        <SelectTrigger className="w-full h-10 bg-white border border-violet-200">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-violet-200">
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Enhance sensory experience
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-gradient-to-br from-white to-slate-50/30 overflow-hidden transition-all hover:shadow-md">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-400"></div>
                <CardContent className="pt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 20L16 4M7 4H17M6 8H18M9 12H15M7 16H17" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Reusable Bottles</h3>
                    <Badge variant="outline" className="mb-2 bg-white text-slate-700 border-slate-200" data-price-element="true">
                      {formatPrice(convertPrice(PRICES.bottle))} each
                    </Badge>
                    <div className="w-full mt-2">
                      <Select 
                        value={bottleCount.toString()} 
                        onValueChange={(value) => setBottleCount(parseInt(value))}
                      >
                        <SelectTrigger className="w-full h-10 bg-white border border-slate-200">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-slate-200">
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Sustainable dispensing solution
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-6 py-5 border-t">
              <div className="inline-block bg-white border rounded-lg px-8 py-3 shadow-sm">
                <div className="flex items-center justify-center mb-1">
                  <CreditCard className="h-4 w-4 text-primary mr-2" />
                  <p className="text-xl font-bold text-primary" data-price-element="true">
                    Total: {formatPrice(convertPrice(totalPrice))}
                  </p>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  {textureCount} Texture, {activeCount} Active, {perfumeCount} Perfume, {bottleCount} Bottle
                </p>
              </div>
              
              <Button className="mt-6 bg-primary/90 hover:bg-primary">
                Add to Cart
              </Button>
              
              <p className="text-muted-foreground mt-5 text-sm max-w-2xl mx-auto">
                Customize your treatment set for your specific needs. Each treatment set is designed for optimal results and sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
