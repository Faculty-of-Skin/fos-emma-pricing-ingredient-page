
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsFilter } from "@/components/products/ProductsFilter";
import { ProductsTable } from "@/components/products/ProductsTable";
import { ProductsSummary } from "@/components/products/ProductsSummary";
import { ProductsError } from "@/components/products/ProductsError";
import { EmptyProducts } from "@/components/products/EmptyProducts";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

  if (error && !isUsingFallbackData) {
    return (
      <DashboardLayout>
        <ProductsError error={error} onRetry={refetch} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <ProductsHeader title="Products" />
          <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </div>
        
        {isUsingFallbackData && (
          <Alert variant="destructive" className="mb-6">
            <Database className="h-4 w-4" />
            <AlertTitle>Sample Data</AlertTitle>
            <AlertDescription>
              Unable to connect to the database. Showing sample product data instead.
              {error && (
                <p className="mt-1 text-sm">Error: {error}</p>
              )}
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
