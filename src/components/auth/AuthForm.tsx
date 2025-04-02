
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth";
import { useToast } from "@/hooks/use-toast";
import { AuthFormValues, authSchema, userTypes } from "@/utils/auth/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AuthFormProps {
  isSignUp: boolean;
  isLoading: boolean;
  authError: string | null;
  canSubmit: boolean;
  onSubmitSuccess?: () => void;
  onToggleMode: () => void;
}

export const AuthForm = ({
  isSignUp,
  isLoading,
  authError,
  canSubmit,
  onSubmitSuccess,
  onToggleMode,
}: AuthFormProps) => {
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<number | null>(null);
  
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
      userType: undefined,
    },
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
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {authError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {authError}
          </div>
        )}
        
        {cooldownRemaining > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-md text-sm">
            Please wait {cooldownRemaining} seconds before trying again.
          </div>
        )}
        
        {isSignUp && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono uppercase">First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John" 
                        className="border-2 border-brutal-black" 
                        {...field} 
                        disabled={isLoading || cooldownRemaining > 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono uppercase">Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Doe" 
                        className="border-2 border-brutal-black" 
                        {...field} 
                        disabled={isLoading || cooldownRemaining > 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="font-mono uppercase">Who are you?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 p-1"
                      disabled={isLoading || cooldownRemaining > 0}
                    >
                      {userTypes.map((type) => (
                        <FormItem 
                          key={type} 
                          className="flex items-center space-x-3 space-y-0 p-2 border-2 border-brutal-black rounded"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} className="border-brutal-black" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer w-full">{type}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono uppercase">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="you@example.com" 
                  className="border-2 border-brutal-black" 
                  type="email"
                  autoComplete={isSignUp ? "email" : "username"}
                  {...field} 
                  disabled={isLoading || cooldownRemaining > 0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono uppercase">Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="border-2 border-brutal-black" 
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  {...field} 
                  disabled={isLoading || cooldownRemaining > 0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="brutal-button w-full mt-6" 
          disabled={isLoading || cooldownRemaining > 0}
        >
          {cooldownRemaining > 0 
            ? `Wait ${cooldownRemaining}s` 
            : isLoading 
              ? "Processing..." 
              : isSignUp 
                ? "Sign Up" 
                : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};
