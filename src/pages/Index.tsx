
import { Navigation } from "@/components/Navigation";
import { CurrencySelector } from "@/components/emma/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const { formatPrice, setCurrency } = useCurrency();
  const navigate = useNavigate();

  // Set default currency to EUR when page loads
  useEffect(() => {
    setCurrency("EUR");
  }, [setCurrency]);

  const handleLoginClick = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brutal-black mb-4 font-mono uppercase tracking-tight">
            Faculty of Skin
          </h1>
          <p className="text-lg text-brutal-charcoal font-mono uppercase tracking-wide mb-8 max-w-3xl mx-auto">
            Discover the Future of Personalized Skincare with Our Emma Machine
          </p>
          <div className="flex justify-center mt-6">
            <CurrencySelector />
          </div>
        </div>
      </div>
      
      {/* Pricing Overview Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="brutal-card mb-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Pricing Overview</h2>
              <p className="text-brutal-charcoal font-mono mt-3 max-w-3xl mx-auto">
                Explore competitive pricing in Euros, tailored to enhance your beauty business. Our transparent pricing ensures you know exactly what you're investing in, helping you make informed decisions for your clients and your business.
              </p>
            </div>
            <Separator className="my-6 bg-brutal-black/20" />
          </div>
        </div>
      </section>

      {/* Equipment Section */}
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
                  <p className="text-xl font-bold mb-2 font-mono">{formatPrice(1150)}</p>
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
                  <p className="text-xl font-bold mb-2 font-mono">{formatPrice(14)}</p>
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
                  <p className="text-xl font-bold mb-2 font-mono">{formatPrice(150)}</p>
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
                  <p className="text-xl font-bold mb-2 font-mono">{formatPrice(621)}</p>
                  <CardDescription className="font-mono">
                    An advanced diagnostic tool that enhances treatment personalization and effectiveness.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Reusable/Refillable Bottles Section */}
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

      {/* Capsules Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="brutal-card mb-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Capsules</h2>
              <p className="text-brutal-charcoal font-mono mt-2">
                Experience superior quality and innovation with each treatment. Perfectly portioned for efficiency and effectiveness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="border-2 border-brutal-black">
                <CardHeader>
                  <CardTitle className="font-mono text-brutal-black">Texture Capsules</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold mb-2 font-mono">{formatPrice(5.86)}</p>
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
                  <p className="text-xl font-bold mb-2 font-mono">{formatPrice(5.56)}</p>
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
                  <p className="text-xl font-bold mb-2 font-mono">{formatPrice(3.38)}</p>
                  <CardDescription className="font-mono">
                    Average price per capsule
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-brutal-charcoal font-mono mt-6">
              Each capsule is formulated with premium ingredients, ensuring high efficacy and client satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Complete Treatment Set */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="brutal-card mb-10 bg-brutal-white/60 border-2 border-brutal-black p-8">
            <div className="text-center">
              <h2 className="text-2xl font-black text-brutal-black font-mono uppercase mb-4">Complete Treatment Set</h2>
              <p className="text-brutal-charcoal font-mono mb-3">
                Includes: One Texture Capsule, One Active Capsule, One Perfume Capsule, and One Reusable Bottle
              </p>
              <p className="text-2xl font-bold font-mono text-brutal-black">{formatPrice(19.80)}</p>
              <p className="text-brutal-charcoal font-mono mt-2">Beauty Institute Price</p>
            </div>
          </div>
        </div>
      </section>

      {/* Unlock Full Pricing */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="brutal-card mb-10 bg-brutal-black text-brutal-white p-8">
            <div className="text-center">
              <h2 className="text-2xl font-black font-mono uppercase mb-4">Unlock Full Pricing Details</h2>
              <p className="font-mono mb-6 max-w-2xl mx-auto">
                For comprehensive pricing information, including exclusive rates for importers and distributors, please Log In.
                Detailed insights into cost structures and bulk purchasing options are available upon login.
              </p>
              <Button 
                onClick={handleLoginClick}
                className="bg-brutal-white text-brutal-black hover:bg-brutal-gray border-2 border-brutal-white hover:border-brutal-gray font-mono uppercase"
              >
                Log In Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="brutal-card mb-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Why Choose Us?</h2>
              <p className="text-brutal-charcoal font-mono mt-3 max-w-3xl mx-auto">
                At Faculty of Skin, we commit to providing you with not just products, but solutions that enhance both operational efficiency and client satisfaction. Equip your business with the Emma machine and see the difference in customization and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
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
    </div>
  );
};

export default Index;
