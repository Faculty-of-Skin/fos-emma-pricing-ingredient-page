
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthRedirectHandler } from "@/components/auth/AuthRedirectHandler";
import { Toaster } from "@/components/ui/toaster";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for hash in URL - this indicates an auth redirect
  const hasAuthRedirect = location.hash && location.hash.includes('access_token');
  
  // Handle form submission
  const handleFormSubmit = () => {
    setIsLoading(true);
    setAuthError(null);
    
    // The loading state will be reset when auth state changes or on error
    setTimeout(() => {
      setIsLoading(false);
    }, 10000); // Safety timeout to ensure loading state is eventually reset
  };

  // Reset loading state when component unmounts
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  // Redirect to dashboard if user is already logged in
  // Only redirect if there's no auth redirect in progress
  if (user && !hasAuthRedirect) {
    console.log("User is logged in, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      
      <AuthRedirectHandler setAuthError={setAuthError} />
      
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
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
                  {authError}
                </div>
              )}
              
              <AuthForm 
                isSignUp={isSignUp}
                isLoading={isLoading}
                authError={authError}
                canSubmit={true}
                onSubmitSuccess={handleFormSubmit}
                onToggleMode={() => {
                  setIsSignUp(!isSignUp);
                  setAuthError(null);
                }}
              />
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <Button 
                variant="link" 
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setAuthError(null);
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
      
      <Toaster />
    </div>
  );
};

export default Auth;
