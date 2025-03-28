
import { useState } from "react";
import { Navigate } from "react-router-dom";
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
import { Separator } from "@/components/ui/separator";

const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }).optional().or(z.literal('')),
  lastName: z.string().min(1, { message: "Last name is required" }).optional().or(z.literal(''))
});

type AuthFormValues = z.infer<typeof authSchema>;

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn, signUp, signInWithGoogle } = useAuth();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    },
  });

  const onSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUp(values.email, values.password, values.firstName || "", values.lastName || "");
      } else {
        await signIn(values.email, values.password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google authentication error:", error);
    }
  };

  // Redirect to dashboard if user is already logged in
  if (user) {
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
                            {...field} 
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
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="brutal-button w-full mt-6" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-brutal-gray">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mt-4 brutal-outline-button"
                  onClick={handleGoogleSignIn}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2">
                    <path d="M15.5254 8.00504C15.5254 7.46695 15.4804 6.93944 15.3991 6.42317H8.08691V9.31629H12.3091C12.1241 10.2471 11.554 11.0352 10.7041 11.5346V13.4329H13.1913C14.6485 12.1063 15.5254 10.2471 15.5254 8.00504Z" fill="#4285F4"/>
                    <path d="M8.08691 15.5254C10.154 15.5254 11.8944 14.8435 13.1913 13.4329L10.7041 11.5346C9.99874 11.9831 9.11872 12.2457 8.08691 12.2457C6.0199 12.2457 4.26996 10.9191 3.63937 9.12012H1.06812V11.0801C2.35498 13.7266 5.03087 15.5254 8.08691 15.5254Z" fill="#34A853"/>
                    <path d="M3.63937 9.12012C3.35246 8.16929 3.35246 7.14807 3.63937 6.19724V4.23727H1.06812C0.0363061 6.39039 0.0363061 8.92697 1.06812 11.0801L3.63937 9.12012Z" fill="#FBBC05"/>
                    <path d="M8.08691 3.27939C9.17995 3.26001 10.2459 3.67793 11.059 4.43671L13.2463 2.28C11.8326 0.965417 9.98308 0.244774 8.08691 0.27377C5.03087 0.27377 2.35498 2.0726 1.06812 4.71906L3.63937 6.67904C4.26996 4.88004 6.0199 3.55349 8.08691 3.27939Z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <Button 
                variant="link" 
                onClick={() => setIsSignUp(!isSignUp)} 
                className="text-brutal-gray"
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
