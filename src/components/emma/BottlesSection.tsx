
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const BottlesSection = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Reusable/Refillable Bottles</h2>
            <p className="text-brutal-charcoal font-mono mt-2">
              Dedicated to Sustainability and Efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-8">
            <Card className="border-2 border-brutal-black">
              <CardHeader>
                <CardTitle className="font-mono text-brutal-black">Sustainable Bottles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-2 font-mono">Price not specified</p>
                <CardDescription className="font-mono">
                  Our reusable and refillable bottles are designed to minimize waste and maximize efficiency. Each bottle is crafted to be used multiple times, ensuring that your investment goes further while supporting environmental sustainability.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
