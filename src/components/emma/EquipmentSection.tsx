
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrency } from "@/context/CurrencyContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type EquipmentProduct = {
  reference: string;
  description: string;
  beauty_institute_price: number;
  final_consumer_price: number | null;
};

export const EquipmentSection = () => {
  const { formatPrice, convertPrice } = useCurrency();
  const [isLoading, setIsLoading] = useState(true);
  const [equipmentProducts, setEquipmentProducts] = useState<EquipmentProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEquipmentProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("reference, description, beauty_institute_price, final_consumer_price")
          .eq("category", "Equipment")
          .order("reference");
          
        if (error) {
          console.error("Error fetching equipment products:", error);
          setError("Failed to load equipment data");
        } else {
          console.log("Fetched equipment products:", data);
          setEquipmentProducts(data || []);
        }
      } catch (err) {
        console.error("Exception fetching equipment:", err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEquipmentProducts();
  }, []);
  
  // Find products by reference (or use fallback descriptions if not found)
  const getProductByReference = (reference: string): EquipmentProduct | null => {
    return equipmentProducts.find(product => product.reference === reference) || null;
  };
  
  // Define the equipment items we want to display
  const equipmentItems = [
    { 
      reference: "AE101", 
      title: "Emma Machine Pack",
      description: "Equip your institute with the latest in skincare technology, designed for bespoke beauty experiences.",
      fallbackPrice: 1500
    },
    { 
      reference: "AE201", 
      title: "Calibration Kit",
      description: "Essential for ensuring your equipment operates with precision and accuracy.",
      fallbackPrice: 14
    },
    { 
      reference: "AE600", 
      title: "Thermal Printer",
      description: "Streamline your operations with on-site printing for client treatment plans and receipts.",
      fallbackPrice: 200
    },
    { 
      reference: "AE500", 
      title: "Chowis DermoSmart",
      description: "An advanced diagnostic tool that enhances treatment personalization and effectiveness.",
      fallbackPrice: 721
    }
  ];
  
  return (
    <section className="py-4" data-section="equipment">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Equipment</h2>
            <p className="text-brutal-charcoal font-mono mt-2">
              Equip your beauty institute with state-of-the-art technology designed to enhance the client experience and improve treatment outcomes.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading equipment data...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {equipmentItems.map((item, index) => {
                const productData = getProductByReference(item.reference);
                const price = productData?.beauty_institute_price || item.fallbackPrice;
                
                return (
                  <Card key={index} className="border-2 border-brutal-black">
                    <CardHeader>
                      <CardTitle className="font-mono text-brutal-black">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-bold mb-2 font-mono" data-price-element="true">
                        {formatPrice(convertPrice(price))}
                      </p>
                      <CardDescription className="font-mono">
                        {productData?.description || item.description}
                      </CardDescription>
                      <div className="text-xs mt-2 font-mono text-brutal-gray">
                        {productData ? `Ref: ${productData.reference}` : "Reference data not available"}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
