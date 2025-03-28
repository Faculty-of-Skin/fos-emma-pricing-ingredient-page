
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProductsErrorProps {
  error: string;
}

export const ProductsError = ({ error }: ProductsErrorProps) => {
  return (
    <div className="container mx-auto p-6">
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      
      <div className="brutal-card p-8 text-center">
        <p className="text-brutal-gray mb-4">
          We're having trouble retrieving product data. This may be due to a temporary issue with access permissions.
        </p>
        <Button 
          className="brutal-button" 
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </div>
    </div>
  );
};
