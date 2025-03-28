
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrency } from "@/context/CurrencyContext";

export const EquipmentSection = () => {
  const { formatPrice, convertPrice } = useCurrency();
  
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Equipment</h2>
            <p className="text-brutal-charcoal font-mono mt-2">
              Equip your beauty institute with state-of-the-art technology designed to enhance the client experience and improve treatment outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border-2 border-brutal-black">
              <CardHeader>
                <CardTitle className="font-mono text-brutal-black">Emuage Machine Pack</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-2 font-mono">{formatPrice(convertPrice(1150))}</p>
                <CardDescription className="font-mono">
                  Equip your institute with the latest in skincare technology, designed for bespoke beauty experiences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-brutal-black">
              <CardHeader>
                <CardTitle className="font-mono text-brutal-black">Calibration Kit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-2 font-mono">{formatPrice(convertPrice(14))}</p>
                <CardDescription className="font-mono">
                  Essential for ensuring your equipment operates with precision and accuracy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-brutal-black">
              <CardHeader>
                <CardTitle className="font-mono text-brutal-black">Thermal Printer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-2 font-mono">{formatPrice(convertPrice(150))}</p>
                <CardDescription className="font-mono">
                  Streamline your operations with on-site printing for client treatment plans and receipts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-brutal-black">
              <CardHeader>
                <CardTitle className="font-mono text-brutal-black">Chowis DermoSmart</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-2 font-mono">{formatPrice(convertPrice(621))}</p>
                <CardDescription className="font-mono">
                  An advanced diagnostic tool that enhances treatment personalization and effectiveness.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
