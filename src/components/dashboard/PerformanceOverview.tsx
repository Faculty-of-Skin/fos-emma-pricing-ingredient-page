
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StatCard } from './StatCard';
import { TrendingUp, Loader2, AlertTriangle } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { usePerformanceData } from "@/hooks/usePerformanceData";

export const PerformanceOverview = () => {
  const { formatPrice } = useCurrency();
  const { data, isLoading, error } = usePerformanceData();
  
  return (
    <Card className="brutal-card shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" /> Performance Overview
        </CardTitle>
        <CardDescription>
          Key metrics and performance indicators
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-6 text-yellow-600">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p className="text-sm">Error loading performance data</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard 
              title="Total Products" 
              value={data?.totalProducts.toString() || "0"} 
              trend={`${data?.totalProducts ? '+' : ''}${Math.floor(data?.totalProducts / 8)} this month`} 
              icon={<TrendingUp className="h-4 w-4 text-green-500" />}
            />
            <StatCard 
              title="Forecasts Created" 
              value={data?.forecastsCreated.toString() || "0"} 
              trend={`${data?.activeForecasts || 0} active`} 
              icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
            />
            <StatCard 
              title="Est. Revenue" 
              value={formatPrice(data?.estimatedRevenue || 0)} 
              trend={`+${data?.revenueGrowth || 0}% from last month`} 
              icon={<TrendingUp className="h-4 w-4 text-purple-500" />}
            />
            <StatCard 
              title="Potential Clients" 
              value={data?.potentialClients.toString() || "0"} 
              trend={`${data?.newLeads || 0} new leads`} 
              icon={<TrendingUp className="h-4 w-4 text-orange-500" />}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
