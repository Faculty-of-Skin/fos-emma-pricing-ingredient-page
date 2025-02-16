
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { TargetAudience } from "@/components/TargetAudience";
import { JoinWaitlist } from "@/components/JoinWaitlist";
import { FAQ } from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-spa-beige">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Benefits />
      <TargetAudience />
      <FAQ />
      <JoinWaitlist />
    </div>
  );
};

export default Index;
