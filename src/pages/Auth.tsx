
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
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Check for hash in URL - this indicates an auth redirect
  const hasAuthRedirect = location.hash && (
    location.hash.includes('access_token') || 
    location.hash.includes('error')
  );
  
  // Effect to detect hash changes for auth redirects
  useEffect(() => {
    if (hasAuthRedirect) {
      console.log("Auth redirect detected, setting redirecting state");
      setIsRedirecting(true);
      setIsLoading(true);
      
      // Add timeout to reset if redirect handling fails
      const timeout = setTimeout(() => {
        setIsRedirecting(false);
        setIsLoading(false);
      }, 10000);
      
      return () => clearTimeout(timeout);
    }
  }, [hasAuthRedirect]);
  
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
      setIsRedirecting(false);
    };
  }, []);

  // Check if we're coming from an email link redirect
  const isEmailRedirect = typeof window !== 'undefined' && 
    window.location.hash && 
    window.location.hash.includes('type=signup');

  // Redirect to dashboard if user is already logged in
  // Only redirect if there's no auth redirect in progress
  if (user && !isRedirecting && !isEmailRedirect) {
    console.log("User is logged in, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      
      <AuthRedirectHandler 
        setAuthError={setAuthError} 
      />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto py-16">
          {isRedirecting || isEmailRedirect ? (
            <Card className="brutal-card">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-mono uppercase font-semibold text-brutal-black text-center">
                  Processing Authentication
                </CardTitle>
                <CardDescription className="text-center">
                  Please wait while we verify your credentials...
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brutal-black"></div>
              </CardContent>
            </Card>
          ) : (
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
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {authError}
                    </AlertDescription>
                  </Alert>
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
          )}
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Auth;
