
import { Dispatch, SetStateAction } from "react";

interface PricingToggleProps {
  isYearly: boolean;
  setIsYearly: Dispatch<SetStateAction<boolean>>;
}

export const PricingToggle = ({ isYearly, setIsYearly }: PricingToggleProps) => {
  return (
    <div className="inline-flex items-center gap-4 p-2 bg-brutal-white border-4 border-brutal-black">
      <button
        onClick={() => setIsYearly(false)}
        className={`px-4 py-2 font-mono uppercase text-sm font-bold transition-colors ${
          !isYearly ? 'bg-brutal-black text-brutal-white' : 'text-brutal-black'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => setIsYearly(true)}
        className={`px-4 py-2 font-mono uppercase text-sm font-bold transition-colors ${
          isYearly ? 'bg-brutal-black text-brutal-white' : 'text-brutal-black'
        }`}
      >
        Yearly
        <span className="ml-2 text-xs bg-brutal-pink px-2 py-1">25% OFF</span>
      </button>
    </div>
  );
};
