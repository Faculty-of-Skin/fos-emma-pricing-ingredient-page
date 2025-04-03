
import { useState, useEffect, createContext, useContext } from 'react';

interface TutorialContextType {
  activeTutorial: string | null;
  setActiveTutorial: (tutorialId: string | null) => void;
  completedTutorials: string[];
  markTutorialComplete: (tutorialId: string) => void;
  resetTutorials: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null);
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([]);

  // Load completed tutorials from localStorage on mount
  useEffect(() => {
    const savedTutorials = localStorage.getItem('completedTutorials');
    if (savedTutorials) {
      try {
        setCompletedTutorials(JSON.parse(savedTutorials));
      } catch (e) {
        console.error('Failed to parse completed tutorials from localStorage', e);
      }
    }
  }, []);

  // Save completed tutorials to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('completedTutorials', JSON.stringify(completedTutorials));
  }, [completedTutorials]);

  const markTutorialComplete = (tutorialId: string) => {
    setCompletedTutorials(prev => {
      if (prev.includes(tutorialId)) {
        return prev;
      }
      return [...prev, tutorialId];
    });
  };

  const resetTutorials = () => {
    setCompletedTutorials([]);
    localStorage.removeItem('completedTutorials');
  };

  return (
    <TutorialContext.Provider
      value={{
        activeTutorial,
        setActiveTutorial,
        completedTutorials,
        markTutorialComplete,
        resetTutorials
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};
