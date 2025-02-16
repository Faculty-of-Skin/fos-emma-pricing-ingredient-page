
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/10 backdrop-blur-lg border-b border-white/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-spa-charcoal text-xl font-semibold">Spa Sense</span>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex space-x-8">
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-spa-charcoal hover:text-spa-stone transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="text-spa-charcoal hover:text-spa-stone transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-spa-charcoal hover:text-spa-stone transition-colors"
              >
                FAQ
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <Button 
              variant="default" 
              className="bg-spa-charcoal/90 hover:bg-spa-stone/90 text-white backdrop-blur-sm"
              onClick={handleWaitlistClick}
            >
              Join Waitlist
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-spa-charcoal p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-down bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 mt-2">
            <button
              onClick={() => scrollToSection('pricing')}
              className="block w-full text-left px-4 py-2 text-spa-charcoal hover:bg-white/10 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="block w-full text-left px-4 py-2 text-spa-charcoal hover:bg-white/10 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left px-4 py-2 text-spa-charcoal hover:bg-white/10 transition-colors"
            >
              FAQ
            </button>
            <div className="px-4 pt-2">
              <Button
                variant="default"
                className="w-full bg-spa-charcoal/90 hover:bg-spa-stone/90 text-white backdrop-blur-sm"
                onClick={handleWaitlistClick}
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
