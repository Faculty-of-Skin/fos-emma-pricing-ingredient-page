
import { AlertTriangle } from "lucide-react";

interface ProductsSummaryProps {
  count: number;
  categoryFilter: string;
  searchQuery: string;
  isUsingFallbackData?: boolean;
}

export const ProductsSummary = ({ count, categoryFilter, searchQuery, isUsingFallbackData = false }: ProductsSummaryProps) => {
  const isFiltered = categoryFilter !== "all" || searchQuery !== "";

  return (
    <div className="mt-6 p-4 border border-brutal-gray/20 rounded-md bg-brutal-white/50">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm text-brutal-gray">
            {count === 0
              ? "No products found"
              : `Showing ${count} product${count !== 1 ? "s" : ""}`}
            {isFiltered && (
              <span>
                {categoryFilter !== "all" ? ` in category "${categoryFilter}"` : ""}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
            )}
          </p>
          {isUsingFallbackData && (
            <p className="text-xs flex items-center gap-1 text-yellow-700 mt-1">
              <AlertTriangle className="h-3 w-3" /> 
              Sample data is being displayed due to database connectivity issues
            </p>
          )}
        </div>
        <div className="text-sm text-right text-brutal-gray">
          {count > 0 && (
            <span>
              Last updated: {new Date().toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
