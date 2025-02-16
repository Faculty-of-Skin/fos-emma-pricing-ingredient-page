
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center bg-spa-beige pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          <div className="inline-block px-4 py-1.5 bg-white rounded-full text-sm text-spa-charcoal mb-6">
            ✨ Limited Time: Join Our Pilot Program
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-spa-charcoal leading-tight">
              The AI Assistant
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-spa-charcoal/80 leading-tight">
              For Your Spa Business
            </h1>
          </div>
          
          <p className="text-xl text-spa-stone max-w-2xl mx-auto">
            Boost retail sales, reduce no-shows, automate client interactions, and enhance your reputation.
          </p>

          <div className="max-w-xl mx-auto bg-white rounded-full shadow-lg p-2 flex items-center mt-12">
            <Button
              size="lg"
              className="bg-spa-charcoal hover:bg-spa-stone text-white w-full h-12 rounded-full font-medium text-base group"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform', '_blank')}
            >
              Join Waitlist
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="text-center mt-20">
            <p className="text-spa-stone text-sm uppercase tracking-wider mb-8">
              Works with your favorite spa software
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center justify-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <img 
                  src="/lovable-uploads/44cb127a-3102-4e33-bf98-e24271681e14.png" 
                  alt="Vagaro" 
                  className="h-12 w-auto opacity-70 hover:opacity-100" 
                />
              </div>
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <img 
                  src="/lovable-uploads/d4ffa129-b0aa-44e7-a687-b046e9eecd59.png" 
                  alt="MINDBODY" 
                  className="h-8 w-auto opacity-70 hover:opacity-100" 
                />
              </div>
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <img 
                  src="/lovable-uploads/a79d8272-2c27-4c85-9074-5b475398b218.png" 
                  alt="Mangomint" 
                  className="h-16 w-auto opacity-70 hover:opacity-100" 
                />
              </div>
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <img 
                  src="/lovable-uploads/2e8d7e13-e806-49be-af90-ea8c2af91109.png" 
                  alt="Fresha" 
                  className="h-8 w-auto opacity-70 hover:opacity-100" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
