
import { NavButton } from "./NavButton";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  scrollToSection: (id: string) => void;
  handleWaitlistClick: () => void;
  handleLoginClick: () => void;
  handleDashboardClick: () => void;
  handleEmmaIngredientsClick: () => void;
  showDashboard: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ 
  isOpen, 
  scrollToSection, 
  handleWaitlistClick,
  handleLoginClick,
  handleDashboardClick,
  handleEmmaIngredientsClick,
  showDashboard,
  onClose
}: MobileMenuProps) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-brutal-white flex flex-col md:hidden"
    >
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 border-2 border-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
        {/* Emma Pricing link */}
        <a 
          href="/"
          className="w-full max-w-sm py-3 px-4 text-lg font-mono uppercase text-brutal-black hover:bg-brutal-gray/10 border-2 border-brutal-black rounded-md transition-colors text-center"
        >
          Emma Pricing
        </a>
        
        {/* Emma Ingredients link */}
        <button 
          onClick={() => {
            handleEmmaIngredientsClick();
            onClose();
          }}
          className="w-full max-w-sm py-3 px-4 text-lg font-mono uppercase text-brutal-black hover:bg-brutal-gray/10 border-2 border-brutal-black rounded-md transition-colors"
        >
          Emma Ingredients
        </button>
        
        <div className="w-full max-w-sm pt-6 flex flex-col gap-4">
          {showDashboard ? (
            <NavButton onClick={() => {
              handleDashboardClick();
              onClose();
            }}>
              Dashboard
            </NavButton>
          ) : (
            <>
              <NavButton 
                onClick={() => {
                  handleLoginClick();
                  onClose();
                }} 
                variant="outline"
              >
                Login
              </NavButton>
              
              <NavButton 
                onClick={() => {
                  handleWaitlistClick();
                  onClose();
                }}
              >
                Join Waitlist
              </NavButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
