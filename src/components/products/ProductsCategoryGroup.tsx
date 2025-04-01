
import { Table, TableBody } from "@/components/ui/table";
import { ProductsTableHeader } from "./ProductsTableHeader";
import { ProductsTableRow } from "./ProductsTableRow";

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

interface ProductsCategoryGroupProps {
  category: string;
  products: Product[];
  isUsingFallbackData: boolean;
  className?: string;
}

export const ProductsCategoryGroup = ({ 
  category, 
  products, 
  isUsingFallbackData,
  className = "" 
}: ProductsCategoryGroupProps) => {
  return (
    <div className={`brutal-card p-4 overflow-x-auto ${className}`}>
      <h3 className="text-lg font-semibold mb-4 px-2">{category}</h3>
      <Table className="w-full">
        <ProductsTableHeader />
        <TableBody>
          {products.map((product) => (
            <ProductsTableRow 
              key={product.id} 
              product={product} 
              isUsingFallbackData={isUsingFallbackData} 
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
