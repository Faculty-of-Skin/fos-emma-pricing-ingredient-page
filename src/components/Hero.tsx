
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center bg-brutal-white pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          <div className="inline-block px-4 py-1.5 bg-brutal-black text-brutal-white font-mono uppercase tracking-wider mb-6 border-4 border-brutal-black">
            <span role="text" aria-label="Special offer" className="relative">
              <span className="absolute -inset-1 bg-[#9b87f5] blur opacity-30"></span>
              ✨ Limited Time: Join Our Pilot Program
            </span>
          </div>
          
          <header className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brutal-black leading-tight font-mono uppercase relative">
              <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                The AI Assistant
              </span>
              <span className="block relative">
                <span className="absolute -inset-1 bg-[#9b87f5] blur opacity-30"></span>
                For Your Spa Business
              </span>
              <div className="absolute -right-4 -top-4 w-20 h-20 border-4 border-brutal-black rotate-12 bg-[#9b87f5] opacity-20"></div>
              <div className="absolute -left-4 -bottom-4 w-16 h-16 border-4 border-brutal-black -rotate-12 bg-[#D946EF] opacity-20"></div>
            </h1>
          </header>
          
          <p className="text-xl text-brutal-charcoal max-w-2xl mx-auto font-mono relative">
            <span className="relative z-10">
              Boost retail sales, reduce no-shows, automate client interactions, and enhance your reputation.
            </span>
            <svg className="absolute -right-8 top-0 text-[#9b87f5] opacity-20" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4"/>
            </svg>
          </p>

          <div className="max-w-xl mx-auto p-2">
            <button
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform', '_blank')}
              aria-label="Join SpaSense Waitlist"
              className="brutal-button w-full h-14 flex items-center justify-center gap-2 relative group"
            >
              <span className="relative z-10">Join Waitlist</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-[#9b87f5] opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>

          <div className="text-center mt-20">
            <p className="text-brutal-charcoal text-sm uppercase tracking-wider mb-8 font-mono">
              Works with your favorite spa software
            </p>
            <div className="brutal-card" role="list" aria-label="Supported spa software platforms">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center justify-center">
                <div className="flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/44cb127a-3102-4e33-bf98-e24271681e14.png" 
                    alt="Vagaro spa management software" 
                    className="h-12 w-auto contrast-200" 
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/d4ffa129-b0aa-44e7-a687-b046e9eecd59.png" 
                    alt="MINDBODY spa management platform" 
                    className="h-8 w-auto contrast-200" 
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/a79d8272-2c27-4c85-9074-5b475398b218.png" 
                    alt="Mangomint spa business software" 
                    className="h-16 w-auto contrast-200" 
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/2e8d7e13-e806-49be-af90-ea8c2af91109.png" 
                    alt="Fresha spa booking system" 
                    className="h-8 w-auto contrast-200" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "SpaSense",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "description": "AI-powered assistant for spa business management. Automates bookings, reduces no-shows, and increases retail sales.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "30-day free trial"
          }
        })
      }} />
    </section>
  );
};
