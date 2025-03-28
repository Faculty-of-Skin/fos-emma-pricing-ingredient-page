
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";

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
}

export const ProductsTable = ({ products, isLoading }: ProductsTableProps) => {
  const { isAdmin } = useAuth();
  const { formatPrice, convertPrice } = useCurrency();

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="brutal-card p-8 text-center">
        <p className="text-brutal-gray mb-4">
          No products match your filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="brutal-card p-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-mono uppercase">Reference</TableHead>
            <TableHead className="font-mono uppercase">Description</TableHead>
            <TableHead className="font-mono uppercase">Category</TableHead>
            <TableHead className="font-mono uppercase text-right">Importer</TableHead>
            <TableHead className="font-mono uppercase text-right">Distributor</TableHead>
            <TableHead className="font-mono uppercase text-right">Beauty Institute</TableHead>
            {isAdmin && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => {
            // Add visual separators between different categories
            const prevProduct = index > 0 ? products[index - 1] : null;
            const isNewCategory = prevProduct && prevProduct.category !== product.category;

            return (
              <TableRow 
                key={product.id}
                className={`${isNewCategory ? 'border-t-4 border-brutal-black' : ''} hover:bg-brutal-white/50`}
              >
                <TableCell className="font-medium font-mono">{product.reference}</TableCell>
                <TableCell className="font-mono">{product.description}</TableCell>
                <TableCell className="font-mono">{product.category}</TableCell>
                <TableCell className="font-mono text-right">
                  {formatPrice(convertPrice(product.importer_price))}
                  <div className="text-xs text-brutal-gray">MOQ: {product.importer_moq}</div>
                </TableCell>
                <TableCell className="font-mono text-right">
                  {formatPrice(convertPrice(product.distributor_price))}
                  <div className="text-xs text-brutal-gray">MOQ: {product.distributor_moq}</div>
                </TableCell>
                <TableCell className="font-mono text-right">
                  {formatPrice(convertPrice(product.beauty_institute_price))}
                  <div className="text-xs text-brutal-gray">MOQ: {product.beauty_institute_moq}</div>
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/admin/products/${product.id}`}>Edit</a>
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
