
import React from 'react';
import { BarChart, Users, ShoppingCart, Archive } from 'lucide-react';
import { usePerformanceData } from "@/hooks/usePerformanceData";
import { useCurrency } from "@/context/CurrencyContext";
import { StatCard } from './StatCard';

export const DashboardStats = () => {
  const { data } = usePerformanceData();
  const { formatPrice } = useCurrency();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard 
        title="Products" 
        value={data?.totalProducts?.toString() || "0"} 
        trend={`${data?.totalProducts ? '+' : ''}${Math.floor((data?.totalProducts || 0) / 8)} this month`} 
        icon={<Archive className="h-5 w-5 text-brutal-charcoal" />}
      />
      <StatCard 
        title="Forecasts" 
        value={data?.forecastsCreated?.toString() || "0"} 
        trend={`${data?.activeForecasts || 0} active`} 
        icon={<BarChart className="h-5 w-5 text-brutal-charcoal" />}
      />
      <StatCard 
        title="Revenue" 
        value={formatPrice(data?.estimatedRevenue || 0)} 
        trend={`+${data?.revenueGrowth || 0}% from last month`} 
        icon={<ShoppingCart className="h-5 w-5 text-brutal-charcoal" />}
      />
      <StatCard 
        title="Clients" 
        value={data?.potentialClients?.toString() || "0"} 
        trend={`${data?.newLeads || 0} new leads`} 
        icon={<Users className="h-5 w-5 text-brutal-charcoal" />}
      />
    </div>
  );
};
