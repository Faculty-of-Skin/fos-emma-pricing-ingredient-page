
import { useState, useEffect } from "react";

export const useDebounce = (callback: Function, delay: number) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedFn = (...args: any[]) => {
    if (timer) clearTimeout(timer);
    
    return new Promise((resolve) => {
      const newTimer = setTimeout(async () => {
        try {
          const result = await callback(...args);
          resolve(result);
        } catch (error) {
          resolve(error);
        }
      }, delay);
      
      setTimer(newTimer);
    });
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return debouncedFn;
};
