
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";

type Product = {
  id: string;
  reference: string;
  description: string;
  beauty_institute_price: number;
  beauty_institute_moq: number;
};

interface ProductsTableRowProps {
  product: Product;
  isUsingFallbackData: boolean;
}

export const ProductsTableRow = ({ product, isUsingFallbackData }: ProductsTableRowProps) => {
  const { isAdmin } = useAuth();
  const { formatPrice, convertPrice } = useCurrency();

  return (
    <TableRow 
      key={product.id}
      className={`border-t-2 border-brutal-black/10 hover:bg-brutal-white/80 ${isUsingFallbackData ? 'opacity-80' : ''}`}
    >
      <TableCell className="font-mono font-medium">
        {product.reference}
        {isUsingFallbackData && product.id.startsWith('mock-') && (
          <span className="text-xs text-muted-foreground ml-2">(sample)</span>
        )}
      </TableCell>
      <TableCell className="font-mono">{product.description}</TableCell>
      <TableCell className="font-mono text-right" data-price-element="true">
        {formatPrice(convertPrice(product.beauty_institute_price))}
      </TableCell>
      <TableCell className="font-mono text-right">
        {product.beauty_institute_moq}
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
  );
};
