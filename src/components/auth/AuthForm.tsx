
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { AuthFormValues, authSchema } from "@/utils/auth/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
      console.log("Submitting auth form:", isSignUp ? "signup" : "signin");
      
      if (isSignUp) {
        console.log("Attempting signup with:", values.email);
        const result = await debouncedSignUp(values.email, values.password, values.firstName || "", values.lastName || "");
        console.log("Signup result:", result);
      } else {
        console.log("Attempting signin with:", values.email);
        await debouncedSignIn(values.email, values.password);
      }
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      
      let errorMessage = error.message || "An error occurred during authentication.";
      
      // Check for rate limiting errors
      if (errorMessage.includes("security purposes") && errorMessage.includes("seconds")) {
        errorMessage = "Too many login attempts. Please wait a moment before trying again.";
      }
      
      toast({
        title: "Authentication Failed",
        description: errorMessage,
        variant: "destructive",
      });
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
  );
};
