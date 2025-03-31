
import React from 'react';
import { FloatingContainer } from './FloatingContainer';
import { CurrencySelector } from './CurrencySelector';

export const FloatingCurrencySelector = () => {
  return (
    <FloatingContainer position="top-right">
      <div className="flex items-center gap-2">
        <span className="text-brutal-charcoal font-mono uppercase text-sm">Currency:</span>
        <CurrencySelector />
      </div>
    </FloatingContainer>
  );
};
