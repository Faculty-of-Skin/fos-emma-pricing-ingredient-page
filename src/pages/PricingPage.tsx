
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Check } from "lucide-react";

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(true);
  const navigate = useNavigate();
  
  const handleWaitlistClick = () => {
    navigate('/join-waitlist');
  };

  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Basic functionality for small spas",
      features: [
        "AI Chatbot with Basic Client Questions",
        "Simple Appointment Scheduling",
        "1 User Account"
      ],
      cta: "Start Free",
      highlight: false
    },
    {
      name: "Essentials",
      price: 49,
      description: "Essential tools for growing spas",
      features: [
        "Advanced AI Chatbot & Communication",
        "Automated Appointment Scheduling",
        "Client Profile Management",
        "Reduced No-Shows with Smart Reminders",
        "Up to 3 User Accounts"
      ],
      cta: "Join Waitlist",
      highlight: false
    },
    {
      name: "Professional",
      price: 99,
      description: "Complete solution for busy spas",
      features: [
        "Everything in Essentials, plus:",
        "Smart Upselling & Cross-Selling",
        "Automated Review Collection",
        "Client Retention Analytics",
        "Marketing Campaign Integration",
        "Unlimited User Accounts"
      ],
      cta: "Join Waitlist",
      highlight: true
    },
    {
      name: "Enterprise",
      price: 199,
      description: "Custom solutions for multi-location spas",
      features: [
        "Everything in Professional, plus:",
        "Multi-Location Management",
        "Custom AI Training & Branding",
        "Advanced Analytics & Reporting",
        "Dedicated Account Manager",
        "Priority Support"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  const calculateYearlyPrice = (price: number) => {
    return price === 0 ? 0 : Math.round(price * 0.8);
  };

  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brutal-black mb-4 font-mono uppercase tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-brutal-charcoal mb-8 font-mono">
            Choose the perfect plan for your spa's needs
          </p>
          
          {/* Pricing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 bg-brutal-white border-4 border-brutal-black">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 font-mono uppercase text-sm font-bold transition-colors ${
                !isYearly ? 'bg-brutal-black text-brutal-white' : 'text-brutal-black'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 font-mono uppercase text-sm font-bold transition-colors ${
                isYearly ? 'bg-brutal-black text-brutal-white' : 'text-brutal-black'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-brutal-pink px-2 py-1">20% OFF</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white p-6 rounded-xl border-4 border-brutal-black ${
                plan.highlight ? 'transform -translate-y-4 border-brutal-pink shadow-xl' : ''
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brutal-pink text-black px-4 py-1 font-mono uppercase border-2 border-brutal-black font-bold text-sm">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-black font-mono uppercase tracking-tight text-brutal-black mb-2">
                {plan.name}
              </h3>
              
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  ${isYearly ? calculateYearlyPrice(plan.price) : plan.price}
                </span>
                <span className="text-brutal-charcoal font-mono text-sm">
                  /month
                </span>
                {isYearly && plan.price > 0 && (
                  <div className="text-xs text-brutal-charcoal font-mono">
                    billed annually (${calculateYearlyPrice(plan.price) * 12}/year)
                  </div>
                )}
              </div>
              
              <p className="text-brutal-charcoal font-mono text-sm mb-6">
                {plan.description}
              </p>
              
              <ul className="space-y-3 mb-6 min-h-[200px]">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-brutal-black shrink-0 mt-0.5" />
                    <span className="text-sm font-mono">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={handleWaitlistClick}
                className={`w-full py-3 px-4 border-2 border-brutal-black font-mono uppercase text-sm font-bold transition-colors ${
                  plan.highlight 
                    ? 'bg-brutal-pink hover:bg-brutal-pink/80' 
                    : 'bg-brutal-black text-brutal-white hover:bg-brutal-black/80'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-brutal-black mb-6 font-mono uppercase">
              All Plans Include:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Easy Setup & Integration",
                "Regular Feature Updates",
                "Responsive Support"
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 border-2 border-brutal-black bg-white rounded-lg">
                  <Check className="h-8 w-8 text-brutal-black mb-2" />
                  <span className="text-center font-mono text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center bg-brutal-white border-4 border-brutal-black p-8 rounded-xl">
            <h3 className="text-xl font-black font-mono uppercase mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6 text-left">
              {[
                {
                  question: "How does the free plan work?",
                  answer: "Our free plan gives you access to basic AI functionality with limited features. It's perfect for trying out the platform before committing to a paid plan."
                },
                {
                  question: "Can I upgrade or downgrade my plan anytime?",
                  answer: "Yes! You can change your plan at any time. When upgrading, you'll only pay the prorated difference for the remainder of your billing cycle."
                },
                {
                  question: "Is there a setup fee?",
                  answer: "No, there are no hidden fees. The price you see is what you pay, and setup is included in all our plans."
                }
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-brutal-black/20 pb-4">
                  <h4 className="font-bold font-mono mb-2">{faq.question}</h4>
                  <p className="text-brutal-charcoal font-mono text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-brutal-charcoal font-mono mb-6">
              Still have questions? Need a custom plan for your multi-location business?
            </p>
            <button 
              className="py-3 px-8 bg-brutal-black text-brutal-white border-2 border-brutal-black font-mono uppercase text-sm font-bold hover:bg-brutal-black/80 transition-colors"
              onClick={handleWaitlistClick}
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
