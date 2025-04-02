
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type EquipmentProduct = {
  reference: string;
  description: string;
  beauty_institute_price: number;
  final_consumer_price: number | null;
};

// Fallback prices (in EUR) in case database fetch fails
export const FALLBACK_PRICES = {
  AE101: 1500, // Emma Machine Pack
  AE201: 14,   // Calibration Kit
  AE600: 200,  // Thermal Printer
  AE500: 721   // Chowis DermoSmart
};

export const useEquipmentProducts = () => {
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

  return {
    isLoading,
    error,
    equipmentProducts,
    getProductPrice,
  };
};
