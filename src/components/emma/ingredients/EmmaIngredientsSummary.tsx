
import React from "react";
import { RefreshCw, Database, CheckCircle, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";

interface ConnectionStatusIndicatorProps {
  connectionStatus: 'unknown' | 'success' | 'failed';
}

export const ConnectionStatusIndicator: React.FC<ConnectionStatusIndicatorProps> = ({ 
  connectionStatus 
}) => {
  switch (connectionStatus) {
    case 'success':
      return (
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>Connected to database</span>
        </div>
      );
    case 'failed':
      return (
        <div className="flex items-center text-red-600">
          <XCircle className="h-5 w-5 mr-2" />
          <span>Connection failed</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center text-muted-foreground">
          <Database className="h-5 w-5 mr-2" />
          <span>Checking connection...</span>
        </div>
      );
  }
};

interface EmmaIngredientsSummaryProps {
  ingredients: EmmaIngredient[];
  filteredIngredients: EmmaIngredient[];
  connectionStatus?: 'unknown' | 'success' | 'failed';
  onShowDebugDialog?: () => void;
  isAdmin: boolean;
}

export const EmmaIngredientsSummary: React.FC<EmmaIngredientsSummaryProps> = ({
  ingredients,
  filteredIngredients,
  connectionStatus,
  onShowDebugDialog,
  isAdmin
}) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {filteredIngredients.length} of {ingredients.length} ingredients
      </p>
      {isAdmin && connectionStatus && (
        <div className="flex items-center gap-2">
          <ConnectionStatusIndicator connectionStatus={connectionStatus} />
          {onShowDebugDialog && (
            <Button variant="outline" size="sm" onClick={onShowDebugDialog}>
              <Info className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
