
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getPublicApiKey } from "@/utils/supabase/constants";

// Get base URL and API key from constants
const supabaseUrl = getSupabaseUrl();
const supabaseKey = getPublicApiKey();

// Get the current origin
const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';

// Check if we're in production (actual domain) vs development or preview
const isProduction = 
  currentOrigin.includes('emma.facultyofskin.com') || 
  currentOrigin.includes('faculty') || 
  process.env.NODE_ENV === 'production';

// Define site URL - use production URL in production, current origin otherwise
const siteUrl = isProduction 
  ? 'https://emma.facultyofskin.com' 
  : currentOrigin || 'http://localhost:3000';

// The redirect URL for authentication - ensure it matches path in App.tsx
const redirectUrl = `${siteUrl}/auth`;

console.log('Configuring Supabase with redirect URL:', redirectUrl);
console.log('Site URL:', siteUrl);
console.log('Current origin:', currentOrigin);
console.log('Is production:', isProduction);
console.log('Environment:', process.env.NODE_ENV);

// Create a custom Supabase client with appropriate configuration
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    flowType: 'pkce', // Using PKCE flow for better security
  }
});

// Export the site URL and redirect URL for use in other parts of the app
export const getSiteUrl = () => siteUrl;
export const getRedirectUrl = () => redirectUrl;

// Initialize the auth configuration
export const initializeAuth = () => {
  console.log("Initializing auth configuration");
  
  // Set up auth state listener for logging and debugging
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state change:', event, session?.user?.email);
  });
  
  console.log('Auth configuration initialized');
};

// Initialize auth configuration
initializeAuth();

// Log the configuration for debugging purposes
console.log('Supabase client initialized with site URL:', siteUrl);
console.log('Supabase client initialized with redirect URL:', redirectUrl);
