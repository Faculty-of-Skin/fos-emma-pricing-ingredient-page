
import React, { useState } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { NotificationItem, NotificationItemProps } from './NotificationItem';
import { useToast } from '@/hooks/use-toast';

interface NotificationDropdownProps {
  notifications: NotificationItemProps[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  hasUnread: boolean;
}

export const NotificationDropdown = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  hasUnread
}: NotificationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead();
    setIsOpen(false);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read",
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className="w-80 p-4 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              disabled={!hasUnread}
            >
              Mark all as read
            </Button>
          ) : null}
        </div>
        
        <div className="space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem 
                key={notification.id} 
                {...notification} 
                onMarkAsRead={onMarkAsRead}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No notifications</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
