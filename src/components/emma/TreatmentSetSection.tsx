
import { useCurrency } from "@/context/CurrencyContext";

export const TreatmentSetSection = () => {
  const { formatPrice, convertPrice } = useCurrency();
  
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-6 bg-brutal-white/60 border-2 border-brutal-black p-6">
          <div className="text-center">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase mb-3">Complete Treatment Set</h2>
            <p className="text-brutal-charcoal font-mono mb-2">
              Includes: One Texture Capsule, One Active Capsule, One Perfume Capsule, and One Reusable Bottle
            </p>
            <p className="text-2xl font-bold font-mono text-brutal-black">{formatPrice(convertPrice(19.80))}</p>
            <p className="text-brutal-charcoal font-mono mt-1">Beauty Institute Price</p>
          </div>
        </div>
      </div>
    </section>
  );
};
