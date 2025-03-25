
import React from "react";

interface ProcessingStateProps {
  isNotifying: boolean;
}

export const ProcessingState = ({ isNotifying }: ProcessingStateProps) => {
  return (
    <div className="text-sm text-brutal-gray">
      Processing your registration...
    </div>
  );
};
