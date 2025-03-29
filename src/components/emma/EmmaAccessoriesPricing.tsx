import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCurrency } from "@/context/CurrencyContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2, RefreshCcw } from "lucide-react";
import { fetchProductsWithDirectFetch } from "@/utils/supabase";
import { Button } from "@/components/ui/button";

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
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchAccessories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching accessories data...");
      
      const categories = ['Accessories', 'Face capsule', 'Body capsule', 'Marketing item'];
      
      // Try with Supabase client first
      let { data, error } = await supabase
        .from("products")
        .select("*")
        .in("category", categories)
        .order("category")
        .order("reference");
      
      if (error) {
        console.error("Error fetching accessories:", error);
        console.log("Full error object:", JSON.stringify(error));
        
        // Try with direct fetch as a fallback
        console.log("Retrying with direct fetch...");
        
        const result = await fetchProductsWithDirectFetch({
          category: categories,
          orderBy: ["category.asc", "reference.asc"]
        });
        
        if (result.error) {
          console.error("Direct fetch also failed:", result.error);
          // If both approaches fail, show a user-friendly error
          if (!error.message?.includes("infinite recursion")) {
            setError("Unable to load accessories data. Please try again later.");
            toast({
              title: "Error fetching accessories",
              description: "Unable to load accessories data. Please try again later.",
              variant: "destructive",
            });
          }
          setAccessoriesData([]);
        } else {
          console.log("Direct fetch successful, retrieved:", result.data?.length || 0, "items");
          setAccessoriesData(result.data || []);
        }
      } else {
        console.log("Accessories data retrieved:", data?.length || 0, "items");
        setAccessoriesData(data || []);
      }
    } catch (error: any) {
      console.error("Failed to fetch accessories data:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAccessories();
  }, [toast]);
  
  // Calculate MOQ value if data is available
  const beautyInstituteData = accessoriesData.length > 0 
    ? { moq: accessoriesData.find(item => 
        item.category === 'Face capsule' || item.category === 'Body capsule'
      )?.beauty_institute_moq || 5 }
    : { moq: 5 };

  const handleRefresh = () => {
    fetchAccessories();
    toast({
      title: "Refreshing data",
      description: "Attempting to retrieve the latest accessories data.",
    });
  };

  return (
    <div className="brutal-card">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Consumables & Accessories</h2>
        <p className="text-brutal-charcoal font-mono uppercase text-sm mt-2">Pricing Without Tax</p>
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
              <TableHead className="font-mono uppercase text-brutal-black">Category</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black">Reference</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black">Description</TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">
                Beauty Institute
                <div className="font-mono text-xs text-brutal-gray mt-1">(Without tax) MOQ: {beautyInstituteData.moq}</div>
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
                <TableCell colSpan={5} className="text-center py-6">
                  <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                  <div className="mt-2">Loading product data...</div>
                </TableCell>
              </TableRow>
            ) : accessoriesData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  <div className="text-brutal-charcoal">
                    No product data available
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
              accessoriesData.map((item, index) => (
                <TableRow key={index} className={`border-t-2 border-brutal-black/30 hover:bg-brutal-white/80 ${
                  index > 0 && item.category !== accessoriesData[index - 1].category ? 'border-t-4 border-brutal-black pt-4' : ''
                }`}>
                  <TableCell className="font-mono font-medium">{item.category}</TableCell>
                  <TableCell className="font-mono">{item.reference}</TableCell>
                  <TableCell className="font-mono">{item.description}</TableCell>
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
            MOQ (Minimum Order Quantity) for Beauty Institute: {beautyInstituteData.moq} units
          </p>
        </div>
        
        <div className="brutal-card border-2 bg-brutal-white/70">
          <h3 className="font-mono uppercase text-brutal-black font-bold mb-3">Ordering Information</h3>
          <p className="font-mono text-sm text-brutal-charcoal">
            For bulk orders and beauty institute pricing, please contact our sales team directly.
            Custom packaging and branding options are available.
          </p>
        </div>
      </div>
    </div>
  );
};
