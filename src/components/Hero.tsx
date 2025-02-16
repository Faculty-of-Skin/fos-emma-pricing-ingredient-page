
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center bg-spa-beige pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-up">
          <div className="inline-block px-4 py-1.5 bg-white rounded-full text-sm text-spa-charcoal mb-6">
            ✨ Limited Time: Join Our Pilot Program
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-spa-charcoal leading-tight">
            Boost Retail Sales by 15-30% While Saving 5+ Hours Per Week
          </h1>
          
          <p className="text-xl text-spa-stone max-w-2xl mx-auto">
            Simplify bookings, automate FAQs, and increase retail revenue—effortlessly with AI automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-spa-charcoal hover:bg-spa-stone text-white min-w-[200px] group"
            >
              Join the Pilot Program
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-spa-stone text-spa-stone hover:bg-spa-stone hover:text-white min-w-[200px]"
            >
              Watch Demo
            </Button>
          </div>

          <div className="pt-12 flex items-center justify-center space-x-8 text-sm text-spa-stone">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              30-Day Free Trial
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              No Credit Card Required
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
