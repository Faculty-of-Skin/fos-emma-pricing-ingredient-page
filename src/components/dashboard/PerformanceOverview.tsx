
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StatCard } from './StatCard';
import { TrendingUp, Loader2 } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { usePerformanceData } from "@/hooks/usePerformanceData";

export const PerformanceOverview = () => {
  const { formatPrice } = useCurrency();
  const { data, isLoading } = usePerformanceData();
  
  return (
    <Card className="brutal-card border-2 border-brutal-black/20">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2 uppercase font-mono tracking-wide">
          <TrendingUp className="h-5 w-5" /> Performance Overview
        </CardTitle>
        <CardDescription>
          Key metrics and performance indicators
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-brutal-gray" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard 
              title="Total Products" 
              value={data?.totalProducts.toString() || "0"} 
              trend={`${data?.totalProducts ? '+' : ''}${Math.floor(data?.totalProducts / 8)} this month`} 
            />
            <StatCard 
              title="Forecasts Created" 
              value={data?.forecastsCreated.toString() || "0"} 
              trend={`${data?.activeForecasts || 0} active`} 
            />
            <StatCard 
              title="Est. Revenue" 
              value="Coming Soon" 
              trend="Feature in development" 
            />
            <StatCard 
              title="Potential Clients" 
              value="Coming Soon" 
              trend="Feature in development" 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
