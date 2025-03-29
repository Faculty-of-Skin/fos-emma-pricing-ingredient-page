
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StatCard } from './StatCard';
import { TrendingUp } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

export const PerformanceOverview = () => {
  const { formatPrice } = useCurrency();
  
  return (
    <Card className="brutal-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" /> Performance Overview
        </CardTitle>
        <CardDescription>
          Key metrics and performance indicators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard title="Total Products" value="24" trend="+3 this month" />
          <StatCard title="Forecasts Created" value="7" trend="2 active" />
          <StatCard title="Est. Revenue" value="€45,780" trend="+12% from last month" />
          <StatCard title="Potential Clients" value="18" trend="5 new leads" />
        </div>
      </CardContent>
    </Card>
  );
};
