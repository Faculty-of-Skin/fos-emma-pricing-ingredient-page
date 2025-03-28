
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCurrency } from "@/context/CurrencyContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Accessory = {
  category: string;
  reference: string;
  description: string;
  importer_price: number;
  distributor_price: number;
  beauty_institute_price: number;
  final_consumer_price: number | null;
  importer_moq: number;
  distributor_moq: number;
  beauty_institute_moq: number;
};

export const EmmaAccessoriesPricing = () => {
  const { convertPrice, formatPrice } = useCurrency();
  const [accessoriesData, setAccessoriesData] = useState<Accessory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .in("category", ['Accessories', 'Face capsule', 'Body capsule', 'Marketing item'])
          .order("category")
          .order("reference");
        
        if (error) {
          console.error("Error fetching accessories:", error);
          return;
        }
        
        setAccessoriesData(data);
      } catch (error) {
        console.error("Failed to fetch accessories data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAccessories();
  }, []);
  
  // Calculate average MOQ values if data is available
  const calculateVolumeData = () => {
    if (accessoriesData.length === 0) {
      return { importer: 500, distributor: 50, beautyInstitute: 5 };
    }
    
    // Find a face or body capsule for representative MOQs
    const capsule = accessoriesData.find(item => 
      item.category === 'Face capsule' || item.category === 'Body capsule'
    );
    
    if (capsule) {
      return {
        importer: capsule.importer_moq,
        distributor: capsule.distributor_moq, 
        beautyInstitute: capsule.beauty_institute_moq
      };
    }
    
    return { importer: 500, distributor: 50, beautyInstitute: 5 };
  };
  
  const volumeData = calculateVolumeData();

  return (
    <div className="brutal-card">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Consumables & Accessories</h2>
        <p className="text-brutal-charcoal font-mono uppercase text-sm mt-2">Pricing Without Tax</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono uppercase text-brutal-black">Category</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black">Reference</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black">Description</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Importer
                <div className="font-mono text-xs text-brutal-gray mt-1">(Without tax) MOQ: {volumeData.importer}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Distributor
                <div className="font-mono text-xs text-brutal-gray mt-1">(Without tax) MOQ: {volumeData.distributor}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Beauty Institute
                <div className="font-mono text-xs text-brutal-gray mt-1">(Without tax) MOQ: {volumeData.beautyInstitute}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Final Consumer
                <div className="font-mono text-xs text-brutal-gray mt-1">(Without tax)</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">Loading product data...</TableCell>
              </TableRow>
            ) : accessoriesData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">No product data available</TableCell>
              </TableRow>
            ) : (
              accessoriesData.map((item, index) => (
                <TableRow key={index} className={`border-t-2 border-brutal-black/30 hover:bg-brutal-white/80 ${
                  index > 0 && item.category !== accessoriesData[index - 1].category ? 'border-t-4 border-brutal-black pt-4' : ''
                }`}>
                  <TableCell className="font-mono font-medium">{item.category}</TableCell>
                  <TableCell className="font-mono">{item.reference}</TableCell>
                  <TableCell className="font-mono">{item.description}</TableCell>
                  <TableCell className="font-mono text-right">
                    {formatPrice(convertPrice(item.importer_price))}
                  </TableCell>
                  <TableCell className="font-mono text-right">
                    {formatPrice(convertPrice(item.distributor_price))}
                  </TableCell>
                  <TableCell className="font-mono text-right">
                    {formatPrice(convertPrice(item.beauty_institute_price))}
                  </TableCell>
                  <TableCell className="font-mono text-right">
                    {item.final_consumer_price === null ? "NA" : formatPrice(convertPrice(item.final_consumer_price))}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        <div className="brutal-card border-2 bg-brutal-white/70">
          <h3 className="font-mono uppercase text-brutal-black font-bold mb-3">MOQ Information</h3>
          <p className="font-mono text-sm text-brutal-charcoal">
            MOQ (Minimum Order Quantity) varies by buyer type:
          </p>
          <ul className="mt-2 space-y-1">
            <li className="font-mono text-sm">Importer: {volumeData.importer} units</li>
            <li className="font-mono text-sm">Distributor: {volumeData.distributor} units</li>
            <li className="font-mono text-sm">Beauty Institute: {volumeData.beautyInstitute} units</li>
          </ul>
        </div>
        
        <div className="brutal-card border-2 bg-brutal-white/70">
          <h3 className="font-mono uppercase text-brutal-black font-bold mb-3">Ordering Information</h3>
          <p className="font-mono text-sm text-brutal-charcoal">
            For bulk orders and distributor pricing, please contact our sales team directly.
            Custom packaging and branding options are available for distributors and importers.
          </p>
        </div>
      </div>
    </div>
  );
};
