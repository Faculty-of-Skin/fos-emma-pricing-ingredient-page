
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info, Loader2, RefreshCcw, ServerOff } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { fetchProductsWithFallback } from "@/utils/supabase";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";

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
  const { convertPrice, formatPrice, currency } = useCurrency();
  const { 
    filteredProducts, 
    isLoading, 
    error, 
    refetch,
    setCategoryFilter
  } = useProducts();
  
  // Set category filter to "Equipment" on component mount - using the correct category name
  useEffect(() => {
    setCategoryFilter("Equipment");
    console.log("Setting category filter to Equipment");
  }, [setCategoryFilter]);
  
  // Filter equipment products when filteredProducts changes
  const equipmentData: Equipment[] = filteredProducts
    .map(product => ({
      reference: product.reference,
      description: product.description,
      importer_price: product.importer_price,
      distributor_price: product.distributor_price,
      beauty_institute_price: product.beauty_institute_price,
      final_consumer_price: product.final_consumer_price,
      importer_moq: product.importer_moq,
      distributor_moq: product.distributor_moq,
      beauty_institute_moq: product.beauty_institute_moq,
    }));
  
  const beautyInstituteData = equipmentData.length > 0 
    ? { moq: equipmentData[0].beauty_institute_moq }
    : { moq: 1 };

  const handleRefresh = () => {
    refetch();
  };

  // For debugging
  useEffect(() => {
    console.log("Equipment component rendered");
    console.log("Current currency:", currency);
    console.log("Equipment data:", equipmentData);
    console.log("All filtered products:", filteredProducts);
    console.log("Filtering for category: Equipment");
  }, [currency, equipmentData, filteredProducts]);

  return (
    <div className="brutal-card">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Equipment</h2>
        <p className="text-brutal-charcoal font-mono uppercase text-sm mt-2">Emma Machine Pricing</p>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle className="flex items-center gap-2">
            <ServerOff className="h-4 w-4" /> 
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
                Beauty Institute
                <div className="font-mono text-xs text-brutal-gray mt-1">MOQ: {beautyInstituteData.moq}</div>
              </TableHead>
              <TableHead className="font-mono uppercase text-brutal-black text-right">Final Consumer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                  <div className="mt-2">Loading equipment data...</div>
                </TableCell>
              </TableRow>
            ) : equipmentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
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
