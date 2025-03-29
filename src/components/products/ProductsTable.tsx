
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Package, RefreshCcw } from "lucide-react";
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
  onRefresh: () => void;
  isUsingFallbackData?: boolean;
}

export const ProductsTable = ({ products, isLoading, onRefresh, isUsingFallbackData = false }: ProductsTableProps) => {
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
        <div className="flex flex-col items-center gap-4 py-8">
          <Package className="h-12 w-12 text-muted-foreground/50" />
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="text-muted-foreground">
              Either no products match your filter criteria, or there was an issue connecting to the database.
            </p>
          </div>
          <Button onClick={onRefresh} variant="outline" className="gap-2">
            <RefreshCcw className="h-4 w-4" /> Refresh Data
          </Button>
        </div>
      </div>
    );
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
        <div key={category} className="brutal-card p-4 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4 px-4">{category}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono uppercase">Reference</TableHead>
                <TableHead className="font-mono uppercase">Description</TableHead>
                <TableHead className="font-mono uppercase text-right">
                  Beauty Institute
                  <div className="font-mono text-xs text-brutal-gray mt-1">MOQ: {products[0]?.beauty_institute_moq || "N/A"}</div>
                </TableHead>
                {isAdmin && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupedProducts[category].map((product) => (
                <TableRow 
                  key={product.id}
                  className={`hover:bg-brutal-white/50 ${isUsingFallbackData ? 'opacity-80' : ''}`}
                >
                  <TableCell className="font-medium font-mono">
                    {product.reference}
                    {isUsingFallbackData && product.id.startsWith('mock-') && (
                      <span className="text-xs text-muted-foreground ml-2">(sample)</span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono">{product.description}</TableCell>
                  <TableCell className="font-mono text-right">
                    {formatPrice(convertPrice(product.beauty_institute_price))}
                    <div className="text-xs text-brutal-gray">MOQ: {product.beauty_institute_moq}</div>
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild 
                        disabled={isUsingFallbackData && product.id.startsWith('mock-')}
                      >
                        <a href={`/admin/products/${product.id}`}>Edit</a>
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};
