
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase, getSiteUrl } from "@/integrations/supabase/client";

interface AuthRedirectHandlerProps {
  setAuthError: (error: string | null) => void;
  intendedDestination?: string;
}

export const AuthRedirectHandler = ({ setAuthError, intendedDestination = '/dashboard' }: AuthRedirectHandlerProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Function to handle authentication redirects
    const handleAuthRedirect = async () => {
      // Check for code parameter in URL (email verification)
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      
      console.log("Checking for auth redirects, URL:", window.location.href);
      console.log("Search params:", location.search);
      console.log("Auth code in URL:", code || "none");
      console.log("Intended destination:", intendedDestination);
      
      if (code) {
        console.log("Auth code detected in URL:", code);
        try {
          // Exchange the code for a session
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            console.error("Error exchanging code for session:", error.message);
            setAuthError(error.message);
            toast({
              title: "Authentication Error",
              description: error.message,
              variant: "destructive",
            });
          } else if (data.session) {
            console.log("Session after code exchange:", data.session.user?.email);
            
            toast({
              title: "Email Verified",
              description: "Your account has been verified and you are now signed in.",
            });
            
            // Redirect to intended destination after successful authentication
            setTimeout(() => {
              navigate(intendedDestination);
            }, 1000);
          }
          
          // Clear the code from the URL to prevent issues on refresh
          if (window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        } catch (error: any) {
          console.error("Error processing auth code:", error);
          setAuthError(error.message);
        }
        return;
      }
      
      // Get the hash from the URL (for other auth flows)
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
            
            // Redirect to intended destination after successful authentication
            setTimeout(() => {
              navigate(intendedDestination);
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
      const authEvent = searchParams.get('event');
      if (authEvent === 'signup-success') {
        toast({
          title: "Sign Up Successful",
          description: "Please check your email for verification instructions.",
        });
      }
    };

    // Handle auth redirect with a slight delay to ensure all parameters are properly loaded
    setTimeout(() => {
      handleAuthRedirect();
    }, 100);
    
    // Clear any auth errors when component mounts or route changes
    return () => {
      setAuthError(null);
    };
  }, [location, toast, setAuthError, navigate, intendedDestination]);
  
  return null;
};
