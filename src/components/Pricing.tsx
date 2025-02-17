
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Pricing = () => {
  const plans = [
    {
      name: "Free Plan",
      price: "$0",
      description: "Get started with AI automation at no cost!",
      features: [
        "Limited access to AI chatbot & automated booking",
        "Basic FAQ handling",
        "Feature Limitations Apply"
      ],
      cta: "Try for Free",
      highlight: false
    },
    {
      name: "Basic Plan",
      price: "$49",
      description: "AI Automation for Daily Spa Operations",
      features: [
        "AI Chatbot – Handles common client questions 24/7",
        "Automated Booking – Clients schedule seamlessly via chat",
        "FAQ Handling – No more repetitive inquiries"
      ],
      cta: "Start with Basic",
      highlight: false
    },
    {
      name: "Standard Plan",
      price: "$99",
      description: "Increase Revenue & Reduce No-Shows",
      features: [
        "Everything in Basic, PLUS:",
        "No-Show Prediction & Automated Reminders",
        "AI-Powered Upselling – Smart recommendations"
      ],
      cta: "Grow with Standard",
      highlight: true
    },
    {
      name: "Premium Plan",
      price: "$199",
      description: "For Spas Focused on Reputation & Growth",
      features: [
        "Everything in Standard, PLUS:",
        "Reputation Management – AI follows up for reviews",
        "AI-Driven Marketing Insights for client retention"
      ],
      cta: "Go Premium",
      highlight: false
    }
  ];

  const commonFeatures = [
    "Easy integration with existing booking systems",
    "Mobile-friendly AI assistant for 24/7 client engagement",
    "Ongoing updates & support"
  ];

  return (
    <section id="pricing" className="py-24 bg-brutal-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brutal-black mb-4 font-mono uppercase">
            Pricing Plans – Flexible & Scalable
          </h2>
          <p className="text-brutal-charcoal font-mono">
            Choose a plan that fits your spa's needs. Start with a free trial and upgrade as you grow!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`brutal-card ${
                plan.highlight 
                  ? 'transform -translate-y-4 border-8 pt-8' 
                  : ''
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-brutal-black text-brutal-white px-4 py-1 font-mono uppercase border-4 border-brutal-black">
                  Most Popular
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-brutal-black font-mono uppercase">
                    {plan.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-brutal-black">{plan.price}</span>
                    <span className="text-brutal-charcoal">/month per location</span>
                  </div>
                  <p className="mt-4 text-brutal-charcoal">
                    {plan.description}
                  </p>
                </div>
                <div className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-brutal-black shrink-0 mt-0.5" />
                        <span className="text-brutal-charcoal text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <button 
                    className="brutal-button w-full"
                    onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform', '_blank')}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-brutal-black mb-4 font-mono uppercase">
              All Plans Include:
            </h3>
            <ul className="space-y-3">
              {commonFeatures.map((feature, index) => (
                <li key={index} className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5 text-brutal-black" />
                  <span className="text-brutal-charcoal">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <p className="text-brutal-charcoal mb-6">Start Free & Upgrade Anytime!</p>
            <button 
              className="brutal-button min-w-[250px]"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform', '_blank')}
            >
              Join the waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
