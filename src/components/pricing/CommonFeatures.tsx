
import { Check } from "lucide-react";

interface CommonFeaturesProps {
  features: string[];
}

export const CommonFeatures = ({ features }: CommonFeaturesProps) => {
  return (
    <div className="text-center mb-8">
      <h3 className="text-2xl font-black text-brutal-black mb-6 font-mono uppercase tracking-tight">
        All Plans Include:
      </h3>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center justify-center gap-3">
            <Check className="w-5 h-5 text-brutal-black" />
            <span className="text-brutal-charcoal font-mono uppercase text-sm tracking-wide">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
