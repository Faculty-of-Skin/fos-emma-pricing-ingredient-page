
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
  <div className="border-2 border-brutal-black/10 rounded-md p-4">
    <p className="text-sm text-brutal-gray mb-1">{title}</p>
    <p className="text-2xl font-bold mb-1">{value}</p>
    <p className="text-xs text-brutal-gray">{trend}</p>
  </div>
);
