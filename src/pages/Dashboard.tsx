
import React from 'react';
import { useAuth } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { QuickAccess } from "@/components/dashboard/QuickAccess";
import { PerformanceOverview } from "@/components/dashboard/PerformanceOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { AdminTools } from "@/components/dashboard/AdminTools";
import { SupportCard } from "@/components/dashboard/SupportCard";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Get the first name from the email or use "there" as fallback
  const firstName = user?.email ? user.email.split('@')[0] : 'there';
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        {/* Welcome Banner */}
        <div className="mb-6">
          <WelcomeBanner firstName={firstName} />
        </div>
        
        {/* Quick Access Tiles */}
        <QuickAccess />
        
        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <PerformanceOverview />
            <RecentActivity />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <AccountCard />
            <AdminTools />
            <SupportCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
