
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
        return <BarChart3 className="h-4 w-4 text-blue-500" />;
      case "product":
        return <Package className="h-4 w-4 text-green-500" />;
      default:
        return <History className="h-4 w-4 text-purple-500" />;
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
    <Card className="brutal-card shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" /> Recent Activity
        </CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
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
          <div className="text-center py-6 text-yellow-600 flex flex-col items-center">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p className="mb-2">Failed to load recent activity</p>
            <Button size="sm" variant="outline" onClick={() => refetch()}>
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
            <p>No recent activity</p>
            <p className="text-sm">Your recent actions will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
