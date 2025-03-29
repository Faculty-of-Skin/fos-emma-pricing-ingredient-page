
import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationItemProps } from '@/components/dashboard/NotificationItem';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

interface NotificationContextType {
  notifications: NotificationItemProps[];
  addNotification: (notification: Omit<NotificationItemProps, 'id' | 'time'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  hasUnread: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Sample initial notifications
const initialNotifications: NotificationItemProps[] = [
  {
    id: '1',
    title: 'Welcome!',
    message: 'Welcome to your dashboard. Here you can manage all your products and forecasts.',
    time: '1 min ago',
    type: 'info',
    isRead: false,
  },
  {
    id: '2',
    title: 'New Feature',
    message: 'We\'ve added a new currency toggle feature to help you switch between currencies.',
    time: '2 hours ago',
    type: 'success',
    isRead: false,
  },
  {
    id: '3',
    title: 'Reminder',
    message: 'Don\'t forget to complete your profile setup for better personalization.',
    time: '1 day ago',
    type: 'warning',
    isRead: true,
  },
];

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItemProps[]>(initialNotifications);
  const { toast } = useToast();
  
  const hasUnread = notifications.some(notification => !notification.isRead);

  const addNotification = (notification: Omit<NotificationItemProps, 'id' | 'time'>) => {
    const newNotification: NotificationItemProps = {
      ...notification,
      id: uuidv4(),
      time: 'Just now',
      isRead: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show a toast when new notification arrives
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        addNotification, 
        markAsRead, 
        markAllAsRead,
        hasUnread
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
