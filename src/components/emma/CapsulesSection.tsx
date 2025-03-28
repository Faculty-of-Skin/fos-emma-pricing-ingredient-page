import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrency } from "@/context/CurrencyContext";

export const CapsulesSection = () => {
  const { formatPrice, convertPrice } = useCurrency();
  
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Capsules</h2>
            <p className="text-brutal-charcoal font-mono mt-2">
              Experience superior quality and innovation with each treatment. Perfectly portioned for efficiency and effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="border-2 border-brutal-black">
              <CardHeader>
                <CardTitle className="font-mono text-brutal-black">Texture Capsules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-2 font-mono">{formatPrice(convertPrice(5.86))}</p>
                <CardDescription className="font-mono">
                  Average price per capsule
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-brutal-black">
              <CardHeader>
                <CardTitle className="font-mono text-brutal-black">Active Capsules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-2 font-mono">{formatPrice(convertPrice(5.56))}</p>
                <CardDescription className="font-mono">
                  Average price per capsule
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-brutal-black">
              <CardHeader>
                <CardTitle className="font-mono text-brutal-black">Perfume Capsules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-2 font-mono">{formatPrice(convertPrice(3.38))}</p>
                <CardDescription className="font-mono">
                  Average price per capsule
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-brutal-charcoal font-mono mt-4">
            Each capsule is formulated with premium ingredients, ensuring high efficacy and client satisfaction.
          </p>
        </div>
      </div>
    </section>
  );
};
