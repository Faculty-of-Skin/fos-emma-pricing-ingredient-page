
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SupportCard = () => {
  return (
    <Card className="brutal-card border-2 border-dashed">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-2">Need Help?</h3>
        <p className="text-sm text-brutal-gray mb-4">
          Contact our support team for assistance with your Emma products or services.
        </p>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.location.href = 'mailto:support@example.com'}
        >
          Contact Support
        </Button>
      </CardContent>
    </Card>
  );
};
