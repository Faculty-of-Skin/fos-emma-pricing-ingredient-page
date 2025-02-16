
import { CalendarDays, Sparkles, Star } from "lucide-react";

const steps = [
  {
    icon: CalendarDays,
    title: "AI Manages Appointments & Interactions",
    description: "Clients can book, reschedule, or ask FAQs via chat, SMS, or WhatsApp.",
  },
  {
    icon: Sparkles,
    title: "AI Recommends & Upsells",
    description: "SpaSense suggests treatments & retail products based on each client's booking history.",
  },
  {
    icon: Star,
    title: "AI Automates Reviews",
    description: "After appointments, AI follows up for Google & social media reviews, boosting online visibility.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-spa-charcoal mb-4">
            How It Works
          </h2>
          <p className="text-spa-stone max-w-2xl mx-auto">
            Our AI-powered platform streamlines your spa operations in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-spa-beige hover:bg-spa-cream transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <step.icon className="w-7 h-7 text-spa-charcoal" />
              </div>
              <h3 className="text-xl font-semibold text-spa-charcoal mb-3">
                {step.title}
              </h3>
              <p className="text-spa-stone">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-spa-charcoal hover:bg-spa-stone text-white min-w-[200px] group"
          >
            See How It Works
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
