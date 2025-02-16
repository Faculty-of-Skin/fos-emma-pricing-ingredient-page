
import { Check } from "lucide-react";

export const TargetAudience = () => {
  const targets = [
    {
      title: "Day Spas & Medical Aesthetic Clinics",
      description: "Optimize client engagement."
    },
    {
      title: "Massage Therapy Centers",
      description: "Automate bookings & reduce no-shows."
    },
    {
      title: "Beauty & Wellness Studios",
      description: "Improve retail sales with AI-driven upselling."
    }
  ];

  return (
    <section className="py-24 bg-brutal-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-brutal-black text-center mb-4 font-mono uppercase">
            Who Is This For?
          </h2>
          <p className="text-xl text-brutal-charcoal text-center mb-12 font-mono">
            Perfect for:
          </p>

          <div className="grid gap-6">
            {targets.map((target, index) => (
              <div 
                key={index}
                className="brutal-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-brutal-black flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-brutal-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brutal-black mb-1 font-mono">
                      {target.title}
                    </h3>
                    <p className="text-brutal-charcoal">
                      {target.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
