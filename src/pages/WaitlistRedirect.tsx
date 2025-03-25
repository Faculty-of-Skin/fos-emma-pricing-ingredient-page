
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const WaitlistRedirect = () => {
  const [isNotifying, setIsNotifying] = useState(true);
  const [webhookStatus, setWebhookStatus] = useState("");
  const [isWebhookConfigured, setIsWebhookConfigured] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Add a small delay before first attempt to ensure edge function is ready
    const initialDelay = setTimeout(() => {
      sendDiscordNotification();
    }, 1000);
    
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
      
      const { data: configCheck, error: configError } = await supabase.functions.invoke("discord-notification", {
        body: { 
          action: "check-config", 
          timestamp: Date.now() // Add timestamp to avoid caching
        }
      });
      
      console.log("Webhook config check response:", configCheck);
      
      if (configError) {
        console.error("Error checking webhook configuration:", configError);
        setWebhookStatus(`Error checking webhook: ${configError.message}`);
        toast({
          title: "Webhook configuration error",
          description: `Error checking webhook configuration: ${configError.message}`,
          variant: "destructive",
        });
        
        if (retryCount < 2) {
          // Retry after a short delay
          setRetryCount(prev => prev + 1);
          setTimeout(() => sendDiscordNotification(), 2000);
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
          description: "Discord webhook URL is invalid",
          variant: "destructive",
        });
        setIsNotifying(false);
        return;
      }
      
      console.log("Discord webhook is configured, sending notification...");
      
      const { data, error } = await supabase.functions.invoke("discord-notification", {
        body: { email, action: "send-notification" }
      });
      
      if (error) {
        console.error("Error from edge function:", error);
        setWebhookStatus(`Edge function error: ${error.message}`);
        toast({
          title: "Notification failed",
          description: "Could not send Discord notification: " + error.message,
          variant: "destructive",
        });
      } else {
        console.log("Discord notification response:", data);
        setWebhookStatus("Notification sent successfully");
        toast({
          title: "Notification sent",
          description: "Discord notification was sent successfully",
        });
      }
    } catch (error) {
      console.error("Error sending Discord notification:", error);
      setWebhookStatus(`Unexpected error: ${error.message}`);
      toast({
        title: "Notification error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
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
      }, 8000);
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
    sendDiscordNotification();
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
            Sending notification...
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
        
        {webhookStatus && (
          <div className="text-sm mt-2 p-2 bg-gray-100 text-brutal-gray rounded-md">
            <strong>Debug info:</strong> {webhookStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistRedirect;
