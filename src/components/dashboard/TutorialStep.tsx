
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface TutorialStepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionLabel: string;
  onAction: () => void;
}

export const TutorialStep: React.FC<TutorialStepProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction
}) => (
  <Card className="border-2 border-brutal-black/20 hover:border-brutal-black/40 transition-colors">
    <CardHeader className="flex flex-row items-start gap-4 pb-2">
      <div className="mt-1 rounded-full bg-muted p-2">
        {icon}
      </div>
      <div className="space-y-1">
        <CardTitle className="text-md font-mono uppercase">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </div>
    </CardHeader>
    <CardFooter className="pt-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full justify-between border-2 border-brutal-black/20 hover:bg-brutal-black hover:text-brutal-white"
        onClick={onAction}
      >
        {actionLabel} <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </CardFooter>
  </Card>
);
