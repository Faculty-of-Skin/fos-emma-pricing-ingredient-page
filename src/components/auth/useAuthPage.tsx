
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSiteUrl } from "@/integrations/supabase/client";

export const useAuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const location = useLocation();
  
  // Get intended destination from location state
  const intendedDestination = location.state?.from || '/dashboard';
  
  // Check for code or hash in URL - this indicates an auth redirect
  const hasAuthRedirect = location.search.includes('code=') || 
                          (location.hash && (
                            location.hash.includes('access_token') || 
                            location.hash.includes('error')
                          ));
  
  // Log important auth-related information on page load
  useEffect(() => {
    console.log("Auth page loaded");
    console.log("Current URL:", window.location.href);
    console.log("Site URL from config:", getSiteUrl());
    console.log("Has auth redirect:", hasAuthRedirect);
    console.log("Intended destination:", intendedDestination);
    
    if (location.search) {
      console.log("URL search params:", location.search);
    }
    
    if (location.hash) {
      console.log("URL hash:", location.hash);
    }
  }, [location, hasAuthRedirect, intendedDestination]);
  
  // Effect to detect hash changes for auth redirects
  useEffect(() => {
    if (hasAuthRedirect) {
      console.log("Auth redirect detected, setting redirecting state");
      setIsRedirecting(true);
      setIsLoading(true);
      
      // Add timeout to reset if redirect handling fails
      const timeout = setTimeout(() => {
        console.log("Redirect handling timeout reached, resetting state");
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
    (window.location.search.includes('code=') ||
    (window.location.hash && window.location.hash.includes('type=signup')));

  return {
    isSignUp,
    setIsSignUp,
    isLoading,
    setIsLoading,
    authError,
    setAuthError,
    isRedirecting,
    setIsRedirecting,
    isEmailRedirect,
    intendedDestination,
    hasAuthRedirect,
    handleFormSubmit
  };
};
