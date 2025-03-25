
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log("Received request with data:", JSON.stringify(requestData));
    
    // Get the Discord webhook URL from environment variables
    const discordWebhookUrl = Deno.env.get("DISCORD_WEBHOOK_URL");
    
    // Log the environment variables for debugging (don't log the full webhook URL for security)
    console.log("Environment variables present:", Object.keys(Deno.env.toObject()).join(", "));
    console.log("Discord webhook configured:", discordWebhookUrl ? `Yes (${discordWebhookUrl.length} chars)` : "No");
    
    // If just checking configuration
    if (requestData.action === "check-config") {
      console.log("Checking Discord webhook configuration");
      
      if (!discordWebhookUrl) {
        console.error("Discord webhook URL not set in environment variables");
        return new Response(
          JSON.stringify({ 
            webhookConfigured: false,
            webhookValid: false,
            message: "DISCORD_WEBHOOK_URL is not set in the environment",
            envVars: Object.keys(Deno.env.toObject()),
            timestamp: new Date().toISOString()
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Validate the webhook URL
      let webhookValid = false;
      let validationMessage = "";
      
      try {
        if (!discordWebhookUrl.startsWith("https://discord.com/api/webhooks/")) {
          validationMessage = "URL doesn't start with https://discord.com/api/webhooks/";
        } else {
          // Try to make a GET request to the webhook URL
          console.log("Attempting to validate webhook URL");
          const checkResponse = await fetch(discordWebhookUrl, {
            method: "GET"
          });
          
          console.log("Webhook validation check status:", checkResponse.status);
          
          // Discord returns 401 for valid but unauthorized webhooks, 404 for invalid ones
          if (checkResponse.status === 401 || checkResponse.status === 200) {
            webhookValid = true;
            validationMessage = "Webhook URL validated successfully";
          } else if (checkResponse.status === 404) {
            validationMessage = "Webhook URL returned 404 Not Found - it may be invalid or expired";
          } else {
            validationMessage = `Webhook validation returned unexpected status: ${checkResponse.status}`;
          }
          
          // Try to parse response for additional info
          try {
            const responseText = await checkResponse.text();
            console.log("Webhook validation response:", responseText.substring(0, 200));
          } catch (e) {
            console.error("Could not read response text:", e);
          }
        }
      } catch (error) {
        console.error("Error validating webhook:", error);
        validationMessage = `Error validating webhook: ${error.message}`;
      }
      
      return new Response(
        JSON.stringify({ 
          webhookConfigured: true,
          webhookValid: webhookValid,
          message: validationMessage,
          urlLength: discordWebhookUrl.length,
          urlPrefix: discordWebhookUrl.substring(0, 30) + "...",
          timestamp: new Date().toISOString()
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // For sending notifications
    if (requestData.action === "send-notification") {
      const { email } = requestData;
      
      console.log("Processing notification request for email:", email);
      
      if (!email) {
        console.error("Email is missing in the request");
        return new Response(
          JSON.stringify({ error: "Email is required" }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (!discordWebhookUrl) {
        console.error("Discord webhook URL not set in environment variables");
        return new Response(
          JSON.stringify({ 
            error: "Webhook URL not configured",
            details: "The DISCORD_WEBHOOK_URL environment variable is not set",
            envVars: Object.keys(Deno.env.toObject())
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Prepare the message to send to Discord
      const message = {
        content: `New waitlist sign-up: ${email}`,
        embeds: [
          {
            title: "New Waitlist Registration",
            description: `A new user has joined the waitlist!`,
            color: 5814783, // A nice green color
            fields: [
              {
                name: "Email",
                value: email,
                inline: true
              },
              {
                name: "Time",
                value: new Date().toISOString(),
                inline: true
              }
            ],
            footer: {
              text: "Spa Sense Waitlist Notification"
            }
          }
        ]
      };

      console.log("Sending notification to Discord with message:", JSON.stringify(message));
      console.log("Using webhook URL starting with:", discordWebhookUrl.substring(0, 15) + "...");

      // Send the notification to Discord
      try {
        const discordResponse = await fetch(discordWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(message)
        });

        console.log("Discord API response status:", discordResponse.status);

        if (!discordResponse.ok) {
          const errorText = await discordResponse.text();
          console.error("Discord API error:", errorText);
          
          return new Response(
            JSON.stringify({ 
              error: "Discord API error", 
              status: discordResponse.status,
              details: errorText
            }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log("Discord notification sent successfully");

        return new Response(
          JSON.stringify({ 
            success: true,
            message: "Discord notification sent successfully",
            timestamp: new Date().toISOString()
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (fetchError) {
        console.error("Error fetching Discord API:", fetchError);
        return new Response(
          JSON.stringify({ 
            error: "Error sending to Discord", 
            details: fetchError.message 
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // If no action specified or unknown action
    return new Response(
      JSON.stringify({ error: "Invalid action specified" }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in discord-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
