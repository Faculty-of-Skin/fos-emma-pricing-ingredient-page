import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsFilter } from "@/components/products/ProductsFilter";
import { ProductsTable } from "@/components/products/ProductsTable";
import { ProductsSummary } from "@/components/products/ProductsSummary";
import { ProductsError } from "@/components/products/ProductsError";
import { EmptyProducts } from "@/components/products/EmptyProducts";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database, RefreshCw, Info, LayoutGrid } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { toast } from "sonner";
import { CurrencySelector } from "@/components/emma/CurrencySelector";

const Products = () => {
  const { 
    filteredProducts, 
    isLoading, 
    error, 
    categories, 
    categoryFilter, 
    setCategoryFilter, 
    searchQuery, 
    setSearchQuery,
    products,
    refetch,
    isUsingFallbackData
  } = useProducts();
  
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [lastReconnectTime, setLastReconnectTime] = useState<Date | null>(null);

  const handleForceRefresh = () => {
    toast.info("Force refreshing data connection...");
    setReconnectAttempts(prev => prev + 1);
    setLastReconnectTime(new Date());
    refetch();
    
    // Log connection attempt for debugging
    console.log("Manual reconnection attempt initiated", {
      timestamp: new Date().toISOString(),
      previousAttempts: reconnectAttempts
    });
  };

  if (error && !isUsingFallbackData) {
    return (
      <DashboardLayout>
        <ProductsError error={error} onRetry={refetch} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Fixed top bar */}
      <div className="sticky top-0 z-10 bg-brutal-white border-b border-brutal-gray/10 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ProductsHeader title="Products" />
              <LayoutGrid className="h-5 w-5 text-brutal-charcoal" />
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-brutal-charcoal font-mono uppercase text-sm">Currency:</span>
                <CurrencySelector />
              </div>
              <div className="flex gap-2">
                {isUsingFallbackData && (
                  <Button variant="default" size="sm" onClick={handleForceRefresh} className="gap-2">
                    <Database className="h-4 w-4" /> Reconnect
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
                  <RefreshCw className="h-4 w-4" /> Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content with padding to account for the fixed top bar */}
      <div className="container mx-auto px-4 max-w-7xl py-6">
        {isUsingFallbackData && (
          <Alert variant="destructive" className="mb-6">
            <Database className="h-4 w-4" />
            <AlertTitle>Sample Data</AlertTitle>
            <AlertDescription>
              Unable to connect to the database. Showing sample product data instead.
              {error && (
                <p className="mt-1 text-sm">Error: {error}</p>
              )}
              <div className="mt-2 flex flex-col gap-2">
                <Button 
                  onClick={handleForceRefresh} 
                  variant="outline" 
                  size="sm" 
                  className="w-full sm:w-auto"
                >
                  Try reconnecting
                </Button>
                
                {lastReconnectTime && (
                  <div className="text-xs flex items-center gap-1 text-muted-foreground">
                    <Info className="h-3 w-3" /> Last attempt: {lastReconnectTime.toLocaleTimeString()} 
                    ({reconnectAttempts} total attempts)
                  </div>
                )}
                
                <details className="text-xs mt-2 text-muted-foreground">
                  <summary className="cursor-pointer">Debug Information</summary>
                  <div className="mt-1 p-2 bg-muted/50 rounded text-xs font-mono whitespace-pre-wrap">
                    Connection Status: Using Fallback Data
                    <br />
                    Error Message: {error || "Unknown error"}
                    <br />
                    Browser: {navigator.userAgent}
                    <br />
                    Reconnection Attempts: {reconnectAttempts}
                    <br />
                    Products Count: {products.length} (mock), {filteredProducts.length} (filtered)
                  </div>
                </details>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <ProductsFilter 
          categories={categories}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {!isLoading && filteredProducts.length === 0 ? (
          <EmptyProducts hasFilteredProducts={products.length > 0} />
        ) : (
          <ProductsTable 
            products={filteredProducts} 
            isLoading={isLoading} 
            onRefresh={refetch}
            isUsingFallbackData={isUsingFallbackData}
          />
        )}

        <ProductsSummary 
          count={filteredProducts.length}
          categoryFilter={categoryFilter}
          searchQuery={searchQuery}
          isUsingFallbackData={isUsingFallbackData}
        />
      </div>
    </DashboardLayout>
  );
};

export default Products;
