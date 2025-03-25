
import { Check } from "lucide-react";

interface PlanFeatureProps {
  feature: string;
}

export const PlanFeature = ({ feature }: PlanFeatureProps) => {
  return (
    <li className="flex items-start gap-3">
      <Check className="w-5 h-5 text-brutal-black shrink-0 mt-0.5" />
      <span className="text-brutal-charcoal font-mono text-sm tracking-wide">
        {feature}
      </span>
    </li>
  );
};
