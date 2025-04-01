
import React from 'react';
import { BarChart, Users, ShoppingCart, Archive } from 'lucide-react';
import { usePerformanceData } from "@/hooks/usePerformanceData";
import { useCurrency } from "@/context/CurrencyContext";

export const DashboardStats = () => {
  const { data } = usePerformanceData();
  const { formatPrice } = useCurrency();
  
  const stats = [
    {
      title: 'Products',
      value: data?.totalProducts || 0,
      icon: <Archive className="h-5 w-5 text-blue-500" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Forecasts',
      value: data?.forecastsCreated || 0,
      icon: <BarChart className="h-5 w-5 text-green-500" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Revenue',
      value: formatPrice(data?.estimatedRevenue || 0),
      icon: <ShoppingCart className="h-5 w-5 text-purple-500" />,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Clients',
      value: data?.potentialClients || 0,
      icon: <Users className="h-5 w-5 text-orange-500" />,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.bgColor} ${stat.borderColor} border rounded-lg p-4 flex items-center justify-between shadow-sm`}
        >
          <div>
            <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
            <p className="text-2xl font-bold">{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</p>
          </div>
          <div className="p-3 rounded-full bg-white shadow-sm">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};
