
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormValues, authSchema } from "@/utils/auth/validation";
import { useAuth } from "@/context/auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UseAuthFormProps {
  isSignUp: boolean;
  onSubmitSuccess?: () => void;
}

export const useAuthForm = ({ isSignUp, onSubmitSuccess }: UseAuthFormProps) => {
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Default cooldown time in seconds
  const DEFAULT_COOLDOWN = 10;
  
  // Form setup
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userType: "Individual",
    },
    mode: "onBlur", // Validate on blur for better user experience
  });

  // Countdown timer for cooldown
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setCooldownRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [cooldownRemaining]);

  // Handle rate limit errors by extracting cooldown time
  const handleRateLimitError = (error: Error) => {
    const message = error.message;
    // Extract seconds from rate limit error message
    const secondsMatch = message.match(/after (\d+) seconds/);
    if (secondsMatch && secondsMatch[1]) {
      const seconds = parseInt(secondsMatch[1], 10);
      setCooldownRemaining(seconds);
      setLastAttemptTime(Date.now());
      return seconds;
    }
    // Default cooldown if we can't parse the message
    setCooldownRemaining(DEFAULT_COOLDOWN);
    setLastAttemptTime(Date.now());
    return DEFAULT_COOLDOWN;
  };

  const onSubmit = async (values: AuthFormValues) => {
    // Check if we're in cooldown
    if (cooldownRemaining > 0) {
      toast({
        title: "Please wait",
        description: `You need to wait ${cooldownRemaining} seconds before trying again.`,
        variant: "destructive",
      });
      return;
    }

    // Set a minimum time between attempts even without rate limiting errors
    const now = Date.now();
    if (lastAttemptTime && now - lastAttemptTime < DEFAULT_COOLDOWN * 1000) {
      const waitTime = Math.ceil((DEFAULT_COOLDOWN * 1000 - (now - lastAttemptTime)) / 1000);
      setCooldownRemaining(waitTime);
      toast({
        title: "Please wait",
        description: `Please wait ${waitTime} seconds between attempts.`,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      console.log("Submitting auth form:", isSignUp ? "signup" : "signin");
      setLastAttemptTime(Date.now());
      
      if (isSignUp) {
        console.log("Attempting signup with:", values.email);
        await signUp(
          values.email, 
          values.password, 
          values.firstName || "", 
          values.lastName || "", 
          values.userType
        );
        
        // Redirect to email confirmation page after successful signup
        navigate('/email-confirmation');
      } else {
        console.log("Attempting signin with:", values.email);
        await signIn(values.email, values.password);
        
        // Only navigate to dashboard on successful sign in
        navigate('/dashboard');
      }
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      
      // Check for rate limiting errors
      if (error.message.includes("security purposes") && error.message.includes("seconds")) {
        const cooldownTime = handleRateLimitError(error);
        toast({
          title: "Rate limit exceeded",
          description: `Please wait ${cooldownTime} seconds before trying again.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Authentication Failed",
          description: error.message || "An error occurred during authentication.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    cooldownRemaining,
    isLoading,
    onSubmit
  };
};
