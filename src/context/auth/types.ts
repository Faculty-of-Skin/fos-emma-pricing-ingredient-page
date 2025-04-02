
import { Session, User, AuthResponse, AuthTokenResponse, WeakPassword } from "@supabase/supabase-js";
import { UserType } from "@/utils/auth/validation";

export type Profile = {
  id: string;
  role: "admin" | "customer";
  userType?: UserType;
};

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  profileError: Error | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string, userType?: UserType) => Promise<any>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isAuthenticated: boolean;
};
