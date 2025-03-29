
import { Loader2 } from "lucide-react";

export const ProductsLoadingState = () => {
  return (
    <div className="flex justify-center p-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};
