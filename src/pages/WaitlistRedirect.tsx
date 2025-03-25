
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProcessingState } from "@/components/waitlist/ProcessingState";
import { CompletedState } from "@/components/waitlist/CompletedState";
import { DebugDialog } from "@/components/waitlist/DebugDialog";
import { checkWebhookConfig, sendDiscordNotification } from "@/utils/discordNotification";

const WaitlistRedirect = () => {
  const [isNotifying, setIsNotifying] = useState(true);
  const [webhookStatus, setWebhookStatus] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [debugDetails, setDebugDetails] = useState<any>(null);
  const [notificationSuccess, setNotificationSuccess] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Add a delay before first attempt to ensure edge function is ready
    const initialDelay = setTimeout(() => {
      handleDiscordNotification();
    }, 3000); // 3 seconds for better edge function warmup
    
    return () => clearTimeout(initialDelay);
  }, []);
  
  const getEmailFromStorageOrParams = (): string | null => {
    let email = localStorage.getItem("waitlistEmail");
    
    if (!email) {
      email = searchParams.get("email");
      
      if (email) {
        localStorage.setItem("waitlistEmail", email);
      }
    }
    
    return email;
  };
  
  const handleDiscordNotification = async () => {
    try {
      const email = getEmailFromStorageOrParams();
      
      if (!email) {
        console.error("No email found in localStorage or URL parameters");
        setIsNotifying(false);
        return;
      }
      
      // First check webhook configuration
      const configCheck = await checkWebhookConfig();
      setDebugDetails(configCheck);
      
      if (!configCheck.webhookConfigured || !configCheck.webhookValid) {
        console.error("Issue with webhook configuration:", configCheck);
        setWebhookStatus("Configuration issue");
        
        // Still try to send if possible
        if (retryCount < 2) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => handleDiscordNotification(), 3000);
          return;
        }
        
        // After retries, proceed anyway
        console.log("Proceeding to form despite webhook issues");
        setIsNotifying(false);
        return;
      }
      
      // Send the notification
      const result = await sendDiscordNotification(email);
      
      if (!result.success) {
        setWebhookStatus(`Error occurred`);
        
        // Try again once
        if (retryCount < 1) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => handleDiscordNotification(), 2000);
          return;
        }
        
        // After retry, just proceed
        console.log("Proceeding to form despite notification error");
        setIsNotifying(false);
      } else {
        setWebhookStatus("Notification sent successfully");
        setNotificationSuccess(true);
        toast({
          title: "Success",
          description: "Your registration is being processed",
        });
        setIsNotifying(false);
      }
    } catch (error: any) {
      console.error("Error handling Discord notification:", error);
      setWebhookStatus(`Error occurred`);
      setIsNotifying(false);
    }
  };

  // Track Meta pixel conversion event
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
  }, []);
  
  // Handle automatic redirection
  useEffect(() => {
    let timer: number;
    if (!isNotifying) {
      timer = window.setTimeout(() => {
        continueToForm();
      }, 10000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isNotifying]);

  const continueToForm = () => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform';
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
        
        {isNotifying && <ProcessingState isNotifying={isNotifying} />}
        
        {!isNotifying && (
          <CompletedState 
            success={notificationSuccess} 
            onContinue={continueToForm} 
          />
        )}
        
        {/* Debug button only visible in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4">
            <Button onClick={toggleDebugInfo} variant="ghost" size="sm">
              {showDebugInfo ? "Hide Debug Info" : "Show Debug Info"}
            </Button>
          </div>
        )}
        
        <DebugDialog 
          open={showDebugInfo}
          onOpenChange={setShowDebugInfo}
          webhookStatus={webhookStatus}
          debugDetails={debugDetails}
          email={getEmailFromStorageOrParams()}
        />
      </div>
    </div>
  );
};

export default WaitlistRedirect;
