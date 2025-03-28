
import { NavButton } from "./NavButton";

interface MobileMenuProps {
  isOpen: boolean;
  scrollToSection: (id: string) => void;
  handleWaitlistClick: () => void;
  handleLoginClick: () => void;
  handleDashboardClick: () => void;
  showDashboard: boolean;
}

export const MobileMenu = ({ 
  isOpen, 
  scrollToSection, 
  handleWaitlistClick,
  handleLoginClick,
  handleDashboardClick,
  showDashboard
}: MobileMenuProps) => {
  return (
    <div 
      className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="py-4 flex flex-col space-y-2 pb-6">
        <button 
          onClick={() => scrollToSection('features')} 
          className="px-4 py-2 text-brutal-black hover:bg-brutal-gray/10 rounded"
        >
          Features
        </button>
        <button 
          onClick={() => scrollToSection('how-it-works')} 
          className="px-4 py-2 text-brutal-black hover:bg-brutal-gray/10 rounded"
        >
          How It Works
        </button>
        <button 
          onClick={() => scrollToSection('pricing')} 
          className="px-4 py-2 text-brutal-black hover:bg-brutal-gray/10 rounded"
        >
          Pricing
        </button>
        <button 
          onClick={() => scrollToSection('faq')} 
          className="px-4 py-2 text-brutal-black hover:bg-brutal-gray/10 rounded"
        >
          FAQ
        </button>
        
        <div className="pt-2 flex flex-col space-y-2">
          {showDashboard ? (
            <NavButton onClick={handleDashboardClick}>
              Dashboard
            </NavButton>
          ) : (
            <>
              <NavButton onClick={handleLoginClick} variant="outline">
                Login
              </NavButton>
              <NavButton onClick={handleWaitlistClick}>
                Join Waitlist
              </NavButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
