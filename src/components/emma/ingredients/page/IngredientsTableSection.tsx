
import React from "react";
import { List, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { EmmaIngredientsSplit } from "@/components/emma/ingredients/EmmaIngredientsSplit";

export const IngredientsTableSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-slate-100 to-slate-50 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              <span className="font-semibold">INCI Lists</span>
            </div>
            
            <Separator orientation="vertical" className="h-6 hidden md:block" />
            
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold">Ingredient Breakdowns</span>
            </div>
          </div>
          
          <span className="text-xs text-muted-foreground bg-white px-3 py-1 rounded-full border">
            Explore our premium ingredient collection
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <EmmaIngredientsSplit />
      </div>
    </div>
  );
};
