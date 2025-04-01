
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getPublicApiKey } from "@/utils/supabase/constants";

// Get base URL and API key from constants
const supabaseUrl = getSupabaseUrl();
const supabaseKey = getPublicApiKey();

// Detect if we're in production or development
const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('lovableproject.com');

// The redirect URL for authentication - using correct port for local development
const currentUrl = window.location.origin;
const redirectUrl = `${currentUrl}/auth`;

console.log('Configuring Supabase with redirect URL:', redirectUrl);

// Create a custom Supabase client with appropriate configuration
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    flowType: 'pkce', // Using PKCE flow instead of implicit for better security
  },
  global: {
    headers: {
      'X-Supabase-Auth-Redirect': redirectUrl
    }
  }
});

// Function to set up redirects
export const setupRedirects = () => {
  // Explicitly set the URL to redirect to after email verification
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state change:', event, session?.user?.email);
    
    // If we have a session after signup/login/email verification
    if (session) {
      // Make sure we're on the right page after authentication
      const currentPath = window.location.pathname;
      if (currentPath !== '/auth' && currentPath !== '/dashboard') {
        window.location.href = `${window.location.origin}/dashboard`;
      }
    }
  });
};

// Initialize redirects
setupRedirects();

// Log the configuration for debugging purposes
console.log('Supabase client initialized with redirect URL:', redirectUrl);
