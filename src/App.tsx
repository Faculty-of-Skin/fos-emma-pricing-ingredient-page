
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

// Pages
import Index from './pages/Index';
import PricingPage from './pages/PricingPage';
import EmmaPricing from './pages/EmmaPricing';
import JoinWaitlist from './pages/JoinWaitlist';
import WaitlistRedirect from './pages/WaitlistRedirect';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Forecasts from './pages/Forecasts';
import AdminPanel from './pages/AdminPanel';
import AccountSettings from './pages/AccountSettings';

const App = () => {
  // Create a client inside the component to ensure proper React context
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CurrencyProvider>
            <NotificationProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/emma-pricing" element={<EmmaPricing />} />
                  <Route path="/join-waitlist" element={<JoinWaitlist />} />
                  <Route path="/waitlist-redirect" element={<WaitlistRedirect />} />
                  <Route path="/auth" element={<Auth />} />
                  
                  {/* Protected routes - require authentication */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/forecasts" element={<Forecasts />} />
                    <Route path="/account-settings" element={<AccountSettings />} />
                    
                    {/* Admin-only routes */}
                    <Route element={<AdminRoute />}>
                      <Route path="/admin" element={<AdminPanel />} />
                    </Route>
                  </Route>
                  
                  {/* Fallback route - redirect to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </NotificationProvider>
          </CurrencyProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
