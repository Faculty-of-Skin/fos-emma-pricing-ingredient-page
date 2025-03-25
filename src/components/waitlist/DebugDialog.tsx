
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DebugDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  webhookStatus: string;
  debugDetails: any;
  email: string | null;
}

export const DebugDialog = ({ 
  open, 
  onOpenChange, 
  webhookStatus, 
  debugDetails, 
  email 
}: DebugDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Debug Information</DialogTitle>
          <DialogDescription>
            Technical details for administrators.
          </DialogDescription>
        </DialogHeader>
        <div className="text-left mt-4 overflow-auto max-h-[400px]">
          <h3 className="font-semibold">Webhook Status:</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
            {webhookStatus || "No status available"}
          </pre>

          <h3 className="font-semibold mt-4">Configuration Check:</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
            {debugDetails ? JSON.stringify(debugDetails, null, 2) : "No configuration data available"}
          </pre>

          <h3 className="font-semibold mt-4">Email:</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
            {email || "No email found"}
          </pre>
          
          <div className="mt-4">
            <p className="text-sm text-brutal-gray">
              This information may help administrators diagnose any issues with the Discord webhook integration.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
