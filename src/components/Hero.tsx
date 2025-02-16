
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

          <div className="pt-24 grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center opacity-70">
            <img src="/placeholder.svg" alt="Integration 1" className="h-8 w-auto mx-auto" />
            <img src="/placeholder.svg" alt="Integration 2" className="h-8 w-auto mx-auto" />
            <img src="/placeholder.svg" alt="Integration 3" className="h-8 w-auto mx-auto" />
            <img src="/placeholder.svg" alt="Integration 4" className="h-8 w-auto mx-auto" />
            <img src="/placeholder.svg" alt="Integration 5" className="h-8 w-auto mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};
