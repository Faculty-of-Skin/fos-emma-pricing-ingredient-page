
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
  testSQL: () => void;
  connectionStatus: 'unknown' | 'success' | 'failed';
  onShowDebugDialog: () => void;
}

export const EmmaIngredientsError: React.FC<EmmaIngredientsErrorProps> = ({
  error,
  refetch,
  testSQL,
  connectionStatus,
  onShowDebugDialog,
}) => {
  return (
    <Card className="brutal-card mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Emma Ingredients</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refetch} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Retry
          </Button>
          <Button variant="outline" size="sm" onClick={testSQL} className="gap-2">
            <Database className="h-4 w-4" /> Test SQL
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading ingredients</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <ConnectionStatusIndicator connectionStatus={connectionStatus} />
        <div className="mt-4">
          <Button variant="outline" onClick={onShowDebugDialog}>
            Show Debug Information
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
