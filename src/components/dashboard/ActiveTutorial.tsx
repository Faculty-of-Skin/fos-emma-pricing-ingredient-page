
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, BookCheck, BookText, Book, Layers, Package, BarChart3, X } from 'lucide-react';
import { tutorials } from './tutorialData';

interface ActiveTutorialProps {
  tutorialId: string;
  onClose: () => void;
  onComplete: () => void;
}

export const ActiveTutorial: React.FC<ActiveTutorialProps> = ({ tutorialId, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const currentTutorial = tutorials[tutorialId];
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

  // Map tutorial IDs to appropriate icons
  const getTutorialIcon = (id: string) => {
    switch(id) {
      case 'products':
        return <Package className="h-16 w-16 text-brutal-black/70" />;
      case 'ingredients':
        return <Layers className="h-16 w-16 text-brutal-black/70" />;
      case 'forecasts':
        return <BarChart3 className="h-16 w-16 text-brutal-black/70" />;
      default:
        return <BookOpen className="h-16 w-16 text-brutal-black/70" />;
    }
  };

  // Get decorative background colors based on tutorialId
  const getBackgroundStyle = (id: string) => {
    const styles = {
      'products': 'bg-gradient-to-br from-blue-50 to-indigo-100',
      'ingredients': 'bg-gradient-to-br from-amber-50 to-yellow-100',
      'forecasts': 'bg-gradient-to-br from-green-50 to-emerald-100',
    };
    
    return styles[id as keyof typeof styles] || 'bg-gradient-to-br from-gray-50 to-slate-100';
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
          <div className={`aspect-video ${getBackgroundStyle(tutorialId)} rounded-md overflow-hidden flex items-center justify-center`}>
            {getTutorialIcon(tutorialId)}
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
