
import { TreatmentItemCard } from "./TreatmentItemCard";
import { TREATMENT_SET_PRICES } from "./constants";

interface TreatmentItemsGridProps {
  textureCount: number;
  setTextureCount: (count: number) => void;
  activeCount: number;
  setActiveCount: (count: number) => void;
  perfumeCount: number;
  setPerfumeCount: (count: number) => void;
  bottleCount: number;
  setBottleCount: (count: number) => void;
}

export const TreatmentItemsGrid = ({
  textureCount,
  setTextureCount,
  activeCount,
  setActiveCount,
  perfumeCount,
  setPerfumeCount,
  bottleCount,
  setBottleCount,
}: TreatmentItemsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <TreatmentItemCard
        title="Texture Capsules"
        priceInEUR={TREATMENT_SET_PRICES.texture}
        count={textureCount}
        onCountChange={setTextureCount}
        options={[1]}
        disabled={true}
        isRequired={true}
      />

      <TreatmentItemCard
        title="Active Capsules"
        priceInEUR={TREATMENT_SET_PRICES.active}
        count={activeCount}
        onCountChange={setActiveCount}
        options={[0, 1, 2]}
      />

      <TreatmentItemCard
        title="Perfume Capsules"
        priceInEUR={TREATMENT_SET_PRICES.perfume}
        count={perfumeCount}
        onCountChange={setPerfumeCount}
        options={[0, 1]}
      />

      <TreatmentItemCard
        title="Reusable Bottles"
        priceInEUR={TREATMENT_SET_PRICES.bottle}
        count={bottleCount}
        onCountChange={setBottleCount}
        options={[0, 1]}
      />
    </div>
  );
};
