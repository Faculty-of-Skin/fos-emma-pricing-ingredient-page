
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthRedirectHandlerProps {
  setAuthError: (error: string | null) => void;
}

export const AuthRedirectHandler = ({ setAuthError }: AuthRedirectHandlerProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Function to handle authentication redirects
    const handleAuthRedirect = async () => {
      // Get the hash from the URL
      const hash = window.location.hash;
      console.log("Current URL hash:", hash);
      
      // Check for access token in URL (Supabase auth callback)
      if (hash && (hash.includes('access_token') || hash.includes('error'))) {
        console.log("Auth callback detected in URL");
        
        try {
          // Process the hash with Supabase auth - this should set up the session
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Error getting session:", error.message);
            setAuthError(error.message);
            toast({
              title: "Authentication Error",
              description: error.message,
              variant: "destructive",
            });
          } else if (data.session) {
            console.log("Session after redirect:", data.session.user?.email);
            
            // Extract the authentication type from the hash
            const hashParams = new URLSearchParams(hash.substring(1));
            const authType = hashParams.get('type');
            
            // Show appropriate toast message based on auth type
            if (authType === 'signup') {
              toast({
                title: "Email Verified",
                description: "Your account has been verified and you are now signed in.",
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
            } else {
              toast({
                title: "Authentication Successful",
                description: "You are now signed in.",
              });
            }
            
            // Redirect to dashboard after successful authentication
            setTimeout(() => {
              navigate('/dashboard');
            }, 1000);
          }
          
          // Clear the hash from the URL to prevent issues on refresh
          if (window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        } catch (error: any) {
          console.error("Error processing auth redirect:", error);
          setAuthError(error.message);
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
    };

    // Handle auth redirect
    handleAuthRedirect();
    
    // Clear any auth errors when component mounts or route changes
    return () => {
      setAuthError(null);
    };
  }, [location, toast, setAuthError, navigate]);
  
  return null;
};
