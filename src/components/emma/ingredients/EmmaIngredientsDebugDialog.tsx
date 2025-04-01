
import React from "react";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ConnectionStatusIndicator } from "./EmmaIngredientsSummary";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";

interface EmmaIngredientsDebugDialogProps {
  showDebugDialog: boolean;
  setShowDebugDialog: (show: boolean) => void;
  connectionStatus: 'unknown' | 'success' | 'failed';
  queryDetails: {
    url: string;
    key: string;
    tableName: string;
  };
  tableInfo: any;
  rawData: any[] | null;
  ingredients: EmmaIngredient[];
  refetch: () => void;
  testSQL: () => void;
  rowCount?: number | null;
  checkRowCount?: () => Promise<number | null>;
}

export const EmmaIngredientsDebugDialog: React.FC<EmmaIngredientsDebugDialogProps> = ({
  showDebugDialog,
  setShowDebugDialog,
  connectionStatus,
  queryDetails,
  tableInfo,
  rawData,
  ingredients,
  refetch,
  testSQL,
  rowCount,
  checkRowCount,
}) => {
  return (
    <Dialog open={showDebugDialog} onOpenChange={setShowDebugDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Database Debug Information</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold text-md">Connection Status:</h3>
            <div className="p-2 bg-muted rounded-md">
              <ConnectionStatusIndicator connectionStatus={connectionStatus} />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-md">Table Data Status:</h3>
            <div className="p-2 bg-muted rounded-md">
              <p>Row Count: {rowCount !== null ? rowCount : 'Unknown'}</p>
              {rowCount === 0 && (
                <p className="text-amber-500 mt-1">Table exists but contains no data</p>
              )}
              {rowCount !== null && rowCount > 0 && (
                <p className="text-green-500 mt-1">Table contains {rowCount} rows of data</p>
              )}
              {checkRowCount && (
                <Button 
                  onClick={checkRowCount} 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                >
                  Check Row Count
                </Button>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-md">Connection Details:</h3>
            <div className="p-2 bg-muted rounded-md">
              <p>Supabase URL: {queryDetails.url}</p>
              <p>API Key (first/last 4 chars): {queryDetails.key.substring(0, 4)}...{queryDetails.key.substring(queryDetails.key.length - 4)}</p>
              <p>Table Name: {queryDetails.tableName}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-md">Table Information:</h3>
            <div className="p-2 bg-muted rounded-md">
              <p>Column Names: {tableInfo?.columnInfo ? tableInfo.columnInfo.join(', ') : 'Not available'}</p>
              {tableInfo?.introspectionData && (
                <div className="mt-2">
                  <p>Table Details:</p>
                  <pre className="text-xs whitespace-pre-wrap">
                    {JSON.stringify(tableInfo.introspectionData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-md">Raw Data from Database:</h3>
            <div className="p-2 bg-muted rounded-md max-h-60 overflow-auto">
              <pre className="text-xs whitespace-pre-wrap">
                {rawData ? JSON.stringify(rawData, null, 2) : "No raw data available"}
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-md">Mapped Data:</h3>
            <div className="p-2 bg-muted rounded-md max-h-60 overflow-auto">
              <pre className="text-xs whitespace-pre-wrap">
                {ingredients.length > 0 ? JSON.stringify(ingredients, null, 2) : "No mapped data available"}
              </pre>
            </div>
          </div>

          <div className="pt-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Troubleshooting Tips</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                  <li>Check that the table name is exactly 'emma_ingredients' (case-sensitive)</li>
                  <li>Verify column names match the expected format</li>
                  <li>Ensure your Supabase connection details are correct</li>
                  <li>Check that Row Level Security policies allow access to this table</li>
                  <li>Try inserting a test row directly in the Supabase dashboard</li>
                  <li>Ensure public access is enabled for this table (RLS policies)</li>
                  <li>Check if column casing matches (uppercase vs lowercase)</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowDebugDialog(false)}>
              Close
            </Button>
            <Button onClick={testSQL}>
              Run SQL Test
            </Button>
            <Button onClick={refetch}>
              Retry Connection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
