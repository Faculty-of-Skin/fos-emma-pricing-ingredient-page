
import { useAuth } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Package, Calculator, Clock, Users, ArrowRight, TrendingUp, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  // Get the first name from the email or use "there" as fallback
  const firstName = user?.email ? user.email.split('@')[0] : 'there';
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        {/* Welcome Banner */}
        <Card className="brutal-card mb-8 bg-brutal-black text-brutal-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Hi {firstName}!</h1>
                <p className="text-brutal-gray-300 mb-4">
                  Welcome to your Emma dashboard. Here you can manage your products, create forecasts, and more.
                </p>
              </div>
              <Button 
                className="mt-4 md:mt-0 bg-brutal-white text-brutal-black hover:bg-brutal-gray flex items-center gap-2"
                onClick={() => navigate('/products')}
              >
                View Products <ArrowRight size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Access Tiles */}
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
        
        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="brutal-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" /> Performance Overview
                </CardTitle>
                <CardDescription>
                  Key metrics and performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <StatCard title="Total Products" value="24" trend="+3 this month" />
                  <StatCard title="Forecasts Created" value="7" trend="2 active" />
                  <StatCard title="Est. Revenue" value="€45,780" trend="+12% from last month" />
                  <StatCard title="Potential Clients" value="18" trend="5 new leads" />
                </div>
              </CardContent>
            </Card>
            
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
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <Card className="brutal-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" /> Your Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-brutal-gray">Email</p>
                    <p className="text-brutal-black">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brutal-gray">Account Type</p>
                    <p className="text-brutal-black capitalize">{profile?.role || "Loading..."}</p>
                  </div>
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-brutal-black" 
                      onClick={() => navigate('/account-settings')}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {profile?.role === "admin" && (
              <Card className="brutal-card bg-brutal-black text-brutal-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Admin Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-brutal-white text-brutal-black hover:bg-brutal-gray"
                      onClick={() => navigate('/admin')}
                    >
                      Admin Panel
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border border-brutal-white text-brutal-white hover:bg-brutal-black/60"
                      onClick={() => navigate('/admin/users')}
                    >
                      Manage Users
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card className="brutal-card border-2 border-dashed">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-brutal-gray mb-4">
                  Contact our support team for assistance with your Emma products or services.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = 'mailto:support@example.com'}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Helper Components
const QuickAccessCard = ({ 
  title, 
  description, 
  icon, 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  onClick: () => void 
}) => (
  <div 
    className="brutal-card border-2 p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center"
    onClick={onClick}
  >
    <div className="mb-3">{icon}</div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-brutal-gray">{description}</p>
  </div>
);

const StatCard = ({ 
  title, 
  value, 
  trend 
}: { 
  title: string; 
  value: string; 
  trend: string 
}) => (
  <div className="border-2 border-brutal-black/10 rounded-md p-4">
    <p className="text-sm text-brutal-gray mb-1">{title}</p>
    <p className="text-2xl font-bold mb-1">{value}</p>
    <p className="text-xs text-brutal-gray">{trend}</p>
  </div>
);

const ActivityItem = ({ 
  title, 
  description, 
  time, 
  icon 
}: { 
  title: string; 
  description: string; 
  time: string; 
  icon: React.ReactNode 
}) => (
  <div className="flex items-start">
    <div className="mt-0.5 mr-3 bg-brutal-black/5 p-2 rounded-full">
      {icon}
    </div>
    <div className="flex-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-brutal-gray">{description}</p>
      <p className="text-xs text-brutal-gray mt-1">{time}</p>
    </div>
  </div>
);

export default Dashboard;
