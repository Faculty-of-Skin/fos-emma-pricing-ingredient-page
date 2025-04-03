
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, BookText, BookCheck, Check, Package, Layers, BarChart3 } from 'lucide-react';
import { useTutorial } from '@/hooks/useTutorial';
import { TutorialStep } from './TutorialStep';
import { ActiveTutorial } from './ActiveTutorial';
import { tutorials } from './tutorialData';

export const Tutorial = () => {
  const { 
    activeTutorial, 
    setActiveTutorial, 
    completedTutorials, 
    markTutorialComplete 
  } = useTutorial();

  const tutorialsList = [
    {
      id: 'products',
      title: 'Manage Products',
      description: 'Learn how to view and manage your product catalog',
      icon: <Package className="h-4 w-4" />,
      actionLabel: 'Start Tutorial',
      onAction: () => setActiveTutorial('products')
    },
    {
      id: 'ingredients',
      title: 'Explore Ingredients',
      description: 'Discover the Emma ingredients database',
      icon: <Layers className="h-4 w-4" />,
      actionLabel: 'Start Tutorial',
      onAction: () => setActiveTutorial('ingredients')
    },
    {
      id: 'forecasts',
      title: 'View Forecasts',
      description: 'Understand your sales forecasts and analytics',
      icon: <BarChart3 className="h-4 w-4" />,
      actionLabel: 'Start Tutorial',
      onAction: () => setActiveTutorial('forecasts')
    }
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold font-mono uppercase">Tutorials</h2>
        {completedTutorials.length > 0 && (
          <Button 
            variant="link" 
            size="sm" 
            className="text-brutal-gray text-xs"
            onClick={() => setActiveTutorial(null)}
          >
            Dismiss All
          </Button>
        )}
      </div>
      
      {activeTutorial ? (
        <ActiveTutorial 
          tutorialId={activeTutorial} 
          onClose={() => setActiveTutorial(null)}
          onComplete={() => {
            markTutorialComplete(activeTutorial);
            setActiveTutorial(null);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tutorialsList
            .filter(tutorial => !completedTutorials.includes(tutorial.id))
            .map(tutorial => (
              <TutorialStep 
                key={tutorial.id} 
                title={tutorial.title} 
                description={tutorial.description} 
                icon={tutorial.icon}
                actionLabel={tutorial.actionLabel}
                onAction={tutorial.onAction}
              />
            ))}
          
          {tutorialsList.filter(tutorial => !completedTutorials.includes(tutorial.id)).length === 0 && (
            <Card className="col-span-full border-2 border-brutal-black/10 bg-muted/20">
              <CardContent className="pt-6 pb-6 text-center">
                <Check className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="text-sm text-muted-foreground">You've completed all available tutorials!</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
