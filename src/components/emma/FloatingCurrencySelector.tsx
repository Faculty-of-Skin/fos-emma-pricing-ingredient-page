
import React from 'react';
import { FloatingContainer } from './FloatingContainer';
import { CurrencySelector } from './CurrencySelector';

export const FloatingCurrencySelector = () => {
  return (
    <FloatingContainer position="top-right" showOnlyWithPricing={true}>
      <div className="flex items-center gap-3">
        <span className="text-brutal-black font-mono uppercase text-sm font-bold">Currency:</span>
        <CurrencySelector />
      </div>
    </FloatingContainer>
  );
};
