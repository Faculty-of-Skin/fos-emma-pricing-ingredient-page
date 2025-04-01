
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type ActivityType = {
  id: string;
  title: string;
  description: string;
  icon_type: string;
  created_at: string;
};

export const useRecentActivity = () => {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecentActivity = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Get forecasts
        const { data: forecastsData, error: forecastsError } = await supabase
          .from("forecasts")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);
          
        if (forecastsError) throw forecastsError;
        
        // Get product interactions (for demo, we'll just use forecasts)
        // In a real app, you might have a dedicated activities table
        
        const activitiesData: ActivityType[] = forecastsData?.map(forecast => ({
          id: forecast.id,
          title: "Forecast Created",
          description: `You created forecast '${forecast.name}'`,
          icon_type: "chart", // This maps to a specific icon
          created_at: forecast.created_at
        })) || [];
        
        // Sort by date (newest first)
        activitiesData.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        setActivities(activitiesData);
      } catch (error: any) {
        console.error("Error fetching recent activity:", error.message);
        setError(error.message);
        toast({
          title: "Error loading recent activity",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecentActivity();
  }, [user, toast]);
  
  return { activities, isLoading, error };
};
