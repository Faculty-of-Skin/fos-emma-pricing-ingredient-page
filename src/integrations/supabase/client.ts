
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getPublicApiKey } from "@/utils/supabase/constants";

// Get base URL and API key from constants
const supabaseUrl = getSupabaseUrl();
const supabaseKey = getPublicApiKey();

// Detect if we're in production or development
const isProduction = window.location.hostname !== 'localhost';

// The redirect URL for authentication - using correct port for local development
const redirectUrl = isProduction 
  ? `${window.location.origin}/auth` 
  : 'http://localhost:8080/auth';

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
    headers: {
      'X-Supabase-Auth-Redirect': redirectUrl
    }
  }
});

// Log the configuration for debugging purposes
console.log('Supabase client initialized with redirect URL:', redirectUrl);
