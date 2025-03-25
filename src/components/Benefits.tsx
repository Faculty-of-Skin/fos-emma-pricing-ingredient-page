
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Benefits = () => {
  const navigate = useNavigate();
  
  const benefits = [
    "Fewer No-Shows, More Bookings – Automated reminders reduce cancellations.",
    "Higher Retail Sales – AI suggests products based on treatments.",
    "Save 5+ Hours a Week – AI handles client inquiries, bookings, and follow-ups.",
    "Stronger Online Reputation – Automated review collection boosts rankings.",
    "Seamless Integration – Works with Mindbody, Phorest, Fresha, and other platforms.",
  ];

  const handleWaitlistClick = () => {
    navigate('/join-waitlist');
  };

  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-brutal-black text-center mb-12 font-mono uppercase">
            Why Spas Love SpaSense
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

          <div className="mt-12 text-center">
            <button
              className="brutal-button"
              onClick={handleWaitlistClick}
            >
              Get Early Access – Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
