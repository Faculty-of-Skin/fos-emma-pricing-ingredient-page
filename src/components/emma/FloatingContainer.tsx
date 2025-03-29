
import React, { ReactNode } from 'react';
import { useFloatingVisibility } from '@/hooks/useFloatingVisibility';

interface FloatingContainerProps {
  children: ReactNode;
  scrollThreshold?: number;
  className?: string;
}

export const FloatingContainer = ({
  children,
  scrollThreshold = 100,
  className = '',
}: FloatingContainerProps) => {
  const isVisible = useFloatingVisibility(scrollThreshold);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className="bg-brutal-white shadow-brutal border-2 border-brutal-black rounded-lg p-2">
        {children}
      </div>
    </div>
  );
};
