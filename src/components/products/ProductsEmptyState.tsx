
import { Button } from "@/components/ui/button";
import { Package, RefreshCcw } from "lucide-react";

interface ProductsEmptyStateProps {
  onRefresh: () => void;
}

export const ProductsEmptyState = ({ onRefresh }: ProductsEmptyStateProps) => {
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
};
