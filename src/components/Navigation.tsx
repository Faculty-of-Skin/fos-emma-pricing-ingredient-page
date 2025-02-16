
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-spa-charcoal text-xl font-semibold">SpaSense</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-spa-charcoal hover:text-spa-stone transition-colors">
              How It Works
            </a>
            <a href="#benefits" className="text-spa-charcoal hover:text-spa-stone transition-colors">
              Benefits
            </a>
            <a href="#pricing" className="text-spa-charcoal hover:text-spa-stone transition-colors">
              Pricing
            </a>
            <Button 
              variant="default" 
              className="bg-spa-charcoal hover:bg-spa-stone text-white"
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
          <div className="md:hidden py-4 animate-fade-down">
            <a
              href="#how-it-works"
              className="block py-2 text-spa-charcoal hover:text-spa-stone transition-colors"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="block py-2 text-spa-charcoal hover:text-spa-stone transition-colors"
            >
              Benefits
            </a>
            <a
              href="#pricing"
              className="block py-2 text-spa-charcoal hover:text-spa-stone transition-colors"
            >
              Pricing
            </a>
            <Button
              variant="default"
              className="w-full mt-4 bg-spa-charcoal hover:bg-spa-stone text-white"
              onClick={handleWaitlistClick}
            >
              Join Waitlist
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
