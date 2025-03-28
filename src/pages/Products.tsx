
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsFilter } from "@/components/products/ProductsFilter";
import { ProductsTable } from "@/components/products/ProductsTable";
import { ProductsSummary } from "@/components/products/ProductsSummary";
import { ProductsError } from "@/components/products/ProductsError";
import { EmptyProducts } from "@/components/products/EmptyProducts";
import { useProducts } from "@/hooks/useProducts";

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
    products
  } = useProducts();

  if (error) {
    return (
      <DashboardLayout>
        <ProductsError error={error} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <ProductsHeader title="Products" />
        
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
          />
        )}

        <ProductsSummary 
          count={filteredProducts.length}
          categoryFilter={categoryFilter}
          searchQuery={searchQuery}
        />
      </div>
    </DashboardLayout>
  );
};

export default Products;
