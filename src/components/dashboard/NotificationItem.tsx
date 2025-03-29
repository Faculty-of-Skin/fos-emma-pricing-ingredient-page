
import React from 'react';
import { cn } from "@/lib/utils";
import { Bell, Check } from "lucide-react";

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  time: string;
  type?: NotificationType;
  isRead?: boolean;
  onMarkAsRead?: (id: string) => void;
}

export const NotificationItem = ({ 
  id, 
  title, 
  message, 
  time, 
  type = 'info', 
  isRead = false,
  onMarkAsRead
}: NotificationItemProps) => {
  const typeClasses = {
    info: "bg-blue-50 border-blue-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200"
  };

  return (
    <div 
      className={cn(
        "p-3 border-l-4 mb-2 rounded-r transition-colors",
        typeClasses[type],
        !isRead && "animate-fade-down"
      )}
    >
      <div className="flex justify-between mb-1">
        <h4 className="font-medium text-sm">{title}</h4>
        {!isRead && onMarkAsRead && (
          <button 
            onClick={() => onMarkAsRead(id)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Mark as read"
          >
            <Check className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-1">{message}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  );
};
