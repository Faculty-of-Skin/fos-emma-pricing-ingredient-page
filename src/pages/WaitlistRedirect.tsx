
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
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const sendDiscordNotification = async () => {
      try {
        // Try to get the email from localStorage or URL parameters
        let email = localStorage.getItem("waitlistEmail");
        
        // If email is not in localStorage, try to get it from URL parameters
        if (!email) {
          email = searchParams.get("email");
          
          if (email) {
            // Store it in localStorage for future reference
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
        
        // Check if webhook URL is configured
        const { data: configCheck, error: configError } = await supabase.functions.invoke("discord-notification", {
          body: { action: "check-config" }
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
        
        // Send notification to Discord via our edge function
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

    // Track the conversion with Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
    
    // Send Discord notification
    sendDiscordNotification();
    
    // Redirect to Google Form after a delay (only if webhook is configured)
    let timer: number;
    if (isWebhookConfigured) {
      timer = window.setTimeout(() => {
        window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform';
      }, 8000); // Increased delay to ensure notification is sent and error is shown
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchParams, toast, isWebhookConfigured]);

  const continueToForm = () => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform';
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
        
        {!isWebhookConfigured && (
          <div className="mt-4">
            <Button onClick={continueToForm} className="brutal-button">
              Continue to Registration Form
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
