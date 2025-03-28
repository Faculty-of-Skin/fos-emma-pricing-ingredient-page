
import { Navigation } from "@/components/Navigation";
import { useCurrency } from "@/context/CurrencyContext";
import { useEffect } from "react";
import { PricingHeader } from "@/components/emma/PricingHeader";
import { PricingOverview } from "@/components/emma/PricingOverview";
import { EquipmentSection } from "@/components/emma/EquipmentSection";
import { BottlesSection } from "@/components/emma/BottlesSection";
import { CapsulesSection } from "@/components/emma/CapsulesSection";
import { TreatmentSetSection } from "@/components/emma/TreatmentSetSection";
import { UnlockPricingSection } from "@/components/emma/UnlockPricingSection";
import { WhyChooseUsSection } from "@/components/emma/WhyChooseUsSection";
import { ContactSection } from "@/components/emma/ContactSection";
import { FloatingCurrencySelector } from "@/components/emma/FloatingCurrencySelector";

const Index = () => {
  const { setCurrency } = useCurrency();

  // Set default currency to USD when page loads
  useEffect(() => {
    setCurrency("USD");
  }, [setCurrency]);

  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      <FloatingCurrencySelector />
      
      <PricingHeader />
      
      {/* Pricing Sections */}
      <PricingOverview />
      <EquipmentSection />
      <BottlesSection />
      <CapsulesSection />
      <TreatmentSetSection />
      <UnlockPricingSection />
      <WhyChooseUsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
