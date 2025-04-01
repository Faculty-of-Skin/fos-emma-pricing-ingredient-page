
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Profile = {
  id: string;
  role: "admin" | "customer";
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  profileError: Error | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<any>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileError, setProfileError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up auth state listener");
    // Set up auth state listener FIRST to avoid missing events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
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
  }, []);

  // Try to create a profile if it doesn't exist
  const createProfileIfNotExists = async (userId: string) => {
    try {
      console.log("Attempting to create profile for user:", userId);
      const { error } = await supabase
        .from('profiles')
        .insert([{ id: userId, role: 'customer' }]);
      
      if (!error) {
        console.log('Created new profile for user');
        return { id: userId, role: 'customer' } as Profile;
      } else {
        console.error('Error creating profile:', error);
      }
      return null;
    } catch (error) {
      console.error('Error creating profile:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          setProfileError(null);
          console.log("Fetching profile for user:", user.id);
          
          // First try to get the profile
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            
            // If profile doesn't exist, try to create one
            if (error.code === 'PGRST116') {
              console.log("Profile not found, attempting to create one");
              const newProfile = await createProfileIfNotExists(user.id);
              if (newProfile) {
                setProfile(newProfile);
                return;
              }
            }
            
            // Set default profile with customer role if can't fetch or create
            console.log("Setting default customer profile");
            setProfile({ id: user.id, role: 'customer' });
            setProfileError(error);
          } else {
            console.log("Profile fetched successfully:", data);
            setProfile(data as Profile);
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

    fetchProfile();
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in with email:", email);
      // Use updated signInWithPassword method
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
      });
      
      if (error) throw error;
      console.log("Sign in successful");
    } catch (error: any) {
      console.error("Sign in error:", error.message);
      toast({
        title: "Sign In Failed",
        description: error.message || "An error occurred during sign in.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, firstName = "", lastName = "") => {
    try {
      console.log("Signing up with email:", email);
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      
      if (error) throw error;
      
      console.log("Sign up successful, data:", data);
      
      toast({
        title: "Sign Up Successful",
        description: "Please check your email for verification instructions.",
      });
      
      return data;
    } catch (error: any) {
      console.error("Sign up error:", error.message);
      toast({
        title: "Sign Up Failed",
        description: error.message || "An error occurred during sign up.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out");
      await supabase.auth.signOut();
      console.log("Sign out successful");
    } catch (error: any) {
      console.error("Sign out error:", error.message);
      toast({
        title: "Sign Out Failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      });
    }
  };

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
