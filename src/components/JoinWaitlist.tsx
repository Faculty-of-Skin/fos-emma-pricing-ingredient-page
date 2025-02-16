
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const JoinWaitlist = () => {
  const benefits = [
    "30-day free trial – See the impact firsthand.",
    "Be the first to access AI-powered automation for spa businesses.",
    "Limited to 100 businesses – Apply Now!"
  ];

  const bookingPlatforms = [
    "Mindbody",
    "Phorest",
    "Fresha"
  ];

  const testimonials = [
    {
      quote: "Spa Sense has transformed how we engage with clients. Our retail sales have increased by 25% while saving us time daily",
      author: "Sarah J.",
      role: "Day Spa Owner"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-brutal-black font-medium mb-4 font-mono">
              Spas Using AI See 15-30% More Retail Sales – Want In?
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-brutal-black font-mono uppercase">
              Join the waitlist today!
            </h2>
          </div>

          {/* Testimonial Section */}
          <div className="mb-12 brutal-card">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg text-brutal-black italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="text-brutal-charcoal">
                  <span className="font-semibold">{testimonial.author}</span>
                  <span className="mx-2">·</span>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-brutal-black mb-6 font-mono uppercase">
              Why Join?
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="brutal-card flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5 text-brutal-black" />
                  <span className="text-brutal-black">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="brutal-button mb-12"
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform', '_blank')}
          >
            Join the Pilot Program – Apply Now
          </button>

          {/* Booking Platforms Section */}
          <div className="brutal-card">
            <p className="text-sm text-brutal-black mb-6 font-mono uppercase">
              Integrates seamlessly with leading booking platforms
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {bookingPlatforms.map((platform, index) => (
                <div 
                  key={index}
                  className="text-brutal-black font-medium"
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
