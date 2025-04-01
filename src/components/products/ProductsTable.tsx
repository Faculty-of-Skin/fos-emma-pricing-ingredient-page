
import { ProductsLoadingState } from "./ProductsLoadingState";
import { ProductsEmptyState } from "./ProductsEmptyState";
import { ProductsCategoryGroup } from "./ProductsCategoryGroup";
import { Grid } from "lucide-react";

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

  // Define category order and grouping
  const categoryOrder = [
    "Equipment", // Top row, full width
    "Face Capsules", "Body Capsules", // Middle row, two columns
    "Marketing", "Accessories" // Bottom row, two columns (Marketing on left, Accessories on right)
  ];
  
  // Group products by category for better organization
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Sort categories according to the defined order, put any undefined categories at the end
  const sortedCategories = Object.keys(groupedProducts).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Explicitly type the category strings to resolve TypeScript errors
  const isEquipmentCategory = (category: string): category is "Equipment" => 
    category === "Equipment";
  
  const isMiddleRowCategory = (category: string): category is "Face Capsules" | "Body Capsules" => 
    category === "Face Capsules" || category === "Body Capsules";
  
  const isBottomRowCategory = (category: string): category is "Marketing" | "Accessories" => 
    category === "Marketing" || category === "Accessories";
  
  // Filter categories for the top row (Equipment)
  const topRowCategories = sortedCategories.filter(cat => isEquipmentCategory(cat));
  
  // Filter categories for the middle row (Face Capsules, Body Capsules)
  const middleRowCategories = sortedCategories.filter(cat => isMiddleRowCategory(cat));
  
  // All other categories that don't fit the predefined structure
  const otherCategories = sortedCategories.filter(cat => 
    !isEquipmentCategory(cat) && 
    !isMiddleRowCategory(cat) && 
    !isBottomRowCategory(cat));

  return (
    <div className="space-y-8">
      {/* Top row - Equipment (full width) */}
      <div className="w-full">
        {topRowCategories.map(category => (
          <ProductsCategoryGroup 
            key={category}
            category={category}
            products={groupedProducts[category]}
            isUsingFallbackData={isUsingFallbackData}
            className="w-full"
          />
        ))}
      </div>

      {/* Middle row - Face Capsules and Body Capsules (two columns) with scrolling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {middleRowCategories.map(category => (
          <ProductsCategoryGroup 
            key={category}
            category={category}
            products={groupedProducts[category]}
            isUsingFallbackData={isUsingFallbackData}
            maxHeight="max-h-[500px]"
          />
        ))}
      </div>

      {/* Bottom row - Marketing and Accessories (FORCED ORDER) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MARKETING ALWAYS FIRST (LEFT) */}
        {sortedCategories.includes("Marketing") && (
          <div className="col-span-1">
            <ProductsCategoryGroup 
              key="Marketing"
              category="Marketing"
              products={groupedProducts["Marketing"]}
              isUsingFallbackData={isUsingFallbackData}
            />
          </div>
        )}
        
        {/* ACCESSORIES ALWAYS SECOND (RIGHT) */}
        {sortedCategories.includes("Accessories") && (
          <div className="col-span-1">
            <ProductsCategoryGroup 
              key="Accessories"
              category="Accessories"
              products={groupedProducts["Accessories"]}
              isUsingFallbackData={isUsingFallbackData}
            />
          </div>
        )}
      </div>

      {/* Any other categories */}
      {otherCategories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherCategories.map(category => (
            <ProductsCategoryGroup 
              key={category}
              category={category}
              products={groupedProducts[category]}
              isUsingFallbackData={isUsingFallbackData}
            />
          ))}
        </div>
      )}
    </div>
  );
};
