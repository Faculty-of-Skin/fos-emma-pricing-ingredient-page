
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const WaitlistRedirect = () => {
  const [isNotifying, setIsNotifying] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const sendDiscordNotification = async () => {
      try {
        // Try to get the email from localStorage
        const email = localStorage.getItem("waitlistEmail");
        
        console.log("Attempting to send Discord notification with email:", email);
        
        if (!email) {
          console.error("No email found in localStorage");
          toast({
            title: "Notification error",
            description: "Could not find your email to send notification",
            variant: "destructive",
          });
          return;
        }
        
        // Send notification to Discord via our edge function
        const { data, error } = await supabase.functions.invoke("discord-notification", {
          body: { email }
        });
        
        if (error) {
          console.error("Error from edge function:", error);
          toast({
            title: "Notification failed",
            description: "Could not send Discord notification",
            variant: "destructive",
          });
        } else {
          console.log("Discord notification response:", data);
          toast({
            title: "Notification sent",
            description: "Discord notification was sent successfully",
          });
        }
      } catch (error) {
        console.error("Error sending Discord notification:", error);
        toast({
          title: "Notification error",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        setIsNotifying(false);
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
    }, 3000); // Increased delay to ensure notification is sent
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-brutal-white flex items-center justify-center">
      <div className="text-center brutal-card p-8 max-w-md">
        <h1 className="text-2xl font-mono uppercase mb-4">Redirecting...</h1>
        <p className="mb-4">Please wait while we redirect you to our registration form.</p>
        {isNotifying && (
          <div className="text-sm text-brutal-gray">
            Sending notification...
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistRedirect;
