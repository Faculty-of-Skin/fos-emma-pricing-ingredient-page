
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
        <div className="flex items-center text-green-600 font-mono">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>CONNECTED TO DATABASE</span>
        </div>
      );
    case 'failed':
      return (
        <div className="flex items-center text-red-600 font-mono">
          <XCircle className="h-5 w-5 mr-2" />
          <span>CONNECTION FAILED</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center text-brutal-charcoal font-mono">
          <Database className="h-5 w-5 mr-2" />
          <span>CHECKING CONNECTION...</span>
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
    <div className="mb-4 flex items-center justify-between p-3 border-2 border-brutal-black bg-brutal-white">
      <p className="text-sm text-brutal-black font-mono uppercase">
        SHOWING {filteredIngredients.length} OF {ingredients.length} INGREDIENTS
      </p>
      {isAdmin && connectionStatus && (
        <div className="flex items-center gap-2">
          <ConnectionStatusIndicator connectionStatus={connectionStatus} />
          {onShowDebugDialog && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onShowDebugDialog}
              className="border-2 border-brutal-black bg-brutal-white text-brutal-black hover:bg-brutal-black hover:text-brutal-white font-mono transform transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Info className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
