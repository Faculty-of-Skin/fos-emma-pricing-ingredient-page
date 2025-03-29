
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCurrency } from "@/context/CurrencyContext";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Accessory = {
  category: string;
  reference: string;
  description: string;
  importer_price: number;
  distributor_price: number;
  beauty_institute_price: number;
  final_consumer_price: number | null;
  importer_moq: number;
  distributor_moq: number;
  beauty_institute_moq: number;
};

interface AccessoriesTableProps {
  accessories: Accessory[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const AccessoriesTable = ({ accessories, isLoading, onRefresh }: AccessoriesTableProps) => {
  const { convertPrice, formatPrice } = useCurrency();

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="text-center py-6">
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
          <div className="mt-2">Loading product data...</div>
        </TableCell>
      </TableRow>
    );
  }

  if (accessories.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="text-center py-6">
          <div className="text-brutal-charcoal">
            No product data available
            <div className="mt-2 text-sm">
              This could be due to a temporary issue with the data connection.
              <Button 
                onClick={onRefresh} 
                variant="ghost"
                className="ml-2 text-primary hover:text-primary/80"
              >
                <RefreshCcw className="h-4 w-4 mr-1" /> Refresh
              </Button>
            </div>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {accessories.map((item, index) => (
        <TableRow key={index} className={`border-t-2 border-brutal-black/30 hover:bg-brutal-white/80 ${
          index > 0 && item.category !== accessories[index - 1].category ? 'border-t-4 border-brutal-black pt-4' : ''
        }`}>
          <TableCell className="font-mono font-medium">{item.category}</TableCell>
          <TableCell className="font-mono">{item.reference}</TableCell>
          <TableCell className="font-mono">{item.description}</TableCell>
          <TableCell className="font-mono text-right">
            {formatPrice(convertPrice(item.beauty_institute_price))}
          </TableCell>
          <TableCell className="font-mono text-right">
            {item.final_consumer_price === null ? "NA" : formatPrice(convertPrice(item.final_consumer_price))}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
