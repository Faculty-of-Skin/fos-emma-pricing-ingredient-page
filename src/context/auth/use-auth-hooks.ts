
import { useState } from "react";
import { Session, User, AuthResponse } from "@supabase/supabase-js";
import { supabase, getSiteUrl, getRedirectUrl } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "./types";
import { UserType } from "@/utils/auth/validation";

export const useAuthSignIn = () => {
  const { toast } = useToast();

  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      console.log("Signing in with email:", email);
      // Check for rapid successive calls
      const response = await supabase.auth.signInWithPassword({ 
        email, 
        password,
      });
      
      if (response.error) {
        console.error("Sign in error:", response.error.message);
        
        // Check if it's a rate limiting error
        if (response.error.message.includes("security purposes") && response.error.message.includes("seconds")) {
          throw new Error(`Rate limit exceeded. ${response.error.message}`);
        }
        
        throw response.error;
      }
      
      console.log("Sign in successful, data:", response.data);
      return response;
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

  return signIn;
};

export const useAuthSignUp = () => {
  const { toast } = useToast();
  const redirectTo = getRedirectUrl();

  const signUp = async (
    email: string, 
    password: string, 
    firstName = "", 
    lastName = "",
    userType?: UserType
  ) => {
    try {
      console.log("Signing up with email:", email);
      console.log("Using redirect URL:", redirectTo);
      
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            user_type: userType
          },
          emailRedirectTo: redirectTo
        }
      });
      
      if (error) {
        console.error("Sign up error:", error.message);
        
        // Check if it's a rate limiting error
        if (error.message.includes("security purposes") && error.message.includes("seconds")) {
          throw new Error(`Rate limit exceeded. ${error.message}`);
        }
        
        throw error;
      }
      
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

  return signUp;
};

export const useAuthSignOut = () => {
  const { toast } = useToast();

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

  return signOut;
};

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileError, setProfileError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return {
    session,
    setSession,
    user,
    setUser,
    profile,
    setProfile,
    profileError,
    setProfileError,
    isLoading,
    setIsLoading,
  };
};
