
import React from 'react';
import { useAuth } from "@/context/auth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { QuickAccess } from "@/components/dashboard/QuickAccess";
import { PerformanceOverview } from "@/components/dashboard/PerformanceOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { AdminTools } from "@/components/dashboard/AdminTools";
import { SupportCard } from "@/components/dashboard/SupportCard";
import { Tutorial } from "@/components/dashboard/Tutorial";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Get the first name from the email or use "there" as fallback
  const firstName = user?.email ? user.email.split('@')[0] : 'there';
  
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Welcome Banner */}
        <div className="mb-6">
          <WelcomeBanner firstName={firstName} />
        </div>
        
        {/* Quick Access Tiles */}
        <QuickAccess />
        
        {/* Tabs for Dashboard Content */}
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="overview">Dashboard Overview</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
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
          </TabsContent>
          
          <TabsContent value="tutorials" className="mt-4">
            <Tutorial />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
