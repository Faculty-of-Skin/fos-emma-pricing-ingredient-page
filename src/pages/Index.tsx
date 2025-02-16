
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { TargetAudience } from "@/components/TargetAudience";
import { JoinWaitlist } from "@/components/JoinWaitlist";

const Index = () => {
  return (
    <div className="min-h-screen bg-spa-beige">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Benefits />
      <TargetAudience />
      <JoinWaitlist />
    </div>
  );
};

export default Index;
