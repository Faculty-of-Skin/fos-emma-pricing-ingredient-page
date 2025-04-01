
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WelcomeBannerProps {
  firstName: string;
}

export const WelcomeBanner = ({ firstName }: WelcomeBannerProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="brutal-card mb-8 bg-brutal-black text-brutal-white border-4 border-brutal-black">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 uppercase font-mono tracking-wide">Hi {firstName}!</h1>
            <p className="text-brutal-white/80 mb-4">
              Welcome to your Emma dashboard. Here you can manage your products, create forecasts, and more.
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-brutal-white text-brutal-black hover:bg-brutal-gray flex items-center gap-2 
            border-2 border-brutal-white uppercase font-mono tracking-wide transform hover:translate-x-1 transition-transform"
            onClick={() => navigate('/products')}
          >
            View Products <ArrowRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
