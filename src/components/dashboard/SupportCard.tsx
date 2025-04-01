
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SupportCard = () => {
  const { toast } = useToast();

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('mailto:ade@facultyofskin.com', '_blank');
    toast({
      title: "Email Client Opened",
      description: "Opening your email client to contact us.",
    });
  };

  return (
    <Card className="brutal-card border-2 border-dashed">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-2">Need Help?</h3>
        <p className="text-sm text-brutal-gray mb-4">
          Contact our support team for assistance with your Emma products or services.
        </p>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleEmailClick}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email Us
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open('https://meetings.hubspot.com/faculty-of-skin/spa-sense', '_blank')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule a Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
