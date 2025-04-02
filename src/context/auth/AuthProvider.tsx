
import { createContext, useContext, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType } from "./types";
import { useAuthState, useAuthSignIn, useAuthSignUp, useAuthSignOut } from "./use-auth-hooks";
import { fetchUserProfile } from "./auth-utils";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { 
    session, setSession,
    user, setUser,
    profile, setProfile,
    profileError, setProfileError,
    isLoading, setIsLoading
  } = useAuthState();
  
  const signIn = useAuthSignIn();
  const signUp = useAuthSignUp();
  const signOut = useAuthSignOut();

  useEffect(() => {
    console.log("Setting up auth state listener");
    // Set up auth state listener FIRST to avoid missing events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        // If user logged out, clear profile
        if (!session) {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setSession, setUser, setIsLoading, setProfile]);

  // Load profile when user changes
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          setProfileError(null);
          const { profile: userProfile, error } = await fetchUserProfile(user.id);
          setProfile(userProfile);
          if (error) {
            setProfileError(error);
          }
        } catch (error: any) {
          console.error('Error in profile fetch process:', error);
          // Fallback to default profile with customer role
          setProfile({ id: user.id, role: 'customer' });
          setProfileError(error);
        }
      } else {
        setProfile(null);
        setProfileError(null);
      }
    };

    loadUserProfile();
  }, [user, setProfile, setProfileError]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        profileError,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAdmin: profile?.role === "admin",
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
