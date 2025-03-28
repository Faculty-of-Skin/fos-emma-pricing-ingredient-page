
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmmaPricing from './pages/EmmaPricing';
import { CurrencyProvider } from "./context/CurrencyContext";

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
        <CurrencyProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<EmmaPricing />} />
              <Route path="*" element={<EmmaPricing />} />
            </Routes>
          </BrowserRouter>
        </CurrencyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
