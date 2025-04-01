
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EmmaIngredient } from "@/types/emmaIngredients";
import { ChevronDown, ChevronUp } from "lucide-react";

interface EmmaIngredientsCategoryTableProps {
  title: string;
  ingredients: EmmaIngredient[];
  emptyMessage: string;
  fullWidth?: boolean;
}

export const EmmaIngredientsCategoryTable: React.FC<EmmaIngredientsCategoryTableProps> = ({
  title,
  ingredients,
  emptyMessage,
  fullWidth = false
}) => {
  const [expandedIngredient, setExpandedIngredient] = React.useState<string | null>(null);

  const toggleIngredient = (reference: string) => {
    if (expandedIngredient === reference) {
      setExpandedIngredient(null);
    } else {
      setExpandedIngredient(reference);
    }
  };

  return (
    <Card className={`shadow-sm ${fullWidth ? 'col-span-full' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>
          {ingredients.length} {ingredients.length === 1 ? 'ingredient' : 'ingredients'} available
        </CardDescription>
      </CardHeader>
      <CardContent>
        {ingredients.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Reference</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ingredients.map((ingredient) => (
                  <React.Fragment key={ingredient.Reference}>
                    <TableRow className="hover:bg-muted/50">
                      <TableHead className="font-medium">{ingredient.Reference}</TableHead>
                      <TableHead>{ingredient.Description}</TableHead>
                      <TableHead className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleIngredient(ingredient.Reference)}
                          className="h-8 w-8 p-0"
                        >
                          {expandedIngredient === ingredient.Reference ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </TableHead>
                    </TableRow>
                    {expandedIngredient === ingredient.Reference && (
                      <TableRow>
                        <TableHead colSpan={3} className="bg-muted/30 p-4">
                          <div className="space-y-2 py-2">
                            <div>
                              <span className="font-medium">Category:</span>{" "}
                              {ingredient.Category || "N/A"}
                            </div>
                            {ingredient["INCI LIST"] && (
                              <div>
                                <span className="font-medium">INCI List:</span>{" "}
                                {ingredient["INCI LIST"]}
                              </div>
                            )}
                            {ingredient["FRAGRANCE NOTES"] && (
                              <div>
                                <span className="font-medium">Fragrance Notes:</span>{" "}
                                {ingredient["FRAGRANCE NOTES"]}
                              </div>
                            )}
                            {ingredient["Full Description"] && (
                              <div>
                                <span className="font-medium">Full Description:</span>{" "}
                                {ingredient["Full Description"]}
                              </div>
                            )}
                            {ingredient.Benefit && (
                              <div>
                                <span className="font-medium">Benefit:</span>{" "}
                                {ingredient.Benefit}
                              </div>
                            )}
                            {ingredient.Texture && (
                              <div>
                                <span className="font-medium">Texture:</span>{" "}
                                {ingredient.Texture}
                              </div>
                            )}
                          </div>
                        </TableHead>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
