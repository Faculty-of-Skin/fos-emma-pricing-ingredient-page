
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const Dashboard = () => {
  const { user, profile } = useAuth();

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="brutal-card p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="mb-4">Welcome, {user?.email}</p>
          <p className="text-sm text-brutal-gray">
            Account Type: <span className="font-medium">{profile?.role || "Loading..."}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="brutal-card p-6">
            <h2 className="text-xl font-semibold mb-3">Products</h2>
            <p className="mb-4">View and manage product inventory</p>
            <Button className="brutal-button" asChild>
              <a href="/products">View Products</a>
            </Button>
          </div>

          <div className="brutal-card p-6">
            <h2 className="text-xl font-semibold mb-3">Forecasts</h2>
            <p className="mb-4">Calculate costs, revenue, and profit projections</p>
            <Button className="brutal-button" asChild>
              <a href="/forecasts">Create Forecast</a>
            </Button>
          </div>

          {profile?.role === "admin" && (
            <div className="brutal-card p-6">
              <h2 className="text-xl font-semibold mb-3">Admin Controls</h2>
              <p className="mb-4">Manage products and view waitlist entries</p>
              <Button className="brutal-button" asChild>
                <a href="/admin">Admin Panel</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
