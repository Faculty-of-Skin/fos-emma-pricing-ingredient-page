
import React from 'react';
import { QuickAccessCard } from './QuickAccessCard';
import { useNavigate } from "react-router-dom";
import { Package, BarChart3, Calculator, Clock } from "lucide-react";

export const QuickAccess = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <QuickAccessCard 
        title="Products" 
        description="Manage your product inventory"
        icon={<Package className="h-8 w-8 text-brutal-black" />}
        onClick={() => navigate('/products')}
      />
      
      <QuickAccessCard 
        title="Forecasts" 
        description="Calculate revenue projections"
        icon={<BarChart3 className="h-8 w-8 text-brutal-black" />}
        onClick={() => navigate('/forecasts')}
      />
      
      <QuickAccessCard 
        title="ROI Calculator" 
        description="Evaluate investment returns"
        icon={<Calculator className="h-8 w-8 text-brutal-black" />}
        onClick={() => navigate('/emma-pricing#roi-calculator')}
      />
      
      <QuickAccessCard 
        title="Latest Updates" 
        description="See what's new with Emma"
        icon={<Clock className="h-8 w-8 text-brutal-black" />}
        onClick={() => navigate('/')}
      />
    </div>
  );
};
