
import { useTreatmentSet } from "./treatment-set/useTreatmentSet";
import { TreatmentItemsGrid } from "./treatment-set/TreatmentItemsGrid";
import { TreatmentSummary } from "./treatment-set/TreatmentSummary";

export const TreatmentSetSection = () => {
  const {
    textureCount,
    setTextureCount,
    activeCount,
    setActiveCount,
    perfumeCount,
    setPerfumeCount,
    bottleCount,
    setBottleCount,
    totalPrice,
  } = useTreatmentSet();
  
  return (
    <section className="py-2">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-4 bg-brutal-white/60 border-2 border-brutal-black p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase mb-2">Customize Your Treatment Set</h2>
            <p className="text-brutal-charcoal font-mono mb-4">
              Select the quantities of each component to create your personalized treatment set
            </p>
          </div>
          
          <TreatmentItemsGrid
            textureCount={textureCount}
            setTextureCount={setTextureCount}
            activeCount={activeCount}
            setActiveCount={setActiveCount}
            perfumeCount={perfumeCount}
            setPerfumeCount={setPerfumeCount}
            bottleCount={bottleCount}
            setBottleCount={setBottleCount}
          />

          <TreatmentSummary
            totalPrice={totalPrice}
            textureCount={textureCount}
            activeCount={activeCount}
            perfumeCount={perfumeCount}
            bottleCount={bottleCount}
          />
        </div>
      </div>
    </section>
  );
};
