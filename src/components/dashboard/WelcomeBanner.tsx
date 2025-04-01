
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WelcomeBannerProps {
  firstName: string;
}

export const WelcomeBanner = ({ firstName }: WelcomeBannerProps) => {
  const navigate = useNavigate();
  const currentHour = new Date().getHours();
  
  // Determine greeting based on time of day
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }
  
  return (
    <Card className="brutal-card bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="h-6 w-6 text-white/80" />
              <p className="text-sm text-white/80 font-medium uppercase tracking-wider">Dashboard</p>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{greeting}, {firstName}!</h1>
            <p className="text-white/90 mb-4">
              Welcome to your Emma dashboard. Here you can manage your products, create forecasts, and more.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button 
              className="bg-white text-blue-600 hover:bg-blue-50 flex items-center gap-2"
              onClick={() => navigate('/products')}
            >
              View Products <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
