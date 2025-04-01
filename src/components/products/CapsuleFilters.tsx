
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Filter } from "lucide-react";

type FilterOption = "all" | "texture" | "active" | "perfume";

interface CapsuleFiltersProps {
  onFilterChange: (filter: FilterOption) => void;
  activeFilter: FilterOption;
  availableTypes: FilterOption[];
}

export const CapsuleFilters = ({ 
  onFilterChange, 
  activeFilter, 
  availableTypes 
}: CapsuleFiltersProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filter by type:</span>
      </div>
      <ToggleGroup type="single" value={activeFilter} onValueChange={(value) => value && onFilterChange(value as FilterOption)}>
        <ToggleGroupItem value="all" aria-label="Show all items">
          All
        </ToggleGroupItem>
        {availableTypes.includes("texture") && (
          <ToggleGroupItem value="texture" aria-label="Show texture items">
            Texture
          </ToggleGroupItem>
        )}
        {availableTypes.includes("active") && (
          <ToggleGroupItem value="active" aria-label="Show active items">
            Active
          </ToggleGroupItem>
        )}
        {availableTypes.includes("perfume") && (
          <ToggleGroupItem value="perfume" aria-label="Show perfume items">
            Perfume
          </ToggleGroupItem>
        )}
      </ToggleGroup>
    </div>
  );
};
