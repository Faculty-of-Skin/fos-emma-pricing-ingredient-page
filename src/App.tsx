
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { CurrencyProvider } from "./context/CurrencyContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ProtectedRoute, AdminRoute } from "./components/auth";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from './pages/Index';
import PricingPage from './pages/PricingPage';
import EmmaPricing from './pages/EmmaPricing';
import JoinWaitlist from './pages/JoinWaitlist';
import WaitlistRedirect from './pages/WaitlistRedirect';
import Auth from './pages/Auth';
import EmailConfirmation from './pages/EmailConfirmation';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Forecasts from './pages/Forecasts';
import AdminPanel from './pages/AdminPanel';
import AccountSettings from './pages/AccountSettings';
import EmmaIngredientsPage from './pages/EmmaIngredientsPage';
import NotFound from './pages/NotFound';

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
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/emma-pricing" element={<EmmaPricing />} />
                  <Route path="/join-waitlist" element={<JoinWaitlist />} />
                  <Route path="/waitlist-redirect" element={<WaitlistRedirect />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/email-confirmation" element={<EmailConfirmation />} />
                  
                  {/* Protected routes - require authentication */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/forecasts" element={<Forecasts />} />
                    <Route path="/account-settings" element={<AccountSettings />} />
                    <Route path="/emma-ingredients" element={<EmmaIngredientsPage />} />
                    
                    {/* Admin-only routes */}
                    <Route element={<AdminRoute />}>
                      <Route path="/admin" element={<AdminPanel />} />
                    </Route>
                  </Route>
                  
                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              <Toaster />
            </NotificationProvider>
          </CurrencyProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
