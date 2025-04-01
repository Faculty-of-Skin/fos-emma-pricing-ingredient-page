
import { useState, useMemo } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ProductsTableHeader } from "./ProductsTableHeader";
import { ProductsTableRow } from "./ProductsTableRow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CapsuleFilters } from "./CapsuleFilters";

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

type FilterOption = "all" | "texture" | "active" | "perfume";

interface ProductsCategoryGroupProps {
  category: string;
  products: Product[];
  isUsingFallbackData: boolean;
  className?: string;
  maxHeight?: string;
}

export const ProductsCategoryGroup = ({ 
  category, 
  products, 
  isUsingFallbackData,
  className = "",
  maxHeight
}: ProductsCategoryGroupProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  
  // Check if this category should have filters (Face or Body capsules)
  const shouldShowFilters = category === "Face capsule" || category === "Body capsule";
  
  // Determine available filter types based on product descriptions
  const availableTypes = useMemo(() => {
    if (!shouldShowFilters) return [] as FilterOption[];
    
    const types = new Set<FilterOption>();
    products.forEach(product => {
      const firstWord = product.description.split(' ')[0].toLowerCase();
      
      if (firstWord === "texture") types.add("texture");
      else if (firstWord === "active") types.add("active");
      else if (firstWord === "perfume") types.add("perfume");
    });
    
    return Array.from(types);
  }, [products, shouldShowFilters]);
  
  // Filter products based on active filter
  const filteredProducts = useMemo(() => {
    if (!shouldShowFilters || activeFilter === "all") return products;
    
    return products.filter(product => {
      const firstWord = product.description.split(' ')[0].toLowerCase();
      return firstWord === activeFilter.toLowerCase();
    });
  }, [products, activeFilter, shouldShowFilters]);
  
  // Determine if this category should have scrolling
  const shouldScroll = shouldShowFilters;
  
  // Set a fixed height for scrollable areas
  const scrollHeight = shouldScroll ? "max-h-[400px]" : undefined;
  
  const content = (
    <>
      <h3 className="text-lg font-semibold mb-4 px-2">{category}</h3>
      
      {shouldShowFilters && availableTypes.length > 0 && (
        <CapsuleFilters 
          onFilterChange={setActiveFilter} 
          activeFilter={activeFilter}
          availableTypes={availableTypes}
        />
      )}
      
      <Table className="w-full">
        <ProductsTableHeader />
        <TableBody>
          {filteredProducts.map((product) => (
            <ProductsTableRow 
              key={product.id} 
              product={product} 
              isUsingFallbackData={isUsingFallbackData} 
            />
          ))}
        </TableBody>
      </Table>
    </>
  );

  // Use the fixed height for scrolling or the passed maxHeight prop if available
  const finalScrollHeight = maxHeight || scrollHeight;

  return (
    <div className={`brutal-card p-4 overflow-hidden ${className}`}>
      {finalScrollHeight ? (
        <ScrollArea className={`pr-4 ${finalScrollHeight}`}>
          {content}
        </ScrollArea>
      ) : (
        content
      )}
    </div>
  );
};
