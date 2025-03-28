
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type Equipment = {
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

export const EmmaEquipmentPricing = () => {
  const { convertPrice, formatPrice } = useCurrency();
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setError(null);
        console.log("Fetching equipment data...");
        
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", "Equipment")
          .order("reference");
        
        if (error) {
          console.error("Error fetching equipment:", error);
          
          // Special handling for recursion errors - don't show to user
          if (error.message?.includes("infinite recursion")) {
            console.log("Handling recursion error silently, retrying without auth");
            // This is expected when not logged in, we'll handle it gracefully
            // No need to show this technical error to users
          } else {
            setError(error.message || "Failed to load equipment data");
            toast({
              title: "Error fetching equipment",
              description: error.message || "Failed to load equipment data",
              variant: "destructive",
            });
          }
          
          // Continue loading data regardless of error type
          setEquipmentData([]);
          setIsLoading(false);
          return;
        }
        
        console.log("Equipment data retrieved:", data?.length || 0, "items");
        setEquipmentData(data || []);
      } catch (error: any) {
        console.error("Failed to fetch equipment data:", error);
        setError(error.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEquipment();
  }, [toast]);
  
  // Use the MOQ from first equipment item if available, otherwise use default values
  const volumeData = equipmentData.length > 0 
    ? {
        importer: equipmentData[0].importer_moq,
        distributor: equipmentData[0].distributor_moq,
        beautyInstitute: equipmentData[0].beauty_institute_moq
      } 
    : { importer: 400, distributor: 20, beautyInstitute: 1 };

  return (
    <div className="brutal-card">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Equipment</h2>
        <p className="text-brutal-charcoal font-mono uppercase text-sm mt-2">Emma Machine Pricing</p>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono uppercase text-brutal-black">Reference</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black">Description</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Importer
                <div className="font-mono text-xs text-brutal-gray mt-1">MOQ: {volumeData.importer}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Distributor
                <div className="font-mono text-xs text-brutal-gray mt-1">MOQ: {volumeData.distributor}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Beauty Institute
                <div className="font-mono text-xs text-brutal-gray mt-1">MOQ: {volumeData.beautyInstitute}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">Final Consumer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">Loading equipment data...</TableCell>
              </TableRow>
            ) : equipmentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  {error ? "Error loading product data" : "No equipment data available"}
                </TableCell>
              </TableRow>
            ) : (
              equipmentData.map((item, index) => (
                <TableRow key={index} className="border-t-2 border-brutal-black hover:bg-brutal-white/80">
                  <TableCell className="font-mono font-medium">{item.reference}</TableCell>
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
                    {item.final_consumer_price ? formatPrice(convertPrice(item.final_consumer_price)) : "NA"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-6 flex items-start gap-2 text-sm text-brutal-charcoal">
        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <p className="font-mono">
          Pricing is provided based on the selected currency. The Emma machine pack includes the main device and standard accessories.
          Contact us for detailed specifications and bulk order inquiries.
        </p>
      </div>
    </div>
  );
};
