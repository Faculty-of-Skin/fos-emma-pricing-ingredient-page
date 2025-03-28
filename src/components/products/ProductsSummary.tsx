
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
  return (
    <div className="mt-6 text-center text-brutal-gray">
      <p>
        {count} {count === 1 ? 'product' : 'products'} 
        {categoryFilter !== "all" ? ` in ${categoryFilter}` : ''}
        {searchQuery ? ` matching "${searchQuery}"` : ''}
      </p>
    </div>
  );
};
