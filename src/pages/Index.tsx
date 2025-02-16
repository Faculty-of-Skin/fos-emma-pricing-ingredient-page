
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { TargetAudience } from "@/components/TargetAudience";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { JoinWaitlist } from "@/components/JoinWaitlist";

const Index = () => {
  return (
    <div className="min-h-screen bg-spa-beige">
      <Navigation />
      <main className="space-y-0">
        <Hero />
        <HowItWorks />
        <Benefits />
        <TargetAudience />
        <Pricing />
        <FAQ />
        <JoinWaitlist />
      </main>
    </div>
  );
};

export default Index;
