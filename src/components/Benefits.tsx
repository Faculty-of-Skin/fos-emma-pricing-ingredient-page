
import { Check, Square, Triangle, Circle } from "lucide-react";

export const Benefits = () => {
  const benefits = [
    "Fewer No-Shows, More Bookings – Automated reminders reduce cancellations.",
    "Higher Retail Sales – AI suggests products based on treatments.",
    "Save 5+ Hours a Week – AI handles client inquiries, bookings, and follow-ups.",
    "Stronger Online Reputation – Automated review collection boosts rankings.",
    "Seamless Integration – Works with Mindbody, Phorest, Fresha, and other platforms.",
  ];

  return (
    <section id="benefits" className="py-24 bg-white relative">
      {/* Geometric Pattern Decorations */}
      <div className="absolute top-10 right-10 -rotate-12">
        <Triangle className="w-16 h-16 text-brutal-black" fill="currentColor" strokeWidth={4} />
      </div>
      <div className="absolute bottom-10 left-10 rotate-45">
        <Square className="w-24 h-24 text-brutal-black" fill="none" strokeWidth={4} />
      </div>
      <div className="absolute top-1/2 right-20 transform -translate-y-1/2">
        <Circle className="w-20 h-20 text-brutal-black" fill="none" strokeWidth={4} />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-brutal-black text-center mb-12 font-mono uppercase relative">
            Why Spas Love SpaSense
            <div className="absolute -right-8 top-0">
              <Square className="w-8 h-8 text-brutal-black rotate-12" fill="currentColor" />
            </div>
          </h2>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="brutal-card flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-brutal-black rounded-none flex items-center justify-center">
                  <Check className="w-4 h-4 text-brutal-white" />
                </div>
                <p className="text-lg text-brutal-black">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center relative">
            <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
              <Triangle className="w-10 h-10 text-brutal-black" fill="none" strokeWidth={4} />
            </div>
            <button
              className="brutal-button"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform', '_blank')}
            >
              Get Early Access – Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
