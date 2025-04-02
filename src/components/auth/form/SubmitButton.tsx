
import { Button } from "@/components/ui/button";

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
      return "Processing...";
    }
    
    return isSignUp ? "Sign Up" : "Sign In";
  };
  
  return (
    <Button 
      type="submit" 
      className="brutal-button w-full mt-6" 
      disabled={isLoading || cooldownRemaining > 0}
    >
      {getButtonText()}
    </Button>
  );
};
