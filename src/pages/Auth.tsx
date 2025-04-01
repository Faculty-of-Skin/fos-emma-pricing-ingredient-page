
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [formSubmitTime, setFormSubmitTime] = useState<number | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Track submission time to enforce cooldown
  const canSubmit = !formSubmitTime || (Date.now() - formSubmitTime > 5000);
  
  // Handle form submission
  const handleFormSubmit = () => {
    setIsLoading(true);
    setAuthError(null);
    setFormSubmitTime(Date.now());
    
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
  if (user) {
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
              <AuthForm 
                isSignUp={isSignUp}
                isLoading={isLoading}
                authError={authError}
                canSubmit={canSubmit}
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
    </div>
  );
};

export default Auth;
