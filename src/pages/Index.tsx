
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { TargetAudience } from "@/components/TargetAudience";

const Index = () => {
  return (
    <div className="min-h-screen bg-spa-beige">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Benefits />
      <TargetAudience />
    </div>
  );
};

export default Index;
