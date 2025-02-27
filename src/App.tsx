import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import React, { useEffect, useRef } from 'react';

const queryClient = new QueryClient();

const App = () => {
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize the widget after the script loads
    script.onload = () => {
      if (widgetRef.current) {
        // Create the widget in the ref container
        const widget = document.createElement('elevenlabs-convai');
        widget.setAttribute('agent-id', 'IDKXPTvUc2MkwLOMo00M');
        widgetRef.current.appendChild(widget);
      }
    };

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <div ref={widgetRef} className="h-96"></div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
