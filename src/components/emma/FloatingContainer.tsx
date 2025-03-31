
import React, { ReactNode } from 'react';
import { useFloatingVisibility } from '@/hooks/useFloatingVisibility';
import { usePricingVisibility } from '@/hooks/usePricingVisibility';

interface FloatingContainerProps {
  children: ReactNode;
  scrollThreshold?: number;
  className?: string;
  position?: 'bottom-right' | 'top-right' | 'top-center';
  showOnlyWithPricing?: boolean;
}

export const FloatingContainer = ({
  children,
  scrollThreshold = 100,
  className = '',
  position = 'bottom-right',
  showOnlyWithPricing = false,
}: FloatingContainerProps) => {
  const isVisible = useFloatingVisibility(scrollThreshold);
  const { isPricingVisible, isTopOfPage } = usePricingVisibility();

  // Determine if the component should be visible
  const shouldShow = showOnlyWithPricing 
    ? (isPricingVisible || isTopOfPage) 
    : isVisible;

  if (!shouldShow) return null;

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'top-right': 'top-20 right-6',
    'top-center': 'top-20 left-1/2 transform -translate-x-1/2',
  };

  return (
    <div className={`fixed z-50 ${positionClasses[position]} ${className} transition-opacity duration-300`}>
      <div className="bg-brutal-white shadow-brutal border-2 border-brutal-black rounded-lg p-2">
        {children}
      </div>
    </div>
  );
};
