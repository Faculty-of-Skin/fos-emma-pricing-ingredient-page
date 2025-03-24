
import { useEffect, useState } from "react";
import WebsiteSubmissionForm from "./hero/WebsiteSubmissionForm";
import { PartnerLogos } from "./hero/PartnerLogos";
import { HeroHeader } from "./hero/HeroHeader";
import { HeroDescription } from "./hero/HeroDescription";
import { SchemaMarkup } from "./hero/SchemaMarkup";

export const Hero = () => {
  const [isGlowing, setIsGlowing] = useState(true);
  
  // Effect to create the flashing/glowing animation
  useEffect(() => {
    // Only animate for the first 10 seconds to avoid being too distracting
    const glowInterval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 1500);
    
    const stopGlowing = setTimeout(() => {
      clearInterval(glowInterval);
      setIsGlowing(false);
    }, 10000);
    
    return () => {
      clearInterval(glowInterval);
      clearTimeout(stopGlowing);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center bg-brutal-white pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          <HeroHeader />
          
          <HeroDescription />

          <WebsiteSubmissionForm />

          <PartnerLogos />
        </div>
      </div>

      <SchemaMarkup />
    </section>
  );
};

