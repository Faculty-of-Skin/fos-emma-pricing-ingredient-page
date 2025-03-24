
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWaitlistClick = () => {
    navigate('/join-waitlist');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "brutal-nav" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-brutal-black text-xl font-bold font-mono uppercase">Spa Sense</span>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
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
          </div>

          <div className="hidden md:flex items-center">
            <button 
              className="brutal-button"
              onClick={handleWaitlistClick}
            >
              Join Waitlist
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brutal-black p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
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
        )}
      </div>
    </nav>
  );
};
