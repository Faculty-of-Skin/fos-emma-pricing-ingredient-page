
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Mail, MessageCircle } from "lucide-react";

export const SupportCard = () => {
  return (
    <Card className="brutal-card border-4 border-brutal-black bg-brutal-white transform transition-transform duration-100 hover:translate-x-1 hover:translate-y-1">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2 font-mono uppercase">
          <LifeBuoy className="h-5 w-5" /> Support
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm">Need help with something? Our support team is here to assist you.</p>
          
          <Button 
            className="w-full border-2 border-brutal-black bg-brutal-white text-brutal-black hover:bg-brutal-black hover:text-brutal-white font-mono uppercase tracking-wider"
            onClick={() => window.open('mailto:support@emma-beauty.com')}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email Support
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-2 border-brutal-black text-brutal-black hover:bg-brutal-black hover:text-brutal-white font-mono uppercase tracking-wider"
            onClick={() => window.open('https://discord.gg/emma-beauty', '_blank')}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Community Discord
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
