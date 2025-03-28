
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info, Loader2, RefreshCcw } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { fetchProductsWithDirectFetch } from "@/utils/supabaseUtils";
import { Button } from "@/components/ui/button";

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
  
  const fetchEquipment = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching equipment data...");
      
      // First try with the Supabase client
      let { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "Equipment")
        .order("reference");
      
      if (error) {
        console.error("Error fetching equipment:", error);
        console.log("Full error object:", JSON.stringify(error));
        
        // Try with direct fetch as a fallback
        console.log("Retrying with direct fetch...");
        
        const result = await fetchProductsWithDirectFetch({
          category: "Equipment",
          orderBy: ["reference.asc"]
        });
        
        if (result.error) {
          console.error("Direct fetch also failed:", result.error);
          // If both approaches fail, show a user-friendly error
          if (!error.message?.includes("infinite recursion")) {
            setError("Unable to load equipment data. Please try again later.");
            toast({
              title: "Error fetching equipment",
              description: "Unable to load equipment data. Please try again later.",
              variant: "destructive",
            });
          }
          setEquipmentData([]);
        } else {
          console.log("Direct fetch successful, retrieved:", result.data?.length || 0, "items");
          setEquipmentData(result.data || []);
        }
      } else {
        console.log("Equipment data retrieved:", data?.length || 0, "items");
        setEquipmentData(data || []);
      }
    } catch (error: any) {
      console.error("Failed to fetch equipment data:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
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

  const handleRefresh = () => {
    fetchEquipment();
    toast({
      title: "Refreshing data",
      description: "Attempting to retrieve the latest equipment data.",
    });
  };

  return (
    <div className="brutal-card">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Equipment</h2>
        <p className="text-brutal-charcoal font-mono uppercase text-sm mt-2">Emma Machine Pricing</p>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle className="flex items-center gap-2">
            Error <Button variant="ghost" size="sm" onClick={handleRefresh} className="p-1 h-6 w-6 ml-2"><RefreshCcw className="h-4 w-4" /></Button>
          </AlertTitle>
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
                <TableCell colSpan={6} className="text-center py-6">
                  <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                  <div className="mt-2">Loading equipment data...</div>
                </TableCell>
              </TableRow>
            ) : equipmentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  <div className="text-brutal-charcoal">
                    No equipment data available
                    <div className="mt-2 text-sm">
                      This could be due to a temporary issue with the data connection.
                      <Button 
                        onClick={handleRefresh} 
                        variant="ghost"
                        className="ml-2 text-primary hover:text-primary/80"
                      >
                        <RefreshCcw className="h-4 w-4 mr-1" /> Refresh
                      </Button>
                    </div>
                  </div>
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
