
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { TargetAudience } from "@/components/TargetAudience";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { JoinWaitlist } from "@/components/JoinWaitlist";
import { SpaLogos } from "@/components/SpaLogos";

const Index = () => {
  return (
    <div className="min-h-screen bg-spa-beige">
      <Navigation />
      <Hero />
      <SpaLogos />
      <HowItWorks />
      <Benefits />
      <TargetAudience />
      <Pricing />
      <FAQ />
      <JoinWaitlist />
    </div>
  );
};

export default Index;
