
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthRedirectHandlerProps {
  setAuthError: (error: string | null) => void;
}

export const AuthRedirectHandler = ({ setAuthError }: AuthRedirectHandlerProps) => {
  const location = useLocation();
  const { toast } = useToast();
  
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
  }, [location, toast, setAuthError]);
  
  return null;
};
