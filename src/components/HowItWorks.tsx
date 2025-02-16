
import { CalendarDays, MessageSquareText, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: MessageSquareText,
    title: "AI Handles Client Inquiries",
    description: "Clients book via website, SMS, or WhatsApp with our AI assistant.",
  },
  {
    icon: CalendarDays,
    title: "Reduce No-Shows",
    description: "AI sends reminders and fills cancellations automatically.",
  },
  {
    icon: TrendingUp,
    title: "Boost Sales",
    description: "AI recommends the right products after treatments.",
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
              className="p-6 rounded-2xl bg-spa-beige hover:bg-spa-cream transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
                <step.icon className="w-6 h-6 text-spa-charcoal" />
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
      </div>
    </section>
  );
};
