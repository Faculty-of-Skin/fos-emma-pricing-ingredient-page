
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
}

export const StatCard = ({ 
  title, 
  value, 
  trend 
}: StatCardProps) => (
  <div className="border-2 border-brutal-black/10 rounded-md p-4 hover:shadow-md transition-all hover:border-brutal-black/20 bg-brutal-white">
    <p className="text-sm text-brutal-gray mb-1 uppercase tracking-wider font-mono">{title}</p>
    <p className="text-2xl font-bold mb-1">{value}</p>
    <p className="text-xs text-brutal-gray flex items-center">
      {trend}
    </p>
  </div>
);
