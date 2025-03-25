
import React from "react";

interface MobileMenuProps {
  isOpen: boolean;
  scrollToSection: (id: string) => void;
  handleWaitlistClick: () => void;
}

export const MobileMenu = ({ isOpen, scrollToSection, handleWaitlistClick }: MobileMenuProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden py-4 animate-fade-down bg-brutal-white border-4 border-brutal-black mt-2">
      <button
        onClick={() => scrollToSection('benefits')}
        className="block w-full text-left px-4 py-2 text-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors font-mono uppercase"
      >
        Features
      </button>
      <button
        onClick={() => scrollToSection('pricing')}
        className="block w-full text-left px-4 py-2 text-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors font-mono uppercase"
      >
        Pricing
      </button>
      <button
        onClick={() => scrollToSection('faq')}
        className="block w-full text-left px-4 py-2 text-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors font-mono uppercase"
      >
        FAQ
      </button>
      <div className="px-4 pt-2">
        <button
          className="brutal-button w-full"
          onClick={handleWaitlistClick}
        >
          Join Waitlist
        </button>
      </div>
    </div>
  );
};
