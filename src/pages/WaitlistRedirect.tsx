
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const WaitlistRedirect = () => {
  useEffect(() => {
    const sendDiscordNotification = async () => {
      try {
        // Try to get the email from localStorage
        const email = localStorage.getItem("waitlistEmail");
        
        if (email) {
          // Send notification to Discord via our edge function
          await supabase.functions.invoke("discord-notification", {
            body: { email }
          });
          console.log("Discord notification sent");
        }
      } catch (error) {
        console.error("Error sending Discord notification:", error);
      }
    };

    // Track the conversion with Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
    
    // Send Discord notification
    sendDiscordNotification();
    
    // Redirect to Google Form after a short delay
    const timer = setTimeout(() => {
      window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform';
    }, 500); // Short delay to ensure tracking fires
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-brutal-white flex items-center justify-center">
      <div className="text-center brutal-card p-8 max-w-md">
        <h1 className="text-2xl font-mono uppercase mb-4">Redirecting...</h1>
        <p>Please wait while we redirect you to our registration form.</p>
      </div>
    </div>
  );
};

export default WaitlistRedirect;
