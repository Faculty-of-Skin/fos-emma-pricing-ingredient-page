
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
    <section className="py-24 bg-spa-beige">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-spa-charcoal text-center mb-4">
            Who Is This For?
          </h2>
          <p className="text-xl text-spa-stone text-center mb-12">Perfect for:</p>

          <div className="grid gap-6">
            {targets.map((target, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-spa-charcoal rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-spa-charcoal mb-1">
                      {target.title}
                    </h3>
                    <p className="text-spa-stone">
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
