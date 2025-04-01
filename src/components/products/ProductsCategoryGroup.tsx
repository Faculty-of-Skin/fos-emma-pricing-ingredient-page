
import { useState, useMemo } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ProductsTableHeader } from "./ProductsTableHeader";
import { ProductsTableRow } from "./ProductsTableRow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CapsuleFilters } from "./CapsuleFilters";
import { ChevronDown } from "lucide-react";

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
  const [showAll, setShowAll] = useState(false);
  
  // Check if this category should have filters and pagination (Face or Body capsules)
  const isCapsuleCategory = category === "Face capsule" || category === "Body capsule";
  
  // Determine available filter types based on product descriptions
  const availableTypes = useMemo(() => {
    if (!isCapsuleCategory) return [] as FilterOption[];
    
    const types = new Set<FilterOption>();
    products.forEach(product => {
      const firstWord = product.description.split(' ')[0].toLowerCase();
      
      if (firstWord === "texture") types.add("texture");
      else if (firstWord === "active") types.add("active");
      else if (firstWord === "perfume") types.add("perfume");
    });
    
    return Array.from(types);
  }, [products, isCapsuleCategory]);
  
  // Filter products based on active filter
  const filteredProducts = useMemo(() => {
    if (!isCapsuleCategory || activeFilter === "all") return products;
    
    return products.filter(product => {
      const firstWord = product.description.split(' ')[0].toLowerCase();
      return firstWord === activeFilter.toLowerCase();
    });
  }, [products, activeFilter, isCapsuleCategory]);
  
  // For capsule categories, show a limited number of products initially (5), 
  // and then allow users to show all with the "Show more" button
  const displayProducts = useMemo(() => {
    if (!isCapsuleCategory || showAll) return filteredProducts;
    
    // Show first 5 products by default
    return filteredProducts.slice(0, 5);
  }, [filteredProducts, isCapsuleCategory, showAll]);
  
  // Calculate if we need to show the "Show more" button
  const hasMoreProducts = isCapsuleCategory && filteredProducts.length > 5;

  // Toggle show all products without scrolling the page
  const handleToggleShowAll = (e: React.MouseEvent) => {
    // Prevent default to avoid page navigation/scrolling
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation
    console.log("Toggling show all from", showAll, "to", !showAll);
    setShowAll(prev => !prev);
  };
  
  // Default fixed height for capsule categories to ensure scrolling
  const fixedHeight = isCapsuleCategory && !showAll ? (maxHeight || "max-h-[300px]") : "";
  
  return (
    <div className={`brutal-card p-4 overflow-hidden ${className}`}>
      <h3 className="text-lg font-semibold mb-4 px-2">{category}</h3>
      
      {isCapsuleCategory && availableTypes.length > 0 && (
        <CapsuleFilters 
          onFilterChange={setActiveFilter} 
          activeFilter={activeFilter}
          availableTypes={availableTypes}
        />
      )}
      
      {isCapsuleCategory ? (
        <div className="flex flex-col">
          {/* We're using ScrollArea with a fixed height to enable scrolling within the component */}
          <div className={`${fixedHeight} overflow-visible transition-all duration-300`}>
            <ScrollArea className="w-full" style={{ height: showAll ? 'auto' : '300px' }}>
              <Table className="w-full">
                <ProductsTableHeader />
                <TableBody>
                  {displayProducts.map((product) => (
                    <ProductsTableRow 
                      key={product.id} 
                      product={product} 
                      isUsingFallbackData={isUsingFallbackData} 
                    />
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
          
          {hasMoreProducts && (
            <div className="w-full flex justify-center mt-4">
              <button 
                onClick={handleToggleShowAll} 
                className="flex items-center gap-1 px-3 py-1 text-sm border rounded-full hover:bg-gray-50 transition-colors"
              >
                {showAll ? "Show less" : `Show all ${filteredProducts.length} products`}
                <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      ) : (
        // For non-capsule categories, just show all products without scrolling or pagination
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
      )}
    </div>
  );
};
