
import { useCurrency } from "@/context/CurrencyContext";

interface TreatmentSummaryProps {
  totalPrice: number;
  textureCount: number;
  activeCount: number;
  perfumeCount: number;
  bottleCount: number;
}

export const TreatmentSummary = ({
  totalPrice,
  textureCount,
  activeCount,
  perfumeCount,
  bottleCount,
}: TreatmentSummaryProps) => {
  const { formatPrice, convertPrice } = useCurrency();

  return (
    <div className="text-center mt-4 py-3 border-t-2 border-brutal-black/20">
      <p className="text-xl font-bold font-mono text-brutal-black mb-1">
        Total: {formatPrice(convertPrice(totalPrice))}
      </p>
      <p className="text-brutal-charcoal font-mono mt-1 text-sm">
        {textureCount} Texture, {activeCount} Active, {perfumeCount} Perfume, {bottleCount} Bottle
      </p>
      <p className="text-brutal-charcoal font-mono mt-3 text-sm max-w-2xl mx-auto">
        Customize your treatment set for your specific needs. Each treatment set is designed for optimal results and sustainability.
      </p>
    </div>
  );
};
