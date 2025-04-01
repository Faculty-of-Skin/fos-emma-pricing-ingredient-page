
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
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
            <TableHead>INCI List</TableHead>
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
                <TableCell className="max-w-md truncate">
                  {ingredient["INCI LIST"]}
                </TableCell>
              </TableRow>
              {expandedIngredient === ingredient.Reference && (
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={4} className="p-4">
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
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {/* INCI List */}
        {ingredient["INCI LIST"] && (
          <AccordionItem value="inci-list">
            <AccordionTrigger className="text-base font-medium">INCI List</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient["INCI LIST"]}</p>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Ingredient Breakdown */}
        {ingredient["Ingredient Breakdown"] && (
          <AccordionItem value="ingredient-breakdown">
            <AccordionTrigger className="text-base font-medium">Ingredient Breakdown</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient["Ingredient Breakdown"]}</p>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Fragrance Notes */}
        {ingredient["FRAGRANCE NOTES"] && (
          <AccordionItem value="fragrance-notes">
            <AccordionTrigger className="text-base font-medium">Fragrance Notes</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient["FRAGRANCE NOTES"]}</p>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Texture */}
        {ingredient.Texture && (
          <AccordionItem value="texture">
            <AccordionTrigger className="text-base font-medium">Texture</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient.Texture}</p>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Benefits */}
        {ingredient.Benefit && (
          <AccordionItem value="benefits">
            <AccordionTrigger className="text-base font-medium">Benefits</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient.Benefit}</p>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Full Description */}
        {ingredient["Full Description"] && (
          <AccordionItem value="full-description">
            <AccordionTrigger className="text-base font-medium">Full Description</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient["Full Description"]}</p>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Final Consumer */}
        {ingredient["Final consumer"] && (
          <AccordionItem value="final-consumer">
            <AccordionTrigger className="text-base font-medium">Final Consumer</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient["Final consumer"]}</p>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};
