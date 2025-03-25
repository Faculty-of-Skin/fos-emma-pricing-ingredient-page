
import React from "react";
import { Button } from "@/components/ui/button";

interface CompletedStateProps {
  success: boolean;
  onContinue: () => void;
}

export const CompletedState = ({ success, onContinue }: CompletedStateProps) => {
  return (
    <div className="mt-4">
      {success && <p className="text-green-600 mb-4">✓ Notification sent successfully!</p>}
      <Button onClick={onContinue} className="brutal-button">
        Continue to Registration Form
      </Button>
    </div>
  );
};
