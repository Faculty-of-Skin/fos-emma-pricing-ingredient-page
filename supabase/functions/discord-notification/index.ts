
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
    const { email } = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // This would be your Discord webhook URL
    // You should set this as a secret in your Supabase project
    const discordWebhookUrl = Deno.env.get("DISCORD_WEBHOOK_URL");
    
    if (!discordWebhookUrl) {
      console.error("Discord webhook URL not set");
      return new Response(
        JSON.stringify({ error: "Webhook URL not configured" }),
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

    // Send the notification to Discord
    const discordResponse = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      console.error("Discord API error:", errorText);
      throw new Error(`Discord API error: ${discordResponse.status} ${errorText}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error sending Discord notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
