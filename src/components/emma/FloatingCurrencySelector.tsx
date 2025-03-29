
import React, { useState, useEffect } from 'react';
import { useCurrency, Currency } from '@/context/CurrencyContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FloatingCurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();
  const [isVisible, setIsVisible] = useState(true);
  
  const handleCurrencyChange = (value: string) => {
    setCurrency(value as Currency);
  };

  // Hide the selector when scrolling down, show when scrolling up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-brutal-white shadow-brutal border-2 border-brutal-black rounded-lg p-2">
        <div className="flex items-center gap-2">
          <span className="text-brutal-charcoal font-mono uppercase text-sm">Currency:</span>
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-24 h-8 bg-brutal-white border border-brutal-black/30">
              <SelectValue placeholder="USD" />
            </SelectTrigger>
            <SelectContent className="bg-brutal-white border border-brutal-black/30">
              <SelectItem value="USD" className="font-mono">USD</SelectItem>
              <SelectItem value="EUR" className="font-mono">EUR</SelectItem>
              <SelectItem value="CAD" className="font-mono">CAD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
