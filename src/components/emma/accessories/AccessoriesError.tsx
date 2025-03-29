
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface AccessoriesErrorProps {
  error: string | null;
  onRefresh: () => void;
}

export const AccessoriesError = ({ error, onRefresh }: AccessoriesErrorProps) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTitle className="flex items-center gap-2">
        Error <Button variant="ghost" size="sm" onClick={onRefresh} className="p-1 h-6 w-6 ml-2"><RefreshCcw className="h-4 w-4" /></Button>
      </AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};
