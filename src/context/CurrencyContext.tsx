
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Currency = 'USD' | 'EUR' | 'CAD';

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInEUR: number) => number;
  formatPrice: (price: number) => string;
};

const currencyConversion = {
  EUR: 1,
  USD: 1.10,
  CAD: 1.10 * 1.45,
};

const currencySymbols = {
  EUR: '€',
  USD: '$',
  CAD: 'CA$',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const convertPrice = (priceInEUR: number): number => {
    if (typeof priceInEUR !== 'number') {
      console.error('Invalid price value:', priceInEUR);
      return 0;
    }
    const convertedPrice = priceInEUR * currencyConversion[currency];
    return convertedPrice;
  };

  const formatPrice = (price: number): string => {
    if (typeof price !== 'number' || isNaN(price)) {
      console.error('Invalid price for formatting:', price);
      return `${currencySymbols[currency]}0.00`;
    }
    const symbol = currencySymbols[currency];
    return `${symbol}${price.toFixed(2)}`;
  };
  
  // Add logging for currency changes
  useEffect(() => {
    console.log('Currency changed to:', currency);
    console.log('Currency conversion rate:', currencyConversion[currency]);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
