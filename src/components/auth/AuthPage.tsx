
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
import { AuthProcessingCard } from "./AuthProcessingCard";
import { useAuthPage } from "./useAuthPage";

const AuthPage = () => {
  const { 
    isSignUp, 
    setIsSignUp, 
    isLoading, 
    authError, 
    setAuthError, 
    isRedirecting, 
    isEmailRedirect, 
    intendedDestination,
    handleFormSubmit
  } = useAuthPage();
  
  const { user } = useAuth();

  // Redirect to dashboard if user is already logged in
  // Only redirect if there's no auth redirect in progress
  if (user && !isRedirecting && !isEmailRedirect) {
    console.log("User is logged in, redirecting to:", intendedDestination);
    return <Navigate to={intendedDestination} replace />;
  }

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setAuthError(null);
  };

  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      
      <AuthRedirectHandler 
        setAuthError={setAuthError} 
        intendedDestination={intendedDestination}
      />
      
      <div className="container mx-auto px-4 pt-4 md:pt-12">
        <div className="w-full max-w-xs mx-auto py-2 md:py-6">
          {isRedirecting || isEmailRedirect ? (
            <AuthProcessingCard />
          ) : (
            <Card className="brutal-card overflow-hidden">
              <CardHeader className="p-3">
                <CardTitle className="text-lg md:text-xl font-mono uppercase font-semibold text-brutal-black text-center">
                  {isSignUp ? "Create Account" : "Sign In"}
                </CardTitle>
                <CardDescription className="text-center text-xs">
                  {isSignUp 
                    ? "Create a new account to access all features" 
                    : "Sign in to your account to continue"}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-3">
                <AuthForm 
                  isSignUp={isSignUp}
                  isLoading={isLoading}
                  authError={authError}
                  canSubmit={true}
                  onSubmitSuccess={handleFormSubmit}
                  onToggleMode={handleToggleMode}
                />
              </CardContent>
              
              <CardFooter className="flex justify-center p-3">
                <Button 
                  variant="link" 
                  onClick={handleToggleMode} 
                  className="text-brutal-gray text-xs"
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

export default AuthPage;
