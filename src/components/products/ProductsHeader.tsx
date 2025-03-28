
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ProductsHeaderProps {
  title: string;
}

export const ProductsHeader = ({ title }: ProductsHeaderProps) => {
  const { isAdmin } = useAuth();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {isAdmin && (
        <Button className="brutal-button" asChild>
          <a href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </a>
        </Button>
      )}
    </div>
  );
};
