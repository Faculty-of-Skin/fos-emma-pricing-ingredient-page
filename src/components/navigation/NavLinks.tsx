
import React from "react";

interface NavLinksProps {
  scrollToSection: (id: string) => void;
}

export const NavLinks = ({ scrollToSection }: NavLinksProps) => {
  return (
    <div className="flex space-x-8">
      <button 
        onClick={() => scrollToSection('benefits')} 
        className="text-brutal-black hover:text-brutal-charcoal transition-colors font-mono uppercase"
      >
        Features
      </button>
      <button 
        onClick={() => scrollToSection('pricing')} 
        className="text-brutal-black hover:text-brutal-charcoal transition-colors font-mono uppercase"
      >
        Pricing
      </button>
      <button 
        onClick={() => scrollToSection('faq')} 
        className="text-brutal-black hover:text-brutal-charcoal transition-colors font-mono uppercase"
      >
        FAQ
      </button>
    </div>
  );
};
