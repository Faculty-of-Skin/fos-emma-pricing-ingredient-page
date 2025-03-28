
import { NavButton } from "./NavButton";
import { useNavigate } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  scrollToSection: (id: string) => void;
  handleWaitlistClick: () => void;
  showDashboard: boolean;
  handleDashboardClick: () => void;
  handleLoginClick: () => void;
}

export const MobileMenu = ({ 
  isOpen, 
  scrollToSection, 
  handleWaitlistClick, 
  showDashboard,
  handleDashboardClick,
  handleLoginClick
}: MobileMenuProps) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="py-4 border-t-2 border-brutal-black">
        <div className="space-y-2 mb-4">
          <a 
            onClick={() => navigate('/')} 
            className="block py-2 font-mono uppercase text-brutal-black hover:text-brutal-dark cursor-pointer"
          >
            Product Pricing
          </a>
          <a 
            onClick={() => scrollToSection('pricing')} 
            className="block py-2 font-mono uppercase text-brutal-black hover:text-brutal-dark"
          >
            Pricing
          </a>
          <a 
            onClick={() => scrollToSection('faq')} 
            className="block py-2 font-mono uppercase text-brutal-black hover:text-brutal-dark"
          >
            FAQ
          </a>
        </div>
        
        <div className="flex flex-col space-y-2">
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
