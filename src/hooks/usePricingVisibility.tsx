
import { useState, useEffect } from 'react';

export const usePricingVisibility = () => {
  const [isPricingVisible, setIsPricingVisible] = useState(false);
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const [isEquipmentVisible, setIsEquipmentVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      // Get all elements that contain price information
      const priceElements = document.querySelectorAll('[data-price-element="true"]');
      
      // Check if any price element is visible in viewport
      let anyPriceVisible = false;
      
      priceElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = 
          rect.top < window.innerHeight && 
          rect.bottom >= 0;
        
        if (isVisible) {
          anyPriceVisible = true;
        }
      });
      
      setIsPricingVisible(anyPriceVisible);
      
      // Check if we're at the top of the page (show currency selector regardless)
      setIsTopOfPage(window.scrollY < 100);
      
      // Check if Equipment section is visible
      const equipmentSection = document.querySelector('[data-section="equipment"]');
      if (equipmentSection) {
        const rect = equipmentSection.getBoundingClientRect();
        const isVisible = 
          rect.top < window.innerHeight && 
          rect.bottom >= 0;
        setIsEquipmentVisible(isVisible);
      }
    };

    // Initial check
    checkVisibility();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkVisibility);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  return { isPricingVisible, isTopOfPage, isEquipmentVisible };
};
