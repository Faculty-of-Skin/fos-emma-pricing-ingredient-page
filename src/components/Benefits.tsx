
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Benefits = () => {
  const benefits = [
    "Fewer No-Shows, More Bookings – Automated reminders reduce cancellations.",
    "Higher Retail Sales – AI suggests products based on treatments.",
    "Save 5+ Hours a Week – AI handles client inquiries, bookings, and follow-ups.",
    "Stronger Online Reputation – Automated review collection boosts rankings.",
    "Seamless Integration – Works with Mindbody, Phorest, Fresha, and other platforms.",
  ];

  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-spa-charcoal text-center mb-12">
            Why Spas Love SpaSense
          </h2>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-spa-beige transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-spa-charcoal rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg text-spa-charcoal">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-spa-charcoal hover:bg-spa-stone text-white min-w-[250px]"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform', '_blank')}
            >
              Get Early Access – Sign Up Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
