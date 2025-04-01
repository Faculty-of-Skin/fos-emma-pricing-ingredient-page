
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  UserCog, 
  LogOut,
  Menu,
  X,
  Settings,
  Flask,
} from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import { useNotifications } from "@/context/NotificationContext";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, hasUnread } = useNotifications();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-brutal-white flex">
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-brutal-black text-white"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar - fixed position */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40 w-64 transition duration-200 ease-in-out brutal-nav md:sticky md:top-0 md:h-screen`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-brutal-gray/20">
            <h1 className="text-xl font-bold">Emma Dashboard</h1>
          </div>

          <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
            <NavItem icon={<LayoutDashboard size={18} />} href="/dashboard" label="Dashboard" />
            <NavItem icon={<Package size={18} />} href="/products" label="Products" />
            <NavItem icon={<BarChart3 size={18} />} href="/forecasts" label="Forecasts" />
            <NavItem icon={<Flask size={18} />} href="/emma-ingredients" label="Ingredients" />
            
            {isAdmin && (
              <NavItem icon={<UserCog size={18} />} href="/admin" label="Admin" />
            )}
            
            <div className="py-2">
              <div className="border-t border-brutal-gray/20 my-2"></div>
            </div>
            
            <NavItem icon={<Settings size={18} />} href="/account-settings" label="Settings" />
          </nav>

          <div className="p-4 border-t border-brutal-gray/20">
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              className="w-full flex items-center gap-2 text-brutal-black"
            >
              <LogOut size={18} /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content with header */}
      <div className="flex-1 flex flex-col">
        {/* Fixed header with notifications */}
        <header className="bg-brutal-white border-b border-brutal-gray/10 sticky top-0 z-30 p-4 flex justify-end items-center">
          <NotificationDropdown 
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            hasUnread={hasUnread}
          />
        </header>
        
        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) => {
  const navigate = useNavigate();
  const isActive = window.location.pathname === href;

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-2 ${
        isActive ? "bg-accent font-medium" : ""
      }`}
      onClick={() => navigate(href)}
    >
      {icon}
      {label}
    </Button>
  );
};
