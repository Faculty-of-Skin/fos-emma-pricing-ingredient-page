
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsFilterProps {
  categories: string[];
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const ProductsFilter = ({
  categories,
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery
}: ProductsFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by reference or description..."
            className="pl-8 brutal-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full sm:w-64">
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="brutal-select">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
