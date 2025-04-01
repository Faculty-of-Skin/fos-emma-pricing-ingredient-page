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
import { FileText, List, Info, ChevronDown } from "lucide-react";

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
      {/* INCI List Section - Now Featured Prominently */}
      {ingredient["INCI LIST"] && (
        <div className="bg-white p-4 rounded-md border border-muted">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <List className="h-5 w-5" />
            <h3 className="text-lg font-medium">INCI List</h3>
          </div>
          <p className="text-sm whitespace-pre-wrap">{ingredient["INCI LIST"]}</p>
        </div>
      )}
      
      {/* Ingredient Breakdown Section - Now Featured Prominently */}
      {ingredient["Ingredient Breakdown"] && (
        <div className="bg-white p-4 rounded-md border border-muted">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <FileText className="h-5 w-5" />
            <h3 className="text-lg font-medium">Ingredient Breakdown</h3>
          </div>
          <p className="text-sm whitespace-pre-wrap">{ingredient["Ingredient Breakdown"]}</p>
        </div>
      )}
      
      {/* Other Details in Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {/* Fragrance Notes */}
        {ingredient["FRAGRANCE NOTES"] && (
          <AccordionItem value="fragrance-notes">
            <AccordionTrigger className="text-base font-medium">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Fragrance Notes
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient["FRAGRANCE NOTES"]}</p>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Texture */}
        {ingredient.Texture && (
          <AccordionItem value="texture">
            <AccordionTrigger className="text-base font-medium">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Texture
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient.Texture}</p>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Benefits */}
        {ingredient.Benefit && (
          <AccordionItem value="benefits">
            <AccordionTrigger className="text-base font-medium">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Benefits
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient.Benefit}</p>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Full Description */}
        {ingredient["Full Description"] && (
          <AccordionItem value="full-description">
            <AccordionTrigger className="text-base font-medium">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Full Description
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient["Full Description"]}</p>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {/* Final Consumer */}
        {ingredient["Final consumer"] && (
          <AccordionItem value="final-consumer">
            <AccordionTrigger className="text-base font-medium">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Final Consumer
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm whitespace-pre-wrap">{ingredient["Final consumer"]}</p>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};
