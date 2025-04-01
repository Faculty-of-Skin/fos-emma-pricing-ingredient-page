
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthRedirectHandlerProps {
  setAuthError: (error: string | null) => void;
}

export const AuthRedirectHandler = ({ setAuthError }: AuthRedirectHandlerProps) => {
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash;
    console.log("Current URL hash:", hash);
    
    // Check for access token in URL (Supabase auth callback)
    if (hash && (hash.includes('access_token') || hash.includes('error'))) {
      console.log("Auth callback detected in URL");
      
      // Parse the hash to extract parameters
      const hashParams = new URLSearchParams(hash.substring(1));
      
      // Check for the auth type
      const authType = hashParams.get('type');
      console.log("Auth type:", authType);
      
      // Handle different auth events
      if (authType === 'signup') {
        toast({
          title: "Sign Up Successful",
          description: "Your account has been created and you are now signed in.",
        });
      } else if (authType === 'recovery') {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been reset and you are now signed in.",
        });
      } else if (authType === 'magiclink') {
        toast({
          title: "Sign In Successful",
          description: "You have been signed in via magic link.",
        });
      }
      
      // If there's an error, display it
      if (hash.includes('error')) {
        const errorParam = hashParams.get('error_description');
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
      
      // Process the hash with Supabase auth
      supabase.auth.getSession().then(({ data: { session } }) => {
        console.log("Session after redirect:", session?.user?.email);
        if (session) {
          // We have a session, we can redirect or update UI
          toast({
            title: "Authentication Successful",
            description: "You are now signed in.",
          });
        }
      }).catch(error => {
        console.error("Error processing auth redirect:", error);
        setAuthError(error.message);
      });
      
      // Clear the hash from the URL to prevent issues on refresh
      if (window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
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
