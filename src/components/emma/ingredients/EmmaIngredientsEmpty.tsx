
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
  testSQL?: () => void;
  connectionStatus: 'unknown' | 'success' | 'failed';
  onShowDebugDialog?: () => void;
  isAdmin: boolean;
}

export const EmmaIngredientsEmpty: React.FC<EmmaIngredientsEmptyProps> = ({
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
            <RefreshCw className="h-4 w-4" /> Refresh
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
          {isAdmin && onShowDebugDialog && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onShowDebugDialog}
              className="gap-2 border-2 border-brutal-black bg-brutal-white text-brutal-black hover:bg-brutal-black hover:text-brutal-white font-mono uppercase tracking-wider transform transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Info className="h-4 w-4" /> Debug
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="bg-brutal-white">
        <div className="flex flex-col items-center py-12">
          <Database className="h-12 w-12 text-brutal-black mb-4" />
          <p className="text-center text-lg font-medium mb-2 font-mono uppercase tracking-wider text-brutal-black">
            No ingredient data available
          </p>
          <p className="text-center text-brutal-charcoal mb-6 max-w-md font-mono">
            There might be an issue connecting to the database or the emma_ingredients table is empty.
          </p>
          {isAdmin && (
            <div className="mb-6">
              <ConnectionStatusIndicator connectionStatus={connectionStatus} />
            </div>
          )}
          {isAdmin && (
            <div className="space-y-4 w-full max-w-md">
              <p className="text-sm text-brutal-black font-mono uppercase">
                Some possible causes:
              </p>
              <ul className="list-disc pl-5 text-sm text-brutal-charcoal space-y-2 font-mono">
                <li>The emma_ingredients table doesn't exist in your database</li>
                <li>The table exists but has no data</li>
                <li>There may be permission issues accessing the table</li>
                <li>The connection to Supabase may be misconfigured</li>
                <li>Column names in the database don't match expected names</li>
                <li>Check Row Level Security policies on the table</li>
                <li>The schema of the table might not match your code</li>
              </ul>
            </div>
          )}
          <Button 
            onClick={refetch} 
            className="gap-2 mt-6 border-4 border-brutal-black bg-brutal-black text-brutal-white hover:bg-brutal-charcoal font-mono uppercase tracking-wider transform transition-transform hover:translate-x-1 hover:translate-y-1"
          >
            <RefreshCw className="h-4 w-4" /> Refresh Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
