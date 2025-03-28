
import { useEffect, useState } from "react";

interface ProductsSummaryProps {
  count: number;
  categoryFilter: string;
  searchQuery: string;
}

export const ProductsSummary = ({ 
  count, 
  categoryFilter, 
  searchQuery 
}: ProductsSummaryProps) => {
  // Add animation when count changes
  const [animateCount, setAnimateCount] = useState(false);
  
  useEffect(() => {
    setAnimateCount(true);
    const timer = setTimeout(() => setAnimateCount(false), 500);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="mt-6 text-center text-brutal-gray">
      <p>
        <span className={`inline-block ${animateCount ? 'scale-110 text-brutal-black font-bold transition-transform' : ''}`}>
          {count}
        </span> {count === 1 ? 'product' : 'products'} 
        {categoryFilter !== "all" ? ` in ${categoryFilter}` : ''}
        {searchQuery ? ` matching "${searchQuery}"` : ''}
      </p>
    </div>
  );
};
