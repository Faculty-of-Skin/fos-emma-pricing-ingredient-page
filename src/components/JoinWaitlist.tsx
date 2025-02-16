
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const JoinWaitlist = () => {
  const benefits = [
    "30-day free trial – See the impact firsthand.",
    "Be the first to access AI-powered automation for spa businesses.",
    "Limited to 100 businesses – Apply Now!"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-spa-charcoal mb-8">
            Join the waitlist today!
          </h2>
          
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-spa-charcoal mb-6">
              Why Join?
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center gap-2 text-spa-charcoal"
                >
                  <Check className="w-5 h-5 text-spa-charcoal" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            className="bg-spa-charcoal hover:bg-spa-stone text-white min-w-[250px]"
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform', '_blank')}
          >
            Apply for Early Access
          </Button>
        </div>
      </div>
    </section>
  );
};
