
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
}

export const ProductsCategoryGroup = ({ 
  category, 
  products, 
  isUsingFallbackData 
}: ProductsCategoryGroupProps) => {
  return (
    <div key={category} className="brutal-card p-4 overflow-x-auto w-full">
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
