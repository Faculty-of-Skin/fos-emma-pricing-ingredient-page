
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type PerformanceData = {
  totalProducts: number;
  forecastsCreated: number;
  activeForecasts: number;
  estimatedRevenue: number;
  revenueGrowth: number;
  potentialClients: number;
  newLeads: number;
};

export const usePerformanceData = () => {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch total products count
        const { count: productsCount, error: productsError } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });
          
        if (productsError) throw productsError;
        
        // Fetch forecasts data
        const { data: forecastsData, error: forecastsError } = await supabase
          .from("forecasts")
          .select("*");
          
        if (forecastsError) throw forecastsError;
        
        // Calculate forecasts metrics
        const totalForecasts = forecastsData?.length || 0;
        const activeForecasts = forecastsData?.filter(f => 
          new Date(f.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        ).length || 0;
        
        // Calculate estimated revenue (sum of total_revenue from all forecasts)
        const totalRevenue = forecastsData?.reduce((sum, forecast) => 
          sum + (forecast.total_revenue || 0), 0) || 0;
          
        // For demo purposes, generate some random growth percentage
        const revenueGrowth = Math.floor(Math.random() * 20) + 5; // 5-25% growth
        
        // For demo purposes, generate random potential clients and new leads
        const potentialClients = Math.floor(Math.random() * 15) + 10; // 10-25 clients
        const newLeads = Math.floor(Math.random() * 8) + 3; // 3-10 new leads
        
        setData({
          totalProducts: productsCount || 0,
          forecastsCreated: totalForecasts,
          activeForecasts,
          estimatedRevenue: totalRevenue,
          revenueGrowth,
          potentialClients,
          newLeads
        });
      } catch (error: any) {
        console.error("Error fetching performance data:", error.message);
        setError(error.message);
        toast({
          title: "Error loading performance data",
          description: error.message,
          variant: "destructive",
        });
        
        // Set fallback data for demo purposes
        setData({
          totalProducts: 24,
          forecastsCreated: 7,
          activeForecasts: 2,
          estimatedRevenue: 45780,
          revenueGrowth: 12,
          potentialClients: 18,
          newLeads: 5
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPerformanceData();
  }, [toast]);
  
  return { data, isLoading, error };
};
