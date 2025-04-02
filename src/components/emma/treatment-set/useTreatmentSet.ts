
import { useState } from "react";
import { TREATMENT_SET_PRICES } from "./constants";

export const useTreatmentSet = () => {
  const [textureCount, setTextureCount] = useState(1); // Always at least 1
  const [activeCount, setActiveCount] = useState(1);
  const [perfumeCount, setPerfumeCount] = useState(1);
  const [bottleCount, setBottleCount] = useState(1);

  // Calculate the total price based on selected quantities
  const calculateTotalPrice = (): number => {
    const texturePrice = TREATMENT_SET_PRICES.texture * textureCount;
    const activePrice = TREATMENT_SET_PRICES.active * activeCount;
    const perfumePrice = TREATMENT_SET_PRICES.perfume * perfumeCount;
    const bottlePrice = TREATMENT_SET_PRICES.bottle * bottleCount;
    
    return texturePrice + activePrice + perfumePrice + bottlePrice;
  };

  const totalPrice = calculateTotalPrice();

  return {
    textureCount,
    setTextureCount,
    activeCount,
    setActiveCount,
    perfumeCount,
    setPerfumeCount,
    bottleCount,
    setBottleCount,
    totalPrice,
  };
};
