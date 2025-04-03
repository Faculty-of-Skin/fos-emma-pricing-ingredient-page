
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, BookText, BookCheck, Layers, Book } from 'lucide-react';

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
}) => {
  // Generate a background gradient based on the title (for visual distinction)
  const getBgGradient = (title: string) => {
    const options = [
      'bg-gradient-to-br from-blue-50 to-indigo-50',
      'bg-gradient-to-br from-green-50 to-emerald-50',
      'bg-gradient-to-br from-amber-50 to-yellow-50',
      'bg-gradient-to-br from-rose-50 to-pink-50',
      'bg-gradient-to-br from-purple-50 to-violet-50'
    ];
    
    // Simple hash to pick a consistent gradient based on the title
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return options[hash % options.length];
  };

  return (
    <Card className={`border-2 border-brutal-black/20 hover:border-brutal-black/40 transition-colors ${getBgGradient(title)}`}>
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <div className="mt-1 rounded-full bg-brutal-white/70 p-2 shadow-sm">
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
};
