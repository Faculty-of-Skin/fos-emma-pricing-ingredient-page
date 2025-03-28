
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface EmptyProductsProps {
  hasFilteredProducts: boolean;
}

export const EmptyProducts = ({ hasFilteredProducts }: EmptyProductsProps) => {
  const { isAdmin } = useAuth();

  return (
    <div className="brutal-card p-8 text-center">
      <p className="text-brutal-gray mb-4">
        {hasFilteredProducts 
          ? "No products match your filter criteria." 
          : "No products have been added yet."}
      </p>
      {isAdmin && !hasFilteredProducts && (
        <Button className="brutal-button" asChild>
          <a href="/admin/products/new">Add First Product</a>
        </Button>
      )}
    </div>
  );
};
