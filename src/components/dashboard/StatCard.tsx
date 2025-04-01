
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon?: React.ReactNode;
}

export const StatCard = ({ 
  title, 
  value, 
  trend,
  icon
}: StatCardProps) => (
  <div className="border-4 border-brutal-black bg-brutal-white p-4 shadow-sm hover:translate-x-1 hover:translate-y-1 transition-transform">
    <div className="flex justify-between items-start mb-2">
      <p className="text-sm text-brutal-gray font-medium font-mono uppercase">{title}</p>
      {icon && <div className="p-1 rounded-full bg-brutal-white border-2 border-brutal-black">{icon}</div>}
    </div>
    <p className="text-2xl font-bold mb-1 font-mono">{value}</p>
    <p className="text-xs text-brutal-charcoal">{trend}</p>
  </div>
);
