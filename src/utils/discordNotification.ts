
import { supabase } from "@/integrations/supabase/client";

interface NotificationConfig {
  webhookConfigured: boolean;
  webhookValid: boolean;
}

interface NotificationResult {
  success: boolean;
  debugDetails?: any;
}

export const checkWebhookConfig = async (): Promise<NotificationConfig> => {
  try {
    const timestamp = Date.now();
    const { data, error } = await supabase.functions.invoke("discord-notification", {
      body: { 
        action: "check-config", 
        timestamp
      }
    });
    
    if (error) {
      console.error("Error checking webhook configuration:", error);
      return { webhookConfigured: false, webhookValid: false };
    }
    
    return { 
      webhookConfigured: !!data?.webhookConfigured, 
      webhookValid: !!data?.webhookValid 
    };
  } catch (error) {
    console.error("Exception checking webhook configuration:", error);
    return { webhookConfigured: false, webhookValid: false };
  }
};

export const sendDiscordNotification = async (email: string): Promise<NotificationResult> => {
  try {
    const timestamp = Date.now();
    
    const { data, error } = await supabase.functions.invoke("discord-notification", {
      body: { 
        email, 
        action: "send-notification",
        timestamp
      }
    });
    
    if (error) {
      console.error("Error from discord notification edge function:", error);
      return { success: false };
    }
    
    console.log("Discord notification response:", data);
    return { success: true, debugDetails: data };
  } catch (error) {
    console.error("Exception sending Discord notification:", error);
    return { success: false };
  }
};
