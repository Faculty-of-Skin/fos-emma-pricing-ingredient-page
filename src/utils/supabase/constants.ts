
// Constants related to Supabase configuration
import { supabase } from "@/integrations/supabase/client";

// Use hardcoded values from the client since the methods don't exist
export const SUPABASE_URL = "https://igftaultyeudvtytgyrg.supabase.co";
export const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZnRhdWx0eWV1ZHZ0eXRneXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNDA5NDcsImV4cCI6MjA1ODcxNjk0N30.LEwv_bkuEkt4tWzL7eaCm9JXu4qM_ByH95QKBJ5udFo";

// Get the base URL and API key
export const getSupabaseUrl = () => {
  return SUPABASE_URL;
};

export const getPublicApiKey = () => {
  return SUPABASE_KEY;
};
