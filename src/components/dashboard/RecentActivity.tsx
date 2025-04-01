
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ActivityItem } from './ActivityItem';
import { BarChart3, Package, Activity, History, Clock, AlertTriangle } from "lucide-react";
import { useRecentActivity } from "@/hooks/useRecentActivity";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';

export const RecentActivity = () => {
  const { activities, isLoading, error, refetch } = useRecentActivity();
  
  // Helper function to get the appropriate icon based on type
  const getIconForType = (type: string) => {
    switch (type) {
      case "chart":
        return <BarChart3 className="h-4 w-4 text-brutal-charcoal" />;
      case "product":
        return <Package className="h-4 w-4 text-brutal-charcoal" />;
      default:
        return <History className="h-4 w-4 text-brutal-charcoal" />;
    }
  };
  
  // Format the date to a readable format (e.g., "2 hours ago")
  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };
  
  return (
    <Card className="brutal-card shadow-md border-4 border-brutal-black bg-brutal-white transform transition-transform duration-100 hover:translate-x-1 hover:translate-y-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 font-mono uppercase">
          <Activity className="h-5 w-5 text-brutal-charcoal" /> Recent Activity
        </CardTitle>
        <CardDescription className="text-brutal-gray">Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // Loading state - show skeleton loaders
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start">
                <Skeleton className="h-8 w-8 rounded-full mr-3" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-2 w-16 mt-1" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error state
          <div className="text-center py-6 text-brutal-dark flex flex-col items-center">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p className="mb-2">Failed to load recent activity</p>
            <Button size="sm" className="brutal-button text-xs py-1 px-3" onClick={() => refetch()}>
              Try Again
            </Button>
          </div>
        ) : activities.length > 0 ? (
          // Activities found - display them
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityItem 
                key={activity.id}
                title={activity.title} 
                description={activity.description} 
                time={formatTimeAgo(activity.created_at)}
                icon={getIconForType(activity.icon_type)}
              />
            ))}
          </div>
        ) : (
          // No activities found
          <div className="text-center py-8 text-brutal-gray flex flex-col items-center gap-2">
            <Clock className="h-8 w-8 opacity-50" />
            <p className="font-mono uppercase">No recent activity</p>
            <p className="text-sm">Your recent actions will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
