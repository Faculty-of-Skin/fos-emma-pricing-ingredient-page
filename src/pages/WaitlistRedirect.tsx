import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const WaitlistRedirect = () => {
  const [isNotifying, setIsNotifying] = useState(true);
  const [webhookStatus, setWebhookStatus] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [debugDetails, setDebugDetails] = useState<any>(null);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Add a delay before first attempt to ensure edge function is ready
    const initialDelay = setTimeout(() => {
      sendDiscordNotification();
    }, 3000); // Increased to 3 seconds for better edge function warmup
    
    return () => clearTimeout(initialDelay);
  }, []);
  
  const sendDiscordNotification = async () => {
    try {
      let email = localStorage.getItem("waitlistEmail");
      
      if (!email) {
        email = searchParams.get("email");
        
        if (email) {
          localStorage.setItem("waitlistEmail", email);
        }
      }
      
      console.log("Attempting to send Discord notification with email:", email);
      
      if (!email) {
        console.error("No email found in localStorage or URL parameters");
        setIsNotifying(false);
        return;
      }
      
      // Add unique timestamp to prevent caching
      const timestamp = Date.now();
      
      // First check the configuration
      const { data: configCheck, error: configError } = await supabase.functions.invoke("discord-notification", {
        body: { 
          action: "check-config", 
          timestamp
        }
      });
      
      console.log("Webhook config check response:", configCheck);
      setDebugDetails(configCheck);
      
      if (configError || !configCheck?.webhookConfigured || !configCheck?.webhookValid) {
        console.error("Issue with webhook configuration:", configError || configCheck);
        setWebhookStatus("Configuration issue");
        
        // Still try to send if possible
        if (retryCount < 2) {
          // Retry after a short delay
          setRetryCount(prev => prev + 1);
          setTimeout(() => sendDiscordNotification(), 3000);
          return;
        }
        
        // After retries, proceed anyway without showing error to user
        console.log("Proceeding to form despite webhook issues");
        setIsNotifying(false);
        return;
      }
      
      console.log("Discord webhook is configured, sending notification...");
      
      const { data, error } = await supabase.functions.invoke("discord-notification", {
        body: { 
          email, 
          action: "send-notification",
          timestamp
        }
      });
      
      if (error) {
        console.error("Error from edge function:", error);
        setWebhookStatus(`Error occurred`);
        
        // Try again once
        if (retryCount < 1) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => sendDiscordNotification(), 2000);
          return;
        }
        
        // After retry, just proceed without showing error to user
        console.log("Proceeding to form despite notification error");
        setIsNotifying(false);
      } else {
        console.log("Discord notification response:", data);
        setWebhookStatus("Notification sent successfully");
        toast({
          title: "Success",
          description: "Your registration is being processed",
        });
        setIsNotifying(false);
      }
    } catch (error: any) {
      console.error("Error sending Discord notification:", error);
      setWebhookStatus(`Error occurred`);
      
      // Just proceed without showing error to user
      setIsNotifying(false);
    }
  };

  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead');
  }
  
  useEffect(() => {
    let timer: number;
    if (!isNotifying) {
      timer = window.setTimeout(() => {
        window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform';
      }, 10000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isNotifying]);

  const continueToForm = () => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform';
  };

  const retryNotification = () => {
    setIsNotifying(true);
    setRetryCount(0); // Reset retry count for a fresh attempt
    sendDiscordNotification();
  };

  const toggleDebugInfo = () => {
    setShowDebugInfo(!showDebugInfo);
  };

  return (
    <div className="h-screen w-screen bg-brutal-white flex items-center justify-center p-4">
      <div className="text-center brutal-card p-8 max-w-md w-full">
        <h1 className="text-2xl font-mono uppercase mb-4">
          Redirecting...
        </h1>
        
        <p className="mb-4">Please wait while we redirect you to our registration form.</p>
        
        {isNotifying && (
          <div className="text-sm text-brutal-gray">
            Processing your registration...
          </div>
        )}
        
        {!isNotifying && webhookStatus === "Notification sent successfully" && (
          <div className="mt-4">
            <p className="text-green-600 mb-4">✓ Notification sent successfully!</p>
            <Button onClick={continueToForm} className="brutal-button">
              Continue to Registration Form
            </Button>
          </div>
        )}
        
        {!isNotifying && webhookStatus !== "Notification sent successfully" && (
          <div className="mt-4">
            <Button onClick={continueToForm} className="brutal-button">
              Continue to Registration Form
            </Button>
          </div>
        )}
        
        {/* Keep debug dialog but hide the button by default */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4">
            <Button onClick={toggleDebugInfo} variant="ghost" size="sm">
              {showDebugInfo ? "Hide Debug Info" : "Show Debug Info"}
            </Button>
          </div>
        )}
        
        <Dialog open={showDebugInfo} onOpenChange={setShowDebugInfo}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Debug Information</DialogTitle>
              <DialogDescription>
                Technical details for administrators.
              </DialogDescription>
            </DialogHeader>
            <div className="text-left mt-4 overflow-auto max-h-[400px]">
              <h3 className="font-semibold">Webhook Status:</h3>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                {webhookStatus || "No status available"}
              </pre>

              <h3 className="font-semibold mt-4">Configuration Check:</h3>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                {debugDetails ? JSON.stringify(debugDetails, null, 2) : "No configuration data available"}
              </pre>

              <h3 className="font-semibold mt-4">Email:</h3>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                {localStorage.getItem("waitlistEmail") || searchParams.get("email") || "No email found"}
              </pre>
              
              <div className="mt-4">
                <p className="text-sm text-brutal-gray">
                  This information may help administrators diagnose any issues with the Discord webhook integration.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default WaitlistRedirect;
