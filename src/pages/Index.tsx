import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { TargetAudience } from "@/components/TargetAudience";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { JoinWaitlist } from "@/components/JoinWaitlist";
import { useRef, useEffect, useState } from "react";

const Index = () => {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if the script is already loaded
    const scriptExists = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    
    if (!scriptExists) {
      const script = document.createElement('script');
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        initializeWidget();
      };
    } else {
      // If script already exists, just initialize the widget
      initializeWidget();
    }
    
    function initializeWidget() {
      if (widgetRef.current) {
        // Remove any existing widget instances
        const existingWidget = widgetRef.current.querySelector('elevenlabs-convai');
        if (existingWidget) {
          existingWidget.remove();
        }
        
        // Create the widget instance
        const widget = document.createElement('elevenlabs-convai');
        widget.setAttribute('agent-id', 'TF7GzxMCWFgRDzORCsZ1');
        widgetRef.current.appendChild(widget);
        setIsWidgetLoaded(true);
      }
    }

    return () => {
      // We don't remove the script on unmount anymore
      // This prevents the re-registration issue
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-spa-beige">
        <Navigation />
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Benefits />
        <TargetAudience />
        <Pricing />
        <FAQ />
        <JoinWaitlist />
      </div>
      <div ref={widgetRef} className="h-96"></div>
    </>
  );
};

export default Index;
