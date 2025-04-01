
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getPublicApiKey } from "@/utils/supabase/constants";

// Get base URL and API key from constants
const supabaseUrl = getSupabaseUrl();
const supabaseKey = getPublicApiKey();

// Get the current origin
const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
// Check if we're in production (actual domain) vs development or preview
const isProduction = currentOrigin.includes('emma.facultyofskin.com');

// Define site URL - use production URL in production, current origin otherwise
const siteUrl = isProduction 
  ? 'https://emma.facultyofskin.com' 
  : currentOrigin;

// The redirect URL for authentication
const redirectUrl = `${siteUrl}/auth`;

console.log('Configuring Supabase with redirect URL:', redirectUrl);
console.log('Site URL:', siteUrl);
console.log('Current origin:', currentOrigin);
console.log('Is production:', isProduction);

// Create a custom Supabase client with appropriate configuration
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    flowType: 'pkce', // Using PKCE flow instead of implicit for better security
    redirectTo: redirectUrl,
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
      if (currentPath === '/auth') {
        setTimeout(() => {
          window.location.href = `${siteUrl}/dashboard`;
        }, 1000); // Short delay to allow the auth page to handle the session first
      }
    }
  });
};

// Initialize redirects
setupRedirects();

// Log the configuration for debugging purposes
console.log('Supabase client initialized with site URL:', siteUrl);
console.log('Supabase client initialized with redirect URL:', redirectUrl);
