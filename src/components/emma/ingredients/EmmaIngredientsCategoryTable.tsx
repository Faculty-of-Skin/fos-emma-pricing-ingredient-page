
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmmaIngredient } from "@/hooks/useEmmaIngredients";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  fullWidth = false,
}) => {
  return (
    <Card className={cn(
      "border-4 border-brutal-black bg-brutal-white transform transition-transform hover:translate-x-1 hover:translate-y-1",
      fullWidth && "col-span-1 md:col-span-2"
    )}>
      <CardHeader className="border-b-4 border-brutal-black px-4 py-3">
        <CardTitle className="text-lg font-mono uppercase tracking-wider text-brutal-black">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {ingredients.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b-4 border-brutal-black bg-brutal-charcoal">
                <TableHead className="w-[100px] font-mono uppercase text-brutal-white">Ref</TableHead>
                <TableHead className="font-mono uppercase text-brutal-white">Name</TableHead>
                <TableHead className="w-[100px] text-right font-mono uppercase text-brutal-white"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ingredient) => (
                <IngredientRow key={ingredient.Reference} ingredient={ingredient} />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-brutal-charcoal font-mono uppercase">
            {emptyMessage}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const IngredientRow: React.FC<{ ingredient: EmmaIngredient }> = ({ ingredient }) => {
  return (
    <React.Fragment>
      <TableRow className="hover:bg-brutal-white/80 border-b-2 border-brutal-black">
        <TableCell className="font-mono font-medium text-brutal-black">{ingredient.Reference}</TableCell>
        <TableCell className="font-mono text-brutal-black">{ingredient.Description}</TableCell>
        <TableCell className="p-0">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={ingredient.Reference} className="border-0">
              <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-brutal-charcoal hover:text-brutal-white">
                <span className="sr-only">Toggle Details</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-brutal-black transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 py-3 space-y-3 bg-brutal-white border-t-2 border-brutal-black">
                  {ingredient["INCI LIST"] && (
                    <div>
                      <h4 className="text-sm font-mono uppercase mb-1 border-b border-brutal-black pb-1 text-brutal-black">INCI List:</h4>
                      <p className="text-sm font-mono text-brutal-charcoal whitespace-pre-wrap">
                        {ingredient["INCI LIST"]}
                      </p>
                    </div>
                  )}
                  {ingredient.Properties && (
                    <div>
                      <h4 className="text-sm font-mono uppercase mb-1 border-b border-brutal-black pb-1 text-brutal-black">Properties:</h4>
                      <p className="text-sm font-mono text-brutal-charcoal whitespace-pre-wrap">
                        {ingredient.Properties}
                      </p>
                    </div>
                  )}
                  {ingredient.Category && (
                    <div>
                      <h4 className="text-sm font-mono uppercase mb-1 border-b border-brutal-black pb-1 text-brutal-black">Category:</h4>
                      <p className="text-sm font-mono text-brutal-charcoal">
                        {ingredient.Category}
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
