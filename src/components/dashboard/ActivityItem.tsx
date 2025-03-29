
import React from 'react';

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}

export const ActivityItem = ({ 
  title, 
  description, 
  time, 
  icon 
}: ActivityItemProps) => (
  <div className="flex items-start">
    <div className="mt-0.5 mr-3 bg-brutal-black/5 p-2 rounded-full">
      {icon}
    </div>
    <div className="flex-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-brutal-gray">{description}</p>
      <p className="text-xs text-brutal-gray mt-1">{time}</p>
    </div>
  </div>
);
