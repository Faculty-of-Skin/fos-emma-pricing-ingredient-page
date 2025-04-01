
import React from "react";
import { RefreshCw, Database, AlertCircle, Info } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ConnectionStatusIndicator } from "./EmmaIngredientsSummary";

interface EmmaIngredientsErrorProps {
  error: string;
  refetch: () => void;
  testSQL?: () => void;
  connectionStatus: 'unknown' | 'success' | 'failed';
  onShowDebugDialog?: () => void;
  isAdmin: boolean;
}

export const EmmaIngredientsError: React.FC<EmmaIngredientsErrorProps> = ({
  error,
  refetch,
  testSQL,
  connectionStatus,
  onShowDebugDialog,
  isAdmin
}) => {
  return (
    <Card className="border-4 border-brutal-black mt-8 bg-brutal-white">
      <CardHeader className="border-b-4 border-brutal-black flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-mono uppercase tracking-wider text-brutal-black">Emma Ingredients</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refetch} 
            className="gap-2 border-2 border-brutal-black bg-brutal-white text-brutal-black hover:bg-brutal-black hover:text-brutal-white font-mono uppercase tracking-wider transform transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <RefreshCw className="h-4 w-4" /> Retry
          </Button>
          {isAdmin && testSQL && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={testSQL} 
              className="gap-2 border-2 border-brutal-black bg-brutal-white text-brutal-black hover:bg-brutal-black hover:text-brutal-white font-mono uppercase tracking-wider transform transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Database className="h-4 w-4" /> Test SQL
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="bg-brutal-white">
        <Alert variant="destructive" className="mb-4 border-2 border-brutal-black">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-mono uppercase">Error loading ingredients</AlertTitle>
          <AlertDescription className="font-mono">{error}</AlertDescription>
        </Alert>
        {isAdmin && (
          <ConnectionStatusIndicator connectionStatus={connectionStatus} />
        )}
        {isAdmin && onShowDebugDialog && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              onClick={onShowDebugDialog}
              className="border-2 border-brutal-black bg-brutal-white text-brutal-black hover:bg-brutal-black hover:text-brutal-white font-mono uppercase tracking-wider transform transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Show Debug Information
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
