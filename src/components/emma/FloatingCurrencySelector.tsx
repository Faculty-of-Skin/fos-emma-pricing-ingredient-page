
import React from 'react';
import { FloatingContainer } from './FloatingContainer';
import { CurrencySelector } from './CurrencySelector';
import { usePricingVisibility } from '@/hooks/usePricingVisibility';

export const FloatingCurrencySelector = () => {
  const { isEquipmentVisible } = usePricingVisibility();
  
  // Don't render the component at all if equipment section is not visible
  if (!isEquipmentVisible) return null;
  
  return (
    <FloatingContainer position="top-right">
      <div className="flex items-center gap-3">
        <span className="text-brutal-black font-mono uppercase text-sm font-bold hidden md:inline">Currency:</span>
        <CurrencySelector />
      </div>
    </FloatingContainer>
  );
};
