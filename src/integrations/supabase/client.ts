
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getPublicApiKey } from "@/utils/supabase/constants";

// Get base URL and API key from constants
const supabaseUrl = getSupabaseUrl();
const supabaseKey = getPublicApiKey();

// Detect if we're in production or development
const isProduction = window.location.hostname !== 'localhost';

// Create a custom Supabase client with appropriate configuration
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    flowType: 'implicit',
  },
  global: {
    // Put redirectTo URL here instead of in auth object
    // This is the correct location according to Supabase types
    headers: {
      'X-Supabase-Auth-Redirect-To': isProduction 
        ? `${window.location.origin}/auth` 
        : 'http://localhost:8080/auth',
    },
  }
});
