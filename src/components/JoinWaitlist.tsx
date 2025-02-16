
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
      quote: "This AI assistant has transformed how we engage with clients. Our retail sales have increased by 25%!",
      author: "Sarah J.",
      role: "Day Spa Owner"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-spa-stone font-medium mb-4">
              100+ spa owners have already signed up—don't miss out!
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-spa-charcoal">
              Join the waitlist today!
            </h2>
          </div>

          {/* Testimonial Section */}
          <div className="mb-12 bg-spa-beige rounded-lg p-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg text-spa-charcoal italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="text-spa-stone">
                  <span className="font-semibold">{testimonial.author}</span>
                  <span className="mx-2">·</span>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
          
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
            className="bg-spa-charcoal hover:bg-spa-stone text-white min-w-[250px] mb-12"
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform', '_blank')}
          >
            Join the Pilot Program – Apply Now
          </Button>

          {/* Booking Platforms Section */}
          <div className="border-t border-spa-stone/20 pt-12">
            <p className="text-sm text-spa-stone mb-6">
              Integrates seamlessly with leading booking platforms
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {bookingPlatforms.map((platform, index) => (
                <div 
                  key={index}
                  className="text-spa-stone font-medium"
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
