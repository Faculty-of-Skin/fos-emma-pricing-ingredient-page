
import { Separator } from "@/components/ui/separator";

export const PricingOverview = () => {
  return (
    <section className="py-2">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-4">
          <div className="text-center mb-3">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Pricing Overview</h2>
            <p className="text-brutal-charcoal font-mono mt-1 max-w-3xl mx-auto">
              Explore competitive pricing tailored to enhance your beauty business. Our transparent pricing ensures you know exactly what you're investing in, helping you make informed decisions for your clients and your business.
            </p>
          </div>
          <Separator className="my-3 bg-brutal-black/20" />
        </div>
      </div>
    </section>
  );
};
