
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isSignUp: boolean;
  isLoading: boolean;
  cooldownRemaining: number;
}

export const SubmitButton = ({ isSignUp, isLoading, cooldownRemaining }: SubmitButtonProps) => {
  const getButtonText = () => {
    if (cooldownRemaining > 0) {
      return `Wait ${cooldownRemaining}s`;
    }
    
    if (isLoading) {
      return isSignUp ? "Signing Up..." : "Signing In...";
    }
    
    return isSignUp ? "Sign Up" : "Sign In";
  };
  
  return (
    <Button 
      type="submit" 
      className="brutal-button w-full mt-6" 
      disabled={isLoading || cooldownRemaining > 0}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {getButtonText()}
    </Button>
  );
};
