
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
      
      <div className="container mx-auto px-3 md:px-4 pt-16 md:pt-24">
        <div className="max-w-md mx-auto py-8 md:py-16">
          {isRedirecting || isEmailRedirect ? (
            <AuthProcessingCard />
          ) : (
            <Card className="brutal-card overflow-hidden">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-xl md:text-2xl lg:text-3xl font-mono uppercase font-semibold text-brutal-black text-center">
                  {isSignUp ? "Create Account" : "Sign In"}
                </CardTitle>
                <CardDescription className="text-center text-sm md:text-base">
                  {isSignUp 
                    ? "Create a new account to access all features" 
                    : "Sign in to your account to continue"}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4 md:p-6">
                <AuthForm 
                  isSignUp={isSignUp}
                  isLoading={isLoading}
                  authError={authError}
                  canSubmit={true}
                  onSubmitSuccess={handleFormSubmit}
                  onToggleMode={handleToggleMode}
                />
              </CardContent>
              
              <CardFooter className="flex justify-center p-4 md:p-6">
                <Button 
                  variant="link" 
                  onClick={handleToggleMode} 
                  className="text-brutal-gray text-sm md:text-base"
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
