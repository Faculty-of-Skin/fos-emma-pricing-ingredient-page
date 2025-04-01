
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
  <div className="border-2 border-brutal-black/10 hover:border-brutal-black/20 transition-colors rounded-md p-4 bg-white shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <p className="text-sm text-brutal-gray font-medium">{title}</p>
      {icon && <div className="p-1 rounded-full bg-gray-50">{icon}</div>}
    </div>
    <p className="text-2xl font-bold mb-1">{value}</p>
    <p className="text-xs text-brutal-gray">{trend}</p>
  </div>
);
