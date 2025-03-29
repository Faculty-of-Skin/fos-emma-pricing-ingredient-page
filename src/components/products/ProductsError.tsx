
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProductsErrorProps {
  error: string;
  onRetry?: () => void;
}

export const ProductsError = ({ error, onRetry }: ProductsErrorProps) => {
  return (
    <div className="container mx-auto p-6">
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      
      <div className="brutal-card p-8 text-center">
        <p className="text-brutal-gray mb-4">
          We're having trouble retrieving product data. This may be due to a temporary issue with the database connection.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            className="brutal-button" 
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
          {onRetry && (
            <Button 
              variant="outline" 
              onClick={onRetry}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" /> Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
