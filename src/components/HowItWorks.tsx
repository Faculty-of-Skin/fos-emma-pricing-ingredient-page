
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
          <h2 className="text-4xl md:text-5xl font-black text-brutal-black mb-4 font-mono uppercase tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-brutal-charcoal font-mono uppercase tracking-wide">
            Our AI-powered platform streamlines your spa operations in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="brutal-card hover:bg-spa-cream transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-white rounded-none border-4 border-brutal-black flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-brutal-black" />
              </div>
              <h3 className="text-2xl font-black text-brutal-black mb-4 font-mono uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-brutal-charcoal font-mono tracking-wide">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
