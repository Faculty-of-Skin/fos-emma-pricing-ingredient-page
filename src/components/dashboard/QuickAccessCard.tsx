
import React from 'react';

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const QuickAccessCard = ({ 
  title, 
  description, 
  icon, 
  onClick 
}: QuickAccessCardProps) => (
  <div 
    className="brutal-card border-2 p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center"
    onClick={onClick}
  >
    <div className="mb-3">{icon}</div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-brutal-gray">{description}</p>
  </div>
);
