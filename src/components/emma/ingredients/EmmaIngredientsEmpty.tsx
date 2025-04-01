
import React from "react";
import { RefreshCw, Database, Info } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConnectionStatusIndicator } from "./EmmaIngredientsSummary";

interface EmmaIngredientsEmptyProps {
  refetch: () => void;
  testSQL: () => void;
  connectionStatus: 'unknown' | 'success' | 'failed';
  onShowDebugDialog: () => void;
}

export const EmmaIngredientsEmpty: React.FC<EmmaIngredientsEmptyProps> = ({
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
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={testSQL} className="gap-2">
            <Database className="h-4 w-4" /> Test SQL
          </Button>
          <Button variant="outline" size="sm" onClick={onShowDebugDialog}>
            <Info className="h-4 w-4" /> Debug
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center py-12">
          <Database className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-center text-lg font-medium mb-2">
            No ingredient data available
          </p>
          <p className="text-center text-muted-foreground mb-6 max-w-md">
            There might be an issue connecting to the database or the emma_ingredients table is empty.
          </p>
          <div className="mb-6">
            <ConnectionStatusIndicator connectionStatus={connectionStatus} />
          </div>
          <div className="space-y-4 w-full max-w-md">
            <p className="text-sm text-muted-foreground">
              Some possible causes:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>The emma_ingredients table doesn't exist in your database</li>
              <li>The table exists but has no data</li>
              <li>There may be permission issues accessing the table</li>
              <li>The connection to Supabase may be misconfigured</li>
              <li>Column names in the database don't match expected names</li>
              <li>Check Row Level Security policies on the table</li>
              <li>The schema of the table might not match your code</li>
            </ul>
          </div>
          <Button onClick={refetch} className="gap-2 mt-6">
            <RefreshCw className="h-4 w-4" /> Refresh Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
