
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const ContactSection = () => {
  return (
    <section className="py-8 mb-16">
      <div className="container mx-auto px-4">
        <div className="brutal-card">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Contact Us</h2>
            <p className="text-brutal-charcoal font-mono mt-3">
              Have questions? Our dedicated team is here to assist you with all your queries.
            </p>
            <div className="flex justify-center mt-6 gap-4">
              <Button className="bg-brutal-black text-brutal-white hover:bg-brutal-charcoal font-mono uppercase">
                Contact Us
              </Button>
              <Button variant="outline" className="border-2 border-brutal-black text-brutal-black hover:bg-brutal-black/5 font-mono uppercase">
                View FAQ
              </Button>
            </div>
          </div>
          
          <div className="mt-6 flex items-start gap-2 text-sm text-brutal-charcoal justify-center">
            <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="font-mono max-w-2xl">
              Pricing is provided based on the selected currency. Contact us for detailed specifications and bulk order inquiries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
