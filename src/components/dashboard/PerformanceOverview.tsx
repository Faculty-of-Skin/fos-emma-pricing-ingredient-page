
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
    <Card className="brutal-card shadow-md border-4 border-brutal-black">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 font-mono uppercase">
          <TrendingUp className="h-5 w-5 text-brutal-charcoal" /> Performance Overview
        </CardTitle>
        <CardDescription className="text-brutal-gray">
          Key metrics and performance indicators
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-brutal-charcoal" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-6 text-brutal-dark">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p className="text-sm">Error loading performance data</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard 
              title="Total Products" 
              value={data?.totalProducts?.toString() || "0"} 
              trend={`${data?.totalProducts ? '+' : ''}${Math.floor((data?.totalProducts || 0) / 8)} this month`} 
              icon={<TrendingUp className="h-4 w-4 text-brutal-charcoal" />}
            />
            <StatCard 
              title="Forecasts Created" 
              value={data?.forecastsCreated?.toString() || "0"} 
              trend={`${data?.activeForecasts || 0} active`} 
              icon={<TrendingUp className="h-4 w-4 text-brutal-charcoal" />}
            />
            <StatCard 
              title="Est. Revenue" 
              value={formatPrice(data?.estimatedRevenue || 0)} 
              trend={`+${data?.revenueGrowth || 0}% from last month`} 
              icon={<TrendingUp className="h-4 w-4 text-brutal-charcoal" />}
            />
            <StatCard 
              title="Potential Clients" 
              value={data?.potentialClients?.toString() || "0"} 
              trend={`${data?.newLeads || 0} new leads`} 
              icon={<TrendingUp className="h-4 w-4 text-brutal-charcoal" />}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
