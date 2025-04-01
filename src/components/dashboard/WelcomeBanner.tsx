
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
    <Card className="brutal-card bg-brutal-charcoal text-brutal-white shadow-lg border-4 border-brutal-black transform transition-transform duration-100 hover:translate-x-1 hover:translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="h-6 w-6 text-brutal-white/80" />
              <p className="text-sm text-brutal-white/80 font-mono uppercase tracking-wider">Dashboard</p>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 font-mono uppercase">{greeting}, {firstName}!</h1>
            <p className="text-brutal-white/90 mb-4">
              Welcome to your Emma dashboard. Here you can manage your products, create forecasts, and more.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button 
              className="brutal-button bg-brutal-white text-brutal-black hover:bg-brutal-gray flex items-center gap-2 font-mono uppercase"
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
