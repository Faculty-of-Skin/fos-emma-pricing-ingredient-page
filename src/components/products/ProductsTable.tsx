
import { ProductsLoadingState } from "./ProductsLoadingState";
import { ProductsEmptyState } from "./ProductsEmptyState";
import { ProductsCategoryGroup } from "./ProductsCategoryGroup";

type Product = {
  id: string;
  reference: string;
  description: string;
  category: string;
  importer_price: number;
  distributor_price: number;
  beauty_institute_price: number;
  final_consumer_price: number | null;
  importer_moq: number;
  distributor_moq: number;
  beauty_institute_moq: number;
  created_at: string;
};

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onRefresh: () => void;
  isUsingFallbackData?: boolean;
}

export const ProductsTable = ({ products, isLoading, onRefresh, isUsingFallbackData = false }: ProductsTableProps) => {
  if (isLoading) {
    return <ProductsLoadingState />;
  }

  if (products.length === 0) {
    return <ProductsEmptyState onRefresh={onRefresh} />;
  }

  // Group products by category for better organization
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedProducts).sort();

  return (
    <div className="space-y-8">
      {sortedCategories.map(category => (
        <ProductsCategoryGroup 
          key={category}
          category={category}
          products={groupedProducts[category]}
          isUsingFallbackData={isUsingFallbackData}
        />
      ))}
    </div>
  );
};
