
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
  Beaker,
  BookOpen,
} from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import { useNotifications } from "@/context/NotificationContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tutorial } from "./Tutorial";
import { useTutorial } from "@/hooks/useTutorial";
import { NavItem } from "./NavItem";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, hasUnread } = useNotifications();
  const { completedTutorials } = useTutorial();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const totalTutorials = 3; // Update this number if you add more tutorials
  const completedTutorialsCount = completedTutorials.length;
  const hasUncompletedTutorials = completedTutorialsCount < totalTutorials;

  return (
    <div className="min-h-screen bg-brutal-white flex">
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-brutal-black text-brutal-white border-2 border-brutal-black hover:bg-brutal-black/90 transition-colors"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar - fixed position */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40 w-64 transition duration-200 ease-in-out md:sticky md:top-0 md:h-screen
        border-r-4 border-brutal-black bg-brutal-white`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b-4 border-brutal-black">
            <h1 
              className="text-xl font-bold cursor-pointer hover:text-brutal-charcoal transition-colors uppercase font-mono tracking-wider" 
              onClick={() => navigate("/dashboard")}
            >
              Emma Dashboard
            </h1>
          </div>

          <nav className="flex-1 py-4 px-2 space-y-3 overflow-y-auto">
            <NavItem icon={<LayoutDashboard size={18} />} href="/dashboard" label="Dashboard" />
            <NavItem icon={<Package size={18} />} href="/products" label="Products" />
            <NavItem icon={<Beaker size={18} />} href="/emma-ingredients" label="Ingredients" />
            <NavItem icon={<BarChart3 size={18} />} href="/forecasts" label="Forecasts" />
            
            {/* Tutorial Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 font-mono text-sm transition-transform uppercase
                    text-brutal-black hover:bg-brutal-black/10
                    border-2 border-transparent hover:border-brutal-black/50 relative"
                >
                  <BookOpen size={18} />
                  Tutorials
                  {hasUncompletedTutorials && (
                    <span className="absolute right-2 top-2.5 h-2 w-2 rounded-full bg-brutal-red"></span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
                <div className="p-6">
                  <Tutorial />
                </div>
              </DialogContent>
            </Dialog>
            
            {isAdmin && (
              <NavItem icon={<UserCog size={18} />} href="/admin" label="Admin" />
            )}
            
            <div className="py-2">
              <div className="border-t-2 border-brutal-gray/20 my-2"></div>
            </div>
            
            <NavItem icon={<Settings size={18} />} href="/account-settings" label="Settings" />
          </nav>

          <div className="p-4 border-t-4 border-brutal-black">
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              className="w-full flex items-center gap-2 bg-brutal-white border-2 border-brutal-black text-brutal-black 
                hover:bg-brutal-black hover:text-brutal-white transition-colors font-mono uppercase tracking-wider"
            >
              <LogOut size={18} /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content with header */}
      <div className="flex-1 flex flex-col">
        {/* Fixed header with notifications */}
        <header className="bg-brutal-white border-b-4 border-brutal-black sticky top-0 z-30 p-4 flex justify-end items-center">
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
