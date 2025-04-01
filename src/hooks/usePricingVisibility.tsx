
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
      
      // Check if Equipment section is visible or we've scrolled past it
      const equipmentSection = document.querySelector('[data-section="equipment"]');
      if (equipmentSection) {
        const rect = equipmentSection.getBoundingClientRect();
        // Only consider the equipment section visible if we've scrolled to it or past it,
        // and it's not completely off the top of the screen
        const isVisible = 
          window.scrollY >= equipmentSection.getBoundingClientRect().top + window.scrollY - window.innerHeight/2 && 
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
