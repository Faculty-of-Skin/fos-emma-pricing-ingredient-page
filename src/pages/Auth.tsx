
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }).optional().or(z.literal('')),
  lastName: z.string().min(1, { message: "Last name is required" }).optional().or(z.literal(''))
});

type AuthFormValues = z.infer<typeof authSchema>;

// Debounce function to prevent multiple rapid form submissions
const useDebounce = (callback: Function, delay: number) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedFn = (...args: any[]) => {
    if (timer) clearTimeout(timer);
    
    return new Promise((resolve) => {
      const newTimer = setTimeout(async () => {
        try {
          const result = await callback(...args);
          resolve(result);
        } catch (error) {
          resolve(error);
        }
      }, delay);
      
      setTimer(newTimer);
    });
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return debouncedFn;
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [formSubmitTime, setFormSubmitTime] = useState<number | null>(null);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Track submission time to enforce cooldown
  const canSubmit = !formSubmitTime || (Date.now() - formSubmitTime > 5000);
  
  // Check for hash parameters that might indicate a redirect from Supabase auth
  useEffect(() => {
    const hash = window.location.hash;
    console.log("Current URL hash:", hash);
    
    // Check for access token in URL (Supabase auth callback)
    if (hash && (hash.includes('access_token') || hash.includes('error'))) {
      console.log("Auth callback detected in URL");
      
      // If there's an error, display it
      if (hash.includes('error')) {
        const errorParam = new URLSearchParams(hash.substring(1)).get('error_description');
        if (errorParam) {
          const decodedError = decodeURIComponent(errorParam);
          setAuthError(decodedError);
          toast({
            title: "Authentication Error",
            description: decodedError,
            variant: "destructive",
          });
        }
      }
    }
    
    // Check for manual redirect with search params
    const searchParams = new URLSearchParams(location.search);
    const authEvent = searchParams.get('event');
    if (authEvent === 'signup-success') {
      toast({
        title: "Sign Up Successful",
        description: "Please check your email for verification instructions.",
      });
    }

    // Clear any auth errors when component mounts or route changes
    setAuthError(null);
  }, [location, toast]);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    },
  });

  // Debounced authentication functions to prevent rapid successive calls
  const debouncedSignIn = useDebounce(signIn, 500);
  const debouncedSignUp = useDebounce(signUp, 500);

  const onSubmit = async (values: AuthFormValues) => {
    if (!canSubmit) {
      toast({
        title: "Please wait",
        description: "You're submitting too quickly. Please wait a few seconds before trying again.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setAuthError(null);
      setFormSubmitTime(Date.now());
      
      console.log("Submitting auth form:", isSignUp ? "signup" : "signin");
      
      if (isSignUp) {
        console.log("Attempting signup with:", values.email);
        const result = await debouncedSignUp(values.email, values.password, values.firstName || "", values.lastName || "");
        console.log("Signup result:", result);
      } else {
        console.log("Attempting signin with:", values.email);
        await debouncedSignIn(values.email, values.password);
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      
      let errorMessage = error.message || "An error occurred during authentication.";
      
      // Check for rate limiting errors
      if (errorMessage.includes("security purposes") && errorMessage.includes("seconds")) {
        errorMessage = "Too many login attempts. Please wait a moment before trying again.";
      }
      
      setAuthError(errorMessage);
      
      toast({
        title: "Authentication Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to dashboard if user is already logged in
  if (user) {
    console.log("User is logged in, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto py-16">
          <Card className="brutal-card">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-mono uppercase font-semibold text-brutal-black text-center">
                {isSignUp ? "Create Account" : "Sign In"}
              </CardTitle>
              <CardDescription className="text-center">
                {isSignUp 
                  ? "Create a new account to access all features" 
                  : "Sign in to your account to continue"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                  {authError}
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {isSignUp && (
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
                                disabled={isLoading}
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
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                            disabled={isLoading}
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
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="brutal-button w-full mt-6" 
                    disabled={isLoading || !canSubmit}
                  >
                    {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <Button 
                variant="link" 
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setAuthError(null);
                  form.reset();
                }} 
                className="text-brutal-gray"
                disabled={isLoading}
              >
                {isSignUp 
                  ? "Already have an account? Sign In" 
                  : "Don't have an account? Sign Up"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
