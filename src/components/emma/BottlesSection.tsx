import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrency } from "@/context/CurrencyContext";

export const BottlesSection = () => {
  const { convertPrice, formatPrice } = useCurrency();
  const bottlePrice = convertPrice(5); // Price in EUR

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Reusable/Refillable Bottles</h2>
            <p className="text-brutal-charcoal font-mono mt-2">
              Dedicated to Sustainability and Operational Efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-6">
            <Card className="border-2 border-brutal-black">
              <CardHeader>
                <CardTitle className="font-mono text-brutal-black">Sustainable Bottles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-2 font-mono">Beauty Institute Price: {formatPrice(bottlePrice)} each</p>
                <CardDescription className="font-mono">
                  Embrace sustainability without compromising on quality with our reusable and refillable bottles. 
                  Designed for multiple uses, these bottles reduce environmental impact and help to lower operational 
                  costs by minimizing waste. Ideal for beauty institutes looking to enhance their eco-friendly practices, 
                  each bottle is crafted to complement our treatments, ensuring that your investment not only saves on 
                  expenses over time but also supports environmental sustainability.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
