
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";

interface EmmaIngredientsTableProps {
  ingredients: EmmaIngredient[];
  filteredIngredients: EmmaIngredient[];
  expandedIngredient: string | null;
  toggleIngredient: (reference: string) => void;
}

export const EmmaIngredientsTable: React.FC<EmmaIngredientsTableProps> = ({
  filteredIngredients,
  expandedIngredient,
  toggleIngredient,
}) => {
  return (
    <ScrollArea className="h-[600px] rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Reference</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-36">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredIngredients.map((ingredient) => (
            <React.Fragment key={ingredient.Reference}>
              <TableRow 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => toggleIngredient(ingredient.Reference)}
              >
                <TableCell className="font-medium">{ingredient.Reference}</TableCell>
                <TableCell>{ingredient.Description}</TableCell>
                <TableCell>
                  {ingredient.Category && (
                    <Badge variant="outline">{ingredient.Category}</Badge>
                  )}
                </TableCell>
              </TableRow>
              {expandedIngredient === ingredient.Reference && (
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={3} className="p-4">
                    <ExpandedIngredientDetails ingredient={ingredient} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

interface ExpandedIngredientDetailsProps {
  ingredient: EmmaIngredient;
}

const ExpandedIngredientDetails: React.FC<ExpandedIngredientDetailsProps> = ({ ingredient }) => {
  return (
    <div className="space-y-3">
      {ingredient["Ingredient Breakdown"] && (
        <div>
          <h4 className="font-semibold mb-1">Ingredient Breakdown</h4>
          <p className="text-sm">{ingredient["Ingredient Breakdown"]}</p>
        </div>
      )}
      
      {ingredient["INCI LIST"] && (
        <div>
          <h4 className="font-semibold mb-1">INCI List</h4>
          <p className="text-sm">{ingredient["INCI LIST"]}</p>
        </div>
      )}
      
      {ingredient["FRAGRANCE NOTES"] && (
        <div>
          <h4 className="font-semibold mb-1">Fragrance Notes</h4>
          <p className="text-sm">{ingredient["FRAGRANCE NOTES"]}</p>
        </div>
      )}
      
      {ingredient.Benefit && (
        <div>
          <h4 className="font-semibold mb-1">Benefits</h4>
          <p className="text-sm">{ingredient.Benefit}</p>
        </div>
      )}
      
      {ingredient.Texture && (
        <div>
          <h4 className="font-semibold mb-1">Texture</h4>
          <p className="text-sm">{ingredient.Texture}</p>
        </div>
      )}
      
      {ingredient["Full Description"] && (
        <div>
          <h4 className="font-semibold mb-1">Full Description</h4>
          <p className="text-sm">{ingredient["Full Description"]}</p>
        </div>
      )}
      
      {ingredient["Final consumer"] && (
        <div>
          <h4 className="font-semibold mb-1">Final Consumer</h4>
          <p className="text-sm">{ingredient["Final consumer"]}</p>
        </div>
      )}
    </div>
  );
};
