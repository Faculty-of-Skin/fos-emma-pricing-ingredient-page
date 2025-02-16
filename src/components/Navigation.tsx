
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
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-[#8E9196] text-xl font-semibold">SpaSense</span>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex space-x-8">
              <a href="#pricing" className="text-[#8E9196] hover:text-[#7E69AB] transition-colors">
                Pricing
              </a>
              <a href="#benefits" className="text-[#8E9196] hover:text-[#7E69AB] transition-colors">
                Features
              </a>
              <a href="#faq" className="text-[#8E9196] hover:text-[#7E69AB] transition-colors">
                FAQ
              </a>
            </div>
          </div>

          {/* Join Waitlist Button */}
          <div className="hidden md:block">
            <Button 
              variant="default" 
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              onClick={handleWaitlistClick}
            >
              Join Waitlist
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#8E9196] p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-down bg-white/95">
            <a
              href="#pricing"
              className="block py-2 text-[#8E9196] hover:text-[#7E69AB] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#benefits"
              className="block py-2 text-[#8E9196] hover:text-[#7E69AB] transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              className="block py-2 text-[#8E9196] hover:text-[#7E69AB] transition-colors"
            >
              FAQ
            </a>
            <Button
              variant="default"
              className="w-full mt-4 bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
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
