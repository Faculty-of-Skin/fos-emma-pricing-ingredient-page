
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from "./navigation/Logo";
import { MobileMenu } from "./navigation/MobileMenu";
import { NavButton } from "./navigation/NavButton";
import { MobileMenuToggle } from "./navigation/MobileMenuToggle";
import { useScrollEffect } from "@/hooks/useScrollEffect";
import { useAuth } from "@/context/auth";

export const Navigation = () => {
  const isScrolled = useScrollEffect(10);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleWaitlistClick = () => {
    navigate('/join-waitlist');
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleEmmaIngredientsClick = () => {
    if (user) {
      navigate('/emma-ingredients');
    } else {
      // Redirect to auth page with intended destination
      navigate('/auth', { state: { from: '/emma-ingredients' } });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "brutal-nav border-b-4 border-brutal-black shadow-md" : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Center links */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-8 font-mono uppercase text-sm">
                <a href="/" className="text-brutal-black hover:text-brutal-pink transition-colors">
                  Emma Pricing
                </a>
                <a 
                  href="/emma-ingredients" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleEmmaIngredientsClick();
                  }}
                  className="text-brutal-black hover:text-brutal-pink transition-colors"
                >
                  Emma Ingredients
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
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

            <div className="md:hidden">
              <MobileMenuToggle onClick={() => setIsMobileMenuOpen(true)} />
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        scrollToSection={scrollToSection} 
        handleWaitlistClick={handleWaitlistClick} 
        showDashboard={!!user}
        handleDashboardClick={handleDashboardClick}
        handleLoginClick={handleLoginClick}
        handleEmmaIngredientsClick={handleEmmaIngredientsClick}
        onClose={closeMobileMenu}
      />
    </>
  );
};
