
export interface Plan {
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export const pricingPlans: Plan[] = [
  {
    name: "Free Plan",
    monthlyPrice: 0,
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
    monthlyPrice: 49,
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
    monthlyPrice: 99,
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
    monthlyPrice: 199,
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

export const commonFeatures = [
  "Easy integration with existing booking systems",
  "Mobile-friendly AI assistant for 24/7 client engagement",
  "Ongoing updates & support"
];
