
import React, { ReactNode } from 'react';
import { useFloatingVisibility } from '@/hooks/useFloatingVisibility';

interface FloatingContainerProps {
  children: ReactNode;
  scrollThreshold?: number;
  className?: string;
  position?: 'bottom-right' | 'top-right' | 'top-center';
}

export const FloatingContainer = ({
  children,
  scrollThreshold = 100,
  className = '',
  position = 'bottom-right',
}: FloatingContainerProps) => {
  const isVisible = useFloatingVisibility(scrollThreshold);

  if (!isVisible) return null;

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'top-right': 'top-32 md:top-28 right-6',
    'top-center': 'top-32 md:top-28 left-1/2 transform -translate-x-1/2',
  };

  return (
    <div className={`fixed z-40 ${positionClasses[position]} ${className} transition-opacity duration-300`}>
      <div className="bg-brutal-white shadow-brutal px-4 py-3 border-2 border-brutal-black rounded-none">
        {children}
      </div>
    </div>
  );
};
