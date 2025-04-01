
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "./types";

// Try to create a profile if it doesn't exist
export const createProfileIfNotExists = async (userId: string): Promise<Profile | null> => {
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

export const fetchUserProfile = async (userId: string): Promise<{ profile: Profile | null, error: Error | null }> => {
  try {
    console.log("Fetching profile for user:", userId);
    
    // First try to get the profile
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      
      // If profile doesn't exist, try to create one
      if (error.code === 'PGRST116') {
        console.log("Profile not found, attempting to create one");
        const newProfile = await createProfileIfNotExists(userId);
        if (newProfile) {
          return { profile: newProfile, error: null };
        }
      }
      
      // Set default profile with customer role if can't fetch or create
      console.log("Setting default customer profile");
      return { 
        profile: { id: userId, role: 'customer' },
        error: error 
      };
    } else {
      console.log("Profile fetched successfully:", data);
      return { profile: data as Profile, error: null };
    }
  } catch (error: any) {
    console.error('Error in profile fetch process:', error);
    // Fallback to default profile with customer role
    return { 
      profile: { id: userId, role: 'customer' },
      error: error
    };
  }
};
