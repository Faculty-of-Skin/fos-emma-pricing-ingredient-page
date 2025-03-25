
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const WaitlistRedirect = () => {
  const [isNotifying, setIsNotifying] = useState(true);
  const [webhookStatus, setWebhookStatus] = useState("");
  const [isWebhookConfigured, setIsWebhookConfigured] = useState(true);
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
        toast({
          title: "Notification error",
          description: "Could not find your email to send notification",
          variant: "destructive",
        });
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
      
      if (configError) {
        console.error("Error checking webhook configuration:", configError);
        setWebhookStatus(`Error checking webhook: ${configError.message}`);
        toast({
          title: "Webhook configuration error",
          description: `Error checking webhook configuration: ${configError.message}`,
          variant: "destructive",
        });
        
        if (retryCount < 3) {
          // Retry after a short delay
          setRetryCount(prev => prev + 1);
          setTimeout(() => sendDiscordNotification(), 3000);
          return;
        }
        
        setIsNotifying(false);
        return;
      }
      
      if (!configCheck?.webhookConfigured) {
        console.error("Discord webhook not properly configured:", configCheck);
        setWebhookStatus(`Webhook not configured: ${JSON.stringify(configCheck)}`);
        setIsWebhookConfigured(false);
        toast({
          title: "Webhook configuration error",
          description: "Discord webhook is not properly configured",
          variant: "destructive",
        });
        setIsNotifying(false);
        return;
      }
      
      if (!configCheck?.webhookValid) {
        console.error("Discord webhook URL is invalid:", configCheck);
        setWebhookStatus(`Webhook not valid: ${JSON.stringify(configCheck)}`);
        toast({
          title: "Webhook configuration error",
          description: `Discord webhook URL is invalid: ${configCheck.message}`,
          variant: "destructive",
        });
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
        setWebhookStatus(`Edge function error: ${error.message}`);
        toast({
          title: "Notification failed",
          description: "Could not send Discord notification: " + error.message,
          variant: "destructive",
        });
        setIsNotifying(false);
      } else {
        console.log("Discord notification response:", data);
        setWebhookStatus("Notification sent successfully");
        toast({
          title: "Notification sent",
          description: "Discord notification was sent successfully",
        });
        setIsNotifying(false);
      }
    } catch (error: any) {
      console.error("Error sending Discord notification:", error);
      setWebhookStatus(`Unexpected error: ${error.message}`);
      toast({
        title: "Notification error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      setIsNotifying(false);
    }
  };

  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead');
  }
  
  useEffect(() => {
    let timer: number;
    if (!isNotifying && isWebhookConfigured) {
      timer = window.setTimeout(() => {
        window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform';
      }, 10000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isNotifying, isWebhookConfigured]);

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
          {isWebhookConfigured ? "Redirecting..." : "Configuration Required"}
        </h1>
        
        {isWebhookConfigured ? (
          <p className="mb-4">Please wait while we redirect you to our registration form.</p>
        ) : (
          <Alert variant="destructive" className="mb-4 text-left">
            <AlertTitle>Discord Webhook Not Configured</AlertTitle>
            <AlertDescription>
              The Discord webhook URL is not set in the Supabase environment variables. 
              Please add the DISCORD_WEBHOOK_URL secret in your Supabase project settings.
            </AlertDescription>
          </Alert>
        )}
        
        {isNotifying && isWebhookConfigured && (
          <div className="text-sm text-brutal-gray">
            Sending notification... {retryCount > 0 ? `(Retry attempt: ${retryCount})` : ''}
          </div>
        )}
        
        {!isNotifying && !isWebhookConfigured && (
          <div className="mt-4">
            <Button onClick={continueToForm} className="brutal-button">
              Continue to Registration Form
            </Button>
          </div>
        )}
        
        {!isNotifying && isWebhookConfigured && webhookStatus !== "Notification sent successfully" && (
          <div className="mt-4">
            <Button onClick={retryNotification} className="brutal-button mr-2">
              Retry Notification
            </Button>
            <Button onClick={continueToForm} className="brutal-button mt-2 md:mt-0">
              Continue to Form
            </Button>
          </div>
        )}
        
        {!isNotifying && isWebhookConfigured && webhookStatus === "Notification sent successfully" && (
          <div className="mt-4">
            <p className="text-green-600 mb-4">✓ Notification sent successfully!</p>
            <Button onClick={continueToForm} className="brutal-button">
              Continue to Registration Form
            </Button>
          </div>
        )}
        
        <div className="mt-4">
          <Button onClick={toggleDebugInfo} variant="ghost" size="sm">
            {showDebugInfo ? "Hide Debug Info" : "Show Debug Info"}
          </Button>
        </div>
        
        <Dialog open={showDebugInfo} onOpenChange={setShowDebugInfo}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Debug Information</DialogTitle>
              <DialogDescription>
                Technical details about the Discord webhook configuration.
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
