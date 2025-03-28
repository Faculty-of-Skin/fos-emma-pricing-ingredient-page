
import { useCurrency } from '@/context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';

export const FloatingCurrencySelector = () => {
  return (
    <div className="fixed top-20 right-4 z-40">
      <CurrencySelector />
    </div>
  );
};
