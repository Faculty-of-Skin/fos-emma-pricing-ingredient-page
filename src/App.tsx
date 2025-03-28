
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

// Pages
import EmmaPricing from './pages/EmmaPricing';
import JoinWaitlist from './pages/JoinWaitlist';
import WaitlistRedirect from './pages/WaitlistRedirect';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Forecasts from './pages/Forecasts';
import AdminPanel from './pages/AdminPanel';

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
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<EmmaPricing />} />
                <Route path="/join-waitlist" element={<JoinWaitlist />} />
                <Route path="/waitlist-redirect" element={<WaitlistRedirect />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Protected routes - require authentication */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/forecasts" element={<Forecasts />} />
                  
                  {/* Admin-only routes */}
                  <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminPanel />} />
                  </Route>
                </Route>
                
                {/* Fallback route */}
                <Route path="*" element={<EmmaPricing />} />
              </Routes>
            </BrowserRouter>
          </CurrencyProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
