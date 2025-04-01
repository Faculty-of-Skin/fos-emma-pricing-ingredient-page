
import { Session, User } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  role: "admin" | "customer";
};

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  profileError: Error | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<any>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isAuthenticated: boolean;
};
