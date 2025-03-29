
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ActivityItem } from './ActivityItem';
import { BarChart3, Package } from "lucide-react";

export const RecentActivity = () => {
  return (
    <Card className="brutal-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ActivityItem 
            title="Forecast Created" 
            description="You created a new forecast 'Q2 Revenue Projection'" 
            time="2 hours ago"
            icon={<BarChart3 className="h-4 w-4" />}
          />
          <ActivityItem 
            title="Product Updated" 
            description="You updated the price for 'Emma Treatment Set'" 
            time="Yesterday"
            icon={<Package className="h-4 w-4" />}
          />
          <ActivityItem 
            title="New Product Added" 
            description="You added 'Premium Capsules Set' to your inventory" 
            time="3 days ago"
            icon={<Package className="h-4 w-4" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};
