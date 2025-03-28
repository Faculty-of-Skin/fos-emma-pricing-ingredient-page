
import { Navigation } from "@/components/Navigation";
import { CurrencySelector } from "@/components/emma/CurrencySelector";
import { EquipmentPricing } from "@/components/equipment/EquipmentPricing";
import { CurrencyProvider } from "@/context/CurrencyContext";

const Index = () => {
  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brutal-black mb-4 font-mono uppercase tracking-tight">
            Emma Equipment Pricing
          </h1>
          <p className="text-lg text-brutal-charcoal font-mono uppercase tracking-wide mb-8 max-w-3xl mx-auto">
            Advanced facial treatment technology for beauty professionals
          </p>
          <div className="flex justify-center mt-6">
            <CurrencySelector />
          </div>
        </div>
      </div>
      
      <EquipmentPricing />
    </div>
  );
};

export default Index;
