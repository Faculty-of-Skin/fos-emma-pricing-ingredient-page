
import { Navigation } from "@/components/Navigation";
import { EmmaEquipmentPricing } from "@/components/emma/EmmaEquipmentPricing";
import { EmmaAccessoriesPricing } from "@/components/emma/EmmaAccessoriesPricing";
import { Logo } from "@/components/navigation/Logo";
import { useNavigate } from "react-router-dom";
import { FloatingCurrencySelector } from "@/components/emma/FloatingCurrencySelector";

const EmmaPricing = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/join-waitlist');
  };
  
  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      <FloatingCurrencySelector />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-brutal-black mb-4 font-mono uppercase tracking-tight">
              Emma Pricing 2025
            </h1>
            <p className="text-lg text-brutal-charcoal font-mono uppercase tracking-wide mb-8 max-w-3xl mx-auto">
              Advanced facial treatment technology for beauty professionals
            </p>
          </div>
          
          <EmmaEquipmentPricing />
          
          <div className="my-16">
            <EmmaAccessoriesPricing />
          </div>
          
          <div className="text-center mt-20">
            <p className="text-brutal-charcoal font-mono uppercase tracking-wide mb-6 max-w-3xl mx-auto">
              Contact us to learn more about bulk pricing and distributor opportunities
            </p>
            <button 
              className="brutal-button min-w-[250px] font-black tracking-widest text-sm"
              onClick={handleContactClick}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmmaPricing;
