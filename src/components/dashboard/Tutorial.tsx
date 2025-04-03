import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Play, ArrowRight, Check, Info, X } from 'lucide-react';
import { useTutorial } from '@/hooks/useTutorial';

interface TutorialStepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionLabel: string;
  onAction: () => void;
}

const TutorialStep: React.FC<TutorialStepProps> = ({
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

export const Tutorial = () => {
  const { 
    activeTutorial, 
    setActiveTutorial, 
    completedTutorials, 
    markTutorialComplete 
  } = useTutorial();

  const tutorials = [
    {
      id: 'products',
      title: 'Manage Products',
      description: 'Learn how to view and manage your product catalog',
      icon: <Book className="h-4 w-4" />,
      actionLabel: 'Start Tutorial',
      onAction: () => setActiveTutorial('products')
    },
    {
      id: 'ingredients',
      title: 'Explore Ingredients',
      description: 'Discover the Emma ingredients database',
      icon: <Book className="h-4 w-4" />,
      actionLabel: 'Start Tutorial',
      onAction: () => setActiveTutorial('ingredients')
    },
    {
      id: 'forecasts',
      title: 'View Forecasts',
      description: 'Understand your sales forecasts and analytics',
      icon: <Book className="h-4 w-4" />,
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
          {tutorials
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
          
          {tutorials.filter(tutorial => !completedTutorials.includes(tutorial.id)).length === 0 && (
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

interface ActiveTutorialProps {
  tutorialId: string;
  onClose: () => void;
  onComplete: () => void;
}

const ActiveTutorial: React.FC<ActiveTutorialProps> = ({ tutorialId, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const tutorials = {
    'products': {
      title: 'Product Management Tutorial',
      steps: [
        {
          title: 'Browse Products',
          content: 'Navigate to the Products page to view all your available products. You can sort and filter the list to find specific items quickly.',
          image: '/tutorial/products-1.png'
        },
        {
          title: 'Product Details',
          content: 'Click on any product to view detailed information including ingredients, pricing, and inventory status.',
          image: '/tutorial/products-2.png'
        },
        {
          title: 'Update Products',
          content: 'Use the edit button to update product information or adjust inventory levels as needed.',
          image: '/tutorial/products-3.png'
        }
      ]
    },
    'ingredients': {
      title: 'Emma Ingredients Tutorial',
      steps: [
        {
          title: 'Explore Ingredients Database',
          content: 'Browse through our extensive ingredients database to find the perfect components for your products.',
          image: '/tutorial/ingredients-1.png'
        },
        {
          title: 'Filter by Category',
          content: 'Use the category filters to narrow down ingredients by type, function, or properties.',
          image: '/tutorial/ingredients-2.png'
        },
        {
          title: 'Product Simulator',
          content: 'Try our product simulator to see how different ingredient combinations work together.',
          image: '/tutorial/ingredients-3.png'
        }
      ]
    },
    'forecasts': {
      title: 'Sales Forecasts Tutorial',
      steps: [
        {
          title: 'View Analytics Dashboard',
          content: 'The forecasts page provides an overview of your projected sales and performance metrics.',
          image: '/tutorial/forecasts-1.png'
        },
        {
          title: 'Understand Trends',
          content: 'Analyze sales trends over time to identify patterns and opportunities for growth.',
          image: '/tutorial/forecasts-2.png'
        },
        {
          title: 'Export Reports',
          content: 'Export detailed reports for your records or to share with team members.',
          image: '/tutorial/forecasts-3.png'
        }
      ]
    }
  };
  
  const currentTutorial = tutorials[tutorialId as keyof typeof tutorials];
  const steps = currentTutorial.steps;
  const currentTutorialStep = steps[currentStep];
  
  const isLastStep = currentStep === steps.length - 1;
  
  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };
  
  return (
    <Card className="border-2 border-brutal-black/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono uppercase">{currentTutorial.title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-1 mt-2">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 flex-1 rounded-full ${
                idx === currentStep 
                  ? 'bg-brutal-black' 
                  : idx < currentStep 
                    ? 'bg-brutal-gray' 
                    : 'bg-muted'
              }`} 
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
            {currentTutorialStep.image ? (
              <img 
                src={currentTutorialStep.image} 
                alt={currentTutorialStep.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <Info className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="text-md font-semibold mb-1">{currentTutorialStep.title}</h3>
            <p className="text-sm text-muted-foreground">{currentTutorialStep.content}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setCurrentStep(prevStep => Math.max(0, prevStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </div>
        <Button onClick={handleNext}>
          {isLastStep ? 'Complete' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  );
};
