
import { PlanFeature } from "./PlanFeature";
import { useNavigate } from "react-router-dom";

export interface PlanProps {
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
  isYearly: boolean;
}

export const PricingPlan = ({ name, monthlyPrice, description, features, cta, highlight, isYearly }: PlanProps) => {
  const navigate = useNavigate();
  
  const handleWaitlistClick = () => {
    navigate('/join-waitlist');
  };

  const calculateYearlyPrice = (price: number) => {
    return Math.round(price * 0.75);
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "$0";
    return `$${price}`;
  };

  return (
    <div className={`brutal-card ${highlight ? 'transform -translate-y-4 border-8 pt-8' : ''}`}>
      {highlight && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-brutal-black text-brutal-white px-4 py-1 font-mono uppercase border-4 border-brutal-black font-bold tracking-widest text-sm">
          Most Popular
        </div>
      )}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-black text-brutal-black font-mono uppercase tracking-tight">
            {name}
          </h3>
          <div className="mt-4">
            <span className="text-4xl font-black text-brutal-black tracking-tight">
              {isYearly 
                ? formatPrice(calculateYearlyPrice(monthlyPrice))
                : formatPrice(monthlyPrice)
              }
            </span>
            <span className="text-brutal-charcoal font-mono uppercase text-sm tracking-wide">
              /month per location
              {isYearly && (
                <span className="block text-xs text-brutal-charcoal">
                  billed annually
                </span>
              )}
            </span>
          </div>
          <p className="mt-4 text-brutal-charcoal font-mono uppercase text-sm tracking-wide">
            {description}
          </p>
        </div>
        <div className="flex-grow">
          <ul className="space-y-4">
            {features.map((feature, idx) => (
              <PlanFeature key={idx} feature={feature} />
            ))}
          </ul>
        </div>
        <div>
          <button 
            className="brutal-button w-full font-black tracking-widest text-sm"
            onClick={handleWaitlistClick}
          >
            {cta}
          </button>
        </div>
      </div>
    </div>
  );
};
