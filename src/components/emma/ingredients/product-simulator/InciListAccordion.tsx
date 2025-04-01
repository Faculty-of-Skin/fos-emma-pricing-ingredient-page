
import React from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { List, Leaf, Sparkles, Droplets } from "lucide-react";
import { EmmaIngredient } from "@/types/emmaIngredients";

interface InciListAccordionProps {
  selectedTexture: EmmaIngredient | null;
  selectedActives: EmmaIngredient[];
  selectedFragrance: EmmaIngredient | null;
}

export const InciListAccordion: React.FC<InciListAccordionProps> = ({
  selectedTexture,
  selectedActives,
  selectedFragrance
}) => {
  const textureStyles = {
    icon: <Leaf className="h-3 w-3 text-green-600" />
  };
  
  const activeStyles = {
    icon: <Sparkles className="h-3 w-3 text-blue-600" />
  };
  
  const fragranceStyles = {
    icon: <Droplets className="h-3 w-3 text-purple-600" />
  };
  
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="inci" className="border-none">
        <AccordionTrigger className="py-2 hover:no-underline">
          <div className="flex items-center gap-2 text-left">
            <List className="h-4 w-4 text-primary" />
            <div>
              <span className="font-medium">Combined INCI List</span>
              <p className="text-xs text-muted-foreground">Full ingredient declaration</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-white">
            <div className="space-y-4">
              {selectedTexture && (
                <div className="p-3 rounded-md bg-green-50/50 border border-green-100">
                  <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                    {textureStyles.icon}
                    <span>{selectedTexture.Reference} - {selectedTexture.Description}</span>
                  </h4>
                  <Separator className="my-2" />
                  <p className="text-xs whitespace-pre-wrap">{selectedTexture["INCI LIST"] || "No INCI list available"}</p>
                </div>
              )}
              
              {selectedActives.length > 0 && selectedActives.map(active => (
                <div key={active.Reference} className="p-3 rounded-md bg-blue-50/50 border border-blue-100">
                  <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                    {activeStyles.icon}
                    <span>{active.Reference} - {active.Description}</span>
                  </h4>
                  <Separator className="my-2" />
                  <p className="text-xs whitespace-pre-wrap">{active["INCI LIST"] || "No INCI list available"}</p>
                </div>
              ))}
              
              {selectedFragrance && (
                <div className="p-3 rounded-md bg-purple-50/50 border border-purple-100">
                  <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                    {fragranceStyles.icon}
                    <span>{selectedFragrance.Reference} - {selectedFragrance.Description}</span>
                  </h4>
                  <Separator className="my-2" />
                  <p className="text-xs whitespace-pre-wrap">{selectedFragrance["INCI LIST"] || "No INCI list available"}</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
