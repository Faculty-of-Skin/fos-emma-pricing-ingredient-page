
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWaitlistClick = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform', '_blank');
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
      isScrolled ? "clay-nav" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-clay-forest text-xl font-bold">Spa Sense</span>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex space-x-8">
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-clay-forest hover:text-clay-sage transition-colors font-medium"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="text-clay-forest hover:text-clay-sage transition-colors font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-clay-forest hover:text-clay-sage transition-colors font-medium"
              >
                FAQ
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <button 
              className="clay-button"
              onClick={handleWaitlistClick}
            >
              Join Waitlist
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-clay-forest p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-down bg-clay-cream rounded-xl shadow-lg mt-2">
            <button
              onClick={() => scrollToSection('pricing')}
              className="block w-full text-left px-4 py-2 text-clay-forest hover:bg-clay-orange/10 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="block w-full text-left px-4 py-2 text-clay-forest hover:bg-clay-orange/10 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left px-4 py-2 text-clay-forest hover:bg-clay-orange/10 transition-colors"
            >
              FAQ
            </button>
            <div className="px-4 pt-2">
              <button
                className="clay-button w-full"
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
