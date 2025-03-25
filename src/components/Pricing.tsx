
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PricingToggle } from "./pricing/PricingToggle";
import { PricingPlan } from "./pricing/PricingPlan";
import { CommonFeatures } from "./pricing/CommonFeatures";
import { pricingPlans, commonFeatures } from "./pricing/PricingData";

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  const navigate = useNavigate();
  
  const handleWaitlistClick = () => {
    navigate('/join-waitlist');
  };

  return (
    <section id="pricing" className="py-24 bg-brutal-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brutal-black mb-4 font-mono uppercase tracking-tight">
            Pricing Plans
          </h2>
          <p className="text-lg text-brutal-charcoal font-mono uppercase tracking-wide mb-8">
            Choose a plan that fits your spa's needs
          </p>

          <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {pricingPlans.map((plan, index) => (
            <PricingPlan 
              key={index}
              {...plan}
              isYearly={isYearly}
            />
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <CommonFeatures features={commonFeatures} />

          <div className="text-center">
            <p className="text-brutal-charcoal font-mono uppercase tracking-wide mb-6">Start Free & Upgrade Anytime!</p>
            <button 
              className="brutal-button min-w-[250px] font-black tracking-widest text-sm"
              onClick={handleWaitlistClick}
            >
              Join the waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
